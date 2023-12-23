import { PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class ExamDto
{

	@IsUUID()
	public id: string;

	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsDate()
	@Type(() => Date)
	@IsOptional()
	public first_application_date?: Date;

	@IsDate()
	@Type(() => Date)
	@IsOptional()
	public second_application_date?: Date;

	@IsDate()
	@Type(() => Date)
	public created_at: Date;

	@IsDate()
	@Type(() => Date)
	public updated_at: Date;

}

export class NextExamDto extends PickType(ExamDto, ['id', 'name', 'created_at', 'updated_at'])
{
	
	@IsDate()
	@Type(() => Date)
	public date: Date;

}