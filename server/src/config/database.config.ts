import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { environment } from "./environment.config";

export const databaseConfig = {
  type: "mysql",
  host: environment.database.host,
  port: environment.database.port,
  username: environment.database.username,
  password: environment.database.password,
  database: environment.database.name,
  entities: [__dirname + "/../**/*.entity{.ts,.js}"],
  synchronize: environment.database.synchronize,
  logging: environment.database.logging,
} satisfies TypeOrmModuleOptions;
