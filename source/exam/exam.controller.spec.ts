import { HttpStatus } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { TestApplication } from '../../test';
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';

const serviceMock = {
	create: jest.fn(),
	update: jest.fn(),
	getOne: jest.fn(),
	getMany: jest.fn(),
	getNext: jest.fn(),
	delete: jest.fn()
};

describe('ExamController', () =>
{
	let app: TestApplication;
	let controller: ExamController;

	beforeAll(async () =>
	{
		app = await new TestApplication({
			controllers: [ ExamController ],
			providers: [
				{ provide: ExamService, useValue: serviceMock }
			]
		}).compile();

		controller = app.getResource(ExamController);

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

	describe('POST /exam', () =>
	{
		test('[400] name should be required', async () => 
		{
			await app.post('/exam')
				.send({ first_application_date: new Date(), second_application_date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] name should not be empty', async () =>
		{
			await app.post('/exam')
				.send({ name: '', first_application_date: new Date(), second_application_date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[400] name should be a string', async () =>
		{
			await app.post('/exam')
				.send({ name: 1, first_application_date: new Date(), second_application_date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[201] first_application_date should be optional', async () =>
		{
			await app.post('/exam')
				.send({ name: 'name', second_application_date: new Date() })
				.expect(HttpStatus.CREATED);
		});

		test('[400] first_application_date should be a date', async () =>
		{
			await app.post('/exam')
				.send({ name: 'name', first_application_date: 'invalid', second_application_date: new Date() })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[201] second_application_date should be optional', async () =>
		{
			await app.post('/exam')
				.send({ name: 'name', first_application_date: new Date() })
				.expect(HttpStatus.CREATED);
		});

		test('[400] second_application_date should be a date', async () =>
		{
			await app.post('/exam')
				.send({ name: 'name', first_application_date: new Date(), second_application_date: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[201] should return the created exam', async () =>
		{
			await app.post('/exam')
				.send({ name: 'name', first_application_date: new Date(), second_application_date: new Date() })
				.expect(HttpStatus.CREATED);
		});
	});

	describe('PATCH /exam/:id', () =>
	{

		test('[400] id should be a UUID', async () =>
		{
			await app.patch('/exam/invalid')
				.send({ name: 'name' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] name should be optional', async () =>
		{
			await app.patch('/exam/' + uuid())
				.send({})
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[400] name should be a string', async () =>
		{
			await app.patch('/exam/' + uuid())
				.send({ name: 1 })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] first_application_date should be optional', async () =>
		{
			await app.patch('/exam/' + uuid())
				.send({})
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[400] first_application_date should be a date', async () =>
		{
			await app.patch('/exam/' + 	uuid())
				.send({ first_application_date: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] second_application_date should be optional', async () =>
		{
			await app.patch('/exam/' + uuid())
				.send({})
				.expect(HttpStatus.NO_CONTENT);
		});

		test('[400] second_application_date should be a date', async () =>
		{
			await app.patch('/exam/' + uuid())
				.send({ second_application_date: 'invalid' })
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] should return the updated exam', async () =>
		{
			await app.patch('/exam/' + uuid())
				.send({ name: 'name' })
				.expect(HttpStatus.NO_CONTENT);
		});
		
	});

	describe('GET /exam/:id', () =>
	{
		test('[400] id should be a UUID', async () =>
		{
			await app.get('/exam/invalid')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[200] should return the exam', async () =>
		{
			await app.get('/exam/' + uuid())
				.expect(HttpStatus.OK);
		});
	});

	describe('GET /exam/next', () =>
	{
		test('[200] should return the next exam', async () =>
		{
			await app.get('/exam/next')
				.expect(HttpStatus.OK);
		});
	});

	describe('GET /exam', () =>
	{
		test('[200] should return the exams', async () =>
		{
			await app.get('/exam')
				.expect(HttpStatus.OK);
		});
	});

	describe('DELETE /exam/:id', () =>
	{
		test('[400] id should be a UUID', async () =>
		{
			await app.delete('/exam/invalid')
				.expect(HttpStatus.BAD_REQUEST);
		});

		test('[204] should delete the exam', async () =>
		{
			await app.delete('/exam/' + uuid())
				.expect(HttpStatus.NO_CONTENT);
		});
	});

});