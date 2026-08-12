export type SecondKingsThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsThreeRawNotes(rawText: string): SecondKingsThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsThree\s+3:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 3 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsThree\s+3:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsThree\s+3:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 3 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 3,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 3:${startVerse}` : `2 Kings 3:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Kings 3 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_THREE_RAW_NOTES = `# SecondKingsThree 3:1-3
# 👑 Jehoram Begins To Reign
---
## 👑 The Son Of Ahab

The son of Ahab names this king as Jehoram of Israel, not Jehoram of Judah.

Two different kings share the exact same name at nearly the same time.

Judah crowns its own king Jehoram only a few years after this one.

Second Kings tracks both royal lines side by side in the chapters ahead.

Watching which kingdom is named keeps the two Jehorams from blurring together.

👑 Jehoram of Israel, son of Ahab

🌓 Judah crowns a second Jehoram soon

📚 Two kings share one name

📖 Watch which kingdom is named

---

## 📅 The Eighteenth Year Of Jehoshaphat

Kings in Israel and Judah were often dated by each other's reigns.

Jehoram's first year lines up with Jehoshaphat's eighteenth year on Judah's throne.

This cross dating lets historians line up the two kingdoms on one timeline.

Without it, the two royal lines would be almost impossible to sort out.

The detail looks small but it anchors the whole chronology of Kings.

📅 Kings dated by each other's reigns

🔗 Links Israel's timeline to Judah's

🧮 Helps sort the two kingdoms

📖 A small detail, a big anchor

---

## 🗓️ Reigned Twelve Years

Twelve years was a common reign length for a king of Israel.

Jehoram rules through the entire Moab campaign told in this chapter.

He is also on the throne when Elisha's ministry is at its busiest.

Many of Elisha's most famous miracles later in Second Kings happen during this reign.

This one king's reign becomes the backdrop for a large stretch of the book.

🗓️ Twelve years on Israel's throne

⚔️ Covers the whole Moab campaign

✨ Elisha's busiest ministry years

📖 Backdrop for much of the book

---

## 🚫 Not Like His Father, And Like His Mother

This does not mean Jehoram avoided idolatry altogether.

It means his evil was less severe than his parents Ahab and Jezebel.

Ahab and Jezebel actively promoted Baal worship as Israel's state religion.

Jehoram simply does not push idolatry as openly as they did.

Less evil than Ahab and Jezebel still leaves plenty of room for evil.

🚫 Not sinless, just less severe

👑 Ahab and Jezebel set the bar

🕯️ Jehoram pushes idolatry less openly

📖 Less evil is still evil

---

## 🗿 He Put Away The Image Of Baal

The image of Baal was a carved idol Ahab had set up for worship.

First Kings records Ahab building a house for Baal with this very image inside.

Removing a single idol was a real but limited act of reform.

The larger system of false worship that Ahab and Jezebel built stayed mostly intact.

One statue coming down did not undo an entire religious system.

🗿 A carved idol Ahab had made

🏛️ Housed in a temple to Baal

✂️ Its removal was limited reform

📖 The wider system stayed standing

---

## 🔗 Cleaved Unto The Sins Of Jeroboam

Cleaved means held tightly to, the opposite of letting something go.

Jeroboam was Israel's first king after the kingdom split from Judah.

He built two golden calves at Bethel and Dan so people would not travel to Jerusalem to worship.

That same golden calf worship gets called the sin of Jeroboam again and again in Kings.

Jehoram keeps that system running even after removing Ahab's Baal image.

🔗 Cleaved means held tightly to

🐄 Jeroboam's golden calves at Bethel and Dan

🔁 A refrain repeated across Kings

📖 One idol falls, another stays

---

# SecondKingsThree 3:4-8
# 🐑 Moab Rebels Against Israel
---
## 🐑 Mesha King Of Moab Was A Sheepmaster

A sheepmaster managed enormous flocks of sheep for a living.

Mesha ruled Moab, a kingdom just east of the Dead Sea.

His wealth came straight from sheep and wool.

A stone inscription discovered later records Mesha's own account of this war.

Archaeology and the Bible describe this same king from two different angles.

🐑 Sheepmaster means a wealthy flock owner

🗺️ Moab sat east of the Dead Sea

🪨 A stone inscription later confirmed Mesha

📖 History and scripture agree here

---

## 🔢 An Hundred Thousand Lambs

An hundred thousand is an old way of writing one hundred thousand.

That is one hundred thousand lambs and another hundred thousand rams every year.

This was tribute, a forced payment Moab owed Israel as a conquered vassal.

Wool from that many sheep would have been a massive part of Israel's economy.

Losing this tribute is exactly what Israel is about to fight to keep.

🔢 Hundred thousand lambs, plus rams

💰 This was forced yearly tribute

🧶 Wool fed Israel's whole economy

📖 Israel fights to keep this income

---

## ⚰️ When Ahab Was Dead

Vassal kingdoms like Moab often waited for a strong king to die before rebelling.

Ahab had kept Moab under Israel's control through military strength.

His son Jehoram inherits the throne but not automatically the same authority.

Mesha reads the change in leadership as his opportunity to break free.

A kingdom's control over another can die with the king who built it.

⚰️ Vassals often rebel at succession

💪 Ahab held Moab by strength

👑 Jehoram inherits an untested throne

📖 Control can die with the king

---

## 🔢 Numbered All Israel

Numbering an army meant counting and organizing every fighting man for battle.

Jehoram does this the same day he learns of Moab's rebellion.

This shows the crisis felt urgent enough to skip straight to full mobilization.

A census like this also decided who owed military service under the king.

The quick response reveals how seriously Israel took losing this valuable tribute.

🔢 Counting and organizing every soldier

⚡ Done the same day as the news

⚔️ Full mobilization, not half measures

📖 Israel took this tribute seriously

---

## 🤝 Wilt Thou Go With Me Against Moab To Battle

Jehoram asks Jehoshaphat of Judah to join him in a war against Moab.

The northern and southern kingdoms had split apart generations earlier under Jeroboam and Rehoboam.

Even so, kings from both sides still formed alliances when it served them.

This exact same request appears almost word for word in First Kings twenty two.

Jehoshaphat is being asked to fight alongside Israel again, just like before.

🤝 Israel asks Judah for an alliance

⚔️ Two split kingdoms, still allies

🔁 Echoes First Kings twenty two

📖 Jehoshaphat is asked again

---

## 🔁 I Am As Thou Art

Jehoshaphat answers with the exact same vow he once gave to Ahab.

First Kings twenty two records him saying this nearly word for word.

The vow means he commits his whole kingdom, not just himself personally.

His people, his horses, and his army all become available for this war.

Jehoshaphat repeats this same costly promise without learning from the last time.

🔁 The same vow given to Ahab

📜 First Kings twenty two, nearly verbatim

🤝 His whole kingdom is committed

📖 He repeats a costly pattern

---

## 🗺️ Which Way Shall We Go Up

This decision falls to Jehoram since the campaign is his idea.

Two routes existed for reaching Moab from Israel and Judah.

The direct route crossed the Jordan and approached Moab from the north.

The route they choose instead swings far south through the wilderness of Edom.

That choice is about to create a serious problem for the whole army.

🗺️ Jehoram picks the invasion route

🧭 A northern route existed too

↩️ They swing south instead

📖 The choice creates a crisis

---

## 🏜️ The Way Through The Wilderness Of Edom

The wilderness of Edom was dry, rugged desert south of the Dead Sea.

Choosing this route let the army approach Moab from its weaker southern side.

It also brought a third king, the king of Edom, directly into the war.

Deserts like this one had few reliable sources of water along the way.

The very route meant to outsmart Moab is about to nearly destroy Israel's own army first.

🏜️ Dry desert south of the Dead Sea

🎯 Attacks Moab's weaker southern side

👑 Pulls Edom into the war

📖 The route almost backfires first

---

# SecondKingsThree 3:9-12
# 💧 No Water For The Host
---
## 🔄 Fetched A Compass Of Seven Days' Journey

To fetch a compass is an old expression meaning to travel in a roundabout way.

The three armies wind far south through the desert instead of a direct march.

Seven days is a long time for an army to travel without resupply.

This slow, curving route is what leaves them stranded without enough water.

A shortcut around danger from Moab turns into a danger all its own.

🔄 Fetch a compass means go roundabout

🐫 Seven days without real resupply

🏜️ The desert route causes the crisis

📖 Avoiding one danger creates another

---

## ⚔️ There Was No Water For The Host

A host in this verse simply means an army, not a stranger in someone's home.

Three kings' armies and all their pack animals needed water every single day.

The desert route left them with no river or well along the way.

This was not a minor discomfort, an army and its animals can die from thirst.

The mission is now at risk of failing before a single battle is fought.

⚔️ Host means an army here

🐪 Animals also needed daily water

🏜️ No river or well nearby

📖 Failure threatens before any battle

---

## 😩 Alas That The LORD Hath Called These Three Kings Together

Jehoram blames God for a crisis caused by his own choice of route.

He assumes this hardship must mean God has already decided to punish them.

Nothing earlier in the story ever shows God actually calling this alliance together.

Jehoram is guessing at God's intentions instead of asking Him directly.

His despair jumps straight to defeat instead of looking for a way forward.

😩 Jehoram blames God for his choice

❓ Assumes punishment without asking

🚫 Nothing shows God caused this

📖 Despair skips past seeking God

---

## 🙏 Is There Not Here A Prophet Of The LORD

Jehoshaphat's first instinct in crisis is to seek an actual word from God.

This mirrors his same request during the war council in First Kings twenty two.

Jehoram has no prophet of his own to suggest.

That absence quietly shows how far Jehoram's household has drifted from true worship.

One king searches for God's voice while the other has none to turn to.

🙏 Jehoshaphat seeks God's word first

🔁 Mirrors First Kings twenty two

🚫 Jehoram has no prophet to offer

📖 One seeks God, one cannot

---

## 🧴 Which Poured Water On The Hands Of Elijah

Pouring water on someone's hands was a servant's daily task, not a one time errand.

This phrase identifies Elisha as Elijah's close personal attendant, not just a casual disciple.

Second Kings chapter two already told the story of Elisha inheriting Elijah's ministry.

A servant's unnamed years of quiet duty are what earn him being sent for now.

Faithful ordinary service is exactly what prepared Elisha for this moment.

🧴 A servant's daily task, not one errand

🤝 Marks Elisha as Elijah's close attendant

🔁 Second Kings two told his rise

📖 Quiet service prepared this moment

---

## ✅ The Word Of The LORD Is With Him

Jehoshaphat states this as settled fact, not a hopeful guess.

Elisha's reputation as a true prophet has already spread beyond Israel's own borders.

Even Judah's king trusts Elisha's words without needing to test them first.

That kind of trust is rare for prophets who often faced deep suspicion.

His credibility is what gets the whole coalition moving toward him.

✅ Stated as fact, not a guess

🌍 Elisha's reputation reaches beyond Israel

🤝 Judah's king trusts him fully

📖 His credibility moves the coalition

---

## 👤 Went Down To Him

Him refers to Elisha, though the text has not said exactly where he is standing.

All three kings personally travel to Elisha instead of summoning him to them.

That reversal of the usual order shows real desperation, not casual curiosity.

Kings rarely lowered themselves to seek out a prophet in this way.

Their long walk to find him already speaks louder than their words will.

👤 Him means Elisha

👑 All three kings travel to him

🙇 A reversal showing real desperation

📖 Their walk speaks before their words

---

# SecondKingsThree 3:13-15
# 🎻 Elisha Sends For A Minstrel
---
## 🚫 What Have I To Do With Thee

This is an old expression of sharp rejection, close to saying we have nothing in common.

Elisha uses it to refuse any association with Jehoram's household.

The same phrase appears elsewhere in scripture as a way to push someone away entirely.

Elisha is making his contempt for Jehoram's idolatry unmistakably clear before saying anything else.

His tone here is not neutral, it is a direct confrontation.

🚫 An old phrase of sharp rejection

🔁 Used elsewhere to push someone away

😠 Contempt stated before anything else

📖 A direct confrontation, not neutral

---

## 👑 Get Thee To The Prophets Of Thy Father

Thy father and thy mother point straight back to Ahab and Jezebel.

Jezebel had personally supported hundreds of prophets devoted to Baal and Asherah.

First Kings eighteen already told how Elijah confronted those same prophets on Mount Carmel.

Elisha is sarcastically telling Jehoram to consult the false prophets his parents trusted instead.

The insult lands because everyone listening knows exactly what happened to those prophets.

👑 Points to Ahab and Jezebel

🕯️ Jezebel's prophets served Baal and Asherah

🔥 First Kings eighteen already judged them

📖 A sharp, deliberate insult

---

## ⚡ As The LORD Of Hosts Liveth

As the LORD liveth is a solemn oath meaning this is absolutely true.

LORD of hosts pictures God commanding armies of angels, not one nation's forces.

Before whom I stand means Elisha serves God directly, like a servant before a king.

This oath grounds what Elisha says next in real authority.

He is not offering advice, he is speaking as God's representative.

⚡ A solemn oath of absolute truth

👑 LORD of hosts commands angel armies

🧍 Elisha stands as God's servant

📖 He speaks with real authority

---

## 🙅 I Would Not Look Toward Thee

Elisha openly admits he would refuse Jehoram nothing on his own.

Only Jehoshaphat's presence changes Elisha's willingness to help right now.

One faithful person's presence can shelter someone who does not deserve it.

Jehoram receives help today because of who he stands next to.

Mercy sometimes reaches people through someone else's faithfulness, not their own.

🙅 Elisha would refuse Jehoram alone

🙏 Jehoshaphat's presence changes everything

🛡️ One faithful person shelters another

📖 Mercy arrives through someone else's faith

---

## 🎻 Bring Me A Minstrel

A minstrel was a musician, usually playing a stringed instrument like a harp.

Music was a known way prophets prepared themselves to receive a message from God.

David used music this same way to calm King Saul's troubled spirit.

Elisha does not force a message, he waits and prepares to receive one.

Even a fiery prophet followed a real, deliberate process before speaking for God.

🎻 A minstrel played a stringed instrument

🎶 Music helped prophets receive God's word

👑 David used it to calm Saul

📖 Even prophets followed a real process

---

## ✋ The Hand Of The LORD Came Upon Him

This phrase describes a prophet coming under God's direct power to speak His word.

It appears often in the Old Testament right before a major prophecy is given.

The music itself does not create the prophecy, it simply prepares Elisha to receive it.

What follows next comes from God, not from the song being played.

The source of the coming message is about to be made completely clear.

✋ Marks God's power coming on a prophet

📜 A common phrase before major prophecies

🎵 Music prepares, it does not create

📖 What comes next is from God

---

# SecondKingsThree 3:16-19
# ⛏️ Ditches In The Valley
---
## ⛏️ Make This Valley Full Of Ditches

Ditches here means trenches dug into the dry valley floor to hold water.

God commands the army to prepare for the miracle before any sign of it appears.

Digging trenches in a waterless desert would have looked pointless to anyone watching.

Faith here means acting on a promise before there is any visible proof.

The army has to trust the word first and see the water later.

⛏️ Ditches means trenches dug for water

🙌 Prepare before any sign appears

🏜️ Digging looked pointless at the time

📖 Faith acts before it sees proof

---

## 🌬️ Ye Shall Not See Wind, Neither Shall Ye See Rain

This rules out the two normal, natural causes of a flash flood.

No storm and no rainfall means no ordinary weather explanation is coming.

Whatever fills these ditches will have to come from somewhere else entirely.

God specifically removes the natural explanation before the miracle even happens.

Nobody watching will be able to credit the weather for what comes next.

🌬️ Rules out wind as the cause

🌧️ Rules out rain as the cause

❓ Removes the natural explanation early

📖 Nobody can credit the weather

---

## 💧 That Valley Shall Be Filled With Water

The promise covers every need at once, drinking water for people and animals both.

Cattle and beasts likely refers to both the army's livestock and its pack animals.

An entire army's survival depends on this one specific promise coming true.

Elisha states it with total certainty, not as a hopeful possibility.

What God promises here is complete provision, not a partial fix.

💧 Water enough for people and animals

🐎 Covers livestock and pack animals both

✅ Stated with total certainty

📖 Complete provision, not a partial fix

---

## 🪶 This Is But A Light Thing

Light thing here means something small or easy, not difficult at all.

Providing water for one army is a minor task from God's perspective.

Elisha immediately follows this promise with an even bigger one, total victory over Moab.

Comparing the two miracles shows just how much power is still in reserve.

What looks impossible to the army is barely worth mentioning to God.

🪶 Light thing means small or easy

💧 Water was the easier miracle

⚔️ A bigger victory follows right after

📖 The impossible is easy for God

---

## ⚔️ He Will Deliver The Moabites Also Into Your Hand

This promise goes far beyond simply surviving the desert crossing.

God commits to handing Israel a full military victory over Moab as well.

The word also links this promise directly back to the water miracle just given.

One act of provision becomes the guarantee behind an even larger one.

The army came looking for water and leaves with a guarantee of victory too.

⚔️ A full victory over Moab promised

🔗 Also links this to the water miracle

🛡️ One provision guarantees a bigger one

📖 They leave with victory guaranteed

---

## 🌳 Fell Every Good Tree

This command sounds troubling next to a law in Deuteronomy protecting fruit trees during a siege.

That earlier law actually protects only trees that produce food, not every tree in a region.

Most scholars see this as scorched earth warfare against Moab's whole economy, not a contradiction.

War in the ancient world often included destroying an enemy's long term ability to recover.

The goal here is to cripple Moab for years, not just win one battle.

🌳 Sounds harsh next to Deuteronomy's law

🌾 That law protects only fruit trees

🔥 This is broader scorched earth warfare

📖 The goal is Moab's long term ruin

---

## 🪨 Stop All Wells Of Water

Stopping a well meant filling it with rocks and debris so it could no longer be used.

Marring the land with stones meant scattering rocks across good farmland to ruin it for planting.

Both tactics targeted Moab's ability to feed and water itself for years to come.

This was not random destruction, it followed a clear and deliberate strategy.

Israel's army carries out this exact plan a few verses later in the chapter.

🪨 Stopping wells means filling them with rock

🌾 Marring land means ruining it for farming

🎯 A deliberate, targeted strategy

📖 Carried out exactly later in the chapter

---

# SecondKingsThree 3:20-25
# 🩸 Red As Blood
---
## 🌾 When The Meat Offering Was Offered

Meat offering here does not mean animal meat, it refers to a grain offering.

This offering was presented at the tabernacle every single morning across Israel.

The timing ties Elisha's miracle to Israel's regular pattern of daily worship.

The water arrives at the exact moment a faithful sacrifice is being made elsewhere.

God's provision lines up with an act of ordinary daily obedience.

🌾 Meat offering means a grain offering

🕰️ Offered every single morning

🙏 Ties the miracle to daily worship

📖 Provision lines up with obedience

---

## 💧 There Came Water By The Way Of Edom

The water floods in from the direction of Edom, exactly as Elisha said.

No storm clouds or rainfall anywhere caused this sudden flow.

Many scholars believe it came from flash flooding far off in Edom's own highlands.

Whatever the natural mechanism, its timing and location matched Elisha's word exactly.

A promise spoken the day before now lies filling every ditch in the valley.

💧 Water flows from the direction of Edom

🌦️ No storm or rain caused it

⛰️ Likely distant flash flooding in Edom

📖 Timing matched Elisha's word exactly

---

## ⚔️ Gathered All That Were Able To Put On Armour

This means every man in Moab old enough and fit enough to fight.

News of three kings marching against them reached Moab quickly.

Mesha responds by mobilizing every available soldier, not just his standing army.

This shows Moab understood the size of the threat it now faced.

Moab is not caught unprepared, it is meeting the invasion head on.

⚔️ Every man fit enough to fight

📰 News of the invasion spread fast

👥 Mesha mobilizes his full nation

📖 Moab meets the threat head on

---

## 🌅 The Sun Shone Upon The Water

Early morning sunlight reflecting off water can genuinely look deep red in color.

The reddish soil and stone common in that region likely deepened the effect.

This was a real, explainable natural sight, not an actual color change in the water.

The illusion happens to arrive at the exact moment Moab is watching from a distance.

A natural coincidence becomes the exact tool God uses to defeat them.

🌅 Sunrise can make water look red

🪨 Red soil likely deepened the color

👁️ A real optical effect, not magic

📖 A coincidence becomes God's tool

---

## 👁️ As Red As Blood

The water only looks like blood, it has not actually turned into blood.

Moab has no way to check this from such a distance across the valley.

Their assumption, formed instantly and without evidence, is about to prove fatal.

A visual misunderstanding is what actually sets their coming defeat into motion.

What they think they see matters more here than what is actually true.

👁️ It only looks like blood

📏 They are too far to check

⚡ Their guess is instant and wrong

📖 A misunderstanding leads to defeat

---

## ⚔️ This Is Blood, The Kings Are Surely Slain

Moab assumes the three allied kings have turned and destroyed each other overnight.

Nothing in the story ever suggests the coalition actually fought among itself.

This guess comes purely from what the red water seems to suggest.

Overconfidence leads Moab to skip caution and rush straight for an unguarded camp.

Their own assumption is about to walk them directly into an ambush.

⚔️ Assumes the kings fought each other

🚫 Nothing shows the coalition ever split

🏃 Overconfidence replaces caution

📖 Their assumption becomes the trap

---

## 💰 Now Therefore, Moab, To The Spoil

Spoil means the valuables and supplies left behind after a battle.

Moab's army rushes forward expecting to loot an already destroyed camp.

They abandon any real battle formation, expecting no resistance at all.

This overconfident charge is exactly what leaves them exposed to a real army.

Greed for plunder replaces the caution a real threat would have demanded.

💰 Spoil means valuables left after battle

🏃 They rush in expecting no fight

🛡️ They abandon real battle formation

📖 Greed replaces necessary caution

---

## ⚔️ The Israelites Rose Up And Smote The Moabites

The camp Moab expected to find destroyed was instead a fully ready army.

Moab's own overconfidence had already broken its formation before the fighting even started.

Israel's forces meet a disorganized, exposed enemy instead of a defended position.

The fighting turns into a rout almost as soon as it begins.

The battle that follows is less a fight and more a collapse.

⚔️ The camp was ready, not destroyed

💥 Moab's formation had already broken

🏃 Israel meets an exposed enemy

📖 The battle becomes a rout

---

## 🏰 They Beat Down The Cities

Israel now carries out the destructive plan God laid out back in verse nineteen.

Every fenced and choice city across Moab's territory falls under this campaign.

This was total, coordinated warfare, not scattered or accidental damage.

The devastation matches exactly what was promised before the army ever crossed into Moab.

God's word from days earlier is now fully carried out on the ground.

🏰 Fenced and choice cities fall

📜 Fulfills the plan from verse nineteen

🎯 Coordinated, not accidental, destruction

📖 God's earlier word is fulfilled

---

## 🏯 Only In Kirharaseth Left They The Stones Thereof

Kirharaseth was Moab's fortified capital city, also called Kir of Moab elsewhere in scripture.

Every other city in Moab falls completely during this campaign.

Kirharaseth alone survives with its stone walls left standing, though badly damaged.

Slingers keep attacking it even after the main destruction elsewhere is finished.

Moab's last stronghold becomes the final target of the whole invasion.

🏯 Moab's fortified capital city

🧱 The only city left partly standing

🎯 Slingers keep attacking it

📖 The invasion's final target

---

# SecondKingsThree 3:26-27
# 🔥 The King Of Moab's Desperate Act
---
## ⚔️ Seven Hundred Men That Drew Swords

Mesha sees the battle is now hopeless for his kingdom as a whole.

He picks seven hundred of his best remaining swordsmen for one final gamble.

This is not a rescue plan for Moab, it is a personal escape attempt.

The number shows this is a small, desperate strike force, not a real army.

A king who once sent enormous tribute now fights for his own survival alone.

⚔️ Seven hundred of his best swordsmen

🚪 A personal escape, not a rescue

🎲 A small, desperate strike force

📖 The tribute king now fights for survival

---

## 🎯 To Break Through Even Unto The King Of Edom

Mesha specifically targets the Edomite line of the three armies surrounding him.

Edom was likely the least experienced and least committed of the three allies.

Breaking through there offered the best odds of a successful escape.

Even this focused, calculated attempt still fails completely.

Mesha's last strategic decision as a free king ends in total failure.

🎯 Targets the Edomite line specifically

🛡️ Edom was the weakest ally

🚪 Best odds for an escape

📖 Even this careful plan fails

---

## 👑 His Eldest Son That Should Have Reigned In His Stead

This son was Mesha's own heir, the one meant to become Moab's next king.

In his stead means in his place, as the one who would succeed him.

Losing this specific son threatens Moab's entire royal line, not just one life.

Mesha is about to make the most extreme choice a king in this culture could make.

He is offering up Moab's own future, not simply a sacrifice.

👑 Mesha's own heir to the throne

🔁 In his stead means in his place

⚠️ Threatens the whole royal line

📖 He offers up Moab's own future

---

## 🔥 Offered Him For A Burnt Offering

Child sacrifice was a real practice tied to worship of the Moabite god Chemosh.

Kings in the ancient Near East sometimes offered their own son in a nation's greatest crisis.

Mesha performs this in plain public view, on top of the city wall itself.

He does this hoping Chemosh will intervene and turn the battle around.

Scripture records the act plainly without softening how disturbing it really is.

🔥 Tied to worship of the god Chemosh

👑 A last resort in a national crisis

🧱 Done publicly on the city wall

📖 Scripture records it without softening it

---

## ❓ There Was Great Indignation Against Israel

Scholars are genuinely divided about whose great anger this verse describes.

Some read it as horror felt by Israel's own soldiers at what they just witnessed.

Others read it as language describing Moab's fierce, renewed anger and resistance.

Either way, Israel withdraws and ends the campaign without fully conquering Moab.

The chapter ends without a clean, total victory, despite everything promised at the start.

❓ Scholars are genuinely divided here

😨 Possibly Israel's own horror

😠 Possibly Moab's renewed fury

📖 Israel withdraws without full conquest
`.trim();

export const SECOND_KINGS_THREE_PERSONAL_SECTIONS = parseSecondKingsThreeRawNotes(SECOND_KINGS_THREE_RAW_NOTES);
