import { Component, inject } from '@angular/core';
import { MaintenanceService } from '@services/maintenance.service';

@Component({
  selector: 'app-maintenance',
  imports: [],
  templateUrl: './maintenance.component.html',
  styleUrl: './maintenance.component.scss',
})
export class MaintenanceComponent {
  private maintenance = inject(MaintenanceService);

  retry() {
    this.maintenance.checkServer();
  }
}
