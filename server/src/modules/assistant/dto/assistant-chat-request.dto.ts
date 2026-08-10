import { Transform, Type } from "class-transformer";
import {
  ArrayMaxSize,
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  Min,
  Validate,
  ValidateIf,
  ValidateNested,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { MAX_GEMINI_HISTORY_TURNS, MAX_GEMINI_TURN_CONTENT_LENGTH } from "../../gemini/gemini.constants";

export type AssistantChatHistoryRole = "user" | "model";

const CHAT_HISTORY_ROLES: readonly AssistantChatHistoryRole[] = ["user", "model"];

@ValidatorConstraint({ name: "alternatingAssistantChatHistory", async: false })
class AlternatingAssistantChatHistoryConstraint implements ValidatorConstraintInterface {
  validate(history: unknown): boolean {
    if (!Array.isArray(history)) {
      return false;
    }

    return (
      history.length % 2 === 0 &&
      history.every((item, index) => {
        if (typeof item !== "object" || item === null || !("role" in item)) {
          return false;
        }

        return item.role === (index % 2 === 0 ? "user" : "model");
      })
    );
  }

  defaultMessage(): string {
    return "history must contain complete alternating user/model message pairs, beginning with user and ending with model.";
  }
}

export class AssistantChatHistoryItemDto {
  @IsIn(CHAT_HISTORY_ROLES)
  role!: AssistantChatHistoryRole;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_GEMINI_TURN_CONTENT_LENGTH)
  content!: string;
}

export class AssistantChatRequestDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  subjectId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  gradeId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  lessonId!: number;

  @Transform(({ value }) => (typeof value === "string" ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_GEMINI_TURN_CONTENT_LENGTH)
  message!: string;

  @ValidateIf((_object, value) => value !== undefined)
  @IsArray()
  @ArrayMaxSize(MAX_GEMINI_HISTORY_TURNS)
  @ValidateNested({ each: true })
  @Type(() => AssistantChatHistoryItemDto)
  @Validate(AlternatingAssistantChatHistoryConstraint)
  history?: AssistantChatHistoryItemDto[];
}
