import { useCallback, useEffect, useRef, useState } from "react";
import { chatWithAssistant } from "../services/assistant.service";
import type { ChatMessage } from "../types/ai";
import type { GetAssistantRequest } from "../types/assistant";

function createMessage(role: ChatMessage["role"], content: string): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    role,
    content,
    createdAt: new Date(),
  };
}

function createWelcomeMessage(): ChatMessage {
  return createMessage(
    "assistant",
    "Mình đã sẵn sàng hỗ trợ bài học này. Bạn có thể yêu cầu tạo từ vựng, mẫu câu, câu hỏi gợi mở, tóm tắt hoặc mục tiêu bài học.",
  );
}

export function useAssistantChat(selection: GetAssistantRequest | null) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const selectionKey = selection ? `${selection.subjectId}-${selection.gradeId}-${selection.lessonId}` : "";

  useEffect(() => {
    requestIdRef.current += 1;
    setIsLoading(false);
    setError(null);
    setMessages(selectionKey ? [createWelcomeMessage()] : []);
  }, [selectionKey]);

  const sendMessage = useCallback(
    async (content: string) => {
      const message = content.trim();
      if (!selection || !message || isLoading) return;

      const requestId = ++requestIdRef.current;
      const completedConversation = messages.slice(1);

      // A failed request leaves a user message without a matching AI answer.
      // Gemini receives only completed user/model pairs as conversation context.
      while (completedConversation.at(-1)?.role === "user") {
        completedConversation.pop();
      }

      const history = completedConversation
        .slice(-10)
        .map((previousMessage) => ({
          role: previousMessage.role === "assistant" ? ("model" as const) : ("user" as const),
          content: previousMessage.content.slice(0, 2_000),
        }));
      setError(null);
      setIsLoading(true);
      setMessages((current) => [...current, createMessage("user", message)]);

      try {
        const response = await chatWithAssistant({ ...selection, message, history });
        if (requestId !== requestIdRef.current) return;
        setMessages((current) => [...current, createMessage("assistant", response.message)]);
      } catch (requestError) {
        if (requestId !== requestIdRef.current) return;
        setError(requestError instanceof Error ? requestError.message : "Không thể kết nối với Trợ giảng AI.");
      } finally {
        if (requestId === requestIdRef.current) setIsLoading(false);
      }
    },
    [isLoading, messages, selection],
  );

  const clearConversation = useCallback(() => {
    requestIdRef.current += 1;
    setIsLoading(false);
    setError(null);
    setMessages(selection ? [createWelcomeMessage()] : []);
  }, [selection]);

  return {
    messages,
    isLoading,
    error,
    canChat: selection !== null,
    sendMessage,
    clearConversation,
  };
}
