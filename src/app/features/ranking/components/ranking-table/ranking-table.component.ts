import { Component, effect, inject, OnInit } from '@angular/core';
import { RankingStore } from '../../../../core/state/app-ranking.service';
import { MatIcon } from '@angular/material/icon';
import { PlayerRanking } from '@models/player-ranking.interface';
import { AvatarModalComponent } from '../avatar-modal/avatar-modal.component';
import { DialogService } from '@shared/dialogs/dialog.service';

@Component({
  selector: 'app-ranking-table',
  imports: [MatIcon],
  templateUrl: './ranking-table.component.html',
  styleUrl: './ranking-table.component.scss',
})
export class RankingTableComponent implements OnInit {
  store = inject(RankingStore);
  dialogService = inject(DialogService);
  players: PlayerRanking[] = [];
  defaultAvatar = 'assets/avatares/default.jpg';
  start = 0;
  end = 15;
  length = 0;

  prizes = {
    first: 'assets/avatares/prize_first.png',
    second: 'assets/avatares/prize_second.png',
    third: 'assets/avatares/prize_third.png',
  };

  constructor() {
    effect(() => {
      console.log('Ranking updated:', this.store.ranking());
      this.players = this.store.ranking();
      this.length = this.players.slice(this.start, this.end).length;
    });
  }

  ngOnInit() {
    this.store.load();
  }

  onAvatarError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultAvatar;
  }

  nextPage() {
    if (this.end < this.players.length) {
      this.start += 15;
      this.end += 15;
      this.length = this.players.slice(this.start, this.end).length;
    }
  }

  previousPage() {
    if (this.start > 0) {
      this.start -= 15;
      this.end -= 15;
      this.length = this.players.slice(this.start, this.end).length;
    }
  }

  onPrizeError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/avatares/prize_default.jpg';
  }

  openAvatarImage(event: Event, name: string) {
    const img = event.target as HTMLImageElement;
    const url = img.src;
    this.dialogService.open(AvatarModalComponent, { avatarUrl: url, name });
    console.log('Avatar clicked:', url);
  }
}
