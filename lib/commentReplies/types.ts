/**
 * Shared shapes for the zero-AI study-comment replier.
 *
 * Everything here is plain data on purpose: the classifier takes the rules as
 * an argument rather than reading the database itself, so the backtest and the
 * unit tests can run the real decision path over the real 571 comments without
 * a network call - and without any chance of a model call.
 */

export type ReplyStrategy = "reply" | "review" | "skip";

export type Category = {
  slug: string;
  label: string;
  strategy: ReplyStrategy;
  /** A comment longer than this never gets an automatic reply. 0 = never auto. */
  maxWords: number;
  enabled: boolean;
};

export type RuleKind = "exact" | "phrase" | "regex";

export type Rule = {
  id: string;
  categorySlug: string;
  kind: RuleKind;
  pattern: string;
  weight: number;
  /** A blocking rule forces review no matter what else scored. */
  blocks: boolean;
  enabled: boolean;
};

export type Template = {
  id: string;
  categorySlug: string;
  body: string;
  approved: boolean;
  enabled: boolean;
  timesUsed: number;
  lastUsedAt: string | null;
};

export type Decision = {
  action: "replied" | "skipped" | "review";
  categorySlug: string | null;
  ruleId: string | null;
  confidence: number;
  reason: string;
};
