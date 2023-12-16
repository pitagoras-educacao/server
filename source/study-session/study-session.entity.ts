import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Subject } from '../subject/subject.entity';

@Entity()
export class StudySession
{

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column({ nullable: true })
	public init?: Date;

	@Column({ nullable: true })
	public end?: Date;
    
	@ManyToOne(() => Subject, { onDelete: 'CASCADE' })
	public subject: Subject;
    
	@CreateDateColumn()
	public created_at: Date;
	
	@UpdateDateColumn()
	public updated_at: Date;

}