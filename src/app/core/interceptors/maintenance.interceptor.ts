import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { MaintenanceService } from '../services/maintenance.service';
import { catchError, throwError } from 'rxjs';

export const maintenanceInterceptor: HttpInterceptorFn = (req, next) => {
  const maintenance = inject(MaintenanceService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 503) {
        maintenance.enable();
        router.navigate(['/maintenance']);
      }

      return throwError(() => err);
    }),
  );
};
