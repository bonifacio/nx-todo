import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have 2 todos`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.todos.length).toEqual(2);
  });

  it('should render 2 li', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('li.todo')?.length).toEqual(2);
  });

  it(`should have 3 todos when 1 todo is added`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.addTodo();
    expect(app.todos.length).toEqual(3);
  });

  it(`should render 3 li when 1 todo is added`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const buttonAddTodo = fixture.debugElement.nativeElement.querySelector('button#add-todo') as HTMLButtonElement;
    buttonAddTodo.click();
    fixture.detectChanges();
    expect(compiled.querySelectorAll('li.todo')?.length).toEqual(3);
  });
});
