import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExamCreateDto, ExamUpdateDto } from './exam.dto.in';
import { ExamDto } from './exam.dto.out';
import { Exam } from './exam.entity';

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

	public async delete(id: string): Promise<void>
	{
		await this.examRepository.delete(id);
	}

}
