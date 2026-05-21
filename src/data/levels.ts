import type { Level } from "@/types";

export const levels: Level[] = [
  {
    id: "purkyne-laboratory",
    order: 1,
    title: "Train Your Eye",
    room: "Purkyně's Laboratory",
    description:
      "Cinema begins with the eye. Look for the moment where separate images start to feel like one moving thought.",
    physicalTask:
      "Try one optical illusion in the room, then notice what your eye keeps seeing after the image changes.",
    interactionType: "observation",
    question: "What did the illusion make you notice most?",
    options: ["Afterimage", "Color shift", "Hidden shape", "Flicker"],
    correctOrPreferredOption: "Afterimage",
    points: 100,
    badgeId: "eye-of-cinema",
    recommendationSignals: ["visual-illusion", "experimental", "classic-cinema"],
  },
  {
    id: "zoetrope-room",
    order: 2,
    title: "Bring Motion to Life",
    room: "Zoetrope Room",
    description:
      "Animation is a pact between patience and surprise. A tiny change repeated at the right rhythm becomes action.",
    physicalTask:
      "Spin or inspect the zoetrope and find the frame where stillness starts to become movement.",
    interactionType: "sequence",
    question: "Which idea best explains why the zoetrope works?",
    options: ["Repeated frames", "Louder sound", "Long exposure", "Painted glass"],
    correctOrPreferredOption: "Repeated frames",
    points: 110,
    badgeId: "motion-maker",
    recommendationSignals: ["animation", "stop-motion", "playful"],
  },
  {
    id: "historic-projectors",
    order: 3,
    title: "Become the Projectionist",
    room: "Historic Projectors Room",
    description:
      "Before streaming, cinema needed machines, light, timing, and a careful human hand.",
    physicalTask:
      "Find a projector detail that feels mechanical: lens, reel, crank, lamp, or gate.",
    interactionType: "choice",
    question: "What does a projector need most to turn film into an image?",
    options: ["Light", "A microphone", "A painted wall", "A keyboard"],
    correctOrPreferredOption: "Light",
    points: 115,
    badgeId: "projectionist",
    recommendationSignals: ["classic-cinema", "film-history", "craft"],
  },
  {
    id: "foley-room",
    order: 4,
    title: "Design the Sound",
    room: "Sound Studio / Foley Room",
    description:
      "You are the sound designer. A scene can become tense, funny, or intimate before anyone says a word.",
    physicalTask:
      "Try creating or imagining a sound effect using the Foley tools, then choose the sound that changes the scene.",
    interactionType: "choice",
    question: "Which sound would best create tension in a silent scene?",
    options: ["Footsteps", "Door creak", "Birdsong", "Applause"],
    correctOrPreferredOption: "Door creak",
    points: 120,
    badgeId: "foley-artist",
    recommendationSignals: ["sound-design", "thriller", "atmosphere"],
  },
  {
    id: "shadow-play",
    order: 5,
    title: "Master Light and Shadow",
    room: "Shadow Play Room",
    description:
      "Light can reveal, hide, accuse, or protect. In shadow play, the simplest silhouette can carry a whole mood.",
    physicalTask:
      "Create or inspect one shadow shape and imagine what kind of character it could become.",
    interactionType: "mood",
    question: "What mood does your shadow story suggest?",
    options: ["Mystery", "Comedy", "Romance", "Adventure"],
    correctOrPreferredOption: "Mystery",
    points: 125,
    badgeId: "master-of-light",
    recommendationSignals: ["light-shadow", "visual", "noir"],
  },
  {
    id: "animation-station",
    order: 6,
    title: "Make Your Film",
    room: "Animation Creation Station",
    description:
      "A filmmaker decides what changes from one moment to the next. Even a small movement can reveal character.",
    physicalTask:
      "Create or imagine three frames of motion: beginning, change, and payoff.",
    interactionType: "choice",
    question: "What makes a stop-motion action feel alive?",
    options: ["Small changes", "Only one frame", "No lighting", "Random order"],
    correctOrPreferredOption: "Small changes",
    points: 140,
    badgeId: "animator",
    recommendationSignals: ["animation", "stop-motion", "visual-storytelling"],
  },
];
