import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubjectCreateDto, SubjectUpdateDto } from './subject.dto.in';
import { SubjectDto } from './subject.dto.out';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectService
{
	public constructor(
		@InjectRepository(Subject)
		private readonly subjectRepository: Repository<Subject>,
	) { }

	public async create(params: SubjectCreateDto): Promise<SubjectDto>
	{
		const subject = this.subjectRepository.create(params);
		await this.subjectRepository.save(subject);
		return (subject);
	}

	public async update(id: string, params: SubjectUpdateDto): Promise<void>
	{
		await this.subjectRepository.update(id, params);
	}

	public async getOne(id: string): Promise<SubjectDto>
	{
		return this.subjectRepository.findOne({ where: { id }, relations: ['parent'] });
	}

	public async getMany(): Promise<SubjectDto[]>
	{
		return this.subjectRepository.find({ relations: ['parent'] });
	}

	public async delete(id: string): Promise<void>
	{
		await this.subjectRepository.delete(id);
	}
}
