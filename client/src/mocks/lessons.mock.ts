import type { Lesson } from "../types/lesson";

const MOCK_LESSONS: Record<string, Lesson[]> = {
  "3-3": [
    { id: 1, name: "Unit 1: Hello!" },
    { id: 2, name: "Unit 2: My Family" },
    { id: 3, name: "Unit 3: My School" },
  ],
  "3-6": [
    { id: 4, name: "Unit 1: My New School" },
    { id: 5, name: "Unit 2: My House" },
    { id: 6, name: "Unit 3: My Friends" },
    { id: 7, name: "Unit 4: My Neighbourhood" },
  ],
  "3-7": [
    { id: 8, name: "Unit 1: My Hobbies" },
    { id: 9, name: "Unit 2: Health" },
    { id: 10, name: "Unit 3: Community Services" },
  ],
};

export function getMockLessons(subjectId: number, gradeId: number): Lesson[] {
  return MOCK_LESSONS[`${subjectId}-${gradeId}`] ?? [];
}
