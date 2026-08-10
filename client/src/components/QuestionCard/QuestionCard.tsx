import { useState } from "react";
import styles from "./QuestionCard.module.css";
import Pagination from "../Pagination/Pagination";
import SearchInput from "../SearchInput/SearchInput";
import { useSearchAndPagination } from "../../hooks/useSearchAndPagination";
import type { Question } from "../../types/assistant";

const PAGE_SIZE = 4;

const filterQuestion = (q: Question, query: string): boolean => q.question.toLowerCase().includes(query) || q.hint.toLowerCase().includes(query);

interface QuestionCardProps {
  questions: Question[];
}

export default function QuestionCard({ questions }: QuestionCardProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const { search, currentPage, totalPages, filtered, paged, handleSearch, setPage } = useSearchAndPagination(questions, filterQuestion, PAGE_SIZE);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const handlePageChange = (p: number) => {
    setPage(p);
    setOpenId(null);
  };

  const handleSearchWithReset = (val: string) => {
    handleSearch(val);
    setOpenId(null);
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <div className={styles.badge}>C</div>
          <span className={styles.sectionTitleText}>Câu hỏi học sinh có thể hỏi</span>
        </div>
      </div>

      <div className={styles.searchRow}>
        <SearchInput
          id="question-search"
          value={search}
          placeholder="Tìm câu hỏi..."
          onChange={handleSearchWithReset}
          accentColor="var(--color-accent-question)"
          accentGlow="rgba(52, 211, 153, 0.1)"
        />
      </div>

      <div className={styles.list}>
        {paged.length === 0 ? (
          <div className={styles.emptyState}>Không tìm thấy câu hỏi phù hợp.</div>
        ) : (
          paged.map((q, idx) => (
            <div key={q.id} className={`${styles.item} ${openId === q.id ? styles.open : ""}`}>
              <button
                type="button"
                id={`question-${q.id}`}
                className={styles.questionRow}
                onClick={() => toggle(q.id)}
                aria-expanded={openId === q.id}
                aria-controls={`question-answer-${q.id}`}
              >
                <span className={styles.numberBadge}>{(currentPage - 1) * PAGE_SIZE + idx + 1}</span>
                <span className={styles.questionText}>{q.question}</span>
                <svg
                  className={styles.chevron}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div id={`question-answer-${q.id}`} className={styles.answer} role="region" aria-labelledby={`question-${q.id}`} hidden={openId !== q.id}>
                <div className={styles.answerLabel}>Gợi ý trả lời / Đáp án:</div>
                {q.hint}
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={handlePageChange} />
    </div>
  );
}
