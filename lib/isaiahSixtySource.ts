export type IsaiahSixtyPersonalSection = {
  chapter: number;
  startVerse: number;
  endVerse: number;
  reference: string;
  title: string;
  icon: string;
  phrases: Array<[string, string]>;
};

function parseIsaiahSixtyRawNotes(rawText: string): IsaiahSixtyPersonalSection[] {
  const lines = rawText.replace(/\r\n/g, "\n").trim().split("\n");
  const sections: IsaiahSixtyPersonalSection[] = [];
  let index = 0;

  while (index < lines.length) {
    const verseMatch = lines[index].trim().match(/^#\s*Isaiah\s+60:(\d+)(?:[-–—](\d+))?\s*$/i);

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
      throw new Error("Missing Isaiah 60 section title after verse " + startVerse);
    }
    const title = titleMatch[1].trim();
    index += 1;

    while (index < lines.length && (!lines[index].trim() || lines[index].trim() === "---")) index += 1;

    const phrases: Array<[string, string]> = [];
    while (index < lines.length && !/^#\s+Isaiah\s+60:/i.test(lines[index].trim())) {
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
        !/^#\s+Isaiah\s+60:/i.test(lines[index].trim()) &&
        lines[index].trim() !== "---"
      ) {
        bodyLines.push(lines[index].trimEnd());
        index += 1;
      }

      while (bodyLines.length && !bodyLines[0].trim()) bodyLines.shift();
      while (bodyLines.length && !bodyLines[bodyLines.length - 1].trim()) bodyLines.pop();

      if (!bodyLines.length) {
        throw new Error("Missing Isaiah 60 explanation for " + phraseHeading);
      }

      phrases.push([phraseHeading, bodyLines.join("\n")]);
      if (lines[index]?.trim() === "---") index += 1;
    }

    sections.push({
      chapter: 60,
      startVerse,
      endVerse,
      reference: startVerse === endVerse ? `Isaiah 60:${startVerse}` : `Isaiah 60:${startVerse}-${endVerse}`,
      title,
      icon: "",
      phrases,
    });
  }

  if (sections.length !== 7) {
    throw new Error("Expected 7 Isaiah 60 sections, received " + sections.length);
  }

  return sections;
}

const ISAIAH_SIXTY_RAW_NOTES = `# Isaiah 60:1-3
# 🌅 Arise And Shine
---
## Arise, Shine

Thee here refers to Zion, God's people pictured as one woman.

Arise pictures someone finally standing up after sitting in the dark.

Chapters fifty eight and fifty nine described that dark season of sin.

This command marks the exact moment the darkness lifts.

🌅 Arise means standing after sitting in darkness

👩 Thee refers to Zion, pictured as a woman

📉 Chapters before describe a dark season

📖 This verse marks darkness lifting

## Thy Light Is Come

This light is not something Zion produced on her own.

Glory means God's own presence and radiance made visible.

Risen pictures a sunrise breaking after a long night.

God Himself is the light source, not Zion's own effort.

☀️ Light is not Zion's own doing

✨ Glory means God's own radiance

🌄 Risen pictures a sunrise breaking

📖 God Himself is the light source

## Gross Darkness The People

Gross darkness means a heavy darkness that blocks almost all light.

This describes the spiritual condition of the nations outside Israel.

Chapter fifty nine already showed Israel groping in that same kind of dark.

Now the picture widens to include the whole world.

🌑 Gross darkness means a heavy blinding dark

🌍 It describes nations outside Israel

🔁 Israel groped in this same darkness

📖 The picture now includes the whole world

## The LORD Shall Arise Upon Thee

This repeats the sunrise picture from verse one on purpose.

While the nations sit in darkness, Zion gets a different sunrise.

Arise here means God's presence becoming visible and near.

The contrast between the verse's two halves is the whole point.

🔁 This repeats the sunrise picture again

🌗 Nations stay dark while Zion does not

👁️ Arise means God's presence becoming visible

📖 The contrast is the whole point

## The Gentiles Shall Come To Thy Light

Gentiles means people and nations outside Israel.

Zion's light was never meant to stay private.

The nations are drawn toward it instead of staying away.

This begins a picture that continues through the rest of the chapter.

🌐 Gentiles means nations outside Israel

🔒 The light was never meant to stay private

🚶 Nations are drawn toward the light

📖 This picture continues through the chapter

## Kings To The Brightness Of Thy Rising

Earlier in Israel's history, foreign kings ruled over her by force.

This verse pictures kings coming to Zion on their own.

Brightness describes the same rising light introduced in verse one.

Zion's rescue reverses her old position of weakness.

👑 Kings once ruled over Israel by force

🚶 Now kings come to Zion willingly

🌅 Brightness recalls the rising light from before

📖 This reverses Zion's old weakness

# Isaiah 60:4-7
# 🐫 Camels, Gold, And Incense
---
## Lift Up Thine Eyes Round About

This is a command to look outward at what God is doing.

Zion had spent generations in shame, exile, and despair.

The invitation is to finally see the change happening in real time.

Sight here means recognizing God's work, not just physical seeing.

👀 Lift up eyes means look outward

😔 Zion had years of shame and exile

🔄 This invites her to see the change

📖 Sight here means recognizing God's work

## Thy Sons Shall Come From Far

Sons and daughters here picture the exiled people of Israel.

From far describes their scattered locations across foreign lands.

Nursed at thy side pictures small children being carried home on the hip.

The image is one of tender homecoming, not a forced march.

👶 Sons and daughters picture exiled Israel

🌍 From far describes scattered foreign lands

🤱 Nursed at thy side pictures carried children

📖 This homecoming is tender, not forced

## Thine Heart Shall Fear, And Be Enlarged

This fear is not terror but stunned amazement.

Enlarged pictures a heart stretched wide by unexpected joy.

Zion did not expect this much good news at once.

Awe and joy arrive together in the same moment.

😮 Fear here means stunned amazement

💗 Enlarged pictures a heart stretched wide

🎁 She did not expect this much good news

📖 Awe and joy arrive together

## The Abundance Of The Sea Shall Be Converted Unto Thee

The sea often stands for the wealth carried by trading ships.

Converted here means turned toward Zion instead of elsewhere.

Wealth that once flowed past her now flows to her.

The forces of the Gentiles describes nations bringing their resources willingly.

🌊 Sea often pictures trade and wealth

🔄 Converted means turned toward Zion

💰 Wealth now flows to her, not past her

📖 Nations bring resources willingly

## The Multitude Of Camels Shall Cover Thee

Camels were the main transport for goods across desert trade routes.

Midian and Ephah were regions and tribes east of Israel.

A multitude of camels pictures wealth arriving in huge quantity.

This is trade language, not a literal covering of the land.

🐫 Camels carried goods on desert trade routes

🗺️ Midian and Ephah were regions to the east

📦 A multitude pictures huge quantity

📖 This is trade language, not literal covering

## They Shall Bring Gold And Incense

Sheba was a wealthy trading kingdom in the southern Arabian region.

Gold and incense were two of its most famous exports.

Shew forth means to publicly display or announce something.

The gifts themselves become a way of praising the LORD.

🏺 Sheba was a wealthy trading kingdom

✨ Gold and incense were its famous exports

📢 Shew forth means to publicly display

📖 Their gifts become praise to the LORD

## The Flocks Of Kedar Shall Be Gathered Together

Kedar and Nebaioth were nomadic Arab tribes known for herding.

Flocks and rams describe animals valuable for food and sacrifice.

These distant herders bring their best animals to Zion.

Even remote desert tribes join in honoring the LORD.

🐑 Kedar and Nebaioth were nomadic herding tribes

🐏 Flocks and rams were valuable animals

🎁 They bring their best to Zion

📖 Even remote tribes honor the LORD

## I Will Glorify The House Of My Glory

With acceptance on mine altar means the offerings will be received, not rejected.

The house of my glory refers to the temple in Jerusalem.

God Himself promises to make His own house more glorious.

The temple's honor was always tied to God's presence, not its size.

✅ Acceptance means the offerings are received

🏛️ House of my glory means the temple

👑 God promises to glorify His own house

📖 Its honor comes from His presence

# Isaiah 60:8-9
# 🕊️ Flying Like Doves
---
## Who Are These That Fly As A Cloud

This question pictures a large group approaching from a distance.

A cloud on the horizon could mean a moving crowd or fleet of ships.

The question voices Zion's own wonder at what she sees coming.

The next verse answers exactly who this approaching group is.

☁️ A cloud pictures a large approaching group

🚢 It could describe ships seen from far off

❓ Zion wonders at what she sees

📖 The next verse answers the question

## As The Doves To Their Windows

Doves fly home to their nests in tight, hurried flocks.

Windows here means the openings doves use to enter their nesting places.

The comparison pictures eager, direct movement with no wasted motion.

These travelers are not wandering, they are heading straight to Zion.

🕊️ Doves fly home in hurried flocks

🪟 Windows means the openings doves enter

➡️ The picture shows direct, eager movement

📖 These travelers head straight to Zion

## The Isles Shall Wait For Me

Isles was a common way to describe distant coastlands and nations.

Wait here means eager expectation, not idle delay.

Tarshish was a far off trading port, likely in modern day Spain.

Distant nations are pictured watching for God's next move.

🏝️ Isles meant distant coastlands and nations

⏳ Wait here means eager expectation

🚢 Tarshish was a far off trading port

📖 Distant nations watch for God's move

## Because He Hath Glorified Thee

The wealth described here is not the real point of the verse.

Silver and gold arrive because of what God has already done.

The Holy One of Israel names the same God who made the promise.

Every gift in this chapter flows from God's own glory, not human effort.

💰 Wealth is not the real point here

🙏 Gifts arrive because of God's work

✨ Holy One of Israel is God's own title

📖 Every gift flows from His glory

# Isaiah 60:10-12
# 🧱 Strangers Build Thy Walls
---
## The Sons Of Strangers Shall Build Up Thy Walls

Strangers here means people from foreign nations, once considered outsiders.

Walls in the ancient world meant safety and protection for a whole city.

These former outsiders now help rebuild what was once destroyed.

The people who might have stayed enemies become willing helpers.

🧱 Strangers means people from foreign nations

🏰 Walls meant safety for a whole city

🤝 Former outsiders become willing helpers

📖 Old enemies now help rebuild

## In My Wrath I Smote Thee, But In My Favour Have I Had Mercy

Smote means struck down, describing real judgment that already happened.

Favour means God's kindness freely given, not something earned.

The same God who judged Israel is the one restoring her now.

Judgment and mercy come from the same hand, not two different gods.

⚡ Smote means struck down in judgment

💛 Favour means kindness freely given

🙌 The same God judges and restores

📖 Judgment and mercy share one hand

## Thy Gates Shall Be Open Continually

City gates in this culture were shut at night for safety.

An always open gate meant no threat was left to guard against.

It also meant a constant, unstoppable flow of visitors coming in.

Safety here comes from peace, not from a stronger wall.

🚪 Gates were normally shut at night

🛡️ An open gate means no threat remains

🌊 It also means a constant flow of visitors

📖 Peace, not walls, brings this safety

## That Their Kings May Be Brought

This repeats the picture from earlier in the chapter on purpose.

Brought suggests kings coming under Zion's authority, not as invaders.

Political power itself now serves the purpose God set for Zion.

Even rulers answer to what God is doing here.

🔁 This repeats an earlier picture on purpose

👑 Brought means kings coming under Zion's authority

⚙️ Political power now serves God's purpose

📖 Even rulers answer to this plan

## The Nation That Will Not Serve Thee Shall Perish

Serve here does not mean forced slavery under Zion's power.

It means recognizing and joining what God is doing through her.

Refusing that recognition is really refusing God Himself.

The warning is about rejecting God, not about national pride.

⚔️ Serve does not mean forced slavery

🙏 It means joining what God is doing

🚫 Refusing this means refusing God

📖 The warning targets rejecting God, not pride

## Those Nations Shall Be Utterly Wasted

Utterly wasted means completely and totally destroyed.

The repetition in this verse is a normal way Hebrew poetry emphasizes a point.

Saying the same warning twice makes it impossible to miss.

This is the last hard warning before the chapter turns fully to hope.

💥 Utterly wasted means totally destroyed

🔁 Hebrew poetry often repeats for emphasis

📢 Repetition makes the warning impossible to miss

📖 This is the chapter's last hard warning

# Isaiah 60:13-16
# 🌲 The Glory Of Lebanon
---
## The Glory Of Lebanon Shall Come Unto Thee

Lebanon was famous across the ancient world for its tall, prized trees.

Fir, pine, and box were valuable woods used in construction.

These trees once built Solomon's temple generations earlier.

The best materials in the region now go toward honoring God again.

🌲 Lebanon was famous for its tall trees

🪵 Fir, pine, and box were prized woods

🏛️ These same trees once built Solomon's temple

📖 The best materials honor God again

## The Place Of My Feet Glorious

The place of my feet is another way to describe the temple.

The picture treats the temple as God's own footstool on earth.

Glorious here means made beautiful and worthy of the one who dwells there.

God ties His own honor to the beauty of His dwelling place.

👣 Place of my feet describes the temple

🪑 The temple is pictured as God's footstool

✨ Glorious means beautiful and worthy

📖 God ties His honor to this place

## The Sons Of Them That Afflicted Thee Shall Come Bending

Afflicted means those who caused real harm and suffering to Israel.

Bending pictures a posture of humility and submission, not casual greeting.

The very families who once caused pain now come in respect.

This reverses the shame Zion carried for so long.

😔 Afflicted means those who caused real harm

🙇 Bending pictures humility and submission

🔄 Former enemies now come in respect

📖 This reverses Zion's old shame

## They Shall Call Thee, The City Of The LORD

A new name in scripture often marks a completely new identity.

The city of the LORD replaces every insult Zion once carried.

The Zion of the Holy One of Israel ties her identity directly to God.

Her worth was never really about her own history or size.

🏷️ A new name marks a new identity

🏙️ This name replaces every old insult

✝️ Her identity ties directly to God

📖 Her worth never depended on her own size

## Whereas Thou Hast Been Forsaken And Hated

Forsaken means abandoned, left with no one to help or defend her.

No man went through thee describes a city so ruined that travelers avoided it.

This is a real memory, not an exaggeration for effect.

The next phrase answers this painful history directly.

💔 Forsaken means abandoned with no defender

🚷 No one traveled through her ruins

😢 This is a real, painful memory

📖 What comes next answers this directly

## I Will Make Thee An Eternal Excellency

Excellency here means something outstanding, not just pleasant or nice.

Eternal means this change will not fade the way past glory did.

A joy of many generations promises lasting delight, not a brief moment.

God replaces a shameful memory with a permanent one instead.

🏆 Excellency means something outstanding

♾️ Eternal means it will not fade

🎉 A joy for many generations to come

📖 A permanent memory replaces the shameful one

## Thou Shalt Suck The Milk Of The Gentiles

This pictures nations nourishing Zion the way a mother feeds a child.

It is a picture of provision and care, not literal nursing.

Kings themselves are pictured providing for her, not ruling over her.

The roles from earlier in Israel's history are fully reversed.

🍼 Nations nourish Zion like a mother

🤝 This pictures provision, not literal nursing

👑 Kings provide for her instead of ruling her

📖 Old roles from history are fully reversed

## I The LORD Am Thy Saviour And Thy Redeemer

Saviour means the one who rescues someone from danger or ruin.

Redeemer means a family member with the right to buy someone back.

The mighty One of Jacob ties this promise to the whole family line.

Every gift in this chapter points back to who God is, not what Zion earned.

🛟 Saviour means the one who rescues

👨‍👩‍👧 Redeemer means a family member who buys back

💪 Mighty One of Jacob names the family line

📖 Every gift points to who God is

# Isaiah 60:17-18
# 🥇 Gold For Brass
---
## For Brass I Will Bring Gold

Each pair names a lesser material being replaced by a greater one.

Brass, iron, wood, and stone were common, everyday building materials.

Gold, silver, brass, and iron picture a permanent upgrade in value.

The whole city is pictured being rebuilt at a higher standard.

⚙️ Each pair trades up in value

🧱 Brass, iron, and stone were common materials

💰 Gold and silver picture a permanent upgrade

📖 The whole city is rebuilt higher

## Thy Officers Peace, And Thine Exactors Righteousness

Exactors were officials once known for harsh, unfair demands.

This promises a total change in how leaders treat the people.

Peace and righteousness become the new job description for leadership.

Good government here flows from God's presence, not clever policy.

📋 Exactors once made harsh demands

🔄 Leadership itself will completely change

⚖️ Peace and righteousness become the new standard

📖 Good government flows from God's presence

## Violence Shall No More Be Heard In Thy Land

This directly answers the violence described earlier in chapter fifty nine.

Wasting and destruction describe the ruin that violence always leaves behind.

The absence of these things is treated as real, lasting news.

Peace here is not just quiet, it is safety fully restored.

🔇 This answers violence from before

🌪️ Wasting and destruction describe violence's ruin

✅ Their absence is treated as real news

📖 Peace here means safety fully restored

## Thou Shalt Call Thy Walls Salvation

Renaming the walls and gates marks a change in the city's whole purpose.

Salvation and Praise replace names tied to fear or shame.

A wall named Salvation protects instead of threatening.

Even the city's architecture now testifies to what God has done.

🏷️ Renaming marks a change in purpose

🛡️ Salvation and Praise replace names of fear

🧱 A wall named Salvation protects, not threatens

📖 The architecture itself testifies to God

# Isaiah 60:19-22
# ☀️ An Everlasting Light
---
## The Sun Shall Be No More Thy Light By Day

This does not mean the physical sun will disappear from the sky.

It means Zion's true light source will no longer be the sun or moon.

Both natural lights eventually fade, rise, and set on a cycle.

God's own light does not depend on any daily cycle.

☀️ The physical sun does not disappear

🌗 Zion's true light source changes here

🔄 Sun and moon both follow a cycle

📖 God's light needs no daily cycle

## The LORD Shall Be Unto Thee An Everlasting Light

Everlasting means without an end, unlike any created light source.

Thy glory ties God's own honor directly to Zion's wellbeing.

This same picture returns later in Revelation chapter twenty one.

A light this permanent needs no replacement and no rest.

♾️ Everlasting means a light with no end

✨ Thy glory ties God's honor to Zion

📜 This picture returns in Revelation

📖 A permanent light needs no rest

## Thy Sun Shall No More Go Down

This repeats verse nineteen's picture to press the point further.

No sunset or moonset pictures a day that simply never ends.

The image is meant to describe permanence, not a scientific claim.

A day without ending pictures joy that never runs out.

🔁 This repeats verse nineteen on purpose

🌇 No sunset pictures an endless day

🧠 This describes permanence, not a science claim

📖 Endless day pictures joy without end

## The Days Of Thy Mourning Shall Be Ended

Mourning here covers years of exile, loss, and grief.

Ended means these days stop completely, not just lessen.

This is the actual promise the light imagery has been building toward.

God's light and God's comfort arrive as one single gift.

😢 Mourning covers years of exile and loss

🛑 Ended means these days stop completely

🎯 This is the promise the imagery builds toward

📖 Light and comfort arrive as one gift

## Thy People Also Shall Be All Righteous

This promises an inward change, not just better outward behavior.

All righteous describes the whole community, not a faithful few.

Inherit the land for ever ties this promise to the land given long ago.

This promise looks forward to a change words alone cannot produce.

❤️ This describes inward change, not behavior alone

👥 All righteous means the whole community

🗺️ This ties to the land promised long ago

📖 The change goes beyond what words can do

## The Branch Of My Planting, The Work Of My Hands

A branch of God's planting means the people's righteousness comes from Him, not themselves.

The work of my hands repeats the same idea in different words.

Nothing here credits human effort or self improvement.

God's own glory, not Zion's achievement, is the real point of the change.

🌱 A branch pictures growth God Himself planted

🙌 The work of my hands repeats this idea

🚫 Human effort gets no credit here

📖 God's own glory is the real point

## A Little One Shall Become A Thousand

This pictures explosive growth from a small, weak beginning.

A small one becoming a strong nation repeats the same promise.

Growth like this could never come from natural population increase alone.

The scale of the promise points back to God's own power.

🌱 This pictures growth from a small beginning

📈 The next phrase repeats the same promise

🚫 Natural growth alone could not explain this

📖 The scale points back to God's power

## I The LORD Will Hasten It In His Time

Hasten means to speed up something already planned, not to rush carelessly.

In his time means the timing stays fully in God's control.

This closing line answers every promise made earlier in the chapter.

The chapter that began with darkness ends with certainty, not doubt.

⏩ Hasten means speeding up a planned event

⏳ In his time means God controls the timing

🔗 This line answers every earlier promise

📖 Darkness gave way to certainty by the end
`.trim();

export const ISAIAH_SIXTY_PERSONAL_SECTIONS = parseIsaiahSixtyRawNotes(ISAIAH_SIXTY_RAW_NOTES);
