import { badges } from "@/data/badges";
import { levels } from "@/data/levels";
import { movies } from "@/data/movies";
import { rewards } from "@/data/rewards";
import { ticketTypes } from "@/data/tickets";
import { defaultProgress } from "@/data/userProgress";
import type { AnalyticsEvent, Level, Movie, Reward, Ticket, UserProgress } from "@/types";

export const STORAGE_KEY = "nafilm-progress-v1";

const todayKey = () => new Date().toISOString().slice(0, 10);

export function hydrateProgress(value: unknown): UserProgress {
  if (!value || typeof value !== "object") {
    return defaultProgress;
  }

  return {
    ...defaultProgress,
    ...(value as Partial<UserProgress>),
    miniGame: {
      ...defaultProgress.miniGame,
      ...((value as Partial<UserProgress>).miniGame ?? {}),
    },
    analytics: (value as Partial<UserProgress>).analytics ?? [],
  };
}

export function loadProgress(): UserProgress {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? hydrateProgress(JSON.parse(stored)) : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: UserProgress) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function makeAnalyticsEvent(
  event: string,
  meta?: AnalyticsEvent["meta"]
): AnalyticsEvent {
  return {
    event,
    meta,
    createdAt: new Date().toISOString(),
  };
}

export function track(progress: UserProgress, event: string, meta?: AnalyticsEvent["meta"]) {
  const analytics = [makeAnalyticsEvent(event, meta), ...progress.analytics].slice(0, 80);
  console.info("[NaFilM analytics]", event, meta ?? {});
  return {
    ...progress,
    analytics,
  };
}

export function createMockTicket(typeId: string): Ticket {
  const ticketType = ticketTypes.find((type) => type.id === typeId) ?? ticketTypes[0];
  const suffix = Math.random().toString(36).slice(2, 8).toUpperCase();

  return {
    id: `NFLM-${Date.now().toString(36).toUpperCase()}-${suffix}`,
    typeId: ticketType.id,
    typeLabel: ticketType.label,
    validity: "1 year",
    createdAt: new Date().toISOString(),
  };
}

export function completeLevel(progress: UserProgress, level: Level, selectedOption: string) {
  const alreadyCompleted = progress.completedLevels.some((entry) => entry.levelId === level.id);

  if (alreadyCompleted) {
    return track(progress, "level_replayed", { levelId: level.id });
  }

  const nextBadges = progress.badges.includes(level.badgeId)
    ? progress.badges
    : [...progress.badges, level.badgeId];
  const nextSignals = Array.from(
    new Set([...progress.recommendationSignals, ...level.recommendationSignals])
  );

  const nextProgress = {
    ...progress,
    completedLevels: [
      ...progress.completedLevels,
      {
        levelId: level.id,
        selectedOption,
        points: level.points,
        badgeId: level.badgeId,
        recommendationSignals: level.recommendationSignals,
        completedAt: new Date().toISOString(),
      },
    ],
    points: progress.points + level.points,
    badges: nextBadges,
    recommendationSignals: nextSignals,
  };

  const finishedAll = nextProgress.completedLevels.length >= levels.length;
  const withIdentity = finishedAll
    ? {
        ...nextProgress,
        finalIdentity: determineIdentity(nextProgress),
        points: nextProgress.finalIdentity ? nextProgress.points : nextProgress.points + 180,
      }
    : nextProgress;

  return track(withIdentity, "level_completed", {
    levelId: level.id,
    badgeId: level.badgeId,
    points: level.points,
  });
}

export function determineIdentity(progress: UserProgress) {
  const signals = progress.recommendationSignals;
  const score = {
    "Sound Designer": countSignals(signals, ["sound-design", "thriller", "atmosphere"]),
    Animator: countSignals(signals, ["animation", "stop-motion", "playful"]),
    "Visual Dreamer": countSignals(signals, ["visual", "light-shadow", "visual-storytelling", "noir"]),
    "Classic Cinema Explorer": countSignals(signals, ["classic-cinema", "film-history", "craft"]),
    "Experimental Director": countSignals(signals, ["experimental", "visual-illusion"]),
  };

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Auteur";
}

function countSignals(signals: string[], wanted: string[]) {
  return signals.filter((signal) => wanted.includes(signal)).length;
}

export function getBadge(id: string) {
  return badges.find((badge) => badge.id === id);
}

export function getLevel(id: string) {
  return levels.find((level) => level.id === id);
}

export function getNextLevel(progress: UserProgress) {
  return levels.find((level) => !progress.completedLevels.some((entry) => entry.levelId === level.id));
}

export function isMissionComplete(progress: UserProgress) {
  return progress.completedLevels.length >= levels.length;
}

export function getRecommendations(progress: UserProgress): Movie[] {
  const signals = progress.recommendationSignals;
  const completedSignals = new Set(signals);
  const identityBoosts = identityTags(progress.finalIdentity);

  return [...movies]
    .map((movie) => {
      const tagScore = movie.tags.reduce(
        (score, tag) => score + (completedSignals.has(tag) ? 4 : 0) + (identityBoosts.includes(tag) ? 2 : 0),
        0
      );
      const techniqueScore = movie.techniqueTags.reduce(
        (score, tag) => score + (signals.some((signal) => tag.includes(signal.split("-")[0])) ? 1 : 0),
        0
      );
      return {
        movie,
        score: tagScore + techniqueScore,
      };
    })
    .sort((a, b) => b.score - a.score || a.movie.year - b.movie.year)
    .slice(0, 5)
    .map((entry) => entry.movie);
}

function identityTags(identity: string | null) {
  switch (identity) {
    case "Sound Designer":
      return ["sound-design", "thriller", "atmosphere"];
    case "Animator":
      return ["animation", "stop-motion"];
    case "Visual Dreamer":
      return ["visual", "shadow", "atmosphere"];
    case "Classic Cinema Explorer":
      return ["classic", "projection"];
    case "Experimental Director":
      return ["visual", "poetic"];
    default:
      return [];
  }
}

export function getMovie(id: string) {
  return movies.find((movie) => movie.id === id);
}

export function getReward(id: string) {
  return rewards.find((reward) => reward.id === id);
}

export function getLoyaltyStatus(progress: UserProgress) {
  const completedCount = progress.completedLevels.length;
  const badgeCount = progress.badges.length;

  if (isMissionComplete(progress) && progress.savedMovies.length > 0) {
    return {
      level: "Cinephile",
      current: progress.savedMovies.length,
      target: 3,
      next: "Save more films for later",
    };
  }

  if (isMissionComplete(progress)) {
    return {
      level: "Auteur",
      current: 1,
      target: 1,
      next: "Save a recommended movie",
    };
  }

  if (badgeCount >= 5) {
    return {
      level: "Specialist",
      current: completedCount,
      target: levels.length,
      next: "Complete the full mission",
    };
  }

  if (completedCount >= 3) {
    return {
      level: "Crew Member",
      current: badgeCount,
      target: 5,
      next: "Earn 5 badges",
    };
  }

  if (progress.missionStarted) {
    return {
      level: "Trainee",
      current: completedCount,
      target: 3,
      next: "Complete 3 levels",
    };
  }

  if (progress.ticket) {
    return {
      level: "Visitor",
      current: 0,
      target: 1,
      next: "Start the mission",
    };
  }

  return {
    level: "Guest",
    current: 0,
    target: 1,
    next: "Create a ticket",
  };
}

export function canRedeem(progress: UserProgress, reward: Reward) {
  return reward.active && progress.points >= reward.cost && !progress.redeemedRewards.includes(reward.id);
}

export function awardMiniGameCredits(progress: UserProgress, score: number, credits: number) {
  const date = todayKey();
  const creditsToday = progress.miniGame.lastPlayedDate === date ? progress.miniGame.creditsToday : 0;
  const available = Math.max(0, 300 - creditsToday);
  const awarded = Math.min(available, credits);

  return {
    progress: track(
      {
        ...progress,
        points: progress.points + awarded,
        miniGame: {
          highScore: Math.max(progress.miniGame.highScore, score),
          creditsToday: creditsToday + awarded,
          lastPlayedDate: date,
        },
      },
      "mini_game_played",
      { score, awarded }
    ),
    awarded,
    capRemaining: Math.max(0, available - awarded),
  };
}
