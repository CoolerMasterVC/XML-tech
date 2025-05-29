import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { NestExpressApplication } from '@nestjs/platform-express';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(resolve(__dirname, '../../', 'public'));
  console.log(resolve(__dirname, '../../', 'public')); //'C:\\Users\\mrvla\\Documents\\GitHub\\XML-tech\\example-nestjs\\public'

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();