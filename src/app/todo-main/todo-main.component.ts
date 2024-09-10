import { Component, inject } from '@angular/core';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';
import { TodoInputComponent } from '../todo-input/todo-input.component';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { TodoFilterComponent } from '../todo-filter/todo-filter.component';
import { TodoListService } from '../shared/service/todo-list.service';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [
    TodoHeaderComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoFilterComponent,
  ],
  templateUrl: './todo-main.component.html',
  styleUrl: './todo-main.component.css',
})
export default class TodoMainComponent {
  todoListService = inject(TodoListService);

  handleAddTask(taskText: string) {
    this.todoListService.addTodoItem(taskText);
  }
}
