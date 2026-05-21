import type { UserProgress } from "@/types";

export const defaultProgress: UserProgress = {
  ticket: null,
  missionStarted: false,
  completedLevels: [],
  points: 0,
  badges: [],
  recommendationSignals: [],
  savedMovies: [],
  redeemedRewards: [],
  finalIdentity: null,
  miniGame: {
    highScore: 0,
    creditsToday: 0,
    lastPlayedDate: "",
  },
  analytics: [],
};
