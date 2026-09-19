export type PsalmsOneHundredEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsOneHundredEightRawNotes(rawText: string): PsalmsOneHundredEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsOneHundredEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+108:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 108 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+108:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+108:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 108 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 108,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 108:${startVerse}` : `Psalms 108:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 4) {
    throw new Error("Expected 4 Psalms 108 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_ONE_HUNDRED_EIGHT_RAW_NOTES = `# Psalms 108:1-3
# 🎶 A Fixed Heart Sings Before Dawn
---
## 🎯 O God, My Heart Is Fixed

"Fixed" means settled and decided, not wavering.

This is a statement of confidence, not a wish or a prayer.

The exact same line opens Psalm fifty seven.

David starts this song from certainty instead of working toward it.

🎯 Fixed means settled, not wavering

💬 A statement of confidence, not a wish

🔁 Also opens Psalm fifty seven

📖 David starts from certainty

## ✨ I Will Sing And Give Praise, Even With My Glory

"My glory" here means his own soul, his deepest and best self.

Singing with his glory means his whole inner being joins the praise.

This is not just his voice, but the very best part of who he is.

It pictures total worship, unheld back.

✨ Glory means his own soul

🎤 His whole inner being joins the praise

💯 Not just his voice, but his best self

📖 Total worship, unheld back

## 🎼 Awake, Psaltery And Harp

A psaltery was a stringed instrument, similar to a small harp.

Harps and psalteries were common instruments used in temple worship.

Speaking to instruments as if they could wake up is a poetic command.

It pictures worship as something ready to burst into motion.

🎼 Psaltery was a stringed instrument

🎵 Common in temple worship

🗣️ Speaking to instruments is poetic

📖 Worship pictured ready to burst out

## 🌅 I Myself Will Awake Early

This line also appears word for word in Psalm fifty seven.

Waking early to praise God was a deliberate choice, not an accident.

Verses one through five of this psalm closely match that earlier psalm.

This whole chapter is built by joining two older psalms into one.

🔁 Matches Psalm fifty seven exactly

🌅 Waking early was a deliberate choice

🧩 Built by joining two older psalms

📖 A new song made from older ones

## 🗣️ I Will Praise Thee, O LORD, Among The People

"The people" here likely means Israel, God's own covenant nation.

Praise was never meant to stay private or silent.

Speaking it among the people made it a public testimony.

This sets up the wider scope named in the next line.

🗣️ The people likely means Israel

🚫 Praise was never meant to stay private

📢 Speaking it made it public testimony

📖 Sets up the wider scope ahead

## 🌍 I Will Sing Praises Unto Thee Among The Nations

"The nations" means people outside Israel, the wider world.

This widens the praise from one nation to every nation on earth.

The same widening shows up elsewhere in the Psalms and later in Revelation.

God's worth was never meant to be known by only one people.

🌍 The nations means the wider world

📈 Widens praise from one nation to all

📚 The same widening shows up elsewhere

📖 God's worth is for every people

# Psalms 108:4-6
# 🙏 Above The Heavens, Above The Earth
---
## 💞 For Thy Mercy Is Great Above The Heavens

"Mercy" here means loyal, covenant love, the same word used often in the Psalms.

Something being "above the heavens" pictures it as too vast to measure.

The sky was the largest thing an ancient reader could imagine.

God's love is described as bigger than the biggest thing they knew.

💞 Mercy means loyal, covenant love

📏 Above the heavens means too vast to measure

🌌 The sky was the largest thing they knew

📖 God's love is bigger than the biggest thing

## 🤝 Thy Truth Reacheth Unto The Clouds

"Truth" here means faithfulness, God keeping his word completely.

"Reacheth unto the clouds" repeats the same picture of vastness from before.

Mercy and truth appear together often in the Psalms as a matched pair.

One is God's love, the other is his reliability, and both are just as vast.

🤝 Truth means faithfulness to his word

☁️ Reacheth unto the clouds means vastness

👯 Mercy and truth are a matched pair

📖 Love and reliability are both vast

## 🙏 Be Thou Exalted, O God, Above The Heavens

This line is a request, not a statement about something already finished.

"Exalted" means lifted up and honored above everything else.

The same line appears twice more in the Psalms in almost the same words.

The prayer asks that God's greatness be seen as clearly as it truly is.

🙏 A request, not a fact already stated

⬆️ Exalted means lifted up and honored

🔁 The same line repeats elsewhere in Psalms

📖 Asks that God's greatness be seen clearly

## 🌍 Thy Glory Above All The Earth

This repeats the same request as the line just before, said a new way.

Restating an idea twice in a row is a common pattern in Hebrew poetry.

The heavens and the earth together cover literally everything that exists.

The prayer leaves nothing outside of where God's glory should be seen.

🔁 Repeats the line before in new words

📜 Restating ideas twice is common in Hebrew poetry

🌍 Heavens and earth cover everything

📖 Nothing is left outside God's glory

## 💗 That Thy Beloved May Be Delivered

"Thy beloved" refers to God's own people, loved and chosen by him.

"Delivered" means rescued from real, present danger, not a small inconvenience.

This is the actual reason behind the request to be exalted just before.

God's greatness being seen and his people being saved are connected here.

💗 Beloved means God's own chosen people

🛟 Delivered means rescued from real danger

🎯 The reason behind the request above

📖 God's greatness and rescue are connected

## 💪 Save With Thy Right Hand, And Answer Me

"Right hand" is a common picture in scripture for strength and power.

Saving with the right hand pictures a rescue done with full ability.

"Answer me" moves the prayer from a general request into something personal.

The psalm shifts here from praise into an actual plea for help.

💪 Right hand pictures strength and power

🛟 Saving with it pictures full ability

🙋 Answer me makes the prayer personal

📖 Praise shifts into an actual plea

# Psalms 108:7-9
# 🗺️ God Divides The Land By His Word
---
## 🗣️ God Hath Spoken In His Holiness

This introduces a promise God himself gave, not something David invented.

"In his holiness" means the promise is grounded in God's own unchanging character.

The same phrase appears in Psalm sixty, describing the same promise.

What follows next is treated as a settled fact, not wishful thinking.

🗣️ Introduces a promise from God himself

✨ Holiness grounds it in his character

🔁 The same phrase appears in Psalm sixty

📖 What follows is a settled fact

## 📏 I Will Divide Shechem, And Mete Out The Valley Of Succoth

Shechem was a city west of the Jordan River, inside the promised land.

Succoth was a valley east of the Jordan, on the other side of the river.

"Mete out" means to measure and divide up on purpose.

Naming both sides of the Jordan pictures God claiming the whole land.

🏙️ Shechem was a city west of the Jordan

🏞️ Succoth was a valley east of the Jordan

📏 Mete out means measure and divide

📖 Pictures God claiming the whole land

## 🐑 Gilead Is Mine, Manasseh Is Mine

Gilead was a region east of the Jordan known for good pastureland.

Manasseh was one of the twelve tribes, with land on both sides of the river.

"Is mine" repeats on purpose, naming each territory one at a time.

God is pictured as the true owner behind every tribal boundary.

🐑 Gilead was known for good pastureland

🏘️ Manasseh was a tribe split by the river

🔁 Is mine repeats on purpose

📖 God is the true owner of each territory

## ⛑️ Ephraim Also Is The Strength Of Mine Head

Ephraim was another of the twelve tribes, often the leading tribe of the north.

"Strength of mine head" pictures a helmet, protecting the most vital part of the body.

Comparing a tribe to a helmet pictures it as Israel's military defense.

Even Israel's own strength is described as something God possesses first.

🛡️ Ephraim was a leading northern tribe

⛑️ Strength of mine head pictures a helmet

⚔️ Pictures Ephraim as Israel's defense

📖 Israel's strength belongs to God first

## 👑 Judah Is My Lawgiver

Judah was the tribe that produced Israel's kings, including David.

"Lawgiver" pictures the authority to rule and set commands in place.

This matches the promise made in Genesis about Judah's line.

God names this ruling authority as his own before it is ever David's.

👑 Judah produced Israel's kings, including David

⚖️ Lawgiver pictures ruling authority

📜 Matches the promise made in Genesis

📖 Ruling authority belongs to God first

## 🏺 Moab Is My Washpot

Moab was a nation east of the Dead Sea, often hostile toward Israel.

A washpot was a basin used for washing feet, one of the lowest household tasks.

Comparing a whole nation to a washpot pictures total, humbling defeat.

The tone shifts here from Israel's own tribes to Israel's enemies.

🏺 Moab lay east of the Dead Sea

🧺 A washpot was used for washing feet

😔 Pictures total, humbling defeat

📖 The tone shifts to Israel's enemies

## 👞 Over Edom Will I Cast Out My Shoe

Edom was a nation south of Israel, descended from Esau, Jacob's brother.

Throwing a shoe onto land was a way of claiming ownership over it.

It could also picture treating the land with contempt, like discarding something worthless.

Either way, the image places Edom completely under God's control.

🏔️ Edom descended from Esau, Jacob's brother

👞 Throwing a shoe could claim ownership

🚮 Or treat the land with contempt

📖 Edom ends up under God's control

## 🏆 Over Philistia Will I Triumph

Philistia lay along the coast west of Israel and included the city of Gath.

The Philistines were one of Israel's most persistent enemies.

"Triumph" here means a clear, declared victory, not a hoped for outcome.

Every region named in these verses ends up under the same authority.

🌊 Philistia lay along the coast

⚔️ One of Israel's most persistent enemies

🏆 Triumph means a declared victory

📖 Every region ends under the same authority

# Psalms 108:10-13
# ⚔️ Through God We Shall Do Valiantly
---
## ❓ Who Will Bring Me Into The Strong City?

This question shifts the tone from confident claims to an honest need.

"The strong city" likely names a heavily fortified city inside Edom's territory.

Despite everything claimed in the verses just before, victory is not yet certain.

The psalm moves from bold declaration into real, honest dependence.

❓ Shifts from confident claims to honest need

🏰 Strong city likely names a fortified Edomite city

⚠️ Victory is not yet certain

📖 Bold declaration turns to honest dependence

## 🔁 Who Will Lead Me Into Edom?

This repeats the same kind of question, aimed at the enemy named before.

Asking a second time in a row is a common pattern in Hebrew poetry.

The confident claim over Edom in verse nine now sounds like an open question.

Naming the need honestly does not cancel the confidence, it grounds it in reality.

🔁 Repeats the same kind of question

📜 Asking twice is a Hebrew poetry pattern

❓ The earlier claim over Edom now sounds uncertain

📖 Honesty grounds confidence in reality

## 💔 Wilt Not Thou, O God, Who Hast Cast Us Off?

"Cast us off" means to be rejected or abandoned, a real and painful feeling.

This line names a hard, honest feeling instead of hiding it behind praise.

The question format lets doubt and trust sit right next to each other.

Real worship in the Psalms often includes this kind of honest tension.

💔 Cast us off means feeling rejected

🗣️ Names a hard feeling instead of hiding it

⚖️ Doubt and trust sit side by side

📖 Real worship often holds this tension

## 🚶 Wilt Not Thou, O God, Go Forth With Our Hosts?

"Our hosts" means Israel's army, gathered and ready for battle.

"Go forth with" pictures God marching alongside the soldiers, not just watching.

This question expects a yes, even though it is phrased as a question.

Victory was never pictured as something Israel could win without God present.

⚔️ Hosts means Israel's gathered army

🚶 Go forth with pictures God marching alongside

✅ The question expects a yes

📖 Victory needed God actually present

## 🙏 Give Us Help From Trouble

This is a direct, urgent request for God's help.

"Trouble" here points back to the danger already named in this psalm.

The prayer moves from bold claims into an honest ask for rescue.

Confidence and need are not treated as opposites here.

🙏 A direct, urgent request for help

⚠️ Trouble points back to the danger named

🔁 Moves from bold claims to an honest ask

📖 Confidence and need are not opposites

## 🚫 For Vain Is The Help Of Man

"Vain" means empty or useless, not simply small.

This does not mean people can never help at all.

It means human help alone cannot solve trouble this size.

The psalm points past people toward God as the real source of help.

🚫 Vain means empty or useless

🙅 Not saying people can never help

⚠️ Human help alone cannot solve this

📖 Points past people toward God

## 💪 Through God We Shall Do Valiantly

"Valiantly" means acting with real courage and strength in battle.

The credit for that courage belongs to God, not to human skill.

This matches the pattern already set earlier in this psalm.

Confidence returns here, now grounded in God, not in any plan.

💪 Valiantly means real courage in battle

🙌 Credit goes to God, not human skill

🔁 Matches the pattern set earlier

📖 Confidence returns, grounded in God

## 👣 For He It Is That Shall Tread Down Our Enemies

"Tread down" pictures being trampled underfoot, a complete defeat.

This is the same confident hope that closes the earlier psalms this chapter is built from.

The psalm ends where it started, trusting fully in God rather than any other source.

The fixed heart from verse one closes the chapter still just as fixed.

👣 Tread down pictures complete defeat

🔁 Matches the hope from the earlier psalms

🎯 Ends trusting fully in God

📖 The fixed heart stays fixed to the end
`.trim();

export const PSALMS_ONE_HUNDRED_EIGHT_PERSONAL_SECTIONS = parsePsalmsOneHundredEightRawNotes(PSALMS_ONE_HUNDRED_EIGHT_RAW_NOTES);
