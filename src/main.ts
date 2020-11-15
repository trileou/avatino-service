import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  //Swagger
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Avatino Service')
    .setDescription('Api for Avatino Shop')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document)

  await app.listen(process.env.SERVICE_PORT || 3000);
}
bootstrap();
