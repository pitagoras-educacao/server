import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import BigNumber from 'bignumber.js';
import { Repository } from 'typeorm';
import { PracticeExamCreateDto, PracticeExamUpdateDto } from './practice-exam.dto.in';
import { PracticeExamDto } from './practice-exam.dto.out';
import { PracticeExam } from './practice-exam.entity';

@Injectable()
export class PracticeExamService
{

	public constructor(
		@InjectRepository(PracticeExam)
		private readonly practiceExamRepository: Repository<PracticeExam>
	) { }

	private getHitRate(practice_exam: PracticeExam): number
	{
		return new BigNumber(practice_exam.number_of_hits)
			.dividedBy(practice_exam.number_of_questions)
			.multipliedBy(100)
			.decimalPlaces(2)
			.toNumber();
	}

	private buildPracticeExamDto(practice_exam: PracticeExam): PracticeExamDto
	{
		const hit_rate = this.getHitRate(practice_exam);
		return ({ ...practice_exam, hit_rate });
	}

	public async create(params: PracticeExamCreateDto): Promise<PracticeExamDto>
	{
		const practice_exam = this.practiceExamRepository.create(params);
		await this.practiceExamRepository.save(practice_exam);

		return (this.buildPracticeExamDto(practice_exam));
	}

	public async update(id: string, params: PracticeExamUpdateDto): Promise<void>
	{
		await this.practiceExamRepository.update(id, params);
	}

	public async getOne(id: string): Promise<PracticeExamDto>
	{
		const practice_exam = await this.practiceExamRepository.findOne({ where: { id }, relations: ['exam'] });
		return (this.buildPracticeExamDto(practice_exam));
	}

	public async getMany(): Promise<PracticeExamDto[]>
	{
		const practice_exams = await this.practiceExamRepository.find({ relations: ['exam'] });
		return (practice_exams.map((practice_exam) => this.buildPracticeExamDto(practice_exam)));
	}

	public async delete(id: string): Promise<void>
	{
		await this.practiceExamRepository.delete(id);
	}

}