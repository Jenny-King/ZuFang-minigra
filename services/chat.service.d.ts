import {
  ConversationItem,
  ChatMessage,
  MessageType,
  NotificationItem,
  NotificationListResult,
  PaginatedList
} from "./index";

/** 获取会话列表 */
export function getConversationList(params?: Record<string, string | number>): Promise<{
  list: ConversationItem[];
}>;

/** 获取消息列表（分页） */
export function getMessageList(
  conversationId: string,
  page?: number,
  pageSize?: number
): Promise<PaginatedList<ChatMessage>>;

/** 创建或获取已有会话 */
export function createOrGetConversation(
  targetUserId: string,
  houseId: string
): Promise<{ conversationId: string }>;

/** 发送消息 */
export function sendMessage(
  conversationId: string,
  content: string,
  messageType?: MessageType
): Promise<{ messageId: string }>;

/** 上传聊天图片，返回云文件 ID */
export function uploadMessageImage(filePath: string, cloudPath: string): Promise<string>;

/** 标记会话已读 */
export function markConversationRead(conversationId: string): Promise<{ marked: boolean }>;

/** 获取通知列表 */
export function getNotificationList(params?: Record<string, string | number>): Promise<NotificationListResult>;

/** 标记通知已读 */
export function markNotificationRead(messageId: string): Promise<{ marked: boolean }>;
