# Trivia question audit, 12 November 2026

Louis found a broken question while studying Genesis 15 ("What did God tell
Abram not to fear?" answered "Because God was his shield and great reward")
and asked for every trivia question to be checked. This is the record.

## Where the questions live

- `lib/triviaGameData.ts`: the chapter bank. 1,189 chapters, five questions
  each, 5,945 questions. Each is a `createQuestion(id, question, options,
  correct letter, reference, explanation)` call inside a `createChapter`.
  `components/TriviaGamePlayer.tsx` plays them, in stored order.
- `app/bible-trivia/abraham|moses|jesus|god/page.tsx`: four topic quizzes,
  100 questions each, stored inside the page file.

Not covered here: the 72 quiz questions inside
`components/DashboardJourneyExperience.tsx` (Bible in One Year days) and the
weekly group trivia in `lib/groupWeeklyTrivia.ts`.

## What was done

- Reviewed: **6,345** questions (5,945 chapter, 400 topic), each against the
  King James text of its chapter or cited verse.
- Changed: **1358** (1088 chapter, 270 topic), plus 6 more why-questions
  where the right answer was the only option beginning with "Because".
- Left for Louis: **116** notes, listed at the end.
- Question ids, the five-per-chapter structure, scoring and the player are
  unchanged.

## The reference stripper

About 200 of the broken questions were not written badly. The code that
removes "in Psalm 1" or "in verse 2" from a question before showing it treated
any run of words followed by a number as a Bible reference. "Who died in
Hebron at the age of 127?" was shown as "Who died?". It now strips only a real
book name or the word verse. `npm run verify:trivia` holds that in place.

## Kinds of problem found

A question can have more than one.

| Problem | Questions |
|---|---|
| Unclear on its own: a pronoun or "this" with nothing to point to, or too vague to have one answer | 308 |
| Clumsy or broken English | 305 |
| Says more than the chapter does (details from another book, or an inference stated as fact) | 211 |
| Shown damaged because the reference stripper ate part of the sentence | 203 |
| "Both A and B" or "All of the above" as an option | 164 |
| The answer is not the kind of thing the question asks for | 153 |
| Explanation wrong, off the point, or adding a claim the passage does not make | 127 |
| Marked answer or its wording does not match the King James text | 123 |
| More than one option was true | 85 |
| Reference wrong, outside the chapter, or in a format the app cannot look up | 85 |
| Same fact asked twice in one set | 80 |
| A wrong option that was nonsense or did not fit the question | 47 |

## Answer keys that were wrong

- `1-kings-10-4` (1 Kings 10:16): Solomon made 200 targets (verse 16); 300 is the number of shields (verse 17).
- `psalms-135-1` (Psalm 135:1): The psalm begins 'Praise ye the LORD'; the marked answer was 'Hear, O Israel'.
- `psalms-135-4` (Psalm 135:4): The Lord chose Jacob; the marked answer was Egypt.
- `psalms-146-1` (Psalm 146:1): The psalm opens 'Praise ye the LORD'; the marked answer was 'Hear, O Israel'.
- `jeremiah-26-3` (Jeremiah 26:18): The verse names Micah the Morasthite, but Isaiah was marked correct.
- `malachi-3-4` (Malachi 3:10): The answer key points to B (Build a second altar) but the verse supports option A.

Other wrong answers kept their letter but had the option text corrected, for
example 2 Corinthians 11 ("thirty stripes save one" where the text says
forty) and Psalm 84 (a day in thy courts, backwards).

## Before and after

**Genesis 15:1** (`genesis-15-1`): What-question with a because-answer.

- Before: What did God tell Abram not to fear? → *Because God was his shield and great reward*
- After: Why did God tell Abram not to fear? → *Because God said He was Abram's shield and exceeding great reward*

**Genesis 23:1-2** (`genesis-23-1`): After stripping, the question is only 'Who died?'.

- Before: Who died? → *Sarah*
- After: Who died in Hebron at the age of 127? → *Sarah*

**1 Kings 10:17** (`1-kings-10-4`): Solomon made 200 targets (verse 16); 300 is the number of shields (verse 17).

- Before: How many targets of beaten gold did Solomon make according to the chapter? → *300*
- After: How many targets of beaten gold did Solomon make according to the chapter? → *200*

**Psalm 142:3** (`psalms-142-3`): 'Thou' is not a clear answer to a who-question.

- Before: Who knew David's path when his spirit was overwhelmed? → *Thou*
- After: Who knew David's path when his spirit was overwhelmed? → *The Lord*
- Options now: Saul / The Lord / The priests / Jonathan

**2 Corinthians 8:5** (`2corinthians-8-2`): How-question with a to-whom answer.

- Before: How did the Macedonian believers first give themselves? → *To the Lord*
- After: To whom did the Macedonian believers first give themselves? → *To the Lord*

**John 5:9-10** (`john-5-3`): "This healing" has no referent on a standalone card.

- Before: On what day did this healing cause controversy? → *The Sabbath*
- After: On what day did Jesus heal the man at the pool? → *The Sabbath*

**Proverbs 18:21** (`proverbs-18-4`): Stripping the reference left only "What is?"; option now follows the KJV order.

- Before: What is? → *Life and death*
- After: What is in the power of the tongue? → *Death and life*

**Genesis 16:11** (`abraham16`): Broken English: 'What was Ishmael's name mean?'

- Before: What was Ishmael's name mean? → *God hears*
- After: What does the name Ishmael mean? → *God hears*

**Exodus 2:10** (`moses02`): Asks for a Hebrew name and answers 'Moses', the name Pharaoh's daughter gave.

- Before: What was Moses' Hebrew name? → *Moses*
- After: Why did Pharaoh's daughter name the child Moses? → *Because she drew him out of the water*

**Hebrews 1:1-2** (`god37`): The cited verse says God has spoken by His Son, not through the Bible.

- Before: How does God speak to people today? → *Through the Bible*
- After: By whom has God spoken to us in these last days? → *By His Son*

**Genesis 25:12** (`abraham50`): The verse does not say 'Israel and Arabs', and the explanation added a claim about a modern conflict.

- Before: What nations came from Abraham? → *Israel and Arabs*
- After: How many princes did God say Ishmael would father? → *Twelve*

## Left for Louis to decide

These were not guessed at. Where a note says a change was made, it is easy to
put back.

### Decisions that cover many questions

- **Answer position.** 85% of correct answers in the chapter bank are option
  B (5,076 of 5,945). Anyone who notices can score without reading. Spreading
  them evenly is mechanical, but it makes trivia harder for those players,
  so it was not done.
- **Modern names against King James spellings.** Questions say Bezalel,
  Zechariah, Elizabeth, Hagar, Melchizedek, Timothy, Oholah, "living
  creatures", "bowls", "lampstands", where the text on screen says Bezaleel,
  Zacharias, Elisabeth, Agar, Melchisedec, Timotheus, Aholah, "beasts",
  "vials", "candlesticks". Left as they are unless a question was being
  rewritten anyway.
- **The verse shown after answering** is fetched from bible-api.com, which
  returns a different translation from the King James text the reader shows,
  and only the first verse of a range.
- **Interpretive questions** ("why does Chronicles include this", "what does
  the chapter emphasise", the meaning of the star in Numbers 24, "messianic")
  were left alone.

### Individual notes

- `genesis-3-4`: The answer is right, but the explanation says the verse 'points forward to conflict and ultimate victory over the serpent'. That is an interpretation rather than what the verse states. Left unchanged; owner to decide whether to keep it.
- `genesis-15-5`: The explanation says the smoking furnace and burning lamp 'symbolized God's presence sealing the covenant'. The passage does not say what they symbolized. Left unchanged; owner to decide.
- `genesis-10-4`: Replaced. The old answer was 'the oldest son', but the KJV phrase 'the brother of Japheth the elder' can be read as either Shem or Japheth being the elder, so I did not keep a birth-order question.
- `genesis-32-3`: I changed 'An angelic man' to 'A man' because that is all the chapter says. Hosea 12:4 calls him an angel and Jacob says he saw God face to face; owner may prefer different wording.
- `genesis-40-1`: All five questions in this chapter said 'cupbearer' where the KJV says 'butler'. I changed them to 'butler' and added one line explaining the word. If the owner prefers the modern word throughout, revert 40-2, 40-3 and 40-5 and only keep the distractor fix in 40-1.
- `genesis-8-1`: The answer says 'A great wind'; the verse only says 'a wind'. Minor, left unchanged.
- `numbers-29-3`: This and numbers-29-4 and numbers-29-5 name the Feast of Tabernacles, but Numbers 29 only says 'a feast unto the LORD seven days'; the name comes from Leviticus 23. Correct, but not in the text the player sees. Owner to decide whether to keep the name.
- `numbers-29-2`: Same point: 'Day of Atonement' is not named in the chapter (only 'afflict your souls' and 'sin offering of atonement'). Left unchanged.
- `numbers-20-5`: Says Eleazar 'became high priest'; the chapter only says Aaron's garments were put on Eleazar. A fair inference, left unchanged.
- `numbers-24-3`: The marked answer 'A coming king from Israel' interprets the Star and Sceptre prophecy. Left unchanged; owner may want different wording.
- `numbers-35-2`: Five references in this slice use a comma list instead of the Book C:V or C:V-V form: numbers-35-2 (35:6,13), deuteronomy-2-2 (2:4-5,9,19), deuteronomy-18-3 (18:15,18), deuteronomy-27-1 (27:2-3,8), deuteronomy-30-3 (30:15,19). The facts are right. If the app cannot look up comma lists, safe single references are Numbers 35:6, Deuteronomy 2:4-5, Deuteronomy 18:18, Deuteronomy 27:8 and Deuteronomy 30:15.
- `deuteronomy-6-3`: The explanation uses the word 'Shema', which is not in the KJV text and is not explained. Decide whether to keep the term or say 'This well-known confession begins ...'.
- `deuteronomy-14-1`: The question adds 'like the nations' and the explanation says 'pagan mourning customs'. The verses only say not to cut themselves for the dead because they are the Lord's children and a holy people. Left unchanged; decide whether to trim the added background.
- `deuteronomy-21-2`: The question calls the heifer rite an 'atonement ceremony'. The KJV says 'the blood shall be forgiven them' and does not use the word atonement here. Left unchanged.
- `joshua-24-2`: The question says the history begins "beyond the flood". In the KJV "the flood" here is the river (Euphrates), but a beginner will read it as Noah's flood. Left unchanged; owner to decide whether to say "beyond the river" or keep the KJV word.
- `joshua-11-4`: Questions 1 and 4 of this chapter both have Hazor as the answer (head of the kingdoms; the city burned). They test different facts so both were left, but one gives the other away. Owner may want one replaced.
- `joshua-23-1`: Distractor C "At Jericho" is a place, not a description of Joshua. Left alone as merely easy; replace if the owner wants all four options parallel.
- `1-samuel-12-2`: The chapter never names Saul; it only says 'the king whom ye have chosen'. The answer is right from the previous chapter, but the owner may prefer a question the chapter itself answers.
- `1-samuel-23-5`: The explanation gives the meaning 'rock of divisions or separations', which is a marginal gloss and not in the KJV verse text shown. Keep it, or replace with what verse 28 says.
- `1-samuel-17-2`: The question says Saul promised the reward, but in verse 25 it is the men of Israel reporting what the king will do. Left unchanged; owner may want 'What reward did the men of Israel say the king would give?'
- `ruth-2-5`: Correct option reads 'One of our near kinsmen'; the KJV says 'one of our next kinsmen'. Left as a paraphrase because 'next' may confuse modern readers; owner to decide whether to match the KJV word.
- `2-samuel-1-5`: The old question used the traditional title 'the song of the bow'. The KJV reads 'the use of the bow', so I rewrote it to match the KJV; revert if you prefer the traditional name.
- `1-kings-10-5`: The old question taught that Solomon's Egyptian horses were a warning sign of compromise (a link to Deuteronomy 17 that this chapter does not make). I replaced it with a plain fact question; restore the interpretive version if you want that teaching point.
- `2-samuel-8-4`: Several references in this slice used comma lists (8:6,14; 21:6,9; 10:2,10; 8:5,63) or 'and following'. I converted them to single verses or ranges on the assumption the app needs Book C:V or C:V-V; ignore those changes if comma lists render correctly.
- `2-kings-16-1`: The explanation says Ahaz "practiced child sacrifice". The KJV says he "made his son to pass through the fire"; whether to state that as child sacrifice is an interpretive call for the owner. Left unchanged.
- `2-kings-5-4`: Option B reads "in all the earth" but the KJV text supplied for this slice prints "in all earth". Standard KJV has "all the earth", so the supplied text may have a typo. Left unchanged.
- `2-kings-1-2`: Several questions spell names without the KJV hyphen (Baalzebub, Rabshakeh, Nebuzaradan, Pharaoh-necho) where the supplied text has Baal-zebub, Rab-shakeh, Nebuzar-adan, Pharaoh-nechoh. Left as is unless I was already editing the question; owner may want a global spelling pass.
- `1-chronicles-8-5`: This is one of several 'why does Chronicles include this / what does the chapter emphasize' questions (also 1-chronicles-3-5, 7-5, 9-5, 24-5, 25-5, 26-5, 27-5). The answers are reasonable interpretation but the text never states a purpose. Left unchanged; owner should decide whether interpretive theme questions stay or get replaced with factual ones.
- `1-chronicles-17-5`: The answer Solomon is right by the wider book (1 Chronicles 22:9-10) but chapter 17 itself never names him, so a beginner cannot verify it from the text shown. Left unchanged; owner may want a question the chapter answers directly.
- `1-chronicles-9-5`: Question and explanation frame the chapter as life 'after the exile'. Verse 1 mentions the carrying away to Babylon but the chapter does not say the lists are post-exilic. Left unchanged as a common reading; owner to decide.
- `2-chronicles-28-5`: The option says 'Tiglath-pileser' but the KJV verse shown to the player spells it 'Tilgath-pilneser'. Left unchanged; decide whether to use the KJV spelling.
- `2-chronicles-35-3`: Options and 35-4 say 'Pharaoh-necho', but this chapter in the KJV only says 'Necho king of Egypt' (Pharaoh-necho is the 2 Kings form). Left unchanged; decide whether to shorten to 'Necho'.
- `2-chronicles-22-4`: Marked answer is Jehu, but the verse says 'they' caught Ahaziah, brought him to Jehu and slew him. Left unchanged; decide whether to reword as 'By whose judgment was Ahaziah killed?' or similar.
- `nehemiah-4-3`: Changed 'half its height' to the KJV wording 'joined together unto the half thereof'. Half height is the usual modern reading; restore it if you prefer the plainer meaning.
- `esther-9-3`: Reference is stored as "Esther 9:10,15-16" (comma list). Left as is; check the app can display a comma reference, otherwise use "Esther 9:10-16". Same pattern in job-33-1 ("Job 33:1,5") and psalms-8-1 ("Psalm 8:1,9").
- `job-24-5`: Reference is the whole chapter ("Job 24") with no verse, as is job-38-5 ("Job 38"). Both are summary questions and were left unchanged; decide whether to give them a verse range such as "Job 24:1-25" and "Job 38:8-41".
- `psalms-3-1`: The original asked about the psalm's title (fleeing from Absalom), which the KJV has but the chapter text shown to players does not. I replaced it with a question from verse 2; restore a title question only if the app shows psalm titles.
- `job-22-2`: The question says Eliphaz "falsely" accuses Job and the explanation says he "invents" sins. That is a fair reading of the whole book but chapter 22 itself does not say so; left unchanged.
- `job-39-3`: The correct option reads "Unicorn or wild ox" and the explanation says wild ox. The KJV word is unicorn; kept the gloss since modern readers misread it, but the owner may prefer KJV wording only.
- `esther-10-3`: Answer says "Second unto king Ahasuerus"; the KJV says "next unto king Ahasuerus". Same meaning, left unchanged, but it is phrased like a KJV quote.
- `psalms-12-5`: The question says the Lord will preserve 'the needy', but in the KJV 'thou shalt keep them... preserve them' follows straight after 'the words of the LORD', and readers disagree whether 'them' means the words or the poor. Left unchanged; the owner should decide whether to keep it or ask instead about verse 5 ('I will set him in safety').
- `psalms-21-5`: The question speaks of 'the king's enemies' and God finding them with His hand, but the verse says 'thine hand shall find out all thine enemies' and it is disputed whether that is spoken to God or to the king. Left unchanged.
- `psalms-46-5`: Five questions cite two or three separate verses with commas (psalms-46-5 '46:7,11', psalms-57-5 '57:5,11', psalms-67-3 '67:3,5', psalms-72-2 '72:2,4', psalms-80-3 '80:3,7,19'). The references are correct, but the format is not 'C:V' or 'C:V-V'; left as is in case the app cannot look them up.
- `psalms-23-1`: Rewritten so the answer is the KJV phrase 'I shall not want', with the explanation saying 'want' means lack. If the owner would rather not quote a phrase beginners misread, the question could ask about another verse instead.
- `psalms-90-1`: The reference is 'Psalm 90 title' and the title line is not in the verse text the app shows, so the player may see no supporting text. Decide whether to keep title questions or replace them. Same applies to psalms-102-1.
- `psalms-110-2`: The explanation says 'The Messiah's rule', which is the New Testament reading and not stated in the psalm itself. Left unchanged; decide whether explanations may add that.
- `psalms-124-2`: The correct option quotes 'Swallowed us up quick'. In the KJV 'quick' means alive, and modern readers will read it as fast. The explanation says alive, so it was left; decide whether to reword the option.
- `psalms-117-5`: The fact that this is the shortest chapter in the Bible is true but not stated in the text. Only the reference was fixed; decide whether outside-knowledge questions are wanted.
- `exodus-31-1`: The bank uses the modern spellings Bezalel and Oholiab, but the KJV text the player sees says Bezaleel and Aholiab. This affects exodus-31-1, 31-2, 35-5, 36-1, 37-1, 37-5, 38-4 and 39-4. I left the spellings alone; decide whether to switch them all to the KJV forms.
- `exodus-20-2`: exodus-20-1 and 20-2 number the commandments the Protestant way (graven images as the second). Catholic and Lutheran readers count them differently, and the text itself does not number them. Left unchanged.
- `exodus-10-3`: Calls darkness 'the ninth' plague. The count is correct by the usual reckoning but the chapter never numbers the plagues, so a beginner cannot find the answer in the verse shown. Left unchanged.
- `proverbs-1-1`: The displayed question still contains a reference ("According to Proverbs 1:2") that the app did not strip. Same in leviticus-21-1 ("of Leviticus 21"), proverbs-6-1 ("at the start of Proverbs 6") and proverbs-23-2 ("What does verse 5 say"). All four are otherwise correct; owner to decide whether references should be removed from question text everywhere.
- `proverbs-18-2`: The old answer was "Discovering his own heart" (KJV: "that his heart may discover itself", meaning reveal itself). I changed the question to ask what a fool has no delight in (Understanding). Revert if you prefer to keep the original point.
- `isaiah-8-2`: The meaning of Maher-shalal-hash-baz is not in the KJV text shown (only in margin notes). Decide whether to keep this outside-knowledge question or replace it with one from verse 4 about the riches of Damascus and spoil of Samaria.
- `isaiah-28-4`: I rewrote this away from 'How is God's word mocked?' because the KJV does not call the line mockery. If you hold the mockery reading, restore the old question, but put 'precept upon precept' first as the KJV does.
- `ecclesiastes-9-1`: The answer 'Death' for the 'one event' is the usual reading, but verse 2 itself does not name death (verse 3 says 'they go to the dead'). Left unchanged; consider citing Ecclesiastes 9:2-3.
- `songofsongs-2-1`: The question assigns 'I am the rose of Sharon' to the woman. The KJV text does not mark speakers and some readers assign it to the beloved. Left unchanged.
- `isaiah-34-2`: isaiah-34-1 and isaiah-34-2 ask different things (who is called to hear, who the indignation is upon) but both have the answer "All nations" at B. Left unchanged; owner may want one of them replaced.
- `isaiah-33-2`: The answer reads "Our arm every morning" but the KJV says "be thou their arm every morning". Modern versions read "our". Left unchanged; decide whether to match the KJV pronoun.
- `isaiah-62-4`: The explanation says Hephzibah means "My delight is in her". That is the usual marginal meaning but the KJV text only says "the LORD delighteth in thee". Left unchanged.
- `jeremiah-16-4`: The question calls the fishers and hunters the first wave of judgment. That is the common reading, but some read the fishers as gathering the exiles home (verse 15 comes just before). Left unchanged; owner to decide whether to keep the judgment framing.
- `jeremiah-31-2`: The option says Rachel, but the KJV verse shown to the player spells it Rahel. Left as Rachel because it is unmistakable; owner may prefer the KJV spelling or a note in the explanation. The rewrite of jeremiah-31-3 also uses Rachel and should follow whatever is decided.
- `jeremiah-36-4`: The question says King Jehoiakim cut and burned the scroll. Verse 23 says only 'he cut it' right after naming Jehudi as the reader, though verses 25 to 29 say the king burned the roll. Left unchanged; owner may want wording such as 'What was done to the scroll as it was read before the king?'
- `jeremiah-23-3`: The question calls the righteous Branch a messianic figure, which is an interpretive label the passage itself does not use. Left unchanged; owner to decide whether to keep the term (the same label was removed from jeremiah-33-4 only because of the unclear word 'again').
- `jeremiah-20-2`: The explanation says Magor-missabib means terror on every side. That meaning comes from the margin and is not stated in the verse shown; left as is since it is the standard gloss.
- `ezekiel-12-2`: The explanations for ezekiel-12-2 and ezekiel-12-3 name the prince as Zedekiah and mention his blinding. That is the standard reading from 2 Kings 25 but this chapter never names him. Left unchanged; decide whether explanations may bring in facts from other books.
- `ezekiel-17-2`: The stored reference is 'Ezekiel 17:3,12', which is not in the usual 'Book C:V' or 'Book C:V-V' form. Left unchanged because both verses are needed for the answer; decide whether the app handles a comma reference.
- `ezekiel-10-5`: The question text says 'the vision of chapter 1' and the app did not strip it. It reads fine as shown, so it is left unchanged; rewrite it only if chapter references in question text must go everywhere.
- `ezekiel-16-3`: The answer 'A covenant marriage' rests on the marriage imagery (spreading the skirt, 'thou becamest mine'); the verse itself says only that God entered into a covenant. Left unchanged as the common reading.
- `ezekiel-40-5`: Reference is the whole chapter ("Ezekiel 40") with no verse, and the question is a broad 'what dominates the rest of the chapter'. Left unchanged; owner should decide whether chapter-only references display correctly or whether to pin it to a verse range.
- `ezekiel-41-5`: Same pattern: chapter-only reference ("Ezekiel 41") and a broad overview question. Left unchanged; decide whether overview questions with no verse are wanted.
- `ezekiel-48-1`: Same pattern: chapter-only reference ("Ezekiel 48") on an overview question. Left unchanged.
- `hosea-2-4`: I changed the answer to 'Ishi, which means my husband'. The meaning comes from the KJV margin, not the verse text itself; confirm you are happy stating it in the option.
- `daniel-7-5`: Correct option says 'Four kings or kingdoms'. The cited verse says kings; a later verse says the fourth beast is a kingdom. Left unchanged; owner may prefer plain 'Four kings'.
- `haggai-1-3`: The reference is stored as "Haggai 1:5, 7", which is not in the Book C:V or C:V-V format and may not look up a verse. Decide whether to shorten it to "Haggai 1:5"; left unchanged.
- `hosea-11-2`: The question follows the modern reading ('the more they were called, the more they went from God'). The KJV shown says 'As they called them, so they went from them'. Left unchanged; decide whether to reword to the KJV sense.
- `amos-5-5`: The answer is 'Justice' and the question says 'roll down', but the KJV shown reads 'let judgment run down as waters'. A fair modern paraphrase, left unchanged; decide whether to use the KJV word 'Judgment'.
- `zephaniah-3-1`: The question names Jerusalem, but the chapter only says 'her that is filthy and polluted, the oppressing city'. The identification is the usual reading; left unchanged.
- `zechariah-5-5`: The explanation says Shinar links the vision 'with Babylonian rebellion', which the chapter does not state. Left unchanged; decide whether to trim it to what the verse says.
- `matthew-26-3`: The stored question said the bread 'represented' Jesus' body, which takes a side on a point churches disagree on. I reworded it neutrally to ask what Jesus called the bread; the owner should confirm that neutral wording is what he wants.
- `matthew-6-2`: Asks which prayer begins with 'Our Father' and answers 'The Lord's Prayer', a name that is not in the KJV text. Left unchanged as common knowledge; the owner may prefer a question the chapter itself answers.
- `luke-1-2`: luke-1-2, luke-1-3 and luke-1-5 use the modern names Zechariah and Elizabeth, while the KJV text shown reads Zacharias and Elisabeth (and luke-2-4 uses Zacharias as an option). Left unchanged; the owner should decide whether to keep modern names or match the KJV spelling.
- `luke-4-4`: The question says Jesus 'spoke of God's mercy to Gentiles'. The passage only gives the examples of the widow of Sarepta and Naaman the Syrian; the Gentile summary is an interpretation. Left unchanged; the owner may prefer wording that names the two examples.
- `luke-22-3`: The old wording said the cup 'represented' and 'symbolized' Jesus' blood, which takes a side on a doctrinal point. Rewritten to quote the verse only; the owner should confirm that neutral wording is what he wants.
- `john-8-4`: The explanation says Jesus "used the divine name 'I am'". The chapter does not say this itself; it is a common interpretation. Owner to decide whether to keep it or just quote the verse.
- `john-11-3`: The question says 'Jesus wept' is the shortest verse in the Bible. True of the English KJV but not stated by the passage; left unchanged. Owner may prefer simply "What is the shortest verse in this chapter?"
- `john-20-3`: The explanation says Jesus told Mary "not to cling to Him", which is the modern-translation reading. The KJV says "Touch me not". Left unchanged; owner to decide which wording to show.
- `romans-1-2`: This and about a dozen others in the slice (romans-1-4, 2-2, 2-5, 6-1, 11-5, 12-4, 12-5, 16-1, 1corinthians-1-1, 1-5, 7-5) still show a reference in the displayed question, such as 'According to Romans 1:4'. They read correctly, so I left them; decide whether you want references removed from those too.
- `2corinthians-2-1`: The question calls the man a 'repentant offender'. The chapter only says he was punished and might be swallowed up with overmuch sorrow; it does not use the word repent. Left unchanged; decide whether to drop 'repentant'.
- `1corinthians-9-3`: The question asks what Paul did 'for the gospel's sake' (the phrase from verse 23) but the answer and reference are verse 12 (suffer all things, lest we hinder the gospel). The marked answer is still the only correct option, so I left it; a reword would need the options re-tensed.
- `philippians-3-5`: The question and explanation say believers' "citizenship" is in heaven, but the KJV verse shown says "our conversation is in heaven". Left unchanged; decide whether to keep the modern word, use "conversation", or explain the old word in the explanation.
- `galatians-4-4`: Uses modern name spellings where the KJV text shown differs: Hagar (KJV Agar) here, and Melchizedek (KJV Melchisedec) in hebrews-5-2, Timothy (KJV Timotheus) in philippians-2-5 and 1thessalonians-3-1 to 3-3. Left unchanged as unmistakable; decide whether you want KJV spellings shown.
- `2corinthians-8-4`: Seven questions keep a reference inside the visible question because the stripper does not catch a leading "According to ..." or a chapter-only mention: 2corinthians-8-4, galatians-2-4, galatians-4-5, ephesians-1-1, ephesians-3-5, titus-3-4, hebrews-1-3. They read correctly, so I left them; decide whether to strip them for consistency.
- `philippians-4-3`: Asks what to do "instead of being anxious"; the KJV verse shown says "Be careful for nothing", where careful means anxious. Left unchanged; decide whether the explanation should say so.
- `revelation-4-4`: Revelation questions use modern terms where the KJV text shown differs: 'living creatures' for 'beasts' (4-4, 5-5), 'bowls' for 'vials' (15-5, 16-1, 16-2, 16-4), 'golden bowls of incense' for 'golden vials full of odours' (5-5). Left unchanged; decide whether to keep the modern words or switch to the KJV ones. In chapter 5 I did switch 'scroll' to 'book' because those questions had to be rewritten anyway.
- `revelation-2-3`: Options in Revelation 2 and 3 spell the church 'Pergamum' while the KJV shown says 'Pergamos'. Left as is because it is unmistakable; change to Pergamos in revelation-2-1 to 2-4 and 3-1 if you want exact KJV spelling.
- `james-5-5`: Uses the modern names Elijah (KJV shown: Elias), and elsewhere Melchizedek (Melchisedec), Judah (Juda), Zion (Sion). Left unchanged as unmistakable; say if you want KJV spellings in the options.
- `2peter-1-4`: The answer 'The transfiguration' is the standard reading of the voice on the holy mount, but the word is not in the passage. Left unchanged.
- `abraham50`: The original said Abraham's descendants were 'Israel and Arabs' and that 'the conflict continues today'. I replaced it with a question on Ishmael's twelve princes; the owner should confirm that claim is not wanted anywhere in the app (abraham85 had the same wording and was also replaced).
- `abraham16`: abraham16 and abraham67 ask what Ishmael and Isaac mean ('God hears', 'He laughs'). The KJV text shown only implies these meanings; kept as standard name meanings, but they rest on Hebrew, not the printed verse.
- `moses77`: The original asked whether the Sinai covenant was 'conditional' or 'unconditional', a doctrinal label. Replaced with what the verse says ('a peculiar treasure'); restore only if the owner wants doctrinal questions.
- `moses83`: KJV Exodus 34:33 reads 'till Moses had done speaking with them, he put a vail on his face', which modern translations read as 'when he had finished'. The rewrite says 'after speaking with the people'; owner may prefer different wording. The kept explanation also says the glory was fading, which comes from 2 Corinthians 3, not Exodus.
- `moses03`: Several kept explanations use facts from outside the cited verse (Moses aged 40 from Acts 7, the rock as Christ, Samuel as a Nazarite in moses92). They are traditional but not in the passage shown; left unchanged.
- `god21`: Asks how many persons are in the Trinity. The cited verse names the Father, the Son and the Holy Ghost but the word Trinity and the count are doctrine, not text. Left unchanged for the owner to keep, reword or drop.
- `god23`: 'Which person of the Trinity became flesh?' rests on Trinitarian wording; the verse says 'the Word was made flesh'. Left unchanged. A text-only version would be 'Who was made flesh and dwelt among us?' with 'The Word' as the answer; option D 'None' should go either way.
- `god39`: Only Helper was corrected to the KJV word Comforter. The question still says 'person of the Trinity' and has a 'None' option; owner to decide whether to keep the Trinity framing.
- `god43`: Divine simplicity ('His being is not composed of parts') is a philosophical doctrine that Deuteronomy 6:4 does not state. Left unchanged; I would replace it, but the owner should decide. god95 already covers this verse.
- `god45`: 'He permits evil but is not its author' is a theological position drawn from Job 1:12, not what the verse says. Left unchanged for the owner.
- `god33`: Original said God reveals Himself 'primarily through the Bible', which is a position, not the verse. I replaced it with a plain question on 2 Timothy 3:16; revert if the owner wants the doctrinal point kept.
- `god37`: Original answer 'Through the Bible' to 'How does God speak today?' contradicts the cited verse (by His Son) and takes a side on whether God still speaks other ways. Replaced with a text question; owner may want to confirm.
- `god42`: Original taught that God exists outside time and created time. 2 Peter 3:8 does not say that, so the rewrite asks only what the verse says.
- `god44`: Original said God knows the future because He determines it (a position on foreknowledge and election). The rewrite asks only what Isaiah 46:10 says.
- `god49`: Original said God 'uses suffering for good purposes'. Romans 8:28 does not mention suffering, so the rewrite asks for whom all things work together for good.
- `god01`: Hebrew-name questions cannot be checked against the KJV text the player sees, because the KJV prints God, Lord GOD, Almighty God and so on. The answers are correct Hebrew and were left alone: god01 Elohim, god08 Adonai, god10 El Shaddai, god12 El Elyon, god18 Jehovah Rapha, god29 El Roi, god31 El Olam, god46 Jehovah Rohi. Owner to decide whether these belong in a KJV quiz.
- `god05`: Definition questions give a textbook meaning that the cited verse does not state in words. Each has one clearly best option and no disputed doctrine, so they were left alone: god05, god13, god17, god19, god24, god25, god26, god30, god32, god35, god36, god38, plus the vocabulary ones god02, god03, god06, god07. Owner to decide whether to keep theology-vocabulary questions or tie them to the verse.
- `jesus03`: 'Who was Jesus' earthly father?' with answer Joseph. The cited verse calls Joseph 'the husband of Mary, of whom was born Jesus'. Left unchanged; owner may prefer 'Who was the husband of Mary, the mother of Jesus?'.
