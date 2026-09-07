/**
 * Sends the application straight from the visitor's browser to the Telegram
 * Bot API, so the request never touches the server hosting this site.
 *
 * Two details make this work in a browser:
 *
 * 1. api.telegram.org answers every response with `Access-Control-Allow-Origin: *`,
 *    so reading the result cross-origin is allowed.
 * 2. Its CORS preflight replies **501 Not Implemented**, which browsers treat as
 *    a failed preflight. So the request must stay a "simple" one: `URLSearchParams`
 *    as the body sets `application/x-www-form-urlencoded` and no preflight is sent.
 *    Never switch this to a JSON body with a `Content-Type` header — it will be
 *    blocked before it leaves the browser.
 *
 * SECURITY: `VITE_*` values are compiled into the public JS bundle, so the bot
 * token ships to every visitor. See README — use a bot that does nothing but
 * post into one chat, or move the token behind the `endpoint` proxy instead.
 */

const TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN?.trim();
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID?.trim();

export const telegramConfigured = Boolean(TOKEN && CHAT_ID);

export interface Application {
  instagram: string;
  email: string;
  description: string;
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

function buildMessage({ instagram, email, description }: Application) {
  const handle = instagram.replace(/^@+/, "");
  const when = new Date().toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return [
    "🎧 <b>New content plan request</b>",
    "",
    `<b>Instagram:</b> <a href="https://instagram.com/${encodeURIComponent(handle)}">@${escapeHtml(handle)}</a>`,
    `<b>Email:</b> ${escapeHtml(email)}`,
    "",
    "<b>Release</b>",
    escapeHtml(description),
    "",
    `<i>${escapeHtml(when)} · ${escapeHtml(window.location.host)}</i>`,
  ].join("\n");
}

export async function sendToTelegram(application: Application): Promise<void> {
  if (!telegramConfigured) throw new Error("Telegram is not configured");

  const body = new URLSearchParams({
    chat_id: CHAT_ID!,
    text: buildMessage(application),
    parse_mode: "HTML",
    disable_web_page_preview: "true",
  });

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    body,
  });

  // A blocked or rate-limited call still parses; a network failure throws above.
  const result: { ok?: boolean; description?: string } = await res
    .json()
    .catch(() => ({}));

  if (!res.ok || !result.ok) {
    throw new Error(result.description ?? `Telegram responded ${res.status}`);
  }
}
