import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "…")[] = [];

  pages.push(1);

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("…");

  pages.push(total);

  return pages;
}

export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }: PaginationProps) {
  const safeTotalPages = Math.max(1, totalPages);
  const pageList = buildPageList(currentPage, safeTotalPages);

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <div className={styles.footer}>
      <span className={styles.info}>
        {startItem}–{endItem} / {totalItems} mục
      </span>

      <div className={styles.controls}>
        <button className={styles.btn} onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1} aria-label="Trang trước">
          ‹
        </button>

        {pageList.map((p, idx) =>
          p === "…" ? (
            <span key={`ellipsis-${idx}`} className={styles.ellipsis}>
              …
            </span>
          ) : (
            <button key={p} className={`${styles.btn} ${p === currentPage ? styles.active : ""}`} onClick={() => onPageChange(p as number)}>
              {p}
            </button>
          ),
        )}

        <button className={styles.btn} onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages} aria-label="Trang sau">
          ›
        </button>
      </div>
    </div>
  );
}
