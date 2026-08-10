import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { environment } from "./config/environment.config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: environment.corsOrigins,
    credentials: true,
  });

  await app.listen(environment.port);
  console.log(`Backend server is running on: http://localhost:${environment.port}`);
}
bootstrap();
