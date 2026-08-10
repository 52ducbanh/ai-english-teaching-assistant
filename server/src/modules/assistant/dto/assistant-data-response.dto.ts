export interface VocabularyResponseDto {
  id: string;
  word: string;
  phonetic: string;
  meaning: string;
}

export interface SentenceResponseDto {
  id: string;
  english: string;
  vietnamese: string;
}

export interface QuestionResponseDto {
  id: string;
  question: string;
  hint: string;
}

export interface LessonResponseDto {
  id: string;
  name: string;
  grade: number;
  subject: string;
}

export interface AssistantDataResponseDto {
  lesson: LessonResponseDto;
  vocabularies: VocabularyResponseDto[];
  sentences: SentenceResponseDto[];
  questions: QuestionResponseDto[];
}
