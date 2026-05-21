"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Share2 } from "lucide-react";
import { ActionButton } from "@/components/ActionButton";
import { EmptyState } from "@/components/EmptyState";
import { SectionHeader } from "@/components/SectionHeader";
import { StatTile } from "@/components/StatTile";
import { isMissionComplete } from "@/lib/progress";
import { useAppState } from "@/lib/useAppState";

type Obstacle = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type Collectible = {
  x: number;
  y: number;
  size: number;
};

type GameSnapshot = {
  distance: number;
  reels: number;
  score: number;
};

const CANVAS_WIDTH = 720;
const CANVAS_HEIGHT = 420;
const GROUND_Y = 332;

export default function MiniGamePage() {
  const progress = useAppState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const gameRef = useRef(createInitialGame());
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [snapshot, setSnapshot] = useState<GameSnapshot>({ distance: 0, reels: 0, score: 0 });
  const [awardedCredits, setAwardedCredits] = useState(0);
  const unlocked = isMissionComplete(progress);

  const jump = useCallback(() => {
    const game = gameRef.current;
    if (game.player.grounded) {
      game.player.velocityY = -15.5;
      game.player.grounded = false;
    }
  }, []);

  const stopLoop = useCallback(() => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  }, []);

  const finishGame = useCallback(() => {
    stopLoop();
    const game = gameRef.current;
    const score = Math.round(game.distance + game.reels * 50);
    const credits = Math.min(300, game.reels * 5 + Math.floor(game.distance / 100) * 10);
    const awarded = progress.actions.awardMiniGameCredits(score, credits);
    setSnapshot({ distance: Math.round(game.distance), reels: game.reels, score });
    setAwardedCredits(awarded);
    setStatus("over");
  }, [progress.actions, stopLoop]);

  const startGame = useCallback(() => {
    gameRef.current = createInitialGame();
    setAwardedCredits(0);
    setSnapshot({ distance: 0, reels: 0, score: 0 });
    setStatus("running");
  }, []);

  useEffect(() => {
    if (status !== "running") {
      drawGame(canvasRef.current, gameRef.current, status);
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let lastTime = performance.now();
    let frame = 0;

    const loop = (time: number) => {
      const delta = Math.min(32, time - lastTime) / 16.67;
      lastTime = time;
      frame += 1;

      const game = gameRef.current;
      updateGame(game, delta);
      drawGame(canvasRef.current, game, status);

      if (frame % 6 === 0) {
        setSnapshot({
          distance: Math.round(game.distance),
          reels: game.reels,
          score: Math.round(game.distance + game.reels * 50),
        });
      }

      if (hasCollision(game)) {
        finishGame();
        return;
      }

      animationRef.current = window.requestAnimationFrame(loop);
    };

    animationRef.current = window.requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      stopLoop();
    };
  }, [finishGame, jump, status, stopLoop]);

  useEffect(() => {
    drawGame(canvasRef.current, gameRef.current, status);
  }, [status]);

  if (!unlocked) {
    return (
      <div className="content-wrap">
        <EmptyState
          action="Complete Mission"
          body="Film Run unlocks after the museum mission, keeping the post-visit layer connected to the physical game."
          href="/mission"
          title="Mini-game locked"
        />
      </div>
    );
  }

  return (
    <div className="content-wrap space-y-7">
      <SectionHeader eyebrow="Mini-game" title="Film Run." />

      <section className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Score" value={snapshot.score} />
        <StatTile label="Reels" value={snapshot.reels} />
        <StatTile label="High Score" value={progress.miniGame.highScore} />
      </section>

      <section className="rounded-md border border-ink/10 bg-paper/100 p-3 shadow-soft sm:p-5">
        <canvas
          aria-label="Film Run game"
          className="block aspect-[12/7] w-full rounded-md bg-ink"
          height={CANVAS_HEIGHT}
          onPointerDown={status === "running" ? jump : undefined}
          ref={canvasRef}
          width={CANVAS_WIDTH}
        />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {status === "running" ? (
            <ActionButton className="sm:col-span-2" onClick={jump}>
              Jump
            </ActionButton>
          ) : (
            <ActionButton className="sm:col-span-2" icon={status === "over" ? RotateCcw : Play} onClick={startGame}>
              {status === "over" ? "Restart" : "Start Run"}
            </ActionButton>
          )}
          <ActionButton disabled icon={Share2} variant="secondary">
            Share Soon
          </ActionButton>
        </div>
      </section>

      {status === "over" ? (
        <section className="rounded-md border border-gold/50 bg-gold/20 p-5 shadow-soft">
          <h2 className="text-2xl font-black text-ink">Run complete</h2>
          <p className="mt-2 text-sm leading-6 text-ink/50">
            {awardedCredits} Film Credits were added. Daily mini-game earning is capped at 300 credits.
          </p>
        </section>
      ) : null}
    </div>
  );
}

function createInitialGame() {
  return {
    distance: 0,
    reels: 0,
    speed: 5.4,
    obstacleTimer: 70,
    collectibleTimer: 45,
    player: {
      x: 88,
      y: GROUND_Y - 44,
      size: 44,
      velocityY: 0,
      grounded: true,
    },
    obstacles: [] as Obstacle[],
    collectibles: [] as Collectible[],
  };
}

function updateGame(game: ReturnType<typeof createInitialGame>, delta: number) {
  game.distance += game.speed * delta;
  game.speed = Math.min(11, game.speed + 0.0025 * delta);

  game.player.velocityY += 0.82 * delta;
  game.player.y += game.player.velocityY * delta;
  if (game.player.y >= GROUND_Y - game.player.size) {
    game.player.y = GROUND_Y - game.player.size;
    game.player.velocityY = 0;
    game.player.grounded = true;
  }

  game.obstacleTimer -= delta;
  if (game.obstacleTimer <= 0) {
    game.obstacles.push({
      x: CANVAS_WIDTH + 20,
      y: GROUND_Y - 42,
      width: 34 + Math.random() * 22,
      height: 42,
    });
    game.obstacleTimer = 80 + Math.random() * 70;
  }

  game.collectibleTimer -= delta;
  if (game.collectibleTimer <= 0) {
    game.collectibles.push({
      x: CANVAS_WIDTH + 20,
      y: 165 + Math.random() * 92,
      size: 22,
    });
    game.collectibleTimer = 48 + Math.random() * 52;
  }

  game.obstacles = game.obstacles
    .map((obstacle) => ({ ...obstacle, x: obstacle.x - game.speed * delta }))
    .filter((obstacle) => obstacle.x + obstacle.width > -20);

  game.collectibles = game.collectibles
    .map((collectible) => ({ ...collectible, x: collectible.x - game.speed * delta }))
    .filter((collectible) => {
      const collected = circleRectOverlap(collectible, {
        x: game.player.x,
        y: game.player.y,
        width: game.player.size,
        height: game.player.size,
      });

      if (collected) {
        game.reels += 1;
      }

      return !collected && collectible.x > -20;
    });
}

function drawGame(canvas: HTMLCanvasElement | null, game: ReturnType<typeof createInitialGame>, status: string) {
  if (!canvas) {
    return;
  }

  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  context.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  context.fillStyle = "#12100f";
  context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  context.fillStyle = "#fbf7ef";
  for (let i = 0; i < 8; i += 1) {
    context.fillRect(i * 96 - (game.distance % 96), 60, 48, 10);
    context.fillRect(i * 96 - (game.distance % 96), 86, 48, 10);
  }

  context.fillStyle = "#f2eadc";
  context.fillRect(0, GROUND_Y, CANVAS_WIDTH, 8);
  context.fillStyle = "#2f6f73";
  context.fillRect(0, GROUND_Y + 8, CANVAS_WIDTH, CANVAS_HEIGHT - GROUND_Y);

  context.fillStyle = "#ce5a35";
  game.obstacles.forEach((obstacle) => {
    context.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    context.fillStyle = "#d69e2e";
    context.fillRect(obstacle.x + 6, obstacle.y - 18, obstacle.width - 12, 18);
    context.fillStyle = "#ce5a35";
  });

  game.collectibles.forEach((collectible) => {
    context.beginPath();
    context.arc(collectible.x, collectible.y, collectible.size, 0, Math.PI * 2);
    context.fillStyle = "#d69e2e";
    context.fill();
    context.beginPath();
    context.arc(collectible.x, collectible.y, collectible.size * 0.42, 0, Math.PI * 2);
    context.fillStyle = "#12100f";
    context.fill();
  });

  context.save();
  context.translate(game.player.x + game.player.size / 2, game.player.y + game.player.size / 2);
  context.rotate(game.distance / 42);
  context.fillStyle = "#fbf7ef";
  context.beginPath();
  context.arc(0, 0, game.player.size / 2, 0, Math.PI * 2);
  context.fill();
  context.strokeStyle = "#12100f";
  context.lineWidth = 6;
  context.stroke();
  for (let i = 0; i < 6; i += 1) {
    context.rotate(Math.PI / 3);
    context.fillStyle = "#12100f";
    context.fillRect(8, -4, 10, 8);
  }
  context.restore();

  if (status !== "running") {
    context.fillStyle = "rgba(18, 16, 15, 0.72)";
    context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    context.fillStyle = "#fbf7ef";
    context.font = "700 34px Inter, sans-serif";
    context.textAlign = "center";
    context.fillText(status === "over" ? "Game over" : "Film Run", CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 6);
  }
}

function hasCollision(game: ReturnType<typeof createInitialGame>) {
  const playerRect = {
    x: game.player.x + 5,
    y: game.player.y + 5,
    width: game.player.size - 10,
    height: game.player.size - 10,
  };

  return game.obstacles.some((obstacle) => rectOverlap(playerRect, obstacle));
}

function rectOverlap(a: { x: number; y: number; width: number; height: number }, b: Obstacle) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function circleRectOverlap(circle: Collectible, rect: { x: number; y: number; width: number; height: number }) {
  const closestX = Math.max(rect.x, Math.min(circle.x, rect.x + rect.width));
  const closestY = Math.max(rect.y, Math.min(circle.y, rect.y + rect.height));
  const dx = circle.x - closestX;
  const dy = circle.y - closestY;
  return dx * dx + dy * dy < circle.size * circle.size;
}
