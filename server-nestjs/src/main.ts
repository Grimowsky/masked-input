import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './common/logger.middleware';
import { PrismaKnownClientExceptions } from './common/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //prisma setup errors
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaKnownClientExceptions(httpAdapter));
  //global logging middleware
  app.use(logger);
  await app.listen(8080);
}
bootstrap();
