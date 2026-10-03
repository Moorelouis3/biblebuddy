export type EzekielThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielThirtyEightRawNotes(rawText: string): EzekielThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 38:${startVerse}` : `Ezekiel 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Ezekiel 38 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_THIRTY_EIGHT_RAW_NOTES = `# Ezekiel 38:1-6
# ⚔️ God Sets His Face Against Gog
---
## ⚔️ Set Thy Face Against Gog

"Set thy face against" means to turn and speak judgment directly at someone.

Ezekiel uses this phrase to open several of his harshest prophecies.

Gog is a ruler introduced here for the first time in the whole Bible.

God is not reacting to Gog, He is naming him before anything happens.

⚔️ Set thy face means speak judgment directly

📜 Ezekiel opens his harshest messages this way

👤 Gog appears here for the first time

📖 God names him before anything even happens

## 🗺️ The Land Of Magog

Magog was a son of Japheth, named in the family list in Genesis.

His descendants settled in lands north of Israel, likely near the Black Sea.

By Ezekiel's day, Magog stood for a distant, little known people on the edge of the map.

Gog rules a land the original readers only knew by vague reputation.

👤 Magog was a son of Japheth

🗺️ His people settled north of Israel

🌫️ Magog meant a distant little known land

📖 Gog rules from the edge of the map

## 🏔️ The Chief Prince Of Meshech And Tubal

Meshech and Tubal were also named as sons of Japheth in Genesis.

Ancient records place both peoples in Asia Minor, now called Turkey.

"Chief prince" marks Gog as the ruler over this combined territory.

The original readers knew these as real trading peoples, not a myth.

👤 Meshech and Tubal were Japheth's sons

🗺️ Both sat in ancient Asia Minor

👑 Chief prince means ruler over both

📖 These were known real trading peoples

## 👆 Behold, I Am Against Thee

This exact phrase appears many times across Ezekiel's judgment oracles.

It announces that God Himself, not just circumstance, now opposes someone.

Gog's army will not matter once God takes this stance against him.

No army is strong enough to stand against this kind of opposition.

🗣️ This phrase repeats through Ezekiel's judgments

👆 It means God Himself now opposes him

💪 Gog's army cannot outweigh this opposition

📖 No army stands against God's stance

## 🪝 Turn Thee Back, And Put Hooks Into Thy Jaws

Hooks in the jaws were used to drag a captured animal wherever its captor wanted.

The picture turns Gog from a feared invader into a controlled, led creature.

Even Gog's own plan to attack is actually God pulling him into place.

Gog believes he is choosing to march, but God is the one steering him.

🪝 Hooks dragged captured animals by force

🐂 Gog becomes a led controlled creature

🧭 God steers the very attack Gog plans

📖 Gog thinks he chooses, God actually leads

## 💪 All Sorts Of Armour, Even A Great Company

This verse piles up military detail on purpose: horses, horsemen, armour, a great company.

The buildup reads like an unstoppable force on paper.

Ezekiel's first readers would have pictured the largest army they could imagine.

The size of the army only exists to set up how small it looks against God.

🐎 Horses, horsemen, and armour all listed

💪 The buildup reads as an unstoppable force

🧠 Readers would imagine the largest army possible

📖 Its size only sets up God's power

## 🧭 Persia, Ethiopia, And Libya With Them

Persia lay far to the east, in what is now Iran.

Ethiopia here translates Cush, the region south of Egypt.

Libya here translates Put, a land west of Egypt in North Africa.

Gog's coalition pulls in nations from every direction around Israel.

🧭 Persia sat far to Israel's east

🌍 Ethiopia here means Cush, south of Egypt

🏜️ Libya here means Put, west of Egypt

📖 This coalition surrounds Israel from everywhere

## ⚔️ Gomer, And All His Bands

Gomer was another son of Japheth, named alongside Magog and Meshech.

History links his descendants to the Cimmerians, a people from north of the Black Sea.

These raiders were known for pushing south into Asia Minor in real historical invasions.

A people history already remembered as invaders now joins Gog's army.

👤 Gomer was another son of Japheth

🗺️ History links him to the Cimmerians

⚔️ The Cimmerians were known real invaders

📖 A known invading people joins Gog's force

## 🧭 The House Of Togarmah Of The North Quarters

Togarmah was Gomer's son, making him Japheth's grandson in the same family list.

His descendants are usually placed in Armenia or eastern Asia Minor.

"North quarters" matters because invasions against Israel in prophecy regularly come from the north.

Even the geography of this army fits a long standing prophetic pattern.

👤 Togarmah was Gomer's son, Japheth's grandson

🗺️ His people sat in Armenia's region

🧭 The north is prophecy's usual invasion direction

📖 This army fits a long standing pattern

# Ezekiel 38:7-9
# 🛡️ Be Thou Prepared
---
## 🛡️ Be Thou Prepared, And Prepare For Thyself

God tells Gog to arm himself, as if giving him the order directly.

This sounds backward, since Gog is the one about to attack God's people.

The command only makes sense once you remember God already controls the hooks in his jaws.

Gog's own preparation becomes part of a plan he does not actually control.

🛡️ God tells Gog to arm himself

🙃 This sounds backward for an attacker

🪝 God already controls him from verse four

📖 Gog's planning serves a plan not his own

## ⏳ After Many Days Thou Shalt Be Visited

This phrase points far ahead of Ezekiel's own lifetime.

"Visited" here means a time appointed for God to deal with someone directly.

The timing is deliberately left open, with no exact date pinned down.

This invasion was never meant to be solved by Ezekiel's first readers.

⏳ Many days means far in the future

📆 Visited means a time God appoints

❓ The exact timing is left open

📖 This was never meant for Ezekiel's readers alone

## 📆 In The Latter Years Thou Shalt Come

"Latter years" is a phrase prophets use for events still future to them.

It connects this invasion to a whole family of far off prophetic promises.

The phrase never gives a number or a century to count down.

Readers across history have each wondered if their own day was this one.

📆 Latter years means a still future time

🔗 It connects to other far off promises

❓ No number or century is given

📖 Many generations have wondered about their own day

## 🏠 The Land That Is Brought Back From The Sword

This describes a nation already gathered home after war and exile.

Ezekiel spent the chapters right before this one promising exactly this kind of return.

Gog's target is not a weak, forgotten people but a freshly restored one.

The very restoration promised earlier becomes the thing Gog notices.

🏠 This nation was already gathered home

📜 Earlier chapters promised this same return

🎯 Gog targets a freshly restored people

📖 Restoration itself draws Gog's attention

## 🏔️ The Mountains Of Israel, Which Have Been Always Waste

These mountains were the same ones named ruined and empty in the chapters just before this.

They have since been resettled, farmed, and filled with returning people.

Naming their old waste state highlights just how much has already changed.

What was once rubble is now valuable enough for an army to want it.

🏔️ These mountains were named waste before

🌱 They are now resettled and farmed

📈 Their change in value is the point

📖 Rubble becomes worth invading once restored

## 🕊️ Dwell Safely All Of Them

This phrase describes a people living without walls, weapons, or fear of attack.

That kind of peace was rare and precious in the ancient world.

Gog sees this safety not as something to respect but as an opportunity.

The very peace God provided becomes the reason Gog decides to move.

🕊️ This means living without fear of attack

💎 That kind of peace was rare then

👁️ Gog sees it as opportunity, not safety

📖 God's own gift draws the threat

## 🌩️ Thou Shalt Ascend And Come Like A Storm

A storm arrives suddenly and covers everything in its path at once.

The next line pictures Gog's army as a cloud covering the whole land.

Both pictures describe overwhelming numbers, not just one strong army.

The reader is meant to feel just how outmatched Israel looks on paper.

🌩️ A storm covers everything at once

☁️ A cloud repeats that same total coverage

📊 Both pictures describe overwhelming numbers

📖 Israel looks completely outmatched on paper

# Ezekiel 38:10-13
# 💰 An Evil Thought To Take A Spoil
---
## 🧠 Thou Shalt Think An Evil Thought

God reveals Gog's private motive before Gog ever acts on it.

Nothing in Gog's mind is hidden from God, even before the invasion starts.

The thought is plain and old: greed dressed up as opportunity.

God exposes the real reason behind an attack that will later claim higher purposes.

🧠 God reveals Gog's private motive first

👁️ Nothing in Gog's mind stays hidden

💰 The real motive is simple greed

📖 God exposes the true reason early

## 🏘️ The Land Of Unwalled Villages

Walls and gates were the normal ancient defense against raiders and armies.

A land of unwalled villages had no fortified cities for protection.

This matches the peaceful, restored Israel described earlier in the chapter.

Safety without walls looked to Gog like safety without any real defense.

🧱 Walls were the normal ancient defense

🏘️ Unwalled villages had no fortified cities

🕊️ This matches the restored peaceful Israel

📖 Safety without walls looked undefended to Gog

## 🚪 Neither Bars Nor Gates

Bars and gates were what closed and secured a city at night.

A city with neither one stood open day and night to anyone.

This detail stacks onto the unwalled villages to stress total vulnerability.

Israel's peace reads almost like an open invitation.

🚪 Bars and gates secured a city

🌙 Without them a city stayed open always

📈 This stacks onto the earlier vulnerability

📖 Openness itself drew the attack

## 💰 To Take A Spoil, And To Take A Prey

"Spoil" and "prey" are both words for plunder taken by force.

Repeating the idea twice stresses that this is a raid, not a conquest for land.

Gog does not come to rule Israel or settle there permanently.

He comes purely to take what other people built and leave.

💰 Spoil and prey both mean plunder

🔁 The repeat stresses pure raiding intent

🏠 Gog does not come to settle

📖 He comes only to take and leave

## 🏚️ The Desolate Places That Are Now Inhabited

This phrase again points back to Israel's return from exile.

Places once empty ruins are now lived in, farmed, and productive again.

Gog's target list specifically includes the proof of God's restoring work.

The very evidence of God's promise kept becomes what the invader wants.

🏚️ These places were once empty ruins

🌾 They are now lived in and farmed

🎯 Gog targets proof of God's restoration

📖 God's kept promise becomes Gog's target

## 🐪 Sheba, And Dedan, And The Merchants Of Tarshish

Sheba and Dedan were Arabian trading kingdoms, located in the southern Arabian peninsula.

Tarshish was a distant western trading port, often used in the Bible for the far edges of the known world.

These nations ask a question instead of joining the attack or stopping it.

Their only role here is to watch and wonder out loud about the plunder.

🐪 Sheba and Dedan were Arabian traders

⛵ Tarshish stood for the far west

❓ These nations only ask, not attack

📖 They simply watch and question the plunder

## 🦁 The Young Lions Thereof

"Young lions" is a title used elsewhere in the Bible for princes or leading men.

It does not describe actual animals accompanying the merchants.

Calling Tarshish's leaders young lions marks them as bold, powerful figures in their own right.

Even these powerful onlookers only question Gog, they never try to stop him.

🦁 Young lions means princes or leaders

👑 It marks bold powerful figures

❓ Even they only question, not act

📖 No human power moves to stop Gog

# Ezekiel 38:14-16
# ☁️ A Cloud To Cover The Land
---
## 👀 Shalt Thou Not Know It?

This question assumes Gog is watching Israel's peaceful, unguarded life closely.

God is saying Gog's invasion is not a surprise or an accident.

Gog sees the opportunity and chooses to act on it anyway.

Nothing about this attack catches God off guard, even Gog's own timing.

👀 Gog is clearly watching Israel's peace

🎯 This invasion is no surprise to God

🧠 Gog sees the chance and chooses it

📖 Even his timing stays inside God's plan

## 🧭 Out Of The North Parts

Israel's major historical invaders, Assyria and Babylon, both attacked from the north.

Armies traveled around the desert instead of crossing it directly.

That route forced invaders to approach Israel from the north.

A future threat still wears a very old, familiar shape.

🧭 Assyria and Babylon both came from the north

🏜️ Armies avoided the desert on their march

🔁 That route always led in from the north

📖 A future threat wears a familiar shape

## 📊 A Great Company, And A Mighty Army

This repeats the earlier description of overwhelming numbers one more time.

Ezekiel keeps stacking the size of this army across several verses on purpose.

A reader is meant to feel there is no human way to survive this.

The size of the threat only exists to make God's eventual response look bigger.

📊 The great numbers get repeated again

🔁 Ezekiel stacks this detail on purpose

😨 No human defense looks able to survive

📖 A huge threat sets up a huger response

## ⏳ It Shall Be In The Latter Days

This phrase places the whole event in a future period beyond Ezekiel's own time.

It connects this invasion to other far off promises throughout the prophets.

The text does not give an exact date or named century for this.

Readers across many later generations have each wondered if their own day was this one.

⏳ This points beyond Ezekiel's own lifetime

🔗 It connects to other far off promises

❓ No exact date is given here

📖 Many generations have wondered about their own day

## ✨ That The Heathen May Know Me, When I Shall Be Sanctified In Thee

This states the real reason God allows this invasion to happen at all.

"Sanctified" means shown to be holy, set apart, truly who He claims to be.

Gog's defeat will not just save Israel, it will prove something to every watching nation.

The whole terrifying buildup exists to answer one question: who God really is.

🌍 Nations beyond Israel are watching this

✨ Sanctified means shown to be truly holy

🎯 Gog's defeat proves this to everyone

📖 The buildup answers who God really is

# Ezekiel 38:17-19
# 🔥 The Fire Of My Wrath
---
## 🔗 Art Thou He Of Whom I Have Spoken In Old Time

God ties Gog back to warnings given through Israel's earlier prophets.

This was never a brand new threat invented for this one chapter.

The earlier prophecies are not named here, but the pattern of warning was already old.

Gog fulfills a danger God's people had already been told to expect.

🔗 This ties Gog to earlier prophets

🆕 The warning itself was never brand new

📜 Older prophecies are not named here

📖 Gog fulfills an old expected pattern

## 😠 My Fury Shall Come Up In My Face

The Bible often describes God's anger using human body language like this.

It does not mean God has a literal face or loses emotional control.

The picture communicates real, visible intensity in a way readers can feel.

This is not a mild or passing irritation at Gog's invasion.

😠 Scripture often pictures God's anger physically

🚫 This does not mean a literal face

💢 The image communicates real intensity

📖 This anger is not mild or passing

## 💍 In My Jealousy And In The Fire Of My Wrath

"Jealousy" in the Bible often describes God's protective loyalty toward His people.

It is closer to a husband defending his marriage than ordinary human envy.

"Fire" pictures wrath that burns completely instead of fading out quickly.

God's response comes from guarding what belongs to Him, not random rage.

💍 Jealousy here means protective loyalty

🚫 It is not ordinary human envy

🔥 Fire pictures wrath that burns completely

📖 This response guards what is God's

## 🌍 A Great Shaking In The Land Of Israel

This describes an earthquake or similar large scale natural disturbance.

Shaking ground was a common biblical sign that God Himself had stepped in directly.

The land itself reacts physically to what is about to happen within it.

Even creation responds when God moves this visibly into history.

🌍 This describes a large earthquake

⚡ Shaking often marked God stepping in

🏞️ The land reacts to what is coming

📖 Creation responds when God moves this visibly

# Ezekiel 38:20-23
# 🌍 Thus Will I Magnify Myself
---
## 🐟 The Fishes Of The Sea, And The Fowls Of The Heaven

This list moves through every category of living creature in order.

Fish, birds, land animals, and crawling things all respond the same way.

No corner of creation stays calm during this judgment.

The whole created order reacts, not just the armies involved.

🐟 Every category of creature is listed

🐦 Fish, birds, and crawling things all shake

🌍 No corner of creation stays calm

📖 All creation reacts, not only armies

## 🏔️ The Mountains Shall Be Thrown Down

Mountains represented permanence and stability throughout the ancient world.

Even these supposedly unmovable landmarks collapse under this judgment.

The next phrase repeats the same idea for human made walls.

Nothing built to last survives this moment untouched.

🏔️ Mountains symbolized permanence and stability

💥 Even mountains collapse under this judgment

🧱 Human walls fall the same way

📖 Nothing built to last stays untouched

## ⚔️ I Will Call For A Sword Against Him Throughout All My Mountains

God names the sword as something He Himself calls for, not just a human weapon.

The mountains are called God's own, underlining who the land truly belongs to.

Human weapons only move because God directs them to move.

Even the battle itself stays under God's direct command.

⚔️ God Himself calls for this sword

🏔️ The mountains are named as God's own

🧭 Human weapons move under God's direction

📖 The battle stays under God's command

## 😵 Every Man's Sword Shall Be Against His Brother

This describes the invading army turning on itself in total confusion.

The same kind of panic once scattered Gideon's enemies and Jonathan's enemies in earlier stories.

No outside army is needed to win if confusion does the work instead.

God defeats this army from the inside, not from without.

😵 The army turns on itself completely

🔁 This matches Gideon and Jonathan's old battles

🚫 No outside army is needed to win

📖 God defeats this army from within

## ⚖️ Plead Against Him With Pestilence And With Blood

"Plead" here means to bring a legal case or formal judgment against someone.

Pestilence means widespread disease, a judgment named often throughout the Old Testament.

"Blood" points to violent death on a massive scale.

God's case against Gog is carried out through both disease and open violence.

⚖️ Plead means bringing formal judgment

🦠 Pestilence means widespread disease

🩸 Blood points to violent massive death

📖 God's case plays out through both

## 🔥 Fire, And Brimstone

This exact pairing already appeared once before, raining down on Sodom and Gomorrah.

Using the same words on purpose links Gog's judgment to that earlier destruction.

Readers who knew the Sodom story would recognize this as the same kind of ending.

God repeats a known judgment instead of inventing a brand new one.

🔥 This phrase already described Sodom's fall

🔗 The same words link both judgments

📜 Readers would recognize the earlier story

📖 God repeats a known judgment here

## 📏 Thus Will I Magnify Myself, And Sanctify Myself

"Magnify" means to make great or show as great in the eyes of others.

"Sanctify" means to prove holy, set apart from every false god or human power.

God is not protecting His pride, He is revealing His true identity publicly.

This entire invasion exists to make that one identity unmistakable.

📏 Magnify means shown to be great

✨ Sanctify means proven holy and set apart

🎯 This reveals God's identity, not His pride

📖 The whole event makes God unmistakable

## 🔁 They Shall Know That I Am The LORD

This refrain has repeated across almost every chapter of Ezekiel so far.

Every judgment, every vision, and now every invasion points to this same purpose.

The nations watching Gog's defeat will walk away with this exact conclusion.

Ezekiel's entire book keeps circling back to one single, unmistakable point.

🔁 This refrain repeats through most of Ezekiel

🎯 Every vision points to this same purpose

👀 Watching nations reach this same conclusion

📖 The whole book circles back to this`.trim();

export const EZEKIEL_THIRTY_EIGHT_PERSONAL_SECTIONS = parseEzekielThirtyEightRawNotes(EZEKIEL_THIRTY_EIGHT_RAW_NOTES);
