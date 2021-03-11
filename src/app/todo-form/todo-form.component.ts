import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../todo.interface';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss'],
})
export class TodoFormComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TodoFormComponent>,
    private todoService: TodoService,
    @Inject(MAT_DIALOG_DATA)
    private dialogData: { todo: Todo },
  ) {}
  formTitle = 'Create/Edit todo';
  todoForm: FormGroup = this.fb.group({
    id: null,
    description: ['', [Validators.required, Validators.maxLength(500)]],
    dueByDate: [Date.now(), Validators.required],
    isCompleted: [false, Validators.required],
  });

  get completed() {
    return this.todoForm.get('isCompleted');
  }

  ngOnInit(): void {
    if (this.dialogData?.todo) {
      this.formTitle = 'Edit Todo'
      this.todoForm.patchValue({ ...this.dialogData.todo });
    } else {
      this.formTitle = 'Create Todo';
    }
  }

  onSubmit({ value, valid }: { value: Todo; valid: boolean }) {
    // console.log(value);
    this.dialogRef.close(value);
  }
}
