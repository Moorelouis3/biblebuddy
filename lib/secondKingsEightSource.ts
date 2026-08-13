export type SecondKingsEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseSecondKingsEightRawNotes(rawText: string): SecondKingsEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: SecondKingsEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*SecondKingsEight\s+8:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 2 Kings 8 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+SecondKingsEight\s+8:/i.test(lines[index].trim())) {
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
        !/^#\s+SecondKingsEight\s+8:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 2 Kings 8 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 8,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `2 Kings 8:${startVerse}` : `2 Kings 8:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 2 Kings 8 sections, received " + sections.length);
  }

  return sections;
}

const SECOND_KINGS_EIGHT_RAW_NOTES = `# SecondKingsEight 8:1-6
# 🌾 The Famine Woman Returns
---
## 🌾 The LORD Hath Called For A Famine

This famine is not a random weather event.

The text says the LORD called for it directly.

Famines in Israelite thought often functioned as warnings, not accidents.

Seven years matches other biblical famine spans, like the seven years in Joseph's story.

God controls the land's fertility as directly as He controls kings and armies.

🌾 The LORD caused this famine
📜 Famines often carried warning
🔢 Seven years matches Joseph's famine
📖 God controls the land itself

---

## 🏡 Arise, And Go Thou And Thine Household, And Sojourn Wheresoever Thou Canst Sojourn

To sojourn means to live somewhere temporarily, not to move there for good.

Elisha tells the woman to leave before the famine arrives, not after.

This is the same woman whose son Elisha raised from the dead back in chapter four.

Elisha's care for her family continues years later, in a completely different crisis.

🏡 Sojourn means a temporary stay
⏰ Elisha warns her early
👦 She is the chapter four mother
📖 Elisha's care for her continues

---

## 🗺️ She Went With Her Household, And Sojourned In The Land Of The Philistines Seven Years

The Philistines lived along the coast, west of Israel's hill country.

Famines caused by drought did not always strike every region the same way.

Moving to Philistine territory meant safety, even though Philistines were often Israel's enemies.

Survival mattered more than old hostilities during a famine this severe.

🗺️ Philistines lived along the coast
🌦️ Drought did not strike evenly
⚔️ Philistines were usually enemies
📖 Survival outweighed old hostility

---

## 🏠 She Went Forth To Cry Unto The King For Her House And For Her Land

Leaving the country for years put her ownership at real risk.

Israelite custom allowed abandoned or unclaimed land to pass to someone else.

Returning after seven years meant she needed the king himself to confirm her claim.

An appeal to a local official would not have carried enough weight for a case this large.

🏠 Absence put her land at risk
⚖️ Unclaimed land could pass away
👑 Only the king could confirm it
📖 Her case needed top authority

---

## 👑 The King Talked With Gehazi The Servant Of The Man Of God

This is the same Gehazi who was struck with leprosy in chapter five.

Lepers were normally kept away from the king and the city.

The text does not explain how Gehazi is here, healthy enough to stand before the king.

Many readers believe this scene actually happened earlier, before Gehazi's punishment.

The books of Kings do not always tell events in strict order.

🩹 Gehazi was cursed with leprosy earlier
🚫 Lepers stayed away from the king
❓ The text does not explain this
📖 Kings does not always run in order

---

## 🎭 Tell Me, I Pray Thee, All The Great Things That Elisha Hath Done

The king wants a full account of Elisha's miracles, told in detail.

This request shows Elisha's reputation had reached the royal palace itself.

A king asking a servant for stories was a normal form of court entertainment.

It also gave Gehazi a rare chance to speak directly with royal power.

👑 The king wants full detail
🌟 Elisha's fame reached the palace
🎭 Storytelling was normal at court
📖 Gehazi gets rare royal access

---

## 💀 He Had Restored A Dead Body To Life

Gehazi is retelling the miracle from chapter four, when Elisha revived the Shunammite woman's son.

That miracle is now years in the past, but still worth telling to a king.

Bringing someone back from death was the rarest and most dramatic sign a prophet could perform.

This one story becomes the setup for what happens next.

💀 The dead son miracle is retold
⏳ Years had passed since it happened
✨ Resurrection was the rarest sign
📖 It sets up what happens next

---

## 🚪 The Woman, Whose Son He Had Restored To Life, Cried To The King

The timing here is too exact to be an accident.

The woman arrives at the palace the very moment Gehazi is describing her own story.

Without this timing, her land claim might never have reached the king directly.

The story becomes proof standing right in front of him.

⏰ The timing is exact
🚪 She arrives mid story
🎯 Proof stands before the king
📖 This timing was no accident

---

## 👦 My Lord, O King, This Is The Woman, And This Is Her Son, Whom Elisha Restored To Life

Gehazi identifies both mother and son as living proof of Elisha's power.

A story alone could be doubted, but two living witnesses could not.

Gehazi's testimony now carries far more weight than words on their own.

This moment turns a court story into a case with real evidence.

👦 The son stands as proof
🗣️ Gehazi vouches for both
⚖️ Testimony becomes real evidence
📖 Story becomes proven fact

---

## 📋 The King Appointed Unto Her A Certain Officer

This officer was a royal official assigned to handle her specific case.

Ancient kings used appointed officers to carry out orders across the kingdom.

Assigning a named officer shows the king treated her claim seriously.

Her case was not left to chance or local favor.

📋 An officer carried out the order
👑 Kings used officers to enforce rulings
🎯 Her case got serious attention
📖 It was not left to chance

---

## 🌾 Restore All That Was Hers, And All The Fruits Of The Field Since The Day That She Left

Fruits of the field means the crops and income the land produced while she was away.

The king ordered full restitution, not just the return of empty property.

Someone else had likely been farming her land during those seven years.

She receives back both the land and the years of value it earned without her.

🌾 Fruits of the field means crop income
🏠 Full restitution was ordered
👨‍🌾 Someone else had farmed it
📖 She gets both land and value

# SecondKingsEight 8:7-10
# 🐫 Hazael Visits Elisha In Damascus
---
## 🏙️ Elisha Came To Damascus

Damascus was the capital city of Syria, Israel's frequent enemy.

Elisha traveling there means he crossed directly into hostile territory.

Prophets sometimes carried out missions far outside Israel's own borders.

This trip fulfills part of the assignment God gave Elijah back in 1 Kings 19.

🏙️ Damascus was Syria's capital
⚔️ Syria was Israel's frequent enemy
🚶 Elisha crossed into enemy land
📖 This fulfills a task from 1 Kings 19

---

## 🤒 Benhadad The King Of Syria Was Sick

Benhadad had led Syrian armies against Israel across several earlier chapters.

He besieged Samaria and fought Israel's kings more than once.

Now the same enemy king lies sick and afraid, needing outside help.

Power that once threatened Israel now depends on an Israelite prophet.

👑 Benhadad led past invasions
⚔️ He fought Israel repeatedly
🤒 Now he is sick and afraid
📖 He now depends on Israel's prophet

---

## 🎁 Take A Present In Thine Hand, And Go, Meet The Man Of God

Bringing a gift before asking a prophet for guidance was standard custom.

The gift showed respect and prepared the way for the request.

Naaman brought gifts to Elisha earlier in chapter five for the same reason.

Even a foreign king followed Israelite custom when seeking a true answer.

🎁 A gift showed respect
🙏 It prepared the request
🔗 Naaman did the same in chapter five
📖 Custom crossed national lines

---

## 🙏 Enquire Of The LORD By Him

Benhadad wants to know God's own word about his illness.

This is striking, since Benhadad worshiped Syrian gods, not the LORD.

A pagan king trusts Israel's God more than his own priests in this moment.

The same pattern appeared earlier with Naaman's healing in chapter five.

🙏 Benhadad seeks the LORD's word
🛐 He normally worshiped Syrian gods
🎯 He trusts Israel's God here
📖 Naaman's story showed the same pattern

---

## 🐫 Forty Camels' Burden

Forty camels loaded with goods was an enormous royal gift.

This scale of gift signals how desperate and serious Benhadad's request truly was.

Hazael himself is introduced here for the first time, simply as a servant sent on an errand.

He will become one of the most important figures in the chapters ahead.

🐫 Forty camels was an enormous gift
😰 It showed real desperation
👤 Hazael appears for the first time
📖 He becomes central to later chapters

---

## 👨‍👦 Thy Son Benhadad King Of Syria Hath Sent Me To Thee

Benhadad calls himself Elisha's son here, though they are not related by blood.

This was a respectful way for a king to address someone he viewed as greater in spiritual authority.

The title shows how much honor Benhadad now gives to Israel's prophet.

Fear had replaced the pride he once showed as Israel's enemy.

👨‍👦 Son here means deep respect
👑 A king honors the prophet
🙇 Pride has turned to fear
📖 Elisha now outranks him spiritually

---

## 🔀 Thou Mayest Certainly Recover: Howbeit The LORD Hath Shewed Me That He Shall Surely Die

Howbeit means however, and it signals a sharp turn in Elisha's answer.

Elisha is not contradicting himself.

The sickness itself will not kill Benhadad.

Something else entirely will end his life instead.

Elisha separates the illness from the true cause of death, on purpose.

🔀 Howbeit means however
🤒 The illness will not kill him
🗡️ Something else will end his life
📖 Elisha separates cause from outcome

# SecondKingsEight 8:11-13
# 😢 Elisha Weeps Over Syria's Future
---
## 👁️ He Settled His Countenance Stedfastly, Until He Was Ashamed

Elisha stares fixedly at Hazael for an uncomfortably long time.

Stedfastly means without looking away, held firm and unmoving.

Hazael grows visibly uncomfortable under that silent, unbroken gaze.

Elisha is not thinking about the illness anymore.

He is seeing something far worse in Hazael's future.

👁️ Elisha stares without looking away
😳 Hazael grows uncomfortable
🔮 Elisha sees Hazael's future
📖 The illness is no longer his focus

---

## 😢 The Man Of God Wept

Elisha cries in front of the very man whose future he now sees clearly.

His grief is not for himself.

It is for the innocent people Hazael will one day harm.

A prophet's gift here brings sorrow, not comfort.

😢 Elisha weeps openly
💔 His grief is for others
🔮 He sees future suffering
📖 Prophecy brings sorrow here

---

## 🔥 Their Strong Holds Wilt Thou Set On Fire

These four descriptions cover real wartime atrocities, not exaggeration.

Setting strongholds on fire meant burning down fortified cities completely.

Killing pregnant women was a real, documented practice ancient armies used to terrorize an enemy.

Other prophets, like Amos and Hosea, describe this same horror committed by other nations.

Elisha is not describing something impossible or unheard of.

🔥 Strongholds means fortified cities burned
⚔️ Killing the young was real practice
📜 Amos and Hosea describe the same horror
📖 This horror was not unheard of

---

## 🐕 Is Thy Servant A Dog, That He Should Do This Great Thing

Calling oneself a dog was a common way to express shock or disbelief in this culture.

Dogs were viewed with contempt, seen as low and dishonorable, not as pets.

Hazael reacts as if such cruelty were beneath anyone with real honor.

His reaction is not innocence.

He simply cannot yet picture himself capable of what Elisha describes.

🐕 A dog meant something contemptible
😲 Hazael reacts with shock
🙅 He denies such cruelty in himself
📖 He cannot picture it yet

---

## 📜 The LORD Hath Shewed Me That Thou Shalt Be King Over Syria

This command actually goes back to 1 Kings 19, given first to Elijah.

God told Elijah to anoint Hazael as king over Syria long before this scene.

Elijah never carried out that part of his assignment before his ministry ended.

Elisha finally delivers the message his predecessor never got to give.

📜 The command dates to 1 Kings 19
👤 Elijah received it first
⏳ Elijah never delivered it
📖 Elisha completes the old assignment

# SecondKingsEight 8:14-15
# 🗡️ Hazael Becomes King
---
## 🗣️ He Told Me That Thou Shouldest Surely Recover

Hazael reports only half of what Elisha actually said.

He leaves out the part about Benhadad's coming death entirely.

This is not a misunderstanding.

Hazael already knows exactly what he plans to do next.

🗣️ Hazael reports only half the truth
🤐 He hides the death prophecy
🎯 He already has a plan
📖 This is deliberate, not confusion

---

## 💧 Took A Thick Cloth, And Dipped It In Water, And Spread It On His Face

Hazael smothers Benhadad using a wet cloth pressed over his face.

This method left little visible evidence of violence.

Elisha's prophecy said Benhadad would surely die, but never said exactly how.

Hazael chooses murder, and that choice still fulfills what was foretold.

💧 A wet cloth caused death
🕵️ It left little visible evidence
🗡️ Hazael chose murder himself
📖 His choice still fulfilled the prophecy

---

## 👑 Hazael Reigned In His Stead

Hazael now holds the throne God said he would hold.

This fulfills the assignment first given all the way back to Elijah.

Hazael will reappear as a major enemy of Israel in the chapters that follow.

His reign brings exactly the violence Elisha wept over just two verses earlier.

👑 Hazael takes the throne
📜 This fulfills the old assignment
⚔️ He returns as a major enemy
📖 His violence begins right away

# SecondKingsEight 8:16-19
# 👑 Jehoram Of Judah Begins To Reign
---
## 👥 In The Fifth Year Of Joram The Son Of Ahab King Of Israel

Two different kings share almost the same name in this chapter.

Joram, also called Jehoram, already rules the northern kingdom of Israel.

A second man, also named Jehoram, now begins to rule the southern kingdom of Judah.

Kings often dated a new king's reign by the ruling year of the neighboring king.

Watch carefully which kingdom each Jehoram actually rules.

👥 Two kings share nearly the same name
🏹 One rules Israel
🏛️ The other now rules Judah
📖 Watch which kingdom each one rules

---

## 👑 Jehoram The Son Of Jehoshaphat King Of Judah Began To Reign

Jehoshaphat was one of Judah's genuinely good kings, described earlier in 1 Kings 22.

His son Jehoram will take the kingdom in a very different direction.

A good father does not guarantee a good son on the throne.

The contrast between them becomes obvious almost immediately.

👑 Jehoshaphat was a good king
👶 Jehoram is his son
⚠️ Their paths differ sharply
📖 A good father did not guarantee this

---

## 🎂 Thirty And Two Years Old Was He When He Began To Reign

Jehoram becomes king at thirty two, already an adult with experience.

He reigns eight years total in Jerusalem.

Judah's records suggest he may have shared the throne with his father for part of that time.

An overlapping reign like this explains some of the confusing dates across Kings and Chronicles.

🎂 He begins at thirty two
📅 He reigns eight years
👨‍👦 He may have shared the throne
📖 This explains overlapping dates

---

## 🛐 He Walked In The Way Of The Kings Of Israel

Jehoram copies the idolatry of Israel's kings instead of following his own father.

His wife is Ahab's daughter, though she is not named yet in this verse.

She is Athaliah, and her influence will shape Judah for decades.

Marrying into Ahab's family brought Baal worship straight into Judah's palace.

🛐 Jehoram copies Israel's idolatry
👰 His wife is Ahab's daughter
🔮 She is Athaliah, unnamed here
📖 Her influence shapes Judah for decades

---

## 🛡️ Yet The LORD Would Not Destroy Judah For David His Servant's Sake

God's promise to David, not Jehoram's own behavior, protects Judah here.

This callback points back to 2 Samuel 7, where God promised David a lasting dynasty.

Light in this phrase means a lasting lamp, a symbol for an unbroken royal line.

Judah survives because of a promise kept generations earlier, not present good behavior.

🛡️ David's promise protects Judah
📜 It points back to 2 Samuel 7
🕯️ Light means a lasting royal line
📖 An old promise, not present behavior

# SecondKingsEight 8:20-22
# ⚔️ Edom And Libnah Revolt
---
## 🗡️ In His Days Edom Revolted From Under The Hand Of Judah

Edom had been under Judah's control since David conquered it generations earlier.

This is the first time Edom successfully breaks free.

Revolted here means Edom stopped paying tribute and obeying Judah's authority.

Judah's weakened leadership under Jehoram made this rebellion possible.

🗡️ David first conquered Edom
🔓 Edom breaks free here
💰 Revolt meant tribute stopped
📖 Weak leadership made this possible

---

## 👑 Made A King Over Themselves

Before this, Edom was ruled by a deputy appointed by Judah, not by its own king.

That earlier arrangement is described back in 1 Kings 22.

Choosing their own king now marks full political independence, not a small dispute.

Edom stays a separate, hostile kingdom for centuries after this moment.

🏛️ Edom once had a Judah appointed deputy
👑 Now Edom crowns its own king
🚩 This means full independence
📖 Edom stays hostile for centuries

---

## 🌙 Smote The Edomites Which Compassed Him About

Compassed about means Jehoram's army was surrounded on every side.

He launches a night attack to break out of the encirclement.

This maneuver saves his own army from being trapped and destroyed.

It does not, however, bring Edom back under Judah's control.

🌙 He attacked at night
🔓 He broke out of encirclement
🛡️ His army was saved
📖 Edom still stayed independent

---

## 🏘️ Then Libnah Revolted At The Same Time

Libnah was a priestly city inside Judah itself, not a foreign territory.

A city revolting from within is a different danger than an outside enemy.

The text also says Edom's loss lasted unto this day, meaning it never reversed.

Two rebellions landing together show how fast Jehoram's authority was crumbling.

🏘️ Libnah was a city inside Judah
⚠️ Internal revolt is a different danger
📅 Edom's loss lasted unto this day
📖 His authority was crumbling fast

# SecondKingsEight 8:23-24
# 📜 Joram Dies Ahaziah Succeeds
---
## 📚 Written In The Book Of The Chronicles Of The Kings Of Judah

This book of the chronicles of the kings of Judah is a lost royal record.

It is not the same as the Bible's own books of Chronicles.

Kings regularly points readers to this now missing source for more detail.

Its repeated use shows the author was working from real historical records.

The Bible's writers were not inventing these events from nothing.

📚 A lost royal record is meant
🔗 Kings often cites this source
📜 It shows real historical records existed
📖 These events were not invented

---

## 😴 Joram Slept With His Fathers, And Was Buried With His Fathers In The City Of David

Slept with his fathers is a peaceful way of describing death by natural causes.

Being buried in the city of David, alongside earlier kings, was a mark of honor.

Not every king in this book receives that honor later on.

Ahaziah, his son, now takes the throne of Judah.

😴 Slept with his fathers means died
🏙️ Burial there was an honor
⚠️ Not every king gets this
📖 Ahaziah now takes the throne

# SecondKingsEight 8:25-29
# 🩸 Ahaziah Joins Joram Against Syria
---
## 🔗 In The Twelfth Year Of Joram The Son Of Ahab King Of Israel

This is the same Joram of Israel introduced earlier in this same chapter.

Judah's new king, Ahaziah, begins his reign under this Israelite king's twelfth year.

The two kingdoms' histories stay tightly interlinked throughout this period.

Their alliance here will soon carry real danger into Judah itself.

🔗 This is the same Joram
🏹 He rules the northern kingdom
🤝 The two kingdoms stay linked
📖 Their alliance brings danger ahead

---

## 🎂 Two And Twenty Years Old Was Ahaziah When He Began To Reign

Ahaziah becomes king at only twenty two years old.

His reign lasts just one single year, remarkably short for a king in this book.

That short reign becomes important again in the very next chapter.

Something sudden and violent is coming for him quickly.

🎂 Ahaziah begins at twenty two
📅 His reign lasts one year
⚠️ This length foreshadows chapter nine
📖 Something sudden is coming

---

## 👵 His Mother's Name Was Athaliah, The Daughter Of Omri King Of Israel

Athaliah is named directly here for the first time in Kings.

Daughter of Omri likely means granddaughter, since Omri founded the dynasty Ahab belonged to.

This same Athaliah will later seize Judah's throne for herself in chapter 11.

Her presence in Judah's royal family becomes one of the most dangerous developments in this book.

👑 Athaliah is finally named
👵 Daughter here likely means granddaughter
🔮 She seizes the throne later
📖 Her presence brings real danger

---

## 🔗 He Walked In The Way Of The House Of Ahab

Ahaziah's evil comes from both sides of his family, not just one.

His father Jehoram already married into Ahab's house one generation earlier.

Now Ahaziah himself is directly tied to that same family by marriage.

Two straight generations of Judah's kings absorb Ahab's influence completely.

👪 Evil comes from both parents
🔗 His father married into Ahab's house
🔁 Ahaziah repeats the same pattern
📖 Two generations absorb Ahab's influence

---

## ⚔️ To The War Against Hazael King Of Syria

Ramothgilead is the same battlefield where King Ahab himself died back in 1 Kings 22.

Ahab's family keeps returning to this same deadly location.

Hazael, the very king Elisha wept over earlier in this chapter, is now Israel's enemy in battle.

Ahaziah is stepping into a war that already has a long, bloody history.

🗺️ Ramothgilead is where Ahab died
🔁 The family returns to this place
⚔️ Hazael is now the enemy
📖 This war has a long history

---

## 🩹 The Syrians Wounded Joram

Joram survives the battle, but he is seriously injured.

He leaves the front lines to recover from his wounds.

This injury sets up the entire scene of the next chapter.

A wounded, vulnerable king is exactly what the coming crisis needs.

🩹 Joram is seriously wounded
🚑 He leaves the battle to heal
⏭️ This sets up chapter nine
📖 A vulnerable king invites crisis

---

## 🚶 Went Down To See Joram The Son Of Ahab In Jezreel

Ahaziah travels to Jezreel simply to visit his wounded relative.

This visit looks like an ordinary act of family loyalty.

It actually places him in the exact location where the next chapter's violence begins.

A kind visit is about to cost him everything.

🚶 Ahaziah visits out of loyalty
📍 He is now in Jezreel
⚠️ Danger is already waiting there
📖 Loyalty is about to cost him
`.trim();

export const SECOND_KINGS_EIGHT_PERSONAL_SECTIONS = parseSecondKingsEightRawNotes(SECOND_KINGS_EIGHT_RAW_NOTES);
