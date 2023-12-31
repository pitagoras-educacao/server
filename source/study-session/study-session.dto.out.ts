import { Type } from 'class-transformer';
import { IsDate, IsNotEmptyObject, IsNumber, IsObject, IsUUID, ValidateNested } from 'class-validator';
import { Subject } from '../subject/subject.entity';


export class StudySessionDto
{

	@IsUUID()
	public id: string;

	@IsDate()
	@Type(() => Date)
	public init?: Date;

	@IsDate()
	@Type(() => Date)
	public end?: Date;

	@IsNumber()
	@Type(() => Number)
	public duration: number;
    
	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => Subject)
	public subject: Subject;
    
	@IsDate()
	@Type(() => Date)
	public created_at: Date;
	
	@IsDate()
	@Type(() => Date)
	public updated_at: Date;

}

export class StudySessionSummaryDto
{

	@IsNumber()
	@Type(() => Number)
	public total: number;

}

export class StudySessionSummaryBySubjectDto
{

	@IsNumber()
	@Type(() => Number)
	public total: number;

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => Subject)
	public subject: Subject;

}

export class StudySessionSummaryByDateDto
{
	
	@IsDate()
	@Type(() => Date)
	public date: Date;

	@IsNumber()
	@Type(() => Number)
	public total: number;

}