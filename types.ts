export interface Currency {
  code: string;
  symbol: string;
}

export interface Country {
  name: string;
  currency: Currency;
  flag: string;
}

export interface Job {
  title: string;
  type: 'part-time' | 'full-time' | 'education';
  salary: number; // monthly salary
  description: string;
  requirements: {
    ageMin?: number; // in years
    ageMax?: number; // in years
    smartsMin?: number;
    education?: string; // e.g. "High School"
  }
}

export interface Asset {
  id: string;
  type: 'House' | 'Car' | 'Jewelry';
  name: string;
  description: string;
  purchasePrice: number;
  marketValue: number;
  monthlyCost: number; // Can be rent, loan payment, or upkeep
  isRented: boolean;
}

export interface Investment {
  id: string;
  type: 'Stock' | 'Crypto';
  name: string;
  symbol: string;
  shares: number;
  purchasePricePerShare: number;
  currentValuePerShare: number;
}

export interface InvestmentStats {
  totalInvested: number;
  totalReturns: number;
  ageStartedInvesting: number | null; // Age in months
}

export interface NPC {
  id:string;
  name: string;
  relationshipType: string; // e.g. 'Mother', 'Father', 'Sister', 'Half-Brother'
  age: number; // Age in years
  relationshipStatus: number; // 0-100
  avatar: string; // Emoji for the avatar
  gender: 'Male' | 'Female';
  isAlive?: boolean;
  smarts?: number;
  looks?: number;
  health?: number;
  happiness?: number;
  personality?: string;
}

export interface SocialMediaPlatformStats {
  followers: number;
  isMonetized: boolean;
  isVerified: boolean;
  posts: number;
}

export type SocialMediaPlatform = 'Facebook' | 'Instagram' | 'YouTube' | 'Twitter' | 'Twitch' | 'Podcast' | 'OnlyFans';

export interface Ailment {
  id: string;
  name: string;
  description: string;
  severity: 'minor' | 'major' | 'critical';
  treatmentCost: number;
  treatmentSuccessChance: number; // 0 to 1
  untreatedConsequences: {
    healthChange: number; // e.g., -2 per month
  };
}


export interface Character {
  name: string;
  gender: string;
  countryOfBirth: string;
  cityOfBirth: string;
  currentCity: string;
  currency: Currency;
  age: number; // Age in months
  dob: string; // Date of birth string 'YYYY-MM-DD'
  health: number; // 0-100
  happiness: number; // 0-100
  smarts: number; // 0-100
  looks: number; // 0-100
  charisma: number; // 0-100
  karma: number; // 0-100
  moral: number; // 0-100
  fame: number; // 0-100
  personality: string;
  cash: number;
  bankBalance: number;
  isAlive: boolean;
  occupation: string;
  educationLevel: string;
  educationHistory: string[];
  licenses: string[];
  assets: Asset[];
  investments: Investment[];
  investmentStats: InvestmentStats;
  currentJob: Job | null;
  jobHistory: Job[];
  jailHistory: { reason: string; durationInMonths: number }[];
  npcs: NPC[];
  currentPartnerId: string | null;
  ailments: Ailment[];
  isOnDiet: boolean;
  hasCult: boolean;
  socialMedia: {
    [key in SocialMediaPlatform]?: SocialMediaPlatformStats;
  };
  eventHistory: string[];
}

export interface CustomLifeData {
    firstName: string;
    lastName: string;
    gender: string;
    dob_day: string;
    dob_month: string;
    dob_year: string;
    country: string;
    city: string;
    motherName: string;
    fatherName: string;
}

export interface EventOutcome {
  narrative: string;
  healthChange?: number;
  happinessChange?: number;
  smartsChange?: number;
  looksChange?: number;
  charismaChange?: number;
  karmaChange?: number;
  moralChange?: number;
  wealthChange?: number;
  relationshipChange?: { npcId: string, change: number };
  obituary?: string;
  newAilmentId?: string; // ID of a predefined ailment
  startsNewRelationship?: boolean;
  breakup?: boolean;
  fameChange?: number;
  newChild?: boolean;
}

export interface Choice {
  text: string;
  outcomes: {
    probability: number; // 0 to 1
    outcome: EventOutcome;
  }[];
}

export interface GameEvent {
  eventId: string;
  description: string;
  choices: Choice[];
  eventType: 'monthly' | 'interaction';
  targetNpcId?: string;
  condition: (character: Character) => boolean;
}


export interface GameLogEntry {
  age: number; // Age in months
  eventDescription: string;
  choiceText: string;
  outcomeNarrative: string;
  isPositive?: boolean;
}

export type GameStatus = 'start' | 'creating' | 'playing' | 'event' | 'outcome' | 'game_over' | 'bank' | 'job' | 'assets' | 'real_estate' | 'investments' | 'investments_portfolio' | 'investments_stats' | 'investments_news' | 'investments_market' | 'relationships' | 'activities' | 'social_media' | 'platform' | 'doctor' | 'mind_and_body' | 'love' | 'licenses' | 'premium_activities' | 'adoption_center' | 'pets' | 'emigrate';

export interface SavedGameState {
  character: Character;
  log: GameLogEntry[];
}