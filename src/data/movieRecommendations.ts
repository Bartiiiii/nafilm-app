import type { Movie, QuizAnswers } from "@/types";

type QuizMovie = Movie & {
  q1: string[];
  q2: string[];
  q3: string[];
  q4: string[];
  q5: string[];
  tagGroup: string;
  countryType: "czech" | "international";
  numericRating: number;
  priority: number;
};

export const quizMovies: QuizMovie[] = [
  {
    id: "ecstasy",
    title: "Ecstasy",
    year: 1933,
    tags: ["early sound", "Czech cinema", "visual storytelling", "interwar film"],
    techniqueTags: ["early sound cinema", "expressive movement", "silent-era sensibility"],
    description:
      "A visually expressive early Czech film about a young woman trapped in an emotionally empty marriage. Its real value lies in how it uses movement, music, silence, and image to communicate emotion.",
    reason: "A rare early Czech work that strips storytelling to pure image and feeling.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["E"],
    q2: ["E"],
    q3: ["E"],
    q4: ["A", "C"],
    q5: ["A", "C", "D"],
    tagGroup: "film-history-early-cinema",
    countryType: "czech",
    numericRating: 6.6,
    priority: 10,
  },
  {
    id: "journey-beginning-time",
    title: "A Journey to the Beginning of Time",
    year: 1955,
    tags: ["Czech classic", "special effects", "adventure", "film illusion"],
    techniqueTags: ["optical effects", "handcrafted sets", "model photography"],
    description:
      "Four boys travel through prehistoric worlds using handcrafted visual tricks to bring dinosaurs and extinct landscapes to life. A perfect film for anyone curious about cinematic illusion.",
    reason: "A landmark of Czech visual storytelling where every frame is handmade magic.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A", "E"],
    q2: ["A", "E"],
    q3: ["A", "B"],
    q4: ["A", "B", "C"],
    q5: ["A", "C", "D"],
    tagGroup: "visual-magic-effects",
    countryType: "czech",
    numericRating: 7.1,
    priority: 8,
  },
  {
    id: "invention-destruction",
    title: "Invention for Destruction",
    year: 1958,
    tags: ["Karel Zeman", "visual effects", "Jules Verne", "animation", "Czech cinema"],
    techniqueTags: ["mixed-media animation", "Victorian illustration style", "live action compositing"],
    description:
      "A visually stunning adventure where live action, animation, and engraved illustrations are blended to look like a moving Victorian book. One of the clearest examples of Czech cinema as handcrafted magic.",
    reason: "If you love cinema that looks unlike anything else, this is where to start.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A", "E"],
    q2: ["D", "E"],
    q3: ["B", "E"],
    q4: ["A", "C", "E"],
    q5: ["A", "C", "D"],
    tagGroup: "visual-magic-effects",
    countryType: "czech",
    numericRating: 7.5,
    priority: 7,
  },
  {
    id: "baron-munchausen",
    title: "The Fabulous Baron Munchausen",
    year: 1962,
    tags: ["fantasy", "collage", "live action", "animation", "Czech cinema"],
    techniqueTags: ["collage animation", "tinted sequences", "painted backgrounds"],
    description:
      "Baron Munchausen travels through impossible worlds in a film built almost entirely from cinematic imagination — a playful fantasy world that still feels handmade and surprising.",
    reason: "Pure visual invention: every scene is a new experiment in what cinema can look like.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A"],
    q2: ["A", "D"],
    q3: ["B", "C"],
    q4: ["A", "E", "F"],
    q5: ["A", "C", "D"],
    tagGroup: "visual-magic-effects",
    countryType: "czech",
    numericRating: 7.7,
    priority: 4,
  },
  {
    id: "daisies",
    title: "Daisies",
    year: 1966,
    tags: ["Czech New Wave", "experimental", "editing", "rebellion", "color"],
    techniqueTags: ["jump cut editing", "color tinting", "collage montage"],
    description:
      "Two young women decide the world is spoiled and respond with chaos, games, and visual rebellion. Jump cuts, color changes, and fragmented editing make it one of the boldest works of Czech cinema.",
    reason: "If you want to see cinema deliberately breaking its own rules, this is essential.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["D"],
    q2: ["C", "D"],
    q3: ["C"],
    q4: ["E"],
    q5: ["A", "C", "D"],
    tagGroup: "czech-new-wave-experimental",
    countryType: "czech",
    numericRating: 7.2,
    priority: 5,
  },
  {
    id: "closely-watched-trains",
    title: "Closely Watched Trains",
    year: 1966,
    tags: ["Czech New Wave", "storytelling", "comedy", "war", "classic"],
    techniqueTags: ["observational camerawork", "naturalistic performance", "location shooting"],
    description:
      "A shy young railway worker comes of age during the Nazi occupation, balancing humor, tenderness, and quiet tragedy. One of the most internationally recognized Czech films.",
    reason: "A masterpiece of restraint: it finds depth in the everyday and humor in the darkest times.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["C", "E"],
    q2: ["C"],
    q3: ["A", "B"],
    q4: ["C", "G"],
    q5: ["A", "C", "D"],
    tagGroup: "czech-new-wave-experimental",
    countryType: "czech",
    numericRating: 7.6,
    priority: 3,
  },
  {
    id: "marketa-lazarova",
    title: "Marketa Lazarová",
    year: 1967,
    tags: ["Czech masterpiece", "medieval", "atmosphere", "visual cinema"],
    techniqueTags: ["epic cinematography", "landscape as character", "non-linear structure"],
    description:
      "A powerful medieval drama that creates an intense sensory atmosphere through image, rhythm, sound, and landscape. Often considered one of the greatest Czech films ever made.",
    reason: "For viewers who want cinema as a physical, overwhelming sensory experience.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["B", "E"],
    q2: ["D"],
    q3: ["D", "E"],
    q4: ["E"],
    q5: ["A", "C", "D"],
    tagGroup: "sound-atmosphere",
    countryType: "czech",
    numericRating: 7.8,
    priority: 2,
  },
  {
    id: "cremator",
    title: "The Cremator",
    year: 1969,
    tags: ["horror", "sound design", "Czech New Wave", "editing", "atmosphere"],
    techniqueTags: ["distorted wide-angle photography", "layered sound design", "expressionist editing"],
    description:
      "A crematorium worker slowly transforms from an eccentric family man into a terrifying figure shaped by ideology. Distorted visuals, unsettling sound, and dark humor create one of Czechoslovak cinema's most disturbing works.",
    reason: "A film that uses every technical tool to get under your skin. Unforgettable.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["B"],
    q2: ["B", "C", "D"],
    q3: ["D"],
    q4: ["D", "E"],
    q5: ["A", "C", "D"],
    tagGroup: "sound-atmosphere",
    countryType: "czech",
    numericRating: 8.0,
    priority: 1,
  },
  {
    id: "valerie-wonders",
    title: "Valerie and Her Week of Wonders",
    year: 1970,
    tags: ["surreal", "fantasy", "dreamlike", "gothic", "Czech cinema"],
    techniqueTags: ["fairy-tale symbolism", "lyrical photography", "costume and light design"],
    description:
      "A girl's coming-of-age becomes a strange dream filled with vampires, rituals, and shifting identities. More about mood than plot, using light, music, and surreal symbolism to create a mysterious world.",
    reason: "If you want to experience cinema as a waking dream, this is the one.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["B", "D"],
    q2: ["D"],
    q3: ["C"],
    q4: ["E", "F"],
    q5: ["A", "C", "D"],
    tagGroup: "czech-new-wave-experimental",
    countryType: "czech",
    numericRating: 7.0,
    priority: 9,
  },
  {
    id: "alice",
    title: "Alice",
    year: 1988,
    tags: ["stop-motion", "puppetry", "surrealism", "Czech animation"],
    techniqueTags: ["stop-motion animation", "object animation", "tactile set design"],
    description:
      "Jan Švankmajer transforms Alice in Wonderland into something tactile, dusty, funny, and slightly frightening — combining live action, puppets, and objects. Essential for anyone who loves handmade animation.",
    reason: "For viewers who want animation to feel physical, strange, and real.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A", "B", "D"],
    q2: ["A", "D"],
    q3: ["C"],
    q4: ["B", "F"],
    q5: ["A", "C", "D"],
    tagGroup: "animation-stop-motion",
    countryType: "czech",
    numericRating: 7.4,
    priority: 6,
  },
  {
    id: "man-movie-camera",
    title: "Man with a Movie Camera",
    year: 1929,
    tags: ["silent cinema", "editing", "montage", "camera", "film history"],
    techniqueTags: ["rhythmic montage", "reflexive filmmaking", "city symphony"],
    description:
      "A city symphony that follows everyday life while constantly revealing the process of filmmaking itself. One of the best examples of cinema thinking about its own tools, its own craft.",
    reason: "The film that asks: what can a camera actually do? The answer is everything.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["D", "E"],
    q2: ["C", "E"],
    q3: ["E"],
    q4: ["C"],
    q5: ["B", "C", "D"],
    tagGroup: "film-history-early-cinema",
    countryType: "international",
    numericRating: 8.3,
    priority: 11,
  },
  {
    id: "singin-rain",
    title: "Singin' in the Rain",
    year: 1952,
    tags: ["sound cinema", "musical", "Hollywood", "film history"],
    techniqueTags: ["choreographed sound", "studio production", "technological transition narrative"],
    description:
      "A joyful Hollywood musical about the film industry's difficult transition from silent films to talking pictures. Behind the songs is a smart story about technology changing cinema forever.",
    reason: "The most entertaining way to understand why sound transformed everything about filmmaking.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A", "C", "E"],
    q2: ["B", "E"],
    q3: ["A"],
    q4: ["C", "D"],
    q5: ["B", "C", "D"],
    tagGroup: "film-history-early-cinema",
    countryType: "international",
    numericRating: 8.3,
    priority: 12,
  },
  {
    id: "roger-rabbit",
    title: "Who Framed Roger Rabbit",
    year: 1988,
    tags: ["animation", "live action", "VFX", "compositing", "chromakey"],
    techniqueTags: ["live action / animation compositing", "physical interaction rigging", "chromakey"],
    description:
      "A detective story set in a world where animated characters and humans coexist. A landmark in combining live action with animation — playful, technically impressive, and connected to visual-effects learning.",
    reason: "Where cartoons and cameras collide: a film about the joy of making impossible things real.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A", "C"],
    q2: ["A", "D"],
    q3: ["A", "B"],
    q4: ["B", "E", "F"],
    q5: ["B", "C", "D"],
    tagGroup: "animation-stop-motion",
    countryType: "international",
    numericRating: 7.7,
    priority: 15,
  },
  {
    id: "blow-out",
    title: "Blow Out",
    year: 1981,
    tags: ["sound design", "thriller", "recording", "editing", "suspense"],
    techniqueTags: ["Foley and location recording", "split-screen editing", "layered audio design"],
    description:
      "A movie sound-effects specialist accidentally records evidence of a political murder, turning listening itself into the center of the thriller. Perfect for showing how sound can reveal truth and create tension.",
    reason: "For anyone who has ever listened closely to a film and wondered — what else is hidden in the sound?",
    posterUrl: "",
    trailerUrl: "",
    q1: ["B"],
    q2: ["B", "C"],
    q3: ["D"],
    q4: ["D"],
    q5: ["B", "C", "D"],
    tagGroup: "sound-atmosphere",
    countryType: "international",
    numericRating: 7.4,
    priority: 16,
  },
  {
    id: "coraline",
    title: "Coraline",
    year: 2009,
    tags: ["stop-motion", "animation", "dark fantasy", "visual craft"],
    techniqueTags: ["stop-motion animation", "miniature set construction", "atmospheric lighting"],
    description:
      "A curious girl discovers a hidden door leading to an alternate version of her life — first perfect, then dangerous. Visually rich, atmospheric, and built frame by frame through stop-motion.",
    reason: "A film where every single frame was built by hand. The craft is part of the magic.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A", "B"],
    q2: ["A", "D"],
    q3: ["A", "B"],
    q4: ["B", "F"],
    q5: ["B", "C", "D"],
    tagGroup: "animation-stop-motion",
    countryType: "international",
    numericRating: 7.8,
    priority: 13,
  },
  {
    id: "hugo",
    title: "Hugo",
    year: 2011,
    tags: ["early cinema", "Méliès", "projection", "magic", "family-friendly"],
    techniqueTags: ["3D cinematography", "period production design", "early cinema recreation"],
    description:
      "An orphan inside a Paris train station discovers a mystery connected to early filmmaker Georges Méliès — a love letter to cinema's beginnings, projection, illusion, and early special effects.",
    reason: "A film that reminds you why cinema was magical from the very first frame ever projected.",
    posterUrl: "",
    trailerUrl: "",
    q1: ["A", "E"],
    q2: ["D", "E"],
    q3: ["A"],
    q4: ["A", "C"],
    q5: ["B", "C", "D"],
    tagGroup: "film-history-early-cinema",
    countryType: "international",
    numericRating: 7.5,
    priority: 14,
  },
];

export function computeTop5(answers: QuizAnswers): string[] {
  const keys = ["q1", "q2", "q3", "q4", "q5"] as const;

  const scored = quizMovies.map((movie) => {
    const score = keys.reduce(
      (sum, key) => sum + (movie[key].includes(answers[key]) ? 1 : 0),
      0
    );
    return { movie, score };
  });

  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.movie.numericRating !== a.movie.numericRating) return b.movie.numericRating - a.movie.numericRating;
    return a.movie.priority - b.movie.priority;
  });

  // Diversity: max 2 from same tagGroup
  const result: typeof scored = [];
  const groupCounts: Record<string, number> = {};
  for (const item of scored) {
    const g = item.movie.tagGroup;
    if ((groupCounts[g] ?? 0) < 2) {
      result.push(item);
      groupCounts[g] = (groupCounts[g] ?? 0) + 1;
    }
    if (result.length === 5) break;
  }

  // Q5 surprise: if strongly Czech (A), ensure at least 1 international; if strongly international (B), ensure 1 Czech
  const addSurprise = (preferred: "czech" | "international") => {
    const other = preferred === "czech" ? "international" : "czech";
    const hasOther = result.some((r) => r.movie.countryType === other);
    if (!hasOther && result.length === 5) {
      const best = scored.find((s) => s.movie.countryType === other && !result.includes(s));
      if (best) result[4] = best;
    }
  };

  if (answers.q5 === "A") addSurprise("czech");
  if (answers.q5 === "B") addSurprise("international");

  return result.slice(0, 5).map((r) => r.movie.id);
}

export function getQuizMovie(id: string): QuizMovie | undefined {
  return quizMovies.find((m) => m.id === id);
}
