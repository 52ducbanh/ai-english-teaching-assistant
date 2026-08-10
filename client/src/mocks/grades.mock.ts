import type { Grade } from "../types/lesson";

const MOCK_SUBJECT_GRADES: Record<number, Grade[]> = {
  3: Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Khối ${i + 1}`,
  })),
};

export function getMockGradesBySubject(subjectId: number): Grade[] {
  return MOCK_SUBJECT_GRADES[subjectId] ?? [];
}
