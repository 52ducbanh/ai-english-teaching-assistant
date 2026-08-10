import type { Grade } from "../types/lesson";
import { getMockGradesBySubject } from "../mocks/grades.mock";
import { fetchGradesApi } from "../api/gradeApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function getGradesBySubject(subjectId: number): Promise<Grade[]> {
  if (USE_MOCK) {
    return getMockGradesBySubject(subjectId);
  }

  return fetchGradesApi(subjectId);
}
