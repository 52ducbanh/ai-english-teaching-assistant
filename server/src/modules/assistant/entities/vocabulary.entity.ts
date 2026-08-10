import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Lesson } from "../../curriculum/entities/lesson.entity";

@Entity("vocabularies")
export class Vocabulary {
  @PrimaryGeneratedColumn("increment", { type: "bigint" })
  id: number;

  @Column({ name: "lesson_id", type: "bigint" })
  lessonId: number;

  @Column({ type: "varchar", length: 255 })
  word: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  phonetic: string;

  @Column({ name: "meaning_vi", type: "text" })
  meaningVi: string;

  @Column({ name: "order_number", type: "int", nullable: true })
  orderNumber: number;

  @ManyToOne(() => Lesson, (lesson) => lesson.vocabularies)
  @JoinColumn({ name: "lesson_id" })
  lesson: Lesson;
}
