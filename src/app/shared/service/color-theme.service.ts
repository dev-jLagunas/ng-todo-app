import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ColorThemeService {
  themeSignal = signal<string>('light');

  constructor() {
    this.loadThemePreference();
  }

  toggleTheme() {
    this.themeSignal.update((value) => (value === 'light' ? 'dark' : 'light'));
    this.applyTheme();
    this.saveThemePreference();
  }

  private applyTheme() {
    const body = document.body;
    if (this.themeSignal() === 'dark') {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }

  private saveThemePreference() {
    localStorage.setItem('theme', this.themeSignal());
  }

  private loadThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.themeSignal.set(savedTheme);
      this.applyTheme();
    }
  }
}
