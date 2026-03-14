import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { computed, inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BreakpointService {
  breakpointObserver = inject(BreakpointObserver);
  // Observamos varios puntos de quiebre de Angular Material
  private readonly breakpoints$ = this.breakpointObserver
    .observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge,
    ])
    .pipe(map((result) => result.breakpoints));

  // Convertimos el observable en signal (Angular 17 feature 💪)
  readonly breakpoints = toSignal(this.breakpoints$, {
    initialValue: {} as Record<string, boolean>,
  });

  // Signals derivados
  readonly isMobile = computed(
    () => this.breakpoints()[Breakpoints.XSmall] || this.breakpoints()[Breakpoints.Small],
  );

  readonly isTablet = computed(() => this.breakpoints()[Breakpoints.Medium] ?? false);

  readonly isDesktop = computed(
    () => this.breakpoints()[Breakpoints.Large] || this.breakpoints()[Breakpoints.XLarge],
  );
}
