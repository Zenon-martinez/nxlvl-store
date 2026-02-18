import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MaintenanceService } from '@services/maintenance.service';

export const maintenanceGuard: CanActivateFn = () => {
  const maintenance = inject(MaintenanceService);
  const router = inject(Router);

  if (maintenance.isMaintenance()) {
    router.navigate(['/maintenance']);
    return false;
  }

  return true;
};
