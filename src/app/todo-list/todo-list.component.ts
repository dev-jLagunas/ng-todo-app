import { Component, inject, Signal } from '@angular/core';
import { TodoListService } from '../shared/service/todo-list.service';
import { TodoItem } from '../shared/interfaces/todo-item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoList!: Signal<TodoItem[]>;
  todoListService = inject(TodoListService);

  constructor() {
    this.todoList = this.todoListService.todoList;
  }

  deleteTodo(id: string) {
    this.todoListService.deleteTodoItem(id);
  }

  editTodo(id: string, updatedText: string) {
    this.todoListService.editTodoItem(id, updatedText);
  }

  toggleComplete(id: string) {
    this.todoListService.toggleCompleted(id);
  }

  clearCompleted() {
    this.todoListService.clearCompletedItems();
  }
}
