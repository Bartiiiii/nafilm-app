import type { Reward } from "@/types";

export const rewards: Reward[] = [
  {
    id: "cafe-discount",
    title: "10% Cafe Discount",
    cost: 1500,
    description: "Celebrate your premiere with a coffee or hot chocolate.",
    type: "discount",
    active: true,
  },
  {
    id: "return-ticket",
    title: "15% Return Ticket Discount",
    cost: 2000,
    description: "Come back with a friend and continue the story.",
    type: "discount",
    active: true,
  },
  {
    id: "workshop-discount",
    title: "Animation Workshop Discount",
    cost: 700,
    description: "Use your credits toward a hands-on animation session.",
    type: "experience",
    active: true,
  },
  {
    id: "storytelling-course",
    title: "Storytelling Course Discount",
    cost: 1200,
    description: "Go deeper into film language with a guided course.",
    type: "experience",
    active: true,
  },
];
