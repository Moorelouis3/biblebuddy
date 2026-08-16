export type SecondChroniclesTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTenRawNotes(rawText: string): SecondChroniclesTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 10:${startVerse}` : `2 Chronicles 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Chronicles 10 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TEN_RAW_NOTES = `# SecondChronicles 10:1-3
# 🏛️ Rehoboam Comes To Shechem
---
## 🏛️ Rehoboam Went To Shechem

Shechem was not a random meeting place.

Abraham and Jacob both worshiped there generations earlier.

It sat at the center of the northern tribes, far from Jerusalem.

Meeting there instead of Jerusalem was already a signal.

The northern tribes wanted their new king to come to them.

🏛️ Shechem held deep covenant history

🕎 Abraham and Jacob worshiped there

🧭 It centered the northern tribes

📖 The king came to them first

---

## 👥 All Israel Come To Make Him King

"All Israel" here does not mean every single Israelite.

It means the tribal leaders representing the ten northern tribes.

Judah already supported Rehoboam as the next king.

The northern tribes still expected their own say in it.

Kingship in Israel was never automatic even for David's own line.

👥 All Israel means northern tribal leaders

👑 Judah already backed Rehoboam

🗳️ Northern tribes wanted their own voice

📖 Kingship required more than birth alone

---

## 🔮 Jeroboam The Son Of Nebat

Jeroboam was one of Solomon's own officials before this chapter.

The prophet Ahijah had already told him God would tear the kingdom in two.

Ten tribes were promised to Jeroboam.

One tribe stayed with David's line.

Solomon heard about that promise and tried to kill him for it.

That backstory explains why the northern tribes wanted him back now.

🔮 Ahijah had already prophesied to him

✂️ Ten tribes were promised to Jeroboam

😨 Solomon tried to kill him for it

📖 His backstory explains why they wanted him

---

## 🇪🇬 Whither He Had Fled From The Presence Of Solomon

"Whither" is an old word meaning to what place.

Jeroboam had been hiding in Egypt this whole time.

Fleeing there kept him safe from a king who wanted him dead.

Egypt's king often gave shelter to people running from danger.

His exile ends the moment the northern tribes call him home.

📍 Whither means to what place

🇪🇬 Jeroboam hid safely in Egypt

🛡️ Egypt sheltered him from Solomon

➡️ His exile ends the moment he returns

---

## 📨 They Sent And Called Him

The northern tribes did not wait for Jeroboam to show up on his own.

They sent messengers to bring him back specifically for this meeting.

That choice already reveals what they expected to happen at Shechem.

Jeroboam was not there to celebrate a coronation.

He was there to lead their case against the new king.

📨 They sent for Jeroboam directly

🎯 That choice reveals their real plan

⚖️ He was not there to celebrate

📖 He came to lead their case

# SecondChronicles 10:4-5
# ⚖️ The People's Request
---
## 🐂 Thy Father Made Our Yoke Grievous

A "yoke" was originally the wooden frame that harnessed oxen to pull a heavy load.

Scripture often uses it as a picture of forced labor or hard rule.

"Grievous" means painful and hard to bear, not simply annoying.

Solomon's building projects had required years of forced labor from ordinary Israelites.

The people are naming that burden directly to his own son.

🐂 Yoke pictures a heavy forced burden

😣 Grievous means painful and hard

🏗️ Solomon's projects demanded years of labor

📖 The people name that burden openly

---

## 🔨 Grievous Servitude

"Servitude" here describes forced labor, not the same as slavery from birth.

First Kings nine describes Solomon drafting forced workers for his projects.

Even native Israelites, not only foreign captives, were required to serve.

That detail made the burden feel personal to many families.

The people now offer a simple deal in return for relief.

🔨 Servitude means required forced labor

🏛️ Solomon drafted workers for building projects

👪 Even native Israelites were required to serve

➡️ They offer loyalty in exchange for relief

---

## 🤝 We Will Serve Thee

This is not a threat or a rejection of the monarchy itself.

The people are offering Rehoboam a clear deal before he even answers.

Ease the burden his father placed on them.

Then they will serve him gladly.

Their loyalty was never unconditional in the first place.

How Rehoboam responds next will decide everything that follows.

🤝 This is an offer, not a threat

👑 They still accept him as king

⚖️ Loyalty depends on how he answers

📖 His response decides everything ahead

---

## ⏳ Come Again Unto Me After Three Days

Rehoboam does not answer right away.

Three days gives him time to gather advice before deciding anything.

That pause seems wise on the surface.

What happens during those three days matters far more than the delay itself.

Two very different sets of advisors are about to compete for his ear.

⏳ Three days delays the final answer

🤔 The pause looks wise at first

🗣️ Two groups compete for his ear

📖 The choice made in private will matter most

# SecondChronicles 10:6-7
# 👴 Counsel Of The Old Men
---
## 👴 Took Counsel With The Old Men

These were not simply elderly men chosen at random.

They had personally served and advised Solomon for years.

Their experience covered an entire reign of ruling a kingdom.

Rehoboam turns to them first.

That looks like a wise instinct.

Wisdom only helps a king if he actually follows it.

👴 These men had served Solomon for years

🧠 Their experience covered his whole reign

✅ Asking them first seemed wise

📖 Wisdom only helps if it gets followed

---

## 🏛️ Stood Before Solomon His Father

"Stood before" is an old way of describing regular service in a royal court.

It does not mean they were literally standing the whole time.

These men had a front row seat to how Solomon actually ruled his kingdom.

Their advice carries the weight of watching a real king in action.

That kind of experience cannot be learned from theory alone.

🏛️ Stood before means regular royal service

👀 They watched Solomon rule firsthand

📚 Their advice came from real experience

📖 Experience like this cannot be learned in theory

---

## 🤝 If Thou Be Kind To This People

The old men give Rehoboam one simple strategy.

Serve the people well now.

Kindness here does not mean weakness.

A king who listens and speaks good words earns lasting loyalty.

"For ever" is their promise, not just for the next few years.

Their advice trades short term control for long term trust.

🤝 Kindness was their entire strategy

💪 Kindness does not mean weakness

🔁 Good words earn lasting loyalty

📖 They traded control for real trust

# SecondChronicles 10:8-11
# 😤 Counsel Of The Young Men
---
## 🚫 Forsook The Counsel Which The Old Men Gave Him

"Forsook" means to abandon or reject something completely.

Rehoboam does not weigh both sets of advice evenly.

He sets aside decades of experience in a single moment.

That choice happens before he even hears what the young men will say.

The decision to reject wisdom came before the second opinion did.

🚫 Forsook means to abandon completely

⚖️ He rejected experience outright

⏱️ This happened before hearing the alternative

📖 The rejection came before the advice did

---

## 👦 The Young Men That Were Brought Up With Him

These were Rehoboam's own peers.

They were close to him in age.

They likely grew up together inside the same palace walls.

None of them had actually ruled anything themselves.

Shared friendship is not the same thing as shared wisdom.

Rehoboam chose comfort over experience.

👦 These were Rehoboam's own peers

🏰 They grew up together in the palace

🚫 None of them had ruled before

📖 He chose comfort over experience

---

## ❓ What Advice Give Ye

Rehoboam asks the young men the exact same question he asked the elders.

The identical question makes the contrast in their answers even sharper.

One group had lived through the cost of harsh rule.

The other group had only imagined what power might feel like.

Same question.

Two completely different kinds of men answer it.

❓ He repeats the exact same question

⚖️ The contrast sharpens their two answers

👴 One group had lived through real rule

📖 Two very different men answer it

---

## 💪 My Little Finger Shall Be Thicker Than My Father's Loins

This is an old boast comparing a small body part to a strong one.

"Loins" points to strength and full grown power.

The young men want him to claim he will be tougher than Solomon.

That boast came from almost nothing behind it.

It is arrogance dressed up as confidence.

💪 Loins means strength and power

🗣️ He compares his pinky to Solomon's strength

😏 The boast has nothing behind it

📖 Arrogance is dressed up as confidence

---

## ⬆️ I Will Put More To Your Yoke

The people already asked for their yoke eased back in verse four.

The young men tell Rehoboam to answer with the exact opposite.

Instead of lightening the burden, he should openly promise to increase it.

This is not a mistake or a slip of the tongue.

It is deliberate provocation dressed up as strength.

🔁 The people asked for less burden

⬆️ The young men urge more burden instead

🎯 This answer is deliberate, not accidental

📖 Provocation gets dressed up as strength

---

## 😣 My Father Chastised You With Whips

"Chastised" means punished, usually through physical discipline.

A whip here likely describes forced labor enforced through harsh treatment.

Solomon's rule already carried real pain for ordinary workers.

The young men do not deny that history.

They plan to make it worse, not better.

😣 Chastised means punished physically

🐴 Whips point to harsh forced labor

✅ They admit Solomon's rule already hurt

📖 Their plan makes it worse, not better

---

## 🦂 I Will Chastise You With Scorpions

"Scorpions" here almost certainly does not mean the actual insect.

Many scholars believe it describes a whip fitted with sharp metal points.

That kind of whip caused far deeper wounds than a plain leather strap.

The young men want Rehoboam to threaten pain worse than his father caused.

This becomes the exact answer he plans to give.

🦂 Scorpions likely means a barbed whip

🩸 It caused deeper wounds than a plain whip

😨 The threat outdoes his father's cruelty

📖 This becomes the answer he actually gives

# SecondChronicles 10:12-15
# 🔥 Rehoboam's Harsh Answer
---
## 📅 Jeroboam And All The People Came

Three days have now passed exactly as Rehoboam requested.

Jeroboam returns with the same crowd that made the original request.

Nothing about their demand has changed since verse four.

Only Rehoboam's answer is about to change everything.

The next few verses decide the future of the whole kingdom.

📅 Three days have now passed

👥 The same crowd returns together

🔁 Their demand has not changed

📖 His answer will change everything

---

## 🔁 King Rehoboam Forsook The Counsel Of The Old Men

This is the second time the text says Rehoboam forsook his elders.

The first time described a private decision made before he spoke.

This time is the public answer.

He delivered it harshly, not gently or carefully.

A private choice had now become a public clash.

🔁 This is the second time it is said

🤫 The first time was a private decision

🗣️ This time is the public answer

📖 He commits to it in front of everyone

---

## 📖 I Will Add Thereto

"Thereto" is an old word meaning to that, or in addition to it.

Rehoboam repeats the exact words the young men gave him.

This is no longer advice sitting on the table.

It is now his own official policy as king.

The earlier threat of whips and scorpions becomes his real promise.

📖 Thereto is an old word for to that

🗣️ He repeats the young men's exact words

👑 Advice becomes official royal policy

➡️ The earlier threat becomes his real promise

---

## 👂 The King Hearkened Not Unto The People

"Hearkened" means listened and responded to.

Rehoboam does not simply disagree with the people.

He refuses to listen to them at all.

That refusal turns a request for relief into open conflict.

A closed ear from a king rarely stays without cost.

👂 Hearkened means listened and responded

🚫 He refuses to listen at all

⚔️ Refusal turns a request into conflict

📖 A closed ear rarely stays without cost

---

## ⚖️ For The Cause Was Of God

This line does not excuse Rehoboam's foolish choice.

It reveals something happening underneath that choice.

God was using a proud king's stubbornness for His own plan.

Human sin and divine purpose can move at the same time.

Neither one cancels the other out here.

⚖️ This does not excuse Rehoboam

👑 God worked underneath his choice

🤝 Sin and God's plan moved together

📖 Neither one cancels the other here

---

## 🔮 Which He Spake By The Hand Of Ahijah The Shilonite

This sentence points back to a specific earlier prophecy.

Ahijah had already told Jeroboam that ten tribes would be torn away.

That prophecy was recorded generations before this exact moment happened.

Rehoboam's stubborn answer becomes the very way that word comes true.

God's promises do not need help to happen, only time.

🔮 Ahijah's prophecy is named directly

✂️ Ten tribes were promised earlier

⏳ Years passed before it happened

📖 God's word needed no help to come true

# SecondChronicles 10:16-17
# 💔 Israel Rebels
---
## ❓ What Portion Have We In David

This is a rhetorical question that already means no portion at all.

The northern tribes are rejecting more than just one king.

They are rejecting the entire line of David itself.

A man named Sheba shouted this same phrase during an earlier revolt.

Old wounds in the kingdom were never fully healed.

❓ The question already means none at all

👑 They reject the whole line of David

🔁 The same phrase was used once before

📖 Old wounds were never fully healed

---

## 👴 We Have None Inheritance In The Son Of Jesse

Jesse was David's own father, from the town of Bethlehem.

Calling David "the son of Jesse" drops his royal title on purpose.

It refuses to call him king at all.

The northern tribes are refusing to treat David's whole family as royalty.

A single name choice carries real disrespect.

👴 Jesse was David's own father

👑 Calling him this drops his royal title

🚫 It was done on purpose

📖 The name choice carries real disrespect

---

## 🏕️ Every Man To Your Tents, O Israel

This old phrase was a rallying cry.

It was not a literal instruction about tents.

It meant leave right now.

This cause is over.

Israel had shouted the same words once before, during an earlier uprising.

Shouting it here signals a total, immediate withdrawal from Rehoboam.

🏕️ Tents means go home, not literally camp

🗣️ It was an old rallying cry

🔁 The same words were shouted before

📖 It signals a total, sudden withdrawal

---

## 🗺️ The Children Of Israel That Dwelt In The Cities Of Judah

Not every Israelite joined the rebellion described just before this verse.

Some Israelites already lived inside the territory belonging to Judah.

Those specific people stayed under Rehoboam's rule.

This detail explains why Judah alone stays loyal to David's line.

The kingdom does not split evenly among the tribes.

It splits along where people already lived.

🗺️ Some Israelites already lived in Judah

👑 Those people stayed under Rehoboam

🧭 This explains Judah's lasting loyalty

📖 The split follows geography, not tribes alone

# SecondChronicles 10:18-19
# 🪦 Hadoram Is Stoned
---
## 🏗️ Hadoram That Was Over The Tribute

"Tribute" here refers to the forced labor system this whole chapter has been about.

Hadoram was the official who managed and enforced that labor.

Sending him specifically was a strange, almost provocative choice.

Rehoboam had other officials he could have sent instead.

He sent the very symbol of the burden.

The messenger himself became part of the problem.

🏗️ Tribute means the forced labor system

👤 Hadoram managed and enforced it

🎯 Sending him was a provocative choice

📖 The messenger became part of the problem

---

## 🪨 The Children Of Israel Stoned Him With Stones, That He Died

Stoning was a public, communal form of execution.

It was not the act of one angry person acting alone.

A crowd united together to kill Rehoboam's own official.

This was not a protest anymore.

It was open, violent rebellion against the throne itself.

🪨 Stoning was a public, shared execution

👥 A crowd acted together, not alone

⚔️ This crossed from protest into rebellion

📖 The throne itself was now under attack

---

## 🏃 Made Speed To Get Him Up To His Chariot, To Flee

"Made speed" means he hurried, without hesitation.

Rehoboam does not stay to negotiate or explain himself.

He runs for his own life back toward Jerusalem.

The same king who spoke boldly moments earlier is now in real danger.

Threats are easy to make from a throne and hard to keep in front of an angry crowd.

🏃 Made speed means he hurried immediately

😨 He fled instead of negotiating

👑 Bold words met a real, violent crowd

📖 Threats are easier made than kept

---

## ✍️ Israel Rebelled Against The House Of David Unto This Day

This is the chronicler's own summary, written long after these events happened.

"The house of David" means the ongoing royal family, not just Rehoboam alone.

"Unto this day" tells the reader this split was never repaired in the writer's own lifetime.

One harsh answer in a single afternoon created a divide lasting for generations.

The kingdom Solomon built now stands permanently divided in two.

✍️ This is the chronicler's later summary

👑 House of David means the whole royal line

⏳ Unto this day means it never healed

📖 One answer split a kingdom for generations
`.trim();

export const SECOND_CHRONICLES_TEN_PERSONAL_SECTIONS = parseSecondChroniclesTenRawNotes(SECOND_CHRONICLES_TEN_RAW_NOTES);
