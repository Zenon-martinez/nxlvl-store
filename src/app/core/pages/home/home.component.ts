import { Component } from '@angular/core';
import { HeroComponent } from './wigets/hero/hero.component';
import { RestocksComponent } from './wigets/restocks/restocks.component';
import { CardComponent } from '@components/card/card.component';
import { CarouselComponent } from '@components/carousel/carousel.component';
import { SealedComponent } from './wigets/sealed/sealed.component';
import { EventsComponent } from './wigets/events/events.component';
import { TrendingComponent } from './wigets/trending/trending.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    RestocksComponent,
    CardComponent,
    CarouselComponent,
    SealedComponent,
    EventsComponent,
    TrendingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
