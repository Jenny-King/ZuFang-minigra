const crypto = require("crypto");
const cloud = require("wx-server-sdk");
const { main } = require("../index");

describe("cloudfunction/house", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("getRegions returns code 0 with region list", async () => {
    const res = await main({ action: "getRegions", payload: {} }, {});
    expect(res.code).toBe(0);
    expect(Array.isArray(res.data)).toBe(true);
  });

  it("getList normalizes city suffix and ignores city-wide region", async () => {
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();
    let capturedWhere = null;
    const housesCollection = {
      where: jest.fn((where) => {
        capturedWhere = where;
        return housesCollection;
      }),
      orderBy: jest.fn(() => housesCollection),
      skip: jest.fn(() => housesCollection),
      limit: jest.fn(() => housesCollection),
      count: jest.fn().mockResolvedValue({ total: 1 }),
      get: jest.fn().mockResolvedValue({
        data: [{ _id: "house_1", city: "深圳市", region: "南山区" }]
      })
    };

    db.collection.mockImplementation((name) => {
      if (name === "houses") {
        return housesCollection;
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({ data: [] }),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "getList",
        payload: {
          city: "深圳",
          region: "全市",
          page: 1,
          pageSize: 10
        }
      }, {});

      expect(res.code).toBe(0);
      expect(db.RegExp).toHaveBeenCalledWith({
        regexp: "^深圳市?$",
        options: "i"
      });
      expect(capturedWhere).toEqual(expect.objectContaining({
        status: "active",
        city: {
          $regex: "^深圳市?$",
          $options: "i"
        }
      }));
      expect(capturedWhere.region).toBeUndefined();
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("getList keeps exact district filter when region is selected", async () => {
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();
    let capturedWhere = null;
    const housesCollection = {
      where: jest.fn((where) => {
        capturedWhere = where;
        return housesCollection;
      }),
      orderBy: jest.fn(() => housesCollection),
      skip: jest.fn(() => housesCollection),
      limit: jest.fn(() => housesCollection),
      count: jest.fn().mockResolvedValue({ total: 1 }),
      get: jest.fn().mockResolvedValue({
        data: [{ _id: "house_2", city: "深圳市", region: "南山区" }]
      })
    };

    db.collection.mockImplementation((name) => {
      if (name === "houses") {
        return housesCollection;
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({ data: [] }),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "getList",
        payload: {
          city: "深圳市",
          region: "南山区",
          page: 1,
          pageSize: 10
        }
      }, {});

      expect(res.code).toBe(0);
      expect(capturedWhere).toEqual(expect.objectContaining({
        status: "active",
        city: {
          $regex: "^深圳市?$",
          $options: "i"
        },
        region: "南山区"
      }));
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("create rejects invalid house payload before writing", async () => {
    const accessToken = "house_create_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const addMock = jest.fn().mockResolvedValue({ _id: "house_1" });
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      role: "landlord",
      status: "active"
    };
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();

    db.collection.mockImplementation((name) => {
      if (name === "user_sessions") {
        return {
          doc: jest.fn((id) => ({
            get: jest.fn().mockResolvedValue(id === tokenHash
              ? {
                  data: {
                    _id: tokenHash,
                    userId: userDoc.userId,
                    status: "active",
                    expireAt: new Date(Date.now() + 60 * 1000).toISOString()
                  }
                }
              : { data: null })
          }))
        };
      }

      if (name === "users") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [userDoc] })
            }))
          }))
        };
      }

      if (name === "houses") {
        return {
          add: addMock,
          doc: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: null }),
            update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
          }))
        };
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({ data: [] }),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "create",
        payload: {
          title: "测试房源",
          price: 3000,
          address: "深圳南山",
          type: "一室一厅",
          paymentMethod: "",
          area: 0,
          images: [],
          contactPhone: "123"
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(400);
      expect(addMock).not.toHaveBeenCalled();
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("create persists city and region when payload is valid", async () => {
    const accessToken = "house_create_with_city_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const addMock = jest.fn().mockResolvedValue({ _id: "house_2" });
    const userDoc = {
      _id: "user_doc_2",
      userId: "user_2",
      role: "landlord",
      status: "active"
    };
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();

    db.collection.mockImplementation((name) => {
      if (name === "user_sessions") {
        return {
          doc: jest.fn((id) => ({
            get: jest.fn().mockResolvedValue(id === tokenHash
              ? {
                  data: {
                    _id: tokenHash,
                    userId: userDoc.userId,
                    status: "active",
                    expireAt: new Date(Date.now() + 60 * 1000).toISOString()
                  }
                }
              : { data: null })
          }))
        };
      }

      if (name === "users") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [userDoc] })
            }))
          }))
        };
      }

      if (name === "houses") {
        return {
          add: addMock,
          doc: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: null }),
            update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
          }))
        };
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({ data: [] }),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "create",
        payload: {
          title: "科技园精装一居",
          price: 4200,
          address: "深圳市南山区科技园科苑路15号",
          city: "深圳市",
          region: "南山区",
          type: "一室一厅",
          area: 35,
          images: ["cloud://demo/house_1.jpg"],
          contactPhone: "13800138000"
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(0);
      expect(addMock).toHaveBeenCalledTimes(1);
      expect(addMock.mock.calls[0][0].data).toEqual(expect.objectContaining({
        city: "深圳市",
        region: "南山区",
        landlordUserId: "user_2",
        status: "active"
      }));
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("update rejects invalid title before writing", async () => {
    const accessToken = "house_update_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const updateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      role: "landlord",
      status: "active"
    };
    const houseDoc = {
      _id: "house_1",
      landlordUserId: userDoc.userId,
      status: "active"
    };
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();

    db.collection.mockImplementation((name) => {
      if (name === "user_sessions") {
        return {
          doc: jest.fn((id) => ({
            get: jest.fn().mockResolvedValue(id === tokenHash
              ? {
                  data: {
                    _id: tokenHash,
                    userId: userDoc.userId,
                    status: "active",
                    expireAt: new Date(Date.now() + 60 * 1000).toISOString()
                  }
                }
              : { data: null })
          }))
        };
      }

      if (name === "users") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [userDoc] })
            }))
          }))
        };
      }

      if (name === "houses") {
        return {
          doc: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: houseDoc }),
            update: updateMock
          }))
        };
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({ data: [] }),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "update",
        payload: {
          houseId: "house_1",
          title: ""
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(400);
      expect(updateMock).not.toHaveBeenCalled();
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("update allows changing house status to hidden", async () => {
    const accessToken = "house_update_status_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const updateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const userDoc = {
      _id: "user_doc_2",
      userId: "user_2",
      role: "landlord",
      status: "active"
    };
    const houseDoc = {
      _id: "house_2",
      landlordUserId: userDoc.userId,
      status: "active"
    };
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();

    db.collection.mockImplementation((name) => {
      if (name === "user_sessions") {
        return {
          doc: jest.fn((id) => ({
            get: jest.fn().mockResolvedValue(id === tokenHash
              ? {
                  data: {
                    _id: tokenHash,
                    userId: userDoc.userId,
                    status: "active",
                    expireAt: new Date(Date.now() + 60 * 1000).toISOString()
                  }
                }
              : { data: null })
          }))
        };
      }

      if (name === "users") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [userDoc] })
            }))
          }))
        };
      }

      if (name === "houses") {
        return {
          doc: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: houseDoc }),
            update: updateMock
          }))
        };
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        get: jest.fn().mockResolvedValue({ data: [] }),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "update",
        payload: {
          houseId: "house_2",
          status: "hidden"
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(0);
      expect(updateMock).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          status: "hidden"
        })
      }));
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });
});
