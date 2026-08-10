import type { Lesson } from "../types/lesson";
import { getMockLessons } from "../mocks/lessons.mock";
import { fetchLessonsApi } from "../api/lessonApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function getLessons(subjectId: number, gradeId: number): Promise<Lesson[]> {
  if (USE_MOCK) {
    return getMockLessons(subjectId, gradeId);
  }

  return fetchLessonsApi(subjectId, gradeId);
}
