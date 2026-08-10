import type { Subject } from "../types/lesson";

export const MOCK_SUBJECTS: Subject[] = [{ id: 3, name: "Tiếng Anh" }];

export function getMockSubjects(): Subject[] {
  return MOCK_SUBJECTS;
}
