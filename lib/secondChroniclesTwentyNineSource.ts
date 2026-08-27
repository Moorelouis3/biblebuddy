export type SecondChroniclesTwentyNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesTwentyNineRawNotes(rawText: string): SecondChroniclesTwentyNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesTwentyNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+29:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 29 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+29:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+29:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 29 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 29,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 29:${startVerse}` : `2 Chronicles 29:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 2 Chronicles 29 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_TWENTY_NINE_RAW_NOTES = `# SecondChronicles 29:1-3
# 🔥 A New King Sets Things Right
---
## 👑 Five And Twenty Years Old

"Five and twenty" is simply the old way of saying twenty five.

Hezekiah takes the throne while still a young man.

His father Ahaz had led Judah into some of its worst years of idolatry.

Hezekiah inherits that broken mess at a young age.

🔢 Five and twenty means twenty five

👑 Hezekiah becomes king while young

💔 Ahaz left behind years of idolatry

📖 A young king inherits a broken kingdom

## 👩 His Mother's Name Was Abijah, The Daughter Of Zechariah

Kings in Chronicles are often introduced with their mother's name.

That detail was not filler.

It showed which household actually raised the future king.

The name Abijah means the Lord is my father.

This Zechariah is not the famous prophet from many generations later.

👩 Chronicles names each king's mother

🏠 That household shaped the future king

📛 Abijah means the Lord is my father

📖 A different Zechariah than the later prophet

## ✅ That Which Was Right In The Sight Of The Lord

Every king in Chronicles gets measured by this one line.

Ahaz, the king right before him, failed that test completely.

Hezekiah is about to become the sharpest contrast to his own father in the whole book.

The very next verses prove that this opening line is not empty praise.

📏 One line measures every king

💔 Ahaz failed this same test

🔄 Hezekiah becomes his father's opposite

📖 The chapter proves this line true

## 👴 According To All That David His Father Had Done

Father here does not mean Hezekiah's actual father.

It means his distant ancestor David, a king many generations earlier.

Chronicles regularly measures kings against David's example instead of their immediate parent.

Hezekiah is compared to the best king in the family line, not the worst one.

👴 Father here means ancestor David

📏 Chronicles measures kings by David

🚫 Not a comparison to Ahaz

➡️ Hezekiah aims for the family's best king

## 📅 In The First Year Of His Reign, In The First Month

Hezekiah does not wait or ease into the job.

The first month on the Jewish calendar was Nisan, the month tied to Passover.

Starting temple reform in that exact month connects his reign to Israel's biggest story of rescue.

This timing signals that reform is priority one, not a later project.

📆 He acts in his very first month

🐑 Nisan connects to the Passover story

🎯 Reform becomes his top priority

📖 A new reign starts with worship

## 🚪 Opened The Doors Of The House Of The Lord, And Repaired Them

Ahaz had shut these same doors in the chapter before this one.

Shutting them stopped the entire sacrifice system from functioning at all.

Hezekiah's first official act reverses his father's very first failure.

Repaired means the doors were left damaged, not just closed.

🚪 Ahaz had shut these very doors

🛑 Closed doors stopped all sacrifice

🔧 Repaired means damaged, not just shut

📖 Hezekiah reverses his father's failure

# SecondChronicles 29:4-11
# 📢 Hezekiah's Charge To The Levites
---
## 🚶 Gathered Them Together Into The East Street

The east street was an open square near the temple's eastern gate.

Hezekiah calls a very public meeting, not a quiet private one.

A visible location this early in his reign sends its own message.

Everyone in Jerusalem could see that reform had begun.

🧭 East street sat near the temple gate

📢 The meeting was public, not private

👀 Everyone could see this beginning

📖 A visible start announced real change

## 🙏 Sanctify Now Yourselves

Sanctify means to be made ritually clean and set apart for God's use.

Priests and Levites could not serve while ceremonially unclean.

Before anything else can happen in the temple, the workers themselves must be made ready.

The order to the people always starts with the leaders first.

🧼 Sanctify means made clean and set apart

🚫 Unclean workers could not serve

👥 Leaders are cleansed before the people

➡️ Reform always starts at the top

## 🗑️ Carry Forth The Filthiness Out Of The Holy Place

Filthiness refers to the idols, ashes, and debris left behind from Ahaz's pagan worship.

Ahaz had filled God's own house with objects meant for other gods.

Removing it physically was the first practical step of the whole reform.

Nothing else could be restored until the mess itself was gone.

🗑️ Filthiness means Ahaz's leftover idols

💔 Pagan objects had filled God's house

🧹 Removal was the first real step

📖 Restoration required cleaning out first

## ⚖️ For Our Fathers Have Trespassed

Trespassed means broke faith, not a small accidental mistake.

Hezekiah names his own father's generation honestly, in public, in front of the Levites.

That kind of honesty from a king was rare.

Denial never fixes a problem this deep.

⚖️ Trespassed means broke faith with God

🗣️ Hezekiah names the sin openly

👑 Honesty from a king was rare

📖 Denial never fixes real sin

## 🙈 Turned Away Their Faces From The Habitation Of The Lord, And Turned Their Backs

This does not just describe people glancing a different direction by accident.

It pictures a deliberate, physical rejection of the temple itself.

Habitation simply means dwelling place, where God's presence was said to rest.

Turning the back on someone was a deep insult in this culture.

🙈 This was deliberate, not accidental

🏠 Habitation means God's dwelling place

👎 Turning the back showed clear rejection

📖 Worship had become open insult

## 🕯️ Shut Up The Doors Of The Porch, And Put Out The Lamps

The lamps refer to the golden lampstand that was supposed to burn continually inside the temple.

Putting it out meant total darkness where light was never supposed to stop.

This detail already appeared back in chapter twenty eight about Ahaz.

Hezekiah repeats it here on purpose.

Nobody was meant to forget what was lost.

🕯️ Lamps means the golden lampstand

🌑 It was never meant to go dark

📚 Chapter twenty eight already showed this

📖 Repeating it keeps the loss clear

## 😨 Delivered Them To Trouble, To Astonishment, And To Hissing

Astonishment describes the shock other nations felt watching Judah collapse.

Hissing describes open mockery, the kind of scorn people made at Judah's downfall.

These were not random disasters.

Hezekiah names them as the direct result of the fathers' sin.

😲 Astonishment means shock from watching nations

😏 Hissing means open public mockery

🚫 These were not random events

📖 Consequences followed directly from sin

## ⚔️ Our Fathers Have Fallen By The Sword

This recalls the military defeats already described in the chapter before this one.

Judah lost soldiers, land, and family members during Ahaz's reign.

Sons, daughters, and wives being carried off means real families were broken apart.

Some of Hezekiah's own listeners likely lost relatives this exact way.

⚔️ This recalls Ahaz's military defeats

💔 Real families were broken apart

😢 Listeners likely lost relatives this way

📖 The pain was still fresh here

## 🤝 Now It Is In Mine Heart To Make A Covenant

A covenant is a formal, binding commitment, not a casual promise.

In mine heart shows this is Hezekiah's own personal resolve, not just political policy.

He proposes a renewed relationship between the nation and the Lord God of Israel.

The wording ties this moment back to Israel's oldest covenants with God.

🤝 Covenant means a formal binding promise

❤️ In mine heart shows personal resolve

🔄 He proposes a renewed relationship

📖 This echoes Israel's oldest covenants

## 👦 My Sons, Be Not Now Negligent

My sons is not literal, since Hezekiah is a young king speaking to grown Levites.

It is a term of respect and closeness, not a claim of actual fatherhood.

Negligent means careless or slow to act on purpose.

The urgency in his words matches the urgency of the whole moment.

👦 My sons is a term of respect

🚫 Not a literal fatherhood claim

🐢 Negligent means careless or slow

📖 His words match this moment's urgency

## 🔥 Chosen You To Stand Before Him... And Burn Incense

Incense in temple worship represented prayer rising up toward God.

Standing before the Lord and ministering to him described the priest's whole daily role.

Being chosen for this was not a job someone applied for.

It was a calling passed down through the tribe of Levi itself.

🔥 Incense pictured prayer rising to God

🙏 Standing before him described daily duty

📜 Being chosen was not applied for

📖 The calling passed through the tribe

# SecondChronicles 29:12-15
# 👥 The Levites Who Answered The Call
---
## 🏺 Of The Sons Of The Kohathites

Levi had three sons, Gershon, Kohath, and Merari.

Each family received a different assignment when Israel traveled through the wilderness.

The Kohathites carried the most sacred furniture, including the ark itself.

Naming this family here connects the temple reform to Israel's oldest traditions.

👨‍👦‍👦 Levi had three sons total

🏺 Kohathites carried the sacred furniture

📦 They handled the ark itself

📖 This links reform to old tradition

## 🪵 And Of The Sons Of Merari

Merari's family carried the heavier structural pieces of the tabernacle.

That included the boards, bars, pillars, and sockets that held the whole structure together.

Their work was less glamorous than carrying the ark, but just as necessary.

Every family had a role, and none of them were optional.

🪵 Merari carried the tabernacle's frame

🔩 Boards, bars, and pillars were theirs

💪 Less visible work, still necessary

📖 Every Levite family had a role

## 🧵 Of The Gershonites

Gershon's family carried the coverings, curtains, and hangings of the tabernacle.

These were the soft materials that formed the walls and roof of the structure.

Three different families held three different jobs, one shared purpose.

This same three way division still shapes who is named here, generations later.

🧵 Gershonites carried coverings and curtains

🏕️ These formed the tabernacle's walls

🤝 Three families shared one purpose

📖 Old roles still shaped this moment

## 🎵 Of The Sons Of Asaph

Asaph was one of the chief musicians King David appointed generations earlier.

His family became known for writing and leading temple worship music.

Several psalms in the Bible are credited directly to Asaph.

Naming his descendants here shows that music itself is about to be restored too.

🎵 Asaph was one of David's chief musicians

📜 Several psalms carry his name

🎶 His family led temple worship

📖 Music was about to return too

## 🎼 Of The Sons Of Heman... And Of The Sons Of Jeduthun

Heman and Jeduthun were the other two musicians David placed alongside Asaph.

Together the three families led all of the temple's official worship music.

Their presence here means worship is being rebuilt from its original blueprint, not invented fresh.

This detail rewards a reader who remembers David's original arrangement.

🎼 Heman and Jeduthun joined Asaph

🎶 Three families led temple worship

🏗️ Worship follows the original blueprint

📖 Old structure guides new restoration

## 📜 According To The Commandment Of The King, By The Words Of The Lord

This is not just Hezekiah's personal project.

The phrase makes clear that the deeper authority behind it is God's own word.

Hezekiah gives the order, but he is not the true source of it.

A king can start reform, but only God's word can justify it.

👑 Hezekiah gives the human order

📖 God's word supplies the real authority

🚫 Not just one king's personal idea

➡️ True reform needs more than a king

# SecondChronicles 29:16-19
# 🧹 Cleansing The House Of The Lord
---
## 🏛️ The Inner Part Of The House Of The Lord

The temple was built in layers, moving from a public courtyard to the most sacred inner room.

Inner part refers to the Holy Place and the Holy of Holies, the most restricted areas.

Only priests could even enter that far into the building.

Cleaning that space meant undoing years of the worst kind of neglect.

🏛️ The temple had layers of access

🚪 Inner rooms were the most restricted

🙏 Only priests could enter that far

📖 This was the deepest kind of neglect

## 🌊 Carry It Out Abroad Into The Brook Kidron

The Kidron valley ran along the east side of Jerusalem, right outside the city.

Other reforming kings later used this same valley to dispose of idols and unclean objects.

It became a standard dumping ground for anything unfit for God's house.

Getting the filth completely outside the city carried its own weight.

🌊 Kidron ran along Jerusalem's east side

🗑️ Later kings used it the same way

🚫 It became a standard disposal site

📖 The filth had to leave the city

## 📆 Sanctified The House Of The Lord In Eight Days

Eight days sounds fast for a temple neglected for years under Ahaz.

The work started on the first day of the month and finished on the sixteenth.

That kind of speed shows real urgency, not a slow, half hearted cleanup.

Ahaz took years to damage the same building Hezekiah restored in days.

📆 Eight days undid years of neglect

🏃 The pace showed real urgency

💔 Ahaz took years to damage it

📖 Restoring took far less than ruining

## 🍞 The Shewbread Table, With All The Vessels Thereof

The shewbread table held twelve loaves of bread, one for each tribe of Israel.

That bread stayed on display continually inside the Holy Place.

Its presence symbolized God's ongoing provision for the whole nation, not just one family.

Restoring the table meant that symbol could finally return to its rightful place.

🍞 Twelve loaves represented twelve tribes

♾️ Bread stayed on display continually

🤲 It symbolized God's provision

📖 A symbol finally returned to its place

## 🗑️ Which King Ahaz In His Reign Did Cast Away

This directly connects back to Ahaz's actions described in the chapter before this one.

Ahaz had thrown out or destroyed the temple's own sacred vessels during his reign.

Hezekiah's workers had to recover and repair what his own father had discarded.

Undoing a parent's damage became part of Hezekiah's very first responsibilities as king.

🗑️ Ahaz discarded these vessels himself

🔧 Hezekiah had to recover them

👴 A son undoing his father's damage

📖 Reform began by fixing family failure

## 🎯 They Are Before The Altar Of The Lord

This short line marks the moment recovery becomes visible.

The vessels are no longer missing, hidden, or destroyed.

They now sit exactly where they were always meant to be used.

One sentence closes out years of loss.

🎯 The vessels are visible again

🚫 No longer missing or destroyed

📍 They sit in their proper place

📖 One sentence closes years of loss

# SecondChronicles 29:20-24
# 🩸 A Sin Offering For All Israel
---
## 🌅 Hezekiah The King Rose Early

Rising early was a small detail that carried real meaning.

It showed eagerness, not obligation dragging him out of bed.

Hezekiah gathers the city's rulers himself instead of sending someone else to do it.

A leader's own urgency tends to spread to everyone watching him.

🌅 Rising early showed real eagerness

🚫 This was not reluctant obligation

👑 Hezekiah led the gathering himself

📖 A leader's urgency spreads to others

## 🐐 Seven Bullocks, And Seven Rams, And Seven Lambs, And Seven He Goats

The number seven often represented completeness throughout the Old Testament.

Four different kinds of animals were brought, not just one.

This was the largest, most thorough sin offering described so far in Hezekiah's reforms.

Nothing about this offering was done halfway.

🔢 Seven often means completeness

🐐 Four different animal types were used

💯 This was a thorough offering

📖 Nothing here was done halfway

## 🏰 For A Sin Offering For The Kingdom, And For The Sanctuary, And For Judah

Three separate targets are named here, not just one general sin.

Kingdom covers the nation's leadership and its decisions.

Sanctuary covers the temple itself, which had been defiled under Ahaz.

Judah covers the ordinary people.

Together, no group in the nation is left out.

🏰 Three separate targets are named

👑 Kingdom covers the nation's leaders

🏛️ Sanctuary covers the temple itself

📖 No group in Judah was left out

## 🩸 The Priests Received The Blood, And Sprinkled It On The Altar

In this system, blood represented life itself, not just a ritual detail.

Sprinkling it on the altar showed that a life had been given in the place of the guilty.

This same action repeated three separate times, once for each kind of animal.

The repetition made the seriousness of the moment impossible to rush past.

🩸 Blood represented life given up

🔁 Altar received it three separate times

⚖️ A life stood in for the guilty

📖 Repetition kept the moment serious

## 🙌 They Laid Their Hands Upon Them

Laying hands on the animal was a specific, physical action, not a vague gesture.

It symbolically transferred the guilt of the people onto the animal about to die.

The animal died in the place of the ones who deserved judgment.

This picture runs through the entire Old Testament sacrifice system.

🙌 Hands transferred guilt onto the animal

💀 The animal died in their place

🔁 This pattern repeats throughout scripture

📖 A substitute carried the punishment

## ⚖️ Made Reconciliation With Their Blood Upon The Altar, To Make An Atonement

Reconciliation here means restoring a broken relationship, not just settling a debt.

Atonement means covering the sin so it no longer stands between the people and God.

Both words describe the same goal from two different angles.

The relationship, not just the rule, was what needed repair.

⚖️ Reconciliation means restoring the relationship

🛡️ Atonement means covering the sin

🎯 Both aim at the same repair

📖 A relationship was what needed fixing

## 🌍 For All Israel

By this point, Israel and Judah had split into two separate kingdoms for generations.

Hezekiah rules only over Judah, yet he offers this sacrifice on behalf of all Israel.

That choice reaches out past his own political borders on purpose.

It hints at a hope for the whole nation to be reunited under God someday.

🌍 Israel and Judah were split kingdoms

👑 Hezekiah ruled only over Judah

🤝 He still offered for all Israel

📖 The gesture hoped for reunited worship

# SecondChronicles 29:25-30
# 🎶 Music Returns To The Temple
---
## 🎻 With Cymbals, With Psalteries, And With Harps

A psaltery was a stringed instrument similar to a small harp.

These three instruments together formed the standard sound of temple worship.

Music had gone completely silent while the temple sat closed under Ahaz.

Its return here was not just decoration, it was part of the actual repair.

🎻 A psaltery resembled a small harp

🔇 Music had gone silent under Ahaz

🎶 Three instruments formed the standard sound

📖 Music's return was part of the repair

## 📜 According To The Commandment Of David, And Of Gad The King's Seer, And Nathan The Prophet

David originally organized temple music with the help of two trusted advisors.

Gad served as David's seer.

A seer was a kind of prophet who advised the king.

Nathan was the well known prophet from David's own reign.

Naming all three here shows Hezekiah restoring the original design, not something new.

📜 David originally organized this music

👤 Gad served as David's seer

🗣️ Nathan was David's well known prophet

📖 Hezekiah restored the original design

## 📯 The Priests With The Trumpets

Levites played the stringed instruments and cymbals.

Priests were a smaller group within the wider tribe of Levi.

They played the trumpets, a role that belonged to them alone.

Even in celebration, the old order stayed carefully preserved.

📯 Priests specifically played the trumpets

🎻 Levites played strings and cymbals

📋 Each group kept its own role

📖 Old order survived even in celebration

## 🎺 The Song Of The Lord Began Also With The Trumpets

Music did not happen before or after the sacrifice as a separate event.

It started at the exact same moment the burnt offering itself began.

Worship and sacrifice were woven together as one single act, not two.

That timing detail shows how closely music and offering were meant to connect.

🎺 Music started with the sacrifice itself

🔗 Worship and offering were one act

⏱️ The timing was not accidental

📖 Sound and sacrifice rose together

## 🙇 All The Congregation Worshipped

Earlier in the chapter, only the king, priests, and Levites were actively involved.

This verse widens the picture to include everyone gathered at the temple.

Ordinary people were not just watching a ceremony from a distance.

They were full participants in the worship happening around them.

🙇 The whole congregation joined in

👥 Not just leaders were involved

👀 People were not merely watching

📖 Worship included every ordinary person

## 📖 With The Words Of David, And Of Asaph The Seer

This most likely points to actual psalms written by David and Asaph.

Many psalms in the Bible carry one of those two names in their title.

Singing their words connected this new moment of worship to Israel's existing songbook.

The nation was not inventing new words, it was returning to old ones.

📖 This points to actual written psalms

✍️ Many psalms carry these two names

🔗 Old songs connected past and present

➡️ Return meant using words already given

# SecondChronicles 29:31-36
# 🎉 Israel Rejoices Suddenly
---
## 🎁 Now Ye Have Consecrated Yourselves Unto The Lord

The sin offering earlier in the chapter was required, not optional.

What Hezekiah calls for now is a completely different kind of giving.

Consecration here means the people themselves are now ready and set apart.

Only after that readiness can this next, voluntary stage of worship begin.

🎁 The sin offering was required first

✅ Consecration means the people were ready

🔄 A new, different stage begins now

📖 Readiness had to come before giving

## ❤️ As Many As Were Of A Free Heart

A free heart offering was voluntary, given out of genuine desire rather than obligation.

This contrasts directly with the required sin offering from earlier in the chapter.

Nobody forced these particular gifts.

The size of what people brought reveals how the reform had actually reached their hearts.

❤️ Free heart means a voluntary gift

⚖️ It contrasts with the required offering

🚫 Nobody forced these particular gifts

📖 Generosity showed real, changed hearts

## 🔢 Threescore And Ten Bullocks, An Hundred Rams, And Two Hundred Lambs

Threescore is an old way of counting by twenties, so threescore and ten equals seventy.

Seventy bullocks, one hundred rams, and two hundred lambs is an enormous number of animals.

This scale goes far beyond what was strictly required by the earlier sin offering.

The size alone shows how much enthusiasm had built up in just one day.

🔢 Threescore and ten equals seventy

🐂 The total number was enormous

📈 This went far past what was required

📖 Enthusiasm showed itself in scale

## 🐑 The Consecrated Things Were Six Hundred Oxen And Three Thousand Sheep

Consecrated things refers to a separate category from the burnt offerings just listed.

These animals were likely meant for peace offerings, shared in a communal meal afterward.

Six hundred oxen and three thousand sheep represent a truly massive, nationwide celebration.

Numbers this large only happen when an entire community moves together at once.

🐑 Consecrated things means a separate category

🍽️ Likely meant for a shared meal

📊 The numbers were truly massive

📖 A whole community moved together

## 🔪 The Priests Were Too Few, So That They Could Not Flay All The Burnt Offerings

Flay means to skin an animal.

That was part of getting it ready for the altar.

Too few priests had been properly purified to keep up with so many offerings.

Years of neglect under Ahaz had left the priesthood understaffed.

The Levites stepped in to help finish the work.

🔪 Flay means to skin the animal

👥 Too few priests were ready

💔 Ahaz's neglect had left them unprepared

📖 Others had to step in and help

## 🙌 The Levites Were More Upright In Heart To Sanctify Themselves Than The Priests

Priests normally ranked higher than Levites in the temple's structure.

Here, though, the Levites are the ones singled out for greater readiness and eagerness.

That is a notable reversal, stated plainly, without softening it for either group.

Rank does not always match the actual condition of someone's heart.

🙌 Levites showed greater readiness here

👑 Priests normally outranked Levites

🔄 This was a real reversal

📖 Rank does not equal a ready heart

## 📋 The Service Of The House Of The Lord Was Set In Order

This line marks the formal end of the entire cleanup and restart.

Every broken piece from Ahaz's reign is finally back in place.

The doors, the vessels, the music, and the sacrifices are all working again.

Set in order means fully functioning, not just partly repaired.

📋 This marks the restoration's completion

🧩 Every broken piece was addressed

✅ Set in order means fully working

📖 The chapter's purpose lands here

## 🎊 That God Had Prepared The People... Done Suddenly

Hezekiah could organize priests, gather rulers, and issue commands.

He could not manufacture this kind of nationwide readiness in people's hearts on his own.

Suddenly makes clear how fast this whole turnaround actually happened.

The final credit goes to God, not to Hezekiah's planning alone.

🎊 Hezekiah could only organize the outside

❤️ Readiness in hearts came from God

⚡ Suddenly shows how fast this moved

📖 Final credit belongs to God alone
`.trim();

export const SECOND_CHRONICLES_TWENTY_NINE_PERSONAL_SECTIONS = parseSecondChroniclesTwentyNineRawNotes(
  SECOND_CHRONICLES_TWENTY_NINE_RAW_NOTES,
);
