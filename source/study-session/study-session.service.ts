import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { StudySessionCreateDto, StudySessionUpdateDto } from './study-session.dto.in';
import { StudySessionDto } from './study-session.dto.out';
import { StudySession } from './study-session.entity';

@Injectable()
export class StudySessionService
{

	public constructor(
		@InjectRepository(StudySession)
		private readonly studySessionRepository: Repository<StudySession>,
	) { }

	private getDuration(init: Date, end: Date): number
	{
		const d1 = dayjs(init);
		const d2 = dayjs(end);

		return (d2.diff(d1, 'minute'));
	}

	private buildStudySessionDto(study_session: StudySession): StudySessionDto
	{
		const duration = this.getDuration(study_session.init, study_session.end);
		return ({ ...study_session, duration });
	}
	
	public async create(params: StudySessionCreateDto): Promise<StudySessionDto>
	{
		const study_session = this.studySessionRepository.create(params);
		await this.studySessionRepository.save(study_session);
		return (this.buildStudySessionDto(study_session));
	}

	public async update(id: string, params: StudySessionUpdateDto): Promise<void>
	{
		await this.studySessionRepository.update(id, params);
	}

	public async getOne(id: string): Promise<StudySessionDto>
	{
		const study_session = await this.studySessionRepository.findOne({ where: { id }, relations: ['subject'] });

		if (study_session)
			return (this.buildStudySessionDto(study_session));
	}
	
	public async getMany(): Promise<StudySessionDto[]>
	{
		const study_sessions = await this.studySessionRepository.find({ relations: [ 'subject' ], order: { init: 'DESC' } });
		return (study_sessions.map((study_session) => this.buildStudySessionDto(study_session)));
	}
	
	public async getTotal(): Promise<number>
	{
		const sessions = await this.getMany();
		return sessions.reduce((acc, session) => acc + session.duration, 0);
	}

	public async delete(id: string): Promise<void>
	{
		await this.studySessionRepository.delete(id);
	}

}
