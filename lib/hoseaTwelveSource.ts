export type HoseaTwelvePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseHoseaTwelveRawNotes(rawText: string): HoseaTwelvePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: HoseaTwelvePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Hosea\s+12:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Hosea 12 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Hosea\s+12:/i.test(lines[index].trim())) {
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
        !/^#\s+Hosea\s+12:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Hosea 12 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 12,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Hosea 12:${startVerse}` : `Hosea 12:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Hosea 12 sections, received " + sections.length);
  }

  return sections;
}

const HOSEA_TWELVE_RAW_NOTES = `# Hosea 12:1-2
# 🌬️ Ephraim Feedeth On Wind
---
## 🌬️ Ephraim Feedeth On Wind

"Feedeth on wind" means chasing something that can never truly satisfy.

Wind cannot be caught, held, or eaten, no matter how hard someone tries.

Ephraim here stands for the whole northern kingdom, not one single tribe.

Chasing something empty had become this nation's normal way of life.

A nation can stay busy and still starve, if what it chases is nothing.

🌬️ Feeds on wind means chasing emptiness
🏔️ Ephraim stands for the whole northern kingdom
🔁 Chasing emptiness became their normal way
📖 Busy chasing can still mean starving

## 💨 And Followeth After The East Wind

The east wind in this region blew hot, dry, and often destructive.

It rolled in from the desert and scorched crops instead of watering them.

Chasing that wind instead of rain meant choosing harm over real help.

Ephraim's foreign alliances worked the same way, promising relief and delivering ruin.

💨 East wind blew hot and dry
🌾 It scorched crops instead of feeding them
🤝 Foreign alliances promised help, brought ruin
📖 What you chase decides what you get

## 🤥 He Daily Increaseth Lies And Desolation

This is not one lie told once and then forgotten.

Lying had become Ephraim's daily habit, repeated and deepening over time.

Desolation names the real cost, since lies eventually leave a nation empty.

A habit repeated daily is no longer a mistake, it is a direction.

🤥 Daily lies became a settled habit
📉 Desolation is the real cost here
🧭 A habit repeated is a direction
📖 Daily lying was heading toward empty

## 🤝 They Do Make A Covenant With The Assyrians

Ephraim had been striking political deals with Assyria for safety.

A covenant like this traded trust in God for trust in a foreign king.

Assyria would later become the very empire that conquered this kingdom.

The ally they paid for protection became their eventual destroyer.

🤝 Covenant means a political safety deal
👑 Trust shifted from God to a king
⚔️ Assyria later conquered this same kingdom
📖 Their protector became their destroyer

## 🫒 And Oil Is Carried Into Egypt

Oil here means olive oil, one of Israel's most valuable exports.

Sending it to Egypt was another attempt to buy favor and protection.

Ephraim is shown playing both sides, Assyria and Egypt, at the same time.

Leaning on two empires instead of one God split their loyalty in half.

🫒 Oil means valuable olive oil here
🎁 It was sent to buy favor
⚖️ Ephraim played both Assyria and Egypt
📖 Splitting loyalty in half trusted neither

## ⚖️ The LORD Hath Also A Controversy With Judah

Controversy here means a formal legal case, not a casual disagreement.

Most of this chapter addresses Israel in the north.

This line widens the case to Judah in the south as well.

Nobody in either kingdom stood outside God's charge.

⚖️ Controversy means a formal legal case
🧭 Most of the chapter targets Israel
🏛️ This line widens it to Judah
📖 No kingdom stood outside the charge

## 👣 According To His Ways, According To His Doings Will He Recompense Him

Recompense means paying back exactly what is deserved.

Jacob here stands for the nation, the same way Ephraim often does.

The repeated phrase, ways and doings, points at actions, not intentions.

Judgment here is matched directly to what was actually done.

👣 Recompense means paying back what is owed
🪞 Jacob here stands for the whole nation
🎯 Ways and doings means actions, not intent
📖 Judgment matched exactly what was done

# Hosea 12:3-5
# 🤼 He Took His Brother By The Heel
---
## 👶 He Took His Brother By The Heel In The Womb

This looks back to Jacob's birth, told in Genesis twenty five.

Jacob and Esau struggled against each other even before being born.

Grabbing the heel pictures Jacob reaching for the place of the firstborn.

That early reach set the tone for his whole early life.

👶 Looks back to Jacob's birth story
🤼 Jacob and Esau struggled before birth
🦶 The heel pictured reaching for firstborn rights
📖 That early reach shaped his whole life

## 💪 And By His Strength He Had Power With God

This does not mean Jacob overpowered God through his own might.

It points instead to the wrestling match told later in Genesis thirty two.

Jacob held on through the night instead of letting go.

His strength here was persistence, not physical dominance.

💪 Not physical strength overpowering God
🌙 Points to the wrestling match later
🤲 Jacob held on through the night
📖 His strength was persistence, not force

## 😢 He Wept, And Made Supplication Unto Him

Supplication means an urgent, humble request, not a casual ask.

Genesis records Jacob demanding a blessing, but never mentions him weeping.

Hosea adds this detail, showing the depth behind that demand.

Even a strong grip can come from a desperate heart.

😢 Supplication means an urgent humble request
📜 Genesis itself does not mention weeping
➕ Hosea adds this emotional detail here
📖 A strong grip hid a desperate heart

## 🏠 He Found Him In Bethel, And There He Spake With Us

Bethel was where Jacob later met God again, in Genesis thirty five.

The word us switches suddenly from Jacob alone to the whole nation.

Hosea ties every reader back to that same promise given at Bethel.

What happened to one man became the story of his whole people.

🏠 Bethel was a second meeting place
🔀 Us shifts from Jacob to the nation
🔗 Hosea ties readers to Bethel's promise
📖 One man's story became the nation's

## 👑 Even The LORD God Of Hosts, The LORD Is His Memorial

LORD of hosts names God as commander over every power in heaven.

Memorial here means the name by which God wants to be remembered.

Hosea is naming exactly who Jacob actually wrestled and pleaded with.

This is not a vague spiritual force, it is the one true God.

👑 LORD of hosts means commander of heaven
🏷️ Memorial means the name God is remembered by
🎯 Hosea names exactly who Jacob met
📖 This was the one true God

# Hosea 12:6-8
# 🔄 Turn Thou To Thy God
---
## 🔄 Therefore Turn Thou To Thy God

Therefore ties this command directly to Jacob's story just told.

The God who wrestled with Jacob is the same God calling Ephraim now.

Turn here means a real change of direction, not just a feeling.

The invitation to return was still open, even this late.

🔄 Therefore ties this to Jacob's story
🤝 Same God who wrestled calls Ephraim
🧭 Turn means a real change of direction
📖 The invitation to return stayed open

## ⚖️ Keep Mercy And Judgment, And Wait On Thy God Continually

Mercy and judgment together describe treating people with both kindness and fairness.

Waiting continually means a steady trust, not a one time effort.

This pairs an inward change with ongoing daily patience.

Real repentance was never meant to be a single moment.

⚖️ Mercy and judgment means kindness with fairness
⏳ Continually means steady, not one time
🔁 Inward change paired with daily patience
📖 Repentance was never just one moment

## 💰 He Is A Merchant, The Balances Of Deceit Are In His Hand

The Hebrew word translated merchant here is the same word for Canaan.

Many scholars believe this plays on Canaanite traders known for dishonest scales.

Balances of deceit means weighing scales secretly rigged to cheat a buyer.

Ephraim had picked up the same dishonest habits as the nations around it.

💰 Merchant here echoes the word Canaan
⚖️ Balances of deceit means rigged scales
🤝 Ephraim copied the nations around it
📖 Dishonest habits replaced honest dealing

## 😈 He Loveth To Oppress

Loveth here is not a small detail, it names real affection for harm.

Oppression had stopped feeling wrong and started feeling normal.

A habit that was once resisted can eventually become something enjoyed.

That shift makes this sin far harder to turn away from.

😈 Loveth means real affection for harm
🔁 Oppression had become normal, not resisted
📉 Enjoyed sin is harder to leave
📖 Comfort with wrong deepens the problem

## 💵 Yet I Am Become Rich, I Have Found Me Out Substance

Ephraim reads his own wealth as proof that nothing is actually wrong.

Substance here means real, lasting property, not just spare cash.

Riches gained through deceit do not become innocent just by growing large.

Wealth was never the same thing as being right with God.

💵 Ephraim treats wealth as proof of innocence
🏦 Substance means solid lasting property
🚫 Large riches do not erase deceit
📖 Wealth was never proof of righteousness

## 🙅 In All My Labours They Shall Find None Iniquity In Me That Were Sin

Ephraim claims a clean record after a lifetime of dishonest dealing.

This is self deception, not an honest defense before God.

The merchant language from two verses earlier already disproved this claim.

Denying a sin never actually erases it.

🙅 Ephraim claims an entirely clean record
🪞 This is self deception, not defense
⚖️ Earlier verses already disproved the claim
📖 Denial never actually erases guilt

# Hosea 12:9-11
# ⛺ I Am The LORD Thy God
---
## 🇪🇬 I That Am The LORD Thy God From The Land Of Egypt

God again names the exodus as proof of who He has always been.

This same claim already opened chapter eleven and chapter two before it.

Ephraim's current wealth did not come from nowhere, it came from this God.

The same rescuer from Egypt is the one being ignored now.

🇪🇬 God again points back to the exodus
🔁 This same claim repeats across the book
💰 Current wealth still traces back to God
📖 The rescuer is the one being ignored

## ⛺ Will Yet Make Thee To Dwell In Tabernacles, As In The Days Of The Solemn Feast

Tabernacles here means simple temporary tents, not permanent houses.

The solemn feast points to the Feast of Tabernacles, remembering the wilderness years.

God is picturing a return to that same tent dwelling season.

Comfortable homes built on dishonest wealth were about to be stripped away.

⛺ Tabernacles means simple temporary tents
📅 Solemn feast recalls the wilderness years
🔁 God pictures a return to tent life
📖 Dishonest comfort was about to be stripped

## 🗣️ I Have Also Spoken By The Prophets, And I Have Multiplied Visions

God did not stay silent while Ephraim drifted into dishonesty.

Multiplied visions means sending warning after warning, not just one.

Similitudes means comparisons and parables used to make a point land clearly.

Every available method had already been used to reach this people.

🗣️ God did not stay silent here
🔁 Multiplied means warning after warning sent
🪞 Similitudes means comparisons used to teach
📖 Every method had already been tried

## ❓ Is There Iniquity In Gilead

This question already carries its own answer, which is yes.

Gilead was already accused of the same guilt back in chapter six.

Surely they are vanity means that guilt is hollow and worthless, not strength.

A place meant for healing had become known instead for guilt.

❓ The question already carries its answer
📜 Gilead was accused back in chapter six
🕳️ Vanity means hollow and worthless, not strength
📖 A place for healing became known for guilt

## 🐂 They Sacrifice Bullocks In Gilgal

Gilgal was where Israel first camped after crossing into the promised land.

That same site later became a center for worship God never approved.

Hosea already condemned worship at Gilgal earlier in this book as well.

A place that once marked a new beginning became a symbol of failure.

🐂 Gilgal was Israel's first camp inside Canaan
🔁 It became a site of false worship
📜 Hosea condemned Gilgal earlier in this book
📖 A fresh start became a symbol of failure

## 🪨 Yea, Their Altars Are As Heaps In The Furrows Of The Fields

A furrow is the long groove a plow cuts into a field.

Farmers normally piled loose stones at the edge of a furrow to clear it.

Hosea compares Ephraim's altars to that same kind of discarded stone pile.

Worship had multiplied until it looked like clutter instead of devotion.

🪨 A furrow is a plowed groove
🧱 Farmers piled stones there to clear them
🔁 Altars are compared to that same pile
📖 Worship became clutter, not real devotion

# Hosea 12:12-14
# 🏃 Jacob Fled Into Syria
---
## 🏃 And Jacob Fled Into The Country Of Syria

This looks back again to Jacob running from his brother Esau.

Syria here names the region around Laban's home, also called Padan Aram.

That same flight is already told in full back in Genesis twenty seven.

Hosea keeps circling back to Jacob as the pattern for the whole nation.

🏃 Recalls Jacob fleeing from his brother
🗺️ Syria names the region around Laban's home
🔁 Already told fully back in Genesis
📖 Jacob's pattern stands for the whole nation

## 👰 And Israel Served For A Wife, And For A Wife He Kept Sheep

Israel here is simply another name for Jacob himself.

This recalls the fourteen years Jacob worked for Rachel and Leah.

Genesis thirty one already told that whole story in full detail.

A man once fled empty handed and came back having earned everything honestly.

👰 Israel here is another name for Jacob
📆 Recalls his fourteen years of labor
📜 Genesis already told this story fully
📖 He earned his way back honestly

## 📜 And By A Prophet The LORD Brought Israel Out Of Egypt

The prophet named here is Moses, though Hosea does not say his name.

This moves from Jacob's personal story to the whole nation's larger rescue.

The same pattern of patient care now spans two very different rescues.

God used an ordinary man both times to carry out an extraordinary work.

📜 The unnamed prophet here is Moses
🔀 This shifts from Jacob to the nation
🔁 The same patient care spans two rescues
📖 God used ordinary men for extraordinary work

## 🛡️ And By A Prophet Was He Preserved

Preserved here means kept safe through real danger, not just guided.

Moses led Israel safely through forty hard years in the wilderness.

The same prophetic office that rescued them also kept them alive afterward.

Rescue and ongoing protection came through the very same means.

🛡️ Preserved means kept safe through danger
🏜️ Moses led them through the wilderness
🔗 Rescue and protection shared the same source
📖 God's care did not end at rescue

## 😠 Ephraim Provoked Him To Anger Most Bitterly

Most bitterly shows this anger was not a small or passing irritation.

Ephraim had already been shown mercy, patience, and warning throughout this chapter.

Provoking God this deeply took real, repeated effort over a long time.

This was not an accident, it was the result of a settled choice.

😠 Most bitterly means deep, real anger
🔁 This followed mercy and many warnings
⏳ Provoking this deeply took repeated effort
📖 A settled choice, not an accident

## 🩸 Therefore Shall He Leave His Blood Upon Him, And His Reproach Shall His LORD Return Unto Him

Leave his blood upon him means Ephraim will bear the weight of his own guilt.

Reproach means the shame and disgrace that comes from that guilt.

Return unto him means that same shame will land back on the one who earned it.

The chapter closes with consequences matched exactly to the choices already made.

🩸 Blood upon him means owning the guilt
😳 Reproach means shame earned by sin
🔁 Return means that shame comes back
📖 Consequences matched the choices made
`.trim();

export const HOSEA_TWELVE_PERSONAL_SECTIONS = parseHoseaTwelveRawNotes(HOSEA_TWELVE_RAW_NOTES);
