import styles from "./SentenceCard.module.css";
import Pagination from "../Pagination/Pagination";
import SearchInput from "../SearchInput/SearchInput";
import { useSearchAndPagination } from "../../hooks/useSearchAndPagination";
import type { Sentence } from "../../types/assistant";

const PAGE_SIZE = 4;

const filterSentence = (s: Sentence, q: string): boolean => s.english.toLowerCase().includes(q) || s.vietnamese.toLowerCase().includes(q);

interface SentenceCardProps {
  sentences: Sentence[];
}

export default function SentenceCard({ sentences }: SentenceCardProps) {
  const { search, currentPage, totalPages, filtered, paged, handleSearch, setPage } = useSearchAndPagination(sentences, filterSentence, PAGE_SIZE);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <div className={styles.badge}>B</div>
          <span className={styles.sectionTitleText}>Mẫu câu giao tiếp</span>
        </div>
      </div>

      <div className={styles.searchRow}>
        <SearchInput
          id="sentence-search"
          value={search}
          placeholder="Tìm mẫu câu..."
          onChange={handleSearch}
          accentColor="var(--color-accent-sentence)"
          accentGlow="rgba(167, 139, 250, 0.1)"
        />
      </div>

      <div className={styles.tableWrapper}>
        {paged.length === 0 ? (
          <div className={styles.emptyState}>Không tìm thấy mẫu câu phù hợp.</div>
        ) : (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr>
                <th>Mẫu câu tiếng Anh</th>
                <th>Nghĩa tiếng Việt</th>
              </tr>
            </thead>
            <tbody>
              {paged.map((s) => (
                <tr key={s.id} className={styles.tableRow}>
                  <td className={styles.englishCell}>{s.english}</td>
                  <td className={styles.vietnameseCell}>{s.vietnamese}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
    </div>
  );
}
