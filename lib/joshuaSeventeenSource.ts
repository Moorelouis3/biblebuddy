export type JoshuaSeventeenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJoshuaSeventeenRawNotes(rawText: string): JoshuaSeventeenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JoshuaSeventeenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Joshua\s+17:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Joshua 17 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Joshua\s+17:/i.test(lines[index].trim())) {
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
        !/^#\s+Joshua\s+17:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Joshua 17 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 17,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Joshua 17:${startVerse}` : `Joshua 17:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Joshua 17 sections, received " + sections.length);
  }

  return sections;
}

const JOSHUA_SEVENTEEN_RAW_NOTES = `# Joshua 17:1-2
# 🌳 Manasseh Begins His Portion
---
## 🌳 For He Was The Firstborn Of Joseph

Manasseh was Joseph's actual oldest son.

Genesis forty eight shows Jacob crossing his hands anyway.

He blessed younger Ephraim with the greater blessing instead.

Joshua sixteen already listed Ephraim's land first, ahead of his older brother.

Birth order never decided who received the bigger promise here.

🌳 Manasseh was Joseph's true firstborn
🙌 Jacob still blessed Ephraim greater
📜 Ephraim's land was listed first
📖 God's choices skip normal birth order

## 🌍 The Father Of Gilead

Machir was Manasseh's son, and Gilead's ancestor.

Father of Gilead does not mean he had one literal son named Gilead.

It means his family line became known as the Gilead clan.

Numbers thirty two already told how Machir's descendants conquered that same region.

A whole territory east of the Jordan carries this one man's name.

🌍 Machir fathered the Gilead clan
🗺️ Gilead became a whole region's name
📜 Numbers already told their conquest
📖 One family's name outlived the man

## ⚔️ Because He Was A Man Of War

Machir did not receive Gilead and Bashan as a random gift.

Numbers thirty two already recorded his family fighting for that land themselves.

They defeated the peoples living there and settled it years before this chapter.

This portion was earned through real battle, not just handed out by lot.

Joshua confirms here what Moses had already promised back then.

⚔️ Machir's family fought for Gilead
📜 Numbers already recorded that battle
🏆 This land was earned, not given
📖 Joshua confirms Moses' old promise

## 🏞️ He Had Gilead And Bashan

Gilead was hilly country east of the Jordan river, good for grazing flocks.

Bashan sat further north, a flat fertile plain famous for its cattle and oak trees.

Both regions already appear earlier in the conquest, when Israel defeated King Og of Bashan.

Machir's family now permanently lived on ground God had already promised through battle.

🏞️ Gilead means good hill pasture
🌾 Bashan means flat fertile plain
🐂 Bashan was famous for fat cattle
📖 Both lands came through an earlier victory

## 👪 These Were The Male Children Of Manasseh

Six grandsons of Machir are named here as the heads of new clans.

Abiezer, Helek, Asriel, Shechem, Hepher, and Shemida each became a family line.

Numbers twenty six already listed this same family tree during the wilderness census.

Every name here traces back to one son, Joseph, through just two more generations.

👪 Six grandsons became named clans
📜 Numbers already listed this family
🌳 One line grew into six
📖 Joseph's name still shapes this list

# Joshua 17:3-6
# 👧 Zelophehad's Daughters Inherit
---
## 👧 Had No Sons, But Daughters

Zelophehad had five daughters and no sons at all.

Normal inheritance law in this culture only passed land through sons.

Numbers twenty seven already told how these daughters asked Moses to change that.

Their request became a real amendment to Israel's inheritance law.

👧 Zelophehad had five daughters only
⚖️ Normal law only passed to sons
📜 Numbers already told their request
📖 Their case changed the actual law

## 📛 These Are The Names Of His Daughters

Mahlah, Noah, Hoglah, Milcah, and Tirzah are named individually here.

Naming all five by name was unusual for women in this culture's records.

This exact list already appeared twice before, in Numbers twenty six and twenty seven.

One daughter shares a name with Noah of the flood.

The two names actually differ in the original Hebrew spelling.

📛 All five daughters are named
📜 That was unusual for this era
🔁 This exact list repeats twice already
📖 Named women mattered in God's record

## ⚖️ Before Eleazar The Priest, And Before Joshua The Son Of Nun, And Before The Princes

The daughters do not go to just one leader with their request.

They bring it before the priest, the top civil leader, and the tribal princes together.

Israel's biggest decisions ran through more than a single authority.

That kind of panel protected against one person's word settling everything alone.

⚖️ Three kinds of leaders heard them
👥 Priest, chief, and princes together
🛡️ No single person decided alone
📖 Big decisions needed real witnesses

## 🤝 The LORD Commanded Moses To Give Us An Inheritance

The daughters do not invent a new request out of nowhere here.

They quote an exact ruling God already gave through Moses in Numbers twenty seven.

Joshua and Eleazar simply honor a decision made under a leader who had already died.

God's law did not change just because the leader changed.

🤝 They quote an existing ruling
📜 Numbers already recorded that ruling
🔁 New leaders still honored old law
📖 God's word outlives any one leader

## 🔟 There Fell Ten Portions To Manasseh

Ten sounds like a random number, but it adds up exactly.

Five brothers' clans, Abiezer, Helek, Asriel, Shechem, and Shemida, each got one share.

That is five portions already.

Zelophehad's five daughters then received a share apiece instead of just one.

Five plus five equals the ten portions named here.

🔟 Ten portions is an exact count
👪 Five brothers' clans each got one
👧 Five daughters split their father's share
📖 Careful math protected everyone's inheritance

## 🌿 The Daughters Of Manasseh Had An Inheritance Among His Sons

This closing line makes the new rule official and permanent.

Daughters counted as real heirs, not just an exception for one family.

The rest of Manasseh's other sons still received the land of Gilead as expected.

Two different inheritance paths land in the very same chapter.

🌿 The rule became fully official
👧 Daughters counted as real heirs
🌳 Other sons still got Gilead
📖 Two paths of inheritance, one chapter

# Joshua 17:7-11
# 🗺️ Manasseh's Border Is Drawn
---
## 🏙️ From Asher To Michmethah, That Lieth Before Shechem

This border line starts near the tribe of Asher and runs toward Michmethah.

Michmethah sat right in front of Shechem, a city already well known by this point.

Abraham built his first altar in this land near Shechem, generations earlier.

Jacob's well and Joseph's future burial place also sit near this same city.

A border marker here quietly touches some of Israel's oldest history.

🏙️ The line runs toward Michmethah
📍 Michmethah sat near Shechem
👴 Abraham's first altar stood nearby
📖 An old border touches old history

## 🍏 Belonged To The Children Of Ephraim

Tappuah itself sat right on the border between two brother tribes.

Manasseh owned the farmland called Tappuah, named in verse eight.

But the actual city of Tappuah belonged to Ephraim instead.

Owning the surrounding fields did not mean owning the city itself.

Even full brothers needed exact lines to avoid future disputes.

🍏 Tappuah sat right on the border
🌾 Manasseh owned the farmland named Tappuah
🏙️ Ephraim owned the actual city
📖 Exact lines prevented future disputes

## 🌊 Unto The River Kanah

Kanah was an actual flowing river, not just a line on a map.

Rivers made natural borders that were hard for anyone to argue with later.

Joshua sixteen already used this same river to mark Ephraim's southern edge.

One river quietly marks both brothers' shared boundary from two different chapters.

🌊 Kanah was a real flowing river
🚧 Rivers made natural, lasting borders
📜 Joshua sixteen already named this river
📖 One river marks a shared boundary

## 🏘️ These Cities Of Ephraim Are Among The Cities Of Manasseh

Ephraim's land was not one single unbroken block on the map.

Some towns that belonged to Ephraim sat physically inside Manasseh's larger territory.

Joshua sixteen already described this same overlap from Ephraim's side of the story.

Two brothers' lands ended up woven together instead of neatly split apart.

🏘️ Ephraim's land was not one block
🌿 Some Ephraim towns sat inside Manasseh
📜 Joshua sixteen described the same overlap
📖 Two brothers' lands stayed woven together

## 🧭 They Met Together In Asher On The North, And In Issachar On The East

Manasseh's border did not stop at just one neighboring tribe.

To the north, it touched the tribe of Asher, closer to the coast.

To the east, it touched Issachar, a tribe settled in a rich farming valley.

One tribe's land quietly connects to several of its neighbors here.

🧭 Manasseh touched more than one tribe
🌊 Asher sat closer to the coast
🌾 Issachar sat in a rich valley
📖 One border connects several neighbors

## 😢 Bethshean And Her Towns

Bethshean sat in a strategic spot where the Jordan valley meets the Jezreel valley.

This city appears again much later in a dark moment for Israel.

After King Saul died in battle, the Philistines hung his body on Bethshean's wall.

A city named quietly in a border list becomes the scene of real tragedy later.

😢 Bethshean sat at a key valley junction
👑 Saul's body was later hung here
📜 First Samuel records that dark moment
📖 A border name points to future tragedy

## 🕵️ The Inhabitants Of Dor And Her Towns

This same verse also names Ibleam, Endor, and Taanach among Manasseh's towns.

Endor is the most famous of these, remembered from a strange night in First Samuel.

Saul secretly visited a medium there to speak with the dead prophet Samuel.

Small towns tucked into a border list can still carry a whole story of their own.

🕵️ Ibleam, Endor, and Taanach are named too
👻 Endor is remembered from First Samuel
🔮 Saul secretly visited a medium there
📖 Small towns can carry big stories

## 🐎 Megiddo And Her Towns, Even Three Countries

Megiddo controlled a narrow mountain pass on a major ancient trade route.

More battles were fought near Megiddo than almost any other city in the land.

Revelation later borrows this city's name for the word Armageddon.

Even three countries simply means these towns formed three separate districts, not three nations.

🐎 Megiddo guarded a key mountain pass
⚔️ Many famous battles happened here
🗺️ Three countries means three districts
📖 Revelation borrows this name later

# Joshua 17:12-13
# ⚠️ The Canaanites Remain
---
## 🚫 Could Not Drive Out The Inhabitants

Manasseh tried to remove the Canaanite cities inside its own borders.

The text says they could not, which raises a real question.

This might mean a lack of strength, or simply a lack of full effort.

Judges chapter one later uses the phrase would not for other tribes in this same situation.

That shift in wording suggests willingness mattered as much as raw ability.

🚫 Manasseh failed to remove these cities
❓ Could not raises a real question
📜 Judges later uses would not instead
📖 Willingness mattered as much as ability

## 📈 Waxen Strong

Waxen is an old word meaning grown or increased.

It is the same root behind describing a waxing moon today.

By the time this verse was written, Israel's population had grown large.

That growth is what finally let them force the Canaanites into labor instead of full removal.

📈 Waxen means grown or increased
🌙 Same root as a waxing moon
👪 Israel's population had grown large
📖 Growth enabled forced labor, not removal

## 👑 Put The Canaanites To Tribute

Tribute here does not mean a gift or a compliment.

It means forced labor, paying Israel through work instead of full removal.

Joshua sixteen already showed Ephraim making this exact same choice with Gezer.

Israel kept choosing control and convenience over the full obedience God had commanded.

👑 Tribute means forced labor here
🔁 Ephraim already made this same choice
⚖️ Israel chose control over full obedience
📖 Convenience replaced complete obedience again

# Joshua 17:14-15
# 😤 Joseph's Tribes Push Back
---
## 😤 Why Hast Thou Given Me But One Lot

Ephraim and Manasseh are technically two separate tribes, not one.

Yet Joshua had measured out land for them as a single combined territory.

This complaint questions why two tribes only received one shared allotment.

It is the first real pushback recorded against Joshua's actual land decisions.

😤 Two tribes got one combined lot
❓ The complaint questions that decision
📜 This is the first real pushback
📖 Even Joshua's choices faced questions

## 🙌 Seeing I Am A Great People, Forasmuch As The LORD Hath Blessed Me

Joseph's descendants lean on their own size as leverage in this complaint.

Forasmuch is an old word meaning since or because.

They are arguing that God's own blessing on them should mean more land.

Blessing and land are not always the same thing, even when it feels that way.

🙌 They point to their large size
📖 Forasmuch means since or because
⚖️ They link blessing directly to land
➡️ Blessing does not always mean more land

## 🪓 Get Thee Up To The Wood Country

Joshua does not simply hand over more land for free.

He tells them to go clear the wooded hill country themselves.

That land was still covered in forest, unready for farming or settling.

His answer is a real challenge, not a flat refusal.

🪓 Joshua points them to forest land
🌲 The wood country was still uncleared
💪 His answer was a real challenge
➡️ Effort was required, not just given

## 🗡️ The Land Of The Perizzites And Of The Giants

The Perizzites were one of the Canaanite peoples already named back in Genesis.

Their name likely comes from a word for open, unwalled villages.

Giants translates a Hebrew word elsewhere linked to the Rephaim, an unusually tall people.

Numbers thirteen describes spies feeling like grasshoppers next to people this size.

Joshua sends them straight into genuinely intimidating territory, not an easy shortcut.

🗡️ Perizzites were an old Canaanite people
🏘️ Their name may mean open villages
🧍 Giants links to the tall Rephaim
📖 Numbers already described their size

# Joshua 17:16-18
# 🔥 Iron Chariots And A Final Answer
---
## ⛰️ The Hill Is Not Enough For Us

Joseph's tribes push back again, right after Joshua's first answer.

Clearing forest alone will not solve their actual problem, they say.

The real obstacle sits in the valley, not up in the hills.

Their second complaint reveals the deeper fear behind the first one.

⛰️ They push back a second time
🌲 Clearing forest was not the real issue
😨 The real danger sat in the valley
➡️ A deeper fear is finally named

## ⚙️ Chariots Of Iron

Iron chariots were an advanced military technology for this time period.

A foot soldier had almost no real defense against a fast moving iron chariot.

This fear was not laziness, it was a genuine and reasonable concern.

Joshua chapter eleven already describes Israel defeating chariots once before, at Hazor.

⚙️ Iron chariots were advanced technology
🏃 Foot soldiers had little real defense
😨 This fear was genuine, not lazy
📖 Israel already beat chariots once, at Hazor

## 🌾 The Valley Of Jezreel

Jezreel was a wide, fertile plain perfect for chariots to move fast.

This same valley becomes the setting for major battles later in the Bible.

Gideon and Deborah both fight critical battles in or near this valley.

A single valley keeps reappearing across generations of Israel's history.

🌾 Jezreel was wide and fertile
🏇 Chariots could move fast there
⚔️ Gideon and Deborah both fought nearby
📖 This valley reappears again and again

## 💪 Thou Art A Great People, And Hast Great Power

Joshua repeats the exact words Joseph's tribes used about themselves earlier.

The first time, it sounded like a complaint about their own share.

Now Joshua uses those same words as real encouragement instead.

The same phrase can carry a very different tone the second time.

💪 Joshua repeats their own words
😤 First it sounded like a complaint
🙌 Now it sounds like encouragement
📖 One phrase, two very different tones

## 🌳 Thou Shalt Not Have One Lot Only

Joshua reverses his earlier answer completely here.

Joseph's tribes will not be limited to their original single portion after all.

Their willingness to work for more land actually changed the final outcome.

Pushing back honestly led to a real, larger answer.

🌳 Joshua reverses his earlier answer
📈 They will get more than one lot
💬 Honest pushback changed the outcome
📖 A larger answer followed real effort

## 🛡️ Though They Have Iron Chariots, And Though They Be Strong

The chapter ends by naming the exact fear one more time.

Iron chariots and real strength do not cancel God's earlier promise.

Joshua eleven already showed these same weapons losing to Israel before.

The chapter closes on confidence in God's power, not in Canaanite weapons.

🛡️ The fear gets named one more time
⚙️ Iron chariots do not cancel the promise
📜 Joshua eleven already showed a win
📖 The chapter closes on God's power
`.trim();

export const JOSHUA_SEVENTEEN_PERSONAL_SECTIONS = parseJoshuaSeventeenRawNotes(JOSHUA_SEVENTEEN_RAW_NOTES);
