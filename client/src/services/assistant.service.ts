import type { AssistantChatRequest, AssistantChatResponse } from "../types/ai";
import type { AssistantDataResponse, GetAssistantRequest } from "../types/assistant";
import { fetchAssistantApi, sendAssistantChatApi } from "../api/assistantApi";
import { MOCK_DATABASE } from "../mocks/assistant.mock";
import { ERROR_MESSAGES } from "../constants/messages";

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== "false";

export async function getAssistantData(req: GetAssistantRequest): Promise<AssistantDataResponse> {
  if (USE_MOCK) {
    const data = MOCK_DATABASE[req.lessonId];
    if (!data) {
      throw new Error(ERROR_MESSAGES.ASSISTANT_NOT_FOUND(req.lessonId));
    }
    return data;
  }

  return fetchAssistantApi(req);
}

export async function chatWithAssistant(request: AssistantChatRequest): Promise<AssistantChatResponse> {
  return sendAssistantChatApi(request);
}
