import { PartialType, PickType } from '@nestjs/swagger';
import { PracticeExamDto } from './practice-exam.dto.out';

export class PracticeExamIdDto extends PickType(PracticeExamDto, ['id']) { }

export class PracticeExamCreateDto extends PickType(PracticeExamDto, ['exam', 'date', 'number_of_questions', 'number_of_hits']) { }

export class PracticeExamUpdateDto extends PartialType(PracticeExamCreateDto) { }