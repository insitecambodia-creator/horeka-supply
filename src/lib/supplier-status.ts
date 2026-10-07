// Single source of truth for supplier lifecycle status. Deliberately does
// NOT include a separate "unverified" value — that would just duplicate the
// existing `verified` boolean (which means "personally confirmed by phone/
// chat", not "data accuracy"), so it's left alone.
export const SUPPLIER_STATUSES = [
  "active",
  "needs_review",
  "temporarily_inactive",
  "permanently_closed",
  "archived",
] as const;

export type SupplierStatus = (typeof SUPPLIER_STATUSES)[number];

export const SUPPLIER_STATUS_LABELS: Record<SupplierStatus, string> = {
  active: "Active",
  needs_review: "Needs review",
  temporarily_inactive: "Temporarily inactive",
  permanently_closed: "Permanently closed",
  archived: "Archived",
};

// These three are excluded from every public listing, count, filter and
// search result. "active" and "needs_review" both stay publicly visible —
// needs_review just flags a listing as due for a maintenance check, it
// doesn't mean the business is gone.
const HIDDEN_FROM_PUBLIC: ReadonlySet<SupplierStatus> = new Set([
  "temporarily_inactive",
  "permanently_closed",
  "archived",
]);

export function isPubliclyActive(status: string): boolean {
  return !HIDDEN_FROM_PUBLIC.has(status as SupplierStatus);
}

// Prisma `where` fragment for filtering a Supplier query down to only
// publicly-visible rows. Spread this into every public-facing query in
// src/lib/data.ts so the rule lives in exactly one place.
export const PUBLIC_SUPPLIER_WHERE = {
  status: { notIn: Array.from(HIDDEN_FROM_PUBLIC) },
};

// Accepts the new vocabulary plus the older sheet/sync values people are
// already used to typing ("Inactive", "Remove", etc.), so existing habits
// keep working without silently deleting anything.
const STATUS_ALIASES: Record<string, SupplierStatus> = {
  active: "active",
  needs_review: "needs_review",
  "needs review": "needs_review",
  review: "needs_review",
  temporarily_inactive: "temporarily_inactive",
  "temporarily inactive": "temporarily_inactive",
  inactive: "temporarily_inactive",
  paused: "temporarily_inactive",
  permanently_closed: "permanently_closed",
  "permanently closed": "permanently_closed",
  closed: "permanently_closed",
  archived: "archived",
  archive: "archived",
  remove: "archived",
  removed: "archived",
  delete: "archived",
  deleted: "archived",
};

export function normalizeSupplierStatus(input?: string): SupplierStatus | undefined {
  if (!input) return undefined;
  return STATUS_ALIASES[input.trim().toLowerCase()];
}
