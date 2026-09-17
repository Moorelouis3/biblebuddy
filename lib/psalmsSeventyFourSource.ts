export type PsalmsSeventyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyFourRawNotes(rawText: string): PsalmsSeventyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+74:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 74 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+74:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+74:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 74 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 74,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 74:${startVerse}` : `Psalms 74:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 74 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_FOUR_RAW_NOTES = `# Psalms 74:1-3
# 😢 Cast Off Like Forgotten Sheep
---
## 😢 Why Hast Thou Cast Us Off For Ever

For ever here voices raw despair, not a literal claim about God's nature.

The psalmist is not accusing God of breaking a promise forever.

He is asking a question no one wants to actually answer yes to.

This kind of complaint appears often in psalms written after national disaster.

😢 For ever expresses despair, not doctrine

❓ The question expects no real answer

📜 Disaster prompted this kind of complaint

📖 Even this doubt gets voiced to God

## 🐑 Thine Anger Smoke Against The Sheep Of Thy Pasture

Smoke pictures anger rising visibly, the way smoke rises from a fire.

Sheep of thy pasture is a common name for Israel as God's own flock.

The same picture appears in Psalm 100, describing the same relationship.

Calling them sheep reminds God of his role as their shepherd, not their judge.

🔥 Smoke pictures anger rising visibly

🐑 Sheep of thy pasture names Israel

📜 The same image appears in Psalm 100

📖 It reminds God he is their shepherd

## 🙏 Remember Thy Congregation, Which Thou Hast Purchased Of Old

Remember here is a plea, not a claim that God actually forgot anything.

Congregation means the whole assembled nation, not a single group inside it.

Purchased of old points back to the exodus, when God redeemed Israel from Egypt.

The prayer grounds its request in something God already did, not something new.

🙏 Remember is a plea, not a fact

🤝 Congregation means the whole nation

🌊 Purchased of old points to the exodus

📖 The prayer leans on God's past act

## ⛰️ This Mount Zion, Wherein Thou Hast Dwelt

Mount Zion names the specific hill in Jerusalem where the temple stood.

Wherein thou hast dwelt describes God's own presence as resting there.

The destroyed building was not just a structure, it was believed to house God himself.

That belief is exactly what makes the coming description so devastating.

⛰️ Mount Zion names Jerusalem's temple hill

🏠 God's presence was believed to dwell there

💔 The destruction targets more than a building

📖 It sets up the devastation to come

## 😞 Lift Up Thy Feet Unto The Perpetual Desolations

Lift up thy feet asks God to walk over and personally look at the ruins.

Perpetual desolations means damage that has sat unrepaired for a long stretch of time.

This is not a casual request, it asks God to witness the wreck firsthand.

The next verses describe exactly what he would see if he came.

🚶 Lift up thy feet means come and see

💥 Perpetual desolations means long unrepaired ruin

👀 It asks God to witness this firsthand

📖 The next verses describe what he would see

# Psalms 74:4-8
# 🔥 Enemies Burn The Sanctuary
---
## 🦁 Thine Enemies Roar In The Midst Of Thy Congregations

Roar pictures a lion's cry, the sound of a predator celebrating a kill.

In the midst of thy congregations means this happened inside the place of worship itself.

The enemy did not attack from outside and retreat, they occupied the holy space.

Hearing that sound where prayer once happened made the loss even harder to bear.

🦁 Roar pictures a lion's victory cry

⛪ This happened inside the place of worship

😔 The enemy occupied the holy space

📖 The sound replaced what prayer once filled

## 🚩 They Set Up Their Ensigns For Signs

Ensigns were military banners, carried by an army to mark its presence and victory.

Setting them up inside the temple openly declared who was now in control.

Signs here means the enemy's own symbols, planted where God's symbols once stood.

A conquered building often received exactly this kind of visible marker.

🚩 Ensigns were military victory banners

👑 Setting them up declared new control

🔄 Enemy symbols replaced God's own signs

📖 Conquered buildings often received this marker

## 🪓 They Break Down The Carved Work Thereof At Once With Axes And Hammers

The verse before this one describes a man once praised for skill with an axe on tall trees.

That same tool, once a mark of honest craft, now tears apart the temple's own carvings.

Carved work likely refers to the detailed wood paneling described in the building of Solomon's temple.

The irony is sharp.

The very skill that built the temple is now used to destroy it.

🪓 Axes once marked skilled craftsmen

🏛️ Carved work names the temple's paneling

🔄 The same tool now destroys instead of builds

📖 The irony sharpens the loss

## 🔥 They Have Cast Fire Into Thy Sanctuary

This line describes an actual historical event, not a poetic exaggeration.

Fire cast into the sanctuary means the building itself was deliberately set ablaze.

Many scholars connect this psalm to either the Babylonian destruction or a later crisis under foreign rule.

Either way, the psalm is responding to a real, remembered disaster.

🔥 This describes a real historical event

🏛️ The sanctuary was deliberately burned

📜 Scholars debate exactly which crisis this is

📖 The psalm answers a remembered disaster

## 🏚️ Defiled By Casting Down The Dwelling Place Of Thy Name

Dwelling place of thy name is another way of naming the temple itself.

Thy name stands in for God's own reputation and presence, not just a label.

Casting it down to the ground means the building was leveled completely.

Tearing down that place felt like an attack on God's own honor, not only stone and wood.

🏠 Dwelling place of thy name means the temple

🔤 Thy name stands for God's presence

💥 Casting down means leveled completely

📖 The attack targeted God's own honor

## 🕯️ They Have Burned Up All The Synagogues Of God In The Land

Synagogues here does not mean the buildings Jews later gathered in after the exile.

The word in this older text more likely refers to smaller local meeting places for worship.

Burning all of them in the land describes destruction reaching beyond the main temple alone.

The disaster spread across the whole country, not just its most famous building.

🕯️ Synagogues here means local meeting places

🗺️ The destruction reached beyond the temple

🔥 Burned up describes total loss

📖 Disaster spread across the whole land

# Psalms 74:9-11
# 🤷 No Signs, No Prophet, No Answer
---
## ❓ We See Not Our Signs

Signs here means the visible proofs of God's presence that Israel once relied on.

These could be miracles, prophetic acts, or other reminders that God was active among them.

Seeing none of those signs left the people feeling abandoned, not just defeated.

The absence itself became part of the grief, not only the destruction.

👀 Signs meant visible proofs of God's presence

✋ These included miracles and prophetic acts

😔 Their absence deepened the grief

📖 Silence felt like part of the loss

## 📜 There Is No More Any Prophet

A prophet was the one person who could bring a direct word from God.

Without one, the people had no way to know what God was doing or planning.

This detail explains why the earlier questions feel so unanswered and open.

The silence was not only emotional, it was also a real lack of information.

📜 A prophet carried God's direct word

🤐 Without one, no answers were possible

❓ This explains the unanswered questions

📖 Silence was both emotional and informational

## ⏳ How Long Shall The Adversary Reproach

Adversary here refers to the specific enemy who destroyed the temple, not enemies in general.

Reproach means public insult, mocking God and his people in front of others.

How long is a common cry in psalms of lament, asking for a limit on suffering.

The question does not doubt that God will act, only when.

⚔️ Adversary means the specific attacking enemy

🗣️ Reproach means public mocking insult

⏳ How long asks for a limit on suffering

📖 The question is about timing, not doubt

## 🗣️ Shall The Enemy Blaspheme Thy Name For Ever

Blaspheme means speaking against God with open contempt, not simple disagreement.

Thy name again stands for God's own reputation, just as it did earlier in the psalm.

For ever repeats the same fear voiced back in verse one.

The psalm keeps circling this fear, unable to fully set it down.

🗣️ Blaspheme means speaking with open contempt

🔤 Thy name means God's reputation again

🔁 For ever repeats the fear from verse one

📖 The psalm keeps circling this same fear

## ✋ Why Withdrawest Thou Thy Hand, Even Thy Right Hand

Withdrawest thou thy hand pictures God pulling back from acting.

At least that is how the silence feels to those praying.

Right hand is a common picture for strength and decisive action in this culture.

The question does not claim God has no power.

It only means the power seems held back right now.

Naming it this way keeps the complaint honest without denying who God is.

✋ Withdrawing the hand pictures pulled back action

💪 Right hand pictures strength and power

❓ The complaint questions timing, not power

📖 Honesty here does not deny who God is

## 👊 Pluck It Out Of Thy Bosom

Bosom pictures a hand tucked inside a robe, resting and out of use.

Pluck it out asks God to bring that hidden strength back into action now.

The image is intimate, describing God's own body language during this waiting.

It turns a theological complaint into a very physical, human sounding request.

👐 Bosom pictures a hand tucked away resting

🙌 Pluck it out asks for action now

🎭 The image is intimate and physical

📖 It makes the complaint sound human

# Psalms 74:12-17
# 🌊 Remembering The God Who Made The World
---
## 👑 God Is My King Of Old, Working Salvation In The Midst Of The Earth

This verse marks a clear shift, from complaint to remembering who God actually is.

King of old points to a long relationship, not a claim God just started ruling recently.

Working salvation in the midst of the earth describes God's action as public, not hidden.

The rest of this section will list specific examples of exactly that kind of action.

🔄 This verse shifts from complaint to memory

👑 King of old means a long relationship

🌍 His saving work was public, not hidden

📖 Specific examples follow next

## 🌊 Thou Didst Divide The Sea By Thy Strength

The sea most likely refers to the Red Sea, split apart during the exodus from Egypt.

Dividing it by strength names this as an act of raw power, not a natural coincidence.

The psalmist reaches back to the most famous rescue in Israel's whole history.

Remembering that moment builds the case that God can still act now.

🌊 The sea likely means the Red Sea

💪 Dividing it took real power

📜 This recalls Israel's most famous rescue

📖 It builds the case God can act now

## 🐉 Thou Brakest The Heads Of The Dragons In The Waters

Ancient cultures nearby often pictured chaos and disorder as monsters living in the sea.

Dragons here borrows that same picture, without adopting the beliefs behind it.

Breaking their heads pictures God defeating chaos itself, not just one historical enemy.

The exodus becomes an example of a much bigger pattern, God ruling over disorder.

🐉 Dragons pictured chaos in ancient thought

🌊 The image sits inside familiar sea imagery

💥 Breaking heads means defeating chaos itself

📖 The exodus becomes proof of a bigger pattern

## 🐋 Thou Brakest The Heads Of Leviathan In Pieces

Leviathan names a massive sea creature, sometimes real, sometimes clearly symbolic in scripture.

Here it stands for the same chaos and threat pictured by the dragons just before it.

Breaking it in pieces repeats the claim that God's power reaches even the fiercest threats.

The repetition is deliberate, driving the same point home a second way.

🐋 Leviathan names a massive sea creature

🌊 It symbolizes chaos, like the dragons

💥 In pieces stresses complete defeat

📖 Repetition drives the same point home

## 🍖 Gavest Him To Be Meat To The People Inhabiting The Wilderness

This does not describe a literal dinner served to desert travelers.

Many scholars believe it pictures a defeated carcass left for scavengers.

People inhabiting the wilderness may point to animals.

The text does not tell us for certain which group is meant.

Either reading pictures the same result.

Nothing of the threat was left standing.

🍖 This is not a literal dinner

🦴 It likely pictures a defeated carcass

❓ The exact identity is not made clear

📖 Nothing of the threat was left standing

## 💧 Thou Didst Cleave The Fountain And The Flood

Cleave the fountain pictures opening a source of water that had been sealed shut.

Thou driedst up mighty rivers pictures the opposite, stopping water that had been flowing freely.

Think of a dam being opened in one place and closed in another on the same afternoon.

Both pictures point to the same truth.

God controls water in either direction.

💧 Cleave the fountain means opening water

🏜️ Drying rivers means stopping water

🚧 Think of one dam opened, one closed

📖 God controls water in either direction

## 🌞 The Day Is Thine, The Night Also Is Thine

This line claims ownership over the most basic rhythm of ordinary life.

Thou hast prepared the light and the sun ties that ownership directly back to creation.

Even something as constant and unremarkable as daylight belongs to God first.

The psalm is building from famous rescues down to the most everyday of details.

🌞 Day and night both belong to God

✨ This traces back to creation itself

🔁 Even the ordinary belongs to him

📖 The psalm moves from rescue to routine

## 🗺️ Thou Hast Set All The Borders Of The Earth

Borders here means the outer edges and limits that shape the whole world's geography.

Thou hast made summer and winter extends the same claim to the changing seasons.

Both details describe order that people rely on without ever thinking to thank God for it.

This entire section has been building toward exactly this kind of quiet, constant care.

🗺️ Borders means the earth's outer limits

🍂 Seasons are named as his work too

🙈 People rely on this without noticing

📖 Quiet, constant care closes this section

# Psalms 74:18-21
# 🙏 Appealing To The Covenant, Not Merit
---
## 📢 Remember This, That The Enemy Hath Reproached, O LORD

This points back to everything just described, the burned sanctuary and the enemy's mockery.

The prayer returns to the same word used back in verse two, remember.

That the foolish people have blasphemed thy name repeats an earlier complaint.

Circling back to earlier language shows how tightly this whole psalm holds together.

👉 This points back to the whole disaster

🔁 Remember repeats the plea from verse two

🗣️ Blasphemed repeats an earlier complaint

📖 The psalm circles back on itself

## 🕊️ Deliver Not The Soul Of Thy Turtledove Unto The Multitude Of The Wicked

Turtledove pictures Israel as a small, gentle bird, not a powerful nation.

Multitude of the wicked pictures a large hostile crowd, dangerous by sheer number.

Think of one bird surrounded by a whole flock of predators circling closer.

The image makes Israel's weakness, not its strength, the whole point of the plea.

🕊️ Turtledove pictures a small gentle bird

🐺 The multitude pictures a hostile crowd

🎯 Weakness, not strength, drives this plea

📖 One bird faces a circle of predators

## 🤲 Forget Not The Congregation Of Thy Poor For Ever

Poor here does not only describe people without money.

In these prayers it often means anyone without power to defend themselves.

The congregation includes the whole nation in exactly that condition right now.

The request simply reverses the fear voiced back in the psalm's opening line.

🤲 Poor here means powerless, not just broke

👥 The whole nation fits that description now

🔄 This reverses the psalm's opening fear

📖 Weakness itself becomes the appeal

## 📜 Have Respect Unto The Covenant

Covenant means the formal promise God made to Israel, sealed generations earlier.

Have respect unto asks God to act because of that promise, not because Israel deserves it.

This shifts the whole prayer's foundation from merit onto God's own faithfulness.

Appealing to a promise is a very different kind of request than appealing to fairness.

📜 Covenant means God's formal promise

🙏 The appeal rests on the promise, not merit

🔄 This shifts the prayer's whole foundation

📖 Faithfulness, not fairness, is the ask

## 🌑 The Dark Places Of The Earth Are Full Of The Habitations Of Cruelty

Dark places here likely describes hidden corners of the land, not literal darkness.

Habitations of cruelty means homes and communities built around violence toward others.

This detail widens the complaint beyond just the ruined temple.

Cruelty had settled in and made itself at home across the whole land.

🌑 Dark places means hidden corners of the land

🏚️ Habitations of cruelty means violent communities

🗺️ This widens the complaint beyond the temple

📖 Cruelty had settled in and made itself home

## 😞 Let Not The Oppressed Return Ashamed

Oppressed means someone crushed by unfair treatment from those with more power.

Return ashamed pictures leaving a place of prayer with the same problem, still unanswered.

Let the poor and needy praise thy name pairs this fear with a hoped for opposite ending.

The prayer asks for relief that turns into public praise, not just quiet endurance.

😞 Oppressed means crushed by unfair power

🙈 Ashamed pictures an unanswered, humiliated exit

🎉 Praise is the hoped for opposite ending

📖 Relief, not endurance, is the actual ask

# Psalms 74:22-23
# ⚔️ Arise, O God, Plead Thine Own Cause
---
## ⚔️ Arise, O God, Plead Thine Own Cause

Arise does not literally mean God has been sitting somewhere doing nothing.

Plead thine own cause reframes the whole crisis as an attack on God's honor.

This shift matters, it gives God a personal reason to act beyond simple sympathy.

The psalmist is not only asking for rescue, he is asking God to defend his own name.

⚔️ Arise calls for decisive action

👑 This reframes the attack as against God

🎯 It gives God his own reason to act

📖 Defending his name becomes the real ask

## 😤 Remember How The Foolish Man Reproacheth Thee Daily

Foolish man here uses the same wisdom language scripture uses for someone who ignores God.

Reproacheth thee daily means the mockery has not stopped since the disaster began.

Daily adds weight, this insult has become part of ordinary, repeated life.

Naming it this bluntly keeps the prayer from softening what is actually happening.

😤 Foolish man means someone ignoring God

🗣️ Reproacheth means ongoing mockery

📆 Daily shows the insult never stopped

📖 The prayer names this bluntly, not softly

## 🔊 Forget Not The Voice Of Thine Enemies

Voice of thine enemies gathers every insult described earlier into one final image.

The tumult of those that rise up against thee closes the psalm on rising danger.

Increaseth continually means the threat is not settling down.

It is actively growing worse instead.

The psalm ends without a clean resolution, still waiting on the God it has just remembered.

🔊 This gathers every earlier insult together

📈 Increaseth continually means the threat is growing

⏳ The psalm ends without clean resolution

📖 It closes still waiting on God`.trim();

export const PSALMS_SEVENTY_FOUR_PERSONAL_SECTIONS = parsePsalmsSeventyFourRawNotes(PSALMS_SEVENTY_FOUR_RAW_NOTES);
