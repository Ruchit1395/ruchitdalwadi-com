export const SITE = {
  name: "Ruchit Dalwadi",
  shortName: "Ruchit",
  author: "Ruchit Dalwadi",
  tagline: "I help operators ship AI-native product.",
  identity:
    "I help operators ship AI-native product. Frameworks and lessons from a decade of work across six industries.",
  description:
    "Ruchit Dalwadi — operator and teacher in AI, startups, and product. Frameworks, evals, and shipping playbooks from a decade across six industries.",
  keywords: [
    "AI evals",
    "agentic AI",
    "LLM evaluation",
    "product frameworks",
    "vertical SaaS",
    "B2B AI",
    "startup playbooks",
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
  trackRecord: [
    { value: "6", label: "industries shipped across" },
    { value: "10+", label: "years operator work" },
    { value: "millions", label: "of end-users reached" },
  ],
  pillars: ["AI", "Startups", "Product"] as const,
  pullQuote:
    "Get to the specific job. Then build the most boring version of the product that does it well.",
  pullQuoteSource: "from ‘What I learned shipping across six industries’",
} as const;

export type Pillar = (typeof SITE.pillars)[number];
