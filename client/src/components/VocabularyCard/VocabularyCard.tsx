import styles from "./VocabularyCard.module.css";
import Pagination from "../Pagination/Pagination";
import SearchInput from "../SearchInput/SearchInput";
import { useSearchAndPagination } from "../../hooks/useSearchAndPagination";
import type { Vocabulary } from "../../types/assistant";

const PAGE_SIZE = 5;

const filterVocab = (v: Vocabulary, q: string): boolean =>
  v.word.toLowerCase().includes(q) || v.meaning.toLowerCase().includes(q) || v.phonetic.toLowerCase().includes(q);

interface VocabularyCardProps {
  vocabularies: Vocabulary[];
}

export default function VocabularyCard({ vocabularies }: VocabularyCardProps) {
  const { search, currentPage, totalPages, filtered, paged, handleSearch, setPage } = useSearchAndPagination(vocabularies, filterVocab, PAGE_SIZE);

  return (
    <div className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionTitle}>
          <div className={styles.badge}>A</div>
          <span className={styles.sectionTitleText}>Từ vựng trọng tâm</span>
        </div>
      </div>

      <div className={styles.searchRow}>
        <SearchInput id="vocab-search" value={search} placeholder="Tìm từ vựng..." onChange={handleSearch} />
      </div>

      {paged.length === 0 ? (
        <div className={styles.emptyState}>Không tìm thấy từ vựng phù hợp.</div>
      ) : (
        <table className={styles.table}>
          <thead className={styles.tableHead}>
            <tr>
              <th>Từ vựng</th>
              <th>Phiên âm</th>
              <th>Nghĩa tiếng Việt</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((v) => (
              <tr key={v.id} className={styles.tableRow}>
                <td className={styles.wordCell}>{v.word}</td>
                <td className={styles.phoneticCell}>{v.phonetic}</td>
                <td className={styles.meaningCell}>{v.meaning}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={filtered.length} pageSize={PAGE_SIZE} onPageChange={setPage} />
    </div>
  );
}
