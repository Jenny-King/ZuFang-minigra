const {
  getPhoneEntryMeta,
  validatePhoneChangeValue,
  validateSmsCodeValue
} = require("../../package-profile/pages/settings/phone.helper");

describe("settings phone helper", () => {
  it("uses bind copy when current user has no phone", () => {
    expect(getPhoneEntryMeta({ phone: "" })).toEqual(expect.objectContaining({
      hasBoundPhone: false,
      actionText: "绑定手机号",
      submitText: "确认绑定",
      successText: "手机号已绑定"
    }));
  });

  it("uses change copy when current user already has phone", () => {
    expect(getPhoneEntryMeta({ phone: "13387395714" })).toEqual(expect.objectContaining({
      hasBoundPhone: true,
      currentPhone: "13387395714",
      actionText: "换绑手机号",
      submitText: "确认换绑",
      successText: "手机号已换绑"
    }));
  });

  it("rejects invalid or unchanged phone numbers", () => {
    expect(validatePhoneChangeValue("123")).toEqual({
      valid: false,
      message: "手机号格式错误"
    });

    expect(validatePhoneChangeValue("13387395714", "13387395714")).toEqual({
      valid: false,
      message: "新手机号不能与当前手机号相同"
    });
  });

  it("accepts a valid new phone number", () => {
    expect(validatePhoneChangeValue(" 17364071058 ", "13387395714")).toEqual({
      valid: true,
      phone: "17364071058"
    });
  });

  it("validates six-digit sms codes", () => {
    expect(validateSmsCodeValue("")).toEqual({
      valid: false,
      message: "验证码不能为空"
    });

    expect(validateSmsCodeValue("1234")).toEqual({
      valid: false,
      message: "请输入6位验证码"
    });

    expect(validateSmsCodeValue(" 123456 ")).toEqual({
      valid: true,
      code: "123456"
    });
  });
});
