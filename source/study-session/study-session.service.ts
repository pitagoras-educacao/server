import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { Repository } from 'typeorm';
import { StudySessionCreateDto, StudySessionUpdateDto } from './study-session.dto.in';
import { StudySessionDto, StudySessionSummaryBySubjectDto, StudySessionSummaryDto } from './study-session.dto.out';
import { StudySession } from './study-session.entity';

@Injectable()
export class StudySessionService
{

	public constructor(
		@InjectRepository(StudySession)
		private readonly studySessionRepository: Repository<StudySession>,
	) { }

	private getDuration(session: StudySession): number
	{
		const d1 = dayjs(session.init);
		const d2 = dayjs(session.end);

		return d2.diff(d1, 'minute');
	}

	private buildStudySessionDto(session: StudySession): StudySessionDto
	{
		const duration = this.getDuration(session);
		return ({ ...session, duration });
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

	private calcTotal(sessions: StudySessionDto[]): number
	{
		return sessions.reduce((acc, session) => {
			return acc + session.duration
		}, 0);
	}
	
	public async getTotal(): Promise<StudySessionSummaryDto>
	{
		const sessions = await this.getMany();
		return ({
			total: this.calcTotal(sessions),
		})
	}

	public async getTotalBySubject(): Promise<StudySessionSummaryBySubjectDto[]>
	{
		const sessions: StudySessionDto[] = await this.getMany();

		const sessions_by_subject: Record<string, StudySessionDto[]> = {};
		for (const session of sessions)
		{
			const subject_id = session.subject.id;
			
			if (!sessions_by_subject[subject_id])
				sessions_by_subject[subject_id] = [];

			sessions_by_subject[subject_id].push(session);
		}
		
		return Object.values(sessions_by_subject).map((sessions) => ({
			subject: sessions[0].subject,
			total: this.calcTotal(sessions),
		}));
	}

	public async delete(id: string): Promise<void>
	{
		await this.studySessionRepository.delete(id);
	}

}
