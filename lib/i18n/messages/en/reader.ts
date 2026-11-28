/** English interface text: reader. See ../en.ts for the rules. */
export const readerEn = {
  // Chapter menu at the top of the reader
  "reader.menu.books": "Books",
  "reader.menu.back": "Back",
  "reader.menu.allBooks": "All books",

  // Reader tabs
  "reader.tab.scripture": "Scripture",
  "reader.tab.trivia": "Trivia",
  "reader.tab.scrambled": "Scrambled",
  "reader.trivia.loading": "Loading trivia...",
  "reader.scrambled.loading": "Loading scrambled...",

  // Study Mode switch
  "reader.studyMode.title": "Study Mode",
  "reader.studyMode.on": "Every Insight Card is listed under its verse.",
  "reader.studyMode.offPlayer": "Tap highlighted words to explore deeper",
  "reader.studyMode.offInline": "Tap any underlined phrase below to open its Insight Card.",

  // Mark complete
  "reader.complete.done": "Chapter Completed",
  "reader.complete.saving": "Saving...",
  "reader.complete.mark": "Mark Chapter Completed",

  // Discussion under the chapter
  "reader.discussion.label": "Chapter Discussion",
  "reader.discussion.question":
    "After reading {book} {chapter}, what is the one thing that stood out to you most, or that you learned about God in this chapter?",
  "reader.discussion.heading": "{book} {chapter} Discussion",
  "reader.discussion.placeholder": "Start Typing Here",
  "reader.discussion.post": "Post Comment",

  // The audio player
  "reader.audio.listen": "Listen",
  "reader.audio.play": "Play",
  "reader.audio.pause": "Pause",
  "reader.audio.resume": "Resume",
  "reader.audio.loading": "Loading",
  "reader.audio.stop": "Stop",
  "reader.audio.stopLabel": "Stop audio",
  "reader.audio.playLabel": "Play {label}",
  "reader.audio.pauseLabel": "Pause {label}",
  "reader.audio.back15": "Go back 15 seconds",
  "reader.audio.back15Short": "Back 15 seconds",
  "reader.audio.forward15": "Go forward 15 seconds",
  "reader.audio.forward15Short": "Forward 15 seconds",
  "reader.audio.back10": "Go back 10 seconds",
  "reader.audio.forward10": "Go forward 10 seconds",
  "reader.audio.previousChapter": "Previous chapter",
  "reader.audio.nextChapter": "Next chapter",
  "reader.audio.unavailable": "Audio unavailable",
  "reader.audio.unavailableRetry": "Audio unavailable. Try again.",
  "reader.audio.savedAt": "Saved at {time}",
  "reader.audio.aiDisclosure": "AI-generated narration with optional background music.",

  // Insight Cards (the frame; the note itself is content)
  "reader.insight.close": "Close this Insight Card",
  "reader.insight.open": "Open the {title} Insight Card",
  "reader.insight.loading": "Loading the full note…",
  "reader.insight.failed":
    "The rest of this note did not load. Check your connection, then close this card and open it again.",

  // Highlights
  "reader.highlight.verse": "Highlight verse {verse}",
  "reader.highlight.actions": "Highlight actions",
  "reader.highlight.color": "Color",
  "reader.highlight.remove": "Remove",
  "reader.highlight.viewNote": "Click to view this note",
  "reader.highlight.rangeHint": "Click to add a note, change color, or remove this highlight",
  "reader.highlight.loadFailed":
    "Couldn't load your highlights for this chapter. They're still saved — reopen the chapter to try again.",
  "reader.highlight.removeFailed": "That highlight could not be removed. Check your connection and try again.",
  "reader.highlight.saveFailed": "That highlight did not save. Check your connection and try again.",
  "reader.color.yellow": "yellow",
  "reader.color.green": "green",
  "reader.color.blue": "blue",
  "reader.color.purple": "purple",
  "reader.color.orange": "orange",

  // A note on a highlight
  "reader.note.add": "Add Note",
  "reader.note.edit": "Edit Note",
  "reader.note.delete": "Delete Note",
  "reader.note.deleting": "Deleting...",
  "reader.note.save": "Save Note",
  "reader.note.saving": "Saving...",
  "reader.note.cancel": "Cancel",
  "reader.note.close": "Close",
  "reader.note.closeLabel": "Close note",
  "reader.note.options": "Note options",
  "reader.note.label": "Highlight Note",
  "reader.note.title": "Add a note to this highlight",
  "reader.note.mine": "My Note",
  "reader.note.viewerLabel": "Note",
  "reader.note.placeholder": "Write what this highlighted phrase means to you...",

  // The menu a verse number opens
  "reader.memory.add": "Add to Bible Memory",
  "reader.memory.saved": "In Bible Memory",
  "reader.memory.failed": "Did not save. Tap to retry",
  "reader.share.verse": "Share verse",
  "reader.share.preparing": "Preparing…",

  // One book: pick a chapter
  "reader.book.descriptionFallback": "Walk through this book chapter by chapter.",
} as const;
