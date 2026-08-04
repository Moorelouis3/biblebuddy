export type NumbersEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseNumbersEightRawNotes(rawText: string): NumbersEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: NumbersEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Numbers\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Numbers 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Numbers\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Numbers\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Numbers 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Numbers 8:${startVerse}` : `Numbers 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Numbers 8 sections, received " + sections.length);
  }

  return sections;
}

const NUMBERS_EIGHT_RAW_NOTES = `# Numbers 8:1-4
# 🕯️ Aaron Lights The Golden Lamps
---
## 🕯️ When Thou Lightest The Lamps

"Lightest" is an old word for "light" or "kindle."

This was Aaron's own daily task.

Exodus 27 already set this rule for every evening.

The flame was never left to just burn out.

Faithfulness here meant one small task, done night after night.

🕯️ Lightest means to light or kindle

📖 Exodus 27 set this evening rule

🌙 The flame could never burn out

➡️ Faithfulness meant nightly, small duty

---
## 🔥 The Seven Lamps Shall Give Light Over Against The Candlestick

"Over against" is an old way of saying facing or opposite.

All seven lamps aimed inward, toward the center shaft.

The Holy Place had no windows at all.

This candlestick was its only source of light.

Together, all seven lamps made one single light for the room.

🔥 Over against means facing or opposite

🌑 The Holy Place had no windows

💡 This candlestick was the room's only light

📖 Together, seven lamps made one light

---
## 🙏 Aaron Did So

Aaron obeyed this instruction exactly as given.

The text does not record a single question or complaint.

This same quiet obedience appears again and again in this book.

Small, unnoticed tasks mattered just as much as large ones.

🙏 Aaron obeyed exactly as commanded

❓ No question or complaint recorded

🔁 This same pattern repeats through the book

📖 Small tasks mattered as much as large

---
## 🔨 Of Beaten Gold, Unto The Shaft Thereof

"Beaten work" means hammered out of one solid block of gold.

It was not cast in a mold or built from separate pieces.

A craftsman shaped the whole thing by hand, blow after blow.

That method made the candlestick far more costly to produce.

🔨 Beaten work means hammered from one block

🚫 Not cast, not built from parts

✋ Shaped entirely by hand

📖 That method cost far more to make

---
## 🌸 Unto The Flowers Thereof

The lampstand was decorated with cups shaped like flowers.

Exodus 25 describes them as almond blossoms specifically.

Each branch carried its own set of these carved blossoms.

The design turned a working lamp into a piece of art.

🌸 Flowers means carved almond blossom cups

🌿 Each branch had its own blossoms

✨ The design turned a lamp into art

📖 Exodus 25 first describes this design

---
## ⛰️ According Unto The Pattern Which The Lord Had Shewed Moses

"Shewed" is an old spelling of "showed."

God had already revealed this exact design, back on the mountain.

Exodus 25 records that first meeting in detail.

Moses was not free to improvise the design himself.

Every measurement here simply confirms a plan already given.

👁️ Shewed is an old spelling of showed

⛰️ God revealed the design on the mountain

📏 Moses could not improvise the plan

📖 This confirms the pattern from Exodus 25

# Numbers 8:5-7
# 🚿 Cleanse The Levites
---
## 👥 Take The Levites From Among The Children Of Israel

The Levites were being pulled out from the rest of Israel.

This tribe had already sided with Moses during the golden calf crisis.

Exodus 32 records them standing with God when the nation rebelled.

That loyalty is part of why this tribe now serves God directly.

👥 Levites set apart from the other tribes

🐂 They sided with Moses at the golden calf

🔑 That loyalty shaped their new role

📖 Exodus 32 records their story

---
## 🧼 Cleanse Them

"Cleanse" here does not just mean getting physically clean.

It means a formal, ceremonial washing that prepares someone for holy work.

A person could be perfectly clean and still not be ceremonially ready.

The next verse spells out exactly what this cleansing involved.

🧼 Cleanse means ceremonial readiness, not just clean

🙌 More than ordinary physical washing

🔑 Prepares someone for holy work

➡️ The next verse explains the steps

---
## 💧 Sprinkle Water Of Purifying Upon Them

This water was used for a formal, ceremonial cleansing.

Numbers 19 later describes a specific mixture used for this purpose.

This text does not say whether it is that same water.

Either way, the sprinkling made it official, not private.

💧 Purifying water marked ceremonial cleansing

❓ This text does not confirm a match

🔑 The sprinkling made it official, not private

📖 Numbers 19 describes a similar mixture later

---
## 🪒 Let Them Shave All Their Flesh

This meant shaving the entire body, not just the head.

The same command appears for a cleansed leper in Leviticus 14.

It also appears for a finished Nazirite vow in Numbers 6.

In each case, removing all the hair marked a total fresh start.

🪒 Shave all flesh means the whole body

🧴 Leviticus 14 uses this for lepers

🧵 Numbers 6 uses this for finished vows

📖 It marked a complete fresh start

---
## 👕 Let Them Wash Their Clothes, And So Make Themselves Clean

Washing clothes came right alongside washing the body.

Nothing about this process happened in secret.

Every step could be seen and confirmed by others.

This left no doubt that the Levites were truly ready.

👕 Clothes washed alongside the body

👀 Nothing happened in secret

✅ Every step could be confirmed

📖 No doubt was left about readiness

# Numbers 8:8-14
# 🐂 Israel Offers Up The Levites
---
## 🌾 A Young Bullock With His Meat Offering

In the King James Bible, "meat offering" is an old term for a grain offering.

It has nothing to do with meat or flesh at all.

It was made from fine flour mixed with oil, not animal meat.

Grain offerings almost always came paired with an animal sacrifice.

🌾 Meat offering means a grain offering

🚫 No meat or flesh was involved

🫒 Made from fine flour and oil

📖 Usually paired with an animal offering

---
## 🩸 Another Young Bullock Shalt Thou Take For A Sin Offering

A sin offering covered guilt from unintentional wrongdoing.

Leviticus 4 first lays out this category of offering.

Even the Levites, soon to serve God directly, needed this first.

Holiness of the coming role never skipped this step.

🩸 Sin offering covers unintentional guilt

🙏 Even the Levites needed it first

🔑 No one skipped this step, ever

📖 Leviticus 4 first explains this offering

---
## 🚪 Bring The Levites Before The Tabernacle Of The Congregation

This placed the Levites at the tabernacle's outer courtyard entrance.

That entrance was where Israel's sacrifices normally took place.

The ceremony was not performed off to the side.

It happened where the whole camp already gathered.

🚪 Brought to the courtyard entrance

🔥 The same place sacrifices happened

👀 Not held off to the side

📖 Held where the whole camp gathered

---
## 📣 Gather The Whole Assembly Of The Children Of Israel Together

Every Israelite, not just the leaders, was called to witness this.

This was a national event, not a small private ritual.

The whole nation needed to see the Levites set apart.

That way, no one could later question whether this was official.

📣 The whole nation was called together

🚫 Not a small, private ritual

👥 Everyone witnessed the Levites set apart

📖 This made the service publicly official

---
## 🤲 The Children Of Israel Shall Put Their Hands Upon The Levites

Laying on hands was a way of identifying with someone.

Here, the whole nation identified the Levites as standing in for them.

This same act returns later, when the Levites lay hands on the bullocks.

The Levites had just become Israel's representatives before God.

🤲 Laying on hands means identifying with someone

👥 Israel identified the Levites as stand ins

🔁 The same act repeats later in this chapter

📖 The Levites represented the whole nation

---
## 🎁 Aaron Shall Offer The Levites Before The Lord For An Offering

This was not an animal sacrifice.

The Levites themselves were presented to God like an offering.

The word pictures a formal, symbolic gift of the men themselves.

Their whole purpose was now the service of the Lord.

🎁 The Levites themselves were the offering

🚫 Not an animal sacrifice this time

🙌 A formal, symbolic gift of the men

📖 Their purpose was now the Lord's service

---
## 🐂 The Levites Shall Lay Their Hands Upon The Heads Of The Bullocks

Now the Levites do what Israel just did to them.

They pass the same identifying act on to the two bullocks.

This transferred the ceremony's meaning onto the animals about to be offered.

The Levites were both receivers and givers in this one ceremony.

🐂 The Levites now identify with the bullocks

🔁 Mirrors the act just done to them

🔑 It transferred meaning onto the animals

📖 They were both receivers and givers

---
## 🔥 Offer The One For A Sin Offering, And The Other For A Burnt Offering

A sin offering dealt with guilt that needed to be covered.

A burnt offering was completely consumed, with nothing kept back.

Together, the two animals covered both forgiveness and total dedication.

This same paired pattern appears often in Israel's sacrificial law.

🩸 Sin offering dealt with covering guilt

🔥 Burnt offering was fully consumed

🤝 Together they covered forgiveness and dedication

📖 This pairing repeats often in the law

---
## 🔑 To Make An Atonement For The Levites

Atonement means guilt is covered so a person can stand before God.

This is striking, since the Levites were about to serve God directly.

Even they were not exempt from needing to be covered first.

Holiness of position never replaced the need for atonement.

🔑 Atonement means guilt covered before God

🙏 Even the Levites needed this first

🚫 Their new role did not exempt them

📖 Position never replaces the need for atonement

---
## ✂️ Thus Shalt Thou Separate The Levites From Among The Children Of Israel

"Separate" here means set apart for good, not just for a day.

This was a permanent change in the Levites' identity.

They would never again live simply as one more Israelite family.

From this point on, their whole existence centered on the tabernacle.

✂️ Separate means set apart permanently

🏠 Their whole way of life changed

🚫 Never again just another Israelite family

📖 Their existence now centered on the tabernacle

---
## 🙌 The Levites Shall Be Mine

This is a direct, personal ownership claim.

God is not simply describing a job assignment here.

He is stating that these men now belong to Him.

The next verses explain exactly why God makes this claim.

🙌 God claims personal ownership here

🚫 Not just a job assignment

🔑 The Levites now belong to Him

➡️ The next verses explain why

# Numbers 8:15-19
# 👶 Levites Instead Of The Firstborn
---
## 🔢 After That Shall The Levites Go In To Do The Service

Notice the order given here.

Cleansing and offering had to happen first.

Only after that could the Levites begin their actual work.

Service to God never started before a person was ready.

🔢 Cleansing came before service, not after

⏳ The Levites had to wait their turn

🔑 Readiness came before the actual work

📖 The order itself carried real meaning

---
## 💯 Wholly Given Unto Me From Among The Children Of Israel

"Wholly" means completely, with nothing held back.

The Levites were not partly God's and partly Israel's.

Their entire tribe, without exception, belonged to this one purpose.

This set the Levites apart from every other tribe in Israel.

💯 Wholly means completely, nothing held back

🚫 Not partly God's and partly Israel's

👥 Their whole tribe served this purpose

📖 No exceptions were made at all

---
## 🚼 Instead Of Such As Open Every Womb, Even Instead Of The Firstborn

"Open every womb" is an old way of saying "firstborn."

The Levites were now standing in for every firstborn son in Israel.

One entire tribe replaced thousands of individual firstborn sons.

This substitution is the reason the whole ceremony happened.

🚼 Open every womb means firstborn

🔁 One tribe replaced every firstborn son

🔢 Thousands of sons, one tribe instead

📖 This substitution explains the whole ceremony

---
## 📖 For All The Firstborn Of The Children Of Israel Are Mine

This claim did not start here.

Exodus 13 first recorded God's claim on Israel's firstborn sons.

That claim came right after the tenth plague in Egypt.

This chapter is finally settling a promise made many chapters earlier.

🔟 It followed the tenth plague in Egypt

⏳ This chapter settles an older promise

🔑 Nothing here is a new idea

📖 Exodus 13 first records this claim

---
## ⚔️ On The Day That I Smote Every Firstborn In The Land Of Egypt I Sanctified Them

"Smote" is an old word for struck down.

God is pointing back to the final plague in Egypt.

That was the night of the first Passover.

Israel's firstborn sons were spared that night.

Egypt's firstborn were not spared.

That single night still explains why God claims Israel's firstborn today.

⚔️ Smote means struck down

🌙 Points back to the first Passover night

🛡️ Israel's firstborn were spared, Egypt's were not

📖 That night still explains this claim

---
## 🔄 I Have Taken The Levites For All The Firstborn

This sentence uses the language of a completed exchange.

One group was formally taken in place of another.

Numbers 3 already worked out the exact numbers behind this trade.

That earlier chapter counted every firstborn son and every Levite.

🔄 This reads like a formal exchange

🔢 One tribe stood in for a nation

🔑 Nothing here was left uncounted

📖 Numbers 3 already counted both groups

---
## 👑 I Have Given The Levites As A Gift To Aaron And To His Sons

God owns the Levites, but Aaron directs their work.

Aaron and his sons were the priests, one family within the tribe of Levi.

The rest of the Levites assisted them, without becoming priests themselves.

This kept the chain of responsibility clear, from God to Aaron to the Levites.

👑 God owns them, Aaron directs them

👪 Aaron's family alone held the priesthood

🤝 Other Levites assisted, without becoming priests

📖 The chain of responsibility stayed clear

---
## ⚠️ When The Children Of Israel Come Nigh Unto The Sanctuary

This is not a threat aimed at ordinary worship.

Approaching holy things without the proper priesthood in place was the real danger.

The Levites existed partly to prevent that danger.

Numbers 16 later shows what happened when this boundary was ignored.

⚠️ The danger was approaching holy things wrongly

🛡️ Levites existed to help prevent that danger

🔑 This system protected the whole camp

📖 Numbers 16 later shows the risk was real

# Numbers 8:20-22
# ✅ Israel Obeys, The Levites Begin
---
## ✅ Did To The Levites According Unto All That The Lord Commanded Moses

This phrase emphasizes complete obedience, not partial compliance.

Moses, Aaron, and the whole congregation all shared this responsibility.

This same phrase appears often throughout the law.

Exodus 40 used nearly identical wording when the tabernacle was finished.

✅ Complete obedience, not partial compliance

👥 Moses, Aaron, and the people shared it

🔁 This same phrase appears often in the law

📖 Exodus 40 used nearly the same words

---
## 🔁 The Levites Were Purified, And They Washed Their Clothes

This is not a new command.

It is the instruction from verse seven, now actually carried out.

Every step ordered earlier in the chapter gets repeated here as fact.

The text wants the reader to see the plan finished, not just given.

🔁 Repeats the command from verse seven

✅ Now shown as done, not just ordered

📋 Every earlier step gets confirmed here

📖 The plan is shown finished, not just given

---
## 🙌 Aaron Offered Them As An Offering Before The Lord

Aaron personally carried out the offering described earlier.

This was not delegated to someone else.

The high priest himself performed this one time presentation.

Every earlier detail of the ceremony finally came together here.

🙌 Aaron personally performed the offering

🚫 Not delegated to anyone else

🔑 The high priest handled it himself

📖 Every detail of the ceremony came together

---
## 🚪 Went The Levites In To Do Their Service In The Tabernacle

This is the moment the whole chapter has been building toward.

Every earlier step existed to reach this exact point.

The Levites finally began the work God assigned them.

Service inside the tabernacle was now truly underway.

🚪 The Levites finally begin their work

🔑 Every earlier step led to this moment

⛺ Service inside the tabernacle now starts

📖 God's assignment was finally underway

# Numbers 8:23-26
# 🎂 Twenty Five To Fifty, Then Rest
---
## 🔢 From Twenty And Five Years Old And Upward

This sets twenty five as the Levites' starting age here.

Numbers 4 earlier set the starting age at thirty, not twenty five.

Many scholars believe the years between were a training period.

A young Levite likely learned the work before carrying its full weight.

🔢 Twenty five is the starting age here

🎓 The years between may have been training

🔑 Full duty came after growing into it

📖 Numbers 4 earlier said thirty instead

---
## ⏳ They Shall Go In To Wait Upon The Service Of The Tabernacle

"Wait upon" is an old phrase for actively serving.

It did not mean standing around, idle.

This described the full, physical workload of tabernacle duty.

Carrying, assembling, and guarding all fell under this one phrase.

⏳ Wait upon means actively serving

🚫 Not standing around, idle

🏋️ Included carrying, assembling, and guarding

📖 One phrase covered the whole workload

---
## 🎂 From The Age Of Fifty Years They Shall Cease Waiting Upon The Service

Fifty marked the end of this heavy, physical workload.

Carrying tabernacle parts through the wilderness demanded real strength.

An age limit protected older Levites from work their bodies could no longer bear.

This was not a punishment, it was practical wisdom.

🎂 Fifty ended the heavy workload

💪 The work demanded real physical strength

🛡️ The age limit protected older Levites

📖 This reflected wisdom, not punishment

---
## 👀 But Shall Minister With Their Brethren, To Keep The Charge

This does not mean a Levite over fifty did nothing at all.

"Keep the charge" meant overseeing, guarding, and guiding younger Levites.

Experience still had real value, even after the heavy lifting stopped.

Age brought a new kind of service, not an end to it.

🚫 Retirement did not mean doing nothing

👀 Keep the charge means oversee and guard

🎓 Older Levites guided the younger ones

📖 Age changed the kind of service

---
## 🔒 Thus Shalt Thou Do Unto The Levites Touching Their Charge

"No service" here means no more of the heavy physical labor.

It does not cancel the guarding and mentoring just described.

This sentence formally closes the chapter's rules about the Levites.

Every stage of a Levite's working life now had its place.

🔑 No service means no more heavy labor

🚫 Guarding and mentoring still continued

🔒 This formally closes the chapter's rules

📖 Every stage of service had its place
`.trim();

export const NUMBERS_EIGHT_PERSONAL_SECTIONS = parseNumbersEightRawNotes(NUMBERS_EIGHT_RAW_NOTES);
