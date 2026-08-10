import type { GetAssistantRequest } from "./assistant";

export interface AssistantChatHistoryTurn {
  role: "model" | "user";
  content: string;
}

export interface AssistantChatRequest extends GetAssistantRequest {
  message: string;
  history?: AssistantChatHistoryTurn[];
}

export interface AssistantChatResponse {
  message: string;
}

export interface ChatMessage {
  id: string;
  role: "assistant" | "user";
  content: string;
  createdAt: Date;
}
