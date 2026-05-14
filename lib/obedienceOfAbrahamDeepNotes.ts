type AbrahamSection = {
  reference: string;
  title: string;
  points: string[];
};

type AbrahamChapterNote = {
  chapter: number;
  title: string;
  intro: string;
  flow: string[];
  sections: AbrahamSection[];
  lesson: string;
};

function renderVerseRange(reference: string) {
  const match = reference.match(/^Genesis\s+\d+:(.+)$/);
  return match ? `**${match[1]}**` : reference;
}

type AbrahamChapterDepth = {
  previous: string;
  whyMatters: string;
  watchFor: string[];
  history: string;
  covenant: string;
  callbacks: string[];
  emotional: string;
  application: string;
  bridge: string;
};

const ABRAHAM_CHAPTER_DEPTH: Record<number, AbrahamChapterDepth> = {
  11: {
    previous:
      "Genesis has been moving from creation to collapse, from Eden to exile, from Noah's fresh start to Babel's proud tower. By the time Abram appears, the world is not spiritually clean or simple. Humanity is scattered, languages are confused, and people are still trying to build identity without God.",
    whyMatters:
      "Genesis 11 matters because it shows the world Abraham is called out of. His story does not begin in a spiritual vacuum. It begins after Babel, inside a family line, in a world shaped by false worship, unfinished journeys, and promises that have not yet been spoken clearly.",
    watchFor: [
      "🏙️ how Babel tries to make a name without God",
      "🧬 how the genealogy quietly preserves the line of promise",
      "🛣️ how Terah's family starts toward Canaan but stops in Haran",
      "🥀 how Sarai's barrenness is named before the promise is given",
    ],
    history:
      "Ur was not a tiny village. It was a major Mesopotamian city with trade, wealth, temples, moon-god worship, and a settled way of life. Leaving that world meant leaving culture, protection, family networks, and a whole religious system. Haran was also tied to moon-god worship, so Abram's family story is already tangled with movement, idolatry, and partial obedience before Genesis 12 ever begins.",
    covenant:
      "The covenant has not been announced yet, but the stage is being built. Babel says, 'Let us make a name.' Genesis 12 will answer with God saying, 'I will make your name great.' That contrast is the doorway into the Abraham story. Human pride builds upward. Covenant grace comes downward.",
    callbacks: [
      "🌱 Eden showed humanity reaching for wisdom apart from God.",
      "🌊 Noah's generation showed corruption spreading through the earth.",
      "🏙️ Babel shows humanity organizing rebellion together.",
      "🧬 Shem's line shows God preserving a thread through history.",
    ],
    emotional:
      "There is a quiet ache in Genesis 11. Names pass by quickly. Years pass. Families move. Haran dies. Sarai is barren. Terah starts a journey and stops. You can feel the unfinishedness. Before Abraham becomes the father of faith, he is part of a family carrying grief, delay, and a road that has not reached its destination.",
    application:
      "Sometimes God begins preparing a calling before the person even knows how to name it. You may look at your family history and see stops, grief, confusion, or half-finished obedience. Genesis 11 reminds us that God can start His work inside that kind of story.",
    bridge:
      "Genesis 11 ends with Abram in Haran. Genesis 12 begins with God's voice. The scattered world is about to meet a promise that will one day bless every family on earth.",
  },
  12: {
    previous:
      "Genesis 11 ended with a family stopped in Haran. Now the story turns from background to calling. God speaks to Abram and the rescue plan that will shape the rest of Scripture begins.",
    whyMatters:
      "Genesis 12 changes everything because God's answer to Babel is not another tower, empire, or human system. God's answer is a promise spoken to one man, through one family, for the blessing of all families of the earth.",
    watchFor: [
      "📣 how God calls Abram away from every familiar layer of security",
      "🌍 how the promise is bigger than Abram's private life",
      "🪨 how altars mark worship in the promised land",
      "🌾 how famine tests Abram immediately after obedience",
      "😨 how fear in Egypt exposes Abram's unfinished formation",
    ],
    history:
      "In the ancient world, leaving country, kindred, and father's house was not like moving apartments. Family was survival. Land was identity. Clan protection mattered. Inheritance moved through household lines. Abram is being asked to step away from the structures that normally told a man who he was and where he belonged.",
    covenant:
      "Genesis 12 introduces the covenant promises in seed form: land, nation, blessing, name, protection, and blessing for all families. This is the beginning of Israel's story, but it is also the beginning of the Bible's long road toward Jesus, the promised seed through whom the nations are blessed.",
    callbacks: [
      "🏙️ Babel tried to make a name; God promises to make Abram's name great.",
      "🌱 Eden lost blessing through distrust; Abraham begins a path of blessing through trust.",
      "🧭 Noah stepped into a new world after judgment; Abram steps into a new future by promise.",
    ],
    emotional:
      "Picture Abram hearing God call him while Sarai is still barren and the destination is not fully mapped out. This is not easy faith. This is a man walking with questions, a wife carrying disappointment, and a household stepping into uncertainty because God's voice has become heavier than comfort.",
    application:
      "Obedience often starts before understanding. Abram does not get the whole map. He gets a word. That is still how faith works for us. God does not always explain the entire road, but He gives enough light for the next faithful step.",
    bridge:
      "Genesis 12 gives us both faith and fear. Abram obeys the call, builds altars, and then fails in Egypt. Genesis 13 will show whether he can return to worship and trust God with blessing instead of grabbing for himself.",
  },
  13: {
    previous:
      "Abram has just come out of Egypt with wealth, shame, and mercy. God protected Sarai and the promise, but Abram has learned that fear can travel with him even after obedience.",
    whyMatters:
      "Genesis 13 matters because it shows Abram back at the altar and then tested by prosperity. The question is no longer famine. The question is whether blessing will create strife, greed, and grasping.",
    watchFor: [
      "🪨 Abram returns to the place of worship",
      "🐑 wealth creates pressure between households",
      "👀 Lot chooses by sight",
      "🌄 God renews the land promise after Abram refuses to grasp",
    ],
    history:
      "Nomadic herdsmen needed pasture and water. Large flocks were wealth, but they were also logistical pressure. If two households grew too large for one area, conflict was almost guaranteed. Wells, grazing routes, and servants all became part of survival.",
    covenant:
      "Abram can afford to let Lot choose first because the land promise does not depend on Abram manipulating outcomes. God already promised. Faith frees Abram from clutching what God said He would give.",
    callbacks: [
      "🪨 Abram returns to the altar from Genesis 12.",
      "👀 Lot lifting his eyes echoes the Bible's repeated warning about choosing by sight.",
      "🌱 The Jordan plain looking like Eden reminds us that beauty alone does not prove safety.",
    ],
    emotional:
      "You can feel the tension between Abram and Lot's households. This is family. This is not a stranger dispute. Abram has to choose whether he will protect relationship or fight for advantage.",
    application:
      "Faith does not always have to grab first. Sometimes trust looks like open hands. When you believe God is your provider, you do not have to turn every conflict into a fight for control.",
    bridge:
      "Lot chooses the land that looks best and moves near Sodom. Genesis 14 will show how costly that direction becomes when regional war reaches his doorstep.",
  },
  14: {
    previous:
      "Lot has separated from Abram and moved near Sodom. What looked like a wise choice by sight now places him close to danger.",
    whyMatters:
      "Genesis 14 matters because it shows Abram as more than a wandering worshiper. He becomes a rescuer, a military leader, and a man tested by wealth after victory.",
    watchFor: [
      "⚔️ ancient kings and alliances pulling Canaan into war",
      "🛡️ Abram risking himself to rescue Lot",
      "👑 Melchizedek appearing as priest-king",
      "💰 Abram refusing the king of Sodom's reward",
    ],
    history:
      "Ancient city-kings often formed alliances and demanded tribute from weaker cities. Rebellion could bring military campaigns. Genesis 14 gives us a glimpse of the political world around Abram: kings, raids, captives, trade routes, and city-states fighting for control.",
    covenant:
      "Abram's victory shows God's protection, but the deeper test comes afterward. Will Abram let the king of Sodom enrich him, or will he trust God alone as the source of his blessing?",
    callbacks: [
      "🏙️ Sodom was already spiritually dangerous in Genesis 13.",
      "🧍 Abram's rescue of Lot shows covenant blessing spilling outward.",
      "👑 Melchizedek later becomes a major biblical figure in Psalm 110 and Hebrews.",
    ],
    emotional:
      "Abram could have said Lot made his choice. He could have stayed out of it. Instead, when Lot is taken, Abram moves. That tells us something about love, loyalty, and responsibility even when family has made foolish decisions.",
    application:
      "Sometimes faithfulness means helping someone who chose poorly without pretending their choices were wise. Abram rescues Lot, but he does not move into Sodom with him.",
    bridge:
      "After the battle, Abram still has no child. Genesis 15 moves from public victory into private ache, where Abram finally voices the question underneath everything: what about the heir?",
  },
  15: {
    previous:
      "Abram has won a battle, rescued Lot, refused Sodom's reward, and received blessing from Melchizedek. Outwardly, he looks strong. Inwardly, one question still hurts: he has no son.",
    whyMatters:
      "Genesis 15 is one of the most important covenant chapters in the Bible. God addresses Abram's fear, promises a son, counts faith as righteousness, reveals Israel's future suffering, and binds Himself to the covenant.",
    watchFor: [
      "🛡️ God calling Himself Abram's shield",
      "🥀 Abram honestly naming his childlessness",
      "⭐ the stars becoming a promise picture",
      "⚖️ faith being counted as righteousness",
      "🔥 God passing through the covenant pieces alone",
    ],
    history:
      "Ancient covenants were serious agreements, often sealed with ritual actions. Cutting animals and passing between the pieces symbolized the weight of the oath. It was like saying, 'May this happen to me if I break this covenant.' Genesis 15 is shocking because God alone passes through.",
    covenant:
      "This chapter clarifies that the promise rests on God's faithfulness. Abram believes, and God counts it as righteousness. Paul later builds major teaching in Romans and Galatians from this moment: Abraham is made right with God by faith before circumcision and before the law.",
    callbacks: [
      "⭐ Creation imagery returns as Abram looks at the stars.",
      "🌍 The land promise from Genesis 12 becomes more specific.",
      "⛓️ The prophecy points forward to Israel's slavery and Exodus.",
      "⚖️ Romans 4 and Galatians 3 look back to this chapter to explain faith.",
    ],
    emotional:
      "This chapter is tender because Abram is not pretending. He basically says, 'Lord, what can You give me while I remain childless?' That is not rebellion. That is honest faith bringing pain into God's presence.",
    application:
      "Real faith can ask honest questions. Abram's faith is not shallow positivity. He believes God, but he also names the ache. Genesis 15 shows that God can handle honest prayers from people who are still trusting Him.",
    bridge:
      "Genesis 15 gives Abram a covenant promise. Genesis 16 shows what happens when waiting stretches long enough that people start trying to force the promise with their own plan.",
  },
  16: {
    previous:
      "God has promised Abram a son from his own body, but time keeps passing. Sarai is still barren. The promise is clear, but the waiting is painful.",
    whyMatters:
      "Genesis 16 matters because it shows what waiting can do to people. Sarai, Abram, and Hagar are pulled into a painful human solution that creates consequences no one can control.",
    watchFor: [
      "🥀 Sarai's barrenness and shame",
      "🤲 Hagar being used as a solution",
      "😡 tension rising between Sarai and Hagar",
      "🏜️ Hagar meeting God in the wilderness",
      "👁️ El Roi, the God who sees",
    ],
    history:
      "In the ancient world, barrenness carried deep shame because family survival, inheritance, and social honor were tied to children. A servant could be given to bear a child on behalf of a barren wife. That may have been culturally accepted, but Genesis lets us feel how painful and messy it becomes.",
    covenant:
      "God's promise is not canceled by human failure, but Genesis 16 shows the cost of trying to produce covenant outcomes through pressure, control, and pain. Ishmael is loved and seen by God, but he is not the covenant child God promised through Sarai.",
    callbacks: [
      "🌱 Like Eden, someone takes matters into human hands instead of waiting on God's word.",
      "🏜️ The wilderness becomes a place where God meets the rejected.",
      "👁️ Hagar becomes the first person in Scripture to name God.",
    ],
    emotional:
      "This chapter hurts. Sarai is hurting. Hagar is used and then mistreated. Abram is passive when he should lead with righteousness. Hagar runs into the wilderness pregnant and alone. The Bible refuses to make the covenant family look cleaner than it is.",
    application:
      "Waiting can expose the places where trust is thin. Genesis 16 warns us that pain does not give us permission to use people, rush God, or call control wisdom.",
    bridge:
      "Genesis 16 ends with Ishmael's birth. Genesis 17 jumps forward years later, and God returns to Abram with covenant clarity, a new name, and a sign marked into the body.",
  },
  17: {
    previous:
      "Years have passed since Ishmael was born. Abram is ninety-nine. The promise has not vanished, but the wait has grown almost impossible to imagine.",
    whyMatters:
      "Genesis 17 matters because God gives covenant identity. Abram becomes Abraham. Sarai becomes Sarah. Circumcision becomes the sign. Isaac is named before he exists.",
    watchFor: [
      "💪 God revealing Himself as El Shaddai",
      "🧎 Abraham being called to walk before God",
      "📛 new names carrying future promise",
      "✂️ circumcision as covenant sign",
      "😂 Abraham laughing at an impossible birth",
    ],
    history:
      "Names carried identity and destiny in the ancient world. A name change was not cosmetic. It marked a new reality. Circumcision also functioned as a physical covenant marker, placed on the male reproductive organ because the promise involved seed, generations, and family line.",
    covenant:
      "The covenant becomes embodied. Abraham's household cannot treat the promise as abstract. Every male bears the sign. The promise is now connected to identity, body, household, and future generations.",
    callbacks: [
      "🧬 The seed promise from Genesis 12 and 15 becomes sharper.",
      "😂 Isaac's name, meaning laughter, connects Abraham's laughter and Sarah's laughter.",
      "📖 Romans 4 later reminds us Abraham was counted righteous before circumcision.",
    ],
    emotional:
      "Abraham laughs because the promise sounds impossible. He is not a cartoon hero. He is an old man trying to believe God while his body and Sarah's body tell a different story.",
    application:
      "God often names people by promise before the evidence is visible. Abraham is called father of many while still waiting for Isaac. Faith means learning to live under the name God speaks, not just the facts we can currently see.",
    bridge:
      "Genesis 17 names Isaac. Genesis 18 brings the promise to Sarah's tent door and shows that covenant relationship includes hospitality, honesty, and intercession.",
  },
  18: {
    previous:
      "Abraham has received the covenant sign and the promise that Sarah will bear Isaac. Now the story moves from covenant ceremony to a personal visit.",
    whyMatters:
      "Genesis 18 matters because God draws near. Abraham receives visitors, Sarah hears the promise, and Abraham is invited into God's concern for justice and mercy over Sodom.",
    watchFor: [
      "🏕️ Abraham's urgent hospitality",
      "😂 Sarah laughing behind the tent door",
      "❓ the question, 'Is anything too hard for the Lord?'",
      "⚖️ God revealing concern for justice",
      "🙏 Abraham interceding for Sodom",
    ],
    history:
      "Hospitality in the ancient Near East was not small politeness. It was survival, honor, and covenant-like welcome. Travelers needed water, shade, food, and protection. Abraham's running, bowing, and meal preparation show urgency and honor.",
    covenant:
      "Sarah is brought directly into the promise. The covenant will not move forward through Hagar, a servant, or a workaround. It will come through Sarah, the woman whose barrenness has carried years of pain.",
    callbacks: [
      "🏕️ The tent setting reminds us Abraham is still a sojourner.",
      "😂 Abraham laughed in Genesis 17; now Sarah laughs in Genesis 18.",
      "⚖️ Sodom's wickedness connects back to Lot's dangerous choice in Genesis 13.",
    ],
    emotional:
      "Sarah's laugh is not just unbelief. It is the laugh of someone who has waited so long that hope feels dangerous. When God asks why she laughed, the moment exposes the wound under the doubt.",
    application:
      "Some promises feel harder to believe after years of disappointment. Genesis 18 does not shame Sarah's pain, but it does confront the assumption that time has made God's word impossible.",
    bridge:
      "Abraham pleads for Sodom in Genesis 18. Genesis 19 shows what happens when judgment arrives and Lot must be dragged away from the city he chose.",
  },
  19: {
    previous:
      "Abraham has just interceded for Sodom, asking whether the Judge of all the earth will do what is just. Now the angels enter the city, and the truth about Sodom becomes impossible to ignore.",
    whyMatters:
      "Genesis 19 is dark, but it matters. It shows judgment, mercy, compromise, rescue, and the devastating cost of building life in a place that corrupts the soul.",
    watchFor: [
      "🏙️ Lot sitting in the city gate",
      "🚪 Sodom's violence exposed at the door",
      "🫱 angels dragging Lot out by mercy",
      "🧂 Lot's wife looking back",
      "🥀 the broken aftermath in the cave",
    ],
    history:
      "The city gate was not just an entrance. It was a place of public leadership, legal decisions, and social influence. Lot sitting in the gate means he has become embedded in Sodom's civic life. He is not merely near the city anymore.",
    covenant:
      "Genesis 19 is not only about Sodom. It also shows God remembering Abraham and rescuing Lot. Abraham's intercession mattered, even though the city was not spared.",
    callbacks: [
      "👀 Lot chose the Jordan plain by sight in Genesis 13.",
      "🙏 Abraham pleaded for mercy in Genesis 18.",
      "🔥 Judgment by destruction echoes earlier judgment scenes, but with rescue for the righteous.",
    ],
    emotional:
      "Lot's story feels tragic because he hesitates while destruction is coming. His sons-in-law think he is joking. His wife looks back. His daughters carry trauma into the cave. This is not a clean rescue story. It is mercy pulling people out of a life that has deeply damaged them.",
    application:
      "Compromise usually does not feel like compromise at first. It feels like opportunity, comfort, or practical advantage. Lot's story warns us that where we settle shapes what we become attached to.",
    bridge:
      "After Sodom's destruction, Abraham continues his journey. Genesis 20 is uncomfortable because it shows that even after great covenant moments, old fears can still return.",
  },
  20: {
    previous:
      "Sodom has fallen, Lot has been rescued, and Abraham has seen both mercy and judgment. Then Genesis 20 shocks us by showing Abraham repeating an old failure.",
    whyMatters:
      "Genesis 20 matters because it refuses to flatten Abraham into a perfect hero. He lies about Sarah again, and God protects the promise again.",
    watchFor: [
      "😨 Abraham calling Sarah his sister again",
      "👑 Abimelech acting with more integrity than expected",
      "🛡️ God protecting Sarah",
      "🪞 Abraham explaining the fear underneath the lie",
    ],
    history:
      "Kings could take women into their households to form alliances or expand status. Abraham's fear was not random, but his solution placed Sarah at risk. Ancient power dynamics made vulnerable women especially exposed in foreign courts.",
    covenant:
      "Isaac has been promised through Sarah. That makes this moment dangerous. If Sarah is taken into another king's household, the covenant line appears threatened. God intervenes to guard what Abraham endangered.",
    callbacks: [
      "🇪🇬 This repeats the Egypt failure from Genesis 12.",
      "🧬 Sarah's role in the promise was clarified in Genesis 17 and 18.",
      "🛡️ God remains the shield He claimed to be in Genesis 15.",
    ],
    emotional:
      "This is frustrating because Abraham should know better. But it is also honest. People can grow in faith and still have old fears that resurface under pressure.",
    application:
      "Growth is not always a straight line. Genesis 20 asks us to stop pretending old fears disappear automatically. Some fears need to be brought before God again and again until trust reaches deeper than self-protection.",
    bridge:
      "Genesis 20 shows God protecting Sarah. Genesis 21 finally brings the promised child. After years of waiting, laughter becomes a baby in Sarah's arms.",
  },
  21: {
    previous:
      "God has promised, delayed, repeated, named Isaac ahead of time, and protected Sarah from danger. Now the impossible finally happens.",
    whyMatters:
      "Genesis 21 matters because promise becomes visible. Isaac is born. Laughter changes meaning. But the chapter also shows painful household tension with Hagar and Ishmael.",
    watchFor: [
      "👶 Isaac being born exactly as God said",
      "😂 laughter turning from disbelief to joy",
      "🥀 Hagar and Ishmael being sent away",
      "🏜️ God hearing the boy in the wilderness",
      "🌳 Abraham calling on the Everlasting God",
    ],
    history:
      "A weaning feast marked survival and celebration. In the ancient world, infant mortality was high, so weaning was a major family milestone. But inheritance tension also surfaced strongly around sons, especially when the promised heir and the older son were in the same household.",
    covenant:
      "Isaac is the covenant son, but Ishmael is not forgotten by God. This distinction matters. Election does not mean God is careless with everyone else. God keeps His covenant line through Isaac and keeps His promise of care toward Ishmael.",
    callbacks: [
      "😂 Isaac's name ties back to Abraham and Sarah's laughter.",
      "🏜️ Hagar met God in the wilderness in Genesis 16; God meets her again here.",
      "🌳 Calling on the Everlasting God echoes Abraham's altar-building worship.",
    ],
    emotional:
      "This chapter holds joy and grief together. Sarah finally holds Isaac, but Hagar is weeping in the wilderness. Abraham is distressed over Ishmael. The promise arriving does not mean every relationship suddenly becomes painless.",
    application:
      "God's faithfulness can be joyful and complicated at the same time. Genesis 21 teaches us not to oversimplify fulfilled promises. God can bring joy while still tending to wounds, consequences, and people on the margins.",
    bridge:
      "Isaac is born in Genesis 21. Then Genesis 22 asks the hardest question: can Abraham trust God with the very son God gave?",
  },
  22: {
    previous:
      "Isaac has finally been born. The promise has a face, a voice, a laugh, and a place in Abraham's tent. Then Genesis 22 opens with the words that change the emotional temperature of the whole story: God tested Abraham.",
    whyMatters:
      "Genesis 22 is the deepest obedience chapter in Abraham's life. God asks Abraham to surrender Isaac, the son of promise, and the chapter becomes one of the strongest pictures of faith, testing, provision, and foreshadowing in the Bible.",
    watchFor: [
      "🧪 God testing Abraham",
      "👦 Isaac being called Abraham's only son, the son he loves",
      "🪵 Isaac carrying the wood",
      "🐏 the ram caught in the thicket",
      "⛰️ the Lord providing on the mountain",
    ],
    history:
      "Burnt offerings involved total surrender. The whole offering was placed on the altar and consumed. Moriah becomes deeply significant because later biblical tradition connects this region with the temple mount in Jerusalem, the place of sacrifice, worship, and God's presence among His people.",
    covenant:
      "This test does not mean God forgot His promise. It exposes whether Abraham trusts the Giver more than the gift. Hebrews 11 later says Abraham reasoned that God could raise Isaac from the dead because the promise was tied to him.",
    callbacks: [
      "👦 'Your son, your only son, whom you love' points forward to language Christians cannot help but hear near the cross.",
      "🪵 Isaac carrying wood points forward to sacrifice imagery.",
      "🐏 God providing the substitute becomes a major biblical pattern.",
      "✝️ The beloved son and provided sacrifice foreshadow the gospel without flattening the Genesis story.",
    ],
    emotional:
      "Do not rush this chapter. Imagine the silence of the journey. Imagine Isaac asking, 'Where is the lamb?' Imagine Abraham answering, 'God will provide.' This is obedience with a shaking heart, not mechanical religion.",
    application:
      "The test of faith is not whether Abraham loves Isaac. He does. The test is whether he loves God more. Sometimes obedience means placing even the promised gift back into God's hands.",
    bridge:
      "Genesis 22 reaches the mountain of surrender. Genesis 23 brings Abraham back into grief as Sarah dies and the man of promise must buy a burial place in the land he still does not fully possess.",
  },
  23: {
    previous:
      "After the mountain of testing, the story slows down into grief. Sarah, the woman who carried years of barrenness, laughter, waiting, and finally Isaac, dies.",
    whyMatters:
      "Genesis 23 matters because faith does not skip mourning. Abraham believes the land promise, but the first land he legally owns in Canaan is a grave.",
    watchFor: [
      "💔 Abraham mourning Sarah",
      "🕊️ grief inside the promised land",
      "⚖️ public negotiation at the city gate",
      "🪨 the cave of Machpelah becoming family burial ground",
    ],
    history:
      "Burial places mattered deeply in the ancient world. A family tomb anchored generations. Negotiations at the gate were public, witnessed, and legally serious. Abraham insists on paying full price because he wants unquestioned ownership.",
    covenant:
      "The land promise is still mostly future. Abraham owns one field and cave, not the whole land. But that burial place becomes a physical witness that his family belongs in Canaan and that God's promise is still believed even in death.",
    callbacks: [
      "🏕️ Abraham has lived as a sojourner since Genesis 12.",
      "🥀 Sarah's barrenness was named in Genesis 11; her legacy now includes Isaac.",
      "🪦 Machpelah will later hold Abraham, Isaac, Rebekah, Jacob, and Leah.",
    ],
    emotional:
      "The Bible gives Abraham space to mourn and weep. That matters. Faith is not numb. Abraham can trust God's promise and still cry over Sarah.",
    application:
      "Grief and faith can sit in the same room. Genesis 23 teaches us that believing God does not mean pretending loss does not hurt.",
    bridge:
      "Sarah is buried, but Isaac still needs a wife. Genesis 24 turns toward the next generation and shows Abraham protecting the promise beyond his own lifetime.",
  },
  24: {
    previous:
      "Sarah has died, and Abraham is old. Isaac is the covenant son, but the next generation of the promise requires a wife who belongs to the covenant family line.",
    whyMatters:
      "Genesis 24 matters because Abraham's obedience becomes generational. He is not only thinking about his own call anymore. He is guarding Isaac's future.",
    watchFor: [
      "🤝 Abraham entrusting his servant with a sacred mission",
      "🚫 Isaac not being taken back to the old land",
      "🙏 prayer for guidance at the well",
      "💧 Rebekah's generous character",
      "💍 Rebekah willingly stepping into the promise",
    ],
    history:
      "Marriage was covenantally and socially weighty. Families arranged marriages because inheritance, worship, land, and future generations were all involved. Wells were natural meeting places because travelers, households, and shepherds gathered there.",
    covenant:
      "Abraham refuses to let Isaac leave the promised land because the land promise matters. The servant can go find a bride, but Isaac must not reverse the journey. The next generation cannot go backward into the old life.",
    callbacks: [
      "🛣️ Abraham left his family land in Genesis 12; Rebekah will now leave hers.",
      "💧 The well scene anticipates later Genesis meetings at wells.",
      "🧬 The promise moves from Abraham and Sarah toward Isaac and Rebekah.",
    ],
    emotional:
      "There is tenderness here. Abraham is old. Sarah is gone. Isaac needs comfort. Rebekah is asked to leave everything familiar, just as Abraham once did. The promise keeps moving through costly yeses.",
    application:
      "Faith thinks beyond one season. Genesis 24 teaches us to make decisions that protect what God is building in the next generation, not just what feels convenient right now.",
    bridge:
      "Isaac receives Rebekah, and the family line continues. Genesis 25 will close Abraham's life and open the tension of the next generation through Jacob and Esau.",
  },
  25: {
    previous:
      "Abraham has followed, waited, failed, worshiped, interceded, surrendered, mourned, and prepared Isaac's future. Now his earthly story comes to a close.",
    whyMatters:
      "Genesis 25 matters because it shows that Abraham's life ends, but God's promise does not. The covenant moves forward through Isaac, and the next generation begins with its own tension.",
    watchFor: [
      "🧬 Abraham's later descendants",
      "📜 Isaac receiving the covenant inheritance",
      "🪦 Isaac and Ishmael burying Abraham",
      "🤰 Rebekah's barrenness and prayer",
      "👶 Jacob and Esau struggling before birth",
    ],
    history:
      "Inheritance customs mattered because they determined family leadership, land, goods, and future identity. Genesis distinguishes gifts given to other sons from the covenant inheritance centered on Isaac.",
    covenant:
      "The covenant line continues through Isaac, not because Isaac is stronger, but because God chose to carry the promise there. Abraham's death proves the promise is larger than the person who first received it.",
    callbacks: [
      "🧬 Ishmael's line fulfills God's earlier promise to Hagar and Abraham.",
      "🥀 Rebekah's barrenness echoes Sarah's, showing dependence continues.",
      "👶 Jacob and Esau's struggle points forward to the next major Genesis story.",
    ],
    emotional:
      "The burial scene is quiet but powerful. Isaac and Ishmael, sons from a complicated family story, stand together at Machpelah. Abraham's life was not simple, but it was full.",
    application:
      "A faithful life is not a flawless life. Abraham is remembered because he kept responding to God. Genesis 25 invites us to think about legacy: what continues after us because we trusted God?",
    bridge:
      "Abraham leaves the stage, but the God of Abraham remains. The story now moves to Isaac, Rebekah, Jacob, and Esau, because covenant faithfulness keeps walking into the next generation.",
  },
};

const ABRAHAM_CHAPTER_NOTES: AbrahamChapterNote[] = [
  {
    chapter: 11,
    title: "🧳 Genesis 11 — The Road Before The Call",
    intro:
      "Genesis 11 sets the ground under Abraham's story. Before Abram hears God say, \"Go,\" the chapter shows a world trying to build its own security at Babel and then narrows into one family line moving toward Canaan but stopping in Haran. That matters because Abraham's obedience does not appear out of nowhere. It rises out of a real family, a real world, and an unfinished road.",
    flow: ["Babel shows pride trying to make a name without God.", "Shem's line narrows the story toward Abram.", "Terah's family begins moving toward Canaan but settles short of the destination."],
    sections: [
      {
        reference: "Genesis 11:1-9",
        title: "🏙️ A world trying to build without God",
        points: [
          "Babel is not just a building project. It is a picture of humanity trying to create safety, fame, and unity without surrender. They say, \"let us make us a name,\" and that line sits in sharp contrast to Genesis 12, where God says He will make Abram's name great.",
          "That contrast is important. Human pride tries to climb upward and secure itself. Faith receives identity from God. Babel reaches for heaven on its own terms, but Abraham will be called to walk with God on God's terms.",
          "The scattering at Babel is judgment, but it also keeps human pride from hardening into one massive rebellion. God interrupts a false unity so that His redemptive plan can move forward through promise instead of human self-glory.",
        ],
      },
      {
        reference: "Genesis 11:10-26",
        title: "🧬 The story narrows toward one family",
        points: [
          "The genealogy can feel slow, but it is doing something important. Scripture is tracing the line forward until Abram comes into view. The Bible is teaching us that God works through generations, names, families, and time.",
          "This reminds us that Abraham's story is connected to a bigger story. God is not making a random choice. He is carrying forward His plan through ordinary human history.",
          "Genealogies can feel like lists, but they are also witnesses. They say, \"God has not lost the thread.\" Even when history looks scattered, God knows exactly where the promise is moving.",
        ],
      },
      {
        reference: "Genesis 11:27-32",
        title: "🛣️ An unfinished journey",
        points: [
          "Terah's household leaves Ur and heads toward Canaan, but they settle in Haran. The destination is named before the calling is fully spoken. That gives Genesis 12 a sense of holy continuation. God will call Abram to finish a road already begun.",
          "Sarai's barrenness is also named here. That detail is not random. The very promise God will give Abram will press against the deepest impossibility in his household.",
          "Genesis 11 ends in an in-between place. That is often where calling begins. God steps into unfinished stories, old grief, family movement, delayed hopes, and places where people have stopped short.",
        ],
      },
    ],
    lesson:
      "Genesis 11 teaches that God's call often begins before we recognize it. Abraham's story starts with pride being scattered, a family line being preserved, and an unfinished road waiting for God's voice.",
  },
  {
    chapter: 12,
    title: "📣 Genesis 12 — The Call To Leave",
    intro:
      "Genesis 12 is the great turning point. God speaks to Abram and calls him away from the familiar into a future that depends entirely on God's promise. But the same chapter also shows Abram's fear in Egypt, so the Bible introduces him honestly: obedient, chosen, and still deeply in need of growth.",
    flow: ["God calls Abram to leave and promises blessing.", "Abram enters the land and builds altars.", "Famine exposes fear and self-protection."],
    sections: [
      {
        reference: "Genesis 12:1-9",
        title: "🛣️ Obedience before the full map",
        points: [
          "God tells Abram to leave country, kindred, and father's house. That is not a small request. God is asking Abram to loosen his grip on identity, security, inheritance, and the world he understands.",
          "The promise is bigger than Abram's personal comfort. God promises land, nation, blessing, a great name, and blessing for all families of the earth. Abram's obedience becomes part of God's mercy reaching outward.",
          "Abram goes. That simple obedience is powerful. He does not have every detail, but he has God's word. Faith begins when God's voice becomes weightier than our demand for complete control.",
        ],
      },
      {
        reference: "Genesis 12:10-16",
        title: "🌾 Famine after obedience",
        points: [
          "The famine matters because it comes after Abram obeys. Sometimes people assume obedience should immediately make life easier, but Abram's first chapter of faith includes pressure.",
          "In Egypt, fear bends Abram's judgment. He tells Sarai to say she is his sister, protecting himself while placing her at risk. The Bible does not hide this. Abram is a man of faith, but fear still knows how to speak loudly in him.",
          "This is a serious reminder that obedience in one area does not mean every part of the heart is mature. God may call a person forward while still needing to heal the fears they carry with them.",
        ],
      },
      {
        reference: "Genesis 12:17-20",
        title: "🛡️ God protects the promise",
        points: [
          "God intervenes to protect Sarai and the promise. Abram's failure could have caused deep damage, but God's faithfulness is stronger than Abram's poor decision.",
          "This does not excuse Abram. It magnifies God's mercy. The future of the promise rests on God, not on Abram's perfect performance.",
          "Genesis 12 gives us a realistic beginning. Faith has begun, but formation has only started. Abram will keep learning what it means to trust God with more than the journey. He must learn to trust God with fear.",
        ],
      },
    ],
    lesson:
      "Genesis 12 teaches that obedience starts with God's word, not a complete map. Abram follows, stumbles, and is preserved by grace, showing that the life of faith is both real obedience and real formation.",
  },
  {
    chapter: 13,
    title: "🤝 Genesis 13 — Faith That Does Not Have To Grab",
    intro:
      "Genesis 13 brings Abram back from Egypt and places him in a quieter but very real test. Blessing has grown, space is limited, and conflict is rising. This chapter shows whether Abram believes God's promise enough to choose peace instead of grasping.",
    flow: ["Abram returns to the place of worship.", "Conflict rises between Abram and Lot's households.", "Lot chooses by sight while Abram receives the renewed promise."],
    sections: [
      {
        reference: "Genesis 13:1-7",
        title: "🪨 Returning to the altar",
        points: [
          "Abram comes back to the place where he had built an altar. That detail matters after Egypt. The story quietly brings him back to worship, back to the place of calling, back to dependence on God.",
          "But blessing creates pressure. Abram and Lot both have possessions, herds, and households. The land cannot carry them together easily. Sometimes the test is not lack. Sometimes the test is what blessing does to relationships.",
          "Strife between the herdsmen shows that outward prosperity does not automatically create inward peace. Wisdom is needed to steward blessing without letting it turn into division.",
        ],
      },
      {
        reference: "Genesis 13:8-13",
        title: "👀 Lot chooses by sight",
        points: [
          "Abram gives Lot the first choice. This is beautiful because Abram is the elder and the one who received the promise, yet he refuses to force his advantage.",
          "Lot lifts his eyes and sees the well-watered plain. The land looks like Eden and Egypt. That comparison is not accidental. Lot is drawn by what looks immediately profitable, but the text warns us that Sodom is spiritually dangerous.",
          "This is how many bad paths begin. They look practical, beautiful, and obvious. But wisdom asks a deeper question: where is this direction taking my soul?",
        ],
      },
      {
        reference: "Genesis 13:14-18",
        title: "📜 Promise after surrender",
        points: [
          "After Lot separates, God tells Abram to lift his eyes. Lot lifted his eyes to choose for himself. Abram lifts his eyes because God is showing him promise.",
          "God expands the promise in every direction. Abram gave up the right to grab, but he did not lose the future. Faith can be generous because it trusts God to provide what selfishness cannot secure.",
          "Abram responds by moving and building another altar. The chapter ends with worship because surrender has not made him poorer. It has made his dependence clearer.",
        ],
      },
    ],
    lesson:
      "Genesis 13 teaches that faith does not have to grab. Abram can choose peace because he trusts that God's promise is safer than selfish control.",
  },
  {
    chapter: 14,
    title: "⚔️ Genesis 14 — Courage Under God Most High",
    intro:
      "Genesis 14 feels different from the chapters around it. Kings go to war, Lot is captured, and Abram acts with courage. But the chapter is not only about battle. It is about rescue, worship, and refusing to let anyone but God define Abram's blessing.",
    flow: ["War reaches Lot's life near Sodom.", "Abram rescues Lot with courage.", "Melchizedek blesses Abram, and Abram refuses Sodom's reward."],
    sections: [
      {
        reference: "Genesis 14:1-12",
        title: "🌃 Lot's direction creates danger",
        points: [
          "Lot had moved toward Sodom in Genesis 13. Now the consequences of that direction begin to show. He is swept into a conflict larger than himself.",
          "This is one of Proverbs' themes before Proverbs is ever written: paths matter. Where Lot chose to settle shaped the dangers that reached his household.",
          "The chapter reminds us that decisions are rarely isolated. A place, a friendship, a pattern, or a compromise can quietly position a person near trouble before the crisis appears.",
        ],
      },
      {
        reference: "Genesis 14:13-16",
        title: "🛡️ Abram acts to rescue",
        points: [
          "Abram does not shrug and say Lot made his choice. He gathers trained men and moves to rescue him. Faith is not passive when love requires action.",
          "This shows a strong side of Abram. He is not merely a pilgrim building altars. He is also responsible, brave, and willing to risk himself for family.",
          "Obedience can look like leaving, waiting, surrendering, or fighting for what is right. The faithful life is responsive to God in the moment in front of it.",
        ],
      },
      {
        reference: "Genesis 14:17-24",
        title: "🙌 Victory stays under worship",
        points: [
          "Melchizedek appears as priest of God Most High and blesses Abram. Abram gives him a tenth, recognizing that victory belongs under God's authority.",
          "Then Abram refuses the king of Sodom's offer. He does not want Sodom to say, \"I made Abram rich.\" That refusal protects the clarity of his testimony.",
          "This is wisdom after success. Victory can become dangerous if it feeds pride or compromise. Abram receives blessing from God Most High and refuses gain that would tie his future to Sodom.",
        ],
      },
    ],
    lesson:
      "Genesis 14 teaches that courage must stay under worship. Abram rescues boldly, worships humbly, and refuses compromise after victory.",
  },
  {
    chapter: 15,
    title: "🌌 Genesis 15 — Believing God In The Waiting",
    intro:
      "Genesis 15 brings us inside Abram's heart. He has obeyed, fought, worshiped, and refused compromise, but he still has no son. This chapter shows faith not as fake confidence, but as honest trust placed in God's word.",
    flow: ["God comforts Abram's fear.", "Abram names the ache of delay.", "God gives stars, righteousness, covenant, and future hope."],
    sections: [
      {
        reference: "Genesis 15:1-6",
        title: "🛡️ Do not fear",
        points: [
          "God begins with comfort: \"Fear not.\" That tells us Abram's courage in chapter 14 did not erase every fear inside him. Brave people can still need reassurance.",
          "Abram answers honestly. He has no child. The promise of descendants is beautiful, but his house still feels empty. Biblical faith has room to bring that ache before God.",
          "God brings him outside and points to the stars. Abram believes the Lord, and it is counted to him as righteousness. He is not righteous because he has seen the fulfillment. He is counted righteous because he trusts the God who speaks.",
        ],
      },
      {
        reference: "Genesis 15:7-16",
        title: "📜 Promise with a long timeline",
        points: [
          "God promises land, but He also reveals that Abram's descendants will suffer in a foreign land before deliverance. This is a wide view of history.",
          "That means God's promise does not avoid all pain. The promise is not shallow. It moves through time, suffering, judgment, deliverance, and return.",
          "Abram is learning that faith may outlive his own ability to see everything completed. Some promises are bigger than one lifetime, but they are not bigger than God's faithfulness.",
        ],
      },
      {
        reference: "Genesis 15:17-21",
        title: "🔥 God binds Himself to the promise",
        points: [
          "The covenant ceremony is powerful because God passes through as smoking fire and flame. Abram is not the one walking through to prove he can hold everything together.",
          "God takes the weight of the promise upon Himself. The future rests on divine commitment, not human strength.",
          "This is why Genesis 15 is so central. Faith is not confidence in our own ability to make God's promise happen. Faith trusts the God who binds Himself to His word.",
        ],
      },
    ],
    lesson:
      "Genesis 15 teaches that faith believes God in the waiting. Abram still has questions, but God's promise becomes the ground beneath him.",
  },
  {
    chapter: 16,
    title: "⚠️ Genesis 16 — When Waiting Turns Into Control",
    intro:
      "Genesis 16 is one of the most painful chapters in Abraham's story because delay becomes pressure and pressure becomes human control. The chapter is honest about how impatience can harm real people.",
    flow: ["Sarai and Abram try to force the promise.", "Hagar suffers inside the household conflict.", "God sees Hagar in the wilderness."],
    sections: [
      {
        reference: "Genesis 16:1-6",
        title: "⏳ A shortcut that wounds",
        points: [
          "Sarai's pain is real. She is barren, the promise is delayed, and the years are heavy. But pain does not make every plan wise.",
          "Abram listens and takes Hagar. The result is not peace but contempt, jealousy, blame, and harsh treatment. A human shortcut creates a household wound.",
          "This chapter warns us that trying to help God in ways God did not command can produce consequences that last far longer than the moment of impatience.",
        ],
      },
      {
        reference: "Genesis 16:7-12",
        title: "👁️ God sees the mistreated",
        points: [
          "Hagar runs into the wilderness, and the Angel of the Lord finds her. That word matters. People may overlook her, use her, or mistreat her, but God sees her.",
          "God speaks to Hagar personally about her child and her future. She is not a disposable side character to Him.",
          "The chapter refuses to let us talk about Abraham's faith without also seeing the pain caused by Abraham's failure. God cares about the people wounded by someone else's impatience.",
        ],
      },
      {
        reference: "Genesis 16:13-16",
        title: "🏜️ The God who sees",
        points: [
          "Hagar names God, \"You are the God who sees me.\" This is one of the most tender moments in Genesis.",
          "The promise to Abraham is still moving, but Genesis makes space to show God's mercy toward Hagar and Ishmael too.",
          "This chapter teaches a serious lesson: waiting is spiritually dangerous when the heart stops trusting. But even in the damage, God remains compassionate and attentive.",
        ],
      },
    ],
    lesson:
      "Genesis 16 teaches that forced promises create real wounds, but God sees the wounded. Waiting must be guarded with trust, not control.",
  },
  {
    chapter: 17,
    title: "🪪 Genesis 17 — New Names And Covenant Identity",
    intro:
      "Genesis 17 gives Abram and Sarai new names. God is not only promising a future; He is naming them according to that future while the evidence still looks impossible.",
    flow: ["God reveals Himself as Almighty.", "Abram becomes Abraham and Sarai becomes Sarah.", "Circumcision marks the covenant, and Isaac is promised."],
    sections: [
      {
        reference: "Genesis 17:1-8",
        title: "🙇 Walk before Me",
        points: [
          "God introduces Himself as God Almighty and calls Abram to walk before Him. Covenant is not just receiving promises. It is living before God with a whole life.",
          "Abram falls on his face. That posture fits the moment. God is speaking identity, nations, kings, land, and everlasting covenant over a man who still cannot produce the promised son.",
          "Abram becomes Abraham, father of many nations. The name is a daily sermon before the child arrives. Every time someone says his name, they are speaking God's promise over visible impossibility.",
        ],
      },
      {
        reference: "Genesis 17:9-14",
        title: "📜 A covenant marked in the body",
        points: [
          "Circumcision marks the covenant physically. This is not casual spirituality. God is placing covenant identity on Abraham's household in a visible and costly way.",
          "The sign does not create the promise, but it marks belonging to the promise. Abraham's family is being set apart.",
          "This teaches that faith is not merely an idea in the mind. Covenant touches identity, household, obedience, and the way life is carried forward.",
        ],
      },
      {
        reference: "Genesis 17:15-27",
        title: "😂 Promise that sounds impossible",
        points: [
          "Sarai becomes Sarah, and God says she will bear Isaac. Abraham laughs because the promise feels biologically impossible.",
          "God does not cancel the promise because Abraham struggles to grasp it. He names Isaac and fixes the time. The promise rests on God's power, not Abraham's imagination.",
          "Abraham obeys the covenant sign that same day. That matters. Even while he is still trying to understand the impossible promise, he responds to the command he has been given.",
        ],
      },
    ],
    lesson:
      "Genesis 17 teaches that God names His people according to promise before they can see the outcome. Covenant identity is received, marked, and obeyed.",
  },
  {
    chapter: 18,
    title: "🏕️ Genesis 18 — Near Enough To Hear And Pray",
    intro:
      "Genesis 18 shows Abraham in closeness with God. He welcomes visitors, hears the promise of Isaac again, and then stands before the Lord in bold intercession for Sodom.",
    flow: ["Abraham receives divine visitors.", "Sarah hears the impossible promise.", "Abraham intercedes for Sodom."],
    sections: [
      {
        reference: "Genesis 18:1-8",
        title: "🤲 Hospitality as holy attention",
        points: [
          "Abraham runs to welcome the visitors. The chapter moves with urgency, honor, food, water, and rest. This is not cold religion. It is a life ready to receive what God is doing.",
          "Hospitality in Scripture is often more than manners. It is openness, humility, and attention to the person in front of you.",
          "Abraham's tent becomes a place where promise is spoken again. Ordinary welcome becomes the setting for divine conversation.",
        ],
      },
      {
        reference: "Genesis 18:9-15",
        title: "❓ Is anything too hard for the Lord?",
        points: [
          "Sarah laughs inside the tent. Her laughter is quiet, but God hears it. Hidden reactions are not hidden from Him.",
          "The question, \"Is anything too hard for the Lord?\" is the heart of the chapter. It confronts the limits Sarah has placed around possibility.",
          "This does not shame Sarah as if waiting has been easy. It calls her to see that God's promise is not trapped inside human timelines or human biology.",
        ],
      },
      {
        reference: "Genesis 18:16-33",
        title: "🙏 Reverent boldness",
        points: [
          "God lets Abraham into the conversation about Sodom. That is astonishing. Abraham is being treated as a covenant friend, not merely a servant receiving orders.",
          "Abraham pleads with humility and courage. He cares about justice, mercy, and the righteous caught in a wicked place.",
          "This is prayer shaped by nearness. Abraham does not command God, but he does draw near and speak. Real friendship with God deepens reverence and boldness at the same time.",
        ],
      },
    ],
    lesson:
      "Genesis 18 teaches that obedience matures into closeness. Abraham's walk with God includes welcome, honest promise, and bold intercession.",
  },
  {
    chapter: 19,
    title: "🔥 Genesis 19 — Mercy Pulling People From Judgment",
    intro:
      "Genesis 19 is heavy. It shows Sodom's wickedness, Lot's compromised position, God's mercy, and the serious reality of judgment. It sits near Abraham's story as a warning about direction and holiness.",
    flow: ["The angels enter Sodom.", "Lot is rescued by mercy.", "The chapter ends with painful consequences."],
    sections: [
      {
        reference: "Genesis 19:1-11",
        title: "🌃 A city showing its heart",
        points: [
          "The wickedness of Sodom is not vague in this chapter. The city reveals a violent, predatory heart, and Lot's home becomes the pressure point.",
          "Lot is called righteous elsewhere in Scripture, but Genesis shows him deeply entangled in a dangerous place. Sitting in the gate suggests belonging and influence, yet he cannot heal the city.",
          "This warns us that proximity to corruption can reshape a household long before a person admits it. Lot is distressed, but also settled.",
        ],
      },
      {
        reference: "Genesis 19:12-22",
        title: "🤲 Mercy that drags the hesitant",
        points: [
          "Lot warns his family, but his sons-in-law think he is joking. That is tragic. A compromised witness can make urgent truth sound unbelievable.",
          "Lot lingers even as judgment approaches. The angels seize him and his family by the hand because the Lord is merciful.",
          "That detail is powerful. Sometimes mercy does not feel gentle in the moment. Sometimes mercy pulls us away from what we are still too attached to.",
        ],
      },
      {
        reference: "Genesis 19:23-38",
        title: "💔 Rescue does not erase damage",
        points: [
          "Sodom falls. Lot's wife looks back and becomes a warning. The chapter wants us to feel the seriousness of divided affection.",
          "The ending with Lot's daughters is disturbing and sad. It shows that leaving Sodom physically did not mean Sodom's damage had fully left the family.",
          "Genesis 19 is not written for easy reading. It teaches that compromise has consequences, judgment is real, and mercy should never be treated lightly.",
        ],
      },
    ],
    lesson:
      "Genesis 19 teaches that God's mercy is real and God's holiness is serious. The direction of a life matters before the crisis arrives.",
  },
  {
    chapter: 20,
    title: "🔁 Genesis 20 — The Fear That Came Back",
    intro:
      "Genesis 20 is sobering because Abraham repeats an old failure. After years of walking with God, receiving covenant, and interceding for Sodom, fear still bends his behavior.",
    flow: ["Abraham repeats the sister lie.", "God protects Sarah through a dream.", "Abraham is corrected and restored."],
    sections: [
      {
        reference: "Genesis 20:1-7",
        title: "😟 Old fear in a new place",
        points: [
          "Abraham says Sarah is his sister again. The pattern from Egypt returns, showing that old fears can survive many spiritual experiences if they are not deeply healed.",
          "Abimelech takes Sarah, but God intervenes in a dream. Once again, God protects the promise from Abraham's fear-driven failure.",
          "The seriousness is clear. Abraham's self-protection puts Sarah, Abimelech, and an entire household at risk. Private fear can create public damage.",
        ],
      },
      {
        reference: "Genesis 20:8-13",
        title: "🪞 A painful explanation",
        points: [
          "Abraham explains that he thought there was no fear of God in the place. The irony is sharp because Abimelech acts with more integrity in the moment than Abraham does.",
          "Abraham's explanation reveals a settled strategy of fear. This was not a one-time panic. It was a plan he and Sarah had carried from place to place.",
          "That is how hidden patterns often work. They travel with us until God brings them into the light.",
        ],
      },
      {
        reference: "Genesis 20:14-18",
        title: "🩹 Grace that corrects",
        points: [
          "Abimelech restores Sarah and gives gifts, and Abraham prays for his household. The chapter ends with healing, but it does not pretend the failure was small.",
          "God's grace protects the promise and corrects Abraham at the same time. Grace is not permission to stay careless. It is mercy that keeps forming the person God called.",
          "This chapter gives hope to people who see old fears resurface. The point is not to hide them. The point is to let God expose, heal, and mature them.",
        ],
      },
    ],
    lesson:
      "Genesis 20 teaches that old fear can return, but God's faithfulness can still correct and preserve. Abraham needs grace as much as he needs promise.",
  },
  {
    chapter: 21,
    title: "👶 Genesis 21 — Promise In The Arms",
    intro:
      "Genesis 21 finally places Isaac in Abraham and Sarah's arms. The promise becomes visible, laughter changes tone, and the story proves that delay was never denial.",
    flow: ["Isaac is born just as God said.", "Hagar and Ishmael are sent away but not abandoned by God.", "Abraham worships the everlasting God."],
    sections: [
      {
        reference: "Genesis 21:1-7",
        title: "😂 Laughter turned to joy",
        points: [
          "The repeated phrase is that God did as He had spoken. That is the foundation of the scene. Isaac's birth is not luck, biology, or human achievement. It is promise fulfilled.",
          "Sarah laughs again, but now the laughter is joy. The very place of disbelief becomes a place of praise.",
          "This moment carries decades of waiting. Genesis wants us to feel that God's word can look delayed for a long time and still arrive exactly alive.",
        ],
      },
      {
        reference: "Genesis 21:8-21",
        title: "💔 Fulfillment with complicated pain",
        points: [
          "The celebration around Isaac does not erase the pain connected to Hagar and Ishmael. Earlier compromise has consequences that now have to be faced.",
          "Hagar is sent away, and the scene in the wilderness is heartbreaking. Yet God hears the boy and opens Hagar's eyes to water.",
          "This teaches that God's covenant focus on Isaac does not mean God is careless with others. He sees Hagar again. He hears Ishmael. Mercy is still present in the painful edges of the promise story.",
        ],
      },
      {
        reference: "Genesis 21:22-34",
        title: "🌳 Calling on the everlasting God",
        points: [
          "Abraham makes peace with Abimelech and plants a tree at Beersheba. The chapter ends with stability, worship, and the name of the Everlasting God.",
          "That name matters after a chapter about long waiting. Abraham has learned that God's timeline is larger than his own impatience.",
          "Isaac is born, but the story is still moving. Abraham worships the God whose faithfulness stretches beyond one moment of fulfillment.",
        ],
      },
    ],
    lesson:
      "Genesis 21 teaches that God keeps His word in His time. The promise arrives with joy, and God's mercy is still present in the complicated aftermath.",
  },
  {
    chapter: 22,
    title: "⛰️ Genesis 22 — The Promise On The Altar",
    intro:
      "Genesis 22 is the deepest test in Abraham's life. Isaac is not only Abraham's beloved son; he is the visible future of the promise. God asks Abraham to surrender the gift back to the Giver.",
    flow: ["God tests Abraham.", "Abraham walks the long road of surrender.", "God provides the ram and renews the promise."],
    sections: [
      {
        reference: "Genesis 22:1-8",
        title: "🪵 The long walk",
        points: [
          "The chapter names Isaac with emotional weight: your son, your only son, whom you love. The test is not abstract. God names what Abraham treasures most.",
          "Abraham rises early. That does not mean the command was easy. It means his obedience is serious enough to move even when the emotional weight is crushing.",
          "Isaac asks, \"Where is the lamb?\" Abraham answers, \"God will provide.\" That sentence holds the chapter together. Abraham does not understand everything, but he trusts the Provider.",
        ],
      },
      {
        reference: "Genesis 22:9-14",
        title: "🐏 Provision at the point of surrender",
        points: [
          "The altar scene is tense because obedience has reached the edge. Abraham stretches out his hand, and then God stops him.",
          "The ram appears in the thicket. God provides the sacrifice. Isaac is spared, and Abraham names the place, \"The Lord will provide.\"",
          "This is not about God needing information. It is about Abraham's faith being revealed, tested, and deepened. The promise is safer in God's hands than in Abraham's control.",
        ],
      },
      {
        reference: "Genesis 22:15-24",
        title: "📜 Promise after surrender",
        points: [
          "After the test, God reaffirms the blessing. Abraham's surrender did not destroy the promise. It clarified that the promise belongs to God.",
          "This chapter also points forward. The beloved son, the wood, the mountain, and the substitute all prepare the reader to recognize deeper patterns of sacrifice and provision in Scripture.",
          "Genesis 22 teaches that the hardest obedience is often about whether we trust God with what we love most.",
        ],
      },
    ],
    lesson:
      "Genesis 22 teaches that true faith can place even the promise on the altar because it trusts the Provider more than the gift.",
  },
  {
    chapter: 23,
    title: "🪦 Genesis 23 — Grief Inside The Promise",
    intro:
      "Genesis 23 slows the story down. Sarah dies, Abraham mourns, and the first clear piece of land he owns in Canaan is a burial place. The chapter is quiet, but it is deeply important.",
    flow: ["Sarah dies and Abraham mourns.", "Abraham buys Machpelah honorably.", "Sarah is buried in the land of promise."],
    sections: [
      {
        reference: "Genesis 23:1-2",
        title: "😭 Faith still weeps",
        points: [
          "The Bible says Abraham came to mourn and weep for Sarah. It does not rush past his grief because he is a man of faith.",
          "That matters. Faith does not make a person less human. Abraham has walked with God for years, but death still hurts.",
          "Genesis gives dignity to sorrow. Promise and grief can exist in the same room.",
        ],
      },
      {
        reference: "Genesis 23:3-16",
        title: "⚖️ Honorable dealings",
        points: [
          "Abraham negotiates publicly and respectfully for the cave of Machpelah. He refuses to take the land as a vague favor and insists on paying the full price.",
          "This shows integrity. Abraham's faith affects how he handles business, grief, and public reputation.",
          "He is still a stranger in the land, but he acts with dignity because he trusts God's promise without becoming manipulative.",
        ],
      },
      {
        reference: "Genesis 23:17-20",
        title: "📍 A grave in the promised land",
        points: [
          "The first owned piece of the promised land is not a palace, field, or city. It is a tomb.",
          "That is emotionally powerful. Abraham owns a burial place before he sees the land filled with descendants.",
          "Faith sometimes plants hope in the soil of grief. Sarah's burial in Canaan says the family still belongs to the promise, even in death.",
        ],
      },
    ],
    lesson:
      "Genesis 23 teaches that faith does not deny grief. Abraham mourns honestly while anchoring his family in the promise God gave.",
  },
  {
    chapter: 24,
    title: "💧 Genesis 24 — Guidance For The Promise",
    intro:
      "Genesis 24 turns toward the next generation. Abraham is old, Isaac needs a wife, and the promise must continue without Isaac being pulled back to the old life.",
    flow: ["Abraham sends his servant with covenant priorities.", "The servant prays and watches for God's guidance.", "Rebekah responds, and Isaac's future is established."],
    sections: [
      {
        reference: "Genesis 24:1-9",
        title: "🧭 The next generation must not go backward",
        points: [
          "Abraham is clear that Isaac must not return to the land Abraham left. The promise is tied to God's direction, not nostalgia.",
          "This is mature faith. Abraham is thinking beyond his own lifetime and protecting Isaac's future direction.",
          "Obedience becomes legacy when a person cares about the spiritual path of those who come after them.",
        ],
      },
      {
        reference: "Genesis 24:10-27",
        title: "🙏 Prayer beside the well",
        points: [
          "The servant prays specifically and humbly. He is not trying to control God; he is asking for guidance that matches covenant kindness.",
          "Rebekah's response reveals character. She offers water not only to the servant but also to the camels, showing generosity, strength, and hospitality.",
          "The servant worships before the mission is even fully finished. Guidance should lead to worship, not self-congratulation.",
        ],
      },
      {
        reference: "Genesis 24:28-67",
        title: "💍 A willing step into the promise",
        points: [
          "The story is retold in the household because testimony matters. The servant explains how God led him.",
          "Rebekah is asked whether she will go, and she says yes. Her willingness echoes Abraham's earlier obedience in a new generation.",
          "Isaac receives Rebekah, and the promise story moves forward. Genesis 24 is long because guidance, character, family, and covenant all matter deeply.",
        ],
      },
    ],
    lesson:
      "Genesis 24 teaches that God's promise continues through prayerful guidance, wise priorities, and willing obedience in the next generation.",
  },
  {
    chapter: 25,
    title: "🌅 Genesis 25 — Full Of Years",
    intro:
      "Genesis 25 closes Abraham's earthly story. He dies old and full of years, but the promise does not die with him. The chapter moves from Abraham's final family lines into Isaac's generation.",
    flow: ["Abraham's later descendants are named.", "Abraham dies and is buried by Isaac and Ishmael.", "The story turns toward Jacob and Esau."],
    sections: [
      {
        reference: "Genesis 25:1-11",
        title: "🕊️ A life completed, not a promise completed",
        points: [
          "Abraham has more descendants through Keturah, but Isaac remains the covenant son. Genesis is careful to distinguish family expansion from covenant line.",
          "Abraham dies at a good old age, full of years. That phrase carries a sense of completion. His life was not perfect, but it was deeply lived before God.",
          "Isaac and Ishmael bury him together. That moment is quiet and moving. The family story has pain, but Abraham's death gathers both sons at the cave of Machpelah.",
        ],
      },
      {
        reference: "Genesis 25:12-18",
        title: "📜 God remembers Ishmael",
        points: [
          "Ishmael's line is recorded. This matters because God had promised Hagar and Abraham that Ishmael would become a great nation.",
          "The covenant line goes through Isaac, but Scripture still pauses to show that God kept His word concerning Ishmael.",
          "This teaches us to read God's faithfulness carefully. His chosen covenant purpose does not make Him forget other promises He has spoken.",
        ],
      },
      {
        reference: "Genesis 25:19-34",
        title: "🌱 The next generation begins with tension",
        points: [
          "Isaac and Rebekah face barrenness, and Isaac prays. The next generation immediately learns that promise still requires dependence.",
          "Jacob and Esau struggle even before birth. The story of promise continues, but it is not simple or tidy.",
          "Abraham's life closes, but Genesis keeps moving. Faithfulness is bigger than one person's lifespan. The God who called Abraham is still guiding the story.",
        ],
      },
    ],
    lesson:
      "Genesis 25 teaches that a life of faith can end while God's promise keeps moving. Abraham is gone, but God's covenant faithfulness continues.",
  },
];

function renderNote(note: AbrahamChapterNote) {
  return `${note.title}

${note.intro}

📍 The Chapter Flow

${note.flow.map((item) => `* ${item}`).join("\n\n")}

${note.sections
  .map(
    (section) => `## ${renderVerseRange(section.reference)} ${section.title}

${section.points.join("\n\n")}`,
  )
  .join("\n\n")}

💡 The Big Lesson of Genesis ${note.chapter}

${note.lesson}`;
}

function renderEmojiList(items: string[]) {
  return items.map((item) => item.trim()).filter(Boolean).join("\n\n");
}

function renderPointList(items: string[]) {
  return items.map((item) => `• ${item}`).join("\n\n");
}

function renderExpandedSection(section: AbrahamSection, index: number, depth: AbrahamChapterDepth) {
  const primaryPoint = section.points[0] || "";
  const supportingPoint = section.points[1] || primaryPoint;
  const finalPoint = section.points[2] || supportingPoint;
  const callback = depth.callbacks[index % depth.callbacks.length] || depth.callbacks[0] || "";

  return `## 📍 ${section.reference} — ${section.title}

Let’s slow down here because this section is doing more than moving the story forward.

${renderPointList(section.points)}

### What Happened

${primaryPoint}

The Bible gives us this scene because the Abraham story is not built out of random moments. Every movement is teaching us what faith looks like in real life. Abraham is not being shown as a perfect spiritual machine. He is being shown as a real man learning to trust God inside pressure, family complexity, delay, fear, grief, and promise.

This is why the section matters. It gives us the visible event, but underneath the event is formation. God is shaping Abraham's faith while the promise is still unfolding slowly.

### What It Meant Then

${supportingPoint}

In their world, this was not casual. Family, land, household honor, inheritance, livestock, servants, city gates, wells, burial places, and altars all carried weight. These were not background props. They were the structures that held life together.

That is why details like movement, location, names, and household decisions matter so much. The original readers would have understood that Abraham's obedience was touching every layer of life, not just his private spirituality.

### Where We Have Seen This Before

${callback}

Genesis keeps repeating patterns so we learn how to read the story. People reach, God calls. People hide, God speaks. People try to secure themselves, God gives promise. Families fracture, but God keeps preserving the line.

This section belongs inside that larger movement. Abraham's story is connected to Eden, Noah, Babel, Isaac, Jacob, Israel, Exodus, David, and ultimately Jesus. The promise is already bigger than the scene in front of us.

### What Is Happening Emotionally

${depth.emotional}

You can almost feel the tension if you sit with it long enough. Abraham's life is full of decisions that sound simple only after we already know the ending. He did not know the ending while he was living it.

That is why these chapters are so helpful. They slow faith down. They show us trust while the outcome is still unfinished.

### What This Teaches Us Now

${finalPoint}

${depth.application}

This is not a cheap lesson. It is not saying, "Just believe harder and everything gets easy." Abraham's life proves the opposite. Faith can be real and still be tested. Obedience can be sincere and still be costly. God's promise can be true and still take years to unfold.

The question this section presses into us is simple:

Will we trust God only when the promise feels easy, or will we keep walking when faith has to grow under pressure?

### Why This Detail Matters

This is the kind of detail people miss when they read too fast. Genesis does not waste movement. If a person travels, the direction matters. If someone speaks, the wording matters. If a family conflict rises, it is usually showing a deeper wound. If land, tents, wells, altars, gates, or names appear in the story, they are not filler. They are teaching us how covenant faith lives in the real world.

For Abraham, faith is never separated from ordinary life. It touches where he lives, how he treats family, how he handles fear, how he responds to wealth, how he waits for children, how he worships, and how he makes decisions that affect the next generation.

That is one reason Abraham's story is so important for Bible Buddy. It shows that Bible study is not just learning facts. It is learning to recognize God inside the details of a life.

### A Bible Buddy Memory Hook

If you want to remember this section, hold onto three movements:

🧭 What direction is Abraham moving?

🧠 What is this moment exposing in the heart?

🧬 How is God protecting the covenant promise?

Those three questions help the chapter stay alive instead of becoming a blur of old names and places. Abraham's story is slow on purpose. The slowness teaches us that God forms faith over time.`;
}

function renderExpandedNote(note: AbrahamChapterNote) {
  const depth = ABRAHAM_CHAPTER_DEPTH[note.chapter];
  if (!depth) {
    throw new Error(`Missing Abraham chapter depth for Genesis ${note.chapter}`);
  }

  return `${note.title}

${note.intro}

${depth.previous}

${depth.whyMatters}

Before we break down the chapter, pay attention to this:

${renderEmojiList(depth.watchFor)}

## 🧭 The World Behind Genesis ${note.chapter}

${depth.history}

That background matters because Genesis is not telling a fantasy story floating above real life. Abraham lived in a world of households, land, public honor, family lines, city powers, migration routes, famine, fertility shame, and covenant obligations.

When God calls Abraham, He is not calling a man out of nothing. He is calling him out of a real world with real pressure. And that is what makes Abraham's obedience so powerful. He has to trust God inside the same kind of human complexity we still recognize today.

## 🧬 The Covenant Thread

${depth.covenant}

This is the thread running under the whole Abraham study:

🌍 God is creating a people.

🧬 God is preserving a seed.

🏕️ God is teaching a family how to live by promise.

✝️ God is moving history toward Christ.

So when we read Abraham, we are not only reading about Abraham. We are watching the Bible's rescue story take shape.

## 📍 The Chapter Flow

${note.flow.map((item) => `• ${item}`).join("\n\n")}

${note.sections.map((section, index) => renderExpandedSection(section, index, depth)).join("\n\n")}

## 💡 The Big Lesson of Genesis ${note.chapter}

${note.lesson}

${depth.application}

Abraham's story is not about perfect faith. It is about growing faith.

There are moments where Abraham trusts beautifully.

There are moments where Abraham fails painfully.

There are moments where Sarah laughs, Lot drifts, Hagar suffers, Ishmael is seen, Isaac is promised, and God keeps holding the covenant together anyway.

That is why this study matters. It teaches us that God's faithfulness is deeper than human weakness, and real obedience is often learned slowly over time.

## 🔎 Slow Study Recap

If we pull the chapter together, we can see the deeper pattern.

First, there is the visible story. Something happens in Abraham's life. He moves, waits, builds, fails, prays, rescues, receives, mourns, or obeys.

Then there is the world behind the story. These scenes happen inside ancient family structures, public honor systems, inheritance customs, covenant expectations, and real geography.

Then there is the covenant thread. God is not simply helping Abraham have a better private life. God is building a family line through which blessing will reach the nations.

Then there is the emotional weight. Abraham and Sarah are not symbols on a page. They are people carrying fear, hope, shame, laughter, grief, disappointment, and obedience.

And then there is the application for us. Faith is not proven only in big dramatic moments. Faith is formed in repeated decisions to trust God when the story is still unfinished.

That is the Abraham pattern.

God speaks.

Abraham responds.

Abraham sometimes stumbles.

God remains faithful.

The promise keeps moving.

## 🧠 Pause And Reflect

Genesis ${note.chapter} is asking us to sit with more than information.

It shows us what changed in the story, but it also shows us what God is forming underneath the surface.

${depth.bridge}

Before moving on, ask yourself:

• What part of this chapter feels most human to me?

• Where do I see Abraham learning trust instead of already having it mastered?

• What does this chapter reveal about God's patience, promise, and covenant faithfulness?

Do not rush past this.

The Abraham story is not meant to be skimmed.

It is meant to teach us how faith walks.`;
}

export const OBEDIENCE_OF_ABRAHAM_DEEP_NOTES = ABRAHAM_CHAPTER_NOTES.map(renderExpandedNote);
