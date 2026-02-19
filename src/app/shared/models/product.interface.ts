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
