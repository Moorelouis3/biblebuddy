import type { Category, Rule, Template } from "./types";

/**
 * The categories, matching rules and reply library, in one file.
 *
 * This is the source of truth. `scripts/seed-comment-replies.mjs` pushes it
 * into Supabase; the backtest and the unit tests import it directly. That way
 * what gets tested is what runs, and changing a rule does not need a migration.
 *
 * Rules Louis set, which the shape of this file is built around:
 *
 *   "I prefer an unanswered comment over an inappropriate automated response."
 *
 * So every category that touches a person's life - prayer, testimony, grief,
 * a real question - is `review`, never `reply`, and `maxWords` keeps the
 * answerable ones to short reactions. Measured on the real data, 364 of 571
 * comments run past 13 words. Those are reflections. They get a human or
 * nothing.
 */

export const CATEGORIES: Category[] = [
  { slug: "amen", label: "Amen / agreement", strategy: "reply", maxWords: 6, enabled: true },
  { slug: "praise", label: "Praise God / worship", strategy: "reply", maxWords: 8, enabled: true },
  { slug: "thanks", label: "Thank you", strategy: "reply", maxWords: 10, enabled: true },
  { slug: "greeting", label: "Greeting", strategy: "reply", maxWords: 6, enabled: true },
  { slug: "blessing", label: "Blessing", strategy: "reply", maxWords: 8, enabled: true },
  { slug: "study_intent", label: "Here to study", strategy: "reply", maxWords: 8, enabled: true },

  // Human only. maxWords 0 is belt and braces: even if one of these were
  // flipped to "reply" by mistake, the length gate would still stop it.
  { slug: "prayer", label: "Prayer request", strategy: "review", maxWords: 0, enabled: true },
  { slug: "testimony", label: "Personal testimony", strategy: "review", maxWords: 0, enabled: true },
  { slug: "question", label: "Question", strategy: "review", maxWords: 0, enabled: true },
  { slug: "criticism", label: "Disagreement / criticism", strategy: "review", maxWords: 0, enabled: true },
  { slug: "sensitive", label: "Sensitive", strategy: "review", maxWords: 0, enabled: true },

  { slug: "spam", label: "Spam", strategy: "skip", maxWords: 0, enabled: true },
  { slug: "emoji_only", label: "Emoji only", strategy: "skip", maxWords: 0, enabled: true },
];

/**
 * Ids are stable strings rather than uuids so a decision in the log can be read
 * back months later and still say which rule fired.
 */
const rule = (
  id: string,
  categorySlug: string,
  kind: Rule["kind"],
  pattern: string,
  weight: number,
  blocks = false,
): Rule => ({ id, categorySlug, kind, pattern, weight, blocks, enabled: true });

export const RULES: Rule[] = [
  // --- Blocking rules -------------------------------------------------------
  // These do not compete on score. If one matches, the comment goes to a human,
  // whatever else it also looked like. A comment can be warm and grateful and
  // still be about somebody's funeral; the funeral decides.
  rule("block-grief", "sensitive", "regex", "\\b(passed away|died|dying|cancer|suicide|kill myself|abuse|divorce|miscarriage|funeral|terminal)\\b", 5, true),
  rule("block-distress", "sensitive", "regex", "\\b(depress|anxiety|anxious|addict|relapse|homeless|evicted)\\w*\\b", 4, true),
  rule("block-prayer", "prayer", "regex", "\\b(pray for me|please pray|prayer request|need prayer|praying for)\\b", 5, true),
  rule("block-question-mark", "question", "regex", "\\?", 3, true),
  rule("block-question-words", "question", "regex", "\\b(what does|what is|how do i|why does|why did|can you explain|does this mean)\\b", 3, true),
  rule("block-criticism", "criticism", "regex", "\\b(disagree|wrong|false|heresy|not true|mistranslat)\\w*\\b", 4, true),
  // Anything written in the first person about the person's own life. This is
  // the big one: it is what keeps a 30-word story from being met with "Amen."
  rule("block-personal", "testimony", "regex", "\\b(i am|im|i feel|i have been|i was|i lost|i struggle|i struggled|my son|my daughter|my husband|my wife|my mother|my father|my mom|my dad|my marriage|my life)\\b", 4, true),

  // --- Scoring rules --------------------------------------------------------
  rule("amen-exact", "amen", "exact", "amen", 4),
  rule("amen-doubled", "amen", "exact", "amen amen", 4),
  rule("amen-alone", "amen", "regex", "^amen$", 4),
  // "this" was in this list and caught "This one has stood for me", which is
  // somebody starting a thought, not agreeing. Opening words that can begin a
  // sentence belong in `exact` rules, not prefix ones.
  rule("amen-agreement", "amen", "regex", "^(yes|yep|true|so true|facts|exactly|agreed)\\b", 3),
  rule("amen-this", "amen", "exact", "this", 3),
  rule("amen-appreciation", "amen", "regex", "^(wow|beautiful|powerful|love this|great study|good study)\\b", 3),

  rule("praise-lord", "praise", "phrase", "praise the lord", 4),
  rule("praise-god", "praise", "phrase", "praise god", 4),
  rule("praise-good", "praise", "phrase", "god is good", 4),
  rule("praise-hallelujah", "praise", "phrase", "hallelujah", 4),
  rule("praise-glory", "praise", "phrase", "glory to god", 4),

  rule("thanks-main", "thanks", "regex", "\\b(thank you|thanks|thankful|grateful)\\b", 3),
  rule("thanks-appreciate", "thanks", "phrase", "appreciate", 2),

  rule("greeting-main", "greeting", "regex", "^(hi|hello|hey|good morning|good evening|good afternoon)\\b", 3),

  rule("blessing-godbless", "blessing", "phrase", "god bless", 3),
  rule("blessing-plain", "blessing", "regex", "^blessings?\\b", 3),

  rule("study-exact", "study_intent", "exact", "bible study", 4),
  rule("study-intent", "study_intent", "regex", "\\b(ready to (study|learn)|here to (study|learn)|new to the bible|just started)\\b", 3),

  rule("spam-main", "spam", "regex", "\\b(follow me|check my (page|profile|bio)|sub4sub|dm me|click here|free money|crypto)\\b", 5),
];

const template = (id: string, categorySlug: string, body: string): Template => ({
  id,
  categorySlug,
  body,
  approved: true,
  enabled: true,
  timesUsed: 0,
  lastUsedAt: null,
});

/**
 * Short, plain, warm. No emoji walls, no theology, and nothing that promises
 * Louis will do something he has not actually done - no "I'm praying for you"
 * from a machine.
 */
export const TEMPLATES: Template[] = [
  template("amen-1", "amen", "Amen."),
  template("amen-2", "amen", "Amen to that."),
  template("amen-3", "amen", "Glad this one landed."),
  template("amen-4", "amen", "Glad it spoke to you."),
  template("amen-5", "amen", "Good to have you reading along."),

  template("praise-1", "praise", "He is. Every time."),
  template("praise-2", "praise", "Amen, God is good."),
  template("praise-3", "praise", "Praise God."),
  template("praise-4", "praise", "Glory to God."),

  template("thanks-1", "thanks", "You are welcome. Glad it helped."),
  template("thanks-2", "thanks", "Thank you for reading it."),
  template("thanks-3", "thanks", "Glad it was useful."),
  template("thanks-4", "thanks", "Appreciate you taking the time."),

  template("greeting-1", "greeting", "Hey, good to have you here."),
  template("greeting-2", "greeting", "Hello, glad you are studying with us."),
  template("greeting-3", "greeting", "Welcome in."),

  template("blessing-1", "blessing", "God bless you too."),
  template("blessing-2", "blessing", "Blessings to you as well."),
  template("blessing-3", "blessing", "And you. Thanks for being here."),

  template("study-1", "study_intent", "Glad you are here. Take it one chapter at a time."),
  template("study-2", "study_intent", "Good place to start. Enjoy the study."),
  template("study-3", "study_intent", "Welcome. There is no rush, just keep reading."),
];
