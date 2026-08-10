import type { Grade } from "../types/lesson";
import { get } from "./httpClient";

export async function fetchGradesApi(subjectId: number): Promise<Grade[]> {
  return get<Grade[]>(`/curriculum/subjects/${subjectId}/grades`);
}
