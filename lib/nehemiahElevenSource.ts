export type NehemiahElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahElevenRawNotes(rawText: string): NehemiahElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 11:${startVerse}` : `Nehemiah 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 10) {
    throw new Error("Expected 10 Nehemiah 11 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_ELEVEN_RAW_NOTES = `
# Nehemiah 11:1-3
# 🎲 Chosen And Willing To Fill The Holy City
---
## One Of Ten To Dwell In Jerusalem The Holy City

Lots meant a fair and random way of choosing who had to move.

Jerusalem stood rebuilt behind strong walls but still nearly empty of people.

One family out of every ten was chosen by that method to relocate.

The other nine kept their homes in the surrounding towns of Judah.

A capital city needs residents living inside it, not just walls around it.

🎲 Lots meant a fair random choice
🏙️ Jerusalem needed residents inside it
🔟 One family in ten was chosen
📖 Walls alone do not make a city

## Blessed All The Men That Willingly Offered Themselves

This does not mean every resident of Jerusalem got there by force.

A smaller group volunteered to move without being chosen by lot.

The whole community publicly blessed these men for their willing choice.

Blessed here means the people spoke words of honor and thanks over them.

Willing sacrifice earned open praise that a lottery result never could.

🙋 Some volunteered instead of being chosen
🙏 Blessed means spoken honor and thanks
❤️ Willing sacrifice stood apart from duty
➡️ Choice earned praise that duty did not

## Every One In His Possession In Their Cities

Possession here means land inherited from each family's own ancestors.

Most of Judah never had to move at all.

Only specific groups were drawn from to live inside Jerusalem itself.

Israel, the priests, the Levites, the Nethinims, and Solomon's servants filled that quota.

The city was rebuilt for everyone, but resettled by only a few.

🏡 Possession means inherited family land
🚶 Most of Judah stayed put
🏙️ Only specific groups resettled Jerusalem
📖 Few moved so the city could live

# Nehemiah 11:4-6
# 👤 The Children Of Judah Return
---
## Of The Children Of Perez

Perez was a son of Judah, born generations earlier through Tamar.

That story is recorded back in Genesis chapter thirty eight.

Perez later became an ancestor of Boaz, and eventually of David himself.

Naming this family first quietly ties Jerusalem's new residents back to David's own line.

A rebuilt city started filling up with descendants of its most famous king.

👶 Perez was Judah's son through Tamar
📜 His story appears in Genesis
👑 He became an ancestor of David
📖 David's line helped resettle Jerusalem

## Were Four Hundred Threescore And Eight Valiant Men

Threescore is an old way of saying sixty.

Four hundred threescore and eight adds up to four hundred sixty eight men.

Valiant men means capable, able men fit for real responsibility.

This single family clan supplied hundreds of Jerusalem's new residents by itself.

One family's size shaped how much of the city actually got filled.

🔢 Threescore is an old word for sixty
➕ The total reached four hundred sixty eight
💪 Valiant men means capable and able
📖 One family filled much of the city

# Nehemiah 11:7-9
# 🛡️ The Children Of Benjamin
---
## Gabbai, Sallai, Nine Hundred Twenty And Eight

Nine hundred twenty eight refers to the Benjamin families named just before it.

That total is almost double Judah's earlier count of the Perez family alone.

Benjamin was one of Israel's smaller tribes for much of its history.

Yet here its resettled numbers in Jerusalem actually outran Judah's.

A small tribe still supplied a large share of the new city.

🔢 The Benjamin count reached nine hundred twenty eight
⚖️ That outnumbered Judah's Perez family count
🤏 Benjamin was one of Israel's smaller tribes
➡️ A small tribe filled a large share

## Judah The Son Of Senuah Was Second Over The City

Joel was named overseer, the top civil leader inside Jerusalem.

Judah the son of Senuah served right under him as second in command.

Second over the city means a formal deputy position, not just a helper.

A rebuilt city needed real, structured leadership from its very first residents.

Government inside Jerusalem was organized from the moment people moved in.

👑 Joel served as the top overseer
🥈 Judah served as his deputy
📜 Second over the city was a formal title
📖 Leadership was organized from the start

# Nehemiah 11:10-14
# ⚡ The Priests Who Served
---
## Was The Ruler Of The House Of God

Ruler of the house of God names the chief priest over daily temple operations.

Seraiah held that top position among all the priests listed here.

Someone had to be responsible for how worship actually ran each day.

A large priesthood still needed one clear person at the top.

Even a big rebuilding project depended on a single, named leader.

🕎 Ruler of the house means chief priest
👤 Seraiah held that top position
📋 Someone ran worship day by day
📖 Even a big group needed one leader

## That Did The Work Of The House Were Eight Hundred Twenty And Two

Eight hundred twenty two names the largest single group of priests here.

These men handled the daily labor of running temple worship.

Other, smaller groups named right after them carried different duties.

Priestly work was divided by family, not shared evenly by everyone.

The temple ran on many hands doing many different jobs.

🔢 Eight hundred twenty two did daily temple work
🏗️ This was the largest named group
📂 Duties were divided by family
📖 Many hands kept worship running

## Mighty Men Of Valour

Mighty men of valour usually describes soldiers, not priests.

Here it describes an hundred twenty eight priests instead.

Temple work demanded real strength and stamina.

It took more than only ritual knowledge.

Their overseer, Zabdiel, is even called the son of one of the great men.

Serving at the altar took the same kind of capable men that war did.

⚔️ Mighty men of valour usually means soldiers
🕎 Here it describes temple priests instead
💪 Temple work demanded real strength
📖 Worship took the same strength as war

# Nehemiah 11:15-18
# 🎶 The Levites And Their Duties
---
## Had The Oversight Of The Outward Business Of The House Of God

Outward business means the practical, everyday work of running the temple.

This differs from the inward duties of sacrifice and ritual worship.

Someone still had to manage supplies and everyday repairs.

Shabbethai and Jozabad were given charge over that entire practical side.

Worship needed both sacred ritual and ordinary management to keep running.

🛠️ Outward business means practical daily work
🕯️ It differed from ritual worship duties
📦 Supplies and repairs still needed attention
📖 Worship needed both ritual and management

## Was The Principal To Begin The Thanksgiving In Prayer

Principal here means Mattaniah was the one who led.

He started the songs of thanksgiving each time they gathered.

Mattaniah descended from Asaph, one of David's original choir leaders.

Bakbukiah served as his second in case anything happened to him.

The same worship ministry David started was still alive generations later.

🎶 Principal means Mattaniah led the songs
🎤 He descended from David's singer Asaph
🥈 Bakbukiah served as his second
📖 David's worship ministry lasted generations

# Nehemiah 11:19-21
# 🚪 Porters, The Nethinims, And The Rest Of Israel
---
## That Kept The Gates

Porters were the men responsible for guarding Jerusalem's gates.

An hundred seventy two of them served in that role.

Gates controlled who and what entered the rebuilt city.

This same guard duty caused real trouble again later in chapter thirteen.

A wall only protects a city if someone actually watches its gates.

🚪 Porters guarded Jerusalem's gates
🔢 An hundred seventy two served this role
🛡️ Gates controlled who could enter
➡️ A wall needs a watched gate

## Every One In His Inheritance

This repeats the pattern already set in verse three.

Inheritance means land passed down within a specific family line.

Most Israelites, priests, and Levites stayed on that inherited land.

Only a fixed number were drawn out to resettle Jerusalem itself.

The countryside stayed full.

The capital slowly refilled anyway.

🏡 Inheritance means land passed down
🚶 Most people stayed on that land
🔟 A fixed number resettled the city
📖 The countryside stayed full too

## The Nethinims Dwelt In Ophel

Nethinims means given ones, temple workers first assigned to help the Levites.

Ophel was a specific ridge just below the temple, near the city wall.

This group had a defined neighborhood, not just a scattered assignment.

Even lower ranking temple servants received an organized place to live.

Careful planning reached all the way down to where each group actually lived.

🛠️ Nethinims means given temple workers
🏔️ Ophel was a ridge near the temple
🏘️ This group had its own neighborhood
📖 Planning reached every level of workers

# Nehemiah 11:22-24
# 👑 Overseers Of Worship And The King's Business
---
## The Overseer Also Of The Levites At Jerusalem Was Uzzi

Uzzi's genealogy runs back through a line that includes a Mattaniah and a Micha.

Those same two names appeared earlier leading the thanksgiving singers in this very chapter.

Israelite families often reused a small pool of names across generations.

Whether or not it is the exact same men, the pattern is worth noticing.

The same handful of worship families kept showing up at every level of leadership.

👤 Uzzi oversaw the Levites in Jerusalem
🔁 His line shares names from verse seventeen
👪 Families reused names across generations
📖 Worship families led at every level

## It Was The King's Commandment Concerning Them

The king here was the reigning Persian ruler over the whole empire.

He personally issued an order guaranteeing daily support for the singers.

A foreign king was funding and regulating Israelite temple worship as policy.

This was not just Jewish tradition.

It carried the weight of imperial law.

Even a pagan throne ended up protecting the worship of Israel's God.

👑 A Persian king issued this order
💰 It guaranteed daily support for singers
📜 Foreign law backed Israelite worship
📖 A pagan throne protected true worship

## Was At The King's Hand In All Matters Concerning The People

Pethahiah served as a direct liaison between the Jewish community and the Persian court.

At the king's hand means he had personal, trusted access to the ruler.

Someone needed to represent Israel's interests at the highest level of government.

This position gave ordinary Jewish concerns a real voice in imperial decisions.

Political access mattered just as much as priestly duty in rebuilding the nation.

🤝 Pethahiah linked Israel to the Persian court
👑 He had trusted access to the king
📢 He represented Israel's interests there
📖 Political access helped rebuild the nation

# Nehemiah 11:25-30
# 🏘️ Villages Of Judah
---
## Some Of The Children Of Judah Dwelt At Kirjatharba

Kirjatharba was an older name for the city later called Hebron.

That city holds the burial site of Abraham, Sarah, and other patriarchs.

Judah's families resettled ground that already carried centuries of family history.

This was not empty land.

These families had finally returned to their own ancestral soil.

Rebuilding meant reclaiming the same ground their earliest ancestors had walked.

🏙️ Kirjatharba was the older name for Hebron
⚰️ Abraham and Sarah were buried there
👴 The land carried deep ancestral history
➡️ Rebuilding meant reclaiming ancestral ground

## They Dwelt From Beersheba Unto The Valley Of Hinnom

Beersheba marked the traditional southern edge of Judah's territory.

The valley of Hinnom sat just outside Jerusalem's own walls.

This closing line stretches the resettled towns across that entire distance.

Judah was not confined to Jerusalem alone.

It reoccupied its whole ancient territory instead.

The rebuilding project reached far beyond a single city's walls.

🧭 Beersheba marked Judah's southern edge
🏙️ Hinnom sat just outside Jerusalem
📏 Towns stretched across that whole distance
📖 Rebuilding reached beyond one city

# Nehemiah 11:31-35
# 🏘️ Villages Of Benjamin
---
## From Geba Dwelt At Michmash

Geba and Michmash sat close together just north of Jerusalem.

Michmash was the site of Jonathan's famous surprise raid on the Philistines.

That story is recorded generations earlier in first Samuel chapter fourteen.

Benjamin's families resettled ground tied to one of Israel's boldest military stories.

Old battlefields quietly became ordinary hometowns again.

🗺️ Geba and Michmash sat near Jerusalem
⚔️ Michmash was the site of Jonathan's raid
📜 That story appears in first Samuel
📖 Old battlefields became ordinary hometowns

## And At Lod, And Ono, The Valley Of Craftsmen

Ono already appeared earlier in this same book, back in chapter six.

Enemies once invited Nehemiah to a meeting in that valley, hoping to harm him.

He refused to leave his work and go down to them there.

Now, years later, Israelites are simply living peacefully in that very valley.

A place once tied to a plot against Nehemiah became an ordinary home.

📍 Ono already appeared back in chapter six
⚠️ Enemies once tried to trap Nehemiah there
🙅 He refused to go down to them
📖 A place of danger became a home

# Nehemiah 11:36
# 🤝 Levites Across Judah And Benjamin
---
## Of The Levites Were Divisions In Judah, And In Benjamin

Divisions here means organized groups assigned to specific duties and locations.

Verses one through twenty four focused mainly on Levites serving inside Jerusalem.

This final line reveals they were also stationed across both tribal territories.

Ministry did not stay locked inside the capital's walls alone.

The whole chapter's project depended on people scattered far beyond Jerusalem too.

📂 Divisions means organized assigned groups
🏙️ Most of the chapter focused on Jerusalem
🗺️ Levites also served in both territories
📖 Ministry reached far beyond one city
`.trim();

export const NEHEMIAH_ELEVEN_PERSONAL_SECTIONS = parseNehemiahElevenRawNotes(NEHEMIAH_ELEVEN_RAW_NOTES);
