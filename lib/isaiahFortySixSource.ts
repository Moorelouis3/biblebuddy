export type IsaiahFortySixPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortySixRawNotes(rawText: string): IsaiahFortySixPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortySixPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+46:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 46 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+46:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+46:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 46 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 46,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 46:${startVerse}` : `Isaiah 46:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 Isaiah 46 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_SIX_RAW_NOTES = `# Isaiah 46:1-2
# 📉 Bel And Nebo Bow Down
---
## 🏛️ Bel Boweth Down, Nebo Stoopeth

Bel was another name for Marduk, the chief god of Babylon.

Nebo was Marduk's son, worshipped as the god of writing and wisdom.

Boweth down and stoopeth both describe a god falling or collapsing.

The gods Babylon trusted most are pictured toppling over first.

🏛️ Bel was Marduk, Babylon's chief god
📜 Nebo was the god of writing and wisdom
📉 Boweth down means the god is falling
📖 Babylon's most trusted gods fall first

## 🐫 Their Idols Were Upon The Beasts, And Upon The Cattle

These idols were massive statues covered in gold and silver.

Moving one required pack animals strong enough to carry the weight.

Priests loaded the idols onto beasts to evacuate them before Babylon fell.

A living God does not need rescuing. Wood and metal statues do.

🐫 Idols were carried by pack animals
🥇 They were massive, covered in gold and silver
🏃 Priests tried to evacuate them before Babylon fell
📖 A living God never needs rescuing like this

## 🔁 They Stoop, They Bow Down Together

Verse one already described Bel and Nebo falling on their own.

This line repeats the picture with both gods failing at the exact same moment.

Even joined together, the two chief gods could not stay upright.

Real power multiplies when combined. These gods add up to nothing at all.

🔁 Repeats the collapse already pictured in verse one
🤝 Both gods fail at the same moment here
📉 Together they still cannot stay standing
📖 Combined, these gods add up to nothing

## 🔒 Themselves Are Gone Into Captivity

The gods that were supposed to protect Babylon cannot even save themselves.

Conquering armies in this period often paraded captured statues through their own city.

The very idols Babylon trusted become trophies carried off by the winning side.

A god that must be rescued was never a god worth trusting.

🔒 The gods cannot even save themselves
🏆 Winning armies paraded captured statues as trophies
🐎 Babylon's own idols become the trophies here
📖 A god that needs rescue was never real

# Isaiah 46:3-4
# 🤱 God Carries His People
---
## 👂 Hearken Unto Me, O House Of Jacob

Hearken means listen closely, more than simply hearing a sound.

House of Jacob refers to the descendants of Jacob, later renamed Israel.

The chapter just showed idols that cannot speak, hear, or act.

Here the true God speaks directly and expects to be heard.

👂 Hearken means listen closely
👪 House of Jacob means Jacob's descendants
🤐 The idols just shown cannot speak or hear
📖 God speaks and expects a response

## 🌱 Which Are Borne By Me From The Belly, Which Are Carried From The Womb

Borne and carried both describe being held and supported by someone else.

Belly and womb picture Israel's very beginning as a nation.

The idols in verses one and two had to be carried by tired animals.

Here God says He has carried His people Himself since the start.

🌱 Borne and carried mean held and supported
🤱 Belly and womb picture Israel's beginning
🐫 Idols needed animals to carry them
📖 God carries His people Himself instead

## 🆔 Even To Your Old Age I Am He

I am he is a short way of saying God stays exactly the same.

This promise covers the whole span of life, not just the beginning.

Old age often brought fear of being set aside or forgotten.

God promises He never changes toward His people at any age.

🆔 I am he means God never changes
📆 The promise covers a whole lifetime
😟 Old age often brought fear of being forgotten
📖 God never sets His people aside

## 👴 Even To Hoar Hairs Will I Carry You

Hoar hairs is an old way of describing gray or white hair.

It marks the final years of a long life.

I have made ties this promise back to God as Israel's maker.

The same God who formed Israel promises to carry it to the very end.

👴 Hoar hairs means gray or white hair
🕰️ It marks the final years of life
🛠️ I have made ties back to the maker
📖 The maker carries His people to the end

# Isaiah 46:5-7
# 🛠️ How An Idol Gets Made
---
## ⚖️ To Whom Will Ye Liken Me, And Make Me Equal

Liken means compare or treat as similar to something else.

This is a rhetorical question with an obvious answer already built in.

No idol, ruler, or created thing stands on the same level as God.

The question invites the reader to actually try and come up empty.

⚖️ Liken means compare or treat as equal
❓ This is a rhetorical question
🚫 Nothing stands on the same level as God
📖 The search always comes up empty

## 💰 They Lavish Gold Out Of The Bag, And Weigh Silver In The Balance

A balance was a simple scale used to weigh out precious metal.

Before coined money, silver and gold were measured this way for every purchase.

Lavish means spending gold freely, without holding back.

This describes wealthy people funding the creation of their own god.

⚖️ A balance weighed precious metal like a scale
💰 Coined money did not exist yet
🪙 Lavish means spending freely, without limit
📖 Wealthy people fund their own god

## 🧑‍🎨 Hire A Goldsmith, And He Maketh It A God

A goldsmith was a craftsman trained to shape gold and silver.

He is paid like any other tradesman for his skilled work.

The very next word calls the finished object a god.

The irony is sharp. A hired worker manufactures his own customer's god.

🧑‍🎨 A goldsmith shaped gold and silver for pay
💵 He is hired like any other tradesman
🗿 His finished product gets called a god
📖 A worker manufactures the very god he serves

## 🙇 They Fall Down, Yea, They Worship

These are the same people who just watched the idol being built.

They saw the raw gold, the scale, and the goldsmith at work.

Even that knowledge does not stop them from bowing down afterward.

Worship here is given to something its own worshippers helped create.

👀 They watched the idol being built
⚙️ They saw the gold and the craftsman
🙇 Knowledge does not stop them from bowing
📖 They worship what they helped create

## 💪 They Bear Him Upon The Shoulder, They Carry Him

This idol cannot walk, so its worshippers must carry it everywhere.

Bear upon the shoulder describes physically hauling the statue from place to place.

A few verses earlier, God promised to carry His people the same way.

Here the roles are completely reversed. The worshippers carry their own god.

🚶 The idol cannot move on its own
💪 Bear upon the shoulder means physically hauling it
🔄 God carries people. Here they carry a god.
📖 The roles are completely reversed

## 😢 One Shall Cry Unto Him, Yet Can He Not Answer

Someone in real trouble finally cries out to this idol for help.

The statue stands exactly where it was set and cannot answer at all.

It cannot move to help, and it cannot even speak a word back.

A god that must be carried can never carry anyone else's burden.

😢 Someone cries out to the idol for help
🤐 The statue cannot answer at all
🚫 It cannot save anyone from trouble
📖 A carried god cannot carry anyone's burden

# Isaiah 46:8-11
# 🔮 Declaring The End From The Beginning
---
## 🧠 Remember This, And Shew Yourselves Men

Shew yourselves men is an old way of saying act like responsible adults.

It is a call to stop and think clearly, not react emotionally.

After watching idols get built and carried, this is the moment to reconsider.

God is asking for honest thinking, not blind loyalty to old habits.

🧠 Shew yourselves men means act like adults
🛑 It calls for a pause to think clearly
🗿 It follows straight after the idol description
📖 God asks for honest thinking, not habit

## ⚖️ Bring It Again To Mind, O Ye Transgressors

Transgressors means people who have broken God's law and rebelled against Him.

Bring it again to mind means recall something already known, not learn something new.

This is addressed to Israel, who had wandered toward idols before.

God calls His own rebellious people back to what they already knew was true.

⚖️ Transgressors means those who broke God's law
🔁 Bring to mind means recall, not learn new
👪 This is addressed to Israel's own people
📖 God calls rebels back to known truth

## 📜 Remember The Former Things Of Old

Former things of old points back to what God has already done.

This likely includes the exodus from Egypt and earlier fulfilled promises.

Israel is told to remember real history, not just take a claim on faith.

Past faithfulness becomes the evidence for trusting what comes next.

📜 Former things of old means past history
🌊 It likely includes the exodus from Egypt
🧾 Israel is pointed to real evidence
📖 Past faithfulness backs up future trust

## 🔁 I Am God, And There Is None Like Me

This claim gets stated twice in the very same verse.

Repetition in Hebrew poetry marks the most important point being made.

None else means no other god exists at all.

None like me means nothing else compares, even among created things.

🔁 The claim repeats twice in one verse
📢 Repetition marks the most important point
🚫 None else means no other god exists
📖 None like me means nothing compares

## 🔮 Declaring The End From The Beginning

This describes knowing how something ends before it even starts.

Chapters earlier in Isaiah challenge false gods to do this and they cannot.

Only the true God can name a future outcome with total accuracy.

This becomes proof of identity, not just a poetic claim.

🔮 This means knowing the end before the start
⚖️ Earlier chapters challenge idols to do this
🏆 Only the true God can do it
📖 This proves identity, not just poetry

## ⏳ From Ancient Times The Things That Are Not Yet Done

Ancient times means long before the event, not shortly before it.

That timing is the whole point. The future gets announced far in advance.

A vague guess close to the event proves very little.

A specific claim made far in advance is much harder to fake.

⏳ Ancient times means long before the event
🎯 It is specific, not a vague guess
🚫 A late guess would prove very little
📖 An early claim is far harder to fake

## 🗺️ My Counsel Shall Stand, And I Will Do All My Pleasure

Counsel here means God's plan or purpose, not advice given to someone else.

Pleasure here means what God wills, not casual enjoyment.

Stand means the plan will hold firm no matter what resists it.

Nothing described earlier, not an idol or an empire, can overturn this plan.

🗺️ Counsel means God's plan or purpose
🎯 Pleasure means what God wills, not fun
🧱 Stand means the plan holds firm
📖 No idol or empire can overturn it

## 🦅 Calling A Ravenous Bird From The East

Ravenous bird pictures a fast, fierce bird of prey swooping toward its target.

This image points to Cyrus, the Persian king named directly in the previous chapter.

Persia lay east of Babylon, matching the direction named here.

The same king God named by name is now pictured as a hunting bird.

🦅 Ravenous bird pictures a fierce bird of prey
👑 This points to Cyrus from chapter forty five
🧭 Persia lay east of Babylon
📖 The named king becomes a hunting bird

# Isaiah 46:12-13
# 🕊️ My Salvation Shall Not Tarry
---
## 🪨 Hearken Unto Me, Ye Stouthearted

Stouthearted sounds like a compliment, but here it means stubborn and hardened.

It describes people who refuse to yield or change their mind.

This is the same hearken from verse three, but aimed at a harder audience.

God calls out to His people even while they resist Him.

🪨 Stouthearted means stubborn and hardened
🙅 It describes people who refuse to yield
🔁 This echoes the hearken from verse three
📖 God calls even to those resisting Him

## 📏 That Are Far From Righteousness

Far from righteousness describes spiritual distance, not a physical location.

This names people who have drifted from living rightly before God.

The very next verse answers this distance directly.

God is about to close a gap His own people created.

📏 Far from righteousness means spiritual distance
🚶 It names people who drifted away
🔜 The next verse directly answers this
📖 God is about to close that gap

## 🔗 I Bring Near My Righteousness

This directly answers the distance named in the verse right before it.

Bring near means God closes the gap Himself.

The people do not have to travel toward righteousness on their own.

The promise also adds that the rescue will not be far off or delayed.

🔗 This directly answers the verse before it
🤝 God closes the gap Himself
🚶 People do not travel there alone
📖 The rescue is close, not distant

## 🏔️ I Will Place Salvation In Zion For Israel My Glory

Zion refers to Jerusalem, especially the hill where the temple stood.

Placing salvation there means rescue is tied to a specific, real place.

Israel my glory is tender language, calling His people His own glory.

Useless gods opened this chapter. A God who calls His people glory closes it.

🏔️ Zion refers to Jerusalem and its temple hill
📍 Salvation is tied to a real place
💎 Israel my glory is tender, covenant language
📖 Useless idols open the chapter, glory closes it`.trim();

export const ISAIAH_FORTY_SIX_PERSONAL_SECTIONS = parseIsaiahFortySixRawNotes(ISAIAH_FORTY_SIX_RAW_NOTES);
