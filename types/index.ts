// ─── User & Profile ───────────────────────────────────────────────────────────

export interface UserProfile {
  uid: string;
  username: string;
  displayName: string;
  bio: string;
  avatarUrl: string;
  email: string;
  theme: ProfileTheme;
  blocks: Block[];
  createdAt: number;
  updatedAt: number;
}

export interface ProfileTheme {
  background: string;   // hex or gradient string
  accentColor: string;
  fontFamily: string;
  layout: 'centered' | 'wide';
}

// ─── Block System ─────────────────────────────────────────────────────────────

export type BlockType =
  | 'link'
  | 'text'
  | 'music'
  | 'store'
  | 'booking'
  | 'lead_capture'
  | 'game';

export interface BaseBlock {
  id: string;
  type: BlockType;
  order: number;
  visible: boolean;
  createdAt: number;
}

export interface LinkBlock extends BaseBlock {
  type: 'link';
  data: {
    title: string;
    url: string;
    description?: string;
    thumbnail?: string;
    style: 'button' | 'card';
  };
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  data: {
    content: string;
    align: 'left' | 'center' | 'right';
    size: 'sm' | 'md' | 'lg';
  };
}

export interface MusicBlock extends BaseBlock {
  type: 'music';
  data: {
    title: string;
    artist: string;
    audioUrl: string;
    coverUrl?: string;
    price?: number;  // null = free
  };
}

export interface StoreBlock extends BaseBlock {
  type: 'store';
  data: {
    title: string;
    description: string;
    price: number;
    currency: string;
    imageUrl?: string;
    checkoutUrl?: string;
  };
}

export interface BookingBlock extends BaseBlock {
  type: 'booking';
  data: {
    title: string;
    description: string;
    calendarUrl: string;  // Calendly / Cal.com link
  };
}

export interface LeadCaptureBlock extends BaseBlock {
  type: 'lead_capture';
  data: {
    headline: string;
    subtext: string;
    collectEmail: boolean;
    collectPhone: boolean;
    ctaText: string;
    successMessage: string;
  };
}

export interface GameBlock extends BaseBlock {
  type: 'game';
  data: {
    gameType: 'spin_wheel' | 'scratch_card' | 'quiz';
    title: string;
    description: string;
    entryCondition: 'free' | 'email' | 'payment';
    entryPrice?: number;
    rewards: GameReward[];
  };
}

export type Block =
  | LinkBlock
  | TextBlock
  | MusicBlock
  | StoreBlock
  | BookingBlock
  | LeadCaptureBlock
  | GameBlock;

// ─── Games ────────────────────────────────────────────────────────────────────

export interface GameReward {
  id: string;
  label: string;
  type: 'discount' | 'unlock' | 'prize' | 'none';
  value?: string;  // discount code, unlock key, etc.
  probability: number;  // 0–100
  color?: string;
}

export interface GameEntry {
  id: string;
  profileId: string;
  blockId: string;
  playerEmail?: string;
  result: GameReward;
  playedAt: number;
}

// ─── Leads ────────────────────────────────────────────────────────────────────

export interface Lead {
  id: string;
  profileId: string;
  blockId: string;
  email?: string;
  phone?: string;
  capturedAt: number;
}

// ─── Orders ───────────────────────────────────────────────────────────────────

export interface Order {
  id: string;
  profileId: string;
  buyerEmail: string;
  items: OrderItem[];
  total: number;
  currency: string;
  status: 'pending' | 'paid' | 'failed';
  createdAt: number;
}

export interface OrderItem {
  blockId: string;
  title: string;
  price: number;
  quantity: number;
}
