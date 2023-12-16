import { Type } from 'class-transformer';
import { IsDate, IsInt, IsNotEmptyObject, IsNumber, IsObject, IsUUID, Min, ValidateNested } from 'class-validator';
import { ExamIdDto } from '../exam/exam.dto.in';

export class PracticeExamDto
{

	@IsUUID()
	public id: string;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => ExamIdDto)
	public exam: ExamIdDto;

	@IsDate()
	@Type(() => Date)
	public date: Date;

	@IsInt()
	@Min(1)
	@Type(() => Number)
	public number_of_questions: number;

	@IsInt()
	@Type(() => Number)
	public number_of_hits: number;

	@IsNumber()
	@Type(() => Number)
	public hit_rate: number;

	@IsDate()
	@Type(() => Date)
	public created_at: Date;

	@IsDate()
	@Type(() => Date)
	public updated_at: Date;

}