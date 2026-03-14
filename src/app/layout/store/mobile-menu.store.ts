import { Injectable, signal, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MobileMenuStore {
  isOpen = signal(false);

  constructor() {
    // bloquear scroll del body
    effect(() => {
      if (this.isOpen()) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  open() {
    this.isOpen.set(true);
  }
  close() {
    this.isOpen.set(false);
  }
  toggle() {
    this.isOpen.update((v) => !v);
  }
}
