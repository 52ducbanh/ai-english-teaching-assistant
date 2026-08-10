import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Subject } from "./entities/subject.entity";
import { CurriculumOptionDto } from "./dto/curriculum-response.dto";
import { SubjectGrade } from "./entities/subject-grade.entity";
import { Lesson } from "./entities/lesson.entity";

@Injectable()
export class CurriculumService {
  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
    @InjectRepository(SubjectGrade)
    private readonly subjectGradeRepo: Repository<SubjectGrade>,
    @InjectRepository(Lesson)
    private readonly lessonRepo: Repository<Lesson>,
  ) {}

  async getSubjects(): Promise<CurriculumOptionDto[]> {
    const subjects = await this.subjectRepo.find({
      order: { name: "ASC" },
    });

    return subjects.map((subject) => ({
      id: Number(subject.id),
      name: subject.name,
    }));
  }

  async getGradesBySubjectId(subjectId: number): Promise<CurriculumOptionDto[]> {
    const subject = await this.subjectRepo.findOneBy({ id: subjectId });

    if (!subject) {
      throw new NotFoundException(`Subject with id ${subjectId} was not found.`);
    }

    const subjectGrades = await this.subjectGradeRepo.find({
      where: { subjectId },
      relations: ["grade"],
    });

    return subjectGrades
      .sort((left, right) => left.grade.gradeNumber - right.grade.gradeNumber)
      .map((subjectGrade) => ({
        id: Number(subjectGrade.grade.id),
        name: subjectGrade.grade.name,
      }));
  }

  async getLessons(subjectId: number, gradeId: number): Promise<CurriculumOptionDto[]> {
    const subjectGrade = await this.subjectGradeRepo.findOne({
      where: { subjectId, gradeId },
    });

    if (!subjectGrade) return [];

    const lessons = await this.lessonRepo.find({
      where: { subjectGradeId: Number(subjectGrade.id) },
      order: { orderNumber: "ASC" },
    });

    return lessons.map((lesson) => ({
      id: Number(lesson.id),
      name: lesson.name,
    }));
  }
}
