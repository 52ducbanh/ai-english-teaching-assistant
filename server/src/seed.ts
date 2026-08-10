import { DataSource } from "typeorm";
import { Subject } from "./modules/curriculum/entities/subject.entity";
import { Grade } from "./modules/curriculum/entities/grade.entity";
import { SubjectGrade } from "./modules/curriculum/entities/subject-grade.entity";
import { Lesson } from "./modules/curriculum/entities/lesson.entity";

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

    // Insert Lessons for Grade 3
    if (gData.number === 3) {
      const grade3Lessons = [
        "Unit 1: Hello", "Unit 2: Our names", "Unit 3: Our friends", "Unit 4: Our bodies", "Unit 5: My hobbies",
        "Unit 6: Our school", "Unit 7: Classroom instructions", "Unit 8: My school things", "Unit 9: Colours", "Unit 10: Break time activities",
        "Unit 11: My family", "Unit 12: Jobs", "Unit 13: My house", "Unit 14: My bedroom", "Unit 15: At the dining table",
        "Unit 16: My pets", "Unit 17: Our toys", "Unit 18: Playing and doing", "Unit 19: Outdoor activities", "Unit 20: At the zoo"
      ];
      
      let order = 1;
      for (const lessonName of grade3Lessons) {
        let lesson = await AppDataSource.getRepository(Lesson).findOneBy({ name: lessonName, subjectGradeId: Number(subjectGrade.id) });
        if (!lesson) {
          lesson = AppDataSource.getRepository(Lesson).create({
            subjectGradeId: Number(subjectGrade.id),
            name: lessonName,
            orderNumber: order,
          });
          await AppDataSource.getRepository(Lesson).save(lesson);
        }
        order++;
      }
      console.log(`Seeded ${grade3Lessons.length} lessons for Grade 3`);
    }

    // Insert Lessons for Grade 4
    if (gData.number === 4) {
      const grade4Lessons = [
        "Unit 1: My friends", "Unit 2: Time and daily routines", "Unit 3: My week", "Unit 4: My birthday party", "Unit 5: Things we can do",
        "Unit 6: Our school facilities", "Unit 7: Our timetables", "Unit 8: My favourite subjects", "Unit 9: Our sports day", "Unit 10: Our summer holidays",
        "Unit 11: My home", "Unit 12: Jobs", "Unit 13: Appearance", "Unit 14: Daily activities", "Unit 15: My family's weekends",
        "Unit 16: Weather", "Unit 17: In the city", "Unit 18: At the shopping centre", "Unit 19: The animal world", "Unit 20: At summer camp"
      ];

      let order = 1;
      for (const lessonName of grade4Lessons) {
        let lesson = await AppDataSource.getRepository(Lesson).findOneBy({ name: lessonName, subjectGradeId: Number(subjectGrade.id) });
        if (!lesson) {
          lesson = AppDataSource.getRepository(Lesson).create({
            subjectGradeId: Number(subjectGrade.id),
            name: lessonName,
            orderNumber: order,
          });
          await AppDataSource.getRepository(Lesson).save(lesson);
        }
        order++;
      }
      console.log(`Seeded ${grade4Lessons.length} lessons for Grade 4`);
    }
  }

  console.log("Seeding complete.");
  await AppDataSource.destroy();
}

seed().catch(console.error);
