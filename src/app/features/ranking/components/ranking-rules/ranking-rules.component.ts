import { Component, inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RulesPanelStore } from '../../store/rules-panel.store';

@Component({
  selector: 'app-ranking-rules',
  imports: [MatIcon],
  templateUrl: './ranking-rules.component.html',
  styleUrl: './ranking-rules.component.scss',
})
export class RankingRulesComponent {
  rulesPanel = inject(RulesPanelStore);
}
