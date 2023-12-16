import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Subject } from '../subject/subject.entity';

@Entity()
export class PracticeTest
{

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@ManyToOne(() => Subject, { onDelete: 'CASCADE' })
	public subject: Subject; 

	@Column()
	public number_of_questions: number;

	@Column()
	public number_of_hits: number;

	@Column()
	public date: Date;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

}