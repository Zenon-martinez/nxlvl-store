import { Component } from '@angular/core';
import { TournamentCardComponent } from '../tournament-card/tournament-card.component';
import { ITournament } from '@models/tournament.interface';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-trending',
  imports: [TournamentCardComponent, MatIcon],
  templateUrl: './trending.component.html',
  styleUrl: './trending.component.scss',
})
export class TrendingComponent {
  tournaments: ITournament[] = [
    {
      id: 1,
      name: 'Commander Night',
      date: '2026-02-20T17:00:00',
      availability: 24,
      format: 'Commander Casual',
      prizePool: '1 sobre por participación + rifa entre mesas',
      imageUrl: 'https://images.ctfassets.net/s5n2t79q9icq/commander-event.jpg',
      cost: 80,
      type: 'Magic: The Gathering',
    },
    {
      id: 2,
      name: 'Friday Night Magic - Estándar',
      date: '2026-02-21T18:00:00',
      availability: 16,
      format: 'Estándar',
      prizePool: '2 sobres por victoria + promo FNM',
      imageUrl:
        'https://images.ctfassets.net/s5n2t79q9icq/5tO5l0RkRkUu0k1m1YtR7I/standard-fnm.jpg',
      cost: 100,
      type: 'Magic: The Gathering',
    },
    {
      id: 3,
      name: 'Copa Local Pokémon TCG',
      date: '2026-02-22T12:00:00',
      availability: 20,
      format: 'Estándar',
      prizePool: 'Puntos Play! Pokémon + Premios de Ascended Heroes',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/trading-card-game/_tiles/tournaments/league-challenge.jpg',
      cost: 70,
      type: 'Pokémon TCG',
    },
    {
      id: 4,
      name: 'Copa Local Pokémon TCG - Equipo Rocket',
      date: '2026-02-22T12:00:00',
      availability: 20,
      format: 'Estándar',
      prizePool: 'Puntos Play! Pokémon + Premios de Team Rocket',
      imageUrl:
        'https://assets.pokemon.com/assets/cms2/img/trading-card-game/_tiles/tournaments/league-challenge.jpg',
      cost: 70,
      type: 'Pokémon TCG',
    },
  ];
}
