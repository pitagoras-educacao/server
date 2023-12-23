import { HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { PracticeTestController } from './practice-test.controller';
import { PracticeTestService } from './practice-test.service';

const serviceMock = {
	create: jest.fn().mockReturnValue({}),
	update: jest.fn().mockReturnValue(null),
	getOne: jest.fn().mockReturnValue({}),
	getMany: jest.fn().mockReturnValue([]),
	getTotalQuestions: jest.fn().mockReturnValue(0),
	getTotalHits: jest.fn().mockReturnValue(0),
	delete: jest.fn().mockReturnValue(null),
};

describe('PracticeTestController', () =>
{
	let app: TestApplication;
	let controller: PracticeTestController;

	beforeAll(async () =>
	{
		app = await new TestApplication({
			controllers: [ PracticeTestController ],
			providers: [
				{ provide:  PracticeTestService, useValue: serviceMock },
			],
		}).compile();

		controller = app.getResource(PracticeTestController);

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
		test('[400] subject should be required', async () => 
		{
			await app.post('/practice-test')
				.send({ number_of_questions: 1, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should be an object', async () => 
		{
			await app.post('/practice-test')
				.send({ subject: '1', number_of_questions: 1, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should be not empty', async () => 
		{
			await app.post('/practice-test')
				.send({ subject: {}, number_of_questions: 1, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject.id should be a valid subject', async () => 
		{
			await app.post('/practice-test')
				.send({ subject: { id: '1' }, number_of_questions: 1, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_questions should be a number', async () =>
		{
			await app.post('/practice-test')
				.send({ subject: { id: '1' }, number_of_questions: '1', number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_questions should be required', async () => 
		{
			await app.post('/practice-test')
				.send({ subject: { id: '1' }, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		
		test('[400] number_of_hits should be required', async () => 
		{
			await app.post('/practice-test')
				.send({ subject: { id: '1' }, number_of_questions: 1, date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_hits should be a number', async () =>
		{
			await app.post('/practice-test')
				.send({ subject: { id: '1' }, number_of_questions: 1, number_of_hits: '1', date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] date should be required', async () => 
		{
			await app.post('/practice-test')
				.send({ subject: { id: '1' }, number_of_questions: 1, number_of_hits: 1 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] date should be a date', async () =>
		{
			await app.post('/practice-test')
				.send({ subject: { id: '1' }, number_of_questions: 1, number_of_hits: 1, date: '1' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[201] should create a practice test', async () =>
		{
			await app.post('/practice-test')
				.send({ subject: { id: uuid() }, number_of_questions: 1, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.CREATED);
		});
	});


	describe('update', () =>
	{
		test('[400] subject should be an object', async () => 
		{
			await app.patch('/practice-test/' + uuid())
				.send({ subject: '1' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject should be not empty', async () => 
		{
			await app.patch('/practice-test/' + uuid())
				.send({ subject: {} })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] subject.id should be a valid subject', async () => 
		{
			await app.patch('/practice-test/' + uuid())
				.send({ subject: { id: '1' } })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_questions should be a number', async () =>
		{
			await app.patch('/practice-test/' + uuid())
				.send({ number_of_questions: 'abc' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_hits should be a number', async () =>
		{
			await app.patch('/practice-test/' + uuid())
				.send({ number_of_hits: 'abc' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] subject should not be required', async () =>
		{
			await app.patch('/practice-test/' + uuid())
				.send({ number_of_questions: 1, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[204] number_of_questions should not be required', async () =>
		{
			await app.patch('/practice-test/' + uuid())
				.send({ subject: { id: uuid() }, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[204] number_of_hits should not be required', async () =>
		{
			await app.patch('/practice-test/' + uuid())
				.send({ subject: { id: uuid() }, number_of_questions: 1, date: new Date() })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[204] date should not be required', async () =>
		{
			await app.patch('/practice-test/' + uuid())
				.send({ subject: { id: uuid() }, number_of_questions: 1, number_of_hits: 1 })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[200] should update a practice test', async () =>
		{
			await app.patch('/practice-test/' + uuid())
				.send({ subject: { id: uuid() }, number_of_questions: 1, number_of_hits: 1, date: new Date() })
				.expect(HttpStatus.NO_CONTENT);
		});
	});

	describe('getOne', () =>
	{
		test('[400] id should be a valid uuid', async () =>
		{
			await app.get('/practice-test/1')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] should get a practice test', async () =>
		{
			await app.get('/practice-test/' + uuid())
				.expect(HttpStatus.OK);
		});
	});

	describe('getMany', () =>
	{
		test('[200] should get practice tests', async () =>
		{
			await app.get('/practice-test')
				.expect(HttpStatus.OK);
		});
	});

	describe('getTotalQuestions', () =>
	{
		test('[200] should get total questions', async () =>
		{
			await app.get('/practice-test/total-questions')
				.expect(HttpStatus.OK);
		});
	});

	describe('getTotalHits', () =>
	{
		test('[200] should get total hits', async () =>
		{
			await app.get('/practice-test/total-hits')
				.expect(HttpStatus.OK);
		});
	});

	describe('delete', () =>
	{
		test('[400] id should be a valid uuid', async () =>
		{
			await app.delete('/practice-test/1')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] should delete a practice test', async () =>
		{
			await app.delete('/practice-test/' + uuid())
				.expect(HttpStatus.NO_CONTENT);
		});
	});
});