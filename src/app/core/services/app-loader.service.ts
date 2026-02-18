import { inject, Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AppLoaderComponent } from '../overlay/app-loader/app-loader.component';

@Injectable({
  providedIn: 'root',
})
export class AppLoaderService {
  private overlay = inject(Overlay);
  private overlayRef: OverlayRef | null = null;

  private requests = 0;
  private visible = false;
  private timer: ReturnType<typeof setTimeout> | null = null;

  show() {
    this.requests++;

    // delay anti-flicker
    if (!this.visible) {
      this.timer = setTimeout(() => {
        if (this.requests > 0) {
          this.attachOverlay();
        }
      }, 250);
    }
  }

  hide() {
    this.requests = Math.max(0, this.requests - 1);

    if (this.requests === 0) {
      if (this.timer !== null) {
        clearTimeout(this.timer);
      }
      this.detachOverlay();
    }
  }

  private attachOverlay() {
    if (this.overlayRef) return;

    this.overlayRef = this.overlay.create({
      hasBackdrop: false,
      positionStrategy: this.overlay
        .position()
        .global()
        .centerHorizontally()
        .centerVertically(),
      scrollStrategy: this.overlay.scrollStrategies.block(),
    });

    const portal = new ComponentPortal(AppLoaderComponent);
    this.overlayRef.attach(portal);
    this.visible = true;
  }

  private detachOverlay() {
    if (!this.overlayRef) return;

    this.overlayRef.detach();
    this.overlayRef.dispose();
    this.overlayRef = null;
    this.visible = false;
  }
}
