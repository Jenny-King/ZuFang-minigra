const { main } = require("../index");

describe("cloudfunction/history", () => {
  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });
});
