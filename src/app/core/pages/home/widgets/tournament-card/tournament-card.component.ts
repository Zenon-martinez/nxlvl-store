import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ITournament } from '@models/tournament.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tournament-card',
  imports: [DatePipe, MatIcon],
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.scss',
})
export class TournamentCardComponent {
  @Input() tournament!: ITournament;
}
