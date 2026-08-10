import { useCallback, useState } from "react";
import styles from "./AssistantPage.module.css";
import LessonSelector from "../../components/LessonSelector/LessonSelector";
import AiAssistantChat from "../../components/AiAssistantChat/AiAssistantChat";
import VocabularyCard from "../../components/VocabularyCard/VocabularyCard";
import SentenceCard from "../../components/SentenceCard/SentenceCard";
import QuestionCard from "../../components/QuestionCard/QuestionCard";
import { useAssistant } from "../../hooks/useAssistant";
import type { GetAssistantRequest } from "../../types/assistant";

const NAV_ITEMS = [
  { id: "home", label: "Trang chủ", icon: "🏠" },
  { id: "lessons", label: "Bài học", icon: "📖" },
  { id: "assistant", label: "Trợ giảng", icon: "🤖", active: true },
  { id: "settings", label: "Cài đặt", icon: "⚙️" },
];

export default function AssistantPage() {
  const { data, isLoading, error, hasFetched, fetchData, reset } = useAssistant();
  const [activeNav, setActiveNav] = useState("assistant");
  const [aiSelection, setAiSelection] = useState<GetAssistantRequest | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSubmit = (req: GetAssistantRequest) => {
    fetchData(req);
  };

  const handleSelectionChange = useCallback(
    (selection: GetAssistantRequest | null) => {
      setAiSelection(selection);
      reset();
    },
    [reset],
  );

  const openAiAssistant = useCallback(() => {
    setIsDrawerOpen(true);
  }, []);

  return (
    <div className={styles.layout}>
      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <div className={styles.logoIcon}>🎓</div>
          <div className={styles.logoText}>
            Module Trợ Giảng
            <br />
            Tiếng Anh
          </div>
        </div>

        <nav className={styles.sidebarNav} aria-label="Điều hướng chính">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`${styles.navItem} ${activeNav === item.id ? styles.active : ""}`}
              onClick={() => setActiveNav(item.id)}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.assistantOutputBadge}>
            <span className={styles.aiBadgeIcon}>✨</span>
            <div className={styles.aiBadgeText}>
              <span className={styles.aiBadgeTitle}>Assistant Output</span>
              <span className={styles.aiBadgeDesc}>Dữ liệu được tạo bởi AI hỗ trợ giảng dạy hiệu quả.</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main content (always full width, never pushed down) ── */}
      <div className={styles.main}>
        <header className={styles.header}>
          <h1 className={styles.headerTitle}>Module Trợ Giảng Tiếng Anh</h1>

          <div className={styles.headerActions}>
            <button id="header-demo-btn" className={styles.demoBtn}>
              Demo
            </button>

            <button id="header-notif-btn" className={styles.notifBtn} aria-label="Thông báo">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className={styles.notifBadge}>3</span>
            </button>

            <div className={styles.userProfile}>
              <div className={styles.avatar}>NL</div>
              <div className={styles.userInfo}>
                <span className={styles.userName}>Trần Vũ Đức</span>
                <span className={styles.userRole}>Giáo viên</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
          </div>
        </header>

        <main className={styles.content}>
          <LessonSelector
            onSubmit={handleSubmit}
            onSelectionChange={handleSelectionChange}
            onOpenAiAssistant={openAiAssistant}
            isLoading={isLoading}
          />

          {isLoading && (
            <div className={styles.loadingState}>
              <div className={styles.spinner} />
              <span className={styles.loadingText}>Đang tải thông tin trợ giảng...</span>
            </div>
          )}

          {!isLoading && error && (
            <div className={styles.errorState}>
              <span>⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {!isLoading && !hasFetched && !error && (
            <div className={styles.emptyState}>
              <span className={styles.emptyIcon}>📚</span>
              <p className={styles.emptyTitle}>Chọn bài học để bắt đầu</p>
              <p className={styles.emptyDesc}>
                Hãy chọn môn học, khối lớp và bài học ở trên, sau đó nhấn
                <strong> "Lấy thông tin trợ giảng"</strong> để xem từ vựng, mẫu câu và câu hỏi gợi ý.
              </p>
            </div>
          )}

          {!isLoading && !error && data && (
            <>
              <div className={styles.statsRow}>
                <div className={styles.statCard}>
                  <div className={`${styles.statIconWrapper} ${styles.vocab}`}>📘</div>
                  <div className={styles.statBody}>
                    <span className={`${styles.statNumber} ${styles.vocab}`}>{data.vocabularies.length}</span>
                    <span className={styles.statLabel}>Từ vựng trọng tâm</span>
                    <span className={styles.statUnit}>mục</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={`${styles.statIconWrapper} ${styles.sentence}`}>💬</div>
                  <div className={styles.statBody}>
                    <span className={`${styles.statNumber} ${styles.sentence}`}>{data.sentences.length}</span>
                    <span className={styles.statLabel}>Mẫu câu giao tiếp</span>
                    <span className={styles.statUnit}>mục</span>
                  </div>
                </div>
                <div className={styles.statCard}>
                  <div className={`${styles.statIconWrapper} ${styles.question}`}>❓</div>
                  <div className={styles.statBody}>
                    <span className={`${styles.statNumber} ${styles.question}`}>{data.questions.length}</span>
                    <span className={styles.statLabel}>Câu hỏi học sinh</span>
                    <span className={styles.statUnit}>mục</span>
                  </div>
                </div>
              </div>

              <div className={styles.resultGrid}>
                <div className={styles.resultPanel}>
                  <VocabularyCard key={`vocabulary-${data.lesson.id}`} vocabularies={data.vocabularies} />
                </div>
                <div className={styles.resultPanel}>
                  <SentenceCard key={`sentence-${data.lesson.id}`} sentences={data.sentences} />
                </div>
                <div className={styles.resultPanel}>
                  <QuestionCard key={`question-${data.lesson.id}`} questions={data.questions} />
                </div>
              </div>

              <div className={styles.footerNotice}>
                <span>ℹ️</span>
                Dữ liệu được tạo bởi AI dựa trên chương trình sách giáo khoa. Vui lòng kiểm tra và điều chỉnh trước khi sử dụng.
              </div>
            </>
          )}
        </main>
      </div>

      {/* ── Floating AI Button (FAB) ── */}
      <button
        id="ai-fab-btn"
        className={`${styles.aiFab} ${isDrawerOpen ? styles.aiFabActive : ""} ${aiSelection ? styles.aiFabReady : ""}`}
        onClick={() => setIsDrawerOpen((prev) => !prev)}
        aria-label="Mở Trợ giảng AI"
        title="Trợ giảng AI"
      >
        <span className={styles.aiFabIcon}>✦</span>
        <span className={styles.aiFabLabel}>AI</span>
        {aiSelection && !isDrawerOpen && <span className={styles.aiFabDot} aria-hidden="true" />}
      </button>

      {/* ── Drawer Overlay (click outside to close) ── */}
      {isDrawerOpen && (
        <div
          className={styles.drawerOverlay}
          onClick={() => setIsDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── AI Chat Drawer ── */}
      <aside
        className={`${styles.aiDrawer} ${isDrawerOpen ? styles.aiDrawerOpen : ""}`}
        aria-label="Trợ giảng AI"
        aria-hidden={!isDrawerOpen}
      >
        <div className={styles.aiDrawerHeader}>
          <div className={styles.aiDrawerTitle}>
            <span className={styles.aiDrawerIcon}>✦</span>
            <span>Trợ giảng AI</span>
          </div>
          <button
            id="ai-drawer-close-btn"
            className={styles.aiDrawerClose}
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Đóng Trợ giảng AI"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.aiDrawerBody}>
          <AiAssistantChat selection={aiSelection} />
        </div>
      </aside>
    </div>
  );
}
