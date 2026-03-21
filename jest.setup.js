const mockDb = {
  collection: jest.fn(() => ({
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
      update: jest.fn().mockResolvedValue({ stats: { updated: 1 } }),
      remove: jest.fn().mockResolvedValue({ stats: { removed: 1 } })
    }))
  })),
  command: {
    neq: jest.fn((v) => ({ $neq: v })),
    in: jest.fn((arr) => ({ $in: arr })),
    all: jest.fn((arr) => ({ $all: arr })),
    gte: jest.fn((v) => ({ $gte: v })),
    lte: jest.fn((v) => ({ $lte: v })),
    and: jest.fn((arr) => ({ $and: arr }))
  },
  RegExp: jest.fn(({ regexp, options }) => ({ $regex: regexp, $options: options }))
};

const mockCloudbaseDb = {
  createCollection: jest.fn().mockResolvedValue({})
};

jest.mock("wx-server-sdk", () => ({
  init: jest.fn(),
  DYNAMIC_CURRENT_ENV: "mock-env",
  database: jest.fn(() => mockDb),
  getWXContext: jest.fn(() => ({
    OPENID: "mock_openid"
  }))
}), { virtual: true });

jest.mock("@cloudbase/node-sdk", () => ({
  init: jest.fn(() => ({
    database: jest.fn(() => mockCloudbaseDb)
  }))
}), { virtual: true });
