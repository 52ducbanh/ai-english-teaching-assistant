import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CurriculumController } from "./curriculum.controller";
import { CurriculumService } from "./curriculum.service";
import { Subject } from "./entities/subject.entity";
import { SubjectGrade } from "./entities/subject-grade.entity";
import { Lesson } from "./entities/lesson.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Subject, SubjectGrade, Lesson])],
  controllers: [CurriculumController],
  providers: [CurriculumService],
})
export class CurriculumModule {}
