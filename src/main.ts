import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = new DocumentBuilder()
		.setTitle('Mopdocs example')
		.setDescription('An api to manage your files')
		.setVersion('1.0')
		.addTag('mopdocs')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
