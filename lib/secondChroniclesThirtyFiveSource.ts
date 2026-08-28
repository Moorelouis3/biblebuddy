export type SecondChroniclesThirtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirtyFiveRawNotes(rawText: string): SecondChroniclesThirtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+35:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Chronicles 35 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+35:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+35:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Chronicles 35 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 35,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 35:${startVerse}` : `2 Chronicles 35:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Second Chronicles 35 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTY_FIVE_RAW_NOTES = `# SecondChronicles 35:1-6
# 🐑 Josiah Prepares The Passover
---
## Kept A Passover Unto The LORD In Jerusalem

The Passover was a yearly feast remembering the night God spared Israel's firstborn in Egypt.

Each family killed a lamb and shared a special meal that night.

Judah had barely kept this feast under Josiah's father and grandfather.

Josiah is reviving a celebration that had nearly disappeared from national life.

🐑 Passover remembers Israel's escape from Egypt

📅 Families shared a lamb at the meal

😔 The feast had nearly disappeared under past kings

📖 Josiah revives a forgotten celebration

---

## Killed The Passover On The Fourteenth Day Of The First Month

God commanded this exact date through Moses centuries earlier.

The first month falls close to the modern months of March and April.

Keeping the date precise mattered because it tied Judah back to the night of the exodus.

Josiah restores the feast exactly as it was first commanded.

📅 God set this exact date long ago

🌙 The first month falls near spring

🎯 The date connects Judah to the exodus

📖 Josiah restores the feast exactly

---

## Set The Priests In Their Charges

A charge here means a specific duty assigned to a person, not a legal accusation.

Priests had drifted from their proper roles during years of idol worship in the temple.

Josiah personally reassigns each priest to the duty Moses originally gave them.

Restoring right worship starts with restoring order among the people who lead it.

📋 Charge means an assigned duty here

😔 Priests had drifted from their roles

🔄 Josiah restores their proper assignments

📖 Order among leaders comes first

---

## Encouraged Them To The Service Of The House Of The LORD

Many priests likely felt unsure after years of neglect and idol worship around them.

Josiah does not only give commands, he also builds up their confidence.

A good king cares about the hearts of the people he leads, not just their obedience.

Encouragement can matter as much as instruction when restoring something broken.

😟 Priests likely felt unsure after years of neglect

🗣️ Josiah encourages, not only commands

❤️ A good king cares about hearts

📖 Encouragement matters as much as instruction

---

## Put The Holy Ark In The House Which Solomon The Son Of David King Of Israel Did Build

The ark of the covenant was Israel's most sacred object, holding the stone tablets of the law.

At some point it seems to have been moved out of its proper place in the temple.

Manasseh or Amon likely displaced it while filling the temple with idols.

Josiah commands the ark returned to the exact place Solomon built for it.

📦 The ark held the tablets of the law

😔 It had apparently been moved out

🚫 A wicked king likely displaced it

📖 Josiah restores it to its place

---

## It Shall Not Be A Burden Upon Your Shoulders

Long ago, Levites carried the ark on their shoulders using long poles through its rings.

Once the ark settled permanently inside Solomon's temple, that traveling method was no longer needed.

Josiah tells the Levites their old carrying duty has ended with the ark's permanent home.

A task assigned for one season does not always look the same in the next.

🪵 Levites once carried the ark on poles

🏛️ The ark now has a permanent home

🔄 Their old carrying duty has ended

📖 Duties change as circumstances change

---

## According To The Writing Of David King Of Israel, And According To The Writing Of Solomon His Son

David and Solomon had earlier organized the priests and Levites into working groups called courses.

Josiah does not invent a new system, he reactivates the one already written down.

Following an old, trusted plan kept a massive undertaking from turning chaotic.

Reform can mean returning to a good plan instead of creating a brand new one.

📜 David and Solomon set up work courses

🔄 Josiah reactivates the old system

🗂️ An old plan prevents chaos here

📖 Reform can mean returning, not inventing

---

## Sanctify Yourselves, And Prepare Your Brethren

To sanctify means to set oneself apart as clean and ready for something holy.

The Levites were expected to purify themselves before they helped anyone else prepare.

Only after their own preparation could they safely guide their brethren through the sacrifice.

Spiritual leadership starts with the leader's own readiness first.

🧼 Sanctify means set apart and ready

🙋 Levites prepare themselves first

🤝 Then they guide their brethren

📖 Leadership starts with one's own readiness

# SecondChronicles 35:7-9
# 🐑 Gifts For The Feast
---
## Josiah Gave To The People, Of The Flock, Lambs And Kids

Not every family could afford an animal for the Passover sacrifice on their own.

Josiah personally supplies animals so any family without one could still take part.

Kids here means young goats, given alongside lambs for the offerings.

The king's own gift made sure no family was left out of the feast.

🐑 Not every family could afford an animal

👑 Josiah supplies animals for those without

🐐 Kids means young goats here

📖 No family was left out

---

## To The Number Of Thirty Thousand, And Three Thousand Bullocks

This gift is enormous, enough to cover thousands of households at once.

Bullocks means young bulls, offered here alongside the smaller lambs and kids.

A gift this size hints at how many people had drifted from proper worship.

The whole nation is being welcomed back to the feast at once.

🔢 The gift covers thousands of households

🐂 Bullocks means young bulls here

😮 The size shows how far Judah drifted

📖 The whole nation is welcomed back

---

## These Were Of The King's Own Substance

Substance here means personal wealth and property, not the temple treasury.

Josiah pays for this feast out of his own royal resources.

He does not raise taxes or reach into anyone else's pocket to fund it.

Generosity from the very top sets the tone for the rest of the nation.

💰 Substance means personal wealth here

👑 Josiah pays from his own resources

🚫 No one else is taxed for it

📖 Generosity at the top sets the tone

---

## His Princes Gave Willingly Unto The People

Willingly signals that this generosity was not commanded or forced by the king.

Judah's leading officials chose on their own to imitate Josiah's example.

Their example likely encouraged even more ordinary people to give as well.

Genuine worship spreads when leaders model it instead of only demanding it.

🙌 Willingly means this was not forced

👔 Officials imitate Josiah's own example

📈 Their example likely inspired more giving

📖 Leaders model worship instead of demanding it

---

## Hilkiah And Zechariah And Jehiel, Rulers Of The House Of God

These three men served as chief overseers of the temple and its operations.

This Hilkiah is very likely the same priest who later finds the lost book of the law.

Naming these officials by name gives credit for their part in this massive gift.

Faithful, specific people stand behind an event that could otherwise feel anonymous.

🏛️ Three men oversaw the temple's operations

📜 Hilkiah likely later finds the lost book

🙋 Naming them gives credit by name

📖 Faithful people stand behind this gift

---

## Chief Of The Levites, Gave Unto The Levites For Passover Offerings Five Thousand Small Cattle

Small cattle in lists like this usually means sheep and goats used for offerings.

The Levite leaders' gift is even larger than the temple officials' gift before it.

Levites, who owned no land of their own, still gave generously from what they had.

The people responsible for handling the sacrifices are also among its most generous givers.

🐑 Small cattle means sheep and goats

📈 Their gift outsized the officials' gift

🏞️ Levites owned no land, yet still gave

📖 Those who served also gave generously

# SecondChronicles 35:10-14
# 🔥 The Passover Sacrifice Begins
---
## So The Service Was Prepared

Everything for the feast now runs according to a clear, coordinated plan.

Every priest and every Levite already knows exactly where to stand and what to do.

Weeks of preparation in the earlier verses are now put into action.

Good worship rarely happens by accident, it happens because someone planned it well.

📋 A clear plan is now in motion

👥 Every worker knows their place

⏳ Weeks of preparation lead to this

📖 Good worship is planned, not accidental

---

## According To The King's Commandment

Josiah's authority stands behind every detail of how this feast runs.

A king in Judah held real power to organize national worship this way.

His command gives the priests and Levites the backing they need to act boldly.

Reform this large needed someone with the authority to actually make it happen.

👑 Josiah's authority backs every detail

⚖️ Kings held real power over worship

💪 His command gave workers backing

📖 Reform needed real authority behind it

---

## They Killed The Passover, And The Priests Sprinkled The Blood

Killing the passover lamb was the central act that the whole feast pointed toward.

Sprinkling blood echoed the very first Passover night in Egypt, when blood marked the doorposts.

That first blood spared Israel's firstborn sons from the final plague.

Every sprinkle here recalls a night when blood meant the difference between life and death.

🐑 The lamb's death was the central act

🚪 Blood recalls the doorposts in Egypt

👶 That first blood spared the firstborn

📖 Blood here recalls life over death

---

## The Levites Flayed Them

To flay means to remove the skin from an animal's body.

This was a physical, unpleasant task required before the meat could be prepared correctly.

Levites, not priests, handled this less glamorous part of the process.

Even the least glamorous jobs in worship still mattered and still got done.

🔪 Flay means to remove the skin

😖 This was an unpleasant, physical task

🙋 Levites handled the less glamorous work

📖 Every job in worship still mattered

---

## They Removed The Burnt Offerings

A burnt offering was a separate sacrifice from the passover lamb itself.

This offering was completely burned up, given entirely to God rather than eaten.

Its purpose was general worship and thanksgiving, not the specific Passover memory.

Judah offers both remembrance and worship together in the very same ceremony.

🔥 A burnt offering differed from the lamb

🙌 It was given entirely to God

🙏 Its purpose was worship and thanksgiving

📖 Remembrance and worship happen together here

---

## As It Is Written In The Book Of Moses

This phrase points back to the written law God gave centuries earlier.

The very book recently rediscovered in the temple is now actively guiding the ceremony.

Judah is not guessing at proper worship, they are following a specific written source.

A forgotten book found again is now shaping a nation's actions in real time.

📌 This points back to the law of Moses

📜 The recently found book guides the ceremony

🎯 Judah follows a written source, not guesswork

➡️ A forgotten book now shapes real action

---

## They Roasted The Passover With Fire According To The Ordinance

An ordinance is a specific rule or regulation, given here through Moses.

The law required the lamb to be roasted with fire, never boiled in water.

This exact method mattered because it matched the very first Passover meal in Egypt.

Following the smallest details showed real respect for what God had commanded.

📏 Ordinance means a specific rule

🔥 The law required roasting, not boiling

🐑 This matched the very first Passover

📖 Small details showed real respect

---

## The Other Holy Offerings Sod They In Pots, And In Caldrons, And In Pans

Sod is an old word meaning boiled, from the same root as the word seethe.

Unlike the passover lamb, these other holy offerings were cooked in boiling water instead.

Different sacrifices had different rules for exactly how they were to be prepared.

Careful attention to method, not just intention, marked true obedience here.

🍲 Sod means boiled in this verse

🔥 Only the lamb was roasted, not boiled

📏 Different offerings followed different rules

📖 Obedience included careful attention to method

---

## Divided Them Speedily Among All The People

Speedily means the food was distributed quickly, without unnecessary delay.

Thousands of families needed to be fed on the very same evening.

Careful organization from earlier in the chapter made this fast distribution possible.

Good planning let a massive crowd eat together without confusion or long waiting.

⏱️ Speedily means quickly, without delay

👥 Thousands of families ate that same evening

🗂️ Earlier organization made this possible

📖 Good planning served a massive crowd

---

## Afterward They Made Ready For Themselves, And For The Priests

The Levites finished serving everyone else before preparing their own meal.

They also prepared food for the priests, who were still busy with other duties.

Serving others first, then themselves, reflects real humility in the middle of hard work.

The last people fed were often the ones who had worked the hardest all day.

🤲 Levites served others before themselves

🙏 They also fed the busy priests

❤️ This reflects real humility in service

📖 The hardest workers ate last

# SecondChronicles 35:15-19
# 🎶 Singers, Porters, And A Feast For The Record Books
---
## The Singers The Sons Of Asaph Were In Their Place

Asaph was a famous Levite musician from the time of King David.

His descendants carried on the family tradition of leading Israel in worship through song.

Music was treated as a serious, ordered ministry, not a casual addition.

Generations later, this same musical family still serves God at this exact feast.

🎵 Asaph led worship music under David

👨‍👦 His descendants continued the family tradition

🗂️ Music was a serious, ordered ministry

📖 One family's calling lasted generations

---

## Jeduthun The King's Seer

A seer was someone who received messages from God, similar to a prophet.

Jeduthun holds this title even though he is also listed as a temple musician.

His gift combined artistic skill with genuine spiritual insight.

Worship in Israel was never treated as separate from hearing from God.

🔮 Seer means one who receives God's messages

🎵 Jeduthun was also a temple musician

🎨 His gift combined skill and insight

📖 Worship and hearing from God overlap

---

## The Porters Waited At Every Gate

Porters served as gatekeepers, controlling who came in and went out.

Every single gate needed someone stationed there for the whole event.

Their post required a full commitment, they could not leave even for a moment.

Guarding the gates might seem minor, but it protected the whole ceremony's order.

🚪 Porters were the temple's gatekeepers

📍 Every gate needed a person stationed

⏳ They could not leave their post

📖 A small job protected the whole event

---

## So All The Service Of The LORD Was Prepared The Same Day

Every single task described so far happened within one single day.

Thousands of animals, families, priests, Levites, singers, and porters all moved in coordination.

A project this size in one day required extraordinary planning and cooperation.

What looks chaotic on the page was actually a well run operation.

📅 All of this happened in one day

👥 Thousands of people moved in coordination

🗂️ The scale required extraordinary planning

📖 A busy day was still well run

---

## Kept The Passover At That Time, And The Feast Of Unleavened Bread Seven Days

The feast of unleavened bread followed immediately after the Passover meal itself.

For seven days, the people ate bread made without yeast, recalling Israel's hasty exodus from Egypt.

That hasty departure left no time for bread to rise before leaving Egypt.

Two connected feasts together retell the whole story of that first exodus night.

🍞 Unleavened bread had no yeast

🏃 It recalled Israel's hasty exodus

⏳ The feast lasted a full seven days

📖 Two feasts retell one whole story

---

## There Was No Passover Like To That Kept In Israel From The Days Of Samuel The Prophet

Samuel the prophet lived about four hundred years before Josiah's reign.

This statement claims Josiah's Passover was the greatest one kept in all that time.

Such a bold comparison shows how far this celebration stood out from ordinary feasts.

A young king who inherited a corrupted kingdom now holds a national record for faithfulness.

⏳ Samuel lived about four hundred years earlier

🏆 This claims the greatest Passover in that span

😮 The comparison shows how exceptional this was

📖 A once corrupted kingdom now sets a record

---

## In The Eighteenth Year Of The Reign Of Josiah Was This Passover Kept

This is the very same year Hilkiah found the lost book of the law.

The discovery of God's word and this record breaking Passover happened in one single year.

That timing is not a coincidence, the rediscovered law directly produced this celebration.

Hearing God's word again immediately changed how an entire nation worshiped.

📅 The same year the lost book was found

📜 Discovery and celebration land in one year

🎯 The timing was not a coincidence

📖 Hearing God's word changed a whole nation

# SecondChronicles 35:20-25
# ⚔️ Josiah Falls At Megiddo
---
## After All This, When Josiah Had Prepared The Temple

This phrase signals a major shift, moving from worship back into political and military events.

The temple project mentioned back in chapter thirty four is now considered complete.

Josiah has spent years restoring both the nation's worship and its central building.

A season of reform is about to collide suddenly with a season of war.

⏳ This marks a major shift in the story

🏛️ The temple project is now complete

📈 Years of reform now meet a new crisis

📖 Worship and war collide suddenly here

---

## Necho King Of Egypt Came Up To Fight Against Charchemish By Euphrates

Necho was the reigning king of Egypt at this point in history.

Charchemish was a major city far to the north, near the Euphrates river.

Egypt was marching to help Assyria fight against the rising power of Babylon.

This conflict had nothing directly to do with Judah at all.

🇪🇬 Necho was Egypt's reigning king

🗺️ Charchemish sat near the Euphrates river

⚔️ Egypt marched to help Assyria fight Babylon

📖 This war did not involve Judah

---

## Josiah Went Out Against Him

Josiah chooses to insert his own small kingdom into a war between great empires.

Judah had no real stake in this fight between Egypt, Assyria, and Babylon.

Nothing in the text says God told Josiah to intervene here.

A good king's past faithfulness did not guarantee wisdom in every single decision.

⚔️ Josiah joins a war between great empires

🤷 Judah had no real stake in it

🚫 God never told him to intervene

📖 Faithfulness does not guarantee every decision

---

## What Have I To Do With Thee, Thou King Of Judah

This question was a common ancient idiom asking why someone is interfering.

Necho is asking Josiah plainly why he is even involved in this conflict.

A foreign, pagan king is the one urging Judah's own king to stand down.

The warning comes from an unexpected source, yet it still carries real weight.

❓ The question asks why Josiah is interfering

🇪🇬 A pagan king urges Judah's king to stop

😮 The warning comes from an unexpected source

📖 An unlikely voice still carries real weight

---

## But Against The House Wherewith I Have War

Necho clarifies that his true target is a different kingdom entirely, not Judah.

The house here refers to a ruling family or nation, likely Assyria or Babylon.

Necho wants Josiah to understand this fight was never aimed at him.

Knowing your actual enemy matters before choosing to go to war.

🎯 Necho's true target was elsewhere

👑 House here means a ruling family or nation

🚫 This war was never aimed at Judah

📖 Know your enemy before going to war

---

## For God Commanded Me To Make Haste

This is a startling claim, a pagan king says God spoke directly to him.

The text later confirms this was genuinely from the mouth of God.

God can and does speak through people who are not part of His covenant people.

Josiah's mistake is not that God was silent, it is that he did not listen.

😮 A pagan king claims God spoke to him

✅ The text later confirms this was true

🌍 God can speak through people outside the covenant

📖 Josiah's failure was not listening

---

## Forbear Thee From Meddling With God, Who Is With Me, That He Destroy Thee Not

Forbear means stop or hold back from doing something.

Necho warns Josiah plainly that interfering here amounts to interfering with God Himself.

This is a direct, specific warning of coming death if Josiah continues.

Josiah receives a clear warning and still chooses to move forward anyway.

🛑 Forbear means stop or hold back

⚠️ Interfering here means interfering with God

💀 The warning names death as the outcome

📖 A clear warning still goes unheeded

---

## But Disguised Himself, That He Might Fight With Him

Disguising himself before battle echoes a very similar moment from King Ahab's life.

Ahab disguised himself before his own final, fatal battle generations earlier in Israel's history.

Both kings hoped a disguise could somehow outmaneuver a warning already given by God.

Neither king's disguise could actually change what God had already declared.

🎭 Disguise echoes King Ahab's earlier battle

👑 Ahab also died in a disguised final battle

🚫 A disguise cannot outmaneuver God's word

📖 Neither king's plan changed God's declaration

---

## Hearkened Not Unto The Words Of Necho From The Mouth Of God

Hearken is an old word simply meaning to listen carefully.

This verse plainly states that Necho's warning truly did come from God.

Josiah, of all people, had just spent this chapter championing obedience to God's law.

The very king who restored the law now ignores a living word from God.

👂 Hearken means to listen carefully

✅ Necho's warning truly came from God

😔 Josiah had just championed obedience to the law

📖 He ignores the very voice he championed

---

## Came To Fight In The Valley Of Megiddo

Megiddo sat along a major trade and military route in the land of Israel.

Its location made it the site of many important battles throughout ancient history.

This same valley is later connected to the word Armageddon in the book of Revelation.

A place already famous for battles becomes the site of one more tragic loss.

🗺️ Megiddo sat on a major trade route

⚔️ Many important battles happened there

😔 One more tragic battle happens here

📖 Revelation later connects this to Armageddon

---

## The Archers Shot At King Josiah

Archers on the battlefield were often not aiming at any one specific person.

Josiah's disguise apparently failed to protect him from this random strike.

A single arrow accomplishes what an entire army could not otherwise force.

The very disguise meant to protect him could not stop this outcome.

🏹 Archers likely were not aiming at him specifically

🎭 His disguise failed to protect him

🎯 One arrow changed everything that followed

📖 The disguise could not stop this outcome

---

## For I Am Sore Wounded

Sore here is an old word meaning severely or seriously, not related to soreness from exercise.

Josiah's own words confirm how seriously he was hurt in this moment.

The powerful reformer who once led a nation now needs to be carried away.

Even a faithful king was not shielded from the consequences of his own choice.

🩹 Sore here means severely, not achy

🗣️ His own words confirm the injury

👑 A powerful reformer must now be carried away

📖 Faithfulness did not shield him from consequences

---

## All Judah And Jerusalem Mourned For Josiah

The entire nation grieved together over the loss of this one king.

Few kings in Judah's history receive this kind of widespread public mourning.

Josiah's reforms had clearly touched and mattered to ordinary people, not only officials.

A king who served faithfully is missed by the very people he served.

😢 The whole nation grieved together

🌟 Few kings received such widespread mourning

❤️ His reforms had touched ordinary people

📖 Faithful service is genuinely missed

---

## Jeremiah Lamented For Josiah

Jeremiah was a prophet active in Judah during this exact period of history.

His grief over Josiah's death was personal, not just a formal, official duty.

These particular laments are a separate, now lost collection, not the Bible's book of Lamentations.

The book of Lamentations in Scripture actually mourns Jerusalem's later destruction by Babylon.

😢 Jeremiah's grief was personal, not formal

📜 These laments are a separate, lost collection

🗓️ Different griefs are recorded at different times

📖 The Bible's Lamentations mourns Jerusalem's later fall

# SecondChronicles 35:26-27
# 📜 Josiah's Deeds Recorded
---
## The Rest Of The Acts Of Josiah, And His Goodness

Chronicles regularly closes a king's story with this same kind of summary formula.

Most kings in this closing formula get evaluated only by their achievements or failures.

Josiah specifically gets remembered for his goodness, a rarer and more personal word.

Scripture wants Josiah remembered for his character, not only for what he built.

📜 This closing formula repeats for many kings

🏆 Most kings are judged by achievements alone

❤️ Josiah is remembered for his goodness instead

📖 Character mattered more than achievement here

---

## According To That Which Was Written In The Law Of The LORD

Josiah's goodness is measured against a specific written standard, not popular opinion.

That standard is the very law rediscovered earlier in this same story.

Many kings in Judah's history were measured by wealth, military strength, or long reigns.

Josiah is measured by a completely different, higher standard than most kings before him.

📏 Goodness is measured against a written standard

📜 That standard is the law found earlier

👑 Other kings were often judged differently

📖 Josiah is held to a higher standard

---

## Written In The Book Of The Kings Of Israel And Judah

This book is a historical record that no longer exists today.

Second Chronicles clearly draws on other written sources beyond what survives in our Bible today.

This lost book is different from the biblical books simply named First and Second Kings.

God preserved exactly what He wanted preserved, even while some records were lost to time.

📚 This lost book no longer exists today

✍️ Chronicles draws on sources beyond our Bible

🔀 It differs from the biblical books of Kings

📖 God preserved what He wanted preserved
`.trim();

export const SECOND_CHRONICLES_THIRTY_FIVE_PERSONAL_SECTIONS = parseSecondChroniclesThirtyFiveRawNotes(
  SECOND_CHRONICLES_THIRTY_FIVE_RAW_NOTES,
);
