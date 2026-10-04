export type DanielTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseDanielTenRawNotes(rawText: string): DanielTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: DanielTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Daniel\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Daniel 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Daniel\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Daniel\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Daniel 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Daniel 10:${startVerse}` : `Daniel 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Daniel 10 sections, received " + sections.length);
  }

  return sections;
}

const DANIEL_TEN_RAW_NOTES = `# Daniel 10:1-3
# 🙇 Daniel's Three Week Fast
---
## 🏺 In The Third Year Of Cyrus King Of Persia

Cyrus was the Persian king who had already conquered Babylon.

He was also the king who let the Jewish exiles return home.

This vision came about two years into his reign, not right at the start.

Many Jews had already returned to Jerusalem by then.

Daniel was still serving in Persia instead.

Even far from home, God still had more to show him.

🏺 Cyrus had already conquered Babylon

🏠 Many Jews had already returned home

📍 Daniel remained behind in Persia

📖 God still spoke to him there

## 🏷️ Whose Name Was Called Belteshazzar

Belteshazzar was the Babylonian name given to Daniel back in chapter one.

Babylon had already fallen to Persia years earlier.

Yet that old name still followed him.

Daniel had now lived faithfully under two world empires, Babylon and then Persia.

His faith never depended on which kingdom ruled over him.

🏷️ Belteshazzar was Daniel's Babylonian name

🏛️ Babylon had already fallen to Persia

👑 Daniel served faithfully under both empires

📖 His faith outlasted every empire

## ⏳ But The Time Appointed Was Long

This phrase means the events in the vision were still far off in the future.

Daniel understood what he saw, but he knew it would not happen soon.

That kind of knowledge can weigh on a person more than confusion ever could.

Seeing the future clearly does not always bring comfort.

⏳ Time appointed was long means far off

🧠 Daniel understood the vision fully

😔 Clear knowledge still weighed on him

📖 Understanding does not always comfort

## 📆 I Daniel Was Mourning Three Full Weeks

Three full weeks means exactly twenty one days, not a loose guess.

This was not mourning over a death.

Daniel was grieving over what he had seen and what still troubled him.

A set number of days shows this was a deliberate discipline, not a passing mood.

Daniel chose to carry his grief with real structure and purpose.

📆 Three full weeks means twenty one days

😔 This was not grief over a death

🧠 Daniel grieved over the troubling vision

📖 He gave his grief real structure

## 🍞 I Ate No Pleasant Bread

Pleasant bread means bread made with its usual flavor and quality.

It is not food eaten only to survive.

Daniel kept eating, but he stripped every enjoyment out of his meals.

This was not a total fast from food.

It was choosing plainness on purpose, every single day, for three weeks straight.

🍞 Pleasant bread means flavorful, enjoyable food

🥣 Daniel kept eating, just without enjoyment

🚫 Not a full fast from food

📖 Plainness chosen on purpose, daily

## 🥩 Neither Came Flesh Nor Wine In My Mouth

Flesh means meat.

Wine was the drink people used for celebration.

Both were common foods at any normal meal, not rare luxuries.

Giving up meat and wine went further than giving up fancy bread.

Daniel stripped away comfort food on every level he could.

🥩 Flesh means meat

🍷 Wine was for celebration

🚫 Both were ordinary, everyday foods

📖 Daniel stripped away comfort completely

## 🧴 Neither Did I Anoint Myself At All

To anoint means to rub the skin or hair with scented oil.

People in this culture used oil daily for basic grooming and comfort.

Skipping it for three straight weeks was a visible sign of grief.

Daniel's sorrow was not only inward.

It was something anyone could see just by looking at him.

🧴 Anoint means rubbing on scented oil

🧼 Oil was normal daily grooming

👀 Skipping it signaled visible grief

📖 Daniel's sorrow showed on the outside

# Daniel 10:4-6
# ✨ The Man By The River
---
## 📅 In The Four And Twentieth Day Of The First Month

This date falls about three weeks after Daniel likely began his fast.

That means his fast stretched across Passover, one of Israel's most joyful festivals.

Most Israelites were celebrating deliverance from Egypt during exactly these weeks.

Daniel spent that same season fasting and grieving instead.

His concern for his people outweighed even a joyful holy season.

📅 Day twenty four falls after Passover

🎉 Passover was one of Israel's joyful feasts

😔 Daniel fasted through that same season

📖 His grief outweighed even a holy feast

## 🌊 The Great River, Which Is Hiddekel

Hiddekel is the ancient name for the Tigris River.

It is one of the four rivers named flowing out of the garden of Eden in Genesis two.

Daniel stood on the same river system the Bible traces all the way back to the beginning.

This vision happens on ground with history reaching back to creation itself.

🌊 Hiddekel is the ancient Tigris River

🌳 It is one of Eden's four rivers

📜 Genesis two already names this river

📖 Ancient history surrounds this vision

## 🧵 A Certain Man Clothed In Linen

Linen was the fabric specifically required for the priests serving in the temple.

This clothing detail hints at something priestly or holy about this figure.

Many scholars believe this points to the figure's heavenly rank, not simply royal clothing.

The figure's identity is shown through what he wears before he even speaks.

🧵 Linen was priestly temple clothing

⛪ This figure's role looks priestly

👑 Many scholars see heavenly rank here

📖 Clothing reveals identity before any words

## 🥇 Girded With Fine Gold Of Uphaz

Girded means wrapped around the waist, like a belt.

Uphaz was likely a region known for producing especially fine gold.

The Bible does not tell us exactly where Uphaz was located.

A solid gold belt marked someone of the highest possible rank.

Everything about this figure points to supreme authority.

🧷 Girded means wrapped like a belt

🥇 Uphaz was known for fine gold

❓ Its exact location is not given

📖 The belt marks supreme authority

## 💎 His Body Also Was Like The Beryl

Beryl is a gemstone known for its bright, almost glass like shine.

Describing a body this way means it looked radiant, not ordinary flesh.

This was the first of several glowing details describing this figure.

Even his body looked like it was made of light.

💎 Beryl is a bright, glowing gemstone

✨ His body looked radiant, not ordinary

🔆 The first of many glowing details

📖 Even his body looked made of light

## ⚡ His Face As The Appearance Of Lightning

Lightning flashes bright for only a second, almost too intense to look at directly.

Describing a face this way means it was overwhelming to see straight on.

No ordinary human face looks like this.

This figure's glory was too much for human eyes to take in comfortably.

⚡ Lightning flashes bright and sudden

👁️ His face was hard to look at

🚫 No ordinary human face compares

📖 His glory overwhelmed human eyes

## 🏮 His Eyes As Lamps Of Fire

Lamps burn with a steady flame.

Fire can either warm something or consume it completely.

Eyes described this way suggest a gaze that misses nothing.

This detail echoes similar language later used in Revelation to describe Christ.

Many scholars debate whether this figure is an angel or a greater being.

A gaze like fire is not easy to stand under.

🏮 Lamps burn with steady fire

🔥 Fire can consume completely

👁️ This gaze misses nothing

📖 Many scholars debate who this is

## 🔊 The Voice Of His Words Like The Voice Of A Multitude

A multitude means a large crowd of people speaking together.

One voice sounding like many people at once is not something a human throat can do.

Everything about this being broke the normal limits of a human body.

Even his voice announced that something far greater than a man was speaking.

👥 Multitude means a large crowd

🔊 One voice sounded like many

🚫 No human body works this way

📖 His voice announced something greater than man

# Daniel 10:7-9
# 😱 Alone Before The Vision
---
## 👥 I Daniel Alone Saw The Vision

Daniel was not traveling by himself when this happened.

Other men stood right beside him the entire time.

Only Daniel actually saw the figure described just before this.

Centuries later, Paul's companions on the road to Damascus had a similar experience.

They heard something, but they did not see what Paul saw.

God can reveal Himself to one person alone.

Everyone else nearby may only sense that something is happening.

👥 Other men stood right beside him

👁️ Only Daniel saw the vision

📜 Paul's companions had a similar moment

📖 God can reveal Himself to one person

## 😨 A Great Quaking Fell Upon Them

Quaking means violent, uncontrollable trembling.

These men felt real terror even without seeing what caused it.

Something was happening that their bodies could sense before their minds understood it.

Fear can arrive before any explanation does.

😱 Quaking means violent trembling

🫨 They felt terror without seeing the cause

🧠 Their bodies sensed it first

📖 Fear can arrive before explanation

## 💀 My Comeliness Was Turned In Me Into Corruption

Comeliness means a healthy, normal appearance.

Corruption here describes something closer to decay, like the look of a dying body.

Daniel's own face changed color and shape from the sheer intensity of this vision.

What he saw did not just frighten him.

It physically wrecked him.

😨 Comeliness means a healthy appearance

💀 Corruption suggests a decaying look

🤕 The vision changed his body, not his mood

📖 This encounter physically wrecked him

## 🛑 I Retained No Strength

This is not an exaggeration about feeling tired.

Daniel's body genuinely gave out under the weight of this encounter.

Later in the chapter, this same collapse happens again more than once.

Meeting this being cost Daniel something real, every single time.

🛑 Not simple tiredness, real collapse

🧍 His body gave out completely

🔁 This happens again later too

📖 Every encounter cost him something real

## 😴 I Was In A Deep Sleep On My Face

This deep sleep is not ordinary rest.

The same Hebrew word describes the trance God put Abram into back in Genesis fifteen.

It is a state God causes, not something a person chooses to enter.

Daniel did not nod off.

God overwhelmed him into stillness.

😴 Not ordinary sleep, a divine trance

📜 The same word describes Abram's trance

🙌 God causes this state, not the person

📖 God overwhelmed him into stillness

# Daniel 10:10-14
# 🛡️ The Delay Explained
---
## ✋ An Hand Touched Me

After collapsing completely, Daniel needed outside help just to move at all.

A single touch lifted him onto his knees and hands.

This is only a partial recovery, not a full return to strength.

Sometimes God's help arrives in small steps instead of all at once.

✋ A single touch moved him

🙇 Knees and hands, only partial recovery

🪜 Help came in stages

📖 God's help often arrives step by step

## 💛 A Man Greatly Beloved

This exact phrase was already used about Daniel back in chapter nine.

It is a title of deep approval from heaven, not just a kind compliment.

Daniel receives this same high honor more than once in this book.

Heaven's opinion of Daniel never wavered across these visions.

💛 Same title used in chapter nine

👑 A mark of deep heavenly approval

🔁 Daniel receives this honor again

📖 Heaven's view of Daniel never changed

## 🧍 I Stood Trembling

Daniel obeys the command to stand up.

His body still shakes even though he obeys.

Obedience and fear are not opposites here.

Fear does not cancel out real obedience.

🧍 Daniel obeys the command to stand

🫨 His body still shakes

✅ Obedience and fear are not opposites

📖 Fear does not cancel real obedience

## 🙏 Thy Words Were Heard

Daniel's prayer was answered on the very first day he started praying.

The messenger carrying that answer still took three full weeks to arrive.

Delay in receiving an answer does not mean the prayer went unheard.

God heard Daniel immediately, even though Daniel had to wait to find that out.

🙏 His prayer was heard on day one

⏳ The answer still took three weeks

❓ Delay does not mean unheard

📖 God heard him before Daniel knew it

## 👻 The Prince Of The Kingdom Of Persia Withstood Me

This prince is not a human Persian official.

The Bible describes a spiritual being with real authority tied to this earthly kingdom.

Earthly political struggles can have an unseen spiritual struggle running underneath them.

Many scholars believe this points to the real existence of territorial spiritual opposition.

A battle no human eye could see delayed this answer for three full weeks.

👤 Not a human Persian official

👻 A spiritual being tied to Persia

⚔️ An unseen battle under an earthly one

📖 This hidden battle caused the delay

## 🛡️ Michael, One Of The Chief Princes

Michael is identified elsewhere in Daniel as Israel's own guardian prince.

He ranks among the highest angelic beings, not an ordinary messenger.

He arrives specifically to help the angel speaking with Daniel.

Israel had a powerful, named defender standing in this unseen battle.

🛡️ Michael guards Israel specifically

👑 He ranks among the highest angels

🤝 He came to help this messenger

📖 Israel had a named, powerful defender

## 📍 I Remained There With The Kings Of Persia

The messenger did not simply deliver his message and leave right away.

He stayed engaged in whatever was happening around Persia's rulers.

The spiritual conflict introduced earlier in this passage was still ongoing.

This battle did not end the moment Daniel got his answer.

📍 The messenger stayed near Persia's kings

⚔️ The spiritual conflict kept going

⏳ It did not end with this visit

📖 The battle outlasted this one answer

## 🔮 What Shall Befall Thy People In The Latter Days

Latter days here points toward the future of Daniel's own people, Israel.

This phrase sets up the long, detailed prophecy that fills the next two chapters.

Everything from here through chapter twelve answers this one question.

This verse is the doorway into some of the Bible's most detailed future prophecy.

🔮 Latter days points to Israel's future

📖 It opens chapters eleven and twelve

🚪 This verse is a doorway forward

➡️ Detailed prophecy follows from here

## 🔁 The Vision Is For Many Days

This repeats and confirms what was already said back in verse one.

The events in this vision were not going to happen right away.

Daniel had to carry this knowledge without seeing it fulfilled in his own lifetime.

Not every true word from God arrives with an immediate payoff.

🔁 Repeats the point from verse one

⏳ These events were still far off

🧓 Daniel would not live to see it

📖 Truth does not always arrive quickly

# Daniel 10:15-17
# 😩 Daniel's Collapse
---
## 🤐 I Became Dumb

Dumb here means Daniel physically lost the ability to speak.

This was not shyness or hesitation.

The sheer weight of the vision shut down his voice completely.

Some experiences are too overwhelming for words to come out at all.

🤐 Dumb means unable to speak

🚫 Not shyness, a real loss of voice

😵 Overwhelm shut down his voice

📖 Some moments leave no words at all

## 👆 Touched My Lips

This is a different touch than the one back in verse ten.

That earlier touch helped Daniel move onto his knees and hands.

This touch specifically restores his ability to speak.

Daniel is helped back one step at a time, strength first, then speech.

👆 A second, different touch than before

🙇 The first touch restored movement

🗣️ This touch restores speech

📖 Recovery comes one step at a time

## 😖 My Sorrows Are Turned Upon Me

Sorrows here means real physical pain, not only sadness.

Daniel's whole body is reacting to what he has seen.

Encountering this being left a real mark on him physically.

This was not only an emotional moment.

It was a physical one too.

😖 Sorrows here means real physical pain

🫀 His whole body reacts, not just emotions

🤕 The vision left a physical mark

📖 This was emotional and physical both

## 💨 Neither Is There Breath Left In Me

Daniel describes himself as being on the edge of death.

This is the strongest language yet about how weak he has become.

Three separate moments in this chapter now describe this same total collapse.

Standing in the presence of this being had a real physical cost.

💨 Breath left means near death

📉 The strongest weakness language yet

🔁 The third collapse described in this chapter

📖 This presence carried a real cost

## 🙇 How Can The Servant Of This My Lord Talk With This My Lord

Daniel calls this figure my lord twice in one short line.

Servant is how Daniel describes his own position in comparison.

This language shows complete reverence, not simply polite respect.

Daniel positions himself far beneath the one standing in front of him.

🙇 My lord repeated twice for emphasis

🧎 Servant shows his own low position

🙏 This is reverence, not mere politeness

📖 Daniel places himself far beneath this being

# Daniel 10:18-21
# 💪 Strengthened For What Comes
---
## ✋ He Strengthened Me

This is now the third distinct touch in this one chapter.

The first touch moved him.

The second touch gave him speech.

This third touch finally restores real physical strength.

God rebuilt Daniel in careful stages, not all at once.

✋ The third distinct touch in this chapter

🙇 First touch moved him

🗣️ Second touch gave him speech

📖 God rebuilt him in careful stages

## 🔁 Be Strong, Yea, Be Strong

Repeating a command twice in a row is a common way the Bible shows real emphasis.

This is not Daniel misreading a casual comment.

The messenger means this with full seriousness and urgency.

Some commands get said twice because once is not strong enough.

🔁 Repetition shows strong emphasis

📜 A common Bible pattern for urgency

💪 This command is serious, not casual

📖 Twice because once was not enough

## 🗣️ Let My Lord Speak

Daniel finally finds the courage to ask the messenger to continue.

He explicitly credits the fresh strength he was just given.

Without that strength, he could not have spoken a single word.

God equips a person before asking something hard of them.

🗣️ Daniel invites the messenger to speak

💪 He credits his newly given strength

🙅 Without it, he could not have spoken

📖 God equips before He asks something hard

## ⚔️ Now Will I Return To Fight With The Prince Of Persia

This confirms the same spiritual battle already introduced earlier in this chapter.

The messenger's work with Daniel does not end this conflict.

He is heading right back into it immediately after this.

This vision is one stop inside a much longer unseen war.

⚔️ Confirms the same battle from before

🔁 The conflict continues after this visit

🚪 He returns to it right away

📖 One stop in a longer unseen war

## 🏺 The Prince Of Grecia Shall Come

Grecia is the KJV name for Greece.

This names the next great empire after Persia, long before it actually rose to power.

History later confirms this, since Greece under Alexander did replace Persia as the ruling empire.

Chapter eleven goes on to describe this same transition in far greater detail.

This single line previews an empire change that had not happened yet.

🏺 Grecia is the KJV name for Greece

🔮 Named before it ever rose to power

📜 History later confirmed this exactly

📖 Chapter eleven unpacks this in detail

## 📜 The Scripture Of Truth

This points to a heavenly record of what God has already determined will happen.

It is not describing an earthly book Daniel could go read.

What gets revealed to Daniel comes from something already fixed and settled.

The future in this vision was not a guess.

It was already written.

📜 A heavenly record, not an earthly book

🔒 What God determined is already fixed

🔮 Daniel reads from something already settled

📖 This future was written, not guessed

## 🤝 There Is None That Holdeth With Me In These Things, But Michael Your Prince

Holdeth with me means stands beside me, as an ally in this struggle.

Only one being is named as backing this messenger up, Michael.

This matches exactly what was already said about Michael back in verse thirteen.

This same Michael appears again later in chapter twelve, still guarding Israel.

In this vast unseen battle, Israel still had exactly one powerful friend.

🤝 Holdeth with me means stands as an ally

🛡️ Michael alone backs up this messenger

🔁 Matches what verse thirteen already said

📖 Israel had one powerful heavenly friend
`.trim();

export const DANIEL_TEN_PERSONAL_SECTIONS = parseDanielTenRawNotes(DANIEL_TEN_RAW_NOTES);
