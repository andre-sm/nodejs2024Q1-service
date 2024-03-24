import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';
import * as yaml from 'js-yaml';
import { readFile } from 'fs/promises';

dotenv.config();
const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const yamlFilePath = join(__dirname, '..', 'doc', 'api.yaml');
  const yamlContent = await readFile(yamlFilePath, 'utf8');
  const swaggerDocument = yaml.load(yamlContent) as OpenAPIObject;

  SwaggerModule.setup('doc', app, swaggerDocument);

  await app.listen(PORT);
}
bootstrap();
