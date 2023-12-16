import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Exam
{

	@PrimaryGeneratedColumn('uuid')
	public id: string;

	@Column()
	public name: string;

	@Column({ nullable: true })
	public first_application_date?: Date;

	@Column({ nullable: true })
	public second_application_date?: Date;

	@CreateDateColumn()
	public created_at: Date;

	@UpdateDateColumn()
	public updated_at: Date;

}

