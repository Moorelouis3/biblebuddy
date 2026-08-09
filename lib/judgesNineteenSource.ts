export type JudgesNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesNineteenRawNotes(rawText: string): JudgesNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 19:${startVerse}` : `Judges 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Judges 19 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_NINETEEN_RAW_NOTES = `# Judges 19:1-4
# 😔 A Levite Takes A Concubine Who Leaves
---
## 👑 In Those Days, When There Was No King In Israel

This exact phrase opens the last five chapters of Judges.

It signals that Israel has no central authority holding people to God's law.

The book keeps repeating this line to explain why the moral chaos keeps getting worse.

This chapter tells the darkest story in the whole book, right after that warning.

👑 No king means no central authority
📉 Judges repeats this line as a warning
📈 It explains why the chaos keeps growing
➡️ The darkest story in Judges follows here

---

## 🕎 A Certain Levite

Levite means he belonged to the tribe of Levi, set apart for God's service.

Levites were never given their own tribal land in Canaan.

They depended on hospitality, offerings, and the kindness of other Israelites to live.

That detail matters because this whole story turns on hospitality, who gives it and who refuses it.

🕎 Levite means tribe of Levi
🏞️ Levites received no land inheritance
🤝 They depended on others' hospitality
📖 Hospitality becomes this chapter's theme

---

## 🏕️ Sojourning On The Side Of Mount Ephraim

To sojourn means to live somewhere as a temporary resident, not a permanent citizen.

Mount Ephraim was not one single peak.

It was the whole hill country region where the tribe of Ephraim settled.

The Levite lived there without owning any of the land himself.

🏕️ Sojourn means temporary residence
⛰️ Mount Ephraim is a hill country region
🧭 Ephraim's tribe settled that whole area
➡️ The Levite lived there without owning land

---

## 💍 Took To Him A Concubine

A concubine was a recognized secondary wife under ancient Israelite custom.

She held a real place in the household, but a lower legal status than a full wife.

Her children usually did not inherit equally with a wife's children.

The Old Testament records this practice without ever holding it up as God's ideal for marriage.

💍 Concubine means a lower status wife
⚖️ She had fewer legal rights
👶 Her children rarely inherited equally
📖 Scripture records this without endorsing it

---

## 🏘️ Out Of Bethlehemjudah

Bethlehemjudah means Bethlehem in the territory of Judah.

The name distinguishes it from another Bethlehem up north in Zebulun.

This is the same town where Ruth would marry Boaz.

It is also the town where David would later be born.

Judges places its darkest story in this same town.

🏘️ Bethlehemjudah means Bethlehem in Judah
📍 It is distinct from a northern Bethlehem
👑 Ruth and David are both tied to it
📖 Both stories share this one town

---

## 💔 His Concubine Played The Whore Against Him

"Played the whore" is a direct KJV translation meaning she was sexually unfaithful.

Some ancient translations read this differently.

They suggest she simply became angry and left instead.

The Hebrew word behind this phrase is genuinely difficult.

Either way, the marriage had already broken down.

💔 Played the whore means unfaithful
📜 Some ancient versions read it differently
🤔 The Hebrew word is genuinely difficult
➡️ Either way, the marriage had broken down

---

## 🏠 Went Away From Him Unto Her Father's House

Returning to her father's house was a recognized custom when a marriage was in trouble.

A woman's father remained legally responsible for her even after she married.

This was not necessarily a final divorce.

It was closer to a formal separation.

🏠 Returning home was a recognized custom
👨 Fathers stayed responsible for married daughters
✋ This was closer to a separation
📖 The Levite's coming journey fits that custom

---

## 📆 There Four Whole Months

Four months is a long time for a marriage to sit unresolved.

The text does not tell us why the Levite waited so long to go after her.

That gap of silence is part of what makes this story feel heavy from the very first verse.

📆 Four months is a long delay
🤐 The text never explains the wait
⏳ Silence marks the story from the start
➡️ This delay sets a slow, heavy tone

---

## ❤️ To Speak Friendly Unto Her, And To Bring Her Again

"Speak friendly" is an idiom.

It literally means to speak to someone's heart.

It describes gentle, personal words meant to win someone back.

The Levite is traveling to reconcile, not to punish.

❤️ Speak friendly means speak to her heart
🗣️ It means gentle, personal persuasion
🤝 He comes to reconcile, not punish
➡️ His goal at the start is peace

---

## 🐴 Having His Servant With Him, And A Couple Of Asses

Traveling with a servant and pack animals was normal for a household with any means.

The asses carried supplies for the journey.

They would later carry the Levite's wife and concubine home.

These practical details set up who is present for the rest of the story.

🐴 Asses carried supplies for the trip
🧑‍🤝‍🧑 A servant traveled along too
🎒 This was a normal travel setup
📖 These details set up the whole cast

---

## 😊 He Rejoiced To Meet Him

The father in law's joy shows real warmth toward his son in law.

Ancient Near Eastern hospitality was not a small courtesy.

It was a serious social duty tied to honor.

This welcome contrasts sharply with what waits for him at Gibeah.

😊 Real warmth despite a broken marriage
🤝 Hospitality was a serious duty then
🏅 A welcome reflected a household's honor
➡️ This warmth contrasts with Gibeah's coldness

---

## 📅 He Abode With Him Three Days

Three days of shared meals extends this visit well past a quick reconciliation.

Ancient hosts often pressed guests to stay longer.

That pressure was a sign of honor, not rudeness.

The delay feels friendly on the surface.

It keeps pushing the Levite's departure later and later.

📅 Three days extends past a quick visit
🍽️ Hosts often pressed guests to stay
⏱️ Every extra day pushes departure later
➡️ Delay becomes a quiet source of danger

# Judges 19:5-9
# 🍞 An Overstayed Farewell
---
## 🍞 Comfort Thine Heart With A Morsel Of Bread

This is a Hebrew idiom.

It means eat something to strengthen yourself before a journey.

"Morsel" makes the meal sound small.

The phrase was really an invitation to a full meal.

The father in law uses this exact line more than once in this chapter.

🍞 Comfort thine heart means eat to strengthen
🍽️ Morsel undersells what was really offered
🔁 The father in law repeats this line
➡️ Repetition shows how hard he pushes

---

## 🔁 Tarry All Night, And Let Thine Heart Be Merry

The father in law urges an overnight stay five separate times.

Each request sounds warm on its surface.

The repetition quietly builds real tension for the reader.

Every extra night pushes the eventual journey later in the day.

That delay becomes the reason they are still traveling after dark.

🔁 He urges an overnight stay five times
😟 Warm words build quiet tension
🌙 Each delay pushes the trip later
➡️ A late start leads them into danger

---

## 🌙 He Lodged There Again

The Levite tries to leave a second time.

His father in law urges him one more time.

He gives in and lodges there again.

The pattern of delay keeps repeating itself.

🌙 He tries to leave a second time
🗣️ His father in law urges him again
🤝 He gives in once more
➡️ The delay keeps repeating itself

---

## 🏡 That Thou Mayest Go Home

The father in law offers one final compromise.

He suggests leaving early the next morning instead of tonight.

That plan would have kept them safe for one more night.

The Levite refuses even this reasonable offer.

🏡 One final compromise is offered
🌅 Leave early tomorrow instead of tonight
🛡️ That plan would have kept them safe
➡️ The Levite refuses even this offer

# Judges 19:10-15
# 🌆 The Road To Gibeah
---
## 🚶 But The Man Would Not Tarry That Night

On the fifth day the Levite finally refuses to stay any longer.

He decides to leave in the afternoon.

Evening is already close by that point.

That single choice puts the whole group on the road as darkness falls.

🚶 He finally refuses to stay longer
🕓 He leaves in the afternoon
🌆 Evening is already close by
➡️ This choice sends them into the night

---

## 🏙️ Came Over Against Jebus, Which Is Jerusalem

Jebus was the earlier name for the city that later became Jerusalem.

At this point in the story, Israel had not yet captured it from the Jebusites.

Judges 1:21 already explained that Benjamin failed to drive them out.

So Jebus was technically foreign territory sitting right in the middle of Israel's land.

🏙️ Jebus was Jerusalem's earlier name
🚫 Israel had not yet captured it
📜 Judges 1:21 already explained why
➡️ A foreign city sat inside Israel's borders

---

## 🌇 The Day Was Far Spent

This phrase means the day was almost completely gone.

By now the group is traveling dangerously close to nightfall.

Ancient roads carried real danger after dark from robbers and wild animals.

That danger is exactly why the servant wants to stop at Jebus.

🌇 The day was almost completely gone
🌑 Nightfall was getting dangerously close
🐺 Roads after dark carried real danger
➡️ That danger is why the servant suggests Jebus

---

## 🗣️ Let Us Turn In Into This City Of The Jebusites

The servant suggests the practical option.

It is a city that is right there as the sun goes down.

It would mean lodging among non Israelites for the night.

The suggestion is reasonable on its own.

The Levite has other plans already in mind.

🗣️ The servant suggests the nearby city
🌇 It is right there as night falls
🌍 It would mean lodging with foreigners
➡️ The Levite rejects the practical option

---

## 🚫 We Will Not Turn Aside Hither Into The City Of A Stranger

The Levite refuses to lodge anywhere outside of Israelite territory.

He assumes a fellow Israelite town will be safer than a foreign one.

That assumption is the tragic center of this whole story.

The city he trusts will turn out to be far more dangerous than the one he avoided.

🚫 He refuses to stay in a foreign city
🤝 He assumes Israelites mean safety
💔 That assumption becomes the story's tragedy
➡️ The safe choice turns out far more dangerous

---

## 📍 We Will Pass Over To Gibeah

Gibeah was a town inside the territory of Benjamin.

It would later become the hometown of Israel's first king, Saul.

Right now it is simply the Levite's chosen stop for the night.

That simple choice is about to matter enormously.

📍 Gibeah sits inside Benjamin's territory
👑 It later becomes Saul's hometown
🎯 Here it is just a planned stop
➡️ The name will matter again later

---

## 🗺️ In Gibeah, Or In Ramah

Ramah was another Benjamite town close to Gibeah.

Naming a backup option shows the travelers still expected to find shelter nearby.

They never end up needing Ramah at all.

Gibeah alone will decide how this night goes.

🗺️ Ramah was near Gibeah
🤞 A backup option was named
🚶 They expected shelter somewhere close
➡️ They never actually reach Ramah

---

## 🏷️ Which Belongeth To Benjamin

This detail names Gibeah's tribe directly.

The book of Judges is about to turn one town's sin into a crisis for all of Israel.

Naming the tribe here sets up chapters twenty and twenty one.

It is not a throwaway detail.

🏷️ This names Gibeah's tribe directly
⚠️ Benjamin's failure is about to begin
📖 Chapters 20 and 21 grow from this
➡️ One town's sin becomes a national crisis

---

## 🚪 There Was No Man That Took Them Into His House To Lodging

Refusing to house a traveler broke one of the strongest social rules of that world.

Hospitality to strangers was treated as a moral duty.

It was not simply good manners.

An entire town has now ignored two exhausted travelers sitting in the street.

That silence is a warning sign the reader is meant to notice.

🚪 No one offers them a room
⚖️ Hospitality was treated as a duty
🚩 A whole town ignoring guests is a warning
➡️ The reader is meant to notice this failure

# Judges 19:16-21
# 🏠 An Old Man Takes Them In
---
## 👴 An Old Man From His Work Out Of The Field At Even

This old man is the only person in the whole town willing to help.

"At even" means at evening, right when the travelers are stranded in the street.

He is returning tired from a normal day of farm labor.

His simple, ordinary routine is about to save two lives.

👴 The only willing host in town
🌇 At even means at evening
🌾 He is returning from farm work
➡️ An ordinary man saves two lives

---

## 🏞️ Which Was Also Of Mount Ephraim

This detail matters more than it looks.

The old man is not originally from Gibeah.

He comes from the same hill country region as the Levite.

The only person who helps a stranger is himself a kind of stranger there.

🏞️ He is not native to Gibeah
🤝 He shares the Levite's home region
🧭 Outsiders recognize each other's need
➡️ An outsider is the only one who helps

---

## 🏘️ He Sojourned In Gibeah

Sojourned again means he lived there as a resident, not a native.

Like the Levite in verse one, he lives somewhere that is not fully his own.

That shared status may explain his kindness.

He understands what it feels like to be a stranger with nowhere to sleep.

🏘️ Sojourned means living there as an outsider
🔁 The same word describes the Levite
💡 Shared experience may explain his kindness
➡️ Outsiders can understand outsiders best

---

## ✂️ But The Men Of The Place Were Benjamites

This line draws a sharp line between the old man and everyone else in town.

He is a guest there himself.

The native residents are the actual Benjamites of the town.

They are the ones who will fail these travelers completely.

✂️ One line separates him from the rest
🏠 He is only a guest there
🚨 The native Benjamites will fail these travelers
➡️ One kind man cannot represent his whole town

---

## ❓ Whither Goest Thou? And Whence Comest Thou?

This was a standard greeting for a traveler.

It was not idle small talk.

"Whither" means where you are going.

"Whence" means where you came from.

Asking these questions was often the first step toward offering shelter.

❓ A traditional greeting for travelers
🧭 Whither means where you are going
🔙 Whence means where you came from
➡️ This greeting was step one toward shelter

---

## 😔 There Is No Man That Receiveth Me To House

The Levite repeats almost word for word what the narrator already told the reader in verse fifteen.

That repetition lets the reader feel his exhaustion directly from his own mouth.

No one else in town has offered him a room either.

His own words confirm the town's failure.

😔 He echoes the narrator's own words
😢 The reader hears his rejection directly
🚪 No one else offered him a room
➡️ His own words confirm the town's failure

---

## 🌾 Straw And Provender For Our Asses

Provender means feed or fodder for animals.

The Levite explains that he is not asking for charity.

He already has supplies for the animals and food for the people.

He only needs a roof, not free food or money.

🌾 Provender means animal feed
🎒 He is not asking for charity
🏠 He only needs a roof
➡️ He has already provided for himself

---

## 🗣️ For Me, And For Thy Handmaid

Handmaid is a respectful, formal word for a female servant.

The Levite uses this polite term to introduce his concubine to a stranger.

The word choice fits the social manners of that culture.

The story soon reveals a much darker reality behind that polite introduction.

🗣️ Handmaid is a respectful, formal title
🙋 He uses it to introduce her politely
🎭 Polite words do not reveal the danger ahead
➡️ The chapter's darkest turn is coming next

---

## 🕊️ Peace Be With Thee

This greeting was a genuine blessing of safety.

It was not a casual phrase.

The old man is telling them plainly that they can relax now.

His welcome stands in sharp contrast to how the rest of the town treated them.

🕊️ Peace be with thee is a real blessing
😌 He tells them they can relax
🏠 His welcome contrasts with the town
➡️ One kind welcome breaks the pattern

---

## ⚠️ Only Lodge Not In The Street

The old man gives one firm condition along with his welcome.

He clearly knows something the travelers do not yet know.

It concerns nighttime danger in this particular town.

His warning turns out to be exactly right.

⚠️ He gives one firm condition
👀 He senses a danger they do not
🌙 His warning is about nighttime danger
➡️ His warning turns out to be exactly right

---

## 🦶 They Washed Their Feet

Washing a guest's feet was a basic act of hospitality.

Roads were dusty and sandals left feet exposed to that dust.

This act is finally the welcome the whole town denied.

A small gesture shows real care for a stranger.

🦶 Feet washing was standard hospitality
🏜️ Roads were dusty, sandals left feet exposed
🤗 It is the welcome the town denied
📖 A small gesture shows real care

# Judges 19:22-26
# 😱 The Night In Gibeah
---
## 😊 As They Were Making Their Hearts Merry

The evening had turned warm and relaxed inside the house.

That peaceful mood is about to be shattered without warning.

The contrast is deliberate.

The text wants the reader to feel how fast safety can disappear.

😊 The mood inside was warm and relaxed
⚡ It is about to be shattered
🎭 The contrast is deliberate storytelling
➡️ Safety can disappear without warning

---

## 👹 The Men Of The City, Certain Sons Of Belial

"Sons of Belial" is a Hebrew idiom for worthless, wicked men.

Belial later becomes a name used for Satan himself in the New Testament.

Calling them this tells the reader exactly how to judge what comes next.

The label is a warning, not a passing insult.

👹 Sons of Belial means wicked men
📖 Belial later becomes a name for Satan
⚖️ The label judges them immediately
➡️ The reader is told how to see them

---

## 👥 Beset The House Round About, And Beat At The Door

A mob surrounds the house on every side.

This is not just one or two men causing trouble.

This exact scene closely matches the story of Sodom in Genesis nineteen.

That match is not an accident.

The writer wants the reader to make the connection.

👥 A mob surrounds the whole house
🏙️ This matches the story of Sodom
✍️ The writer intends that connection
➡️ Judges is retelling Sodom inside Israel itself

---

## 🚨 Bring Forth The Man That Came Into Thine House, That We May Know Him

"Know" here is a euphemism for forced sexual assault.

Genesis nineteen uses this same wording for the mob surrounding Lot's visitors.

The demand in both stories is nearly identical.

This town is now acting exactly like Sodom.

🚨 Know here means sexual assault
📖 Genesis 19 uses the same demand
🔁 The wording is nearly identical
➡️ Gibeah is acting exactly like Sodom

---

## 🗣️ Do Not So Wickedly

The host protests exactly the way Lot once protested in Sodom.

He knows this demand would violate the sacred duty of protecting a guest.

His words here are right.

The choice he offers next will still be deeply wrong.

🗣️ He protests just like Lot did
🛡️ Guest protection was a sacred duty
✅ His protest itself is right
➡️ His next choice will still be wrong

---

## 😨 Here Is My Daughter A Maiden, And His Concubine

The host offers both his own daughter and the Levite's concubine to the mob.

He offers them instead of the male guest inside his house.

The Bible records this decision.

It never holds this decision up as good or right.

😨 He offers both women to the mob
🚫 He protects the male guest instead
📜 The Bible records this without approving it
➡️ Recording something is not endorsing it

---

## 🔄 Humble Ye Them, And Do With Them What Seemeth Good Unto You

"Humble" here is another euphemism for sexual assault.

The host is asking the mob to do to these women what they wanted to do to his guest.

This offer does not make the host a hero of the story.

It shows how far honor culture had twisted people's choices by this point.

🔄 Humble again means sexual assault
🔁 He redirects the same violence onto women
🚫 This does not make him a hero
➡️ Honor culture had twisted real justice

---

## 🙉 The Men Would Not Hearken To Him

The mob refuses even this offer at first.

Their refusal reveals how far their intentions had already gone.

The story does not let the reader look away from what happens next.

It states the outcome plainly instead.

🙉 The mob refuses to listen at first
😈 Their refusal reveals real intent
👁️ The story does not look away
➡️ What happens next is stated plainly

---

## 😔 Took His Concubine, And Brought Her Forth Unto Them

The Levite himself is the one who takes this action, not the host.

The text describes what he does.

It does not excuse him or praise him for it.

This decision becomes the reason all Israel eventually goes to war.

😔 The Levite himself makes this choice
📖 The text describes it, not excuses it
⚔️ This choice leads Israel into war
➡️ One decision reshapes the rest of the book

---

## 💔 They Knew Her, And Abused Her All The Night Until The Morning

The text states plainly what was done to her, not for shock value.

This is one of the darkest verses in the entire Bible.

The chapter refuses to soften it or explain it away.

Judges wants the reader to feel exactly how far Israel had fallen without a king.

💔 The text states this plainly, not graphically
😢 One of the darkest verses in the Bible
🚫 Nothing here is softened or excused
➡️ Israel had fallen this far without a king

---

## 🌅 When The Day Began To Spring, They Let Her Go

"Spring" here means the first light of dawn, not a season.

The mob releases her only once the assault has run its course through the night.

There is no rescue in this verse.

Only the end of one horror before the next begins.

🌅 Spring here means first daylight
🔓 She is released only after the ordeal ends
😔 No rescue happens in this verse
➡️ One horror ends only for another to begin

# Judges 19:27-30
# 💔 A Message To All Israel
---
## 🗣️ Her Lord Rose Up In The Morning

"Lord" here is simply the ordinary word a wife used for her husband.

It does not imply anything unusual about their relationship.

The Levite gets up and opens the door, apparently unaware of what waits outside.

He does not yet know what happened to her overnight.

🗣️ Lord was an ordinary word for husband
📖 Just normal address, not special honor
🚪 He opens the door unaware
➡️ He does not yet know what happened

---

## 🚪 The Woman His Concubine Was Fallen Down At The Door

He finds her collapsed right at the threshold of the house that sheltered him overnight.

The text lets this image speak for itself.

It offers no extra commentary.

Her silence in this verse says more than words could.

🚪 She lies collapsed at the doorway
🤐 The text lets the image speak
😢 Her silence says everything
➡️ No words could carry more weight here

---

## ✋ Her Hands Were Upon The Threshold

This small physical detail suggests she was reaching for the door when she died.

She may have been trying to get back inside to safety.

The chapter includes this exact detail on purpose.

It is not a throwaway detail.

✋ Her hands rest on the threshold
🚪 She may have been reaching for safety
🎯 This detail is included on purpose
➡️ A small image carries the chapter's full weight

---

## 😐 Up, And Let Us Be Going. But None Answered

The Levite speaks to her as if she is simply reluctant to get moving.

His tone here is startlingly cold given everything that just happened.

"But none answered" is the reader's first real clue something is wrong.

That silence tells the reader everything the narrator will not say directly.

😐 He speaks to her coldly
🚶 He assumes she is just slow to move
🚨 Her silence is the first real clue
➡️ Something has gone terribly wrong

---

## 📜 Divided Her, Together With Her Bones, Into Twelve Pieces

This act was not random cruelty on its own.

It functioned as a formal, horrifying summons.

First Samuel eleven records Saul later doing something similar with oxen.

Sending twelve pieces meant one piece traveled to each tribe of Israel.

📜 This act functioned as a formal summons
🐂 Saul later echoes this with oxen pieces
🔢 Twelve pieces matched Israel's twelve tribes
➡️ This was a call to war, not madness

---

## 🗺️ Sent Her Into All The Coasts Of Israel

"Coasts" here means borders or territory, not a seashore.

Every tribe of Israel receives this same shocking message at the same time.

The Levite is forcing the whole nation to confront what happened at Gibeah.

Silence is no longer possible for anyone in Israel.

🗺️ Coasts means territory, not a seashore
📬 Every tribe receives the same message
📢 He forces the whole nation to see it
➡️ Silence is no longer possible for Israel

---

## 😱 There Was No Such Deed Done Nor Seen

The people compare this crime to nothing since Israel left Egypt.

That comparison marks it as the worst thing anyone can remember.

The book of Judges has been building toward exactly this kind of low point.

The nation has now reached its lowest point yet.

😱 Compared to nothing since the Exodus
📉 Marked as the worst crime in memory
📚 Judges has been building toward this
➡️ The nation has reached its lowest point yet

---

## 📖 Consider Of It, Take Advice, And Speak Your Minds

This is a direct call for the nation to gather and respond together.

The Levite is asking Israel to act as one people instead of scattered tribes.

That response will fill the next two chapters of Judges.

One horrifying night in Gibeah becomes the reason all Israel goes to war against Benjamin.

📖 A call for the nation to respond
🤝 Israel is asked to act as one
⚔️ This leads into the next two chapters
➡️ One night in Gibeah starts a civil war
`.trim();

export const JUDGES_NINETEEN_PERSONAL_SECTIONS = parseJudgesNineteenRawNotes(JUDGES_NINETEEN_RAW_NOTES);
