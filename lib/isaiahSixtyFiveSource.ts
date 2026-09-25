export type IsaiahSixtyFivePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixtyFiveRawNotes(rawText: string): IsaiahSixtyFivePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixtyFivePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+65:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 65 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+65:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+65:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 65 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 65,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 65:${startVerse}` : `Isaiah 65:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 8) {
    throw new Error("Expected 8 Isaiah 65 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTY_FIVE_RAW_NOTES = `# Isaiah 65:1-4
# 🙋 Found By Those Who Never Looked
---
## 🙋 I Am Sought Of Them That Asked Not For Me

God speaks first here about people who never went looking for Him.

"Sought" means found by someone who was actively searching.

These people were not searching for God at all.

God reached out anyway, before they even asked.

Paul later quotes this verse in Romans and applies it to the Gentiles.

It becomes proof that God's mercy was never limited to Israel alone.

🙋 Sought means actively searched for
😶 These people never searched for God
🤲 God reached out before they asked
📖 Paul applies this verse to the Gentiles

---
## 👋 Behold Me, Behold Me, Unto A Nation That Was Not Called By My Name

"Behold me" repeated twice pictures God calling out and waving His hand.

A nation not called by my name means a Gentile nation, not Israel.

Israel carried God's name as His chosen people.

This other nation never had that claim on Him at all.

God is shown here offering Himself to complete outsiders.

That offer comes before anyone outside Israel asks for it.

👋 Behold me repeated shows urgent calling
🌍 The nation named here is a Gentile nation
🏷️ Israel alone carried God's name before
➡️ God offers Himself to outsiders first

---
## 🤲 I Have Spread Out My Hands All The Day Unto A Rebellious People

Spreading out the hands pictures someone pleading, not attacking.

Think of a parent standing with open arms, waiting for a child to come.

God is shown in that same posture, patient and open.

"All the day" means this invitation never stopped.

It was not one offer given once and then withdrawn.

The people being invited are called rebellious, so the offer kept getting refused.

🤲 Spread out hands pictures pleading, not attack
👀 Like a parent waiting with open arms
⏳ All the day means the offer never stopped
📖 The invitation was refused again and again

---
## 🧭 Walketh In A Way That Was Not Good, After Their Own Thoughts

This describes people following their own plans instead of God's instructions.

"Their own thoughts" means ideas and desires that came from themselves alone.

The way is not called neutral here, it is called not good directly.

Choosing this path is never treated as harmless personal preference.

The rest of the chapter shows exactly where that path leads.

🧭 Walking their own way instead of God's
💭 Their own thoughts means self made ideas
🚫 The path is called not good directly
➡️ The chapter shows where that path leads

---
## 😤 That Provoketh Me To Anger Continually To My Face

"To my face" means this defiance was open, not hidden or secret.

The people were not quietly disobeying somewhere private.

They were doing it in full view, almost daring God to respond.

"Continually" adds that this was not a single incident.

It was an ongoing pattern that never let up.

😤 To my face means open, not hidden
👀 Done in full view, almost daring God
🔁 Continually means an ongoing pattern
📖 Defiance here was bold, not secret

---
## 🌿 That Sacrificeth In Gardens, And Burneth Incense Upon Altars Of Brick

Garden shrines were common sites for pagan worship in the ancient Near East.

They were tied to fertility rituals borrowed from Canaanite religion.

The law given through Moses required altars made of earth or uncut stone.

Burning incense on brick altars broke that instruction directly.

This was not a small style choice.

It was a deliberate copy of the worship God had forbidden.

🌿 Garden shrines were pagan worship sites
🧱 Brick altars broke the law's own instructions
⛔ Earth or uncut stone was required instead
📖 A deliberate copy of forbidden worship

---
## ⚰️ Which Remain Among The Graves, And Lodge In The Monuments

Spending nights among tombs was linked to seeking messages from the dead.

"Monuments" here means burial markers, not statues in the modern sense.

This practice was forbidden because it looked for guidance outside of God.

Staying overnight in a graveyard was not about grief or mourning here.

It was about searching for hidden knowledge the wrong way.

⚰️ Graves and monuments means burial sites
🌙 Overnight stays there sought messages from the dead
🚫 Forbidden as guidance sought outside of God
📖 Searching for knowledge the wrong way

---
## 🐖 Which Eat Swine's Flesh, And Broth Of Abominable Things Is In Their Vessels

Pork was forbidden food under the law given in Leviticus.

Eating it here was not an accident or a matter of taste.

"Abominable things" means food specifically marked as unclean by that same law.

Cooking broth from it and eating it broke the command on purpose.

These four verses build one picture, people copying every forbidden ritual at once.

🐖 Swine's flesh was forbidden under the law
🍲 Abominable things means food marked unclean
😠 The law was broken here on purpose
📖 Every forbidden ritual copied at once

# Isaiah 65:5-7
# 🙅 Holier Than Thou
---
## 🙅 Stand By Thyself, Come Not Near To Me, For I Am Holier Than Thou

This sounds like a claim of real holiness, but it is not.

The people saying this were the ones practicing the rituals from verses three and four.

They treated other people as unclean while doing forbidden things themselves.

This is self righteousness, not actual holiness before God.

The line drips with irony, the truly unclean call themselves too pure to touch.

🙅 A claim of holiness that is false
🙈 Said by people practicing pagan rituals
😤 Treating others as unclean, themselves included
📖 Self righteousness disguised as purity

---
## 🔥 These Are A Smoke In My Nose, A Fire That Burneth All The Day

This is a vivid picture of constant irritation, not one moment of anger.

Smoke in the nose stings and will not go away quickly.

A fire that burns all day never lets up either.

Both images describe ongoing anger, not a single outburst.

This behavior has worn on God continually, not just once.

👃 Smoke in the nose pictures constant sting
🔥 A fire all day means anger never stops
⏳ Describes ongoing anger, not one outburst
📖 This behavior has worn on God continually

---
## 📝 It Is Written Before Me, I Will Not Keep Silence

"Written before me" pictures a permanent record that God keeps.

Nothing described in the earlier verses has been forgotten or overlooked.

"I will not keep silence" means God is about to respond, not stay quiet.

The silence some might expect from God is coming to an end here.

📝 Written before me means a permanent record
🧾 Nothing described earlier has been forgotten
🔊 God will not keep silence any longer
➡️ A response is coming, not more quiet

---
## ⚖️ But Will Recompense, Even Recompense Into Their Bosom

"Recompense" means to pay back in full for what was done.

"Into their bosom" is a Hebrew way of saying paid directly into their lap.

Think of carrying something folded into the front of a robe.

The payment lands right where the person is holding it, impossible to avoid.

Repeating the word recompense twice makes the payback certain.

⚖️ Recompense means paid back in full
👕 Bosom pictures payment carried in the robe
🎯 The payback lands right where they stand
📖 Repeating the word makes it certain

---
## 👪 The Iniquities Of Your Fathers Together, Saith The LORD

This combines the sin of the current generation with the sin of their ancestors.

The pagan worship being judged here was not new.

Earlier generations of the same family had already been doing it.

Judgment falls on a long pattern, not a single lapse.

👪 Combines current sin with ancestors' sin
🔁 The pagan worship described was not new
📜 A long family pattern, not one lapse
📖 Judgment answers years of repeated sin

---
## ⛰️ Burned Incense Upon The Mountains, And Blasphemed Me Upon The Hills

Mountains and hills were common locations for pagan worship in Canaan.

These high places sat above the land and felt closer to the sky.

Burning incense there was meant to honor other gods, not the LORD.

Doing this while claiming to belong to God counted as blasphemy.

"Therefore will I measure their former work into their bosom" closes the thought.

God repays in exact proportion to what was actually done.

⛰️ Mountains and hills were pagan worship sites
🔥 Incense there honored other gods
😠 Doing this counted as real blasphemy
📖 God repays in exact proportion

# Isaiah 65:8-10
# 🍇 A Blessing In The Cluster
---
## 🍇 As The New Wine Is Found In The Cluster

This pictures a bunch of grapes not yet fully ripe.

A worker checking the cluster finds a little good juice still inside it.

That small amount of good juice is reason enough to keep the whole cluster.

God compares His people to that same unripe cluster.

🍇 A cluster of grapes not fully ripe
🍷 New wine means the good juice inside
✋ A little good is reason to keep it
📖 God compares His people to this cluster

---
## 💎 Destroy It Not, For A Blessing Is In It

This is the reason the cluster gets spared instead of thrown away.

Something valuable is still inside it, even if most of it looks ruined.

God applies that same logic to His people as a whole.

A faithful few inside the nation keep the whole nation from being destroyed.

This echoes Abraham pleading for Sodom to be spared for the sake of a few righteous people.

💎 Something valuable is still inside it
🙅 The cluster is spared, not thrown away
🙏 A faithful few keep the whole nation
📖 It echoes Abraham pleading for Sodom

---
## 🙋 So Will I Do For My Servants' Sakes

"My servants" names the faithful remnant introduced through this cluster picture.

God spares the wider nation for their sake, not because everyone deserves it.

"That I may not destroy them all" makes the purpose explicit.

Judgment in this chapter is real, but it is not total.

🙋 My servants names the faithful remnant
🛡️ The wider nation is spared for their sake
⚖️ Judgment here is real but not total
📖 A remnant changes the outcome for everyone

---
## 🌱 I Will Bring Forth A Seed Out Of Jacob

"Seed" means descendants, a line of people carrying the promise forward.

Jacob is another name for Israel, the whole covenant people.

Even after the judgment described earlier, God promises the family line continues.

The rebellion described in this chapter does not end God's larger promise.

🌱 Seed means descendants carrying the promise
👨‍👦 Jacob names the whole covenant people
🔥 Judgment here does not end the promise
📖 God's larger plan keeps moving forward

---
## ⛰️ An Inheritor Of My Mountains

"My mountains" refers to the land of Israel itself.

Calling it God's own mountains shows He still claims it as His possession.

"Mine elect shall inherit it, and my servants shall dwell there" follows right after.

The elect and the servants named here are the same faithful remnant.

⛰️ My mountains means the land of Israel
🏷️ God still claims the land as His
👑 The elect and servants are the same remnant
📖 The faithful remnant inherits the land

---
## 🌾 Sharon Shall Be A Fold Of Flocks, And The Valley Of Achor A Place For The Herds

Sharon was a fertile coastal plain known for lush, green pasture.

The valley of Achor was different.

It was the site of Achan's sin in the book of Joshua.

"Achor" means trouble, named for the disaster that happened there.

Turning a place remembered for trouble into peaceful pasture flips its whole meaning.

This blessing is for the people that have sought God, unlike the rebels from verse one.

🌾 Sharon was known for lush pasture
⚠️ Achor means trouble, tied to Achan's sin
🔄 A cursed place becomes peaceful pasture
📖 This is for the people who sought God

# Isaiah 65:11-12
# 🎲 The Gods Of Luck And Fate
---
## 🚪 Ye Are They That Forsake The LORD, That Forget My Holy Mountain

This verse turns from the faithful remnant back to the rebellious group.

"Forsake" means to abandon completely, not simply drift away for a while.

"Forget my holy mountain" means turning attention away from true worship.

The contrast with the remnant described in verse ten is deliberate.

↩️ The focus shifts back to the rebels
🚪 Forsake means abandon completely
⛰️ Holy mountain means true worship
📖 A deliberate contrast with the remnant

---
## 🎲 That Prepare A Table For That Troop, And Furnish The Drink Offering Unto That Number

"That troop" and "that number" sound like a vague description in English.

In the original language they are actual names, Gad and Meni.

Gad and Meni were pagan gods of fortune and fate in the ancient Near East.

Setting a table and pouring a drink offering describes a ritual meal offered to them.

The people God is describing were feeding meals to gods of luck.

🎲 Troop and number hide two names
🍽️ Gad and Meni were fortune gods
🍷 A table and drink offering fed them
📖 The people served meals to gods of luck

---
## 🗡️ I Will Number You To The Sword

This verse plays on the name Meni, which relates to the idea of fate.

The people trusted a god of destiny to decide their future.

God responds by deciding their destiny Himself, with the sword instead.

"Ye shall all bow down to the slaughter" makes the judgment plain and total.

🎯 Number you plays on the name Meni
🗡️ They trusted a god of fate instead
⚔️ God decides their destiny with the sword
📖 The judgment described here is total

---
## 📢 When I Called, Ye Did Not Answer, When I Spake, Ye Did Not Hear

This names the exact reason for the judgment just described.

God is not punishing without cause here.

He called and was ignored, He spoke and was not heard.

"Did evil before mine eyes, and did choose that wherein I delighted not" adds the final charge.

Every choice made was a choice against what God wanted.

📢 God called and was ignored
👂 God spoke and was not heard
❌ Every choice went against what God wanted
📖 Judgment here answers a clear cause

# Isaiah 65:13-16
# 🍽️ A Tale Of Two Futures
---
## 🍞 My Servants Shall Eat, But Ye Shall Be Hungry

This verse lines up sharp contrasts between two very different groups.

My servants eat, the rebellious group goes hungry.

My servants drink, the rebellious group stays thirsty.

The parallel structure repeats the same idea twice for emphasis.

This is Hebrew poetry, using repetition to make one point unmistakable.

🍞 Sharp contrasts line up here
🥤 Eat and drink form the first pair
🔁 Repetition doubles the emphasis
📖 One point made unmistakable through poetry

---
## 😊 My Servants Shall Rejoice, But Ye Shall Be Ashamed

This adds a third contrast, joy set against shame.

Rejoicing here is not private, it describes a whole community's mood.

Being ashamed describes public disgrace, not simply private embarrassment.

The gap between the two groups keeps widening with each line.

😊 A third contrast, joy against shame
🎉 Rejoicing describes a whole community
😳 Ashamed describes public disgrace
📖 The gap between groups keeps widening

---
## 🎶 My Servants Shall Sing For Joy Of Heart, But Ye Shall Howl For Vexation Of Spirit

This is the fourth and final contrast in the set.

"Vexation of spirit" means deep inward torment, more than simple sadness.

Singing from the heart and howling from torment sit side by side.

The list of four contrasts ends here, each one building on the last.

🎶 The fourth and final contrast here
😖 Vexation of spirit means deep torment
🎵 Singing and howling sit side by side
📖 Four contrasts build to this point

---
## 🏷️ Ye Shall Leave Your Name For A Curse Unto My Chosen

This means the name of this rebellious group will become a curse word.

Future generations would use it the way someone today might say "like Sodom."

The name itself would carry a warning inside it.

That kind of lasting shame was considered worse than simple death in this culture.

🏷️ Their name becomes a curse word
⚠️ Future generations use it as a warning
💀 Lasting shame was worse than death here
📖 A name can outlive the person entirely

---
## 🆕 Call His Servants By Another Name

God promises His true servants a new identity, a fresh name.

A new name in scripture often marks a new relationship or purpose.

This looks forward to a future beyond the current judgment described.

The book of Acts later records believers first called Christians, a new name for God's people.

🆕 A fresh name promised to God's servants
🔄 New names mark new relationships in scripture
👀 This points beyond the current judgment
📖 Acts records believers first called Christians

---
## 🙏 He That Sweareth In The Earth Shall Swear By The God Of Truth

"God of truth" in the original language is literally God of Amen.

Amen is the word people say to confirm something is trustworthy and sure.

Tying that word directly to God's name makes Him the standard for every promise.

Anyone making an oath anywhere on earth will use this name to do it.

🙏 God of truth is literally God of Amen
✅ Amen confirms something is trustworthy
📏 God becomes the standard for every oath
📖 Every oath on earth points to Him

---
## 🧹 The Former Troubles Are Forgotten

This closes the section with a full reset, not a partial one.

"Hid from mine eyes" means these past troubles are treated as if they never happened.

This is not simply moving past hard memories over time.

It describes a genuinely clean slate before God.

🧹 A full reset, not a partial one
🙈 Hid from mine eyes means treated as gone
📆 Not simply moving past painful memories
📖 A genuinely clean slate before God

# Isaiah 65:17-19
# 🌅 New Heavens And A New Earth
---
## 🌌 Behold, I Create New Heavens And A New Earth

"Create" here is the same strong word used for the first creation in Genesis.

This is not a repair of the old world, it is a brand new act of creation.

The New Testament quotes this promise directly in Revelation and Second Peter.

It describes the final goal the whole Bible has been building toward.

🌌 Create uses the same word as Genesis
🆕 Not a repair, an entirely new act
📜 Quoted directly in Revelation and Second Peter
📖 The final goal the whole Bible points to

---
## 🧠 The Former Shall Not Be Remembered, Nor Come Into Mind

This promises more than forgiveness, it promises the past will not even surface in memory.

"Come into mind" means it will not even be thought of again.

Earlier suffering will not be a shadow hanging over the new creation.

This goes further than most promises of comfort found earlier in Isaiah.

🧠 More than forgiveness, total forgetting
💭 Come into mind means not even thought of
☀️ No shadow hangs over the new creation
📖 Goes further than earlier comfort in Isaiah

---
## 📢 Be Ye Glad And Rejoice For Ever In That Which I Create

This is a direct command, not a suggestion or a wish.

"For ever" means this joy will not fade or run out over time.

The object of the joy is what God creates, not something people build themselves.

Joy here is a response to God's own action.

📢 A direct command, not a suggestion
⏳ For ever means joy that never fades
🙌 The joy responds to what God creates
📖 Joy here answers God's own action

---
## 🏙️ I Create Jerusalem A Rejoicing, And Her People A Joy

This does not just say Jerusalem will be joyful, it says Jerusalem becomes joy itself.

The city and its people are named separately here on purpose.

Both the place and the people share fully in this transformation.

This is the same city torn down and mourned earlier in Isaiah sixty four.

🏙️ Jerusalem becomes joy itself, not just joyful
👥 The city and people named separately
🔄 The same city mourned in Isaiah sixty four
📖 Both place and people share the joy

---
## 🎉 I Will Rejoice In Jerusalem, And Joy In My People

God is not a distant judge here, He is an active participant in the joy.

This mirrors back to the people's own rejoicing described just before it.

God delighting in His people answers every accusation from earlier in the chapter.

The relationship described here is fully restored, not simply tolerated.

🎉 God actively shares in the joy
🔄 Mirrors the people's own rejoicing
❤️ Answers every accusation earlier in the chapter
📖 A fully restored relationship, not tolerance

---
## 🔇 The Voice Of Weeping Shall Be No More Heard In Her

This promises an end to audible grief in the city, not just less of it.

"No more heard" means it will not happen at all, not simply less often.

Revelation later echoes this exact promise almost word for word.

It describes God wiping away every tear in a similar new creation scene.

🔇 An end to grief, not less of it
🚫 No more heard means it will not happen
📜 Revelation echoes this promise almost exactly
📖 God wiping away every tear later

# Isaiah 65:20-23
# 👶 Length Of Days Restored
---
## 👶 There Shall Be No More Thence An Infant Of Days

"Infant of days" describes a baby who dies very young.

In the ancient world, infant death was tragically common.

This promises that kind of early death will no longer happen.

The new creation described in the verses before this reverses even this basic tragedy.

👶 Infant of days means a baby dying young
😢 Infant death was tragically common then
🚫 This promises it will no longer happen
📖 Even this basic tragedy gets reversed

---
## 📏 Nor An Old Man That Hath Not Filled His Days

"Filled his days" means living a full, complete lifespan.

This verse promises the opposite problem also disappears, dying before old age.

Both ends of premature death, infancy and adulthood, are addressed together.

Length of life itself becomes part of God's blessing in this new creation.

📏 Filled his days means a full lifespan
⚖️ Both ends of early death disappear
🎂 Long life becomes part of the blessing
📖 Length of life itself is restored

---
## 💯 The Child Shall Die An Hundred Years Old

This does not mean people will still die as children.

It means someone living a hundred years will be considered young when they die.

Lifespans described here stretch far beyond a normal human life today.

This echoes the extremely long ages recorded before the flood in Genesis.

💯 Dying at a hundred counts as young here
📈 Lifespans stretch far beyond normal today
📜 Echoes the long ages before the flood
📖 A hundred years becomes a short life

---
## ⚠️ The Sinner Being An Hundred Years Old Shall Be Accursed

In this new world, dying at a hundred marks someone as cursed, not blessed.

That flips how most readers would naturally think about age and length of life.

The everyday standard for a long life completely changes here.

Even judgment in this new creation looks different than judgment looks today.

⚠️ A hundred years becomes a short, cursed life
🔄 This flips normal thinking about long life
📏 The standard for a long life changes
📖 Even judgment looks different here

---
## 🏠 They Shall Build Houses, And Inhabit Them

This sounds simple, but it directly answers a specific ancient curse.

Deuteronomy warns that disobedient Israel would build houses that enemies would then live in.

This promise reverses that curse completely.

People finally get to live in the homes their own hands built.

🏠 Answers a specific curse from Deuteronomy
⚔️ That curse gave homes to enemies instead
🔄 This promise reverses the curse completely
📖 People finally live in what they build

---
## 🚫 They Shall Not Build, And Another Inhabit

This states the reversed curse directly, as its own promise.

"They shall not plant, and another eat" adds the same idea about crops.

Losing a harvest to an invading enemy was a real and feared outcome in this era.

Both promises describe security from foreign conquest and loss.

🚫 States the reversed curse directly here
🌾 Losing crops to enemies was a real fear
🛡️ Both promises describe security from conquest
📖 Safety from loss becomes the new norm

---
## 🌳 As The Days Of A Tree Are The Days Of My People

Certain trees in this region, like oaks, could live for centuries.

Comparing a person's life to a tree's life pictures remarkable stability and length.

"Mine elect shall long enjoy the work of their hands" follows this comparison directly.

The picture is not just long life, it is long life spent enjoying real security.

🌳 Some trees in this region lived centuries
📏 Compares human life to a tree's length
🙌 Long life paired with real security
📖 Stability, not just years, is the point

---
## 😓 They Shall Not Labour In Vain, Nor Bring Forth For Trouble

"Labour in vain" echoes the curse placed on work back in Genesis three.

That curse made work frustrating, with no guarantee the effort would pay off.

"Bring forth for trouble" pictures a harvest that ends in disaster instead of food.

This promise reverses that ancient curse on human labor completely.

"They are the seed of the blessed of the LORD" ties this back to the seed named earlier.

😓 Labour in vain echoes the Genesis curse
🌾 Bring forth for trouble means a ruined harvest
🔄 This reverses the ancient curse on work
📖 Ties back to the seed named earlier

# Isaiah 65:24-25
# 🐺 Peace In The Holy Mountain
---
## 🔄 Before They Call, I Will Answer

This directly reverses the accusation made earlier in the chapter.

God had said, "when I called, ye did not answer."

Now the relationship works in the opposite direction entirely.

God responds before the need is even spoken out loud.

🔄 Reverses the accusation from earlier
📢 Earlier God called and got no answer
⏱️ Now God answers before anyone speaks
📖 The relationship is fully restored here

---
## 👂 While They Are Yet Speaking, I Will Hear

This adds a second layer to the promise just made.

Not only does God answer early, He hears while the words are still being said.

There is no delay and no distance left in this relationship.

This is the clearest possible picture of closeness after a chapter full of accusation.

👂 God hears while words are still spoken
⏳ No delay left in the relationship
📏 No distance left either
📖 The clearest picture of closeness here

---
## 🐺 The Wolf And The Lamb Shall Feed Together

Wolves naturally hunt lambs, so this pictures a complete reversal of nature.

The two animals sharing a meal peacefully is impossible under normal conditions.

Isaiah used this same picture earlier in chapter eleven to describe this same future peace.

Natural predator and prey become safe with each other in this new creation.

🐺 Wolves naturally hunt lambs, not feed with them
🐑 Feeding together pictures reversed nature
🔁 Isaiah used this same picture in chapter eleven
📖 Predator and prey become safe together

---
## 🐍 Dust Shall Be The Serpent's Meat

This phrase points straight back to the curse on the serpent in Genesis three.

God told the serpent then that it would eat dust all its days.

Even in this new, peaceful creation, that old curse is still mentioned.

The serpent alone stays under its ancient judgment while everything else is renewed.

"They shall not hurt nor destroy in all my holy mountain" closes the chapter on full, lasting peace.

🐍 Points back to the curse in Genesis
🍽️ Dust as meat continues that old curse
⚠️ The serpent alone stays under judgment
📖 The chapter closes on full, lasting peace`.trim();

export const ISAIAH_SIXTY_FIVE_PERSONAL_SECTIONS = parseIsaiahSixtyFiveRawNotes(ISAIAH_SIXTY_FIVE_RAW_NOTES);
