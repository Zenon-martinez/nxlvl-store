import { Component, Input, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TcgEvent } from '@models/tournament.interface';
import { EventPosterComponent } from '../event-poster/event-poster.component';

@Component({
  selector: 'app-event-card',
  imports: [MatIcon, EventPosterComponent],
  templateUrl: './event-card.component.html',
  styleUrl: './event-card.component.scss',
})
export class EventCardComponent implements OnInit {
  @Input() event!: TcgEvent;
  hidden = true;

  defaultPoster = 'assets/posters/default.png';

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('EventCard initialized with event:', this.event);
  }

  onPosterError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultPoster;
  }

  showPoster() {
    setTimeout(() => {
      this.hidden = false;
    }, 100);
    console.log('Showing poster for event:', this.event.title, this.hidden);
  }
}
