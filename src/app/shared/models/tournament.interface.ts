export interface ITournament {
  id: number;
  name: string;
  date: string;
  availability: number;
  format: string;
  prizePool: string;
  imageUrl: string;
  cost: number;
  type: string;
}

export type TcgGame = 'Magic: The Gathering' | 'Pokémon TCG';

export type EventFormat =
  | 'CASUAL'
  | 'STANDARD'
  | 'ADVANCED'
  | 'EXPANDED'
  | 'MODERN'
  | 'COMMANDER'
  | 'SEALED'
  | 'PIONEER'
  | 'DRAFT';

export type EventTier = 'LOCAL' | 'CUP' | 'CUP_ELITE' | 'REGIONAL' | 'STORE_CHAMPIONSHIP';

export interface TcgEvent {
  id: string;

  // Identidad
  title: string;
  shortTitle: string;
  game: TcgGame;
  tier: EventTier;

  // Programación
  date: Date;
  startTime: string; // "17:00"
  format: EventFormat;

  // Económico
  price: number;
  currency: 'MXN' | 'USD';

  // Capacidad
  capacity: number;
  registeredPlayers: number;

  // Presentación
  coverImageUrl: string;

  // Estado
  isActive: boolean;
  registrationOpen: boolean;
  location: string;
  description?: string;
  prizes?: string;
}
