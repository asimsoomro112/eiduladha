export interface Memory {
  year: string;
  hijri: string;
  emoji: string;
  color: "rose" | "violet" | "gold" | "teal" | "green";
  title: string;
  description: string;
}

export const memories: Memory[] = [
  {
    year: "2019 — Year 1",
    hijri: "1440–1441 AH",
    emoji: "🌱",
    color: "rose",
    title: "Where It All Began",
    description: "I didn't know it then, but Allah was writing our story from that very first moment. You were the dua I didn't know how to ask for."
  },
  {
    year: "2020 — Year 2",
    hijri: "1441–1442 AH",
    emoji: "🌧️",
    color: "violet",
    title: "Learning Love Through Hardship",
    description: "The world was falling apart, but somehow that only brought us closer. I learned what it means to need someone — and it was always you."
  },
  {
    year: "2021 — Year 3",
    hijri: "1442–1443 AH",
    emoji: "🌻",
    color: "gold",
    title: "Growing Into Each Other",
    description: "Every conversation made the roots grow deeper. I wasn't just falling for you anymore — I was building a home in the thought of you."
  },
  {
    year: "2022 — Year 4",
    hijri: "1443–1444 AH",
    emoji: "⭐",
    color: "teal",
    title: "Four Years of Choosing You",
    description: "Four years means four years of choosing. Every day, every argument, every silence — I chose you. I'd choose you again."
  },
  {
    year: "2023 — Year 5",
    hijri: "1444–1445 AH",
    emoji: "🤲",
    color: "green",
    title: "Learning Sabr Together",
    description: "We learned that love isn't just feelings — it's patience. It's dua. It's trusting Allah's plan even when the path isn't clear yet."
  },
  {
    year: "2024 — Year 6",
    hijri: "1445–1446 AH",
    emoji: "💌",
    color: "rose",
    title: "Six Years, Still Sure",
    description: "Most people don't survive six months. Here we are, six years in, and I am more sure of you than I have ever been of anything."
  },
  {
    year: "2025–2026 — Year 7",
    hijri: "1446–1447 AH",
    emoji: "💍",
    color: "gold",
    title: "InshaAllah — Almost There",
    description: "Seven years, Saniya Jaan. Seven years of sabr, of dua, of holding on. InshaAllah this is our last Eid before we begin forever."
  }
];
