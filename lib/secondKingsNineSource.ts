export type SecondKingsNinePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsNineRawNotes(rawText: string): SecondKingsNinePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsNinePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsNine\s+9:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 9 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsNine\s+9:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsNine\s+9:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 9 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 9,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 9:${startVerse}` : `2 Kings 9:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 9) {
    throw new Error("Expected 9 2 Kings 9 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_NINE_RAW_NOTES = `# SecondKingsNine 9:1-6
# 🏺 Elisha Sends A Young Prophet To Anoint Jehu
---
## 🏃 Gird Up Thy Loins

Gird up thy loins means tuck the long robe into the belt to move fast.

Ancient robes trailed to the ankles and slowed a person down.

Tucking the hem up freed the legs for running or hard travel.

Elisha is telling this young man the mission cannot wait.

🏃 Girding up meant tucking the robe up
👘 Long robes normally slowed travel
⏰ Elisha wanted speed, not delay
📖 The mission was urgent from the start

---

## 🫙 Take This Box Of Oil In Thine Hand

This box was a small flask, not a large jar.

Oil poured from it marked a person as chosen by God for a role.

Kings and priests were anointed with oil this same way earlier in the Old Testament.

Carrying it secretly kept the mission hidden from Joram's own officers.

🫙 The box was a small flask
👑 Oil marked someone as chosen
📜 Kings were anointed this same way
📖 Secrecy protected the whole plan

---

## 🗺️ Go To Ramothgilead

Ramothgilead was the border fortress city fought over in the previous chapter.

Joram had been wounded there in battle against Hazael of Syria.

The army Jehu commands is still camped at that same city.

Sending the young man there put him right inside Israel's own military camp.

🗺️ Ramothgilead was the border fortress
🩹 Joram was wounded there
⚔️ Jehu's army still camped there
📖 The mission entered a military camp

---

## 👦 The Young Man, Even The Young Man The Prophet

The text repeats "the young man" twice in one short sentence.

Repetition like this in the Bible usually adds emphasis, not extra information.

Someone young and low in status is carrying a message that decides the next king.

God's biggest announcements do not always arrive through the most important looking person.

👦 The phrase repeats on purpose
📢 Repetition adds emphasis in the Bible
🎯 A young messenger carries huge news
📖 God often uses unlikely messengers

---

## 👦 One Of The Children Of The Prophets

The children of the prophets were young men trained under a senior prophet like Elisha.

They lived, studied, and served together, much like students under a teacher.

This same group appears earlier helping Elisha with the floating axe head in chapter six.

Elisha sends a trusted student rather than going to the war camp himself.

👦 They trained under Elisha directly
🏘️ They lived and studied together
🪓 The same group appears in chapter six
📖 Elisha sent a trusted student

---

## 🚪 Carry Him To An Inner Chamber

The other captains were sitting together when the young man arrived.

Pulling Jehu away into a private inner room kept the anointing hidden.

If the other officers heard the message, Jehu's life would be in immediate danger.

Privacy here was not caution, it was survival.

🚪 The room was pulled away from the group
🙊 Hiding the message protected Jehu
⚠️ Discovery would have meant danger
📖 Privacy here meant survival

---

## 👑 I Have Anointed Thee King Over Israel

This command actually traces back to 1 Kings 19, given first to Elijah.

God told Elijah to anoint Jehu as king long before this scene took place.

Elijah's ministry ended before he carried out that specific instruction.

Elisha, his successor, finally sends someone to complete the assignment.

📜 The command dates back to 1 Kings 19
👤 Elijah received it first
⏳ Elijah never carried it out
📖 Elisha finally completes the assignment
# SecondKingsNine 9:7-10
# ⚖️ The Prophecy Against The House Of Ahab
---
## 🩸 Avenge The Blood Of My Servants The Prophets

Jezebel had ordered many of the LORD's prophets killed years earlier in 1 Kings 18.

Obadiah managed to hide and save a hundred of them at great personal risk.

That slaughter never received justice under Ahab or under his son Joram.

Jehu's new throne comes with a specific job attached to it.

🩸 Jezebel killed prophets years earlier
🙈 Obadiah hid a hundred of them
⚖️ That crime was never punished
📖 Jehu's throne comes with a task

---

## 🧱 Him That Pisseth Against The Wall

This blunt KJV phrase simply means every male in the family line.

It was a common ancient way of saying every last man, without exception.

The judgment is not aimed at one guilty person alone.

It targets Ahab's entire male household, down to the last member.

🧱 The phrase means every male
🗣️ It was a common ancient expression
👪 It covers the whole male line
📖 No male in the family is spared

---

## 🔒 Him That Is Shut Up And Left In Israel

This phrase covers anyone the first phrase might have missed.

Together the two phrases leave no loophole in the sentence.

Hiding away or being too weak to matter offers no protection here.

The judgment on Ahab's house is total, not partial.

🔒 This phrase closes any gap
🧩 Together the phrases cover everyone
🙅 Hiding offers no escape
📖 The judgment is total

---

## 🏚️ Like The House Of Jeroboam The Son Of Nebat, And Like The House Of Baasha The Son Of Ahijah

Jeroboam and Baasha were two earlier kings of Israel whose entire families were wiped out.

Their stories are told back in 1 Kings 15 and 1 Kings 16.

Both men led Israel into idolatry, and both dynasties ended in complete destruction.

Ahab's family now faces the exact same pattern for the exact same sin.

🏚️ Jeroboam and Baasha lost their dynasties
📜 Both stories are in 1 Kings
🛐 Both led Israel into idolatry
📖 Ahab's house repeats their pattern

---

## 🐕 The Dogs Shall Eat Jezebel In The Portion Of Jezreel

Dogs in this culture were not pets, they were despised scavengers.

Being eaten by dogs instead of properly buried was the ultimate public dishonor.

This single line is a specific prophecy that will be fulfilled later in this same chapter.

The prophecy names Jezebel directly, not just Ahab's household in general.

🐕 Dogs were despised scavengers
💀 This was the ultimate dishonor
🔮 This exact prophecy returns later
📖 Jezebel is named directly here

# SecondKingsNine 9:11-13
# 📯 The Captains Proclaim Jehu King
---
## 🙄 This Mad Fellow

The officers use this insult before they even know what the young man said.

Prophets sometimes acted or spoke in ways that looked strange to outsiders.

Ecstatic, urgent behavior from a prophet was often mocked rather than respected.

Their contempt for the messenger is about to look very foolish.

🙄 The officers mock him instantly
🗣️ Prophets often looked strange to outsiders
😏 Their behavior was often mocked
📖 Their contempt will not last long

---

## 🤐 Ye Know The Man, And His Communication

Jehu tries to dodge the question rather than repeat what he just heard.

He is not ready yet to say the word king out loud.

The captains do not accept the vague answer and press him further.

Jehu's hesitation shows the weight of what he was just told.

🤐 Jehu avoids repeating the message
🙊 He is not ready to say king
❓ The captains press him further
📖 His hesitation shows the weight of it

---

## ❗ It Is False, Tell Us Now

The captains refuse to accept Jehu's vague, evasive answer.

They sense something important is being held back from them.

Their demand forces Jehu to finally say what Elisha's messenger told him.

One firm question turns a private secret into a public announcement.

❗ The captains reject the vague answer
🔍 They sense something is hidden
💬 Their demand forces Jehu to speak
📖 One question makes the secret public

---

## 👘 Took Every Man His Garment, And Put It Under Him

Spreading garments on the ground was a way of honoring someone as royalty.

The stairs became an improvised throne with no time to build anything formal.

This spontaneous gesture shows how ready the army already was for this news.

Centuries later, people would spread garments before Jesus in the very same way.

👘 Garments on the ground honored royalty
🪜 The stairs became an improvised throne
⚡ The army was ready instantly
📖 The same gesture later honors Jesus

---

## 📯 Blew With Trumpets, Saying, Jehu Is King

Trumpets in ancient Israel announced major public events, including new kings.

The sound made this proclamation impossible to keep quiet or take back.

What began as one private anointing became a public coronation within minutes.

Jehu's reign starts with the whole army already behind him.

📯 Trumpets announced major public events
🔊 The news could no longer be hidden
⚡ A private act became public fast
📖 Jehu started with the army's backing

# SecondKingsNine 9:14-16
# 🐎 Jehu Rides Toward Jezreel
---
## 🗡️ Conspired Against Joram

To conspire means to plan secretly against someone in power.

Jehu now moves from being anointed to actively planning Joram's death.

This is not a spontaneous act of anger, it is a calculated plan.

Everything that follows in this chapter flows from this one decision.

🗡️ Conspire means to plan secretly
👑 Jehu now plans against Joram
🧠 This is a calculated decision
📖 Everything else flows from this choice

---

## 🩹 Joram Had Kept Ramothgilead, He And All Israel, Because Of Hazael King Of Syria

This detail connects directly back to the end of the previous chapter.

Joram had been defending this border city against Hazael, Syria's new king.

Hazael himself became king only after Elisha's earlier visit to Damascus.

The wars of chapter eight are still shaping the events of this one.

🩹 This links to the end of chapter eight
⚔️ Joram defended the city from Hazael
👑 Hazael became king through Elisha's visit
📖 Chapter eight still shapes this scene

---

## 🛏️ Returned To Be Healed In Jezreel Of The Wounds

Joram left the battlefield to recover from injuries suffered fighting the Syrians.

Jezreel was a royal city with a palace, not the front line.

A wounded, recovering king made an easy and unguarded target.

Jehu chooses this exact moment of weakness to make his move.

🛏️ Joram left to heal from wounds
🏛️ Jezreel had a royal palace
🎯 A wounded king was an easy target
📖 Jehu strikes at the weakest moment

---

## 🚫 Let None Go Forth Nor Escape Out Of The City

Jehu orders Ramothgilead sealed off before he ever leaves for Jezreel.

No rider could reach Joram first with a warning.

This single order gives Jehu total surprise for the rest of the chapter.

A coup depends on speed as much as it depends on force.

🚫 Jehu seals off the city first
🐎 No warning could reach Joram
🎯 It guarantees total surprise
📖 Speed matters as much as force

---

## 👀 Ahaziah King Of Judah Was Come Down To See Joram

Ahaziah of Judah is visiting his wounded relative Joram, as chapter eight already explained.

His presence here is a simple family visit, not a plot of his own.

That innocent visit places him directly in the path of Jehu's coup.

Ahaziah is about to be caught in violence that was never aimed at him first.

👀 Ahaziah was visiting Joram
👪 It was a simple family visit
📍 It placed him in the coup's path
📖 He is caught in violence not his own

# SecondKingsNine 9:17-20
# 🐎 The Watchman Sees Jehu Coming
---
## 🗼 A Watchman On The Tower In Jezreel

Ancient cities posted watchmen on high towers to spot approaching danger early.

The watchman's job was to give the city time to react before an army arrived.

This same role appears throughout the Old Testament as a symbol for prophets and warning.

Here the watchman's warning simply is not heeded in time.

🗼 Watchmen scanned for danger from towers
⏰ Their job was early warning
⚠️ This warning went unheeded
📖 Watchmen often symbolize prophetic warning

---

## ☮️ Is It Peace?

This question was the normal way to check if an approaching rider came in friendship.

Joram sends it hoping for a simple, reassuring answer.

Asking twice shows Joram's own growing unease as neither messenger returns.

The question itself becomes a countdown toward disaster.

☮️ The question checked for friendly intent
👑 Joram hoped for a simple answer
😟 Asking twice shows rising unease
📖 The question becomes a countdown

---

## 🔄 What Hast Thou To Do With Peace? Turn Thee Behind Me

Jehu refuses to answer the question directly at all.

Turn thee behind me is an order to fall in line behind him instead.

Both messengers join Jehu rather than returning with any report.

Their silence tells Joram more than any spoken answer could have.

🔄 Jehu will not answer directly
➡️ He orders the rider to follow him
🤝 Both messengers switch sides
📖 Their silence speaks louder than words

---

## 🏇 The Driving Is Like The Driving Of Jehu The Son Of Nimshi, For He Driveth Furiously

Jehu's chariot driving was already famous enough for the watchman to recognize him from a distance.

Driveth furiously means driving with aggressive, reckless speed.

This one detail captures Jehu's whole personality, bold, forceful, and impossible to miss.

The reader already knows exactly who is coming before anyone announces his name.

🏇 Jehu's driving was already famous
💨 Furiously means reckless, aggressive speed
😤 It captures his whole personality
📖 His identity is known before he speaks

# SecondKingsNine 9:21-26
# ⚔️ Joram Is Killed In Naboth's Field
---
## 🏇 Each In His Chariot, And They Went Out Against Jehu

Both kings ride out together, still unaware Jehu means to kill them.

Neither man brings soldiers or takes any real precaution.

Their confidence shows how completely Jehu's plan has stayed hidden.

Two kings are about to meet an enemy they still think is a friend.

🏇 Both kings ride out together
🙈 Neither takes any precaution
🎭 Jehu's plan stayed fully hidden
📖 They still think Jehu is a friend

---

## 🌾 The Portion Of Naboth The Jezreelite

Naboth was the vineyard owner Ahab and Jezebel had murdered back in 1 Kings 21.

They had him falsely accused so Ahab could seize his family's land.

Elijah confronted Ahab right there in that same field and pronounced judgment on his house.

The confrontation with Joram is happening on the exact ground where that judgment began.

🌾 Naboth's vineyard was stolen in 1 Kings 21
⚖️ Ahab and Jezebel had him killed
🔮 Elijah judged Ahab in that field
📖 The confrontation returns to that same ground

---

## 💔 What Peace, So Long As The Whoredoms Of Thy Mother Jezebel

Whoredoms here is not about literal adultery, it means devotion to false gods.

The Bible often describes idol worship as spiritual unfaithfulness to the LORD.

Jehu names Jezebel's Baal worship as the real reason no peace is possible.

He answers Joram's question with an accusation instead of a greeting.

💔 Whoredoms here means idol worship
🛐 Idolatry is pictured as unfaithfulness
🎯 Jehu blames Jezebel's false worship
📖 An accusation replaces a greeting

---

## 🏃 Joram Turned His Hands, And Fled

Turning his hands here describes Joram wheeling his chariot around to run.

The moment Jehu speaks, Joram finally understands the danger he is in.

His warning cry to Ahaziah comes one breath too late to save either of them.

Recognition and death arrive almost at the same instant.

🏃 Joram wheels his chariot to flee
💡 He finally understands the danger
⏱️ His warning comes too late
📖 Recognition and death arrive together

---

## 🏹 Smote Jehoram Between His Arms, And The Arrow Went Out At His Heart

Between his arms means the arrow struck Joram square in the back.

It passed all the way through his body and out through his chest.

This was a fatal wound with no chance of survival or recovery.

Jehu's first act as king is killing the king he replaces.

🏹 The arrow struck Joram's back
💥 It passed clean through his body
☠️ The wound was instantly fatal
📖 Jehu's first act as king is this killing

---

## 🌾 Cast Him In The Portion Of The Field Of Naboth

Jehu orders Joram's body thrown into the very field Naboth once owned.

Jehu himself remembers riding beside Ahab the day Elijah first spoke that judgment.

Bidkar, his captain, was there too and needed no further explanation.

The punishment lands in the exact place the original crime took place.

🌾 Joram's body is thrown into Naboth's field
🧠 Jehu remembers Elijah's judgment firsthand
🗣️ Bidkar witnessed it as well
📖 The punishment returns to the crime's location

# SecondKingsNine 9:27-29
# 🏃 Ahaziah Flees And Dies
---
## 🏡 Fled By The Way Of The Garden House

Ahaziah runs the moment he sees what has happened to Joram.

The garden house route was likely a private path away from the main road.

He is trying to escape the same violence that just killed his relative.

His flight will not carry him far enough to survive.

🏡 Ahaziah flees immediately
🚶 He takes a private escape route
😨 He is fleeing the same violence
📖 His flight will not save him

---

## 🎯 Smite Him Also In The Chariot

Jehu extends his purge beyond Israel's throne to Judah's king as well.

Ahaziah's only real connection to Ahab's house was through marriage, not blood.

Jehu treats that family tie as reason enough to include him in the judgment.

No one closely tied to Ahab's household is meant to survive this day.

🎯 Jehu targets Ahaziah too
👪 His link to Ahab was through marriage
⚔️ That tie was reason enough
📖 No one tied to Ahab survives today

---

## 🗺️ He Fled To Megiddo, And Died There

Megiddo was a fortified city along a major trade and military route.

Ahaziah manages to reach it before finally dying of his wounds.

This city appears repeatedly in the Bible as the site of major battles.

Even a fortress could not save a king Jehu was determined to kill.

🗺️ Megiddo was a fortified trade route city
🩸 Ahaziah died there of his wounds
⚔️ Major battles happened there repeatedly
📖 The fortress could not save him

---

## 🏙️ Buried Him In His Sepulchre With His Fathers In The City Of David

Unlike Joram, Ahaziah's body is carried home and properly buried.

Being buried in the city of David beside earlier kings was still a mark of honor.

Judah's servants clearly still recognized him as their rightful king.

Not every death in this chapter ends in the same total dishonor.

🏙️ Ahaziah received a proper burial
👑 The city of David marked honor
🙇 Judah still honored him as king
📖 Not every death here ends the same way

---

## 📅 In The Eleventh Year Of Joram The Son Of Ahab Began Ahaziah To Reign

Chapter eight already stated Ahaziah began reigning in Joram's twelfth year.

This verse says the eleventh year instead, a real difference between the two counts.

Many scholars believe ancient kingdoms counted a king's first partial year differently in different records.

The text does not fully explain the gap, but the difference is a matter of counting method, not contradiction.

📅 Chapter eight said the twelfth year
🔢 This verse says the eleventh year
📜 Kingdoms counted reign years differently
📖 This is a counting method, not a contradiction

# SecondKingsNine 9:30-32
# 💄 Jezebel Faces Jehu
---
## 💄 She Painted Her Face, And Tired Her Head

Painting her face means applying eye makeup, a known cosmetic practice in that era.

Tiring her head means carefully arranging her hair, likely with a headdress.

This was not vanity in a moment of fear, it was a deliberate performance.

Jezebel chooses to meet her killer looking every bit like a queen.

💄 Painting meant applying eye makeup
👑 Tiring her head meant arranging her hair
🎭 It was a deliberate performance
📖 She faced death looking like a queen

---

## 🪟 Looked Out At A Window

Jezebel does not hide or run when Jehu's chariot arrives.

She positions herself where he cannot avoid seeing her.

This is a final act of defiance from a woman who has never backed down.

Her composure here matches everything the Bible has already shown about her character.

🪟 Jezebel does not hide from Jehu
👁️ She makes sure he sees her
🔥 It is a final act of defiance
📖 It matches her character throughout Kings

---

## 🗡️ Had Zimri Peace, Who Slew His Master?

Zimri was an earlier Israelite king who murdered his master and reigned only seven days.

His story is told back in 1 Kings 16, and it ended in fiery defeat.

Jezebel is comparing Jehu to Zimri and predicting the exact same short, doomed reign.

Her words are a taunt, but they are also a real threat aimed at his throne.

🗡️ Zimri killed his master and reigned briefly
📜 His story is told in 1 Kings 16
🔥 Jezebel predicts the same fate for Jehu
📖 Her words were taunt and threat

---

## 🙋 Who Is On My Side? Who?

Jehu ignores Jezebel entirely and calls out to the people inside the palace instead.

He is testing who in the household still remains loyal to her.

This question puts every servant and official in the building on the spot immediately.

Jehu is building his new authority in real time, one answer at a time.

🙋 Jehu ignores Jezebel's taunt
🏛️ He questions the palace household instead
⚖️ Every servant is put on the spot
📖 His authority is being built in real time

# SecondKingsNine 9:33-37
# 🐕 Jezebel's Death Fulfills Elijah's Word
---
## 👥 Throw Her Down

Two or three eunuchs answer Jehu's call and choose to betray Jezebel completely.

Eunuchs were palace officials, often trusted with the royal household's most private matters.

Their choice shows Jezebel's support inside the palace has already collapsed.

No one steps forward to defend her.

👥 Eunuchs answer Jehu's call
🏛️ Eunuchs managed the royal household
💔 Her support inside had collapsed
📖 No one defends her

---

## 🐎 Trode Her Under Foot

Jehu's horses trample Jezebel's body as he rides past.

This was a deliberate act of total disgrace, not an accident of the moment.

A queen's body receives the treatment normally given to an enemy on a battlefield.

Her fall from power could hardly be made more complete.

🐎 Horses trample her body
🎯 It was deliberate, not accidental
👑 A queen is treated like an enemy
📖 Her fall could not be more complete

---

## 🍽️ He Did Eat And Drink

Jehu calmly eats a meal immediately after Jezebel's death.

This detail is chilling precisely because it shows no hesitation at all.

For Jehu, this killing is simply the next task in securing his throne.

The Bible often lets a small, ordinary detail reveal a person's true character.

🍽️ Jehu eats right after the killing
😨 The calm response is chilling
🎯 It was simply another task to him
📖 A small detail reveals real character

---

## 👑 Bury Her, For She Is A King's Daughter

Jehu finally orders a burial, but only after the fact, not out of respect in the moment.

King's daughter refers to Jezebel's father, a king of Sidon mentioned back in 1 Kings 16.

Even Jehu recognizes her royal blood deserves some basic decency.

That small courtesy comes far too late to matter.

👑 Jehu orders a delayed burial
🌊 Her father ruled Sidon, per 1 Kings 16
🎗️ Jehu still acknowledges her royal blood
📖 The courtesy comes far too late

---

## 💀 They Found No More Of Her Than The Skull, And The Feet, And The Palms Of Her Hands

Wild dogs had already eaten the rest of her body before anyone returned.

This gruesome detail fulfills the specific prophecy given earlier in this very chapter.

Ancient Near Eastern culture viewed a proper burial as essential to a person's dignity in death.

Being denied that burial was considered one of the worst fates imaginable.

💀 Dogs consumed most of her body
🔮 It fulfills this chapter's own prophecy
⚰️ Proper burial mattered deeply in that culture
📖 Losing it was among the worst fates

---

## 📜 Spake By His Servant Elijah The Tishbite

This exact judgment was first spoken by Elijah, back in 1 Kings 21.

Years passed between that original prophecy and its fulfillment here.

The gap in time never weakened the certainty of what God had said.

A promise from God does not expire simply because it takes years to happen.

📜 Elijah first spoke this in 1 Kings 21
⏳ Years passed before it happened
🎯 The delay never weakened the promise
📖 God's word does not expire with time

---

## 🚫 So That They Shall Not Say, This Is Jezebel

Jezebel's body is destroyed so completely that nothing recognizable remains.

A name that once controlled Israel's throne ends without even a body to identify.

This final erasure completes the total judgment God pronounced back in verse ten.

Pride and power built without God can end this suddenly and this completely.

🚫 Nothing recognizable remains of her
👑 Her once powerful name ends here
⚖️ It completes the judgment from verse ten
📖 Power without God can end this suddenly
`.trim();

export const SECOND_KINGS_NINE_PERSONAL_SECTIONS = parseSecondKingsNineRawNotes(SECOND_KINGS_NINE_RAW_NOTES);
