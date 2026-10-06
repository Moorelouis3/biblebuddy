export type MicahThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseMicahThreeRawNotes(rawText: string): MicahThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: MicahThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Micah\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Micah 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Micah\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+Micah\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Micah 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Micah 3:${startVerse}` : `Micah 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 Micah 3 sections, received " + sections.length);
  }

  return sections;
}

const MICAH_THREE_RAW_NOTES = `# Micah 3:1-4
# ⚖️ Leaders Who Devour The People
---
## 👑 Heads Of Jacob, And Ye Princes

"Heads" means the ruling leaders over each tribe of Israel.

"Princes" names the same kind of leader under a different title.

Micah calls out the very people responsible for protecting justice.

These were not outsiders abusing power from a distance.

They were Judah's own ruling class.

👑 Heads means the ruling tribal leaders

⚖️ Princes names the same kind of leader

🏛️ Judah's own ruling class is addressed

📖 The accusation comes from inside the leadership
---
## 📏 Is It Not For You To Know Judgment

"Know judgment" here means more than just understanding right from wrong.

It means the leaders had a direct job to practice justice.

Their position came with a built in responsibility to protect the people.

Micah's question is not rhetorical praise.

It is a pointed accusation that they have failed that job.

📏 Know judgment means practicing real justice

🏛️ Leadership carried a built in duty

❌ They failed that basic responsibility

📖 Micah's question exposes their failure
---
## 🔄 Who Hate The Good, And Love The Evil

This describes a complete reversal of normal values.

Good and evil are not simply confused here.

The leaders deliberately swapped right for wrong.

Hating what is right became normal among these leaders.

Loving wrongdoing became something they practiced on purpose.

🔄 Good and evil were deliberately swapped

💔 Hating right became normal for them

😈 Loving wrong became a practiced habit

📖 This leadership normalized moral reversal
---
## 🖼️ Who Pluck Off Their Skin From Off Them

This does not describe actual torture or skinning.

Micah uses cannibalism as a picture of economic cruelty.

Stripping someone's skin stands for stripping away their land and livelihood.

The leaders were consuming the poor the way a butcher works meat.

This is some of the most violent imagery in the whole book.

🖼️ This is cannibalism used as a picture

💰 Skin stands for stolen land and livelihood

🔪 Leaders consumed the poor like a butcher

📖 Violent imagery names real economic cruelty
---
## 👪 Eat The Flesh Of My People

"My people" shows these victims belong to God himself.

The leaders are not attacking outsiders or enemies in war.

They are preying on their own covenant family.

That makes the cruelty even worse than ordinary violence.

God speaks here as the one who owns and loves these people.

👪 My people means God's own covenant family

🚫 These are not enemies from outside

💔 Leaders preyed on their own people

📖 God claims the victims as his own
---
## 🍲 As For The Pot, And As Flesh Within The Caldron

A "caldron" is a large pot used for cooking meat over fire.

Micah pictures the people being chopped up like meat for a meal.

This finishes the cannibalism picture started earlier in the verse.

The leaders treat human lives as nothing more than ingredients.

That is the full weight of the accusation against them.

🍲 Caldron means a large cooking pot

🔪 People are pictured chopped like meat

🥘 Human lives treated as mere ingredients

📖 This completes the cannibalism picture
---
## 🙏 Then Shall They Cry Unto The LORD, But He Will Not Hear Them

This does not mean God refuses to hear anyone who prays.

It means these specific leaders will finally reach out too late.

Their cruelty went on for years before this moment arrives.

Now the same leaders who ignored the poor will be ignored themselves.

Justice finally runs in the other direction.

🙏 Not every prayer here gets an answer

⏳ This cry comes too late to help

🔄 Their own neglect now returns on them

📖 Justice finally runs the other direction
---
## 🙈 He Will Even Hide His Face From Them

"Hide his face" is a common Old Testament picture for withdrawn favor.

A turned away face signals real rejection.

It is not the same as physical distance.

These leaders once ignored the cries of the people they oppressed.

Now God answers their own doings by turning away from them.

🙈 Hide his face means withdrawn favor

🚫 A turned face signals real rejection

🔄 God mirrors their own neglect back

📖 Punishment matches the shape of the sin
# Micah 3:5-8
# 🔥 False Prophets And Micah's True Calling
---
## 🧭 The Prophets That Make My People Err

"Err" means to wander off the right path without realizing it.

These prophets were supposed to guide the people toward God.

Instead their messages led the people further from him.

A true prophet's words should point toward obedience.

These words pointed people away from it instead.

Misleading guidance from a trusted voice does lasting damage.

🧭 Err means wandering off the right path

🗣️ These prophets were supposed to guide

🚫 Their words led people away from God

📖 Trusted voices can mislead just as easily
---
## 🦷 Bite With Their Teeth, And Cry, Peace

"Bite with their teeth" pictures prophets always chewing for more pay.

"Peace" was a promise of safety these prophets had no right to make.

They offered comfort instead of warning.

That comfort lasted only as long as the money kept coming.

A paid message is not the same as a true one.

🦷 Bite with their teeth means always demanding pay

🕊️ Peace was a false promise of safety

💰 Comfort was for sale not the truth

📖 A paid message is not a true one
---
## 💸 He That Putteth Not Into Their Mouths, They Even Prepare War Against Him

These prophets only gave good news to people who paid them well.

Anyone who could not pay was threatened instead of blessed.

"Prepare war" means they turned hostile and attacked that person's reputation.

True prophecy never worked this way.

Loyalty to money replaced loyalty to truth completely.

💸 Good news went only to paying customers

⚔️ Prepare war means becoming openly hostile

🚫 Those who could not pay were attacked

📖 Money replaced truth as their loyalty
---
## 🌙 Night Shall Be Unto You, That Ye Shall Not Have A Vision

A "vision" here means a real message or revelation from God.

These false prophets claimed to receive visions on demand.

Micah announces that the flow of real revelation is about to stop for them.

Night pictures total darkness where no message can come through.

The very gift they faked is about to actually disappear.

🌙 Night pictures total prophetic darkness

🔮 Vision means a real message from God

🚫 Their fake gift is about to vanish

📖 God can remove what he once gave
---
## 🌅 The Sun Shall Go Down Over The Prophets

The sun going down pictures the end of their public influence.

These prophets once spoke with confidence in broad daylight.

That confidence is about to be replaced with total confusion.

Darkness here is not ordinary weather.

It is a symbol of coming judgment.

🌅 Sunset pictures the end of their influence

🗣️ They once spoke with public confidence

🌑 Confusion now replaces that confidence

📖 Darkness symbolizes judgment not weather
---
## 👁️ The Seers Be Ashamed, And The Diviners Confounded

A "seer" was someone believed to see hidden things through visions.

A "diviner" used omens or rituals to predict the future.

Both titles claimed access to secret knowledge from God.

Micah says both will be publicly humiliated when the truth comes out.

👁️ Seer means someone claiming to see visions

🔮 Diviner means someone predicting by omens

😳 Both titles are about to be humiliated

📖 Fake knowledge cannot survive real exposure
---
## 🤐 They Shall All Cover Their Lips

Covering the lips was a visible gesture of shame and silence.

These prophets once spoke constantly and confidently for a living.

Now they have nothing left to say.

The gesture itself becomes proof that their claims were empty.

🤐 Covering lips showed open shame

🗣️ They once spoke confidently for pay

🚫 Now they have nothing left to say

📖 Silence proves their claims were empty
---
## 🔇 For There Is No Answer Of God

This is the real reason behind their sudden silence.

God himself has stopped answering through them.

Their whole profession depended on that connection.

Once it went quiet, there was nothing left to fake.

🔇 God stopped answering through them

🎭 Nothing was left to fake

📞 Their profession needed a real connection

📖 A silent God exposes an empty claim
---
## 🔥 Full Of Power By The Spirit Of The LORD

Micah now contrasts himself directly with the false prophets just described.

Their power came from flattery and payment.

His power comes from the Spirit of the LORD himself.

Real prophetic authority was never something a person could buy or fake.

🔥 Micah contrasts himself with false prophets

💰 Their power came from money and flattery

🕊️ His power came from God's own Spirit

📖 Real authority cannot be bought or faked
---
## 📏 To Declare Unto Jacob His Transgression, And To Israel His Sin

"Transgression" means a specific act that crosses a clear line.

"Sin" names the deeper condition behind that act.

Micah's job was to name both plainly.

He never tried to soften either one.

A true prophet speaks hard truth even when no one wants to hear it.

📏 Transgression means one specific crossed line

🧠 Sin names the deeper condition behind it

🗣️ Micah names both without softening them

📖 True prophecy speaks truth nobody wants
# Micah 3:9-12
# 🏙️ Zion Plowed As A Field
---
## 🤢 That Abhor Judgment, And Pervert All Equity

"Abhor" means hating something with real disgust.

It is stronger than simply disliking it.

"Equity" means fairness applied equally to everyone.

These leaders did not merely neglect justice.

They actively twisted fairness into something unrecognizable.

🤢 Abhor means hating something with disgust

⚖️ Equity means fairness applied to everyone

🔄 They twisted fairness into its opposite

📖 This was active corruption not neglect
---
## 🏙️ They Build Up Zion With Blood

"Zion" refers to Jerusalem, the city where God's temple stood.

These leaders built up that holy city using violence and theft.

Wealth gained through bloodshed still looked impressive on the outside.

God was not impressed by buildings paid for with injustice.

🏙️ Zion means Jerusalem the temple city

🩸 It was built using violence and theft

🏗️ Impressive buildings hid a rotten cost

📖 God judges how wealth was gained
---
## 👑 The Heads Thereof Judge For Reward

"Heads" here means the same ruling leaders named back in verse one.

They were supposed to judge cases honestly, free of charge.

Instead a bribe decided the outcome before the case even began.

Justice itself had a price tag attached to it.

👑 Heads means the same ruling leaders

💰 A bribe decided the outcome in advance

⚖️ Justice had a hidden price tag

📖 Fair judgment was for sale
---
## 📜 The Priests Thereof Teach For Hire

Priests were supposed to teach God's law freely to everyone.

Instead their teaching only came after a payment.

Spiritual guidance became just another transaction.

The people were being charged for truth that was never meant to be sold.

📜 Priests were meant to teach freely

💰 Teaching only came after payment

🔁 Guidance became just another transaction

📖 Truth was never meant to be sold
---
## 🔮 The Prophets Thereof Divine For Money

"Divine" here means to predict or deliver a message claimed to be from God.

These prophets only produced a message once they were paid.

A real message from God was never something to auction off.

Every single office in this verse had quietly been bought.

🔮 Divine means delivering a claimed message from God

💰 Messages only came after payment

🚫 Real revelation was never for sale

📖 Every office in this verse was bought
---
## 🙏 Yet Will They Lean Upon The LORD

This looks like genuine faith on the surface.

It was actually a false sense of safety.

They assumed God's blessing no matter how they behaved.

Real trust in God and ongoing corruption cannot share the same house.

🙏 This looked like faith on the surface

🎭 It was really a false sense of safety

🏠 Faith and corruption cannot share one house

📖 God's blessing is not automatic protection
---
## 🛡️ Is Not The LORD Among Us? None Evil Can Come Upon Us

This question was meant to end the argument before it even started.

They treated God's presence like a permanent shield against any consequence.

God's presence was never a guarantee against judgment for sin.

Their own confidence became the proof of how far they had drifted.

🛡️ They treated God's presence as automatic protection

❌ Presence never guaranteed freedom from judgment

😳 Their confidence showed how far they drifted

📖 Presuming on God is not trusting God
---
## 🚜 Zion For Your Sake Be Plowed As A Field

Plowing a city as a field means tearing it down completely.

Zion was the holy city, not ordinary farmland.

Micah says that holy ground will be leveled like any open field.

"For your sake" makes clear this judgment was earned, not random.

🚜 Plowed as a field means leveled completely

🏙️ Zion was holy ground not farmland

⚖️ This judgment was earned not random

📖 Even holy ground can fall under judgment
---
## 🏔️ The Mountain Of The House As The High Places Of The Forest

"The mountain of the house" means the hill where the temple stood.

That hill was once the most sacred ground in the whole nation.

Micah says it will become as wild and overgrown as any forest ridge.

The place built for God's presence is pictured completely abandoned.

🏔️ Mountain of the house means the temple hill

🌲 It becomes as wild as any forest

🕍 The most sacred ground gets abandoned

📖 Even the temple was not untouchable
`.trim();

export const MICAH_THREE_PERSONAL_SECTIONS = parseMicahThreeRawNotes(MICAH_THREE_RAW_NOTES);
