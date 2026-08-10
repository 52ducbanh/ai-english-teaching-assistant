import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GeminiModule } from "../gemini/gemini.module";
import { AssistantController } from "./assistant.controller";
import { AssistantService } from "./assistant.service";
import { CommunicationPattern } from "./entities/communication-pattern.entity";
import { StudentQuestion } from "./entities/student-question.entity";
import { Vocabulary } from "./entities/vocabulary.entity";
import { Lesson } from "../curriculum/entities/lesson.entity";

@Module({
  imports: [GeminiModule, TypeOrmModule.forFeature([Lesson, Vocabulary, CommunicationPattern, StudentQuestion])],
  controllers: [AssistantController],
  providers: [AssistantService],
})
export class AssistantModule {}
