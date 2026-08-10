import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { SubjectGrade } from "./subject-grade.entity";
import { Vocabulary } from "../../assistant/entities/vocabulary.entity";
import { CommunicationPattern } from "../../assistant/entities/communication-pattern.entity";
import { StudentQuestion } from "../../assistant/entities/student-question.entity";

@Entity("lessons")
export class Lesson {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "subject_grade_id", type: "bigint" })
  subjectGradeId: number;

  @Column({ type: "varchar", length: 100, nullable: true })
  code: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ name: "order_number", type: "int" })
  orderNumber: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => SubjectGrade, (sg) => sg.lessons)
  @JoinColumn({ name: "subject_grade_id" })
  subjectGrade: SubjectGrade;

  @OneToMany(() => Vocabulary, (vocab) => vocab.lesson)
  vocabularies: Vocabulary[];

  @OneToMany(() => CommunicationPattern, (pattern) => pattern.lesson)
  patterns: CommunicationPattern[];

  @OneToMany(() => StudentQuestion, (question) => question.lesson)
  questions: StudentQuestion[];
}
