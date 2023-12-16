import { HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';

const serviceMock = {
	create: jest.fn().mockReturnValue({}),
	update: jest.fn().mockReturnValue({}),
	getOne: jest.fn().mockReturnValue({}),
	getMany: jest.fn().mockReturnValue([]),
	delete: jest.fn().mockReturnValue({}),
};

describe('SubjectController', () => 
{
	let app: TestApplication;
	let controller: SubjectController;

	beforeAll(async () => 
	{
		app = await new TestApplication({
			controllers: [SubjectController],
			providers: [
				{ provide: SubjectService, useValue: serviceMock }
			],
		}).compile();

		controller = app.getResource(SubjectController);

		await app.init();
	});

	afterAll(async () => 
	{
		await app.close();
	});

	test('should be defined', () => 
	{
		expect(controller).toBeDefined();
	});

	describe('create', () => 
	{
		test('[400] name should be required', async () => 
		{
			await app.post('/subject')
				.send({ parent: { id: uuid() } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] name should not be empty', async () =>
		{
			await app.post('/subject')
				.send({ name: '' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] parent id should be an uuid', async () => 
		{
			await app.post('/subject')
				.send({ name: 'test', parent: { id: 'test' } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[201] parent id should not be required', async () => 
		{
			await app.post('/subject')
				.send({ name: 'test' })
				.expect(HttpStatus.CREATED);
		});

		test('[201] parent id should be optional', async () => 
		{
			await app.post('/subject')
				.send({ name: 'test', parent: { id: uuid() } })
				.expect(HttpStatus.CREATED);
		});
	});

	describe('update', () => 
	{
		test('[400] id should be an uuid', async () => 
		{
			await app.patch('/subject/test')
				.send({ name: 'test' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] name should not be empty', async () => 
		{
			await app.patch(`/subject/${uuid()}`)
				.send({ name: '' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] parent id should be an uuid', async () => 
		{
			await app.patch(`/subject/${uuid()}`)
				.send({ parent: { id: 'test' } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] name should be optional', async () => 
		{
			await app.patch(`/subject/${uuid()}`)
				.send({ parent: { id: uuid() } })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[200] parent id should be optional', async () => 
		{
			await app.patch(`/subject/${uuid()}`)
				.send({ name: 'test' })
				.expect(HttpStatus.NO_CONTENT);
		});
	});

	describe('getOne', () => 
	{
		test('[400] id should be an uuid', async () => 
		{
			await app.get('/subject/test')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] should return a subject', async () => 
		{
			await app.get(`/subject/${uuid()}`)
				.expect(HttpStatus.OK);
		});
	});

	describe('getMany', () => 
	{
		test('[200] should return an array of subjects', async () => 
		{
			await app.get('/subject')
				.expect(HttpStatus.OK);
		});
	});

	describe('delete', () => 
	{
		test('[400] id should be an uuid', async () => 
		{
			await app.delete('/subject/test')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] should return nothing', async () => 
		{
			await app.delete(`/subject/${uuid()}`)
				.expect(HttpStatus.NO_CONTENT);
		});
	});
});