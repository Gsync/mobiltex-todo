import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'api/todos';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions);
  }

  deleteTodo(id: number): Observable<Todo> {
    const url = `${this.todosUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions);
  }

  updateTodo(todo: Todo): Observable<any> {
    return this.http.put(this.todosUrl, todo, this.httpOptions);
  }
}
