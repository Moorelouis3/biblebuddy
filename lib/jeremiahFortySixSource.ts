export type JeremiahFortySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseJeremiahFortySixRawNotes(rawText: string): JeremiahFortySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: JeremiahFortySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Jeremiah\s+46:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Jeremiah 46 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Jeremiah\s+46:/i.test(lines[index].trim())) {
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
        !/^#\s+Jeremiah\s+46:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Jeremiah 46 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 46,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Jeremiah 46:${startVerse}` : `Jeremiah 46:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 6) {
    throw new Error("Expected 6 Jeremiah 46 sections, received " + sections.length);
  }

  return sections;
}

const JEREMIAH_FORTY_SIX_RAW_NOTES = `# Jeremiah 46:1-4
# 🛡️ Pharaoh's Army Musters For Battle
---
## 🌍 Against The Gentiles

This chapter begins a brand new section of Jeremiah.

For the first time, the LORD speaks directly against other nations, not Israel.

"Gentiles" simply means nations outside Israel.

Six chapters in a row now hold a message for one of Egypt's neighbors in turn.

God is not only Israel's God.

He rules every nation on earth.

🌍 Gentiles means nations outside Israel

📚 Six chapters address other nations

👑 God rules nations beyond Israel too

📖 God's reach covers the whole earth

---
## 👑 Pharaohnecho King Of Egypt

Pharaohnecho was a real Egyptian king from this exact time period.

History also knows him as Necho the Second.

He marched his army all the way to Carchemish, a city far to the north.

Carchemish sat on the river Euphrates, near the border of modern Turkey and Syria.

Egypt reached much further from home than most readers realize.

👑 Pharaohnecho is also called Necho

🗺️ Carchemish sat far to the north

🌊 The city sat on the Euphrates

📖 Egypt's reach extended far from home

---
## ⚔️ Which Nebuchadrezzar King Of Babylon Smote

"Nebuchadrezzar" is just another spelling of Nebuchadnezzar.

At Carchemish, his Babylonian army crushed Pharaohnecho's forces.

This single battle decided who controlled the region.

Egypt's grip on the Near East ended that day.

Babylon became the new dominant empire instead.

One ordinary verse here records a turning point in world history.

🔤 Nebuchadrezzar is another spelling of Nebuchadnezzar

⚔️ Babylon crushed Egypt's army at Carchemish

🌍 This battle decided the region's ruler

📖 Egypt's era of power ended here

---
## 🛡️ Order Ye The Buckler And Shield

A "buckler" is a small, round shield held in one hand.

It was light enough to move quickly during close combat.

A regular "shield" was larger and covered more of the body.

Soldiers often carried both types for different kinds of protection.

This command is a call to arms, get ready for war right now.

🛡️ Buckler means a small round shield

📏 A larger shield covered more body

⚔️ Soldiers carried both for protection

📖 This verse is a call to arms

---
## 🔧 Furbish The Spears, And Put On The Brigandines

To "furbish" means to polish and sharpen a weapon until it is ready for use.

"Brigandines" were a type of body armor made from small metal plates.

Those plates were sewn inside a jacket of cloth or leather.

This single verse packs in helmets, horses, spears, and armor all at once.

Every detail shows an army preparing seriously for real combat.

🔧 Furbish means polish and sharpen

🥋 Brigandines were armor of metal plates

🧵 Plates were sewn into cloth or leather

📖 Every detail shows real battle preparation

---
# Jeremiah 46:5-9
# 🌊 Panic By The River Euphrates
---
## 🏃 Fled Apace

"Apace" is an old word meaning quickly or at great speed.

These soldiers are not retreating in order.

They are running for their lives in total panic.

The phrase "fear was round about" shows up several other times in Jeremiah.

Each time it appears, it signals complete terror with no safe direction to turn.

All the armor and weapons from the last section could not stop this collapse.

🏃 Apace means at great speed

😱 The army panics instead of fighting

🔁 Fear round about repeats elsewhere in Jeremiah

📖 No preparation could stop this collapse

---
## 🧭 Stumble, And Fall Toward The North

This defeat happens near Carchemish, which sits in the north by the Euphrates.

"The north" is not a random direction here.

It marks exactly where this crushing loss took place.

Fast runners and strong soldiers both go down the same way.

Being swift or being mighty cannot outrun God's purpose for that day.

🧭 The north points to Carchemish's location

🏃 Even fast runners could not escape

💪 Strength offered no real protection

📖 God's purpose decided that day's outcome

---
## 🌊 Who Is This That Cometh Up As A Flood

Egypt's identity was tied to the Nile River flooding its banks every year.

That yearly flood brought rich soil and made Egypt's farmland fertile.

Here the prophet borrows that same flood picture for Egypt's army.

The army surges forward the same confident way the river rises.

The picture is about to turn ironic, since this flood will fail.

🌊 Egypt's life depended on the Nile's flood

🌾 Yearly flooding made Egypt's land fertile

🪖 The army is pictured as that flood

📖 This confident flood is about to fail

---
## 💥 I Will Go Up, And Will Cover The Earth

These are Pharaoh's own boastful words, quoted inside the prophecy.

He compares himself to the Nile, overflowing every bank in its path.

He claims he will destroy entire cities and everyone living in them.

This kind of pride always appears right before a prophet announces a fall.

Confidence this large is about to meet a much larger God.

🗣️ Pharaoh boasts in his own words

🌊 He compares himself to the flooding Nile

💥 He claims he will destroy whole cities

📖 Pride like this comes right before a fall

---
## 🌍 The Ethiopians And The Libyans, And The Lydians

Egypt did not fight this battle with Egyptian soldiers alone.

Ethiopia and Libya were allied African nations providing fighting men.

Lydia was a kingdom much further away, in what is now Turkey.

Needing this many foreign mercenaries shows how thin Egypt's own strength had become.

A nation confident enough to boast still had to hire outside help.

🌍 Ethiopia and Libya sent allied soldiers

🏹 Lydia came from modern day Turkey

💰 Egypt hired outside mercenaries for battle

📖 Hired help revealed Egypt's real weakness

---
# Jeremiah 46:10-14
# ⚔️ The Day Of The Lord's Vengeance
---
## 📅 The Day Of The Lord GOD Of Hosts

"The day of the LORD" names a moment of divine judgment.

This is not an angry God losing control.

It is an appointed day for settling accounts with Egypt.

"Hosts" refers to the armies of heaven under God's command.

Egypt's own army is about to meet a far greater one.

📅 Day of the Lord means judgment day

🧭 This judgment is planned, not random

👑 Hosts means heaven's own armies

📖 A far greater army now opposes Egypt

---
## 🩸 The Sword Shall Devour, And It Shall Be Satiate

This verse describes the coming battle as if it were a sacrifice.

"Satiate" means completely full and satisfied, like after a large meal.

The sword is pictured drinking blood until it is finally full.

This graphic picture was meant to show the total scale of the coming defeat.

Ancient readers understood sacrifice language immediately, even though it sounds shocking today.

🩸 Satiate means completely full or satisfied

⚔️ The sword is pictured drinking blood

🔥 Battle described using sacrifice language

📖 The image shows total, overwhelming defeat

---
## 🌿 Go Up Into Gilead, And Take Balm

Gilead was a region famous across the ancient world for one export, healing balm.

This same balm was once carried by traders in the story of Joseph, generations earlier.

Egypt is told to go get this famous medicine and try to heal.

"In vain" means it will not work no matter how much medicine is used.

Some wounds are simply too deep for any ordinary cure.

🌿 Gilead was famous for its healing balm

📜 Traders once carried this balm in Joseph's story

💊 Egypt is told to treat itself

📖 Some wounds go beyond any cure

---
## 📣 Thy Cry Hath Filled The Land

News of Egypt's defeat traveled fast to other nations.

Egypt's shame became an open international embarrassment.

"The mighty man hath stumbled against the mighty" pictures two strong armies colliding.

Both sides went down together in that collision.

A nation that boasted about its own strength now had nothing left to boast about.

📣 News of the defeat traveled fast

😳 Egypt's shame became public knowledge

💥 Two mighty armies collided and fell

📖 Boasting turned into open shame

---
## 🗡️ How Nebuchadrezzar King Of Babylon Should Come

This new message confirms Babylon will not stop at Carchemish.

Nebuchadrezzar will personally march his army into Egypt's own land.

This moves the threat from a border battle to a full invasion.

History records that Babylon really did invade Egypt years after this prophecy.

God's warning here was not vague or symbolic.

🗡️ Babylon will invade Egypt itself

🚶 Nebuchadrezzar leads the invasion personally

📍 The threat moves past the border

📖 History confirms this invasion really happened

---
# Jeremiah 46:15-19
# 📢 Pharaoh Is But A Noise
---
## 🏙️ Migdol, And In Noph, And In Tahpanhes

These are real Egyptian cities named one after another.

Migdol and Tahpanhes sat near Egypt's eastern border, the first stops for travelers.

Noph is another name for Memphis, one of Egypt's great ancient capitals.

Earlier chapters already showed Jewish refugees fleeing to these exact same cities.

This warning lands right where many of Jeremiah's own countrymen were hiding.

🏙️ Migdol and Tahpanhes sat near the border

🏛️ Noph is another name for Memphis

👥 Jewish refugees had fled to these cities

📖 Judgment reaches the very place they hid

---
## ❓ Why Are Thy Valiant Men Swept Away

This question is sarcastic, not a real request for information.

Egypt's best soldiers are gone, and the answer is already obvious.

"Because the LORD did drive them" gives the real reason.

This defeat was not bad luck or simply a stronger enemy.

God himself was behind Egypt's collapse the whole time.

❓ The question is sarcastic, not sincere

🏃 Egypt's best soldiers have vanished

🙌 The LORD caused this collapse directly

📖 Human defeat traced back to God's hand

---
## 🏃 Arise, And Let Us Go Again To Our Own People

Foreign soldiers hired to fight for Egypt start deciding to go home instead.

"The oppressing sword" means the attacking army chasing them down.

These mercenaries never had real loyalty to Egypt in the first place.

Once the battle turns bad, hired soldiers protect themselves first.

Egypt's army is falling apart from the inside, not only from outside attack.

🏃 Hired soldiers decide to go home

⚔️ The oppressing sword means the pursuing army

💸 Mercenaries had no real loyalty to Egypt

📖 The army collapses from within itself

---
## 📢 Pharaoh King Of Egypt Is But A Noise

This is a harsh nickname given to Pharaoh in the middle of the prophecy.

"A noise" means all talk and no real power behind it.

"He hath passed the time appointed" means he missed his best chance to act.

Pharaoh had the opportunity to stop Babylon earlier and did not take it.

Now his loud reputation cannot back up anything he claims.

📢 A noise means empty, powerless talk

⏰ He missed his best chance to act

👑 Pharaoh's reputation outran his real power

📖 Empty words cannot undo a missed chance

---
## ⛰️ As Tabor Is Among The Mountains, And As Carmel By The Sea

Tabor and Carmel were two of the most easily recognized mountains in the land.

Both stood out clearly above everything around them.

This comparison describes someone coming who will stand out just as obviously.

That someone is Nebuchadrezzar, arriving with unmistakable, overwhelming force.

Nothing about this coming invasion will be quiet or hidden.

⛰️ Tabor and Carmel were famous landmarks

👁️ Both mountains stood out clearly

🪖 Nebuchadrezzar will stand out just as clearly

📖 This invasion will be impossible to miss

---
## 🏚️ Noph Shall Be Waste And Desolate

Noph, also called Memphis, was one of Egypt's grandest cities.

"Furnish thyself to go into captivity" is a command to pack for exile.

A desolate city means it will be left empty, with no one living there.

A capital this important falling empty would have shocked the whole ancient world.

Even Egypt's greatest cities were not beyond God's reach.

🏛️ Noph was also called Memphis

🎒 Furnish thyself means pack for exile

🏚️ Desolate means left completely empty

📖 No city stood beyond God's reach

---
# Jeremiah 46:20-24
# 🐄 A Fair Heifer Faces Destruction
---
## 🐄 Egypt Is Like A Very Fair Heifer

A "heifer" is a young female cow, often associated with beauty and health.

Calling Egypt a fair heifer pictures a nation admired for its wealth and strength.

That same beautiful heifer is about to be led to slaughter.

"Destruction cometh out of the north" points back to Babylon's direction of attack.

Beauty and strength offered Egypt no real protection here.

🐄 Heifer means a young, healthy cow

💎 The image pictures Egypt's wealth and beauty

🔪 This heifer is headed toward slaughter

📖 Beauty could not protect Egypt from judgment

---
## 🐂 Also Her Hired Men Are In The Midst Of Her

These hired soldiers are compared to well fed, fattened cattle.

A fattened animal looks strong but is actually being prepared for slaughter, not battle.

These mercenaries turned and fled instead of fighting to the end.

"The time of their visitation" means the moment God's judgment finally arrived.

Comfort and good feeding had made these troops useless in a real crisis.

🐂 Fatted bullocks means well fed cattle

🔪 Fattening prepares an animal for slaughter

🏃 These hired troops fled instead of fighting

📖 Comfort left them useless in a real crisis

---
## 🐍 The Voice Thereof Shall Go Like A Serpent

A retreating army makes a low hissing sound while it flees.

That sound is compared here to a serpent sliding through the grass.

Meanwhile the attacking army does not hiss or hide at all.

They come forward openly, with axes, like men cutting down trees.

One side sneaks away while the other marches in with confidence.

🐍 Retreat is compared to a serpent's hiss

🪓 The attackers come forward with axes

🌲 They advance like men cutting down trees

📖 Confidence and confusion stand side by side

---
## 🌲 They Shall Cut Down Her Forest

"Her forest" is a picture for Egypt's population and army, not literal trees.

"Though it cannot be searched" means the forest seemed impossible to measure or count.

Grasshoppers appear everywhere in huge, overwhelming numbers.

Babylon's army is compared to that same overwhelming number.

No matter how many people Egypt had, Babylon still had more.

🌲 Forest pictures Egypt's whole population

🦗 Grasshoppers describe overwhelming, countless numbers

🪖 Babylon's army matched that same scale

📖 Egypt's numbers could not outmatch Babylon's

---
## 👧 The Daughter Of Egypt Shall Be Confounded

"Daughter of Egypt" is a poetic way the prophets refer to the whole nation.

"Confounded" means thrown into shame and total confusion.

"The people of the north" points back one more time to Babylon.

This verse closes out the picture of Egypt's complete collapse.

Everything promised back in the chapter's opening verses has now come true.

👧 Daughter of Egypt means the whole nation

😳 Confounded means shamed and confused

🧭 People of the north again means Babylon

📖 The chapter's early warning is now fulfilled

---
# Jeremiah 46:25-28
# 🕊️ Judgment On Egypt, Comfort For Jacob
---
## 🏛️ I Will Punish The Multitude Of No

"No" is the Hebrew name for Thebes, one of Egypt's most important religious cities.

Thebes was home to Amon, one of Egypt's chief gods.

God says plainly he will judge Egypt's gods along with Egypt's king and people.

This was not a vague threat against a vague enemy.

Specific cities, specific gods, and a specific king all stand named.

🏛️ No is the Egyptian city Thebes

🗿 Thebes worshiped the god Amon

⚖️ God judges Egypt's gods, not only its people

📖 Judgment named specific places and gods

---
## 🏺 Afterward It Shall Be Inhabited, As In The Days Of Old

Nebuchadrezzar really did conquer Egypt, just as this chapter predicted.

Unlike some other nations in these same chapters, Egypt gets a promise of recovery.

"As in the days of old" means life would eventually return to normal there.

Judgment in this chapter was real, but it was not meant to be forever.

God can discipline a nation without erasing it completely.

🏺 Egypt's judgment really did happen historically

🔄 Egypt is promised eventual recovery

📜 Days of old means a return to normal

📖 Discipline here was not total destruction

---
## 🕊️ Fear Not Thou, O My Servant Jacob

The message suddenly turns from Egypt toward Israel, called here by Jacob's name.

"Thy seed" means Jacob's descendants, the people of Israel.

God promises to rescue them from the land of their captivity.

"Return, and be in rest and at ease" pictures a peaceful homecoming.

This comfort arrives right after two straight chapters of national judgment.

🕊️ The message shifts from Egypt to Israel

👨‍👩‍👧 Jacob's seed means Israel's descendants

🏡 God promises a peaceful homecoming

📖 Comfort follows right after judgment

---
## ⚖️ I Will Not Make A Full End Of Thee

God promises "a full end" for the other nations he judges.

Israel instead receives correction, not complete destruction.

"Correct thee in measure" means real discipline kept within careful limits.

Israel's sin does not go unpunished here.

Even so, God's anger toward Jacob always stops short of the end.

⚖️ Other nations face a full end

🛡️ Israel receives correction, not destruction

📏 In measure means discipline with real limits

📖 God's anger toward Jacob always has a limit
`.trim();

export const JEREMIAH_FORTY_SIX_PERSONAL_SECTIONS = parseJeremiahFortySixRawNotes(JEREMIAH_FORTY_SIX_RAW_NOTES);
