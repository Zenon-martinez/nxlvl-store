import { ProductSpecItem } from '@components/product-specs-list/product-specs-list.component';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  content?: unknown;
  resume: ProductSpecItem[];
}
