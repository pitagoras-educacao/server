import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { FindManyOptions, LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { StudySessionCreateDto, StudySessionListDto, StudySessionSummaryByDateListDto, StudySessionUpdateDto } from './study-session.dto.in';
import { StudySessionDto, StudySessionSummaryBySubjectDto, StudySessionSummaryByDateDto, StudySessionSummaryDto } from './study-session.dto.out';
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

	private buildQueryOptions(params: StudySessionListDto): FindManyOptions<StudySession>
	{
		const options: FindManyOptions = {
			relations: [ 'subject' ],
			order: { init: 'DESC' },
			where: { },
		};

		if (params.initDate)
			options.where['init'] = MoreThanOrEqual(params.initDate);
		if (params.endDate)
			options.where['end'] = LessThanOrEqual(params.endDate);
		if (params.subject)
			options.where['subject'] = { id: params.subject };

		return options;
	}
	
	public async getMany(params?: StudySessionListDto): Promise<StudySessionDto[]>
	{
		const study_sessions = await this.studySessionRepository.find(
			this.buildQueryOptions(params)
		);

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

	public async getTotalByDate(params: StudySessionSummaryByDateListDto): Promise<StudySessionSummaryByDateDto[]>
	{
		const sessions = await this.studySessionRepository.find({
			where: { init: MoreThan(dayjs().subtract(params.days, 'day').toDate()) }
		});

		const sessions_by_date: Record<string, StudySessionDto[]> = {};
		for (const session of sessions)
		{
			const date = dayjs(session.init).format('YYYY-MM-DD');
			
			if (!sessions_by_date[date])
				sessions_by_date[date] = [];

			sessions_by_date[date].push(this.buildStudySessionDto(session));
		}

		return Object.entries(sessions_by_date).map(([date, sessions]) => ({
			date: dayjs(date).toDate(),
			total: this.calcTotal(sessions),
		}));
	}

	public async delete(id: string): Promise<void>
	{
		await this.studySessionRepository.delete(id);
	}

}
