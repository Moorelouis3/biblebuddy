export type SecondSamuelThirteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondSamuelThirteenRawNotes(rawText: string): SecondSamuelThirteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondSamuelThirteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondSamuel\s+13:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Samuel 13 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondSamuel\s+13:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondSamuel\s+13:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Samuel 13 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 13,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Samuel 13:${startVerse}` : `2 Samuel 13:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Samuel 13 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_SAMUEL_THIRTEEN_RAW_NOTES = `# SecondSamuel 13:1-6
# 😔 Amnon's Dangerous Obsession
---
## Amnon The Son Of David Loved Her

Amnon and Tamar were not distant relatives.

They were both children of King David.

Absalom was Tamar's full brother.

Amnon was only their half brother.

David had many wives.

His children from different wives grew up together as one household.

What Amnon calls love here is really obsession.

👑 David had many wives
👨‍👩‍👧 Amnon and Tamar were half siblings
🏠 His children all grew up together
📖 This love turns out to be obsession

## Amnon Was So Vexed That He Fell Sick

To be vexed means far more than mildly annoyed.

It means tormented, unable to think of anything else.

Amnon fell sick over a woman he could never lawfully marry.

Israelite law forbade a man from marrying his own sister.

That is exactly why it was hard for him to do anything to her.

His obsession had no lawful outlet at all.

😣 Vexed means tormented, not just annoyed
💔 Amnon fell sick with obsession
🚫 The law forbade marrying a sister
📖 His desire had no lawful outlet

## Jonadab Was A Very Subtil Man

Subtil is an old word for crafty or cunning.

Jonadab was not a stranger looking in from outside.

Shimeah was one of David's brothers.

That made Jonadab David's own nephew.

It also made him Amnon's first cousin, someone Amnon trusted completely.

A cunning man with that kind of access could do real damage.

🦊 Subtil means crafty or cunning
👨‍👩‍👦 Jonadab was David's own nephew
🤝 That made him Amnon's trusted cousin
📖 Cunning with access can do real damage

## I Love Tamar, My Brother Absalom's Sister

Amnon does not call Tamar his own sister here.

He calls her my brother Absalom's sister instead.

That small shift in wording distances him from the truth.

Tamar was just as much his own sister as she was Absalom's.

The way Amnon names her already hints where his mind is headed.

🗣️ Amnon avoids calling her his own sister
👨‍👩‍👧 She was Absalom's full sister too
🎭 His wording distances him from the truth
📖 His language already reveals his mindset

## Lay Thee Down On Thy Bed, And Make Thyself Sick

Jonadab's plan uses real customs of the royal household.

A sick prince would expect a visit from his father the king.

Women of the family were allowed into a sick relative's private room to prepare food.

That access is exactly what Jonadab's scheme depends on.

He is not offering Amnon comfort.

He is handing him an opportunity.

🛏️ Sick princes expected visits from the king
👩 Female relatives could enter a sickroom
🍽️ The plan uses that access on purpose
📖 Jonadab hands Amnon an opportunity, not comfort

## Make Me A Couple Of Cakes In My Sight

The cakes Amnon requests were a simple homemade food, not a fancy dessert.

In my sight meant watching her cook from start to finish.

That request keeps Tamar in the room for an extended time.

Amnon repeats Jonadab's plan almost word for word to his own father.

🍰 Cakes were simple homemade food
👀 In my sight meant watching her cook
⏳ That kept her in the room longer
📖 Amnon follows the plan exactly as given

# SecondSamuel 13:7-14
# 💔 The Assault
---
## David Sent Home To Tamar

A command from the king was not a request.

Tamar had no real way to refuse her own father.

David had no idea he was sending his daughter into danger.

Jonadab's plan works because it moves through legitimate channels.

The very system meant to protect the royal family becomes the trap.

👑 A king's command was not optional
👧 Tamar could not refuse her father
😔 David had no idea of the danger
📖 The system meant for protection became a trap

## She Took Flour, And Kneaded It

Tamar does exactly what her father asked without hesitation.

She kneads the dough and bakes the cakes with her own hands.

Preparing food personally for a sick relative was a real act of care in this culture.

Tamar walks into that room as a caring sister, not suspecting anything.

Her innocence makes what happens next even harder to read.

👩‍🍳 Tamar bakes the cakes herself
❤️ Personal cooking was a real act of care
😇 She has no idea what is coming
📖 Her innocence makes the scene harder

## Have Out All Men From Me

Amnon refuses the very food he asked for.

That refusal is the first sign something is wrong.

Clearing every servant from the room removes any witness.

Tamar is now alone with Amnon by his own design.

🚫 Amnon refuses the food he requested
🚪 He clears the room of witnesses
😨 Tamar is now completely alone with him
📖 The isolation is deliberate

## Bring The Meat Into The Chamber

The chamber was a private inner room, separate from where she had been cooking.

Moving her there put real distance between Tamar and anyone who could help.

She still has no reason to suspect danger.

She is simply obeying a sick relative one more time.

🚪 The chamber was a private inner room
📏 It put distance between her and help
😇 She still suspects nothing
📖 One more request, one step further in

## Come Lie With Me, My Sister

Amnon grabs her by physical force here.

He calls her sister in the very same breath as this demand.

That word makes the betrayal worse, not softer.

This is the moment the chapter has been building toward since verse one.

✋ Amnon takes hold of her by force
🗣️ He still calls her sister here
💔 That word makes the betrayal worse
📖 The chapter's warning finally arrives

## Do Not Force Me, For No Such Thing Ought To Be Done In Israel

Tamar answers immediately and without hesitation.

Her refusal is clear, not confused or unsure.

She names this act as a real violation of Israel's law and identity.

Folly here means a serious moral wrong, not a small mistake.

Her words leave no room to claim she was ever unclear.

🗣️ Tamar refuses immediately and clearly
⚖️ She names this as wrong under Israel's law
🚫 Her refusal leaves no room for confusion
📖 Folly here means a serious moral wrong

## Whither Shall I Cause My Shame To Go

Shame here means public disgrace that follows a woman for life.

An unmarried woman connected to an assault like this could lose her place in society.

Tamar even suggests David might allow a way through this, since a king could grant exceptions.

She is not agreeing to what Amnon wants.

She is desperately trying to slow him down and find any lawful way out.

💔 Shame meant permanent public disgrace
👧 It could ruin her place in society
🗣️ She stalls, hoping for a lawful way out
📖 Desperation, not agreement, drives her words

## Forced Her, And Lay With Her

Amnon ignores every word Tamar just said.

The text states plainly that he was stronger than she.

Her strength was never enough to stop what he had already decided to do.

This was not a moment of passion.

It was a planned assault carried out exactly as Jonadab designed it back in verse five.

🚫 Amnon ignores her refusal completely
💪 He overpowers her by force
📝 This was planned, not spontaneous
📖 Jonadab's scheme reaches its intended end

# SecondSamuel 13:15-19
# 😢 Thrown Out
---
## Amnon Hated Her Exceedingly

This hatred is not really about Tamar at all.

What Amnon called love in verse one was only desire.

Desire that gets what it wants often collapses into guilt and disgust.

Amnon cannot face what he has done, so he turns that disgust onto her.

The text says this hatred was even greater than the love before it.

💔 This was never real love, only desire
😖 Satisfied desire often turns to disgust
🪞 Amnon cannot face his own guilt
📖 He turns his disgust onto Tamar instead

## This Evil In Sending Me Away Is Greater Than The Other

Tamar names a second harm here, on top of the first.

Being thrown out publicly announces to everyone that something happened.

A private wrong now becomes a public disgrace with no explanation attached.

She is asking Amnon to at least not add this cruelty to the last one.

He refuses to listen even to this.

📢 Being thrown out makes the wrong public
👀 It marks her without any explanation
🗣️ Tamar asks him to stop compounding the harm
📖 He refuses even this small mercy

## Put Now This Woman Out From Me, And Bolt The Door

Amnon will not even say her name here.

He calls her this woman, the language of a stranger, not a sister.

Bolting the door behind her seals the rejection completely.

Every trace of intimacy from the earlier verses is gone.

🗣️ Amnon will not even say her name
🚪 Bolting the door seals the rejection
❄️ All intimacy is instantly gone
📖 She is discarded like a stranger

## A Garment Of Divers Colours

This robe was not ordinary clothing.

The text says this exact style of robe marked the king's unmarried daughters.

Wearing it announced Tamar's royal and unmarried status to everyone who saw her.

That is exactly the garment she is about to tear apart in grief.

👗 This robe marked the king's unmarried daughters
👑 It announced her royal status publicly
😢 She is about to tear this exact robe
📖 A status symbol becomes a symbol of grief

## Tamar Put Ashes On Her Head, And Went On Crying

Ashes on the head and torn clothing were the ancient signs of deep grief.

Tamar performs every one of them in public, walking and crying openly.

Amnon tried to erase what happened by bolting a door.

Tamar's public grief refuses to let it stay hidden.

🌫️ Ashes and torn clothes signaled deep grief
🗣️ Tamar mourns openly, not in secret
🚪 Amnon tried to hide what happened
📖 Her grief refuses to stay silent

# SecondSamuel 13:20-22
# 😠 Silence And Rage
---
## Hath Amnon Thy Brother Been With Thee?

Absalom guesses the truth almost immediately.

His question is not really a question.

He already knows the answer before Tamar says a word.

That quick guess suggests Amnon's obsession was not a total secret.

🗣️ Absalom guesses the truth right away
❓ His question is not a real question
👀 Amnon's obsession may not have been hidden
📖 Absalom already suspects the answer

## Hold Now Thy Peace, My Sister

Absalom tells Tamar to stay quiet about what happened.

That request silences her again, right after Amnon already silenced her.

Absalom is not asking her to forget it.

He is already planning to handle this himself, in his own time.

🤐 Absalom tells her to stay silent
🔁 This silences her a second time
🧠 He is already planning his own response
📖 Silence here is not forgiveness

## Tamar Remained Desolate In Her Brother Absalom's House

Desolate here means left alone in grief, with no path forward.

An unmarried woman marked this way in this culture often could not marry at all.

Tamar does not get to move on from what happened to her.

She spends the rest of her story marked by this one chapter.

😔 Desolate means alone with no path forward
💍 She likely could no longer marry
⏳ She never gets to move on
📖 One chapter marks the rest of her life

## The King Was Very Wroth

Wroth means intense, burning anger, far stronger than simple annoyance.

David is genuinely furious when he hears what happened to his daughter.

The text never records David taking any real action against Amnon.

As king and father, David had full authority to punish this and did not use it.

🔥 Wroth means intense, burning anger
👑 David had full authority to act
🚫 The text records no real punishment
📖 Anger without action leaves the wrong unanswered

## Absalom Spake Unto His Brother Amnon Neither Good Nor Bad

Absalom says nothing to Amnon at all, not even a confrontation.

That silence is not peace, it is calculated coldness.

The text states plainly that Absalom hated Amnon underneath it.

Where David's anger produced no action, Absalom's hatred is quietly building toward one.

🤐 Absalom says nothing to Amnon at all
❄️ His silence is calculated, not peaceful
💔 The text names his hatred directly
📖 His anger is building toward something

# SecondSamuel 13:23-27
# 🐑 The Sheepshearing Invitation
---
## After Two Full Years

Two full years pass between Absalom's silence and this moment.

That is not a short temper acting on impulse.

Absalom waited, planned, and let suspicion fade before making his move.

His revenge is the opposite of Amnon's crime in how it was carried out.

📆 Two full years pass before this
🧠 This was planned, not impulsive
⏳ Absalom let suspicion fade first
📖 Patience made his revenge harder to see coming

## Absalom Had Sheepshearers In Baalhazor

Sheepshearing was a major harvest style event in this culture.

It usually involved a large feast, music, and plenty of wine.

Baalhazor sat near Ephraim, a location north of Jerusalem.

A feast this size gave Absalom the perfect cover to gather every king's son in one place.

🐑 Sheepshearing was a festive harvest event
🍷 It usually involved feasting and wine
🗺️ Baalhazor sat near Ephraim, north of Jerusalem
📖 A feast gave him the perfect cover

## Let The King, I Beseech Thee, Go With Thy Servant

Beseech means to beg or plead earnestly.

Inviting the king himself to a feast was a real honor in this culture.

Absalom knows David is unlikely to accept, given how busy a king's schedule was.

The invitation still looks completely normal and respectful on the surface.

🙏 Beseech means to beg earnestly
👑 Inviting the king was a real honor
🗓️ David was unlikely to actually attend
📖 A respectful request hides Absalom's real target

## Let Us Not All Now Go, Lest We Be Chargeable Unto Thee

Chargeable here means an expensive burden to host.

David is being practical, not suspicious of Absalom.

He declines for himself but still blesses Absalom's feast on the way out.

David has no idea this refusal is part of what makes the plan work.

💰 Chargeable means an expensive burden
🤔 David declines for practical reasons
🙏 He blesses the feast anyway
📖 His refusal unknowingly helps the real plan

## Let My Brother Amnon Go With Us

David's question here shows a flicker of real suspicion.

Why should he go with thee suggests David has not forgotten the tension between his sons.

Absalom simply keeps pressing until David gives in anyway.

That single moment of hesitation was not enough to stop what comes next.

❓ David's question shows real suspicion
🧠 He has not forgotten the past tension
🗣️ Absalom simply keeps pressing him
📖 One hesitation was not enough to stop it

## Absalom Pressed Him, That He Let Amnon And All The King's Sons Go

Absalom does not invite Amnon alone.

He insists that every one of the king's sons come along.

That detail matters later, when a false report claims all of them were killed.

A crime aimed at one man is disguised inside a gathering of many.

👨‍👨‍👦 Every king's son is invited, not just Amnon
🎭 This disguises who the real target is
📢 It sets up a false report later
📖 One planned death hides inside a crowd

# SecondSamuel 13:28-33
# ⚔️ Absalom's Revenge
---
## When Amnon's Heart Is Merry With Wine

Merry with wine is a polite way of saying drunk.

Absalom waits for the exact moment Amnon is least able to defend himself.

This mirrors Jonadab's original plan, which also waited for Amnon to be weak.

The chapter's first scheme and its final scheme use the same basic tactic.

🍷 Merry with wine means drunk
🎯 Absalom waits for Amnon's weakest moment
🔁 This mirrors Jonadab's earlier scheme
📖 Both crimes exploit the same vulnerability

## Smite Amnon, Then Kill Him, Fear Not

Absalom gives this order in plain, direct words.

He tells his own servants not to fear the consequences.

Have not I commanded you places the full responsibility on himself.

The servants only carry out what Absalom personally decided.

🗣️ Absalom gives the order directly
😨 He tells them not to fear consequences
👑 He claims full responsibility himself
📖 The servants only carry out his decision

## The King's Sons Arose, And Fled

Every prince at the feast flees the moment Amnon is struck down.

Mules were the animal princes rode, a mark of their royal status.

None of them yet know that Amnon alone was the target.

Total panic spreads through the whole group at once.

🐴 Mules were the animal princes rode
😱 Panic spreads through the whole group
❓ None of them know the real target yet
📖 Chaos, not clarity, drives their flight

## Absalom Hath Slain All The King's Sons

This report reaches David before anyone confirms the facts.

Rumor moves faster than truth in a moment of panic.

Because all the king's sons had been invited, the false story sounds believable.

David hears the worst possible version of the news first.

🗞️ The report reaches David before the facts do
🏃 Rumor outruns truth in a panic
🎭 Inviting all the sons made this lie believable
📖 David hears the worst version first

## The King Arose, And Tare His Garments

Tearing clothing was the standard sign of grief in this culture.

David believes in this moment that he has lost every one of his sons at once.

His servants tear their own clothes alongside him out of shared horror.

This is grief on a scale the chapter has not shown before.

👔 Torn clothing signaled deep grief
👨‍👦‍👦 David believes he lost all his sons
🤝 His servants mourn alongside him
📖 A scale of grief not seen before

## Only Amnon Is Dead

Jonadab is the same crafty relative who designed Amnon's original scheme.

He is remarkably certain about what actually happened, almost too certain.

He states plainly that Absalom planned this since the day Tamar was forced.

The man who helped start this chapter's tragedy also explains how it ends.

🦊 Jonadab is the same man from verse three
🧠 He seems to already know the full truth
📆 The plan began the day Tamar was forced
📖 The same man opens and explains this tragedy

# SecondSamuel 13:34-39
# 🏃 Absalom Flees To Geshur
---
## Absalom Fled

Absalom does not stay to explain himself to his father.

He runs the moment the act is done.

This matches the silence he already showed back in verse twenty two.

Absalom deals with David through absence, both before and after the crime.

🏃 Absalom flees immediately
🤐 He offers David no explanation
🔁 This matches his earlier silence
📖 Absence, not conversation, defines their relationship

## The Young Man That Kept The Watch

A watchman's job was to scan the road from a high point and report what he saw.

This was a normal, everyday duty in a royal city.

Here it becomes the means by which David finally learns the truth.

Ordinary routines sometimes carry the most important news.

👀 Watchmen scanned the road from a high point
🏙️ This was a normal daily duty
📰 It becomes how David learns the truth
📖 Ordinary routines can carry major news

## Behold, The King's Sons Come

Jonadab's prediction from verse thirty three is about to be proven true.

He speaks with confidence because he already knew more than he had said.

This moment finally confirms that Jonadab's account was accurate all along.

🔮 Jonadab's earlier claim is about to be proven
🧠 He spoke with real inside knowledge
✅ This confirms his account was accurate
📖 Truth catches up to rumor at last

## The King's Sons Came, And Lifted Up Their Voice And Wept

The surviving sons finally arrive and the whole court weeps together.

David had already spent his grief once, believing he lost all his sons.

Now that grief returns, this time for the one son who is actually dead.

Shared tears do not undo the loss, but they mark it honestly.

😭 The surviving sons arrive and weep with David
🔁 David had already grieved once, wrongly
💔 Now the grief is real and specific
📖 Shared mourning marks the loss honestly

## Absalom Fled, And Went To Talmai, King Of Geshur

Geshur was a separate foreign kingdom, outside David's own reach.

Talmai was not a stranger to Absalom, he was his own grandfather.

David had married Talmai's daughter Maacah, Absalom's mother.

Absalom fled to protected family, not to a stranger.

🗺️ Geshur was a separate foreign kingdom
👴 Talmai was Absalom's own grandfather
👑 David had married Talmai's daughter Maacah
📖 Absalom fled to protected family, not a stranger

## David Mourned For His Son Every Day

David's grief here does not simply end after the funeral.

He mourns every single day for an extended period.

Absalom stayed away in Geshur three full years, by the next verse.

A father is left mourning one son while another stays in exile.

📆 Three full years pass in Geshur
😢 David mourned every single day
⏳ This grief was not brief
📖 One son dead, one gone, one grieving father

## The Soul Of King David Longed To Go Forth Unto Absalom

This closing verse marks a real shift in David's heart.

His grief over Amnon slowly gives way to longing for Absalom instead.

The text says plainly that David was comforted concerning Amnon, since he was dead.

That longing sets up the next chapter, where a wise woman finds a way to bring Absalom home.

💔 David's grief begins to shift here
😢 He starts longing for Absalom instead
🕊️ He is comforted concerning Amnon's death
📖 This longing sets up chapter fourteen
`.trim();

export const SECOND_SAMUEL_THIRTEEN_PERSONAL_SECTIONS = parseSecondSamuelThirteenRawNotes(SECOND_SAMUEL_THIRTEEN_RAW_NOTES);
