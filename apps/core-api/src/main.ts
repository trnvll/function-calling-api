import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

if (!process.env.IS_TS_NODE) {
  require('module-alias/register')
}

import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder()
    .setTitle('Okta REST API')
    .setDescription(
      'REST API and JSON interface for company Okta. It contains the core functionality for the application.',
    )
    .addServer(
      process.env.OPENAPI_SERVER_URL ?? '',
      'Official Okta REST API and JSON interface',
    )
    .setVersion('1.0')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(process.env.PORT ?? 8001)
}
void bootstrap()
