import { brand } from "./site";

/**
 * The application form: copy, field definitions and where a submission goes.
 *
 * There is no backend in this project. The form picks the first delivery that
 * is configured, in this order:
 *
 *   1. Telegram — set VITE_TELEGRAM_BOT_TOKEN and VITE_TELEGRAM_CHAT_ID.
 *      Sent straight from the visitor's browser, so a blocked server IP does
 *      not matter. The token ships in the public bundle; see README.
 *   2. `endpoint` below — a POST of JSON to any URL you control. Use this when
 *      you want the Telegram token to stay secret behind a small proxy.
 *   3. Otherwise the visitor's mail client opens with every field filled in.
 */

export interface FieldSpec {
  name: "instagram" | "email" | "description";
  label: string;
  placeholder: string;
  /** Rendered as a fixed prefix inside the control. */
  prefix?: string;
  autocomplete?: string;
  inputmode?: "text" | "email";
  type?: "text" | "email";
  multiline?: boolean;
  required: string;
  invalid?: string;
}

export interface ApplyContent {
  eyebrow: string;
  title: string;
  lead: string;
  /** Shorter wording for the dialog, where the heading has less room. */
  dialogTitle: string;
  dialogLead: string;
  points: string[];
  fields: FieldSpec[];
  submitLabel: string;
  note: string;
  endpoint: string | null;
  mailTo: string;
  mailSubject: string;
  success: {
    titleMail: string;
    titlePosted: string;
    bodyMail: string;
    bodyPosted: string;
    reset: string;
    close: string;
  };
  failure: string;
  failureAction: string;
  honeypotLabel: string;
}

export const apply: ApplyContent = {
  eyebrow: "Next release",
  title: "Turn your next song into 100+ videos",
  lead: "Tell us about the track and we will send back a free content plan — hooks, formats and a seven-day schedule. No call required.",
  dialogTitle: "Get your free content plan",
  dialogLead:
    "Three fields and we are done. We will come back with hooks, formats and a seven-day schedule.",
  points: [
    "A plan back within one business day",
    "No commitment and nothing to install",
    "10% off your first boost",
  ],
  fields: [
    {
      name: "instagram",
      label: "Instagram username",
      placeholder: "yourartistname",
      prefix: "@",
      autocomplete: "username",
      inputmode: "text",
      type: "text",
      required: "Add your Instagram username so we can look at your profile.",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "you@email.com",
      autocomplete: "email",
      inputmode: "email",
      type: "email",
      required: "We need an email to send the content plan to.",
      invalid: "That does not look like a valid email address.",
    },
    {
      name: "description",
      label: "Description",
      placeholder: "Tell us about your release",
      multiline: true,
      required: "Tell us a little about the release — genre, date, references.",
      invalid: "A sentence or two is enough, but we need something to work with.",
    },
  ],
  submitLabel: "Get free content plan",
  note: "Takes 30 seconds. We reply within one business day.",
  endpoint: null,
  mailTo: brand.email,
  mailSubject: "Free content plan request",
  success: {
    titleMail: "Almost there",
    titlePosted: "Request sent",
    bodyMail:
      "Your mail app should have opened with everything filled in — send that message and we will come back with a content plan within one business day.",
    bodyPosted:
      "We have got your release and will come back with a content plan within one business day.",
    reset: "Send another",
    close: "Close",
  },
  failure:
    "That did not go through — the request was blocked or the network dropped.",
  failureAction: "Send it by email instead",
  /** Never shown to people; only bots fill it in. */
  honeypotLabel: "Leave this field empty",
};
