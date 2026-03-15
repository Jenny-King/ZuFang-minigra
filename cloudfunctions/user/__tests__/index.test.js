const crypto = require("crypto");
const cloud = require("wx-server-sdk");
const { main } = require("../index");

describe("cloudfunction/user", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("rejects updating phone through profile api", async () => {
    const accessToken = "session_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      phone: "13387395714",
      nickName: "测试用户",
      role: "tenant",
      status: "active"
    };

    const db = cloud.database();
    db.collection.mockImplementation((name) => {
      if (name === "user_sessions") {
        return {
          doc: jest.fn((id) => ({
            get: jest.fn().mockResolvedValue(id === tokenHash
              ? {
                  data: {
                    _id: tokenHash,
                    tokenHash,
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
          })),
          doc: jest.fn(() => ({
            update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
          }))
        };
      }

      return {
        where: jest.fn(() => ({
          limit: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: [] })
          }))
        })),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        }))
      };
    });

    const res = await main({
      action: "updateProfile",
      payload: { phone: "17364071058" },
      auth: { accessToken }
    }, {});

    expect(res.code).toBe(400);
    expect(res.message).toBe("手机号修改请走独立换绑流程");
  });
});
