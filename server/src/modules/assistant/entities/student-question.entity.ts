import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Lesson } from "../../curriculum/entities/lesson.entity";

@Entity("student_questions")
export class StudentQuestion {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "lesson_id", type: "bigint" })
  lessonId: number;

  @Column({ type: "text" })
  question: string;

  @Column({ name: "suggested_answer", type: "text" })
  suggestedAnswer: string;

  @Column({ name: "order_number", type: "int", nullable: true })
  orderNumber: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.questions)
  @JoinColumn({ name: "lesson_id" })
  lesson: Lesson;
}
