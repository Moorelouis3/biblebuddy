# BibleBuddy Mission Framework

BibleBuddy is a daily Bible habit app.

The core experience is not a collection of disconnected tools, devotionals, or weekly studies. The core experience is:

**Bible Study -> Chapter -> Six Tasks -> Study Dashboard habit loop**

Users come back daily, follow the Bible's story in order, and build attention through a repeatable chapter rhythm:

1. Chapter Intro
2. Read the Bible chapter
3. Chapter Notes
4. Trivia
5. Scrambled
6. Reflection

## Product Spine

The main app areas are:

- The Bible
- Bible Studies
- Community
- Bible TV
- Bible Games
- Shop / shipments

## Bible Studies

Bible Studies are cinematic, ordered story arcs through Scripture. Each study covers a range of chapters and each chapter loads the six-task dashboard experience.

Examples:

- The Creation of the World: Genesis 1-2
- The Fall of Man: Genesis 3-4
- The Flood of Noah: Genesis 5-10
- The Obedience of Abraham: Genesis 11-25
- The Promise Through Isaac: Genesis 26-27
- The Wrestling of Jacob: Genesis 28-36
- The Testing of Joseph: Genesis 37-50
- The Deliverance of Moses: Exodus 1-18
- The Covenant at Sinai: Exodus 19-24

When adding a Bible Study, build the actual Bible Study detail experience: cover, range, intro, chapter list, and dashboard chapter handoff. A chapter click should set that chapter on the Study Dashboard and load the six task cards.

Legacy table names may still say `devotionals` or `devotional_days`, but user-facing language and product behavior should be Bible Study language.
