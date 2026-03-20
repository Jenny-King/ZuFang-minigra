const { assertNonEmptyString } = require("../../utils/assert");

async function uploadToCloud(filePath, cloudPath) {
  assertNonEmptyString(filePath, "filePath");
  assertNonEmptyString(cloudPath, "cloudPath");

  const uploadRes = await wx.cloud.uploadFile({
    cloudPath: cloudPath.trim(),
    filePath: filePath.trim()
  });

  return uploadRes.fileID;
}

module.exports = {
  uploadToCloud
};
