import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticeTestController } from './practice-test.controller';
import { PracticeTestService } from './practice-test.service';
import { PracticeTest } from './practice-test.entity';

@Module({
	imports: [ 
		TypeOrmModule.forFeature([PracticeTest]),
	],
	controllers: [
		PracticeTestController,
	],
	providers: [
		PracticeTestService,
	],
})
export class PracticeTestModule { }