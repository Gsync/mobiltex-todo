import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      {
        id: 1,
        description: 'Play music',
        dueByDate: '2021-03-12',
        isCompleted: false,
      },
      {
        id: 2,
        description: 'Do exercise',
        dueByDate: '2021-03-12',
        isCompleted: false,
      },
      {
        id: 3,
        description: 'Do Project A',
        dueByDate: '2021-03-12',
        isCompleted: false,
      },
      {
        id: 4,
        description: 'Buy groceries',
        dueByDate: '2021-03-12',
        isCompleted: false,
      },
      {
        id: 5,
        description: 'Clean the house',
        dueByDate: '2021-03-12',
        isCompleted: false,
      },
    ];
    return { todos };
  }

  // Overrides the genId method to ensure that a todo always has an id.
  // If the todoes array is empty,
  // the method below returns the initial number (11).
  // if the todoes array is not empty, the method below returns the highest
  // todo id + 1.
  genId(todos: Todo[]): number {
    return todos.length > 0
      ? Math.max(...todos.map((todo) => todo.id)) + 1
      : 11;
  }
}
