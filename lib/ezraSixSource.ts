export type EzraSixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseEzraSixRawNotes(rawText: string): EzraSixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: EzraSixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Ezra\s+6:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Ezra 6 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Ezra\s+6:/i.test(lines[index].trim())) {
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
        !/^#\s+Ezra\s+6:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Ezra 6 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 6,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Ezra 6:${startVerse}` : `Ezra 6:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Ezra 6 sections, received " + sections.length);
  }

  return sections;
}

const EZRA_SIX_RAW_NOTES = `# Ezra 6:1-5
# 🔍 The Decree Is Found
---
## 📜 Search Was Made In The House Of The Rolls

The house of the rolls was not a house at all.

It was Persia's royal archive.

Government records were stored there.

Darius ordered every scroll searched for Cyrus's decree.

A king this careful about paperwork was hard to argue against.

📜 House of rolls means the royal archive

🔎 Darius searched for the original decree

👑 Persian kings kept careful records

➡️ Careful records protected the Jews' claim

## 🏔️ In The Palace That Is In The Province Of The Medes

Achmetha is better known by its other name, Ecbatana.

Persian kings used it as a summer capital.

The mountain air there was cooler than Babylon's heat.

This proof turned up in a second city, not just Babylon.

That made the discovery even harder to dispute.

🏔️ Achmetha is another name for Ecbatana

☀️ Persian kings escaped Babylon's heat there

🗺️ The decree turned up in a second city

📖 Stronger proof left no room for denial

## 📍 The Place Where They Offered Sacrifices

This decree required the temple rebuilt on its exact original site.

That location was the same ground Solomon's temple had stood on generations earlier.

Continuity with the past mattered as much as the building itself.

Sacred ground was not just wherever people decided it should be.

📍 The site could not be moved

🏛️ It matched Solomon's original ground

🔗 Continuity mattered as much as the building

📖 Sacred ground carried its own meaning

## 📏 The Height Thereof Threescore Cubits

A cubit measured about eighteen inches, close to the length of a forearm.

Threescore means sixty, so this height reached about ninety feet.

That is more than twice as tall as Solomon's original temple.

Many scholars believe this decree set a maximum allowed size, not an exact blueprint.

Persia likely wanted to control how large the rebuilt temple could become.

📏 A cubit was about eighteen inches

🔢 Threescore cubits means about ninety feet

🏛️ Twice as tall as Solomon's temple

📖 Persia likely capped the temple's size

## 🧱 Three Rows Of Great Stones, And A Row Of New Timber

This construction pattern alternated layers of stone and wood.

Ancient builders used it to make massive walls stronger.

Solomon's own palace used this same method centuries earlier.

The design choice shows careful, expensive construction, not a rushed rebuild.

🧱 Stone and timber layers alternated

🏗️ This method made massive walls stronger

🏰 Solomon's palace used the same design

➡️ The temple was built to last

## 💰 Let The Expenses Be Given Out Of The King's House

Cyrus originally ordered this project funded by Persia's royal treasury.

That funding was not just a suggestion.

A king's decree carried the force of law.

A pagan king's treasury became the unlikely source of the temple's construction costs.

💰 Persia's treasury funded the project

📜 A king's decree carried the force of law

🙏 The poor returned exiles were not burdened

📖 An unlikely source paid for God's house

## 🏺 Be Restored, And Brought Again Unto The Temple

Nebuchadnezzar had taken these vessels when he destroyed the temple decades earlier.

Cyrus had already ordered their return back in Ezra chapter one.

This second decree by Darius simply confirms that same earlier promise.

Every vessel was meant to return to its exact original place.

🏺 Nebuchadnezzar had taken these vessels

🔁 Cyrus already promised their return

✅ Darius confirms that same promise

📖 Every piece belonged back in its place

# Ezra 6:6-12
# 📜 Darius Orders Full Support
---
## 🗺️ Tatnai, Governor Beyond The River

"Beyond the river" was Persia's own name for the province west of the Euphrates.

From the capital's point of view, that whole region sat across the river.

Tatnai governed this province and had questioned the temple project back in chapter five.

Darius now answers him directly, using his own official title.

🗺️ Beyond the river means west of the Euphrates

👤 Tatnai governed that whole province

❓ He had questioned the project earlier

📖 Darius answers him by name

## 👥 The Apharsachites, Which Are Beyond The River

"Apharsachites" likely names a class of Persian officials, not one ethnic group.

The same term already appeared back in Ezra chapter five, raising the same objection.

Naming them specifically shows Darius knew exactly who had opposed the Jews.

This decree answers every official involved, not just the top governor.

👥 Apharsachites likely means Persian officials

🔁 The same term appeared in chapter five

🎯 Darius names every official involved

➡️ No one opposing the project was missed

## 🛑 Let The Work Of This House Of God Alone

This is a direct order to stop interfering completely.

Darius even calls the temple "this house of God," not just a building project.

The elders of the Jews are told to build without any more interference.

A pagan king used respectful language for Israel's God without hesitation.

🛑 Darius orders all interference to stop

🙏 He calls it the house of God

👷 The elders of the Jews may build freely

📖 Respect came from an unexpected source

## 💵 Of The King's Goods, Even Of The Tribute Beyond The River

"Tribute" was tax money collected from the provinces and sent to the king.

Darius redirects some of that tax money straight into funding the temple.

This was full state funding, not a small gift.

Persia's own tax system now helped build a house for Israel's God.

💰 Tribute means tax money sent to the king

🏛️ That money now funded the temple

📈 This was full state funding

📖 Persia's taxes built Israel's God a house

## 🐑 Young Bullocks, And Rams, And Lambs, For The Burnt Offerings

These are the specific animals required for Israel's daily sacrifices.

Darius lists exactly what the priests in Jerusalem said they needed.

Wheat, salt, wine, and oil covered the grain and drink offerings too.

Nothing was left for the Jews to scramble for on their own.

🐑 Bullocks, rams, and lambs were sacrifice animals

🌾 Wheat, wine, oil, and salt were also listed

📋 Priests specified exactly what was needed

➡️ Every requirement was covered in advance

## 🙏 Pray For The Life Of The King, And Of His Sons

Persian kings often supported foreign temples for a practical reason.

They wanted every god's priests praying for their own safety and long reign.

This was not really about believing in Israel's God.

It was a political hedge dressed up as generosity.

🙏 Priests were expected to pray for the king

👑 Persian kings supported many foreign gods this way

🎭 The motive was political, not religious belief

📖 God used a self serving king anyway

## ⚠️ Let Timber Be Pulled Down From His House

Anyone who defied this decree faced a brutal public execution.

A beam pulled from his own house became the instrument of his death.

This punishment was meant to shame the offender using his own property.

Darius was not making an empty threat.

⚠️ Defying the decree meant execution

🏚️ His own house supplied the beam

😨 The punishment was meant to shame him

➡️ This was not an empty threat

## 🗑️ Let His House Be Made A Dunghill For This

A dunghill was a heap of waste and refuse, the opposite of a respectable home.

Turning a man's house into one was total public humiliation.

His family name would be remembered with disgust instead of honor.

Darius attached the harshest penalty he could imagine to this decree.

🗑️ A dunghill means a waste heap

🏠 His house would become a symbol of shame

👎 His name would be remembered in disgrace

📖 The harshest penalty backed this decree

## 🙌 The God That Hath Caused His Name To Dwell There

Darius invokes Israel's own God directly, asking for punishment on future violators.

He calls on a curse from a God he did not personally worship.

This shows how seriously he took his own official decree.

A foreign king asked the true God to guard His own house.

🙏 Darius invokes Israel's God directly

😮 He did not even worship this God

⚖️ He still asked for a curse on violators

📖 A foreign king protected God's own house

## ✍️ I Darius Have Made A Decree

Darius signs the order with his own name, making it official.

"With speed" meant he wanted no more delays after years of stalling.

Years of accusations and legal questions ended with one clear royal command.

The building could now continue without fear of interruption.

✍️ Darius signs the decree personally

⏱️ With speed means no more delay

📜 One command ended years of stalling

➡️ The building could now continue safely

# Ezra 6:13-15
# 🏗️ The Temple Is Finished
---
## 🔄 According To That Which Darius The King Had Sent

The same governor who once questioned the project now obeys it without delay.

Opposition turned into full cooperation once the king's decree arrived.

There is no record of any further complaint after this point.

Authority ended what arguing alone could not.

🔄 Tatnai's opposition became full cooperation

👑 The king's decree settled the matter

🤐 No more complaints appear after this

📖 Authority ended what arguing could not

## 🗣️ They Prospered Through The Prophesying Of Haggai The Prophet And Zechariah

"Prophesying" here means preaching and urging, not only predicting the future.

Haggai and Zechariah had already appeared back in Ezra chapter five encouraging the builders.

Their words kept the workers going despite political threats nearby.

A building project succeeded because preaching kept people motivated.

🗣️ Prophesying means preaching and urging

📖 Haggai and Zechariah appeared in chapter five

💪 Their words kept the builders motivated

➡️ Permission alone does not finish a project

## 👑 According To The Commandment Of Cyrus, And Darius, And Artaxerxes King Of Persia

Three different Persian kings get credit here for one temple.

Artaxerxes reigned after this temple was finished, decades after Darius.

The writer likely looks back across the whole rebuilding era here.

Persian support for Jerusalem's worship continued for decades afterward.

👑 Three kings are named for one project

⏳ Artaxerxes actually reigned after this

📚 The writer looks back across the whole era

📖 Persian support for Jerusalem continued for decades

## 📅 Finished On The Third Day Of The Month Adar

Adar was the last month of the Hebrew calendar, falling around February or March.

Naming the exact day shows how carefully this moment was recorded.

A project delayed for years finally had a precise finish date.

Waiting made this date worth remembering exactly.

📅 Adar was the last Hebrew month

🗓️ The exact day was carefully recorded

⏳ Years of delay ended on this date

➡️ A long wait made the date matter

## 📆 In The Sixth Year Of The Reign Of Darius The King

Many scholars date this completion to about five hundred sixteen years before Christ.

That is about seventy years after Solomon's temple had been destroyed.

Jeremiah had prophesied seventy years of captivity long before any of this happened.

God kept a promise made generations before anyone alive had seen it fulfilled.

📆 This dates to about five sixteen BC

🏛️ About seventy years after the temple fell

🙌 Jeremiah had prophesied that exact number

📖 God's promise outlived the people

# Ezra 6:16-18
# 🎉 The Dedication
---
## 🎉 Kept The Dedication Of This House Of God With Joy

A dedication ceremony formally set the temple apart for God's use.

Priests, Levites, and everyday returned exiles all celebrated together.

Years of setbacks and threats came before this celebration.

Real struggle made the joy feel earned, not routine.

🎉 Dedication formally set the temple apart

👥 Priests, Levites, and the people celebrated together

⏳ Years of hardship came before this joy

📖 Real struggle made the celebration meaningful

## 🐂 An Hundred Bullocks, Two Hundred Rams, Four Hundred Lambs

This was a massive offering compared to the small size of the returned community.

The numbers show real sacrifice and gratitude, not a token gesture.

A struggling, rebuilding people still gave generously at this moment.

Generosity here was about priority, not wealth.

🐂 A hundred bullocks were offered

🐑 Rams and lambs joined the offering too

💝 The offering was generous, not a token

➡️ Priority mattered more than wealth

## 🐐 A Sin Offering For All Israel, Twelve He Goats

Twelve goats represented the twelve original tribes of Israel.

Only a small fraction of those tribes had actually returned from exile.

The offering still stood for the whole nation, not just the returned remnant.

This community saw itself as representing all of Israel.

🐐 Twelve goats represented the twelve tribes

📉 Only a small fraction had actually returned

🇮🇱 The offering stood for the whole nation

📖 This remnant saw itself as all Israel

## 📋 Set The Priests In Their Divisions, And The Levites In Their Courses

"Divisions" and "courses" mean scheduled rotations of assigned duty.

David had originally organized temple service this way generations earlier.

Restoring that system meant more than finishing a building.

It meant restoring the way Israel had worshiped before the exile.

📋 Divisions and courses mean scheduled duty rotations

👑 David first organized worship this way

🔁 The old system was restored, not reinvented

📖 Worship itself was renewed, not just the building

# Ezra 6:19-22
# 🍞 Passover Kept With Joy
---
## 🐑 Kept The Passover Upon The Fourteenth Day Of The First Month

This date followed instructions God gave centuries earlier in the law of Moses.

Passover remembered the night God spared Israel's firstborn sons in Egypt.

Celebrating it weeks after finishing the temple tied this generation back to that first exodus.

The rebuilt nation resumed its ancient calendar exactly where it had left off.

📅 The fourteenth day followed the law of Moses

🐑 Passover remembered Israel's rescue from Egypt

🔗 This tied them back to the first exodus

➡️ The nation resumed its ancient calendar

## 🧼 The Priests And The Levites Were Purified Together

Purification meant a ritual cleansing required before handling anything sacred.

Every priest and Levite completed it together, with no exceptions.

Only after that cleansing could they kill the Passover lambs for everyone else.

Holiness came before service, not the other way around.

🧼 Purification meant ritual cleansing before sacred duty

👥 Every priest and Levite completed it together

🐑 Only then could they prepare the sacrifice

📖 Holiness came before service

## 🌍 All Such As Had Separated Themselves Unto Them From The Filthiness Of The Heathen

This phrase describes non Israelites who abandoned pagan worship to join Israel's God.

"Filthiness" refers to the idol worship common among the surrounding nations.

The Passover meal was not limited only to those born Israelite.

Anyone who genuinely turned to the true God could share in it.

🌍 Some non Israelites joined by leaving paganism

🚫 Filthiness refers to idol worship, not literal dirt

🤝 The meal was not limited by birth

📖 A turned heart mattered more than ancestry

## 🍞 Kept The Feast Of Unleavened Bread Seven Days With Joy

Unleavened bread recalled how Israel left Egypt too quickly for their bread to rise.

Seven days of eating it kept that memory fresh every year.

This particular year carried extra weight after decades of exile and rebuilding.

The joy here was hard won, not automatic.

🍞 Unleavened bread recalled the hurried exodus

📆 Seven days kept the memory alive

⏳ This year followed decades of hardship

➡️ The joy was hard won

## 🏛️ Turned The Heart Of The King Of Assyria Unto Them

By this time, Assyria had not existed as an empire for generations.

The writer still used that old name for the ruling power in that region.

This title now meant Persia's king, not literal Assyria.

God gets the credit for softening this foreign king's heart.

🏛️ Assyria's empire had already fallen long before

👑 The title still referred to Persia's king here

📚 Old regional names sometimes stuck for later powers

📖 God gets credit for softening the king's heart
`.trim();

export const EZRA_SIX_PERSONAL_SECTIONS = parseEzraSixRawNotes(EZRA_SIX_RAW_NOTES);
