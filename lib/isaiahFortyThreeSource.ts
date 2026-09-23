export type IsaiahFortyThreePersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahFortyThreeRawNotes(rawText: string): IsaiahFortyThreePersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahFortyThreePersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+43:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 43 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+43:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+43:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 43 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 43,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 43:${startVerse}` : `Isaiah 43:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 43 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_FORTY_THREE_RAW_NOTES = `# Isaiah 43:1-4
# 🛡️ Created And Redeemed
---
## 🎨 Thus Saith The LORD That Created Thee, O Jacob

"Created" and "formed" are two different pictures here.

Created means brought into existence out of nothing.

Formed pictures a potter shaping clay by hand.

Jacob and Israel are the same person.

He is the ancestor of the whole nation.

God is both the nation's maker and its shaper.

🎨 Created means brought into existence

🏺 Formed pictures a potter shaping clay

👤 Jacob and Israel are the same person

📖 God is the nation's maker and shaper

## 💰 I Have Redeemed Thee, I Have Called Thee By Thy Name

To redeem means to buy back someone who was lost or owned by another.

In this culture, a close relative could redeem a family member out of slavery or debt.

God claims that same role for Himself here.

Calling someone by name means knowing them personally, not just as part of a crowd.

Israel belongs to God the same way a name belongs to a person.

💰 Redeemed means bought back from bondage

👨‍👩‍👧 A relative often redeemed family members

🗣️ Called by name means known personally

📖 Israel belongs to God personally

## 🌊 When Thou Passest Through The Waters

Deep water was a symbol of danger and chaos in the ancient world.

This may recall Israel walking through the Red Sea on dry ground.

The promise is not that hard waters will never come.

The promise is that God will be present inside them.

🌊 Waters pictured danger and chaos

🚶 This recalls the Red Sea crossing

⚠️ Hard waters will still come

📖 God stays present inside them

## 🔥 When Thou Walkest Through The Fire, Thou Shalt Not Be Burned

Fire in scripture often pictures testing or refining, not only destruction.

This exact promise gets acted out later in the book of Daniel.

Three men walk into a furnace and come out completely unharmed.

The point is protection through hardship, not an escape from it.

🔥 Fire pictures testing and refining

📖 Daniel later shows this exact promise

🙌 Three men survive the furnace unharmed

➡️ Protection comes through hardship, not around it

## 💵 I Gave Egypt For Thy Ransom, Ethiopia And Seba For Thee

A ransom is the price paid to set someone free.

Many scholars believe this points to Persia conquering Egypt, Ethiopia, and Seba.

Those conquests happened around the same time Persia freed Israel from exile.

God trades whole nations as the price for His people's freedom.

💵 Ransom means the price paid to free someone

🌍 Egypt, Ethiopia, and Seba were real nations

⏳ Persia conquered them near the same time

📖 Nations become the price for Israel's freedom

## 💎 Thou Wast Precious In My Sight, And I Have Loved Thee

God states His motive before He states anything else.

Israel did not earn this love through strength or size.

Being small among the nations was not a barrier to being valued.

Value here comes from being chosen, not from being impressive.

💎 Precious means deeply valued by God

❌ Israel did not earn this love

🤏 Being small was never a barrier

📖 God's love comes from choosing, not merit

## 🔄 I Will Give Men For Thee, And People For Thy Life

This repeats the same trade pictured two verses earlier.

Whole peoples are given up in exchange for Israel's life.

The ransom language from verse three continues here.

God treats His people's survival as worth that high a cost.

🔄 This repeats the earlier trade image

👥 Whole peoples are given for Israel

📜 The ransom language continues from before

📖 Israel's survival is worth this cost

# Isaiah 43:5-7
# 🧭 Gathered From Every Direction
---
## 🔁 Fear Not: For I Am With Thee

This same command opened the chapter back in verse one.

Repeating it here shows this is not a passing comfort.

It is the steady theme running through this entire chapter.

God's presence, not the absence of danger, removes the fear.

🔁 This command repeats from verse one

📌 It is the chapter's steady theme

🙅 Fear is not removed by safety

📖 God's presence removes the fear itself

## 🌱 I Will Bring Thy Seed From The East, And Gather Thee From The West

Seed here means descendants, the children and grandchildren of Israel.

East and west name two opposite directions on purpose.

The picture is a scattered people being pulled back from everywhere.

No direction is too far for God to reach.

🌱 Seed means descendants, not literal seeds

🧭 East and west are opposite directions

🌐 This pictures a scattered people gathered

📖 No direction is too far for God

## 🧭 I Will Say To The North, Give Up

This verse pairs north with south.

Verse five already paired east with west.

"Give up" is an old way of saying release him.

Together, four directions picture the entire earth.

God is not asking permission from north or south.

🧭 North pairs with south here

🔓 Give up means release what is held

🌍 Four directions picture the whole earth

📖 God commands, He does not ask

## 👨‍👩‍👧‍👦 Bring My Sons From Far, And My Daughters From The Ends Of The Earth

Sons and daughters here means every member of the scattered family.

"The ends of the earth" is a common Old Testament phrase for total distance.

No family member gets left out of the promise.

Distance is not a limit on God's reach.

👨‍👩‍👧‍👦 Sons and daughters means the whole family

🌏 Ends of the earth means total distance

🚫 No family member is left out

📖 Distance never limits what God can do

## 🏷️ Every One That Is Called By My Name

This phrase marks a person as belonging to God specifically.

A name in this culture carried identity and ownership together.

Being called by God's name is not automatic for every person.

It describes a relationship, not just a birth into the nation.

🏷️ Called by name marks ownership

🪪 Names carried identity in this culture

🤝 This describes a relationship, not birth

📖 Belonging to God is personal, not automatic

## 🎨 I Have Created Him For My Glory, I Have Formed Him

Created and formed appear together again, just like in verse one.

Glory here means God's own honor and worth being put on display.

Israel exists partly to show the world who God is.

Their purpose points outward, beyond themselves.

🎨 Created and formed repeat from verse one

👑 Glory means God's honor on display

🌍 Israel exists to show the world God

📖 Their purpose points beyond themselves

# Isaiah 43:8-13
# ⚖️ God's Courtroom
---
## 👁️ Bring Forth The Blind People That Have Eyes

This describes people who can physically see but refuse to understand.

Isaiah used this same picture just one chapter earlier for Israel.

Having eyes does not guarantee real sight.

The same is true of ears that will not truly hear.

👁️ Blind with eyes means willful refusal

🙈 Having eyes does not mean seeing

👂 The same is true of ears

📖 Real sight means real understanding, not eyesight

## ⚖️ Let All The Nations Be Gathered Together

This pictures a courtroom scene with every nation summoned.

God is putting the nations and their gods on trial.

The question on trial is who actually predicted the future correctly.

No other god steps forward with a real answer.

⚖️ This pictures a courtroom scene

🏛️ Every nation and their gods are summoned

❓ The trial asks who predicted correctly

📖 No other god has a real answer

## 🧑‍⚖️ Let Them Bring Forth Their Witnesses, That They May Be Justified

A witness in a trial is someone who can prove a claim is true.

The false gods are being challenged to produce real proof.

"Justified" here means proven right in the case being argued.

The silence that follows says everything.

🧑‍⚖️ A witness proves a claim is true

❓ False gods are challenged for proof

✅ Justified means proven right in court

📖 Their silence says everything

## 🔄 Ye Are My Witnesses, Saith The LORD

God flips the courtroom picture around here.

Instead of calling other gods to testify, He calls His own people.

Israel's history of watching God act becomes the evidence.

They saw the events, so they can testify to what is true.

🔄 God flips the courtroom picture

🙋 He calls His own people to testify

📜 Israel's history becomes the evidence

📖 They witnessed it, so they can testify

## 🔥 That Ye May Know And Believe Me, And Understand That I Am He

"I Am He" echoes the name God gave Moses at the burning bush.

It is a short way of claiming to be the one true God.

Knowing, believing, and understanding are three separate steps here.

Facts alone are not the same as real trust.

🔥 I Am He echoes the burning bush

👑 It claims to be the one true God

🪜 Knowing, believing, understanding are three steps

📖 Facts alone are not the same as trust

## 🥇 Before Me There Was No God Formed, Neither Shall There Be After Me

This is one of the clearest monotheism claims in the whole Bible.

God has no predecessor and no successor.

Every idol in the ancient world was made by human hands.

This God was not made by anyone at all.

🥇 One of scripture's clearest monotheism claims

⏮️ No predecessor came before Him

⏭️ No successor comes after Him

📖 Every idol was made, this God was not

## 👥 Beside Me There Is No Saviour

"Beside" here means alongside or in addition to.

The claim is not just that other gods are weaker.

The claim is that no other real option exists at all.

Salvation belongs to this one God alone.

👥 Beside means alongside or in addition

📉 This is not about weaker rivals

🚫 No other real option exists

📖 Salvation belongs to God alone

## 📢 I Have Declared, And Have Saved, And I Have Shewed

These three verbs summarize the evidence just presented.

"Declared" means He announced events before they happened.

"Shewed" is an old spelling of showed, meaning He proved it visibly.

Words alone were never the whole case.

Actions backed up every word.

📢 Declared means announced beforehand

🛟 Saved means He actually rescued them

👀 Shewed means showed it visibly

📖 Words and actions matched completely

## ⏳ Before The Day Was, I Am He

This means before time itself began.

God is not describing a memory from long ago.

He is stating that He existed before existence had a starting point.

No other being can honestly make that claim.

⏳ Before the day means before time began

🚫 This is not just a long memory

♾️ God existed before existence had a start

📖 No other being can claim this

## 🛑 I Will Work, And Who Shall Let It

"Let" is old English for hinder or stop.

That is the opposite of how we use "let" today.

The question expects the answer nobody.

Nothing can block what God has decided to do.

His plans do not depend on anyone's permission.

🛑 Let is old English for hinder

❓ The question expects the answer nobody

🚧 Nothing can block God's plan

📖 God's plans need no permission

# Isaiah 43:14-15
# 🏛️ Sent To Babylon For Your Sake
---
## 🔁 Your Redeemer, The Holy One Of Israel

These two titles appear together often in Isaiah's second half.

Redeemer pictures a relative who buys back what was lost.

Holy One means set apart, completely different from anything else.

Both titles describe the same God from two different angles.

🔁 These titles repeat often in Isaiah

👨‍👩‍👧 Redeemer pictures a relative buying back

✨ Holy One means set apart completely

📖 Both titles describe the same God

## 🏙️ For Your Sake I Have Sent To Babylon

Babylon was the empire that would soon conquer Judah and take its people captive.

Here God claims He is the one sending judgment against Babylon itself.

The exile and Babylon's own defeat both trace back to God's hand.

Nothing happens to either nation outside His control.

🏙️ Babylon would soon conquer Judah

⚔️ God claims He sends judgment on Babylon too

🔗 Both events trace back to His hand

📖 Nothing happens outside God's control

## 👑 Brought Down All Their Nobles, And The Chaldeans, Whose Cry Is In The Ships

Chaldeans was another name for the ruling people of Babylon.

Babylon was built along rivers and canals and was proud of its trade.

This pictures their proud shouting turned into cries of despair.

Even a great trading empire cannot outlast God's judgment.

👑 Chaldeans means Babylon's ruling people

🚢 Babylon was proud of its river trade

😢 Proud shouting turns to cries of despair

📖 No empire outlasts God's judgment

## 🎨 The Creator Of Israel, Your King

Creator and King are two more titles stacked together here.

A creator has authority simply by having made something.

A king has authority to rule and to lead.

God holds both kinds of authority over Israel at once.

🎨 Creator and King stack together here

🏗️ A creator has authority by making

👑 A king has authority to rule

📖 God holds both kinds of authority

# Isaiah 43:16-21
# 🌵 A New Thing In The Wilderness
---
## 🌊 Which Maketh A Way In The Sea

This recalls the Red Sea splitting open during the exodus from Egypt.

A "way" in the sea means dry ground appearing where water once was.

God is reminding Israel of His biggest rescue in their history.

This memory sets up an even bigger promise coming next.

🌊 This recalls the Red Sea splitting

🛤️ A way means dry ground in water

📜 God recalls His biggest rescue

📖 This memory sets up a bigger promise

## 🐎 Which Bringeth Forth The Chariot And Horse

This describes Pharaoh's army chasing Israel to the edge of the sea.

Chariots and horses were the most powerful weapons of that era.

Even Egypt's strongest force could not survive God's power.

Military strength means nothing against Him.

🐎 This describes Pharaoh's chasing army

⚔️ Chariots were the era's strongest weapons

💥 Egypt's strongest force could not survive

📖 Military strength means nothing to God

## 🧵 They Are Extinct, They Are Quenched As Tow

"Tow" is a loose, dry plant fiber used for lighting fires quickly.

It burns fast and disappears just as fast once put out.

Pharaoh's mighty army is compared to that same flimsy fiber.

What looked unstoppable is gone in a moment.

🧵 Tow means loose fiber used for fire

🔥 It burns fast and dies out fast

🪖 Pharaoh's army is compared to that fiber

📖 What looked unstoppable vanished in a moment

## ❗ Remember Ye Not The Former Things

This sounds surprising right after retelling the exodus in such detail.

God is not saying forget history altogether.

He is saying do not let the past limit what you expect next.

The next thing He does will be even greater.

❗ This sounds surprising after the exodus story

🚫 God is not erasing history itself

🔭 He is asking for open expectations

📖 What comes next will be greater still

## 👀 Behold, I Will Do A New Thing

"Behold" is an old word that means pay close attention now.

This new thing will be a fresh act of rescue.

It is described as already starting, not just planned for later.

God's work does not stop with the exodus story.

👀 Behold means pay close attention now

🌱 This new thing is a fresh rescue

🕐 It is already starting, not just planned

📖 God's work continues past the exodus

## 🏜️ I Will Make A Way In The Wilderness, And Rivers In The Desert

This mirrors the sea crossing from verse sixteen in a new setting.

This time the miracle happens in dry desert land, not open water.

Rivers appearing in a desert pictures life where none should exist.

This points forward to Israel's coming return from exile in Babylon.

🏜️ This mirrors the sea crossing, in a desert

💧 Rivers picture life where none should exist

🔄 A new miracle for a new setting

📖 This points to the return from exile

## 🐺 The Beast Of The Field Shall Honour Me

Wild animals honoring God is a picture of total transformation.

"Dragons" here likely refers to jackals, wild desert animals.

"Owls" points to desert birds living in wasteland places.

Even creatures with no voice for worship take part in this praise.

🐺 Wild animals honoring God pictures transformation

🐾 Dragons likely means jackals here

🦉 Owls means desert dwelling birds

📖 Even voiceless creatures take part in praise

## 💧 To Give Drink To My People, My Chosen

The water in the wilderness has a clear purpose behind it.

It exists to keep God's chosen people alive on the journey.

Nature itself gets reshaped to serve Israel's needs.

Every miracle in this passage points back to caring for His people.

💧 The water has a clear purpose

🚶 It keeps His people alive on the journey

🌎 Nature is reshaped to serve Israel

📖 Every miracle points back to His people

## 🎨 This People Have I Formed For Myself

"Formed" repeats the same word used back in verse one.

Israel exists for a reason beyond simply existing.

Their purpose is to shew forth, or openly declare, God's praise.

A formed people were never meant to stay silent.

🎨 Formed repeats the word from verse one

🎯 Israel exists for a reason

📣 Shew forth means openly declare

📖 A formed people were not meant for silence

# Isaiah 43:22-24
# 😮‍💨 A Weary God
---
## 🔄 Thou Hast Been Weary Of Me, O Israel

This verse flips the direction readers might expect.

Readers might expect God to be tired of Israel's failures.

Instead, the text says Israel grew tired of God.

The rest of this section explains exactly how.

🔄 This flips the direction readers expect

😩 Not God tired of Israel, but the reverse

🔍 Israel grew tired of God instead

📖 The rest of the section explains how

## 🐑 Thou Hast Not Brought Me The Small Cattle Of Thy Burnt Offerings

"Small cattle" means sheep and goats, the animals used most in sacrifice.

A burnt offering was completely burned up on the altar as worship.

God is not primarily complaining about a shortage of animals.

He is pointing out a shortage of real devotion.

🐑 Small cattle means sheep and goats

🔥 A burnt offering was fully burned in worship

📉 This is not about a shortage of animals

📖 It is about a shortage of devotion

## 🪶 I Have Not Caused Thee To Serve With An Offering

God points out that He never made these rituals a heavy burden.

"Incense" was a fragrant substance burned as part of worship.

The offerings were meant to be a response, not forced labor.

Israel treated worship as a weight instead of a gift.

🪶 God never made worship a heavy burden

🕯️ Incense means fragrant smoke burned in worship

🎁 Offerings were meant as a response

📖 Israel treated a gift like forced labor

## 🌾 Thou Hast Bought Me No Sweet Cane With Money

"Sweet cane" was a fragrant reed imported from a distant land.

It was used in the sacred anointing oil and in incense.

Buying it required real money and real effort.

Israel was not even willing to spend that much on worship.

🌾 Sweet cane was an imported fragrant reed

🧴 It was used in sacred anointing oil

💰 Buying it required real money and effort

📖 Israel would not spend even that much

## 🔄 Thou Hast Made Me To Serve With Thy Sins

This verse reverses the expected roles completely.

Israel was supposed to serve God through worship and offerings.

Instead, their sins made God the one carrying a burden.

"Wearied" means worn down by something heavy and constant.

🔄 This verse reverses the expected roles

🙏 Israel was meant to serve through worship

⚖️ Instead their sins burdened God

📖 Wearied means worn down by something constant

# Isaiah 43:25-28
# 🩹 Blotted Out For His Own Sake
---
## ✍️ I, Even I, Am He That Blotteth Out Thy Transgressions

"Blotteth out" pictures wiping away ink from a written record.

Ancient records were written on materials that ink could be washed from.

"For mine own sake" means this forgiveness is not earned by Israel.

It flows from who God is, not from what Israel deserves.

He also promises to no longer remember these sins at all.

✍️ Blotteth out means wiping away ink

📜 Ancient records could be washed clean

🎁 Forgiveness is not earned by Israel

📖 It flows from who God is

## ⚖️ Put Me In Remembrance: Let Us Plead Together

God invites Israel into a courtroom scene one more time.

This time Israel is invited to make its own case.

"Plead" means to argue a case in front of a judge.

God is confident enough in His fairness to allow the challenge.

⚖️ God invites another courtroom scene

🙋 Israel is invited to argue its case

🧑‍⚖️ Plead means arguing before a judge

📖 God allows the challenge, confident in His fairness

## 👴 Thy First Father Hath Sinned

Many identify this first father as Jacob, the nation's own ancestor.

The pattern of failure goes back to the very beginning of the family.

"Thy teachers" points to the priests and prophets meant to guide the people.

Even the nation's leaders failed to keep them on the right path.

👴 First father likely means Jacob himself

🔁 Failure goes back to the beginning

📚 Teachers means the priests and prophets

📖 Even the leaders failed to guide them

## 🚫 I Have Profaned The Princes Of The Sanctuary

"Profaned" means treated something holy as common or unclean.

The princes of the sanctuary were the priests serving in the temple.

Losing the temple and its priesthood was part of the coming judgment.

Even sacred roles were not shielded from the consequences of sin.

🚫 Profaned means treated as unclean

👳 Princes of the sanctuary means the priests

🏛️ The temple and priesthood were both lost

📖 Even sacred roles faced real consequences

## 📜 Given Jacob To The Curse, And Israel To Reproaches

"Curse" points back to the warnings given long before in the law of Moses.

"Reproaches" means public scorn and mockery from watching nations.

The chapter ends on the same painful note that closed chapter forty two.

Even here, the promise of forgiveness in verse twenty five still stands underneath it.

📜 Curse points back to warnings in the law

😢 Reproaches means public scorn and mockery

🔁 This echoes how chapter forty two ended

📖 Forgiveness from verse twenty five still stands
`.trim();

export const ISAIAH_FORTY_THREE_PERSONAL_SECTIONS = parseIsaiahFortyThreeRawNotes(ISAIAH_FORTY_THREE_RAW_NOTES);
