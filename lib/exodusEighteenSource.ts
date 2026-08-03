export type ExodusEighteenPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusEighteenRawNotes(rawText: string): ExodusEighteenPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusEighteenPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+18:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 18 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+18:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+18:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 18 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 18,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 18:${startVerse}` : `Exodus 18:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 18 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_EIGHTEEN_RAW_NOTES = `# Exodus 18:1-6
# 👨‍👩‍👧 Jethro Brings Moses' Family
---
## 👴 Jethro, The Priest Of Midian, Moses' Father In Law

Jethro held real authority in Midian, not just a family relationship.

Priest means he led worship and represented God to his people.

Moses lived with him for forty years after fleeing Egypt.

He married Jethro's daughter Zipporah during those years.

Exodus chapter two calls this same man Reuel.

Many scholars believe Reuel was a family name and Jethro was his personal title.

This man shaped Moses long before the burning bush.

👴 Priest means he led worship
🏜️ Moses lived with him forty years
👰 Zipporah was Jethro's daughter
📖 Jethro shaped Moses long before Sinai

---

## 📰 Heard Of All That God Had Done For Moses

News of what happened in Egypt did not stay inside Israel's camp.

Jethro lived far away in Midian, east of the Red Sea.

Word of the plagues and the crossing of the sea had already reached him.

This detail explains why Jethro comes now instead of earlier.

He arrives because of what he heard, not because he was summoned.

📰 News of Egypt reached Midian
🗺️ Jethro lived far from Israel's camp
👂 He came because of what he heard
📖 God's public acts spread beyond Israel

---

## 🚫 Took Zipporah, Moses' Wife, After He Had Sent Her Back

This does not mean Moses had divorced or abandoned his wife.

The text does not tell us exactly when Moses sent her back.

Many scholars believe it happened before he returned to confront Pharaoh.

Traveling into a dangerous standoff with a king was no place for his wife and sons.

Jethro brings the family that had been kept safe during the plagues.

🚫 Not a divorce or abandonment
❓ The exact timing is not stated
🛡️ The family was kept safe from danger
📖 This chapter reunites the family

---

## 🌍 Gershom, For He Said, I Have Been An Alien In A Strange Land

Gershom's name is built from a Hebrew word meaning stranger.

Moses named him that during his early years as a fugitive shepherd in Midian.

Exodus chapter two already explains this meaning the first time this son is named.

Moses felt like an outsider even in the place that had taken him in.

That old wound is still part of his story here, years later.

🌍 Gershom means stranger
🐑 Named during his shepherd years
📜 Chapter two explains it first
➡️ Moses still carried that memory

---

## 🙏 Eliezer, For The God Of My Father ... Was Mine Help, And Delivered Me From The Sword Of Pharaoh

Eliezer means my God is my help.

This is the first time in the whole book that this son is actually named.

The name looks back at a moment Exodus two only briefly mentions.

Pharaoh had already tried once to have Moses killed for defending a fellow Hebrew.

Moses names his own son as a lasting reminder that God stepped in.

🙏 Eliezer means my God is my help
🆕 Named here for the first time
⚔️ Points back to Pharaoh's death threat
📖 A name that testifies to rescue

---

## ⛰️ Encamped At The Mount Of God

The mount of God is Mount Horeb, the same mountain also called Sinai.

This is the exact place where God first spoke to Moses out of the burning bush.

Israel's camp now sits at the very spot Moses once stood as a runaway shepherd.

Jethro is walking into ground that already holds deep meaning for his son in law.

⛰️ The mount of God is Sinai
🔥 The same place as the burning bush
🔁 Moses has returned to where he was called
📖 The camp sits on holy ground

---

## 📣 I Thy Father In Law Jethro Am Come Unto Thee

Jethro sends word ahead instead of walking straight into camp unannounced.

Approaching a camp of well over a million people called for real caution.

Announcing himself by name and relationship kept the meeting peaceful and respectful.

This small courtesy shows Jethro's wisdom before he ever gives Moses any advice.

📣 Jethro announces himself first
🏕️ Israel's camp was enormous
🤝 This kept the meeting peaceful
📖 His wisdom shows before he speaks it

# Exodus 18:7-9
# 🤗 A Warm Reunion
---
## 🙇 Moses Went Out To Meet His Father In Law, And Did Obeisance, And Kissed Him

Obeisance means a deep, respectful bow.

Moses now leads a whole nation, yet he still humbles himself before Jethro.

A kiss on the cheek was a normal greeting between close family in this culture.

Moses could have stayed seated and let Jethro approach him instead.

He chooses honor over status.

🙇 Obeisance means a deep bow
👑 Moses now led a whole nation
💋 A kiss was a normal family greeting
📖 He chose honor over status

---

## 🗣️ They Asked Each Other Of Their Welfare

This phrase describes the normal greeting used before any serious talk began.

Family members checked on each other's health and wellbeing first.

Only after this did they move into the tent to talk business.

Relationship came before the real conversation.

🗣️ Asking welfare was a normal greeting
👨‍👩‍👧 Family checked in before business
⛺ They moved to the tent after
➡️ Relationship came before conversation

---

## 😩 Moses Told His Father In Law All That The LORD Had Done ... And All The Travail

Travail means hardship or real suffering, not a minor inconvenience.

Moses gives Jethro the full account, the victories and the hard parts together.

He does not edit the story down to only the impressive parts.

An honest report tells both what God did and what it cost.

😩 Travail means real hardship
🗣️ Moses gave the full account
🚫 He did not hide the hard parts
📖 Honesty included both victory and cost

---

## 😊 Jethro Rejoiced For All The Goodness Which The LORD Had Done To Israel

Jethro was not part of Israel's covenant family.

He had no personal stake in Israel's success beyond his family tie to Moses.

His joy here is genuine, not a polite performance for a son in law.

An outsider recognizes God's goodness as clearly as an insider does.

🌍 Jethro was outside Israel's covenant
👨‍👦 His only tie was through Moses
😊 His joy was genuine, not polite
📖 Outsiders can recognize God's goodness too

# Exodus 18:10-12
# 🙏 Jethro Worships And Feasts
---
## 🙌 Blessed Be The LORD, Who Hath Delivered You

Jethro speaks a blessing over God himself, not over Moses.

This kind of blessing praises God directly for a specific rescue.

He names exactly what God did, deliverance from Pharaoh and from Egypt.

Real praise names the specific thing God actually did.

🙌 Jethro blesses God directly
🎯 He names the specific rescue
🇪🇬 Deliverance from Pharaoh and Egypt
📖 Specific praise beats vague praise

---

## 👴 Now I Know That The LORD Is Greater Than All Gods

Jethro was a priest with his own religious background in Midian.

He does not dismiss what he already believed out of politeness.

He reaches this conclusion because of the evidence he just heard, not a guess.

Egypt worshiped many gods, and none of them stopped the plagues or the sea.

Jethro's conviction is earned, built on what he saw God actually do.

👴 Jethro was a Midianite priest
👂 His conclusion came from real evidence
🇪🇬 Egypt's gods could not stop God
📖 Earned conviction, not blind assumption

---

## 👑 In The Thing Wherein They Dealt Proudly He Was Above Them

This means God turned Egypt's own pride into the tool of its downfall.

Pharaoh dealt proudly by refusing to let Israel go again and again.

The very plans Egypt used to resist God ended up proving God's power instead.

Pride does not shield anyone from God, it exposes them.

👑 Pharaoh dealt proudly against God
🔄 Egypt's own plans backfired
💥 Pride became the tool of downfall
📖 Pride exposes instead of protecting

---

## 🔥 Jethro ... Took A Burnt Offering And Sacrifices For God

A burnt offering was completely burned up on the altar, not eaten.

It represented full surrender, nothing held back for the worshiper.

Jethro personally brings and offers this himself, not as a spectator.

Jethro worships with his own hands, not just his words.

🔥 Burnt offerings were fully consumed
🙌 They represented full surrender
🐑 Jethro brought the offering himself
📖 His worship was active, not passive

---

## 🍞 Aaron Came, And All The Elders Of Israel, To Eat Bread ... Before God

Sharing a meal together sealed a bond of trust in this culture.

Eating before God meant the meal itself was treated as an act of worship.

Israel's whole leadership formally welcomes Jethro into real fellowship, not a passing visit.

The meal made Jethro family in more than just name.

🍞 Shared meals sealed real trust
🙏 Eating before God was worship
👥 Israel's leaders welcomed Jethro fully
📖 The meal made him family

# Exodus 18:13-16
# ⚖️ Moses Judges Alone
---
## 🧍 Moses Sat To Judge The People, And The People Stood By Moses From The Morning Unto The Evening

Moses personally hears every dispute in the whole nation by himself.

Judging meant applying God's law to real conflicts between people.

People stood in line the whole day waiting their turn to be heard.

This system worked for a small group, but Israel now numbers well over a million.

One man cannot carry a whole nation's disputes alone forever.

🧍 Moses judged every case himself
⏳ People waited in line all day
👥 Israel now numbered over a million
📖 One man could not sustain this

---

## ❓ What Is This Thing That Thou Doest To The People

Jethro asks a direct question instead of assuming he already understands.

He wants to hear Moses explain the system in his own words first.

Good advice starts with real questions, not quick assumptions.

Jethro listens before he critiques.

❓ Jethro asks before assuming
👂 He wants Moses' own explanation
🧠 Good advice starts with listening
➡️ Understanding comes before correction

---

## 🙏 The People Come Unto Me To Enquire Of God

Enquire means to ask for guidance or a decision.

Moses explains that people are not just settling arguments, they are seeking God's will.

Every dispute carried real spiritual weight because it involved knowing and applying God's law.

This was never simple paperwork, it was ministry.

🙏 Enquire means to seek guidance
⚖️ People sought God's will, not just rulings
📜 Every case touched God's law
📖 This was ministry, not paperwork

---

## 📜 I Do Make Them Know The Statutes Of God, And His Laws

Statutes means the specific laws and rules God had given.

Moses had two jobs bundled into one, deciding disputes and teaching the law itself.

No one else yet knew these laws well enough to explain them to others.

Moses was the only teacher and the only judge at the same time.

📜 Statutes means God's specific laws
⚖️ Moses judged and taught in one
🧑‍🏫 No one else knew the laws yet
📖 One man carried two full roles

# Exodus 18:17-18
# 😟 Jethro's Honest Critique
---
## 🗣️ The Thing That Thou Doest Is Not Good

Jethro speaks plainly instead of softening his real concern out of politeness.

He is Moses' father in law, but that relationship does not stop him from being honest.

Real wisdom sometimes means telling someone something they do not want to hear.

Honest correction is a form of real love.

🗣️ Jethro speaks plainly, not politely
👴 Family ties did not stop honesty
💬 Wisdom sometimes says hard things
📖 Honest correction is real love

---

## 😩 Thou Wilt Surely Wear Away, Both Thou, And This People That Is With Thee

Wear away means to slowly break down from exhaustion.

Jethro warns this pace will not just tire Moses, it will wear down the whole nation waiting on him.

This thing is too heavy pictures a weight one person was never meant to carry alone.

A leader who burns out helps no one.

😩 Wear away means slow exhaustion
👥 The whole nation was affected too
🏋️ Too heavy pictures an impossible load
📖 A burned out leader helps no one

# Exodus 18:19-23
# 💡 Jethro's Wise Advice
---
## 🙏 Be Thou For The People To Godward, That Thou Mayest Bring The Causes Unto God

This does not mean Moses should stop leading or step away from his calling.

Jethro tells him to refocus specifically on representing the people before God.

The biggest and most difficult cases still belong to Moses alone.

Jethro protects Moses' calling while trimming his workload.

🚫 Not a call to step away
🙏 Moses still represented the people to God
⚖️ The hardest cases stayed with him
📖 His calling was protected, not removed

---

## 📜 Thou Shalt Teach Them Ordinances And Laws, And Shalt Shew Them The Way Wherein They Must Walk

Ordinances means specific rules for worship and daily life.

Teaching came first, before any judging could even happen.

People needed to know the law before they could follow it or be judged by it.

Good leadership teaches before it corrects.

📜 Ordinances means specific rules
🧑‍🏫 Teaching came before judging
📖 People needed to know the law first
➡️ Leadership teaches before it corrects

---

## 💰 Provide ... Able Men, Such As Fear God, Men Of Truth, Hating Covetousness

Covetousness means wanting what belongs to someone else, including bribes.

Jethro lists four real qualifications, not vague ideals.

Able means genuinely capable of handling responsibility.

Fearing God, being truthful, and refusing bribery round out the list.

Good leaders are chosen for character, not convenience.

💰 Covetousness means greed or bribery
✅ Four real qualifications, not vague ideals
🙏 Capable, faithful, honest, and unbribable
📖 Character was chosen, not convenience

---

## 🔢 Rulers Of Thousands, And Rulers Of Hundreds, Rulers Of Fifties, And Rulers Of Tens

This describes a tiered structure, like layers of a pyramid.

A ruler of ten answered to a ruler of fifty, who answered to a ruler of a hundred.

Most disputes never had to reach Moses at all under this system.

Shared structure protects one person from carrying it all.

🔢 A tiered structure, like a pyramid
👥 Each level answered to the one above
⚖️ Most disputes stopped before reaching Moses
📖 Shared structure prevents one person carrying it all

---

## ⚖️ Every Great Matter They Shall Bring Unto Thee, But Every Small Matter They Shall Judge

This line draws the actual dividing line Jethro's whole plan depends on.

Small, everyday disputes stay with the new local leaders.

Only the hardest, most significant cases climb all the way up to Moses.

A good system knows exactly what to delegate and what to keep.

📏 This line draws the real division
🧍 Small matters stayed local
⚖️ Only the hardest cases reached Moses
📖 Good systems know what to delegate

---

## 🙏 If Thou Shalt Do This Thing, And God Command Thee So

Jethro does not present this plan as a demand Moses must obey.

He offers it as counsel, something Moses still has to weigh and confirm with God.

Good advice leaves room for the other person's own judgment before God.

Wisdom offers a path, it does not force one.

🚫 Not a demand to obey blindly
🙏 Moses still had to confirm it with God
🧠 Good advice leaves room to weigh it
📖 Wisdom offers, it does not force

---

## 🕊️ All This People Shall Also Go To Their Place In Peace

This is the promised outcome if Moses follows this plan.

Peace here covers Moses personally, the new leaders, and the whole nation together.

A wise structure was never just about relieving Moses individually.

God's wisdom for one leader ends up blessing an entire nation.

🕊️ Peace was the promised outcome
👤 Moses personally would find rest
👥 The whole nation would benefit too
📖 One leader's wisdom blessed everyone

# Exodus 18:24-27
# ✅ Moses Implements The Plan
---
## 👂 Moses Hearkened To The Voice Of His Father In Law, And Did All That He Had Said

Moses had no obligation to take advice from his father in law over his own judgment.

He accepts the correction fully instead of defending his old system out of pride.

This is a rare moment in scripture of a leader receiving criticism well.

Humility let Moses lead better than pride ever could have.

👂 Moses fully accepted the correction
🚫 No defensive pride shown here
🌟 A rare example of receiving criticism well
📖 Humility improved his leadership

---

## 🌍 Moses Chose Able Men Out Of All Israel, And Made Them Heads Over The People

Moses puts the plan into action right away, not after months of delay.

He selects leaders from across the whole nation, not just his own family or tribe.

The exact structure Jethro described gets built here, layer by layer.

Good advice only helps once someone actually acts on it.

⚡ Moses acted right away
🌍 Leaders came from all of Israel
🏗️ The exact structure got built
📖 Advice only helps once acted on

---

## ✅ The Hard Causes They Brought Unto Moses, But Every Small Matter They Judged Themselves

This verse shows the plan actually working, not just being announced.

Local leaders handle the everyday disputes on their own from this point forward.

Only the hardest cases still climb up to Moses, exactly as planned.

A good system proves itself by how it performs, not just how it sounds.

✅ The plan is shown working here
🧍 Local leaders handled small matters
⚖️ Hard cases still reached Moses
📖 A system proves itself in practice

---

## 🚶 Moses Let His Father In Law Depart, And He Went His Way Into His Own Land

Jethro's visit ends with him returning home to Midian.

His time in Israel's camp was short, yet its effect will last the whole rest of the journey.

One piece of honest advice reshaped how an entire nation would be led.

A short visit left a permanent mark on Israel's future.

🚶 Jethro returns home to Midian
⏳ His visit was short
🏛️ Its effect would last for years
📖 A brief visit left a permanent mark
`.trim();

export const EXODUS_EIGHTEEN_PERSONAL_SECTIONS = parseExodusEighteenRawNotes(EXODUS_EIGHTEEN_RAW_NOTES);
