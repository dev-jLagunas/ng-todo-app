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
  }

  deleteTodoItem(id: string) {
    const updatedList = this.#todoList().filter((todo) => todo.id !== id);
    this.#todoList.set(updatedList);
  }

  editTodoItem(id: string, updatedText: string) {
    const updatedList = this.#todoList().map((todo) =>
      todo.id === id
        ? { ...todo, tasktext: updatedText, isEditing: false }
        : todo
    );

    this.#todoList.set(updatedList);
  }

  toggleCompleted(id: string) {
    const updatedList = this.#todoList().map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    this.#todoList.set(updatedList);
  }

  clearCompletedItems() {
    const updatedList = this.#todoList().filter((todo) => !todo.isCompleted);
    this.#todoList.set(updatedList);
  }

  private generateUniqueId(): string {
    return Math.random().toString(36).slice(2, 11);
  }
}
