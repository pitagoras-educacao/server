import { HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { PracticeExamController } from './practice-exam.controller';
import { PracticeExamService } from './practice-exam.service';

const serviceMock = {
	create: jest.fn(),
	update: jest.fn(),
	getOne: jest.fn(),
	getMany: jest.fn(),
	delete: jest.fn(),
};

describe('PracticeExamController', () => 
{
	let app: TestApplication;
	let controller: PracticeExamController;

	beforeAll(async () => 
	{
		app = await new TestApplication({
			controllers: [PracticeExamController],
			providers: [
				{ provide: PracticeExamService, useValue: serviceMock }
			]
		}).compile();

		controller = app.getResource(PracticeExamController);

		app.init();
	});

	afterAll(async () => 
	{
		await app.close();
	});

	test('should be defined', () => 
	{
		expect(controller).toBeDefined();
	});

	describe('POST /practice-exam', () => 
	{
		test('[400] exam should be required', async () => 
		{
			await app.post('/practice-exam')
				.send({ date: new Date(), number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] exam should be a valid object', () => 
		{
			app.post('/practice-exam')
				.send({ exam: 'invalid', date: new Date(), number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] exam should not be empty', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: {}, date: new Date(), number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] date should be required', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] date should be a valid date', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, date: 'invalid', number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_questions should be required', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, date: new Date(), number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_questions should be a valid number', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, date: new Date(), number_of_questions: 'invalid', number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_questions should be greater than zero', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, date: new Date(), number_of_questions: 0, number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_hits should be required', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, date: new Date(), number_of_questions: 10 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_hits should be a valid number', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, date: new Date(), number_of_questions: 10, number_of_hits: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[201] should return a practice exam', async () => 
		{
			await app.post('/practice-exam')
				.send({ exam: { id: uuid() }, date: new Date(), number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.CREATED);
		});
	});

	describe('PATCH /practice-exam/:id', () =>
	{
		test('[400] id should be a valid uuid', async () =>
		{
			await app.patch('/practice-exam/invalid')
				.send({ number_of_hits: 5 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] exam should be optional', () => 
		{
			app.patch(`/practice-exam/${uuid()}`)
				.send({ date: new Date(), number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[400] exam should be a valid object', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ exam: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] exam should not be empty', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ exam: {} })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] date should be optional', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ exam: { id: uuid() }, number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[400] date should be a valid date', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ date: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] number_of_questions should be optional', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ exam: { id: uuid() }, date: new Date(), number_of_hits: 5 })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[400] number_of_questions should be a valid number', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ number_of_questions: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] number_of_questions should be greater than zero', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ number_of_questions: 0 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] number_of_hits should be optional', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ exam: { id: uuid() }, date: new Date(), number_of_questions: 10 })
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[400] number_of_hits should be a valid number', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ number_of_hits: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] should return a practice exam', async () => 
		{
			await app.patch(`/practice-exam/${uuid()}`)
				.send({ exam: { id: uuid() }, date: new Date(), number_of_questions: 10, number_of_hits: 5 })
				.expect(HttpStatus.NO_CONTENT);
		});
	});

	describe('GET /practice-exam/:id', () =>
	{
		test('[400] id should be a valid uuid', async () =>
		{
			await app.get('/practice-exam/invalid')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] should return a practice exam', async () =>
		{
			await app.get(`/practice-exam/${uuid()}`)
				.expect(HttpStatus.OK);
		});
	});

	describe('GET /practice-exam', () =>
	{
		test('[200] should return a list of practice exams', async () =>
		{
			await app.get('/practice-exam')
				.expect(HttpStatus.OK);
		});
	});

	describe('DELETE /practice-exam/:id', () =>
	{
		test('[400] id should be a valid uuid', async () =>
		{
			await app.delete('/practice-exam/invalid')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] should delete a practice exam', async () =>
		{
			await app.delete(`/practice-exam/${uuid()}`)
				.expect(HttpStatus.NO_CONTENT);
		});
	});
});