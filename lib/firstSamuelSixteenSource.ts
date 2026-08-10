export type FirstSamuelSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstSamuelSixteenRawNotes(rawText: string): FirstSamuelSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstSamuelSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstSamuel\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Samuel 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstSamuel\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstSamuel\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Samuel 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Samuel 16:${startVerse}` : `1 Samuel 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Samuel 16 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_SAMUEL_SIXTEEN_RAW_NOTES = `# FirstSamuel 16:1-3
# 🕯️ Samuel Sent To Jesse
---
## 😢 How Long Wilt Thou Mourn For Saul

God is not being unkind by asking this question.

Samuel had been mourning Saul's rejection since the end of chapter fifteen.

Grief has its place, but it cannot stall God's plan forever.

A new king was already chosen, and Samuel's sorrow could not wait any longer.

😢 Samuel had mourned since chapter fifteen

⏳ Grief cannot stall God's plan

👑 A new king was already chosen

📖 God moves forward even in sorrow

## 🚫 I Have Rejected Him From Reigning Over Israel

This is not a new punishment.

It is the same verdict God gave at the end of chapter fifteen.

Rejected means Saul no longer has God's approval to sit on the throne.

Saul will keep wearing the crown for years still, even after this.

🚫 Rejected means no more approval

📜 Same verdict as chapter fifteen

👑 Saul keeps the crown for years

📖 God has already moved on

## 🐂 Fill Thine Horn With Oil

A horn filled with oil was the tool used to anoint a king.

Anoint means to pour oil over someone as a sign of God setting them apart.

Samuel had used this same horn on Saul back in chapter ten.

Now God sends him to use it again, on someone else entirely.

🐂 A horn held the anointing oil

💧 Anoint means set apart by God

👑 Samuel had anointed Saul this way

➡️ Now God sends him to anoint another

## 🏘️ Jesse The Bethlehemite

Bethlehem was a small town south of Jerusalem, not yet a place of any importance.

Jesse was a farmer there, the grandson of Ruth and Boaz.

No one watching this family would have expected a king to come from it.

Centuries later, the prophet Micah names this same town as the Messiah's birthplace.

🏘️ Bethlehem was a small unimportant town

👴 Jesse descended from Ruth and Boaz

🙅 No one expected a king from here

📖 The Messiah is born in this same town

## ⚠️ If Saul Hear It, He Will Kill Me

Samuel is not exaggerating here.

Saul has already shown he can turn violent when he feels threatened.

Secretly anointing a rival king was a real danger, not just nerves.

Even God's own prophet can feel genuine fear.

⚠️ Saul could turn violent when threatened

🕵️ Anointing a rival was real danger

😨 Even a prophet can feel fear

➡️ Fear does not disqualify obedience

## 🐄 Take An Heifer With Thee

God does not rebuke Samuel for being afraid.

Instead He gives him a cover story that is also completely true.

A heifer is a young cow, brought along to genuinely offer a sacrifice.

Samuel can travel to Bethlehem for a real reason without announcing the true one.

🐄 A heifer is a young cow

✅ The sacrifice cover story is true

🤫 It hides the real reason for now

📖 God can protect a mission through wisdom

## 🚶 I Will Shew Thee What Thou Shalt Do

God does not give Samuel the full plan up front.

He only promises to reveal it once Samuel actually arrives.

Samuel has to obey the first step before he understands the next one.

That is often how faith works in scripture, one instruction at a time.

🚶 God reveals the plan step by step

🙏 Samuel must obey without full details

👣 One instruction leads to the next

📖 Faith often moves before full understanding

# FirstSamuel 16:4-7
# 👁️ Samuel Sees Eliab
---
## 😨 The Elders Of The Town Trembled At His Coming

A visit from Samuel was never a small event.

He was Israel's leading prophet, and he had just personally executed King Agag.

The elders had real reason to wonder if judgment was coming to their town too.

Fear, not excitement, is their very first reaction to seeing him.

😨 Samuel's visits carried real weight

⚔️ He had just executed Agag

🏘️ The elders feared judgment on Bethlehem

➡️ His arrival was never routine

## ❓ Comest Thou Peaceably

The elders ask this question directly, out loud.

Peaceably means they want to know if Samuel comes in friendship or in judgment.

It shows how much authority a prophet carried in this culture.

One man's arrival could make an entire town nervous.

❓ They ask if he comes in peace

⚖️ Peaceably means friendship, not judgment

👑 Prophets carried real authority

📖 One visit could unsettle a town

## 🧼 Sanctify Yourselves

To sanctify means to ritually purify oneself before approaching something holy.

This usually involved washing and putting on clean clothes.

It was required before anyone could take part in a sacrifice to the LORD.

Jesse and his sons went through this same preparation, not knowing why.

🧼 Sanctify means to ritually purify

👕 Clean clothes were part of it

🐄 Required before any sacrifice

📖 Jesse's family did not know why

## 👀 Surely The LORD's Anointed Is Before Him

Samuel looks at Eliab and assumes he has already found the next king.

Eliab was likely the oldest, and probably tall, much like Saul had been.

Samuel is judging by the same standard Israel used to pick Saul in the first place.

He is about to make the exact mistake God is trying to correct.

👀 Samuel assumes Eliab is the one

📏 Eliab likely looked tall and strong

🔁 Same standard Israel used for Saul

➡️ Samuel is about to repeat the mistake

## 🛑 Look Not On His Countenance, Or On The Height Of His Stature

God stops Samuel before he can act on his assumption.

Countenance means the face and general appearance.

Stature means physical height.

God is directly correcting the same error that put Saul on the throne.

🛑 God stops Samuel immediately

🙂 Countenance means face and appearance

📏 Stature means physical height

📖 God corrects the mistake behind Saul

## ❤️ Man Looketh On The Outward Appearance, But The LORD Looketh On The Heart

This is the key sentence of the whole chapter.

People naturally judge by what they can see, height, looks, confidence.

God judges by character, faith, and what a person actually is inside.

David will spend the rest of his life proving this verse true.

👀 People judge by outward appearance

❤️ God judges by the heart

🔑 This is the chapter's key verse

📖 David's life will prove it true

# FirstSamuel 16:8-13
# 🐑 The Youngest Is Anointed
---
## 🔁 Neither Hath The LORD Chosen This

Jesse brings Abinadab, then Shammah, and God rejects each one the exact same way.

Samuel hears this same sentence twice within only a few verses.

The repetition builds tension, as one son after another gets passed over.

God is not choosing by birth order or by any obvious qualification.

🔁 The same rejection repeats twice

😬 Tension builds with each brother

📋 Birth order does not decide this

📖 God's choice skips the obvious pattern

## 7️⃣ Jesse Made Seven Of His Sons To Pass Before Samuel

Seven sons pass before Samuel, and not one of them gets chosen.

Other scripture lists Jesse as having eight sons total.

That means one son, the youngest, was not even brought to the gathering.

Nobody in the family thought to include him as a real candidate.

🔢 Seven sons pass before Samuel

📚 Jesse had eight sons total

🙅 The youngest was not even called

📖 God already had someone else in mind

## 😶 There Remaineth Yet The Youngest

Jesse almost forgets to mention his last son at all.

Youngest here can also carry the sense of smallest or least important.

He is treated as an afterthought in his own family.

God is about to completely reverse how this family sees him.

😶 Jesse almost forgets to mention him

📉 Youngest can also mean least important

👪 His own family treats him as an afterthought

📖 God is about to reverse that

## 🐑 Behold, He Keepeth The Sheep

Shepherding was considered the lowest job a son could be given.

It meant long lonely days out in the fields, far from the household's real business.

This same job also trained David in patience, courage, and protecting what was his.

The task that kept him out of the room is part of what shaped him.

🐑 Shepherding was the lowest family job

🌄 Long lonely days in the fields

🛡️ It trained courage and patience

📖 The overlooked job shaped the future king

## ✋ We Will Not Sit Down Till He Come Hither

Samuel refuses to continue the ceremony without David present.

This is unusual insistence from a respected prophet over one absent shepherd boy.

Samuel already senses this gathering cannot be finished yet.

Everyone waits, because the true candidate has not even arrived.

✋ Samuel refuses to continue without him

😮 Unusual insistence over one shepherd boy

⏳ Something is clearly not finished yet

➡️ The real candidate has not arrived

## 🌞 He Was Ruddy

Ruddy describes a healthy reddish or tanned skin tone.

It likely came from years spent working outdoors under the sun.

The same word describes David again later, in chapter seventeen.

It becomes almost a personal marker for him throughout these early chapters.

🌞 Ruddy means a healthy reddish tan

🐑 Likely from years outdoors as a shepherd

🔁 The same word describes him again later

📖 It becomes David's early physical marker

## 🤔 Withal Of A Beautiful Countenance, And Goodly To Look To

This detail can feel contradictory right after verse seven.

God had just said He does not judge by outward appearance.

David's good looks are not the reason he gets chosen here.

They are simply mentioned alongside the real reason, which is his heart.

🤔 This can feel contradictory after verse seven

👀 Looks are not the reason for the choice

❤️ His heart is the real reason

📖 Appearance and heart are not the same test

## 🗣️ Arise, Anoint Him For This Is He

God gives Samuel a short, direct command.

There is no more waiting or evaluating.

The search that began back in verse one finally reaches its answer.

The youngest, most overlooked son in the family is God's clear choice.

🗣️ God gives a short direct command

🔍 The long search finally ends

🐑 The overlooked shepherd is the answer

📖 God's choice is now completely clear

## 👨‍👩‍👦 Anointed Him In The Midst Of His Brethren

Samuel does not anoint David in private.

Every brother who had just been rejected watches this happen.

That must have been humbling for men who assumed one of them would be chosen.

David's rise begins in front of the very family that overlooked him.

👨‍👩‍👦 Every brother watches the anointing

😳 A humbling moment for the rejected sons

👀 David's rise begins in front of them

➡️ His own family sees it first

## 🕊️ The Spirit Of The LORD Came Upon David From That Day Forward

This moment marks a permanent change, not a passing feeling.

The same Spirit that once rested on Saul now rests on David instead.

It equips David for everything still ahead of him, long before he becomes king.

His entire future is shaped by what happens in this one quiet anointing.

🕊️ A permanent change, not a passing feeling

🔁 The Spirit moves from Saul to David

⏳ Years pass before David actually reigns

📖 God prepares him long before the throne

## 🤫 So Samuel Rose Up, And Went To Ramah

Samuel does not stay to announce what just happened.

There is no public coronation and no celebration recorded here.

Keeping this quiet protects David from Saul's anger, since Saul still holds the throne.

The anointing is real, but David's actual reign is still years away.

🤫 Samuel leaves without any announcement

🚫 No public coronation happens here

🛡️ Silence protects David from Saul

➡️ The real reign is still years away

# FirstSamuel 16:14-16
# 😈 An Evil Spirit Troubles Saul
---
## 📉 The Spirit Of The LORD Departed From Saul

This is the direct opposite of what just happened to David.

The same Spirit that empowered Saul's early reign is now gone.

Saul still wears the crown, but the source of his strength has left him.

Chapter sixteen quietly marks the moment two kings' paths cross in opposite directions.

🔁 The exact opposite of David's anointing

👑 Saul still wears the crown

📉 The source of his strength is gone

📖 Two kings cross paths in this chapter

## 🚫 An Evil Spirit From The LORD Troubled Him

This does not mean God created evil or became evil.

In the Old Testament, God is described as sovereign even over spirits that torment.

Saul rejected God's word, and God allowed this torment to reach him as a result.

It is a consequence, not a random or unfair attack.

🚫 God did not become evil

👑 God remains sovereign over all spirits

⚖️ This followed Saul's own rejection of God

📖 It is a consequence, not an attack

## 🎯 A Cunning Player On An Harp

Cunning here simply means highly skilled, not sneaky or deceptive.

A harp in this period was a small stringed instrument, plucked by hand.

Ancient cultures widely believed music could calm a troubled mind.

The servants suggest a very practical solution to Saul's torment.

🎯 Cunning here means highly skilled

🎵 A harp was a small stringed instrument

🧠 Music was believed to calm the mind

➡️ A practical answer to a real problem

## 🎵 Thou Shalt Be Well

The servants promise Saul real relief, not a permanent cure.

Music could ease the torment each time it returned.

It never addresses why the Spirit of the LORD had left him in the first place.

A temporary comfort is being offered for a much deeper spiritual problem.

🎵 Music offers real but temporary relief

🔁 The torment could still return

❓ The deeper cause is never addressed

📖 Comfort is not the same as healing

# FirstSamuel 16:17-19
# 🎵 A Son Of Jesse Is Recommended
---
## ✅ Provide Me Now A Man That Can Play Well

Saul agrees to his servants' plan without any hesitation.

He wants relief, and he does not seem to ask any deeper questions.

This quick agreement will unknowingly bring his own future replacement into his house.

Saul has no idea who is about to walk through his door.

✅ Saul agrees without hesitation

😌 He wants relief, not deeper answers

🚪 He unknowingly invites his own replacement

➡️ Saul has no idea who is coming

## 🤔 A Mighty Valiant Man, And A Man Of War

This description sounds surprising for a young shepherd with no army record.

David has already shown courage protecting his flock from real predators.

He will explain this himself to Saul in the very next chapter.

The servant may be describing character and potential more than any recorded battle.

🤔 Surprising praise for a shepherd

🐑 His courage came from guarding sheep

🦁 That courage was already becoming known

📖 His reputation grows before his first battle

## 🧠 Prudent In Matters, And A Comely Person

Prudent means wise and careful in how he speaks and acts.

Comely means pleasant and attractive in appearance.

This servant lists several strengths at once, skill, courage, wisdom, and appearance.

It is one of the fullest character descriptions given to anyone this early in the book.

🧠 Prudent means wise and careful

🙂 Comely means pleasant in appearance

📋 Several strengths are named together

📖 A rare full description this early on

## 👀 The LORD Is With Him

The servant adds this line almost as an afterthought.

No one in Saul's court knows David has already been anointed king.

Yet somehow this detail about God's presence has already reached them.

Truth about a person's calling has a way of becoming visible over time.

🗣️ Said almost as an afterthought

🤐 No one at court knows about the anointing

👀 Yet God's presence is already noticeable

📖 A true calling becomes visible over time

## 👑 Send Me David Thy Son, Which Is With The Sheep

Saul personally requests the very man who will one day take his throne.

He identifies David only by his lowest job, a boy still with the sheep.

Saul has no idea about the events of this chapter's earlier half.

The king is unknowingly inviting his own successor into his own household.

👑 Saul personally requests David

🐑 He only knows him as a shepherd

🤷 Saul is unaware of the earlier anointing

➡️ The king invites his own successor in

# FirstSamuel 16:20-23
# 🎼 David Becomes Saul's Armourbearer
---
## 🍞 An Ass Laden With Bread, And A Bottle Of Wine, And A Kid

Jesse sends practical gifts along with his son to the king.

Bread and wine were everyday staples in this culture.

A kid, a young goat, was a real gift of value.

Sending tribute like this to a king was standard custom, showing honor and respect.

🍞 Bread and wine were everyday staples

🐐 A kid was a gift of real value

🙇 Tribute to a king was standard custom

➡️ Jesse still does not know the full story

## ❤️ He Loved Him Greatly

Saul's response to David is immediate and genuine.

This is not yet the tense relationship most readers expect.

For a while, David becomes someone Saul actually trusts and enjoys having near him.

That trust will not last through the chapters still ahead.

❤️ Saul's affection is immediate

🤝 Not yet the tension readers expect

👍 David becomes genuinely trusted

➡️ This trust will not last

## 🛡️ He Became His Armourbearer

An armourbearer carried a king's weapons and stayed close to him at all times.

It was a position of real trust, not a minor errand job.

Jonathan's own armourbearer had already shown deep loyalty back in chapter fourteen.

David now holds one of the most trusted roles in the entire royal court.

🛡️ Armourbearer carried the king's weapons

🤝 A position of deep trust

🔁 Recalls Jonathan's armourbearer from chapter fourteen

📖 David holds a top role in Saul's court

## ✅ He Hath Found Favour In My Sight

Saul sends this request directly to Jesse.

Favour means Saul genuinely approves of David and wants him nearby.

The king who will later hunt David across the wilderness first wanted him close.

This early bond makes David's later exile even harder to read.

✅ Saul openly approves of David

🤝 Favour means genuine approval and desire

😢 This bond makes the later hunt sadder

➡️ Their story starts with trust, not fear

## 🎵 So Saul Was Refreshed, And Was Well

The chapter that began with Saul's rejection ends with him finding temporary comfort.

That comfort comes from the very man God has already chosen to replace him.

Saul does not realize this at all.

The evil spirit still departs for a while every time David plays.

God is already weaving David into Saul's life, long before either man understands why.

🎵 Music brings Saul temporary relief

🤷 He does not know who is helping him

🔁 David's music becomes a recurring comfort

📖 God is weaving their stories together early
`.trim();

export const FIRST_SAMUEL_SIXTEEN_PERSONAL_SECTIONS = parseFirstSamuelSixteenRawNotes(FIRST_SAMUEL_SIXTEEN_RAW_NOTES);
