import { Component } from '@angular/core';
import { TodoHeaderComponent } from '../todo-header/todo-header.component';

@Component({
  selector: 'app-todo-main',
  standalone: true,
  imports: [TodoHeaderComponent],
  templateUrl: './todo-main.component.html',
  styleUrl: './todo-main.component.css',
})
export default class TodoMainComponent {}
