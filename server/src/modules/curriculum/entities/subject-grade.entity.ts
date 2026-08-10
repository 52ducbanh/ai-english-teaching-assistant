import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, OneToMany, Unique } from "typeorm";
import { Subject } from "./subject.entity";
import { Grade } from "./grade.entity";
import { Lesson } from "./lesson.entity";

@Entity("subject_grades")
@Unique(["subjectId", "gradeId"])
export class SubjectGrade {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "subject_id", type: "bigint" })
  subjectId: number;

  @Column({ name: "grade_id", type: "bigint" })
  gradeId: number;

  @ManyToOne(() => Subject, (subject) => subject.subjectGrades)
  @JoinColumn({ name: "subject_id" })
  subject: Subject;

  @ManyToOne(() => Grade, (grade) => grade.subjectGrades)
  @JoinColumn({ name: "grade_id" })
  grade: Grade;

  @OneToMany(() => Lesson, (lesson) => lesson.subjectGrade)
  lessons: Lesson[];
}
