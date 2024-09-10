import { Injectable, signal } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  #todoList = signal<TodoItem[]>([]);

  todoList = this.#todoList.asReadonly();

  constructor() {}

  addTodoItem(taskText: string) {
    const newTask: TodoItem = {
      id: this.generateUniqueId(),
      taskText: taskText,
      isCompleted: false,
      isEditing: false,
    };

    this.#todoList.set([...this.#todoList(), newTask]);

    console.log(this.#todoList());
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).slice(2, 11);
  }
}
