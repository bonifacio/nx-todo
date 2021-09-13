import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

interface Todo {
  title: string;
}

@Component({
  selector: 'nx-todo-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.fetch();
  }

  addTodo() {
    this.http.post('/api/todos', {}).subscribe(() => this.fetch());
  }

  fetch(): void {
    this.http.get<Todo[]>('/api/todos').subscribe(todos => this.todos = todos);
  }
}
