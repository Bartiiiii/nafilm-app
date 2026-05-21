import type { TicketType } from "@/types";

export const ticketTypes: TicketType[] = [
  {
    id: "adult",
    label: "Adult",
    price: "220 CZK",
    points: 150,
  },
  {
    id: "student",
    label: "Student",
    price: "160 CZK",
    points: 130,
  },
  {
    id: "family",
    label: "Family",
    price: "520 CZK",
    points: 260,
  },
];

export const visitTimes = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

export const visitInfo = {
  address: "Mozarteum, Jungmannova 748/30, 110 00 Prague 1",
  openingHours: "Open daily 13:00-19:00",
  languages: "Czech and English friendly",
};
