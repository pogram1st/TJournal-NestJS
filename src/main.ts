import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: "*",
    credentials: true,
    allowedHeaders: "*",
  });

  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  await app.listen(process.env.PORT || 4444);
}
bootstrap();
