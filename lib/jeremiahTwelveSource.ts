export type JeremiahTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahTwelveRawNotes(rawText: string): JeremiahTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 12:${startVerse}` : `Jeremiah 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Jeremiah 12 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_TWELVE_RAW_NOTES = `# Jeremiah 12:1-4
# ⚖️ Wherefore Doth The Way Of The Wicked Prosper
---
## ⚖️ Wherefore Doth The Way Of The Wicked Prosper

This is not Jeremiah accusing God of running an unfair world.

He calls God righteous in the very first line of his complaint.

His real question is why wicked people keep prospering anyway.

Job and several Psalms wrestle with this same exact question.

Bringing a hard question straight to God is not rebellion.

Honest complaint has always had a place in real prayer.

⚖️ Jeremiah calls God righteous first
❓ His real question is why evil prospers
📜 Job and the Psalms ask this too
📖 Honest questions are not rebellion

## 🗣️ Thou Art Near In Their Mouth, And Far From Their Reins

"Their mouth" means the words people speak and the prayers they say out loud.

"Their reins" is an old word for a person's inward feelings and true motives.

God is close to their speech but distant from what they actually feel.

These people talk about God constantly without truly following him.

Religious words can sound sincere while hiding a heart that never changed.

🗣️ Their mouth means spoken words
🫀 Reins means true inner motives
↔️ Close in speech, far in heart
📖 Religious words can hide an unchanged heart

## 🐑 Pull Them Out Like Sheep For The Slaughter

Sheep led to the slaughter have no idea what is about to happen.

They simply follow wherever they are led without any resistance.

Jeremiah asks God to single out the wicked that same way.

He has already reminded God that his own heart was tested and known.

This is a request for real justice, not personal revenge.

🐑 Sheep pictures total helplessness
🔍 His own heart was already tested
🎯 He asks God to single them out
📖 A request for justice, not revenge

## 🙉 He Shall Not See Our Last End

This is what the wicked said to comfort themselves.

"Our last end" means the final outcome their own choices were building toward.

They assumed Jeremiah's warnings would simply never come true.

That confidence let them enjoy the present without any real fear.

Believing judgment will never arrive does not stop it from coming.

🙉 The wicked dismissed the warnings
🔮 They assumed no final reckoning
😌 Denial let them enjoy the present
📖 Disbelief does not stop judgment

# Jeremiah 12:5-6
# 🐎 How Canst Thou Contend With Horses
---
## 🏃 How Canst Thou Contend With Horses

God does not answer Jeremiah's question directly.

Instead he warns that harder trials are still ahead of him.

"Footmen" were ordinary soldiers who traveled and fought on foot.

Horses moved far faster and represented a much tougher contest.

If ordinary trouble already wears Jeremiah down, worse is coming.

🏃 Footmen means ordinary foot soldiers
🐎 Horses represent a tougher contest
📈 Present trouble is the easier kind
📖 Harder trials are still ahead

## 🌊 In The Swelling Of Jordan

The Jordan river could be crossed easily for most of the year.

During its flood season the same crossing turned genuinely dangerous.

"The swelling of Jordan" pictures that much harsher, flooded crossing.

God asks how Jeremiah will manage danger far worse than this.

Feeling safe in "the land of peace" now guarantees nothing about tomorrow.

🌊 Jordan's flood season was dangerous
🚶 It pictures a much harder crossing
📅 Present peace does not guarantee tomorrow
📖 Worse danger was still ahead

## 👨‍👩‍👧 Even Thy Brethren, And The House Of Thy Father

"Thy brethren" means Jeremiah's own relatives back in his hometown.

"The house of thy father" points to his wider family line as well.

Even they had turned against him and dealt treacherously.

This confirms the plot from his own hometown of Anathoth in the chapter before.

Betrayal from the closest people cuts deeper than any stranger's threat.

👨‍👩‍👧 Brethren means his own relatives
🏘️ His father's house was involved too
💔 Even family dealt treacherously
📖 Betrayal from home cuts deepest

## 🎭 Believe Them Not, Though They Speak Fair Words Unto Thee

"Fair words" means speech that sounds kind and trustworthy on the surface.

God warns Jeremiah that pleasant sounding words can still hide real danger.

This answers the very trap the men of Anathoth were setting.

Kind tone alone was never proof of a safe intention.

Testing the heart behind the words mattered more than trusting the tone.

🎭 Fair words means pleasant sounding speech
⚠️ Kind tone is not proof of safety
🕵️ This answers the plot from Anathoth
📖 Test the heart, not just the tone

# Jeremiah 12:7-13
# 🦁 Mine Heritage Is Unto Me As A Lion In The Forest
---
## 🏚️ I Have Forsaken Mine House

God now speaks in his own voice for the rest of this passage.

"Mine house" means Israel, the people God once called his own family.

God says plainly that he has forsaken and left them.

"The dearly beloved of my soul" shows how much Israel once meant to him.

He has handed his own beloved people over to their enemies.

This is God grieving a hard decision, not judging without feeling.

🏚️ Mine house means the nation Israel
💔 God says he has forsaken them
😢 They were once dearly beloved
📖 This grief is not without feeling

## 🦁 Mine Heritage Is Unto Me As A Lion In The Forest

"Mine heritage" again means Israel, the people God once claimed as his own.

God now compares that same people to a lion living in a forest.

A lion in its own forest normally represents strength under control.

Here that same lion has turned and roars out against God himself.

Israel had turned its strength against the very God who gave it.

🦁 Heritage means Israel again here
🌲 A lion pictures strength under control
😡 That lion now roars against God
📖 Israel turned its strength against him

## 🦜 Mine Heritage Is Unto Me As A Speckled Bird

A speckled bird looks different from every other bird around it.

Other birds in a flock often attack whatever looks strange or marked.

God compares Israel to that same kind of conspicuous, targeted bird.

Israel's differences had made it a target instead of a protection.

Being set apart by God did not shield Israel from real danger.

🦜 A speckled bird looks different
🎯 Other birds target what looks strange
⚠️ Israel became a target, not a shield
📖 Being set apart did not protect them

## 🍇 Many Pastors Have Destroyed My Vineyard

"Pastors" here is an old word for shepherds and rulers, not church leaders.

"My vineyard" pictures Israel as a carefully planted, valuable field.

These many rulers trampled that same vineyard instead of caring for it.

A vineyard needs steady tending, not careless or hostile trampling.

Bad leadership had turned a cared for planting into a wasteland.

👴 Pastors here means rulers, not clergy
🍇 The vineyard pictures Israel itself
🥾 Rulers trampled it instead of caring
📖 Bad leadership wasted a careful planting

## 😔 No Man Layeth It To Heart

The land itself is described as mourning its own desolation.

"No man layeth it to heart" means no one truly grieved what was lost.

Widespread destruction had become so common that people stopped noticing it.

Real tragedy can happen in full view and still be ignored.

God notices what people around him have stopped caring about.

🌾 The whole land mourned its ruin
😶 No one truly grieved the loss
🙈 Destruction had become normal to ignore
📖 God still notices what people ignore

## ⚔️ The Sword Of The LORD Shall Devour

Spoilers arrive across every high place through the wilderness in this verse.

"The sword of the LORD" credits this coming destruction directly to God.

This was never simply one army invading on its own.

The devastation stretches from one end of the land to the other.

"No flesh shall have peace" means nowhere in the land stays safe.

⚔️ Sword of the LORD means God himself
🗺️ Spoilers came from every high place
🚫 Nowhere in the land stays safe
📖 Destruction covers the whole land

## 🌾 They Have Sown Wheat, But Shall Reap Thorns

Farmers plant wheat expecting a normal, useful harvest in return.

Here the very same planting produces only useless, painful thorns instead.

"They shall not profit" means all that labor accomplishes nothing worthwhile.

The people will feel real shame over harvests that never paid off.

Effort without God's blessing on it can still end in nothing.

🌾 Wheat pictures normal, expected effort
🌵 Thorns picture wasted, painful results
😳 The people gain no real profit
📖 Effort without blessing can still fail

# Jeremiah 12:14-17
# 🌍 I Will Pluck Them Out And Have Compassion
---
## 🌍 Mine Evil Neighbours, That Touch The Inheritance

God now turns his attention to the surrounding nations, not only Israel.

"Mine evil neighbours" means nations that had seized parts of Israel's land.

"The inheritance" refers to the territory God originally gave his own people.

God promises to pluck these neighboring nations out of that same land.

Judah itself is also named as included in this coming removal.

🌍 Evil neighbours means surrounding nations
🗺️ Inheritance means Israel's given land
✋ God will pluck those nations out
📖 Judah is included in this too

## ⏸️ I Will Return, And Have Compassion On Them

This promise arrives immediately after a hard sentence of removal.

God says the plucking up will not be the final word.

He promises to return and show real compassion afterward.

Every nation removed will eventually be brought back to its own land.

Judgment in this chapter always leaves room for future mercy.

⏸️ Removal was not God's final word
💗 God promises to return with compassion
🏡 Nations return to their own land
📖 Judgment still leaves room for mercy

## 🤲 To Swear By My Name, The LORD Liveth

"To swear by my name" means publicly pledging loyalty to Israel's God alone.

"The LORD liveth" was a common ancient oath formula, sworn on God's very life.

These same neighboring nations had once taught Israel to swear by Baal instead.

Now God offers them a chance to learn the opposite pattern from Israel.

Loyalty measured by whose name you swear by can genuinely change direction.

🤲 Swearing by his name means pledging loyalty
🗣️ The LORD liveth was a common oath
🔄 They once taught Israel to swear by Baal
📖 Loyalty can still change direction

## 🔥 I Will Utterly Pluck Up And Destroy That Nation

This mercy offered to Israel's neighbors was never automatic or forced.

"If they will not obey" makes the coming mercy fully conditional.

Refusing to learn God's ways leads back to the same judgment as before.

"Utterly pluck up and destroy" repeats the exact judgment already given to Judah.

The same God who forgives is also the same God who judges.

🤝 Mercy here was conditional, not automatic
🚫 Refusing to obey brings judgment back
🔁 The judgment matches what Judah faced
📖 The same God forgives and judges
`.trim();

export const JEREMIAH_TWELVE_PERSONAL_SECTIONS = parseJeremiahTwelveRawNotes(JEREMIAH_TWELVE_RAW_NOTES);
