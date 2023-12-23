import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { PracticeTestCreateDto, PracticeTestIdDto, PracticeTestUpdateDto } from './practice-test.dto.in';
import { PracticeTestDto } from './practice-test.dto.out';
import { PracticeTestService } from './practice-test.service';

@Controller('practice-test')
export class PracticeTestController
{

	public constructor(
		private readonly practiceTestService: PracticeTestService,
	) { }

	@Post('')
	public create(@Body() body: PracticeTestCreateDto): Promise<PracticeTestDto>
	{
		return this.practiceTestService.create(body);
	}

	@Patch(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public update(@Param() params: PracticeTestIdDto, @Body() body: PracticeTestUpdateDto): Promise<void>
	{
		return this.practiceTestService.update(params.id, body);
	}

	@Get('')
	public getMany(): Promise<PracticeTestDto[]>
	{
		return this.practiceTestService.getMany();
	}

	@Get('total')
	public getTotal(): Promise<number>
	{
		return this.practiceTestService.getTotal();
	}

	@Get(':id')
	public getOne(@Param() params: PracticeTestIdDto): Promise<PracticeTestDto>
	{
		return this.practiceTestService.getOne(params.id);
	}

	@Delete(':id')
	@HttpCode(HttpStatus.NO_CONTENT)
	public delete(@Param() params: PracticeTestIdDto): Promise<void>
	{
		return this.practiceTestService.delete(params.id);
	}
}
