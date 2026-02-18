import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppLoaderService } from '@services/app-loader.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loader = inject(AppLoaderService);

  loader.show();

  return next(req).pipe(finalize(() => loader.hide()));
};
