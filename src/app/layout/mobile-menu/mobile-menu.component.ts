import { Component, inject } from '@angular/core';
import { MobileMenuStore } from '../store/mobile-menu.store';
import { MatIcon } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  imports: [MatIcon, RouterModule],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.scss',
})
export class MobileMenuComponent {
  mobileMenu = inject(MobileMenuStore);

  /* @HostListener('document:keydown.escape')
  esc() {
    this.mobileMenu.close();
  } */
}
