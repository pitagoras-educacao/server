import { PartialType, PickType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { SubjectIdDto } from '../subject/subject.dto.in';
import { PracticeTestDto } from './practice-test.dto.out';

export class PracticeTestIdDto extends PickType(PracticeTestDto, ['id']) { }

export class PracticeTestCreateDto extends PickType(PracticeTestDto, ['number_of_questions', 'number_of_hits', 'date'])
{

	@IsObject()
	@IsNotEmptyObject()
	@ValidateNested()
	@Type(() => SubjectIdDto)
	public subject: SubjectIdDto;

}

export class PracticeTestUpdateDto extends PartialType(PracticeTestCreateDto) { }