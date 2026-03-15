const crypto = require("crypto");
const cloud = require("wx-server-sdk");
const { main } = require("../index");

describe("cloudfunction/chat", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("createConversation rejects invalid target user", async () => {
    const accessToken = "chat_create_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const currentUser = {
      _id: "user_doc_1",
      userId: "user_1",
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
                    userId: currentUser.userId,
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
          where: jest.fn(({ userId }) => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({
                data: userId === currentUser.userId ? [currentUser] : []
              })
            }))
          }))
        };
      }

      if (name === "conversations") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [] })
            }))
          })),
          add: jest.fn().mockResolvedValue({ _id: "conversation_1" })
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
        action: "createConversation",
        payload: {
          targetUserId: "user_missing",
          houseId: "house_1"
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(404);
      expect(res.message).toBe("目标用户不存在或已失效");
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("sendMessage rejects invalid receiver user", async () => {
    const accessToken = "chat_send_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const currentUser = {
      _id: "user_doc_1",
      userId: "user_1",
      status: "active"
    };
    const conversation = {
      _id: "conv_doc_1",
      conversationId: "conv_1",
      participantIds: ["user_1", "user_missing"],
      unreadMap: {}
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
                    userId: currentUser.userId,
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
          where: jest.fn(({ userId }) => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({
                data: userId === currentUser.userId ? [currentUser] : []
              })
            }))
          }))
        };
      }

      if (name === "conversations") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [conversation] })
            }))
          })),
          doc: jest.fn(() => ({
            update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
          }))
        };
      }

      if (name === "chat_messages" || name === "messages") {
        return {
          add: jest.fn().mockResolvedValue({ _id: "mock_id" }),
          where: jest.fn().mockReturnThis(),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
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
        action: "sendMessage",
        payload: {
          conversationId: "conv_1",
          content: "你好",
          messageType: "text"
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(404);
      expect(res.message).toBe("接收方不存在或已失效");
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("sendMessage updates conversation without creating chat notification records", async () => {
    const accessToken = "chat_send_success_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const currentUser = {
      _id: "user_doc_1",
      userId: "user_1",
      status: "active"
    };
    const targetUser = {
      _id: "user_doc_2",
      userId: "user_2",
      status: "active"
    };
    const conversation = {
      _id: "conv_doc_1",
      conversationId: "conv_1",
      participantIds: ["user_1", "user_2"],
      unreadMap: {}
    };
    const messageAddMock = jest.fn().mockResolvedValue({ _id: "chat_message_1" });
    const conversationUpdateMock = jest.fn().mockResolvedValue({ stats: { updated: 1 } });
    const notificationAddMock = jest.fn().mockResolvedValue({ _id: "notification_1" });
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
                    userId: currentUser.userId,
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
          where: jest.fn(({ userId }) => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({
                data: userId === currentUser.userId
                  ? [currentUser]
                  : userId === targetUser.userId
                    ? [targetUser]
                    : []
              })
            }))
          }))
        };
      }

      if (name === "conversations") {
        return {
          where: jest.fn(() => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({ data: [conversation] })
            }))
          })),
          doc: jest.fn(() => ({
            update: conversationUpdateMock
          }))
        };
      }

      if (name === "chat_messages") {
        return {
          add: messageAddMock,
          where: jest.fn().mockReturnThis(),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } })
        };
      }

      if (name === "messages") {
        return {
          add: notificationAddMock,
          where: jest.fn().mockReturnThis(),
          count: jest.fn().mockResolvedValue({ total: 0 }),
          get: jest.fn().mockResolvedValue({ data: [] }),
          update: jest.fn().mockResolvedValue({ stats: { updated: 1 } }),
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
        action: "sendMessage",
        payload: {
          conversationId: "conv_1",
          content: "你好",
          messageType: "text"
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(0);
      expect(res.data).toEqual({ messageId: "chat_message_1" });
      expect(messageAddMock).toHaveBeenCalledTimes(1);
      expect(conversationUpdateMock).toHaveBeenCalledTimes(1);
      expect(notificationAddMock).not.toHaveBeenCalled();
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });

  it("getNotifications filters out chat notifications", async () => {
    const accessToken = "chat_notifications_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const currentUser = {
      _id: "user_doc_1",
      userId: "user_1",
      status: "active"
    };
    const whereCalls = [];
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
                    userId: currentUser.userId,
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
          where: jest.fn(({ userId }) => ({
            limit: jest.fn(() => ({
              get: jest.fn().mockResolvedValue({
                data: userId === currentUser.userId ? [currentUser] : []
              })
            }))
          }))
        };
      }

      if (name === "messages") {
        const collection = {
          where: jest.fn((query) => {
            whereCalls.push(query);
            if (query.read === false) {
              return {
                count: jest.fn().mockResolvedValue({ total: 1 })
              };
            }
            return {
              count: jest.fn().mockResolvedValue({ total: 2 }),
              orderBy: jest.fn(() => ({
                skip: jest.fn(() => ({
                  limit: jest.fn(() => ({
                    get: jest.fn().mockResolvedValue({
                      data: [
                        { _id: "msg_1", type: "system", title: "系统通知" },
                        { _id: "msg_2", type: "houseAudit", title: "房源审核" }
                      ]
                    })
                  }))
                }))
              }))
            };
          })
        };
        return collection;
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
        action: "getNotifications",
        payload: {
          page: 1,
          pageSize: 10
        },
        auth: { accessToken }
      }, {});

      expect(res.code).toBe(0);
      expect(res.data.total).toBe(2);
      expect(res.data.unreadCount).toBe(1);
      expect(res.data.list).toEqual([
        expect.objectContaining({ type: "system" }),
        expect.objectContaining({ type: "houseAudit" })
      ]);
      expect(whereCalls).toHaveLength(3);
      expect(whereCalls[0]).toEqual(expect.objectContaining({
        userId: currentUser.userId
      }));
      expect(whereCalls[0].type).toBeDefined();
    } finally {
      db.collection.mockImplementation(originalImplementation);
    }
  });
});
