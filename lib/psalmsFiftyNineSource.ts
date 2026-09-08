export type PsalmsFiftyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsFiftyNineRawNotes(rawText: string): PsalmsFiftyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsFiftyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+59:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 59 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+59:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+59:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 59 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 59,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 59:${startVerse}` : `Psalms 59:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 59 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_FIFTY_NINE_RAW_NOTES = `# Psalms 59:1-5
# 🚪 David Prays While Assassins Watch His House
---
## 🏹 Deliver Me From Mine Enemies, O My God

This prayer was written while armed men surrounded David's own house.

King Saul had sent soldiers to kill David there that very night.

The story behind this Psalm is told in 1 Samuel 19.

Deliver means rescue me, and David prays it before trying to escape.

🏠 Soldiers surrounded David's house that night
📜 The story is told in 1 Samuel 19
🙏 Deliver means rescue me right now
📖 David prays before he tries to run

## 🛡️ Defend Me From Them That Rise Up Against Me

Rise up against pictures people who were once close turning into a threat.

These attackers were not strangers or foreign raiders at the door.

They served under Saul, the king who had once welcomed David into his own family.

David asks God to stand between him and that betrayal.

🔄 Rise up against means turned hostile
👪 Saul once welcomed David as family
🗡️ The danger now came from inside
📖 David asks God to stand between them

## ⚖️ Deliver Me From The Workers Of Iniquity

Iniquity means sin that is deliberate, not a simple mistake.

A worker of iniquity is someone who practices wrongdoing like a trade.

David is not describing careless men who slipped into evil once.

He is describing men who had made harming others their steady occupation.

⚖️ Iniquity means deliberate sin
🔨 Iniquity practiced like a trade
🚫 Not a careless slip into evil
📖 Harming others had become their occupation

## 🩸 Save Me From Bloody Men

Bloody men means people who are ready to commit murder.

The word points to violence, not simply cruelty in speech.

Saul's men had orders to kill David inside his own home.

David names the danger honestly instead of softening it.

🩸 Bloody men means people ready to kill
🗣️ Points to violence, not just cruel words
🏠 Saul's men had orders to kill him
📖 David names the danger honestly

## 🕸️ They Lie In Wait For My Soul

Lie in wait describes hunters hiding until their prey walks by.

These men were watching David's house for the exact moment to strike.

My soul here does not mean an invisible part of David only.

It means his whole life, the very person that he was.

🕸️ Lie in wait means hiding to ambush
👁️ They watched for the exact moment
🧍 Soul here means his whole life
📖 They hunted his whole life

## 👑 The Mighty Are Gathered Against Me

The mighty refers to Saul himself and the soldiers under his command.

This was not a random mob or a handful of angry men.

It was the full weight of Israel's own army turned against one man.

David faced power that no ordinary person could survive alone.

👑 The mighty means Saul and his soldiers
⚔️ Israel's own army turned against him
🧍 Not a random mob of angry men
📖 No ordinary person could survive that alone

## 🙌 Not For My Transgression, Nor For My Sin

Transgression means breaking a clear command on purpose.

Sin means falling short of what is right, even by accident.

David uses both words together to cover every possible charge.

He is telling God plainly that he has done nothing to deserve this.

🙌 Transgression means breaking a command on purpose
📉 Sin means falling short, even by accident
✅ Together the words cover every charge
📖 David claims he did nothing to deserve this

## 🏃 They Run And Prepare Themselves Without My Fault

Run and prepare describes soldiers moving into position for an attack.

Without my fault means David had given them no real reason.

He had not rebelled against Saul or broken any law.

The attack was coming even though David had done nothing wrong.

🏃 Run and prepare means soldiers moving to attack
❌ Without my fault means no real reason
🛡️ David had not rebelled against Saul
📖 The attack came though he was innocent

## 👁️ Awake To Help Me, And Behold

God never actually sleeps or loses awareness of what is happening.

Awake here is a human way of pleading for urgent attention.

David speaks the way a person cries out to a friend who seems silent.

Behold means look closely, not just glance in passing.

👁️ God never actually sleeps
🙏 Awake means pleading for urgent help
🗣️ David speaks like crying out to a friend
📖 Behold means look closely, not glance

## ⚔️ Thou Therefore, O LORD God Of Hosts, The God Of Israel

LORD of hosts is a title picturing God as commander of a vast heavenly army.

Hosts here does not mean party guests, it means armies.

David pairs this with the God of Israel, naming God's covenant relationship too.

He is calling on both God's raw power and His personal promise.

⚔️ Hosts means armies, not guests
👑 LORD of hosts pictures God's heavenly army
🤝 God of Israel names His covenant with them
📖 David calls on both power and promise

## 🌍 Awake To Visit All The Heathen

Heathen refers to nations and people outside Israel's covenant with God.

David briefly widens his prayer beyond just his personal enemies.

He is asking God to judge injustice on a much larger scale.

The personal danger he faces becomes a picture of a bigger problem.

🌍 Heathen means nations outside the covenant
🔭 David widens the prayer beyond himself
⚖️ He asks God to judge injustice broadly
📖 His danger pictures a bigger problem

## ⏸️ Be Not Merciful To Any Wicked Transgressors. Selah

This sounds harsh, but it is a prayer against ongoing injustice, not cruelty.

Transgressors here means people who keep choosing to do wrong.

Selah likely signals a pause, perhaps for instruments or reflection.

The section ends by letting that heavy request sit for a moment.

⚖️ A prayer against injustice, not cruelty
🔁 Transgressors keep choosing to do wrong
⏸️ Selah likely signals a musical pause
📖 The heavy request is left to sit

# Psalms 59:6-10
# 🐕 Mocking Voices At Evening
---
## 🌆 They Return At Evening

Evening was when city gates opened and stray dogs came looking for scraps.

David compares his enemies to that same nightly pattern.

They did not attack once and leave, they kept coming back.

Their hostility followed a steady, predictable rhythm.

🌆 Evening was when stray dogs searched for food
🔁 Enemies kept returning, not just once
🐕 David compares them to that pattern
📖 Their hostility was steady and predictable

## 🐕 They Make A Noise Like A Dog

Dogs in the ancient Near East were not household pets.

They ran wild in packs through city streets at night.

A pack of hungry, snarling dogs was a frightening, ugly sound.

David uses that image to describe his enemies' menacing noise.

🐕 Dogs were wild street animals, not pets
🌙 Packs roamed the streets at night
😨 Their snarling was frightening to hear
📖 David compares his enemies to that sound

## 🏙️ Go Round About The City

This pictures the enemies circling, the way hunters surround prey.

They were not passing through by accident.

Their movement through the city was deliberate and threatening.

David felt watched and hemmed in wherever he went.

🔄 Circling pictures hunters surrounding prey
🚶 Their movement was not accidental
👀 David felt watched everywhere he went
📖 Their circling was deliberate and threatening

## 🗣️ They Belch Out With Their Mouth

Belch out describes ugly, uncontrolled speech spilling out of someone.

These were not careful insults, they were crude and constant.

The picture is of contempt that cannot stay contained.

David is describing the sound of pure mockery.

🗣️ Belch out means uncontrolled ugly speech
😤 Not careful insults, crude and constant
💢 Contempt that could not stay contained
📖 The sound of pure mockery

## 🗡️ Swords Are In Their Lips

This is a picture, not a literal weapon.

Their words were sharp enough to wound like a blade.

Lies and threats can cut a person just as deeply as violence.

David felt attacked by what they said as much as what they did.

🗡️ Their words cut like a blade
💔 Lies wound as deeply as violence
🗣️ Their speech was the real attack
📖 David felt harmed by their words too

## 😏 For Who, Say They, Doth Hear

This question reveals what the enemies actually believed about God.

They assumed no one, not even the LORD, was paying attention.

Their mockery only made sense if God was truly absent.

The rest of the Psalm answers that assumption directly.

😏 They assumed nobody was listening
🙈 Not even God, in their minds
❓ Their mockery depended on His absence
📖 The Psalm answers that assumption

## 😂 Thou, O LORD, Shalt Laugh At Them

This does not mean God finds cruelty funny.

God laughing pictures how small human plans look against His power.

The same idea appears elsewhere in scripture for God's response to human pride.

Their entire scheme was never as dangerous as it felt to David.

😂 Not laughing at cruelty itself
📏 It pictures how small their plans looked
📚 The same idea appears elsewhere in scripture
➡️ Their scheme was never truly unstoppable

## 💪 Because Of His Strength Will I Wait Upon Thee

Wait here does not mean sitting around doing nothing.

It means trusting God's strength instead of leaning on his own.

David had every reason to panic, yet he chooses patience instead.

God is my defence names exactly what David is trusting in.

⏳ Wait means trusting, not doing nothing
💪 Trusting God's strength instead of his own
😌 David chooses patience instead of panic
📖 God is my defence names his trust

## 👀 God Shall Let Me See My Desire Upon Mine Enemies

Prevent in the King James English means to go before, not to block.

God shall prevent me means God will act before David even asks again.

To see my desire means David will witness justice actually happen.

This is not private revenge, it is watching God's justice unfold.

⏩ Prevent here means go before, not block
🏃 God acts before David has to ask
👀 David will witness justice happen
📖 It is God's justice, not personal revenge

# Psalms 59:11-13
# 🛡️ A Prayer For Exposure, Not Silence
---
## 🚫 Slay Them Not, Lest My People Forget

This is a surprising request in the middle of an urgent prayer.

David does not want his enemies destroyed quickly and quietly.

A fast death would let people forget the lesson entirely.

David wants Israel to see this play out and remember it.

🚫 A surprising request in an urgent prayer
⚡ Not a quick, quiet destruction
🧠 A fast end would be forgotten
📖 David wants Israel to remember this

## 🌪️ Scatter Them By Thy Power

Scatter pictures enemies driven apart and unable to regroup.

This is different from being wiped out all at once.

A scattered enemy stays visible as a lasting warning.

David is asking for a public, ongoing display of justice.

🌪️ Scatter means driven apart, not destroyed
🔍 A scattered enemy stays visible
⚠️ It becomes a lasting warning
📖 David wants justice on public display

## 🛡️ Bring Them Down, O Lord Our Shield

Shield here names God as personal protection in battle.

This is one of the oldest and simplest titles for God in scripture.

David switches from naming his enemies to naming his protector.

The prayer turns toward trust in the middle of danger.

🛡️ Shield names God as protection in battle
📜 One of scripture's oldest titles for God
🔄 David shifts from enemies to his protector
📖 Trust rises in the middle of danger

## 👄 The Sin Of Their Mouth And The Words Of Their Lips

David returns to naming exactly what these men are guilty of.

It was not just violence, it was also what they said.

Cursing and lying were tools they used just as much as weapons.

Their guilt is spoken as clearly as their enemies' danger was.

👄 David names their exact guilt
🗣️ Their words, not only their violence
🤥 Cursing and lying were their tools
📖 Their guilt is stated plainly

## 😤 Let Them Even Be Taken In Their Pride

Pride here means the arrogant confidence that they would never be caught.

David prays their own overconfidence becomes the trap that catches them.

This is not random misfortune, it is justice matching the crime.

Their arrogance and their downfall are directly connected.

😤 Pride means confidence they would not be caught
🪤 David prays overconfidence becomes their trap
⚖️ Justice matches the crime committed
📖 Their pride and downfall are connected

## 🔥 Consume Them In Wrath, That They May Not Be

Consume pictures fire that burns something down completely.

That they may not be is a strong way of saying end their threat for good.

David has moved from wanting exposure to wanting a real end.

The prayer for their end is urgent, not casual.

🔥 Consume pictures fire burning completely
🚫 It means end their threat for good
📈 David moves from exposure to a real end
📖 The prayer for their end is urgent

## 🌍 That God Ruleth In Jacob Unto The Ends Of The Earth

Jacob here stands for the whole nation of Israel, not one man.

This links back to verse one, which questioned whether human judges were honest.

David lands on the answer, only God truly rules everywhere.

Selah likely marks a pause, perhaps for a musical interlude.

🌍 Jacob stands for the whole nation
🔗 It answers the question from verse one
👑 Only God truly rules everywhere
📖 Selah marks a pause in the song

# Psalms 59:14-17
# 🎶 From Mocking Dogs To Morning Praise
---
## 🌆 And At Evening Let Them Return

This line repeats verse six almost word for word on purpose.

Repetition in Hebrew poetry works like a chorus in a song.

David circles back to the same mocking image one more time.

The repeated line frames the whole middle section of the Psalm.

🔁 This repeats verse six on purpose
🎵 Repetition works like a chorus
🐕 Same mocking image returns
📖 It frames the Psalm's middle section

## 🐕 Let Them Make A Noise Like A Dog

The enemies have not gone away or calmed down.

Their threatening noise is still exactly what it was before.

David is honest that the danger has not disappeared yet.

The Psalm does not pretend the problem is already solved.

🐕 The threat has not changed
⏳ Danger has not disappeared yet
🗣️ David stays honest about that
📖 The Psalm does not pretend it is solved

## 🍽️ Let Them Wander Up And Down For Meat

This pictures hungry stray dogs roaming for scraps of food.

David is describing his enemies as restless and never satisfied.

Grudge here means they complain even when they get something.

Nothing will ever be enough for people driven by that kind of hunger.

🍽️ Pictures hungry dogs roaming for food
😠 Enemies are restless and never satisfied
😤 Grudge means complaining even when fed
📖 Nothing satisfies that kind of hunger

## 🎶 But I Will Sing Of Thy Power

David places his own choice directly against his enemies' behavior.

They wander and growl, David sings and trusts.

This is the turning point where the Psalm changes tone completely.

Singing becomes an act of defiance as much as worship.

🎶 David's choice contrasts his enemies' behavior
🔄 They growl, David sings instead
🔀 This is the Psalm's turning point
📖 Singing becomes defiance and worship together

## ☀️ Sing Aloud Of Thy Mercy In The Morning

Morning follows the frightening night described earlier in the Psalm.

Danger came at evening, but relief and praise come with daylight.

David has walked through the whole night still trusting God.

The morning song is proof that the fear did not win.

☀️ Morning follows the frightening night
🌙 Danger came at evening, praise at dawn
🚶 David trusted God through the whole night
📖 The song proves fear did not win

## 🏰 Thou Hast Been My Defence And Refuge In The Day Of My Trouble

Defence and refuge are both pictures of a safe, guarded place.

David is not only asking for future help in this line.

He is remembering a protection he had already experienced before.

Trouble here points straight back to Saul's men surrounding his house.

🏰 Defence and refuge both mean a safe place
🙏 Not only future help, but past proof
🧠 David remembers protection he already had
📖 Trouble points back to Saul's men

## 💪 Unto Thee, O My Strength, Will I Sing

The Psalm ends exactly where it feels safest to end, in praise.

Strength here is not David's own, it belongs to God.

The final line repeats God is my defence one more time.

A Psalm that began in real danger closes in real trust.

🎯 The Psalm ends where it feels safest
💪 Strength belongs to God, not David
🔁 God is my defence repeats one final time
📖 Danger opened the Psalm, trust closes it
`.trim();

export const PSALMS_FIFTY_NINE_PERSONAL_SECTIONS = parsePsalmsFiftyNineRawNotes(PSALMS_FIFTY_NINE_RAW_NOTES);
