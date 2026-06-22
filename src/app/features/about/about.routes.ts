import { Routes } from '@angular/router';
import { LinktreeComponent } from './pages/linktree/linktree.component';

export const ABOUT_ROUTES: Routes = [
  {
    path: 'community',
    component: LinktreeComponent,
    title: 'Next Level | Unete a la comunidad',
    data: {
      breadcrumb: 'Unete a la comunidad',
    },
  },
];
