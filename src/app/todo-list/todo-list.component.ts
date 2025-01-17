import { Component, inject, Signal } from '@angular/core';
import { TodoListService } from '../shared/service/todo-list.service';
import { TodoItem } from '../shared/interfaces/todo-item';
import { FormsModule } from '@angular/forms';
import {
  CdkDragDrop,
  CdkDropList,
  CdkDrag,
  moveItemInArray,
  DragDropModule,
} from '@angular/cdk/drag-drop';
import { UpperCasePipe } from '@angular/common';
import { ConfettiService } from '../shared/service/confetti.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [FormsModule, CdkDrag, CdkDropList, DragDropModule, UpperCasePipe],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent {
  todoList!: Signal<TodoItem[]>;
  todoListService = inject(TodoListService);
  confettiService = inject(ConfettiService);

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

    const task = this.todoListService.todoList().find((todo) => todo.id === id);
    if (task?.isCompleted) {
      this.confettiService.launchConfetti();
    }
  }

  clearCompleted() {
    this.todoListService.clearCompletedItems();
  }

  drop(event: CdkDragDrop<TodoItem[]>) {
    moveItemInArray(this.todoList(), event.previousIndex, event.currentIndex);
    this.todoListService.reorderTodoList(this.todoList());
  }

  get incompleteCount(): number {
    return this.todoList().filter((todo) => !todo.isCompleted).length;
  }

  get filteredTodos() {
    return this.todoListService.filteredTodoList();
  }

  get currentFilter() {
    return this.todoListService.currentFilter;
  }
}
