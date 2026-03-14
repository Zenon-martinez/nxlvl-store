import { Injectable, signal, computed } from '@angular/core';
import { PlayerRanking } from '@models/player-ranking.interface';
import { RankingService } from '../../features/ranking/services/ranking.service';

@Injectable({ providedIn: 'root' })
export class RankingStore {
  private players = signal<PlayerRanking[]>([]);
  private selectedGame = signal<string | null>(null);

  readonly ranking = computed(() => {
    const sorted = [...this.players()].sort((a, b) => b.points - a.points);

    let currentPosition = 0;
    let lastPoints: number | null = null;

    return sorted
      .map((player) => {
        player.winRate = Math.floor(
          (player.wins / (player.wins + player.losses + player.draws)) * 100,
        );
        if (player.points !== lastPoints) {
          currentPosition++;
          lastPoints = player.points;
        }

        return {
          ...player,
          position: currentPosition,
        };
      })
      .splice(3);
  });

  readonly firstsPlayers = computed(() => {
    const sorted = [...this.players()].sort((a, b) => b.points - a.points);
    return sorted.slice(0, 3);
  });

  constructor(private service: RankingService) {}

  async load() {
    const data = await this.service.getRanking();
    this.players.set(data);
  }

  filterByGame(game: string | null) {
    this.selectedGame.set(game);
  }
}
