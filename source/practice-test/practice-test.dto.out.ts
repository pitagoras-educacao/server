import { Type } from 'class-transformer';
import { IsDate, IsNotEmptyObject, IsNumber, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { Entity } from 'typeorm';
import { Subject } from '../subject/subject.entity';

@Entity()
export class PracticeTestDto
{

	@IsUUID()
	public id: string;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => Subject)
	public subject: Subject; 

	@IsNumber()
	@Type(() => Number)
	public number_of_questions: number;

	@IsNumber()
	@Type(() => Number)
	public number_of_hits: number;

	@IsDate()
	@Type(() => Date)
	public date: Date;

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
