import { DataSource, DeepPartial, FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { databaseConfig } from "../../config/database.config";
import { environment } from "../../config/environment.config";
import { CommunicationPattern } from "../../modules/assistant/entities/communication-pattern.entity";
import { StudentQuestion } from "../../modules/assistant/entities/student-question.entity";
import { Vocabulary } from "../../modules/assistant/entities/vocabulary.entity";
import { Grade } from "../../modules/curriculum/entities/grade.entity";
import { Lesson } from "../../modules/curriculum/entities/lesson.entity";
import { Subject } from "../../modules/curriculum/entities/subject.entity";
import { SubjectGrade } from "../../modules/curriculum/entities/subject-grade.entity";

async function findOrCreate<T extends ObjectLiteral>(repository: Repository<T>, where: FindOptionsWhere<T>, values: DeepPartial<T>): Promise<T> {
  const existing = await repository.findOneBy(where);

  return existing ?? repository.save(repository.create(values));
}

function assertSafeSeedEnvironment(): void {
  if (environment.isProduction && process.env.ALLOW_PRODUCTION_SEED !== "true") {
    throw new Error("Refusing to seed production. Set ALLOW_PRODUCTION_SEED=true only when this is intentional.");
  }
}

async function seed(): Promise<void> {
  assertSafeSeedEnvironment();

  const dataSource = new DataSource(databaseConfig);

  try {
    await dataSource.initialize();

    await dataSource.transaction(async (manager) => {
      const subjectRepo = manager.getRepository(Subject);
      const gradeRepo = manager.getRepository(Grade);
      const subjectGradeRepo = manager.getRepository(SubjectGrade);
      const lessonRepo = manager.getRepository(Lesson);
      const vocabularyRepo = manager.getRepository(Vocabulary);
      const patternRepo = manager.getRepository(CommunicationPattern);
      const questionRepo = manager.getRepository(StudentQuestion);

      const english = await findOrCreate(subjectRepo, { code: "ENGLISH" }, { name: "Tiếng Anh", code: "ENGLISH" });
      const math = await findOrCreate(subjectRepo, { code: "MATH" }, { name: "Toán", code: "MATH" });

      const grade3 = await findOrCreate(gradeRepo, { gradeNumber: 3 }, { gradeNumber: 3, name: "Khối 3" });
      const grade4 = await findOrCreate(gradeRepo, { gradeNumber: 4 }, { gradeNumber: 4, name: "Khối 4" });
      await findOrCreate(gradeRepo, { gradeNumber: 5 }, { gradeNumber: 5, name: "Khối 5" });

      const englishGrade3 = await findOrCreate(subjectGradeRepo, { subjectId: english.id, gradeId: grade3.id }, { subjectId: english.id, gradeId: grade3.id });
      await findOrCreate(subjectGradeRepo, { subjectId: english.id, gradeId: grade4.id }, { subjectId: english.id, gradeId: grade4.id });
      await findOrCreate(subjectGradeRepo, { subjectId: math.id, gradeId: grade3.id }, { subjectId: math.id, gradeId: grade3.id });

      const unit1 = await findOrCreate(
        lessonRepo,
        { subjectGradeId: englishGrade3.id, code: "UNIT_1" },
        {
          subjectGradeId: englishGrade3.id,
          code: "UNIT_1",
          name: "Unit 1: Hello",
          orderNumber: 1,
        },
      );
      const unit2 = await findOrCreate(
        lessonRepo,
        { subjectGradeId: englishGrade3.id, code: "UNIT_2" },
        {
          subjectGradeId: englishGrade3.id,
          code: "UNIT_2",
          name: "Unit 2: Our names",
          orderNumber: 2,
        },
      );

      const unit1Vocabularies = [
        {
          word: "Hello",
          phonetic: "/həˈləʊ/",
          meaningVi: "Xin chào",
          orderNumber: 1,
        },
        { word: "Hi", phonetic: "/haɪ/", meaningVi: "Chào", orderNumber: 2 },
        { word: "I", phonetic: "/aɪ/", meaningVi: "Tôi", orderNumber: 3 },
        { word: "am", phonetic: "/æm/", meaningVi: "là", orderNumber: 4 },
      ];

      for (const vocabulary of unit1Vocabularies) {
        await findOrCreate(vocabularyRepo, { lessonId: unit1.id, word: vocabulary.word }, { lessonId: unit1.id, ...vocabulary });
      }

      const unit1Patterns = [
        {
          englishPattern: "Hello, I am [Name].",
          meaningVi: "Xin chào, tôi là [Tên].",
          orderNumber: 1,
        },
        {
          englishPattern: "Hi, I am [Name].",
          meaningVi: "Chào, mình là [Tên].",
          orderNumber: 2,
        },
      ];

      for (const pattern of unit1Patterns) {
        await findOrCreate(patternRepo, { lessonId: unit1.id, englishPattern: pattern.englishPattern }, { lessonId: unit1.id, ...pattern });
      }

      const unit1Questions = [
        {
          question: "Phân biệt Hello và Hi?",
          suggestedAnswer: '"Hello" dùng trang trọng hơn, "Hi" dùng thân mật.',
          orderNumber: 1,
        },
        {
          question: 'Em có thể dùng "I\'m" thay "I am" không?',
          suggestedAnswer: 'Được, "I\'m" là viết tắt của "I am", thường dùng trong văn nói.',
          orderNumber: 2,
        },
      ];

      for (const question of unit1Questions) {
        await findOrCreate(questionRepo, { lessonId: unit1.id, question: question.question }, { lessonId: unit1.id, ...question });
      }

      const unit2Vocabularies = [
        { word: "Name", phonetic: "/neɪm/", meaningVi: "Tên", orderNumber: 1 },
        {
          word: "What",
          phonetic: "/wɒt/",
          meaningVi: "Cái gì",
          orderNumber: 2,
        },
      ];

      for (const vocabulary of unit2Vocabularies) {
        await findOrCreate(vocabularyRepo, { lessonId: unit2.id, word: vocabulary.word }, { lessonId: unit2.id, ...vocabulary });
      }
    });

    console.log("Seed completed successfully without deleting existing data.");
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

seed().catch((error: unknown) => {
  console.error("Error during seeding:", error);
  process.exitCode = 1;
});
