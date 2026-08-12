export type FirstKingsNineteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseFirstKingsNineteenRawNotes(rawText: string): FirstKingsNineteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: FirstKingsNineteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*FirstKingsNineteen\s+19:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing 1 Kings 19 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+FirstKingsNineteen\s+19:/i.test(lines[index].trim())) {
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
        !/^#\s+FirstKingsNineteen\s+19:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing 1 Kings 19 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 19,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `1 Kings 19:${startVerse}` : `1 Kings 19:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 5) {
    throw new Error("Expected 5 1 Kings 19 sections, received " + sections.length);
  }

  return sections;
}

const FIRST_KINGS_NINETEEN_RAW_NOTES = `# FirstKingsNineteen 19:1-3
# 😨 Elijah Flees For His Life
---
## 👑 Ahab Told Jezebel All That Elijah Had Done

Ahab does not confront Elijah himself.

He runs straight to his wife Jezebel instead.

Jezebel was a foreign princess who brought Baal worship into Israel.

Chapter eighteen already showed the fire from heaven and the death of Baal's prophets.

Ahab reports the loss to the one person more devoted to Baal than he was.

👑 Ahab reports to Jezebel first

🔥 Chapter eighteen already showed the fire

⚔️ Baal's prophets were slain there

📖 Ahab hands his fear to Jezebel

## 😤 So Let The Gods Do To Me, And More Also

This sentence is an ancient oath formula.

Jezebel calls down a curse on her own gods if she fails.

Speaking a curse on yourself was a way of guaranteeing every word was serious.

She names an exact deadline instead of attacking Elijah right away.

A truly confident killer would not need to announce the plan first.

😤 An oath formula, not just a threat

🙏 She curses her own gods if she fails

⏰ She names an exact deadline

📖 A real threat rarely announces itself first

## 🏃 He Arose, And Went For His Life

This is not the same confident man from chapter eighteen.

He had just called fire down from heaven in front of the whole nation.

Now one threat from Jezebel sends him running for his life.

Fear can follow a great victory faster than anyone expects.

A mountaintop moment does not remove fear by itself.

🏃 Elijah runs after his greatest victory

🔥 He had just seen fire fall from heaven

😨 One threat undoes his confidence

📖 Great victories do not remove fear

## 🗺️ Beersheba, Which Belongeth To Judah

Beersheba sits at the far southern edge of the land.

It belongs to Judah, a separate kingdom from the Israel Ahab rules.

Crossing into Judah moves Elijah outside Jezebel's direct reach.

He leaves his servant behind here and continues on alone.

🗺️ Beersheba marks the southern edge

👑 Judah is a separate kingdom from Israel

🚶 Elijah moves outside Jezebel's reach

📖 He continues on completely alone

# FirstKingsNineteen 19:4-8
# 🌳 Fed In The Wilderness
---
## 🚶 A Day's Journey Into The Wilderness

This phrase pushes Elijah even further past Beersheba.

He now travels alone into the open desert.

This region is the Negev, a harsh and dry wilderness.

Walking alone into a place like this was dangerous even without Jezebel's threat.

🚶 Elijah pushes further past Beersheba

🏜️ The Negev is harsh and dry

😔 He now travels completely alone

📖 Danger did not end with Jezebel's threat

## 🌿 Sat Down Under A Juniper Tree

Juniper here likely means a broom tree, a low desert shrub.

It is one of the only sources of shade in this desert.

Elijah collapses under the only shelter he can find.

This is a man who has run until he has nothing left.

🌿 Juniper likely means a broom tree

☀️ It gave rare desert shade

😩 Elijah collapses from exhaustion

📖 He has nothing left to run on

## 😔 Now, O LORD, Take Away My Life

Elijah is not just tired here, he is asking to die.

It is enough means he has reached his absolute limit.

He compares himself to his fathers, earlier prophets who suffered the same fate.

This despair comes right after the greatest victory of his life.

God does not scold him for saying it.

😔 Elijah asks God to let him die

🏳️ It is enough means his limit

📜 He compares himself to earlier prophets

📖 Victory did not prevent deep despair

## 👼 Behold, Then An Angel Touched Him

God does not answer the death wish with words first.

He sends an angel to touch Elijah and wake him gently.

No rebuke comes for wanting to die.

Just a touch, and a simple instruction to eat.

Care arrives before any conversation about his fear.

👼 An angel touches Elijah awake

🤫 No rebuke for wanting to die

🍞 Care comes as food, not words

📖 Comfort arrives before any conversation

## 🍞 A Cake Baken On The Coals, And A Cruse Of Water

Baken is an old form of baked.

A cruse is a small clay jar for water.

God does not lecture Elijah about his despair here.

He simply provides warm bread and water for an exhausted body.

Sometimes the first answer to despair is rest, not a sermon.

🍞 Baken means baked

🏺 A cruse is a small clay jar

🙏 God offers care, not a lecture

📖 Rest can come before any sermon

## ⛰️ In The Strength Of That Meat Forty Days And Forty Nights

The angel comes back a second time in verse seven.

He says the journey ahead is too great without more strength.

One meal from an angel fuels forty days and forty nights of walking.

That is not how food normally works.

The number forty repeats often in scripture, marking a time of testing.

Elijah now walks toward a meeting with God on that same kind of mountain.

🍞 One meal fuels forty days of walking

📿 Forty repeats often in scripture, marking testing

⛰️ The journey ahead was too great alone

📖 Elijah heads toward that same mountain

# FirstKingsNineteen 19:9-14
# 🌬️ The Still Small Voice
---
## 🧭 He Came Thither Unto A Cave

Thither is an old word meaning to that place.

Elijah has now reached Horeb, another name for Mount Sinai.

This is the same mountain where God gave Moses the law centuries earlier.

Elijah runs straight to the place where Israel's relationship with God began.

🧭 Thither means to that place

⛰️ Horeb is another name for Sinai

📜 Moses received the law on this mountain

📖 Elijah runs to where the story began

## ❓ What Doest Thou Here, Elijah?

This is not God asking for information he lacks.

The question presses Elijah to explain his own choice out loud.

Elijah left his post as a prophet to hide in a cave far away.

God repeats the exact same question again in verse thirteen.

Elijah gets a second chance to answer honestly.

❓ God already knows the answer

🗣️ The question invites honesty

🏃 Elijah left his post to hide

📖 God repeats it once more later

## 🔥 I Have Been Very Jealous For The LORD God Of Hosts

Jealous here does not mean petty envy.

It means Elijah burned with protective zeal for God's honor.

LORD of hosts pictures God commanding armies of angels.

It is one of the strongest titles used for him in scripture.

Elijah says he has given everything to defend that name.

🔥 Jealous means protective zeal, not envy

⚔️ LORD of hosts means commander of armies

🛡️ It is one of God's strongest titles

📖 Elijah gave everything to defend God's name

## 😔 I, Even I Only, Am Left

Elijah believes he is the last faithful person left in Israel.

That belief is not actually true.

Obadiah already hid one hundred prophets in caves back in chapter eighteen.

God will correct this exact claim later in this chapter.

Despair can make a person feel more alone than they really are.

😔 Elijah believes he is truly alone

🙈 Obadiah already hid a hundred prophets

🔮 God corrects this claim later

📖 Despair exaggerates how alone we are

## 🌬️ The LORD Was Not In The Wind

God tells Elijah to stand on the mountain and wait.

A wind tears the mountains apart, strong enough to shatter rock.

God is not inside that wind.

The most dramatic display is not automatically where God is found.

🌬️ A wind shatters the rocks

🚫 God is not in the wind

👀 Elijah watches from the cave entrance

📖 Drama is not always where God is

## 🌋 After The Earthquake A Fire

The pattern repeats, an earthquake follows the wind.

Then a fire follows the earthquake.

God is not found in the earthquake.

God is not found in the fire either.

Three separate displays of raw power hold no sign of God.

By now the reader expects him in whatever comes next.

🌋 An earthquake follows the wind

🔥 Then a fire follows the earthquake

🚫 God is absent from both

📖 The reader expects him next

## 🤫 A Still Small Voice

This famous phrase describes a low whisper, almost silence itself.

After wind, earthquake, and fire, God finally speaks in the quietest way.

The contrast makes the moment land harder.

God does not need to shout to be heard.

His clearest word often comes in the softest moment, not the loudest one.

🤫 A still small voice means a whisper

🎭 Wind, earthquake, and fire came first

👂 The quiet moment lands hardest

📖 God's clearest word is often the softest

## 🧥 He Wrapped His Face In His Mantle

A mantle is a heavy outer cloak, the kind prophets wore as a mark of their calling.

Covering the face was a sign of reverence in God's presence.

Moses also hid his face earlier in Exodus when God's presence passed by.

This same mantle becomes important again later in this chapter.

🧥 A mantle is a heavy prophet's cloak

🙈 Covering the face showed reverence

📜 Moses did the same in Exodus

📖 This mantle returns later in the chapter

# FirstKingsNineteen 19:15-18
# 👑 A New Commission
---
## 🚶 Return On Thy Way To The Wilderness Of Damascus

God does not comfort Elijah and leave him in the cave.

He sends him back out with a job to do.

Damascus was the capital city of Syria, a kingdom north of Israel.

God answers deep despair with a fresh assignment, not permanent rest.

🚶 God sends Elijah back to work

🏙️ Damascus was Syria's capital city

🧭 Syria sat north of Israel

📖 A new task answers his despair

## 🫙 Anoint Hazael To Be King Over Syria

To anoint means pouring oil on someone's head, marking them as chosen by God.

Hazael was not even a king yet.

God names him as Syria's future king before he ever takes the throne.

This same Hazael appears later in Second Kings as a real threat to Israel.

🫙 Anoint means pouring oil to mark someone chosen

👑 Hazael is not yet Syria's king

🔮 God names him before he takes the throne

📖 Hazael reappears later as a real threat

## 👑 Jehu The Son Of Nimshi Shalt Thou Anoint

Jehu is not yet Israel's king, just like Hazael in Syria.

Son of Nimshi identifies exactly which Jehu this is.

Jehu was a common name in Israel at the time.

He later becomes king through a violent uprising in Second Kings.

Jehu will be the one who finally ends Ahab's whole family line.

👑 Jehu is not yet Israel's king

🏷️ Son of Nimshi names him exactly

⚔️ He takes the throne by force later

📖 Jehu ends Ahab's entire family line

## 🔄 To Be Prophet In Thy Room

In thy room is an old way of saying in your place.

God tells Elijah that Elisha will take over his role as prophet.

Elisha, son of Shaphat, comes from Abelmeholah, a town in the Jordan valley.

Elijah's ministry is not ending in failure.

It is ending in succession.

🔄 In thy room means in your place

🧑‍🤝‍🧑 Elisha will take over as prophet

🗺️ Abelmeholah sits in the Jordan valley

📖 This is succession, not failure

## ⚔️ Him That Escapeth The Sword Of Hazael Shall Jehu Slay

God lays out a three stage judgment against Baal worship.

Hazael's sword strikes first.

Whoever survives Hazael faces Jehu next.

Whoever survives Jehu faces Elisha's prophetic word last.

No single ruler carries out this judgment alone.

⚔️ Hazael strikes the first blow

🗡️ Jehu catches whoever escapes him

📜 Elisha finishes it with his word

📖 Judgment comes through three separate hands

## 🔢 Yet I Have Left Me Seven Thousand In Israel

This directly answers Elijah's claim from earlier that he was the only one left.

Seven thousand people in Israel never bowed to Baal.

Bowing the knee and kissing an idol were both acts of worship toward it.

Elijah was never as alone as he believed.

God had already been preserving a faithful remnant the whole time.

🔢 Seven thousand never bowed to Baal

🙇 Bowing the knee meant worship

💋 Kissing an idol meant worship too

📖 Elijah was never truly alone

# FirstKingsNineteen 19:19-21
# 🐂 The Calling Of Elisha
---
## 🐂 Plowing With Twelve Yoke Of Oxen

A yoke is a wooden frame joining two oxen together.

Twelve yoke means twenty four oxen working at once.

Owning that many animals marks Elisha's family as genuinely wealthy.

Elijah finds his successor already working hard, not waiting to be noticed.

🐂 A yoke joins two oxen together

🔢 Twelve yoke means twenty four oxen

💰 This marks a genuinely wealthy family

📖 Elisha is found hard at work

## 🧥 Elijah Passed By Him, And Cast His Mantle Upon Him

The mantle is the same cloak Elijah wrapped around his face at the cave.

Throwing it over Elisha's shoulders was a wordless call to follow him.

No long speech and no explanation, just the cloak suddenly on his shoulders.

Elisha understands exactly what the gesture means without being told.

🧥 The mantle returns from the cave scene

🤫 It is a wordless call to follow

👕 The cloak lands on Elisha's shoulders

📖 Elisha understands the gesture instantly

## 👋 Let Me, I Pray Thee, Kiss My Father And My Mother

This is not Elisha stalling or having second thoughts.

Saying goodbye to parents was a normal, respectful custom before leaving home.

Elijah's blunt reply leaves the choice entirely up to Elisha.

Elisha still chooses to follow even with an easy way out.

👋 Elisha is not stalling here

🏠 Saying goodbye was a respectful custom

🤷 Elijah leaves the choice up to him

📖 Elisha chooses to follow anyway

## 🔥 Took A Yoke Of Oxen, And Slew Them

Elisha destroys his own farming equipment and cooks the oxen as a meal.

The wooden plow itself becomes the fire that cooks the meat.

This is not a gesture that leaves a way back.

Sharing the meal with the people closes out his old life completely.

He then leaves to serve Elijah and learn the work of a prophet.

🔥 The plow becomes the cooking fire

🍖 Elisha shares a farewell meal

🚫 There is no way back now

📖 He leaves to serve and learn
`.trim();

export const FIRST_KINGS_NINETEEN_PERSONAL_SECTIONS = parseFirstKingsNineteenRawNotes(FIRST_KINGS_NINETEEN_RAW_NOTES);
