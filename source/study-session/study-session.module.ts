import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudySessionController } from './study-session.controller';
import { StudySessionService } from './study-session.service';
import { StudySession } from './study-session.entity';

@Module({
	imports: [
		TypeOrmModule.forFeature([ StudySession ])
	],
	providers: [
		StudySessionService,
	],
	controllers: [
		StudySessionController,
	]
})
export class StudySessionModule { }