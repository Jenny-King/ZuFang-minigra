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

  it("changePhone updates phone identity and user profile", async () => {
    const accessToken = "session_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      phone: "13387395714",
      nickName: "测试用户",
      role: "tenant",
      status: "active",
      email: ""
    };
    const userUpdateMock = jest.fn().mockImplementation(async ({ data }) => {
      Object.assign(userDoc, data);
      return { stats: { updated: 1 } };
    });
    const smsCodeUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const oldIdentityUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const newIdentityAddMock = jest.fn().mockResolvedValue({ _id: "identity_new" });
    const identityDocQueue = [
      null,
      null,
      {
        _id: "identity_old",
        type: "phone",
        identifier: "13387395714",
        userId: userDoc.userId,
        status: "active"
      }
    ];

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
          where: jest.fn((query = {}) => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue(
                typeof query.userId === "string"
                  ? { data: [userDoc] }
                  : { data: [] }
              )
            }))
          })),
          doc: jest.fn(() => ({
            update: userUpdateMock
          }))
        };
      }

      if (name === "sms_codes") {
        return {
          where: jest.fn(() => ({
            orderBy: jest.fn(() => ({
              limit: jest.fn(() => ({
                get: jest.fn().mockResolvedValue({
                  data: [{
                    _id: "sms_1",
                    phone: "17364071058",
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
          doc: jest.fn((id) => ({
            get: jest.fn().mockResolvedValue({
              data: identityDocQueue.length ? identityDocQueue.shift() : null
            }),
            update: oldIdentityUpdateMock
          })),
          add: newIdentityAddMock,
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [] })
            }))
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
        })),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" })
      };
    });

    const res = await main({
      action: "changePhone",
      payload: {
        phone: "17364071058",
        code: "123456"
      },
      auth: { accessToken }
    }, {});

    expect(res.code).toBe(0);
    expect(res.data).toEqual(expect.objectContaining({
      phone: "17364071058"
    }));
    expect(userUpdateMock).toHaveBeenCalled();
    expect(smsCodeUpdateMock).toHaveBeenCalled();
    expect(oldIdentityUpdateMock).toHaveBeenCalled();
    expect(newIdentityAddMock).toHaveBeenCalled();
  });

  it("changePhone rolls back new identity when user profile update fails", async () => {
    const accessToken = "session_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      phone: "13387395714",
      nickName: "测试用户",
      role: "tenant",
      status: "active",
      email: ""
    };
    const userUpdateMock = jest.fn().mockRejectedValue(new Error("users update failed"));
    const smsCodeUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const identityUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const newIdentityAddMock = jest.fn().mockResolvedValue({ _id: "identity_new" });
    const identityDocQueue = [
      null,
      null,
      {
        _id: "identity_new",
        type: "phone",
        identifier: "17364071058",
        userId: userDoc.userId,
        status: "active"
      }
    ];

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
          where: jest.fn((query = {}) => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue(
                typeof query.userId === "string"
                  ? { data: [userDoc] }
                  : { data: [] }
              )
            }))
          })),
          doc: jest.fn(() => ({
            update: userUpdateMock
          }))
        };
      }

      if (name === "sms_codes") {
        return {
          where: jest.fn(() => ({
            orderBy: jest.fn(() => ({
              limit: jest.fn(() => ({
                get: jest.fn().mockResolvedValue({
                  data: [{
                    _id: "sms_1",
                    phone: "17364071058",
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
            get: jest.fn().mockResolvedValue({
              data: identityDocQueue.length ? identityDocQueue.shift() : null
            }),
            update: identityUpdateMock
          })),
          add: newIdentityAddMock,
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [] })
            }))
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
        })),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" })
      };
    });

    const res = await main({
      action: "changePhone",
      payload: {
        phone: "17364071058",
        code: "123456"
      },
      auth: { accessToken }
    }, {});

    expect(res.code).toBe(500);
    expect(newIdentityAddMock).toHaveBeenCalledTimes(1);
    expect(identityUpdateMock).toHaveBeenCalledTimes(1);
  });

  it("bindEmail saves sanitized email", async () => {
    const accessToken = "session_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      phone: "13387395714",
      nickName: "测试用户",
      role: "tenant",
      status: "active",
      email: ""
    };
    const userUpdateMock = jest.fn().mockImplementation(async ({ data }) => {
      Object.assign(userDoc, data);
      return { stats: { updated: 1 } };
    });

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
          where: jest.fn((query = {}) => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue(
                typeof query.userId === "string"
                  ? { data: [userDoc] }
                  : { data: [] }
              )
            }))
          })),
          doc: jest.fn(() => ({
            update: userUpdateMock
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
        where: jest.fn(() => ({
          limit: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: [] })
          }))
        })),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        })),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" })
      };
    });

    const res = await main({
      action: "bindEmail",
      payload: {
        email: " Test@Example.com "
      },
      auth: { accessToken }
    }, {});

    expect(res.code).toBe(0);
    expect(res.data).toEqual(expect.objectContaining({
      email: "test@example.com"
    }));
    expect(userUpdateMock).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        email: "test@example.com"
      })
    }));
  });
});
