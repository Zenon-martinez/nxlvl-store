import { Component } from '@angular/core';
import { HeroComponent } from './widgets/hero/hero.component';
import { RestocksComponent } from './widgets/restocks/restocks.component';
import { CardComponent } from '@components/card/card.component';
import { SealedComponent } from './widgets/sealed/sealed.component';
import { EventsComponent } from './widgets/events/events.component';
import { TrendingComponent } from './widgets/trending/trending.component';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    RestocksComponent,
    CardComponent,
    SealedComponent,
    EventsComponent,
    TrendingComponent,
    MatIcon,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToRankingPage() {
    this.router.navigate(['/ranking/pokemon']);
  }
}
