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

//Se va a eliminar la clase Product

export interface Pricing {
  price: number;
  originalPrice: number | null;
  currency: Currency;
  discountPercentage: number | null;
}

export type Currency = 'MXN' | 'USD';

export interface Inventory {
  stock: number;
  reserved: number;
  status: InventoryStatus;
  condition: ProductCondition;
}

export type InventoryStatus = 'in_stock' | 'out_of_stock' | 'pre_order';
export type ProductCondition = 'sealed' | 'used';

export interface Media {
  thumbnail: string;
  images: ProductImage[];
  videos: ProductVideo[];
}

export interface ProductImage {
  url: string;
  type: ImageType;
}

export type ImageType = 'main' | 'gallery';

export interface ProductVideo {
  url: string;
  platform: VideoPlatform;
}

export type VideoPlatform = 'youtube' | 'vimeo';

export interface Classification {
  categories: string[];
  mechanics: string[];
  complexity: ComplexityLevel;
}

export type ComplexityLevel = 'easy' | 'medium' | 'hard';

export interface Gameplay {
  players: PlayerRange;
  playTime: TimeRange;
  age: number;
  language: string;
}

export interface PlayerRange {
  min: number;
  max: number;
}

export interface TimeRange {
  min: number;
  max: number;
}

export interface Editorial {
  publisher: string;
  designer: string | null;
}

export interface Description {
  short: string;
  long: string;
  components: string[];
  highlights: string[];
}

export interface AdditionalInfo {
  weight: Weight | null;
  dimensions: Dimensions | null;
  material: string | null;
  tags: string[];
}

export interface Weight {
  value: number;
  unit: WeightUnit;
}

export type WeightUnit = 'kg' | 'g';

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
  unit: DimensionUnit;
}

export type DimensionUnit = 'cm' | 'mm';

export interface HowToPlayStep {
  title: string;
  steps: string[];
}

export interface Expansion {
  name: string;
  slug: string;
}

export interface Rating {
  average: number;
  count: number;
}

export interface Flags {
  isFeatured: boolean;
  isNew: boolean;
  isBestSeller: boolean;
}

export interface Seo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Audit {
  createdAt: string; // ISO Date
  updatedAt: string; // ISO Date
}

export type ProductV2 =
  | BoardGameProduct
  | TcgCardProduct
  | TcgSealedProduct
  | AccessoryProduct;

export interface BaseProduct {
  id: string;
  name: string;
  slug: string;

  pricing: Pricing;
  inventory: Inventory;
  media: Media;

  classification: Classification;

  rating: Rating;
  flags: Flags;
  seo: Seo | null;
  audit: Audit;

  productType: ProductType;
}

export interface BoardGameProduct extends BaseProduct {
  productType: 'board_game';

  gameplay: Gameplay;
  editorial: Editorial;
  description: Description;
  additionalInfo: AdditionalInfo;

  howToPlay: HowToPlayStep[];
  expansions: Expansion[];
}

export interface TcgCardProduct extends BaseProduct {
  type: 'tcg-card';

  rarity: RarityEnum;
  foil: boolean;
  cardStatus: CardStatusEnum;

  set: string;
  number: string;
}

export interface TcgSealedProduct extends BaseProduct {
  type: 'tcg-sealed';

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

export interface BoardGameProductResponse {
  products: BoardGameProduct[];
}

export type ProductType = 'board_game' | 'tcg_card' | 'tcg_sealed' | 'accessory';

/* export enum CardStatusEnum {
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

export interface Players {
  min: number;
  max: number;
}





export interface BoardGameProduct extends BaseProduct {
  type: 'board-game';

  condition?: 'new' | 'demo';

  players: Players;
  playTime: number;
  age: number;

  publisher: string;

  // solo demo
  demoDetails?: {
    condition: 'excellent' | 'good' | 'used';
    notes: string;
  };
}


 */
