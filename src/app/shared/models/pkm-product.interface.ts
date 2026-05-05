import { ProductSectionType } from '@shared/enum/pkm-products.enum';

export interface BasePokemonProduct {
  id: string;

  name: LocaleString;

  type: ProductSectionType;

  expansion: ExpansionInfo;

  price: ProductPrice;

  images: ProductImage[];

  content: ProductContent;

  contents: PokemonBoxContents;

  pullRates?: TcgPullRateExpectation;

  isPokemonCenterExclusive: boolean;

  releaseDate: string; // ISO string

  inventory: ProductInventory;
}

export interface LocaleString {
  es: string;
  en: string;
}

export interface ExpansionInfo {
  code: string;
  name: LocaleString;
}

export interface ProductPrice {
  amount: number;
  currency: 'MXN' | 'USD';
}

export interface ProductImage {
  url: string;
  type?: string;
}

export interface ProductContent {
  shortDescription: LocaleString;
  longDescription: LocaleString;
  features: LocaleString[];
}

export interface PokemonBoxContents {
  boosterPacks: number;
  promoCards: number;

  sleeves: {
    included: boolean;
    quantity?: number;
  };

  energyCards: {
    included: boolean;
    quantity?: number;
  };

  dice: boolean;
  conditionMarkers: boolean;

  playerGuide?: boolean;
  deckBox?: boolean;
  dividers?: number;
  codeCard?: boolean;
}

export interface TcgPullRateExpectation {
  avgHits?: number;
}

export interface ProductInventory {
  stock: number;
  status: 'in_stock' | 'out_of_stock' | 'preorder';
}
