export type FirstChroniclesFifteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstChroniclesFifteenRawNotes(rawText: string): FirstChroniclesFifteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstChroniclesFifteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstChronicles\s+15:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Chronicles 15 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstChronicles\s+15:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstChronicles\s+15:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Chronicles 15 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 15,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Chronicles 15:${startVerse}` : `1 Chronicles 15:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 1 Chronicles 15 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_CHRONICLES_FIFTEEN_RAW_NOTES = `# FirstChronicles 15:1-3
# 🏠 David Prepares A Place For The Ark
---
## 🏗️ David Made Him Houses In The City Of David

Houses here refers to more permanent dwellings David built after becoming king.

The city of David was the older fortress section of Jerusalem, captured back in chapter eleven.

Building real houses instead of temporary shelters signaled a settled, secure kingdom.

David had the resources and peace now to build for the long term.

This calm moment sets up the very different mission he is about to attempt again.

🏗️ Houses meant permanent royal buildings
🏰 The city of David was Jerusalem's old fortress
👑 Building showed a settled, secure kingdom
📖 Peace gave David room to plan ahead

---

## ⛺ Prepared A Place For The Ark Of God

David had failed once already to bring the ark home, back in chapter thirteen.

This time he prepares a place first instead of rushing straight into the attempt.

Pitching a tent for it means a temporary shelter, not the tabernacle already standing at Gibeon.

Slowing down to prepare shows David learned something from that earlier failure.

⛺ David pitched a tent for the ark
📦 Chapter thirteen's rushed attempt had failed
🐢 This time he prepared a place first
📖 Preparation replaced David's earlier haste

---

## 🚫 None Ought To Carry The Ark Of God But The Levites

This rule was not new information for David.

God had commanded back in Numbers that only Levites, specifically the Kohathites, could carry the ark.

Chapter thirteen's disaster happened because a new cart carried the ark instead of Levite shoulders.

David finally states plainly what the law had already required all along.

📜 Only Levites could carry the ark
📦 Numbers already commanded this rule
🛒 A cart carried it wrongly in chapter thirteen
📖 David finally states the law plainly

---

## 🙏 David Gathered All Israel Together To Jerusalem

Gathering "all Israel" made this a national event, not a private family errand.

David wanted the whole nation to witness the ark coming home correctly.

The first attempt in chapter thirteen also involved a large crowd.

That crowd was never the actual problem.

Wrong methods were the problem instead.

🇮🇱 All Israel gathered for this event
🎉 This was a national moment for David
📦 Chapter thirteen also gathered a crowd
📖 The method mattered more than the size

# FirstChronicles 15:4-10
# 👥 The Levite Families Assembled
---
## 👨‍👩‍👧‍👦 David Assembled The Children Of Aaron, And The Levites

Aaron's descendants served specifically as priests, a distinct role from the wider tribe of Levi.

Every priest was a Levite, but not every Levite was a priest.

David calls both groups together since bringing up the ark required each one's separate duties.

The list that follows breaks the Levites down by their family divisions.

👨‍👩‍👧‍👦 Aaron's children were the priestly line
📜 Every priest was a Levite
🧩 Levites had separate duties from priests
📖 A family by family list follows

---

## 👑 Uriel The Chief, And His Brethren

Kohath was one of Levi's three sons, alongside Gershom and Merari.

The Kohathites originally carried the ark and the holy furniture, a duty set back in Numbers four.

Uriel served as the chief, the appointed head speaking for this entire family branch.

Listing Kohath first honors the family history most tied to the ark itself.

👑 Kohath was one of Levi's three sons
📦 Kohathites originally carried the ark
🧑‍💼 Uriel led this family as chief
📖 Kohath's history connected directly to the ark

---

## 🏗️ Asaiah The Chief, And His Brethren

Merari was Levi's other son, alongside Kohath and Gershom.

Merari's descendants traditionally carried the tabernacle's heaviest pieces, like the boards, bars, and pillars.

Asaiah led this branch as its chief.

Two hundred twenty men served under him, the largest group named here.

That size matched Merari's demanding work of moving the heaviest gear.

🏗️ Merari's family carried the heaviest gear
🧑‍💼 Asaiah served as their chief
👥 Two hundred twenty men served here
📖 Merari's size matched its demanding work

---

## 🎶 Joel The Chief, And His Brethren

Gershom, also spelled Gershon elsewhere in scripture, was Levi's first son.

Gershom's family traditionally carried the tabernacle's curtains and coverings, lighter than Merari's structural load.

Joel led this branch as its chief.

One hundred thirty men served under him for this part of the work.

🎨 Gershom's family carried the curtains
🧑‍💼 Joel served as their chief
👥 One hundred thirty men served here
📖 Each family carried a different load

---

## 🧬 Shemaiah The Chief, And His Brethren

Elizaphan does not name one of Levi's three original sons.

He was actually a grandson of Kohath, through Kohath's son Uzziel, named back in Exodus six.

Naming Elizaphan's own family separately shows how large the Kohathites alone had grown by David's time.

Shemaiah led this smaller branch, with two hundred men under him.

🧬 Elizaphan was a grandson of Kohath
📜 His line comes through Uzziel
🌳 The Kohathites had grown into sub branches
📖 Two hundred men served under Shemaiah

---

## 🏔️ Eliel The Chief, And His Brethren

Hebron here names a man, one of Kohath's own sons, not the city of the same name.

This Hebron family formed yet another branch within the larger Kohathite line.

Eliel led this group, with eighty men serving under him.

Sharing a name with a famous city did not confuse the record, since context made the meaning clear.

👤 Hebron here names a man, not a city
👑 He was one of Kohath's own sons
🧑‍💼 Eliel led eighty men in this branch
📖 Context kept the shared name clear

---

## 🔟 Amminadab The Chief, And His Brethren

Uzziel was another of Kohath's sons, and Elizaphan's own father from the card above.

This final family branch closes out the full Kohathite roster for this list.

Amminadab led one hundred twelve men in this group.

Six family chiefs and their men together formed the workforce chosen to carry the ark this time.

👤 Uzziel was another son of Kohath
🧑‍💼 Amminadab led one hundred twelve men
🔢 Six family branches make up this list
📖 This whole group would carry the ark

# FirstChronicles 15:11-15
# 🙏 Sanctify Yourselves To Bring Up The Ark
---
## 👔 David Called For Zadok And Abiathar The Priests

Zadok and Abiathar served together as David's two priests during this period of his reign.

Their families later split apart in the political struggle over who would succeed David as king.

Both of them stood united here, before any of that later conflict began.

Calling both by name shows David wanted full priestly authority behind this attempt.

👔 Zadok and Abiathar were David's priests
⚔️ They later split during a succession fight
🤝 Both stood united here for now
📖 David wanted full priestly backing

---

## 🧼 Sanctify Yourselves, Both Ye And Your Brethren

To sanctify means to set oneself apart as clean and ready for something holy.

This likely involved ritual washing and abstaining from anything that would make a person ceremonially unclean.

David directs this command specifically at the Levite chiefs and their whole families.

Nothing about this preparation step happened during the failed first attempt in chapter thirteen.

🧼 Sanctify means becoming ceremonially clean
🚿 It likely involved washing and separation
👨‍👩‍👧‍👦 The whole Levite family was included
📖 This step was missing the first time

---

## 💥 The LORD Our God Made A Breach Upon Us

A breach here means a sudden, violent outburst of judgment.

This points directly back to Uzza's death in chapter thirteen, when he touched the ark on the cart.

David does not blame Uzza alone for what happened.

He includes himself in the blame, saying "upon us," the whole leadership of Israel.

💥 Breach means a sudden burst of judgment
📦 This points back to Uzza's death
🙋 David includes himself in the blame
📖 Leadership owned the earlier failure together

---

## ❌ Because Ye Did It Not At The First

David finally names the actual cause of the earlier disaster out loud.

"It" refers to following God's prescribed method for moving the ark.

Chapter thirteen never mentions this reason directly, only the tragic result.

Naming the real cause here is what makes real correction possible now.

❌ David names the true cause plainly
📦 It refers to God's prescribed method
🔍 Chapter thirteen never explained the reason
📖 Naming the cause enabled real correction

---

## 🔍 We Sought Him Not After The Due Order

Due order refers to the specific instructions God gave for handling the ark, especially in Numbers four.

Those instructions required Kohathite Levites to carry it on their shoulders using poles, never a cart.

Skipping that order was the real mistake, not simply a lack of care or reverence.

Even a well meant plan fails when it ignores God's specific instructions.

📜 Due order means God's specific instructions
🪵 Numbers four required carrying by poles
🛒 A cart had ignored that order
📖 Good intentions do not replace obedience

---

## ✅ The Priests And The Levites Sanctified Themselves

This time, the command from verse twelve is actually obeyed before anything else happens.

Chapter thirteen recorded no such preparation step at all.

Obedience now comes before the ark ever moves, not as an afterthought.

The order of events itself has changed, not just the method of carrying.

✅ The command was obeyed this time
📦 Chapter thirteen skipped this step entirely
🥇 Obedience came before any movement
📖 The whole order of events changed

---

## 🪵 Bare The Ark Of God Upon Their Shoulders With The Staves

Staves were long carrying poles fitted permanently through rings on the ark's sides.

Carrying it on the shoulders with these poles was the exact method God commanded back in Exodus twenty five.

No cart, no oxen, and no shortcut appear anywhere in this description.

The method itself finally matches what God had always required.

🪵 Staves were the ark's fitted carrying poles
👐 Shoulders replaced the earlier cart entirely
📜 Exodus twenty five commanded this method
📖 The method finally matched God's law

---

## 📜 As Moses Commanded According To The Word Of The LORD

This line credits Moses directly, even though Moses had died generations earlier.

Moses himself only wrote down and passed along a command that started with God.

The chain of authority runs from God, to Moses, to this exact moment centuries later.

An old written command still carried full weight for David's generation.

📜 Moses recorded a command from God
⏳ Moses had died generations before this
🔗 Authority ran from God through Moses
📖 Old commands still carried full weight

# FirstChronicles 15:16-21
# 🎺 Singers And Musicians Appointed
---
## 🎶 David Spake To The Chief Of The Levites To Appoint Singers

Music had no formal, appointed role in the failed first attempt back in chapter thirteen.

This time David personally arranges for trained singers before the procession even begins.

Appointing singers through the Levite chiefs kept the music itself under proper priestly order.

Worship here is planned in advance, not left to spontaneous celebration alone.

🎶 David personally arranged for singers
📦 Music was absent from the first attempt
🧑‍💼 Levite chiefs appointed the singers
📖 Worship was planned, not left to chance

---

## 🎻 With Instruments Of Musick, Psalteries And Harps And Cymbals

A psaltery was a stringed instrument similar to a small harp, plucked rather than bowed.

Cymbals provided a sharp, ringing beat that could be heard over a large moving crowd.

These instruments together produced a joyful, layered sound instead of one single tone.

The variety itself matched the size and joy of the whole occasion.

🎻 A psaltery was a small stringed instrument
🥁 Cymbals gave a sharp, carrying beat
🎼 Several instruments layered together
📖 The variety matched the size of the joy

---

## 🎤 Heman The Son Of Joel

Heman led one of the three main singing families named here.

He was a grandson of the prophet Samuel, connecting worship leadership back to Israel's earlier history.

Later in Chronicles, Heman is also called the king's seer, a kind of prophetic advisor.

A single family line could carry both musical and prophetic responsibility.

🎤 Heman led one of the singing families
👴 He was Samuel's grandson
🔮 He is later called the king's seer
📖 Music and prophecy overlapped in his role

---

## 🎤 Asaph The Son Of Berechiah

Asaph led the second of the three singing families.

His name later appears on the titles of twelve different psalms, including Psalm fifty and Psalm seventy three.

His descendants continued as temple musicians for generations after him.

This single appointment launched a musical family line that outlasted David's own reign.

🎤 Asaph led the second singing family
📖 His name titles twelve psalms
👨‍👩‍👧‍👦 His descendants kept serving for generations
➡️ One appointment outlasted David's own reign

---

## 🎤 Ethan The Son Of Kushaiah

Ethan led the third of the three main singing families.

He is likely the same Ethan credited with writing Psalm eighty nine, sometimes called Ethan the Ezrahite there.

Three family lines, not just one gifted individual, carried Israel's worship music forward.

Spreading this responsibility across families protected it from depending on any single person.

🎤 Ethan led the third singing family
🎼 He likely wrote Psalm eighty nine
👨‍👩‍👧‍👦 Three families shared this responsibility
📖 No single person carried it alone

---

## 🎚️ Their Brethren Of The Second Degree

Second degree describes a supporting rank of singers, distinct from the three lead singers just named.

This group is listed by name too, showing that even supporting roles were valued and recorded.

Obededom appears among these names, the same man whose house had safely kept the ark back in chapter thirteen.

His inclusion here rewards a man who had honored the ark quietly, without any public credit before now.

🎚️ Second degree meant a supporting rank
📜 Every supporting name was still recorded
🏠 Obededom appears among this group
📖 His quiet faithfulness was finally rewarded

---

## 🥁 Appointed To Sound With Cymbals Of Brass

Cymbals of brass refers to the loud, high pitched metal instrument used to keep rhythm.

Heman, Asaph, and Ethan, the three lead singers, played this particular instrument themselves.

Cymbals carried the beat that let a large crowd of singers and instruments stay together.

Even the loudest instrument in the procession had a specific, assigned player.

🥁 Cymbals of brass kept the beat
🎤 The three lead singers played them
🔊 The sound anchored the whole procession
📖 Even the loudest role had assigned players

---

## 🎵 With Psalteries On Alamoth

Alamoth likely refers to a higher pitched, treble style of singing or playing.

The exact musical meaning is debated, but it names a specific vocal or instrumental range.

This detail shows the music was arranged with real technical planning, not simply loud noise.

Ancient worship music had structure most modern readers never picture.

🎵 Alamoth likely meant a higher pitch
❓ Its exact meaning is debated today
🎼 The music followed real technical planning
📖 Ancient worship had more structure than assumed

---

## 🎸 With Harps On The Sheminith To Excel

Sheminith likely refers to a lower, deeper octave, the opposite range from Alamoth.

To excel here means to play skillfully, at the very highest level of ability.

Pairing a high range group with a low range group filled out the sound completely.

Worship music was expected to be genuinely excellent, not merely present.

🎸 Sheminith likely meant a lower octave
🏆 To excel meant playing with real skill
🎼 High and low ranges balanced the sound
📖 Worship music was held to a high standard

# FirstChronicles 15:22-24
# 🥁 Directors, Doorkeepers, And Trumpeters
---
## 🧑‍💼 Chenaniah, Chief Of The Levites, Was For Song

Chenaniah held a role something like a modern choir director or conductor.

"Was for song" means his specific job was directing and instructing the singing itself.

The text adds that he was skilful, naming actual musical ability as a qualification for this role.

Even in worship, God's people valued real training and skill, not effort alone.

🧑‍💼 Chenaniah directed the singing itself
🎓 He was chosen for real skill
🎼 His title matched a modern conductor
📖 Skill mattered even in worship roles

---

## 🚪 Berechiah And Elkanah Were Doorkeepers For The Ark

Doorkeepers guarded access to the ark, controlling exactly who could approach it and when.

This role existed because the earlier disaster in chapter thirteen came from someone touching the ark improperly.

Careful boundaries protected both the ark's holiness and the people around it from harm.

A guarded procession looked very different from the unguarded cart of chapter thirteen.

🚪 Doorkeepers controlled access to the ark
📦 Chapter thirteen lacked this protection
🛡️ Boundaries protected the ark and the people
📖 A guarded procession replaced an unguarded one

---

## 📯 The Priests Did Blow With The Trumpets Before The Ark

Trumpets here were straight metal instruments, different from the curved cornet mentioned later in the chapter.

Priests specifically sounded the trumpets, a duty tied back to their unique role in Numbers ten.

Blowing "before the ark" placed the sound at the very front of the entire procession.

Every sound in this procession, not just the singing, had an assigned and ordered place.

📯 Trumpets were straight metal instruments
👔 Priests alone sounded the trumpets
🚶 Trumpets led the very front of the march
📖 Every sound had an ordered place

# FirstChronicles 15:25-29
# 🎉 The Ark Comes Up With Joy And Michal's Contempt
---
## 👴 The Elders Of Israel, And The Captains Over Thousands

David did not process alone, even though he is the one most remembered from this event.

Elders represented the tribal leadership, while captains over thousands represented Israel's military structure.

Bringing both groups together showed the whole nation's leadership standing behind this moment.

This was unified national leadership, not a private royal ceremony.

👴 Elders represented tribal leadership
⚔️ Captains represented Israel's military leaders
🤝 Both stood together for this event
📖 The whole nation's leadership was present

---

## 🏠 Out Of The House Of Obededom

The ark had rested safely in Obededom's house for three months, back in chapter thirteen.

Obededom's household had been blessed the entire time the ark stayed there.

Moving the ark out meant Obededom's household lost the source of that unusual blessing.

Obededom himself is later named among the singers and doorkeepers in this very chapter.

🏠 The ark had rested at Obededom's house
🙏 His household was blessed the whole time
📦 That blessing came from chapter thirteen
📖 Obededom later served among the singers

---

## 🙌 When God Helped The Levites That Bare The Ark

This is the first time God's help is stated so plainly during the actual carrying.

The wording suggests real fear was present, since carrying the ark could still be dangerous if done wrong.

God's help here means nothing went wrong this time, unlike Uzza's death in chapter thirteen.

Doing it the right way did not remove all reverence or risk.

It simply removed disobedience.

🙌 God's help is stated plainly here
😨 The wording suggests real ongoing fear
📦 Nothing went wrong, unlike chapter thirteen
📖 Obedience removed disobedience, not reverence

---

## 🐂 They Offered Seven Bullocks And Seven Rams

Bullocks and rams were both larger, costlier animals than what an ordinary Israelite family would typically sacrifice.

Offering seven of each, fourteen animals total, showed real cost, not a token gesture.

This sacrifice happened mid procession, right after the ark had safely moved a distance without incident.

A costly offering here expressed relief and gratitude, not fear of continued danger.

🐂 Bullocks and rams were costly animals
🔢 Fourteen animals total were offered
🚶 The offering came mid procession
📖 The cost expressed real gratitude

---

## 👘 David Was Clothed With A Robe Of Fine Linen

Fine linen was an expensive, high quality fabric, not the coarse everyday cloth of common people.

Wearing it marked David as royalty, distinct from the ordinary Levites walking beside him.

This detail sets up a contrast with what David wears in the very next line.

David dresses for both his royal role and his personal worship at the same time.

👘 Fine linen was costly, high quality fabric
👑 It marked David's royal status
🚶 Levites walked beside him in this procession
📖 David dressed for two roles at once

---

## 📿 David Also Had Upon Him An Ephod Of Linen

An ephod was normally a garment worn specifically by priests, not by kings.

David wearing one here shows him stepping into an active worship role, alongside his kingship.

This same detail becomes important later, since it explains part of what Michal will criticize.

A king kneeling that low in worship could look, to her eyes, like he had given up his dignity.

📿 An ephod was normally a priestly garment
👑 David wore it alongside his kingship
🙇 It showed him active in worship
📖 This detail sets up Michal's criticism

---

## 📯 All Israel Brought Up The Ark With Shouting

Shouting here describes a loud, joyful public celebration, not disorder or chaos.

"All Israel" repeats a phrase already used earlier in the chapter, framing this as the nation's shared moment.

The failed first attempt in chapter thirteen never reached this kind of celebration at all.

Joy this loud was only possible once obedience finally came first.

📯 Shouting meant joyful celebration, not chaos
🇮🇱 All Israel shared in this moment
📦 Chapter thirteen never reached this joy
📖 Obedience made this celebration possible

---

## 🎺 Sound Of The Cornet, And With Trumpets, And With Cymbals

A cornet was a curved horn, distinct from the straight trumpets already mentioned earlier in the chapter.

Layering several distinct instruments together created a full, overwhelming wall of sound.

This list echoes back to the instruments named earlier for Heman, Asaph, and Ethan's groups.

The procession's sound matched the scale of its joy.

🎺 A cornet was a curved horn
🎼 Several instruments layered together
🔁 This echoes instruments named earlier
📖 The sound matched the scale of the joy

---

## 🪟 Michal The Daughter Of Saul Looking Out At A Window

Michal was David's first wife, and also Saul's own daughter.

Watching from a window kept her physically separate from the public celebration happening outside.

That distance mirrors a deeper distance already growing between her and David.

The whole nation celebrates together while Michal watches alone from above.

🪟 Michal watched from a window alone
👑 She was Saul's daughter and David's wife
📏 Physical distance mirrored emotional distance
📖 The nation celebrated while she watched apart

---

## 💔 She Despised Him In Her Heart

To despise means to view someone with real contempt, not simple annoyance.

Michal's problem was not that David worshipped, but how openly and physically he did it.

As Saul's daughter, she likely still carried her father's more formal, distant view of kingship.

This private contempt becomes a spoken conflict between them in the very next chapter.

💔 Despised means real contempt, not annoyance
🙇 David's open worship offended her
👑 Saul's formal view of kingship shaped her
➡️ This tension breaks into the open next chapter
`.trim();

export const FIRST_CHRONICLES_FIFTEEN_PERSONAL_SECTIONS = parseFirstChroniclesFifteenRawNotes(FIRST_CHRONICLES_FIFTEEN_RAW_NOTES);
