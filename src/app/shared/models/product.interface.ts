export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  category: string;
  status: 'available' | 'out-of-stock' | 'pre-order';
  rarity: RarityEnum;
  discount?: number; // Optional discount percentage
  releaseDate: Date;
  stockQuantity: number;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  foil: boolean;
  cardStatus: CardStatusEnum;
}

export enum CardStatusEnum {
  NearMint = 'near-mint',
  LightlyPlayed = 'lightly-played',
  ModeratelyPlayed = 'moderately-played',
  HeavilyPlayed = 'heavily-played',
  Damaged = 'damaged',
  Excellent = 'excellent',
  Mint = 'mint',
}

export enum RarityEnum {
  Common = 'common',
  Uncommon = 'uncommon',
  Rare = 'rare',
  Mythic = 'mythic',
  Promo = 'promo',
  UltraRare = 'ultra-rare',
  SecretRare = 'secret-rare',
}

//Versión mejorada
export type ProductType = 'tcg-card' | 'sealed-product' | 'accessory' | 'board-game';

export interface BaseProduct {
  id: number;
  name: string;
  slug: string;

  type: ProductType;

  price: number;
  originalPrice?: number;

  thumbnail: string;
  imageUrl: string;
  images?: string[];

  description: string;

  category: string;
  tags?: string[];

  status: 'available' | 'out-of-stock' | 'pre-order' | 'in_stock';
  stockQuantity: number;

  createdAt: Date;
  updatedAt: Date;
}

export interface TcgCardProduct extends BaseProduct {
  type: 'tcg-card';

  rarity: RarityEnum;
  foil: boolean;
  cardStatus: CardStatusEnum;

  set: string;
  number: string;
}

export interface SealedProduct extends BaseProduct {
  type: 'sealed-product';

  game: 'pokemon' | 'magic';
  expansion: string;

  sealedType: 'booster-box' | 'etb' | 'bundle' | 'collection';

  releaseDate?: Date;
}

export interface AccessoryProduct extends BaseProduct {
  type: 'accessory';

  accessoryType: 'sleeves' | 'deck-box' | 'binder' | 'playmat';

  brand?: string;
}

export interface BoardGameProduct extends BaseProduct {
  type: 'board-game';

  condition?: 'new' | 'demo';

  playersMin: number;
  playersMax: number;
  playTime: number;
  age: number;

  publisher: string;

  // solo demo
  demoDetails?: {
    condition: 'excellent' | 'good' | 'used';
    notes: string;
  };
}

export interface BoardGameProductResponse {
  products: BoardGameProduct[];
}
