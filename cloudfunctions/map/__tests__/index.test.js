const https = require("https");
const EventEmitter = require("events");
const { main } = require("../index");

describe("cloudfunction/map", () => {
  const originalTencentMapKey = process.env.TENCENT_MAP_KEY;
  const originalHttpsGet = https.get;

  afterEach(() => {
    if (originalTencentMapKey === undefined) {
      delete process.env.TENCENT_MAP_KEY;
    } else {
      process.env.TENCENT_MAP_KEY = originalTencentMapKey;
    }
    https.get = originalHttpsGet;
  });

  it("unknown action returns code -1", async () => {
    const res = await main({ action: "unknown", payload: {} }, {});
    expect(res.code).toBe(-1);
  });

  it("geocode without address returns code -1", async () => {
    const res = await main({ action: "geocode", payload: { address: "" } }, {});
    expect(res.code).toBe(-1);
  });

  it("reverseGeocode without coordinates returns code -1", async () => {
    const res = await main({ action: "reverseGeocode", payload: { latitude: "", longitude: "" } }, {});
    expect(res.code).toBe(-1);
  });

  it("reverseGeocode returns formatted address and district from tencent map", async () => {
    process.env.TENCENT_MAP_KEY = "mock_key";
    https.get = jest.fn((url, callback) => {
      expect(url).toContain("https://apis.map.qq.com/ws/geocoder/v1/");
      expect(url).toContain("location=22.5405%2C113.9345");
      expect(url).toContain("get_poi=0");
      expect(url).toContain("key=mock_key");

      const response = new EventEmitter();
      const request = {
        on: jest.fn().mockReturnThis()
      };

      callback(response);
      response.emit("data", JSON.stringify({
        status: 0,
        result: {
          address: "广东省深圳市南山区粤海街道科技园科苑路15号",
          formatted_addresses: {
            recommend: "广东省深圳市南山区科技园科苑路15号"
          },
          address_component: {
            province: "广东省",
            city: "深圳市",
            district: "南山区"
          },
          ad_info: {
            adcode: "440305",
            province: "广东省",
            city: "深圳市",
            district: "南山区"
          }
        }
      }));
      response.emit("end");

      return request;
    });

    const res = await main({
      action: "reverseGeocode",
      payload: {
        latitude: 22.5405,
        longitude: 113.9345
      }
    }, {});

    expect(res.code).toBe(0);
    expect(res.data).toEqual(expect.objectContaining({
      latitude: 22.5405,
      longitude: 113.9345,
      formattedAddress: "广东省深圳市南山区科技园科苑路15号",
      address: "广东省深圳市南山区粤海街道科技园科苑路15号",
      addressComponent: expect.objectContaining({
        district: "南山区"
      }),
      adInfo: expect.objectContaining({
        adcode: "440305",
        district: "南山区"
      })
    }));
  });
});
