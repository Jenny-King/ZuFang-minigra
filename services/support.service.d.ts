import { FeedbackPayload } from "./index";

/** 提交用户反馈 */
export function submitFeedback(payload: FeedbackPayload): Promise<{ submitted: boolean }>;
