import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from '../todo-form/todo-form.component';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.scss']
})
export class TodosListComponent implements OnInit {
@Input()
todos: Todo[];
  constructor(private todoService: TodoService, private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  updateTodo(todo: Todo = null) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '450px',
      data: { todo }
    });
    dialogRef.afterClosed().subscribe(t => {
      if (todo != null) { 
        console.log('udpated todo: ', t);
        this.editTodo(t);
      } else {
        this.addTodo(t)
      }
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe(t => {
      console.log('todo added...', t);
      this.todos.unshift(t);
    })
  }

  editTodo(todo: Todo) {
    this.todoService.updateTodo(todo).subscribe(t => {
      console.log('todo updated....', t);
      this.todos = this.todos.map(t => {
        if (t.id === todo.id) {
          return todo;
        }
        return t;
      })
    })
  }

  removeTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe(t => {
      console.log('Todo deleted...', t);
      this.todos = this.todos.filter(t => t.id != id);
    })
  }

  markAsComplete(todo: Todo) {
    let newTodo = { ...todo, isCompleted: true,};
    this.editTodo(newTodo);
  }
}
