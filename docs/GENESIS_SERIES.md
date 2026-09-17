# Genesis chapter-by-chapter blog series

Superseded 2026-09-17. The Genesis series is now part of the automated
**Bible Chapter Library**: every chapter of the Bible, 5 a day, in order,
written by the "Bible Buddy - Chapter Blog Writer" routine.

- Job description: `docs/CHAPTER_BLOG_WRITER_AGENT.md`
- Queue, statuses, duplicate protection, quality gate: `scripts/chapter-blog-queue.mjs`
- Progress: `data/chapter-blog/progress.json`, shown at `/admin/chapter-blog-progress`

Genesis 1 to 4 were written by hand before the routine existed and are
recorded in the tracker as published. Genesis 5 is the first automated
chapter. Do not write chapter articles manually from this file any more;
the queue would not know about them.
