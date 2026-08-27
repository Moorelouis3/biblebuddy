export type SecondChroniclesThirtyFourPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesThirtyFourRawNotes(rawText: string): SecondChroniclesThirtyFourPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesThirtyFourPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+34:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Second Chronicles 34 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+34:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+34:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Second Chronicles 34 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 34,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 34:${startVerse}` : `2 Chronicles 34:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Second Chronicles 34 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_THIRTY_FOUR_RAW_NOTES = `# SecondChronicles 34:1-2
# 👦 A Boy King Seeks God
---
## Eight Years Old When He Began To Reign

Josiah becomes king at only eight years old.

His father Amon and grandfather Manasseh both led Judah into deep idolatry.

A child now inherits a kingdom soaked in generations of false worship.

Josiah will grow up to reverse nearly everything they built.

👦 Josiah became king at only eight

📉 Amon and Manasseh both worshiped idols

🔄 Josiah will reverse what they built

📖 A child inherited a corrupted kingdom

---

## Reigned In Jerusalem One And Thirty Years

Josiah's reign lasts thirty one years.

That makes him one of the longest reigning kings in Judah's history.

His grandfather Manasseh technically reigned even longer, fifty five years.

Manasseh used those years for evil, not reform.

Josiah will use these thirty one years far differently.

📆 Thirty one years on the throne

👑 One of Judah's longest reigning kings

💔 Manasseh reigned even longer in evil

📖 Josiah used his years for reform

---

## Walked In The Ways Of David His Father

David lived many generations before Josiah.

In Scripture, the word father often means ancestor, not just a direct parent.

David set the standard for a king who honored God above all else.

Josiah looks past his own wicked father and grandfather straight back to David.

👴 Father here means ancestor, not parent

🎯 David set the standard for kings

🚫 Josiah ignores his father's example instead

📖 He models himself after David alone

---

## Declined Neither To The Right Hand, Nor To The Left

This phrase pictures a straight road with no wandering off either side.

It means Josiah followed God's law without compromise in any direction.

Other kings often kept some reforms while quietly allowing some idols to remain.

Josiah refuses that halfway approach completely.

🛤️ The phrase pictures a straight road

⚖️ It means total, uncompromising obedience

🚫 Other kings often allowed partial idolatry

➡️ Josiah refuses any halfway measures

# SecondChronicles 34:3-7
# 🔨 Josiah Purges The Land
---
## In The Eighth Year Of His Reign, While He Was Yet Young

Eight years into his reign, Josiah is about sixteen years old.

He begins seeking God personally, long before he starts any national reform.

This inward search comes first, and the outward cleanup follows only later.

A teenager's private devotion becomes the seed of a national revival.

🔢 Eight years in, Josiah is sixteen

🙏 He seeks God before reforming anything

🌱 Personal devotion comes before public action

📖 A teenager's faith sparks a revival

---

## In The Twelfth Year He Began To Purge Judah And Jerusalem

Four more years pass before Josiah is ready to act publicly.

By now he is about twenty years old and fully in charge.

The word purge means a deep, deliberate cleaning out, not a light touch up.

Josiah spends years preparing before he ever swings the first hammer.

🔢 Four more years pass before action

👑 Josiah is now about twenty

🧹 Purge means a deep, deliberate cleanout

📖 Years of preparation came before reform

---

## The High Places, And The Groves

High places were hilltop shrines used for worship outside the temple.

Even some kings who loved God tolerated these because they felt harmless.

Groves refers to wooden poles honoring Asherah, a Canaanite fertility goddess.

Josiah refuses to leave either one standing anywhere in the land.

⛰️ High places were hilltop worship sites

🌳 Groves were poles honoring Asherah

🚫 Even good kings often tolerated these

📖 Josiah leaves none of them standing

---

## The Carved Images, And The Molten Images

Carved images were idols cut by hand from wood or stone.

Molten images were idols poured and shaped from melted metal.

Judah had accumulated both kinds under Manasseh's long, wicked reign.

Josiah goes after every material and every method of idol making.

🪵 Carved images were cut from wood

🔥 Molten images were poured from metal

📚 Manasseh had filled Judah with both

📖 Josiah destroys every kind of idol

---

## Brake Down The Altars Of Baalim

Baalim is the plural form of Baal, a storm and fertility god.

Different regions worshiped their own local version of this same false god.

Multiple altars had likely sprung up across the land for each version.

Josiah tears every single one of them down.

⚡ Baal was a storm and fertility god

🗺️ Different regions had their own version

🔨 Multiple altars existed across the land

📖 Josiah tears down every altar found

---

## Strowed It Upon The Graves Of Them That Had Sacrificed Unto Them

Josiah grinds the idols into dust and scatters that dust on graves.

The graves belong to the very people who once worshiped those idols.

In this culture, disturbing a grave was a severe act of dishonor.

This destruction is not random.

It is a deliberate, public humiliation of false worship.

⚰️ Dust is scattered on the worshipers' graves

😔 Disturbing graves was a serious dishonor

🎯 The humiliation is deliberate, not random

📖 False worship is publicly disgraced

---

## Burnt The Bones Of The Priests Upon Their Altars

Centuries earlier, an unnamed prophet predicted this exact event by name.

First Kings chapter thirteen names a future king named Josiah who would do this.

Burning human bones on an altar made that altar permanently unclean.

Josiah is fulfilling a very old, very specific prophecy without even realizing it.

📜 A prophet named Josiah generations earlier

🔥 Priests' bones defiled the pagan altars

♻️ Burned bones made the altars unclean

📖 An old prophecy comes true exactly

---

## So Did He In The Cities Of Manasseh, And Ephraim, And Simeon

These regions belonged to the northern kingdom of Israel, not Judah.

Assyria had already conquered and scattered that northern kingdom about a century earlier.

Josiah still reaches into that territory even though it is no longer his to rule.

He treats the whole land of Israel as belonging to God, not just his own borders.

🗺️ These cities sat in the north

⚔️ Assyria conquered Israel a century earlier

🌍 Josiah reforms land beyond his own borders

📖 He treats all Israel as God's land

---

## With Their Mattocks Round About

A mattock is a heavy tool similar to a pickaxe, used for digging and breaking ground.

Workers used these tools to physically tear apart stone altars and idols.

This was not a symbolic gesture done from a distance.

Josiah's men did slow, exhausting, hands on labor across the whole countryside.

🪓 A mattock is a heavy digging tool

💪 Workers physically broke apart altars

🚫 This was not just symbolic action

📖 Real labor covered the whole countryside

---

## Cut Down All The Idols Throughout All The Land Of Israel

This verse summarizes the scope of the whole campaign in one line.

The phrase all the idols leaves no exceptions and no quiet corners left untouched.

The phrase throughout all the land means the campaign reached far beyond Jerusalem's walls.

Only after finishing this massive project does Josiah return home.

🎯 No idol anywhere is left standing

🗺️ The campaign reached the whole land

🏠 Josiah returns home only when finished

📖 Total reform, not a partial fix

# SecondChronicles 34:8-13
# 🏛️ Rebuilding The House Of The LORD
---
## In The Eighteenth Year Of His Reign

Six more years pass between the idol purge and this new project.

Josiah is now about twenty six years old.

The land has been cleaned of idols, so now the temple itself gets attention.

Reform moves in careful stages rather than happening all at once.

🔢 Six years after the idol purge

👑 Josiah is now twenty six years old

🏛️ Now the temple itself gets attention

📖 Reform happened in careful stages

---

## Shaphan The Son Of Azaliah

Josiah sends three trusted officials to oversee the temple repair project.

Shaphan served as the royal scribe, handling official records and correspondence.

Maaseiah governed the city, and Joah kept the kingdom's official history.

Three different offices work together on one shared task.

✍️ Shaphan was the royal scribe

🏙️ Maaseiah governed the city

📚 Joah recorded the kingdom's history

📖 Three offices worked one shared task

---

## Delivered The Money That Was Brought Into The House Of God

Long before this, King Joash had set up a chest to collect gifts for temple upkeep.

The Levite doorkeepers were responsible for gathering whatever people gave.

That same collection system is apparently still running under Josiah, generations later.

Ordinary worshipers, not just the king, are funding this repair.

📦 A collection chest gathered temple gifts

🚪 Levite doorkeepers managed the collecting

⏳ The system still ran generations later

📖 Ordinary people funded the repair work

---

## Gathered Of The Hand Of Manasseh And Ephraim, And Of All The Remnant Of Israel

People from the former northern kingdom are giving money for Judah's temple.

The word remnant means the survivors left behind after Assyria's conquest and deportation.

These northern worshipers still cared enough about God's house to contribute.

Josiah's reform is uniting people across old political and tribal lines.

🌍 Northern Israelites gave money too

👥 Remnant means the conquest survivors

❤️ They still cared about God's house

📖 Reform united people across old lines

---

## To Buy Hewn Stone, And Timber For Couplings

Hewn stone means blocks of stone that have been cut and shaped, not left rough.

Couplings refers to the beams and joints that hold a building's frame together.

These are basic construction materials for a serious structural repair.

The temple needed more than a fresh coat of paint after years of neglect.

🪨 Hewn stone means cut, shaped blocks

🪵 Couplings are the connecting frame beams

🏗️ These are serious structural materials

📖 Decades of neglect needed real repair

---

## To Floor The Houses Which The Kings Of Judah Had Destroyed

Earlier kings of Judah, like Ahaz, had damaged or stripped parts of the temple complex.

Some rooms had likely sat unused and falling apart for years.

This project repairs damage caused by Judah's own past leadership, not by outsiders.

The very kings meant to protect God's house had instead worn it down.

👑 Past kings had damaged the temple

🏚️ Some rooms sat unused for years

⚠️ The damage came from Judah's own kings

📖 Protectors had instead worn it down

---

## The Men Did The Work Faithfully

Handling large sums of money always creates a real temptation to skim some off.

This verse specifically points out that these workers did not do that.

Their honesty is worth mentioning by name in Scripture.

Faithful, unglamorous labor gets noticed by God even when no one else is watching.

💰 Handling money invites real temptation

✅ These workers stayed honest instead

📝 Their honesty gets named in Scripture

📖 God notices faithful, unseen labor

---

## The Overseers Of Them Were Jahath And Obadiah

Merari and Kohath were two of the three sons of Levi, ancestor of all Levites.

Each Levite family line traditionally handled different duties around the temple.

Naming these specific family lines shows careful, organized delegation of the work.

This was not a chaotic volunteer effort.

It was a structured operation from the start.

👨‍👦 Merari and Kohath were Levi's sons

📋 Each family line had set duties

🗂️ The work was carefully organized

📖 Structure replaced chaos in this project

---

## Could Skill Of Instruments Of Musick

Some of the Levites helping with this project were skilled musicians.

Their musical training did not stop them from also helping oversee construction work.

Levites served God with whatever skill fit the need of the moment.

Worship and practical labor were never treated as separate categories in Israel.

🎵 Musician Levites helped with construction too

🔧 Skill served whatever need arose

🙏 Worship and labor were not separated

📖 Every skill served God's house

---

## Scribes, And Officers, And Porters

Scribes kept written records of the work and its expenses.

Officers managed and directed the various tasks and teams.

Porters guarded the gates and controlled who came in and out.

Every part of this large project had its own clear job description.

✍️ Scribes kept written records

🗣️ Officers managed the various tasks

🚪 Porters guarded the gates

📖 Every role had a clear purpose

# SecondChronicles 34:14-18
# 📜 The Lost Book Is Found
---
## Hilkiah The Priest Found A Book Of The Law Of The LORD Given By Moses

This scroll likely contained the book of Deuteronomy, or a large part of it.

For decades under Manasseh and Amon, the temple had been used for idol worship instead.

God's own written word had apparently been buried, forgotten, or shoved aside during that time.

Its rediscovery here is treated as a monumental, history changing event.

📜 The scroll was likely Deuteronomy

🙈 Decades of idolatry buried God's word

😮 Its discovery is treated as huge

📖 A forgotten word resurfaces at last

---

## I Have Found The Book Of The Law In The House Of The LORD

Hilkiah's words suggest this book had been missing, not simply overlooked on a shelf.

A whole generation of Judah may have grown up never once hearing it read.

Manasseh's fifty five years of idolatry left plenty of time for God's word to be lost.

Finding it again means Judah can finally hear what it has been ignoring for decades.

❓ The book had gone missing entirely

👶 A whole generation never heard it

⏳ Fifty five years gave it time to vanish

📖 Judah can finally hear it again

---

## Shaphan Carried The Book To The King

Shaphan first finishes his full report about the temple repair project.

Only after covering that business does he mention the book almost as an afterthought.

Nobody in this chain of officials yet grasps how significant this discovery really is.

The most important object in the whole chapter nearly gets treated as a footnote.

📋 Shaphan reports temple business first

🤷 The book is mentioned almost last

😶 No one yet grasps its weight

📖 A huge discovery nearly overlooked

---

## All That Was Committed To Thy Servants, They Do It

Shaphan first assures the king that the temple funds were handled properly.

This shows the ordinary administrative work getting done before anything dramatic happens.

Faithfulness in small financial details comes before the bigger spiritual moment.

Good order in small things often clears the way for something much larger.

💼 Shaphan reports the funds were handled

✅ Ordinary duties get finished first

🔗 Small faithfulness precedes the big moment

📖 Order in small things opens the way

---

## Shaphan Read It Before The King

This is likely the first time in years anyone had read this law aloud in the palace.

Josiah is hearing God's actual commands, not secondhand summaries or vague traditions.

The written word finally reaches the one person with the power to act on it.

A king shaped by idolatry from birth suddenly meets the real standard he was never taught.

👂 Josiah hears the law read aloud

🆕 Likely the first time in years

👑 It reaches the one who can act

📖 He meets a standard never taught

---

## Hilkiah The Priest Hath Given Me A Book

Shaphan is not just repeating the news himself, he is naming exactly who found it.

Giving credit to Hilkiah keeps the story accurate and specific rather than vague.

It also confirms the discovery happened inside the temple itself, backing the earlier report.

This small detail matters because the source of the book will matter later in the story.

🗣️ Shaphan names Hilkiah as the source

🎯 Accuracy matters more than vague credit

🏛️ It confirms the temple as the source

📖 The source will matter again later

---

## Delivered It Into The Hand Of The Overseers, And To The Hand Of The Workmen

Shaphan confirms the money reached the right hands, exactly as planned.

This detail closes the loop on the funding story before shifting attention to the book.

Good stewardship gets confirmed step by step, not just assumed.

Nothing about this reform runs on guesswork or loose ends.

💰 The money reached the right hands

🔁 The funding story gets closed out

✅ Stewardship is confirmed, not assumed

📖 This reform leaves no loose ends

# SecondChronicles 34:19-21
# 😢 Josiah Tears His Clothes
---
## When The King Had Heard The Words Of The Law, That He Rent His Clothes

Tearing one's own clothing was a well known way to show deep grief or alarm.

Josiah is not performing for an audience, this is a genuine, immediate reaction.

He instantly recognizes how far Judah has drifted from what God actually commanded.

A king raised in a corrupted kingdom suddenly sees the truth with fresh eyes.

👕 Tearing clothes showed deep grief

😲 This reaction was immediate and real

👀 He sees how far Judah drifted

📖 Fresh eyes see an old truth

---

## Ahikam The Son Of Shaphan

Ahikam is one of five men Josiah sends to seek guidance from a prophet.

Years later, this same Ahikam will protect the prophet Jeremiah from an angry mob.

A man trusted with this errand later proves faithful again in a very different crisis.

God often places the same faithful people at more than one turning point.

🙋 Ahikam is sent on this errand

🛡️ He later protects Jeremiah from a mob

🔁 The same man appears at two turning points

📖 God reuses faithful people over time

---

## Go, Enquire Of The LORD For Me

Josiah wants more than just a book, he wants direct confirmation from God.

Reading the law told him what was wrong, but not yet what to do next.

Seeking a prophet was the normal way to ask God a direct question in this era.

Knowing the problem drives Josiah straight toward seeking God's actual guidance.

📚 Josiah wants more than the book alone

❓ He does not yet know what to do

🗣️ Prophets were consulted for direct answers

➡️ Knowing the problem leads him to seek God

---

## Great Is The Wrath Of The LORD That Is Poured Out Upon Us

Josiah does not try to minimize or explain away what he just heard.

He immediately accepts that Judah stands under serious, deserved judgment.

This kind of honest, unflinching response is rare among the kings of Judah.

Facing sin honestly the moment it is exposed is the first real step toward change.

⚠️ Josiah accepts the judgment is real

🚫 He does not minimize the danger

🌟 This honesty is rare among kings

📖 Facing sin honestly starts real change

---

## Because Our Fathers Have Not Kept The Word Of The LORD

Josiah includes himself in this national failure by saying our fathers, not their fathers.

He does not blame only Manasseh or Amon by name and walk away clean.

The whole nation, including its past kings, shares responsibility for this drift.

Real repentance starts by admitting the failure belongs to the whole community.

🗣️ Josiah says our fathers, not their fathers

🚫 He does not blame others alone

👥 The whole nation shares responsibility

📖 Repentance owns the failure fully

# SecondChronicles 34:22-28
# 👩‍🦳 Huldah's Warning
---
## Huldah The Prophetess

Huldah is one of only a handful of women in the Old Testament called a prophetess.

Josiah's officials go directly to her instead of any of the male prophets active at that time.

Her word is treated with full prophetic authority, no different from a man's would be.

God's messengers were never limited to only one kind of person.

👩‍🦳 Huldah is a rare named prophetess

🚶 Officials seek her out directly

⚖️ Her authority equals any prophet's

📖 God's messengers were never one type

---

## Wife Of Shallum The Son Of Tikvath, Keeper Of The Wardrobe

This lengthy family line identifies exactly who Huldah is and where she fits socially.

Her husband managed the royal wardrobe, a real position of trust close to the king.

Naming a woman's family and role like this gave her account credibility for the record.

Scripture cares enough about her identity to write it down in full detail.

👨‍👩‍👧 Her family line is carefully recorded

👔 Her husband managed the royal wardrobe

✅ Detail here confirms her credibility

📖 Scripture treats her identity seriously

---

## Dwelt In Jerusalem In The College

The word college here does not mean a school in the modern sense.

It refers to a specific district or quarter within the city of Jerusalem.

Huldah lived close to the temple and royal officials, not off in some distant town.

Her location made her easy for the king's men to reach quickly.

🏙️ College means a city district here

🚫 Not a school like the modern word

📍 She lived close to the temple

📖 Her location made her easy to reach

---

## Behold, I Will Bring Evil Upon This Place, And Upon The Inhabitants Thereof

Huldah confirms that judgment for Judah's long idolatry is already decided.

This warning matches the very curses Moses had written centuries earlier for disobedience.

God's patience with Manasseh's fifty five years of idolatry has finally run out.

The scroll's warnings were not empty threats, and Huldah says so plainly.

⚖️ Judgment for Judah is already decided

📜 It matches Moses' ancient warnings

⏳ God's patience with idolatry ran out

📖 The scroll's warnings were never empty

---

## Because They Have Forsaken Me, And Have Burned Incense Unto Other Gods

Huldah names the exact charge, abandoning God and worshiping others in his place.

Burning incense was a normal act of worship, here aimed at the wrong god entirely.

This single sentence sums up generations of Judah's spiritual unfaithfulness.

The coming judgment is not random, it answers a specific sin.

🚪 Judah abandoned God for other gods

🔥 Incense was aimed at false gods

📚 This sums up generations of unfaithfulness

📖 Judgment answers a specific sin

---

## Because Thine Heart Was Tender, And Thou Didst Humble Thyself Before God

Huldah shifts here from the nation's fate to Josiah's own personal response.

The word tender means Josiah's heart stayed soft instead of hardening like his ancestors' did.

His humility and grief when he heard the book read were genuine and noticed.

Personal faithfulness matters to God even inside a story of national judgment.

💗 Tender means a soft, responsive heart

😢 His grief over the book was genuine

👁️ God noticed his personal humility

📖 Faithfulness matters even amid judgment

---

## Thou Shalt Be Gathered To Thy Grave In Peace

God promises Josiah will die before the coming disaster actually strikes Jerusalem.

The phrase in peace refers to being spared from witnessing that destruction, not the manner of his death.

Josiah will later die in battle, which can seem to conflict with this promise at first glance.

The promise is really about being spared the sight of Jerusalem's fall, not about how his life ends.

⏳ Josiah dies before the disaster strikes

👀 Peace means being spared the sight

⚔️ His battle death still fits this promise

📖 It promises what he will not see

---

## Neither Shall Thine Eyes See All The Evil That I Will Bring Upon This Place

This repeats and strengthens the promise already given in the previous verse.

Josiah will not personally witness Jerusalem's eventual destruction by Babylon years later.

That coming disaster is delayed specifically because of his humble, immediate response.

One faithful king's response can genuinely change the timing of history.

🔁 This repeats the earlier promise

🏙️ Jerusalem's fall is still coming later

⏱️ Josiah's response delayed that disaster

📖 One faithful response can shift history

---

## Tell Ye The Man That Sent You To Me

Huldah refers to Josiah simply as the man, not by his royal title.

A prophet speaking for God outranks even a king in this moment.

This wording is not disrespect, it reflects where true authority actually sits.

God's word settles the matter no matter who is asking the question.

🗣️ Huldah calls Josiah simply the man

👑 A prophet outranks a king here

⚖️ This shows where real authority sits

📖 God's word settles it either way

---

## So They Brought The King Word Again

The messengers return to Josiah carrying both warning and comfort in one report.

Judgment for the nation stands, but Josiah personally will be spared from seeing it.

This mixed message sets up exactly what Josiah does next in the chapter.

A hard truth and a personal mercy can arrive in the very same report.

📬 Messengers return with a mixed report

⚠️ National judgment still stands firm

🕊️ Personal mercy is given to Josiah

📖 Truth and mercy can arrive together

# SecondChronicles 34:29-33
# 🤝 The Covenant Renewed
---
## Gathered Together All The Elders Of Judah And Jerusalem

Elders were the respected heads of families and tribes who represented their communities.

Josiah does not act alone or keep this discovery private among the palace officials.

He calls together the very leaders who can carry this change back to the people.

Real reform needs support from more than just the man at the top.

👴 Elders represented families and communities

🚫 Josiah does not act alone here

📢 Leaders carry the change to the people

📖 Reform needs more than one man

---

## All The People, Great And Small

This gathering includes everyone, from the most powerful to the most ordinary person in Judah.

No one is exempt from hearing God's law read aloud on this day.

Sin under Manasseh had touched the whole nation, not just its leadership.

The whole nation now gets the same chance to hear and respond together.

👥 Everyone attends, powerful and ordinary alike

🚫 No one is exempt from hearing it

🌍 Manasseh's sin touched the whole nation

📖 Everyone gets the same chance to respond

---

## He Read In Their Ears All The Words Of The Book Of The Covenant

Josiah has the entire scroll read aloud, not just a summary or the easy parts.

Most people in that era could not read, so hearing it spoken was their only access.

Every single person present hears exactly the same words at exactly the same time.

Nothing about God's expectations is hidden or softened for this audience.

👂 The whole scroll is read aloud

📚 Most people could not read it themselves

🤝 Everyone hears the identical words together

📖 Nothing here is hidden or softened

---

## The King Stood In His Place, And Made A Covenant Before The LORD

Kings in Jerusalem's temple courtyard had a specific, recognized standing spot for major ceremonies.

Josiah personally commits himself first, before asking anyone else in the crowd to do the same.

This is the same kind of public covenant made earlier when young King Joash was crowned.

Leadership here begins with the king's own example, not with a command to others.

📍 Kings had a set ceremonial standing place

👑 Josiah commits himself before anyone else

🔁 This echoes Joash's earlier covenant scene

📖 Leadership starts with personal example

---

## With All His Heart, And With All His Soul

This phrase directly echoes the great command found in the book of Deuteronomy.

It calls for total devotion, not a partial or halfhearted commitment.

Josiah is not just performing a ceremony, he is quoting Scripture back to God.

His pledge lines up word for word with what the newly found book actually demands.

📖 This phrase echoes Deuteronomy directly

💯 It calls for total devotion

🗣️ Josiah quotes Scripture back to God

➡️ His pledge matches the book's demand

---

## Caused All That Were Present In Jerusalem And Benjamin To Stand To It

Josiah does not let this remain a private promise between himself and God alone.

He makes every person present publicly commit to the same covenant.

Standing to it was a physical, visible act of agreement everyone could see.

A whole community now shares responsibility for keeping this promise together.

🙋 Everyone present must publicly commit too

👀 Standing was a visible act of agreement

🤝 Josiah will not commit alone

📖 The whole community shares this promise

---

## Took Away All The Abominations Out Of All The Countries That Pertained To The Children Of Israel

This confirms Josiah's reform reached well beyond Judah's own borders one final time.

He treats the entire land promised to Israel's twelve tribes as his responsibility.

Political borders drawn by Assyria's earlier conquest do not limit his sense of duty.

His vision of reform matches the full scope of God's original promise to Israel.

🗺️ Reform reached beyond Judah's borders

🌍 He treats all Israel as his duty

🚫 Assyria's old borders do not limit him

📖 His vision matches God's full promise

---

## All His Days They Departed Not From Following The LORD

This faithfulness lasted specifically for the length of Josiah's own reign.

The phrase all his days quietly hints that this obedience will not necessarily outlast him.

Judah's earlier history already shows good reforms often collapsing after a godly king dies.

Josiah's personal leadership, not full national transformation, held this fragile revival together.

📆 Faithfulness lasted through Josiah's own reign

⚠️ All his days hints at a limit

📉 Past reforms often died with the king

📖 One leader's life held this together
`.trim();

export const SECOND_CHRONICLES_THIRTY_FOUR_PERSONAL_SECTIONS = parseSecondChroniclesThirtyFourRawNotes(
  SECOND_CHRONICLES_THIRTY_FOUR_RAW_NOTES,
);
