import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { SubjectCreateDto, SubjectIdDto, SubjectUpdateDto } from './subject.dto.in';
import { SubjectDto } from './subject.dto.out';
import { SubjectService } from './subject.service';

@Controller('subject')
export class SubjectController
{

	public constructor(
		private readonly subjectService: SubjectService
	) { }

	@Post('')
	public create(@Body() body: SubjectCreateDto): Promise<SubjectDto>
	{
		return this.subjectService.create(body);
	}

	@Patch(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public update(@Param() params: SubjectIdDto, @Body() body: SubjectUpdateDto): Promise<void>
	{
		return this.subjectService.update(params.id, body);
	}

	@Get('')
	public getMany(): Promise<SubjectDto[]>
	{
		return this.subjectService.getMany();
	}

	@Get(':id')
	public getOne(@Param() params: SubjectIdDto): Promise<SubjectDto>
	{
		return this.subjectService.getOne(params.id);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public delete(@Param() params: SubjectIdDto): Promise<void>
	{
		return this.subjectService.delete(params.id);
	}
}
