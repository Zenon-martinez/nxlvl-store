import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const BOARD_GAMES_ROUTES: Routes = [
  {
    path: '',
    component: CatalogComponent,
    title: 'Next Level | Juegos de Mesa',
  },
];
