/// <reference types="jest" />
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppController } from './app.controller';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.root()).toBe('Hello World!');
    });
  });

  describe('create', () => {
    it('should be "Post arrived!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.create()).toBe('Post arrived!');
    }); 
  });

  describe('update', () => {
    it('should be "Put arrived!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.update()).toBe('Put arrived!');
    }); 
  });

  describe('delete', () => {
    it('should be "Delete arrived!"', () => {
      const appController = app.get<AppController>(AppController);
      expect(appController.delete()).toBe('Delete arrived!');
    }); 
  });
});