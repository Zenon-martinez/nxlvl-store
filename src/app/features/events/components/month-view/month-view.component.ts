import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TcgEvent } from '@models/tournament.interface';
import { BreakpointService } from '@services/breakpoint.service';

@Component({
  selector: 'app-month-view',
  imports: [CommonModule],
  templateUrl: './month-view.component.html',
  styleUrl: './month-view.component.scss',
})
export class MonthViewComponent implements OnInit, OnChanges {
  @Input({ required: true }) visibleDate!: Date;
  @Input() events: TcgEvent[] = [];
  @Output() daySelected = new EventEmitter<TcgEvent[]>();

  breakpointService = inject(BreakpointService);

  currentDay = new Date();
  eventsByDate: Record<string, TcgEvent[]> = {};
  selectedDay = '';

  isMobile = this.breakpointService.isMobile;
  isTablet = this.breakpointService.isTablet;
  isDesktop = this.breakpointService.isDesktop;

  ngOnInit(): void {
    //Ya se filtra por mes
    console.log('Initializing MonthView with events:', this.events);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['events']) {
      this.eventsByDate = this.groupEventsByDate(this.events);
      console.log('Events grouped by date:', this.eventsByDate);
      const firstEvent = Object.keys(this.eventsByDate).length
        ? Object.keys(this.eventsByDate)[0]
        : null;
      this.selectedDay = firstEvent ? firstEvent : '';
      this.daySelected.emit(this.eventsByDate[this.selectedDay] || []);
      console.log('Selected day set to:', this.calendarDays);
    }
  }

  get calendarDays() {
    const year = this.visibleDate.getFullYear();
    const month = this.visibleDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const daysInMonth = lastDayOfMonth.getDate();

    // Ajustar para semana que inicia en el dia correcto
    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;

    const days: {
      date: string;
      inCurrentMonth: boolean;
      dayNumber: number;
      selected: boolean;
    }[] = [];

    // Días del mes anterior
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      days.push({
        date: this.toLocalDateKey(new Date(year, month - 1, prevMonthLastDay - i)),
        inCurrentMonth: false,
        dayNumber: prevMonthLastDay - i,
        selected: false,
      });
    }

    // Días del mes actual
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: this.toLocalDateKey(new Date(year, month, i)),
        inCurrentMonth: true,
        dayNumber: i,
        selected: false,
      });
    }

    // Rellenar hasta 42 celdas
    while (days.length < 42) {
      const nextDay = days.length - (startDay + daysInMonth) + 1;
      days.push({
        date: this.toLocalDateKey(new Date(year, month + 1, nextDay)),
        inCurrentMonth: false,
        dayNumber: nextDay,
        selected: false,
      });
    }

    return days;
  }

  getEventsForDate(date: Date) {
    return this.events.filter(
      (e) =>
        e.date.getFullYear() === date.getFullYear() &&
        e.date.getMonth() === date.getMonth() &&
        e.date.getDate() === date.getDate(),
    );
  }

  toLocalDateKey(date: Date): string {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
  }

  groupEventsByDate(events: TcgEvent[]) {
    return events.reduce<Record<string, TcgEvent[]>>((acc, event) => {
      const key = this.toLocalDateKey(event.date as Date);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(event);

      return acc;
    }, {});
  }

  viewEventsByDay(day: { date: string; inCurrentMonth: boolean; dayNumber: number }) {
    if (this.eventsByDate[day.date] && this.eventsByDate[day.date].length) {
      this.daySelected.emit(this.eventsByDate[day.date]);
      this.selectedDay = day.date;
    }
  }
}
