import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { Exam } from './exam.entity';
import { ExamService } from './exam.service';

const entity: Exam = {
	id: uuid(),
	name: 'test',
	first_application_date: new Date(),
	second_application_date: new Date(),
	created_at: new Date(),
	updated_at: new Date(),
};

const repositoryMock = {
	create: jest.fn().mockReturnValue(entity),
	save: jest.fn().mockReturnValue(null),
	update: jest.fn().mockReturnValue(entity),
	findOne: jest.fn().mockReturnValue(entity),
	find: jest.fn().mockReturnValue([entity]),
	delete: jest.fn().mockReturnValue(null),
};

describe('ExamService', () =>
{
	let app: TestApplication;
	let service: ExamService;

	beforeAll(async () =>
	{
		app = await new TestApplication({
			providers: [
				ExamService,
				{ provide: getRepositoryToken(Exam), useValue: repositoryMock }
			]
		}).compile();

		service = app.getResource(ExamService);

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
			await service.update(entity.id, { name: 'foo' });
			expect(repositoryMock.update).toHaveBeenCalledWith(entity.id, { name: 'foo' });
		});
	});

	describe('getOne', () =>
	{
		test('should call findOne method', async () => 
		{
			await service.getOne(entity.id);
			expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: entity.id } });
		});
	});

	describe('getMany', () =>
	{
		test('should call find method', async () => 
		{
			await service.getMany();
			expect(repositoryMock.find).toHaveBeenCalledWith();
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