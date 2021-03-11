import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoFormComponent } from './todo-form/todo-form.component';
import { Todo } from './todo.interface';
import { TodoService } from './todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private todoService: TodoService, public dialog: MatDialog) {}
  title = 'Mobiltex todo App';
  todos: Todo[];
  ngOnInit() {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos.reverse();
    });
  }

  updateTodo(todo: Todo = null) {
    const dialogRef = this.dialog.open(TodoFormComponent, {
      width: '450px',
      data: { todo },
    });
    dialogRef.afterClosed().subscribe((t) => {
      if (todo != null) {
        console.log('udpated todo: ', t);
        // todo.id = t.id;
        // this.editTodo(t);
      } else {
        this.addTodo(t);
      }
    });
  }

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo).subscribe((t) => {
      console.log('todo added...', t);
      this.todos.unshift(t);
    });
  }
}
