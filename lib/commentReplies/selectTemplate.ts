import type { Template } from "./types";

/**
 * Picking which approved reply to use.
 *
 * The risk a template library runs is looking like a template library: the same
 * four words under every comment on a chapter. So the choice is least-recently-
 * used first, with the ones already used on this article pushed to the back,
 * and a tie broken at random rather than by id (which would otherwise make the
 * order identical on every run).
 */

export type SelectOptions = {
  /** Reply bodies already posted under this article, so we do not repeat one. */
  usedOnArticle?: string[];
  /** Bodies used anywhere in the last few runs, to spread them out further. */
  recentlyUsed?: string[];
  /** Injectable for tests. */
  random?: () => number;
};

export function selectTemplate(
  templates: Template[],
  { usedOnArticle = [], recentlyUsed = [], random = Math.random }: SelectOptions = {},
): Template | null {
  const usable = templates.filter((t) => t.approved && t.enabled && t.body.trim());
  if (usable.length === 0) return null;

  const onArticle = new Set(usedOnArticle.map((b) => b.trim().toLowerCase()));
  const recent = new Set(recentlyUsed.map((b) => b.trim().toLowerCase()));

  const rank = (t: Template) => {
    const body = t.body.trim().toLowerCase();
    // 0 = never used here or lately, 1 = used lately, 2 = already under this
    // very article. Only fall back to a repeat when there is nothing else.
    if (onArticle.has(body)) return 2;
    if (recent.has(body)) return 1;
    return 0;
  };

  const scored = usable
    .map((t) => ({
      t,
      tier: rank(t),
      lastUsed: t.lastUsedAt ? new Date(t.lastUsedAt).getTime() : 0,
      jitter: random(),
    }))
    .sort((a, b) => a.tier - b.tier || a.lastUsed - b.lastUsed || a.jitter - b.jitter);

  return scored[0]?.t ?? null;
}
