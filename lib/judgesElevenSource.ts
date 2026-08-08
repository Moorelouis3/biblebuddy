export type JudgesElevenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJudgesElevenRawNotes(rawText: string): JudgesElevenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JudgesElevenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Judges\s+11:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Judges 11 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Judges\s+11:/i.test(lines[index].trim())) {
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
        !/^#\s+Judges\s+11:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Judges 11 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 11,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Judges 11:${startVerse}` : `Judges 11:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Judges 11 sections, received " + sections.length);
  }

  return sections;
}

const JUDGES_ELEVEN_RAW_NOTES = `
# Judges 11:1-3
# 🗡️ Jephthah Is Cast Out
---
## 🗺️ Jephthah The Gileadite

Gileadite means Jephthah came from Gilead, the hill region east of the Jordan River.

His name likely means God Opens.

That meaning becomes real later, when God opens a door no one else could.

A man from a rough border land is about to lead all of Israel.

🗺️ Gileadite means from the region of Gilead
📖 Jephthah likely means God Opens
⚔️ He rises from a rough border land
➡️ God opens the very door his name promises

## 💪 A Mighty Man Of Valour

This title marks Jephthah as a proven fighter before the story even begins.

The same phrase describes other great warriors elsewhere in the Old Testament.

It explains why desperate elders will later come looking for exactly this man.

His skill was already known long before his own family gave him a place.

💪 Valour marks him as a proven fighter
📖 The same title describes other great warriors
🎯 It explains why the elders seek him
➡️ His skill came before any family place

## 🚫 The Son Of An Harlot

Harlot means a woman who sold herself for sex outside of marriage.

That single fact becomes the reason his brothers will reject him in the next verse.

Jephthah did not choose his birth, only how he answered it.

⚖️ Harlot means a woman paid for sex
👶 This one fact defines his family's treatment
🚪 Jephthah never chose the circumstances of his birth
➡️ He still chose how he answered it

## 👨‍👦 Gilead Begat Jephthah

Gilead here is not only the region but also a man, Jephthah's own father.

The same name covers both the land and the person who fathered him on it.

Naming the father this plainly ties Jephthah's whole identity to this one troubled place.

👨‍👦 Gilead names both the region and the father
🗺️ One name covers the land and the man
🔗 Jephthah's identity is tied to this place
📖 A troubled birth still gets a full record

## 🚪 They Thrust Out Jephthah

Thrust out means his half brothers physically drove him from his father's house.

Under the custom of the time, a mother's status shaped a son's right to inherit.

Because his mother was a harlot, the brothers claimed he had no legal share.

🚪 Thrust out means driven out by force
⚖️ A mother's status shaped inheritance rights
🏠 The brothers claimed he had no legal share
➡️ Family loyalty gave way to property

## 🌍 The Son Of A Strange Woman

Strange here does not mean odd, it means foreign or outside the family line.

This is a slightly different charge than harlot, aimed at where Jephthah's mother came from.

Two separate insults, birth and origin, are stacked together to justify pushing him out.

🌍 Strange means foreign, not odd
🎯 This targets where his mother came from
🧱 Two insults stack together against Jephthah
➡️ Both were used to justify exile

## 🏕️ Dwelt In The Land Of Tob

Tob was a region northeast of Gilead, likely outside Israel's own borders.

Fleeing there meant Jephthah left his people entirely, not just his father's house.

An outcast with nowhere left inside Israel still had to build a life somewhere.

🏕️ Tob sat northeast, likely outside Israel
🚶 Jephthah left his whole people
🌍 An outcast still needed somewhere to live
➡️ Exile pushed him past Israel's own border

## ⚔️ Vain Men Gathered To Him

Vain men means reckless or worthless fellows, men with nothing left to lose.

Outcasts and fighters without a home gathered around Jephthah and followed him out.

A similar band later gathers around David when he too is on the run.

⚔️ Vain men means reckless fellows
🏕️ Homeless outcasts gathered around Jephthah
🔁 David later gathers a similar band
📖 God often starts with rejected men

# Judges 11:4-11
# 🤝 Gilead Begs Jephthah To Lead
---
## 😨 The Children Of Ammon Made War Against Israel

This same line appears twice in a row, once here and once in verse five.

Repeating it signals real, growing danger rather than a passing threat.

The crisis Israel ignored back in chapter ten has finally arrived at Gilead's door.

😨 The line repeats twice on purpose
📈 Repetition signals real, growing danger
⏳ The ignored crisis has now arrived
➡️ Gilead can no longer look away

## 👴 The Elders Of Gilead

Elders were the older men who led each town and tribe by experience and standing.

They carried real authority to speak for the whole region in a crisis.

These are the very leaders whose family once let Jephthah be thrown out.

👴 Elders led by age and standing
🗣️ They could speak for the whole region
🔗 They once allowed Jephthah's exile
➡️ Now they need him back

## 🚶 Went To Fetch Jephthah Out Of Tob

Fetch means the elders traveled to Tob themselves to bring Jephthah back.

The same family line that pushed him out now personally comes looking for him.

Desperation reversed years of rejection in a single journey.

🚶 The elders traveled to Tob themselves
🔄 The same line now seeks him
⏳ Years of rejection reversed in one trip
➡️ Desperation moved what family loyalty never did

## 🎖️ Be Our Captain

Captain is a military title, naming Jephthah as the one who leads the fighting.

It is a smaller offer than the full leadership title used later in verse eight.

The elders start small, asking only for his sword, not yet his rule.

🎖️ Captain names a military leader
📏 A smaller title than what comes later
🗡️ The elders first ask only for his sword
➡️ Full leadership is not yet on the table

## 🗣️ Did Not Ye Hate Me, And Expel Me

Jephthah answers their request with a direct question, not silence or quick agreement.

Expel repeats the same idea as thrust out from verse two.

He forces the elders to say out loud what they did to him.

🗣️ Jephthah answers with a direct question
🔁 Expel echoes thrust out from verse two
🪞 He makes them name their own past choice
➡️ Honesty comes before any agreement

## ⏳ Now When Ye Are In Distress

Jephthah points out that the elders only remember him once trouble arrives.

Distress names the real, crushing pressure Ammon's war has already caused.

His question exposes convenience, not real change of heart, behind their visit.

⏳ They remember him only in trouble
😖 Distress names real, crushing pressure
🔍 His question exposes convenience, not change
➡️ Real reconciliation still has to be earned

## 👑 Be Our Head Over All The Inhabitants Of Gilead

Head is a bigger word than captain, naming full rule over the whole region.

Facing Jephthah's pushback, the elders raise their offer instead of walking away.

They now promise lasting authority, not just command during one single battle.

👑 Head means full rule, not just command
📈 The elders raise their offer under pressure
🏛️ Lasting authority is now on the table
➡️ Jephthah's honesty earned a bigger promise

## ❓ Shall I Be Your Head

Jephthah does not simply accept the new offer, he asks for a firm guarantee.

He wants a clear condition tied to God's own victory, not a vague promise.

A man once thrown out now negotiates carefully instead of rushing to please them.

❓ Jephthah asks for a firm guarantee
🎯 He ties the deal to God's victory
🧠 He negotiates instead of rushing to accept
➡️ A rejected son now sets the terms

## 🙏 The LORD Be Witness Between Us

Calling the LORD as witness turned this agreement into a binding, sacred promise.

It was not just a handshake between two parties who might later break their word.

Breaking a vow made this way was treated as sin against God himself.

🙏 The LORD as witness made this binding
🤝 It was more than a simple handshake
⚖️ Breaking it meant sinning against God
📖 Sacred oaths carried real, lasting weight

## 👑 The People Made Him Head And Captain

Both titles are now given together, combining full rule with full military command.

This happens publicly, before the whole people, not privately among the elders alone.

The very man once cast out now holds the highest position in Gilead.

👑 Both titles are granted together
👥 The people, not just elders, confirm it
🔄 The outcast now holds the highest place
📖 God often lifts up who others reject

## 🕍 Uttered All His Words Before The LORD In Mizpeh

Mizpeh means watchtower, the same site named back at the end of chapter ten.

Uttering his words there sealed the agreement as an oath made in God's presence.

What began as a family's rejection ends this scene as a covenant before God.

🕍 Mizpeh means watchtower
🔗 It is the same site from chapter ten
🙏 His words there sealed the deal before God
📖 Rejection became a covenant before the LORD

# Judges 11:12-15
# 📜 Jephthah Sends Word To Ammon
---
## 📨 Sent Messengers Unto The King

Sending messengers before battle was standard practice across the ancient Near East.

A formal challenge gave the other side a chance to explain or back down first.

Jephthah tries diplomacy before he ever raises a weapon.

📨 Messengers were sent before any battle
🕊️ It let the enemy back down first
🗡️ Jephthah tries words before weapons
➡️ Diplomacy comes first, not last

## ❓ What Hast Thou To Do With Me

This exact question appears elsewhere in the Bible as a way to say leave me alone.

Jephthah is not asking out of confusion, he already knows Ammon has no real claim.

The question puts the burden of proof on Ammon's king to explain himself.

❓ This phrase means leave me alone elsewhere too
🎯 Jephthah already doubts Ammon's claim
⚖️ It puts the burden on Ammon to explain
➡️ Words come before any fighting begins

## 🗺️ From Arnon Even Unto Jabbok, And Unto Jordan

Arnon and Jabbok were rivers marking the northern and southern edges of this land.

Naming all three landmarks together defines the exact territory Ammon is claiming.

Jephthah will spend the rest of his speech proving this claim is false.

🗺️ Arnon and Jabbok mark the land's edges
📍 Three landmarks define the exact territory
⚖️ Ammon claims all of it belongs to them
➡️ Jephthah is about to prove that wrong

## 🏳️ Restore Those Lands Again Peaceably

Peaceably is the king's own word, offering to avoid war if Israel simply gives up land.

The offer sounds reasonable only if his version of history is true.

Jephthah's whole reply will show that it is not.

🏳️ Peaceably was the king's own offer
🎭 It sounds fair only if his history holds
📜 Jephthah is about to test that claim
➡️ A peaceful offer built on a false claim

## 🚫 Israel Took Not Away The Land Of Moab, Nor The Land Of The Children Of Ammon

Jephthah flatly denies the king's whole accusation before giving any proof.

He names Moab and Ammon separately, refusing to let the two claims blur together.

The rest of his message will lay out exactly what did happen instead.

🚫 Jephthah denies the accusation outright
🎯 Moab and Ammon are named separately
📜 A full explanation is about to follow
➡️ A flat denial opens his defense

# Judges 11:16-22
# 🐫 Jephthah Retells The Exodus Journey
---
## 🌊 Walked Through The Wilderness Unto The Red Sea

Jephthah begins his defense with real history, not just an opinion.

He retraces the same Exodus journey every Israelite would already know by heart.

Starting with facts everyone agrees on makes the rest of his case harder to deny.

🌊 Jephthah starts with shared, known history
🐫 He retraces the Exodus journey itself
🧠 Shared facts make his case harder to deny
➡️ A strong argument starts with common ground

## 🏕️ Came To Kadesh

Kadesh, also called Kadeshbarnea, was a key stop where Israel camped for a long stretch.

It became the starting point for the journey around Edom and Moab that follows.

Naming it grounds the whole story in a real, known place.

🏕️ Kadesh was a major Israelite camp
🧭 It starts the journey around Edom and Moab
📍 A real place grounds the whole story
📖 Israel's history was not vague legend

## 🚶 Let Me Pass Through Thy Land

Requesting passage was the normal, polite way to cross another nation's territory.

Israel did not simply march through by force the first chance it got.

This custom matters because Jephthah is about to contrast it with what Ammon claims.

🚶 Requesting passage was the normal custom
🕊️ Israel did not force its way through
⚖️ This sets up a direct contrast ahead
➡️ Politeness came before any conflict

## 🙅 Would Not Hearken, Would Not Consent

Both Edom and Moab refused Israel's polite request to simply pass through.

Israel accepted both refusals and did not attack either nation in response.

That restraint directly disproves any claim that Israel just took land by force.

🙅 Both Edom and Moab said no
🕊️ Israel accepted their refusal peacefully
⚖️ This disproves any claim of forced conquest
📖 Restraint here matters for the whole argument

## 🧭 Compassed The Land Of Edom, And The Land Of Moab

Compassed means Israel walked all the way around these lands instead of through them.

A long detour was the cost of respecting a neighbor's borders.

Jephthah is building a careful, verifiable record, not a vague excuse.

🧭 Compassed means walked all the way around
⏳ A long detour respected both borders
📜 Jephthah builds a careful, checkable record
➡️ Respect cost Israel real time and distance

## 🏞️ Arnon Was The Border Of Moab

This single fact is the hinge of Jephthah's entire legal argument.

If Arnon marked Moab's true edge, then Israel never crossed into Moab's own land.

Everything Israel later took came from beyond that river, not from inside it.

🏞️ Arnon marked Moab's true border
🔗 This fact is the hinge of his case
📏 Israel's land lay beyond that river
📖 One clear boundary answers the whole dispute

## 👑 Sihon King Of The Amorites, The King Of Heshbon

Sihon ruled the Amorites from his capital city, Heshbon.

He is a completely different ruler than the king of Ammon Jephthah is addressing now.

Introducing Sihon by name sets up exactly whose land is really in question.

👑 Sihon ruled the Amorites from Heshbon
🔀 He is not the same as Ammon's king
🎯 His name sets up the real dispute
➡️ The wrong nation is being blamed

## ⚔️ Sihon Trusted Not Israel

Unlike Edom and Moab, Sihon did not simply refuse and let Israel walk on.

He gathered his own army and attacked Israel first, at a place called Jahaz.

Sihon started this fight, which becomes central to who legally owns the land after.

⚔️ Sihon attacked first, unlike Edom or Moab
📍 The battle happened at Jahaz
🎯 Sihon, not Israel, started this conflict
➡️ Who struck first shapes who owns the land

## 🙌 The LORD God Of Israel Delivered Sihon

Jephthah credits God directly for the victory, not Israel's own military strength.

This keeps the conquest from looking like simple human land grabbing.

The land changed hands because God gave it, after Sihon attacked first.

🙌 God gets credit for the victory
🛡️ This was not simple land grabbing
⚔️ Sihon attacked before the land changed hands
📖 God's gift, not conquest alone, explains it

## 🗺️ From Arnon Even Unto Jabbok

This is the exact territory named back in Ammon's own demand in verse thirteen.

Jephthah proves Israel took this land from Sihon and the Amorites, never from Ammon.

The king's whole complaint has now been answered point by point.

🗺️ This matches Ammon's own claim in verse thirteen
⚔️ The land came from Sihon, not Ammon
✅ Jephthah has now answered the complaint fully
📖 Careful history dismantles a false claim

# Judges 11:23-28
# ⚖️ Jephthah's Case Is Rejected
---
## 🗺️ Dispossessed The Amorites

Dispossessed means God drove the Amorites out and gave their land to Israel.

Jephthah frames this as God's own act, not simply a human military victory.

If God gave the land, then Ammon has no valid claim to take it back now.

🗺️ Dispossessed means driven out by God
🙌 This was God's act, not just Israel's
⚖️ Ammon has no valid claim to it
➡️ God's gift settles the question

## 🗿 Chemosh Thy God

Chemosh was the national god worshiped by Moab, and here linked to Ammon's king as well.

Jephthah is not saying Chemosh is real, he is using the king's own logic against him.

If Chemosh can give land to his people, the king must also accept the LORD's gift to Israel.

🗿 Chemosh was Moab's national god
🎯 Jephthah uses the king's own logic
⚖️ Both gods, by that logic, gave land
📖 The comparison exposes the claim's own weakness

## 🙌 Whomsoever The LORD Our God Shall Drive Out

Jephthah names the LORD directly, not Chemosh, as the one Israel actually serves.

This is Jephthah arguing on the king's own terms, not endorsing other gods as real.

The land Israel holds came from the one true God, not from any rival deity.

🙌 Jephthah names the LORD as Israel's God
🎯 He argues on the king's own terms
🚫 This does not endorse Chemosh as real
📖 Israel's land came from the true God

## 👑 Balak The Son Of Zippor

Balak was an earlier king of Moab, remembered from the story of Balaam in Numbers.

Balak tried to curse Israel through Balaam instead of attacking with an army.

Jephthah points out that even Balak never dared to fight Israel outright.

👑 Balak was an earlier king of Moab
🔮 He tried to curse Israel through Balaam
🚫 Even Balak never attacked Israel directly
➡️ This king goes further than Balak dared

## 📆 Three Hundred Years

Three hundred years is how long Israel had already lived in this land unchallenged.

That length of time functioned like a legal claim of ownership by long possession.

Waiting three centuries to suddenly demand the land back weakens the king's case badly.

📆 Israel held this land three hundred years
⚖️ Long possession worked like a legal claim
🕰️ Ammon waited centuries to raise this demand
📖 Time itself argues against the king's claim

## ⚖️ The LORD The Judge Be Judge This Day

Jephthah closes his message by handing the whole dispute over to God himself.

The wordplay is deliberate, calling on the Judge to judge between the two nations.

Having laid out every fact, Jephthah now lets God decide what happens next.

⚖️ Jephthah hands the dispute to God
🗣️ The wordplay names God as Judge
📜 Every fact has already been laid out
📖 God is left to decide the outcome

## 🙉 Hearkened Not Unto The Words Of Jephthah

Despite a careful, fact based argument, the king of Ammon simply refuses to listen.

This shows the war was never really about land in the first place.

Jephthah's diplomacy has failed, and the only path left now leads to battle.

🙉 The king refuses to listen anyway
🎭 The dispute was never really about land
🚪 Diplomacy has now failed completely
➡️ Only battle remains as the next step

# Judges 11:29-33
# 🗡️ The Vow And The Victory
---
## 🕊️ The Spirit Of The LORD Came Upon Jephthah

This same phrase marks other judges right before God empowers them for a specific task.

It shows Jephthah's coming victory rests on God's power, not his own skill alone.

Everything that follows in this section flows out of this one moment.

🕊️ This phrase marks God's empowering
⚔️ Victory rests on God's power, not skill alone
🔗 Other judges receive this same marking
📖 God equips before the battle begins

## 🚶 Passed Over Gilead, And Manasseh

Jephthah moves through his own region and into the territory of Manasseh to gather troops.

This journey shows him mustering forces from a wider area than just his own home ground.

Passing through Mizpeh of Gilead again ties this march back to where he was made head.

🚶 Jephthah gathers troops across two regions
🗺️ Manasseh joins Gilead in the muster
🔗 The march passes back through Mizpeh
➡️ A wider army answers the coming fight

## 🙏 Vowed A Vow Unto The LORD

Making a vow meant promising God something specific in exchange for a specific outcome.

Vows were taken seriously in Israel and were never meant to be spoken lightly.

Jephthah is about to make one of the most costly vows in the whole Bible.

🙏 A vow was a serious promise to God
⚖️ Vows were never meant to be casual
📜 Jephthah is about to make a costly one
➡️ Words spoken to God carried real weight

## 🚪 Whatsoever Cometh Forth Of The Doors Of My House

Jephthah promises to sacrifice whatever first comes out of his house to greet him.

He likely pictured an animal, since livestock were often kept near a family home.

The vow's open wording leaves no room to take it back later, whatever appears.

🚪 He promises whatever exits his house first
🐐 He likely expected an animal to appear
📜 The open wording allows no exceptions
➡️ A careless promise leaves no way out

## 🔥 I Will Offer It Up For A Burnt Offering

A burnt offering was completely consumed by fire and given wholly to God.

The law of Moses forbids human sacrifice, which makes this vow especially troubling.

Jephthah's rash words are about to collide with what he actually finds at his door.

🔥 A burnt offering was fully consumed by fire
🚫 The law of Moses forbids human sacrifice
⚠️ Jephthah's vow was troubling before he even fights
➡️ His own words will soon confront him

## 🗺️ From Aroer, Even Till Thou Come To Minnith

Aroer and Minnith mark the range of this campaign, a full twenty separate cities.

That wide sweep shows a decisive, sweeping military victory, not a small border skirmish.

Jephthah has now delivered exactly what he promised the elders back in Mizpeh.

🗺️ Aroer and Minnith mark the campaign's range
🏘️ Twenty cities fell in this sweep
🏆 This was a decisive, sweeping win
📖 Jephthah delivers exactly what he promised

## 🏳️ Thus The Children Of Ammon Were Subdued

Subdued means Ammon's threat to Israel has now been fully ended.

This closes out the military conflict that opened this entire chapter.

The next scene shifts sharply from victory on the battlefield to grief at home.

🏳️ Subdued means Ammon's threat is ended
✅ The chapter's opening conflict is resolved
🔀 The story now shifts sharply toward home
➡️ Victory abroad is about to cost him dearly

# Judges 11:34-36
# 💔 His Daughter Comes Out To Meet Him
---
## 🎶 Came Out To Meet Him With Timbrels And With Dances

Greeting a victorious warrior with music and dancing was a joyful, public custom.

Miriam led women this same way after Israel crossed the Red Sea.

The reader already knows what Jephthah vowed, so this joyful scene turns instantly to dread.

🎶 Music and dancing greeted victorious warriors
🔗 Miriam led a similar celebration earlier
😱 The reader already knows the vow
➡️ Joy turns instantly to dread

## 👧 She Was His Only Child

The text repeats the point twice, he had neither son nor daughter besides her.

This detail makes clear the vow will cost Jephthah everything he has left.

There is no other child to soften what is about to happen.

👧 She was his one and only child
🔁 The text repeats this point twice
💔 The vow now costs him everything
➡️ No other child could soften this loss

## 👕 He Rent His Clothes

Tearing one's garments was a common, visible act of grief and shock in this culture.

The physical act let others see his sorrow before he said a single word.

His daughter's own celebration has instantly collided with the promise he cannot undo.

👕 Rending clothes showed grief openly
👀 Others could see his sorrow at once
💥 Celebration collides with an unbreakable vow
📖 Grief here needed no words at first

## 🔒 I Have Opened My Mouth Unto The LORD, And I Cannot Go Back

Once spoken, a vow to God in this culture could not simply be undone.

Jephthah is not looking for a loophole, he treats his word as fully binding.

His daughter's response in the next verse will show she agrees completely with him.

🔒 A spoken vow could not be undone
📜 Jephthah treats his word as binding
🙅 He is not searching for a loophole
➡️ His daughter's answer will match his own resolve

# Judges 11:37-40
# 🏔️ The Vow Is Fulfilled
---
## 😢 Bewail My Virginity

In this culture, a woman's identity was deeply tied to marriage and having children.

Dying unmarried meant her family line would end with her, with no children to remember her.

She asks to mourn that loss before the vow is carried out.

😢 Her identity was tied to marriage and children
🔚 Her family line would end with her
⏳ She asks to mourn this loss first
📖 Even her grief centers on what is lost

## 👭 I And My Fellows

Fellows here means her close female friends and companions.

Grief in this culture was rarely carried alone, it was shared in community.

Her friends walk with her through the very last weeks of her life.

👭 Fellows means her close female friends
🤝 Grief was carried in community, not alone
🚶 Her friends walk these final weeks with her
➡️ No one grieves this loss by herself

## 🗓️ Two Months

Two months was the exact window Jephthah's daughter requested and received.

That length of time gave her space to fully grieve before anything else happened.

Every day of it was spent knowing exactly how the story would end.

🗓️ Two months was the requested window
⏳ It gave her time to fully grieve
😔 Every day carried the same known ending
➡️ Grief here was long and deliberate

## 🔥 Did With Her According To His Vow Which He Had Vowed

The text does not spell out plainly whether Jephthah offered his daughter as a literal sacrifice.

Many scholars believe the text describes a literal burnt offering, following the vow's own wording.

Other scholars believe she was instead set apart to remain unmarried the rest of her life.

The text itself leaves the exact outcome carefully unstated either way.

🔥 The text does not spell out every detail
📜 Many scholars read this as a literal offering
🕊️ Others read it as lifelong dedication
📖 Scripture leaves the exact outcome unstated

## 🌿 She Knew No Man

This phrase means she died, or lived out her life, without ever marrying.

It connects directly back to the mourning over her virginity two verses earlier.

Whatever exactly happened, her story ends the same way it began, with loss.

🌿 This phrase means she never married
🔗 It connects back to her earlier mourning
💔 Her story ends the way it began
➡️ Loss frames both the start and the end

## 📅 The Daughters Of Israel Went Yearly To Lament

This yearly custom shows the whole community remembered her, not just her own father.

Lament here means a formal, repeated season of mourning, four days every single year.

A story that began with one rejected man's vow becomes a permanent, shared memory for Israel.

📅 A yearly custom formed to remember her
😢 Lament means formal, repeated mourning
👥 The whole community shared this memory
📖 One vow shaped how Israel remembered her
`.trim();

export const JUDGES_ELEVEN_PERSONAL_SECTIONS = parseJudgesElevenRawNotes(JUDGES_ELEVEN_RAW_NOTES);
