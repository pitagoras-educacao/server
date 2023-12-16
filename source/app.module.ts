import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExamModule } from './exam/exam.module';
import { PracticeExamModule } from './practice-exam/practice-exam.module';
import { PracticeTestModule } from './practice-test/practice-test.module';
import { StudySessionModule } from './study-session/study-session.module';
import { SubjectModule } from './subject/subject.module';
import { Subject } from './subject/subject.entity';
import { StudySession } from './study-session/study-session.entity';
import { PracticeTest } from './practice-test/practice-test.entity';
import { Exam } from './exam/exam.entity';
import { PracticeExam } from './practice-exam/practice-exam.entity';

@Module({
	imports: [
		TypeOrmModule.forRoot({
			type: 'sqlite',
			database: 'database/study-tracker.db',
			entities: [
				Subject,
				StudySession,
				PracticeTest,
				Exam,
				PracticeExam,
			],
			synchronize: true,
		}),
		SubjectModule,
		StudySessionModule,
		PracticeTestModule,
		ExamModule,
		PracticeExamModule,
	]
})
export class AppModule { }
