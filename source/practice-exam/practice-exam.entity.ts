import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Exam } from '../exam/exam.entity';

@Entity()
export class PracticeExam
{

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => Exam)
	public exam: Exam;

	@Column()
	public date: Date;

	@Column()
	public number_of_questions: number;

	@Column()
	public number_of_hits: number;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

}