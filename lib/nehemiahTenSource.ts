export type NehemiahTenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNehemiahTenRawNotes(rawText: string): NehemiahTenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NehemiahTenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Nehemiah\s+10:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Nehemiah 10 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Nehemiah\s+10:/i.test(lines[index].trim())) {
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
        !/^#\s+Nehemiah\s+10:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Nehemiah 10 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 10,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Nehemiah 10:${startVerse}` : `Nehemiah 10:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 11) {
    throw new Error("Expected 11 Nehemiah 10 sections, received " + sections.length);
  }

  return sections;
}

const NEHEMIAH_TEN_RAW_NOTES = `
# Nehemiah 10:1-8
# 🔏 The Priests Who Sealed
---
## Now Those That Sealed Were, Nehemiah, The Tirshatha, The Son Of Hachaliah, And Zidkijah

Sealed means the people physically signed and stamped a written covenant.

That covenant was announced back in chapter nine, right before this chapter begins.

Tirshatha was the Persian title for the governor over Judah, already used for Nehemiah earlier.

The nation's top civil leader signed first, ahead of every priest and Levite.

🔏 Sealed means officially signed
📜 This covenant was announced in chapter nine
👑 Tirshatha means Persian appointed governor
📖 The leader signed before anyone else

## These Were The Priests

This closing line marks the end of a list of twenty one priestly family heads.

Priests in this period were organized into family divisions, first set up under David.

A signature from one family head represented his whole division, not just himself.

Twenty one names stood in for the entire priesthood serving at the temple.

👤 One name represented a whole family
📜 Priestly families were organized by division
🕎 Twenty one heads covered every priest
📖 Representation still counted as full agreement

## Hattush

Hattush is a name worth pausing on inside this long list.

Ezra chapter eight names a Hattush as a descendant of David through Shechaniah.

Many scholars connect the two names, though the text does not confirm they are the same man.

If they are connected, it means a royal bloodline still served quietly among the priests.

👑 Hattush may trace back to David
📜 Ezra names a Hattush from that line
🤝 A royal name blends into a priest list
📖 Ordinary service can hide extraordinary roots

# Nehemiah 10:9-13
# 🎶 The Levites Who Sealed
---
## Jeshua The Son Of Azaniah, Binnui Of The Sons Of Henadad, Kadmiel

These three led the list of Levite family heads who signed the covenant.

Kadmiel and the sons of Henadad were active Levite families since the return from exile.

That same family already helped lay the temple's foundation, recorded years earlier in Ezra.

Old, trusted families kept showing up at every major moment in the story.

🎶 Three Levite leaders open the list
🏗️ This family helped rebuild the temple
🔁 The same names keep reappearing
📖 Faithfulness showed up again and again

## Their Brethren, Shebaniah, Hodijah, Kelita, Pelaiah, Hanan, Micha, Rehob, Hashabiah

Shebaniah and Hodijah both appear again later in this same short list.

Repeated names across Israelite records rarely signal a scribal mistake.

Families reused a limited pool of names across many generations on purpose.

Two men could easily share the exact same name.

They could still belong to entirely different family branches.

🔁 Some names repeat within this list
👪 Families reused names across generations
🚫 Repetition does not mean an error
📖 Shared names still marked separate men

## Zaccur, Sherebiah, Shebaniah, Hodijah, Bani, Beninu

This closes the Levite portion of the list at seventeen names total.

Seventeen Levites signed compared to twenty one priests named just before them.

Sherebiah already appeared leading the confession prayer back in chapter nine.

The same voices that led worship also put their names behind this promise.

🔢 Seventeen Levites signed in total
⚖️ Slightly fewer than the priestly count
🎤 Sherebiah led worship in chapter nine
📖 Worship leaders backed their words with signatures

# Nehemiah 10:14-19
# 👑 The Chiefs Of The People Begin
---
## The Chief Of The People, Parosh, Pahathmoab, Elam, Zatthu, Bani

This opens a list of ordinary family leaders, not priests or Levites.

These same clan names appear earlier in the returnee census in Ezra chapter two.

Seeing a family name here confirms that clan still existed generations after the exile.

The covenant reached past the temple staff into every household in Jerusalem.

👑 This list names ordinary family leaders
📜 The names match the earlier census
⏳ These clans survived across generations
📖 The covenant reached every household

## Bunni, Azgad, Bebai, Adonijah, Bigvai, Adin

These continue the roll call of lay family heads.

Chapter seven recorded a different count for the Azgad family than Ezra chapter two did.

Numbers could drift slightly between two hand copied records over time.

The family's name still stayed fixed even when a number did not.

📜 More ordinary family names continue
🔢 Azgad's count differed between two records
✍️ Copying by hand allowed small drift
📖 Names outlasted small numeric errors

## Ater, Hizkijah, Azzur

Hizkijah means the LORD strengthens, drawn from the same root as the famous king Hezekiah.

Names like this carried real meaning, not just sound, in ancient Israel.

A struggling, rebuilding community still leaned on names that spoke of God's strength.

A name could quietly preach a sermon every time it was spoken aloud.

💪 Hizkijah means the LORD strengthens
👑 It shares a root with king Hezekiah
🏗️ A rebuilding people needed that strength
📖 Names could preach without a word

# Nehemiah 10:20-27
# 🏘️ The Chiefs Of The People Continue
---
## Hananiah

Hananiah means the LORD is gracious in the original Hebrew.

A guard at one of Jerusalem's gates shared this same name back in chapter seven.

Whether or not it is the very same man, the name fit the moment.

Even amid slow rebuilding, families still named their sons after God's grace.

🔤 Hananiah means the LORD is gracious
🚪 A gate guard shared this name earlier
🙏 The name reflected real hope
📖 Grace shaped even everyday names

## Malluch, Harim, Baanah

This closes a list of forty four named lay leaders in total.

Add the twenty one priests and seventeen Levites already named before this.

Every level of the nation ends up represented here.

Nothing about this covenant was signed anonymously or by proxy.

Clergy and ordinary families alike put a personal name behind the same promise.

🔢 Forty four lay leaders are named
🏛️ Every level of the nation joined
✍️ No one signed anonymously
📖 One promise, every name attached

# Nehemiah 10:28-29
# 🤝 The Whole Nation Enters The Oath
---
## The Porters, The Singers, The Nethinims

Porters were the men who guarded and controlled the temple gates.

Singers were the musicians who led worship during temple services.

Nethinims means given ones, temple workers first assigned to assist the Levites with daily labor.

Naming every worker shows the covenant reached far past the leadership alone.

🚪 Porters guarded the temple gates
🎵 Singers led temple worship
🛠️ Nethinims means given temple workers
📖 Every worker was named and included

## All They That Had Separated Themselves From The People Of The Lands Unto The Law Of God

This describes foreigners who had left other nations' gods to follow the LORD.

Verse thirty later demands separation from marriage with idol worshippers, which sounds similar but is different.

Here the line is about worship, not birth, and it welcomed willing converts in.

Anyone could join God's people by turning to His law, regardless of where they were born.

🌍 These were former worshippers of other gods
🔀 Different from the marriage rule in verse thirty
🚪 Worship, not birth, decided who belonged
📖 Anyone could join by turning to God

## Every One Having Knowledge, And Having Understanding

This detail excludes very young children from the count of who signed.

Only those old enough to genuinely grasp the promise were included here.

The oath was a conscious choice, not an inherited formality forced on the unaware.

Real commitment requires actually understanding what is being agreed to.

🧠 Only those old enough are counted
🚫 Young children are excluded here
✋ This was a conscious choice
📖 Real commitment requires real understanding

## They Clave To Their Brethren, Their Nobles, And Entered Into A Curse, And Into An Oath

Clave means to cling tightly, from the old word cleave.

A curse and an oath together invited God's judgment if the promise was ever broken.

This two part structure made ancient covenants far weightier than a casual promise.

Breaking this vow was never meant to be a small or easy thing.

🤝 Clave means to cling tightly
⚖️ A curse backed up the oath
📜 This was heavier than a casual promise
📖 Breaking it was never meant to be easy

# Nehemiah 10:30
# 💍 No Marriage With The Peoples Of The Land
---
## We Would Not Give Our Daughters Unto The People Of The Land

This repeats the reform Ezra had already pushed in Ezra chapters nine and ten.

Verse twenty eight just showed that willing foreigners could fully join Israel's worship.

The real danger was never ancestry, but marrying into homes that still served other gods.

A spouse from an idol worshipping home could quietly pull a whole family away.

💍 This echoes Ezra's earlier reform
🙅 Willing worshippers were already welcome
⚠️ The danger was idol worship, not birth
📖 A home shapes the family inside it

## Nor Take Their Daughters For Our Sons

The vow protected sons from foreign marriages just as much as daughters.

Either side of a marriage could carry the same spiritual risk.

Naming both directions shows the whole family line was being guarded, not just one gender.

A serious vow like this could not afford to leave one door open.

👪 Sons were guarded just like daughters
🔄 Either side of a marriage carried risk
🏠 The whole family line was protected
📖 A serious vow leaves no open door

# Nehemiah 10:31
# 🛌 Sabbath And The Seventh Year
---
## If The People Of The Land Bring Ware Or Any Victuals On The Sabbath Day To Sell

Ware means general merchandise offered for sale.

Victuals means food and other everyday supplies.

Foreign traders kept setting up market stalls just outside the city walls on the Sabbath.

This exact problem returns later and forces Nehemiah to physically shut the city gates.

🛒 Ware means goods offered for sale
🍞 Victuals means food and daily supplies
🚪 Traders tempted people on the Sabbath
📖 This same problem returns in chapter thirteen

## That We Would Not Buy It Of Them On The Sabbath, Or On The Holy Day

The vow placed responsibility on the buyer, not only on the seller.

Refusing to buy removed any reason for outside traders to keep coming back.

A holy day here means one of Israel's other appointed feast days.

Guarding a boundary sometimes means walking away from a convenient deal.

🙅 Buyers carried responsibility too
🚪 No buyers meant no reason to sell
📅 Holy day means an appointed feast
📖 Guarding worship can cost convenience

## That We Would Leave The Seventh Year

This recalls the sabbatical year law recorded in Exodus and Leviticus.

Every seventh year, farmland was left completely unplanted and unworked.

The land itself received a full year of rest, much like a weekly Sabbath.

Trusting God to provide through a year with no new harvest took real faith.

🌾 This recalls the sabbatical year law
🛌 Land rested completely every seventh year
🙏 Skipping a harvest required real faith
📖 Even the ground kept a Sabbath

## And The Exaction Of Every Debt

Exaction means the forced collection of money that is owed.

This recalls the law in Deuteronomy that canceled debts every seventh year.

This answers directly back to the debt crisis Nehemiah confronted in chapter five.

The people were now promising to actually live out what Nehemiah had demanded there.

💰 Exaction means forced debt collection
📜 This recalls Deuteronomy's debt release law
🔁 It answers the crisis from chapter five
📖 They vowed to live out their own demand

# Nehemiah 10:32-33
# 💰 Funding The House Of God
---
## Also We Made Ordinances For Us, To Charge Ourselves Yearly With The Third Part Of A Shekel

Ordinances here means official rules the people set for themselves.

A shekel was a small unit of silver used as everyday currency.

A third of a shekel was small enough for almost any household to manage.

This turned temple support into a steady yearly duty instead of occasional giving.

📜 Ordinances means self imposed rules
🪙 A shekel was a small silver coin
💵 A third was affordable for most homes
📖 Support became steady, not occasional

## For The Service Of The House Of Our God

This small yearly payment funded the daily running of temple worship.

An earlier law in Exodus had collected a half shekel for a related purpose.

By this later period, the standard amount had shifted to a third of a shekel.

The shared commitment behind the payment mattered more than its exact size.

🏛️ This funded daily temple worship
🔁 An earlier law used a half shekel
📉 The amount shifted over time
📖 Commitment mattered more than the amount

## For The Shewbread, And For The Continual Meat Offering

Shewbread means twelve loaves of bread kept on display inside the temple.

It pictured God's steady provision for all twelve tribes of Israel.

A meat offering in this old English use actually means a grain offering.

None of this ongoing worship happened for free, and the people knew it.

🍞 Shewbread means twelve loaves on display
🕎 It pictured provision for all Israel
🌾 Meat offering here means grain offering
📖 Worship always carried a real cost

## Of The Sabbaths, Of The New Moons, For The Set Feasts

These name Israel's regular worship calendar across the whole year.

A new moon marked the start of each month with its own offering.

Set feasts means the fixed annual festivals such as Passover and Tabernacles.

Funding had to cover worship every week, every month, and every year.

📅 Sabbaths came every single week
🌙 New moons marked each new month
🎉 Set feasts means the yearly festivals
📖 Worship ran on a full time calendar

## And For The Sin Offerings To Make An Atonement For Israel

A sin offering was sacrificed specifically to deal with the guilt of sin.

Atonement means covering that guilt so the relationship with God could be restored.

This particular offering was made for the whole nation, not one single person.

The people's tax paid for Israel's ongoing need for forgiveness, not just ritual upkeep.

🩸 Sin offerings dealt with guilt
🤝 Atonement means restoring the relationship
🇮🇱 Made for the whole nation
📖 Even forgiveness required faithful funding

# Nehemiah 10:34
# 🪵 The Wood Offering By Lot
---
## And We Cast The Lots Among The Priests, The Levites, And The People, For The Wood Offering

Casting lots meant using a marked object to make a fair, random choice.

This decided which families would take turns supplying wood to keep the altar burning.

Priests, Levites, and ordinary people all shared in the very same duty.

No single family was left to carry that entire burden alone.

🎲 Lots meant a fair random choice
🪵 Families took turns supplying wood
🤝 Every group shared the duty
📖 No one family bore it alone

## To Bring It Into The House Of Our God, After The Houses Of Our Fathers, At Times Appointed Year By Year

Houses of our fathers means extended family lines, not single households.

Each family line received a set turn during the year for this duty.

A steady schedule kept the temple's constant sacrificial fire reliably supplied.

Planning this far ahead shows how seriously they treated ongoing worship.

👪 Houses of our fathers means family lines
📆 Each family had a set turn
🔥 Wood kept the sacrifices burning
📖 Real planning backed their commitment

## To Burn Upon The Altar Of The Lord Our God, As It Is Written In The Law

This points back to a command in Leviticus to keep the altar fire always burning.

That fire was never allowed to go out, day or night.

Someone always had to make sure the wood supply never ran dry.

A practical, ordinary promise ended up protecting a sacred command.

🔥 The altar fire never went out
📜 This recalls a command from Leviticus
🌙 Someone tended it day and night
📖 A practical vow protected a sacred command

# Nehemiah 10:35-37
# 🌾 Firstfruits And Firstborn
---
## And To Bring The Firstfruits Of Our Ground, And The Firstfruits Of All Fruit Of All Trees, Year By Year, Unto The House Of The Lord

Firstfruits means the very first portion of a harvest, given before using the rest.

Giving that first share, before even knowing the size of the full harvest, took real trust.

This applied to both field crops and fruit grown on trees.

Every harvest of the year pointed back to God as its true source.

🌾 Firstfruits means the harvest's first share
🙏 Given before the full harvest was known
🍎 It covered both crops and fruit trees
📖 Every harvest pointed back to God

## Also The Firstborn Of Our Sons, And Of Our Cattle, As It Is Written In The Law

This does not describe offering a firstborn son as a sacrifice.

The law in Exodus required a firstborn son to be redeemed with a payment instead.

Firstborn animals were treated differently and were the ones actually offered.

God claimed every firstborn life as a lasting reminder of the exodus rescue.

👶 Sons were redeemed, never sacrificed
🐑 Firstborn animals were actually offered
💰 A payment replaced a son's offering
📖 Every firstborn recalled the exodus

## And The Firstlings Of Our Herds And Of Our Flocks, To Bring To The House Of Our God

A firstling means the first animal born into a herd or flock.

Herds usually meant cattle.

Flocks usually meant sheep and goats.

Giving the very first animal born, not a leftover one, showed real priority.

God came first in the order of what was given, never last.

🐄 Firstling means the first born animal
🐑 Herds and flocks name cattle and sheep
🥇 The first animal was given, not last
📖 God's portion came first, not leftover

## And That We Should Bring The Firstfruits Of Our Dough, And Our Offerings

This names a small portion of bread dough set apart before baking.

Some Jewish households still keep a version of this dough offering today.

Even something as ordinary as daily bread was brought under this vow.

Worship reached all the way into the kitchen, not only the temple courts.

🍞 A portion of dough was set apart
🏠 Some households still keep this today
🥖 Even daily bread fell under the vow
📖 Worship reached into ordinary life

## And The Tithes Of Our Ground Unto The Levites, That The Same Levites Might Have The Tithes In All The Cities Of Our Tillage

A tithe means a tenth portion of what was produced.

Levites received no land of their own when Israel first divided the territory.

This tenth from every farmer became their main support for serving at the temple.

Supporting the Levites was every farmer's shared duty, not a suggestion.

🔟 A tithe means one tenth
🚫 Levites received no land of their own
💵 This tithe was their main support
📖 Supporting them was every farmer's duty

# Nehemiah 10:38-39
# 🏛️ One Promise, Sealed Together
---
## And The Priest The Son Of Aaron Shall Be With The Levites, When The Levites Take Tithes

This set up a system of oversight for handling the tithe.

A priest personally watched as Levites collected the tenth from the people.

Having two parties present guarded against mishandling or dishonest counting.

Even trusted leaders were kept accountable through a second set of eyes.

👀 A priest oversaw the collection
🤝 Two parties checked each other's work
🚫 This guarded against dishonest counting
📖 Even leaders needed accountability

## And The Levites Shall Bring Up The Tithe Of The Tithes Unto The House Of Our God

This describes a tithe taken on top of a tithe.

Levites first received a tenth of the harvest from the people.

They then gave a tenth of that very amount onward to the priests.

Even those who collected support still gave up a share of their own.

🔟 A tithe was taken from a tithe
📥 Levites first received from the people
📤 They passed a share on to priests
📖 Even collectors still gave their own share

## To The Chambers, Into The Treasure House

Chambers means storage rooms built into the temple complex.

The treasure house was a secure room set aside for valuable goods.

Grain, oil, and other offerings needed real, guarded storage space.

A promise this detailed even planned for exactly where things would be kept.

🏛️ Chambers means temple storage rooms
🔒 The treasure house kept goods secure
🌾 Offerings needed real guarded storage
📖 Even storage was planned with care

## We Will Not Forsake The House Of Our God

This single line is what the entire chapter has been building toward.

Every name, every offering, and every rule exists to protect this one thing.

Forsake means to abandon or walk away from something completely.

A chapter full of lists ends on one simple, personal promise.

🏛️ This closes the chapter's whole purpose
📜 Every rule protected temple worship
🚫 Forsake means to abandon completely
📖 Lists end in one personal promise
`.trim();

export const NEHEMIAH_TEN_PERSONAL_SECTIONS = parseNehemiahTenRawNotes(NEHEMIAH_TEN_RAW_NOTES);
