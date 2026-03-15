const cloud = require("wx-server-sdk");
const { main } = require("../index");

describe("cloudfunction/bootstrap", () => {
  it("without allowBootstrap returns code -1", async () => {
    const res = await main({ action: "initCollections", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("initAll with allowBootstrap returns bootstrap summary", async () => {
    const res = await main({ action: "initAll", payload: { allowBootstrap: true } }, {});
    expect(res.code).toBe(0);
    expect(res.data.collections).toHaveLength(11);
    expect(res.data.failedCollections).toEqual([]);
    expect(res.data.regions).toEqual(expect.objectContaining({
      inserted: 7,
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
});
