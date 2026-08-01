export type GenesisFortyOnePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseGenesisFortyOneRawNotes(rawText: string): GenesisFortyOnePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: GenesisFortyOnePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Genesis\s+41:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Genesis 41 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Genesis\s+41:/i.test(lines[index].trim())) {
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
        !/^#\s+Genesis\s+41:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Genesis 41 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 41,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Genesis 41:${startVerse}` : `Genesis 41:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 14) {
    throw new Error("Expected 14 Genesis 41 sections, received " + sections.length);
  }

  return sections;
}

const GENESIS_FORTY_ONE_RAW_NOTES = `# Genesis 41:1-4
# 🐄 Two Dreams Pharaoh Cannot Shake
---
## 🕰️ At The End Of Two Full Years

Two full years have passed since the chief butler was freed from prison.

Chapter forty ended with the butler forgetting Joseph completely.

That silence stretched on for two more years.

God was still working even when nothing seemed to be happening.

🕰️ Two years passed since the butler left prison

🤐 The butler forgot Joseph the whole time

😶 Nothing visible seemed to be happening

📖 God works even during silent seasons

---

## 🌊 He Stood By The River

The river here means the Nile, the source of nearly all of Egypt's water.

Egypt has almost no rainfall, so every crop and animal depended on it.

Pharaoh dreaming beside the river was not a small detail.

The dream is really about Egypt's whole food supply.

🌊 The river means the Nile

🌾 Egypt depended completely on the Nile

👑 Pharaoh dreams next to Egypt's lifeline

📖 The dream is about the entire food supply

---

## 🐄 Seven Well Favoured Kine And Fatfleshed

Kine is an old word for cattle, the plural of cow.

Well favoured means healthy and attractive to look at.

Fatfleshed means thick and well fed, the opposite of starving.

These seven cows represent complete abundance in the dream.

🐄 Kine means cattle

💪 Well favoured means healthy looking

🍖 Fatfleshed means thick and well fed

📖 These cows picture full abundance

---

## 😟 Ill Favoured And Leanfleshed

Ill favoured means ugly or unhealthy looking, not simply unlucky.

Leanfleshed means thin to the point of looking starved.

These seven cows are the exact opposite of the first seven.

The contrast is the whole point of the dream.

😟 Ill favoured means ugly looking

🦴 Leanfleshed means starved thin

⚖️ These cows oppose the first seven

📖 The contrast carries the dream's meaning

---

## 😱 Did Eat Up The Seven Well Favoured And Fat Kine

Something thin is about to swallow something strong.

In the dream, the starving cows eat the healthy cows completely.

Eating them did not make the lean cows look any better.

That detail is strange enough that Pharaoh wakes up confused.

😱 Thin cows swallow the strong cows

🍽️ Eating them changed nothing visible

😵 The dream disturbs Pharaoh deeply

📖 Something small can consume something strong

# Genesis 41:5-8
# 🌾 A Second Dream, The Same Warning
---
## 🌾 Seven Ears Of Corn Upon One Stalk

Corn in the King James Bible does not mean corn on the cob.

It means grain in general, most likely wheat or barley in Egypt.

One stalk growing seven full heads of grain was unusually abundant.

Rank simply means healthy and full grown, not smelly.

🌾 Corn means grain, not modern corn

🌱 Wheat or barley likely grew in Egypt

📈 Seven heads on one stalk means abundance

📖 Rank here means healthy and full

---

## 🌬️ Blasted With The East Wind

The east wind in Egypt was a hot dry wind blowing off the desert.

It could scorch a whole field of grain in a single day.

Blasted means withered and destroyed by that heat.

A farmer watching that wind arrive knew the harvest was already lost.

🌬️ East wind means a hot desert wind

🔥 It could scorch grain quickly

🥀 Blasted means withered and ruined

📖 The wind alone could destroy a harvest

---

## 🔁 The Thin Ears Devoured The Full Ears

This mirrors the first dream exactly, thin devouring healthy.

Two different pictures, cows and grain, tell the same story.

Repeating a warning twice in Egyptian thought signaled real certainty.

Pharaoh senses that weight even before anyone explains it to him.

🔁 This mirrors the first dream exactly

🪞 Two pictures repeat one warning

✋ Repetition signaled real certainty

📖 Pharaoh feels the weight already

---

## 😟 His Spirit Was Troubled

Troubled here means deeply disturbed, not just mildly annoyed.

Pharaoh was shaken enough to call for help the moment morning came.

A ruler with total power still could not explain his own dream.

Power did not protect him from real fear.

😟 Troubled means deeply disturbed

🌅 Pharaoh acted the moment morning came

👑 Even Pharaoh could not explain it

📖 Power cannot remove real fear

---

## 🔮 All The Magicians Of Egypt And The Wise Men Thereof

Magicians here were trained priests who studied dreams, magic, and secret writing.

Wise men were scholars and advisors who served the royal court.

Egypt trusted this entire class of experts to explain the unknown.

Every one of them looked at the dream and had nothing to say.

🔮 Magicians were trained priest scholars

📜 Wise men were royal advisors

🏛️ Egypt trusted this whole expert class

📖 Every expert failed to explain the dream

# Genesis 41:9-13
# 🍷 The Butler Remembers
---
## 🍷 I Do Remember My Faults This Day

The butler finally speaks up only because he needs Pharaoh's problem solved.

For two full years he said nothing about Joseph at all.

His confession is really self interest wearing the shape of honesty.

God can still use a selfish moment to move His plan forward.

🍷 The butler speaks only now

🤐 He stayed silent two years

😬 His honesty starts from self interest

📖 God uses even selfish moments

---

## 🔥 Pharaoh Was Wroth With His Servants

Wroth is an old word for intense, burning anger.

This callback recalls chapter forty, when both officials angered Pharaoh.

The butler is reminding Pharaoh of that whole earlier situation.

He needs Pharaoh to remember the dungeon before he mentions Joseph.

🔥 Wroth means intense burning anger

📚 This recalls chapter forty's events

🕳️ Both officials had angered Pharaoh

➡️ The butler sets up the story

---

## 🔒 In Ward In The Captain Of The Guard's House

Ward is an old word for custody or imprisonment.

The captain of the guard ran Pharaoh's personal security and prison.

This is the same official named Potiphar back in chapter thirty nine.

Joseph has been in that very same house the entire time.

🔒 Ward means custody or prison

🛡️ The captain ran Pharaoh's security

🔁 This is Potiphar from chapter thirty nine

📖 Joseph never left that household's reach

---

## 👤 A Young Man An Hebrew

This young man is Joseph, though the butler never says his name.

Hebrew was the word Egyptians used for foreigners from Canaan.

It was not always a compliment in Egyptian society.

Even without using his name, the butler is finally pointing toward Joseph.

👤 The young man is Joseph

🌍 Hebrew meant a foreigner from Canaan

😐 The term was not a compliment

📖 The butler finally points to Joseph

---

## 🍷 To Each Man According To His Dream He Did Interpret

The butler retells chapter forty accurately, including the ending for each man.

Joseph told the butler he would be restored.

Joseph told the baker he would be hanged.

Both predictions came true exactly as Joseph said.

🍷 The butler was restored as told

🍞 The baker was hanged as told

✅ Both predictions came true exactly

📖 Joseph's words proved completely reliable

# Genesis 41:14-16
# 🪒 Joseph Brought Before Pharaoh
---
## ⛓️ Brought Him Hastily Out Of The Dungeon

Joseph goes from a forgotten prisoner to Pharaoh's court in one sudden moment.

Hastily shows how urgent Pharaoh's need had become.

Thirteen years earlier Joseph was sold into slavery as a teenager.

None of that history disappears just because the moment finally arrives.

⛓️ Joseph leaves prison suddenly

⏱️ Hastily shows real urgency

📆 Thirteen years have already passed

📖 A long wait ends in a moment

---

## 🧴 He Shaved Himself And Changed His Raiment

Raiment is an old word for clothing.

Egyptians shaved their faces and heads, unlike most Hebrew men of that time.

Joseph adjusts to Egyptian custom before stepping in front of Pharaoh.

Appearance mattered before he ever said a single word.

🧴 Raiment means clothing

🪒 Egyptians shaved, unlike most Hebrews

👘 Joseph dressed for Egyptian custom

📖 Preparation came before his first word

---

## 🙅 It Is Not In Me

Joseph refuses credit before he has even heard the dream.

Egyptian magicians built their whole reputation on claiming special power.

Joseph instead says any answer will come from God, not from himself.

An answer of peace means a true and calming explanation, not a guess.

🙅 Joseph refuses credit immediately

🔮 Magicians claimed power for themselves

🙏 Joseph points straight to God

📖 The answer will be true, not guessed

# Genesis 41:17-21
# 🐄 Pharaoh Tells It Again, In His Own Words
---
## ➕ Such As I Never Saw In All The Land Of Egypt For Badness

Pharaoh adds a detail here that was not in the narrator's version.

He personally emphasizes just how disturbing these thin cows looked.

This extra line shows the dream genuinely shook him.

A king used to comfort was not used to feeling this unsettled.

➕ Pharaoh adds his own detail here

😨 He stresses how disturbing they looked

😳 The dream truly shook him

📖 Even Pharaoh could not shake this image

---

## 🍽️ It Could Not Be Known That They Had Eaten Them

Eating the fat cows should have made the thin cows look better.

Instead they stayed just as sickly as before.

The famine will work the same eerie way, swallowing every trace of plenty.

Nothing from the good years will remain visible once it arrives.

🍽️ Eating changed nothing visible

🦴 The thin cows stayed sickly

🌾 Famine will erase every trace of plenty

📖 Abundance can vanish without a sign

# Genesis 41:22-24
# 🌾 The Second Dream, Retold
---
## 🔁 I Told This Unto The Magicians But There Was None That Could Declare It To Me

This is the second time in the chapter the magicians fail completely.

Pharaoh has now stated their failure out loud, in his own words.

Every expert Egypt trusted came up with nothing.

That silence makes Joseph's coming answer even more striking.

🔁 This is their second failure

🗣️ Pharaoh states it himself now

🔮 Every trusted expert failed

📖 Silence sets up Joseph's answer

---

## 🌱 Sprung Up After Them

Sprung up simply means suddenly appeared and grew.

The thin ears did not grow gradually beside the good ones.

They appeared right after, almost as an ambush.

The suddenness matches how quickly famine can follow plenty.

🌱 Sprung up means suddenly appeared

⚡ The thin ears arrived abruptly

🎯 It felt like an ambush

📖 Famine can follow plenty suddenly

# Genesis 41:25-28
# 🔮 Joseph Interprets: One Dream
---
## 🎭 The Dream Of Pharaoh Is One

This does not mean Pharaoh had only one dream that night.

It means both dreams carry the exact same single message.

Cows and grain are two pictures pointing at one truth.

Joseph tells Pharaoh the confusion is already solved.

🎭 Two dreams, one message

🐄 Cows picture the same truth

🌾 Grain pictures the same truth

📖 Joseph resolves the confusion at once

---

## 🗣️ God Hath Shewed Pharaoh What He Is About To Do

Shewed is an old spelling of showed.

Joseph tells a pagan king that Israel's God spoke directly to him.

Pharaoh worshiped many Egyptian gods, yet this message still reached him.

God can speak into a life even outside His own covenant people.

🗣️ Shewed means showed

👑 God spoke to a pagan king

🛕 Pharaoh worshiped many other gods

📖 God reaches beyond His covenant people

---

## 🔑 The Seven Good Kine Are Seven Years

Joseph decodes the first dream plainly, symbol by symbol.

Each healthy cow stands for one full year, not a literal cow.

The two dreams line up because they describe the exact same years.

Pharaoh now has a clear timeline instead of a confusing picture.

🔑 Joseph decodes the dream plainly

🐄 Each cow stands for one year

🔗 Both dreams describe the same years

📖 Confusion becomes a clear timeline

---

## 🥀 Seven Years Of Famine

The thin ears and lean cows both stand for coming famine years.

Famine here means a severe, extended food shortage, not a small shortage.

Joseph names the danger clearly instead of softening it.

Pharaoh now knows exactly how many hard years are coming.

🥀 Both symbols point to famine

📉 Famine means severe extended shortage

🗣️ Joseph names the danger plainly

📖 Pharaoh now knows what is coming

# Genesis 41:29-32
# 📢 Seven Years Up, Seven Years Down
---
## 🌾 Seven Years Of Great Plenty

Egypt is about to enter its richest growing season in memory.

Great plenty means harvests far beyond normal, year after year.

This good season is real, but it is also temporary.

How Egypt uses these years will decide who survives the next ones.

🌾 Egypt enters its richest years

📈 Great plenty means far more than normal

⏳ These good years are temporary

📖 What Egypt does now decides survival later

---

## 🔥 The Famine Shall Consume The Land

Consume means completely used up, leaving nothing behind.

This famine will not just reduce the food supply, it will erase it.

Joseph is warning Pharaoh in the strongest language available.

A softer word would not have matched what was actually coming.

🔥 Consume means completely used up

📉 The food supply will be erased

⚠️ Joseph uses the strongest language

📖 The warning matches the real danger

---

## 😖 It Shall Be Very Grievous

Grievous is an old word for extremely severe or painful.

Joseph is not describing mild inconvenience or a rough season.

He is describing suffering serious enough to threaten survival itself.

Naming it this plainly gives Pharaoh no excuse to delay.

😖 Grievous means extremely severe

🚫 This is not mild inconvenience

⚠️ Survival itself is at risk

📖 Plain warning leaves no excuse to wait

---

## 🔁 The Dream Was Doubled Unto Pharaoh Twice

Doubled here means God sent the same message through two pictures.

In this culture, a repeated sign meant a certain, unchangeable outcome.

Established means already decided and locked in by God.

Shortly bring it to pass means the timeline is already close, not distant.

🔁 Doubled means the same message twice

✅ Repetition signaled a certain outcome

🔒 Established means already decided

📖 The timeline was already close

# Genesis 41:33-36
# 📦 Joseph's Plan For Survival
---
## 🧠 A Man Discreet And Wise

Discreet means able to make careful, sound judgment calls.

Joseph moves from interpreting a dream to proposing an actual solution.

Pharaoh never asked for a plan, only an explanation.

Joseph offers wisdom Pharaoh did not even know he needed.

🧠 Discreet means careful sound judgment

🔀 Joseph shifts from explaining to solving

❓ Pharaoh only asked for an explanation

📖 Joseph gives more than was requested

---

## 🧮 Take Up The Fifth Part

The fifth part means one out of every five measures of grain, saved.

That works out to twenty percent set aside every single year.

It is a real tax, but a modest one compared to the coming need.

A little sacrifice now prevents a much bigger disaster later.

🧮 Fifth part means one in five saved

📊 That equals twenty percent yearly

⚖️ A modest tax for a huge need

📖 Small sacrifice now prevents disaster later

---

## 🏛️ Lay Up Corn Under The Hand Of Pharaoh

Joseph proposes a nationwide system of government controlled storage.

Under the hand of Pharaoh means under royal authority and control.

No single farmer or city was expected to solve this problem alone.

This is one of the earliest large scale famine relief plans on record.

🏛️ Joseph proposes national storage

👑 Under Pharaoh means royal control

🤝 No one solved this alone

📖 An early large scale relief plan

---

## 🎯 That The Land Perish Not Through The Famine

Joseph states the goal plainly, keep the whole nation alive.

Perish here means the complete destruction of the land and its people.

Every detail of the plan serves this one purpose.

Survival, not profit, is the reason for the entire system.

🎯 The goal is keeping Egypt alive

💀 Perish means total destruction

🧩 Every detail serves this purpose

📖 Survival, not profit, drives the plan

# Genesis 41:37-40
# 👑 Pharaoh Appoints Joseph
---
## ✅ The Thing Was Good In The Eyes Of Pharaoh

Pharaoh accepts this plan from a foreign prisoner almost instantly.

Joseph had no title, no land, and no political standing in Egypt.

Wisdom convinced Pharaoh faster than status ever could have.

God opened a door no human connection could have opened.

✅ Pharaoh accepts the plan instantly

⛓️ Joseph had no status at all

🧠 Wisdom convinced Pharaoh, not connections

📖 God opened a door no one else could

---

## 👁️ In Whom The Spirit Of God Is

Pharaoh, a pagan king, recognizes God's presence in Joseph without being told.

He does not use his own gods to explain what he sees.

Something about Joseph's wisdom pointed straight to its true source.

Even outsiders can recognize when God is genuinely at work.

👁️ Pharaoh recognizes God's presence

🛕 He does not credit his own gods

🧭 Joseph's wisdom points to its source

📖 Outsiders can still recognize God's work

---

## 🔁 None So Discreet And Wise As Thou Art

Pharaoh repeats the exact word Joseph used about himself back in verse thirty three.

That word choice was not an accident.

Pharaoh is confirming Joseph's own description and then acting on it.

Only in the throne will I be greater sets the one clear limit on Joseph's power.

🔁 Pharaoh repeats Joseph's own word

✅ He confirms it, not just hears it

👑 Only the throne outranks Joseph now

📖 Words become real authority here

---

## 🏛️ Thou Shalt Be Over My House

This role functions like a modern prime minister or vizier.

According unto thy word shall all my people be ruled means Joseph's orders carry Pharaoh's full authority.

Yesterday Joseph was a forgotten prisoner in a dungeon.

Today he governs the most powerful nation in the region.

🏛️ The role works like a prime minister

📜 Joseph's word now carries Pharaoh's authority

⛓️ Yesterday he was a forgotten prisoner

📖 Today he governs the whole nation

# Genesis 41:41-45
# 💍 Joseph Is Invested With Power
---
## 💍 Pharaoh Took Off His Ring

This ring was Pharaoh's personal signet, used to stamp his official seal.

Whoever held that ring could sign documents with the full force of law.

Handing it to Joseph transferred real legal power, not just an honor.

Joseph could now act with Pharaoh's own authority.

💍 The ring was Pharaoh's royal seal

✍️ It could sign documents into law

⚖️ This transferred real legal power

📖 Joseph now acted with Pharaoh's authority

---

## 🧵 Vestures Of Fine Linen

Fine linen was an expensive fabric worn mainly by Egyptian royalty and priests.

Joseph's prison clothes are replaced with the wardrobe of the ruling class.

His outward appearance now matches his new position completely.

Every part of this scene marks a complete change of identity.

🧵 Fine linen marked royalty and priests

👘 Prison clothes become royal clothing

🎭 Appearance now matches his new role

📖 This scene marks a new identity

---

## 🔗 A Gold Chain About His Neck

A gold chain in Egypt was a visible sign of high honor and rank.

Anyone seeing Joseph in public would instantly know he held real power.

This was not a private promotion kept quiet within the palace.

Egypt is meant to see this change happen in plain sight.

🔗 A gold chain marked high honor

👀 Anyone would instantly recognize his power

📢 This was a public announcement

📖 Egypt was meant to see the change

---

## 🐎 Bow The Knee

This phrase likely comes from an Egyptian word meaning something close to attention.

Riding in the second chariot placed Joseph visibly just below Pharaoh himself.

Crowds were commanded to bow as Joseph's chariot passed by.

This public ceremony announced Joseph's new rank to the entire nation.

🐎 The second chariot ranked just below Pharaoh

🙇 Crowds were commanded to bow

📣 This ceremony was fully public

📖 All Egypt learned who Joseph now was

---

## 🖐️ No Man Lift Up His Hand Or Foot

This is a strong exaggeration meaning total, complete authority.

Nothing important could happen anywhere in Egypt without Joseph's approval.

Pharaoh keeps only the throne itself above Joseph's reach.

Few people in ancient history ever held power this total.

🖐️ This phrase means total authority

🚫 Nothing happened without Joseph's approval

👑 Only the throne stood above him

📖 Few people ever held this much power

---

## 📛 Zaphnathpaaneah

Pharaoh gives Joseph a new Egyptian name, common practice for foreign officials.

Many scholars believe it likely means something close to God speaks and lives.

The new name was one more sign of Joseph's full new identity.

Even under a new name, Joseph never stops honoring the true God.

📛 Pharaoh gives Joseph a new name

🌍 New names marked foreign officials

🔤 It likely honors God speaking and living

📖 A new name did not change his faith

---

## 🏙️ Potipherah Priest Of On

On was an Egyptian city later known as Heliopolis, the city of the sun.

Potipherah served as a priest inside its major sun worship temple.

Joseph now marries directly into Egypt's religious establishment.

God's plan moves forward even through a family devoted to other gods.

🏙️ On was later called Heliopolis

☀️ It centered on sun worship

👰 Joseph marries into that priestly family

📖 God's plan works through unlikely places

# Genesis 41:46-49
# 🌾 Seven Years Of Overflowing Harvest
---
## 📆 Joseph Was Thirty Years Old

Joseph was seventeen when his brothers sold him into slavery back in chapter thirty seven.

That means thirteen long years passed between that betrayal and this moment.

Most of those years were spent enslaved or wrongly imprisoned.

God's timing rarely matches the timeline a person would choose.

📆 Joseph was seventeen when betrayed

⏳ Thirteen years passed until now

⛓️ Most years were slavery or prison

📖 God's timing rarely matches our own

---

## 🌾 The Earth Brought Forth By Handfuls

By handfuls is an old way of describing overflowing abundance.

The harvest was not just good, it was almost more than anyone could gather.

This matches exactly what both of Pharaoh's dreams had promised.

The interpretation Joseph gave is now visibly coming true.

🌾 Handfuls describes overflowing abundance

📈 The harvest exceeded what people expected

🔗 This matches Pharaoh's two dreams

📖 The interpretation is coming true

---

## 🏖️ Corn As The Sand Of The Sea

This is a hyperbole, an exaggeration used to describe something impossible to count.

Sand on a seashore has no realistic number a person could ever finish counting.

Joseph eventually just stops trying to keep an exact total.

The image captures a harvest bigger than any measurement system could hold.

🏖️ Sand of the sea means uncountable

🌾 The harvest was that enormous

🛑 Joseph stopped counting entirely

📖 No measurement could hold this abundance

# Genesis 41:50-52
# 👶 Two Sons Named After The Journey
---
## 👶 Before The Years Of Famine Came

Joseph's family life quietly grows even as he manages a coming crisis.

These two sons are born during the good years, not the hard ones.

Timing matters here, since both names will look back on Joseph's whole story.

Personal joy and national responsibility exist together in Joseph's life.

👶 His sons arrive during the good years

📆 Timing shapes what their names mean

⚖️ Personal joy and public duty coexist

📖 God works in the quiet moments too

---

## 🔤 For God Hath Made Me Forget

Manasseh sounds like the Hebrew word for causing to forget.

Joseph is not saying the pain of his past never happened.

He means God has finally healed the weight that memory carried.

Naming a son this way turns private healing into a lasting testimony.

🔤 Manasseh means causing to forget

💔 The pain was real, not denied

🩹 God healed the weight of memory

📖 A name becomes a lasting testimony

---

## 🔤 Caused Me To Be Fruitful

Ephraim sounds like the Hebrew word for being fruitful or doubly blessed.

Land of my affliction is a striking phrase to describe Egypt.

Joseph still calls Egypt an affliction, even at the height of his power.

Success there never erased the pain of how he first arrived.

🔤 Ephraim means fruitful or doubly blessed

🌍 Egypt is still called an affliction

👑 Power did not erase the pain

📖 God brings fruit even inside affliction

# Genesis 41:53-57
# 🌍 The Famine Reaches The Whole World
---
## 🌾 In All The Land Of Egypt There Was Bread

Every other nation nearby is suffering exactly as Joseph predicted.

Egypt alone prepared, and Egypt alone still has food.

Joseph's fifth part plan from earlier in the chapter is now paying off completely.

Wisdom applied early prevented a disaster everyone else is now facing.

🌾 Only Egypt still has bread

📦 Joseph's storage plan pays off

🌍 Every neighboring nation is suffering

📖 Early wisdom prevented later disaster

---

## 👑 Go Unto Joseph What He Saith To You Do

Pharaoh publicly hands his own authority over to Joseph completely.

Egyptians in genuine need are told to trust Joseph's word directly.

This is the clearest picture yet of how far Joseph's power reaches.

The man once sold as a slave now speaks with Pharaoh's own voice.

👑 Pharaoh hands his authority to Joseph

🙏 The people are told to trust him

📢 This shows how far his power reaches

📖 The rejected brother now speaks for Pharaoh

---

## 🏚️ Joseph Opened All The Storehouses

Years of careful planning finally turn into direct action.

Storehouses means the granaries built during the seven years of plenty.

Joseph sells the grain instead of simply giving it away for free.

Selling kept the whole relief system funded for the entire famine.

🏚️ Storehouses were the granaries built earlier

📦 Years of planning become real action

💰 Joseph sold instead of giving freely

📖 Selling kept the whole system working

---

## 🌍 All Countries Came Into Egypt To Joseph

The famine has grown so severe that the entire region depends on Egypt.

People are traveling from many nations just to reach Joseph directly.

This detail quietly sets up the next chapter of the story.

Joseph's own brothers are about to walk into Egypt for exactly this reason.

🌍 The whole region depends on Egypt

🚶 People travel from many nations

🔮 This sets up the next chapter

📖 Joseph's brothers are coming next
`.trim();

export const GENESIS_FORTY_ONE_PERSONAL_SECTIONS = parseGenesisFortyOneRawNotes(GENESIS_FORTY_ONE_RAW_NOTES);
