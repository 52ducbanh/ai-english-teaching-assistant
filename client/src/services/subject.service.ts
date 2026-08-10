import type { Subject } from "../types/lesson";
import { getMockSubjects } from "../mocks/subjects.mock";
import { fetchSubjectsApi } from "../api/subjectApi";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export async function getSubjects(): Promise<Subject[]> {
  if (USE_MOCK) {
    return getMockSubjects();
  }

  return fetchSubjectsApi();
}
