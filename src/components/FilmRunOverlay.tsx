"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { useAppState } from "@/lib/useAppState";

// ── Constants ──────────────────────────────────────────────────────

const CW = 720;
const CH = 420;
const GY = 332;

type Obs = { x: number; y: number; w: number; h: number };
type Col = { x: number; y: number; r: number };
type Game = ReturnType<typeof mkGame>;

// ── Game engine ────────────────────────────────────────────────────

function mkGame() {
  return {
    frame: 0,
    distance: 0,
    reels: 0,
    speed: 5.4,
    oTimer: 70,
    cTimer: 45,
    player: { x: 88, y: GY - 44, size: 44, vy: 0, grounded: true },
    obstacles: [] as Obs[],
    collectibles: [] as Col[],
  };
}

function tick(g: Game, dt: number) {
  g.frame++;
  g.distance += g.speed * dt;
  g.speed = Math.min(11, g.speed + 0.0025 * dt);

  g.player.vy += 0.82 * dt;
  g.player.y += g.player.vy * dt;
  if (g.player.y >= GY - g.player.size) {
    g.player.y = GY - g.player.size;
    g.player.vy = 0;
    g.player.grounded = true;
  }

  g.oTimer -= dt;
  if (g.oTimer <= 0) {
    g.obstacles.push({ x: CW + 20, y: GY - 42, w: 34 + Math.random() * 22, h: 42 });
    g.oTimer = 80 + Math.random() * 70;
  }

  g.cTimer -= dt;
  if (g.cTimer <= 0) {
    g.collectibles.push({ x: CW + 20, y: 165 + Math.random() * 92, r: 22 });
    g.cTimer = 48 + Math.random() * 52;
  }

  g.obstacles = g.obstacles
    .map((o) => ({ ...o, x: o.x - g.speed * dt }))
    .filter((o) => o.x + o.w > -20);

  g.collectibles = g.collectibles
    .map((c) => ({ ...c, x: c.x - g.speed * dt }))
    .filter((c) => {
      const { x, y, size } = g.player;
      const nx = Math.max(x, Math.min(c.x, x + size));
      const ny = Math.max(y, Math.min(c.y, y + size));
      if ((c.x - nx) ** 2 + (c.y - ny) ** 2 < c.r * c.r) {
        g.reels++;
        return false;
      }
      return c.x > -20;
    });
}

function collides(g: Game) {
  const { x, y, size } = g.player;
  const p = { x: x + 5, y: y + 5, w: size - 10, h: size - 10 };
  return g.obstacles.some(
    (o) => p.x < o.x + o.w && p.x + p.w > o.x && p.y < o.y + o.h && p.y + p.h > o.y
  );
}

// ── Rendering ──────────────────────────────────────────────────────

function render(canvas: HTMLCanvasElement | null, g: Game, status: string) {
  if (!canvas) return;
  const c = canvas.getContext("2d");
  if (!c) return;

  // Background
  c.fillStyle = "#12100f";
  c.fillRect(0, 0, CW, CH);

  // Film-strip decoration at the top (scrolling)
  c.fillStyle = "#fbf7ef";
  for (let i = 0; i < 9; i++) {
    c.fillRect(i * 96 - (g.distance % 96), 52, 48, 10);
    c.fillRect(i * 96 - (g.distance % 96), 76, 48, 10);
  }

  // Ground line and fill
  c.fillStyle = "#f2eadc";
  c.fillRect(0, GY, CW, 8);
  c.fillStyle = "#2f6f73";
  c.fillRect(0, GY + 8, CW, CH - GY - 8);

  // Obstacles — clapperboard style (red body + gold striped top)
  g.obstacles.forEach((o) => {
    c.fillStyle = "#ce5a35";
    c.fillRect(o.x, o.y, o.w, o.h);
    c.fillStyle = "#d69e2e";
    c.fillRect(o.x + 4, o.y - 16, o.w - 8, 16);
    // Diagonal stripes on the clapperboard top
    c.fillStyle = "#12100f";
    const stripeW = (o.w - 8) / 3;
    for (let s = 0; s < 3; s++) {
      c.fillRect(o.x + 4 + s * stripeW, o.y - 16, stripeW * 0.45, 16);
    }
  });

  // Collectibles — film reels
  g.collectibles.forEach((col) => {
    c.beginPath();
    c.arc(col.x, col.y, col.r, 0, Math.PI * 2);
    c.fillStyle = "#d69e2e";
    c.fill();
    c.beginPath();
    c.arc(col.x, col.y, col.r * 0.42, 0, Math.PI * 2);
    c.fillStyle = "#12100f";
    c.fill();
    c.strokeStyle = "#12100f";
    c.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      c.beginPath();
      c.moveTo(col.x, col.y);
      c.lineTo(col.x + Math.cos(a) * col.r * 0.8, col.y + Math.sin(a) * col.r * 0.8);
      c.stroke();
    }
  });

  // Camera-guy character
  drawCameraGuy(c, g.player, g.frame);

  // Dim overlay + text when not running
  if (status !== "running") {
    c.fillStyle = "rgba(18,16,15,0.75)";
    c.fillRect(0, 0, CW, CH);
    c.fillStyle = "#fbf7ef";
    c.font = "bold 36px Inter,sans-serif";
    c.textAlign = "center";
    c.fillText(status === "over" ? "Game Over" : "Film Run", CW / 2, CH / 2 - 10);
    c.font = "500 16px Inter,sans-serif";
    c.fillStyle = "rgba(251,247,239,0.5)";
    c.fillText(
      status === "over" ? "Tap anywhere to run again" : "Tap anywhere to start",
      CW / 2,
      CH / 2 + 22
    );
  }
}

function drawCameraGuy(
  c: CanvasRenderingContext2D,
  player: { x: number; y: number; size: number },
  frame: number
) {
  const cx = player.x + player.size / 2;
  const t = player.y;
  const swing = Math.sin(frame * 0.45) * 6;

  // Legs (animated run cycle)
  c.fillStyle = "#fbf7ef";
  c.fillRect(cx - 11, t + 27, 8, 15 + swing);
  c.fillRect(cx + 3, t + 27, 8, 15 - swing);

  // Body
  c.fillRect(cx - 13, t + 14, 26, 14);

  // Head
  c.beginPath();
  c.arc(cx, t + 8, 10, 0, Math.PI * 2);
  c.fillStyle = "#fbf7ef";
  c.fill();

  // Camera body (gold rectangle held to face, pointing right)
  c.fillStyle = "#d69e2e";
  c.fillRect(cx + 3, t + 1, 22, 13);

  // Lens barrel
  c.beginPath();
  c.arc(cx + 28, t + 7, 7, 0, Math.PI * 2);
  c.fillStyle = "#2f6f73";
  c.fill();

  // Lens glass
  c.beginPath();
  c.arc(cx + 28, t + 7, 4, 0, Math.PI * 2);
  c.fillStyle = "#12100f";
  c.fill();

  // Lens highlight
  c.beginPath();
  c.arc(cx + 26, t + 5, 1.5, 0, Math.PI * 2);
  c.fillStyle = "rgba(251,247,239,0.7)";
  c.fill();
}

// ── Overlay component ──────────────────────────────────────────────

type Snap = { distance: number; reels: number; score: number };

export function FilmRunOverlay({ onClose }: { onClose: () => void }) {
  const progress = useAppState();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const gameRef = useRef<Game>(mkGame());
  const [status, setStatus] = useState<"idle" | "running" | "over">("idle");
  const [snap, setSnap] = useState<Snap>({ distance: 0, reels: 0, score: 0 });

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const stopLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const jump = useCallback(() => {
    const g = gameRef.current;
    if (g.player.grounded) {
      g.player.vy = -15.5;
      g.player.grounded = false;
    }
  }, []);

  const endGame = useCallback(() => {
    stopLoop();
    const g = gameRef.current;
    const score = Math.round(g.distance + g.reels * 50);
    const credits = Math.min(300, g.reels * 5 + Math.floor(g.distance / 100) * 10);
    progress.actions.awardMiniGameCredits(score, credits);
    setSnap({ distance: Math.round(g.distance), reels: g.reels, score });
    setStatus("over");
  }, [progress.actions, stopLoop]);

  const startGame = useCallback(() => {
    gameRef.current = mkGame();
    setSnap({ distance: 0, reels: 0, score: 0 });
    setStatus("running");
  }, []);

  const handleTap = useCallback(() => {
    if (status === "running") {
      jump();
    } else {
      startGame();
    }
  }, [status, jump, startGame]);

  // Game loop
  useEffect(() => {
    if (status !== "running") {
      render(canvasRef.current, gameRef.current, status);
      return;
    }

    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" || e.code === "ArrowUp") {
        e.preventDefault();
        jump();
      }
      if (e.code === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    let last = performance.now();
    let f = 0;

    const loop = (now: number) => {
      const dt = Math.min(32, now - last) / 16.67;
      last = now;
      f++;

      tick(gameRef.current, dt);
      render(canvasRef.current, gameRef.current, status);

      if (f % 6 === 0) {
        const g = gameRef.current;
        setSnap({
          distance: Math.round(g.distance),
          reels: g.reels,
          score: Math.round(g.distance + g.reels * 50),
        });
      }

      if (collides(gameRef.current)) {
        endGame();
        return;
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("keydown", onKey);
      stopLoop();
    };
  }, [endGame, jump, onClose, status, stopLoop]);

  // Draw initial idle frame
  useEffect(() => {
    render(canvasRef.current, gameRef.current, status);
  }, [status]);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-ink">
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-paper/50">Film Run</p>
          <p className="mt-0.5 text-xl font-black text-paper">
            Score <span className="text-ember">{snap.score}</span>
          </p>
        </div>
        <div className="flex items-center gap-5">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase tracking-[0.14em] text-paper/40">Best</p>
            <p className="text-lg font-black text-paper/70">{progress.miniGame.highScore}</p>
          </div>
          <button
            aria-label="Close game"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-paper/10 text-paper/70 transition hover:bg-paper/20"
            onClick={onClose}
            type="button"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Game canvas */}
      <div className="px-3 pt-1">
        <canvas
          aria-label="Film Run game canvas — tap to play"
          className="block aspect-[12/7] w-full rounded-md"
          height={CH}
          onPointerDown={handleTap}
          ref={canvasRef}
          style={{ touchAction: "none" }}
          width={CW}
        />
      </div>

      {/* Live stats */}
      <div className="flex items-center justify-center gap-10 py-5 text-paper">
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-paper/40">Reels</p>
          <p className="text-3xl font-black">{snap.reels}</p>
        </div>
        <div className="h-8 w-px bg-paper/10" />
        <div className="text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-paper/40">Distance</p>
          <p className="text-3xl font-black">{snap.distance}</p>
        </div>
      </div>

      {/* Context area — fills remaining space */}
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 pb-10 text-center">
        {status === "idle" && (
          <>
            <p className="text-sm leading-7 text-paper/40">
              Dodge clapperboard obstacles and collect film reels. Each reel earns bonus credits.
            </p>
            <div className="rounded-full border border-paper/20 px-5 py-2">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-paper/50">Tap screen to start</p>
            </div>
          </>
        )}
        {status === "running" && (
          <div className="rounded-full border border-paper/10 px-5 py-2">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-paper/30">Tap screen to jump</p>
          </div>
        )}
        {status === "over" && (
          <>
            <p className="text-4xl font-black text-paper">{snap.score}</p>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-paper/40">Final score</p>
            <div className="mt-2 rounded-full border border-paper/20 px-5 py-2">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-paper/50">Tap screen to run again</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
