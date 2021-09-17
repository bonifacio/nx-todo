import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();
  });

  describe('getData', () => {
    it('should return an empty list', () => {
      const appController = app.get<AppController>(AppController);
      const todos = appController.getData();
      expect(todos.length).toEqual(0);
    });
    it('should add 1 todo', () => {
      const appController = app.get<AppController>(AppController);
      appController.addTodo();
      const todos = appController.getData();
      expect(todos.length).toEqual(1);
    });
  });
});
