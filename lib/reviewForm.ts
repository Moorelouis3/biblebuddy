/**
 * Opens our own review form (components/FeedbackModal.tsx, saved to
 * user_feedback) on the web, where there is no store to send anyone to.
 *
 * AppShell owns the form and listens for this event; anything that wants to
 * ask a web reader for a review dispatches it rather than mounting a second
 * copy. The automatic feedback popup stays off (AUTOMATIC_FEEDBACK_POPUPS_ENABLED
 * in AppShell): the form only opens when someone taps to leave a review.
 */
export const OPEN_REVIEW_FORM_EVENT = "bb:open-review-form";
