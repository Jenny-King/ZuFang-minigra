const cloud = require("wx-server-sdk");
const { main } = require("../index");

describe("cloudfunction/bootstrap", () => {
  const originalEnvAlias = process.env.ENV_ALIAS;

  beforeEach(() => {
    process.env.ENV_ALIAS = "dev";
  });

  afterAll(() => {
    if (originalEnvAlias === undefined) {
      delete process.env.ENV_ALIAS;
      return;
    }
    process.env.ENV_ALIAS = originalEnvAlias;
  });

  it("without allowBootstrap returns code -1", async () => {
    const res = await main({ action: "initCollections", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("blocks bootstrap when env alias is prod even if allowBootstrap is true", async () => {
    process.env.ENV_ALIAS = "prod";

    const res = await main({ action: "initAll", payload: { allowBootstrap: true } }, {});

    expect(res.code).toBe(-1);
    expect(res.message).toBe("生产环境禁止执行 bootstrap/cleanup 操作");
  });

  it("initAll with allowBootstrap returns bootstrap summary", async () => {
    const res = await main({ action: "initAll", payload: { allowBootstrap: true } }, {});
    expect(res.code).toBe(0);
    expect(res.data.collections).toHaveLength(11);
    expect(res.data.failedCollections).toEqual([]);
    expect(res.data.regions).toEqual(expect.objectContaining({
      inserted: 57,
      skipped: false,
      collectionReady: true
    }));
  });

  it("cleanupTestUsers removes disabled history while preserving active users", async () => {
    const db = cloud.database();
    const originalCollection = db.collection;
    const removeMocks = {};
    const dataset = {
      users: [
        { _id: "user_disabled_1", userId: "user_old_1", phone: "17364071058", status: "disabled" },
        { _id: "user_active_1", userId: "user_new_1", phone: "17364071058", status: "active" },
        { _id: "user_disabled_2", userId: "user_old_2", phone: "13387395714", status: "disabled" }
      ],
      user_identities: [
        { _id: "identity_1", userId: "user_old_1", type: "phone" },
        { _id: "identity_2", userId: "user_old_2", type: "phone" }
      ],
      user_sessions: [
        { _id: "session_1", userId: "user_old_1", status: "revoked" },
        { _id: "session_2", userId: "user_old_2", status: "revoked" }
      ]
    };

    function matchQuery(item, query) {
      return Object.entries(query).every(([key, value]) => {
        if (value && typeof value === "object" && Array.isArray(value.$in)) {
          return value.$in.includes(item[key]);
        }
        return item[key] === value;
      });
    }

    db.collection = jest.fn((name) => {
      const state = {
        whereClause: {}
      };
      return {
        where(query) {
          state.whereClause = query || {};
          return this;
        },
        skip() {
          return this;
        },
        limit() {
          return this;
        },
        get: jest.fn(async () => ({
          data: (dataset[name] || []).filter((item) => matchQuery(item, state.whereClause))
        })),
        doc: jest.fn((id) => {
          if (!removeMocks[name]) {
            removeMocks[name] = {};
          }
          if (!removeMocks[name][id]) {
            removeMocks[name][id] = jest.fn(async () => ({ stats: { removed: 1 } }));
          }
          return {
            remove: removeMocks[name][id]
          };
        })
      };
    });

    try {
      const res = await main({ action: "cleanupTestUsers", payload: { allowBootstrap: true } }, {});
      expect(res.code).toBe(0);
      expect(res.data.matchedDisabledUserIds).toEqual(["user_old_1", "user_old_2"]);
      expect(res.data.removed).toEqual({
        users: 2,
        identities: 2,
        sessions: 2
      });
      expect(res.data.preservedActiveUsers).toEqual([
        expect.objectContaining({ userId: "user_new_1", phone: "17364071058", status: "active" })
      ]);
      expect(removeMocks.users.user_disabled_1).toHaveBeenCalledTimes(1);
      expect(removeMocks.users.user_disabled_2).toHaveBeenCalledTimes(1);
      expect(removeMocks.user_identities.identity_1).toHaveBeenCalledTimes(1);
      expect(removeMocks.user_sessions.session_1).toHaveBeenCalledTimes(1);
      expect(removeMocks.users.user_active_1).toBeUndefined();
    } finally {
      db.collection = originalCollection;
    }
  });

  it("cleanupHouses removes all house documents", async () => {
    const db = cloud.database();
    const originalCollection = db.collection;
    const removeMocks = {};
    const dataset = {
      houses: [
        { _id: "house_1", title: "测试房源1" },
        { _id: "house_2", title: "测试房源2" },
        { _id: "house_3", title: "测试房源3" }
      ]
    };

    db.collection = jest.fn((name) => {
      return {
        where() {
          return this;
        },
        skip() {
          return this;
        },
        limit() {
          return this;
        },
        get: jest.fn(async () => ({
          data: dataset[name] || []
        })),
        doc: jest.fn((id) => {
          if (!removeMocks[name]) {
            removeMocks[name] = {};
          }
          if (!removeMocks[name][id]) {
            removeMocks[name][id] = jest.fn(async () => ({ stats: { removed: 1 } }));
          }
          return {
            remove: removeMocks[name][id]
          };
        })
      };
    });

    try {
      const res = await main({ action: "cleanupHouses", payload: { allowBootstrap: true } }, {});
      expect(res.code).toBe(0);
      expect(res.data.removed).toEqual({
        houses: 3
      });
      expect(removeMocks.houses.house_1).toHaveBeenCalledTimes(1);
      expect(removeMocks.houses.house_2).toHaveBeenCalledTimes(1);
      expect(removeMocks.houses.house_3).toHaveBeenCalledTimes(1);
    } finally {
      db.collection = originalCollection;
    }
  });

  it("cleanupHousingData returns dry-run stats without deleting documents", async () => {
    const db = cloud.database();
    const originalCollection = db.collection;
    const removeMocks = {};
    const dataset = {
      houses: [
        { _id: "house_1", title: "测试房源1" },
        { _id: "house_2", title: "测试房源2" }
      ],
      favorites: [
        { _id: "favorite_1", houseId: "house_1" }
      ],
      history: [
        { _id: "history_1", houseId: "house_1" },
        { _id: "history_2", houseId: "house_2" }
      ],
      bookings: [
        { _id: "booking_1", houseId: "house_1" }
      ]
    };

    db.collection = jest.fn((name) => ({
      where() {
        return this;
      },
      skip() {
        return this;
      },
      limit() {
        return this;
      },
      get: jest.fn(async () => ({
        data: dataset[name] || []
      })),
      doc: jest.fn((id) => {
        if (!removeMocks[name]) {
          removeMocks[name] = {};
        }
        if (!removeMocks[name][id]) {
          removeMocks[name][id] = jest.fn(async () => ({ stats: { removed: 1 } }));
        }
        return {
          remove: removeMocks[name][id]
        };
      })
    }));

    try {
      const res = await main({ action: "cleanupHousingData", payload: { allowBootstrap: true } }, {});
      expect(res.code).toBe(0);
      expect(res.data).toEqual(expect.objectContaining({
        dryRun: true,
        collections: ["houses", "favorites", "history", "bookings"],
        totalDocuments: 6,
        totalRemoved: 0
      }));
      expect(res.data.summary).toEqual({
        houses: { total: 2, removed: 0, dryRun: true },
        favorites: { total: 1, removed: 0, dryRun: true },
        history: { total: 2, removed: 0, dryRun: true },
        bookings: { total: 1, removed: 0, dryRun: true }
      });
      expect(removeMocks.houses).toBeUndefined();
      expect(removeMocks.favorites).toBeUndefined();
      expect(removeMocks.history).toBeUndefined();
      expect(removeMocks.bookings).toBeUndefined();
    } finally {
      db.collection = originalCollection;
    }
  });

  it("cleanupHousingData removes multiple housing collections when dryRun is false", async () => {
    const db = cloud.database();
    const originalCollection = db.collection;
    const removeMocks = {};
    const dataset = {
      houses: [
        { _id: "house_1", title: "测试房源1" }
      ],
      favorites: [
        { _id: "favorite_1", houseId: "house_1" }
      ]
    };

    db.collection = jest.fn((name) => ({
      where() {
        return this;
      },
      skip() {
        return this;
      },
      limit() {
        return this;
      },
      get: jest.fn(async () => ({
        data: dataset[name] || []
      })),
      doc: jest.fn((id) => {
        if (!removeMocks[name]) {
          removeMocks[name] = {};
        }
        if (!removeMocks[name][id]) {
          removeMocks[name][id] = jest.fn(async () => ({ stats: { removed: 1 } }));
        }
        return {
          remove: removeMocks[name][id]
        };
      })
    }));

    try {
      const res = await main({
        action: "cleanupHousingData",
        payload: {
          allowBootstrap: true,
          dryRun: false,
          collections: ["houses", "favorites"]
        }
      }, {});
      expect(res.code).toBe(0);
      expect(res.data).toEqual(expect.objectContaining({
        dryRun: false,
        collections: ["houses", "favorites"],
        totalDocuments: 2,
        totalRemoved: 2
      }));
      expect(res.data.summary).toEqual({
        houses: { total: 1, removed: 1, dryRun: false },
        favorites: { total: 1, removed: 1, dryRun: false }
      });
      expect(removeMocks.houses.house_1).toHaveBeenCalledTimes(1);
      expect(removeMocks.favorites.favorite_1).toHaveBeenCalledTimes(1);
    } finally {
      db.collection = originalCollection;
    }
  });
});
