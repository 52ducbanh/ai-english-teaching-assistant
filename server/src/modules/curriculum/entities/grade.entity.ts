import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SubjectGrade } from "./subject-grade.entity";

@Entity("grades")
export class Grade {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "grade_number", type: "int", unique: true })
  gradeNumber: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @OneToMany(() => SubjectGrade, (subjectGrade) => subjectGrade.grade)
  subjectGrades: SubjectGrade[];
}
