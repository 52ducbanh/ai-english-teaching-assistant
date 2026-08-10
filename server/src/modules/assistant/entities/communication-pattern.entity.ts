import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Lesson } from "../../curriculum/entities/lesson.entity";

@Entity("communication_patterns")
export class CommunicationPattern {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "lesson_id", type: "bigint" })
  lessonId: number;

  @Column({ name: "english_pattern", type: "text" })
  englishPattern: string;

  @Column({ name: "meaning_vi", type: "text" })
  meaningVi: string;

  @Column({ name: "order_number", type: "int", nullable: true })
  orderNumber: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.patterns)
  @JoinColumn({ name: "lesson_id" })
  lesson: Lesson;
}
