export type JudgesSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesSixteenRawNotes(rawText: string): JudgesSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 16:${startVerse}` : `Judges 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Judges 16 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_SIXTEEN_RAW_NOTES = `# Judges 16:1-3
# 🚪 Carried Away The Gates
---
## 🏙️ Then Went Samson To Gaza

Gaza was one of the five major Philistine cities.

It sat about forty miles from Samson's home territory, deep in enemy land.

Judges thirteen already said Samson would begin to deliver Israel from the Philistines.

Walking straight into their territory alone was already a bold, risky move.

🗺️ Gaza was a chief Philistine city

📏 It sat far from Samson's home

⚔️ Samson was meant to fight Philistines

➡️ He walks straight into enemy land

## 👩 Saw There An Harlot

A harlot was a woman who sold sex for money.

This is not the first time Samson has crossed a moral line with a Philistine woman.

Chapter fourteen already showed his weakness for relationships built on attraction rather than wisdom.

The pattern that will destroy him in this chapter starts with this same old habit.

👩 Harlot means a woman paid for sex

🔁 This repeats Samson's pattern from chapter 14

💔 He keeps choosing desire over wisdom

➡️ The chapter's danger starts here

## ⏳ Laid Wait For Him All Night In The Gate Of The City

The men of Gaza plan a trap rather than attack Samson right away.

City gates were shut and guarded at night, so escape looked impossible.

They wait quietly instead of raising an alarm, confident they finally have him cornered.

Their patience shows how badly earlier encounters with Samson had already scared them.

🚪 The gate was the only way out

🤫 They wait quietly instead of attacking

😨 Past defeats made them cautious

➡️ They believe he is finally trapped

## 🌅 In The Morning, When It Is Day, We Shall Kill Him

The men of Gaza decide to wait until daylight to kill Samson.

Fighting a man with Samson's reputation in the dark felt too dangerous.

Their plan depends on him staying asleep and the locked gate holding through the night.

Both of those assumptions are about to fail completely.

🌙 They wait for daylight to attack

😱 Night fighting felt too risky

🔒 Their plan depends on the gate holding

➡️ Both assumptions are about to fail

## 🚪 Took The Doors Of The Gate Of The City, And The Two Posts

Ancient city gates were massive, built from heavy wood and often reinforced with metal.

The two posts were the thick frame the doors were hinged onto.

Samson does not sneak past the ambush, he rips out the entire entrance.

A gate built to stop armies could not stop one man.

🚪 City gates were massive and heavy

🪵 Posts were the thick door frame

💪 Samson tears out the whole entrance

📖 One man defeats what stops armies

## 🔒 Bar And All

The bar was a heavy beam that locked the gate shut from the inside.

Samson pulls it free along with everything else, leaving nothing behind to block his path.

He does this at midnight, while the ambush still waits for a morning that will never matter now.

The trap meant to hold him becomes something he simply carries away.

🔒 The bar was the locking beam

🌃 He acts in the middle of the night

🚶 Nothing is left to block his exit

➡️ The trap becomes worthless

## ⛰️ Carried Them Up To The Top Of An Hill That Is Before Hebron

Hebron sat about forty miles away, uphill and deep inside Israelite territory.

Carrying a stone and wood city gate that far is a superhuman feat of strength.

Hebron was also a city tied to Abraham, Isaac, and Jacob, a place of deep meaning for Israel.

Samson turns Gaza's own defenses into a public trophy planted in his own people's land.

📏 Hebron was about forty miles away

💪 Carrying the gate that far is superhuman

🏛️ Hebron held deep meaning for Israel

📖 Gaza's defenses become Samson's trophy

# Judges 16:4-6
# 💰 Delilah In The Valley Of Sorek
---
## 💕 He Loved A Woman In The Valley Of Sorek

The valley of Sorek sat on the border between Israelite and Philistine land.

Unlike his first two Philistine relationships, the text never says Samson married Delilah.

The location itself hints at a relationship caught between two worlds and two loyalties.

This is the third woman in Samson's story tied to the Philistines, not the first.

🗺️ Sorek sat on the border region

💍 The Bible never calls this a marriage

⚖️ The valley pictures divided loyalty

➡️ This is Samson's third Philistine woman

## 📛 Whose Name Was Delilah

Delilah's name likely comes from a Hebrew root meaning to weaken or to hang low.

Whether or not the name was chosen on purpose, it fits exactly what she does in this chapter.

Unlike Samson's wife in chapter fourteen, nothing here says Delilah was ever afraid of him.

She negotiates with the Philistines as an equal partner, not a frightened bystander.

📛 Delilah's name may mean weaken

🎯 The meaning fits her role exactly

😐 She shows no fear of Samson

➡️ She negotiates as a willing partner

## 👑 The Lords Of The Philistines Came Up Unto Her

The lords were the five rulers, one over each major Philistine city.

All five come to Delilah together, showing how seriously they take this chance.

They learned from earlier failures that force alone could not stop Samson.

This time they try secrecy and betrayal instead of open confrontation.

👑 Lords means the five Philistine rulers

🤝 All five act together this time

💪 Force already failed against Samson

➡️ They switch to secrecy instead

## 🗣️ Entice Him, And See Wherein His Great Strength Lieth

Entice means to lure or persuade someone through charm or flattery.

The Philistines already suspect Samson's strength has some hidden explanation.

They want Delilah to use their relationship to pull out his secret bit by bit.

Turning private trust into a weapon is exactly what happens over the next several verses.

💬 Entice means to lure or persuade

🔍 The Philistines suspect a hidden cause

🎯 They want Delilah to extract it

➡️ Trust becomes the weapon here

## 🪙 Eleven Hundred Pieces Of Silver

This amount was offered by each of the five Philistine lords, not shared once total.

That adds up to fifty five hundred pieces of silver, an enormous fortune for the time.

The size of the offer shows how badly the Philistines feared Samson.

Delilah's motive from this point on is stated plainly, and it is money.

🪙 Each lord offers eleven hundred pieces

💰 The total is a huge fortune

😨 The size shows their fear of Samson

➡️ Money becomes Delilah's motive

## ❓ Delilah Said To Samson, Tell Me, I Pray Thee, Wherein Thy Great Strength Lieth

Delilah asks Samson the exact question the Philistine lords paid her to ask.

She frames it as simple curiosity, not a plot against him.

Samson does not walk away or grow suspicious even though the question is oddly specific.

The next several verses become a repeating cycle of this same question asked and dodged.

❓ Delilah repeats the lords' exact question

🎭 She frames it as innocent curiosity

😶 Samson stays even though it is odd

➡️ A repeating cycle begins here

# Judges 16:7-9
# 🌿 Seven Green Withs
---
## 🌿 Seven Green Withs That Were Never Dried

A with was a flexible branch or vine used like a rope to tie things together.

Green here means freshly cut, still full of moisture and easy to bend.

Samson gives Delilah a false answer instead of walking away from her question.

He is testing how far she will actually go, not confessing a real weakness yet.

🌿 Withs were flexible branches used as rope

💧 Green means freshly cut and moist

🎭 Samson gives a false answer

➡️ He is testing Delilah, not confessing

## 😴 Weak, And Be As Another Man

Samson claims these particular ropes would strip away his supernatural strength.

The phrase as another man means ordinary, with no unusual power at all.

He is describing exactly what will happen later in the chapter, just attached to the wrong cause.

The real answer he is protecting is his uncut hair and the vow behind it.

😴 He claims the withs would weaken him

👤 As another man means ordinary

🎯 This previews the real ending

📖 His true secret stays hidden

## 🕵️ Men Lying In Wait, Abiding With Her In The Chamber

Delilah hides Philistine men in the room before Samson even arrives.

Chamber means a private bedroom, meant to be a place of safety and trust.

The betrayal is planned and physically staged, not a spur of the moment trick.

Samson is in real danger the entire time, even during what looks like an ordinary visit.

🕵️ Men hide in the room in advance

🛏️ Chamber means a private bedroom

📋 The betrayal is fully planned

➡️ Danger hides inside a trusted space

## 🔥 Brake The Withs, As A Thread Of Tow Is Broken When It Toucheth The Fire

Tow is the loose, weak fiber left over from processing flax or hemp.

That fiber snaps instantly and completely the moment it meets fire.

The comparison shows how easy the withs are for Samson to break.

Whatever his real strength depends on, it clearly has nothing to do with rope.

🧵 Tow means weak leftover fiber

🔥 Fire snaps it instantly

💪 Samson breaks the withs just as easily

📖 Rope was never the real answer

## 🤐 So His Strength Was Not Known

Delilah's first attempt to expose Samson's secret fails completely.

The narrator states plainly that the real source of his power is still hidden.

Nothing about this failure teaches Delilah to stop or teaches Samson to leave.

The same dangerous pattern is about to repeat two more times.

❌ The first attempt fails

🤫 The real secret stays hidden

🔁 Neither of them changes course

➡️ The same pattern repeats again

# Judges 16:10-12
# 🪢 New Ropes That Never Were Occupied
---
## 😤 Thou Hast Mocked Me, And Told Me Lies

Delilah confronts Samson directly after his first lie fails.

Mocked here means tricked or made a fool of, not laughed at.

She does not hide her anger, which makes her request sound even more sincere.

Samson answers her again anyway, continuing the exact pattern that keeps putting him in danger.

😤 Mocked means tricked or fooled

🎭 Her anger makes the request feel real

🔁 Samson answers again anyway

➡️ The dangerous pattern continues

## 🪢 New Ropes That Never Were Occupied

Occupied is an old word meaning used.

Samson claims brand new, never used rope would be strong enough to hold him.

This is his second false answer, slightly different from the first but built the same way.

He keeps offering plausible sounding lies instead of ending the conversation.

🪢 Occupied means previously used

🆕 He claims new rope would work

🔁 This is his second false answer

➡️ He keeps talking instead of leaving

## 🕵️ Liers In Wait Abiding In The Chamber

The ambush from the first attempt repeats exactly, hidden men waiting in the same room.

Samson either does not notice them again or does not think it matters.

Delilah repeats her exact warning cry from before, word for word.

The repetition shows how confident she has become that this cycle will keep working.

🕵️ Hidden men wait again

😶 Samson misses or ignores the danger

🗣️ Delilah repeats her warning cry

➡️ Her confidence in the plan grows

## 💪 He Brake Them From Off His Arms Like A Thread

Rope strong enough to bind oxen or ships snaps on Samson like weak string.

The comparison to a simple thread shows just how far off Delilah's second guess still is.

Two failed attempts have taught the Philistines nothing new about the actual secret.

Delilah, though, is clearly not giving up on getting an answer.

🪢 Strong rope snaps like a thread

❌ Delilah's second guess also fails

🤷 The Philistines learn nothing real

➡️ Delilah keeps pushing for the truth

# Judges 16:13-14
# 🧵 The Web And The Pin
---
## 📖 Hitherto Thou Hast Mocked Me, And Told Me Lies

Hitherto means up to this point, marking exactly how many times Samson has lied to her.

This is the third time Delilah calls out the pattern openly instead of pretending she does not notice.

Her repeated confrontations show growing frustration, not growing suspicion of Samson's honesty.

The cycle of lie, test, and failure is about to complete one final time.

📖 Hitherto means up to this point

🔢 This marks the third confirmed lie

😤 Her frustration grows each time

➡️ One final cycle is coming

## 🧶 Weavest The Seven Locks Of My Head With The Web

A web here refers to the cloth being woven on a loom, not a spider's web.

Samson's third lie finally involves his actual hair, though still not the real reason it matters.

Seven locks likely means seven braided sections of his uncut hair.

He is edging closer to the truth without giving away the vow underneath it.

🧵 Web means cloth on a loom

💇 His third lie finally involves hair

🔢 Seven locks means seven braids

➡️ He edges closer to the real secret

## 📌 Fastened It With The Pin

The pin was the wooden peg used to secure threads on a hand loom.

Delilah weaves Samson's hair right into the fabric while he sleeps.

She then drives the peg into the loom's frame to lock the hair in place.

Once again she stages the trap fully before waking him with her usual warning.

📌 Pin means the loom's securing peg

😴 She weaves his hair while he sleeps

🔒 The peg locks the hair in place

➡️ She wakes him with her usual warning

## 🚶 Awaked Out Of His Sleep, And Went Away With The Pin Of The Beam, And With The Web

Samson stands up and simply walks off, loom parts and all, still attached to his hair.

The beam was the wooden frame the entire loom was built around.

A whole piece of household equipment tears apart before his hair does.

Three lies in and Delilah still has not touched the real answer.

🚶 Samson walks off with the loom attached

🪵 Beam means the loom's wooden frame

💪 Equipment breaks before his hair does

📖 The real secret is still safe

# Judges 16:15-17
# 💔 He Told Her All His Heart
---
## 💔 How Canst Thou Say, I Love Thee

Delilah turns the pressure emotional instead of just asking again.

She questions Samson's love for her as proof that he is hiding something from her.

This is manipulation, using affection as a weapon rather than honest concern.

It works exactly the way she intends it to.

💔 Delilah questions his love for her

🎯 She uses guilt as a weapon

🗣️ This is emotional manipulation

➡️ Her tactic works on Samson

## 📆 Pressed Him Daily With Her Words, And Urged Him

This was not a single conversation but a daily, repeated pressure campaign.

Urged means she kept pushing, refusing to let the subject drop.

Three failed lies already show Samson had chances to walk away and did not.

Constant pressure eventually wears down even a man of Samson's legendary strength.

📆 She pressures him every single day

🗣️ Urged means constant, repeated pushing

🚶 Samson had chances to leave, and stayed

➡️ Constant pressure eventually wears him down

## 😣 His Soul Was Vexed Unto Death

Vexed means deeply troubled or worn down, not simply annoyed.

Unto death is a strong exaggeration meaning he could no longer stand the pressure.

The strongest man in the story is defeated first by words, before any weapon touches him.

His real weakness was never physical, it was his inability to walk away from Delilah.

😣 Vexed means deeply worn down

💀 Unto death means unbearable pressure

🗣️ Words defeat him before any weapon

📖 His real weakness was staying with her

## 🪒 There Hath Not Come A Razor Upon Mine Head

Samson finally tells the truth after three false answers and constant pressure.

An uncut razor was the outward sign of a specific vow, not the actual source of power.

Judges thirteen already explained this vow before Samson was even born.

He is finally handing Delilah the one true key to defeating him.

🪒 Uncut hair was the vow's outward sign

📜 Chapter thirteen already explained the vow

🗝️ Samson hands over the real key

➡️ The truth comes out at last

## 🕊️ I Have Been A Nazarite Unto God From My Mother's Womb

A Nazarite was someone set apart for God under a special vow, sometimes for life.

Samson's Nazarite status began before birth, announced to his parents by an angel.

The vow included avoiding wine, avoiding contact with the dead, and never cutting the hair.

His entire life, strength included, was tied to a promise he did not make for himself.

🕊️ Nazarite means set apart for God

👶 His vow began before he was born

📖 It included never cutting his hair

➡️ His strength was tied to a promise

## ✂️ If I Be Shaven, Then My Strength Will Go From Me

Samson states plainly that cutting his hair would end his supernatural strength.

The hair itself was never magic, it was the visible sign of his devotion to God.

Breaking the vow was really the problem, the haircut was just the outward act.

Delilah now finally has everything she needs to end this.

✂️ Shaven means his hair cut off

🕊️ Hair was a sign, not the source

💔 Breaking the vow was the real issue

➡️ Delilah now has what she needs

# Judges 16:18-20
# 😴 She Made Him Sleep Upon Her Knees
---
## 🗣️ He Hath Shewed Me All His Heart

Shewed is an old spelling of showed.

Delilah wastes no time once she gets the real answer, sending word to the Philistine lords immediately.

Her message confirms this attempt is different from the first three failed tries.

The betrayal she has been building toward is now only hours away.

🗣️ Shewed is an old spelling of showed

⚡ She acts immediately on the truth

✅ This confirms it is not another lie

➡️ The betrayal is hours away now

## 👑 Brought Money In Their Hand

The Philistine lords come in person this time instead of sending someone else.

Bringing the promised silver themselves shows how confident they are that this attempt will finally work.

The payment from earlier in the chapter is about to actually change hands.

Delilah's motive from verse five is now paid out in full.

👑 The lords come in person this time

💰 Bringing money shows their confidence

🪙 The earlier bribe is finally paid

📖 Delilah's motive is fully confirmed

## 😴 She Made Him Sleep Upon Her Knees

This detail pictures Samson resting in a position of complete trust and comfort.

The same closeness that made their relationship feel real is used to set up his downfall.

He falls asleep in the middle of the very danger he chose to stay near.

Betrayal here does not come through force, it comes through intimacy.

😴 Samson sleeps in total trust

💔 Closeness becomes the setup

⚠️ Danger hides inside comfort

📖 Betrayal comes through intimacy

## ✂️ Caused Him To Shave Off The Seven Locks Of His Head

Delilah does not do the shaving herself, she calls in someone else to do it.

The seven locks from verse thirteen are the same braids she tried and failed to trap before.

This time the vow itself is actually broken, not just tested with rope or thread.

The single condition guarding Samson's strength his entire life is finally violated.

✂️ Someone else does the actual shaving

🔢 The same seven locks from verse 13

📜 The vow itself is finally broken

➡️ Samson's one condition is violated

## 💪 His Strength Went From Him

The narrator states plainly and immediately that Samson's power is gone.

There is no dramatic buildup here, just a sudden, total loss.

Everything that made him unstoppable through fifteen chapters disappears in one sentence.

The turning point of his entire story happens almost silently.

💪 His strength disappears immediately

⚡ There is no dramatic buildup

📉 Years of power end in one sentence

📖 The turning point happens quietly

## 🚨 He Wist Not That The LORD Was Departed From Him

Wist is an old word meaning knew.

Samson wakes up expecting the same easy strength he has always had.

The real tragedy is not the missing hair.

God's presence has left him and he does not realize it.

He is about to find out the hard way that his power was never really about hair at all.

🧠 Wist means knew

😴 Samson expects his usual strength

💔 God's presence has actually left

➡️ He is about to learn the truth painfully

# Judges 16:21-22
# 👁️ Put Out His Eyes
---
## 👁️ The Philistines Took Him, And Put Out His Eyes

Blinding a defeated enemy was a known practice in the ancient world, meant to humiliate as much as to disable.

Samson's eyes were the same eyes that first led him toward Philistine women back in chapter fourteen.

Losing them ends any way for him to see or fight back on his own.

The very thing that first got him into trouble is what the Philistines take from him last.

👁️ Blinding was meant to humiliate captives

😔 His eyes led him into trouble before

🚫 He can no longer see or fight

📖 A fitting, painful kind of justice

## ⛓️ Bound Him With Fetters Of Brass

Fetters were shackles used to restrain a prisoner's hands or feet.

Brass fetters were heavier and stronger than the rope and cords that failed earlier in the chapter.

This time there is no secret trick left for Samson to hide, since his strength is already gone.

The Philistines finally have him exactly where three earlier attempts could not put him.

⛓️ Fetters means prisoner shackles

🔩 Brass was stronger than earlier ropes

❌ No hidden trick is left this time

➡️ The Philistines finally succeed

## ⚙️ He Did Grind In The Prison House

Grinding grain by hand mill was normally work given to slaves or animals.

A judge of Israel, once feared by armies, is reduced to the lowest form of forced labor.

This detail marks the complete bottom of Samson's fall from strength and freedom.

Every part of his old life, sight, strength, and status, is gone at once.

⚙️ Grinding was normally slave or animal labor

📉 A former judge does the lowest work

🕳️ This marks his complete downfall

📖 Sight, strength, and status are all gone

## 🌱 The Hair Of His Head Began To Grow Again

Howbeit at the start of this verse signals a quiet but important turn in the story.

The narrator makes a point of mentioning this small detail even in the middle of Samson's lowest moment.

Growing hair does not restore his eyes or his freedom, but it hints that his story is not fully finished.

A small, easy to miss detail is about to matter enormously.

🔄 Howbeit signals a quiet turn

🌱 His hair quietly starts growing back

👁️ His eyes and freedom are still gone

➡️ A small detail sets up what is next

# Judges 16:23-25
# 🐟 A Great Sacrifice Unto Dagon
---
## 🐟 A Great Sacrifice Unto Dagon Their God

Dagon was a major Philistine god, often connected to grain and agriculture.

The Philistines credit Dagon, not luck or cleverness, for finally capturing Samson.

To them this is a religious victory, proof their god is stronger than Israel's God.

The stage is set for a direct contest between Dagon and the God Samson serves.

🐟 Dagon was a major Philistine god

🙏 They credit Dagon for the capture

⚔️ They see this as a religious victory

➡️ A contest between gods is set up

## 🙌 Our God Hath Delivered Samson Our Enemy Into Our Hand

The Philistines speak with open, public confidence that their god has won.

This is the same phrase the Bible often uses for Israel's own victories.

Here it gets flipped onto the other side.

Their celebration is loud and religious, not private or quiet.

Confident words like these often come right before a dramatic reversal in scripture.

🙌 They openly credit their god's victory

🔁 The same phrase usually favors Israel

📣 Their celebration is loud and public

➡️ Confidence like this often flips fast

## 🙌 When The People Saw Him, They Praised Their God

Verse twenty four repeats the same celebration from verse twenty three.

This time it comes from the ordinary crowd, not just the leaders.

The whole nation, not just the religious leaders, joins in crediting Dagon for the victory.

Public praise like this multiplies the humiliation the Philistines plan for Samson.

The larger the celebration grows, the larger the coming collapse will be.

🙌 The whole crowd joins the celebration

🐟 They credit Dagon along with their leaders

📈 Public praise deepens Samson's humiliation

➡️ A bigger celebration means a bigger collapse

## 😡 The Destroyer Of Our Country, Which Slew Many Of Us

This line reminds the reader just how much damage Samson caused earlier in the chapter and the one before it.

Burned fields, a thousand men killed with a jawbone, and a stolen city gate are all still fresh memories.

The Philistines are not celebrating a minor capture, they are celebrating the end of a genuine national threat.

Their joy makes sense given everything Samson has already done to them.

🔥 They remember his earlier destruction

🦴 A thousand men once fell to him

🎉 This feels like a major victory to them

📖 Their joy is understandable given the history

## 🎉 Call For Samson, That He May Make Us Sport

Sport here means entertainment, treating Samson like a form of public mockery.

A blind, chained former judge is brought out to be laughed at by a crowd.

Humiliation, not just captivity, becomes part of the celebration.

This decision to bring him out into the open is about to cost them everything.

🎭 Sport means public entertainment

😢 Samson is brought out to be mocked

💔 Humiliation becomes part of the party

➡️ This choice will cost them everything

# Judges 16:26-27
# 🏛️ Between The Pillars
---
## 🖐️ Suffer Me That I May Feel The Pillars

Suffer here means allow, the same old usage seen earlier in the chapter.

Samson asks a young servant boy to guide his blind hands to the pillars.

He frames the request as simple, needing to lean and rest, nothing suspicious.

No one in the room suspects that this request is really the beginning of his final plan.

🖐️ Suffer means allow

🧒 A boy guides Samson's blind hands

😌 The request sounds harmless

➡️ It is actually the start of his plan

## 🏛️ The House Was Full Of Men And Women

This was likely a temple structure built around a central open courtyard.

Two support pillars held up much of the roof and upper levels above the crowd.

Packing the building with people turns Samson's plan into something with massive consequences.

The scale of the coming disaster grows with every person still inside.

🏛️ The building centered on two key pillars

👥 It was packed with people below

📈 Every guest raises the coming stakes

➡️ A disaster is quietly building

## 👀 Upon The Roof About Three Thousand Men And Women

Flat roofs were common gathering spaces in ancient Near Eastern architecture.

Three thousand more people watch from above, on top of everyone already inside.

The total crowd size shows how large and important this celebration had become to the Philistines.

Nearly the entire event now depends on two pillars a blind, chained man is being led toward.

🏠 Flat roofs were common gathering spots

👀 Three thousand more people watch from above

📊 The event has grown massive

📖 Everything rests on two pillars

# Judges 16:28-31
# 🙏 Let Me Die With The Philistines
---
## 🙏 O Lord God, Remember Me

This is the second time in the chapter Samson is shown praying directly to God.

His first prayer earlier asked for rescue from thirst, back in chapter fifteen.

This prayer is far more serious, asking for one final act of strength before death.

Even after losing everything, Samson still turns to God rather than to his own memory of strength.

🙏 This is Samson's second recorded prayer

💧 His earlier prayer was about thirst

💪 This one asks for final strength

📖 He turns to God, not memory of self

## 👁️ Avenged Of The Philistines For My Two Eyes

Samson's stated goal is personal revenge for his blindness, not a mission for Israel.

This mirrors his earlier claim in chapter fifteen that his violence was simple payback.

Even in his final act, his motive stays personal rather than purely about serving God's people.

The Bible records his real motive honestly, without polishing it into something nobler.

👁️ His goal is personal revenge

🔁 This matches his pattern from chapter 15

🎯 His motive stays personal, not national

📖 The text does not hide his real reason

## 💪 Took Hold Of The Two Middle Pillars

These were the two central supports the roof and upper crowd depended on completely.

Samson rests one hand on each pillar, ready to push them apart.

His restored strength returns for this one final, decisive moment.

Everything in the chapter has been building toward this single physical act.

🏛️ Two central pillars held up the roof

🖐️ One hand rests on each pillar

💪 His strength returns for this moment

📖 The whole chapter builds to this act

## 🏛️ Let Me Die With The Philistines

Samson accepts that this final act will also end his own life.

Unlike every earlier escape in his story, there is no plan to survive this one.

His death becomes the price of his final, greatest act of strength.

He completes what he was set apart to do, but not in the way anyone expected.

💀 Samson accepts he will die too

🚫 There is no plan to survive this time

⚖️ Death becomes the price of this act

📖 His calling is fulfilled unexpectedly

## 📊 More Than They Which He Slew In His Life

This single collapse kills more Philistines than every earlier battle in his whole life combined.

The jawbone battle, the burned fields, and every other fight all add up across his whole life.

This one moment outdoes all of them at once.

Samson's death becomes his single greatest act against the Philistines.

The judge who lived by his own strength dies accomplishing his mission's biggest blow.

📊 This kills more than his whole life's battles

🦴 It outdoes even the jawbone victory

💥 His death becomes his biggest strike

📖 His mission's blow lands at the very end

## ⚰️ Buried Him Between Zorah And Eshtaol

Zorah was Samson's hometown, first named back in chapter thirteen when the angel first appeared.

Eshtaol was a nearby town, both located in the territory of Dan.

His brothers and family, not the Philistines, come to recover and bury his body.

Samson's story ends back in the same homeland where an angel once promised his birth.

🏡 Zorah was Samson's hometown

📍 Eshtaol sat nearby in Dan's territory

👪 His family recovers his body

📖 His story ends where it began
`.trim();

export const JUDGES_SIXTEEN_PERSONAL_SECTIONS = parseJudgesSixteenRawNotes(JUDGES_SIXTEEN_RAW_NOTES);
