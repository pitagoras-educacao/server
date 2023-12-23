import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamCreateDto, ExamUpdateDto } from './exam.dto.in';
import { ExamDto, NextExamDto } from './exam.dto.out';
import { Exam } from './exam.entity';
import * as dayjs from 'dayjs';

@Injectable()
export class ExamService
{

	public constructor(
		@InjectRepository(Exam)
		private readonly examRepository:  Repository<Exam>,
	) { }

	public async create(params: ExamCreateDto): Promise<ExamDto>
	{
		const exam = this.examRepository.create(params);
		await this.examRepository.save(exam);
		return (exam);
	}

	public async update(id: string, params: ExamUpdateDto): Promise<void>
	{
		await this.examRepository.update(id, params);
	}

	public async getOne(id: string): Promise<ExamDto>
	{
		return (this.examRepository.findOne({ where: { id } }));
	}

	public async getMany(): Promise<ExamDto[]>
	{
		return (this.examRepository.find());
	}

	public async getNext(): Promise<NextExamDto>
	{
		const exams = await this.getMany();

		const next_exams = exams.map((exam) => ({
			id: exam.id,
			name: exam.name,
			created_at: exam.created_at,
			updated_at: exam.updated_at,
			date: dayjs().isBefore(exam.first_application_date)
				? exam.first_application_date
				: exam.second_application_date
		}));

		const sorted_exams = next_exams.sort((a, b) => ( dayjs(a.date).isBefore(b.date) ? -1 : 1 ));

		return (sorted_exams.find((exam) => ( dayjs().isBefore(exam.date) )));
	}

	public async delete(id: string): Promise<void>
	{
		await this.examRepository.delete(id);
	}

}
