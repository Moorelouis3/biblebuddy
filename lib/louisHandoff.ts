/**
 * A question typed somewhere else (the Ask Lil Louis widget on Home) carried
 * into the real chat at /chat, so nobody types it twice.
 *
 * The widget leaves the question here and navigates; ChatLouis picks it up
 * once its thread has loaded, puts it in the box and sends it through its own
 * handleSend. So consent, sign-in and every limit are the chat's own: if the
 * reader has not agreed to AI chat yet, the question waits in the box.
 *
 * sessionStorage, not the URL: a question is personal and never belongs in a
 * link that can be logged or shared.
 */
const KEY = "bb:louis-pending-question";

export function leaveQuestionForLouis(question: string) {
  try {
    window.sessionStorage.setItem(KEY, question.slice(0, 2000));
  } catch {
    /* private window: the chat simply opens empty */
  }
}

/** Reads and clears it, so a reload never sends it twice. */
export function takeQuestionForLouis(): string | null {
  try {
    const value = window.sessionStorage.getItem(KEY);
    if (value) window.sessionStorage.removeItem(KEY);
    return value && value.trim() ? value.trim() : null;
  } catch {
    return null;
  }
}
