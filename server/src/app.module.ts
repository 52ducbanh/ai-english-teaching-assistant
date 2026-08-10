import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { databaseConfig } from "./config/database.config";
import { CurriculumModule } from "./modules/curriculum/curriculum.module";
import { AssistantModule } from "./modules/assistant/assistant.module";

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), CurriculumModule, AssistantModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
