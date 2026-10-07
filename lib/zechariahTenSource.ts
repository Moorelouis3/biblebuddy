export type ZechariahTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahTenRawNotes(rawText: string): ZechariahTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 10:${startVerse}` : `Zechariah 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Zechariah 10 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_TEN_RAW_NOTES = `# Zechariah 10:1-2
# 🌧️ Ask The LORD, Not The Idols
---
## 🌧️ Ask Ye Of The LORD Rain In The Time Of The Latter Rain

"Latter rain" means the spring rain that fell right before harvest.

Judah also had an earlier rain season called the former rain.

The former rain softened the ground for planting in autumn.

The latter rain filled out the crops just before they were cut.

Losing either season meant real hunger for the whole year.

God invites the people to ask him directly for exactly this rain.

🌧️ Latter rain fell right before harvest

🌱 Former rain softened the ground for planting

🍞 Either season missing meant real hunger

📖 God invites them to ask him directly

---

## 🌩️ So The LORD Shall Make Bright Clouds, And Give Them Showers Of Rain

"Bright clouds" here are not just scenery in the sky.

They are rain clouds, heavy and ready to pour.

In this region, clear skies for too long meant drought and fear.

God promises to be the one actually sending the needed rain.

Many farmers nearby prayed to Baal for exactly this kind of rain.

The LORD alone controls the clouds, not any rival god.

🌩️ Bright clouds means clouds heavy with rain

🏜️ Clear skies too long meant drought

🙏 Farmers nearby prayed to Baal for rain

📖 The LORD alone sends the rain

---

## 🙅 The Idols Have Spoken Vanity, And The Diviners Have Seen A Lie

"Vanity" here means something empty and worthless, not pride.

"Diviners" were people who claimed to predict the future through omens and magic.

Israel's law strictly forbade this kind of fortune telling.

People turned to diviners anyway when they felt unsure about the future.

Every message those idols and diviners gave turned out false.

Only the LORD actually controls rain, harvest, and the future.

🙅 Vanity means empty and worthless

🔮 Diviners claimed to predict the future

⚖️ Israel's law forbade this kind of magic

📖 Only the LORD controls the future

---

## 🐑 They Went Their Way As A Flock, They Were Troubled, Because There Was No Shepherd

Sheep without a shepherd cannot find food or safety on their own.

"Shepherd" here pictures a leader, not just an animal herder.

Judah's leaders failed to guide the people well.

Without good leadership, the people wandered and grew anxious.

This picture of a troubled, leaderless flock sets up everything that follows.

God is about to step in as the shepherd they never had.

🐑 Sheep without a shepherd cannot find safety

👑 Shepherd here means a leader, not a herder

😟 Judah's leaders failed to guide the people

📖 God steps in as their true shepherd

# Zechariah 10:3-5
# ⚔️ The LORD Turns His Flock Into A Warhorse
---
## 😡 Mine Anger Was Kindled Against The Shepherds, And I Punished The Goats

"Shepherds" here are the leaders who were supposed to care for Judah.

"Goats" pictures leaders who push and bully the rest of the flock.

Both images point at the same failed leadership named in the verse before.

God's anger here is not random.

It targets the exact leaders who failed.

Those in charge are judged first, before anyone else.

😡 God's anger targets failed leaders

🐑 Shepherds were leaders who neglected the flock

🐐 Goats pictures leaders who bullied others

📖 Leaders are judged before anyone else

---

## 👁️ The LORD Of Hosts Hath Visited His Flock The House Of Judah

"Visited" here does not mean a quick, casual stop by.

It means God personally stepped in to act on their behalf.

The same flock that was judged for bad leadership is not abandoned.

God still calls Judah his own flock, even after punishing their leaders.

Judgment on leaders and care for the people can happen together.

👁️ Visited means God stepped in personally

🐑 Judah is still called God's own flock

⚖️ Leaders were judged, not the whole flock

📖 Judgment and care can happen together

---

## 🐎 Hath Made Them As His Goodly Horse In The Battle

A horse in battle pictures strength, speed, and confidence.

A flock of sheep pictures the opposite.

Sheep are weak and easily scattered.

God changes Judah's whole identity in one picture.

The nation that once wandered like lost sheep now charges like a warhorse.

🐎 A horse pictures strength and confidence

🐑 A flock pictures weakness and scattering

🔄 Judah's whole identity changes here

📖 Lost sheep now charge like a warhorse

---

## 🧱 Out Of Him Came Forth The Corner, Out Of Him The Nail, Out Of Him The Battle Bow

These three pictures all describe strong leadership rising from Judah itself.

The corner means a cornerstone, the stone that holds a whole building together.

The nail means a tent peg, driven deep to keep a tent secure.

The battle bow is a weapon, ready and aimed for war.

Together they picture a nation that is stable, secure, and able to fight for itself.

🧱 Corner means a cornerstone that holds everything up

⛺ Nail means a peg that keeps things secure

🏹 Battle bow pictures a weapon ready for war

📖 Judah becomes stable, secure, and able to fight

---

## 🛡️ Out Of Him Every Oppressor Together

"Every oppressor" here means every ruler Judah will ever need.

For a long time, Judah depended on foreign kings and foreign armies.

This verse promises leadership rising from within the nation itself.

Judah will no longer need to borrow strength from outside powers.

🛡️ Oppressor here means every ruler needed

🌍 Judah once depended on foreign powers

🏠 Leadership now rises from within the nation

📖 Judah no longer borrows strength from outsiders

---

## 👊 They Shall Be As Mighty Men, Which Tread Down Their Enemies In The Mire Of The Streets

"Mire of the streets" pictures the thick mud that collects in a city street.

Treading enemies into that mud is a picture of total, decisive defeat.

This is not a narrow escape or a close win.

It is complete victory, with nothing left to fear.

👊 Mighty men pictures total confidence in battle

🧱 Mire of the streets means thick city mud

⚔️ Enemies get trampled into that mud

📖 This pictures complete, decisive victory

---

## 🐴 Because The LORD Is With Them, And The Riders On Horses Shall Be Confounded

"Riders on horses" names enemy cavalry, the strongest and fastest unit in any ancient army.

"Confounded" means thrown into panic and shame, not just defeated.

Judah had no real cavalry of its own at this time.

The reason for the win is not better weapons.

It is God's presence with them.

🐴 Riders on horses means enemy cavalry

😱 Confounded means thrown into panic and shame

🤷 Judah had no real cavalry of its own

📖 God's presence, not weapons, wins this

# Zechariah 10:6-8
# 🎉 Judah And Joseph Brought Home
---
## 💪 I Will Strengthen The House Of Judah, And I Will Save The House Of Joseph

"House of Joseph" refers to the northern kingdom of Israel, descended from Joseph's sons.

"House of Judah" refers to the southern kingdom, the one still standing in Zechariah's day.

These two kingdoms split apart generations earlier and were never fully reunited.

God promises to restore both halves of his people, not just the one still standing.

A divided nation is pictured here as one family again.

💪 House of Judah is the southern kingdom

🏠 House of Joseph is the northern kingdom

⚔️ These two kingdoms split apart long before

➡️ God restores both halves of his people

---

## 🔄 They Shall Be As Though I Had Not Cast Them Off

This does not mean God forgets that judgment ever happened.

"Cast them off" describes the exile, God's discipline for the nation's sin.

God promises a restoration so complete it will feel like the exile never happened.

The guilt and distance from before are not just reduced.

They are gone completely.

🔄 Cast off describes the nation's exile

🩹 God erases the distance that exile caused

💔 This is not a partial fix

📖 The guilt and distance are simply gone

---

## 🍷 They Of Ephraim Shall Be Like A Mighty Man, And Their Heart Shall Rejoice As Through Wine

"Ephraim" was Joseph's son and the name often used for the whole northern kingdom.

"Rejoice as through wine" is a figure of speech, not a comment on drinking.

It describes the warm, loosened, carefree joy that wine can bring to a meal.

Here that same feeling comes from something far better than a cup of wine.

It comes from being strong and safe again after years of weakness.

🍇 Ephraim names the northern kingdom

🍷 Rejoice as through wine means warm, open joy

💪 This joy comes from being strong again

📖 Safety, not wine, is the real cause

---

## 👶 Their Children Shall See It, And Be Glad

This promise is not just for the current generation.

Children watching their parents live in safety and strength will carry that memory forward.

A promise that only lasted one generation would eventually fade and be forgotten.

This one is built to last, passed down on purpose.

👶 This promise reaches future children too

👀 Children see their parents finally safe

🔁 A single generation promise would fade

📖 This blessing is built to last

---

## 🙌 Their Heart Shall Rejoice In The LORD

The joy in this verse has one clear source.

It does not come from winning a war or gaining wealth.

It comes directly from the LORD himself.

Real, lasting joy in this chapter always points back to him.

🙌 The joy has one clear source

⚔️ It is not about winning wars

💰 It is not about gaining wealth

📖 It comes directly from the LORD

---

## 📯 I Will Hiss For Them, And Gather Them

"Hiss" here does not mean mockery or contempt.

Shepherds in this region used a sharp whistle or hiss to call their flock home.

God pictures himself calling his scattered people the same way a shepherd calls sheep.

No matter how far they scattered, one call is enough to bring them back.

📯 Hiss here is not mockery

🐑 Shepherds used a hiss to call sheep home

🌍 God calls his scattered people the same way

📖 One call is enough to bring them back

---

## ⚖️ For I Have Redeemed Them

"Redeemed" is a legal and family term, not just a religious word.

It describes paying a price to buy someone back from slavery or debt.

In the ancient world, a close relative could redeem a family member sold into slavery.

God claims that same role here, buying his people back as family.

⚖️ Redeemed is a legal, family term

💰 It means paying a price to free someone

👪 A relative often redeemed family from slavery

📖 God takes on that same role here

---

## 📈 They Shall Increase As They Have Increased

This promise points back to Israel's population explosion in Egypt before the exodus.

Back then, a small family grew into a nation strong enough to worry Pharaoh.

God promises that same kind of growth again after the exile.

The nation that shrank in captivity will grow large once more.

📈 This echoes Israel's growth back in Egypt

👑 That growth once worried Pharaoh himself

🌱 God promises that same growth again

📖 A shrunken nation will grow large again

# Zechariah 10:9-10
# 🌱 Scattered On Purpose, Gathered Again
---
## 🌱 I Will Sow Them Among The People

"Sow" is a farming word, meaning to scatter seed on purpose.

Being scattered among other nations usually only sounds like punishment.

Here it is described using the same word a farmer uses for planting, not discarding.

Scattered seed is never meant to just lie there and die.

It is meant to grow and eventually be harvested.

🌱 Sow means scattering seed on purpose

😟 Being scattered usually sounds like punishment

🌾 Scattered seed is meant to grow

📖 This scattering was not the end

---

## 🌍 They Shall Remember Me In Far Countries

Earlier in this chapter, false idols and diviners led the people astray.

Now, scattered into distant lands, the people finally turn back to the real God.

Exile became the very thing that taught them to remember him.

Sometimes distance from home brings people closer to God, not further away.

🙅 Idols and diviners once led them astray

🌍 Exile scattered them into distant lands

🙏 That same exile taught them to remember God

📖 Distance from home brought them closer to him

---

## 👪 They Shall Live With Their Children, And Turn Again

This promises normal family life restored, not just survival.

"Turn again" means turning back, both to the land and back to God.

Exile had scattered families apart for a long time.

Here the picture is whole families, together again, finally home.

👪 Normal family life is restored here

🔄 Turn again means turning back to God

💔 Exile had scattered families apart

📖 Whole families come home together

---

## 🇪🇬 I Will Bring Them Again Out Of The Land Of Egypt, And Gather Them Out Of Assyria

Egypt and Assyria represent the two major directions Israel's people were scattered.

Assyria conquered and exiled the northern kingdom generations earlier.

Egypt had enslaved Israel long before that.

Egypt later became a place of refuge during hard times.

Naming both together means God gathers people from every direction.

🇪🇬 Egypt enslaved Israel long ago

🏛️ Assyria exiled the northern kingdom later

🏠 Egypt later became a place of refuge

📖 God gathers people from every direction

---

## 🏞️ I Will Bring Them Into The Land Of Gilead And Lebanon

Gilead was a fertile region east of the Jordan River, known for good pasture.

Lebanon was the mountainous land to the north, famous for its tall cedar trees.

Neither place belonged to the original heartland most of the exiles came from.

God promises land that is rich and spacious, not just a return to the same small plot.

🏞️ Gilead was fertile land east of the Jordan

🌲 Lebanon was known for its tall cedars

🗺️ Neither place was their original small homeland

📖 God promises rich, spacious land this time

---

## 📦 Place Shall Not Be Found For Them

This is not a housing shortage.

It is the opposite kind of problem.

There will be too many people for the available space.

A once scattered, shrinking people now overflows the land God gives them.

📦 This is not a housing shortage

📈 It is the opposite kind of problem

🏠 There will be too many for the space

📖 A shrinking people now overflows the land

# Zechariah 10:11-12
# 🌊 Empires Fall, Israel Walks Free
---
## 🌊 He Shall Pass Through The Sea With Affliction, And Shall Smite The Waves In The Sea

This verse echoes Israel's first exodus, when the Red Sea opened for them to cross.

"Afflicted" here describes the sea itself, struck down and tamed by God's power.

God is not just remembering the old exodus.

He is doing it again.

Whatever obstacle stands between the people and home, he can strike it down too.

🌊 This echoes Israel's first exodus

💪 The sea itself is struck down and tamed

🔁 God does this again, not just remembers it

📖 No obstacle can block the way home

---

## 🏜️ All The Deeps Of The River Shall Dry Up

"The river" names the Euphrates, a major boundary named earlier in this same book.

A river this large would normally be a serious obstacle to cross.

God dries it up completely, the same way he dried up the Red Sea long before.

No natural barrier is large enough to stop this return home.

🏞️ The river names the Euphrates

🚧 A river this size was a real obstacle

🏜️ God dries it up completely

📖 No barrier is large enough to stop this

---

## 👑 The Pride Of Assyria Shall Be Brought Down, And The Sceptre Of Egypt Shall Depart Away

A "sceptre" is a short rod a king carried as a sign of his royal authority.

Assyria and Egypt were the two empires that had controlled Israel's story for generations.

Assyria exiled the northern kingdom.

Egypt once enslaved the whole nation long before that.

Both empires lose their grip on Israel's future in this one verse.

👑 A sceptre was a symbol of royal power

🏛️ Assyria exiled the northern kingdom

🏺 Egypt once enslaved the whole nation

📖 Both empires lose their grip here

---

## 🚶 I Will Strengthen Them In The LORD, And They Shall Walk Up And Down In His Name

"Walk up and down" is an everyday idiom for simply going about daily life.

It does not describe a special ceremony or a one time event.

It describes ordinary life, done freely and without fear.

"In his name" means living under God's identity and protection, not their own strength.

The chapter that opened with a troubled, leaderless flock ends with a secure, confident people.

🚶 This idiom means living ordinary daily life

😌 It is freedom, not a special ceremony

🛡️ In his name means under God's protection

📖 A troubled flock ends as a secure people
`.trim();

export const ZECHARIAH_TEN_PERSONAL_SECTIONS = parseZechariahTenRawNotes(ZECHARIAH_TEN_RAW_NOTES);
