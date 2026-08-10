import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./AiAssistantChat.module.css";
import { useAssistantChat } from "../../hooks/useAssistantChat";
import type { GetAssistantRequest } from "../../types/assistant";

interface AiAssistantChatProps {
  selection: GetAssistantRequest | null;
}

const QUICK_ACTIONS = [
  {
    icon: "📝",
    label: "Tạo từ vựng",
    prompt: "Hãy tạo 10 từ vựng trọng tâm cho bài học này, kèm từ loại, phiên âm IPA và nghĩa tiếng Việt.",
  },
  {
    icon: "💬",
    label: "Sinh mẫu câu",
    prompt: "Hãy tạo 5 mẫu câu giao tiếp phù hợp với bài học này, kèm nghĩa tiếng Việt và một ví dụ ngắn cho mỗi mẫu.",
  },
  {
    icon: "❓",
    label: "Câu hỏi học sinh",
    prompt: "Hãy gợi ý 5 câu hỏi học sinh có thể hỏi về bài học này, cùng câu trả lời ngắn, dễ hiểu dành cho giáo viên.",
  },
  {
    icon: "▤",
    label: "Tóm tắt bài học",
    prompt: "Hãy tóm tắt nội dung cốt lõi của bài học này bằng tiếng Việt, ngắn gọn để giáo viên chuẩn bị bài giảng.",
  },
  {
    icon: "🎯",
    label: "Mục tiêu bài học",
    prompt: "Hãy đề xuất các mục tiêu học tập rõ ràng, phù hợp với bài học này và cấp lớp đã chọn.",
  },
] as const;

function formatTime(value: Date): string {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(value);
}

export default function AiAssistantChat({ selection }: AiAssistantChatProps) {
  const { messages, isLoading, error, canChat, sendMessage, clearConversation } = useAssistantChat(selection);
  const [draft, setDraft] = useState("");
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [messages, isLoading]);

  const submit = () => {
    if (!draft.trim() || !canChat || isLoading) return;
    sendMessage(draft);
    setDraft("");
  };

  const handleQuickAction = (prompt: string) => {
    if (!canChat || isLoading) return;
    sendMessage(prompt);
    inputRef.current?.focus();
  };

  return (
    <section id="ai-assistant-chat" className={styles.chatCard} aria-labelledby="ai-assistant-heading">
      <div className={styles.cardHeader}>
        <div className={styles.titleGroup}>
          <div className={styles.assistantIcon} aria-hidden="true">
            ✦
          </div>
          <div>
            <div className={styles.titleRow}>
              <h2 id="ai-assistant-heading">Trợ giảng AI</h2>
              <span className={`${styles.status} ${canChat ? styles.ready : ""}`}>{canChat ? "Sẵn sàng hỗ trợ" : "Chọn bài học để bắt đầu"}</span>
            </div>
            {canChat && <p className={styles.context}>AI sẽ dùng môn học, khối lớp và bài học đang chọn làm ngữ cảnh.</p>}
          </div>
        </div>

        <div className={styles.headerActions}>
          <div className={styles.historyWrap}>
            <button
              type="button"
              className={styles.historyBtn}
              onClick={() => setIsHistoryOpen((open) => !open)}
              aria-expanded={isHistoryOpen}
              aria-controls="ai-conversation-actions"
            >
              <span aria-hidden="true">◷</span>
              Lịch sử hội thoại
            </button>
            {isHistoryOpen && (
              <div id="ai-conversation-actions" className={styles.historyMenu}>
                <p>{messages.length ? `Hội thoại hiện tại có ${messages.length} tin nhắn.` : "Chưa có hội thoại nào."}</p>
                <button type="button" onClick={clearConversation} disabled={!canChat || isLoading}>
                  Làm mới hội thoại
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!canChat ? (
        <div className={styles.selectionEmpty}>
          <span className={styles.emptySparkle} aria-hidden="true">
            ✦
          </span>
          <div>
            <strong>Hãy chọn môn học, khối lớp và bài học.</strong>
            <p>Sau đó, Trợ giảng AI sẽ tạo nội dung đúng với ngữ cảnh bài giảng của bạn.</p>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.messageList} aria-live="polite" aria-busy={isLoading}>
            {messages.map((message) => (
              <div key={message.id} className={`${styles.messageRow} ${message.role === "user" ? styles.userRow : styles.assistantRow}`}>
                {message.role === "assistant" && (
                  <div className={styles.messageAvatar} aria-hidden="true">
                    ✦
                  </div>
                )}
                <div className={`${styles.messageBubble} ${message.role === "user" ? styles.userBubble : styles.assistantBubble}`}>
                  {message.role === "assistant" ? (
                    <div className={styles.markdownBody}>
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                  ) : (
                    <p>{message.content}</p>
                  )}
                  <time dateTime={message.createdAt.toISOString()}>{formatTime(message.createdAt)}</time>
                </div>
                {message.role === "user" && (
                  <div className={`${styles.messageAvatar} ${styles.userAvatar}`} aria-hidden="true">
                    GV
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className={`${styles.messageRow} ${styles.assistantRow}`}>
                <div className={styles.messageAvatar} aria-hidden="true">
                  ✦
                </div>
                <div className={`${styles.messageBubble} ${styles.typingBubble}`}>
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}
            <div ref={messageEndRef} />
          </div>

          {error && <div className={styles.errorNotice}>{error}</div>}

          <div className={styles.quickActions} aria-label="Gợi ý nhanh cho Trợ giảng AI">
            {QUICK_ACTIONS.map((action) => (
              <button key={action.label} type="button" onClick={() => handleQuickAction(action.prompt)} disabled={isLoading}>
                <span aria-hidden="true">{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div className={`${styles.composer} ${!canChat ? styles.composerDisabled : ""}`}>
        <textarea
          ref={inputRef}
          id="ai-prompt"
          value={draft}
          rows={1}
          maxLength={2_000}
          placeholder={canChat ? "Nhập yêu cầu cho AI… Ví dụ: Hãy tạo 10 từ vựng trọng tâm cho bài này" : "Chọn bài học để gửi yêu cầu cho AI"}
          disabled={!canChat || isLoading}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
        />
        <button type="button" className={styles.sendBtn} onClick={submit} disabled={!canChat || isLoading || !draft.trim()} aria-label="Gửi yêu cầu cho Trợ giảng AI">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
            <path d="m22 2-7 20-4-9-9-4Z" />
            <path d="M22 2 11 13" />
          </svg>
        </button>
      </div>
      <p className={styles.helperText}>AI có thể hỗ trợ soạn nội dung, nhưng giáo viên nên kiểm tra và điều chỉnh trước khi sử dụng.</p>
    </section>
  );
}
