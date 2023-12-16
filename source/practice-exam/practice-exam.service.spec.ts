import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { Exam } from '../exam/exam.entity';
import { PracticeExam } from './practice-exam.entity';
import { PracticeExamService } from './practice-exam.service';

const entity: PracticeExam = {
	id: uuid(),
	exam: { id: uuid() } as Exam,
	date: new Date(),
	number_of_questions: 10,
	number_of_hits: 5,
	created_at: new Date(),
	updated_at: new Date(),
};

const repositoryMock = {
	create: jest.fn().mockReturnValue(entity),
	save: jest.fn().mockReturnValue(null),
	update: jest.fn().mockReturnValue(null),
	find: jest.fn().mockReturnValue([entity]),
	findOne: jest.fn().mockReturnValue(entity),
	delete: jest.fn().mockReturnValue(null),
};

describe('PracticeExamService', () =>
{
	let app: TestApplication;
	let service: PracticeExamService;

	beforeAll(async () =>
	{
		app = await new TestApplication({
			providers: [
				PracticeExamService,
				{ provide: getRepositoryToken(PracticeExam), useValue: repositoryMock },
			],
		}).compile();

		service = app.getResource(PracticeExamService);

		await app.init();
	});

	afterAll(async () =>
	{
		await app.close();
	});

	test('should be defined', () =>
	{
		expect(service).toBeDefined();
	});

	describe('buildPracticeExamDto', () =>
	{
		test('should return a PracticeExamDto', () =>
		{
			const practice_exam_dto = service['buildPracticeExamDto'](entity);
			expect(practice_exam_dto).toEqual({
				...entity,
				hit_rate: 50,
			});
		});
	});

	describe('create', () => 
	{
		test('should call create and save methods', async () => 
		{
			await service.create(entity);
			expect(repositoryMock.create).toHaveBeenCalledWith(entity);
			expect(repositoryMock.save).toHaveBeenCalled();
		});
	});

	describe('update', () => 
	{
		test('should call update method', async () => 
		{
			await service.update(entity.id, { number_of_questions: 20 });
			expect(repositoryMock.update).toHaveBeenCalledWith(entity.id, { number_of_questions: 20 });
		});
	});

	describe('getOne', () => 
	{
		test('should call findOne method', async () => 
		{
			await service.getOne(entity.id);
			expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: entity.id }, relations: ['exam'] });
		});
	});

	describe('getMany', () => 
	{
		test('should call find method', async () => 
		{
			await service.getMany();
			expect(repositoryMock.find).toHaveBeenCalledWith({ relations: ['exam'] });
		});
	});

	describe('delete', () => 
	{
		test('should call delete method', async () => 
		{
			await service.delete(entity.id);
			expect(repositoryMock.delete).toHaveBeenCalledWith(entity.id);
		});
	});

});