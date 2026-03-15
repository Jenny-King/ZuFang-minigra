const cloud = require("wx-server-sdk");
const { main } = require("../index");

describe("cloudfunction/auth", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("sendSmsCode invalid phone returns code -1", async () => {
    const res = await main({ action: "sendSmsCode", payload: { phone: "123" } }, {});
    expect(res.code).toBe(-1);
  });

  it("register returns userInfo and accessToken without storing _openid on user", async () => {
    const state = {
      users: [],
      user_identities: [],
      user_sessions: []
    };
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();

    const collectionFactory = (name) => ({
      where: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      count: jest.fn().mockResolvedValue({ total: 0 }),
      get: jest.fn().mockResolvedValue({ data: [] }),
      add: jest.fn(({ data }) => {
        const nextId = data._id || `${name}_${state[name].length + 1}`;
        state[name].push({ ...data, _id: nextId });
        return Promise.resolve({ _id: nextId });
      }),
      update: jest.fn().mockResolvedValue({ stats: { updated: 1 } }),
      remove: jest.fn().mockResolvedValue({ stats: { removed: 1 } }),
      doc: jest.fn((id) => ({
        get: jest.fn().mockResolvedValue({
          data: state[name].find((item) => item._id === id) || {}
        }),
        update: jest.fn(({ data }) => {
          const index = state[name].findIndex((item) => item._id === id);
          if (index >= 0) {
            state[name][index] = { ...state[name][index], ...data };
          }
          return Promise.resolve({ stats: { updated: index >= 0 ? 1 : 0 } });
        }),
        remove: jest.fn().mockResolvedValue({ stats: { removed: 1 } })
      }))
    });

    db.collection.mockImplementation((name) => {
      if (!state[name]) {
        state[name] = [];
      }
      return collectionFactory(name);
    });
    cloud.getWXContext.mockReturnValue({ OPENID: "mock_openid" });

    try {
      const res = await main({
        action: "register",
        payload: {
          nickName: "测试租客",
          phone: "17364071058",
          password: "17364071058A",
          role: "tenant"
        }
      }, {});

      expect(res.code).toBe(0);
      expect(res.data).toEqual(expect.objectContaining({
        accessToken: expect.any(String),
        userInfo: expect.objectContaining({
          phone: "17364071058",
          role: "tenant",
          wechatBound: false
        })
      }));
      expect(state.users).toHaveLength(1);
      expect(state.users[0]._openid).toBeUndefined();
      expect(state.user_identities).toHaveLength(1);
      expect(state.user_sessions).toHaveLength(1);
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("resetPassword updates password hash and revokes active sessions", async () => {
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      phone: "17364071058",
      passwordHash: "old_hash",
      status: "active"
    };
    const identityDoc = {
      _id: "identity_1",
      type: "phone",
      identifier: userDoc.phone,
      userId: userDoc.userId,
      status: "active"
    };
    const sessionUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 2 } });
    const userUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const smsCodeUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });

    db.collection.mockImplementation((name) => {
      if (name === "sms_codes") {
        return {
          where: jest.fn(() => ({
            orderBy: jest.fn(() => ({
              limit: jest.fn(() => ({
                get: jest.fn().mockResolvedValue({
                  data: [{
                    _id: "sms_code_1",
                    phone: userDoc.phone,
                    code: "123456",
                    status: "active",
                    expireAt: new Date(Date.now() + 60 * 1000).toISOString()
                  }]
                })
              }))
            }))
          })),
          doc: jest.fn(() => ({
            update: smsCodeUpdateMock
          }))
        };
      }

      if (name === "user_identities") {
        return {
          doc: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: identityDoc })
          }))
        };
      }

      if (name === "users") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [userDoc] })
            }))
          })),
          doc: jest.fn(() => ({
            update: userUpdateMock
          }))
        };
      }

      if (name === "user_sessions") {
        return {
          where: jest.fn(() => ({
            update: sessionUpdateMock
          }))
        };
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        get: jest.fn().mockResolvedValue({ data: [] }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        update: jest.fn().mockResolvedValue({ stats: { updated: 1 } }),
        remove: jest.fn().mockResolvedValue({ stats: { removed: 1 } }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: {} }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "resetPassword",
        payload: {
          phone: userDoc.phone,
          code: "123456",
          newPassword: "reset123A"
        }
      }, {});

      expect(res.code).toBe(0);
      expect(res.data).toEqual({
        reset: true,
        revokedSessions: 2
      });
      expect(userUpdateMock).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          passwordHash: expect.any(String)
        })
      }));
      expect(smsCodeUpdateMock).toHaveBeenCalledTimes(1);
      expect(sessionUpdateMock).toHaveBeenCalledTimes(1);
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("verifyIdentity stores identity profile as pending instead of approved", async () => {
    const db = cloud.database();
    const originalImplementation = db.collection.getMockImplementation();
    const sessionDoc = {
      _id: "session_hash_1",
      userId: "user_1",
      status: "active",
      expireAt: new Date(Date.now() + 60 * 1000).toISOString()
    };
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      phone: "17364071058",
      nickName: "测试用户",
      role: "tenant",
      verified: false,
      identityStatus: "unsubmitted",
      status: "active"
    };
    const userUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    let latestUserDoc = { ...userDoc };

    db.collection.mockImplementation((name) => {
      if (name === "user_sessions") {
        return {
          doc: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: sessionDoc })
          }))
        };
      }

      if (name === "users") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [latestUserDoc] })
            }))
          })),
          doc: jest.fn(() => ({
            update: jest.fn(async ({ data }) => {
              latestUserDoc = { ...latestUserDoc, ...data };
              return userUpdateMock({ data });
            })
          }))
        };
      }

      if (name === "user_identities") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [] })
            }))
          })),
          doc: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: null })
          }))
        };
      }

      return {
        where: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        count: jest.fn().mockResolvedValue({ total: 0 }),
        get: jest.fn().mockResolvedValue({ data: [] }),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
        update: jest.fn().mockResolvedValue({ stats: { updated: 1 } }),
        remove: jest.fn().mockResolvedValue({ stats: { removed: 1 } }),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: {} }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    try {
      const res = await main({
        action: "verifyIdentity",
        payload: {
          realName: "张三",
          idCard: "11010519491231002X"
        },
        auth: {
          accessToken: "plain_access_token"
        }
      }, {});

      expect(res.code).toBe(0);
      expect(res.message).toBe("身份资料已提交，待人工审核");
      expect(res.data.userInfo).toEqual(expect.objectContaining({
        verified: false,
        identityStatus: "pending",
        idCardMasked: expect.any(String)
      }));
      expect(userUpdateMock).toHaveBeenCalledWith(expect.objectContaining({
        data: expect.objectContaining({
          verified: false,
          identityStatus: "pending"
        })
      }));
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });
});
