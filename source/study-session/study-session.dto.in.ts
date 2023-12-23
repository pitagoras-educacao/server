import { PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsObject, ValidateNested } from 'class-validator';
import { SubjectIdDto } from '../subject/subject.dto.in';
import { StudySessionDto } from './study-session.dto.out';
import { IsNull } from 'typeorm';

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

export class StudySessionSummaryByDateListDto
{

	@IsNumber()
	@Type(() => Number)
	public days: number = 7;

}