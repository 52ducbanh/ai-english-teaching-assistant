import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

export class GetLessonsQueryDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  subjectId!: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  gradeId!: number;
}
