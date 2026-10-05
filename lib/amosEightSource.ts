export type AmosEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseAmosEightRawNotes(rawText: string): AmosEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: AmosEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Amos\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Amos 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Amos\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Amos\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Amos 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Amos 8:${startVerse}` : `Amos 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Amos 8 sections, received " + sections.length);
  }

  return sections;
}

const AMOS_EIGHT_RAW_NOTES = `# Amos 8:1-3
# 🧺 The Vision Of The Summer Fruit
---
## 👁️ Thus Hath The Lord GOD Shewed Unto Me

Lord GOD combines two Hebrew titles for God in one name.

This same phrase opened three visions already in chapter seven.

This is the fourth and final vision in that sequence.

Each vision has shown Amos something impossible to ignore.

📛 Lord GOD combines two divine titles
🔁 This phrase opened three earlier visions
🔢 This is the fourth vision in Amos
📖 Each vision shows something undeniable

## 🧺 A Basket Of Summer Fruit

"Summer fruit" means fruit picked at the very end of the growing season.

In Hebrew, the word for summer fruit sounds almost the same as the word for the end.

That wordplay is the entire point of this vision.

The basket is not a lesson about food.

It is a sign naming Israel's timeline.

🧺 Summer fruit means end of season fruit
🔤 Sounds like the Hebrew word for end
🎯 The wordplay is the vision's whole point
📖 The basket names Israel's timeline

## ⏳ The End Is Come Upon My People Of Israel

The end here does not mean a minor setback.

It names a final, complete judgment on the whole nation.

This is the most direct statement of doom in the entire book.

Three earlier visions built up to this exact sentence.

God is no longer picturing judgment.

He is naming it outright.

⏳ The end means final, complete judgment
🎯 This targets the whole nation, Israel
📈 Three visions built toward this line
📖 God now names judgment outright

## 🚫 I Will Not Again Pass By Them Any More

This repeats the closing line of the plumbline vision from chapter seven.

Pass by there meant God overlooking Israel's sin.

Repeating that same line here confirms the door is still closed.

The reprieves Amos won by pleading do not return.

🔁 Repeats the plumbline vision's closing line
🙅 Pass by meant overlooking sin
🔒 Confirms that door stays closed
📖 Amos's earlier pleas do not return

## 🎶 The Songs Of The Temple Shall Be Howlings In That Day

Songs of the temple were songs of worship and celebration.

Howlings means loud wailing, the sound of mourning for the dead.

The same room, the same music, turns into a funeral.

Worship does not stop.

Its entire tone reverses completely.

🎶 Songs of the temple meant worship music
😭 Howlings meant loud mourning wails
🔄 The same room turns into a funeral
📖 Worship's tone reverses completely

## 💀 There Shall Be Many Dead Bodies In Every Place

This pictures corpses outside, left unburied, not from a single battlefield.

Every place stresses how widespread this death becomes.

In that culture, leaving a body unburied was a specific mark of disgrace.

Grief here has no room left for ordinary burial customs.

💀 Pictures bodies left unburied widely
🗺️ Every place shows how widespread
⚠️ Leaving bodies unburied was a disgrace
📖 Grief overwhelms normal burial customs

## 🤐 They Shall Cast Them Forth With Silence

Cast them forth means the bodies are simply thrown out, not properly mourned.

Silence here is not peace.

It is the absence of anyone left to grieve.

Normal funerals included loud public mourning.

This scene has neither funeral nor mourners.

🤐 Cast forth means thrown out, unburied
🔇 Silence here is not peace
😢 No mourners are left to grieve
📖 This scene lacks any funeral

# Amos 8:4-6
# 💰 Those That Swallow Up The Needy
---
## 🐍 Swallow Up The Needy

Swallow up pictures something being consumed whole, with nothing left over.

The needy here were people who had already lost almost everything.

These merchants are not simply charging high prices.

They are consuming the last of what the poor still had.

🐍 Swallow up means consumed completely
🙇 The needy already had almost nothing
💰 These are wealthy merchants, not strangers
📖 They consume the poor's last resources

## 📉 To Make The Poor Of The Land To Fail

Fail here means to cease entirely, not simply struggle.

These merchants are not content with the poor staying poor.

Their goal is for the poor to disappear from the land.

Greed here has an actual endpoint in mind.

📉 Fail meant to cease entirely
🎯 Their goal was the poor's disappearance
💔 Greed had a deliberate endpoint
📖 This greed aimed at erasing the poor

## 🌙 When Will The New Moon Be Gone

The new moon marked a monthly festival when ordinary trade stopped.

The sabbath did the same thing every week.

These merchants are asking when the next holy day will end.

They want God's calendar to end fast so profit can resume.

🌙 New moon marked a monthly holy day
🛑 Trade paused on it by law
⏰ Merchants resent waiting it out
📖 They want worship over so profit resumes

## ⚖️ Making The Ephah Small, And The Shekel Great

An ephah was a measure of grain.

A shekel was a unit of silver used for payment.

Shrinking the ephah meant customers received less grain for their money.

Inflating the shekel meant customers paid more silver than they owed.

Both tricks worked the same scale from two different ends.

📏 Ephah measured grain sold to customers
⚖️ Shekel measured silver paid for it
🔽 Sellers shrank the grain measure
📖 Both tricks cheated from opposite ends

## 🎭 Falsifying The Balances By Deceit

Balances were the scales used to weigh out grain and silver.

Falsifying means the scales themselves were rigged to lie.

A buyer trusting the scale had no way to catch the fraud.

The dishonesty was built into the tool, not just the seller.

🎭 Falsifying means the scale was rigged
⚖️ Balances were the tools of trade
🙈 Buyers had no way to detect it
📖 The fraud was built into the tool

## 👞 Buy The Poor For Silver, And The Needy For A Pair Of Shoes

This pictures the poor sold into debt slavery for a small price.

A pair of shoes names an almost worthless amount.

A human life was being priced like cheap, replaceable goods.

Amos made this same accusation back in chapter two.

⛓️ Pictures the poor sold into slavery
👞 A pair of shoes meant a tiny price
💔 A life priced like worthless goods
📖 Amos repeats this charge from chapter two

## 🗑️ Sell The Refuse Of The Wheat

Refuse here means the sweepings and waste left after good grain is sorted.

These merchants sold that waste to the poor as real food.

The poor paid real money for what should have been thrown away.

Every stage of this trade cheated the same people twice.

🗑️ Refuse meant waste swept from grain
💰 Sold to the poor as food
😔 The poor paid for near trash
📖 Every stage of the trade cheated twice

# Amos 8:7-10
# 🌍 The Land Trembles For This
---
## 🙏 Sworn By The Excellency Of Jacob

Normally an oath calls on something greater than the one swearing.

God has nothing greater than himself to swear by.

Excellency of Jacob here means God's own pride in his covenant people.

God is swearing by the very relationship Israel has just betrayed.

🙏 An oath normally calls on something greater
👑 God swears by his own covenant pride
💔 That pride is the relationship Israel betrayed
📖 Israel's own standing becomes God's oath

## 📝 I Will Never Forget Any Of Their Works

Forget here does not mean a memory lapse.

It means God will not let these acts go unanswered.

Their works names the fraud and oppression just described.

Every rigged scale and shrunk measure now stays on record.

📝 Forget here means letting something go
⚖️ God will not let this go
💰 Their works names the fraud just listed
📖 Every dishonest act stays on record

## 🌍 Shall Not The Land Tremble For This

This is phrased as a question with an obvious answer.

Of course it will.

Land trembling pictures an earthquake, a physical shaking of the ground.

Creation itself reacts to this injustice.

The punishment matches the size of the crime.

❓ A question with an obvious answer
🌍 Trembling pictures an earthquake
🌳 Creation itself reacts to this sin
📖 Punishment matches the size of the crime

## 🌊 As By The Flood Of Egypt

The flood of Egypt refers to the Nile River's yearly flooding.

That flood was famous and predictable, rising and falling every year.

Here the land itself rises and falls that same way, uncontrolled.

A normal cycle Egypt depended on becomes a disaster here instead.

🌊 Flood of Egypt means the Nile's yearly flood
🔁 That flood was a predictable, normal cycle
⚠️ Here the same rising becomes disaster
📖 A normal cycle turns destructive here

## ☀️ I Will Cause The Sun To Go Down At Noon

Noon was the brightest point of the whole day.

Darkness falling exactly then was the clearest possible sign.

Many scholars believe this may describe an actual solar eclipse from that era.

Light itself answers to God, not the other way around.

☀️ Noon was the day's brightest point
🌑 Darkness then was the clearest sign
🔬 It may describe a real solar eclipse
📖 Light itself answers to God

## ☁️ I Will Darken The Earth In The Clear Day

Clear day stresses there were no storm clouds to blame.

This darkness has no ordinary explanation.

The verse rules out weather as the cause before anyone can suggest it.

God wants this moment unmistakably traced back to himself.

☁️ Clear day rules out any storm
🌑 This darkness has no natural cause
🙅 Weather could not explain this moment
📖 God wants this traced to him

## 🎉 I Will Turn Your Feasts Into Mourning

Feasts named Israel's regular calendar of worship celebrations.

Mourning is the exact opposite mood and sound.

God does not simply cancel these feast days.

He replaces their entire emotional center instead.

🎉 Feasts named regular worship celebrations
😢 Mourning is the opposite mood
🔄 God does not just cancel these days
📖 He replaces their whole emotional center

## 👶 As The Mourning Of An Only Son

Losing an only son ended a family's name and line completely.

No other grief in that culture compared to that one loss.

This comparison picks the single most painful grief anyone could picture.

The nation's coming grief will feel exactly that total.

👶 An only son's death ended a family line
💔 No grief in that culture compared to it
🎯 This picks the most painful comparison possible
📖 The nation's grief will feel total

# Amos 8:11-12
# 📖 A Famine Of Hearing The Words Of The LORD
---
## 🍞 I Will Send A Famine In The Land

Famine ordinarily means a shortage of food.

This famine works differently from any other in the Bible.

God names exactly what kind of famine is coming before anyone assumes the usual kind.

The next line defines it precisely.

🍞 Famine usually means a food shortage
❓ This famine works differently than usual
🎯 God defines its kind immediately
📖 The next line names it exactly

## 💧 Not A Famine Of Bread, Nor A Thirst For Water

This famine leaves ordinary food and water untouched.

Physical survival is not actually the danger here.

Removing that assumption forces the reader to keep asking what is missing.

The answer comes in the very next phrase.

🍞 Bread and water stay available here
❓ Physical survival is not the danger
🔍 This forces the reader to keep asking
📖 The real famine is named next

## 📖 Of Hearing The Words Of The LORD

This is a famine of revelation, not of grain.

Israel spent years refusing to listen to Amos and the other prophets.

Now God simply stops speaking altogether.

Silence becomes the punishment for a people who never wanted to listen.

🌾 This famine is silence from God
🙉 Israel refused to listen for years
🤐 God now stops speaking entirely
📖 Silence punishes a people unwilling to hear

## 🧭 They Shall Wander From Sea To Sea

This describes desperate searching across huge distances.

Sea to sea and north to east together describe the whole land.

People are not traveling to trade or worship anymore.

They are searching for a word from God they cannot find.

🧭 Describes a desperate, wide search
🗺️ Covers the whole span of the land
🙏 They search for God's word, not trade
📖 They cannot find it anywhere

## 🏃 Run To And Fro To Seek The Word Of The LORD

Run to and fro pictures frantic movement without any clear direction.

Seek here means actively searching, not casually wondering.

The failure described here is total.

Not a single person finds what they are looking for.

Wanting God's word back does not guarantee its return.

🏃 Run to and fro means frantic searching
🔍 Seek meant active searching, not wondering
🚫 Not a single person finds it
📖 Wanting it back does not return it

# Amos 8:13-14
# ⚰️ They Shall Fall, And Never Rise Up Again
---
## 💪 The Fair Virgins And Young Men Shall Faint For Thirst

Fair virgins and young men name the strongest people in the population.

Thirst here is the same ordinary word for physical thirst.

If the strongest cannot survive this, no one else can either.

This famine of God's word reaches even the healthiest people.

💪 These were the strongest in the nation
💧 Thirst is physical, not only spiritual
⚠️ If they fail, everyone fails
📖 This famine reaches the entire nation

## 🙏 They That Swear By The Sin Of Samaria

Swear here means making a vow or oath in someone's name.

Sin of Samaria likely names an idol worshipped in Israel's capital.

Swearing by it means treating a false god as reliable enough to vow by.

Loyalty that belongs to the LORD has shifted to an idol instead.

🙏 Swear means vowing in someone's name
🗿 Sin of Samaria likely names an idol
🔄 Loyalty shifted from the LORD to it
📖 Worship moved to a false god

## 📍 Thy God, O Dan, Liveth

Dan was a northern city where Israel set up its own unauthorized worship site.

Liveth echoes the common oath "as the LORD liveth," now aimed at an idol.

Borrowing God's own oath formula for a false god is not a small misstep.

It copies the LORD's own language onto something that cannot act at all.

📍 Dan held an unauthorized worship site
🗣️ Liveth copies the LORD's own oath
🙇 It is aimed at an idol instead
📖 God's own language used for nothing

## 🏜️ The Manner Of Beersheba Liveth

Beersheba sat at the far southern edge of Israel's territory.

Pairing Dan and Beersheba names worship gone wrong across the whole land.

Manner here likely points to a local ritual practice, not an idol's name.

False worship had spread the entire length of the nation.

🏜️ Beersheba sat at the southern edge
🗺️ Dan and Beersheba span the whole land
🔁 Manner points to a local ritual
📖 False worship spread end to end

## ⚰️ They Shall Fall, And Never Rise Up Again

Fall here means a final collapse, not a stumble someone recovers from.

Never rise up again removes any hope of a future comeback.

This line closes the entire chapter and this section of the book.

The basket of summer fruit from the opening vision reaches its full meaning.

⚰️ Fall here means final collapse
🚫 Never rise removes any comeback
🔚 This line closes the whole chapter
📖 The opening vision reaches its full meaning
`.trim();

export const AMOS_EIGHT_PERSONAL_SECTIONS = parseAmosEightRawNotes(AMOS_EIGHT_RAW_NOTES);
