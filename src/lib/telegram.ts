// Accepts "@username", "username", "https://t.me/username" or "t.me/username"
// and normalizes to "@username". Case is preserved — Telegram usernames may
// be displayed with intentional capitalization.
export function normalizeTelegramHandle(input?: string | null): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  if (!trimmed) return null;
  const handle = trimmed
    .replace(/^https?:\/\//i, "")
    .replace(/^t\.me\//i, "")
    .replace(/^@/, "")
    .trim();
  return handle ? `@${handle}` : null;
}

export function telegramUrl(handle: string): string {
  return `https://t.me/${handle.replace(/^@/, "")}`;
}
