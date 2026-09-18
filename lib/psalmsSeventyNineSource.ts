export type PsalmsSeventyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parsePsalmsSeventyNineRawNotes(rawText: string): PsalmsSeventyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: PsalmsSeventyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Psalms\s+79:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Psalms 79 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Psalms\s+79:/i.test(lines[index].trim())) {
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
        !/^#\s+Psalms\s+79:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Psalms 79 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 79,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Psalms 79:${startVerse}` : `Psalms 79:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Psalms 79 sections, received " + sections.length);
  }

  return sections;
}

const PSALMS_SEVENTY_NINE_RAW_NOTES = `# Psalms 79:1-3
# 🏚️ The Temple In Ruins
---
## 🌍 The Heathen Are Come Into Thine Inheritance

"Heathen" here means people outside a covenant relationship with God.

"Inheritance" refers to the nation and land God had claimed as his own.

Many scholars date this psalm to Babylon's destruction of Jerusalem near 586 BC.

An enemy army now stood inside the very land God called his own.

🌍 Heathen means outside God's covenant

🏞️ Inheritance means the land God claimed

⚔️ Babylon likely destroyed Jerusalem near 586 BC

📖 Enemies stood on God's own land

## 🏛️ Thy Holy Temple Have They Defiled

"Defiled" means made unclean, not simply damaged.

This was Solomon's temple, the one place God's presence was said to dwell.

Losing it felt like losing direct access to God himself.

The same verse says Jerusalem itself was left in heaps of rubble.

🏛️ Defiled means made unclean

👤 Solomon built this house for God

💔 Losing it felt like losing God's presence

📖 Jerusalem itself lay in heaps of rubble

## 🦅 Given To Be Meat Unto The Fowls Of The Heaven

A proper burial mattered enormously in this culture, even for enemies.

Leaving bodies exposed for birds and animals to eat counted as a horrifying disgrace.

"Meat" here is an old word for food in general.

This image pictures a total collapse of normal life in the city.

🦅 Birds eating corpses was a disgrace

⚰️ Burial mattered deeply in this culture

🍖 Meat here means food in general

📖 Normal life had completely collapsed

## 🕊️ There Was None To Bury Them

Burying the dead quickly was seen as both duty and basic respect.

This line says plainly that no one remained safe enough to do it.

The destruction had moved past grief into total chaos.

This is the same devastation the whole psalm opens by naming.

🕊️ Burial was both duty and respect

🚫 No one was safe enough to bury them

🌀 Destruction had passed into total chaos

📖 This opens the psalm's whole complaint

# Psalms 79:4-5
# 😢 How Long, O Lord
---
## 😞 A Reproach To Our Neighbours

"Reproach" means public shame that everyone nearby can see.

Neighboring nations watched Israel collapse.

They read that collapse as proof Israel's God had failed.

In the ancient world, a nation's fortune was treated as a report on its god.

This shame played out in front of the whole region.

😞 Reproach means shame everyone can see

👀 Neighbors watched Israel's collapse happen

📊 A nation's fortune reflected on its god

📖 The shame was regional, not private

## ❓ How Long, LORD? Wilt Thou Be Angry For Ever

This is a raw, direct question, not a polished prayer.

"Wilt thou" is an old way of asking "will you," spoken straight to God.

The psalm does not pretend everything is fine.

It keeps grieving honestly instead.

Honest complaint like this counts as real prayer throughout the Bible.

❓ A raw, direct question to God

🗣️ Wilt thou is an old will you

😢 The psalm does not hide its grief

📖 Honest complaint counts as real prayer

## 🔥 Shall Thy Jealousy Burn Like Fire

God's "jealousy" here is not pettiness.

It is zeal for a relationship that belongs only to him.

The same word can describe a husband's rightful protectiveness over a marriage.

Fire pictures something that consumes completely.

The question asks how long that burning anger will last.

🔥 Jealousy means zeal, not pettiness

💍 Like a husband protecting a marriage

🌡️ Fire pictures anger that consumes completely

📖 The question asks how long it lasts

# Psalms 79:6-7
# ⚡ Pour Out Thy Wrath
---
## ⚡ Pour Out Thy Wrath Upon The Heathen That Have Not Known Thee

This is a request for God to judge the nations, not simply feel angry.

"Heathen that have not known thee" points to nations who never followed God's covenant.

The prayer draws a line between judging outsiders and correcting God's own people.

Verses later in the psalm still ask for mercy toward Israel, not this same wrath.

⚡ A request for judgment, not just anger

🌍 Heathen here means nations outside the covenant

⚖️ Outsiders and God's own people get different treatment

📖 Mercy for Israel comes later in the psalm

## 📛 Kingdoms That Have Not Called Upon Thy Name

"Called upon thy name" means entering a real worship relationship with God.

These kingdoms never entered that relationship the way Israel had.

That difference matters for how each group is judged.

Israel's coming correction is discipline, not blind cruelty.

📛 Called upon thy name means real worship

🚪 These kingdoms never entered that relationship

⚖️ The difference shapes how each is judged

📖 Israel's correction is discipline, not cruelty

## 🐺 They Have Devoured Jacob

"Jacob" is another name for the nation of Israel, tracing back to their ancestor.

"Devoured" pictures Israel being consumed the way a predator consumes its prey.

"Laid waste his dwelling place" points to homes and towns, not just the temple.

The damage reached far beyond one building into everyday life across the land.

🐺 Devoured pictures Israel as prey

👤 Jacob is another name for Israel

🏘️ Dwelling place means homes and towns

📖 The damage reached everyday life everywhere

# Psalms 79:8-9
# 🙏 For Thy Name's Sake
---
## 📜 Remember Not Against Us Former Iniquities

"Iniquities" means sins, especially deep or repeated wrongdoing.

The prayer asks God not to hold the nation's past guilt against it now.

This does not deny that real sin caused this disaster.

It asks God's judgment to have a limit instead of lasting forever.

📜 Iniquities means deep, repeated sin

🙏 A request not to hold past guilt

✅ Real sin caused this disaster

📖 The prayer asks judgment to have a limit

## 💧 Let Thy Tender Mercies Speedily Prevent Us

"Prevent" here is an old use of the word meaning to go before, not to stop.

The prayer asks God's mercy to arrive before the disaster gets any worse.

"Speedily" adds urgency, since the nation feels it cannot wait much longer.

"We are brought very low" admits real desperation without pretending strength.

💧 Prevent here means go before, not stop

⏱️ Mercy is asked to arrive quickly

😣 Speedily shows real, urgent desperation

📖 The nation admits it has no strength left

## ✨ Help Us, O God Of Our Salvation

The prayer shifts from confession into a direct request for rescue.

"God of our salvation" names God by the very thing being asked of him.

This title reminds both the psalmist and God of past deliverances.

Naming God this way shows hope.

✨ The prayer shifts toward direct request

🛟 God of our salvation names the request

🕰️ The title recalls past deliverances

📖 Naming God this way shows hope

## 🧼 Purge Away Our Sins, For Thy Name's Sake

"Purge" means to cleanse completely, not just cover something up.

The final appeal is not about the nation deserving rescue.

It rests on protecting God's own reputation among watching nations.

This pattern of appeal appears often across the Old Testament.

🧼 Purge means cleanse completely

🙅 The appeal is not about deserving rescue

🏆 It protects God's own reputation instead

📖 This pattern appears often in the Old Testament

# Psalms 79:10-11
# ⛓️ Where Is Their God
---
## 😏 Wherefore Should The Heathen Say, Where Is Their God?

The heathen's question here is a taunt, not sincere curiosity.

In this culture, a god's power was measured by how well his people fared.

A defeated, humiliated Israel looked to outsiders like proof of a defeated God.

The prayer asks God to answer that taunt in a way everyone can see.

😏 This is a taunt, not sincere doubt

👀 A god's power was judged by his people

💔 Israel's defeat looked like God's defeat

📖 The prayer asks for a visible answer

## ⚖️ By The Revenging Of The Blood Of Thy Servants

This asks God to right a specific wrong, not simply to lash out.

"Blood of thy servants" points back to the people killed in the invasion.

Prayers like this appear elsewhere in the Bible and are called imprecatory prayers.

They hand the desire for justice over to God instead of taking it personally.

⚖️ A request to right a wrong

🩸 Blood of thy servants means those killed

📜 This is called an imprecatory prayer

📖 Justice is handed over to God

## 😩 Let The Sighing Of The Prisoner Come Before Thee

"Sighing" here pictures groaning too heavy and weary for full words.

"Prisoner" likely refers to captives taken away when the city fell.

"Appointed to die" describes people already condemned, waiting for the sentence to happen.

The prayer asks God to notice suffering that has gone completely silent.

😩 Sighing pictures groaning too weary for words

⛓️ Prisoner likely means captives taken in war

💀 Appointed to die means already condemned

📖 The prayer asks God to notice silence

# Psalms 79:12-13
# 📯 We Will Give Thee Thanks
---
## 💯 Render Unto Our Neighbours Sevenfold Into Their Bosom

"Sevenfold" is a way of saying completely and thoroughly, not a literal count of seven.

"Bosom" refers to the fold of a garment used like a pocket to carry things.

"Into their bosom" pictures returning the insult directly into their own hands.

This mirrors the request from verse ten for visible, public justice.

💯 Sevenfold means complete, not literally seven

👘 Bosom means the fold of a garment

🤲 It pictures returning insult to their hands

📖 This echoes the plea from verse ten

## 🐑 We Thy People And Sheep Of Thy Pasture

Calling the nation "sheep of thy pasture" pictures God as a shepherd.

Sheep depend completely on a shepherd for food, direction, and protection.

This same image appears throughout the Psalms to describe God's people.

Even in the middle of lament, the prayer still claims this relationship.

🐑 Sheep pictures dependence on a shepherd

🌾 Pasture means the shepherd's provided land

🤝 The relationship still holds during lament

📖 This image repeats often in the Psalms

## 📯 We Will Shew Forth Thy Praise To All Generations

"Shew" is an old spelling of show, meaning to make plainly known.

The psalm ends with a vow of worship despite an unresolved disaster.

"To all generations" reaches far beyond the psalmist's own lifetime.

Grief and worship stand together in this psalm, not as opposites.

📯 Shew is an old spelling of show

🙌 The psalm ends in a vow of worship

⏳ To all generations reaches far into the future

📖 Grief and worship stand together here`.trim();

export const PSALMS_SEVENTY_NINE_PERSONAL_SECTIONS = parsePsalmsSeventyNineRawNotes(PSALMS_SEVENTY_NINE_RAW_NOTES);
