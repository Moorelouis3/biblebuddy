export type ExodusFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseExodusFiveRawNotes(rawText: string): ExodusFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: ExodusFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Exodus\s+5:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Exodus 5 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Exodus\s+5:/i.test(lines[index].trim())) {
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
        !/^#\s+Exodus\s+5:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Exodus 5 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 5,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Exodus 5:${startVerse}` : `Exodus 5:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Exodus 5 sections, received " + sections.length);
  }

  return sections;
}

const EXODUS_FIVE_RAW_NOTES = `# Exodus 5:1-3
# 🗣️ Moses And Aaron Confront Pharaoh
---
## 📜 Thus Saith The LORD God Of Israel

Thus saith the LORD was a fixed phrase used to open a message from God.

It marked the words that followed as a command from heaven.

Moses is not offering his own opinion to Pharaoh here.

He delivers this message as a messenger of a higher King.

Pharaoh ruled Egypt, but another King has just addressed his court.

📜 Thus saith the LORD opens a divine command
👑 Moses speaks for a higher King
🗣️ This is a royal message, not a request
📖 Pharaoh now faces a rival King

## 🎉 Let My People Go, That They May Hold A Feast Unto Me In The Wilderness

This request does not yet demand full freedom for Israel.

It only asks Pharaoh for a short feast of worship in the wilderness.

God had already told Moses to ask for this modest trip.

A small request now tests how Pharaoh responds before anything bigger comes.

The bigger demand for freedom is still ahead in later chapters.

🎉 The first request is only for worship
📜 God planned this modest ask back then
⏳ Freedom is not demanded yet
📖 A small test comes before the larger battle

## ❓ Who Is The LORD

This is not a sincere question about who the LORD might be.

Pharaoh already means to refuse before Moses can even answer.

Egyptian kings were treated as gods themselves, answering to no one above them.

He sees no reason to obey a God he has never heard of.

That arrogance opens a conflict that fills the rest of the book of Exodus.

❓ The question is really a refusal
👑 Pharaoh saw himself as a god
🚫 He answers to no god above him
📖 His arrogance opens the whole conflict

## 🙅 I Know Not The LORD, Neither Will I Let Israel Go

Pharaoh openly refuses the request in the very same breath as his insult.

Know here means more than simple knowledge of a name.

It means Pharaoh refuses to recognize the LORD as having any authority over him.

This flat refusal is the same claim Pharaoh will be forced to take back.

Every plague that follows exists to answer this exact boast.

🙅 Pharaoh refuses outright
🧠 Know here means recognize as authority
⚔️ This boast will be proven wrong
📖 Every plague answers this exact claim

## 🕊️ The God Of The Hebrews Hath Met With Us

Hath met with us describes a real, personal encounter with God.

This is not vague religious language about a distant deity.

Moses and Aaron are describing something that actually happened to them.

The God of the Hebrews is a specific title, not a generic one.

Egypt worshiped many gods, so this phrase points to one particular God.

🕊️ Hath met with us means a real encounter
📿 Not vague talk about a distant god
🎯 The God of the Hebrews names one God
📖 Egypt knew many gods, this points to one

## 🏜️ Three Days' Journey Into The Desert

This is a specific, modest travel distance, not a vague trip.

A journey of three days would take the people well outside Egypt's cities.

Sacrifice to the LORD required leaving areas where Egyptians could witness it.

Egyptians considered some Hebrew sacrifices offensive to their own gods.

This detail explains why worship could not simply happen inside Egypt.

🏜️ Three days names a real distance
🚶 It would take them outside Egypt's cities
🐑 Egyptians found some sacrifices offensive
📖 That distance explains the request

## ⚔️ Lest He Fall Upon Us With Pestilence, Or With The Sword

Pestilence means a deadly, widespread disease, not a minor illness.

Moses and Aaron warn Pharaoh of real consequences for disobedience.

Refusing this God, they say, could bring plague or war upon Egypt.

This warning is meant to move Pharaoh through fear, not just persuasion.

Pharaoh will soon see for himself how real that warning was.

⚔️ Pestilence means a deadly, widespread disease
😨 The warning is meant to cause fear
🌍 Disobedience could strike all of Egypt
📖 Pharaoh will soon learn this is real

# Exodus 5:4-5
# 😤 Pharaoh's Dismissive Response
---
## 🏋️ Wherefore Do Ye Let The People From Their Works

Let here is an old word meaning to cause someone to stop or leave.

Pharaoh accuses Moses and Aaron of pulling the people away from their labor.

In his eyes, this whole request is only an excuse to skip work.

He refuses to see it as a genuine act of worship.

That refusal will define his response through the rest of this chapter.

🏋️ Let here means cause to stop
😤 Pharaoh accuses them of pulling people from work
🙄 He sees no real worship in the request
📖 That refusal shapes his response going forward

## 😤 Get You Unto Your Burdens

Burdens means the forced labor Israel already carried under Egypt.

Pharaoh dismisses the entire request with a single sharp command.

He is telling Moses and Aaron to send the people straight back to work.

There is no discussion offered, only an order.

The conversation Moses hoped for closes before it can even begin.

😤 Burdens means the forced labor already carried
🗣️ Pharaoh answers with one sharp command
🚫 No discussion is offered at all
📖 The conversation closes before it begins

## 📈 The People Of The Land Now Are Many

Pharaoh repeats a fear first raised back at the start of Exodus.

He worried then that a large Hebrew population threatened Egyptian control.

That same population anxiety drives his reaction here as well.

Any relief for Israel now looks like a growing danger to him.

Fear of numbers, not the sacrifice itself, is his real concern.

📈 Pharaoh repeats an old population fear
😰 He once feared Israel outnumbering Egypt
🔁 The same worry drives him now
📖 Numbers concern him more than worship

## 😔 Ye Make Them Rest From Their Burdens

Rest here does not mean a fair, reasonable break from labor.

Pharaoh frames any pause in forced work as a dangerous indulgence.

He believes Moses and Aaron have given the people false hope of freedom.

In his mind, comfort now will only make Israel harder to control.

That belief is exactly what pushes him toward even harsher demands.

😔 Rest here means any pause in labor
👎 Pharaoh treats rest as dangerous indulgence
🧠 He fears comfort will invite rebellion
📖 That fear drives his harsher demands next

# Exodus 5:6-9
# 🧱 Pharaoh Orders Harsher Labor
---
## 👥 The Taskmasters Of The People, And Their Officers

Egypt used two levels of authority to control the forced labor.

Taskmasters were Egyptian officials who set the daily quotas and rules.

Officers were Hebrew men appointed to supervise their own people directly.

This structure let Egypt punish Israelites through other Israelites.

That detail becomes painfully important later in this same chapter.

👥 Two levels of authority controlled the work
🏛️ Taskmasters were Egyptian officials over quotas
👤 Officers were Hebrew men over their own people
📖 That structure matters later in this chapter

## 🌾 Ye Shall No More Give The People Straw To Make Brick

Straw was mixed into wet mud to bind mud bricks together.

It made the bricks stronger and much easier to shape and dry.

Removing this one ingredient makes the exact same work far harder.

Pharaoh cuts a key resource without lowering what Israel must produce.

Heretofore means up until now, marking a sudden change in policy.

🌾 Straw bound the wet mud together
🧱 It made bricks stronger and easier to dry
✂️ Pharaoh cuts the resource, not the quota
📖 Heretofore marks a sudden change in policy

## 🔍 Let Them Go And Gather Straw For Themselves

Pharaoh offers no help finding this newly required material.

The people must now search for straw during hours once spent making bricks.

Every hour spent gathering straw is an hour not spent building the quota.

This shift quietly doubles the work without adding a single extra hour.

It is cruelty dressed up as a simple change in procedure.

🔍 No help is offered to find straw
⏳ Searching eats into their working hours
📊 The daily quota does not shrink to match
📖 This doubles the work in disguise

## 🔢 The Tale Of The Bricks

Tale here is an old word meaning a counted total or quota.

Pharaoh sets the exact same brick count as before this change.

He gives no allowance for the added difficulty of gathering straw.

The number itself becomes a fixed measure of impossible pressure.

Every missed brick will soon be treated as personal failure.

🔢 Tale means a counted quota
📏 The count stays exactly the same
⚖️ No allowance is made for the added work
📖 Missed bricks will be treated as failure

## 📉 Ye Shall Not Diminish Ought Thereof

Diminish is an old word meaning to reduce or lessen.

Ought here means anything at all, not a specific object.

Pharaoh forbids any reduction in output no matter the new burden.

The command leaves no room for mercy or adjustment.

Impossible demands like this one are meant to break the people's spirit.

📉 Diminish means to reduce
🔁 Ought means anything at all
🚫 No reduction is allowed, whatever the burden
📖 Impossible demands aim to break their spirit

## 🗯️ For They Be Idle, Therefore They Cry

Idle means lazy, unwilling to work rather than simply resting.

Pharaoh twists Israel's request for worship into an accusation of laziness.

He treats their cry to sacrifice as nothing but a lame excuse.

This reframing lets him punish worship as if it were disobedience.

Painting a request as laziness makes cruelty look reasonable.

🗯️ Idle means lazy, not simply resting
🙄 Pharaoh calls their worship request an excuse
😠 He punishes worship as if it were disobedience
📖 Reframing the request makes cruelty look fair

## 🧠 Let Them Not Regard Vain Words

Vain words dismisses Israel's worship request as empty, meaningless talk.

Pharaoh orders his officials to stop listening to it entirely.

Keeping the people exhausted leaves no time to think about worship.

Overwork becomes a deliberate strategy, not just an economic decision.

A tired people has less strength left to resist or hope.

🧠 Vain words means empty, meaningless talk
🙉 Pharaoh orders his men to stop listening
😩 Overwork becomes a deliberate strategy
📖 A tired people has less strength to resist

# Exodus 5:10-14
# 😫 The People Scramble For Straw
---
## 📢 Thus Saith Pharaoh, I Will Not Give You Straw

This phrase copies the exact formula Moses used for God's message.

Thus saith Pharaoh stands in direct competition with thus saith the LORD.

Pharaoh answers one king's message by asserting his own royal authority.

The taskmasters must deliver this harsh order in Pharaoh's own words.

Two kings are speaking in this chapter, and only one truly rules.

📢 This copies the formula from verse one
👑 Pharaoh answers one king with another
🗣️ Taskmasters deliver the order in his words
📖 Two kings speak here, only one rules

## 🚶 Go Ye, Get You Straw Where Ye Can Find It

The taskmasters offer no location, no supply, and no assistance.

The entire burden of finding this material now falls on the people themselves.

This order sounds like permission but functions as an added punishment.

It hands over a real problem while pretending to offer a solution.

Every hour spent searching is an hour stolen from actual brickmaking.

🚶 No location or supply is offered
😓 The burden falls entirely on the people
🎭 It sounds like help but is not
📖 Searching time is stolen from real work

## ⚖️ Yet Not Ought Of Your Work Shall Be Diminished

This repeats the same demand already given directly to Pharaoh's officers.

The quota stands exactly where it stood before straw was taken away.

Pharaoh refuses to connect the new burden to any lower expectation.

The math of this order was never meant to add up.

Fear alone was expected to close the gap that logic could not.

⚖️ The quota stays exactly the same
🔁 This repeats the order already given
🧮 The math was never meant to be fair
📖 Fear was meant to close the gap

## 🗺️ The People Were Scattered Abroad Throughout All The Land Of Egypt

Scattered abroad describes a wide, chaotic search across the whole country.

Families who once worked together now spread out separately to survive.

This scattering shows just how far Pharaoh's order reached into daily life.

One decree by one man disrupted an entire enslaved population at once.

The chaos itself was likely part of the intended punishment.

🗺️ The search spread across all of Egypt
👪 Families once together now spread apart
📜 One decree disrupted an entire population
📖 The chaos itself may have been intended

## 🌾 Stubble Instead Of Straw

Stubble means the dry, leftover stalks left standing in a harvested field.

It was a poor substitute, weaker and less useful than proper straw.

Even this inferior material had to be gathered by hand across the land.

Using stubble instead of straw likely made the bricks weaker as well.

Every part of this new arrangement worked against the people, not for them.

🌾 Stubble means leftover stalks from harvest
📉 It was weaker than proper straw
✋ Even this had to be gathered by hand
📖 Every detail here worked against the people

## ⏱️ The Taskmasters Hasted Them

Hasted is an old word meaning to rush or pressure someone forward.

The taskmasters push the people to move faster despite the added burden.

Speed is demanded even though the task itself has grown much harder.

There is no patience offered anywhere in this new arrangement.

Pressure, not fairness, is now the entire strategy for control.

⏱️ Hasted means to rush or pressure
🏃 The pace is pushed despite the harder task
🚫 No patience is offered anywhere
📖 Pressure has replaced fairness as the strategy

## 📋 Fulfil Your Works, Your Daily Tasks, As When There Was Straw

Daily task describes a fixed quota expected from each single day of work.

Pharaoh demands the same daily number even after removing a key resource.

As when there was straw makes the comparison to the old standard explicit.

The command openly admits conditions changed while refusing to adjust the goal.

Naming the unfairness out loud does not stop Pharaoh from enforcing it.

📋 Daily task means a fixed quota per day
🌾 The comparison to the old standard is explicit
🙈 Conditions changed but the goal did not
📖 Naming unfairness does not stop its enforcement

## 😣 The Officers Of The Children Of Israel Were Beaten

These officers were Hebrew men, not Egyptian taskmasters over them.

They had been appointed earlier to supervise their own people's labor directly.

When the impossible quota goes unmet, these officers pay the physical price.

They stand caught between Egyptian power above and Israelite suffering below.

Their loyalty to their own people offers them no protection here.

😣 These officers were Hebrew men themselves
🎯 They once supervised their own people's labor
⚡ They pay the price when quotas fail
📖 Loyalty to their people offers no protection

## ❓ Wherefore Have Ye Not Fulfilled Your Task Both Yesterday And To Day

This accusation ignores that the task itself was just made much harder.

Both yesterday and to day shows the demand has already failed for days.

The officers are blamed for a failure built into Pharaoh's own order.

Nobody in power asks why the quota suddenly became impossible to meet.

Blame flows downward here, landing on those with the least actual control.

❓ The harder task itself is ignored
📆 Yesterday and today shows repeated failure
🎯 Officers are blamed for Pharaoh's own order
📖 Blame lands on those with least control

# Exodus 5:15-19
# 📢 The Officers Plead With Pharaoh
---
## 📢 Wherefore Dealest Thou Thus With Thy Servants

The officers appeal directly to Pharaoh himself, going over the taskmasters.

Thy servants is respectful language, not an angry accusation against the king.

They still hope reasoning calmly with Pharaoh might change his mind.

This is their last real attempt to fix the problem through proper channels.

That hope is about to be answered with nothing but contempt.

📢 The officers appeal directly to Pharaoh
🙏 Thy servants is respectful, not angry
🤞 They still hope calm reasoning might work
📖 Contempt is the only answer they receive

## 🧱 There Is No Straw Given Unto Thy Servants

The officers state the problem plainly, without exaggeration or insult.

They lay out exactly what has gone wrong in Pharaoh's own new system.

Make brick was demanded while the material needed to make it was removed.

This is a factual complaint, not a plea for special treatment.

A fair king would recognize this as his own system failing.

🧱 The complaint is stated plainly
📉 The needed material was removed by Pharaoh
📊 This is fact, not a special request
📖 A fair king would see his system failing

## 👎 But The Fault Is In Thine Own People

Thine own people means the Egyptian taskmasters carrying out Pharaoh's order.

The officers carefully avoid blaming Pharaoh directly to his own face.

They still name the truth, that this failure began inside Egypt's own system.

This is a careful, diplomatic way to raise a very risky complaint.

Even careful diplomacy will not soften Pharaoh's coming response.

👎 Thine own people means the taskmasters
🎯 They avoid blaming Pharaoh to his face
🧭 The truth is still named carefully
📖 Even diplomacy cannot soften his response

## 😠 Ye Are Idle, Ye Are Idle

Pharaoh repeats the same accusation twice for maximum emphasis.

Idle again means lazy, the exact insult already used back in verse eight.

He refuses to hear a single word of the officers' actual complaint.

Repeating an insult is easier than admitting his own system has failed.

Blaming the victims lets Pharaoh avoid any real responsibility.

😠 Idle is repeated twice for emphasis
🙉 Pharaoh refuses to hear the real complaint
🪞 Blame is easier than admitting failure
📖 Victims are blamed to avoid responsibility

## 🕊️ Let Us Go And Do Sacrifice To The LORD

Pharaoh mockingly quotes the officers' own worship request back at them.

He treats a sincere plea for worship as proof of laziness.

Using their own words this way is meant to humiliate, not answer.

The mockery shows exactly how little Pharaoh respects their God.

What began as a request for worship is now used as an insult.

🕊️ Pharaoh mocks their own request
🎭 Their words are turned into an insult
😔 The mockery shows his disrespect for God
📖 A worship request becomes a weapon against them

## 🧮 Yet Shall Ye Deliver The Tale Of Bricks

Deliver here means hand over the completed, exact required amount.

Pharaoh restates the quota one final time, with total finality.

No straw, no help, and still the exact same number of bricks.

The word yet marks this as a demand with absolutely no compromise.

Every possible excuse has now been closed off by Pharaoh himself.

🧮 Deliver means hand over the exact amount
🔒 The quota is restated with total finality
🚫 No straw, no help, same required number
📖 Every excuse is closed off by Pharaoh

## 😔 They Were In Evil Case

Evil case is an old phrase describing a truly desperate situation.

The officers now fully understand there is no relief coming from Pharaoh.

Their careful, respectful appeal has completely and totally failed.

Every path they tried through proper channels has now closed.

Only one option remains, turning to Moses and Aaron in anger.

😔 Evil case means a desperate situation
🚪 Every proper channel has now closed
🙅 Their careful appeal has completely failed
📖 Only anger toward Moses remains

# Exodus 5:20-21
# 😡 The Officers Confront Moses And Aaron
---
## 🚶 Who Stood In The Way, As They Came Forth From Pharaoh

Moses and Aaron are waiting right outside, expecting good news to share.

Instead they meet officers walking straight out of a total defeat.

This location makes the coming confrontation impossible for either side to avoid.

Timing here turns hope into an immediate and painful collision.

The two groups meet at the worst possible moment for both of them.

🚶 Moses and Aaron wait right outside
😞 They meet officers leaving total defeat
⏰ The timing could not be worse
📖 Hope and disaster collide immediately

## ⚖️ The LORD Look Upon You, And Judge

This is a formal curse, not a simple expression of frustration.

The officers call on God to judge Moses and Aaron themselves.

They blame the very men who came promising deliverance for Israel.

Turning on their own rescuers reveals how deep their despair has grown.

Fear and exhaustion can twist gratitude into blame very quickly.

⚖️ This is a formal curse, not venting
😤 The officers blame their own rescuers
💔 Despair here runs very deep
📖 Fear can twist gratitude into blame

## 👃 Ye Have Made Our Savour To Be Abhorred

Savour here means reputation, the impression Israel leaves on those around them.

The image is of a smell that lingers long after someone leaves a room.

The officers believe Israel now looks worse to Pharaoh than before Moses arrived.

Abhorred means hated or viewed with disgust, not just disliked.

In their eyes, Moses has made Israel's standing measurably worse.

👃 Savour means reputation, like a lingering smell
🤢 Abhorred means hated or viewed with disgust
📉 They believe Israel's standing has worsened
📖 Reputation, in their eyes, is now damaged

## ⚔️ To Put A Sword In Their Hand To Slay Us

The officers fear this conflict has now put their very lives at risk.

They believe angering Pharaoh could lead directly to violent punishment.

This fear was not unreasonable, since officers were already being beaten.

Their accusation against Moses comes from genuine, immediate physical fear.

Real danger, not just frustration, is driving their anger in this moment.

⚔️ They fear the conflict now risks their lives
😨 Officers were already being beaten before this
🎯 Their accusation comes from real fear
📖 Danger, not just anger, drives this moment

# Exodus 5:22-23
# 🙏 Moses Cries Out To God
---
## 🙏 LORD, Wherefore Hast Thou So Evil Entreated This People

Moses brings raw, honest frustration straight to God, not a polished prayer.

Evil entreated means treated harshly or made to suffer, not merely inconvenienced.

He genuinely does not understand why obedience has led to greater suffering.

This kind of honest complaint appears often throughout the whole Bible.

God welcomes this kind of real question far more than fake certainty.

🙏 Moses brings raw, honest frustration to God
😖 Evil entreated means treated harshly
❓ Obedience has led to greater suffering
📖 God welcomes honest questions over fake certainty

## ❓ Why Is It That Thou Hast Sent Me

Moses questions his own calling at the very first sign of real resistance.

He had already doubted himself back when God first called him.

That old doubt returns the moment his obedience makes life harder, not easier.

Faithful people can still question God honestly in the middle of hard obedience.

Doubt here does not cancel out the calling God already gave him.

❓ Moses questions his own calling here
🔁 The same doubt appeared back at his calling
😣 Obedience made life harder, not easier
📖 Doubt does not cancel a real calling

## 😟 He Hath Done Evil To This People

Moses names the plain, painful result of his obedience so far.

From where he stands, things have only grown worse since he arrived.

He does not soften the truth or pretend the mission is going well.

This honest report matters more than sounding confident in front of God.

God does not need Moses to pretend everything is fine.

😟 Moses names the painful result plainly
📉 Things look worse since he arrived
🗣️ He does not pretend the mission is fine
📖 God does not need false confidence

## 🌱 Neither Hast Thou Delivered Thy People At All

From Moses' current view, no deliverance has happened at all yet.

Only greater suffering has followed since he first obeyed God's call.

This complaint sits at the very lowest point of the story so far.

God's reassuring answer comes immediately at the start of the next chapter.

What feels like total failure here is not the end of the story.

🌱 No deliverance seems to have happened yet
📉 Only greater suffering has followed so far
⬇️ This is the story's lowest point yet
📖 God answers this at the very next chapter`.trim();

export const EXODUS_FIVE_PERSONAL_SECTIONS = parseExodusFiveRawNotes(EXODUS_FIVE_RAW_NOTES);
