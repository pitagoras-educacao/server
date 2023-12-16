import { PartialType, PickType } from '@nestjs/swagger';
import { ExamDto } from './exam.dto.out';

export class ExamIdDto extends PickType(ExamDto, ['id']) { }

export class ExamCreateDto extends PickType(ExamDto, ['name', 'first_application_date', 'second_application_date']) { }

export class ExamUpdateDto extends PartialType(ExamCreateDto) { }