import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ExamCreateDto, ExamIdDto, ExamUpdateDto } from './exam.dto.in';
import { ExamDto } from './exam.dto.out';
import { ExamService } from './exam.service';
@Controller('exam')
export class ExamController 
{

	public constructor(
		private readonly examService: ExamService
	) { }

	@Post('')
	public create(@Body() body: ExamCreateDto): Promise<ExamDto> 
	{
		return (this.examService.create(body));
	}

	@Patch(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public update(@Param() params: ExamIdDto, @Body() body: ExamUpdateDto): Promise<void> 
	{
		return (this.examService.update(params.id, body));
	}

	@Get(':id')
	public getOne(@Param() params: ExamIdDto): Promise<ExamDto> 
	{
		return (this.examService.getOne(params.id));
	}

	@Get('')
	public getMany(): Promise<ExamDto[]> 
	{
		return (this.examService.getMany());
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public delete(@Param() params: ExamIdDto): Promise<void> 
	{
		return (this.examService.delete(params.id));
	}

};

