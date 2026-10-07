export type ZechariahEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseZechariahEightRawNotes(rawText: string): ZechariahEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ZechariahEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Zechariah\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Zechariah 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Zechariah\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+Zechariah\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Zechariah 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Zechariah 8:${startVerse}` : `Zechariah 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Zechariah 8 sections, received " + sections.length);
  }

  return sections;
}

const ZECHARIAH_EIGHT_RAW_NOTES = `# Zechariah 8:1-3
# 🔥 The Lord's Jealous Return To Zion
---
## 📨 Again The Word Of The LORD Of Hosts Came Unto Me

This formula marks a brand new message from God, separate from the eight visions in chapters one through six.

Zechariah received multiple messages like this across different days and years.

Each one gets introduced the same simple way.

What follows next answers a question nobody in the story has even asked yet.

📨 This marks a brand new message
🔁 Zechariah received many messages like this
📆 Each one opens the same simple way
📖 This message answers an unasked question
---
## 😡 I Was Jealous For Zion With Great Jealousy

"Jealous" here does not describe insecurity or pettiness.

It describes a love so strong it will not share its place with a rival.

Zion names Jerusalem, the city God chose to live among his people.

The phrase repeats twice in one verse to make the feeling impossible to miss.

This is the strongest emotional opening in the whole book of Zechariah.

🔥 Jealous means a love that guards
🏙️ Zion names the city of Jerusalem
🔁 The feeling repeats twice for emphasis
📖 This opens the chapter at full strength
---
## 🏠 I Am Returned Unto Zion

God speaks of returning to Zion the same way a person returns home.

He had seemingly left during the exile, when the temple burned and the city emptied.

That departure was never truly a departure, since God never actually left his people.

Still, his presence in the city is now promised in a new, visible way.

Jerusalem is about to feel occupied again, not abandoned.

🏠 God speaks of returning like coming home
💔 The exile felt like God had left
🤝 God never actually abandoned his people
📖 His presence returns in a visible way
---
## 🏙️ A City Of Truth

Jerusalem gets a brand new title here, a city of truth.

That title describes what the city will become, not what it had always been.

Earlier prophets like Isaiah accused this same city of corruption and broken promises.

A renamed city signals a changed character, not just a changed address.

🏙️ The city receives a brand new title
📜 Earlier prophets accused this city of corruption
🔄 A new name signals a changed character
📖 Truth will define Jerusalem going forward
---
## ⛰️ The Holy Mountain

The mountain of the LORD of hosts names the hill where the temple stood.

Calling it holy means the mountain itself is set apart for God alone.

That mountain had been trampled and burned within living memory of this very audience.

Naming it holy again promises the opposite of what the exiles had actually seen.

⛰️ The mountain names the temple's hill
✨ Holy means set apart for God
🔥 This same hill had been burned before
📖 Holiness reverses what the exiles once saw
# Zechariah 8:4-8
# 👴 Old Men And Playing Children Fill The Streets
---
## 👴 Old Men And Old Women Dwell In The Streets Of Jerusalem

This promise pictures something most ancient cities under siege rarely saw, old age.

War, famine, and exile usually cut lives short long before anyone grew truly old.

Picturing elderly men and women simply sitting in the streets describes ordinary daily safety.

Peace is pictured here through the most ordinary scene possible, not through a battle won.

👴 Old age was rare after siege and exile
🏙️ Sitting in the streets pictures daily safety
🕊️ Peace appears as something ordinary here
📖 An ordinary scene reveals an extraordinary promise
---
## 🦯 Every Man With His Staff In His Hand For Very Age

A "staff" here is simply a walking cane, needed because of old age, not danger.

Earlier in Zechariah, a different kind of staff appeared as a measuring tool.

This one belongs to someone who has lived long enough to need help walking.

Reaching that kind of old age proves a whole generation finally found rest.

🦯 A staff here means an old man's cane
🔁 A different staff appeared earlier in Zechariah
👴 This staff belongs to someone very old
📖 Old age itself becomes proof of rest
---
## 🧒 The Streets Of The City Shall Be Full Of Boys And Girls Playing

Children playing in open streets is one of the clearest signs of a safe city.

A city under threat keeps its children close indoors, not out in the open.

This picture directly answers the grief remembered back in chapter seven's fasting questions.

Old men resting and children playing together complete one whole picture of peace.

🧒 Children playing signals a genuinely safe city
🚪 Threatened cities keep children close indoors
😢 This answers the grief named in chapter seven
📖 Rest and play together complete this picture
---
## ❓ Marvellous In The Eyes Of The Remnant

"Marvellous" means impossible, or at least astonishing enough to seem impossible.

The remnant means the small number of Jews who survived exile and returned home.

To that small, discouraged group, a promise this large sounded almost too good to believe.

God asks directly whether something marvellous to them should also seem marvellous to him.

Human limits are not the same as God's limits.

👥 Marvellous means almost impossible to believe
😳 The remnant was a small, discouraged group
❓ God asks if his power has limits too
📖 Human limits are not God's limits
---
## 🌅 I Will Save My People From The East Country, And From The West Country

Most exiles taken by Babylon were carried east, toward Babylon itself.

Naming both east and west together pictures a gathering from every direction, not just one.

Some Jewish communities had also scattered toward Egypt and other lands to the west.

No matter which direction people had scattered, God promises to reach every one of them.

🌅 East names the direction toward Babylon
🌄 West names other lands of scattering
🌍 Together they picture every direction at once
📖 God reaches his people wherever they scattered
---
## 🚶 I Will Bring Them, And They Shall Dwell In The Midst Of Jerusalem

Earlier chapters in Zechariah pictured scattering as judgment carried out by God himself.

Here the same kind of action reverses completely, now it is gathering, not scattering.

Bringing them home means an active rescue, not people simply finding their own way back.

Dwelling in the midst of Jerusalem means living at the very center, not the edge.

🔁 Scattering now reverses into gathering
🚶 God actively brings his people home
🏙️ Midst means the very center of the city
📖 This reverses the judgment named earlier
---
## 🤝 They Shall Be My People, And I Will Be Their God

This exact phrase appears many times across the Old Testament as a covenant formula.

Moses used it at the exodus, and Ezekiel used it during the exile as well.

Repeating this ancient formula here confirms the covenant itself never actually broke.

Exile changed where the people lived, not who they ultimately belonged to.

📜 This formula repeats across the Old Testament
🔓 Moses used it at the exodus
🏺 Ezekiel repeated it again during exile
📖 Exile never broke this covenant bond
---
## ✅ In Truth And In Righteousness

Truth and righteousness describe how this renewed relationship will actually be lived out.

Truth means complete honesty between God and his people, with nothing hidden.

Righteousness means living rightly, matching God's own standard for a holy nation.

Chapter seven already condemned a hollow, dishonest version of worship God refused to accept.

✅ Truth means complete honesty with God
⚖️ Righteousness means living by God's standard
🙅 Chapter seven condemned hollow worship like this
📖 Real relationship requires both honesty and right living
# Zechariah 8:9-13
# 🧱 Let Your Hands Be Strong
---
## 💪 Let Your Hands Be Strong

Strong hands here means courage to keep working, not physical strength alone.

The people hearing this were the ones actively rebuilding the temple at that very moment.

Discouragement, not lack of muscle, was the real danger threatening to stop the work.

This command answers that discouragement directly, before explaining exactly why it matters.

💪 Strong hands means courage, not just muscle
🧱 The temple was being rebuilt right then
😔 Discouragement was the real danger here
📖 Courage gets commanded before the reason is given
---
## 🧱 The Day That The Foundation Of The House Of The LORD Was Laid

The temple's foundation was actually laid years earlier, soon after the exiles first returned.

Local opposition then stopped the work completely for about fifteen years.

Building finally resumed only after Haggai and Zechariah both began preaching in Darius's second year.

This verse treats that resumed foundation day as the real turning point to remember.

🧱 The foundation was laid soon after the return
🛑 Opposition then stopped the work for years
📣 Haggai and Zechariah's preaching restarted it
📖 This day marks the real turning point
---
## 💰 There Was No Hire For Man, Nor Any Hire For Beast

"Hire" here means wages, the pay earned for a day of honest work.

Before the rebuilding resumed, crops failed and normal wages simply disappeared.

Even work animals brought no return for their labor during that hard stretch.

Haggai's earlier prophecy already describes this exact kind of economic hardship in detail.

💰 Hire means ordinary daily wages
🌾 Crops failed before the work resumed
🐂 Even animals earned no real return
📖 Haggai already described this same hardship
---
## 🚶 Neither Was There Any Peace To Him That Went Out Or Came In

Going out and coming in describes everyday travel, to a field, a market, or home.

Peace here means basic safety, not simply a feeling of calm.

Hostile neighboring peoples made that ordinary travel genuinely dangerous during those stalled years.

Simple daily movement had become a risk nobody could count on.

🚶 Going out and coming in means daily travel
🛡️ Peace here means basic physical safety
⚔️ Hostile neighbors made travel genuinely risky
📖 Ordinary movement had become a real risk
---
## 🎯 I Set All Men Every One Against His Neighbour

This hardship was not random bad luck or simple coincidence.

God directly states that he allowed the strife between neighbors during that difficult stretch.

Opposition from outside often breeds suspicion and conflict among people on the inside too.

Naming God as the one who allowed it keeps the real cause from being hidden.

🎯 This hardship was not random chance
👊 Outside pressure bred conflict inside as well
🙋 God names himself as the cause
📖 The real cause is never hidden here
---
## 🔄 I Will Not Be Unto The Residue Of This People As In The Former Days

"Residue" here means the people who remained after the exile and the earlier hardship.

Former days points directly back to the hire, the danger, and the conflict just described.

God promises a clean break from that entire stretch of hardship, not a slow improvement.

The change starts now, not gradually over an uncertain future.

👥 Residue means those who remained after exile
📉 Former days names the hardship already described
🔄 God promises a clean break now
📖 The change begins now, not later
---
## 🌱 The Seed Shall Be Prosperous

Seed here means the crops planted in the ground each season.

Haggai had already promised this exact kind of blessing once the temple work resumed.

A failed harvest had been one clear sign of God's earlier displeasure.

A successful one now becomes a clear, visible sign of his renewed favor.

🌱 Seed means the crops planted each season
📜 Haggai already promised this same blessing
📉 Failed harvests once signaled God's displeasure
📖 A good harvest now signals his favor
---
## 🍇 The Vine Shall Give Her Fruit, And The Ground Shall Give Her Increase

Vine, ground, and the coming mention of dew each name a different everyday source of life.

Wine, bread, and water together covered most of daily life in that world.

Naming all three together pictures total provision, not one isolated lucky harvest.

Every basic need God's people once lacked now gets promised in full.

🍇 Vine gives wine, a daily staple
🌾 Ground gives grain, another daily staple
💧 Dew supplies water for every crop
📖 Together they promise total provision
---
## 💔 As Ye Were A Curse Among The Heathen

Other nations once used Judah's name as an example of disaster and divine punishment.

That is what a curse among the heathen actually means here.

Hearing another nation's name and thinking of ruin was a real, lasting shame.

This verse names that shame plainly before promising it will not last.

💔 Other nations used Judah's name as a warning
📉 This is what a curse among them meant
😔 Hearing that name brought real shame
📖 Naming the shame comes before healing it
---
## 🌍 Ye Shall Be A Blessing

This exact phrase echoes God's ancient promise to Abraham in the book of Genesis.

Abraham was told his own family would become a blessing to every nation on earth.

Judah's reputation flips completely here, from a warning to other nations into a blessing for them.

The promise given to one ancestor finally reaches his descendants generations later.

📜 This echoes God's ancient promise to Abraham
🌍 Abraham's family was meant to bless every nation
🔄 Judah's reputation flips from warning to blessing
📖 One ancient promise reaches later generations
# Zechariah 8:14-17
# ⚖️ From Wrath To Blessing
---
## 🎯 As I Thought To Punish You

God speaks here of a deliberate decision, not a sudden loss of temper.

The exile was planned discipline, carried out on purpose, not an emotional outburst.

This plain honesty about the punishment matters before any promise of blessing follows.

God never pretends the exile was anything other than real judgment.

🎯 Punishment was a deliberate decision, not an outburst
📆 The exile was planned, not emotional
✅ Honesty comes before any promise of blessing
📖 God never hides what the exile actually was
---
## 🔥 When Your Fathers Provoked Me To Wrath

"Provoked" means the fathers actively caused this reaction through their own choices.

This was not punishment without a cause, or anger that arrived out of nowhere.

Generations of idolatry and broken covenant promises built up to this exact result.

Naming the fathers keeps the responsibility exactly where it actually belongs.

🔥 Provoked means they caused this themselves
📜 Generations of idolatry built toward this result
⚖️ This was not punishment without real cause
📖 Responsibility stays where it truly belongs
---
## 🔄 I Repented Not

"Repented" here does not describe sin that needed forgiveness.

It means changing one's mind or regretting a decision already made.

God states plainly that the punishment itself was never a mistake he regretted.

Justice carried out rightly never needs to be taken back later.

🔄 Repented here means changing one's mind
✅ God never regretted the punishment itself
⚖️ Right justice does not need reversing
📖 God stands fully behind his own judgment
---
## 🔁 I Have Thought In These Days To Do Well Unto Jerusalem

This line mirrors the earlier one about punishment almost word for word.

Both verses use the exact same verb, thought, for judgment and now for blessing.

The same deliberate care that once planned discipline now plans restoration instead.

God's intentions changed direction completely, even though his careful nature never did.

🔁 This mirrors the earlier verse about punishment
🧠 The same word, thought, covers both decisions
🔄 Direction changed completely, careful nature did not
📖 The same God now plans restoration
---
## 🗣️ Speak Ye Every Man The Truth To His Neighbour

This command answers the empty, self focused worship condemned back in chapter seven.

Truth telling between neighbors is named first among the practical commands given here.

A renewed relationship with God always shows up first in ordinary daily honesty.

Big promises mean little if daily speech between neighbors stays dishonest.

🙅 This answers the empty worship from chapter seven
🗣️ Truth telling comes first among these commands
🤝 Renewed faith starts with ordinary honesty
📖 Big promises need honest daily speech
---
## 🏛️ Execute The Judgment Of Truth And Peace In Your Gates

City gates served as the courtroom of the ancient world, where elders settled disputes.

Judgment of truth and peace means verdicts that match the facts and settle conflicts honestly.

Chapter seven already condemned judges who ignored true verdicts in favor of money or power.

This command repeats that same demand for fair courts, stated now as settled law.

🏛️ Gates served as the ancient courtroom
⚖️ True judgment means verdicts that match facts
💰 Chapter seven already condemned bought verdicts
📖 Fair courts are restated here as law
---
## 🧠 Let None Of You Imagine Evil In Your Hearts Against His Neighbour

This command targets private thoughts, not only visible actions against a neighbor.

Imagining evil means secretly planning harm before it ever becomes a real act.

The law of Moses already commanded this same heart level standard long before Zechariah.

God's standard for his people reaches further than what anyone else can actually see.

🧠 This targets private thoughts, not just actions
📜 Moses already commanded this heart level standard
👁️ God sees what no one else can
📖 His standard reaches further than visible actions
---
## 🤲 Love No False Oath

An oath in this culture called on God's own name to back up a promise.

A false oath used God's name to support a lie, not just broke a simple promise.

Loving a false oath means treating that kind of dishonesty as acceptable or even useful.

God names this short list of sins as things he personally hates.

🤲 An oath called on God's own name
🤥 A false oath twists that name
💔 Loving it means accepting that dishonesty
📖 God calls this list something he hates
# Zechariah 8:18-19
# 🎉 Fasts Turned To Feasts
---
## 🔁 The Word Of The LORD Of Hosts Came Unto Me

This marks a second, separate message, distinct from the one that opened this chapter.

The first message explained the coming restoration in broad, sweeping promises.

This second message now answers the specific fasting question first raised back in chapter seven.

Big promises eventually need to answer small, specific, practical questions too.

🔁 This marks a second, separate message
🌍 The first message gave broad promises
❓ This one answers a specific old question
📖 Big promises still answer small questions
---
## 🧱 The Fast Of The Fourth Month, The Fifth, The Seventh, And The Tenth

Each of these four fasts marked a specific tragedy from Jerusalem's final destruction.

The fourth month fast remembered the day Babylon's army finally broke through the city wall.

The fifth month fast remembered the temple burning, already named back in chapter seven.

The seventh month fast remembered a governor named Gedaliah, murdered shortly after the city fell.

The tenth month fast remembered the very day that long, final siege first began.

🧱 The fourth month mourned the broken wall
🔥 The fifth month mourned the temple burning
⚔️ The seventh month mourned Gedaliah's murder
📖 The tenth month mourned the siege's beginning
---
## 🎉 Joy And Gladness, And Cheerful Feasts

Every single one of those four grief filled fasts gets the same new ending here.

Gladness and cheerful feasts describe actual celebration, not a quiet, polite relief.

This does not erase what those days once remembered.

It transforms the meaning of remembering them from mourning into genuine joy.

😢 All four grief filled fasts get this ending
🎉 Gladness describes real celebration, not quiet relief
🔄 The days are not erased, only transformed
📖 Mourning becomes genuine joy on these same days
---
## 🎯 Therefore Love The Truth And Peace

This short command closes out the whole fasting question with one clear priority.

Truth and peace matter more to God than which specific days get marked with fasting.

Chapter seven already made this same point about empty, self centered religious habits.

Calendars can shift, but honesty and peace between people must never go out of style.

🎯 One clear priority closes this question
⚖️ Truth and peace matter more than calendar days
🙅 Chapter seven already made this same point
📖 Honesty and peace never go out of style
# Zechariah 8:20-23
# 🌍 Many Nations Will Seek The Lord
---
## 🌍 There Shall Come People, And The Inhabitants Of Many Cities

This promise suddenly widens far beyond Judah and its own returning exiles.

Many cities signals people from entirely different nations, not more Jewish families coming home.

Earlier prophets like Isaiah had already pictured nations streaming toward Jerusalem in a similar way.

What started as a message for one small, discouraged people now reaches outward.

🌍 The promise widens beyond Judah itself
🏙️ Many cities means people from other nations
📜 Isaiah already pictured nations streaming to Zion
📖 A small message now reaches far outward
---
## 🏃 Let Us Go Speedily To Pray Before The LORD

Speedily shows real eagerness here, not a slow, reluctant obligation.

Praying before the LORD means traveling to Jerusalem specifically to seek him there.

One city's invitation to another quickly becomes a shared, growing eagerness.

Enthusiasm for God here spreads the same way word of mouth normally spreads.

🏃 Speedily shows real eagerness, not reluctance
🙏 Praying before the LORD means seeking him
🔁 One city's invitation spreads to another
📖 Eagerness for God spreads like any other news
---
## 🙋 I Will Go Also

This short, personal line breaks away from the larger, general crowd being described.

One individual voice commits personally, not just as part of a larger trend.

A movement this big always starts with ordinary people making this same personal choice.

The whole global promise rests on moments exactly this small and personal.

🙋 One individual voice speaks up here
👥 This breaks away from the general crowd
🌱 Big movements start with personal choices
📖 A huge promise rests on small moments
---
## 💪 Many People And Strong Nations Shall Come To Seek The LORD Of Hosts In Jerusalem

Strong nations here likely means genuinely powerful empires, not weak or minor ones.

Seeking the LORD describes nations actively choosing to worship Israel's God themselves.

That kind of reversal would have sounded almost impossible to the original audience.

The nations that once conquered and scattered God's people now come seeking him instead.

💪 Strong nations means genuinely powerful empires
🙏 Seeking the LORD means choosing to worship him
😳 This reversal sounded almost impossible at first
📖 Conquering nations now come seeking instead
---
## 🔢 Ten Men Shall Take Hold Out Of All Languages Of The Nations

"Ten" here pictures a large, significant group, not a strict, literal headcount.

All languages of the nations pictures many different peoples, not one single foreign nation.

This detail widens the promise from a few curious visitors into a true multitude.

Language itself becomes proof that this reaches far beyond any one culture.

🔢 Ten pictures a large, significant group
🗣️ All languages means many different peoples
🌍 This widens the promise into a multitude
📖 Language itself proves this reaches everyone
---
## 👘 Shall Take Hold Of The Skirt Of Him That Is A Jew

"Skirt" here means the hem or edge of someone's robe, not a piece of clothing worn only by women.

Grabbing someone's hem was a real ancient gesture, used to beg urgently for help or favor.

Saul once grabbed Samuel's robe this exact same way back in the book of Samuel.

Here, foreign strangers grab a Jewish man's robe, begging to be brought along with him.

👘 Skirt here means the hem of a robe
🤲 Grabbing a hem was a real ancient gesture
🔁 Saul grabbed Samuel's robe this same way
📖 Strangers now beg a Jew to lead them
---
## 🗣️ We Will Go With You

This short declaration is the whole point of the entire scene in one sentence.

Outsiders no longer want to watch God's people from a safe distance.

They want to travel with them, directly toward the LORD himself.

Distance turns into companionship in just these four simple words.

🗣️ This line is the whole scene's point
👀 Outsiders no longer just watch from far away
🚶 They want to travel together now
📖 Distance becomes companionship in four words
---
## 👂 For We Have Heard That God Is With You

This final line names the real reason behind the whole request.

Reputation, not force or trade, is what actually draws these strangers in.

Word had spread that God himself was present among this specific, ordinary people.

A reputation like that becomes the most powerful invitation God's people could ever offer.

👂 Reputation, not force, draws these strangers in
📢 Word had spread that God was present
🤝 This becomes an invitation to outsiders
📖 Reputation outlasts every other kind of appeal
`.trim();

export const ZECHARIAH_EIGHT_PERSONAL_SECTIONS = parseZechariahEightRawNotes(ZECHARIAH_EIGHT_RAW_NOTES);
