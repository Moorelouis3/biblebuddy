export type ProverbsNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseProverbsNineRawNotes(rawText: string): ProverbsNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ProverbsNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Proverbs\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Proverbs 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Proverbs\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Proverbs\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Proverbs 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Proverbs 9:${startVerse}` : `Proverbs 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Proverbs 9 sections, received " + sections.length);
  }

  return sections;
}

const PROVERBS_NINE_RAW_NOTES = `# Proverbs 9:1-3
# 🏛️ Wisdom Builds Her House And Feast
---
## 🏠 Wisdom Hath Builded Her House

Wisdom is pictured here as a woman building her own house.

This is not a house made of wood and stone.

The picture stands for a life built on knowing God.

Proverbs eight already showed Wisdom speaking as a person before creation began.

Now she is shown as a careful builder.

She plans ahead before she ever begins.

🏠 Wisdom appears as a woman here

🧱 Her house stands for a godly life

📜 Proverbs eight introduced her as a person

📖 She builds with real care and purpose

---
## 🪓 Hewn Out Her Seven Pillars

Hewn means cut and shaped by hand, usually from stone.

Seven often marks fullness or completeness in scripture.

A house standing on seven pillars would have been unusually large.

Wisdom's house is not small or flimsy.

It is built strong enough to hold real weight.

🪓 Hewn means cut and shaped by hand

🔢 Seven often marks completeness in scripture

🏛️ Seven pillars means an unusually strong house

📖 Wisdom's house is built to last

---
## 🐐 She Hath Killed Her Beasts

Killing an animal for meat was not a daily event in this culture.

It usually marked a special occasion or an honored guest.

Wisdom prepares this feast before a single guest has arrived.

She is not offering leftovers or something thrown together quickly.

Her welcome costs her something real.

🐐 Killing an animal marked a special day

🎉 This meal was for an honored guest

⏳ The feast was ready before guests came

📖 Wisdom's welcome costs her something real

---
## 🍷 She Hath Mingled Her Wine

Mingled means she added spices into the wine.

This was a common way to serve wine at a special feast.

A cup like this would have tasted richer than ordinary wine.

Wisdom offers her very best, not something plain.

🍷 Mingled means spices added to wine

🌿 This made the wine richer and special

🎊 It marked a true feast, not plain

📖 Wisdom offers her very best here

---
## 🍽️ She Hath Furnished Her Table

Furnished means the table was already fully set.

Nothing was left for a guest to bring or prepare.

Wisdom's whole feast stood ready before the invitation even went out.

All that remains is the choice to come in.

🍽️ Furnished means the table was fully set

✅ Nothing was left for the guest to bring

🚪 The feast waited before the call went out

📖 Only the choice to come remains

---
## 📯 She Hath Sent Forth Her Maidens

Wisdom does not wait quietly for people to find her.

She sends her own servants out to invite guests personally.

This was an active search, not a passive open door.

Wisdom wants people to come, and she works to reach them.

📯 Wisdom sends servants to invite guests

🏃 This was an active search for guests

🚪 It was not a passive open door

📖 Wisdom actively works to reach people

---
## 📢 She Crieth Upon The Highest Places Of The City

Crieth means she calls out loudly, in public, for anyone to hear.

The highest places of the city were the busiest and most visible spots.

Wisdom is not hiding in a private room waiting to be found.

She puts her call where the most people will pass by.

Folly copies this exact same move later in this chapter.

📢 Crieth means calling out loudly in public

🏙️ The highest places were the busiest spots

👀 Wisdom puts her call where people pass

📖 Folly later copies this very same move

# Proverbs 9:4-6
# 🍞 Come, Eat And Live
---
## 🙋 Whoso Is Simple, Let Him Turn In Hither

Simple here does not mean stupid or slow.

It describes someone who is untaught and easily led.

This person has not yet chosen a direction in life.

Wisdom invites this exact kind of person first.

She does not wait for someone who already has it figured out.

🙋 Simple means untaught and not stupid

🧭 This person has no direction yet

🚪 Wisdom invites them in first

📖 She reaches the ones who need her most

---
## 🗣️ Wanteth Understanding, She Saith To Him

Wanteth here means lacks, not desires.

Someone who wanteth understanding is missing it, not wishing for it.

Wisdom speaks directly to this person, not about them.

She addresses the very lack the person may not even see in themselves.

🗣️ Wanteth means lacks, not wishes for

👤 This person is missing understanding

💬 Wisdom speaks directly to them

📖 She names a gap they may not see

---
## 🍞 Come, Eat Of My Bread

Wisdom offers her bread as something to be personally received.

Eating her bread pictures taking her teaching into your own life.

This is not information to admire from a distance.

It is food meant to be taken in and used.

🍞 Bread pictures wisdom taken in personally

🤲 This is not distant information

🍽️ It is meant to be received

📖 Wisdom must be taken in, not just admired

---
## 🍷 Drink Of The Wine Which I Have Mingled

This is the same mingled wine already prepared back in verse two.

Wisdom is now personally offering what she spent the whole feast preparing.

The invitation and the preparation match each other exactly.

Nothing here is an afterthought.

🍷 This is the same wine from verse two

🎁 Wisdom personally offers what she prepared

🤝 Her invitation matches her preparation

📖 Nothing about this offer is an afterthought

---
## 🚶 Forsake The Foolish, And Live

Forsake means to leave behind completely, not just to disagree with.

Wisdom is not asking for a private opinion change.

She is asking for a change in company and direction.

The promise attached to that choice is simple, real life.

🚶 Forsake means to leave behind completely

👥 This means changing company, not opinion

🧭 A real change in direction is required

📖 The reward for leaving is real life

---
## 🛤️ Go In The Way Of Understanding

The Bible often pictures a life choice as a road or a path.

Turning from foolish company is only half the picture here.

Wisdom also calls for walking toward something, not just away from something.

The path of understanding is the destination, not just the exit.

🛤️ Life choices are pictured as a road

🚪 Leaving folly is only half the picture

🎯 Wisdom calls for walking toward something

📖 Understanding is the destination, not the exit

# Proverbs 9:7-9
# 🗣️ Reproving The Wise And The Scorner
---
## 😤 He That Reproveth A Scorner Getteth To Himself Shame

Reproveth means to correct someone or point out their fault.

A scorner is someone who mocks correction instead of accepting it.

Trying to correct a scorner does not usually change them.

It often turns the mocking back onto the one who spoke up.

😤 Reproveth means to correct someone

🙄 A scorner mocks correction instead of hearing it

🔄 Correcting a scorner rarely changes them

📖 The mockery often lands on the corrector

---
## 💢 He That Rebuketh A Wicked Man Getteth Himself A Blot

Rebuketh is a stronger word than reproveth, closer to a sharp warning.

A blot means a stain on your reputation, something that marks you.

Correcting a wicked person can cost the corrector their own good name.

This proverb is not telling anyone to stay silent forever.

It is warning that correction has a real cost with the wrong audience.

💢 Rebuketh is a sharper word than reproveth

🩹 A blot means a stain on your name

💸 Correction can cost the corrector something real

📖 Know your audience before you correct them

---
## 🙅 Reprove Not A Scorner, Lest He Hate Thee

This is practical advice, not permission to ignore all wrongdoing.

A scorner has already decided correction is an insult.

Speaking up here usually earns hatred instead of change.

Wisdom teaches when to speak and when correction will not land.

🙅 A scorner already rejects correction

😡 Speaking up here often earns hatred

🚫 Correction will not land with a scorner

📖 Wisdom knows when a word will not land

---
## 🤝 Rebuke A Wise Man, And He Will Love Thee

A wise man responds to correction the opposite way a scorner does.

He does not hear an insult in it.

He hears help, and he values the person willing to give it.

This single line separates the whole rest of the chapter into two paths.

🤝 A wise man welcomes correction

💡 He hears help, not insult

❤️ He values the one who corrects him

📖 This line splits the chapter into two paths

---
## 📚 Give Instruction To A Wise Man, And He Will Be Yet Wiser

Wisdom is never finished growing, no matter how far along someone is.

A wise man does not think he has already arrived.

Teaching him does not insult him, it builds on what he already has.

A just man grows the same way, increasing in learning over time.

📚 Wisdom is never fully finished growing

🌱 A wise man knows he has not arrived

🧩 Teaching builds on what he already has

📖 Growth in wisdom never really stops

# Proverbs 9:10-12
# 👑 The Fear Of The LORD
---
## 👑 The Fear Of The LORD Is The Beginning Of Wisdom

Fear here does not mean being scared of God.

It means taking God seriously enough to actually change how you live.

This is not the first item on a checklist to move past.

It is the foundation everything else in wisdom is built on.

Without it, every other kind of knowledge stands on nothing solid.

👑 Fear means taking God seriously

🏗️ It is wisdom's true foundation

🚫 It is not something to move past

📖 Nothing else in wisdom stands without it

---
## 🙏 The Knowledge Of The Holy Is Understanding

The Holy here refers to God himself.

Knowing about God is different from actually knowing him personally.

Real understanding, in this proverb, means a relationship, not just facts.

Wisdom keeps pointing back to God as the actual source.

🙏 The Holy refers to God himself

📚 Understanding means truly knowing him

🤝 Facts alone are not the same as knowing

📖 Wisdom always points back to God

---
## 📆 By Me Thy Days Shall Be Multiplied

Wisdom is still speaking here, in her own voice.

She claims credit for a longer, fuller life.

This does not promise an exact number of years to anyone.

It describes the general pattern that a wise life tends to last.

📆 Wisdom claims a longer life here

🗣️ She is still speaking in her voice

🚫 This is not an exact promised number

📖 A wise life tends to last longer

---
## 🪞 If Thou Be Wise, Thou Shalt Be Wise For Thyself

The benefit of wisdom belongs first to the person who has it.

Nobody else can absorb wisdom for you or use it on your behalf.

The choice to pursue wisdom is deeply personal.

So is the reward that follows it.

🪞 Wisdom's benefit belongs to the wise person

🚫 Nobody can absorb it for you

🙋 The choice is deeply personal

📖 The reward follows the same way

---
## ⚖️ If Thou Scornest, Thou Alone Shalt Bear It

The same rule works in the opposite direction too.

A scorner cannot blame anyone else for the outcome.

Nobody forced the choice to mock instead of listen.

Wisdom and foolishness both come with a bill only one person pays.

⚖️ The same rule works in reverse

🙋 A scorner cannot blame others

🚫 Nobody forced that choice on them

📖 Every choice here comes with its own bill

# Proverbs 9:13-15
# 🚪 Folly Sits At Her Door
---
## 📣 A Foolish Woman Is Clamorous

Folly is now pictured the same way Wisdom was, as a woman.

Clamorous means loud, restless, and impossible to ignore.

Where Wisdom's call was purposeful, Folly's call is just noise.

The two women in this chapter mirror each other on purpose.

📣 Clamorous means loud and restless

👥 Folly is pictured as a woman too

🔊 Her call is just noise, not purpose

📖 Wisdom and Folly mirror each other here

---
## 🤷 She Is Simple, And Knoweth Nothing

This is the same word simple used back in verse four.

There the simple person needed real teaching.

Here Folly herself is simple, and she has nothing to actually teach.

She offers the appearance of wisdom without any of its substance.

🤷 The same word simple appears again

🎭 Folly has nothing real to teach

🚫 She offers appearance, not substance

📖 An empty voice can still sound confident

---
## 🪑 She Sitteth At The Door Of Her House

Wisdom built an entire house and prepared a full feast.

Folly does none of that work.

She simply sits at her door and waits.

The contrast between the two is the whole point of this chapter.

🪑 Folly does not build or prepare

🚪 She just sits and waits at her door

⚖️ The contrast with Wisdom is the point

📖 Effort and laziness stand side by side

---
## 🏙️ On A Seat In The High Places Of The City

Folly copies the exact location Wisdom already used in verse three.

She picks the same visible spot without doing any of the same work.

From a distance, her call can look just as legitimate as Wisdom's.

That resemblance is exactly what makes her dangerous.

🏙️ Folly copies Wisdom's exact location

🎭 She skips the work behind the call

👀 From a distance she looks legitimate

📖 That resemblance makes her dangerous

---
## 🚶 To Call Passengers Who Go Right On Their Ways

These passengers were not lost or searching for anything.

They were already walking a straight, steady path.

Folly interrupts people who were not looking for her at all.

Temptation often shows up uninvited, right in the middle of an ordinary day.

🚶 These travelers were not lost

🛤️ They walked a straight, steady path

📢 Folly interrupts them uninvited

📖 Temptation often arrives on an ordinary day

# Proverbs 9:16-18
# ⚰️ Stolen Water And The Guests In Hell
---
## 🗣️ Whoso Is Simple, Let Him Turn In Hither Too

Folly uses the very same words Wisdom used back in verse four.

She is not offering her own honest invitation.

She is copying Wisdom's words to trick the same kind of listener.

A counterfeit only works because it looks like the real thing.

🗣️ Folly repeats Wisdom's exact words

🎭 This invitation is not honestly her own

🪤 She copies Wisdom to trick listeners

📖 A counterfeit only works by looking real

---
## 💧 Stolen Waters Are Sweet

Folly's whole pitch is that secrecy makes things taste better.

What is forbidden or hidden can feel more exciting than what is offered openly.

That feeling is real, but it is also a trap.

The excitement wears off long before the consequences do.

💧 Stolen water represents anything forbidden

✨ Secrecy makes sin feel more exciting

⏳ That excitement never lasts very long

📖 The feeling fades before the cost does

---
## 🍞 Bread Eaten In Secret Is Pleasant

This line directly echoes Wisdom's own invitation to bread in verse five.

Folly is offering a dark copy of the exact same picture.

Both women invite the simple to come and eat.

Only one of them is honest about what the meal will actually cost.

🍞 This echoes Wisdom's bread from verse five

🎭 Folly offers a dark copy of it

🤝 Both invite the simple to eat

📖 Only one is honest about the cost

---
## 💀 He Knoweth Not That The Dead Are There

The guest walking in only sees the pleasure Folly is offering.

He does not see what has already happened to everyone who came before him.

Folly's house looks the same as any other house from the outside.

What is hidden inside it is the real danger.

💀 The guest sees only pleasure at first

🙈 He cannot see what happened before him

🏠 Her house looks ordinary from outside

📖 The real danger stays hidden inside

---
## ⚰️ Her Guests Are In The Depths Of Hell

Hell here means Sheol, the ancient Hebrew word for the realm of the dead.

It is not the same fully developed picture found later in the New Testament.

It still means real and final loss, not a passing thrill.

Wisdom's feast in verse two led to real life and real growth.

Folly's feast leads to the exact opposite ending.

⚰️ Hell here means Sheol, realm of the dead

⚠️ This is real and final loss

🍽️ Wisdom's feast leads to real life

📖 Folly's feast ends the opposite way
`.trim();

export const PROVERBS_NINE_PERSONAL_SECTIONS = parseProverbsNineRawNotes(PROVERBS_NINE_RAW_NOTES);
