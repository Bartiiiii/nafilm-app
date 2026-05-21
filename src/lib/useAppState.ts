"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { ticketTypes } from "@/data/tickets";
import { defaultProgress } from "@/data/userProgress";
import type { QuizAnswers, UserProgress } from "@/types";
import {
  awardMiniGameCredits as applyMiniGameCredits,
  completeLevel,
  createMockTicket,
  determineIdentity,
  getLevel,
  hydrateProgress,
  loadProgress,
  saveProgress,
  track,
} from "@/lib/progress";

type AppActions = {
  setUserName: (name: string) => void;
  saveQuizResults: (answers: QuizAnswers, recommendedIds: string[]) => void;
  clearQuiz: () => void;
  createTicket: (typeId: string) => void;
  startMission: () => void;
  completeLevel: (levelId: string, selectedOption: string) => void;
  saveMovie: (movieId: string) => void;
  unsaveMovie: (movieId: string) => void;
  redeemReward: (rewardId: string, cost: number) => void;
  finalizeMission: () => void;
  awardMiniGameCredits: (score: number, credits: number) => number;
  resetPrototype: () => void;
};

export function useAppState(): UserProgress & { isLoaded: boolean; actions: AppActions } {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setProgress(hydrateProgress(loadProgress()));
    setIsLoaded(true);
  }, []);

  const update = useCallback((updater: (current: UserProgress) => UserProgress) => {
    const current = typeof window === "undefined" ? progress : loadProgress();
    const next = updater(current);
    saveProgress(next);
    setProgress(next);
    return next;
  }, [progress]);

  const actions = useMemo<AppActions>(
    () => ({
      setUserName(name) {
        update((current) => ({ ...current, userName: name.trim() || current.userName }));
      },
      saveQuizResults(answers, recommendedIds) {
        update((current) => ({ ...current, quizAnswers: answers, quizRecommendedIds: recommendedIds }));
      },
      clearQuiz() {
        update((current) => ({ ...current, quizAnswers: null, quizRecommendedIds: [] }));
      },
      createTicket(typeId) {
        update((current) => {
          const ticket = createMockTicket(typeId);
          const ticketType = ticketTypes.find((type) => type.id === typeId) ?? ticketTypes[0];
          return track(
            {
              ...current,
              ticket,
              points: current.ticket ? current.points : current.points + ticketType.points,
            },
            "ticket_created",
            { ticketId: ticket.id, typeId }
          );
        });
      },
      startMission() {
        update((current) =>
          track(
            {
              ...current,
              missionStarted: true,
              points: current.missionStarted ? current.points : current.points + 80,
            },
            "mission_started"
          )
        );
      },
      completeLevel(levelId, selectedOption) {
        update((current) => {
          const level = getLevel(levelId);
          return level ? completeLevel(current, level, selectedOption) : current;
        });
      },
      saveMovie(movieId) {
        update((current) => {
          if (current.savedMovies.includes(movieId)) {
            return current;
          }

          return track(
            {
              ...current,
              savedMovies: [...current.savedMovies, movieId],
              points: current.points + 35,
            },
            "movie_saved",
            { movieId }
          );
        });
      },
      unsaveMovie(movieId) {
        update((current) => ({
          ...current,
          savedMovies: current.savedMovies.filter((id) => id !== movieId),
        }));
      },
      redeemReward(rewardId, cost) {
        update((current) => {
          if (current.redeemedRewards.includes(rewardId) || current.points < cost) {
            return current;
          }

          return track(
            {
              ...current,
              points: current.points - cost,
              redeemedRewards: [...current.redeemedRewards, rewardId],
            },
            "reward_redeemed",
            { rewardId, cost }
          );
        });
      },
      finalizeMission() {
        update((current) => {
          if (current.finalIdentity) {
            return current;
          }

          return track(
            {
              ...current,
              finalIdentity: determineIdentity(current),
              points: current.points + 180,
            },
            "final_result_generated"
          );
        });
      },
      awardMiniGameCredits(score, credits) {
        const current = typeof window === "undefined" ? progress : loadProgress();
        const result = applyMiniGameCredits(current, score, credits);
        setProgress(result.progress);
        saveProgress(result.progress);
        return result.awarded;
      },
      resetPrototype() {
        update(() => {
          saveProgress(defaultProgress);
          return defaultProgress;
        });
      },
    }),
    [progress, update]
  );

  return {
    ...progress,
    isLoaded,
    actions,
  };
}
