export type JobTwentySevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJobTwentySevenRawNotes(rawText: string): JobTwentySevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JobTwentySevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Job\s+27:(\d+)(?:[-–—](\d+))?\s*$/i);

    if (!verseMatch) {
      index += 1;
      continue;
    }

    const startVerse = Number(verseMatch[1]);
    const endVerse = Number(verseMatch[2] || verseMatch[1]);
    index += 1;

    while (index < lines.length && !lines[index].trim()) index += 1;
    const titleMatch = lines[index]?.trim().match(/^#\s*(.+)$/);
    if (!titleMatch) {
      throw new Error("Missing Job 27 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Job\s+27:/i.test(lines[index].trim())) {
      const trimmed = lines[index].trim();
      const phraseMatch = trimmed.match(/^##\s+(.+)$/);

      if (!phraseMatch) {
        index += 1;
        continue;
      }

      const phraseHeading = phraseMatch[1].trim();
      index += 1;
      const bodyLines: string[] = [];

      while (
        index < lines.length &&
        !/^##\s+/.test(lines[index].trim()) &&
        !/^#\s+Job\s+27:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Job 27 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 27,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Job 27:${startVerse}` : `Job 27:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Job 27 sections, received " + sections.length);
  }

  return sections;
}

const JOB_TWENTY_SEVEN_RAW_NOTES = `# Job 27:1-4
# 🗣️ Job Swears By God's Own Life
---
## 🗣️ Job Continued His Parable

"Parable" here does not mean a short story with a moral lesson.

In this context it means a weighty, poetic speech, almost like a formal legal statement.

Job has already given long speeches before, but this one carries the weight of a final declaration.

He is not casually talking anymore.

He is putting his integrity on permanent record.

🗣️ Parable means a weighty poetic speech

📜 Not a short story with a moral

⚖️ This speech carries legal weight

📖 Job is putting his integrity on record

## ⚖️ As God Liveth, Who Hath Taken Away My Judgment

"As God liveth" was a common ancient oath formula, similar to swearing "I promise, so help me God."

Job opens with the most serious oath available to him.

"My judgment" means his right to a fair verdict, not simply his opinion.

Job insists God has denied him the fair hearing he deserves.

He is not cursing God here, he is stating a formal complaint under oath.

⚖️ As God liveth is a serious oath

📜 Judgment means his right to a fair verdict

🚫 Job says that fairness was denied him

📖 This is a formal complaint, not a curse

## 😣 The Almighty, Who Hath Vexed My Soul

"Vexed" means deeply troubled or embittered, not just mildly annoyed.

Job says God himself is the source of his soul's bitterness.

This is startling honesty, spoken directly to God rather than about him.

Job never stops believing God is real and powerful, even while making this accusation.

😣 Vexed means deeply embittered

🗣️ Job speaks directly to God

💪 He never denies God's power

📖 Honesty with God does not require silence

## 👃 The Spirit Of God Is In My Nostrils

This phrase echoes Genesis two, where God breathed the breath of life into Adam's nostrils.

Job is reminding himself that every breath he still takes comes from God.

As long as he is alive, he insists he will keep telling the truth.

His very breathing becomes proof that God has not yet finished with him.

👃 This echoes the breath of life in Genesis

💨 Every breath still comes from God

🗣️ Job vows to keep speaking truth

📖 His life itself is not yet over

## 🤐 My Lips Shall Not Speak Wickedness, Nor My Tongue Utter Deceit

Job's friends have been accusing him of hidden sin this whole book.

Here Job makes a direct vow about his own words instead of just his actions.

He is promising that whatever else is true about him, he will not lie now.

Given the accusations against him, that is exactly the promise that matters most.

🤐 Job vows honesty in his own words

👥 His friends accused him of hidden sin

🎯 This promise answers that accusation directly

📖 Honesty matters most under pressure

# Job 27:5-7
# 🛡️ I Will Not Remove Mine Integrity
---
## 🙅 God Forbid That I Should Justify You

"Justify" here means agreeing that someone was right.

Job refuses to agree with his friends that his suffering proves he sinned.

Saying yes to them would mean admitting a guilt Job knows is not true.

He would rather stand alone than lie about himself just to end the argument.

🙅 Justify means agreeing someone was right

🚫 Job will not agree he deserved this

🧍 He would rather stand alone than lie

📖 Truth mattered more than ending the fight

## 🛡️ Till I Die I Will Not Remove Mine Integrity From Me

"Integrity" means wholeness, being the same honest person all the way through.

Job pictures it almost like a piece of clothing he refuses to take off.

His friends want him to confess sins he did not commit.

Job says that confession would cost him something he values more than comfort.

🛡️ Integrity means being honest all the way through

👕 Job pictures it like clothing he keeps on

🚫 He refuses a false confession

📖 Honesty mattered more than comfort

## ✊ My Righteousness I Hold Fast, And Will Not Let It Go

Job repeats the same idea from the line before in different words.

This is a common feature of Hebrew poetry called parallelism, saying one true thing twice.

The repetition itself is a kind of stubborn grip, matching the point being made.

Job is not giving in, and the shape of his words shows it.

✊ Job repeats his point in new words

📜 Hebrew poetry often repeats for emphasis

🤝 The repetition mirrors his stubborn grip

📖 His words match his resolve

## ❤️ My Heart Shall Not Reproach Me So Long As I Live

"Reproach" means blame or guilt that gnaws at a person from the inside.

Job says his own conscience is clear, even though everyone around him assumes otherwise.

A clear conscience does not remove his suffering.

It does give him something steady to stand on while the suffering continues.

❤️ Reproach means inner guilt or blame

🧠 Job's own conscience is clear

😣 Suffering has not gone away

📖 A clear conscience is still steady ground

## ⚔️ Let Mine Enemy Be As The Wicked

Job is not naming a foreign army or a stranger here.

In this context, "mine enemy" points at the friends who have turned against him.

Job wishes on them the very fate they claim only wicked people deserve.

It is a sharp, ironic twist aimed straight at the men accusing him.

⚔️ Enemy here means his own friends

🔄 Job wishes their own logic back on them

😤 It is a sharp, ironic twist

📖 Their accusation now aims back at them

## 😡 He That Riseth Up Against Me As The Unrighteous

This repeats the same wish from the line before, aimed at anyone who opposes Job.

"The unrighteous" is the same label his friends have used against him.

Job turns their own accusation into a curse for anyone treating him unfairly.

He is not asking for revenge on strangers, he is answering the men in the room.

😡 This repeats Job's wish again

🔁 Unrighteous matches the label used on him

🎯 Job turns their accusation around

📖 This targets the men in the room

# Job 27:8-12
# ❓ The Hypocrite Has No Hope
---
## ❓ What Is The Hope Of The Hypocrite

"Hypocrite" in this book usually means someone godless, not simply a pretender in the modern sense.

Job asks what any of that person's success is actually worth in the end.

The word points at someone who lives without real reverence for God, whatever mask they wear.

Job is building toward a hard truth about how that life actually ends.

❓ Hypocrite here means godless, not a pretender

🎭 It describes life without real reverence for God

🧮 Job asks what that life is worth

📖 A hard truth is coming next

## 💰 Though He Hath Gained

This means the godless person actually succeeded and grew wealthy.

Job is not describing someone who tried evil and failed.

He is describing someone whose schemes worked, at least for a while.

That success is exactly what makes the next line so unsettling.

💰 Gained means real, visible success

🚫 This is not a story about failure

⏳ The success lasted for a while

➡️ That makes what follows unsettling

## 💀 When God Taketh Away His Soul

No amount of wealth can buy back a life once God calls it back.

Every gain the hypocrite built collapses at that same moment.

Job's friends have been arguing the wicked always suffer visibly during life.

Job says instead that death itself is where the real reckoning happens.

💀 Wealth cannot buy back a life

📉 Every gain collapses at that moment

👥 His friends expected visible suffering sooner

📖 Death is where the reckoning lands

## 😢 Will God Hear His Cry When Trouble Cometh Upon Him

This is a rhetorical question, and the expected answer is no.

The hypocrite never called on God during the good years.

Crying out only once trouble finally arrives is not the same as a real relationship with God.

Job's own honesty with God throughout this book stands in sharp contrast.

😢 This question expects the answer no

🙉 The hypocrite ignored God in good years

⏰ Crying out too late is not real faith

📖 Job's own honesty stands in contrast

## 🙌 Will He Delight Himself In The Almighty

"Delight" describes real joy and closeness, not simply going through religious motions.

Job asks whether the hypocrite ever actually enjoyed knowing God, or only used God's name when convenient.

The next question, will he always call upon God, repeats the same challenge from another angle.

A person who only prays in emergencies never really knew God at all.

🙌 Delight means real joy, not routine

🎭 It asks if his faith was ever genuine

🔁 The next question repeats the challenge

📖 Emergency prayers are not real knowledge

## 📚 I Will Teach You By The Hand Of God

Job now switches from arguing with his friends to teaching them directly.

"By the hand of God" is an old way of saying through what God himself has done and shown.

Job claims real authority here, not just his own opinion.

He is about to describe truths he believes his friends already secretly know.

📚 Job now switches to teaching them

✋ Hand of God means through his actions

🎓 Job claims real authority here

➡️ He is about to name a shared truth

## 🤐 That Which Is With The Almighty Will I Not Conceal

"Conceal" means to hide something on purpose.

Job promises he will not soften or hide what he actually believes about God.

This sets up the description of the wicked person's fate that fills the rest of the chapter.

Job is not inventing a new argument, he is finally saying what he had held back.

🤐 Conceal means hiding something on purpose

🗣️ Job will not soften what he believes

➡️ This sets up the rest of the chapter

📖 He finally says what he held back

## 👀 Behold, All Ye Yourselves Have Seen It

"Behold" is an old word meaning look closely, or pay attention.

Job says his friends already know the truth he is about to describe.

They have watched wicked people rise and fall in their own lives too.

His accusation is that they are ignoring what they already know to be true.

👀 Behold means pay close attention

🧠 Job says they already know this truth

👥 They have seen it happen themselves

📖 They are ignoring what they know

## 💨 Why Then Are Ye Thus Altogether Vain

"Vain" means empty or worthless, not simply prideful.

Job accuses his friends of talking without real substance behind their words.

Their arguments sound wise, but Job says they do not actually hold up.

This closes his teaching introduction before he lays out the wicked man's fate in detail.

💨 Vain means empty or worthless

🗣️ Job says their words lack substance

⚖️ Their wise sounding arguments do not hold up

➡️ Job now turns to the wicked man's fate

# Job 27:13-18
# 💰 The Portion Of The Wicked Man
---
## 📜 This Is The Portion Of A Wicked Man With God

"Portion" means a person's assigned share or fate, like an inheritance.

Job now describes exactly what happens to the wicked, matching the very argument his friends have been making.

The irony is sharp, Job agrees the wicked do face real judgment.

He simply refuses to accept that this describes his own life.

📜 Portion means an assigned fate or share

🔄 Job agrees the wicked do face judgment

🎯 He just denies it describes him

📖 Agreement here still proves his innocence

## 🏚️ The Heritage Of Oppressors Which They Shall Receive

"Heritage" normally means a good inheritance passed down in a family.

Job flips the word here, the wicked person's true inheritance is judgment, not wealth.

Whatever they built up will not outlast them the way they hoped.

The very oppression they used against others becomes the label attached to their legacy.

🏚️ Heritage usually means a family inheritance

🔄 Job flips it into a judgment instead

📉 Their wealth will not outlast them

📖 Oppression becomes their lasting label

## ⚔️ If His Children Be Multiplied, It Is For The Sword

Having many children was normally seen as a sign of God's blessing in this culture.

Job says the wicked man's many children face violent death instead of a legacy.

A large family here becomes a larger tragedy, not a larger blessing.

The very thing meant to prove favor becomes proof of judgment instead.

⚔️ Many children were normally a blessing sign

💔 Here they face violent death instead

📉 A large family becomes a larger loss

📖 Blessing turns into judgment

## 🍞 His Offspring Shall Not Be Satisfied With Bread

This pictures poverty striking a family that once had wealth.

Even the children who survive the sword still end up hungry.

Everything the wicked man built collapses onto the very people who should have inherited it.

Job pictures total, generational failure, not just one man's downfall.

🍞 This pictures sudden poverty

😢 Even the survivors go hungry

📉 The wealth never reaches the next generation

📖 The failure spreads across the whole family

## ⚰️ Those That Remain Of Him Shall Be Buried In Death

This likely pictures survivors dying from plague or disease rather than natural old age.

It is an image of death sweeping through what is left of the family.

"Buried in death" is a strong, almost repeated phrase meant to stress how total the loss is.

Nothing about this ending looks peaceful or honored.

⚰️ This likely pictures death by plague

🌊 Death sweeps through the survivors

📢 The phrase stresses how total the loss is

📖 Nothing about it looks honored

## 😭 His Widows Shall Not Weep

Public mourning was an expected honor for the dead in this culture.

A wife who was not properly mourned suffered a real social disgrace.

Job pictures a family so hated, or so quickly wiped out, that no one bothers to grieve them.

Losing the honor of a proper mourning was its own kind of judgment.

😭 Mourning was an expected public honor

🚫 No proper mourning happens here

👥 The family is hated or wiped out fast

📖 Losing an honored death was its own judgment

## 🏔️ Though He Heap Up Silver As The Dust

This pictures wealth piled as high and as common as ordinary dirt.

The comparison stresses just how much silver the wicked man managed to gather.

Job is not denying that wicked people can become genuinely rich.

He is about to show why that wealth will not actually belong to them in the end.

🏔️ Dust pictures wealth piled extremely high

💰 The comparison stresses real riches

✅ Job admits the wicked can grow wealthy

➡️ He will show why it will not last

## 👕 And Prepare Raiment As The Clay

"Raiment" means clothing.

Clay was cheap and everywhere in the ancient world, easy to find in any riverbed.

Comparing fine clothing to something as common as clay pictures enormous, careless abundance.

The wicked man has more than he could ever wear himself.

👕 Raiment means clothing

🪨 Clay was cheap and everywhere

📈 The image pictures careless abundance

📖 He has more than he could ever use

## ⚖️ He May Prepare It, But The Just Shall Put It On

This is the twist Job has been building toward.

The wicked man does the work of gathering wealth, but never actually gets to keep it.

"The just" means people who actually live rightly, unlike the man who earned it.

God redirects the reward to hands it was never meant to reach.

⚖️ This verse is the twist in the passage

🧍 The wicked man never keeps his own wealth

✅ The just means people who live rightly

📖 God redirects the reward elsewhere

## 🪙 And The Innocent Shall Divide The Silver

"Divide" pictures the wealth being split up and shared out, like an inheritance among several people.

The very silver the wicked man hoarded ends up scattered among people he never intended to benefit.

This is one of Job's sharpest points, wickedness can build wealth, but it cannot guarantee who finally keeps it.

In the end, the wicked man worked for someone else's benefit without ever knowing it.

🪙 Divide pictures wealth being shared out

🔄 It goes to people he never intended

🎯 This is one of Job's sharpest points

📖 He worked, unknowingly, for someone else

## 🦋 He Buildeth His House As A Moth

A moth's cocoon looks intricate, but it is fragile and short lived.

Job compares the wicked man's household to that same fragile structure.

It might look impressive from the outside for a season.

Underneath, it was never built to last.

🦋 A moth's cocoon looks intricate

🕰️ It is fragile and short lived

🏠 Job compares the household to it

📖 It was never built to last

## 🛖 And As A Booth That The Keeper Maketh

A "booth" here means a small, temporary shelter, the kind a field watchman threw together for one harvest season.

It was never meant to survive the winter, let alone stand for generations.

Job uses two very different pictures, a fragile cocoon and a flimsy shack, to make the same point twice.

Whatever the wicked man builds, it was never designed to last.

🛖 Booth means a temporary field shelter

🌾 It only lasted one harvest season

🔁 Two images make the same point

📖 Nothing the wicked builds is designed to last

# Job 27:19-23
# ⚡ The Storm That Takes Him Away
---
## 🛏️ The Rich Man Shall Lie Down, But He Shall Not Be Gathered

"Gathered" was a common Hebrew idiom for dying peacefully and joining one's ancestors in an honored burial.

Job pictures the wicked rich man dying without that honor at all.

He lies down expecting rest, but the ending is not the peaceful one he assumed.

Wealth secured his comfort in life, but it could not secure a peaceful death.

🛏️ Gathered was an idiom for an honored death

🚫 The wicked man is denied that honor

😴 He expects rest but does not get it

📖 Wealth could not buy a peaceful ending

## 👁️ He Openeth His Eyes, And He Is Not

This pictures death arriving with almost no warning at all.

One moment the man is alive and looking around him.

The next moment, he is simply gone.

Job uses the suddenness itself to stress how little control wealth actually gave him.

👁️ This pictures a sudden, unexpected death

⏱️ One moment alive, the next gone

💰 Wealth gave him no real control

📖 Sudden loss shows wealth's real limits

## 🌊 Terrors Take Hold On Him As Waters

Floodwaters were one of the most feared, uncontrollable forces in the ancient world.

Job pictures terror overwhelming the wicked man the same way a flood overtakes everything in its path.

There is no fighting a flood once it arrives.

The wicked man's fear finally catches up to him with that same unstoppable force.

🌊 Floodwaters were an uncontrollable ancient fear

😱 Terror overtakes him the same way

🚫 There is no fighting a flood

📖 His fear finally becomes unstoppable

## 🌙 A Tempest Stealeth Him Away In The Night

A "tempest" is a violent storm.

Night storms in the ancient world were especially terrifying because they struck without warning.

"Stealeth" pictures the storm taking him the way a thief takes something, suddenly and without permission.

Even in what should be a place of rest, the wicked man finds no safety.

🌙 Tempest means a violent storm

🌑 Night storms struck without warning

🥷 Stealeth pictures a thief taking him

📖 Even rest offers him no safety

## 💨 The East Wind Carrieth Him Away

In scripture, the east wind usually pictures something hot, dry, and destructive rather than a gentle breeze.

It regularly appears as a picture of God's judgment elsewhere in the Bible.

Job pictures this same destructive wind sweeping the wicked man completely away.

Nothing about this departure is gentle or accidental.

💨 The east wind pictures something destructive

⚖️ It often symbolizes God's judgment elsewhere

🌪️ It sweeps the wicked man completely away

📖 This departure is neither gentle nor accidental

## 🏚️ And As A Storm Hurleth Him Out Of His Place

"His place" points back to the house, the wealth, and the position the wicked man tried to build for himself.

A storm does not politely remove someone, it hurls them out with force.

Everything the man worked to construct in this chapter gets ripped away in an instant.

The fragile house from before finally meets the storm it could never survive.

🏚️ His place means the life he built

💥 A storm removes him with real force

📉 Everything he built is ripped away

📖 The fragile house meets its storm

## ⚡ For God Shall Cast Upon Him, And Not Spare

Job makes clear this disaster is not random bad luck.

"Cast upon him" pictures God actively throwing this judgment, not simply allowing it to happen.

"Not spare" means no mercy is given at this point.

The wicked man's fate is described as a direct act of God, not an accident of nature.

⚡ This is not random bad luck

🎯 Cast upon him means God actively judges

🚫 Not spare means no mercy given

📖 This fate is a direct act of God

## 🏃 He Would Fain Flee Out Of His Hand

"Fain" is an old word meaning eagerly or gladly.

The wicked man desperately wants to escape God's judgment once it finally arrives.

By this point, though, escape is no longer possible.

The urgency of his desire only highlights how powerless he has actually become.

🏃 Fain means eagerly or desperately

🙏 He desperately wants to escape

🚫 Escape is no longer possible

📖 His desire only shows his powerlessness

## 👏 Men Shall Clap Their Hands At Him

Clapping here is not applause, it is a gesture of mockery and contempt in this culture.

Onlookers celebrate the fall of someone who once oppressed others.

The wicked man's downfall becomes public entertainment instead of public sympathy.

Nobody mourns for a man remembered as an oppressor.

👏 Clapping here means mockery, not praise

😏 Onlookers celebrate his downfall

🎭 His fall becomes public entertainment

📖 No one mourns an oppressor's end

## 🐍 And Shall Hiss Him Out Of His Place

"Hiss" was another ancient gesture of scorn, similar to modern day booing.

The wicked man is driven out of the very position he spent his life building.

This closes the chapter exactly where it began, describing a fate Job insists does not belong to him.

Job has now shown he understands judgment on the wicked as well as anyone.

He still holds onto his own innocence.

🐍 Hiss was an ancient gesture of scorn

🚪 He is driven from the place he built

🔁 This closes the chapter where it began

📖 Job still holds onto his own innocence
`.trim();

export const JOB_TWENTY_SEVEN_PERSONAL_SECTIONS = parseJobTwentySevenRawNotes(JOB_TWENTY_SEVEN_RAW_NOTES);
