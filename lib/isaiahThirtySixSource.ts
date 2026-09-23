export type IsaiahThirtySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahThirtySixRawNotes(rawText: string): IsaiahThirtySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahThirtySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+36:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 36 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+36:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+36:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 36 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 36,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 36:${startVerse}` : `Isaiah 36:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 36 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_THIRTY_SIX_RAW_NOTES = `# Isaiah 36:1-3
# ⚔️ Sennacherib Marches On Jerusalem
---
## In The Fourteenth Year Of King Hezekiah

This date is not just a Bible detail invented for the story.

Assyrian records confirm a real invasion of Judah during Hezekiah's reign.

Sennacherib carved his own account of this same campaign onto a clay prism.

That artifact still exists today in a museum.

Scripture and outside history describe the very same event.

This chapter is reporting something that truly happened, not a parable.

📜 A real fourteenth year date

🏺 Sennacherib left his own record

🤝 Outside history matches scripture here

📖 This invasion truly happened

---

## Sennacherib King Of Assyria Came Up

Assyria was the reigning superpower of the entire region.

No nation in the Near East could stand against its army.

Sennacherib inherited an empire already famous for cruelty in war.

Judah was a small kingdom facing the strongest military on earth.

This was never a fair fight by human strength alone.

Judah's only real hope was never its own army.

🦁 Assyria ruled the whole region

⚔️ Its army was feared everywhere

🏰 Judah was small by comparison

➡️ Only God could even the odds

---

## All The Defenced Cities Of Judah, And Took Them

"Defenced" means fortified with walls and strong defenses.

These were not ordinary towns but Judah's strongest fortress cities.

The Assyrian army was so powerful it could break through even these.

Lachish was one of these cities, second in importance only to Jerusalem.

Archaeologists have found real evidence of this exact siege of Lachish.

This was already a national disaster before Rabshakeh ever opened his mouth.

🏰 Defenced means heavily fortified

💥 Even strong cities fell fast

🏺 Lachish shows real archaeological proof

📖 Disaster came before any speech

---

## Sent Rabshakeh From Lachish To Jerusalem

"Rabshakeh" is not a personal name.

It is a title meaning something like chief officer or field commander.

The Bible does not even bother naming the man underneath the title.

His office alone carried enough weight to deliver this message.

Lachish was the Assyrian camp, still under siege only miles from Jerusalem.

Rabshakeh came as Assyria's mouthpiece, backed by its whole army.

🎖️ Rabshakeh is a title, not a name

📢 He speaks with the king's own authority

🏕️ Lachish was the Assyrian camp

➡️ He carries Assyria's full weight

---

## The Conduit Of The Upper Pool

A "conduit" is a channel built to carry water into the city.

This exact spot appears once before, back in Isaiah seven.

There the prophet met King Ahaz at this very location with a different message.

Ahaz refused to trust God when Isaiah offered him a sign.

Now, one generation later, Hezekiah faces the same test at the same spot.

The same ground now asks the son the very question the father failed.

💧 Conduit means a water channel

🔁 Isaiah once stood here too

👑 Ahaz failed that same test

📖 Hezekiah faces it now himself

---

## Eliakim, Hilkiah's Son, Which Was Over The House

"Over the house" was the highest office under the king himself.

Eliakim managed the palace, the treasury, and the king's business.

Isaiah already told this exact story back in chapter twenty two.

God removed Shebna from this office and placed Eliakim there instead.

The man standing at the wall today is the one God appointed for this moment.

God had already prepared the right leader before the crisis even arrived.

🏛️ Over the house means chief steward

👑 Eliakim ran the king's affairs

📜 Isaiah twenty two told this story

📖 God placed him there beforehand

---

## Shebna The Scribe, And Joah, Asaph's Son, The Recorder

A "scribe" served as secretary of state, handling official letters and records.

A "recorder" kept the court's official history and served as an advisor.

Shebna held Eliakim's job before losing it for building himself a lavish tomb.

He now serves under the very man who replaced him.

Joah's father Asaph likely served in this same office before him.

Even in a demoted role, Shebna is still standing at his post when it matters.

✍️ Scribe means secretary of state

📚 Recorder means keeper of history

📉 Shebna lost his higher office

➡️ He still serves when it counts

# Isaiah 36:4-10
# 🗯️ Rabshakeh's Case Against Trusting God
---
## What Confidence Is This Wherein Thou Trustest

Rabshakeh opens with a direct insult, not a threat yet.

He wants Hezekiah to admit his trust is foolish before the fighting even starts.

This kind of question is meant to shake confidence, not gather information.

Fear is Assyria's first weapon, used before a single arrow gets fired.

Words can attack a person's trust just as hard as an army can.

❓ A mocking question, not a real one

🧠 Meant to plant doubt first

🏹 Fear attacks before any battle

➡️ Words can wound trust deeply

---

## But They Are But Vain Words

Rabshakeh is quoting what he assumes Hezekiah's own advisors have been telling him.

He mocks any plan or strategy Judah might have as empty talk.

This is meant to make Hezekiah doubt the very people around him.

An enemy often attacks morale before he attacks a wall.

Rabshakeh wants Judah defeated in its own mind first.

🗯️ Rabshakeh mocks Judah's own plans

🎭 He calls their strategy empty talk

🧩 This attacks morale, not walls

➡️ Defeat starts in the mind first

---

## The Staff Of This Broken Reed, On Egypt

A reed is a tall, hollow plant that grows near water.

It looks like it could support weight but snaps under the slightest pressure.

Judah had been counting on Egypt to send help against Assyria.

Rabshakeh says that help will collapse the moment Judah leans on it.

Egypt's history of broken promises to smaller nations backs up the insult.

A weak ally can hurt more than having no ally at all.

🌾 A reed looks strong but snaps

🌍 Egypt stands for that reed

🤝 Judah was leaning on that help

📖 A weak ally still fails you

---

## Whose High Places And Whose Altars Hezekiah Hath Taken Away

Rabshakeh gets this fact right but flips its meaning completely.

Hezekiah really did tear down pagan high places and false altars across Judah.

Second Kings records this reform as one of Hezekiah's best decisions.

Rabshakeh twists faithful obedience into an insult against the LORD.

An enemy will use even someone's obedience to God as a weapon.

What actually pleased God gets recast here as an offense against Him.

⛰️ High places means pagan worship sites

✅ Hezekiah's reform was actually faithful

🎭 Rabshakeh twists it into an insult

📖 Obedience can be used against you

---

## I Will Give Thee Two Thousand Horses

This sounds generous until the actual insult underneath is heard.

Rabshakeh is mocking Judah for not even having enough riders to use them.

A real army needs trained cavalry, not just animals standing in a field.

He is saying Judah could not field a real fighting force even if given one.

The offer was never a gift, it was a public humiliation.

🐴 Two thousand horses sounds generous

😏 The insult is hidden underneath

⚔️ Judah lacked trained riders

➡️ A gift that mocked instead

---

## One Captain Of The Least Of My Master's Servants

Rabshakeh picks the lowest ranked officer in Assyria's whole army on purpose.

He says Judah could not even defeat that one minor officer alone.

The full Assyrian army includes many officers ranked far above this one.

The comparison is designed to make Judah's entire military look worthless.

Assyria wanted Judah to feel outmatched before a single battle began.

🎖️ The least captain, not the greatest

📉 Judah could not beat even him

🏰 Assyria's real army ranks much higher

➡️ The goal was to feel outmatched

---

## Am I Now Come Up Without The LORD Against This Land

Rabshakeh claims the LORD personally sent him to destroy Judah.

This is not a confession of faith, it is a manipulation tactic.

He wants Hezekiah to believe resistance means fighting against God himself.

Nothing in scripture supports an Assyrian pagan speaking for the true God.

A lie can sound like truth when it borrows God's name.

🗣️ Rabshakeh claims God sent him

🎯 This aims to break resistance

🚫 Nothing backs up that claim

📖 A lie can borrow God's name

# Isaiah 36:11-12
# 🗣️ A Private Threat In Public Words
---
## Speak, I Pray Thee, Unto Thy Servants In The Syrian Language

"Syrian" here means Aramaic, the diplomatic language of the whole region.

Educated officials like Eliakim and Shebna could speak it fluently.

Ordinary people on the wall could not understand a word of it.

The officials want this conversation kept private, away from panicked ears.

Choosing a language was really about choosing who got to hear the threat.

🗣️ Syrian means the Aramaic language

🎓 Officials understood it, common people did not

🧱 The wall crowd could not follow it

➡️ Language controlled who heard the threat

---

## Speak Not To Us In The Jews' Language, In The Ears Of The People

"The people" means the ordinary soldiers and citizens standing on Jerusalem's wall.

The officials fear a public threat could cause panic inside the city.

Keeping the threat quiet protected morale as much as it protected information.

A frightened crowd can be more dangerous than an enemy outside the gate.

This request was really about controlling fear, not just words.

👥 The people means the crowd on the wall

😰 A public threat risked real panic

🛡️ Morale mattered as much as safety

➡️ Controlling fear was the real goal

---

## Eat Their Own Dung, And Drink Their Own Piss With You

Rabshakeh refuses the private conversation on purpose.

He wants the people on the wall to hear exactly what a siege will cost them.

A long siege could eventually force people toward that kind of desperation for survival.

This is deliberate psychological warfare aimed straight at ordinary families, not just the king.

Rabshakeh is not describing an accident, he is threatening it on purpose.

🎯 Rabshakeh speaks straight to the people

😨 He describes siege level desperation

👪 Ordinary families are his real target

➡️ This threat was deliberate, not careless

# Isaiah 36:13-20
# 📢 Rabshakeh Shouts To The People
---
## Then Rabshakeh Stood, And Cried With A Loud Voice In The Jews' Language

Rabshakeh abandons diplomacy completely at this point.

He deliberately switches to Hebrew so every soldier on the wall understands him.

This is no longer a private negotiation between officials.

It is now a direct public appeal meant to turn the people against their own king.

Rabshakeh is trying to defeat Jerusalem from the inside before Assyria ever attacks the walls.

📢 Rabshakeh switches to Hebrew

👂 Every soldier can now understand

🎯 This targets the people directly

➡️ He attacks morale from within

---

## Let Not Hezekiah Deceive You

Rabshakeh calls Hezekiah a liar without any actual proof.

He wants the people doubting their own king's honesty.

Nothing Hezekiah has said in this chapter has been shown false.

Undermining trust in leadership is easier than winning an actual battle.

An accusation repeated loudly enough can start to feel true even without evidence.

🗣️ Rabshakeh accuses without proof

👑 He targets trust in Hezekiah

⚔️ Doubt is easier than battle

➡️ Loud lies can start to stick

---

## Make An Agreement With Me By A Present, And Come Out To Me

This is Rabshakeh's version of a peace offer.

A "present" here likely means tribute paid to Assyria to stop the attack.

He paints a picture of everyday life continuing normally, vines, fig trees, and fresh water.

None of that comfort was ever meant to last.

A tempting offer today was still a trap leading toward exile tomorrow.

🕊️ Make an agreement means surrender in disguise

🍇 He paints an image of normal life

🎣 The comfort was bait, not truth

➡️ Comfort today still led to exile

---

## Until I Come And Take You Away To A Land Like Your Own Land

This is the real plan hidden behind the friendly offer.

Every peaceful promise before this verse was only ever temporary.

Assyria's actual strategy was mass deportation, not a peace treaty.

Conquered peoples were regularly resettled far from their homeland to break resistance.

The kind words were only ever a path toward permanent exile.

🚚 The real plan was deportation

🕰️ Every earlier promise was temporary

🌍 Assyria resettled conquered nations often

📖 Kind words led toward exile

---

## Where Are The Gods Of Hamath And Arphad

Hamath and Arphad were real cities in Syria that Assyria had already conquered.

Rabshakeh is naming actual military victories, not empty boasting.

He argues that if those nations' gods could not save them, Judah's God cannot either.

This argument sounds strong only if the LORD is just another local god like the rest.

Rabshakeh's whole case depends on a lie about who the LORD actually is.

🗺️ Hamath and Arphad were real conquests

📜 These were true military victories

⚖️ He compares the LORD to the rest

📖 That comparison is the real lie

---

## That The LORD Should Deliver Jerusalem Out Of My Hand

Rabshakeh ends his speech with his biggest and most dangerous claim.

He treats the LORD as just one more failed god among many nations' failed gods.

The next chapters of Isaiah will answer this exact claim directly.

Every word spoken here will eventually be tested against what actually happens.

A boast made in front of a whole city cannot simply be forgotten.

🎤 Rabshakeh's biggest claim yet

📊 He lumps God with failed idols

⏳ The next chapters answer this

📖 This boast will soon be tested

# Isaiah 36:21-22
# 🤐 The Officials Report Back
---
## They Held Their Peace, And Answered Him Not A Word

Hezekiah had already commanded silence before this moment.

The people obey the king's order instead of Rabshakeh's provocation.

Silence here is discipline, not defeat.

Staying quiet took more control than shouting back would have.

Sometimes the strongest answer to a threat is refusing to answer it at all.

🤐 The people obey Hezekiah's order

🧠 Silence was discipline, not weakness

🛡️ It denied Rabshakeh a reaction

➡️ Quiet obedience showed real control

---

## With Their Clothes Rent

Tearing one's own clothing was a public sign of grief and distress.

Eliakim, Shebna, and Joah use this gesture before they even speak to Hezekiah.

Their torn clothes tell the king the seriousness of the message before a word is said.

This same gesture appears throughout the Old Testament in moments of deep crisis.

The report itself had not even started, and Hezekiah already knew how bad it was.

👕 Torn clothes signaled deep distress

🚶 The officials use it before speaking

📖 It is a common Old Testament gesture

➡️ Hezekiah reads the crisis instantly
`.trim();

export const ISAIAH_THIRTY_SIX_PERSONAL_SECTIONS = parseIsaiahThirtySixRawNotes(ISAIAH_THIRTY_SIX_RAW_NOTES);
