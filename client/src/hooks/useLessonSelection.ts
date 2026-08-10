import { useCallback, useEffect, useState } from "react";
import type { Subject, Grade, Lesson } from "../types/lesson";
import { getSubjects } from "../services/subject.service";
import { getGradesBySubject } from "../services/grade.service";
import { getLessons } from "../services/lesson.service";
import { ERROR_MESSAGES, PLACEHOLDER_MESSAGES } from "../constants/messages";

interface SelectionState {
  subjectId: number | null;
  gradeId: number | null;
  lessonId: number | null;
}

interface FetchState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
}

const initialFetch = <T>(): FetchState<T> => ({
  data: [],
  loading: false,
  error: null,
});

function useFetchOnChange<T>(trigger: unknown, fetchFn: () => Promise<T[]>, errorMsg: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>(initialFetch<T>());

  useEffect(() => {
    let cancelled = false;
    setState({ data: [], loading: true, error: null });

    fetchFn()
      .then((data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      })
      .catch(() => {
        if (!cancelled) setState({ data: [], loading: false, error: errorMsg });
      });

    return () => {
      cancelled = true;
    };
  }, [trigger, fetchFn, errorMsg]);

  return state;
}

export interface UseLessonSelectionReturn {
  subjects: Subject[];
  grades: Grade[];
  lessons: Lesson[];
  selection: SelectionState;
  loading: { subjects: boolean; grades: boolean; lessons: boolean };
  errors: {
    subjects: string | null;
    grades: string | null;
    lessons: string | null;
  };
  placeholders: { subject: string; grade: string; lesson: string };
  canSubmit: boolean;
  onSubjectChange: (value: string) => void;
  onGradeChange: (value: string) => void;
  onLessonChange: (value: string) => void;
}

export function useLessonSelection(): UseLessonSelectionReturn {
  const [selection, setSelection] = useState<SelectionState>({
    subjectId: null,
    gradeId: null,
    lessonId: null,
  });

  const subjectsFetch = useFetchOnChange<Subject>(true, getSubjects, ERROR_MESSAGES.LOAD_SUBJECTS);

  const fetchGrades = useCallback(() => (selection.subjectId !== null ? getGradesBySubject(selection.subjectId) : Promise.resolve([])), [selection.subjectId]);

  const gradesFetch = useFetchOnChange<Grade>(selection.subjectId, fetchGrades, ERROR_MESSAGES.LOAD_GRADES);

  const fetchLessons = useCallback(
    () => (selection.subjectId !== null && selection.gradeId !== null ? getLessons(selection.subjectId, selection.gradeId) : Promise.resolve([])),
    [selection.gradeId, selection.subjectId],
  );

  const lessonsFetch = useFetchOnChange<Lesson>(selection.gradeId, fetchLessons, ERROR_MESSAGES.LOAD_LESSONS);

  const onSubjectChange = (value: string) => {
    setSelection({ subjectId: Number(value), gradeId: null, lessonId: null });
  };

  const onGradeChange = (value: string) => {
    setSelection((prev) => ({
      ...prev,
      gradeId: Number(value),
      lessonId: null,
    }));
  };

  const onLessonChange = (value: string) => {
    setSelection((prev) => ({ ...prev, lessonId: Number(value) }));
  };

  const getSubjectPlaceholder = (): string => {
    if (subjectsFetch.loading) return PLACEHOLDER_MESSAGES.LOADING_SUBJECTS;
    if (subjectsFetch.error) return ERROR_MESSAGES.LOAD_SUBJECTS;
    return PLACEHOLDER_MESSAGES.SELECT_SUBJECT;
  };

  const getGradePlaceholder = (): string => {
    if (gradesFetch.loading) return PLACEHOLDER_MESSAGES.LOADING_GRADES;
    if (gradesFetch.error) return ERROR_MESSAGES.LOAD_GRADES;
    if (selection.subjectId === null) return PLACEHOLDER_MESSAGES.SELECT_GRADE;
    if (gradesFetch.data.length === 0) return PLACEHOLDER_MESSAGES.NO_GRADES;
    return PLACEHOLDER_MESSAGES.SELECT_GRADE;
  };

  const getLessonPlaceholder = (): string => {
    if (lessonsFetch.loading) return PLACEHOLDER_MESSAGES.LOADING_LESSONS;
    if (lessonsFetch.error) return ERROR_MESSAGES.LOAD_LESSONS;
    if (selection.subjectId === null || selection.gradeId === null) return PLACEHOLDER_MESSAGES.SELECT_LESSON;
    if (lessonsFetch.data.length === 0) return PLACEHOLDER_MESSAGES.NO_LESSONS;
    return PLACEHOLDER_MESSAGES.SELECT_LESSON;
  };

  const canSubmit = selection.subjectId !== null && selection.gradeId !== null && selection.lessonId !== null;

  return {
    subjects: subjectsFetch.data,
    grades: gradesFetch.data,
    lessons: lessonsFetch.data,
    selection,
    loading: {
      subjects: subjectsFetch.loading,
      grades: gradesFetch.loading,
      lessons: lessonsFetch.loading,
    },
    errors: {
      subjects: subjectsFetch.error,
      grades: gradesFetch.error,
      lessons: lessonsFetch.error,
    },
    placeholders: {
      subject: getSubjectPlaceholder(),
      grade: getGradePlaceholder(),
      lesson: getLessonPlaceholder(),
    },
    canSubmit,
    onSubjectChange,
    onGradeChange,
    onLessonChange,
  };
}
