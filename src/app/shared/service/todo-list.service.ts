import { Injectable, signal, computed } from '@angular/core';
import { TodoItem } from '../interfaces/todo-item';

@Injectable({
  providedIn: 'root',
})
export class TodoListService {
  #todoList = signal<TodoItem[]>(this.loadFromLocalStorage());
  todoList = this.#todoList.asReadonly();
  #filter = signal<'all' | 'active' | 'completed'>('all');

  constructor() {}

  private saveToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(this.#todoList()));
  }

  private loadFromLocalStorage(): TodoItem[] {
    const savedList = localStorage.getItem('todoList');
    return savedList ? JSON.parse(savedList) : [];
  }

  addTodoItem(taskText: string) {
    const newTask: TodoItem = {
      id: this.generateUniqueId(),
      taskText: taskText,
      isCompleted: false,
      isEditing: false,
    };

    this.#todoList.set([...this.#todoList(), newTask]);
    this.saveToLocalStorage();
  }

  deleteTodoItem(id: string) {
    const updatedList = this.#todoList().filter((todo) => todo.id !== id);
    this.#todoList.set(updatedList);
    this.saveToLocalStorage();
  }

  editTodoItem(id: string, updatedText: string) {
    const updatedList = this.#todoList().map((todo) =>
      todo.id === id
        ? { ...todo, tasktext: updatedText, isEditing: false }
        : todo
    );

    this.#todoList.set(updatedList);
    this.saveToLocalStorage();
  }

  toggleCompleted(id: string) {
    const updatedList = this.#todoList().map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );

    this.#todoList.set(updatedList);
    this.saveToLocalStorage();
  }

  clearCompletedItems() {
    const updatedList = this.#todoList().filter((todo) => !todo.isCompleted);
    this.#todoList.set(updatedList);
    this.saveToLocalStorage();
  }

  reorderTodoList(updatedList: TodoItem[]) {
    this.#todoList.set(updatedList);
    this.saveToLocalStorage();
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.#filter.set(filter);
  }

  filteredTodoList = computed(() => {
    const filter = this.#filter();
    switch (filter) {
      case 'active':
        return this.#todoList().filter((todo) => !todo.isCompleted);
      case 'completed':
        return this.#todoList().filter((todo) => todo.isCompleted);
      case 'all':
      default:
        return this.#todoList();
    }
  });

  private generateUniqueId(): string {
    return Math.random().toString(36).slice(2, 11);
  }

  get currentFilter() {
    return this.#filter();
  }
}
