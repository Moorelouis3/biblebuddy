export type HoseaFourteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaFourteenRawNotes(rawText: string): HoseaFourteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaFourteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+14:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 14 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+14:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+14:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 14 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 14,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 14:${startVerse}` : `Hosea 14:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Hosea 14 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_FOURTEEN_RAW_NOTES = `# Hosea 14:1-3
# 🔙 Return Unto The LORD
---
## 🔙 Return Unto The LORD Thy God

"Return" does not just mean feeling sorry about what happened.

It means actually turning around and walking back toward God.

Hosea has spent the whole book describing Israel walking away.

Now the prophet finally tells them exactly how to walk back.

This is the one command the entire book has been building toward.

🔙 Return means turning around fully

💭 Sorrow alone is not enough

📣 Hosea finally names the command

📖 The whole book points here

## 💔 Thou Hast Fallen By Thine Iniquity

"Iniquity" means sin that twists something away from how it was meant to be.

Israel did not simply trip or stumble by accident.

Hosea has already shown this fall was self inflicted, back in chapter thirteen.

Naming the real cause is the first step before any real return.

💔 Iniquity means sin that twists

🚫 This fall was not an accident

📜 Chapter thirteen already named the cause

📖 Naming sin starts the return

## 🗣️ Take With You Words

Israel is told to bring words, not an animal for sacrifice.

This matters because true repentance can happen without a temple or an altar.

God is not asking for a ritual here.

He is asking for an honest conversation.

A broken relationship gets repaired through real words, not empty rituals.

🗣️ Words replace the usual offering

🏛️ No temple or altar required

💬 God wants honest conversation here

📖 Real words can repair what broke

## 🙏 Take Away All Iniquity, And Receive Us Graciously

"Graciously" means receiving someone back out of pure favor, not because they earned it.

Israel is not offering a trade or a payment here.

They are asking God to forgive and welcome them simply because he chooses to.

That kind of welcome cannot be bought with good behavior.

It can only be received as a gift.

🙏 Graciously means pure undeserved favor

🚫 This is not a trade or payment

🎁 Forgiveness here is a gift

📖 Gifts cannot be earned by effort

## 🐂 So Will We Render The Calves Of Our Lips

Normally a worshiper would bring an actual young bull to the altar as an offering.

"Calves of our lips" means offering praise and promises instead of an animal.

The mouth becomes the altar, and spoken words become the sacrifice.

Chapter thirteen already showed Israel kissing golden calves made of silver.

Here the same word, calves, is turned completely around.

Now it describes honest praise instead of a lifeless idol.

🐂 Calves of lips means spoken praise

🗣️ Words become the sacrifice here

🔁 Chapter thirteen used calves for idols

📖 The same word now means honest praise

## 🐎 Asshur Shall Not Save Us, We Will Not Ride Upon Horses

"Asshur" is Assyria, the powerful empire Israel had leaned on for political protection.

Horses meant chariots and cavalry, the strongest military technology of that age.

Israel is renouncing both options here, a foreign treaty and a strong army.

Neither one was ever a real source of safety.

Only God was ever strong enough to protect them.

🐎 Horses meant chariots and cavalry

🤝 Asshur names a political alliance

🚫 Both options get renounced here

📖 Only God was ever real safety

## 🙅 Neither Will We Say Any More To The Work Of Our Hands, Ye Are Our Gods

"The work of our hands" means an idol a person built and shaped themselves.

Calling a handmade object a god was the exact sin chapter thirteen condemned.

Israel is promising to stop calling their own creations gods.

A statue built by human hands can never actually rule over its maker.

This confession undoes the very sin that caused the whole fall.

🙅 Work of our hands means idols

🔨 Idols were shaped by human hands

🚫 A statue cannot rule its maker

📖 This confession undoes the fall

## 👶 For In Thee The Fatherless Findeth Mercy

A fatherless child had no legal protector in the ancient world.

That made the fatherless the most defenseless person in that whole society.

This confession ends on the weakest possible example on purpose.

If God shows mercy even there, no one is too far gone for it.

Israel is comparing its own helplessness to a fatherless child's.

👶 Fatherless meant no legal protector

⚖️ The weakest example closes the confession

🤲 Mercy reaches the most defenseless

📖 No one is too far for mercy

# Hosea 14:4-7
# 🌿 I Will Heal Their Backsliding
---
## 🩹 I Will Heal Their Backsliding

"Backsliding" means drifting back into old sin after already turning toward God.

Israel had done this again and again throughout this book.

"Heal" here means fixing the root cause, not just easing the pain.

God is not promising to patch the symptom while the sickness stays.

He is promising to deal with the actual problem underneath it.

🩹 Backsliding means drifting back into sin

🔁 Israel had done this again and again

🌱 Heal means fixing the root cause

📖 God deals with the real problem

## ❤️ I Will Love Them Freely

"Freely" means given with no payment and no condition attached.

This love does not wait for Israel to earn it first.

It is offered before any improvement has even happened.

That is a very different kind of love than Israel had shown God.

Grace moves first, before any good behavior follows.

❤️ Freely means no payment required

🎁 This love comes before improvement

🔄 Grace moves first, not last

📖 God loves before behavior changes

## 🔥 Mine Anger Is Turned Away From Him

Chapter thirteen pictured God as a lion, a bear, and a leopard.

That anger was real, and it was never pretend.

Now, in the very next chapter, that same anger is said to be gone.

Judgment was never God's final word for Israel.

Mercy was always waiting on the other side of it.

🦁 Chapter thirteen pictured real anger

🔁 The very next chapter reverses it

⏳ Judgment was never the final word

📖 Mercy waited on the other side

## 💧 I Will Be As The Dew Unto Israel

Dew forms quietly overnight and gives moisture to dry ground before the sun rises.

Chapter thirteen used dew as a picture of something that vanishes fast.

Here the same picture is used a different way, as something God supplies.

God himself becomes the quiet, steady source of life Israel needs.

This is a gentle picture, not a dramatic one, and that is the point.

💧 Dew gives quiet overnight moisture

🔁 Chapter thirteen used dew differently

🌱 Here dew pictures what God supplies

📖 God becomes a gentle, steady source

## 🌷 He Shall Grow As The Lily

A lily is a delicate flower that can still bloom in rocky, dry soil.

This is a picture of real beauty growing where nothing seemed possible.

Israel had just been pictured as a dried up, drought stricken land.

Now that same ground is pictured producing something soft and beautiful.

God can grow beauty out of the exact place judgment once struck.

🌷 A lily blooms even in dry soil

💧 Beauty grows where none seemed possible

🏜️ Israel was just pictured as dry land

📖 God grows beauty out of judgment

## 🌲 Cast Forth His Roots As Lebanon

Lebanon was famous across the ancient world for its massive cedar trees.

Those cedars were known for roots that ran deep and held firm in storms.

"Roots" here pictures stability, not just height or outward size.

Israel is promised the same kind of deep, lasting stability.

A tree with shallow roots topples in the first strong wind.

🌲 Lebanon was famous for its cedars

🪢 Deep roots mean real stability

🌬️ Shallow roots topple in a storm

📖 Israel is promised lasting stability

## 🌿 His Branches Shall Spread, And His Beauty Shall Be As The Olive Tree

Spreading branches picture a tree with room to keep growing outward.

The olive tree was one of the most valuable trees in the ancient Near East.

It produced oil for food, for light, and for anointing for generations.

Comparing Israel's beauty to an olive tree is not a small compliment.

It pictures something useful and long lasting, not just pretty to look at.

🌿 Spreading branches picture ongoing growth

🫒 Olive trees were deeply valuable

🕯️ Olive oil served food and light

📖 Beauty here means useful and lasting

## 🌬️ His Smell As Lebanon

Lebanon's cedar forests were known for a fragrance that carried a long distance.

A smell like that could be noticed before the trees themselves came into view.

This pictures a renewed Israel whose good reputation spreads ahead of it.

A reputation can travel farther than a person ever physically goes.

🌬️ Cedar fragrance carried a long distance

👃 A good smell precedes the source

🗺️ Israel's reputation would spread outward

📖 Reputation travels farther than a person

## 🌳 They That Dwell Under His Shadow Shall Return

"Shadow" pictures shelter and protection from the sun's full heat.

Those who once scattered away from Israel are pictured coming back to it.

They return specifically because there is now shade and safety to come back to.

Nobody returns to a tree that offers no real protection.

Restored Israel becomes a place people actually want to come home to.

🌳 Shadow pictures shelter and protection

🚶 Scattered people are pictured returning

🏠 They return because real shelter exists

📖 Restoration makes a place worth returning to

## 🌾 They Shall Revive As The Corn, And Grow As The Vine

"Revive" pictures something coming back to life after seeming dead or dormant.

Corn here means grain, which grows back quickly once good conditions return.

The vine is a plant the Bible often uses as a picture of Israel itself.

Both pictures describe the same renewed life from two different angles.

One grows fast, the other grows long term, but both come from the same healing.

🌾 Revive means coming back to life

🌱 Corn pictures quick new growth

🍇 The vine often pictures Israel itself

📖 Two pictures, one renewed life

## 🍷 The Scent Thereof Shall Be As The Wine Of Lebanon

Lebanon's wine carried a reputation for quality across the ancient world.

This closes the poem by echoing the cedar fragrance already named two verses earlier.

Hosea bookends this whole promise with two different, pleasant smells.

A restored Israel would be noticed, and welcomed, far beyond its own borders.

🍷 Lebanon's wine had a trusted reputation

🔁 This echoes the earlier cedar fragrance

🌍 A good reputation reaches past its borders

📖 Restoration becomes noticeable far and wide

# Hosea 14:8-9
# 🌲 What Have I To Do Any More With Idols
---
## ❓ What Have I To Do Any More With Idols

This is a question Ephraim is pictured asking about itself, out loud.

It is not a question looking for information, it already has one answer, none.

Chapter thirteen was filled with idols, calves, and molten images.

Here, finally, the nation that built them is pictured renouncing them completely.

This is the turning point the whole book has been waiting for.

❓ This question already has its answer

🗿 Chapter thirteen was full of idols

🙅 Ephraim renounces idols completely here

📖 This is the book's long awaited turn

## 👂 I Have Heard Him, And Observed Him

Scholars genuinely disagree about who is speaking in this part of the verse.

Many read this as God answering Ephraim, saying he has watched over him closely.

Others read it as Ephraim speaking about his own renewed attention to God.

Either reading points to the same thing, real attention replacing old neglect.

The text does not force one single answer here.

👂 Scholars disagree on who speaks here

👁️ One reading is God watching Ephraim

🔁 Another reading is Ephraim watching God

📖 Either way, attention replaces old neglect

## 🌲 I Am Like A Green Fir Tree, From Me Is Thy Fruit Found

A fir tree stays green through every season, unlike trees that lose their leaves.

Idols could never provide anything real, no matter how much was offered to them.

This tree image pictures God himself as the one constant, living source of good.

"Fruit" here means the blessing and provision Israel actually needed.

The chapter ends by naming exactly where real provision has always come from.

🌲 A fir tree stays green always

🚫 Idols never provided anything real

🍎 Fruit means real blessing and provision

📖 Real provision always came from God

## 🧠 Who Is Wise, And He Shall Understand These Things

Hosea closes this whole book the way wisdom writings often close, with a direct question.

It is not a casual question, it is almost a test for the reader.

Understanding what has just been read takes more than simply reading the words.

This line invites the reader to actually think it through, not just move on.

🧠 This closing question is almost a test

📚 Wisdom writings often close this way

🤔 Understanding takes real thought, not skimming

📖 Hosea invites the reader to think it through

## ⚖️ The Ways Of The LORD Are Right, And The Just Shall Walk In Them

"Ways" here means everyday conduct, not a single big decision.

"Right" means straight and level, the opposite of crooked or twisted.

The same path that leads toward God is open for anyone willing to walk it.

Walking it is a daily choice repeated many times, not one dramatic moment.

⚖️ Ways means everyday conduct and choices

📏 Right means straight, not crooked

🚶 The path is open to anyone

📖 Walking it is a daily choice

## ⚠️ But The Transgressors Shall Fall Therein

The same road that lifts up the just also trips up the rebellious.

It is one path, not two separate roads.

"Transgressors" means those who deliberately cross a line they already knew was there.

The ending of this book leaves the reader with a real choice, not a guarantee.

Hosea's whole message comes down to this one fork in the same road.

⚠️ One road, two very different outcomes

🚧 Transgressors knowingly cross a known line

🔀 The ending leaves a real choice

📖 Hosea's message ends on this fork
`.trim();

export const HOSEA_FOURTEEN_PERSONAL_SECTIONS = parseHoseaFourteenRawNotes(HOSEA_FOURTEEN_RAW_NOTES);
