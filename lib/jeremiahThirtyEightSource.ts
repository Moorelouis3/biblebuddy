export type JeremiahThirtyEightPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahThirtyEightRawNotes(rawText: string): JeremiahThirtyEightPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahThirtyEightPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+38:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 38 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+38:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+38:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 38 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 38,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 38:${startVerse}` : `Jeremiah 38:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Jeremiah 38 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_THIRTY_EIGHT_RAW_NOTES = `# Jeremiah 38:1-6
# 🕳️ Jeremiah Thrown Into The Dungeon
---
## 👥 Heard The Words That Jeremiah Had Spoken

Four royal officials bring this charge to the king.

Shephatiah, Gedaliah, Jucal, and Pashur all serve in Zedekiah's court.

This Gedaliah is not the Gedaliah who later becomes governor of Judah.

This Pashur is not the priest who struck Jeremiah back in chapter twenty.

Names repeat often among Judah's officials, which can confuse a modern reader.

👥 Four officials bring the charge

👤 Same names appear elsewhere in Judah

⚠️ Different people despite shared names

📖 Officials opposed Jeremiah's surrender message

---

## ⚰️ He That Remaineth In This City Shall Die

"Remaineth" is an old way of saying "remains" or "stays."

Jeremiah has said this same thing before, back in chapter twenty one.

The Chaldeans were the Babylonian army surrounding the city right now.

Staying inside Jerusalem meant staying inside a city about to fall.

Jeremiah never changes this message, no matter how many times he repeats it.

⚰️ Remaineth means remains or stays

⚔️ Chaldeans refers to Babylon's surrounding army

🔁 Jeremiah repeats this message again

📖 The warning never changes

---

## 🏰 Given Into The Hand Of The King Of Babylon

This verse states Jerusalem's defeat as a certainty, not a possibility.

Jeremiah does not say the city might fall.

He says the king of Babylon's army will take it.

That certainty is exactly why the officials want him silenced.

A prophet predicting sure defeat during a siege sounds like treason to desperate leaders.

🏰 The city's fall is certain here

⚔️ Babylon's army will take the city

😠 Certainty sounds like treason to leaders

📖 Jeremiah never softens this warning

---

## ⚔️ Weakeneth The Hands Of The Men Of War

"Weakeneth the hands" is an old idiom for destroying someone's courage.

It does not mean Jeremiah physically touched any soldier.

The officials mean his words are draining the will to keep fighting.

During a siege, spreading that kind of doubt counted as a capital crime.

The charge against Jeremiah is really a charge of treason in disguise.

⚔️ Weakeneth the hands means discouraging soldiers

🗡️ Not a literal physical action

🚨 Doubt was treated as treason

📖 The real charge was sedition

---

## 🤷 He Is In Your Hand

Zedekiah hands Jeremiah over without a real fight.

He admits he cannot stop his own officials.

A king should hold final authority over his own court.

In chapter thirty seven, he protected Jeremiah in private.

In public, surrounded by his own nobles, he backs down instead.

🤷 Zedekiah gives Jeremiah up easily

👑 A king who cannot rule freely

🤫 He protected Jeremiah only in private

📖 Public pressure overrides his courage

---

## 🕳️ The Dungeon Of Malchiah

This "dungeon" was not a built prison cell with bars.

It was a cistern, a deep pit dug to collect rainwater.

"Hammelech" likely means "the king's son," a royal title, not a personal name.

Empty cisterns were common places to hide or trap a prisoner in this period.

Lowering Jeremiah by cords was the only way down into a pit that deep.

🕳️ Dungeon here means a dry cistern

👑 Hammelech may mean the king's son

🪣 Cisterns normally stored rainwater

📖 Empty cisterns doubled as prisons

---

## 🪣 Jeremiah Sunk In The Mire

The cistern held no water, only thick mud at the bottom.

Jeremiah sinks into that mud the moment he is lowered down.

This image returns later in the chapter in a very different scene.

A prophet who spoke the truth is left to drown in filth.

The lowest point in Jeremiah's whole ordeal happens right here, in silence.

🪣 No water, only deep mud

💧 Jeremiah sinks as he is lowered

🔁 This image returns later in the chapter

📖 Truth telling nearly drowns him here

# Jeremiah 38:7-13
# 🪢 Ebedmelech Rescues Jeremiah
---
## 🌍 Ebedmelech The Ethiopian

"Ebedmelech" is not a personal name so much as a title, meaning "servant of the king."

"Ethiopian" here points to Cush, the region south of Egypt along the Nile.

Cushites served in several high positions throughout the Old Testament.

An outsider from a foreign land becomes the one who saves God's prophet.

The rescue comes from someone the city's own officials would have overlooked.

🌍 Ebedmelech means servant of the king

🗺️ Ethiopian points to Cush, near Egypt

👑 Cushites held real positions in scripture

📖 An outsider saves God's prophet

---

## 👳 One Of The Eunuchs

A eunuch in this period often served as a trusted palace official.

Courts valued eunuchs because they had no sons competing for the throne.

That made them loyal, with direct access to the king himself.

Ebedmelech's position explains how he could walk straight in and speak to Zedekiah.

An outsider with low status still carried real influence inside these walls.

👳 Eunuchs served as trusted officials

👑 No sons meant no rival claim

🚪 Ebedmelech had direct access to the king

📖 Status did not limit his courage

---

## 🍞 There Is No More Bread In The City

Babylon's army had Jerusalem surrounded for many months by this point in the story.

A siege this long meant food inside the walls was running out fast.

Ebedmelech is not exaggerating when he says Jeremiah will die of hunger.

Starving in an abandoned pit was a very real and likely death.

This detail shows exactly how urgent the rescue truly was.

🍞 Bread was already running out

⏳ The siege had lasted many months

💀 Starving in the pit was likely

📖 The danger was real, not exaggerated

---

## ⏱️ Before He Die

The king acts quickly once he hears the danger Jeremiah is in.

Thirty men go with Ebedmelech, far more than one rescue would ever need.

That number suggests real urgency, not a quiet errand.

Zedekiah's earlier helplessness in verse five looks different now that lives are at risk.

Fear of the officials did not stop him from ordering a rescue in secret.

⏱️ The king moves quickly here

👥 Thirty men suggests real urgency

🤫 The rescue still happens in secret

📖 Zedekiah acts despite his fear

---

## 🧵 Old Cast Clouts And Rotten Rags

"Clouts" is an old word for worn out pieces of cloth.

These were not fresh bandages but scraps pulled from storage under the treasury.

Ebedmelech thinks through the physical problem before acting.

Rough cords alone would cut into skin under a grown man's full weight.

A small, practical kindness protects Jeremiah's body in the middle of a rescue.

🧵 Clouts means old worn cloth

📦 Rags came from storage, not new cloth

🩹 Cords alone would injure his skin

📖 Small details protect a suffering man

---

## 💪 Under Thine Armholes

"Armholes" simply means under the arms, where the cords would be tied.

Padding there kept the rope from tearing into Jeremiah's skin as he was lifted.

Jeremiah follows this instruction exactly, without arguing or resisting.

After everything he had just survived, he trusts a stranger's careful plan.

Rescue here is not instant, but it is thorough.

💪 Armholes means under the arms

🩹 Padding protected him during the lift

🙏 Jeremiah trusts the plan fully

📖 Careful rescue over a rushed one

---

## 🏛️ Jeremiah Remained In The Court Of The Prison

Jeremiah is lifted out of the pit but not set completely free.

The court of the prison was an open area, nothing like the mud filled cistern.

This counts as real relief without being full release.

His situation has improved, but his captivity has not actually ended.

The next scene moves from physical danger into a far more delicate conversation.

🏛️ Better than the pit, still captive

🔓 Relief, but not full freedom

📈 His situation clearly improves

📖 Captivity continues in a milder form

# Jeremiah 38:14-16
# 🤫 A Secret Conversation
---
## 🚪 The Third Entry That Is In The House Of The LORD

The "third entry" was a specific, lesser known doorway into the temple complex.

Zedekiah chooses a quiet entrance instead of meeting Jeremiah in open court.

He does not want his own officials to see this meeting happen.

The king who just handed Jeremiah over now needs him in private.

Fear of his own nobles shapes nearly everything Zedekiah does in this chapter.

🚪 The third entry was a quiet doorway

🤫 Zedekiah avoids being seen meeting him

👀 He fears his own officials watching

📖 Secrecy controls this whole meeting

---

## 😨 Wilt Thou Not Surely Put Me To Death

Jeremiah answers the king's question with a question of his own.

He has already been threatened with death more than once in this book.

Telling the full truth to this king has never gone safely before.

His hesitation here is reasonable, not disrespectful toward the king.

A prophet can fear for his life and still obey God.

😨 Jeremiah questions the king's intentions

⚠️ Truth has brought him danger before

🗣️ His hesitation is reasonable, not rebellion

📖 Fear and obedience can coexist

---

## 🤝 Zedekiah The King Sware Secretly

"Sware" is the old form of "swore," making a solemn promise.

An oath "by the LORD" invoked God himself as a witness to the promise.

Breaking an oath like this was considered extremely serious in this culture.

Zedekiah makes this vow secretly, away from the men who want Jeremiah dead.

His private word and his public actions will not end up matching.

🤝 Sware means an old word for swore

🙏 He swears by the LORD himself

⚖️ Breaking this oath was deeply serious

📖 Private promises will not match public actions

# Jeremiah 38:17-20
# 🏳️ Surrender And Live
---
## ⚔️ The God Of Hosts, The God Of Israel

"LORD of hosts" pictures God commanding armies of angels, far beyond any human army.

Jeremiah uses the fullest possible title for God before delivering this message.

That title adds weight to a command that will sound like treason to Zedekiah.

This is not Jeremiah's personal opinion about military strategy.

It is a command from the highest possible authority.

⚔️ Hosts means armies of angels

📣 The fullest title adds real weight

🚫 Not Jeremiah's own military opinion

📖 The command comes from God himself

---

## 🔥 Thy Soul Shall Live, And This City Shall Not Be Burned

God offers Zedekiah a real choice, not just a threat.

Walking out to Babylon's princes would save his life and save Jerusalem itself.

This is the same offer Jeremiah has repeated since chapter twenty one.

Surrender here is framed as obedience, not cowardice.

The city's survival depends on one man's decision to trust this word.

🔥 Surrender would save his life

🏙️ The city would avoid burning

🔁 This offer repeats earlier warnings

📖 One decision controls the city's fate

---

## 🏚️ Thou Shalt Not Escape Out Of Their Hand

Refusing to surrender does not mean staying safe behind the walls.

The text promises capture either way, with or without a fight.

Fire would destroy the city regardless of which choice Zedekiah makes.

The only real difference is whether Zedekiah survives the ending or not.

There is no hidden third option where everything stays the same.

🔥 Capture happens with or without a fight

🏚️ Fire destroys the city either way

🧭 The real choice is how it ends

📖 There is no safe third option

---

## 😰 I Am Afraid Of The Jews That Are Fallen To The Chaldeans

Some of Zedekiah's own people had already surrendered to Babylon earlier in the siege.

Zedekiah fears those defectors will mock him if he joins them now.

Pride and fear of public shame outweigh the promise of safety.

A king's reputation matters more to him than his own survival right now.

This fear reveals exactly what is really holding Zedekiah back.

😰 Some Jews had already defected

🗣️ Zedekiah fears being mocked by them

👑 Pride outweighs the promise of safety

📖 Fear of shame controls his decision

---

## 🕊️ They Shall Not Deliver Thee

Jeremiah answers Zedekiah's fear directly instead of ignoring it.

He promises the defectors will have no power to hand him over.

Obeying God's voice is framed here as the safer path, not the riskier one.

The whole future of Zedekiah, his family, and Jerusalem rests on this single choice.

Jeremiah keeps giving Zedekiah every reason to say yes.

🕊️ Jeremiah answers the fear directly

🛡️ The defectors have no real power

✅ Obedience is framed as the safer choice

📖 Everything hinges on this one decision

# Jeremiah 38:21-23
# 😢 A Vision Of What Refusal Costs
---
## 👁️ This Is The Word That The LORD Hath Shewed Me

"Shewed" is simply the old spelling of "showed."

Jeremiah is not guessing what refusal will look like.

God has already revealed the exact scene to him in advance.

This sets up a vivid picture meant to move Zedekiah toward surrender.

What follows is not a threat invented by Jeremiah himself.

👁️ Shewed means showed in older English

🔮 God revealed this scene in advance

🎯 The vision aims to persuade Zedekiah

📖 This warning comes from God, not Jeremiah

---

## 👠 Thy Feet Are Sunk In The Mire

These exact words echo what actually happened to Jeremiah back in verse six.

In the vision, the king's own women use that image to mock Zedekiah.

They say his friends pushed him into trouble, and now he is stuck.

The man who caused Jeremiah to sink in the mire now faces that same picture.

This is a pointed warning dressed up as someone else's song.

👠 Feet sunk in mire echoes verse six

🪞 The image now points back at Zedekiah

🎭 Women sing this as a mocking taunt

📖 The warning mirrors Jeremiah's own ordeal

---

## 👨‍👩‍👧 They Shall Bring Out All Thy Wives And Thy Children

This is not a vague warning about the city in general.

It names Zedekiah's own household by name, his wives and his children.

Everything he loves most would be taken directly to the enemy camp.

The personal cost of refusing is made as specific as possible here.

Nothing about this message leaves room for comfortable distance.

👨‍👩‍👧 His own family is named directly

💔 Everything he loves is at risk

🎯 The warning is personal, not vague

📖 Refusal costs his whole household

# Jeremiah 38:24-28
# 🤐 Keeping The Secret
---
## 🤐 Let No Man Know Of These Words

Zedekiah's final order to Jeremiah is about secrecy, not theology.

He never says whether he will actually obey the message he just heard.

Keeping quiet becomes the one condition attached to Jeremiah's safety.

This ending leaves Zedekiah's real decision completely unresolved on the page.

Chapter thirty nine will later reveal what he actually chose to do.

🤐 Secrecy, not belief, is demanded

❓ Zedekiah never states his real choice

🔒 Silence is the price of safety

📖 His true decision stays unresolved here

---

## ❓ Declare Unto Us Now What Thou Hast Said

Zedekiah predicts exactly how the princes will react if they find out.

He expects them to threaten Jeremiah again to force the truth out.

Zedekiah even promises Jeremiah will not be killed if he answers them.

That promise shows Zedekiah already expects this exact confrontation to happen.

Jeremiah is being coached in advance on how to survive it.

❓ Zedekiah predicts the coming confrontation

🛡️ He promises Jeremiah will not die

🎓 Jeremiah is coached in advance

📖 The king expects this exact scene

---

## 🏠 Not To Return To Jonathan's House

"Supplication" means a humble, personal request, not a demand.

Jonathan's house was the dungeon where Jeremiah nearly died back in chapter thirty seven.

This cover story is not actually a lie, since Jeremiah truly feared that place.

He simply leaves out the part about Zedekiah's real question.

A half answer protects both Jeremiah and the secret he was given.

🏠 Supplication means a humble request

🕳️ Jonathan's house recalls chapter thirty seven

🤥 The cover story is true, just incomplete

📖 A partial answer protects the secret

---

## 🤐 The Matter Was Not Perceived

The princes question Jeremiah exactly as Zedekiah predicted.

Jeremiah answers with the cover story and nothing more.

"Perceived" means the officials never realize what was actually discussed.

The plan both men agreed on works perfectly.

Jeremiah survives this second brush with the officials' anger.

🤐 Jeremiah sticks to the cover story

🕵️ Perceived means the truth stayed hidden

✅ The plan works exactly as hoped

📖 Jeremiah survives another close call

---

## 📜 Until The Day That Jerusalem Was Taken

Jeremiah remains in the court of the prison for the rest of the siege.

He does not get a dramatic release or a change in circumstances.

His faithfulness is proven by staying put, not by any new rescue.

The city's actual fall happens in the very next chapter.

Everything Jeremiah warned about in this chapter comes true exactly as spoken.

📜 Jeremiah waits out the entire siege

🏙️ Jerusalem's fall comes in the next chapter

🎯 His warnings come true exactly as spoken

📖 Faithfulness here means simply staying put
`.trim();

export const JEREMIAH_THIRTY_EIGHT_PERSONAL_SECTIONS = parseJeremiahThirtyEightRawNotes(JEREMIAH_THIRTY_EIGHT_RAW_NOTES);
