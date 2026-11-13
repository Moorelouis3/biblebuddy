/**
 * Auto Comment: what the model is asked, for the posts a person actually
 * wrote (Louis, 2026-11-13).
 *
 * The old Auto Comment button reused the prompt written for answering a
 * comment under a study. On a feed post that went wrong in three ways, all
 * fixed here:
 *
 *  - it sent `verse_text || content`, so on a verse post the model got the
 *    verse and never saw what the person had written under it;
 *  - it sent the same text twice, once as "the post" and once as "the
 *    comment";
 *  - it told the model the author was called "Bible Buddy".
 *
 * Now the person's words are sent once, the verse is sent separately as
 * context, and no name is sent at all - the reply is told not to use one, so
 * a placeholder like "Bible Buddy User" can never be treated as a first name.
 *
 * The output is a draft for Louis to read, edit and post under his own name.
 * So it must not invent a life for him: no "I went through that too", no
 * made-up memories. It may be warm; it may not pretend.
 */

export const AUTO_COMMENT_MODEL = "gpt-4o-mini";

/** Two short sentences is about 50 tokens. This leaves room without inviting an essay. */
export const AUTO_COMMENT_MAX_OUTPUT_TOKENS = 120;

/** Long posts are clipped here. The longest on record is about 1,200 characters. */
export const AUTO_COMMENT_MAX_POST_CHARS = 1200;
const MAX_VERSE_CHARS = 400;

const BASE =
  "You draft a short comment for the host of a Bible study app to post under a member's post in the community feed. " +
  "He will read it, edit it and post it himself, under his own name. " +
  "Reply to what this person actually wrote, in one or two short sentences. " +
  "Sound like a friend in a small group: plain, warm, specific to their words. Not a sermon, not a greeting card. " +
  "Do not invent anything: no personal stories, memories or experiences of your own, and no facts about them they did not state. " +
  "Do not use their name or any name. " +
  "Do not quote or cite a Bible verse unless their post already includes that verse. " +
  "No hashtags. At most one emoji, and only if their post uses one. " +
  "If they ask a question about the Bible or faith, answer briefly and plainly only when the answer is clear from Scripture; " +
  "otherwise say it is a good question and that he will come back to it. Never settle a disputed doctrine in a comment. " +
  "If they report a problem with the app, do not guess how the app works: thank them and say he will look into it. " +
  "Do not mention AI or that this is a draft. " +
  "Return only the comment text.";

const CAREFUL =
  " This post is a prayer request or shares something hard. " +
  "Do not congratulate, celebrate or cheer. Do not use an exclamation mark. " +
  "Do not give advice, explain why it happened, or promise how it will turn out. " +
  "Acknowledge the specific thing they shared in plain words, and say he is praying for them.";

export function autoCommentSystemPrompt(careful: boolean): string {
  return careful ? BASE + CAREFUL : BASE;
}

const clip = (text: string, max: number) => {
  const flat = text.replace(/\s+/g, " ").trim();
  return flat.length > max ? `${flat.slice(0, max).trim()}...` : flat;
};

export function autoCommentUserPrompt(input: {
  text: string;
  postType: string;
  verseRef: string | null;
  verseText: string | null;
}): string {
  const kind =
    input.postType === "prayer_request" ? "a prayer request"
    : input.postType === "prayer" ? "a prayer they wrote"
    : input.postType === "verse" ? "a Bible verse they shared, with their own words"
    : input.postType === "photo" ? "a photo with a caption"
    : input.postType === "video" ? "a video with a caption"
    : "a post";

  const parts = [`This is ${kind}.`];
  if (input.verseRef) {
    parts.push(`The verse they shared: ${input.verseRef}${input.verseText ? ` - "${clip(input.verseText, MAX_VERSE_CHARS)}"` : ""}`);
  }
  parts.push(`What they wrote:\n${clip(input.text, AUTO_COMMENT_MAX_POST_CHARS)}`);
  parts.push("Write the comment.");
  return parts.join("\n\n");
}

/**
 * Tidy what came back. A model sometimes wraps its answer in quotation
 * marks, and in careful mode an exclamation mark is exactly what was asked
 * not to happen - so it is removed here rather than trusted.
 */
export function tidyDraft(reply: string, careful: boolean, postText = ""): string {
  let text = reply.trim().replace(/^["“]+|["”]+$/g, "").trim();
  if (careful) text = text.replace(/!+/g, ".").replace(/\.{2,}/g, ".");
  // "At most one emoji, and only if their post uses one" was asked for and is
  // not always obeyed - a real draft answered "This is really cool" with a
  // smiley. So it is enforced: no emoji in the post, or a careful reply,
  // means none in the draft.
  if (careful || !EMOJI.test(postText)) {
    text = text.replace(EMOJI_ALL, "").replace(/\s{2,}/g, " ").replace(/\s+([.,!?])/g, "$1").trim();
  }
  return text;
}

const EMOJI = /\p{Extended_Pictographic}/u;
const EMOJI_ALL = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;
