import type { TicketType } from "@/types";

export const ticketTypes: TicketType[] = [
  {
    id: "adult",
    label: "Adult",
    price: "240 CZK",
    points: 150,
  },
  {
    id: "student-senior",
    label: "Student/Senior",
    price: "160 CZK",
    points: 100,
  },
  {
    id: "junior",
    label: "Junior",
    price: "140 CZK",
    points: 90,
  },
  {
    id: "family",
    label: "Family (2+2)",
    price: "620 CZK",
    points: 300,
  },
];

export const visitInfo = {
  address: "Mozarteum, Jungmannova 748/30, 110 00 Prague 1",
  openingHours: "Open daily 13:00-19:00",
  languages: "Czech and English friendly",
};
