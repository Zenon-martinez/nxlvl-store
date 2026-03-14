import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer,
  ) {}

  register(): void {
    const icons = [
      'search',
      'shopping_cart',
      'account_circle',
      'menu',
      'close',
      'star',
      'layers',
      'arrow-back',
      'arrow-forward',
      'arrow',
      'open_in_new',
      'event_available',
      'share',
      'videocam',
      'chat_bubble',
      'location_on',
      'schedule',
      'add_shopping_cart',
      'info',
      'calendar_today',
      'group',
      'info',
      'payments',
      'login',
      'pkm_tcg_logo',
      'mtg_logo',
      'military_tech',
      'rule',
      'workspace_premium',
      'trophy',
      'stadium',
      'star_shine',
      'chevron_left',
      'chevron_right',
      'confirmation_number',
      'fact_check',
      'bolt',
      'groups',
      'warning',
      'calendar_month',
      'add_circle',
      'event',
    ];

    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.sanitizer.bypassSecurityTrustResourceUrl(`assets/icons/${icon}.svg`),
      );
    });
  }
}
