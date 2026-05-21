"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, ChevronRight, RotateCcw, Sparkles, Star } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { ButtonLink } from "@/components/ButtonLink";
import { SectionHeader } from "@/components/SectionHeader";
import { computeTop5, getQuizMovie } from "@/data/movieRecommendations";
import type { QuizAnswers } from "@/types";
import { useAppState } from "@/lib/useAppState";

const QUESTIONS: {
  key: keyof QuizAnswers;
  text: string;
  options: { value: string; label: string }[];
}[] = [
  {
    key: "q1",
    text: "What kind of stories move you most?",
    options: [
      { value: "A", label: "Playful, adventurous & fantastic" },
      { value: "B", label: "Dark, psychological & unsettling" },
      { value: "C", label: "Human, everyday & emotional" },
      { value: "D", label: "Abstract, experimental & non-narrative" },
      { value: "E", label: "Epic, historical & immersive" },
    ],
  },
  {
    key: "q2",
    text: "Which visual style appeals to you most?",
    options: [
      { value: "A", label: "Colorful, imaginative & full of effects" },
      { value: "B", label: "Dark, atmospheric & noir" },
      { value: "C", label: "Realist, observational & raw" },
      { value: "D", label: "Dreamlike, surreal & poetic" },
      { value: "E", label: "Experimental, fragmented & bold" },
    ],
  },
  {
    key: "q3",
    text: "What kind of atmosphere do you prefer?",
    options: [
      { value: "A", label: "Light, entertaining & fun" },
      { value: "B", label: "Slow, contemplative & meditative" },
      { value: "C", label: "Quirky, playful & eccentric" },
      { value: "D", label: "Tense, brooding & intense" },
      { value: "E", label: "Epic, vast & immersive" },
    ],
  },
  {
    key: "q4",
    text: "Which filmmaking technique interests you most?",
    options: [
      { value: "A", label: "Early cinema tricks & optical illusions" },
      { value: "B", label: "Stop-motion, puppets & handmade animation" },
      { value: "C", label: "Editing rhythm & documentary style" },
      { value: "D", label: "Sound design, Foley & atmosphere" },
      { value: "E", label: "Visual poetry, metaphor & symbolic imagery" },
      { value: "F", label: "Mixing live action with animation" },
      { value: "G", label: "Subtle acting & human observation" },
    ],
  },
  {
    key: "q5",
    text: "What kinds of films are you curious about?",
    options: [
      { value: "A", label: "Czech & Slovak cinema, mainly" },
      { value: "B", label: "International classics" },
      { value: "C", label: "A mix, with Czech films first" },
      { value: "D", label: "Anything that surprises me" },
    ],
  },
];

export default function QuizPage() {
  const progress = useAppState();

  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});

  useEffect(() => {
    if (progress.isLoaded) {
      if (progress.quizAnswers !== null) {
        setAnswers(progress.quizAnswers);
        setStep(6);
      }
    }
  }, [progress.isLoaded]);

  function pickAnswer(key: keyof QuizAnswers, value: string) {
    const next = { ...answers, [key]: value } as Partial<QuizAnswers>;
    setAnswers(next);

    if (step < 5) {
      setStep(step + 1);
    } else {
      const full = next as QuizAnswers;
      const recommendedIds = computeTop5(full);
      progress.actions.saveQuizResults(full, recommendedIds);
      setStep(6);
    }
  }

  function retake() {
    progress.actions.clearQuiz();
    setAnswers({});
    setStep(1);
  }

  if (step === 0) {
    return <IntroScreen onStart={() => setStep(1)} />;
  }

  if (step >= 1 && step <= 5) {
    const q = QUESTIONS[step - 1];
    return (
      <QuestionScreen
        question={q}
        stepIndex={step}
        totalSteps={5}
        onAnswer={(value) => pickAnswer(q.key, value)}
        onBack={() => setStep(step - 1)}
      />
    );
  }

  return (
    <ResultsScreen
      recommendedIds={progress.quizRecommendedIds}
      savedMovies={progress.savedMovies}
      onSave={progress.actions.saveMovie}
      onUnsave={progress.actions.unsaveMovie}
      onRetake={retake}
    />
  );
}

function IntroScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Movies" title="Find your match." />

      <section className="rounded-md border border-ink/10 bg-paper/100 p-6 shadow-soft">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember">
          <Sparkles className="text-paper" size={22} />
        </div>
        <h2 className="mt-4 text-2xl font-black text-ink">Movie Match Quiz</h2>
        <p className="mt-3 text-sm leading-7 text-ink/70">
          Answer 5 questions about your taste in stories, visuals, and filmmaking. We'll hand-pick the 5 Czech and
          international films from our collection that suit you best.
        </p>
        <ul className="mt-5 space-y-2 text-sm text-ink/60">
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal/20 text-[10px] font-black text-teal">
              5
            </span>
            Five quick questions
          </li>
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal/20 text-[10px] font-black text-teal">
              ★
            </span>
            Personalised top 5 picks
          </li>
          <li className="flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-teal/20 text-[10px] font-black text-teal">
              ♥
            </span>
            Save films to your watchlist
          </li>
        </ul>
        <ActionButton className="mt-6 w-full" icon={ChevronRight} onClick={onStart}>
          Start the quiz
        </ActionButton>
      </section>

      <ButtonLink href="/movies" icon={ArrowLeft} variant="secondary">
        Back to Movies
      </ButtonLink>
    </div>
  );
}

function QuestionScreen({
  question,
  stepIndex,
  totalSteps,
  onAnswer,
  onBack,
}: {
  question: (typeof QUESTIONS)[number];
  stepIndex: number;
  totalSteps: number;
  onAnswer: (value: string) => void;
  onBack: () => void;
}) {
  const pct = Math.round(((stepIndex - 1) / totalSteps) * 100);

  return (
    <div className="content-wrap space-y-6">
      <SectionHeader eyebrow="Movies" title="Movie Match Quiz." />

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-ink/40">
          <span>
            Question {stepIndex} of {totalSteps}
          </span>
          <span>{pct}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full bg-ember transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <section className="rounded-md border border-ink/10 bg-paper/100 p-6 shadow-soft">
        <p className="text-xl font-black leading-snug text-ink">{question.text}</p>

        <ul className="mt-5 space-y-2">
          {question.options.map((opt) => (
            <li key={opt.value}>
              <button
                className="flex w-full items-center gap-4 rounded-md border border-ink/10 bg-paper/100 px-4 py-3 text-left text-sm font-semibold text-ink transition hover:border-ember/50 hover:bg-ember/5"
                onClick={() => onAnswer(opt.value)}
                type="button"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ink/20 text-xs font-black text-ink/40">
                  {opt.value}
                </span>
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <button
        className="flex items-center gap-2 text-sm font-semibold text-ink/40 transition hover:text-ink/70"
        onClick={onBack}
        type="button"
      >
        <ArrowLeft size={14} />
        {stepIndex === 1 ? "Back to intro" : "Previous question"}
      </button>
    </div>
  );
}

function ResultsScreen({
  recommendedIds,
  savedMovies,
  onSave,
  onUnsave,
  onRetake,
}: {
  recommendedIds: string[];
  savedMovies: string[];
  onSave: (id: string) => void;
  onUnsave: (id: string) => void;
  onRetake: () => void;
}) {
  const movies = recommendedIds.flatMap((id) => {
    const m = getQuizMovie(id);
    return m ? [m] : [];
  });

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Movies" title="Your top 5 picks." />

      <section className="rounded-md border border-gold/50 bg-gold/10 px-5 py-4">
        <p className="text-sm leading-6 text-ink/70">
          Based on your answers, here are the 5 films from our collection that suit you best. Save any you want to
          watch later.
        </p>
      </section>

      <section className="space-y-4">
        {movies.map((movie, i) => {
          const saved = savedMovies.includes(movie.id);
          return (
            <article
              className="overflow-hidden rounded-md border border-ink/10 bg-paper/100 shadow-soft"
              key={movie.id}
            >
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-teal">Pick {i + 1}</p>
                    <h2 className="mt-1 text-xl font-black leading-tight text-ink">{movie.title}</h2>
                    <p className="mt-0.5 text-xs font-semibold text-ink/40">{movie.year}</p>
                  </div>
                  <button
                    aria-label={saved ? "Remove from watchlist" : "Save to watchlist"}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition ${
                      saved ? "bg-gold/20" : "bg-ink/10 hover:bg-ink/20"
                    }`}
                    onClick={() => (saved ? onUnsave(movie.id) : onSave(movie.id))}
                    type="button"
                  >
                    <Star
                      className={saved ? "text-gold" : "text-ink/30"}
                      fill={saved ? "currentColor" : "none"}
                      size={20}
                    />
                  </button>
                </div>

                <p className="mt-3 text-sm leading-6 text-ink/70">{movie.description}</p>

                <div className="mt-3 rounded-md border border-teal/30 bg-teal/5 px-3 py-2">
                  <p className="text-xs font-semibold italic text-teal/80">{movie.reason}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.tags.slice(0, 4).map((tag) => (
                    <span
                      className="rounded-full border border-gold/60 bg-gold/20 px-3 py-0.5 text-[11px] font-bold text-ink/70"
                      key={tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="flex flex-wrap gap-3">
        <ButtonLink href="/movies" variant="secondary">
          Back to Movies
        </ButtonLink>
        <ActionButton icon={RotateCcw} onClick={onRetake} variant="secondary">
          Retake quiz
        </ActionButton>
      </section>
    </div>
  );
}
