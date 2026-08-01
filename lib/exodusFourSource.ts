export type ExodusFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFourRawNotes(rawText: string): ExodusFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+4:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 4 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+4:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+4:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 4 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 4,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 4:${startVerse}` : `Exodus 4:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Exodus 4 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FOUR_RAW_NOTES = `# Exodus 4:1-5
# 🐍 The Sign Of The Rod
---
## 😟 They Will Not Believe Me, Nor Hearken Unto My Voice

Moses raises a real fear here, not simple defiance.

He worries Israel will not accept his word alone.

No proof exists yet that God actually appeared to him.

God does not scold this doubt.

He answers it with a sign instead.

😟 Moses raises a genuine fear

🗣️ He fears Israel will not listen

🤝 No proof exists yet for his claim

📖 God answers doubt with a sign

## 👋 What Is That In Thine Hand

God asks Moses a simple, almost strange question.

Moses is holding nothing more than a shepherd's staff.

The lesson is not really about the staff itself.

God can use whatever ordinary thing is already in someone's hand.

👋 God asks Moses a simple question

🐑 The object is a plain shepherd's staff

🙌 God works through ordinary, everyday things

📖 God uses what is already in your hand

## 🐍 Cast It On The Ground

God tells Moses to throw his staff down.

The staff instantly becomes a live snake.

Moses does not stay calm at all.

He flees from the very sign God just gave him.

Even Moses needed convincing, not only the people.

🐍 The staff becomes a live snake

😨 Moses flees from his own sign

🤯 Even Moses is caught off guard

📖 The sign convinces Moses before Israel

## ✋ Take It By The Tail

Grabbing a snake by the tail was the most dangerous way to handle it.

Normal instinct would be to pin the head down first, not the tail.

Moses obeys anyway, even while still afraid.

The moment he grabs it, the snake turns back into a plain rod.

Obedience came before the fear fully went away.

✋ Grabbing the tail was the risky choice

😰 Moses obeys even while still afraid

🌀 The snake turns back into a rod

📖 Obedience came before fear disappeared

## 🙏 The God Of Abraham, The God Of Isaac, And The God Of Jacob

This sign is meant to prove one specific thing.

The LORD who just spoke to Moses is the same God the patriarchs worshipped generations before.

Israel had not heard from God directly in a very long time.

Naming three familiar generations makes the message impossible to mistake for someone else.

🙏 The sign points to one true God

👴 Abraham, Isaac, and Jacob are named directly

🔗 This links Moses to the ancient promise

📖 No one could mistake this message
# Exodus 4:6-9
# 🤲 Two More Signs
---
## 🤍 His Hand Was Leprous As Snow

Leprosy was one of the most feared diseases in the ancient world.

It could make a person ritually unclean and cut off from the community.

God gives Moses this frightening sign on his own body first.

The Israelites would recognize the disease immediately, no explanation needed.

🤍 Leprosy was a feared, isolating disease

😨 God uses Moses' own body for the sign

👥 Everyone would recognize the disease at once

📖 The sign speaks without needing translation

## 🔄 Turned Again As His Other Flesh

Moses puts his hand back and the disease disappears completely.

The healing happens just as suddenly as the leprosy did.

This proves the sign is real power, not a trick of the eye.

The same hand that caused it also removes it.

🔄 The healing is just as sudden

✋ The same hand, freed of disease

🎭 This rules out any kind of trick

📖 Real power caused it and removed it

## 📢 Believe The Voice Of The Latter Sign

God expects that not everyone will be convinced by the first sign alone.

A second sign is offered in case the first one is not enough.

God plans for doubt instead of being surprised by it.

This shows real patience toward people who need more than one proof.

📢 God expects the first sign might fail

🐍 The rod and the hand are separate signs

🕊️ Patience meets doubt instead of anger

📖 God plans ahead for unbelief

## 🩸 Shall Become Blood Upon The Dry Land

God offers Moses a third sign before he even leaves Midian.

Water from the Nile turning to blood becomes proof if the first two signs fail.

This is the exact miracle that opens the plagues still to come in Exodus seven.

God is already preparing the confrontation with Pharaoh, verses before it happens.

🩸 A third sign uses river water

🌊 This points ahead to Exodus seven

⏳ God prepares the plagues in advance

📖 The confrontation is planned before it starts
# Exodus 4:10-12
# 🗣️ Moses Objects: I Am Not Eloquent
---
## 🗣️ I Am Not Eloquent

Moses raises a brand new objection about himself.

He points to some kind of struggle with speaking clearly.

This is not defiance either.

It is a real limitation Moses feels deeply.

🗣️ Moses raises a new objection

😟 He struggles with confident speech

🙋 This is a real limitation, not defiance

📖 God still has more waiting for him

## 👁️ Who Hath Made Man's Mouth

God answers Moses without dismissing the concern.

He asks who designed the human mouth in the first place.

The same God who made speech, sight, and hearing is asking the question.

That God is more than able to work through Moses' specific weakness.

👁️ God designed the human mouth

👂 He also made sight and hearing

💪 The designer can work through weakness

📖 He works through weakness, not around it

## 🎓 Teach Thee What Thou Shalt Say

God promises to stay with Moses through every word.

This is not a promise to fix Moses permanently.

It is a promise of ongoing help, moment by moment.

God's presence, not a personality change, is the real solution.

🎓 God promises ongoing help

🗓️ Help comes moment by moment

🚫 Moses is not fixed all at once

📖 God's presence is the real solution
# Exodus 4:13-17
# 😠 Aaron Is Appointed As Moses' Spokesman
---
## 🙏 By The Hand Of Him Whom Thou Wilt Send

After every objection has already been answered, Moses asks for someone else entirely.

This is different from his earlier concerns.

Those were real questions.

This is plain reluctance.

Moses simply does not want to go.

🙏 Moses asks God to send someone else

❓ His earlier concerns were real questions

😕 This request is simple reluctance

📖 Moses admits he does not want to go

## 😠 The Anger Of The LORD Was Kindled Against Moses

This is one of the few times scripture describes God's anger toward Moses directly.

The anger is real, not exaggerated language.

Even so, God does not cancel the mission.

He adjusts the plan instead of walking away from Moses.

😠 God's anger here is real

🚫 The anger does not cancel the mission

🔧 God adjusts the plan instead

📖 God stays committed even when frustrated

## 😊 He Will Be Glad In His Heart

God tells Moses that Aaron is already on his way to meet him.

Aaron will not react with resentment or reluctance.

He will be glad, not burdened, by this assignment.

God prepares Aaron's heart before Moses even says a word.

😊 Aaron responds with genuine gladness

🚶 Aaron is already coming to meet Moses

❤️ His heart is prepared in advance

📖 God works ahead in Aaron's heart too

## 🗣️ He Shall Be To Thee Instead Of A Mouth

Aaron will speak Moses' words out loud to the people.

Moses will relay privately what God tells him.

This creates an unusual chain of communication.

God speaks to Moses, Moses speaks to Aaron, Aaron speaks to Israel and Pharaoh.

🗣️ Aaron becomes Moses' spoken voice

🔗 A three part chain of communication

👂 Moses still hears directly from God

📖 God uses two men to deliver one message
# Exodus 4:18-20
# 🚶 Moses Leaves Midian
---
## 🙏 Let Me Go, I Pray Thee, And Return Unto My Brethren

Moses asks his father in law Jethro for permission before leaving.

He does not explain the burning bush or his true mission yet.

He simply frames the trip as checking on his family in Egypt.

Jethro sends him off in peace, with no idea what is coming.

🙏 Moses asks Jethro's permission first

🤫 He does not explain the full mission

👪 He frames it as visiting family

📖 Jethro blesses a journey he cannot yet understand

## 💀 All The Men Are Dead Which Sought Thy Life

God confirms it is finally safe for Moses to return.

Decades earlier Moses fled Egypt after killing an Egyptian.

The Pharaoh who wanted him executed for that is now dead.

The old danger that forced Moses to run is finally gone.

💀 The old threat against Moses is gone

🏃 He once fled Egypt after a killing

👑 That Pharaoh has since died

📖 God clears the way before Moses returns

## 🐴 Took The Rod Of God In His Hand

Moses picks up the same staff he has carried for years as a shepherd.

Scripture now calls it "the rod of God."

The staff itself has not changed.

Its purpose has.

An ordinary tool is now dedicated to God's miracles.

🐴 The staff is an old, familiar tool

🔄 Its name changes, not its shape

✨ It is now dedicated to God's work

📖 Ordinary things can carry a new purpose
# Exodus 4:21-23
# ⚖️ Israel Is God's Firstborn Son
---
## 🪨 I Will Harden His Heart

God tells Moses in advance that Pharaoh will resist, and resist hard.

This warning comes before Moses even reaches Egypt.

The coming struggle is not a sign that Moses failed.

God is preparing him for a long confrontation, not a quick win.

🪨 Pharaoh's resistance is announced in advance

⏳ The struggle ahead will be long

🚫 Resistance does not mean Moses failed

📖 God prepares Moses before the fight starts

## 👨‍👦 Israel Is My Son, Even My Firstborn

God describes the entire nation of Israel in deeply personal language.

A firstborn son held the most treasured place in an ancient family.

This is not a title Pharaoh's Egypt would use for slaves.

It reframes Israel's identity as family, not property.

👨‍👦 God calls Israel His firstborn son

👑 Firstborn meant the most treasured place

🚫 That title contradicts how Egypt saw them

📖 Israel's identity is family, not property

## ⚠️ I Will Slay Thy Son, Even Thy Firstborn

God delivers a direct warning aimed straight at Pharaoh.

It uses the exact language Pharaoh once used against Israel's baby boys in chapter one.

This is not a random threat.

It mirrors Pharaoh's own past decree.

It also foreshadows the tenth and final plague still to come.

⚠️ God warns Pharaoh directly

🔄 It mirrors Pharaoh's own earlier decree

🔟 It points ahead to the final plague

📖 Pharaoh's own cruelty comes back around
# Exodus 4:24-26
# 🗡️ The Strange Encounter At The Inn
---
## 🗡️ The LORD Met Him, And Sought To Kill Him

This is one of the strangest, most debated passages in the entire Old Testament.

Many scholars connect it to circumcision, the covenant sign commanded back in Genesis seventeen.

Moses had apparently left his own son uncircumcised.

The very man sent to confront Pharaoh over God's covenant had neglected that covenant at home.

🗡️ This passage remains widely debated

📜 It connects to circumcision from Genesis seventeen

🏠 Moses had neglected it in his own family

📖 The messenger had not kept the message himself

## 🪨 Zipporah Took A Sharp Stone

Zipporah acts fast, without waiting for Moses to move.

She performs the circumcision herself, right there in an emergency.

This addresses the very thing Moses had neglected in his own home.

The man about to confront Pharaoh over the covenant needed his own wife to keep it first.

🪨 Zipporah acts quickly, without hesitation

✂️ She performs the circumcision herself

🏠 She fixes what Moses had neglected

📖 The covenant is kept before the mission continues

## 🩸 A Bloody Husband Art Thou To Me

Zipporah's exact words remain debated among scholars even today.

They clearly point back to the blood of the circumcision just performed.

This was a serious covenant moment, not a small family argument.

The blood settled something between God and Moses' household.

🩸 Her words connect to the covenant blood

❓ Scholars still debate the exact meaning

⚖️ This was a serious covenant moment

📖 Blood settles what words alone could not
# Exodus 4:27-31
# 🙌 Aaron And Moses Unite Israel
---
## 👋 Went, And Met Him In The Mount Of God, And Kissed Him

God sends Aaron out to meet Moses before he even reaches Egypt.

A kiss was a normal greeting between family in this culture.

This was likely years since the two brothers had last seen each other.

The reunion carries real warmth, not just formality.

👋 Aaron is sent out to meet Moses

💋 A kiss was a normal family greeting

📆 Years had likely passed since they met

📖 Real warmth marks this reunion

## 🗣️ Told Aaron All The Words Of The LORD Who Had Sent Him

Moses fully briefs Aaron before they take a single step further.

Nothing about the message or the signs is left out.

Aaron needs to understand the complete plan, not a summary of it.

The two brothers now carry the same mission together.

🗣️ Moses briefs Aaron completely

🚫 Nothing about the plan is left out

🤝 Both brothers now share one mission

📖 Full honesty prepares them to act together

## 👴 Gathered Together All The Elders Of The Children Of Israel

Moses and Aaron do not go straight to Pharaoh first.

They go to Israel's own leaders before anyone else.

Elders held real authority and trust within the community.

Convincing Israel's own leaders mattered before confronting Egypt's throne.

👴 Israel's elders are approached first

🏛️ Elders held real community authority

🎯 Trust at home comes before the confrontation

📖 The mission starts with Israel, not Pharaoh

## ✨ Did The Signs In The Sight Of The People

Aaron speaks the words while performing the signs God gave Moses.

The people see the proof with their own eyes, not just hear a claim.

This is the exact plan God laid out back in verses one through nine.

Every objection Moses raised earlier is now being answered in front of a crowd.

✨ Aaron performs the signs publicly

👀 The people witness proof themselves

📋 This follows God's plan from earlier

📖 Moses' doubts are answered before a crowd

## 🙌 They Bowed Their Heads And Worshipped

Israel finally believes that God has noticed their suffering.

Generations of silence are met with this one moment of hope.

Worship, not just relief, is their response to the news.

This hopeful scene stands right before the harsh confrontation with Pharaoh still ahead.

🙌 Israel responds with real worship

📆 Generations of silence finally break

😌 Hope arrives before the hard fight

📖 Worship answers the news that God noticed`.trim();

export const EXODUS_FOUR_PERSONAL_SECTIONS = parseExodusFourRawNotes(EXODUS_FOUR_RAW_NOTES);
