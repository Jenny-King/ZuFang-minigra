const crypto = require("crypto");
const cloud = require("wx-server-sdk");
const { main } = require("../index");

describe("cloudfunction/support", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("submitFeedback stores feedback with current user snapshot", async () => {
    const accessToken = "support_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      nickName: "测试用户",
      phone: "13387395714",
      email: "demo@example.com",
      status: "active"
    };
    const feedbackAddMock = jest.fn().mockResolvedValue({ _id: "feedback_1" });
    const notificationAddMock = jest.fn().mockResolvedValue({ _id: "notification_1" });

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
          }))
        };
      }

      if (name === "support_feedbacks") {
        return {
          add: feedbackAddMock
        };
      }

      if (name === "messages") {
        return {
          add: notificationAddMock
        };
      }

      return {
        where: jest.fn(() => ({
          limit: jest.fn(() => ({
            get: jest.fn().mockResolvedValue({ data: [] })
          }))
        })),
        doc: jest.fn(() => ({
          get: jest.fn().mockResolvedValue({ data: null })
        })),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" })
      };
    });

    const res = await main({
      action: "submitFeedback",
      payload: {
        category: "bug",
        content: "发布房源时图片上传后没有立刻刷新。",
        contact: "请优先通过邮箱联系"
      },
      auth: { accessToken }
    }, {});

    expect(res.code).toBe(0);
    expect(res.data).toEqual(expect.objectContaining({
      feedbackId: expect.stringMatching(/^feedback_/),
      status: "submitted"
    }));
    expect(feedbackAddMock).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        _id: expect.stringMatching(/^feedback_/),
        category: "bug",
        content: "发布房源时图片上传后没有立刻刷新。",
        contact: "请优先通过邮箱联系",
        userId: "user_1",
        userSnapshot: expect.objectContaining({
          nickName: "测试用户",
          phone: "13387395714",
          email: "demo@example.com"
        })
      })
    }));
    expect(notificationAddMock).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({
        userId: "user_1",
        type: "system",
        title: "反馈提交成功",
        content: "我们已收到你的反馈，客服会尽快跟进处理。",
        relatedId: expect.stringMatching(/^feedback_/),
        relatedType: "supportFeedback",
        read: false
      })
    }));
  });

  it("submitFeedback rolls back feedback record when notification creation fails", async () => {
    const accessToken = "support_token";
    const tokenHash = crypto.createHash("sha256").update(accessToken).digest("hex");
    const userDoc = {
      _id: "user_doc_1",
      userId: "user_1",
      nickName: "测试用户",
      phone: "13387395714",
      email: "demo@example.com",
      status: "active"
    };
    const feedbackAddMock = jest.fn().mockResolvedValue({ _id: "feedback_1" });
    const feedbackRemoveMock = jest.fn().mockResolvedValue({ stats: { removed: 1 } });
    const notificationAddMock = jest.fn().mockRejectedValue(new Error("messages add failed"));

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
          }))
        };
      }

      if (name === "support_feedbacks") {
        return {
          add: feedbackAddMock,
          doc: jest.fn(() => ({
            remove: feedbackRemoveMock
          }))
        };
      }

      if (name === "messages") {
        return {
          add: notificationAddMock
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
          remove: jest.fn().mockResolvedValue({ stats: { removed: 1 } })
        })),
        add: jest.fn().mockResolvedValue({ _id: "mock_id" })
      };
    });

    const res = await main({
      action: "submitFeedback",
      payload: {
        category: "bug",
        content: "定位后区域没有自动识别。",
        contact: "demo@example.com"
      },
      auth: { accessToken }
    }, {});

    expect(res.code).toBe(500);
    expect(feedbackAddMock).toHaveBeenCalledTimes(1);
    expect(notificationAddMock).toHaveBeenCalledTimes(1);
    expect(feedbackRemoveMock).toHaveBeenCalledTimes(1);
  });
});
