import { HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { StudySessionController } from './study-session.controller';
import { StudySessionService } from './study-session.service';

const serviceMock = {
	create: jest.fn().mockReturnValue({}),
	update: jest.fn().mockReturnValue({}),
	getOne: jest.fn().mockReturnValue({}),
	getMany: jest.fn().mockReturnValue([]),
	getTotal: jest.fn().mockReturnValue(0),
	delete: jest.fn().mockReturnValue({}),
};

describe('StudySessionController', () => 
{
	let app: TestApplication;
	let controller: StudySessionController;

	beforeAll(async () => 
	{
		app = await new TestApplication({
			controllers: [StudySessionController],
			providers: [
				{ provide: StudySessionService, useValue: serviceMock }
			],
		}).compile();

		controller = app.getResource(StudySessionController);

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
		test('[400] init should be required', async () =>
		{
			await app.post('/study-session')
				.send({ end: new Date(), subject: { id: uuid() } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] init should be a date', async () =>
		{
			await app.post('/study-session')
				.send({ init: 'invalid', end: new Date(), subject: { id: uuid() } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] end should be required', async () =>
		{
			await app.post('/study-session')
				.send({ init: new Date(), subject: { id: uuid() } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] end should be a date', async () =>
		{
			await app.post('/study-session')
				.send({ init: new Date(), end: 'invalid', subject: { id: uuid() } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should be required', async () =>
		{
			await app.post('/study-session')
				.send({ init: new Date(), end: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should be an object', async () =>
		{
			await app.post('/study-session')
				.send({ init: new Date(), end: new Date(), subject: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should have an id', async () =>
		{
			await app.post('/study-session')
				.send({ init: new Date(), end: new Date(), subject: {} })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject id should be a uuid', async () =>
		{
			await app.post('/study-session')
				.send({ init: new Date(), end: new Date(), subject: { id: 'invalid' } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[201] should create a study session', async () =>
		{
			await app.post('/study-session')
				.send({ init: new Date(), end: new Date(), subject: { id: uuid() } })
				.expect(HttpStatus.CREATED);
		});
	});

	describe('update', () =>
	{
		test('[400] id should be a uuid', async () =>
		{
			await app.patch('/study-session/invalid')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] init should be a date', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ init: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] end should be a date', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ end: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should be an object', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ subject: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should have an id', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ subject: {} })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject id should be a uuid', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ subject: { id: 'invalid' } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] init should be optional', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ end: new Date(), subject: { id: uuid() } })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[204] end should be optional', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ init: new Date(), subject: { id: uuid() } })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[204] subject should be optional', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ init: new Date(), end: new Date() })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[204] should update a study session', async () =>
		{
			await app.patch('/study-session/' + uuid())
				.send({ init: new Date(), end: new Date(), subject: { id: uuid() } })
				.expect(HttpStatus.NO_CONTENT);
		});
	});

	describe('getOne', () =>
	{
		test('[400] id should be a uuid', async () =>
		{
			await app.get('/study-session/invalid')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] should return a study session', async () =>
		{
			await app.get('/study-session/' + uuid())
				.expect(HttpStatus.OK);
		});
	});

	describe('getMany', () =>
	{
		test('[200] should return an array of study sessions', async () =>
		{
			await app.get('/study-session')
				.expect(HttpStatus.OK);
		});
	});

	describe('getTotal', () =>
	{
		test('[200] should return a number', async () =>
		{
			await app.get('/study-session/total')
				.expect(HttpStatus.OK);
		});
	});

	describe('delete', () =>
	{
		test('[400] id should be a uuid', async () =>
		{
			await app.delete('/study-session/invalid')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] should delete a study session', async () =>
		{
			await app.delete('/study-session/' + uuid())
				.expect(HttpStatus.NO_CONTENT);
		});
	});

});