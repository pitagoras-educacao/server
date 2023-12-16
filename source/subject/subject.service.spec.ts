import { getRepositoryToken } from '@nestjs/typeorm';
import { TestApplication } from '../../test';
import { Subject } from './subject.entity';
import { SubjectService } from './subject.service';

const repositoryMock = {
	create: jest.fn().mockReturnValue({}),
	save: jest.fn().mockReturnValue(null),
	update: jest.fn().mockReturnValue(null),
	findOne: jest.fn().mockReturnValue({}),
	find: jest.fn().mockReturnValue([]),
	delete: jest.fn().mockReturnValue(null),
};

describe('SubjectService', () => 
{
	let app: TestApplication;	
	let service: SubjectService;

	beforeAll(async () => 
	{
		app = await new TestApplication({
			providers: [
				SubjectService,
				{ provide: getRepositoryToken(Subject), useValue: repositoryMock }
			],
		}).compile();

		service = app.getResource(SubjectService);

		await app.init();
	});

	test('should be defined', () =>
	{
		expect(service).toBeDefined();
	});

	describe('create', () => 
	{
		test('should call create and save', async () => 
		{
			const res = await service.create({ name: 'test' });

			expect(repositoryMock.create).toHaveBeenCalledWith({ name: 'test' });
			expect(repositoryMock.save).toHaveBeenCalled();
			expect(res).toEqual({});
		});
	});

	describe('update', () => 
	{
		test('should call update', async () => 
		{
			await service.update('id', { name: 'test' });

			expect(repositoryMock.update).toHaveBeenCalledWith('id', { name: 'test' });
		});
	});

	describe('getOne', () => 
	{
		test('should call findOne', async () => 
		{
			await service.getOne('id');

			expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: 'id' }, relations: ['parent'] });
		});
	});

	describe('getMany', () => 
	{
		test('should call find', async () => 
		{
			await service.getMany();

			expect(repositoryMock.find).toHaveBeenCalledWith({ relations: ['parent'] });
		});
	});

	describe('delete', () => 
	{
		test('should call delete', async () => 
		{
			await service.delete('id');

			expect(repositoryMock.delete).toHaveBeenCalledWith('id');
		});
	});

});