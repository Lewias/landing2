import { brand } from "./site";
import {
  BarChart3,
  Film,
  Layers,
  Send,
  type LucideIcon,
} from "lucide-vue-next";

/**
 * Copy for every section below the hero. Same rule as `site.ts`: no CMS and no
 * API — components read these objects and nothing else.
 *
 * Numbers, quotes and prices are placeholder marketing copy for the layout.
 */

/* ----------------------------- platform strip ---------------------------- */

export const platforms: string[] = [
  "TikTok",
  "Instagram Reels",
  "YouTube Shorts",
  "Spotify",
  "Apple Music",
  "SoundCloud",
  "Deezer",
  "Amazon Music",
];

/* -------------------------------- problem -------------------------------- */

export interface Pain {
  title: string;
  body: string;
}

export interface ProblemContent {
  eyebrow: string;
  title: string;
  lead: string;
  pains: Pain[];
}

export const problem: ProblemContent = {
  eyebrow: "The problem",
  title: "Most releases die in the first 48 hours",
  lead: "Platforms reward momentum. Without a steady wave of content in release week, the algorithm never gets enough signal to push your track — and the release quietly disappears.",
  pains: [
    {
      title: "One video is not a campaign",
      body: "A single post gives the algorithm nothing to test. It needs volume and variety before it can find the people who would actually save your track.",
    },
    {
      title: "Ads buy views, not fans",
      body: "Paid traffic stops the day the budget stops. Organic short-form keeps compounding long after the release week is over.",
    },
    {
      title: "Doing it yourself burns weeks",
      body: "Filming, editing, captioning and posting a hundred videos is a full-time job. You should be spending that week making music.",
    },
  ],
};

/* --------------------------------- cases --------------------------------- */

export interface CasesContent {
  eyebrow: string;
  title: string;
  lead: string;
}

export interface CaseStat {
  label: string;
  value: string;
}

export interface FeaturedCase {
  eyebrow: string;
  artist: string;
  summary: string;
  /** Read straight off the screenshot below, at full resolution. */
  stats: CaseStat[];
  shot: { src: string; alt: string };
}

export const featuredCase: FeaturedCase = {
  eyebrow: "Case study",
  artist: "CAIRO!",
  summary:
    "A verified profile with a quarter of a million people listening every month, and five tracks that have not stopped climbing since release week.",
  stats: [
    { label: "Monthly listeners", value: "250 853" },
    { label: "Heatseeker", value: "33.8M" },
    { label: "Top five combined", value: "72.3M" },
  ],
  shot: {
    src: "/result/cairo.webp",
    alt: "CAIRO!'s verified Spotify profile: 250,853 monthly listeners, with Heatseeker at 33,867,132 plays and Insomniac at 16,565,825.",
  },
};

export const cases: CasesContent = {
  eyebrow: "Results",
  title: "What a release week looks like",
  lead: "Numbers straight off the artist's own Spotify, not a dashboard we drew ourselves.",
};

/* ----------------------------- testimonials ------------------------------ */

export interface Testimonial {
  /** Empty when the artist has not been named yet. */
  name: string;
  role: string;
  video: string;
  poster: string;
  /** Spoken content is not transcribed, so this describes the clip itself. */
  alt: string;
}

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  lead: string;
  items: Testimonial[];
}

export const testimonials: TestimonialsContent = {
  eyebrow: "Reviews",
  title: "What artists say on camera",
  lead: "No scripts and no reshoots — these came in as voice notes after the first release week.",
  items: [
    {
      name: "LiTheGoat",
      role: "Independent artist",
      video: "/review/lithegoat.mp4",
      poster: "/review/lithegoat-poster.jpg",
      alt: "Video review from LiTheGoat, filmed at home.",
    },
    {
      name: "ttreonerr!",
      role: "Independent artist",
      video: "/review/ttreonerr.mp4",
      poster: "/review/ttreonerr-poster.jpg",
      alt: "Video review from ttreonerr!, filmed at home.",
    },
    {
      name: "Mangian",
      role: "Independent artist",
      video: "/review/mangian.mp4",
      poster: "/review/mangian-poster.jpg",
      alt: "Video review from Mangian, filmed at home.",
    },
  ],
};

/* -------------------------------- services ------------------------------- */

export interface Service {
  icon: LucideIcon;
  title: string;
  body: string;
}

export interface ServicesContent {
  eyebrow: string;
  title: string;
  lead: string;
  items: Service[];
}

export const services: ServicesContent = {
  eyebrow: "Service",
  title: "A full content engine around one track",
  lead: "Everything from the first idea to the last published clip. You hand over the song, we handle the rest.",
  items: [
    {
      icon: Layers,
      title: "Creative strategy",
      body: "We study the track, your references and the audience you want, then map out the hooks, formats and angles worth cutting.",
    },
    {
      icon: Film,
      title: "Short-form at volume",
      body: "Every clip is edited from scratch — different hooks, captions, pacing and visuals. No reposts, no recycled templates.",
    },
    {
      icon: Send,
      title: "Publishing and pitching",
      body: "We publish across TikTok, Reels and Shorts and pitch your track to playlist curators on a release-week schedule.",
    },
    {
      icon: BarChart3,
      title: "Campaign reporting",
      body: "You see what is working: views, saves, watch-through, and which cuts actually convert into streams and followers.",
    },
  ],
};

/* -------------------------------- packages ------------------------------- */

export interface PlanHighlight {
  /** Optional leading figure, set apart from the label in acid. */
  value?: string;
  label: string;
}

export interface Plan {
  index: string;
  name: string;
  price: string;
  tagline: string;
  /** The two or three lines that carry the whole comparison at a glance. */
  highlights: PlanHighlight[];
  /** Small print under the fold of the card. */
  details: string[];
  cta: string;
  featured?: boolean;
}

export interface PackagesContent {
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  plans: Plan[];
}

export const packages: PackagesContent = {
  eyebrow: "Pricing",
  title: "Pick the size of your release",
  lead: "One flat price per release. No retainers, no long contracts, no hidden ad spend.",
  note: "Every package includes 10% off your first boost.",
  plans: [
    {
      index: "01",
      name: "Test",
      price: "$99",
      tagline: "Try it. See what happens.",
      highlights: [
        { value: "50+", label: "Videos" },
        { value: "5", label: "Playlists" },
      ],
      details: ["TikTok / Reels / Shorts", "Campaign report"],
      cta: "Start with Test",
    },
    {
      index: "02",
      name: "Boost",
      price: "$249",
      tagline: "Your release deserves a push.",
      highlights: [
        { value: "100+", label: "Videos" },
        { value: "10–15", label: "Playlists" },
        { label: "Release boost" },
      ],
      details: [
        "Pre-save growth",
        "Release-day boost",
        "TikTok / Reels / Shorts",
        "Campaign report",
      ],
      cta: "Get Boost",
      featured: true,
    },
    {
      index: "03",
      name: "Grow",
      price: "$429",
      tagline: "Turn a release into a campaign.",
      highlights: [
        { value: "200+", label: "Videos" },
        { value: "20", label: "Playlists" },
        { label: "Ads + radio" },
      ],
      details: [
        "Pre-save growth",
        "Release boost",
        "Paid advertising",
        "Radio pitching",
        "TikTok / Reels / Shorts",
        "Campaign report",
      ],
      cta: "Get Grow",
    },
    {
      index: "04",
      name: "Scale",
      price: "$699",
      tagline: "Go all in on your release.",
      highlights: [
        { value: "300+", label: "Videos" },
        { value: "30+", label: "Playlists" },
        { label: "Full release campaign" },
      ],
      details: [
        "Pre-save campaign",
        "Release boost",
        "Paid advertising",
        "Radio pitching",
        "Multiple content angles",
        "Campaign optimization",
        "Full campaign report",
      ],
      cta: "Get Scale",
    },
  ],
};

/* ---------------------------------- FAQ ---------------------------------- */

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  items: FaqItem[];
}

export const faq: FaqContent = {
  eyebrow: "Questions",
  title: "Everything artists ask before the first boost",
  items: [
    {
      question: "Do I need to film anything myself?",
      answer:
        "No. We work from whatever you already have — cover art, phone footage, live clips, studio takes — and fill the gaps with licensed material. If you do want to shoot, we send a shot list.",
    },
    {
      question: "Are the videos posted from my accounts or yours?",
      answer:
        "Both, and you choose the split. Hero cuts usually go out from your own profiles, and the wider volume runs through our seeding network so your feed never looks spammed.",
    },
    {
      question: "What actually counts as a unique video?",
      answer:
        "A different hook, edit and caption — not the same clip re-uploaded. That is the whole point: platforms need variety before they will test a sound properly.",
    },
    {
      question: "How fast can you start?",
      answer:
        "Usually within two working days of the brief. If your release date is tighter than that, say so in the form and we will tell you honestly whether we can hit it.",
    },
    {
      question: "What if the release does not perform?",
      answer:
        "You still get the full run of videos, the reporting and the hook analysis. We will also tell you plainly if we think content is not the thing holding the track back.",
    },
    {
      question: "Do you work outside English-speaking markets?",
      answer:
        "Yes. Captions and hooks are written per market, and we shift the posting schedule to the time zones where your listeners actually are.",
    },
  ],
};

/* --------------------------------- footer -------------------------------- */

export interface FooterLink {
  label: string;
  /** Omitted when the link opens the application dialog instead of navigating. */
  href?: string;
  action?: "apply";
}

export interface FooterColumn {
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  blurb: string;
  columns: FooterColumn[];
  legal: string;
}

export const footer: FooterContent = {
  blurb:
    "A short-form content studio for independent artists. We build the release week the algorithm actually notices.",
  columns: [
    {
      title: "Service",
      links: [
        { label: "Service", href: "#service" },
        { label: "Results", href: "#results" },
        { label: "Reviews", href: "#reviews" },
        { label: "Pricing", href: "#pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "Get a content plan", action: "apply" },
        { label: "Questions", href: "#faq" },
        { label: "Instagram", href: brand.instagramUrl },
        { label: brand.email, href: `mailto:${brand.email}` },
      ],
    },
  ],
  legal: "© 2026 Feel Agency. All rights reserved.",
};
