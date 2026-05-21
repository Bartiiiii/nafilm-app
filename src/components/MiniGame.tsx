"use client";

import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import type { GameData, MatchPair, QuizQuestion, SequenceItem } from "@/types";

export function MiniGame({ game, onComplete }: { game: GameData; onComplete: () => void }) {
  if (game.type === "sequence") return <SequenceGame correctOrder={game.correctOrder} items={game.items} onComplete={onComplete} />;
  if (game.type === "match") return <MatchGame pairs={game.pairs} onComplete={onComplete} />;
  if (game.type === "quiz") return <QuizGame onComplete={onComplete} passMark={game.passMark ?? 2} questions={game.questions} />;
  return null;
}

// ─── Sequence game ────────────────────────────────────────────────────────────
// Click items in the correct order. Wrong click resets progress.

function SequenceGame({
  items,
  correctOrder,
  onComplete,
}: {
  items: SequenceItem[];
  correctOrder: string[];
  onComplete: () => void;
}) {
  const [sequence, setSequence] = useState<string[]>([]);
  const [wrong, setWrong] = useState(false);
  const [done, setDone] = useState(false);

  function handleClick(id: string) {
    if (done || sequence.includes(id)) return;
    const next = [...sequence, id];
    const expectedId = correctOrder[sequence.length];
    if (id !== expectedId) {
      setWrong(true);
      setTimeout(() => {
        setSequence([]);
        setWrong(false);
      }, 800);
      return;
    }
    setSequence(next);
    if (next.length === correctOrder.length) {
      setDone(true);
      setTimeout(onComplete, 900);
    }
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-ink/50">
        Click the steps in the correct order
      </p>

      <div className="flex h-2 w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className={`h-full rounded-full transition-all duration-300 ${wrong ? "bg-red-400" : "bg-teal"}`}
          style={{ width: `${(sequence.length / correctOrder.length) * 100}%` }}
        />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        {items.map((item) => {
          const idx = sequence.indexOf(item.id);
          const clicked = idx !== -1;
          return (
            <button
              className={`flex items-center gap-3 rounded-md border px-4 py-3 text-left text-sm font-semibold transition ${
                clicked
                  ? "border-teal bg-teal/10 text-ink"
                  : "border-ink/10 bg-paper hover:border-ink/30 hover:bg-frame"
              } ${wrong && !clicked ? "opacity-40" : ""}`}
              disabled={clicked || done}
              key={item.id}
              onClick={() => handleClick(item.id)}
              type="button"
            >
              <span className="text-xl">{item.emoji}</span>
              <span className="flex-1 leading-snug">{item.label}</span>
              {clicked && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-[10px] font-black text-paper">
                  {idx + 1}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {wrong && (
        <p className="text-center text-sm font-semibold text-red-500">
          Not quite — starting over…
        </p>
      )}
      {done && (
        <p className="text-center text-sm font-bold text-teal">
          Perfect sequence! Claiming your badge…
        </p>
      )}
    </div>
  );
}

// ─── Match game ───────────────────────────────────────────────────────────────
// Click one item from left, one from right to form a pair.

function MatchGame({ pairs, onComplete }: { pairs: MatchPair[]; onComplete: () => void }) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [wrong, setWrong] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const shuffledRight = useState(() => [...pairs].sort(() => Math.random() - 0.5))[0];

  function selectLeft(value: string) {
    if (matched.includes(value)) return;
    setSelectedLeft(value === selectedLeft ? null : value);
  }

  function selectRight(value: string) {
    if (!selectedLeft || matched.some((m) => pairs.find((p) => p.left === m)?.right === value)) return;
    const pair = pairs.find((p) => p.left === selectedLeft);
    if (pair?.right === value) {
      const nextMatched = [...matched, selectedLeft];
      setMatched(nextMatched);
      setSelectedLeft(null);
      if (nextMatched.length === pairs.length) {
        setDone(true);
        setTimeout(onComplete, 900);
      }
    } else {
      setWrong(selectedLeft);
      setTimeout(() => {
        setSelectedLeft(null);
        setWrong(null);
      }, 700);
    }
  }

  function isRightMatched(value: string) {
    return matched.some((leftKey) => pairs.find((p) => p.left === leftKey)?.right === value);
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-black uppercase tracking-[0.16em] text-ink/50">
        Match each item on the left to its pair on the right
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-start gap-2">
        <div className="space-y-2">
          {pairs.map((pair) => {
            const isMatched = matched.includes(pair.left);
            const isSelected = selectedLeft === pair.left;
            const isWrong = wrong === pair.left;
            return (
              <button
                className={`w-full rounded-md border px-3 py-3 text-left text-sm font-semibold leading-snug transition ${
                  isMatched
                    ? "border-teal/50 bg-teal/10 text-teal"
                    : isWrong
                      ? "border-red-400 bg-red-50 text-red-600"
                      : isSelected
                        ? "border-ember bg-ember/10 text-ink"
                        : "border-ink/10 bg-paper text-ink hover:border-ink/30 hover:bg-frame"
                }`}
                disabled={isMatched || done}
                key={pair.left}
                onClick={() => selectLeft(pair.left)}
                type="button"
              >
                {isMatched ? <Check className="mb-0.5 inline-block" size={12} /> : null} {pair.left}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 self-stretch pt-1 text-ink/20">
          {pairs.map((_, i) => (
            <div className="h-[52px] w-px bg-ink/10" key={i} />
          ))}
        </div>

        <div className="space-y-2">
          {shuffledRight.map((pair) => {
            const isMatched = isRightMatched(pair.right);
            return (
              <button
                className={`w-full rounded-md border px-3 py-3 text-left text-sm font-semibold leading-snug transition ${
                  isMatched
                    ? "border-teal/50 bg-teal/10 text-teal"
                    : selectedLeft
                      ? "border-ink/10 bg-paper text-ink hover:border-ember/50 hover:bg-ember/5"
                      : "border-ink/10 bg-frame text-ink/40"
                }`}
                disabled={isMatched || done || !selectedLeft}
                key={pair.right}
                onClick={() => selectRight(pair.right)}
                type="button"
              >
                {isMatched ? <Check className="mb-0.5 inline-block" size={12} /> : null} {pair.right}
              </button>
            );
          })}
        </div>
      </div>

      {done && (
        <p className="text-center text-sm font-bold text-teal">All matched! Claiming your badge…</p>
      )}
    </div>
  );
}

// ─── Quiz game ────────────────────────────────────────────────────────────────
// One question at a time, tally score, reveal pass/fail.

function QuizGame({
  questions,
  passMark,
  onComplete,
}: {
  questions: QuizQuestion[];
  passMark: number;
  onComplete: () => void;
}) {
  const [qIndex, setQIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<"question" | "feedback" | "result">("question");
  const [failed, setFailed] = useState(false);

  const q = questions[qIndex];
  const isLast = qIndex === questions.length - 1;

  function pickAnswer(idx: number) {
    if (phase !== "question") return;
    setSelected(idx);
    setPhase("feedback");
    if (idx === q.correct) setScore((s) => s + 1);
  }

  function next() {
    if (isLast) {
      const finalScore = score + (selected === q.correct ? 0 : 0);
      const passed = finalScore >= passMark || score >= passMark;
      if (passed) {
        setPhase("result");
        setTimeout(onComplete, 900);
      } else {
        setFailed(true);
        setPhase("result");
      }
    } else {
      setQIndex((i) => i + 1);
      setSelected(null);
      setPhase("question");
    }
  }

  function retry() {
    setQIndex(0);
    setSelected(null);
    setScore(0);
    setPhase("question");
    setFailed(false);
  }

  if (phase === "result") {
    const finalScore = score;
    const passed = finalScore >= passMark;
    return (
      <div className="rounded-md border border-ink/10 bg-paper p-5 text-center">
        <p className={`text-4xl font-black ${passed ? "text-teal" : "text-ink/40"}`}>
          {finalScore}/{questions.length}
        </p>
        <p className="mt-2 text-lg font-black text-ink">{passed ? "Well done!" : "Not quite…"}</p>
        <p className="mt-1 text-sm text-ink/50">
          {passed
            ? "You passed. Claiming your badge…"
            : `You need ${passMark} correct answers to pass. Try again!`}
        </p>
        {!passed && (
          <ActionButton className="mx-auto mt-4" icon={RotateCcw} onClick={retry} variant="secondary">
            Try again
          </ActionButton>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-ink/40">
        <span>Question {qIndex + 1} of {questions.length}</span>
        <span>{score} correct</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-ink/10">
        <div
          className="h-full rounded-full bg-ember transition-all duration-300"
          style={{ width: `${(qIndex / questions.length) * 100}%` }}
        />
      </div>

      <p className="text-base font-black leading-snug text-ink">{q.text}</p>

      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          const isCorrect = idx === q.correct;
          const isSelected = idx === selected;
          let style = "border-ink/10 bg-paper text-ink hover:border-ink/30 hover:bg-frame";
          if (phase === "feedback") {
            if (isCorrect) style = "border-teal bg-teal/10 text-teal";
            else if (isSelected) style = "border-red-400 bg-red-50 text-red-600";
            else style = "border-ink/10 bg-paper text-ink/30";
          }
          return (
            <button
              className={`flex w-full items-center gap-3 rounded-md border px-4 py-3 text-left text-sm font-semibold transition ${style}`}
              disabled={phase === "feedback"}
              key={idx}
              onClick={() => pickAnswer(idx)}
              type="button"
            >
              {phase === "feedback" && isCorrect && <Check className="shrink-0 text-teal" size={14} />}
              {phase === "feedback" && isSelected && !isCorrect && <X className="shrink-0 text-red-500" size={14} />}
              {(phase !== "feedback" || (!isCorrect && !isSelected)) && (
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-ink/20 text-[10px] font-black text-ink/40">
                  {String.fromCharCode(65 + idx)}
                </span>
              )}
              {opt}
            </button>
          );
        })}
      </div>

      {phase === "feedback" && (
        <ActionButton className="w-full" icon={isLast ? Check : undefined} onClick={next}>
          {isLast ? "See result" : "Next question"}
        </ActionButton>
      )}
    </div>
  );
}
