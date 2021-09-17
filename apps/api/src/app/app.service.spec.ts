import { Test } from '@nestjs/testing';

import { AppService } from './app.service';

describe('AppService', () => {
  let service: AppService;

  beforeAll(async () => {
    const app = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = app.get<AppService>(AppService);
  });

  describe('getData', () => {
    it('should return an empty list', () => {
      const todos = service.getData();
      expect(todos.length).toEqual(0);
    });
    it('should add 1 todo', () => {
      service.addTodo();
      const todos = service.getData();
      expect(todos.length).toEqual(1);
    });
  });
});
