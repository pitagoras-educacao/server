import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PracticeExamCreateDto, PracticeExamIdDto, PracticeExamUpdateDto } from './practice-exam.dto.in';
import { PracticeExamDto } from './practice-exam.dto.out';
import { PracticeExamService } from './practice-exam.service';

@Controller('practice-exam')
export class PracticeExamController
{

	public constructor(
		private readonly practiceExamService: PracticeExamService,
	) { }

	@Post()
	public create(@Body() body: PracticeExamCreateDto): Promise<PracticeExamDto>
	{
		return this.practiceExamService.create(body);
	}

	@Patch(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public update(@Param() params: PracticeExamIdDto, @Body() body: PracticeExamUpdateDto): Promise<void>
	{
		return this.practiceExamService.update(params.id, body);
	}

	@Get(':id')
	public getOne(@Param() params: PracticeExamIdDto): Promise<PracticeExamDto>
	{
		return this.practiceExamService.getOne(params.id);
	}

	@Get()
	public getMany(): Promise<PracticeExamDto[]>
	{
		return this.practiceExamService.getMany();
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public delete(@Param() params: PracticeExamIdDto): Promise<void>
	{
		return this.practiceExamService.delete(params.id);
	}
}