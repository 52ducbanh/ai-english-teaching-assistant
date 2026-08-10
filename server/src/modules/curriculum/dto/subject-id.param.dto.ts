import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class SubjectIdParamDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  subjectId!: number;
}
