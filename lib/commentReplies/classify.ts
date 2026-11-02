import { fingerprint, isEmojiOnly, wordCount } from "./normalise";
import type { Category, Decision, Rule } from "./types";

/**
 * Deciding what a comment is, with rules and arithmetic. No model, no network.
 *
 * The order matters more than the scoring does:
 *
 *   1. Nothing to answer      - empty, emoji only, or too short to mean anything.
 *   2. A blocking rule hit    - grief, a prayer request, a question, criticism.
 *                               These win outright. A comment can be warm AND
 *                               be about someone's cancer; the cancer decides.
 *   3. Score the rest         - add up the rules that matched per category.
 *   4. Length gate            - the winning category has a word ceiling. Past
 *                               it, the comment is a reflection rather than a
 *                               reaction, and gets reviewed instead.
 *   5. Confidence floor       - a weak best guess is not a guess worth posting.
 *
 * Step 4 is the one doing the real work here. Measured on 2026-11-02, 364 of
 * 571 real comments are 13 words or longer. Those people wrote something; a
 * library reply under it would be worse than silence.
 */

/** Below this, the winner is not convincing enough to post. */
export const CONFIDENCE_FLOOR = 0.6;

/** Shorter than this and there is nothing to react to. */
const MIN_CHARS = 2;

/**
 * Score -> confidence. A single strong rule (weight 4) is enough on its own;
 * two weak ones also get there. Kept deliberately blunt so that reading the
 * log and the rule weights is enough to explain any decision.
 */
function toConfidence(score: number): number {
  return Math.max(0, Math.min(1, score / 4));
}

function ruleMatches(rule: Rule, normalised: string, raw: string): boolean {
  if (!rule.enabled) return false;
  switch (rule.kind) {
    case "exact":
      return normalised === rule.pattern;
    case "phrase":
      return normalised.includes(rule.pattern);
    case "regex":
    case "raw":
      try {
        // "raw" keeps the punctuation, which is the only way a rule can look
        // for a question mark - normalising strips it.
        return new RegExp(rule.pattern, "iu").test(rule.kind === "raw" ? raw : normalised);
      } catch {
        // A rule someone typed wrong must not take the whole run down with it.
        return false;
      }
    default:
      return false;
  }
}

export function classify(
  rawText: string,
  categories: Category[],
  rules: Rule[],
  /**
   * Where a comment goes when nothing matched it.
   *
   * The study guides pass "reflection" here: Louis wants everyone who
   * commented under a chapter answered, and most of those comments contain no
   * keyword worth matching - they are someone thinking out loud about
   * Proverbs. The social feed passes nothing, so an unmatched comment there is
   * still a skip.
   *
   * A blocked comment never reaches this. Grief, prayer requests, questions
   * and criticism are decided before any scoring happens.
   */
  fallbackCategorySlug?: string | null,
): Decision {
  const normalised = fingerprint(rawText);
  const words = wordCount(rawText);
  const byCategory = new Map(categories.map((c) => [c.slug, c]));

  if (isEmojiOnly(rawText)) {
    return { action: "skipped", categorySlug: "emoji_only", ruleId: null, confidence: 1, reason: "emoji only" };
  }
  if (normalised.length < MIN_CHARS) {
    return { action: "skipped", categorySlug: null, ruleId: null, confidence: 1, reason: "nothing to reply to" };
  }

  const active = rules.filter((r) => r.enabled && byCategory.get(r.categorySlug)?.enabled !== false);

  // 2. Blocking rules win outright.
  for (const rule of active) {
    if (!rule.blocks || !ruleMatches(rule, normalised, rawText)) continue;
    const category = byCategory.get(rule.categorySlug);
    return {
      action: category?.strategy === "skip" ? "skipped" : "review",
      categorySlug: rule.categorySlug,
      ruleId: rule.id,
      confidence: 1,
      reason: `blocked by ${rule.categorySlug} rule`,
    };
  }

  // 3. Score everything else.
  // Per category: the total of everything that matched, plus the heaviest
  // single rule, since that is the one worth showing next to the decision when
  // Louis asks why a comment got answered the way it did.
  const scores = new Map<string, { score: number; ruleId: string; heaviest: number }>();
  for (const rule of active) {
    if (rule.blocks || !ruleMatches(rule, normalised, rawText)) continue;
    const prev = scores.get(rule.categorySlug);
    if (!prev) {
      scores.set(rule.categorySlug, { score: rule.weight, ruleId: rule.id, heaviest: rule.weight });
      continue;
    }
    prev.score += rule.weight;
    if (rule.weight > prev.heaviest) {
      prev.heaviest = rule.weight;
      prev.ruleId = rule.id;
    }
  }

  if (scores.size === 0) {
    const fallback = fallbackCategorySlug ? byCategory.get(fallbackCategorySlug) : undefined;
    if (!fallback || fallback.strategy !== "reply" || fallback.enabled === false) {
      return { action: "skipped", categorySlug: null, ruleId: null, confidence: 0, reason: "no rule matched" };
    }
    if (words > fallback.maxWords) {
      return {
        action: "review",
        categorySlug: fallback.slug,
        ruleId: null,
        confidence: 0,
        reason: `${words} words is past the ${fallback.maxWords}-word ceiling for ${fallback.slug}`,
      };
    }
    return { action: "replied", categorySlug: fallback.slug, ruleId: null, confidence: 1, reason: `fell back to ${fallback.slug}` };
  }

  const [winnerSlug, winner] = [...scores.entries()].sort((a, b) => b[1].score - a[1].score)[0];
  const category = byCategory.get(winnerSlug);
  const confidence = toConfidence(winner.score);

  if (!category) {
    return { action: "skipped", categorySlug: null, ruleId: null, confidence, reason: "category missing" };
  }
  if (category.strategy === "skip") {
    return { action: "skipped", categorySlug: winnerSlug, ruleId: winner.ruleId, confidence, reason: `${winnerSlug} is skipped` };
  }
  if (category.strategy === "review") {
    return { action: "review", categorySlug: winnerSlug, ruleId: winner.ruleId, confidence, reason: `${winnerSlug} is human only` };
  }

  // 4. Length gate.
  if (category.maxWords <= 0 || words > category.maxWords) {
    return {
      action: "review",
      categorySlug: winnerSlug,
      ruleId: winner.ruleId,
      confidence,
      reason: `${words} words is past the ${category.maxWords}-word ceiling for ${winnerSlug}`,
    };
  }

  // 5. Confidence floor.
  if (confidence < CONFIDENCE_FLOOR) {
    return { action: "review", categorySlug: winnerSlug, ruleId: winner.ruleId, confidence, reason: "below the confidence floor" };
  }

  return { action: "replied", categorySlug: winnerSlug, ruleId: winner.ruleId, confidence, reason: `${winnerSlug} matched` };
}
