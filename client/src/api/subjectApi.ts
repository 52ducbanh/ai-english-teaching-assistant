import type { Subject } from "../types/lesson";
import { get } from "./httpClient";

export async function fetchSubjectsApi(): Promise<Subject[]> {
  return get<Subject[]>("/curriculum/subjects");
}
