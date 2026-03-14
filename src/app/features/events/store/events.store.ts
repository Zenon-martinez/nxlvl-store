import { Injectable, signal, computed } from '@angular/core';
import { TcgEvent } from '@models/tournament.interface';
import { EventsService } from '../services/events.service';

@Injectable({ providedIn: 'root' })
export class EventsStore {
  readonly events = signal<TcgEvent[]>([]);
  readonly selectedMonth = signal<number>(new Date().getMonth());
  readonly selectedYear = signal<number>(new Date().getFullYear());

  constructor(private service: EventsService) {}

  async load() {
    const data = await this.service.getEvents();
    const normalized = data.map((e) => ({
      ...e,
      date: new Date(e.date),
    }));

    this.events.set(normalized);
  }

  readonly filteredEvents = computed(() => {
    const month = this.selectedMonth();
    const year = this.selectedYear();

    // Primer día del mes anterior
    const startDate = new Date(year, month - 1, 1);
    startDate.setHours(0, 0, 0, 0);

    // Último día del mes siguiente
    const endDate = new Date(year, month + 2, 0);
    endDate.setHours(23, 59, 59, 999);

    return this.events().filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate >= startDate && eventDate <= endDate;
    });
  });

  nextMonth() {
    const current = new Date(this.selectedYear(), this.selectedMonth() + 1, 1);

    this.selectedMonth.set(current.getMonth());
    this.selectedYear.set(current.getFullYear());
  }

  previousMonth() {
    const current = new Date(this.selectedYear(), this.selectedMonth() - 1, 1);

    this.selectedMonth.set(current.getMonth());
    this.selectedYear.set(current.getFullYear());
  }

  readonly currentMonthLabel = computed(() => {
    return new Date(this.selectedYear(), this.selectedMonth()).toLocaleDateString(
      'es-MX',
      {
        month: 'long',
        year: 'numeric',
      },
    );
  });
}
