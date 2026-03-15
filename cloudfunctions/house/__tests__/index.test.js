const { main } = require("../index");

describe("cloudfunction/house", () => {
  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("getRegions returns code 0 with region list", async () => {
    const res = await main({ action: "getRegions", payload: {} }, {});
    expect(res.code).toBe(0);
    expect(Array.isArray(res.data)).toBe(true);
  });
});
