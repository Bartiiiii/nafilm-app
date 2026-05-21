import type { UserProgress } from "@/types";

export const defaultProgress: UserProgress = {
  userName: "Cineaste",
  quizAnswers: null,
  quizRecommendedIds: [],
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
