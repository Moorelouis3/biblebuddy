export type IsaiahFortyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyFourRawNotes(rawText: string): IsaiahFortyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+44:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 44 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+44:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+44:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 44 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 44,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 44:${startVerse}` : `Isaiah 44:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 44 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_FOUR_RAW_NOTES = `# Isaiah 44:1-5
# 🌊 Blessing Poured Out Like Water
---
## 🔄 Yet Now Hear, O Jacob My Servant

"Yet" signals a turn away from what was just said.

Chapter forty three just ended with Jacob's sin and a coming curse.

This chapter shifts straight into comfort without losing the thread of the story.

God moves from correction to encouragement in the very next sentence.

🔄 Yet marks a sudden turn

📜 Chapter forty three ended in judgment

🌤️ Chapter forty four opens in comfort

📖 God moves from correction to promise

## 🎯 Israel, Whom I Have Chosen

Being chosen was never based on Israel's good behavior.

The previous chapter said Israel grew weary of God and loaded Him with sin.

Right after that, God repeats this same word, chosen.

His choice does not depend on how well Israel had been acting.

🎯 Chosen never meant earned

📜 This follows a chapter about failure

🔁 God repeats chosen right after it

📖 God's choice does not depend on performance

## 🤰 Formed Thee From The Womb

This pictures God shaping Israel the way a baby is shaped before birth.

It is the same word used for how a person forms in the womb.

Applied to the whole nation, it means God shaped Israel's identity from its very beginning.

Nothing about Israel's existence caught God by surprise.

🤰 Formed from the womb means shaped early

👤 This borrows the picture of a birth

🌱 Israel's identity formed from the start

📖 Nothing about Israel surprised God

## 🏷️ Thou, Jesurun

"Jesurun" is a rare, affectionate nickname for Israel.

It comes from a Hebrew word close to upright, the upright one.

It shows up only a few times in the whole Bible, always as a term of endearment.

Using it here softens the tone right after the words fear not.

🏷️ Jesurun is a rare nickname

✅ It relates to the word upright

📚 It appears only a few times in scripture

📖 It is a term of endearment

## 💧 Pour Water Upon Him That Is Thirsty

Water in a dry land like Israel's was never taken for granted.

A thirsty land and a thirsty person both picture deep, desperate need.

God promises to meet that need generously, not barely enough to survive.

This physical picture sets up the spiritual promise in the very next line.

💧 Water pictured urgent need

🏜️ Dry ground means desperate thirst

🎁 God promises more than enough

📖 This sets up the spiritual promise next

## 🌱 I Will Pour My Spirit Upon Thy Seed

"Seed" means Israel's descendants, the generations still to come.

Pouring water and pouring the Spirit are paired here on purpose.

Just as water restores dry ground, the Spirit restores a spiritually dry people.

This promise looks forward past the current generation alone.

🌱 Seed means future descendants

💧 Water and Spirit are paired images

🔄 The Spirit restores spiritual dryness

📖 The promise reaches future generations

## 🌾 Spring Up As Among The Grass

This continues the water and growth picture from the verse before.

Grass in a dry country grows fast wherever water reaches it.

Willows planted near flowing water grow thick and strong without a struggle.

Israel's future growth is pictured as natural and easy once God's blessing arrives.

🌱 Continues the water and growth picture

🌾 Grass grows fast wherever water reaches

🌳 Willows thrive near flowing water

📖 Blessing here means easy, abundant growth

## ✍️ Subscribe With His Hand Unto The LORD

"Subscribe" is an old word for signing your own name to something.

In this culture that meant marking your own hand as a sign of belonging.

This pictures people from outside Israel choosing to belong to the LORD.

Their claim is voluntary and personal, not something they were simply born into.

✍️ Subscribe means signing your name

✋ People marked their hand as a sign

🌍 This includes people outside Israel

📖 Belonging becomes a personal choice

## 🏷️ Surname Himself By The Name Of Israel

Taking on the name Israel means claiming a spiritual identity, not a blood relation.

This looks forward to a day when many outside Jacob's own family join God's people.

A surname used this way works like a public declaration of loyalty.

The blessing promised earlier in this section reaches beyond the original family line.

🏷️ Surname means claiming a new identity

🩸 This is not about blood relation

📢 It works like a public declaration

📖 God's family grows beyond one bloodline

# Isaiah 44:6-8
# 👑 I Am The First And I Am The Last
---
## ⚔️ The LORD Of Hosts

LORD of hosts pictures God commanding a vast, ordered army of heavenly beings.

"Hosts" means armies or vast, ordered numbers.

Calling God King and Redeemer and LORD of hosts stacks three titles together.

Each title points to a different kind of authority, ruling, rescuing, and commanding.

⚔️ Hosts means vast, ordered armies

👑 King points to ruling authority

🛟 Redeemer points to rescuing authority

📖 Three titles, three kinds of power

## ⏮️ I Am The First, And I Am The Last

This claims existence before anything else began and after everything else ends.

No other god in the ancient world made this kind of claim.

Nations worshipped gods tied to one place, one harvest, or one narrow role.

This God is not limited to a season or a place.

⏮️ First means before all things

⏭️ Last means after all things

🗺️ Other gods were tied to one place

📖 This God has no beginning point

## 👴 Since I Appointed The Ancient People

The ancient people likely points to Israel's founding as a nation, stretching back to Abraham.

God claims responsibility for choosing and shaping that whole history from its earliest point.

No rival god can point to a history that old or that carefully directed.

This is another form of the courtroom challenge from the chapter before.

👴 Ancient people points to Israel's founding

📜 God claims that whole history

🚫 No rival has history like this

📖 Real history backs up the claim

## 👀 Ye Are Even My Witnesses

This repeats the exact courtroom language from the chapter before.

Israel's own history of watching God act becomes their evidence again.

Being a witness means testifying to what actually happened, not just what someone believes.

The proof here is not abstract. It is their own lived experience.

⚖️ This repeats courtroom language

👀 Israel's history is their evidence

🗣️ A witness testifies to real events

📖 Their proof comes from lived experience

## ❓ I Know Not Any

This is about as plain as a claim can get.

God is not saying other gods are weaker or lesser than He is.

He is saying He is not aware of any other real god existing at all.

This directly sets up the mockery of idols that follows in the next verses.

❓ Not a claim of superiority

🚫 It is a claim that none exist

🔗 This sets up the idol mockery ahead

📖 A strong claim, a sharper argument follows

# Isaiah 44:9-11
# 🗿 Idol Makers Put To Shame
---
## 🗿 They That Make A Graven Image

A graven image is an idol carved or shaped by human hands out of wood, stone, or metal.

"Vanity" here means emptiness, something with no real substance or worth.

The maker and the object made both end up empty in this description.

This line sets up the long, detailed mockery that fills the rest of the section.

🗿 Graven image means a hand carved idol

💨 Vanity means empty, worthless

🙅 Maker and object both end up empty

📖 This sets up the mockery ahead

## 👀 Their Own Witnesses, They See Not, Nor Know

This flips the witness language from the verse before in a mocking way.

Israel's witnesses actually saw God act in real history.

An idol's witnesses are blind and unaware, since they worship something with no power to prove itself.

The contrast between these two kinds of witnesses could not be sharper.

🔄 Flips the witness language from before

👀 Israel's witnesses actually saw God act

🙈 Idol worshippers are blind witnesses

📖 A blind witness proves nothing

## 🔥 Molten A Graven Image

"Molten" describes metal that has been melted down and poured into a mold.

This names a second method alongside carving, melting metal into a shape.

Either way the object begins as raw, ordinary material.

The question itself is the whole argument, since no good answer exists.

🔥 Molten means melted and poured

⚒️ A second method alongside carving

🪨 It starts as ordinary material

📖 The question itself is the argument

## 🔨 The Workmen, They Are Of Men

This points out something almost too obvious to need saying.

The people who make gods are themselves just ordinary men.

An ordinary man cannot produce something greater than himself.

Stating this plainly exposes how backward idol worship really is.

🔨 Workmen means the idol makers

👤 They are just ordinary men

⬆️ A maker cannot exceed himself

📖 Idol worship gets the order backward

## 👥 Let Them All Be Gathered Together

God invites every idol maker to appear together in one place.

This mirrors the courtroom scene from the chapter before, where nations were summoned.

A large group standing together does not make their case any stronger.

Numbers cannot make an empty claim true.

👥 All idol makers invited together

⚖️ Mirrors the earlier courtroom scene

🔢 Numbers do not strengthen a weak case

📖 Many empty witnesses still prove nothing

# Isaiah 44:12-14
# 🔨 The Smith And The Carpenter
---
## 🔨 The Smith With The Tongs

A smith is a craftsman who works metal using fire and tools.

"Tongs" are the metal pincers used to hold hot metal safely.

This verse describes the exact physical labor behind making a metal idol.

Isaiah is not exaggerating. He is describing an ordinary workday.

🔨 A smith works metal with tools

🔥 Tongs hold metal safely over fire

💪 This is ordinary physical labor

📖 Nothing here is mysterious or divine

## 😮‍💨 He Is Hungry, And His Strength Faileth

The maker of this god gets tired, thirsty, and weak while building it.

A being with real power would not need help from an exhausted craftsman.

The irony sits right in the text without needing to be explained further.

The god gets made by someone weaker than the God who made everything else.

😮‍💨 The maker gets tired and weak

🍞 He needs food and water himself

😅 Real power would not need his help

📖 A tired hand cannot make a tireless god

## ✏️ He Marketh It Out With The Compass

A "rule" here means a measuring stick, and "line" and "compass" are marking tools.

This describes precise, skilled woodworking, not careless craft.

The precision itself is part of the mockery, since careful work still only produces wood.

Skill can shape material. It cannot create life or power.

📏 Rule means a measuring stick

✏️ Line and compass mark and draw shapes

🪚 This describes precise, skilled woodwork

📖 Skill cannot turn wood into life

## 🧑‍🎨 After The Figure Of A Man

This idol is deliberately shaped to look attractive, like an admirable human figure.

The craftsman controls exactly how his god will look.

An idol made in man's image is the exact reverse of Genesis, where man was made in God's image.

The whole relationship between creator and creation gets flipped here.

🧑‍🎨 The idol is shaped to look human

🎨 The maker controls its appearance

🔄 This reverses being made in God's image

📖 The maker made the idol, not the reverse

## 🌧️ He Planteth An Ash, And The Rain Doth Nourish It

Cedar, cypress, oak, and ash were all common trees used for fuel and building alike.

The craftsman plants the tree and waits years for ordinary rain to grow it.

The very rain that grows this future idol comes from the true God, not from the idol itself.

The material for a false god depends completely on the true God's own provision.

🌳 Cedar, cypress, oak, and ash were common trees

🌧️ Ordinary rain grows the tree over years

♻️ The idol's material depends on real provision

📖 God's rain grows a false god's wood

# Isaiah 44:15-17
# 🔥 Half For Fire, Half For A God
---
## 🪵 Then Shall It Be For A Man To Burn

The very same tree now serves two completely different purposes.

Part of it becomes ordinary firewood for warmth and cooking.

The rest becomes an object of worship, bowed down to as a god.

No line separates the firewood from the god except the craftsman's own choice.

🪵 One tree serves two purposes

🔥 Part becomes ordinary firewood

🗿 The rest becomes an object of worship

📖 Only the craftsman's choice separates them

## 🍞 He Kindleth It, And Baketh Bread

Kindling a fire and baking bread were basic daily tasks in any ancient household.

Nothing about this description feels spiritual or unusual in the moment.

The idol comes from the exact same pile of scrap wood as that evening's dinner.

Ordinary, unremarkable material becomes an object of worship just verses later.

🔥 Kindling and baking were daily tasks

🍞 Bread came from the very same fire

🪵 The idol shares the same wood pile

📖 Nothing sacred marks where this god began

## 😌 Aha, I Am Warm, I Have Seen The Fire

This captures the man's plain, satisfied reaction to ordinary firewood.

He cooked his food and warmed his body with no confusion about what the wood did.

He clearly understands this half of the tree as fuel, nothing more.

That same clear understanding does not carry over to the other half.

🔥 Aha shows plain satisfaction

🍖 He cooked food with this half

✅ He understands this half as fuel

📖 That clarity vanishes with the other half

## 🪵 The Residue Thereof He Maketh A God

"Residue" means what is left over after the useful part was already burned.

The leftover scrap of wood becomes an object bowed down to and worshipped.

The man treats this scrap as something worth falling down before.

Nothing about the wood itself changed between the fire and the altar.

🪵 Residue means the leftover scrap

🗿 That scrap becomes an object of worship

🙇 He falls down before it directly

📖 The wood itself never actually changed

## 🙏 Deliver Me, For Thou Art My God

The leftover scrap of wood receives a prayer for rescue and protection.

The man prays to an object he personally cut, carved, and carried home.

He asks it to deliver him from danger it cannot even see.

The absurdity is not implied here. It is stated as plainly as possible.

🙏 He prays to a scrap of wood

✋ He personally made this object himself

⚠️ He asks it to deliver him from danger

📖 The wood cannot see the danger at all

# Isaiah 44:18-20
# 💨 Feeding On Ashes
---
## 👁️ He Hath Shut Their Eyes, That They Cannot See

This echoes the exact picture from the chapter before about people who are blind though they still have eyes.

The blindness described here is not physical. It is a refusal to see the obvious.

Their own choices produced this blindness over time.

A closed heart eventually stops noticing what should be plain.

👁️ Echoes the blind eyes from before

🙈 This blindness is not physical

🔒 Their own choices caused it

📖 The eyes work, the willingness does not

## 🌳 Shall I Fall Down To The Stock Of A Tree

This is the exact question the man never actually asks himself.

"Stock" here just means the trunk or leftover chunk of a tree.

If he asked it honestly, the whole practice would fall apart instantly.

The failure here is not a lack of intelligence. It is a refusal to stop and think.

❓ The question he never actually asks

🌳 Stock means the leftover tree trunk

💭 Asking it honestly would end the practice

📖 The failure is refusing to think, not stupidity

## 💨 He Feedeth On Ashes

Ashes have no nutritional value at all.

This pictures a man surviving on something that can never actually satisfy or sustain him.

It is a vivid image for chasing something empty and calling it life.

His hunger for meaning gets fed nothing real.

💨 Ashes have no real nutrition

🍽️ This pictures chasing something empty

🫥 His hunger receives nothing real

📖 Wrong worship leaves a person starving

## ↩️ A Deceived Heart Hath Turned Him Aside

Being deceived means believing something false is actually true.

This did not happen suddenly. It built up gradually through the choices described before.

"Turned aside" pictures someone drifting slowly off a straight path.

Small unquestioned habits led to a completely twisted conclusion.

🎭 Deceived means believing a lie is true

🐢 This built up gradually, not suddenly

↩️ Turned aside pictures drifting off a path

📖 Deception creeps in one choice at a time

## ✋ Is There Not A Lie In My Right Hand

The right hand was the hand most often used for skilled work in this culture.

The very hand that carved the idol is the one holding a lie.

The question itself is simple enough for anyone to ask honestly.

A deceived heart keeps that simple question from ever being spoken out loud.

✋ The right hand did the skilled work

🗿 That hand now holds a lie

❓ The question is simple enough to ask

📖 The lie was never hidden, just unquestioned

# Isaiah 44:21-23
# 🎶 Sing, O Ye Heavens
---
## 🧠 Remember These, O Jacob And Israel

These points back to everything just described about idols and their emptiness.

God calls Israel to hold that contrast firmly in mind.

The whole idol section was not a side note. It was building toward this exact command.

Remembering rightly protects against repeating Israel's own past idol worship.

👆 These points back to the idol section

🧠 God calls Israel to remember clearly

🎯 The idol section built toward this command

📖 Clear memory protects against repeating the past

## 🔄 Thou Shalt Not Be Forgotten Of Me

This directly answers Israel's own complaint from earlier in Isaiah that God had forgotten them.

The promise is not vague reassurance. It responds to a specific fear.

Being formed by God and being remembered by God are tied together here.

The one who shaped Israel from the beginning will not lose track of them now.

🔄 This answers Israel's earlier complaint

🎯 It responds to a specific fear

🤝 Being formed and remembered are linked

📖 A maker does not forget what he made

## ☁️ I Have Blotted Out, As A Thick Cloud, Thy Transgressions

Clouds in this picture do not slowly fade away over hours.

Wind can clear a sky completely within a short time.

Comparing forgiven sin to a cleared sky pictures something gone suddenly and completely, not gradually.

This repeats and strengthens the blotting out language already used in the chapter before.

☁️ Clouds can clear away quickly

💨 This pictures sin removed suddenly

🔁 It repeats the blotting language from before

📖 God removes sin completely, not gradually

## 🎁 Return Unto Me, For I Have Redeemed Thee

The order here matters. Redemption comes before the call to return.

This is not Israel earning forgiveness by coming back first.

God already acted to redeem before asking for a response.

Grace leads. Obedience follows after it.

🔀 Redemption comes before the call to return

🎁 This is not earned by coming back first

🛟 God already acted first

📖 Grace leads, obedience follows

## 🌌 Sing, O Ye Heavens, Shout, Ye Lower Parts Of The Earth

This calls on the entire created world to celebrate together.

Heaven and earth, mountains and forests, all get called into the celebration.

Ancient poetry often pictured creation itself responding to God's own actions.

Even things with no voice are pictured breaking into song.

🌌 Heavens and earth are both called to sing

🏔️ Mountains and forests join the celebration

🎭 Ancient poetry pictured creation responding

📖 The celebration matches the size of the rescue

# Isaiah 44:24-28
# 👑 Cyrus, My Shepherd
---
## 🙋 I Am The LORD That Maketh All Things

This title claims direct credit for every part of creation.

The redeemer and the creator turn out to be the very same God.

No idol described earlier in this chapter could ever make a claim like this.

Every false god needed a maker. This maker needed no one.

🙋 One title claims all of creation

🔗 Redeemer and creator are the same God

🚫 No idol could claim anything like this

📖 Every idol needed a maker, this did not

## 🌌 That Spreadeth Abroad The Earth By Myself

This verse repeats alone and by myself on purpose, for emphasis.

God had no helper and no council of other gods at creation.

This directly answers every idol just described, since a human hand made every single one of them.

Only this God can claim to have made everything without any assistance.

🙋 Alone and by myself repeat for emphasis

🚫 No helper existed at creation

🔗 This directly answers the idols described

📖 Only this maker needed no helper

## 🔮 Maketh Diviners Mad

Diviners were people who claimed to predict the future using omens, stars, or rituals.

"Tokens" here means the signs or predictions those diviners relied on.

Babylon in particular was known for trusting professional diviners and astrologers.

God states plainly that He can make even their trusted methods fail and confuse them.

🔮 Diviners predicted the future by omens

📜 Tokens means the signs they relied on

🏛️ Babylon was known for trusting diviners

📖 God can make their methods fail

## 🎓 Turneth Wise Men Backward

This targets the trusted scholars and counselors of powerful empires like Babylon.

Their knowledge could look impressive without actually being reliable.

God claims the power to expose that knowledge as worthless whenever He chooses.

Human wisdom without God still has real limits.

🎓 This targets trusted scholars and counselors

🏛️ Babylon relied heavily on such advisors

🃏 Their knowledge could be exposed as worthless

📖 Human wisdom has real limits

## 🗣️ Performeth The Counsel Of His Messengers

"Messengers" here refers to the prophets God sent to speak on His behalf.

This means God backs up and fulfills exactly what His prophets predicted.

Isaiah himself is one of the messengers this promise applies to.

A prophet's words only carry weight if the one who sent them follows through.

🗣️ Messengers means the prophets God sent

✅ God fulfills what His prophets said

📚 Isaiah is one of those messengers

📖 A prophet's words depend on God's follow through

## 🏙️ Thou Shalt Be Inhabited

Jerusalem had not yet even fallen to Babylon at the time Isaiah wrote this.

This promises the city will be lived in again after a coming destruction and exile.

The promise also reaches to the cities of Judah and their decayed, long empty ruins.

God announces the rebuilding before the city has even been destroyed.

🏙️ Jerusalem had not yet fallen here

🔮 It promises life after exile

🏚️ Decayed places means long empty ruins

📖 The promise reaches past a future disaster

## 🌊 That Saith To The Deep, Be Dry

The deep often pictures overwhelming water, whether an ocean or a flooding river.

This recalls God drying a path through the Red Sea generations earlier.

It also points forward to a real historical event described in the very next verse.

Nature itself obeys this God's command instantly.

🌊 The deep pictures overwhelming water

🚶 This recalls the Red Sea crossing

🔮 It also points to an event still coming

📖 Nature obeys this God's command

## 🐑 He Is My Shepherd

Cyrus was the Persian king who conquered Babylon more than a hundred years after Isaiah wrote this.

Cyrus later issued the actual decree that let the Jewish exiles return home and rebuild.

Calling a pagan foreign king my shepherd is a striking, specific claim.

God names this king by his role before he was even born.

👑 Cyrus was a future Persian king

🏛️ He later let exiles return home

🐑 A striking title for a pagan king

📖 God names his role before he was born

## 🏛️ Thy Foundation Shall Be Laid

This specifically predicts the rebuilding of the Jerusalem temple, not just the city around it.

Cyrus's later decree, recorded in the book of Ezra, specifically included rebuilding the temple.

Naming this detail in advance is part of the larger courtroom argument running through the whole chapter.

No other god predicted anything this specific or this far in advance.

🏛️ This predicts the temple rebuilding

📜 Ezra later records Cyrus's actual decree

⚖️ This is the chapter's courtroom proof

📖 No other god predicted anything this specific`.trim();

export const ISAIAH_FORTY_FOUR_PERSONAL_SECTIONS = parseIsaiahFortyFourRawNotes(ISAIAH_FORTY_FOUR_RAW_NOTES);
