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

  /**
   * Someone working through the chapter, in their own words.
   *
   * Louis, 2026-11-02: "its any comment on the study guides as they are
   * following the decisions and i want to comment on them... like the wisdom
   * of proverbs i should comment on all the people who commented."
   *
   * He is right, and this is the difference between the two surfaces. Under a
   * study, a host saying "good word, thanks for sharing that" to a long
   * reflection is exactly what a host does - it is warm, it is true, and it
   * claims nothing. It is only a canned "Amen!" under somebody's grief that is
   * wrong. So reflections get answered, and the ceiling is generous.
   *
   * This is the article source's fallback: anything that matched no other rule
   * and tripped no blocker lands here. The blockers above it are what keep it
   * safe, which is why they were tightened at the same time.
   */
  { slug: "reflection", label: "Reflection on the study", strategy: "reply", maxWords: 150, enabled: true },
  { slug: "testimony", label: "Sharing something personal", strategy: "reply", maxWords: 150, enabled: true },

  // Human only. maxWords 0 is belt and braces: even if one of these were
  // flipped to "reply" by mistake, the length gate would still stop it.
  { slug: "prayer", label: "Prayer request", strategy: "review", maxWords: 0, enabled: true },
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
  // Grief, illness, crisis. These carry the whole safety of the system now
  // that reflections are answered, so they are deliberately broad: a comment
  // sent to Louis that did not need to be costs him a moment, while a canned
  // line under somebody's bereavement is unforgivable. When in doubt, block.
  rule("block-grief", "sensitive", "regex", "\\b(passed away|passed on|died|dying|death|cancer|tumou?r|terminal|hospice|funeral|buried|grief|grieving|mourning|widow|suicide|kill myself|end it all|self harm)\\b", 5, true),
  rule("block-loss", "sensitive", "regex", "\\b(lost my|losing my|lost her|lost him|lost our)\\b", 5, true),
  rule("block-illness", "sensitive", "regex", "\\b(hospital|icu|surgery|chemo|diagnos|stroke|heart attack|illness|terminally)\\w*\\b", 5, true),
  rule("block-distress", "sensitive", "regex", "\\b(depress|anxiety|anxious|addict|relapse|homeless|evicted|abuse|abusive|divorce|separat|miscarriage|miscarried|infertil|bankrupt|fired|unemploy)\\w*\\b", 4, true),
  rule("block-struggle", "sensitive", "regex", "\\b(struggling with|going through|hardest time|rock bottom|give up|giving up|hopeless|broken heart|cant cope|cant take|overwhelmed|burnt out|burned out|at my lowest|in tears|crying myself|lost my way|dont know what to do)\\b", 4, true),
  // A relationship coming apart. "My marriage is falling apart" reached the
  // reflection fallback and got "Good word, thanks for sharing that" until the
  // verifier caught it, which is exactly the failure this whole design exists
  // to prevent.
  rule("block-relationship", "sensitive", "regex", "\\b(falling apart|fall apart|breaking up|broke up|left me|walked out|cheating|unfaithful|estranged|custody|restraining order)\\b", 4, true),

  rule("block-prayer", "prayer", "regex", "\\b(pray for me|please pray|prayer request|need prayer|praying for|pray for my|keep me in your prayers)\\b", 5, true),
  // "raw", not "regex": normalising strips punctuation, so a question mark is
  // gone by the time a regex rule sees the text. This was written as a regex
  // and silently never fired until a backtest caught five questions being
  // answered with a template.
  rule("block-question-mark", "question", "raw", "\\?", 3, true),
  rule("block-question-words", "question", "regex", "\\b(what does|what is|how do i|why does|why did|can you explain|does this mean|can someone)\\b", 3, true),
  rule("block-criticism", "criticism", "regex", "\\b(disagree|wrong|false|heresy|not true|mistranslat)\\w*\\b", 4, true),

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

  // Written in the first person about their own life, and nothing above
  // blocked it - so it is them sharing, not them in trouble. Scored rather
  // than blocking now, so it picks the "thanks for sharing" replies.
  rule("personal-share", "testimony", "regex", "\\b(i am|im|i feel|i have been|i was|i used to|i struggle|my son|my daughter|my husband|my wife|my mother|my father|my mom|my dad|my family|my life|my walk|my faith)\\b", 4),
];

/**
 * What a comment falls back to when no rule matched it at all.
 *
 * Only the study guides. Louis wants every person who commented under a
 * chapter answered, and a reflection on Proverbs deserves a reply even though
 * no keyword in it is recognisable. The social feed keeps strict matching:
 * out there a comment can be aimed at anyone, so silence is the safer default.
 *
 * Nothing reaches this that tripped a blocker - grief, a prayer request, a
 * question and criticism are all decided before scoring, and still go to Louis.
 */
export const FALLBACK_BY_SOURCE: Record<string, string | null> = {
  article: "reflection",
  feed: null,
};

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

  // Reflections. These have to be true under any thoughtful comment without
  // pretending to have read a specific argument in it - so they acknowledge
  // the person, not the content. Nothing here agrees with a claim, settles a
  // point of theology, or promises Louis will do anything.
  template("reflection-1", "reflection", "Good word. Thanks for sharing that."),
  template("reflection-2", "reflection", "That is a good takeaway."),
  template("reflection-3", "reflection", "Appreciate you reading along and thinking it through."),
  template("reflection-4", "reflection", "Well said."),
  template("reflection-5", "reflection", "Thanks for adding that to the study."),
  template("reflection-6", "reflection", "Good to have you working through this one."),
  template("reflection-7", "reflection", "That is worth sitting with."),
  template("reflection-8", "reflection", "Glad this chapter gave you something to chew on."),

  // Someone sharing their own life, where nothing suggested they are in
  // trouble. Warm, and careful not to claim to know how they feel.
  template("testimony-1", "testimony", "Thanks for sharing that here."),
  template("testimony-2", "testimony", "Appreciate you being open about it."),
  template("testimony-3", "testimony", "That takes something to put into words. Thank you."),
  template("testimony-4", "testimony", "Glad you are walking through this with us."),
];
