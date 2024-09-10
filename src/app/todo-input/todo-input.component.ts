import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-todo-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './todo-input.component.html',
  styleUrl: './todo-input.component.css',
})
export class TodoInputComponent {
  addTask = output<string>();
  taskText: string = '';

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.taskText.trim()) {
      this.addTask.emit(this.taskText);
      this.taskText = '';
    }
  }
}
