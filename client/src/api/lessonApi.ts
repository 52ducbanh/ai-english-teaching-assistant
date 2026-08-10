import type { Lesson } from "../types/lesson";
import { get } from "./httpClient";

export async function fetchLessonsApi(subjectId: number, gradeId: number): Promise<Lesson[]> {
  return get<Lesson[]>("/curriculum/lessons", {
    subjectId: String(subjectId),
    gradeId: String(gradeId),
  });
}
