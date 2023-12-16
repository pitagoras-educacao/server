import { INestApplication, ModuleMetadata, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

export class TestApplication
{

	private metadata: ModuleMetadata;
	private module: TestingModule;
	private app: INestApplication;

	public constructor(metadata: ModuleMetadata)
	{
		this.metadata = metadata;
	}

	public async compile(): Promise<TestApplication>
	{
		this.module = await Test.createTestingModule(this.metadata).compile();
		
		this.app = this.module.createNestApplication();
		this.app.useGlobalPipes(new ValidationPipe({
			transform: true,
			whitelist: true,
			forbidNonWhitelisted: true,
		}));
		
		return this;
	}

	public async init(): Promise<void>
	{
		await this.app.init();
	}

	public async close(): Promise<void>
	{
		await this.app.close();
	}

	public getResource<T>(resource: any): T
	{
		return this.module.get(resource);
	}

	public get(path: string): supertest.Test
	{
		return supertest(this.app.getHttpServer()).get(path);
	}

	public post(path: string): supertest.Test
	{
		return supertest(this.app.getHttpServer()).post(path);
	}

	public put(path: string): supertest.Test
	{
		return supertest(this.app.getHttpServer()).put(path);
	}

	public patch(path: string): supertest.Test
	{
		return supertest(this.app.getHttpServer()).patch(path);
	}

	public delete(path: string): supertest.Test
	{
		return supertest(this.app.getHttpServer()).delete(path);
	}

}