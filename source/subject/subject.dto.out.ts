import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNotEmptyObject, IsObject, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Entity } from 'typeorm';
import { Subject } from './subject.entity';


@Entity()
export class SubjectDto
{

	@IsUUID()
	public id: string;

	@IsString()
	@IsNotEmpty()
	public name: string;

	@IsDate()
	@Type(() => Date)
	public created_at: Date;

	@IsDate()
	@Type(() => Date)
	public updated_at: Date;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => Subject)
	@IsOptional()
	public parent?: Subject;
	
}
