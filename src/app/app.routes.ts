import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'main',
    loadComponent: () => import('./todo-main/todo-main.component'),
  },
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
];
