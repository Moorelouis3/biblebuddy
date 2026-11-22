import type { ClueCard } from "../types";
import { genesisArt, ref } from "../ref";

/**
 * Genesis deck, People 1-25 (Notion roster order). Cards 1-5 keep the clues
 * transcribed from Louis's mockups, except Adam (revised by Louis
 * 2026-11-22). Louis, 2026-11-22: every clue comes from Genesis itself, never
 * another book. Only Joseph has art so far; every other card shows the
 * neutral fallback until its art exists. Every reference was checked against
 * public/kjv/<book>/<chapter>.json.
 */

const person = (c: Omit<ClueCard, "deck" | "category">): ClueCard => ({ ...c, deck: "genesis", category: "person" });

export const GENESIS_PEOPLE: ClueCard[] = [
  person({
    id: "god",
    number: 1,
    answer: "God",
    accepted: ["the lord", "lord", "lord god", "yahweh", "jehovah", "god almighty", "the lord god", "i am", "elohim"],
    art: genesisArt("god"),
    clues: [
      { text: "I came down to see the tower the people were building and mixed up their language.", ref: ref("Genesis 11:5–7") },
      { text: "I made coats of skins and clothed Adam and Eve.", ref: ref("Genesis 3:21") },
      { text: "I asked Cain where his brother Abel was.", ref: ref("Genesis 4:9") },
      { text: "I set my rainbow in the clouds as the sign of my promise to Noah.", ref: ref("Genesis 9:12–13") },
      { text: "In the beginning, I created the heavens and the earth.", ref: ref("Genesis 1:1") },
    ],
    altTopClues: [
      { text: "Enoch walked with me, and then he was gone, because I took him.", ref: ref("Genesis 5:24") },
      { text: "I told Abraham to count the stars, because his children would be just as many.", ref: ref("Genesis 15:5") },
    ],
    teaching:
      "God is the Creator of everything. Genesis opens with him making the heavens and the earth. He revealed his name to Moses as I AM, showed Moses his glory from a cleft in the rock, and answered Job out of the whirlwind. Through every story in Genesis, he is the one who speaks, promises and keeps his word. See Genesis 1:1; Exodus 3:14; 33:18–23; Job 38.",
  }),
  person({
    id: "adam",
    number: 2,
    answer: "Adam",
    accepted: ["adam the first man", "the first man"],
    art: genesisArt("adam"),
    clues: [
      { text: "God put me in the garden of Eden to work it and take care of it.", ref: ref("Genesis 2:15") },
      { text: "God told me I could eat from every tree in the garden but one.", ref: ref("Genesis 2:16–17") },
      { text: "I hid among the trees when I heard God walking in the garden.", ref: ref("Genesis 3:8–10") },
      { text: "God brought the animals to me to see what I would name them.", ref: ref("Genesis 2:19–20") },
      { text: "God formed me from the dust and breathed life into me.", ref: ref("Genesis 2:7") },
    ],
    altTopClues: [
      { text: "When God asked if I had eaten from the tree, I blamed the woman he gave me.", ref: ref("Genesis 3:11–12") },
      { text: "When I first saw Eve, I said she was bone of my bones and flesh of my flesh.", ref: ref("Genesis 2:23") },
      { text: "Because I ate the fruit, I would eat bread by the sweat of my face.", ref: ref("Genesis 3:17–19") },
    ],
    teaching:
      "Adam was the first man. God formed him from the dust, breathed life into him, and placed him in the garden of Eden. Adam named the animals, and God made Eve to be his wife. After they ate from the forbidden tree, they hid from God and were sent out of the garden. Luke’s family line of Jesus reaches back to him. See Genesis 2–3; 5:1–5; Luke 3:38.",
    study: { label: "Explore Adam’s Story", href: "/blog/who-was-adam" },
  }),
  person({
    id: "eve",
    number: 3,
    answer: "Eve",
    accepted: ["eva", "chavah", "havah"],
    art: genesisArt("eve"),
    clues: [
      { text: "After Cain killed Abel, I had a son named Seth and said God gave him in Abel’s place.", ref: ref("Genesis 4:25") },
      { text: "The serpent asked me if God had really said we could not eat from every tree.", ref: ref("Genesis 3:1") },
      { text: "When God asked what I had done, I said the serpent tricked me.", ref: ref("Genesis 3:13") },
      { text: "I ate the forbidden fruit and gave some to my husband Adam.", ref: ref("Genesis 3:6") },
      { text: "God made me from one of Adam’s ribs.", ref: ref("Genesis 2:21–22") },
    ],
    teaching:
      "Eve was the first woman. God made her from Adam’s rib, and Adam named her because she would be the mother of all the living. The serpent deceived her, and she ate the forbidden fruit and gave some to Adam. Later she became the mother of Cain, Abel and Seth. See Genesis 2:21–25; 3; 4:1–2, 25.",
    study: { label: "Explore Eve’s Story", href: "/blog/who-was-eve" },
  }),
  person({
    id: "cain",
    number: 4,
    answer: "Cain",
    accepted: ["kain"],
    art: genesisArt("cain"),
    clues: [
      { text: "God put a mark on me so that no one who found me would kill me.", ref: ref("Genesis 4:15") },
      { text: "God was not pleased with my offering, and I became very angry.", ref: ref("Genesis 4:5–6") },
      { text: "God warned me that sin was waiting at my door.", ref: ref("Genesis 4:7") },
      { text: "When God asked where Abel was, I said, “Am I my brother’s keeper?”", ref: ref("Genesis 4:9") },
      { text: "I killed my brother Abel.", ref: ref("Genesis 4:8") },
    ],
    teaching:
      "Cain was the firstborn son of Adam and Eve. He worked the ground, and when God accepted Abel’s offering but not his, Cain grew angry and killed his brother. When God asked where Abel was, Cain asked if he was his brother’s keeper. God sent him away as a wanderer, and he built a city named after his son Enoch. See Genesis 4:1–17; Jude 1:11.",
  }),
  person({
    id: "noah",
    number: 5,
    answer: "Noah",
    accepted: ["noe", "noach"],
    art: genesisArt("noah"),
    clues: [
      // Louis, 2026-11-22: "ark" and "flood" are saved for the 1-point clue.
      { text: "God found me righteous in a world of unrighteousness.", ref: ref("Genesis 7:1") },
      { text: "God told me the earth was full of violence and he was going to destroy it.", ref: ref("Genesis 6:13") },
      { text: "God told me to bring two of every kind of animal with me.", ref: ref("Genesis 6:19–20") },
      { text: "I sent out a dove, and it came back with an olive leaf.", ref: ref("Genesis 8:10–11") },
      { text: "God told me to build an ark before the flood.", ref: ref("Genesis 6:13–18") },
    ],
    altTopClues: [
      { text: "I planted a vineyard, drank too much wine, and lay uncovered in my tent.", ref: ref("Genesis 9:20–21") },
      { text: "I built an altar and offered burnt offerings, and the Lord smelled the sweet smell.", ref: ref("Genesis 8:20–21") },
      { text: "My sons Shem and Japheth walked in backwards to cover me with a garment.", ref: ref("Genesis 9:23") },
    ],
    teaching:
      "Noah lived when the earth was full of violence, yet God found him righteous. God told him to build an ark for his family and the animals before the flood. When the waters went down, a dove brought back an olive leaf, and God set a rainbow in the sky as a promise never to flood the earth again. See Genesis 6–9; 2 Peter 2:5.",
  }),
  person({
    id: "abraham",
    number: 6,
    answer: "Abraham",
    accepted: ["abram", "avraham", "abraham the father of many nations", "father abraham"],
    art: genesisArt("abraham"),
    clues: [
      { text: "When we went down to Egypt, I asked my wife Sarai to say she was my sister.", ref: ref("Genesis 12:11–13") },
      { text: "I let my nephew Lot choose his land first so we would not fight.", ref: ref("Genesis 13:8–9") },
      { text: "Three visitors came to my tent, and I hurried to make them a meal.", ref: ref("Genesis 18:1–8") },
      { text: "God told me to leave my country, and he would make me a great nation.", ref: ref("Genesis 12:1–2") },
      { text: "God tested me by asking me to offer my son Isaac.", ref: ref("Genesis 22:1–2") },
    ],
    altTopClues: [
      { text: "I kept asking God to spare Sodom, until he said he would for just ten good people.", ref: ref("Genesis 18:26–32") },
      { text: "I took my servants and rescued my nephew Lot after kings carried him away.", ref: ref("Genesis 14:12–16") },
      { text: "I believed the Lord, and he counted it to me as righteousness.", ref: ref("Genesis 15:6") },
    ],
    teaching:
      "Abraham, first called Abram, left his home when God called him and went to Canaan. God promised him a land and more descendants than the stars, and renamed him the father of many nations. In old age he and Sarah had Isaac, and Abraham trusted God even when he was asked to offer his son. See Genesis 12:1–3; 15:5–6; 17:5; 21:1–5; 22.",
    study: { label: "Explore Abraham’s Story", href: "/bible-buddies/abraham" },
  }),
  person({
    id: "sarah",
    number: 7,
    answer: "Sarah",
    accepted: ["sarai", "sara"],
    art: genesisArt("sarah"),
    clues: [
      { text: "Abram had me say I was his sister, and I was taken into Pharaoh’s house.", ref: ref("Genesis 12:13–15") },
      { text: "I told Abraham to send Hagar and her son away.", ref: ref("Genesis 21:9–10") },
      { text: "I gave my servant Hagar to Abram so I could have children through her.", ref: ref("Genesis 16:1–3") },
      { text: "I laughed when I heard I would have a son in my old age.", ref: ref("Genesis 18:10–12") },
      { text: "I was Abraham’s wife and the mother of Isaac.", ref: ref("Genesis 21:2–3") },
    ],
    teaching:
      "Sarah, first called Sarai, was Abraham’s wife. For years she had no children, so she gave her servant Hagar to Abraham. When God promised her a son in her old age, she laughed. Then God kept his word, and she gave birth to Isaac. She died at 127 and was buried at Machpelah. See Genesis 16; 18:10–15; 21:1–7; 23:1–2, 19.",
    study: { label: "Explore Sarah’s Story", href: "/blog/who-was-sarah" },
  }),
  person({
    id: "lot",
    number: 8,
    answer: "Lot",
    accepted: ["lott"],
    art: genesisArt("lot"),
    clues: [
      { text: "Abram and I had so many flocks that the land could not hold us both.", ref: ref("Genesis 13:5–7") },
      { text: "When Abram let me choose, I picked the well-watered plain of the Jordan near Sodom.", ref: ref("Genesis 13:10–11") },
      { text: "Two angels came to Sodom, and I begged them to stay the night at my house.", ref: ref("Genesis 19:1–3") },
      { text: "Angels took me by the hand and led my family out of Sodom.", ref: ref("Genesis 19:16") },
      { text: "My wife looked back and became a pillar of salt.", ref: ref("Genesis 19:26") },
    ],
    teaching:
      "Lot was Abraham’s nephew. He travelled with Abraham to Canaan, then chose the well-watered land near Sodom. Abraham rescued him when he was taken captive. Before God destroyed Sodom, angels led Lot and his family out, but his wife looked back and became a pillar of salt. Peter calls Lot a righteous man. See Genesis 13; 14:12–16; 19; 2 Peter 2:7–8.",
  }),
  person({
    id: "hagar",
    number: 9,
    answer: "Hagar",
    accepted: ["agar", "haggar"],
    art: genesisArt("hagar"),
    clues: [
      { text: "When our water ran out in the wilderness, God opened my eyes to see a well.", ref: ref("Genesis 21:15–19") },
      { text: "When Sarai treated me harshly, I ran away into the wilderness.", ref: ref("Genesis 16:6–8") },
      { text: "I called the Lord “the God who sees me.”", ref: ref("Genesis 16:13") },
      { text: "Abraham sent me and my son away with bread and a bottle of water.", ref: ref("Genesis 21:14") },
      { text: "I gave birth to Abram’s son Ishmael.", ref: ref("Genesis 16:15") },
    ],
    teaching:
      "Hagar was Sarah’s Egyptian servant. Sarah gave her to Abraham, and she became the mother of Ishmael. When she ran away, an angel met her by a spring, and she called the Lord the God who sees her. Later she and Ishmael were sent away, and God cared for them in the wilderness. See Genesis 16; 21:9–21; Galatians 4:24–25.",
    study: { label: "Explore Hagar’s Story", href: "/blog/who-was-hagar" },
  }),
  person({
    id: "ishmael",
    number: 10,
    answer: "Ishmael",
    accepted: ["ismael", "ishmail", "ishmeal"],
    art: genesisArt("ishmael"),
    clues: [
      { text: "My brother Isaac and I buried our father Abraham together.", ref: ref("Genesis 25:9") },
      { text: "Sarah saw me mocking at the feast Abraham made for little Isaac.", ref: ref("Genesis 21:8–9") },
      { text: "I grew up in the wilderness and became an archer.", ref: ref("Genesis 21:20") },
      { text: "When my mother and I were sent away, God heard me crying in the wilderness.", ref: ref("Genesis 21:14–17") },
      { text: "I was the son of Abraham and Hagar.", ref: ref("Genesis 16:15") },
    ],
    teaching:
      "Ishmael was Abraham’s first son, born to Sarah’s servant Hagar. Before he was born, an angel told Hagar to name him Ishmael. After Isaac was born, Ishmael and Hagar were sent away, but God was with the boy, and he grew up in the wilderness as an archer. God made him the father of twelve princes. See Genesis 16; 21:9–21; 25:12–17.",
  }),
  person({
    id: "isaac",
    number: 11,
    answer: "Isaac",
    accepted: ["issac", "isaak", "yitzhak", "itzhak"],
    art: genesisArt("isaac"),
    clues: [
      { text: "I was afraid, so I told the men where we lived that Rebekah was my sister.", ref: ref("Genesis 26:7") },
      { text: "I was out in the field one evening when I saw Rebekah coming on a camel.", ref: ref("Genesis 24:63–64") },
      { text: "On the way up the mountain, I asked my father, “Where is the lamb?”", ref: ref("Genesis 22:7") },
      { text: "Jacob dressed up as his brother Esau and tricked me into blessing him.", ref: ref("Genesis 27:15–27") },
      { text: "My father Abraham laid me on an altar, but God provided a ram instead.", ref: ref("Genesis 22:9–13") },
    ],
    teaching:
      "Isaac was the son God promised to Abraham and Sarah, born when they were old. When God tested Abraham, Isaac was laid on the altar, and God provided a ram instead. Isaac married Rebekah and became the father of twins, Esau and Jacob. When he was old and could not see, Jacob tricked him into giving the blessing. See Genesis 21:1–7; 22; 24; 25:19–26; 27.",
  }),
  person({
    id: "rebekah",
    number: 12,
    answer: "Rebekah",
    accepted: ["rebecca", "rebeca", "rebekka", "rebeka", "rebecka", "rebekah"],
    art: genesisArt("rebekah"),
    clues: [
      { text: "When I first saw Isaac in the field, I got off my camel and covered my face with a veil.", ref: ref("Genesis 24:64–65") },
      { text: "My family asked if I would leave with Abraham’s servant, and I said, “I will go.”", ref: ref("Genesis 24:57–58") },
      { text: "I gave Abraham’s servant a drink at the well and watered his camels too.", ref: ref("Genesis 24:18–20") },
      { text: "I had twins, Esau and Jacob, and they struggled together inside me.", ref: ref("Genesis 25:22–26") },
      { text: "I helped Jacob trick Isaac into blessing him instead of Esau.", ref: ref("Genesis 27:6–10") },
    ],
    teaching:
      "Rebekah was the woman Abraham’s servant found at a well when she offered water to him and his camels. She married Isaac and became the mother of twins, Esau and Jacob, who struggled before they were born. God told her the older would serve the younger, and she later helped Jacob receive Isaac’s blessing. See Genesis 24; 25:20–26; 27.",
    study: { label: "Explore Rebekah’s Story", href: "/blog/who-was-rebekah" },
  }),
  person({
    id: "esau",
    number: 13,
    answer: "Esau",
    accepted: ["edom", "esaw"],
    art: genesisArt("esau"),
    clues: [
      { text: "After I lost the blessing, I planned to kill my brother Jacob once our father died.", ref: ref("Genesis 27:41") },
      { text: "Years later, I ran to meet my brother Jacob, hugged him, and we cried.", ref: ref("Genesis 33:4") },
      { text: "I came in from hunting and cried bitterly when I learned Jacob had my blessing.", ref: ref("Genesis 27:30–34") },
      { text: "I was born red and hairy, and I grew up to be a skilful hunter.", ref: ref("Genesis 25:25–27") },
      { text: "I sold my birthright to my brother Jacob for a bowl of stew.", ref: ref("Genesis 25:29–34") },
    ],
    teaching:
      "Esau was the older twin son of Isaac and Rebekah. He was born red and hairy and grew up a hunter. One day he came in hungry and sold his birthright to Jacob for stew, and later Jacob received the blessing Esau expected. Years later, Esau ran to meet Jacob and embraced him. See Genesis 25:24–34; 27; 33:1–4.",
  }),
  person({
    id: "jacob",
    number: 14,
    answer: "Jacob",
    accepted: ["israel", "jakob", "jacobs", "yaakov"],
    art: genesisArt("jacob"),
    clues: [
      { text: "At a well, I rolled the stone away and watered my uncle Laban’s sheep for Rachel.", ref: ref("Genesis 29:9–10") },
      { text: "I worked seven years to marry Rachel, and they felt like only a few days.", ref: ref("Genesis 29:18–20") },
      { text: "I dreamed of a ladder reaching up to heaven with angels going up and down on it.", ref: ref("Genesis 28:12") },
      { text: "I wrestled with a man all night and would not let go until he blessed me.", ref: ref("Genesis 32:24–26") },
      { text: "I tricked my father Isaac and took my brother Esau’s blessing.", ref: ref("Genesis 27:18–29") },
    ],
    altTopClues: [
      { text: "On my wedding night, Laban gave me Leah instead of Rachel.", ref: ref("Genesis 29:23–25") },
      { text: "I crossed my hands to bless Joseph’s younger son before the older one.", ref: ref("Genesis 48:14") },
      { text: "I set up the stone I slept on as a pillar and poured oil on it.", ref: ref("Genesis 28:18") },
    ],
    teaching:
      "Jacob was the younger twin son of Isaac and Rebekah. He took Esau’s birthright and blessing, then fled and dreamed of a ladder to heaven. He worked for Laban for Leah and Rachel, and had twelve sons. After he wrestled with God, his name became Israel, and his sons became the twelve tribes. See Genesis 25:26; 27–29; 32:24–28; 35:22–26.",
  }),
  person({
    id: "laban",
    number: 15,
    answer: "Laban",
    accepted: ["labban"],
    art: genesisArt("laban"),
    clues: [
      { text: "When Jacob sneaked away with my daughters, I chased after him for seven days.", ref: ref("Genesis 31:20–23") },
      { text: "I ran out to the well to meet Abraham’s servant when I saw my sister Rebekah’s bracelets.", ref: ref("Genesis 24:29–30") },
      { text: "I searched every tent for the household gods that were stolen from me.", ref: ref("Genesis 31:30–35") },
      { text: "I made Jacob work another seven years to marry Rachel.", ref: ref("Genesis 29:27–28") },
      { text: "I gave Leah to Jacob instead of Rachel on his wedding night.", ref: ref("Genesis 29:23–25") },
    ],
    teaching:
      "Laban was Rebekah’s brother and the father of Leah and Rachel. Jacob worked for him seven years for Rachel, but Laban gave him Leah first and made him work seven more. Laban kept changing Jacob’s wages. When Jacob left, Laban chased him, and they made a covenant with a heap of stones. See Genesis 24:29–31; 29:15–30; 31.",
  }),
  person({
    id: "leah",
    number: 16,
    answer: "Leah",
    accepted: ["lea", "leia"],
    art: genesisArt("leah"),
    clues: [
      { text: "When my son Judah was born, I said, “Now I will praise the Lord.”", ref: ref("Genesis 29:35") },
      { text: "I named my first son Reuben, hoping my husband would love me now.", ref: ref("Genesis 29:32") },
      { text: "My eyes were weak, but my younger sister Rachel was beautiful.", ref: ref("Genesis 29:16–17") },
      { text: "My husband Jacob loved my sister Rachel more than me.", ref: ref("Genesis 29:30") },
      { text: "My father Laban tricked Jacob into marrying me before Rachel.", ref: ref("Genesis 29:23–25") },
    ],
    teaching:
      "Leah was Laban’s older daughter. Jacob loved her sister Rachel, but Laban gave Leah to him first. Though Jacob loved Rachel more, God saw Leah and gave her children, including Reuben, Levi and Judah. Jesus came from Judah’s line. Jacob buried her in the family tomb with Abraham and Sarah. See Genesis 29:16–35; 49:31.",
    study: { label: "Explore Leah’s Story", href: "/blog/who-is-leah" },
  }),
  person({
    id: "rachel",
    number: 17,
    answer: "Rachel",
    accepted: ["rahel", "rachael", "rachelle"],
    art: genesisArt("rachel"),
    clues: [
      { text: "I hid my father’s household gods under my camel’s saddle and sat on them.", ref: ref("Genesis 31:34") },
      { text: "I was so jealous of my sister Leah that I told Jacob, “Give me children, or else I die.”", ref: ref("Genesis 30:1") },
      { text: "I met Jacob when I brought my father’s sheep to the well.", ref: ref("Genesis 29:9–10") },
      { text: "Jacob worked seven years for me, and they felt like a few days.", ref: ref("Genesis 29:20") },
      { text: "I was the mother of Joseph and Benjamin.", ref: ref("Genesis 35:24") },
    ],
    teaching:
      "Rachel was Laban’s younger daughter and Jacob’s beloved wife. Jacob worked seven years for her, but was tricked into marrying Leah first. For a long time Rachel had no children, then God gave her Joseph. She died giving birth to Benjamin near Bethlehem, and Jeremiah pictures her weeping for her children. See Genesis 29; 30:22–24; 35:16–20; Jeremiah 31:15.",
    study: { label: "Explore Rachel’s Story", href: "/blog/who-was-rachel" },
  }),
  person({
    id: "reuben",
    number: 18,
    answer: "Reuben",
    accepted: ["ruben", "rueben", "reubin"],
    art: genesisArt("reuben"),
    clues: [
      { text: "In Egypt I told my brothers, “Didn’t I tell you not to sin against the boy?”", ref: ref("Genesis 42:21–22") },
      { text: "I told my father he could kill my two sons if I did not bring Benjamin back.", ref: ref("Genesis 42:37") },
      { text: "I went back to the pit, found Joseph gone, and tore my clothes.", ref: ref("Genesis 37:29") },
      { text: "I talked my brothers out of killing Joseph and planned to rescue him.", ref: ref("Genesis 37:21–22") },
      { text: "I was Jacob’s firstborn son, born to Leah.", ref: ref("Genesis 29:32") },
    ],
    teaching:
      "Reuben was Jacob’s firstborn son, born to Leah. When his brothers wanted to kill Joseph, Reuben talked them into throwing him in a pit, hoping to rescue him later. Because he sinned with his father’s concubine, he lost the rights of the firstborn. Still, his tribe received land in Israel. See Genesis 29:32; 35:22; 37:21–30; 49:3–4; 1 Chronicles 5:1.",
  }),
  person({
    id: "simeon",
    number: 19,
    answer: "Simeon",
    accepted: ["symeon", "simon of jacob", "shimon"],
    art: genesisArt("simeon"),
    clues: [
      { text: "Leah named me because the Lord heard that she was unloved.", ref: ref("Genesis 29:33") },
      { text: "My father cursed the fierce anger of Levi and me and said he would scatter us.", ref: ref("Genesis 49:5–7") },
      { text: "When my brothers came back to Egypt, Joseph’s steward brought me out to them.", ref: ref("Genesis 43:23") },
      { text: "To avenge our sister Dinah, Levi and I attacked the city of Shechem.", ref: ref("Genesis 34:25–26") },
      { text: "Joseph had me tied up and kept in Egypt while my brothers went home.", ref: ref("Genesis 42:24") },
    ],
    teaching:
      "Simeon was Jacob’s second son, born to Leah. With his brother Levi, he attacked the city of Shechem after their sister Dinah was mistreated. When the brothers went to Egypt for grain, Joseph kept Simeon bound until they came back with Benjamin. His tribe later lived within Judah’s land. See Genesis 29:33; 34; 42:24; 43:23; Joshua 19:1.",
  }),
  person({
    id: "levi",
    number: 20,
    answer: "Levi",
    accepted: ["levy", "leevi"],
    art: genesisArt("levi"),
    clues: [
      { text: "Leah named me hoping her husband would be joined to her at last.", ref: ref("Genesis 29:34") },
      { text: "When my father scolded us, I asked whether our sister should be treated like a harlot.", ref: ref("Genesis 34:30–31") },
      { text: "My father called Simeon and me cruel because of what we did in our anger.", ref: ref("Genesis 49:5–6") },
      { text: "I was Jacob’s third son with Leah, after Reuben and Simeon.", ref: ref("Genesis 29:32–34") },
      { text: "To avenge our sister Dinah, Simeon and I attacked the men of Shechem.", ref: ref("Genesis 34:25–26") },
    ],
    teaching:
      "Levi was Jacob’s third son, born to Leah. With Simeon, he took revenge on Shechem, and Jacob rebuked them both. Moses and Aaron came from Levi’s family, and God set apart his tribe to serve at the tabernacle. The Levites received no land of their own, because the Lord was their inheritance. See Genesis 29:34; 34; Exodus 2:1; Numbers 1:50; Joshua 13:33.",
  }),
  person({
    id: "judah",
    number: 21,
    answer: "Judah",
    accepted: ["juda", "judas of jacob", "yehuda"],
    art: genesisArt("judah"),
    clues: [
      { text: "When Tamar showed me my seal and staff, I said she was more righteous than I.", ref: ref("Genesis 38:25–26") },
      { text: "I promised my father I would bring Benjamin home safe or carry the blame forever.", ref: ref("Genesis 43:8–9") },
      { text: "I said we should sell Joseph to the Ishmaelites instead of killing him.", ref: ref("Genesis 37:26–27") },
      { text: "I offered to stay as a slave in Egypt in Benjamin’s place.", ref: ref("Genesis 44:33") },
      { text: "My father called me a lion’s cub and said the sceptre would not leave me.", ref: ref("Genesis 49:9–10") },
    ],
    teaching:
      "Judah was Jacob’s fourth son, born to Leah. He suggested selling Joseph instead of killing him, but years later he offered his own life in place of Benjamin. Jacob called him a lion’s cub and said the sceptre would not leave Judah. King David and Jesus came from his tribe. See Genesis 29:35; 37:26–27; 44:18–34; 49:8–10; Revelation 5:5.",
  }),
  person({
    id: "joseph",
    number: 22,
    answer: "Joseph",
    accepted: ["josef", "joesph", "zaphnath-paaneah", "zaphnathpaaneah"],
    art: genesisArt("joseph"),
    clues: [
      { text: "When my brothers came to Egypt to buy food, I accused them of being spies.", ref: ref("Genesis 42:7–9") },
      { text: "Potiphar’s wife grabbed my garment, and I ran away and left it in her hand.", ref: ref("Genesis 39:7–12") },
      { text: "My brothers threw me in a pit and sold me to traders going to Egypt.", ref: ref("Genesis 37:24–28") },
      { text: "I explained Pharaoh’s dream of seven fat cows and seven thin cows.", ref: ref("Genesis 41:25–27") },
      { text: "My father gave me a coat of many colours.", ref: ref("Genesis 37:3") },
    ],
    altTopClues: [
      { text: "I had my silver cup hidden in Benjamin’s sack to test my brothers.", ref: ref("Genesis 44:1–2") },
      { text: "When I told my brothers who I was, I wept so loudly that the Egyptians heard.", ref: ref("Genesis 45:1–3") },
      { text: "I dreamed my brothers’ bundles of grain bowed down to mine.", ref: ref("Genesis 37:7") },
    ],
    teaching:
      "Joseph was the first son of Jacob and Rachel. Jacob gave him a special coat, and his brothers sold him into slavery. In Egypt, Joseph interpreted Pharaoh’s dreams and helped store food before a famine. Years later, he forgave his brothers and provided for his family. See Genesis 30:22–24; 37; 41; 45.",
    study: { label: "Explore Joseph’s Story", href: "/blog/who-was-joseph" },
  }),
  person({
    id: "benjamin",
    number: 23,
    answer: "Benjamin",
    accepted: ["benjamen", "benjamim", "ben-oni", "benoni"],
    art: genesisArt("benjamin"),
    clues: [
      { text: "At a feast in Egypt, I was served five times more food than any of my brothers.", ref: ref("Genesis 43:34") },
      { text: "When Joseph saw me, he hurried to his room and wept.", ref: ref("Genesis 43:29–30") },
      { text: "My father Jacob would not let me go to Egypt with my brothers the first time.", ref: ref("Genesis 42:4") },
      { text: "My mother Rachel died giving birth to me on the way to Bethlehem.", ref: ref("Genesis 35:16–19") },
      { text: "Joseph’s silver cup was found in my sack.", ref: ref("Genesis 44:12") },
    ],
    teaching:
      "Benjamin was Jacob’s youngest son and Rachel’s second, born as she died near Bethlehem. After Joseph was lost, Jacob held Benjamin close. In Egypt, Joseph tested his brothers by hiding his silver cup in Benjamin’s sack. Benjamin’s tribe later gave Israel King Saul and the apostle Paul. See Genesis 35:16–18; 42–45; 49:27; Romans 11:1.",
  }),
  person({
    id: "potiphar",
    number: 24,
    answer: "Potiphar",
    accepted: ["potifar", "potipher", "potiphur"],
    art: genesisArt("potiphar"),
    clues: [
      { text: "Pharaoh’s butler and baker were locked up in the prison at my house.", ref: ref("Genesis 40:3") },
      { text: "The Lord blessed everything in my house because of my Hebrew servant.", ref: ref("Genesis 39:5") },
      { text: "I bought Joseph from the Ishmaelites who brought him down to Egypt.", ref: ref("Genesis 39:1") },
      { text: "I put Joseph in charge of everything I owned.", ref: ref("Genesis 39:4–6") },
      { text: "My wife falsely accused Joseph, and I put him in prison.", ref: ref("Genesis 39:19–20") },
    ],
    teaching:
      "Potiphar was an Egyptian officer of Pharaoh, the captain of the guard. He bought Joseph from the Ishmaelites and saw that the Lord made everything Joseph did succeed, so he put Joseph over his whole house. When Potiphar’s wife falsely accused Joseph, Potiphar had him thrown into prison. See Genesis 37:36; 39; 40:3.",
  }),
  person({
    id: "pharaoh",
    number: 25,
    answer: "Pharaoh",
    accepted: ["pharaoh of egypt", "the pharaoh", "pharoah", "pharao", "farao"],
    art: genesisArt("pharaoh"),
    clues: [
      { text: "Joseph brought his old father Jacob to meet me, and Jacob blessed me.", ref: ref("Genesis 47:7") },
      { text: "I told Joseph to bring his whole family to Egypt and promised them the best of the land.", ref: ref("Genesis 45:17–18") },
      { text: "On my birthday I gave my butler back his job, but I hanged my baker.", ref: ref("Genesis 40:20–22") },
      { text: "I put my ring on Joseph’s hand and set him over all Egypt.", ref: ref("Genesis 41:41–42") },
      { text: "I dreamed seven thin cows ate seven fat cows.", ref: ref("Genesis 41:1–4") },
    ],
    teaching:
      "This Pharaoh was the king of Egypt in Joseph’s day. He had two troubling dreams about cows and grain, and Joseph explained them as seven years of plenty followed by seven of famine. Pharaoh made Joseph ruler over Egypt, then welcomed Jacob’s family and gave them land in Goshen. See Genesis 40:20–22; 41; 47:1–10.",
  }),
];
