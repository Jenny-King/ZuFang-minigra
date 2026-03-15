const { main } = require("../index");

describe("cloudfunction/map", () => {
  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("geocode without address returns code -1", async () => {
    const res = await main({ action: "geocode", payload: { address: "" } }, {});
    expect(res.code).toBe(-1);
  });
});
