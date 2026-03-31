import { Routes } from '@angular/router';
import { RankingComponent } from './pages/ranking/ranking.component';

export const RANKING_ROUTES: Routes = [
  {
    path: ':game',
    component: RankingComponent,
    title: 'Next Level | Ranking',
  },
];
