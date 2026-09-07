import {
  Clapperboard,
  Play,
  Rocket,
  Users,
  type LucideIcon,
} from "lucide-vue-next";

/**
 * Every piece of copy on the page lives here — no CMS, no API, no database.
 * Components read from these objects only.
 */

export interface BrandContent {
  name: string;
  trademark: string;
  tagline: string;
  email: string;
  instagramUrl: string;
  /** Placeholders — no real accounts were supplied for these two yet. */
  tiktokUrl: string;
  youtubeUrl: string;
  ctaLabel: string;
}

export const brand: BrandContent = {
  name: "Feel Agency",
  trademark: "®",
  tagline: "Music promotion for independent artists",
  email: "Ifeelthisbounce1@gmail.com",
  instagramUrl: "https://instagram.com/ifeel_agency",
  tiktokUrl: "https://tiktok.com/@ifeel_agency",
  youtubeUrl: "https://youtube.com/@ifeel_agency",
  ctaLabel: "Let's talk",
};

export interface NavLink {
  label: string;
  href: string;
}

/** Section anchors used by the header and the mobile menu. */
export const nav: NavLink[] = [
  { label: "Service", href: "#service" },
  { label: "Results", href: "#results" },
  { label: "Reviews", href: "#reviews" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export interface HeadlinePart {
  text: string;
  accent?: boolean;
}

export interface HeroContent {
  /** Headline split into lines, each line split into accented / plain runs. */
  headline: HeadlinePart[][];
  description: string;
  offer: { amount: string; caption: string };
  /** The button opens the application dialog, so there is no href. */
  cta: { label: string; note: string };
}

export const hero: HeroContent = {
  headline: [
    [{ text: "Turn  song" }],
    [{ text: "Into " }, { text: "100+videos", accent: true }],
    [{ text: "In 7 days" }],
  ],
  description:
    "We create and publish 100+ unique short-form videos around your release to put your music in front of new listeners.",
  offer: {
    amount: "10% off",
    caption: "Your first boost",
  },
  cta: {
    label: "Get free content plan",
    note: "Tell us about your release. Takes 30 seconds.",
  },
};

export interface ShowcaseContent {
  src: string;
  fallbackSrc: string;
  alt: string;
}

export const showcase: ShowcaseContent = {
  src: "/phones.webp",
  fallbackSrc: "/phones.jpg",
  alt:
    "Five phones showing short-form videos from a release — a live crowd, an artist on stage, a night street scene, a portrait and a car — with 945K, 1.2M, 1.1M, 725K and 816K views.",
};

export interface Stat {
  icon: LucideIcon;
  /** Rendered as a solid shape rather than an outline. */
  filled?: boolean;
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { icon: Play, filled: true, value: "800+", label: "Videos / release" },
  { icon: Users, value: "300K+", label: "Total streams" },
  { icon: Rocket, value: "15+", label: "Releases" },
  { icon: Clapperboard, value: "100s", label: "Of content pieces" },
];
