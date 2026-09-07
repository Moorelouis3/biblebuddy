export type PsalmsFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFortyOneRawNotes(rawText: string): PsalmsFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+41:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 41 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+41:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+41:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 41 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 41,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 41:${startVerse}` : `Psalms 41:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Psalms 41 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FORTY_ONE_RAW_NOTES = `# Psalms 41:1-3
# 🤲 Blessed Is He That Considereth The Poor
---
## 🤔 Considereth The Poor

Considereth means far more than glancing at someone in need.

The Hebrew word pictures careful, ongoing attention to someone else's situation.

This is not a single act of charity.

It describes a settled habit of caring for people who cannot help themselves.

🤔 Considereth means thoughtful, careful attention
📋 It describes ongoing care, not one gift
🔍 This looks ahead, before urgent need
📖 A settled habit, not a single act

## 🆘 The LORD Will Deliver Him In Time Of Trouble

David attaches a specific promise to this kind of care.

Deliver here means rescued out of real danger.

The promise does not erase every trouble that comes.

It promises rescue whenever trouble actually arrives.

🆘 Deliver means rescued, not comforted
⏳ Trouble will still come
🛟 Rescue is promised when it does
📖 Caring for others invites God's own care

## 🛡️ Preserve Him, And Keep Him Alive

Preserve and keep alive stack two separate promises together.

Preserve pictures ongoing protection, day after day.

Keep alive points to real survival through actual danger.

Together the two promises cover both safety and survival.

🛡️ Preserve means ongoing daily protection
❤️ Keep alive means real survival
🧩 Two promises stacked together
📖 Safety and survival, both covered

## 🌍 He Shall Be Blessed Upon The Earth

This blessing is not only for a life to come.

Upon the earth ties the promise to this present life.

David is not offering a vague spiritual comfort here.

He is naming a visible blessing in everyday circumstances.

🌍 Upon the earth means this present life
✋ Not only a future reward
👁️ A visible, everyday blessing
➡️ God's care shows up now

## 🙅 Not Deliver Him Unto The Will Of His Enemies

This verse names a real danger many people face.

Deliver him unto their will means being handed over completely.

The promise is that God blocks that outcome.

Protection here is active, not passive.

⚔️ Real enemies are assumed here
🙅 Handed over completely is the danger
🛡️ God blocks that outcome
➡️ Protection here is active

## 🛌 Strengthen Him Upon The Bed Of Languishing

Languishing means wasting away slowly, most often from a long illness.

The bed of languishing pictures someone too weak to rise.

God's strength reaches into that exact weakness.

This promise assumes real physical suffering, not only emotional trouble.

🛌 Languishing means wasting away slowly
😷 Pictures someone too weak to rise
💪 Strength reaches into real weakness
📖 The promise covers physical suffering too

## 🛏️ Thou Wilt Make All His Bed In His Sickness

This pictures God as a caregiver arranging the sickbed itself.

In this culture, sick relatives were normally cared for by their own family.

David describes God taking on that intimate, hands on role himself.

The image is tender, not just powerful.

🛏️ Pictures God arranging the sickbed
👪 Normally a family member's job
🤲 God takes the hands on role
📖 Tender care, not distant power

# Psalms 41:4-6
# 🩹 Confession Amid Cruel Enemies
---
## 🔄 Be Merciful Unto Me, Heal My Soul

The psalm shifts sharply here from a general blessing to David's own voice.

David asks for mercy first, then for healing.

Heal my soul reaches deeper than a physical illness.

He is asking God to repair something broken inside him.

🔄 The psalm shifts to David's own voice
🙏 Mercy is asked before healing
💔 Soul points to something deeper than the body
📖 David asks for inner repair

## ✋ For I Have Sinned Against Thee

David names his own sin plainly, without excuse.

This links his sickness in his own mind to a deeper cause.

Scripture elsewhere makes clear that sickness is not always tied to personal sin.

Here David simply confesses what feels true for him right now.

✋ David names his sin without excuse
🔗 He links his sickness to his sin
⚖️ Not every illness works this way
📖 Honest confession, not a universal rule

## 🗣️ When Shall He Die, And His Name Perish

David quotes his enemies directly instead of only describing their cruelty.

They are not simply hoping for his death.

They want his whole name and memory erased with him.

In this culture, a lasting name mattered nearly as much as life itself.

🗣️ David quotes the enemies directly
☠️ They want more than his death
🚫 They want his name erased too
📖 A name mattered almost as much as life

## 🎭 If He Come To See Me, He Speaketh Vanity

Vanity here means empty, false words meant to deceive.

Someone visits David as though offering comfort while he is sick.

The visit is not sincere at all.

Behind a friendly face, the visitor is only gathering material against him.

🎭 Vanity means empty, deceiving words
🤝 A visit that looks like comfort
🕵️ The visit is not sincere
📖 A friendly face can still hide harm

## 📦 His Heart Gathereth Iniquity To Itself

Iniquity means guilt or wrongdoing, often pictured as something collected.

This visitor is not simply careless with words.

He is deliberately storing up material to use later.

Every visit adds another piece to that pile.

📦 Iniquity is guilt, pictured as collected
🎯 The visitor gathers material on purpose
🔁 Every visit adds to the pile
📖 Cruelty here is calculated, not careless

## 📣 When He Goeth Abroad, He Telleth It

Goeth abroad simply means going out into public.

Whatever was gathered in private gets spread the moment he leaves.

David describes betrayal that happens twice, once to his face and once behind his back.

Private cruelty becomes public gossip.

🚶 Goeth abroad means going out in public
📣 What was gathered gets spread outside
🔁 Betrayal happens twice, not once
➡️ Private cruelty becomes public gossip

# Psalms 41:7-9
# 🍞 The Familiar Friend's Betrayal
---
## 🤫 All That Hate Me Whisper Together

Whisper together pictures multiple people trading hostile talk behind David's back.

This is coordinated, not accidental.

More than one enemy is comparing notes on how to hurt him.

Isolation makes the cruelty feel even heavier.

🤫 Whisper together means coordinated talk
👥 More than one enemy is involved
🗺️ They compare notes on harm
📖 Isolation makes cruelty feel heavier

## 🧠 They Devise My Hurt

Devise means to plan carefully, not react in sudden anger.

These enemies are plotting harm with real intention over time.

This matches the calculated gathering of iniquity from two verses earlier.

The danger to David is deliberate, not incidental.

🧠 Devise means careful planning
⏳ Harm plotted over time, not sudden
🔁 This matches the earlier calculated cruelty
📖 The danger is deliberate

## 🗣️ An Evil Disease, Say They, Cleaveth Fast Unto Him

David again quotes his enemies word for word.

Cleaveth fast means clings tightly, as though it will never let go.

They are not simply noting his illness.

They are hoping out loud that it becomes permanent.

🗣️ Another direct quote from enemies
🔗 Cleaveth fast means clinging tightly
🤞 They hope the sickness stays
📖 Cruel hope spoken out loud

## 🛌 Now That He Lieth He Shall Rise Up No More

Lieth pictures David confined to his sickbed, unable to stand.

His enemies treat his weakest moment as their best opportunity.

They assume his sickness will end in death, not recovery.

Their words aim to finish what the illness started.

🛌 Lieth means confined to a sickbed
🎯 Weakness looks like opportunity to them
⚰️ They assume death, not recovery
📖 Words aim to finish the illness

## 🤝 Mine Own Familiar Friend, In Whom I Trusted

Familiar friend describes someone genuinely close, not a casual acquaintance.

In whom I trusted makes clear this trust was real and earned.

The betrayal that follows cuts deeper because of that closeness.

This is not a stranger's cruelty.

🤝 Familiar friend means genuine closeness
🔐 Trust here was real and earned
💔 Closeness makes betrayal cut deeper
📖 This is not a stranger's cruelty

## 🍞 Which Did Eat Of My Bread

Sharing a meal in this culture was a sign of loyalty.

This friend had eaten at David's own table, under his own care.

That shared meal makes what comes next even harder to accept.

Betrayal after shared bread was considered especially shameful.

🍞 Sharing bread signaled loyalty
🏠 This friend ate at David's own table
💔 Shared bread deepens the betrayal
➡️ This kind of betrayal felt especially shameful

## 🦶 Hath Lifted Up His Heel Against Me

Lifted up his heel pictures a sudden kick from someone standing close by.

Jesus later applies this exact verse to Judas in John chapter thirteen.

A psalm about David's own pain becomes, centuries later, a picture of the ultimate betrayal.

Familiar friend and lifted heel both point forward to Judas.

🦶 Lifted heel pictures a sudden kick
🍽️ Jesus applies this verse to Judas
🔮 One psalm points centuries forward
📖 Trusted friend, deepest betrayal, echoed in Judas

# Psalms 41:10-12
# ⚖️ Mercy, Integrity, And God's Favor
---
## 🔄 But Thou, O LORD, Be Merciful Unto Me

David turns from describing his enemies straight back to God.

But marks a deliberate contrast between their cruelty and God's mercy.

The same request for mercy from verse four returns here.

Betrayal has not changed where David takes his need.

🔄 But marks a sharp turn back to God
⚖️ Their cruelty contrasts God's mercy
🔁 The same request as verse four returns
📖 Betrayal did not change where he turns

## 🛏️ Raise Me Up, That I May Requite Them

Raise me up asks for real recovery from the sickbed named earlier.

Requite means to repay or respond in kind.

David is not asking for personal revenge here.

As king, giving justice to the guilty was part of his actual role.

🛏️ Raise me up asks for real recovery
⚖️ Requite means repay or respond
🚫 Not personal revenge
📖 Justice was part of a king's role

## 🔍 By This I Know That Thou Favourest Me

David names how he can actually recognize God's favor.

Favourest means to delight in or take pleasure in someone.

This is not a vague feeling David describes.

He points to a specific, visible sign as proof.

🔍 David names how he knows God's favor
😊 Favourest means delight or pleasure
🚫 Not just a vague feeling
📖 He points to a specific sign

## 🏆 Because Mine Enemy Doth Not Triumph Over Me

Triumph over pictures a public victory celebration over a defeated foe.

David's enemies wanted his death and his name erased back in verse five.

Neither of those things has actually happened.

Their failure to win becomes David's evidence of God's favor.

🏆 Triumph pictures a victory celebration
☠️ Enemies wanted death and erasure
🚫 Neither one succeeded
📖 Their failure proves God's favor

## ⚖️ Thou Upholdest Me In Mine Integrity

Integrity here means honest wholeness of character, not sinless perfection.

David already confessed real sin back in verse four.

Upholdest pictures God actively supporting David's character from underneath.

Honest confession and genuine integrity can exist in the same person.

⚖️ Integrity means honest wholeness
✋ David already confessed real sin
🤲 Upholdest pictures active support
📖 Confession and integrity can coexist

## 👁️ Settest Me Before Thy Face For Ever

Before thy face describes close, ongoing access to God's presence.

Forever extends this closeness beyond David's own lifetime.

This is the opposite of the isolation David described earlier.

Human betrayal could not cut him off from God's presence.

👁️ Before thy face means close presence
♾️ Forever extends beyond his lifetime
🔄 The opposite of earlier isolation
📖 Betrayal could not cut off God's presence

# Psalms 41:13
# 🙌 The Doxology That Closes Book One
---
## 📚 Blessed Be The LORD God Of Israel

This verse does not simply end Psalm forty one.

It closes the entire first of five sections that make up the Psalms.

Ancient editors likely added this line as a doxology, a burst of praise marking a major ending.

The whole collection of psalms one through forty one closes on praise, not complaint.

📚 This closes Book One of Psalms
✋ Five books make up the whole Psalms
🙌 A doxology marks the ending
📖 Praise closes the whole collection

## ⏳ From Everlasting, And To Everlasting

This phrase stretches God's identity across all of time, both directions at once.

Everlasting on both ends means no beginning and no end.

David's whole psalm dealt with sickness, betrayal, and one hard season.

The closing line lifts the reader's eyes to a God who never changes.

⏳ Everlasting covers both directions of time
🔄 No beginning and no end
🩹 David's troubles were one season
📖 God's nature outlasts every season

## ✅ Amen, And Amen

Amen means let it be so, a word of firm agreement.

Saying it twice adds emphasis, a strong way to affirm something in Hebrew.

This double amen seals not just this one psalm, but the entire first book.

The reader is invited to agree out loud, not just read silently.

✅ Amen means let it be so
🔁 Doubling adds strong emphasis
📚 It seals the whole first book
📖 Readers are invited to agree aloud
`.trim();

export const PSALMS_FORTY_ONE_PERSONAL_SECTIONS = parsePsalmsFortyOneRawNotes(PSALMS_FORTY_ONE_RAW_NOTES);
