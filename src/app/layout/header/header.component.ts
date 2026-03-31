import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AppCartService } from '../../core/state/app-cart.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MobileMenuStore } from '../store/mobile-menu.store';

@Component({
  selector: 'app-header',
  imports: [MatIconModule, MatMenuModule, RouterLinkActive, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private router = inject(Router);
  private cartStore = inject(AppCartService);
  private mobileMenu = inject(MobileMenuStore);

  cartCount = signal(0);
  activeGame = signal<'pokemon' | 'mtg'>('pokemon');
  private menuTimeout: any;

  goToCart() {
    this.router.navigate(['/cart']);
  }

  switchGame(game: 'pokemon' | 'mtg') {
    console.log('Switching game to', game);
    this.activeGame.set(game);
  }

  search(term: string) {
    if (!term.trim()) return;
    this.router.navigate(['/catalog'], {
      queryParams: { q: term },
    });
  }

  toggleMobileMenu() {
    this.mobileMenu.toggle();
  }

  openMenu(trigger: any) {
    clearTimeout(this.menuTimeout);
    trigger.openMenu();
  }

  closeMenu(trigger: any) {
    this.menuTimeout = setTimeout(() => {
      trigger.closeMenu();
    }, 150); // delay para evitar parpadeo
  }

  keepOpen() {
    clearTimeout(this.menuTimeout);
  }
}
