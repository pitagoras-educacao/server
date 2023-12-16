import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { Subject } from '../subject/subject.entity';
import { StudySession } from './study-session.entity';
import { StudySessionService } from './study-session.service';

const entity: StudySession = {
	id: uuid(),
	subject: { id: uuid() } as Subject,
	init: new Date(),
	end: new Date(),
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

describe('StudySessionService', () =>
{
	let app: TestApplication;
	let service: StudySessionService;

	beforeAll(async () =>
	{
		app = await new TestApplication({
			providers: [
				StudySessionService,
				{ provide: getRepositoryToken(StudySession), useValue: repositoryMock }
			],
		}).compile();

		service = app.getResource(StudySessionService);
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
		test('should call repository create and save methods', async () =>
		{
			const params = { init: new Date(), end: new Date(), subject: { id: '1' } };
			await service.create(params);

			expect(repositoryMock.create).toHaveBeenCalledWith(params);
			expect(repositoryMock.save).toHaveBeenCalled();
		});

		test('should populate duration', async () =>
		{
			jest.spyOn(repositoryMock, 'create').mockReturnValueOnce({ init: new Date(), end: new Date() });
			const res = await service.create({ init: new Date(), end: new Date(), subject: { id: '1' } });

			expect(res.duration).toEqual(0);
		});
	});

	describe('update', () =>
	{
		test('should call repository update method', async () =>
		{
			await service.update('1', {});
			expect(repositoryMock.update).toHaveBeenCalledWith('1', {});
		});
	});

	describe('getOne', () =>
	{
		test('should call repository findOne method', async () =>
		{
			await service.getOne('1');
			expect(repositoryMock.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['subject'] });
		});
	});

	describe('getMany', () =>
	{
		test('should call repository find method', async () =>
		{
			await service.getMany();
			expect(repositoryMock.find).toHaveBeenCalledWith({ relations: ['subject'], order: { init: 'DESC' } });
		});
	});

	describe('delete', () =>
	{
		test('should call repository delete method', async () =>
		{
			await service.delete('1');
			expect(repositoryMock.delete).toHaveBeenCalledWith('1');
		});
	});
});