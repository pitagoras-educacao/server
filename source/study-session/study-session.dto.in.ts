import { PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsOptional, IsUUID, ValidateNested } from 'class-validator';
import { SubjectIdDto } from '../subject/subject.dto.in';
import { StudySessionDto } from './study-session.dto.out';

export class StudySessionIdDto extends PickType(StudySessionDto, ['id']) { }

export class StudySessionCreateDto extends PickType(StudySessionDto, [ 'init', 'end' ]) 
{

	@IsObject()
	@IsNotEmpty()
	@ValidateNested()
	@Type(() => SubjectIdDto)
	public subject: SubjectIdDto;

}

export class StudySessionUpdateDto extends PartialType(StudySessionCreateDto) { }

export class StudySessionListDto
{

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	initDate?: Date;

	@IsOptional()
	@IsDate()
	@Type(() => Date)
	endDate?: Date;

	@IsOptional()
	@IsUUID()
	subject: string;
}

export class StudySessionSummaryByDateListDto
{

	@IsNumber()
	@Type(() => Number)
	public days: number = 7;

}