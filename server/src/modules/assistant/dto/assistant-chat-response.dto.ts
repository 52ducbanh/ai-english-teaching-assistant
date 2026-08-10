import { LessonResponseDto, QuestionResponseDto, SentenceResponseDto, VocabularyResponseDto } from "./assistant-data-response.dto";

export interface AssistantChatContextDto {
  vocabularies: VocabularyResponseDto[];
  sentences: SentenceResponseDto[];
  questions: QuestionResponseDto[];
}

export interface AssistantChatResponseDto {
  message: string;
  lesson: LessonResponseDto;
  context: AssistantChatContextDto;
}
