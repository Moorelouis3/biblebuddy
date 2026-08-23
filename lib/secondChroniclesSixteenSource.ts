export type SecondChroniclesSixteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondChroniclesSixteenRawNotes(rawText: string): SecondChroniclesSixteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondChroniclesSixteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondChronicles\s+16:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Chronicles 16 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondChronicles\s+16:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondChronicles\s+16:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Chronicles 16 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 16,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Chronicles 16:${startVerse}` : `2 Chronicles 16:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 3) {
    throw new Error("Expected 3 2 Chronicles 16 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_CHRONICLES_SIXTEEN_RAW_NOTES = `# SecondChronicles 16:1-6
# ⚔️ Asa Buys Syria's Help Against Baasha
---
## 🧮 In The Six And Thirtieth Year Of The Reign Of Asa

This does not mean thirty six full years had passed only in Asa's own reign.

The book of Kings records Baasha already dead by Asa's twenty sixth year.

Many scholars believe Chronicles is counting from the split of the kingdom, not from Asa alone.

That count lines up the two timelines without a contradiction.

Numbers like this preserve real history, not simple arithmetic.

🧮 Baasha died by Asa's year twenty six
📚 Chronicles likely counts from the kingdom's split instead
🔗 Both timelines line up once shifted
📖 A puzzling number can still preserve real history

## 👑 Baasha King Of Israel Came Up Against Judah

Baasha ruled the rival northern kingdom of Israel during this same period.

He seized that throne years earlier by killing the previous king's entire family.

Judah and Israel had been split for decades by the time this chapter opens.

War between the two kingdoms was the normal state, not the exception.

This attack fits a pattern that had lasted for generations.

👑 Baasha ruled the rival northern kingdom
🗡️ He took that throne by killing a family
⏳ Judah and Israel had been split for decades
📖 War between them was the normal condition

## 🏰 Built Ramah

Ramah sat only a few miles north of Jerusalem, right on the main road south.

A fortress there let Baasha control every traveler moving between the two kingdoms.

Building it there was a direct threat aimed straight at Asa's capital.

This was not a distant border skirmish.

The danger sat within sight of Jerusalem itself.

🏰 Ramah sat a few miles north of Jerusalem
🚧 A fortress there controlled the main road south
⚠️ The threat aimed straight at Asa's own capital
📖 Danger sat within sight of Jerusalem itself

## 🚫 That He Might Let None Go Out Or Come In

This phrase describes a total blockade, not just a military standoff.

No merchant, traveler, or defector could pass that checkpoint in either direction.

Baasha aimed to strangle Judah's trade and cut off anyone fleeing to Asa.

A single fortress could choke an entire kingdom's movement.

Ramah's location made this blockade especially effective.

🚫 The phrase describes a total blockade
🧳 No traveler or trader could pass the checkpoint
💰 Baasha aimed to strangle Judah's trade
📖 One fortress could choke a whole kingdom's movement

## 🏛️ Silver And Gold Out Of The Treasures Of The House Of The LORD

Just one chapter earlier Asa filled this same treasury with spoil from a real victory.

Now he empties it to buy help instead of asking God for it.

The treasure meant for worship becomes a bribe for a foreign king.

The contrast between chapter fourteen and this moment is deliberate.

Chronicles wants the reader to notice exactly what changed.

🏛️ Asa once filled this treasury with real spoil
💸 Now he empties it to buy foreign help
🔄 Worship money becomes a political bribe
📖 The contrast with chapter fourteen is deliberate

## 🗺️ Sent To Benhadad King Of Syria, That Dwelt At Damascus

Syria, also called Aram, was a powerful kingdom northeast of Israel.

Damascus was its capital city, a major trade hub even in that era.

Benhadad ruled there as a foreign king with no covenant loyalty to God.

Asa turns to this outside power instead of the God who gave him victory before.

The choice of ally matters as much as the choice to seek help at all.

🗺️ Syria sat northeast of Israel, also called Aram
🏙️ Damascus was its major trade capital
👑 Benhadad had no covenant loyalty to God
📖 The choice of ally mattered just as much

## 📜 There Is A League Between Me And Thee

A league here means a formal treaty between two rulers.

Asa is reminding Benhadad that Judah and Syria already had one.

This existing treaty is exactly what Asa is about to ask him to break.

Treaties in this era bound nations, not just individual kings.

Breaking one carried real political weight.

📜 League means a formal treaty
🤝 Judah and Syria already had one
🔓 Asa is about to ask him to break
📖 Treaties bound whole nations, not just kings

## 🤝 Go, Break Thy League With Baasha King Of Israel

Asa is not just asking for help.

He is asking Benhadad to break his word to another king.

A king who once fought for God now bargains in broken promises.

This request costs Asa more than the silver and gold he sent.

It costs him the kind of king he had been becoming.

🤝 Asa is not only asking for help
💔 He asks Benhadad to break his word
⚖️ A godly king now trades in broken promises
📖 The request costs more than silver and gold

## 👂 Benhadad Hearkened Unto King Asa

Hearkened means he listened and then acted on what he heard.

The bribe worked exactly as Asa hoped it would.

A foreign king's loyalty shifted the moment a better offer arrived.

That should have told Asa something about the value of that kind of alliance.

👂 Hearkened means he listened and then acted
💰 The bribe worked exactly as planned
🔄 A king's loyalty shifted for a better offer
📖 That alliance was never built to last

## 🗺️ Smote Ijon, And Dan, And Abelmaim, And All The Store Cities Of Naphtali

These towns sat in the far north of Israel's territory.

Dan later gave its name to a saying that meant the whole land.

Store cities were fortified towns built to hold grain, weapons, and supplies.

Losing them crippled Israel's ability to supply its own army.

Benhadad's raid hit Israel's resources, not just its border towns.

🗺️ These towns sat in Israel's far north
📍 Dan later gave its name to a saying
🏬 Store cities held grain, weapons, and supplies
📖 The raid crippled Israel's own resources

## ✅ He Left Off Building Of Ramah, And Let His Work Cease

The plan worked immediately and exactly as Asa intended.

Baasha abandoned Ramah the moment his own border came under attack.

Judah's danger from the north disappeared within days.

The very next verses reveal what this victory actually cost.

✅ The plan worked exactly as intended
🏃 Baasha abandoned Ramah under his own attack
🕊️ Judah's danger from the north disappeared fast
📖 The next verses reveal the real cost

## 🧱 Carried Away The Stones Of Ramah, And The Timber Thereof

Judah did not just stop the fortress, they dismantled it completely.

Every stone and beam Baasha had gathered became Judah's building material instead.

Think of a rival's construction site stripped bare overnight.

The very materials meant to trap Judah now built up Judah's own defenses.

🧱 Judah dismantled the fortress completely
🔄 Baasha's own materials became Judah's building supply
🏗️ A rival's construction site stripped bare overnight
📖 The trap's materials strengthened Judah instead

## 🗺️ He Built Therewith Geba And Mizpah

Geba and Mizpah sat on Judah's own northern frontier.

Fortifying them here turned captured materials into permanent border defense.

Mizpah later became a well known gathering site in Israel's history.

Asa converts a defeated enemy's ambition into his own kingdom's protection.

🗺️ Geba and Mizpah sat on Judah's frontier
🏰 Captured materials became permanent border defense
📜 Mizpah later became a well known gathering site
📖 A defeated enemy's ambition became Judah's protection

# SecondChronicles 16:7-10
# 😠 Hanani Rebukes Asa's Lack Of Faith
---
## 👁️ Hanani The Seer Came To Asa King Of Judah

A seer was an early word for a prophet, someone who saw messages from God.

Hanani is likely the father of Jehu, a prophet who later rebukes King Jehoshaphat.

God kept sending Asa a true word even in this later, weaker season of his reign.

The message did not stop just because the king had grown less faithful.

👁️ Seer was an early word for prophet
👨‍👦 Hanani was likely Jehu the prophet's father
🗣️ God kept sending Asa a true word
📖 The message continued despite Asa's weaker season

## 🤝 Because Thou Hast Relied On The King Of Syria

Relied here means Asa placed his trust and confidence in Syria's power.

This is the exact opposite of what Asa did just two chapters earlier.

Chapter fourteen shows Asa crying out to God before an impossible battle.

Here he pays a foreign king before ever asking God for help.

🤝 Relied means placing full trust and confidence
🔄 This reverses what Asa did two chapters earlier
🙏 Chapter fourteen shows Asa crying out first
📖 This time Asa paid before he prayed

## ⚔️ The Host Of The King Of Syria Escaped Out Of Thine Hand

Host here means Syria's whole army, not just a small raiding party.

Hanani says Asa could have defeated Syria too, not only Israel.

Trusting God would have won a bigger victory than the bribe ever bought.

Asa settled for a smaller win by leaving God out of the plan.

⚔️ Host means Syria's whole army
🏆 Asa could have defeated Syria too
📈 Trust would have won a bigger victory
📖 Asa settled for less by leaving God out

## 🔙 Were Not The Ethiopians And The Lubims A Huge Host

This looks back to the massive army Asa faced in chapter fourteen.

The Lubims were Libyans, allies who fought alongside that Ethiopian force.

That army was far larger than anything Syria could send against Judah.

Hanani uses Asa's own past victory as proof of what faith could do.

🔙 This recalls the army from chapter fourteen
🗺️ Lubims were Libyans allied with that force
📏 That army dwarfed anything Syria could send
📖 Asa's own past victory proves what faith does

## 🙏 Because Thou Didst Rely On The LORD, He Delivered Them Into Thine Hand

That earlier victory came from trust, not from military strength.

God delivered an overwhelming army into Asa's hand simply because Asa asked.

The same God was still available for this smaller threat.

Asa forgot the very lesson his own history had already taught him.

🙏 That victory came from trust, not strength
🤲 God delivered a huge army because Asa asked
🔁 The same God was still available now
📖 Asa forgot the lesson his own history taught

## 👀 The Eyes Of The LORD Run To And Fro Throughout The Whole Earth

This pictures God actively watching every nation, not passively waiting.

Run to and fro means constant searching, not an occasional glance.

Think of a guard scanning a whole city rather than one street.

God was already looking for a heart He could support before Asa even asked.

👀 God actively watches every nation
🔄 Run to and fro means constant searching
🏙️ Think of a guard scanning a whole city
📖 God was already looking before Asa asked

## ❤️ Them Whose Heart Is Perfect Toward Him

Perfect here means wholehearted, the same meaning it carried for Asa back in chapter fifteen.

It never meant flawless or sinless in either place.

God was still ready to support a heart fully devoted to Him.

That offer was still open even in this weaker season of Asa's reign.

❤️ Perfect means wholehearted, not flawless
🔁 The same word describes Asa in chapter fifteen
🙏 God still supports a fully devoted heart
📖 That offer stayed open in Asa's weaker season

## 🧠 Herein Thou Hast Done Foolishly

Foolishly here does not describe a simple mistake in judgment.

In Hebrew wisdom writing, a fool is someone who ignores God on purpose.

Hanani is not questioning Asa's intelligence.

He is naming a choice to leave God out of the decision.

🧠 Foolishly here is not just a mistake
🚫 A fool in scripture ignores God on purpose
❓ Hanani questions the choice, not Asa's intelligence
📖 Leaving God out was the real folly

## ⚔️ From Henceforth Thou Shalt Have Wars

This is not a punishment invented on the spot.

It is the natural result of trusting alliances instead of God.

Peace had marked most of Asa's reign up to this point.

That peace now ends because of the choice this chapter just recorded.

⚔️ This is not an invented punishment
🔗 It is the natural result of Asa's choice
🕊️ Peace had marked most of Asa's reign
📖 That peace ends starting with this choice

## 😡 Asa Was Wroth With The Seer, And Put Him In A Prison House

Wroth means intense anger, stronger than simple irritation.

A king once open to correction now jails the man who brought it.

This same Asa had built altars and led reform just two chapters earlier.

Rejecting correction was a new pattern, not the Asa readers had met before.

😡 Wroth means intense anger
🔒 A once open king now jails his critic
🔄 This same Asa led reform two chapters earlier
📖 Rejecting correction was a new and troubling pattern

## ⚖️ Asa Oppressed Some Of The People The Same Time

Oppressed here means Asa used his royal power to harm his own people.

This was not one angry outburst against a single prophet.

The mistreatment spread to ordinary people under Asa's rule.

A king who once sought God now abuses the power God gave him.

⚖️ Oppressed means Asa harmed his own people
🎯 This was not one isolated outburst
🌍 The mistreatment spread to ordinary people
📖 Asa now abuses the power God gave him

# SecondChronicles 16:11-14
# ⚰️ Asa's Disease, Death, And Burial
---
## 📚 Written In The Book Of The Kings Of Judah And Israel

This book is a source document that no longer survives today.

Chronicles points to it again and again as proof its details are real history.

The writer expects readers to know a fuller record existed beyond this summary.

Not every detail of Asa's forty one year reign made it into this chapter.

📚 This book no longer survives today
✅ Chronicles cites it as proof of history
📝 A fuller record existed beyond this summary
📖 Not every detail made it into this chapter

## 🦵 Diseased In His Feet

Feet in the Bible can refer to the legs, not only the toes and soles.

Many scholars believe this describes gout or a form of gangrene.

The text never names the disease exactly.

What matters is not the diagnosis but how Asa responded to it.

🦵 Feet in scripture can mean the whole leg
🩺 Many scholars believe this was gout or gangrene
❓ The text never names the disease exactly
📖 How Asa responded mattered more than the diagnosis

## 🩺 Yet In His Disease He Sought Not To The LORD, But To The Physicians

This is not a verse against seeking medical help.

The problem is the word only, choosing physicians instead of God rather than alongside Him.

This same pattern of relying on outside power without God started back with Syria.

Asa's final years repeat the exact mistake that began this chapter.

🩺 This is not against seeking medical help
🚫 The problem is choosing physicians instead of God
🔁 The same pattern began earlier with Syria
📖 Asa's final years repeat this chapter's mistake

## 😴 Asa Slept With His Fathers

This is an old Hebrew way of describing a peaceful death, not a violent one.

It pictures joining ancestors who died before him, generation after generation.

The phrase appears often across the books of Kings and Chronicles for kings who died naturally.

Even after his failures, Asa's death itself was not marked as a disgrace.

😴 This describes a peaceful, natural death
👨‍👨‍👦 It pictures joining generations of ancestors
🔁 The phrase appears often for kings in scripture
📖 Asa's death itself carried no disgrace

## ⚰️ Which He Had Made For Himself In The City Of David

Kings in this era often built their own tombs years before they died.

The city of David was the oldest and most honored part of Jerusalem.

A burial place there marked Asa as a legitimate king in that royal line.

Preparing for death this early was common practice, not a sign of despair.

⚰️ Kings often built their own tombs early
🏙️ The city of David was Jerusalem's oldest part
👑 Burial there marked Asa as a legitimate king
📖 Preparing early was common, not despair

## 🧪 Filled With Sweet Odours And Divers Kinds Of Spices Prepared By The Apothecaries' Art

An apothecary was someone skilled in mixing perfumes and spices, close to an early pharmacist.

These spices were packed around the body as part of an honored burial, not to preserve it forever.

Divers here is an old word for various, not the modern word for swimmers.

A burial this elaborate signaled the highest honor a king could receive.

🧪 An apothecary mixed perfumes, like an early pharmacist
🌿 Spices honored the body, not preserved it forever
📚 Divers here means various, not swimmers
📖 This elaborate burial signaled the highest honor

## 🔥 They Made A Very Great Burning For Him

This burning was not a cremation of Asa's body.

It likely describes burning spices, incense, and perhaps his possessions in his honor.

Ancient Israel did not practice cremation as a normal burial custom.

The size of the burning matched the size of the honor Judah wanted to show him.

🔥 This was not a cremation of the body
🌿 It likely burned spices and incense
🚫 Cremation was not Israel's normal burial custom
📖 The size of the burning matched the honor
`.trim();

export const SECOND_CHRONICLES_SIXTEEN_PERSONAL_SECTIONS = parseSecondChroniclesSixteenRawNotes(SECOND_CHRONICLES_SIXTEEN_RAW_NOTES);
