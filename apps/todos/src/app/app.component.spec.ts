import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { Type } from '@angular/core';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have 0 todo`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.todos.length).toEqual(0);
  });

  it('should render 0 li', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li.todo')?.length).toEqual(0);
  });

  it(`should have 1 todo when 1 todo is added`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    const httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    
    mockHttpTodos(httpMock, 'GET', []);
    
    app.addTodo();

    mockHttpTodos(httpMock, 'POST', null);
    mockHttpTodos(httpMock, 'GET', [{title: 'Todo 1'}]);

    expect(app.todos.length).toEqual(1);
    app.todos.forEach(todo => expect(todo.title).toEqual('Todo 1'));
  });

  it(`should render 1 li when 1 todo is added`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;

    const httpMock = fixture.debugElement.injector.get<HttpTestingController>(HttpTestingController as Type<HttpTestingController>);
    
    mockHttpTodos(httpMock, 'GET', []);

    expect(compiled.querySelectorAll('li.todo')?.length).toEqual(0);
    
    const buttonAddTodo = fixture.debugElement.nativeElement.querySelector('button#add-todo') as HTMLButtonElement;
    buttonAddTodo.click();

    mockHttpTodos(httpMock, 'POST', null);
    mockHttpTodos(httpMock, 'GET', [{title: 'Todo 1'}]);

    fixture.detectChanges();
    const lis = compiled.querySelectorAll('li.todo');
    expect(lis?.length).toEqual(1);
    lis.forEach(li => expect(li.textContent).toEqual('Todo 1'))
  });
});

function mockHttpTodos(httpMock: HttpTestingController, method: string, res: any) {
  const req = httpMock.expectOne('/api/todos');
  expect(req.request.method).toBe(method);
  req.flush(res);
}