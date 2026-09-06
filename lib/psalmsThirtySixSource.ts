export type PsalmsThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsThirtySixRawNotes(rawText: string): PsalmsThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 36:${startVerse}` : `Psalms 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Psalms 36 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_THIRTY_SIX_RAW_NOTES = `# Psalms 36:1-4
# 💀 Inside The Wicked Man's Heart
---
## 🗣️ Within My Heart

This does not mean David is describing his own private heart.

The wicked man's own heart is the one speaking here.

Old English used this phrasing to mean deep inside someone's own mind.

Many modern translations render this line as within his heart instead.

Sin rarely announces itself loudly.

It usually just whispers quietly inside a person first.

🗣️ Refers to the wicked man's heart
📜 Old English phrasing for inner thought
📚 Many translations say his heart
📖 Sin often begins as a quiet whisper

## 🙈 No Fear Of God Before His Eyes

Fear of God here does not mean being scared of Him.

It means living with real reverence and respect for who He is.

The wicked man in this psalm has lost that respect completely.

He acts as if no one is watching or will ever judge him.

That mindset frees a person to do almost anything they want.

🙈 Fear of God means reverence not terror
😔 The wicked man has lost that
🚫 He believes no one is watching
📖 That belief frees him to sin

## 🪞 He Flattereth Himself In His Own Eyes

Flattereth here means the wicked man lies to himself about himself.

He convinces himself that he is better than he really is.

This kind of self deception lets guilt fade away quietly.

A person who never feels guilty rarely feels the need to change.

🪞 Flattereth means lying to himself
😌 He believes he is better than reality
🤐 Guilt quietly fades through self deception
📖 Feeling no guilt removes the need to change

## 🔍 Until His Iniquity Be Found To Be Hateful

Iniquity is an old word for sin, guilt, or wrongdoing.

Hateful here means something worth hating or being disgusted by.

The wicked man never lets himself reach that point about his own sin.

His self flattery keeps him from ever truly hating what he does.

A conscience only works if a person still lets it speak.

🔍 Iniquity means sin or guilt
😑 Hateful means worth being disgusted by
🚧 He never reaches that point himself
➡️ A silenced conscience cannot warn him

## 🗣️ The Words Of His Mouth Are Iniquity And Deceit

What fills a person's heart eventually comes out through their mouth.

David already showed the corruption hiding inside this man's heart.

Now that same corruption shows up plainly in his speech.

Deceit means dishonesty meant to trick or mislead someone else.

Words are rarely separate from what a person actually is inside.

🗣️ Words reveal what fills the heart
💭 His inner corruption was already named
🎭 Deceit means dishonesty meant to mislead
📖 Speech exposes what someone truly is

## 🛑 He Hath Left Off To Be Wise, And To Do Good

Left off is an old way of saying he simply quit.

This man has not just failed at wisdom and goodness.

He has actively stopped even trying to pursue them.

Giving up is a choice, not something that happens by accident.

🛑 Left off means he simply quit
🚫 Not failure but a stopped effort
🏳️ He gave up trying completely
📖 Giving up on good is a choice

## 🛌 He Deviseth Mischief Upon His Bed

Deviseth means to plan or scheme something on purpose.

His bed was the place meant for rest at night.

Instead he uses that quiet time to plan out harm.

Even private, unseen moments reveal what a person truly loves.

🛌 His bed became a planning place
🌙 Deviseth means to scheme on purpose
🤫 Even private time reveals his heart
📖 What we do unseen shows who we are

## 😑 He Abhorreth Not Evil

Abhorreth means to hate or feel deep disgust toward something.

A healthy conscience naturally recoils from evil on its own.

This man feels no such reaction anymore.

His conscience has gone completely quiet.

😑 Abhorreth means to hate deeply
🙅 A healthy conscience recoils from evil
🤷 This man feels no reaction anymore
📖 A silent conscience cannot protect anyone

# Psalms 36:5-9
# 🌌 The Vastness Of God's Love
---
## 🌌 Thy Mercy Is In The Heavens

Mercy here pictures something too big to measure or contain.

The sky above stretches farther than anyone can actually see.

David uses that same vastness to describe how far God's mercy reaches.

This sits right after describing a wicked man with a tiny, self centered heart.

The contrast between the two is the whole point of this psalm.

🌌 Mercy pictured as too big to measure
☁️ The sky represents something vast
📏 God's mercy reaches that same vastness
📖 A tiny heart is contrasted with vast mercy

## 🤝 Thy Faithfulness Reacheth Unto The Clouds

Faithfulness means God keeps every promise He has ever made.

Clouds sit higher than almost anything a person can physically reach.

The image describes a faithfulness with no visible ceiling or limit.

God has never once failed to keep His word.

🤝 Faithfulness means keeping every promise
☁️ Clouds picture something with no visible limit
🔝 God's faithfulness has no ceiling
📖 He has never once broken His word

## ⛰️ Thy Righteousness Is Like The Great Mountains

Mountains stood as the most permanent thing an ancient reader could picture.

They do not move, erode quickly, or disappear over a lifetime.

David compares God's righteousness to that same permanence.

It cannot be worn down or talked out of existence.

⛰️ Mountains represent something permanent and fixed
🪨 They do not move or erode quickly
🔒 God's righteousness shares that same permanence
📖 It cannot be worn down over time

## 🌊 Thy Judgments Are A Great Deep

A great deep refers to the deepest part of the ocean.

Ancient readers had no way to measure or explore that depth.

God's judgments and decisions work the same way.

They go far deeper than a person could ever fully understand.

🌊 A great deep means the ocean's depths
🧭 Ancient people could not measure that depth
🤔 God's judgments run just as deep
📖 Full understanding is not always possible

## 🐾 Thou Preservest Man And Beast

Preservest means God actively keeps something alive and safe.

This line widens the psalm beyond just people.

God's care reaches every animal He created as well.

Even creatures with no ability to worship Him still receive His care.

🐾 Preservest means keeps alive and safe
🌍 This widens the psalm beyond people
🐑 God's care includes every animal
📖 His care reaches even the voiceless

## 🕊️ How Excellent Is Thy Lovingkindness

Lovingkindness describes a loyal love that keeps its promises.

It is stronger and steadier than an ordinary feeling of affection.

David reacts to this quality with genuine amazement.

The exclamation shows this is worship, not a calm observation.

🕊️ Lovingkindness means a loyal, promise keeping love
😲 David reacts to it with real amazement
💗 It runs deeper than ordinary affection
📖 This line is worship, not observation

## 🐣 Under The Shadow Of Thy Wings

This pictures a mother bird sheltering her young under her wings.

The image shows safety, warmth, and close protection all at once.

This same picture appears several other times throughout the Psalms.

People run to God the same way a chick runs to its mother.

🐣 Pictures a mother bird sheltering young
🛡️ Shows safety and close protection
🔁 This image repeats elsewhere in Psalms
📖 People run to God the same way

## 🍞 The Fatness Of Thy House

Fatness here means richness, not weight gain.

It describes the best and most abundant part of a meal.

Thy house points to the place where God's people gathered to worship.

Being satisfied there means receiving real spiritual abundance.

🍞 Fatness means richness, not weight
🏠 Thy house means the place of worship
💰 It pictures the best kind of abundance
📖 Worship brings real spiritual satisfaction

## 🌊 The River Of Thy Pleasures

A river never stops flowing on its own.

David pictures joy in God as that same constant flow.

This is not a single moment of happiness that fades quickly.

It is a continual supply that never runs dry.

🌊 A river flows constantly on its own
😊 Pleasures here means deep, lasting joy
🔄 This joy is not a single moment
📖 God's joy is a constant supply

## 💧 The Fountain Of Life

A fountain is a spring that keeps producing fresh water.

David calls God the actual source of life itself.

Life does not just come from God.

It flows continually out from Him instead.

Nothing else can replace that original source.

💧 A fountain means a constant fresh spring
🌱 God is the actual source of life
🔄 Life flows continually from Him
📖 Nothing else can replace that source

## 💡 In Thy Light Shall We See Light

This line repeats the word light on purpose.

Hebrew poetry often repeats a word like this for emphasis.

The point is that understanding only comes through God's own light.

A person cannot reason their way into that light alone.

💡 Light is repeated here on purpose
📜 Hebrew poetry often repeats words for emphasis
🔦 True understanding comes through God's light
📖 No one reasons their way there alone

# Psalms 36:10-12
# 🙏 David's Closing Prayer
---
## 🔁 Continue Thy Lovingkindness Unto Them That Know Thee

The psalm shifts here from praise into a direct request.

Continue means David is not asking for something brand new.

He already described this lovingkindness earlier in verse seven.

He simply wants that same love to keep on going.

🔁 The psalm shifts from praise to request
🆕 Continue means not something brand new
📜 This lovingkindness was already named earlier
📖 David asks it to simply keep going

## ❤️ The Upright In Heart

Upright in heart does not mean someone who never sins.

It describes someone who is honest and sincere before God.

That person may still fail, but their heart stays turned toward Him.

Sincerity matters here more than perfection.

❤️ Upright does not mean sinless
🙏 It means honest and sincere before God
🔄 Their heart still stays turned toward Him
📖 Sincerity matters more than perfection

## 👣 The Foot Of Pride

Pride is pictured here as a person, not just a feeling.

A foot suggests someone actively stepping forward to attack.

David is not afraid of an abstract idea.

He is afraid of proud people acting against him directly.

👣 Pride is pictured as a person here
🚶 A foot suggests an active attacker
🎭 Not an abstract idea but real people
📖 David fears real people, not a concept

## ✋ The Hand Of The Wicked Remove Me

Remove here means to push someone out of their place.

David pictures being physically dislodged from where he stands.

This could mean his home, his position, or his safety.

He asks God to keep that from ever happening.

✋ Remove means pushed out of place
🏠 Could mean home, position, or safety
🛡️ David asks God for protection here
📖 He refuses to be forced out

## ⬇️ There Are The Workers Of Iniquity Fallen

David seems to picture this happening as he speaks.

Workers of iniquity simply means people who practice sin habitually.

This connects directly back to the wicked man from verse one.

The psalm has now come full circle.

⬇️ David pictures this scene happening now
🔁 Workers of iniquity means habitual sinners
🔗 This connects back to verse one
📖 The psalm has come full circle

## 🚫 They Are Cast Down, And Shall Not Be Able To Rise

Cast down describes a complete and total defeat.

Being unable to rise means this defeat is final, not temporary.

This contrasts sharply with the mountains from verse six.

God's righteousness stands forever while the wicked eventually fall for good.

🚫 Cast down means total defeat
⏳ Unable to rise means the defeat is final
⛰️ This contrasts with the mountains in verse six
📖 God's righteousness stands while evil falls
`.trim();

export const PSALMS_THIRTY_SIX_PERSONAL_SECTIONS = parsePsalmsThirtySixRawNotes(PSALMS_THIRTY_SIX_RAW_NOTES);
