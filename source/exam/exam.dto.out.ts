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

