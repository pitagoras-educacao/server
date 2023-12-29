import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { StudySessionCreateDto, StudySessionIdDto, StudySessionListDto, StudySessionSummaryByDateListDto, StudySessionUpdateDto } from './study-session.dto.in';
import { StudySessionDto, StudySessionSummaryByDateDto, StudySessionSummaryBySubjectDto, StudySessionSummaryDto } from './study-session.dto.out';
import { StudySessionService } from './study-session.service';

@Controller('study-session')
export class StudySessionController
{
	public constructor(
		private readonly studySessionService: StudySessionService,
	) { }

	@Post('')
	public create(@Body() body: StudySessionCreateDto): Promise<StudySessionDto>
	{
		return this.studySessionService.create(body);
	}

	@Patch(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public update(@Param() params: StudySessionIdDto, @Body() body: StudySessionUpdateDto): Promise<void>
	{
		return this.studySessionService.update(params.id, body);
	}

	@Get('')
	public getMany(@Query() query: StudySessionListDto): Promise<StudySessionDto[]>
	{
		return this.studySessionService.getMany(query);
	}

	@Get('total')
	public getTotal(): Promise<StudySessionSummaryDto>
	{
		return this.studySessionService.getTotal();
	}

	@Get('total-by-subject')
	public getTotalBySubject(): Promise<StudySessionSummaryBySubjectDto[]>
	{
		return this.studySessionService.getTotalBySubject();
	}

	@Get('total-by-date')
	public getTotalByDate(@Query() query: StudySessionSummaryByDateListDto): Promise<StudySessionSummaryByDateDto[]>
	{
		return this.studySessionService.getTotalByDate(query);
	}

	@Get(':id')
	public getOne(@Param() params: StudySessionIdDto): Promise<StudySessionDto>
	{
		return this.studySessionService.getOne(params.id);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public delete(@Param() params: StudySessionIdDto): Promise<void>
	{
		return this.studySessionService.delete(params.id);
	}
}
