import { Controller, Get, Param, Query } from "@nestjs/common";
import { CurriculumService } from "./curriculum.service";
import { CurriculumOptionDto } from "./dto/curriculum-response.dto";
import { GetLessonsQueryDto } from "./dto/get-lessons.query.dto";
import { SubjectIdParamDto } from "./dto/subject-id.param.dto";

@Controller("curriculum")
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Get("subjects")
  getSubjects(): Promise<CurriculumOptionDto[]> {
    return this.curriculumService.getSubjects();
  }

  @Get("subjects/:subjectId/grades")
  getGrades(@Param() { subjectId }: SubjectIdParamDto): Promise<CurriculumOptionDto[]> {
    return this.curriculumService.getGradesBySubjectId(subjectId);
  }

  @Get("lessons")
  getLessons(@Query() { subjectId, gradeId }: GetLessonsQueryDto): Promise<CurriculumOptionDto[]> {
    return this.curriculumService.getLessons(subjectId, gradeId);
  }
}
