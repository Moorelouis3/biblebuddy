export type EzekielTwentyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzekielTwentyThreeRawNotes(rawText: string): EzekielTwentyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzekielTwentyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezekiel\s+23:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezekiel 23 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezekiel\s+23:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezekiel\s+23:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezekiel 23 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 23,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezekiel 23:${startVerse}` : `Ezekiel 23:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 12) {
    throw new Error("Expected 12 Ezekiel 23 sections, received " + sections.length);
  }

  return sections;
}

const EZEKIEL_TWENTY_THREE_RAW_NOTES = `# Ezekiel 23:1-4
# 👭 Two Sisters, One Family
---
## 👭 The Daughters Of One Mother

Two women in this chapter are not literal people.

They stand for two entire nations descended from the same family.

Aholah represents Samaria, the northern kingdom of Israel.

Aholibah represents Jerusalem, the southern kingdom of Judah.

Both nations trace back to the same twelve tribes under one covenant.

👭 Two women represent two nations

🏛️ Aholah stands for Samaria

🕍 Aholibah stands for Jerusalem

📖 Both share one covenant family

---
## 🇪🇬 They Committed Whoredoms In Egypt

Whoredom here does not describe personal immorality alone.

It is the Bible's regular picture for idol worship and broken loyalty to God.

Egypt is where Israel's unfaithfulness is traced all the way back to.

Even before the nation existed, the pull toward foreign gods had already begun.

That early start explains why idolatry kept returning generation after generation.

🇪🇬 Whoredom pictures idol worship

🔙 Egypt marks the earliest unfaithfulness

⏳ The pull started before the nation existed

📖 Old patterns kept returning later

---
## 🩸 Bruised The Teats Of Their Virginity

This is deliberately shocking, physical language.

The prophets often used blunt body imagery to make a point no one could ignore.

It describes how early and how deeply Israel's unfaithfulness took root, even in its youth.

Nothing about this sin was a late development or a small lapse.

🩸 Body imagery makes the point vivid

👶 Unfaithfulness began in Israel's youth

🚫 This was not a small lapse

📖 Deep roots explain a long pattern

---
## 📛 Aholah The Elder, And Aholibah Her Sister

These two names are not random.

Many scholars believe Aholah means her own tent, a place of worship she chose for herself.

Aholibah means my tent is in her, pointing to God's true dwelling place in Jerusalem.

Samaria built her own religion.

Jerusalem still held the real temple.

Even so, both sisters sinned just as badly.

📛 The names carry real meaning

⛺ Aholah means her own tent

🕍 Aholibah means my tent is in her

📖 One city still held the true temple

---
## 👑 Samaria Is Aholah, And Jerusalem Aholibah

God spells out the allegory directly here, leaving no doubt.

Samaria was the capital of the northern kingdom of Israel.

Jerusalem was the capital of the southern kingdom of Judah.

Naming both cities up front sets the scope for this chapter.

This covers the whole nation's history, not just one city.

Whatever happened to the older sister becomes a warning for the younger one.

👑 God names both cities plainly

🏛️ Samaria led the northern kingdom

🕍 Jerusalem led the southern kingdom

➡️ One sister's fall warns the other

# Ezekiel 23:5-10
# 🏹 Aholah Falls To Assyria
---
## 💙 Clothed With Blue, Captains And Rulers

Blue dye was rare and expensive in the ancient world.

Wearing it marked a person as a ruler or a high military officer.

Samaria was not drawn to ordinary soldiers.

She was drawn to Assyria's power, rank, and status.

💙 Blue marked rank and wealth

🎖️ These were officers, not ordinary men

🏛️ Samaria wanted Assyria's power

📖 Status, not God, drew her eye

---
## 🐎 Desirable Young Men, Horsemen Riding Upon Horses

This phrase paints Assyria as impressive to look at.

Strong, confident soldiers on horseback made a striking display of military strength.

Samaria's attraction here is political as much as it is visual.

Allying with a powerful empire felt safer than trusting God alone.

🐎 Horsemen displayed military strength

👀 The sight alone impressed Samaria

🤝 Alliance felt safer than trust in God

📖 Looks and power replaced faith

---
## 🗿 With All Their Idols She Defiled Herself

Political alliances in the ancient world were never just political.

Every nation carried its own gods into any treaty or partnership.

By allying with Assyria, Samaria also absorbed Assyria's idols into her worship.

The treaty and the betrayal of God happened in the very same act.

🗿 Alliances carried foreign gods with them

🤝 Samaria's treaty was also an idol swap

🚫 One act betrayed God and broke loyalty

📖 Politics and worship were never separate

---
## 🔙 Neither Left She Her Whoredoms Brought From Egypt

Assyria was a new sin layered on top of an old one.

Samaria never actually let go of the idolatry she picked up back in Egypt.

She simply added Assyria's gods to a collection that was already there.

Old sins rarely leave on their own.

They usually just make room for new ones.

🔙 Egypt's idols were never abandoned

➕ Assyria's gods were simply added

📚 Old sin made room for new sin

📖 Nothing was removed, only added to

---
## ⚔️ Delivered Into The Hand Of Her Lovers

This is the turning point of Samaria's story.

The very allies she trusted became the weapon God used against her.

Assyria did not protect Samaria forever.

In 722 BC, Assyria conquered and destroyed the northern kingdom completely.

The ally she doted on is the one history records as her destroyer.

⚔️ Her trusted ally became her enemy

📅 Assyria conquered Samaria in 722 BC

💔 Protection never actually lasted

📖 God used her own choice against her

---
## 💔 They Took Her Sons And Her Daughters

This verse describes the real human cost of Samaria's fall.

Children were taken, and people were killed in the conquest.

The allegory of unfaithfulness is not only a picture.

It stands for an actual national tragedy that really happened.

💔 Real families suffered in this conquest

⚔️ Children were taken, people were killed

🏛️ The allegory describes a true tragedy

📖 Samaria's fall was a real historical event

---
## 🏷️ She Became Famous Among Women

Famous here does not mean admired.

It means Samaria became a well known example of judgment for other nations to see.

Her story was not celebrated.

It was used as a warning to anyone tempted toward the same path.

🏷️ Famous means well known, not admired

⚠️ Her fall became a public warning

👀 Other nations watched and took note

➡️ Judgment can become someone else's lesson

# Ezekiel 23:11-13
# 📈 Aholibah Outdoes Her Sister
---
## 👀 Her Sister Aholibah Saw This

Aholibah had a front row seat to Samaria's entire downfall.

She watched the judgment happen and still did not change course.

Watching someone else's consequences is not the same as learning from them.

Jerusalem had every reason to turn back and chose not to.

👀 Jerusalem watched Samaria's fall happen

🚫 Watching did not lead to change

🙈 She had every reason to turn back

📖 A warning ignored is still a choice

---
## 📈 More Corrupt In Her Inordinate Love

Inordinate means excessive, completely out of control.

Jerusalem did not simply repeat her sister's sin.

She pushed it further than Samaria ever had.

Watching judgment fall on someone else somehow made Jerusalem bolder instead of more careful.

📈 Inordinate means totally out of control

⬆️ Jerusalem went further than Samaria

😮 Judgment did not slow her down

📖 Bad examples can backfire instead of warn

---
## ⚖️ They Took Both One Way

This line draws the final conclusion of this section.

Despite different outcomes so far, both sisters chose the same sin.

The same sin eventually leads to the same ending.

Samaria's history is now about to repeat itself in Jerusalem.

⚖️ Both sisters shared the same sin

🔁 Same sin leads to the same end

🔮 Samaria's history is about to repeat

📖 One pattern, two matching outcomes

# Ezekiel 23:14-18
# 🖼️ Aholibah Courts Babylon
---
## 🖼️ Saw Men Pourtrayed Upon The Wall

Pourtrayed is an old spelling of portrayed, meaning painted or drawn.

Jerusalem saw murals of Babylonian soldiers, not real men in person at first.

A picture alone was enough to stir her imagination and desire.

Temptation here began with something seen, not something experienced.

🖼️ Pourtrayed means painted or drawn

👁️ A mural alone sparked her desire

💭 Temptation started with imagination

📖 What she saw shaped what she wanted

---
## 🎨 Pourtrayed With Vermilion

Vermilion is a bright red pigment used in ancient wall paintings.

The Chaldeans were the people of Babylon, known for this vivid artistic style.

These were not subtle images.

They were bold, colorful depictions meant to catch the eye.

🎨 Vermilion means bright red pigment

🏛️ Chaldeans refers to the Babylonians

🖌️ The images were bold and colorful

📖 Beauty here still led toward sin

---
## 👑 Babylonians Of Chaldea, The Land Of Their Nativity

Nativity means birthplace.

This detail confirms exactly where these painted soldiers were from.

Babylon was not a minor regional power at this point.

It was quickly becoming the dominant empire of the ancient world.

Jerusalem was not drawn to nobodies.

She was drawn to rising world power.

👑 Nativity means birthplace

🌍 Babylon was a rising world power

📈 Jerusalem chased power, not nobodies

📖 Rising empires can look like security

---
## 💌 Sent Messengers Unto Them Into Chaldea

With Assyria, Samaria only admired from a distance.

With Babylon, Jerusalem took the first step herself.

She actively reached out and initiated the relationship.

That makes this choice even more deliberate than her sister's.

💌 Jerusalem made the first move

🙋 She reached out, not the other way

⬆️ This sin was more deliberate than Samaria's

📖 Some choices are chased, not just fallen into

---
## 🛏️ The Babylonians Came To Her Into The Bed Of Love

This is figurative language for a political and religious alliance.

Ancient treaties were sometimes sealed with imagery as intimate as a marriage bond.

Scripture records a real event behind this image.

King Hezekiah once showed Babylon's messengers all of Jerusalem's treasures.

That real event helped set this whole relationship in motion.

🛏️ The image describes a political alliance

📜 Treaties were sealed like a marriage bond

👑 Hezekiah once showed Babylon Jerusalem's treasures

📖 A real event started this whole pattern

---
## 💔 Her Mind Was Alienated From Them

Alienated means turned away, disgusted, no longer attached.

Jerusalem's fascination with Babylon did not last any longer than Samaria's fascination with Assyria had.

Sin rarely satisfies the way it first promised to.

The same restless pattern that doomed Samaria now repeats in Jerusalem.

💔 Alienated means turned away in disgust

⏳ This fascination did not last either

🔁 The same restless pattern repeats

📖 Sin never satisfies the way it promised

# Ezekiel 23:19-21
# 🇪🇬 Remembering Egypt
---
## 🔄 Calling To Remembrance The Days Of Her Youth

Jerusalem's sin takes one more strange turn here.

After Assyria and after Babylon, she begins longing for Egypt again.

Egypt was the very first place her unfaithfulness began, back in verse three.

None of these empires ever actually satisfied her.

🔄 Jerusalem now longs for Egypt again

🔙 Egypt is where this all began

🚫 None of these allies truly satisfied her

📖 Restless sin never finds a resting place

---
## 🐴 Whose Flesh Is As The Flesh Of Asses

Paramours means illicit lovers.

This comparison is deliberately crude and physical.

The prophet uses it to strip away any romance from this picture.

This was never a love story.

It was raw appetite dressed up as loyalty.

🐴 Paramours means illicit lovers

😳 The image is deliberately crude

🚫 This was never a real love story

📖 Appetite was dressed up as loyalty

---
## 🩸 Bruising Thy Teats By The Egyptians

This phrase repeats the exact imagery from verse three.

The chapter is circling back to where it started.

Jerusalem's whole adult life of broken alliances traces back to that same early root.

Nothing here is new.

It is the same old wound reopened.

🩸 This image repeats verse three exactly

🔁 The chapter circles back to the start

🌱 One early root explains it all

📖 An old wound, reopened

# Ezekiel 23:22-27
# ⚔️ Judgment Announced
---
## 🔄 I Will Raise Up Thy Lovers Against Thee

This line carries a sharp irony.

The same nations Jerusalem once loved are the ones God now sends against her.

What she pursued for safety becomes the exact thing that destroys her.

Sin often finishes the job it started as something desirable.

🔄 Her own lovers become her attackers

🪤 What she chased now destroys her

⚠️ Safety sought in sin always backfires

📖 Sin finishes what it starts

---
## 🗺️ Pekod, And Shoa, And Koa

These are not random made up names.

They likely name regions and peoples living under Babylon's rule at the time.

Listing them this specifically shows the full weight of the empire coming against Jerusalem.

This was not one army.

It was an entire imperial coalition.

🗺️ These were real regions under Babylon

📋 Listing them shows full imperial weight

⚔️ Not one army but a coalition

📖 Judgment came with full force

---
## ⚔️ Chariots, Wagons, And Wheels

This verse lists real ancient military equipment.

Chariots and wagons carried soldiers and supplies for a long siege.

Buckler, shield, and helmet describe the basic armor of an ancient soldier.

This is the specific language of a full scale invasion, not a small raid.

⚔️ These are real siege and battle terms

🛡️ Buckler, shield, and helmet describe armor

🏰 This describes full scale invasion

📖 Judgment came prepared for a long siege

---
## 👃 They Shall Take Away Thy Nose And Thine Ears

This specific punishment was a real practice in the ancient Near East.

It was sometimes used as a penalty for a wife caught in adultery.

Naming this exact punishment ties the judgment directly back to the unfaithfulness metaphor one more time.

The picture and the punishment finally match.

👃 This was a real ancient penalty

💔 It targeted convicted adulteresses specifically

🔗 The punishment matches the metaphor exactly

📖 The picture and the penalty finally align

---
## 🔥 Thy Residue Shall Be Devoured By The Fire

Residue here means whatever is left over after everything else is taken.

Nothing is held back from this judgment.

Fire finishes what the sword and the exile already started.

This is a complete end, not a partial correction.

🔥 Residue means whatever remains

🚫 Nothing here is held back

⚔️ Fire finishes what the sword started

📖 This judgment is complete, not partial

---
## 💎 Strip Thee Out Of Thy Clothes, And Take Away Thy Fair Jewels

Stripping an unfaithful wife of her clothing and jewelry was an old legal picture for public shame.

The jewels and fine clothes were never truly a sign of honor.

They were decorations bought by sin, now stripped away along with it.

Nothing she gained this way is allowed to remain.

💎 Stripping pictures public shame for adultery

👗 Her fine things were never real honor

🚫 Decorations bought by sin get removed

📖 Nothing gained through sin gets to stay

---
## 🚫 Thou Shalt Not Lift Up Thine Eyes Unto Them

This judgment has a clear purpose beyond punishment.

It is meant to finally break Jerusalem's endless cycle of returning to Egypt.

Every earlier section in this chapter showed her chasing Egypt again and again.

This verse states plainly that the chase is meant to end here.

🚫 The judgment aims to break a cycle

🔁 Jerusalem kept returning to Egypt repeatedly

🏁 This verse marks where it should end

📖 This judgment aims toward real freedom

# Ezekiel 23:28-31
# 🍷 The Cause Restated
---
## 😡 Into The Hand Of Them Whom Thou Hatest

This is a striking reversal.

The allies Jerusalem once pursued, she now despises.

God uses the very people she grew to hate as the instrument of her judgment.

Even her changed feelings cannot undo what her choices set in motion.

😡 She now hates who she once chased

🔄 God uses her own hated allies

⚙️ Changed feelings cannot undo past choices

📖 Consequences outlast changed emotions

---
## 👗 Leave Thee Naked And Bare

Nakedness here is not only physical exposure.

In ancient law, stripping an unfaithful wife publicly exposed her guilt for everyone to see.

This same picture appears elsewhere in scripture, including in the prophet Hosea.

The shame was always meant to be seen by others, not hidden.

👗 Nakedness pictures public exposure of guilt

📜 Ancient law used this exact image

👀 Shame here was never meant to be hidden

📖 Hosea uses this same picture elsewhere

---
## 🏛️ Gone A Whoring After The Heathen

This phrase states the whole chapter's thesis plainly.

Political alliances with foreign nations were never just political for Israel.

Trusting their gods and their armies instead of trusting God counted as unfaithfulness.

This was the real charge the entire time.

🏛️ This states the chapter's main point

🤝 Foreign alliances were never just political

⚖️ Trusting other power counted as unfaithfulness

📖 This was the real charge all along

---
## 🍷 I Will Give Her Cup Into Thine Hand

A cup in prophetic language often pictures a measure of judgment someone must drink.

Samaria already drank this same cup earlier in her history.

Jerusalem is now told she will drink an identical cup.

The same measure of judgment is about to be poured out again.

🍷 A cup pictures assigned judgment

🔁 Samaria already drank this same cup

➡️ Jerusalem is about to drink it too

📖 The same measure returns a second time

# Ezekiel 23:32-35
# 🥤 Drinking The Cup
---
## 🥤 Drink Of Thy Sister's Cup Deep And Large

This cup is not a small portion.

It is described as deep and large, meaning the judgment will be heavy and complete.

Mockery and scorn from onlookers come along with the judgment itself.

Nothing about this punishment happens quietly or privately.

🥤 This cup pictures a full measure

⚖️ Deep and large means heavy judgment

😏 Scorn from others accompanies the pain

📖 This judgment is public, not private

---
## 😵 Filled With Drunkenness And Sorrow

Astonishment and desolation describe total shock and total ruin.

The comparison to drunkenness pictures judgment as something that overwhelms a person completely.

A drunk person cannot think clearly or stand steady.

Jerusalem's judgment will leave her just as disoriented and helpless.

😵 Astonishment and desolation mean total shock

🍷 Drunkenness pictures total disorientation

🥀 A drunk person cannot stand steady

📖 Judgment leaves her just as helpless

---
## 🏺 Break The Sherds Thereof, And Pluck Off Thine Own Breasts

Sherds are broken pieces of pottery.

Breaking the empty cup afterward pictures grief with nothing left to hold onto.

The mention of breasts deliberately echoes verse three, where this same sin first began.

The sin and the punishment now bookend the exact same image.

🏺 Sherds means broken pottery pieces

💔 Breaking the cup pictures total grief

🔁 This echoes the breasts from verse three

📖 Sin and punishment share one image

---
## 🙈 Thou Hast Forgotten Me, And Cast Me Behind Thy Back

This is God's own diagnosis of the real problem.

The failure was never really about picking the wrong political ally.

Every alliance in this chapter was really a symptom of forgetting God first.

Casting Him behind her back meant she stopped looking to Him at all.

🙈 This names the real root problem

🤝 Bad alliances were only a symptom

🚫 She stopped looking to God at all

📖 Forgetting God explains every choice after

# Ezekiel 23:36-39
# 🔥 Both Sisters On Trial
---
## ⚖️ Wilt Thou Judge Aholah And Aholibah

God puts the question directly to Ezekiel himself.

This is written like a courtroom scene, not a casual conversation.

Ezekiel is being asked to actually declare the verdict out loud, not just witness it.

Prophets in this book often had to speak judgment, not just predict it.

⚖️ God asks Ezekiel to judge them

🏛️ This reads like a courtroom scene

🗣️ Ezekiel must declare it, not just watch

📖 Prophets spoke judgment, not just prediction

---
## 🔥 Caused Their Sons To Pass Through The Fire

This describes child sacrifice offered to the god Molech.

Children were burned as offerings, believed by worshippers to secure favor or protection.

This horrifying practice shows exactly how far this idolatry had gone.

It was never only about which nation to trust politically.

🔥 This describes child sacrifice to Molech

😱 Children were burned as offerings

📉 This shows how far the idolatry went

📖 This was never only about politics

---
## 🏛️ Defiled My Sanctuary, And Profaned My Sabbaths

The sanctuary was the actual temple in Jerusalem.

The Sabbaths were the weekly holy days set apart for rest and worship.

Unlike Samaria, Jerusalem had the real temple of the true God in her own city.

She desecrated the very place and the very rhythm meant to keep her faithful.

🏛️ Sanctuary means the Jerusalem temple

📅 Sabbaths were the weekly holy rest days

🕍 Jerusalem had the real temple, unlike Samaria

📖 The holiest things were corrupted first

---
## 😱 The Same Day, In The Midst Of Mine House

This detail is almost impossible to read past.

Child sacrifice and temple worship were happening on the very same day.

Both were happening inside the very same house, God's own house.

The contrast is meant to be as shocking to the reader as it clearly was to God.

😱 Both acts happened the very same day

🏠 Both happened inside God's own house

💔 The contrast is meant to shock

📖 Nothing about this went unnoticed by God

# Ezekiel 23:40-42
# 💌 Entertaining Strangers
---
## 💌 Sent For Men To Come From Far

This detail matters because it shows initiative.

Jerusalem was not simply tempted by nearby neighbors.

She actively reached out and summoned distant men to come to her.

This was a pursued sin, not an accidental one.

💌 She summoned distant men herself

🙋 This was active, not accidental

🗺️ The men came from far away

📖 Some sins are chased, not stumbled into

---
## 💄 Paintedst Thy Eyes, And Deckedst Thyself With Ornaments

This describes the preparation rituals of a woman expecting lovers.

Painting the eyes and putting on jewelry were acts meant to impress and attract.

The same imagery also fits political preparation, dressing up to impress a foreign power.

Either way, the goal was the same, to look appealing to the wrong audience.

💄 This describes preparing to attract someone

👁️ Painted eyes and jewelry meant to impress

🏛️ The image also fits political preparation

📖 The goal was impressing the wrong audience

---
## 🕯️ Set Mine Incense And Mine Oil

This detail is especially painful.

Incense and oil were meant for worshipping the true God in His temple.

Instead, Jerusalem used these same holy items to entertain her foreign guests.

Worship tools became props for seduction and idolatry instead.

🕯️ Incense and oil belonged to God's worship

🚫 Jerusalem used them for her guests instead

💔 Worship tools became seduction props

📖 Even holy things were repurposed for sin

---
## 🏜️ Sabeans From The Wilderness

Sabeans were a distant Arabian trading people.

Naming them shows how far this corruption had spread.

Even far off outsiders eventually got pulled into Jerusalem's crowd of guests.

What started as a political choice had widened into something much bigger.

🏜️ Sabeans were distant Arabian traders

📏 Their presence shows how far this spread

🌍 Even distant outsiders joined in

📖 A small choice widened into something bigger

# Ezekiel 23:43-45
# ⚖️ The Verdict Is Named
---
## 👵 Her That Was Old In Adulteries

Old here does not mean old in age alone.

It means experienced and hardened in this exact sin over a long time.

This was not a single mistake or a brief lapse in judgment.

It was a long practiced pattern, repeated for years.

👵 Old here means hardened, not just aged

🔁 This sin was practiced for years

🚫 This was never just one mistake

📖 Long patterns are harder to break

---
## ⚖️ The Righteous Men, They Shall Judge Them

Righteous men here likely refers to those God used as His instrument of justice.

This may point to faithful witnesses or to the very nations carrying out the judgment.

Either way, the judgment itself is treated as fair and deserved.

This was never framed as cruelty without cause.

⚖️ God used an instrument of real justice

👥 This may mean witnesses or conquering nations

✅ The judgment is framed as fair

📖 Justice here was deserved, not cruel

---
## 🩸 Adulteresses, And Blood Is In Their Hands

This verse combines two charges into one sentence.

Idolatry and violence are named together, just as they were back in verse thirty seven.

These two sins kept showing up tied to each other throughout the chapter.

One kind of unfaithfulness rarely stays alone.

🩸 Two charges combine in one verse

🔗 Idolatry and violence appear together again

🔁 This matches the charge from verse thirty seven

📖 One sin rarely stays alone

# Ezekiel 23:46-49
# 🪨 The Sentence Carried Out
---
## 🪨 The Company Shall Stone Them With Stones

Stoning was the specific legal penalty for adultery under ancient law.

Naming this exact punishment ties the sentence directly back to the chapter's central image one final time.

This was not a random act of violence.

It was a punishment that matched the charge precisely.

🪨 Stoning was the legal penalty for adultery

🔗 This ties back to the chapter's whole image

⚖️ The punishment matched the exact charge

📖 Justice and metaphor land together here

---
## 🔥 Burn Up Their Houses With Fire

This punishment was public, not private.

Burning a house destroyed a family's home in front of the whole community.

There was no quiet shame to absorb alone behind closed doors.

The judgment matched how publicly the sin itself had been committed.

🔥 This destruction was public, not hidden

🏠 A burned house meant total loss

👀 The whole community could see it happen

📖 Public sin received a public judgment

---
## 📚 That All Women May Be Taught Not To Do After Your Lewdness

This verse states the real purpose behind the judgment.

Punishment here was never only about settling a score with Jerusalem.

It was meant to serve as a lasting lesson for anyone watching.

A clear warning was meant to stop the same pattern from spreading further.

📚 This verse states judgment's real purpose

⚖️ It was never only about settling a score

👀 Others were meant to watch and learn

📖 A warning can outlast the punishment itself

---
## 📖 Ye Shall Know That I Am The Lord GOD

This exact phrase repeats throughout the whole book of Ezekiel.

It functions like a refrain, closing out section after section of judgment.

Every single punishment in this book points back to this one purpose.

God is not simply angry here.

He is making sure His own identity is finally recognized.

📖 This phrase repeats throughout Ezekiel

🔁 It works like a closing refrain

🎯 Every judgment points to this one purpose

➡️ Recognition of God, not anger, is the point
`.trim();

export const EZEKIEL_TWENTY_THREE_PERSONAL_SECTIONS = parseEzekielTwentyThreeRawNotes(EZEKIEL_TWENTY_THREE_RAW_NOTES);
