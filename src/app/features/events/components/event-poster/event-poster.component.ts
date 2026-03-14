import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { TcgEvent } from '@models/tournament.interface';

@Component({
  selector: 'app-event-poster',
  imports: [CommonModule, MatIcon],
  templateUrl: './event-poster.component.html',
  styleUrl: './event-poster.component.scss',
})
export class EventPosterComponent {
  @Input() hidden = true;
  @Input() event!: TcgEvent;
  @Output() hiddenChange = new EventEmitter<boolean>();

  defaultPoster = 'assets/posters/default.png';

  hidePoster() {
    this.hidden = true;
    this.hiddenChange.emit(this.hidden);
  }

  onPosterError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultPoster;
  }
}
