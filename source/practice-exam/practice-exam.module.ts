import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeExamController } from './practice-exam.controller';
import { PracticeExam } from './practice-exam.entity';
import { PracticeExamService } from './practice-exam.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([PracticeExam]),
	],
	providers: [
		PracticeExamService,
	],
	controllers: [
		PracticeExamController,
	]
})
export class PracticeExamModule { }