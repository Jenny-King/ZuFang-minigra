/**
 * 上传文件到微信云存储
 * @returns 云文件 ID (fileID)
 */
export function uploadToCloud(filePath: string, cloudPath: string): Promise<string>;
