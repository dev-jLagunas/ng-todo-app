import { Component, inject } from '@angular/core';
import { TodoListService } from '../shared/service/todo-list.service';

@Component({
  selector: 'app-todo-filter',
  standalone: true,
  imports: [],
  templateUrl: './todo-filter.component.html',
  styleUrl: './todo-filter.component.css',
})
export class TodoFilterComponent {
  todoListService = inject(TodoListService);

  applyFilter(filter: 'all' | 'active' | 'completed') {
    this.todoListService.setFilter(filter);
  }

  get currentFilter() {
    return this.todoListService.currentFilter;
  }
}
