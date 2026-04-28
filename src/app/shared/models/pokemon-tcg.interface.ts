export interface Set {
  id: string;
  name: string;
  slug: string;
  tcg: SetTcg;
  release: SetRelease;
  status: SetStatus;
  media: SetMedia;
  ui: SetUI;
  stats: SetStats;
  meta: SetMeta;
}

export interface SetTcg {
  game: TcgGame;
  era: string;
  setCode: string;
}

export type TcgGame = 'pokemon' | 'magic' | 'one_piece' | 'yugioh';

export interface SetRelease {
  date: string | null; // ISO string
  formatted: string; // UI ready
}

export interface SetStatus {
  availability: AvailabilityStatus;
  isNew: boolean;
  isTrending: boolean;
}

export type AvailabilityStatus = 'available' | 'out_of_stock' | 'upcoming';

export interface SetMedia {
  coverImage: string;
  logo?: string;
  symbol: string;
  background: SetBackground;
}

export interface SetBackground {
  type: BackgroundType;
  image: string;
}

export type BackgroundType = 'artwork' | 'gradient' | 'image';

export interface SetUI {
  badges: SetBadge[];
  cta: SetCTA;
}

export interface SetBadge {
  label: string;
  variant: BadgeVariant;
}

export type BadgeVariant = 'primary' | 'secondary' | 'warning' | 'neutral';

export interface SetCTA {
  label: string;
  icon?: string;
  action: CTAAction;
}

export type CTAAction = 'navigate' | 'modal' | 'external';

export interface SetStats {
  totalCards: number;
  secretRares: number;
}

export interface SetMeta {
  language: string;
  region: Region;
}

export type Region = 'international' | 'japan' | 'korea';

export interface SetsResponse {
  sets: Set[];
}
