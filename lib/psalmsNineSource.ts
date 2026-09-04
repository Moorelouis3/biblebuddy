export type PsalmsNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsNineRawNotes(rawText: string): PsalmsNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 9:${startVerse}` : `Psalms 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Psalms 9 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_NINE_RAW_NOTES = `# Psalms 9:1-2
# 🙌 Praise With My Whole Heart
---
## 🙌 I Will Praise Thee, O LORD, With My Whole Heart

Whole heart means every part of a person, not just a feeling.

In Hebrew thought the heart was the center of will, mind, and emotion together.

David is not offering a passing word of thanks here.

He commits his whole self to this praise, nothing held back.

This full commitment sets the tone for everything that follows in the psalm.

🙌 Whole heart means the whole person
🧠 Heart meant will, mind, and emotion
🚫 This is not a passing thanks
📖 Full commitment opens the whole psalm

---

## 📢 I Will Shew Forth All Thy Marvellous Works

Shew forth is an old word for declaring something out loud in public.

It does not mean thinking something quietly or keeping it to yourself.

Marvellous works points to specific acts, not a vague sense of wonder.

David has real events in mind, deliverances he personally witnessed.

He plans to tell others exactly what God has done for him.

📢 Shew forth means to declare publicly
🚫 Not a quiet, private thought
🛡️ Marvellous works means specific real acts
📖 David tells others what God did

---

## 😊 I Will Be Glad And Rejoice In Thee

David's joy here is aimed at God himself, not at good circumstances.

Glad and rejoice are two separate Hebrew words placed side by side.

Repeating the idea in two different words gives it extra weight.

This is not relief that a problem passed, it is joy in a person.

The object of the rejoicing is thee, God, not the outcome.

😊 Glad and rejoice both mean joy
🎯 Joy is aimed at God himself
🔁 Two words repeat the idea for weight
📖 Joy in a person, not an outcome

---

## 📛 I Will Sing Praise To Thy Name, O Thou Most High

Thy name refers to God's whole character and reputation, not just a label.

To praise God's name means praising everything he has shown himself to be.

Most High translates a Hebrew title, Elyon, used for God's supremacy.

It marks God as ranked above every other power, human or spiritual.

David closes this opening pair of verses by naming exactly who he praises.

📛 Name means God's whole character
🔝 Most High translates the title Elyon
👑 It marks God above every power
📖 David names exactly who he praises

# Psalms 9:3-4
# ⚖️ The Judge Who Takes My Side
---
## 🏃 When Mine Enemies Are Turned Back

Turned back is a military term for an army forced into retreat.

David is not describing enemies who simply changed their minds.

He pictures a real battle where the attacking side is driven off.

This retreat happens because of God's action, not David's own strength.

The verse sets up why David can praise so confidently in verse one.

🏃 Turned back means forced retreat
⚔️ Pictures a real military defeat
💪 Victory comes from God, not David
📖 This explains David's confident praise

---

## 👣 They Shall Fall And Perish At Thy Presence

At thy presence does not mean the enemies are simply standing near God.

It describes God's active intervention causing their sudden downfall.

Fall and perish are two separate outcomes, defeat then complete loss.

Ancient armies believed a god's presence could decide a battle's outcome.

Here that belief becomes reality, God's presence is what actually defeats them.

👣 Presence here means active intervention
📉 Fall and perish name two stages
⚔️ Ancient armies linked gods to battles
📖 God's presence actually decides the battle

---

## ⚖️ Thou Hast Maintained My Right And My Cause

Right and cause are legal words borrowed from an ancient courtroom.

David pictures God as a judge who has ruled in his favor.

This is not David boasting about his own innocence alone.

It is David crediting God with defending him against false accusation.

The courtroom picture continues into the next line about God's throne.

⚖️ Right and cause are legal terms
👨‍⚖️ God is pictured as the judge
🛡️ God defended David, not David alone
📖 Sets up the throne image next

---

## 🪑 Thou Satest In The Throne Judging Right

God's judgment is never careless or rushed.

Satest in the throne pictures a judge seated, ready to hear a case.

Judging right means the verdict itself is fair and correct.

Ancient kings sat to judge cases brought before their throne.

David trusts that the same seated, careful judgment ruled in his case.

🪑 Satest in the throne pictures a seated judge
✅ Judging right means a fair verdict
👑 Kings sat to hear legal cases
📖 David trusts this same fair judgment

# Psalms 9:5-6
# 🔥 Names Erased Forever
---
## 🌍 Thou Hast Rebuked The Heathen, Thou Hast Destroyed The Wicked

Heathen is an old word for nations outside God's covenant people.

Rebuked here means far more than a stern word of correction.

It describes God actively confronting and judging these nations.

Wicked names a separate group, people who acted with real evil intent.

Both groups face the same outcome, God's direct judgment against them.

🌍 Heathen means nations outside the covenant
📢 Rebuked means active confrontation, not a word
⚠️ Wicked names people who did real evil
📖 Both groups face God's direct judgment

---

## 📛 Thou Hast Put Out Their Name For Ever And Ever

In this culture, erasing a name meant erasing a person's whole legacy.

A name carried a family's memory, reputation, and future line.

To put out a name meant nothing of that family would be remembered.

This was considered a far worse fate than death alone.

God's judgment here reaches beyond one lifetime into total forgetting.

📛 A name carried a family's whole legacy
🗑️ Erasing a name erased their memory
💀 Worse than death in this culture
📖 Judgment reaches beyond one lifetime

---

## 🛑 O Thou Enemy, Destructions Are Come To A Perpetual End

Perpetual end means a finished ruin, not a pause that could reverse.

David speaks directly to the enemy as if standing before them.

Destructions in the plural suggests repeated, thorough devastation.

This is not a temporary setback the enemy could recover from.

The ruin described here is total and permanent.

🛑 Perpetual end means permanent, not paused
🗣️ David speaks directly to the enemy
💥 Destructions plural means thorough devastation
📖 This ruin cannot be reversed

---

## 🏛️ Their Memorial Is Perished With Them

Memorial here means any physical trace left behind, ruins or monuments.

Ancient cities often left crumbled walls that outlasted their people.

David says even those remaining traces will disappear completely.

Nothing will be left to prove these cities ever stood.

The whole verse closes the picture of total, lasting defeat.

🏛️ Memorial means monuments or ruins left behind
🧱 Cities often outlasted their people
🚫 Even those traces will disappear
📖 Closes the picture of total defeat

# Psalms 9:7-8
# 👑 The Throne That Never Falls
---
## ⚡ But The LORD Shall Endure For Ever

This verse draws a sharp contrast with the two ruined cities just described.

Their names and memorials disappeared, but God's rule does not.

Endure for ever means a permanence nothing in creation can match.

The word but signals a turn from human ruin to divine stability.

Everything that fell in the previous verses only highlights what does not fall.

⚡ Sharp contrast with the ruined cities
♾️ Endure for ever means lasting permanence
🔀 But signals a turn in the psalm
📖 God's stability stands against human ruin

---

## 🪑 He Hath Prepared His Throne For Judgment

Prepared here means established and ready, not built in a hurry.

A throne prepared for judgment is a seat of ongoing, settled authority.

This is not a one time ruling on a single case.

God's throne stays permanently ready to judge whenever judgment is needed.

That readiness is part of why his rule can be trusted.

🪑 Prepared means established and ready
⏳ Not a hurried, temporary ruling
👑 God's throne stays permanently ready
📖 That readiness makes his rule trustworthy

---

## 🌍 He Shall Judge The World In Righteousness

The world here means every nation, not only Israel.

David has been describing God's judgment against specific enemies.

Now the scope widens to include everyone, everywhere.

Righteousness means judging by what is actually right, without favoritism.

God's fairness extends past David's own nation to the whole earth.

🌍 The world means every nation
🔭 The scope widens beyond Israel
⚖️ Righteousness means fair, unbiased judging
📖 God's fairness reaches the whole earth

---

## 📏 He Shall Minister Judgment To The People In Uprightness

Uprightness means judging in a straight line, without bending toward anyone.

Minister here means to actively carry out, not simply to announce.

The people again points to humanity broadly, not one nation alone.

Righteousness and uprightness together form a matched pair of words.

Hebrew poetry often pairs two close words to press one idea harder.

📏 Uprightness means judging without bending
🎬 Minister means actively carrying out judgment
🌐 The people means humanity broadly
📖 Paired words press one idea harder

# Psalms 9:9-10
# 🏰 A Refuge In Trouble
---
## 🏰 The LORD Also Will Be A Refuge For The Oppressed

Refuge pictures a high place or fortress a person runs to for safety.

Oppressed means someone crushed or pressed down by another's power.

The word also connects this verse back to the world he judges.

The same God who judges the nations shelters their victims.

Judgment and protection turn out to be two sides of the same act.

🏰 Refuge pictures a fortress for safety
😣 Oppressed means crushed by another's power
🔗 Also connects to God's judgment
📖 Judgment and protection are the same act

---

## 🔁 A Refuge In Times Of Trouble

This refuge is not only for one crisis but for every season of trouble.

Repeating refuge from the line before adds emphasis, not new information.

Times of trouble covers any hardship, not one specific kind of danger.

David is describing a standing shelter, available whenever it is needed.

This sets up the trust described in the very next verse.

🔁 Repeating refuge adds emphasis
🌩️ Times of trouble covers any hardship
🏠 A standing shelter, always available
📖 Sets up the trust in verse ten

---

## 🤝 They That Know Thy Name Will Put Their Trust In Thee

To know thy name means having an actual relationship with God, not facts about him.

In Hebrew thought, knowing a name meant knowing the person behind it.

This is relational knowledge, built from experience, not distant information.

Trust naturally grows out of that kind of real relationship.

The verse links true knowledge of God directly to genuine trust.

🤝 Knowing the name means real relationship
📚 More than facts, real experience
🌱 Trust grows out of that relationship
📖 Knowledge and trust are linked here

---

## 🚫 Thou, LORD, Hast Not Forsaken Them That Seek Thee

Forsaken does not describe a temporary delay in help.

It means fully abandoning someone in their moment of need.

David states plainly that God has never done that to those who seek him.

Seek thee means actively pursuing God, not simply hoping he exists.

The verse closes this section with a direct promise, not a wish.

🚫 Forsaken means full abandonment
⏳ Not simply a delay in help
🔍 Seek means actively pursuing God
📖 This is a promise, not a wish

# Psalms 9:11-12
# 🩸 He Remembers The Forgotten
---
## 🏔️ Sing Praises To The LORD, Which Dwelleth In Zion

Zion refers to Jerusalem, specifically the hill where God's presence was believed to dwell.

The ark of the covenant rested there during David's reign.

Dwelleth in Zion means God is not distant or hidden from his people.

He has a specific, known place among them.

That nearness is the reason David calls the people to sing.

🏔️ Zion refers to Jerusalem's holy hill
📦 The ark rested there in David's reign
🏠 Dwelleth means God is near, not distant
📖 Nearness is why David calls for song

---

## 📢 Declare Among The People His Doings

Declare means telling something publicly so others can hear it too.

The people here likely includes other nations, not only Israel.

His doings points back to the specific acts of justice already described.

Praise in this psalm is never meant to stay private.

David wants God's reputation carried out beyond his own borders.

📢 Declare means telling others publicly
🌍 The people may include other nations
📋 His doings means the acts already named
📖 Praise here is never kept private

---

## 🩸 When He Maketh Inquisition For Blood, He Remembereth Them

Inquisition for blood is legal language for investigating an unjust killing.

Ancient law required someone to answer for spilled innocent blood.

He remembereth them means the victims are not forgotten by God.

Even when human justice fails or moves too slowly, God still keeps record.

This links back to the courtroom picture from earlier in the psalm.

🩸 Inquisition for blood means investigating murder
📜 Ancient law required an answer for it
🧠 Remembereth means the victims are not forgotten
📖 Links back to the earlier courtroom picture

---

## 🙇 He Forgetteth Not The Cry Of The Humble

Humble here means the powerless, people with no one else to defend them.

Cry describes a genuine call for help, not a quiet complaint.

Forgetteth not is stated as a flat fact, not a hopeful guess.

David is confident this is simply how God operates.

The verse closes this section on the certainty of being heard.

🙇 Humble means people with no defender
📣 Cry means a real call for help
✅ Forgetteth not is stated as fact
📖 Closes the section on certainty

# Psalms 9:13-14
# 🚪 Lifted From The Gates Of Death
---
## 🔀 Have Mercy Upon Me, O LORD, Consider My Trouble

The psalm shifts here from praising God's justice to David's own personal need.

Have mercy is a direct, personal request, not a general statement.

Consider means to look closely at David's specific situation.

David suffers from real enemies who hate him, not an abstract idea.

This turn from public praise to private plea happens in a single line.

🔀 Shifts from public praise to private plea
🙏 Have mercy is a direct request
🔎 Consider means looking closely at David
📖 The turn happens in a single line

---

## 🚪 Thou That Liftest Me Up From The Gates Of Death

Gates of death is an ancient picture of death as a walled city with entrances.

Ancient people often described the realm of the dead as a fortified place.

Liftest me up describes rescue from right at that entrance, not after entering.

David is not describing a distant fear but a near escape.

God's rescue reaches him at the very edge of that gate.

🚪 Gates of death pictures death as a place
🏰 Ancient people saw it as fortified
🆙 Liftest up means rescue right at the edge
📖 Rescue happens at the very edge

---

## 🏛️ That I May Shew Forth All Thy Praise In The Gates Of The Daughter Of Zion

The gates of the daughter of Zion were the public square where a city's business happened.

Ancient city gates were where legal matters, news, and gatherings all took place.

Daughter of Zion is a poetic way of picturing Jerusalem as a person.

David wants his rescue announced in that most public place possible.

His private deliverance becomes a public testimony there.

🏛️ City gates were the public square
📰 Legal matters and news happened there
👧 Daughter of Zion pictures Jerusalem as a person
📖 Private rescue becomes public testimony

---

## 🆘 I Will Rejoice In Thy Salvation

Salvation here means a specific rescue from real danger, not a general feeling.

David does not simply feel better, he rejoices in what God actually did.

This mirrors the rejoicing named back in verse two.

The psalm has now come full circle from public praise to personal deliverance.

Both kinds of joy point back to the same faithful God.

🆘 Salvation means a specific real rescue
😊 David rejoices in what God did
🔁 Mirrors the joy from verse two
📖 Public praise and personal joy meet

# Psalms 9:15-16
# 🕳️ Trapped By Their Own Scheme
---
## 🕳️ The Heathen Are Sunk Down In The Pit That They Made

A pit here is a hunting trap, dug and hidden to catch prey.

Hunters in this era dug pits and covered them to trap animals.

The heathen dug this pit intending to trap someone else.

Instead they themselves fall into the trap they built.

This is a common picture in Hebrew wisdom writing for self inflicted ruin.

🕳️ A pit was a hidden hunting trap
🏹 Hunters used pits to catch prey
🔄 They fall into their own trap
📖 A common picture of self inflicted ruin

---

## 🕸️ In The Net Which They Hid Is Their Own Foot Taken

A net here is another hunting tool, spread and hidden to snare prey.

This line repeats the same idea as the pit, using a different image.

Their own foot taken means the trap catches its own maker.

Hebrew poetry often repeats one idea twice using two different pictures.

The doubled image makes the point about poetic justice impossible to miss.

🕸️ A net was another hidden trap
🔁 Repeats the pit's idea differently
🦶 Their own foot is caught
📖 Doubled image makes the point clear

---

## 👁️ The LORD Is Known By The Judgment Which He Executeth

God does not need to explain himself, his actions make him known.

Executeth means actually carrying judgment out, not merely announcing it.

The traps that just caught the heathen were one form of that judgment.

People come to understand who God is by watching what he does.

This verse names the principle behind everything described so far.

👁️ God's actions make him known
🎬 Executeth means actually carrying it out
🕳️ The traps were one form of judgment
📖 This verse names the whole principle

---

## 🪤 The Wicked Is Snared In The Work Of His Own Hands

Snared does not mean caught by accident or bad luck.

Work of his own hands means the trap was self made and self sprung.

This restates the pit and net images in one final, plain sentence.

The wicked person's own actions become the tool of their downfall.

Nothing external needed to be added to bring justice about.

🪤 Snared is not accidental bad luck
✋ Work of his own hands means self made
🔚 Restates the pit and net plainly
📖 Their own actions bring their downfall

---

## 🎵 Higgaion Selah

Higgaion and Selah are two Hebrew musical or liturgical instructions.

Higgaion likely signals a quiet, meditative instrumental pause.

Selah probably marked a moment to stop and reflect on what was just sung.

Neither word has a fully certain meaning today, scholars remain divided.

Both mark the same command to the reader, stop and sit with this truth.

🎵 Higgaion likely signals a quiet pause
⏸️ Selah marks a moment to reflect
❓ Their exact meaning is still debated
📖 Both call the reader to pause

# Psalms 9:17-18
# 🕊️ Hope For The Forgotten Poor
---
## ⚰️ The Wicked Shall Be Turned Into Hell

Hell here translates Sheol, the Hebrew word for the realm of the dead.

This is not the same picture of eternal punishment found later in scripture.

Sheol simply meant the place all the dead were believed to go.

Turned into hell means the wicked end up there through defeat, not honor.

The contrast is between an honored death and a shameful one.

⚰️ Hell here translates Sheol
🔀 Different from later pictures of punishment
🗺️ Sheol meant the realm of the dead
📖 Contrast is honored death versus shameful death

---

## 🧠 And All The Nations That Forget God

To forget God means living as though he does not exist, not simply losing a memory.

This is a practical forgetting, shown in actions, not a mental slip.

Nations that forget God are the same heathen described throughout this psalm.

The verse widens the warning from individuals to entire peoples.

No nation is exempt from this same accountability.

🧠 Forget God means living as if absent
🎬 Shown through actions, not memory
🌍 Widens the warning to whole nations
📖 No nation is exempt from this

---

## 🔀 For The Needy Shall Not Alway Be Forgotten

This verse turns from warning the wicked to comforting the powerless.

Needy describes people lacking basic resources or standing in society.

Alway is an old spelling of always, meaning without exception.

The wicked forget God, but God does not forget the needy.

That contrast is placed deliberately, right next to each other.

🔀 Turns from warning to comfort
🤲 Needy means people lacking resources
♾️ Alway means without exception
📖 The wicked forget, God does not

---

## 🌅 The Expectation Of The Poor Shall Not Perish For Ever

Expectation here means a confident hope, not a wish that might not happen.

The poor are waiting for God to act on their behalf eventually.

Perish for ever would mean that hope simply died out completely.

David promises the opposite, that hope will hold and be fulfilled.

This closes the section on a note of lasting confidence.

🌅 Expectation means a confident hope
⏳ The poor are waiting for God to act
🚫 It will not perish forever
📖 Closes on lasting confidence

# Psalms 9:19-20
# 🙇 Let Them Know They Are Only Men
---
## ⚔️ Arise, O LORD, Let Not Man Prevail

Arise is a call for God to act decisively, like a warrior standing up for battle.

This word appears often in the Psalms as a summons for God to intervene.

Man here is set directly against God, human power against divine authority.

Prevail means to win out or dominate over another.

David asks that human strength never be allowed to outlast God's rule.

⚔️ Arise calls God to act decisively
📣 A common summons throughout the Psalms
🆚 Man is set against God's authority
📖 Human strength should never outlast God

---

## 👀 Let The Heathen Be Judged In Thy Sight

David asks for judgment to happen where God himself can see it directly.

In thy sight means before God's own direct attention, not a distant ruling.

This request echoes the courtroom language used earlier in the psalm.

The heathen named here are the same enemies described from the start.

David wants the case closed personally, not left to run on its own.

👀 In thy sight means God's direct attention
⚖️ Echoes the courtroom language from earlier
🌍 Heathen names the same enemies as before
📖 David wants the case closed personally

---

## 😨 Put Them In Fear, O LORD

Put them in fear means to strike with a sudden, humbling terror.

This is not everyday nervousness but a shock that reorders how someone thinks.

David wants that fear aimed specifically at proud, defiant nations.

Fear here is meant to correct false confidence, not simply cause suffering.

It exists to bring these nations back to reality.

😨 Put in fear means sudden terror
🔀 More than nervousness, a shock
👑 Aimed at proud, defiant nations
📖 Fear here corrects false confidence

---

## 🎯 That The Nations May Know Themselves To Be But Men

The whole psalm ends by aiming at pride itself, not just enemy armies.

But men means simply mortal, limited, and answerable to someone higher.

This directly answers the boastful attitude behind the heathen's earlier actions.

The nations forgot God, and this verse corrects that forgetting.

Realizing they are only men is the humbling truth this whole psalm builds toward.

🎯 The psalm ends by targeting pride
🧍 But men means mortal and limited
🔀 Answers the heathen's earlier boasting
📖 This is the truth the psalm builds toward
`.trim();

export const PSALMS_NINE_PERSONAL_SECTIONS = parsePsalmsNineRawNotes(PSALMS_NINE_RAW_NOTES);
