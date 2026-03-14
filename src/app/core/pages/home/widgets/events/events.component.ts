import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [MatIcon],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent {
  constructor(private router: Router) {}

  goToCalendar() {
    this.router.navigate(['/events']);
  }
}
