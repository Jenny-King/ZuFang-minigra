const { callCloud } = require("./cloud/call");

function assertNonEmptyString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`${fieldName} 不能为空`);
  }
}

async function submitFeedback(payload = {}) {
  const category = String(payload.category || "").trim();
  const content = String(payload.content || "").trim();
  const contact = String(payload.contact || "").trim();

  assertNonEmptyString(category, "category");
  assertNonEmptyString(content, "content");

  return callCloud("support", "submitFeedback", {
    category,
    content,
    contact
  });
}

module.exports = {
  submitFeedback
};
