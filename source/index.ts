import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void>
{
	const app = await NestFactory.create(AppModule);

	app.useGlobalPipes(new ValidationPipe({
		transform: true,
		whitelist: true,
		forbidNonWhitelisted: true
	}));

	app.setGlobalPrefix('/api');

	app.enableCors();

	await app.listen(3000);
}

bootstrap();