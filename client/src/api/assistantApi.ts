import type { AssistantChatRequest, AssistantChatResponse } from "../types/ai";
import type { AssistantDataResponse, GetAssistantRequest } from "../types/assistant";
import { get, post } from "./httpClient";

export async function fetchAssistantApi(req: GetAssistantRequest): Promise<AssistantDataResponse> {
  return get<AssistantDataResponse>("/assistant", {
    subjectId: String(req.subjectId),
    gradeId: String(req.gradeId),
    lessonId: String(req.lessonId),
  });
}

export async function sendAssistantChatApi(request: AssistantChatRequest): Promise<AssistantChatResponse> {
  return post<AssistantChatResponse>("/assistant/chat", request);
}
