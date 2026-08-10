export interface Vocabulary {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
  example?: string;
}

export interface Sentence {
  id: string;
  english: string;
  vietnamese: string;
}

export interface Question {
  id: string;
  question: string;
  hint: string;
}

export interface LessonInfo {
  id: string;
  name: string;
  grade: number;
  subject: string;
}

export interface AssistantDataResponse {
  lesson: LessonInfo;
  vocabularies: Vocabulary[];
  sentences: Sentence[];
  questions: Question[];
}

export interface GetAssistantRequest {
  subjectId: number;
  gradeId: number;
  lessonId: number;
}
