export type GenesisFortyTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyTwoRawNotes(rawText: string): GenesisFortyTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+42:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 42 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+42:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+42:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 42 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 42,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 42:${startVerse}` : `Genesis 42:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 Genesis 42 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_TWO_RAW_NOTES = `# Genesis 42:1-5
# 🌾 Jacob Sends His Sons To Egypt
---
## 😟 Why Do Ye Look One Upon Another

Jacob's question catches his sons doing nothing.

They are staring at one another instead of acting.

Egypt is not a neutral word for this family.

These are the same brothers who sold Joseph there years earlier.

Old guilt may explain the delay more than confusion does.

😟 Jacob sees his sons frozen

🕳️ Egypt is not a neutral place for them

🤐 Old guilt may explain the hesitation

➡️ Jacob presses them to act now

## ⬇️ Get You Down Thither

"Thither" is an old word for to that place.

Jacob tells his sons to go down thither, meaning to Egypt.

Scripture often describes travel toward Egypt as going down.

Part of that is geography, since Egypt sits at a lower elevation.

Part of it is symbolic, since Egypt often stands for danger.

For this family, down to Egypt carries a second, heavier meaning.

It is the same direction Joseph disappeared in years earlier.

📍 Thither means to that place

⬇️ Going down describes both land and danger

🕳️ Egypt holds a second, painful meaning

📖 This trip retraces Joseph's own road

## 🍞 That We May Live And Not Die

Jacob states the stakes as plainly as possible.

Buy food, or the family starves.

This is not a household running low on comfort.

This is real survival.

Fear of hunger finally moves the brothers to act.

It pushes them toward the place tied to their worst memory.

🍞 The trip is about survival

⚠️ Hunger finally forces the family to act

🕳️ Egypt is tied to their worst memory

📖 Crisis can force people toward buried truth

## 🔟 Joseph's Ten Brethren

Ten of the twelve brothers travel down to Egypt.

Only Benjamin stays behind at home with Jacob.

This is nearly the same group who once sold Joseph away.

Genesis is quietly rebuilding the scene of that old crime.

🔟 Ten brothers travel, Benjamin stays home

📖 Nearly the same group that sold Joseph

⭐ God is quietly setting up a reunion

➡️ They walk straight toward the man they wronged

## 😨 Lest Peradventure Mischief Befall Him

"Peradventure" is an old word for perhaps or by chance.

"Mischief" in the King James Bible does not mean playful trouble.

It means real harm, disaster, or death.

Jacob fears losing Benjamin the way he believes he lost Joseph.

Both boys were sons of Rachel, the wife Jacob loved most.

❓ Peradventure means perhaps

⚠️ Mischief means real harm or disaster

💔 Jacob still favors Rachel's remaining son

📖 Unhealed grief still shapes his choices

# Genesis 42:6-9
# 🙇 The Brothers Bow Before Joseph
---
## 👑 Joseph Was The Governor Over The Land

Joseph now holds the position Pharaoh gave him back in chapter forty one.

"Governor" made him second in command over all of Egypt.

He personally oversaw the sale of grain to every family that came.

That explains why his brothers end up standing right in front of him.

They did not seek him out.

Every grain sale in Egypt ran straight through his hands.

👑 Joseph ranks second only to Pharaoh

🌾 He personally oversees Egypt's grain sales

🤝 The brothers meet him by pure necessity

📖 God placed the rejected brother at the center

## 🙇 Bowed Down Themselves Before Him With Their Faces To The Earth

This moment is not a random show of respect.

It is the exact fulfillment of Joseph's boyhood dream in Genesis thirty seven.

In that dream, his brothers' sheaves bowed down to his own sheaf.

The same brothers who mocked that dream are now flat on the ground.

They have no idea whose feet they are bowing before.

🙇 They bow with their faces to the ground

😳 They do not know who he is

🔮 This fulfills Joseph's boyhood dream exactly

📖 God's promise outlasts every attempt to bury it

## 🎭 He Knew Them But Made Himself Strange Unto Them

Joseph recognizes his brothers the moment he sees them.

They do not recognize him at all.

He has changed from a teenage shepherd into an Egyptian ruler in his thirties.

"Made himself strange" means Joseph deliberately acted like a stranger.

This is not confusion.

It is a choice, the first move in a careful test.

🧠 Joseph knows them instantly

😶 They have no idea who he is

🎭 Made himself strange means he acted the part

📖 Real reconciliation is sometimes tested first

## 🏜️ Ye Are Spies To See The Nakedness Of The Land

Joseph accuses his brothers of spying on Egypt.

"The nakedness of the land" is an old phrase for its weak, undefended points.

It has nothing to do with literal nudity.

Scouting Egypt for invasion was a serious charge.

It could carry a death sentence.

Joseph's harsh front hides something the reader is about to learn.

🗣️ Joseph speaks harshly on purpose

🏜️ Nakedness of the land means its weak points

⚠️ The charge could carry a death sentence

📖 A hard exterior can hide real feeling

## 🌙 Joseph Remembered The Dreams Which He Dreamed Of Them

The narrator states plainly that Joseph remembers his dreams.

He watches his brothers bow, unaware of who he is.

The boyhood dream is lining up with reality right in front of him.

This is not Joseph gloating.

It is Joseph seeing that God carried his word through every hard year.

None of it was wasted.

🌙 Joseph connects this to his old dream

👀 Reality is now matching the dream

🚫 This is not Joseph gloating

📖 God's word survives every twist along the way

# Genesis 42:10-13
# 🔎 The Brothers Claim To Be True Men
---
## 🙅 To Buy Food Are Thy Servants Come

"Nay, my lord" is the language of a frightened servant.

It shows how completely powerless the brothers feel in this room.

These are the same men who once held total power over Joseph.

They decided whether to kill him, sell him, or let him live.

Now they stand powerless before him, not knowing who he is.

🙅 They answer with fear and formality

⚖️ The power balance has completely reversed

😳 They still do not know who he is

📖 Old power now belongs to someone else

## ✅ We Are True Men Thy Servants Are No Spies

The brothers insist they can be trusted.

"True men" is their defense against the spy charge.

It is an ironic claim.

These same true men have been living inside a lie for over twenty years.

They also volunteer family details Joseph never even asked for.

✅ True men is their claim to honesty

🎭 The claim is ironic given their past

🗣️ They volunteer family details freely

📖 Sincere words can still hide a lie

## 👨‍👦 Twelve Brethren The Sons Of One Man

The brothers describe their whole family without being asked.

Twelve sons all belong to one father back in Canaan.

Joseph needs exactly this kind of detail.

They hand it over freely, never suspecting who is listening.

👨‍👦 Twelve brothers, one father

🗣️ They give this detail unprompted

🎯 Joseph needs exactly this information

➡️ Their words are building their own trap

## 👶 The Youngest Is This Day With Our Father And One Is Not

Here is the information Joseph has been waiting to hear.

Benjamin is alive and still living at home.

"One is not" is their careful way of talking about Joseph.

They never say what actually happened to him.

They do not say we sold him.

The phrase is technically true and deeply dishonest at the same time.

👶 Benjamin is confirmed alive

🕯️ One is not avoids the real story

🤐 The brothers still will not confess

📖 A half truth can hide for decades

# Genesis 42:14-17
# 🧪 Joseph Sets The Test
---
## 🧪 Hereby Ye Shall Be Proved

"Proved" here means tested and shown to be true.

It does not mean simply believed on their word.

Joseph will not accept their claims at face value.

He wants real evidence before he trusts them.

🧪 Proved means tested, not just claimed

🔎 Joseph wants evidence, not words

🎯 He is watching who they have become

➡️ He states the exact proof he needs

## 👑 By The Life Of Pharaoh

This phrase is a solemn Egyptian oath.

It works like swearing as surely as Pharaoh lives.

Joseph invokes Pharaoh's own life as a guarantee of his words.

Egypt treated an oath like this as fully binding.

👑 The oath invokes Pharaoh's life

🤝 It functions like a binding vow

🏛️ Egypt treated this kind of oath seriously

📖 Joseph speaks with full royal authority

## 📍 Except Your Youngest Brother Come Hither

"Hither" is an old word for to this place.

Joseph demands that Benjamin be brought here, to Egypt, to him.

This single demand reaches straight into the wound Jacob has guarded for years.

The old sin cannot be solved from a distance.

It has to be faced at the very place it happened.

📍 Hither means to this place

🎯 The demand targets Jacob's deepest fear

🕳️ Old sin cannot be solved from far away

➡️ Everything now waits on Benjamin's arrival

## 🔒 He Put Them All Together Into Ward Three Days

"Ward" is an old word for a guarded holding cell.

Joseph places all ten brothers there together.

For three days they wait, not knowing what will happen.

That fear is a small, forced taste of what they once did to Joseph.

He once waited alone with no one coming to save him.

🔒 Ward means a guarded holding cell

📅 Three days of waiting in fear

⛓️ Joseph once felt this same fear alone

📖 They now taste what they once gave him

# Genesis 42:18-20
# 🙏 Joseph Changes The Terms
---
## ✅ This Do And Live For I Fear God

On the third day, Joseph softens his terms.

He grounds the change in one striking line, I fear God.

That single line reveals a real limit on Joseph's power.

He could imprison, punish, or ruin these men without any consequence.

Instead his authority answers to something higher than his own anger.

✅ Joseph offers a way for them to live

🙏 I fear God limits his own power

📖 His authority answers to God, not to anger

➡️ He lays out the plan going forward

## ⛓️ Let One Of Your Brethren Be Bound

Simeon is later named as the brother left behind.

He is bound as a guarantee that the rest will return.

This keeps the test alive even after the brothers leave Egypt.

The story does not end the moment they walk out the gate.

⛓️ Simeon is bound as a guarantee

🚪 The test follows them home

📖 A promise is proven by keeping it

➡️ Their loyalty to Simeon is now tested

## ✅ So Shall Your Words Be Verified

"Verified" means proven true, not simply claimed.

Everything hinges on whether the brothers bring Benjamin back.

Their honesty will not be confirmed by an argument.

It will be confirmed only by what they actually do.

✅ Verified means proven true, not just claimed

🎯 Bringing Benjamin is the one proof required

📖 Actions confirm honesty, not words alone

➡️ Their guilt is about to break open

# Genesis 42:21-24
# 💔 The Brothers Remember Their Guilt
---
## 😖 We Saw The Anguish Of His Soul When He Besought Us

"Besought" is the old past tense of beseech, meaning to beg.

Genesis thirty seven never told readers this detail.

Joseph did not go quietly into that pit.

He begged his brothers, and they refused to listen.

That memory has stayed silent for over twenty years.

😖 Besought means begged or pleaded

💔 Joseph pleaded and was ignored

⏳ Guilt stayed silent twenty years

📖 This detail was hidden until now

## ⚖️ We Are Verily Guilty

"Verily" is an old word for truly or certainly.

It is an emphatic way of admitting there is no more denying it.

The brothers finally connect their present fear to their past sin.

This does not mean every hardship is direct punishment.

Their own conscience is simply naming an old wrong out loud.

⚖️ Verily means truly or certainly

🔦 Their conscience finally names the old sin

🚫 Not every hardship is direct punishment

📖 Buried guilt tends to surface eventually

## 🩸 His Blood Is Required

Reuben reminds his brothers that he warned them years earlier.

He had told them not to sin against the child.

They refused to listen even then.

"His blood is required" treats Joseph as if he were already dead.

It means someone still owes an answer for what was done.

🗣️ Reuben says he warned them first

🩸 Blood is required means someone must answer

⏳ Reuben has carried this guilt longest

📖 A buried wrong still demands an answer

## 🗣️ He Spake Unto Them By An Interpreter

The brothers assume an interpreter is the only bridge between them and Joseph.

They do not know Joseph understands every word without needing it translated.

That means Joseph hears their full confession in their own voice.

No one prompted it out of them.

He then turns away and weeps in private.

🗣️ They do not know Joseph understands them

😭 Joseph overhears their confession firsthand

😢 He turns away and weeps alone

📖 His pain runs deeper than his power

## ⛓️ Took From Them Simeon And Bound Him Before Their Eyes

Joseph composes himself and returns to them.

He has Simeon bound in full view of all the brothers.

The moment is deliberately visible, so no one can miss what is at stake.

The brothers will travel home with grain, but not with Simeon.

⛓️ Simeon is bound in plain sight

👀 The moment is made deliberately visible

🌾 They leave with grain but not with Simeon

➡️ The family must decide about Simeon

# Genesis 42:25-28
# 💰 Money In The Sacks
---
## 🌾 Restore Every Man's Money Into His Sack

Joseph gives three commands at once.

Fill every sack with grain.

Secretly return every man's silver.

Give them provision, meaning supplies, for the journey home.

Joseph has total power to punish these men.

Instead he quietly feeds them and pays for grain they think they bought.

🌾 Joseph fills their sacks with grain

🤲 He secretly returns their money

🎁 He supplies the journey home too

📖 Mercy is hidden inside the test

## 🐴 They Laded Their Asses With The Corn And Departed Thence

"Laded" means loaded.

"Asses" are donkeys, the standard pack animal of the time.

"Thence" is an old word for from that place.

This ordinary travel detail sets up a discovery no one expects.

🐴 Laded means loaded

🫏 Asses means donkeys

📍 Thence means from that place

➡️ A surprising discovery is coming soon

## 👀 He Espied His Money

At a stop for the night, one brother opens his sack.

He means only to give his donkey provender, an old word for feed.

Instead he espies, meaning suddenly spots, his silver sitting in the sack.

The find should feel like good news.

🐴 Provender means animal feed

👀 Espied means suddenly spotted

💰 His silver was never actually spent

📖 A gift can still feel like danger

## 😨 Their Heart Failed Them

"Their heart failed them" is an old way of saying their courage collapsed.

They do not feel relief.

They feel terror.

They ask each other what God has done to them.

A guilty conscience often cannot receive an unexplained gift as kindness.

😨 Their courage collapses instead of celebrating

❓ They ask what God has done to them

🚫 Guilt cannot recognize grace easily

📖 Fear can misread a gift as danger

# Genesis 42:29-34
# 📢 The Brothers Report To Jacob
---
## 🏠 Told Him All That Befell Unto Them

The brothers return to Canaan and report everything to Jacob.

They describe the accusation, the imprisonment, and Simeon left behind.

They describe the demand for Benjamin too.

The old wound around Joseph is now forced back into the open.

🏠 The full report reaches Jacob

⛓️ Simeon's detainment is part of it

👶 So is the demand for Benjamin

📖 Old pain is now unavoidable

## 🗣️ The Man Who Is The Lord Of The Land

To the brothers, Joseph is only ever the man, the lord of the land.

They describe a powerful, unnamed Egyptian official.

The irony is heavy for any reader who already knows the truth.

The ruler they fear is the very brother they sold into slavery.

None of them realize it.

🗣️ They only know him by title

🎭 The reader knows what they do not

😳 Their ruler is their own brother

➡️ They repeat his exact demand next

## 🔒 Leave One Of Your Brethren Here With Me

The brothers repeat Joseph's condition back to their father.

One brother stays as proof, the rest carry food home.

Every detail matches what Joseph actually said.

The retelling leaves out one truth.

🔒 One brother stays as proof

🌾 The rest carry food home

🤐 The retelling leaves out one truth

📖 That hidden truth still waits to be told

## 🔓 Ye Shall Traffick In The Land

"Traffick" is an old word for trading or doing business.

It has nothing to do with modern road traffic.

Joseph's promise is simple, prove yourselves honest and bring Benjamin.

Simeon comes home and the family can trade freely during the famine.

The whole family's access to food now depends on a single choice.

🔓 Traffick means trade or business

🎯 Simeon's release depends on Benjamin

🌾 Food access depends on the same choice

➡️ Everything now waits on Jacob's answer

# Genesis 42:35-38
# 😢 Jacob Refuses To Send Benjamin
---
## 💰 Every Man's Bundle Of Money Was In His Sack

As the brothers empty their sacks in front of Jacob, every man's money appears again.

Fear now spreads from the brothers to their father.

What Joseph meant as hidden mercy lands on this family as unexplainable dread.

Unresolved guilt shapes how a family reads even good news.

💰 The money appears again in front of Jacob

😨 Fear now spreads to the whole family

🎁 Hidden mercy reads as a threat

📖 Guilt distorts how good news is read

## 💔 Me Have Ye Bereaved Of My Children

"Bereaved" means robbed of by loss or death.

Jacob speaks like a man stacking one grief on top of another.

Joseph gone, Simeon detained, and now Benjamin being asked for too.

In his mind he has already lost two sons.

He is now being asked to risk a third.

The brothers know the full truth and still say nothing.

💔 Bereaved means robbed by loss

😔 Jacob is grieving three losses at once

🤐 The brothers still will not confess

📖 A hidden lie can outlast decades

## ⚫ All These Things Are Against Me

From where Jacob stands, everything really does look stacked against him.

He has no way to know that Joseph is alive.

He has no way to know Joseph is actively saving this family.

This line is one of the most human moments in Genesis.

It shows the gap between what a person can see and what God is doing.

⚫ Jacob believes he has lost everything

🙏 Joseph is alive and saving them all

👁️ Jacob cannot see what God is doing

📖 A rescue can look like disaster up close

## 👦 Slay My Two Sons If I Bring Him Not To Thee

Reuben offers something extreme and almost reckless.

He offers to sacrifice his own two sons if he fails to bring Benjamin home.

The offer is meant to prove his sincerity.

It is really a promise built on more grief, not less.

Adding future losses cannot undo the fear of losing another son now.

👦 Reuben offers his own sons as a pledge

💔 The offer only adds more potential grief

🚫 It does not solve Jacob's real fear

📖 Sincerity is not the same as wisdom

## ⚰️ Then Shall Ye Bring Down My Gray Hairs With Sorrow To The Grave

Jacob refuses outright to let Benjamin go.

"His brother is dead" shows how fully Jacob believes the old lie.

That lie could be corrected right now by the sons standing in front of him.

"Gray hairs to the grave" is an old idiom.

It means one more loss would be the grief that finally kills him in old age.

🚫 Jacob refuses to risk Benjamin

⚰️ An old idiom for dying of grief

🤐 The truth could be told, but is not

📖 The family stays caught between need and silence
`.trim();

export const GENESIS_FORTY_TWO_PERSONAL_SECTIONS = parseGenesisFortyTwoRawNotes(GENESIS_FORTY_TWO_RAW_NOTES);
