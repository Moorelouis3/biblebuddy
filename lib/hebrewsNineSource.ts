export type HebrewsNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHebrewsNineRawNotes(rawText: string): HebrewsNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HebrewsNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hebrews\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hebrews 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hebrews\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Hebrews\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hebrews 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hebrews 9:${startVerse}` : `Hebrews 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Hebrews 9 sections, received " + sections.length);
  }

  return sections;
}

const HEBREWS_NINE_RAW_NOTES = `# Hebrews 9:1-5
# 🏛️ The Earthly Sanctuary
---
## 📜 Ordinances Of Divine Service

"Ordinances" means fixed rules for how worship had to be carried out.

The first covenant came with a whole system of law attached to it.

Every sacrifice, washing, and festival followed a set pattern.

Worshippers could not choose their own way of approaching God.

This chapter now turns to describe that whole system in detail.

📜 Ordinances means fixed worship rules

⚖️ The first covenant carried many laws

🚫 Worshippers could not choose their own way

➡️ A better covenant was coming

---

## 🌍 A Worldly Sanctuary

"Worldly" here does not mean sinful or corrupt.

It means the sanctuary belonged to this physical world, not heaven itself.

The tabernacle was a real tent built from earthly materials.

It was never meant to be the final version of God's dwelling place.

A copy can still be holy even while it points beyond itself.

🌍 Worldly means belonging to this physical world

⛺ The tabernacle was a real physical tent

🏗️ It was built from earthly materials

📖 A copy can still point beyond itself

---

## 🕯️ The Candlestick, And The Table, And The Shewbread

These three objects furnished the first room of the tabernacle, called the sanctuary.

The candlestick was a gold lampstand that gave the only light inside the tent.

The table held the bread Aaron's sons ate each week before the Lord.

"Shewbread" means bread set out on display, a sign that God provided for His people.

Twelve loaves sat here, one for each tribe of Israel.

🕯️ The candlestick lit the first room

🍞 The table held the shewbread

👥 Shewbread stood for all twelve tribes

📖 The furniture pictured God's provision

---

## 🚪 The Second Veil

A veil was a thick curtain that separated one section of the tabernacle from another.

The first veil hung at the entrance to the outer room.

This second veil hung further in, closing off the innermost room completely.

Only the high priest ever passed through this second veil, and only once a year.

The curtain itself marked a wall no one else was allowed to cross.

🚪 A veil was a thick dividing curtain

🔒 The second veil hid the innermost room

🙏 Only the high priest passed through it

📖 No one else crossed this wall

---

## 🏺 The Holiest Of All

This inner room is also called the Holy of Holies elsewhere in the Bible.

It was the most sacred space on earth.

God's presence rested here in a special way.

No ordinary person ever entered this room.

Not even most priests were allowed inside.

Everything about its design marked it as set apart.

This is the room the whole sacrificial system was built to protect.

🏺 Holiest Of All means Holy of Holies

✨ God's presence rested here in a special way

🚫 Almost no one was allowed to enter

📖 The whole system protected this room

---

## 🔥 The Golden Censer, And The Ark Of The Covenant

A censer was a small container used for burning incense before the Lord.

"The ark of the covenant" was a wooden chest covered in gold.

Incense represented prayer rising up to God, a sweet smell He accepted.

The ark held the most sacred items in all of Israel's worship.

Both objects sat inside the innermost room of the tabernacle.

🔥 A censer burned incense before the Lord

📦 The ark was a gold covered wooden chest

🙏 Incense pictured prayer rising to God

📖 Both objects stayed in the innermost room

---

## 🍯 The Golden Pot That Had Manna, And Aaron's Rod That Budded

The ark held two more remarkable objects besides the stone tables.

One was a jar of manna, the bread God sent daily in the wilderness.

The other was Aaron's rod, a walking stick that sprouted almonds overnight.

That rod had settled a dispute over who God had chosen as priest.

Each object proved God had spoken and provided in ways no one could deny.

Together they kept Israel from forgetting what God had already done.

🍯 Manna recalled God's daily provision

🌿 Aaron's rod recalled a settled dispute

📜 The tables recalled God's spoken law

📖 Together they kept Israel from forgetting

---

## 👼 The Cherubims Of Glory Shadowing The Mercyseat

"Cherubims" are angelic figures, often pictured with wings spread wide.

Two gold cherubim stood on top of the ark, facing each other.

Their wings stretched out and touched above the ark's lid.

"Shadowing" means covering, the way a bird covers its nest with outstretched wings.

"Mercyseat" was the golden lid itself, the exact place God's presence met Israel.

The writer stops here, saying this detail cannot be explained further in a short letter.

👼 Cherubims are winged angelic figures

🪽 Their wings covered the ark's lid

🙏 Mercyseat means the place God met Israel

📖 Shadowing pictures God's covering presence

# Hebrews 9:6-10
# ⛔ Priests And The Limits Of Earthly Worship
---
## 🚶 The Priests Went Always Into The First Tabernacle

Ordinary priests entered the outer room of the tabernacle every single day.

Their job was to keep the lamps lit and the bread fresh.

This was normal, repeated, everyday service.

It never changed and never went deeper than that outer room.

Only one man, once a year, ever went further.

🚶 Priests entered the outer room daily

🕯️ They kept the lamps lit

🍞 They kept the bread fresh

➡️ Only one man went further

---

## 🙏 The High Priest Alone Once Every Year

Only the high priest could enter the innermost room, the Holiest of all.

He could only go in on one single day each year.

That day was called the Day of Atonement.

No other priest, however senior, was permitted to go with him.

This extreme limit showed how serious the separation between God and sin really was.

🙏 Only the high priest entered

📅 He entered once each year

🚫 No other priest went with him

📖 The limit showed how serious sin is

---

## 🩸 Not Without Blood

The high priest never entered empty handed.

He always carried the blood of a sacrificed animal with him.

Blood represented a life that had been given up in place of the sinner.

Without that blood, he could not approach God's presence and live.

This pattern repeats across the whole Old Testament sacrificial system.

🩸 Blood always went in with him

💔 Blood stood for a life given up

🚫 He never approached God without it

📖 This pattern ran through the whole system

---

## ⚠️ The Errors Of The People

"Errors" here means sins committed without full intention, mistakes as well as willful wrongs.

The high priest offered blood for his own sins first.

Then he offered blood again for the sins of the whole nation.

No one, not even the priest himself, stood exempt from needing this.

Everyone depended on the same blood for the same reason.

⚠️ Errors means sins, even unintended ones

🙏 The priest offered blood for himself first

👥 Then he offered blood for the nation

📖 Everyone needed the same blood

---

## 🕊️ The Holy Ghost This Signifying

The Holy Spirit was teaching a lesson through this whole arrangement.

The lesson was not really about a tent or a curtain.

It was about access, whether sinners could freely approach God or not.

As long as the first tabernacle stood, that access stayed blocked.

The physical veil was a picture of a much bigger problem.

🕊️ The Spirit taught through this arrangement

🔒 The real issue was access to God

🚧 Full access stayed blocked for now

📖 The veil pictured a bigger problem

---

## ✅ Could Not Make Him That Did The Service Perfect

"Perfect" here means fully clean, with nothing left unresolved.

The gifts and sacrifices offered under this system were real, but limited.

They covered outward requirements without fully settling the deeper problem.

A worshipper could leave the ceremony and still feel unclean inside.

The system itself admitted that something more was still needed.

✅ Perfect means fully clean

🎁 The gifts and sacrifices were limited

😟 Worshippers could still feel unclean inside

📖 The system admitted something more was needed

---

## 🧠 Pertaining To The Conscience

"Conscience" is the part of a person that knows right from wrong.

These old sacrifices could clean a person's outward status before the law.

They could not touch guilt felt on the inside.

A guilty conscience is a weight no ritual alone can lift.

That deeper need is exactly what the rest of this chapter answers.

🧠 Conscience means the inner sense of guilt

📋 Sacrifices cleaned outward status only

⚖️ Inner guilt remained untouched

➡️ A deeper answer is coming

---

## ⏳ Until The Time Of Reformation

These old rules covered food, drink, and ceremonial washing.

"Carnal ordinances" means rules dealing with the physical body, not the heart.

They were never meant to last forever.

"Reformation" here means the time when something better would finally arrive.

That time is the arrival of Christ himself.

🍽️ Old rules covered food and washing

👤 Carnal ordinances means rules for the body

⏳ These rules were never permanent

📖 Reformation means Christ's arrival

# Hebrews 9:11-14
# ✝️ Christ The Greater High Priest
---
## 🏛️ A Greater And More Perfect Tabernacle

Christ also serves as a high priest, but in a far better sanctuary.

This greater tabernacle is not a tent on earth at all.

It is the true, heavenly reality that the earthly tent only copied.

Everything in the old system was pointing toward this all along.

Christ fulfilled that old pattern completely.

✝️ Christ is a greater high priest

🏛️ His tabernacle is the heavenly reality

📜 The earthly tent only copied it

📖 Christ fulfilled the pattern completely

---

## 🙌 Not Made With Hands

Human hands built the earthly tabernacle out of wood, cloth, and metal.

This greater tabernacle was never built by human hands at all.

"Not made with hands" is a common Bible phrase for anything that comes directly from God.

It marks the difference between something earthly and something eternal.

Christ's ministry belongs entirely to that eternal category.

🔨 Human hands built the old tabernacle

🙌 This one was not built by hands

🌌 The phrase marks something as eternal

📖 Christ's ministry belongs to eternity

---

## 🩸 By His Own Blood He Entered In Once

The old high priest entered using the blood of goats and calves.

Christ entered using his own blood instead.

He did not need an animal substitute to die in his place.

He was the sacrifice and the priest offering it, both at once.

He also only needed to enter once, never repeating the act.

🐐 The old priest used animal blood

🩸 Christ used his own blood

👑 He was priest and sacrifice both

📖 He entered once, never repeating it

---

## 💰 Eternal Redemption For Us

"Redemption" means buying someone back out of bondage or debt.

The old sacrifices had to be repeated every single year.

Christ's one sacrifice purchased a redemption that never runs out.

"Eternal" here means it never needs to be renewed or repaid.

This is the first time this letter calls the result eternal.

💰 Redemption means buying someone out of bondage

🔁 Old sacrifices repeated every year

♾️ Christ's redemption never runs out

📖 Eternal means it never needs renewing

---

## 🐄 The Ashes Of An Heifer

This refers to a ritual described in the book of Numbers.

A red heifer was sacrificed and burned completely to ashes.

Those ashes were mixed with water.

The mixture cleansed anyone who had touched a dead body.

It restored a person to outward, ceremonial cleanness.

The writer uses this well known ritual to introduce something far greater.

🐄 A red heifer was burned to ashes

💧 The ashes were mixed with water

🧼 The mixture restored ceremonial cleanness

📖 This ritual introduces something greater

---

## 🧹 Purge Your Conscience From Dead Works

"Purge" means to clean out completely.

It removes everything that does not belong.

"Dead works" means actions that cannot produce real spiritual life.

Religious routine done only out of guilt falls into this category.

Christ's sacrifice does not just cover guilt.

It clears the conscience out entirely.

🧹 Purge means clean out completely

💀 Dead works cannot produce real life

😔 Guilt driven routine fits this category

📖 Christ's sacrifice clears the conscience out

---

## 🙏 To Serve The Living God

A cleared conscience is not the end goal, only the starting point.

"Serve" here means active worship, not quiet relief.

"The living God" contrasts with the lifeless idols of the ancient world.

Idols demanded ritual without ever actually responding to anyone.

The living God responds, forgives, and can actually be reached.

🧹 A clear conscience is a starting point

🙏 Serve means active worship

🗿 Idols never responded to anyone

📖 God can be served from the heart

# Hebrews 9:15-17
# 📜 The Mediator Of A New Testament
---
## 🤝 The Mediator Of The New Testament

A mediator stands between two parties and makes peace between them possible.

Christ stands between God and sinful people in exactly this way.

He does not just deliver a message between the two sides.

His own death is what actually makes the new agreement valid.

Without him, there is no new testament to mediate at all.

🤝 A mediator makes peace possible

✝️ Christ stands between God and people

🩸 His death makes the agreement valid

📖 Without him there is no new testament

---

## ⚖️ The Redemption Of The Transgressions

"Transgressions" means sins committed against God's law.

These particular sins were the ones committed under the first testament.

The old sacrifices covered them outwardly but never fully paid for them.

Christ's death reaches backward and pays the full price for those old sins too.

Nothing from the entire Old Testament period is left unresolved.

⚖️ Transgressions means sins against God's law

📜 These sins happened under the first testament

🩸 Christ's death paid for them fully

📖 Nothing is left unresolved

---

## 🎁 Eternal Inheritance

An inheritance is something passed down, usually after someone dies.

"Eternal" means this inheritance never runs out and never gets taken away.

Those who are called receive this promise, not because they earned it.

They receive it because someone else's death made the promise valid.

This is the same pattern as the eternal redemption mentioned earlier in the chapter.

🎁 An inheritance is something passed down

♾️ Eternal means it never runs out

📞 The called receive it as a promise

📖 Someone else's death made it valid

---

## 📝 The Death Of The Testator

A testament here works like a will, the kind people write today.

A "testator" is the person who wrote the will.

A will has no legal power while its writer is still alive.

It only takes effect after the testator dies.

Christ's new testament works on the exact same legal logic.

His death is what puts the whole agreement into force.

📝 A testament works like a will

✍️ A testator is the person who wrote it

⚰️ A will takes effect after death

📖 Christ's death put the testament into force

---

## 🔄 While The Testator Liveth

This verse repeats the same point from a different angle, on purpose.

A will carries no force or strength while its writer is still living.

The writer could still change their mind or rewrite it entirely.

Christ's death removed any possibility of the promise being changed or revoked.

What he secured through dying is now permanently settled.

🔄 This verse repeats the same legal point

📝 A living will has no force yet

🚫 A living writer could still change it

📖 Christ's death permanently settled the promise

# Hebrews 9:18-22
# 🩸 Blood And The First Testament
---
## 📋 Dedicated Without Blood

"Dedicated" means formally set apart and put into official use.

Even the first, old testament could not start without blood.

This pattern goes back to the very first covenant God made with Israel.

Blood was never an afterthought in the sacrificial system.

It was the thing that activated the whole arrangement from the beginning.

📋 Dedicated means formally set apart

🩸 Even the old testament needed blood

📜 This pattern goes back to the beginning

📖 Blood activated the whole arrangement

---

## 🧔 He Took The Blood Of Calves And Of Goats

Moses personally carried out this ceremony for the whole nation.

He used the blood of two specific animals, calves and goats.

This blood represented lives given up in the place of the people's sins.

Moses acted here as a mediator, much like Christ would later.

The ceremony formally activated the covenant between God and Israel.

🧔 Moses carried out this ceremony

🐂 He used blood from calves and goats

💔 The blood stood for lives given up

📖 Moses mediated the covenant like Christ later would

---

## 🌿 Scarlet Wool, And Hyssop

"Hyssop" was a small, leafy plant used like a brush for sprinkling liquid.

Scarlet wool was dyed red cloth, sometimes tied around the hyssop branch.

Both objects appear again at the first Passover in Egypt.

They were simple, everyday materials, not expensive or rare.

God regularly used ordinary objects to apply the most sacred blood.

🌿 Hyssop was a small sprinkling plant

🧵 Scarlet wool was dyed red cloth

🐑 Both appear at the first Passover

📖 God used ordinary objects for sacred blood

---

## 📜 Sprinkled Both The Book, And All The People

Moses sprinkled blood on the written scroll of the law itself.

Then he sprinkled the same blood on the people gathered before him.

Sprinkling the book connected the written words to the blood that sealed them.

Sprinkling the people showed that everyone present was now bound to that same covenant.

Word and blood were joined together in this one ceremony.

📜 Moses sprinkled blood on the written law

👥 He also sprinkled it on the people

🤝 Everyone present was bound to the covenant

📖 Word and blood were joined together

---

## 🩸 This Is The Blood Of The Testament

Moses said these exact words while performing the ceremony.

He called it plainly, the blood of the testament.

These are almost the same words Christ used at the Last Supper.

Jesus pointed back to this exact ceremony when he spoke over the cup.

The old ceremony was always meant to prepare people to recognize the new one.

🗣️ Moses spoke these exact words

🩸 He named it the blood of the testament

🍷 Jesus echoed these words at the Last Supper

📖 The old ceremony prepared people for the new

---

## 🛠️ The Vessels Of The Ministry

Moses did not stop with the book and the people.

He also sprinkled blood on the tabernacle itself and all its furnishings.

"Vessels of the ministry" means every tool and object used in worship.

Nothing involved in approaching God was left untouched by blood.

Even the physical objects needed this kind of cleansing.

⛺ Moses also sprinkled the tabernacle itself

🛠️ Vessels of the ministry means worship tools

🩸 Nothing was left untouched by blood

📖 Even objects needed this cleansing

---

## 🧼 Purged With Blood

"Purged" means made ceremonially clean through a specific process.

Under this old system, blood was the main way that cleansing happened.

Almost every object, person, and place in Israel's worship required it at some point.

This was not a random custom invented by Israel.

It was a pattern God himself established from the very beginning.

🧼 Purged means made ceremonially clean

🩸 Blood was the main cleansing method

📋 Almost everything required it at some point

📖 God established this pattern himself

---

## ⚖️ Without Shedding Of Blood Is No Remission

"Remission" means the full cancellation of a debt or penalty.

This sentence states the rule behind the entire sacrificial system in one line.

Forgiveness under the old covenant was never free of cost.

A life always had to be given in exchange for sin.

This same principle explains exactly why Christ had to die.

⚖️ Remission means a debt fully canceled

💰 Forgiveness always carried a cost

🩸 A life was given in exchange for sin

📖 This explains why Christ had to die

# Hebrews 9:23-28
# ✝️ Christ Appeared Once, Will Appear Again
---
## 🏛️ Better Sacrifices Than These

The earthly tabernacle and its furniture were only patterns of heavenly realities.

Even patterns needed to be purified using the blood available on earth.

The real heavenly things needed a far better sacrifice to be purified.

No animal blood could ever reach into heaven itself.

Only a perfect sacrifice could accomplish that.

🏛️ The tabernacle was only a pattern

🩸 Earthly patterns used earthly blood

🌌 Heaven needed a better sacrifice

📖 Only a perfect sacrifice could reach it

---

## 📋 Figures Of The True

"Figures" here means copies or representations of something real.

The earthly holy place was only ever a figure.

It stood in for something greater.

Christ did not enter a man made copy of heaven.

He entered heaven itself.

Heaven is the true and original place.

Everything on earth was pointing toward this one moment.

📋 Figures means copies of something real

🏛️ The earthly place was only a figure

🌌 Christ entered heaven itself

📖 Heaven is the true, original place

---

## 👁️ Now To Appear In The Presence Of God For Us

Christ is not hiding or waiting somewhere distant.

He is actively present before God right now.

"For us" means he represents His people in that presence.

No earthly high priest could ever claim this kind of access.

Christ's work did not end at the cross.

It continues in heaven right now.

👁️ Christ is actively present before God

👥 For us means he represents His people

🚫 No earthly priest had this access

📖 Christ's work continues in heaven now

---

## 🐐 With Blood Of Others

The old high priest entered the holy place again and again, every single year.

Each time, he carried blood that was not his own.

He offered the same kind of sacrifice repeatedly, year after year.

Christ never needed to repeat anything.

One offering of his own blood finished the job completely.

🔁 The old priest entered year after year

🐐 He always carried someone else's blood

🚫 Christ never needed to repeat it

📖 One offering finished the job completely

---

## 🔁 Since The Foundation Of The World

Repeating the sacrifice endlessly would create a real problem.

Christ would have needed to suffer and die many times.

That would reach all the way back to the beginning of the world.

Instead, his sacrifice only needed to happen once.

One sacrifice was always enough to cover every sin in history.

🔁 Repeating sacrifices endlessly creates a problem

💀 Christ would need to die many times

🌍 That would reach back to the world's beginning

📖 One sacrifice covered every sin in history

---

## 📅 Once In The End Of The World

Instead, Christ appeared only once, at a specific point in history.

"The end of the world" does not mean a future apocalypse here.

It names the last era of God's plan.

Christ's appearing opened that final era.

His one appearance accomplished what endless rituals never could.

He put away sin itself.

He did not just manage it for another year.

📅 Christ appeared once in history

🌍 End of the world means the final era

✨ His appearing opened that final era

📖 He put away sin itself

---

## ⏳ Appointed Unto Men Once To Die

Every single person faces this same appointment, death itself.

No one escapes it through wealth, status, or effort.

Death is not random or avoidable in the end.

It is appointed, meaning it is fixed by God himself.

This universal appointment sets up the very next point the writer makes.

⏳ Every person faces death once

💰 Wealth cannot avoid this appointment

📌 Appointed means fixed by God

➡️ This sets up the next point

---

## ⚖️ But After This The Judgment

Death is not the final event in a person's story.

Judgment follows immediately after it.

This judgment evaluates how a person responded to God during their life.

No one can delay or avoid this second appointment either.

This is exactly the moment Christ's sacrifice was designed to answer.

⚖️ Judgment follows death immediately

📋 It evaluates a person's whole life

🚫 No one can delay this appointment

📖 Christ's sacrifice answers this exact moment

---

## ✝️ Shall He Appear The Second Time

Christ already appeared once, to bear the sins of many.

He will appear a second time in the future.

This second appearance will not deal with sin at all.

That work was already finished at the cross.

Instead, this appearance brings final salvation to those who are waiting for him.

✝️ Christ already appeared once for sin

🔁 He will appear a second time

✅ Sin was already finished at the cross

📖 His return brings final salvation
`.trim();

export const HEBREWS_NINE_PERSONAL_SECTIONS = parseHebrewsNineRawNotes(HEBREWS_NINE_RAW_NOTES);
