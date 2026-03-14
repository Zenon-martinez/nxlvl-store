import { Routes } from '@angular/router';
import { EventCalendarComponent } from './pages/event-calendar/event-calendar.component';

export const EVENTS_ROUTES: Routes = [
  {
    path: '',
    component: EventCalendarComponent,
    title: 'Next Level | Events',
  },
];
