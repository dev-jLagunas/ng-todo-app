import { Component, inject } from '@angular/core';
import { ColorThemeService } from '../shared/service/color-theme.service';

@Component({
  selector: 'app-todo-header',
  standalone: true,
  imports: [],
  templateUrl: './todo-header.component.html',
  styleUrl: './todo-header.component.css',
})
export class TodoHeaderComponent {
  themeService = inject(ColorThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
