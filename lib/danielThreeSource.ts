export type DanielThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielThreeRawNotes(rawText: string): DanielThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 3:${startVerse}` : `Daniel 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Daniel 3 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_THREE_RAW_NOTES = `# Daniel 3:1-7
# 👑 Nebuchadnezzar's Golden Image
---
## 🗼 An Image Of Gold, Whose Height Was Threescore Cubits

"Threescore" means sixty in old English counting.

A cubit measured about eighteen inches, close to one forearm.

Sixty cubits comes out to about ninety feet tall.

The breadth was only six cubits, about nine feet wide.

That makes the image far too thin to stand as an ordinary statue.

Many scholars believe it stood on a tall pedestal or pillar as its base.

📏 Threescore means sixty

📐 A cubit was about eighteen inches

🗼 The image stood ninety feet tall

📖 It likely stood on a tall pedestal

---

## 🗺️ Set Up In The Plain Of Dura

The plain of Dura was an open flat stretch of land near Babylon.

Many scholars believe it sat just outside the city itself.

A flat, open space could hold a massive crowd all at once.

That made it the ideal stage for a public display of loyalty.

Every official in the empire could see the image, and be seen obeying it.

🗺️ Dura was an open plain

🏛️ It sat near Babylon itself

👀 Flat ground let everyone watch

📖 Officials gathered there to be seen obeying

---

## 🏛️ The Princes, The Governors, And Captains

This list names almost every rank of official in the Babylonian government.

Princes ruled whole regions, governors ran individual provinces, captains led the army.

Judges, treasurers, counsellors, and sheriffs covered law, money, and local order.

Summoning every single rank at once was not a small local gathering.

It was the entire structure of the empire standing in one place.

🏛️ Princes ruled whole regions

⚔️ Captains led the army

📜 Judges and treasurers kept order

📖 The whole empire gathered at once

---

## 📢 An Herald Cried Aloud

A herald was an official messenger who announced the king's words in public.

His job was to speak loud enough for an entire crowd to hear at once.

Heralds carried no personal authority of their own.

Every word out of his mouth was the king's own command, not his opinion.

📢 A herald announced the king's words

👂 Crowds had to hear him clearly

🚫 He carried no personal authority

📖 His voice was the king's command

---

## 🌍 O People, Nations, And Languages

Babylon ruled over many different ethnic groups, not one single nation.

This phrase appears several more times across the chapter.

Each repeat is a reminder that the whole empire, not just Babylon's own people, had to obey.

No single culture or language was excused from the command.

🌍 Babylon ruled many different peoples

🔁 This phrase repeats through the chapter

🚫 No group was excused from obeying

📖 The whole empire had to comply

---

## 🎺 The Cornet, Flute, Harp, Sackbut, Psaltery, Dulcimer

This verse lists six different musical instruments.

The cornet and flute were wind instruments played by breath.

The harp and psaltery were stringed instruments plucked by hand.

The sackbut was an early stringed or wind instrument, not the modern trombone some translations assume.

The music was not entertainment here.

It was the timed signal that told the whole crowd exactly when to bow.

🎺 Six instruments are named together

🎻 Some were wind, some were string

🎶 The music was not entertainment

📖 It signaled exactly when to bow

---

## 🔥 Shall The Same Hour Be Cast Into The Midst Of A Burning Fiery Furnace

A furnace this size was likely built for making bricks or working metal, not punishment.

Babylon's famous brick towers needed furnaces exactly like this one.

"The same hour" means immediately, with no trial and no delay.

Refusing the image carried an instant death sentence, decided in advance.

🧱 The furnace likely baked bricks

🔥 It was repurposed for punishment

⏳ The same hour means instantly

📖 No trial stood between refusal and death

---

## 🎶 Fell Down And Worshipped The Golden Image

Every single person at the dedication obeyed the moment the music played.

No one in this massive crowd hesitated or resisted.

That universal, instant obedience is the backdrop for what happens next.

Three men are about to be the only exception in the whole empire.

🎶 Everyone obeyed the moment music played

🙇 No one in the crowd resisted

🌍 Obedience here was total and instant

➡️ Three men will soon stand apart

# Daniel 3:8-12
# 😤 The Chaldeans Accuse The Jews
---
## 🔮 Certain Chaldeans Came Near, And Accused The Jews

"Chaldeans" here names the same class of occult advisers from chapter two.

That class had already failed publicly once, when only Daniel could reveal the king's dream.

Shadrach, Meshach, and Abednego had been promoted into government positions those men might have wanted for themselves.

Jealousy, not just religion, likely fueled this accusation.

🔮 Chaldeans were the same advisers from chapter two

😤 That class had already failed once

📈 The three friends held their old jobs

➡️ Jealousy likely fueled this accusation

---

## 👑 O King, Live For Ever

This greeting was the standard way anyone addressed a reigning king.

It worked like a formal title, not a real wish for eternal life.

The same words open other scenes earlier in the book.

Here they come right before an accusation, not a compliment.

👑 A standard royal greeting

🎭 Not a literal wish for life

🔁 The same words open earlier scenes

➡️ Formality came right before an accusation

---

## 📜 Thou, O King, Hast Made A Decree

Babylonian legal custom required an accuser to state the law exactly before naming any charge.

These men begin by repeating the king's own command back to him word for word.

That step proved they understood the decree correctly before blaming anyone for breaking it.

Only after restating the law do they finally name names.

📜 Accusers had to state the law first

🔁 They repeat the king's own words

✅ This proved they understood it correctly

➡️ Only then do they name names

---

## 📈 Set Over The Affairs Of The Province Of Babylon

Chapter two ended with Daniel placing his three friends into real government authority.

That promotion happened only because Daniel shared his own reward with them.

Men already working in that same government may have resented being outranked by foreign captives.

This accusation may be less about religion and more about status.

📈 Chapter two gave them real authority

🤝 Daniel shared his reward with them

😤 Native officials may have resented them

➡️ Status, not just faith, was at stake

---

## 👂 These Men, O King, Have Not Regarded Thee

"Regarded" in old English meant paid attention to or obeyed, not simply noticed.

The accusation claims total disrespect for the king personally.

This is a serious legal charge, not just a complaint about religion.

It frames their refusal as disloyalty to Nebuchadnezzar himself.

👂 Regarded means obeyed, not just noticed

⚠️ This claims total personal disrespect

⚖️ It is framed as a legal charge

➡️ Disloyalty to the king, not just faith

---

## 🔀 They Serve Not Thy Gods, Nor Worship The Golden Image

This accusation actually names two separate refusals, not one.

The first is refusing Babylon's gods in general, a long standing practice for these men.

The second is refusing this one specific image, a brand new command.

Combining both made the charge sound bigger than it truly was.

🔀 Two separate refusals are combined here

🏛️ One is refusing Babylon's gods generally

🗿 The other is refusing this one image

➡️ Together they sound like one large crime

# Daniel 3:13-18
# 🔥 Shadrach, Meshach, And Abednego Refuse
---
## 😡 In His Rage And Fury

Naming both rage and fury together is a way of doubling up for emphasis.

Chapter two already described Nebuchadnezzar this same way when his wise men failed him.

Explosive anger is becoming a pattern for this king whenever he is defied.

That pattern makes his reaction here fully expected, not surprising.

🔥 Rage and fury repeat for emphasis

🔁 Chapter two used this same pattern

😡 Explosive anger defines this king

➡️ His reaction here was fully expected

---

## 🎭 Who Is That God That Shall Deliver You Out Of My Hands

This question is not a sincere request for information.

Nebuchadnezzar is boasting that no god is stronger than his own power.

He has already forgotten what this same God revealed to him back in chapter two.

His taunt is about to be answered in a way he never expected.

🎭 This is a boast, not a question

💪 He claims no god is stronger

🤦 He forgets what chapter two showed him

➡️ His taunt is about to be answered

---

## 😌 We Are Not Careful To Answer Thee In This Matter

"Careful" in old English meant full of worry or anxious, not detailed or thorough.

Their answer means they are not anxious about defending themselves to the king.

It does not mean they are refusing to speak out of rudeness.

Their calm comes from confidence, not from disrespect.

😌 Careful meant anxious, not detailed

🧘 They are not anxious about this

🚫 This is not rudeness toward the king

➡️ Their calm comes from real confidence

---

## 🙏 Our God Whom We Serve Is Able To Deliver Us

They state their confidence plainly before anything else.

This is not a guess about what will happen to them.

It is trust placed in God's power, stated out loud in front of the king.

That confidence comes before they know the actual outcome.

🙏 They state their confidence plainly

💪 It is trust in God's power

🗣️ Said out loud before the king

➡️ Confidence came before the outcome was known

---

## 🔑 But If Not

These three words may be the most important in the whole chapter.

Their trust in God does not depend on being rescued.

They commit to obey even if the furnace kills them.

That kind of faith is harder, and worth far more, than faith that expects a guaranteed happy ending.

🔑 These three words carry real weight

🚫 Trust does not depend on rescue

🔥 They would obey even if they died

📖 Real faith does not demand a guarantee

---

## 🔁 We Will Not Serve Thy Gods, Nor Worship The Golden Image

This is the exact same accusation from verse twelve, repeated back word for word.

They do not soften it, explain it away, or ask for mercy.

Repeating the charge as their own final answer took real courage.

Their refusal stands exactly as firm as the accusation against them.

🔁 This repeats the earlier accusation exactly

🚫 They do not soften their answer

😤 Repeating it took real courage

➡️ Their refusal stood completely firm

# Daniel 3:19-23
# 🔥 Cast Into The Furnace
---
## 😠 The Form Of His Visage Was Changed

"Visage" means a person's face or facial expression.

The king's rage was visible, twisting his features in front of everyone watching.

Chapter two never showed his face changing this openly, even during his earlier anger.

His fury here reaches a new, more public level.

😠 Visage means face or expression

🔥 His rage became visibly obvious

📈 This anger surpassed his earlier fury

➡️ His fury was now fully public

---

## 🔢 Heat The Furnace One Seven Times More Than It Was Wont To Be Heated

"Seven times" here is an idiom for an extreme amount, not a literal measurement.

"Wont" means the furnace's normal, usual temperature.

The king is not asking for a careful increase.

He wants the hottest fire anyone has ever seen.

🔢 Seven times means an extreme amount

🌡️ Wont means the usual temperature

🔥 He demanded the hottest fire possible

➡️ This was not a careful increase

---

## 💪 The Most Mighty Men That Were In His Army

The king did not send ordinary guards to bind these three men.

He chose the strongest soldiers available in his entire army.

That choice shows how seriously he took the risk of them resisting or escaping.

It also sets up the next verse, where the fire kills these same strong men instantly.

💪 The king chose his strongest soldiers

🔒 He feared resistance or escape

⚠️ This was not a small precaution

➡️ These same men are about to die

---

## 👖 Bound In Their Coats, Their Hosen, And Their Hats

"Hosen" means leg coverings similar to trousers or leggings.

Their "hats" were likely wrapped head coverings worn by officials, not simple caps.

They were thrown in wearing their full official clothing, nothing removed.

That detail matters later, once their clothes come out completely unharmed.

👖 Hosen means leg coverings

🧢 Hats were official head coverings

👔 They kept their full clothing on

➡️ That detail matters again later

---

## 🔥 The Flame Of The Fire Slew Those Men That Took Up

The furnace was so hot it killed the soldiers who threw the three men inside.

Those soldiers died from the outside heat alone, without ever entering the fire themselves.

That detail proves just how lethal this furnace truly was.

The contrast with what happens to Shadrach, Meshach, and Abednego is about to begin.

🔥 The heat alone killed the soldiers

💀 They died without entering the fire

⚠️ This proves how lethal it was

➡️ A sharp contrast comes next

# Daniel 3:24-27
# 👤 The Fourth Man In The Fire
---
## 😮 Was Astonied, And Rose Up In Haste

"Astonied" is an old form of the word astonished, meaning utterly shocked.

Moments earlier, Nebuchadnezzar was confident enough to taunt their God directly.

Now he jumps to his feet in genuine shock at what he sees.

His whole posture changes from mocking to stunned in a single moment.

😮 Astonied means utterly shocked

😤 He had just been mocking their God

🏃 He jumps up in genuine shock

➡️ His mockery turns to stunned silence

---

## 🔢 Four Men Loose, Walking In The Midst Of The Fire

The king counted three men bound when they were thrown in.

Now he sees four men, and none of them are bound anymore.

God did not just protect them from a distance.

Someone joined them inside the furnace itself.

🔢 Three men were bound going in

👥 Four men now walk freely

🔥 Someone is inside the fire with them

➡️ Protection came from right beside them

---

## 👼 The Form Of The Fourth Is Like The Son Of God

Nebuchadnezzar was a pagan king who did not fully understand Israel's God.

His own words likely meant something closer to a divine being or an angel.

The text does not claim this was a direct appearance of Jesus.

It leaves the fourth man's exact identity deliberately unexplained.

👑 Nebuchadnezzar did not know God fully

👼 His words likely meant a divine being

🚫 The text never names this as Jesus

📖 The fourth man's identity stays unexplained

---

## 🗣️ Ye Servants Of The Most High God, Come Forth

Nebuchadnezzar now uses God's own title with his own mouth.

He calls the three men by the Hebrew names given to them long ago.

Only a few verses earlier, he was mocking their God directly.

His whole tone has completely reversed by the end of this scene.

🗣️ The king speaks God's own title

📛 He uses their Hebrew names again

🔄 His tone has completely reversed

➡️ Mockery became open respect

---

## ✅ Nor Was An Hair Of Their Head Singed

This verse lists the proof of their safety four separate ways.

No power touched their bodies, no hair burned, no clothing changed, no smell remained.

Any one of these details alone would already be remarkable.

Listing all four together proves this was complete, not partial.

✅ Proof is given four separate ways

🔥 No power touched their bodies

👕 Their clothing did not even change

📖 This protection was complete, not partial

# Daniel 3:28-30
# 🙌 The King's Decree Of Praise
---
## 🗣️ Who Hath Sent His Angel, And Delivered His Servants

This is Nebuchadnezzar's own explanation for what he saw in the fire.

He names the fourth figure an angel, not a direct sight of God.

That conclusion came from a pagan king's limited understanding.

The text never fully confirms or corrects his explanation either way.

🗣️ This is the king's own explanation

👼 He calls the fourth figure an angel

👑 A pagan king reached this conclusion

📖 The text leaves his explanation open

---

## 🙌 Yielded Their Bodies

"Yielded" means they willingly handed their bodies over to whatever happened next.

They did not know for certain they would survive the furnace.

Their faith was proven by what they were willing to lose.

A rescue that was guaranteed in advance would not have required real trust.

🙌 Yielded means willingly handed over

❓ They did not know the outcome

🔥 Their faith risked real loss

📖 Real trust does not need a guarantee

---

## 🔁 Shall Be Cut In Pieces, And Their Houses Shall Be Made A Dunghill

This exact threat already appeared once before in chapter two.

There it was aimed at the wise men who could not interpret a dream.

Here the same threat now protects the very God those wise men once failed to honor.

The king's own standard punishment has completely changed sides.

🔁 This threat repeats from chapter two

⚔️ It once targeted the failed wise men

🔄 Now it protects God instead

➡️ The same formula switched sides completely

---

## 📈 The King Promoted Shadrach, Meshach, And Abednego

Daniel was promoted in chapter two for revealing a secret no one else could.

His three friends are now promoted for refusing to bow when everyone else did.

Both promotions followed real risk, not easy success.

Obedience under threat, not escape from it, is what God rewarded both times.

📈 Daniel's promotion came from chapter two

🔥 Theirs came from refusing to bow

⚠️ Both followed real risk, not ease

📖 God rewarded obedience under threat
`.trim();

export const DANIEL_THREE_PERSONAL_SECTIONS = parseDanielThreeRawNotes(DANIEL_THREE_RAW_NOTES);
