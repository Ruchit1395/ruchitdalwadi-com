export const SITE = {
  name: "Ruchit Dalwadi",
  shortName: "Ruchit",
  author: "Ruchit Dalwadi",
  tagline: "Building at the intersection of AI, startups, and product.",
  description:
    "Ruchit Dalwadi — builder writing about AI, startups, and product. Hands-on patterns, frameworks, and lessons from shipping across six industries.",
  keywords: [
    "AI",
    "LLMs",
    "agentic AI",
    "startups",
    "product",
    "product management",
    "builder",
    "Ruchit Dalwadi",
  ],
  url: "https://ruchitdalwadi.com",
  email: "ruchitdalwadi001@gmail.com",
  twitter: "@ruchitdalwadi",
  socials: {
    twitter: "https://x.com/ruchitdalwadi",
    linkedin: "https://www.linkedin.com/in/ruchitdalwadi/",
    github: "https://github.com/Ruchit1395",
    email: "mailto:ruchitdalwadi001@gmail.com",
  },
  availableFor: "Advisory work, angel-investor intros, and conversations about AI-native product",
  pillars: ["AI", "Startups", "Product"] as const,
} as const;

export type Pillar = (typeof SITE.pillars)[number];
