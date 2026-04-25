import { Component, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import {
  ProductSpecItem,
  ProductSpecsListComponent,
} from '@components/product-specs-list/product-specs-list.component';
import { Tab } from '@models/custom-ui.interface';
import {
  AdditionalInfo,
  Description,
  Expansion,
  HowToPlayStep,
} from '@models/product.interface';

@Component({
  selector: 'app-product-details-tabs',
  imports: [ProductSpecsListComponent],
  templateUrl: './product-details-tabs.component.html',
  styleUrl: './product-details-tabs.component.scss',
})
export class ProductDetailsTabsComponent implements OnChanges {
  @Input() tabs: Tab[] = [];
  activeTab = signal('');

  get activeTabData(): Tab | undefined {
    return this.tabs.find((tab) => tab.id === this.activeTab());
  }

  get additionalInfoSpecs(): ProductSpecItem[] {
    const content = this.activeTabData?.content;

    if (!this.isAdditionalInfo(content)) {
      return [];
    }

    return [
      {
        label: 'Peso',
        value: content.weight ? `${content.weight.value} ${content.weight.unit}` : 'N/D',
      },
      {
        label: 'Dimensiones',
        value: content.dimensions
          ? `${content.dimensions.width}x${content.dimensions.height}x${content.dimensions.depth} ${content.dimensions.unit}`
          : 'N/D',
      },
      {
        label: 'Material',
        value: content.material || 'N/D',
      },
    ];
  }

  selectTab(tabId: string): void {
    this.activeTab.set(tabId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['tabs'] &&
      changes['tabs'].currentValue &&
      changes['tabs'].currentValue.length > 0
    ) {
      this.activeTab.set(this.tabs[0].id);
    } else {
      this.activeTab.set('');
    }
  }

  isDescription(content: unknown): content is Description {
    return (
      !!content && typeof content === 'object' && 'short' in content && 'long' in content
    );
  }

  isAdditionalInfo(content: unknown): content is AdditionalInfo {
    return !!content && typeof content === 'object' && 'tags' in content;
  }

  isHowToPlay(content: unknown): content is HowToPlayStep[] {
    return (
      Array.isArray(content) &&
      content.every((item) => !!item && typeof item === 'object' && 'title' in item)
    );
  }

  isExpansions(content: unknown): content is Expansion[] {
    return (
      Array.isArray(content) &&
      content.every((item) => !!item && typeof item === 'object' && 'name' in item)
    );
  }
}
