const { callCloud } = require("./cloud/call");
const { assertNonEmptyString } = require("../utils/assert");

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
