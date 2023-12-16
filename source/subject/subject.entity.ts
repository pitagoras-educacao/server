import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Subject
{

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public name: string;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

	@ManyToOne(() => Subject, { nullable: true, onDelete: 'CASCADE' })
	public parent?: Subject;
	
}