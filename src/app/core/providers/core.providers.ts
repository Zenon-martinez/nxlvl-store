import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from '@interceptors/auth.interceptor';
import { errorInterceptor } from '@interceptors/error.interceptor';
import { loadingInterceptor } from '@interceptors/loading.interceptor';
import { maintenanceInterceptor } from '@interceptors/maintenance.interceptor';

export const provideCore = () =>
  provideHttpClient(
    withInterceptors([
      authInterceptor,
      errorInterceptor,
      maintenanceInterceptor,
      loadingInterceptor,
    ]),
  );
