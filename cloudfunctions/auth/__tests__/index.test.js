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

    cloud.database().collection.mockImplementation((name) => {
      if (!state[name]) {
        state[name] = [];
      }
      return collectionFactory(name);
    });
    cloud.getWXContext.mockReturnValue({ OPENID: "mock_openid" });

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
  });
});
