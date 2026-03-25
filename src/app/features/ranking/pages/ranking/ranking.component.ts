import { Component, OnInit, effect, inject } from '@angular/core';
import { RankingTableComponent } from '../../components/ranking-table/ranking-table.component';
import { MatIcon } from '@angular/material/icon';
import { RankingRulesComponent } from '../../components/ranking-rules/ranking-rules.component';
import { RulesPanelStore } from '../../store/rules-panel.store';
import { PlayerRanking } from '@models/player-ranking.interface';
import { RankingService } from '../../services/ranking.service';
import { RankingStore } from '../../../../core/state/app-ranking.service';
import { DialogService } from '@shared/dialogs/dialog.service';
import { AvatarModalComponent } from '../../components/avatar-modal/avatar-modal.component';

@Component({
  selector: 'app-ranking',
  imports: [RankingTableComponent, MatIcon, RankingRulesComponent],
  templateUrl: './ranking.component.html',
  styleUrl: './ranking.component.scss',
})
export class RankingComponent implements OnInit {
  rulesPanel = inject(RulesPanelStore);
  rankingService = inject(RankingService);
  store = inject(RankingStore);
  dialogService = inject(DialogService);

  firstsPlayers: PlayerRanking[] = [];
  defaultAvatar = 'assets/avatares/default.jpg';

  constructor() {
    effect(() => {
      this.loadFirstsPlayers();
    });
  }

  ngOnInit() {
    this.store.load();
  }

  private async loadFirstsPlayers() {
    this.firstsPlayers = this.store.firstsPlayers();
    console.log(this.firstsPlayers);
  }

  onAvatarError(event: Event) {
    const img = event.target as HTMLImageElement;
    img.src = this.defaultAvatar;
  }

  openAvatarImage(event: Event, name: string) {
    const img = event.target as HTMLImageElement;
    const url = img.src;
    this.dialogService.open(AvatarModalComponent, { avatarUrl: url, name });
    console.log('Avatar clicked:', url);
  }
}
