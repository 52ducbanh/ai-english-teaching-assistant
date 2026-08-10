import { useEffect } from "react";
import styles from "./LessonSelector.module.css";
import { useLessonSelection } from "../../hooks/useLessonSelection";
import type { GetAssistantRequest } from "../../types/assistant";

interface LessonSelectorProps {
  onSubmit: (req: GetAssistantRequest) => void;
  onSelectionChange: (selection: GetAssistantRequest | null) => void;
  onOpenAiAssistant: () => void;
  isLoading: boolean;
}

export default function LessonSelector({ onSubmit, onSelectionChange, onOpenAiAssistant, isLoading }: LessonSelectorProps) {
  const { subjects, grades, lessons, selection, loading, errors, placeholders, canSubmit, onSubjectChange, onGradeChange, onLessonChange } =
    useLessonSelection();

  useEffect(() => {
    if (!canSubmit) {
      onSelectionChange(null);
      return;
    }

    onSelectionChange({
      subjectId: selection.subjectId!,
      gradeId: selection.gradeId!,
      lessonId: selection.lessonId!,
    });
  }, [canSubmit, onSelectionChange, selection.gradeId, selection.lessonId, selection.subjectId]);

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({
      subjectId: selection.subjectId!,
      gradeId: selection.gradeId!,
      lessonId: selection.lessonId!,
    });
  };

  const handleSubjectChange = (value: string) => {
    if (Number(value) === selection.subjectId) return;
    onSubjectChange(value);
  };

  const handleGradeChange = (value: string) => {
    if (Number(value) === selection.gradeId) return;
    onGradeChange(value);
  };

  const handleLessonChange = (value: string) => {
    if (Number(value) === selection.lessonId) return;
    onLessonChange(value);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.stepBadge}>1</div>
        <h2 className={styles.title}>Chọn bài học</h2>
      </div>

      <div className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="select-subject">
            Môn học
          </label>
          <select
            id="select-subject"
            className={`${styles.select} ${errors.subjects ? styles.selectError : ""}`}
            value={selection.subjectId ?? ""}
            onChange={(e) => handleSubjectChange(e.target.value)}
            disabled={isLoading || loading.subjects}
          >
            <option value="" disabled>
              {placeholders.subject}
            </option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.subjects && <span className={styles.errorMsg}>{errors.subjects}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="select-grade">
            Khối lớp
          </label>
          <select
            id="select-grade"
            className={`${styles.select} ${errors.grades ? styles.selectError : ""}`}
            value={selection.gradeId ?? ""}
            onChange={(e) => handleGradeChange(e.target.value)}
            disabled={isLoading || selection.subjectId === null || loading.grades || grades.length === 0}
          >
            <option value="" disabled>
              {placeholders.grade}
            </option>
            {grades.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
          {errors.grades && <span className={styles.errorMsg}>{errors.grades}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="select-lesson">
            Bài học
          </label>
          <select
            id="select-lesson"
            className={`${styles.select} ${errors.lessons ? styles.selectError : ""}`}
            value={selection.lessonId ?? ""}
            onChange={(e) => handleLessonChange(e.target.value)}
            disabled={isLoading || !selection.subjectId || !selection.gradeId || loading.lessons || lessons.length === 0}
          >
            <option value="" disabled>
              {placeholders.lesson}
            </option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name}
              </option>
            ))}
          </select>
          {errors.lessons && <span className={styles.errorMsg}>{errors.lessons}</span>}
        </div>

        <div className={styles.actionButtons}>
          <button id="btn-open-ai-assistant" type="button" className={styles.aiAssistantBtn} onClick={onOpenAiAssistant} disabled={isLoading || !canSubmit}>
            <span className={styles.submitIcon}>✦</span>
            AI Trợ giảng
          </button>
          <button id="btn-fetch-assistant" type="button" className={styles.submitBtn} onClick={handleSubmit} disabled={isLoading || !canSubmit}>
          {isLoading ? (
            <>
              <span>⏳</span>
              Đang tải...
            </>
          ) : (
            <>
              <span className={styles.submitIcon}>✦</span>
              Lấy thông tin trợ giảng
            </>
          )}
          </button>
        </div>
      </div>

      <div className={styles.hint}>
        <svg className={styles.hintIcon} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
        Hệ thống sẽ trả về từ vựng trọng tâm, mẫu câu giao tiếp và các câu hỏi học sinh có thể hỏi.
      </div>
    </section>
  );
}
