export type EzraTwoPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraTwoRawNotes(rawText: string): EzraTwoPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraTwoPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+2:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 2 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+2:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+2:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 2 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 2,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 2:${startVerse}` : `Ezra 2:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 15) {
    throw new Error("Expected 15 Ezra 2 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_TWO_RAW_NOTES = `# Ezra 2:1-2
# 📜 The Return Roll Call
---
## Now These Are The Children Of The Province

A province was a territory ruled by a foreign empire, not an independent nation.

Judah had lost its own kingship generations earlier when Babylon conquered it.

Persia now controlled the region as one province among many.

These returning families were coming home to a Persian territory, not a free kingdom.

Political freedom would not return for centuries.

🗺️ Province means a ruled territory
👑 Judah had lost its own king
🏛️ Persia now controlled the land
📖 They returned to a province not a kingdom

## Which Came With Zerubbabel

Zerubbabel was a direct descendant of King David.

His grandfather Jehoiachin had been the last king taken captive to Babylon.

Persia appointed Zerubbabel to lead this return and govern Judah.

A king's own line was walking home, even without a throne to sit on.

That promise to David had not been forgotten.

👑 Zerubbabel descended from King David
⛓️ His grandfather Jehoiachin was exiled
🏛️ Persia appointed him to govern
📖 David's line was walking home

## Jeshua

Jeshua was the high priest who led the return alongside Zerubbabel.

His name is spelled Joshua everywhere else in the Old Testament.

The prophets Haggai and Zechariah later call him Joshua the high priest.

A king's descendant and a priest were walking home together.

That pairing matched how God had always structured leadership under the Law.

⚖️ Jeshua led the return as priest
🔁 His name is also spelled Joshua
📜 Haggai and Zechariah name him too
📖 King and priest returned together

## The Number Of The Men Of The People Of Israel

Eleven leaders are named before the count of ordinary families even begins.

A parallel list in Nehemiah chapter seven names one additional leader.

That makes twelve total leaders in that version, matching Israel's twelve original tribes.

Naming leaders first showed this return was an organized company, not a scattered wandering.

Every family that follows was being counted under real, accountable leadership.

🔢 Eleven leaders open the whole list
📜 Nehemiah seven names a twelfth leader
🕎 Twelve echoes Israel's twelve tribes
📖 This return was organized not scattered

# Ezra 2:3-8
# 👪 Counted By Ancestor
---
## The Children Of Parosh

Children of Parosh does not mean literal sons of one living man.

It means every person who traced their line back to an ancestor named Parosh.

The exile had lasted about seventy years.

That is long enough for two or three generations to grow up in Babylon.

Most of these people had never once seen Jerusalem.

👪 Children of means traced descendants
⏳ Seventy years passed since the exile began
👶 Most were born in Babylon
📖 Few had ever seen Jerusalem

## The Children Of Pahathmoab, Of The Children Of Jeshua And Joab

Pahathmoab literally means governor of Moab in Hebrew.

Some ancestor in this family likely once held that title or lived among Moabites.

Moab was the nation east of the Dead Sea that Israel had a long history with.

Ruth herself came from Moab generations earlier.

A name here can quietly carry an entire forgotten story.

🏷️ Pahathmoab means governor of Moab
🗺️ Moab sat east of the Dead Sea
📖 Ruth also came from Moab
➡️ Names can carry forgotten history

## The Children Of Zattu

Every family here is recorded with an exact headcount, not a rough estimate.

Precise numbers protected each family's legal claim to land back in Judah.

Persian administrators also required accurate records for tax and labor purposes.

A number this specific was a legal document, not just a memory.

🔢 Exact counts protected land claims
🏛️ Persia required accurate records too
📜 This list functioned as a legal document
📖 Every number here had real weight

# Ezra 2:9-14
# 🔁 Familiar Names Return
---
## The Children Of Bigvai

This Bigvai is not the same man named as a leader back in verse two.

Bigvai was a common Persian era name, not a rare one.

Two different people can share an identical name in the very same chapter.

The Bible expects readers to track context, not assume every repeated name is one person.

🔁 This Bigvai differs from verse two
🪪 Bigvai was a common Persian name
👥 Two people can share one name
📖 Context decides who is who

## The Children Of Azgad

Azgad's family reappears later in Ezra chapter eight with an entirely new group.

More than a hundred additional descendants of Azgad returned decades later with Ezra himself.

Not every family came home in this first wave under Zerubbabel.

Some waited for the second return, decades afterward.

🔁 Azgad appears again in Ezra eight
👥 More Azgad descendants return later
⏳ Some families waited decades to return
📖 The return happened in stages

# Ezra 2:15-19
# 🌱 Smaller Families Still Counted
---
## The Children Of Ater Of Hezekiah

This Hezekiah is not the famous king of Judah from centuries earlier.

He was simply an ancestor within the Ater family line.

Common Bible names repeat often across many unrelated families.

The same name meant something completely different depending on which family used it.

👑 This is not King Hezekiah
👪 Hezekiah here names a family ancestor
🪪 Common names repeat across families
📖 Same name, different person entirely

## The Children Of Jorah, An Hundred And Twelve

Some families on this list are tiny compared to others nearby.

Jorah's entire returning family numbered only one hundred twelve people.

Not every family had grown or survived the exile equally well.

The list quietly records loss alongside growth, without commenting on either.

📉 Some families stayed very small
👪 Jorah numbered only a hundred twelve
⚖️ Not every family fared the same
📖 The list records loss without comment

# Ezra 2:20-26
# 🏘️ Counted By Hometown
---
## The Children Of Bethlehem

Starting here, families are counted by their hometown instead of an ancestor's name.

Some clans had likely lost their full genealogical records during the long exile.

Location became the next best way to organize who belonged where.

Bethlehem was already known as David's own birthplace generations earlier.

Centuries later it would become known for a far greater birth.

🏘️ Counting shifts from ancestor to town
📜 Some genealogies had been lost
👑 Bethlehem was David's birthplace
📖 The same town later held greater news

## The Men Of Anathoth

Anathoth was the hometown of the prophet Jeremiah.

Jeremiah had warned Judah about this very exile decades before it happened.

People from his own hometown were now among those coming home.

The prophet's words had outlasted the disaster he predicted.

📜 Anathoth was Jeremiah's hometown
🗣️ Jeremiah warned of this exile
🏠 His neighbors were now returning
📖 His words outlasted the disaster

## The Children Of Kirjatharim, Chephirah, And Beeroth

These three towns once belonged to the Gibeonites in the book of Joshua.

The Gibeonites had tricked Israel into a peace treaty instead of facing conquest.

Joshua let them live but assigned them permanent servant labor for Israel's worship.

Generations later their old towns were still standing and still counted among Judah.

🏛️ These towns were once Gibeonite
🤝 Gibeonites tricked Israel into peace
🪵 They were assigned service labor
📖 Their towns still stood generations later

# Ezra 2:27-31
# ⚔️ Old Battlefields, New Names
---
## The Men Of Bethel And Ai

Bethel was where Abraham once built an altar generations before Israel existed as a nation.

Ai was the city Israel failed to conquer on its first attempt under Joshua.

Both places carried centuries of history by the time this list was written.

Now they were simply hometowns of a few hundred ordinary returning families.

🛐 Bethel held Abraham's altar
⚔️ Ai was Joshua's early defeat
🏘️ Both were now small hometowns
📖 History quietly sat inside these names

## The Children Of The Other Elam

This is a second, separate family also named Elam.

Verse seven already listed a different Elam family earlier in this chapter.

The text itself adds the word other to keep the two apart.

Even the scribe writing this list wanted no confusion between them.

🔁 A second Elam family appears here
📖 Verse seven named a different Elam
✍️ The text adds other on purpose
➡️ Even the scribe avoided confusion

# Ezra 2:32-35
# 🏺 A City That Once Fell
---
## The Children Of Jericho

Jericho was the first city Israel conquered after crossing into the promised land.

Its walls had famously fallen after Israel marched around them for seven days.

Centuries later Jericho was simply another hometown sending families back to Judah.

The city built on a miracle was now just a name in a census.

🧱 Jericho's walls once fell by miracle
⚔️ It was Israel's first conquest
🏘️ It became an ordinary hometown
📖 The miracle became a memory

## The Children Of Senaah

Senaah's family numbered three thousand six hundred thirty people.

That makes it the single largest family group in this entire chapter.

No explanation is given for why this one family grew so much larger than the rest.

The list simply records the number and moves on.

🔢 Senaah is the largest group listed
📈 Their number more than tripled most others
❓ No reason is given for the size
📖 The list records without explaining

# Ezra 2:36-39
# 🕊️ The Priests Come Home
---
## The Priests

These four priestly families total four thousand two hundred eighty nine people.

That is about one out of every ten people in the entire returning company.

A functioning temple needed a large working priesthood to run daily sacrifices and duties.

Their large numbers show the priesthood was never in danger of disappearing.

🕊️ Four priestly families total 4,289 people
📊 About one in ten was a priest
🛐 The temple needed many priests
📖 The priesthood came home strong

## The Children Of Jedaiah, Of The House Of Jeshua

Jedaiah's family belonged to the same priestly house as Jeshua.

Jeshua was the high priest who led the whole return back in verse two.

The man leading the return was not set apart from his own people.

He was counted in this very same list.

🕊️ Jedaiah shared Jeshua's priestly house
⚖️ Jeshua led the entire return
👤 The leader was counted too
📖 No one stood above this list

# Ezra 2:40-42
# 🎶 Levites, Singers, And Gatekeepers
---
## The Levites

Only seventy four Levites returned, compared to over four thousand priests.

Levites assisted priests with temple upkeep, teaching, and daily service.

This shortage became a real problem Ezra had to fix on a later trip.

Ezra chapter eight describes him specifically recruiting more Levites before that second journey.

📉 Only 74 Levites made this trip
🧹 Levites assisted priests with temple work
⚠️ This became a real shortage
📖 Ezra later recruited more Levites

## The Singers, The Children Of Asaph

Asaph was one of King David's chief temple musicians generations earlier.

His descendants had kept the family tradition of leading worship through music.

Bringing singers home meant the temple would have organized worship again, not silence.

Music was treated as real temple service, not decoration.

🎶 Asaph led music under King David
👪 His descendants kept the tradition
🛐 Singers restored organized temple worship
📖 Music counted as real service

## The Children Of The Porters

A porter here means a gatekeeper, not someone who carries luggage.

Porters guarded the temple gates and controlled who could enter.

This was a trusted, official position, not simple manual labor.

Even the temple's entrances needed a return of skilled, dedicated people.

🚪 Porter means gatekeeper here
🛡️ Porters guarded who could enter
🎖️ It was a trusted position
📖 Even the gates needed skilled people

# Ezra 2:43-48
# 🎁 The Nethinims Begin
---
## The Nethinims

Nethinim comes from a Hebrew word meaning given ones.

They were temple servants dedicated permanently to assist the Levites with lower duties.

Many scholars believe their earliest roots trace back to the Gibeonites from the book of Joshua.

David later formally organized them into official temple service.

Even the humblest workers in the temple had their own family names preserved.

🎁 Nethinim means given ones
🧹 They assisted Levites with temple duties
📜 Many trace them back to the Gibeonites
📖 Even humble workers were named

# Ezra 2:49-54
# 📋 The Nethinims Continue
---
## The Children Of Neziah, The Children Of Hatipha

This list runs through more than twenty separate Nethinim families by name.

None of them are described with any story or event, only a name.

Being named still meant being remembered and counted as part of God's people.

Status at the bottom of the list did not mean being erased from it.

📋 Twenty plus families are named here
🔇 None get a story, only a name
👥 Naming still meant being remembered
📖 Low status did not mean erasure

# Ezra 2:55-58
# 🛠️ Solomon's Servants Return
---
## The Children Of Solomon's Servants

Generations earlier, King Solomon had put conquered peoples to forced labor for his building projects.

First Kings describes this same workforce building the temple and palace under Solomon.

These families were likely their descendants, still tied to that same kind of service.

Even people descended from forced labor were welcomed home as part of Judah.

🛠️ Solomon once forced conquered peoples to labor
🏛️ They helped build his temple and palace
👪 These families likely descended from them
📖 They were still welcomed home

## All The Nethinims, And The Children Of Solomon's Servants, Were Three Hundred Ninety And Two

This verse combines both of the lowest status groups into one final total.

Three hundred ninety two people sat at the very bottom of this community's social order.

They still made the journey home and still appear by name in scripture.

The return was never limited to the powerful or the well connected.

🧮 Both lowest groups get one shared total
📉 They sat at the bottom socially
🚶 They still made the journey home
📖 The return welcomed more than the powerful

# Ezra 2:59-63
# 🔍 Those Who Could Not Prove Their Line
---
## They Could Not Shew Their Father's House, And Their Seed, Whether They Were Of Israel

Every Israelite family kept records tracing their ancestry back through their father's line.

These particular families no longer had documents to prove they truly belonged to Israel.

Genealogy was not just curiosity, it decided land rights, tribal identity, and temple access.

Losing the paperwork during decades of exile could cost a family its entire identity.

📜 Genealogy proved a family's Israelite line
🏞️ It decided land rights and identity
📄 These families lost their documents
📖 Lost records could cost an identity

## As Polluted, Put From The Priesthood

Polluted here does not mean these men had done anything sinful.

It means they were ceremonially disqualified from unproven priestly ancestry.

The priesthood required certain, provable descent from Aaron himself.

Without proof, even a sincere worshiper could not serve at the altar.

🚫 Polluted here is not about sin
📋 It means ceremonially disqualified
🕊️ Only proven descendants of Aaron could serve
📖 Sincerity could not replace proof

## The Tirshatha

Tirshatha was a Persian title given to the appointed governor of the province.

It functioned much like the word governor does today.

Zerubbabel likely held this title as the region's Persian appointed leader.

A foreign empire's own title was now shaping decisions inside God's temple community.

🏛️ Tirshatha was a Persian governor title
👑 Zerubbabel likely held this title
📜 It worked like the word governor
📖 A foreign title shaped temple decisions

## Till There Stood Up A Priest With Urim And With Thummim

Urim and Thummim were sacred objects kept in the high priest's breastplate.

Priests once used them to seek a clear yes or no answer from God.

By this point in history, no priest alive still had access to them.

The unresolved families would simply have to wait, with no timeline given.

🔮 Urim and Thummim gave yes or no answers
🕊️ Only the high priest used them
❓ No priest still had access
📖 Some answers had to simply wait

# Ezra 2:64-67
# 🐫 The Whole Congregation, Counted
---
## The Whole Congregation Together Was Forty And Two Thousand Three Hundred And Threescore

Adding up every individual family number listed earlier comes to less than this final total.

This gap has puzzled careful readers for a very long time.

Many think some smaller family counts were damaged or lost across centuries of copying.

The stated total, not the individual math, was treated as the official number.

🧮 Individual numbers do not add up exactly
❓ The gap has never been fully solved
📜 Copying errors are the likely cause
📖 The stated total was treated as official

## Their Horses Were Seven Hundred Thirty And Six

Jerusalem sat about nine hundred miles from Babylon by the routes people traveled.

That kind of distance required real transportation, not just willpower.

Horses, mules, camels, and donkeys all carried people, supplies, and the vessels from chapter one.

A journey this size took serious planning, not a spontaneous walk home.

🐫 Camels and mules carried the journey
🗺️ Babylon sat about 900 miles away
🏺 Animals carried the temple vessels too
📖 This return took real planning

# Ezra 2:68-70
# 🕍 Home, And Giving Again
---
## Offered Freely For The House Of God

Freely here means the giving was voluntary, not required by law.

Chapter one already described this same kind of freewill giving before the journey even began.

The pattern continued once the people actually arrived home.

Willing generosity carried this rebuilding project from its very first step to its last.

🎁 Freely means voluntary, not required
🔁 Chapter one already showed this pattern
🏠 It continued after they arrived
📖 Generosity carried the whole project

## Threescore And One Thousand Drams Of Gold

A dram here refers to a daric, a Persian gold coin.

It was named after the Persian king Darius, who standardized its weight.

Sixty one thousand of these coins represented a massive act of giving.

This was Persian currency being poured directly into rebuilding a Jewish temple.

🪙 A dram was a Persian daric coin
👑 It was named after King Darius
💰 Sixty one thousand coins were given
📖 Persian money rebuilt God's temple

## All Israel In Their Cities

This final verse quietly ends the story that chapter one began with a decree.

Every group named across this whole chapter was finally settled somewhere.

Long ago, Joshua had originally divided these same cities among Israel's tribes.

The exile had interrupted that inheritance, and this verse marks its return.

🏘️ Every group finally settled somewhere
📖 Chapter one's decree reaches its ending
🗺️ Joshua once divided these same cities
➡️ Exile paused an inheritance, not ended it
`.trim();

export const EZRA_TWO_PERSONAL_SECTIONS = parseEzraTwoRawNotes(EZRA_TWO_RAW_NOTES);
