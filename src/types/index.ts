export type SequenceItem = { id: string; label: string; emoji: string };
export type MatchPair = { left: string; right: string };
export type QuizQuestion = { text: string; options: string[]; correct: number };

export type GameData =
  | { type: "sequence"; items: SequenceItem[]; correctOrder: string[] }
  | { type: "match"; pairs: MatchPair[] }
  | { type: "quiz"; questions: QuizQuestion[]; passMark?: number };

export type Level = {
  id: string;
  order: number;
  title: string;
  room: string;
  description: string;
  game: GameData;
  curioFacts: string[];
  points: number;
  badgeId: string;
  recommendationSignals: string[];
};

export type Badge = {
  id: string;
  title: string;
  description: string;
  signal: string;
};

export type Movie = {
  id: string;
  title: string;
  year: number;
  tags: string[];
  description: string;
  reason: string;
  posterUrl: string;
  trailerUrl: string;
  techniqueTags: string[];
};

export type Reward = {
  id: string;
  title: string;
  cost: number;
  description: string;
  type: "discount" | "content" | "experience";
  active: boolean;
};

export type QuizAnswers = {
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  q5: string;
};

export type CatalogMovie = {
  id: string;
  title: string;
  year: number;
  director: string;
  country: string;
  genre: string;
  rating: string;
  description: string;
  tags: string[];
};

export type TicketType = {
  id: string;
  label: string;
  price: string;
  points: number;
};

export type Ticket = {
  id: string;
  typeId: string;
  typeLabel: string;
  validity: string;
  createdAt: string;
};

export type CompletedLevel = {
  levelId: string;
  selectedOption: string;
  points: number;
  badgeId: string;
  recommendationSignals: string[];
  completedAt: string;
};

export type AnalyticsEvent = {
  event: string;
  createdAt: string;
  meta?: Record<string, string | number | boolean>;
};

export type MiniGameState = {
  highScore: number;
  creditsToday: number;
  lastPlayedDate: string;
};

export type UserProgress = {
  userName: string;
  quizAnswers: QuizAnswers | null;
  quizRecommendedIds: string[];
  ticket: Ticket | null;
  missionStarted: boolean;
  completedLevels: CompletedLevel[];
  points: number;
  badges: string[];
  recommendationSignals: string[];
  savedMovies: string[];
  redeemedRewards: string[];
  finalIdentity: string | null;
  miniGame: MiniGameState;
  analytics: AnalyticsEvent[];
};
