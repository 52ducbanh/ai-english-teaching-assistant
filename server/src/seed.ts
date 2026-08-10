import { DataSource } from "typeorm";
import { Subject } from "./modules/curriculum/entities/subject.entity";
import { Grade } from "./modules/curriculum/entities/grade.entity";
import { SubjectGrade } from "./modules/curriculum/entities/subject-grade.entity";
import { Lesson } from "./modules/curriculum/entities/lesson.entity";
import { Vocabulary } from "./modules/assistant/entities/vocabulary.entity";
import { CommunicationPattern } from "./modules/assistant/entities/communication-pattern.entity";
import { StudentQuestion } from "./modules/assistant/entities/student-question.entity";
import * as fs from "fs";
import * as path from "path";

import { environment } from "./config/environment.config";

const AppDataSource = new DataSource({
  type: "mysql",
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.name,
  ssl: environment.database.ssl ? { rejectUnauthorized: false } : false,
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false,
});

async function seed() {
  await AppDataSource.initialize();
  console.log("Database connected.");

  // Get or Create "Tiếng Anh" Subject
  let englishSubject = await AppDataSource.getRepository(Subject).findOneBy({ name: "Tiếng Anh" });
  if (!englishSubject) {
    englishSubject = AppDataSource.getRepository(Subject).create({ name: "Tiếng Anh", code: "ENG" });
    await AppDataSource.getRepository(Subject).save(englishSubject);
  }

  // Clear existing lessons and associated data before reseeding
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 0;");
  await AppDataSource.query("TRUNCATE TABLE vocabularies;");
  await AppDataSource.query("TRUNCATE TABLE communication_patterns;");
  await AppDataSource.query("TRUNCATE TABLE student_questions;");
  await AppDataSource.query("TRUNCATE TABLE lessons;");
  await AppDataSource.query("SET FOREIGN_KEY_CHECKS = 1;");
  console.log("Cleared existing lessons and assistant data.");

  // Read KNTT curriculum data
  const curriculumDataPath = path.join(__dirname, "data", "kntt-english.json");
  const curriculumData = JSON.parse(fs.readFileSync(curriculumDataPath, "utf-8"));

  const gradesData = [
    { number: 3, name: "Lớp 3" },
    { number: 4, name: "Lớp 4" },
    { number: 5, name: "Lớp 5" },
    { number: 6, name: "Lớp 6" },
    { number: 7, name: "Lớp 7" },
    { number: 8, name: "Lớp 8" },
    { number: 9, name: "Lớp 9" },
    { number: 10, name: "Lớp 10" },
    { number: 11, name: "Lớp 11" },
    { number: 12, name: "Lớp 12" }
  ];

  for (const gData of gradesData) {
    let grade = await AppDataSource.getRepository(Grade).findOneBy({ gradeNumber: gData.number });
    if (!grade) {
      grade = AppDataSource.getRepository(Grade).create({
        gradeNumber: gData.number,
        name: gData.name,
      });
      await AppDataSource.getRepository(Grade).save(grade);
      console.log(`Created Grade: ${grade.name}`);
    }

    // Link Subject and Grade
    let subjectGrade = await AppDataSource.getRepository(SubjectGrade).findOneBy({
      subjectId: Number(englishSubject.id),
      gradeId: Number(grade.id),
    });

    if (!subjectGrade) {
      subjectGrade = AppDataSource.getRepository(SubjectGrade).create({
        subjectId: Number(englishSubject.id),
        gradeId: Number(grade.id),
      });
      await AppDataSource.getRepository(SubjectGrade).save(subjectGrade);
      console.log(`Created SubjectGrade mapping for ${englishSubject.name} - ${grade.name}`);
    }

    // Insert Lessons for this grade
    const unitTitles = curriculumData[String(gData.number)];
    if (unitTitles && unitTitles.length > 0) {
      let order = 1;
      for (const lessonTitle of unitTitles) {
        const lessonName = `Unit ${order}: ${lessonTitle}`;
        let lesson = await AppDataSource.getRepository(Lesson).findOneBy({ name: lessonName, subjectGradeId: Number(subjectGrade.id) });
        if (!lesson) {
          lesson = AppDataSource.getRepository(Lesson).create({
            subjectGradeId: Number(subjectGrade.id),
            name: lessonName,
            orderNumber: order,
          });
          await AppDataSource.getRepository(Lesson).save(lesson);

          // Seed sample assistant data for each lesson
          const vocabularies = [
            AppDataSource.getRepository(Vocabulary).create({ lessonId: Number(lesson.id), word: "hello", phonetic: "/həˈləʊ/", meaningVi: "xin chào", orderNumber: 1 }),
            AppDataSource.getRepository(Vocabulary).create({ lessonId: Number(lesson.id), word: "teacher", phonetic: "/ˈtiː.tʃər/", meaningVi: "giáo viên", orderNumber: 2 }),
            AppDataSource.getRepository(Vocabulary).create({ lessonId: Number(lesson.id), word: "student", phonetic: "/ˈstjuː.dənt/", meaningVi: "học sinh", orderNumber: 3 }),
            AppDataSource.getRepository(Vocabulary).create({ lessonId: Number(lesson.id), word: "school", phonetic: "/skuːl/", meaningVi: "trường học", orderNumber: 4 })
          ];
          await AppDataSource.getRepository(Vocabulary).save(vocabularies);

          const patterns = [
            AppDataSource.getRepository(CommunicationPattern).create({ lessonId: Number(lesson.id), englishPattern: "Hello, teacher.", meaningVi: "Em chào thầy/cô ạ.", orderNumber: 1 }),
            AppDataSource.getRepository(CommunicationPattern).create({ lessonId: Number(lesson.id), englishPattern: "How are you?", meaningVi: "Bạn có khỏe không?", orderNumber: 2 })
          ];
          await AppDataSource.getRepository(CommunicationPattern).save(patterns);

          const questions = [
            AppDataSource.getRepository(StudentQuestion).create({ lessonId: Number(lesson.id), question: "What is this?", suggestedAnswer: "It is a book.", orderNumber: 1 }),
            AppDataSource.getRepository(StudentQuestion).create({ lessonId: Number(lesson.id), question: "How do you spell your name?", suggestedAnswer: "It's L-I-N-H.", orderNumber: 2 })
          ];
          await AppDataSource.getRepository(StudentQuestion).save(questions);
        }
        order++;
      }
      console.log(`Seeded ${unitTitles.length} lessons for Grade ${gData.number}`);
    }
  }

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch(console.error);
