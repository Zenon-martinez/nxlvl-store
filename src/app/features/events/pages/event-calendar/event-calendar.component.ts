import { Component, effect, inject, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MonthViewComponent } from '../../components/month-view/month-view.component';
import { EventCardComponent } from '../../components/event-card/event-card.component';
import { TcgEvent } from '@models/tournament.interface';
import { EventsStore } from '../../store/events.store';

@Component({
  selector: 'app-event-calendar',
  imports: [MatIcon, MonthViewComponent, EventCardComponent],
  templateUrl: './event-calendar.component.html',
  styleUrl: './event-calendar.component.scss',
})
export class EventCalendarComponent {
  readonly store = inject(EventsStore);
  readonly currentDate = signal(new Date()); // mes visible
  events: TcgEvent[] = [];
  selectedEvents: TcgEvent[] = [];
  currentMonth = '';

  constructor() {
    this.store.load();
    effect(() => {
      this.events = this.store.filteredEvents();
    });
    this.currentMonth = this.currentDate()
      .toLocaleString('es-ES', {
        month: 'long',
        year: 'numeric',
      })
      .replace('de', '');
  }

  nextMonth() {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
    this.updateCurrentMonth();
    this.store.nextMonth();
  }

  previuosMonth() {
    const current = this.currentDate();
    this.currentDate.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
    this.updateCurrentMonth();
    this.store.previousMonth();
  }

  onDaySelected(events: TcgEvent[]) {
    console.log('Selected events:', events);
    this.selectedEvents = events;
  }

  updateCurrentMonth() {
    const current = this.currentDate();
    this.currentMonth = current
      .toLocaleString('es-ES', {
        month: 'long',
        year: 'numeric',
      })
      .replace('de', '');
  }

  today() {
    this.currentDate.set(new Date());
    this.updateCurrentMonth();
  }
}
