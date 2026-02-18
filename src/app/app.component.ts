import { Component, effect, inject } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { AppLoaderService } from '@services/app-loader.service';
import { MaintenanceService } from '@services/maintenance.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-starter-template';

  maintenance = inject(MaintenanceService);
  private router = inject(Router);
  private loader = inject(AppLoaderService);

  constructor() {
    effect(() => {
      if (!this.maintenance.isMaintenance() && this.router.url === '/maintenance') {
        this.router.navigate(['/home']);
      }
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loader.show();
      }

      if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loader.hide();
      }
    });
  }
}
