import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nxl-masters',
  imports: [MatIconModule],
  templateUrl: './nxl-masters.component.html',
  styleUrl: './nxl-masters.component.scss',
})
export class NxlMastersComponent {
  scrollToRules(event: Event): void {
    event.preventDefault();

    const target = document.getElementById('nxl-masters-features');

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToClassification(event: Event): void {
    event.preventDefault();

    const target = document.getElementById('nxl-masters-classification');

    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
