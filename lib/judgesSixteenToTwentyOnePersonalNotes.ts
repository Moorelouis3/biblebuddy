import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";
import { DAY_61_80_JUDGES_16_21_SUPPLEMENTAL_SECTIONS } from "./daySixtyOneToEightySupplementalPersonalNotes";

const e = (...codes: number[]) => String.fromCodePoint(...codes);

const I = {
  altar: e(0x1F54D),
  baby: e(0x1F476),
  battle: e(0x2694, 0xFE0F),
  book: e(0x1F4D6),
  broken: e(0x1F494),
  city: e(0x1F3D9, 0xFE0F),
  crown: e(0x1F451),
  door: e(0x1F6AA),
  eye: e(0x1F441, 0xFE0F),
  fire: e(0x1F525),
  gate: e(0x1F6AA),
  grain: e(0x1F33E),
  hand: e(0x270B),
  house: e(0x1F3E0),
  idol: e(0x1F5FF),
  judge: e(0x2696, 0xFE0F),
  map: e(0x1F5FA, 0xFE0F),
  money: e(0x1FA99),
  people: e(0x1F465),
  prayer: e(0x1F64F),
  priest: e(0x1F9D4),
  question: e(0x2753),
  razor: e(0x2702, 0xFE0F),
  scroll: e(0x1F4DC),
  seedling: e(0x1F331),
  shield: e(0x1F6E1, 0xFE0F),
  sorrow: e(0x1F622),
  strength: e(0x1F4AA),
  warning: e(0x26A0, 0xFE0F),
  water: e(0x1F4A7),
};

const note = (lines: string[]) => lines.join("\n\n");

function phrase(icon: string, title: string, meaning: string, bullets: string[], close: string): [string, string] {
  return [
    `${icon} ${title}`,
    note([
      meaning,
      ...bullets,
      close,
    ]),
  ];
}

function section(
  chapter: number,
  startVerse: number,
  endVerse: number,
  title: string,
  icon: string,
  phrases: Array<[string, string]>,
): PersonalLeviticusPhraseSectionInput {
  return {
    chapter,
    startVerse,
    endVerse,
    reference: `Judges ${chapter}:${startVerse}-${endVerse}`,
    title,
    icon,
    phrases,
  };
}

export const JUDGES_16_21_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = [
  section(16, 1, 5, "Samson Walks Into Danger", I.warning, [
    phrase(I.eye, "Samson Went To Gaza", "Samson moves into Philistine territory and walks toward danger instead of away from it.", [`${I.city} Gaza was a Philistine city`, `${I.warning} Desire pulls Samson into risk`, `${I.strength} Strength does not equal wisdom`], "The phrase begins the final collapse of Samson's story."),
    phrase(I.gate, "Took The Doors Of The Gate", "Samson tears away the city gate, the public symbol of protection and power.", [`${I.gate} City security`, `${I.strength} Supernatural strength`, `${I.warning} Power without self-control`], "The moment is impressive, but it also shows how alone and reckless Samson has become."),
    phrase(I.broken, "Loved A Woman In The Valley Of Sorek", "Samson's heart becomes attached to Delilah in a place connected to Philistine pressure.", [`${I.broken} Dangerous affection`, `${I.map} Valley of Sorek`, `${I.warning} A weak place in Samson`], "The danger is not only outside him. It is also inside his desires."),
    phrase(I.money, "Eleven Hundred Pieces Of Silver", "the Philistine rulers offer Delilah a large payment to betray Samson.", [`${I.money} Bribe`, `${I.battle} Enemy plot`, `${I.broken} Love being sold`], "Money turns the relationship into a trap."),
  ]),
  section(16, 6, 10, "Delilah Begins Pressing Samson", I.question, [
    phrase(I.question, "Tell Me, I Pray Thee", "Delilah asks for Samson's secret while hiding the danger behind personal words.", [`${I.question} A request`, `${I.warning} A hidden trap`, `${I.broken} Trust being tested`], "The phrase sounds gentle, but the story shows it is manipulation."),
    phrase(I.strength, "Wherein Thy Great Strength Lieth", "Lieth here means lies or comes from. Delilah wants to know where Samson's strength comes from so he can be controlled.", [`${I.strength} Strength`, `${I.eye} Secret watched`, `${I.battle} Enemy strategy`], "The Philistines know they cannot defeat Samson until his strength is exposed."),
    phrase(I.warning, "Bind Thee To Afflict Thee", "The goal is not curiosity but tying Samson up so he can be weakened and harmed.", [`${I.warning} Binding`, `${I.broken} Affliction`, `${I.battle} Enemy purpose`], "Delilah's questions are really moving toward Samson's suffering."),
    phrase(I.seedling, "Seven Green Withs", "Withs are fresh cords or bowstrings that have not dried out yet.", [`${I.seedling} Fresh cords`, `${I.question} False answer`, `${I.warning} Playing with danger`], "Samson gives Delilah a false answer, but he keeps playing close to the trap."),
  ]),
  section(16, 11, 14, "Samson Keeps Playing With Danger", I.warning, [
    phrase(I.hand, "If They Bind Me Fast With New Ropes", "Samson gives another false answer while still staying in the dangerous conversation.", [`${I.hand} New ropes`, `${I.question} Another test`, `${I.warning} Danger ignored`], "He is not trapped yet, but he is becoming less careful."),
    phrase(I.razor, "The Seven Locks Of My Head", "Samson moves closer to the truth by mentioning his hair.", [`${I.razor} Hair enters the story`, `${I.warning} Secret getting closer`, `${I.broken} Calling treated lightly`], "The closer he gets to the truth, the closer he moves toward ruin."),
    phrase(I.strength, "Went Away With The Pin", "Samson still breaks free because his strength remains.", [`${I.strength} Strength remains`, `${I.door} Escape`, `${I.warning} Mercy ignored`], "Every escape should wake him up, but Samson keeps staying near Delilah."),
    phrase(I.battle, "The Philistines Be Upon Thee, Samson", "Delilah tests each answer by calling the enemy in on him.", [`${I.battle} Enemy waiting`, `${I.warning} Repeated trap`, `${I.eye} Samson should notice`], "The pattern is obvious, which makes Samson's refusal to leave even more tragic."),
  ]),
  section(16, 15, 17, "Samson Reveals His Secret", I.razor, [
    phrase(I.broken, "How Canst Thou Say, I Love Thee", "Delilah uses emotional pressure to wear Samson down.", [`${I.broken} Love language`, `${I.question} Pressure`, `${I.warning} Manipulation`], "Words about love are being twisted into control."),
    phrase(I.sorrow, "His Soul Was Vexed Unto Death", "Samson becomes worn down by constant pressure.", [`${I.sorrow} Weariness`, `${I.warning} Pressure over time`, `${I.broken} A weakened heart`], "Temptation often wins by staying close long enough to exhaust resistance."),
    phrase(I.razor, "There Hath Not Come A Razor Upon Mine Head", "Samson finally tells Delilah the sign connected to his Nazirite calling.", [`${I.razor} No razor`, `${I.prayer} Set apart to God`, `${I.warning} Sacred sign exposed`], "The problem is not magic hair. The hair points to a life that was supposed to belong to God."),
    phrase(I.scroll, "I Have Been A Nazarite Unto God", "Samson names the calling that marked him from birth.", [`${I.scroll} Nazirite vow`, `${I.baby} From the womb`, `${I.prayer} Belonging to God`], "This is the spiritual heart of the scene."),
  ]),
  section(16, 18, 21, "Samson Is Captured", I.broken, [
    phrase(I.money, "The Lords Of The Philistines Came Up Unto Her", "the rulers return because Delilah now has the truth they paid for.", [`${I.money} Bribe completed`, `${I.battle} Enemy closes in`, `${I.warning} Betrayal succeeds`], "The private secret immediately becomes public danger."),
    phrase(I.razor, "She Caused Him To Shave Off The Seven Locks", "Delilah removes the visible sign of Samson's separation to God.", [`${I.razor} Hair cut`, `${I.broken} Calling despised`, `${I.warning} Strength about to leave`], "The act shows how far Samson has fallen from his calling."),
    phrase(I.door, "The LORD Was Departed From Him", "Samson has lost the presence and power he had treated carelessly.", [`${I.door} Presence withdrawn`, `${I.strength} Strength gone`, `${I.sorrow} Spiritual tragedy`], "This is the deepest loss in the chapter."),
    phrase(I.eye, "Put Out His Eyes", "the Philistines blind Samson after capturing him.", [`${I.eye} Blindness`, `${I.broken} Humiliation`, `${I.warning} Consequence made visible`], "The man led by his eyes is now judged through his eyes."),
  ]),
  section(16, 22, 26, "Samson Prays In Weakness", I.prayer, [
    phrase(I.seedling, "The Hair Of His Head Began To Grow Again", "a small detail quietly signals that Samson's story is not finished.", [`${I.seedling} Hair returning`, `${I.sorrow} Time in weakness`, `${I.prayer} Mercy still possible`], "The phrase does not erase Samson's fall, but it prepares the reader for God's final work."),
    phrase(I.idol, "Dagon Their God", "the Philistines give their idol credit for Samson's defeat.", [`${I.idol} False god`, `${I.battle} Philistine celebration`, `${I.prayer} The LORD's honor at stake`], "The story becomes more than Samson's shame. It becomes a question of whose god is truly powerful."),
    phrase(I.sorrow, "Make Us Sport", "the Philistines turn Samson into entertainment.", [`${I.sorrow} Mockery`, `${I.broken} Humiliation`, `${I.city} Public shame`], "The deliverer has become a prisoner put on display."),
    phrase(I.hand, "Suffer Me That I May Feel The Pillars", "Samson asks to touch the pillars that hold up the building.", [`${I.hand} Blind guidance`, `${I.house} Temple structure`, `${I.warning} Final moment forming`], "The request sets up the last act of Samson's life."),
  ]),
  section(16, 27, 31, "Samson Dies With The Philistines", I.battle, [
    phrase(I.house, "The House Was Full Of Men And Women", "the Philistine temple is crowded with people celebrating Samson's capture.", [`${I.house} Packed temple`, `${I.city} Public gathering`, `${I.warning} Judgment about to fall`], "The enemy gathers in one place, not knowing the scene is turning."),
    phrase(I.prayer, "O Lord GOD, Remember Me", "Samson finally cries to God from weakness instead of boasting in himself.", [`${I.prayer} Prayer`, `${I.sorrow} Weakness`, `${I.strength} Strength requested`], "His final strength begins with dependence."),
    phrase(I.strength, "Strengthen Me, I Pray Thee", "Samson asks God for strength one last time.", [`${I.strength} Power from God`, `${I.prayer} Humble request`, `${I.battle} Final blow`], "The phrase reminds the reader that Samson's true strength was never independent."),
    phrase(I.fire, "The House Fell Upon The Lords", "the temple collapses on the Philistine rulers and crowd.", [`${I.fire} Collapse`, `${I.battle} Judgment`, `${I.sorrow} Costly deliverance`], "Samson's death strikes the Philistines more deeply than his life had."),
  ]),
  section(17, 1, 6, "Micah Makes An Image", I.idol, [
    phrase(I.money, "Eleven Hundred Shekels Of Silver", "stolen money becomes part of a corrupt worship story.", [`${I.money} Silver`, `${I.house} Family trouble`, `${I.warning} Worship confusion`], "The same amount offered to Delilah now appears in another story of spiritual disorder."),
    phrase(I.scroll, "I Had Wholly Dedicated The Silver Unto The LORD", "Micah's mother uses religious language for something God had forbidden.", [`${I.scroll} Religious words`, `${I.idol} Idol money`, `${I.warning} Misguided devotion`], "The phrase teaches that sincere-sounding words do not make disobedience holy."),
    phrase(I.idol, "A Graven Image And A Molten Image", "the silver becomes an idol for private worship.", [`${I.idol} Image`, `${I.fire} Metal work`, `${I.warning} Forbidden worship`], "Israel is acting like the nations instead of worshiping the LORD as He commanded."),
    phrase(I.crown, "Every Man Did That Which Was Right In His Own Eyes", "people are following personal desire instead of God's word.", [`${I.eye} Own eyes`, `${I.crown} No king`, `${I.broken} Moral collapse`], "The line explains the spiritual atmosphere of Judges."),
  ]),
  section(17, 7, 10, "A Levite Comes To Micah", I.priest, [
    phrase(I.priest, "A Young Man Out Of Bethlehemjudah", "a Levite is wandering instead of serving in stable covenant order.", [`${I.priest} Levite`, `${I.map} Bethlehemjudah`, `${I.warning} Worship instability`], "The detail shows worship leadership has become unsettled."),
    phrase(I.map, "To Sojourn Where He Could Find A Place", "the Levite is looking for somewhere to live and work.", [`${I.map} Wandering`, `${I.house} Looking for a place`, `${I.warning} Disordered service`], "His movement sets him up to be hired into corrupt worship."),
    phrase(I.house, "Dwell With Me", "Micah invites the Levite into his private religious setup.", [`${I.house} Household shrine`, `${I.priest} Priest for hire`, `${I.warning} Private religion`], "Micah is building worship around himself."),
    phrase(I.priest, "Be Unto Me A Father And A Priest", "Micah wants religious legitimacy for his shrine.", [`${I.priest} Priestly role`, `${I.house} Private house`, `${I.warning} Wrong foundation`], "People can seek religious approval without true obedience."),
  ]),
  section(17, 11, 13, "Micah Feels Religious Confidence", I.house, [
    phrase(I.hand, "The Levite Was Content To Dwell With The Man", "the Levite accepts Micah's offer and settles into the household shrine.", [`${I.hand} Agreement`, `${I.house} Micah's house`, `${I.priest} Hired priest`], "The priest's contentment does not make the worship right."),
    phrase(I.baby, "The Young Man Was Unto Him As One Of His Sons", "Micah treats the Levite like family while using him for religious status.", [`${I.baby} Family language`, `${I.house} Household religion`, `${I.warning} False comfort`], "The relationship feels close, but the worship remains corrupt."),
    phrase(I.priest, "Micah Consecrated The Levite", "Micah appoints the Levite to serve as priest in his private shrine.", [`${I.priest} Consecrated`, `${I.idol} Shrine service`, `${I.warning} Human appointment`], "The word sounds holy, but the whole arrangement is out of order."),
    phrase(I.question, "Now Know I That The LORD Will Do Me Good", "Micah assumes the LORD will bless him because he has a Levite.", [`${I.question} False confidence`, `${I.prayer} God-language`, `${I.idol} Corrupt worship`], "This is religious self-deception."),
  ]),
  section(18, 1, 6, "Dan Searches For Land", I.map, [
    phrase(I.map, "The Danites Sought Them An Inheritance", "Dan has not settled fully into its assigned inheritance.", [`${I.map} Searching`, `${I.house} Land needed`, `${I.warning} Unsettled tribe`], "The tribe's search shows incomplete obedience and instability."),
    phrase(I.eye, "Five Men From Their Coasts", "Dan sends spies to search out the land.", [`${I.eye} Spies`, `${I.map} Exploration`, `${I.battle} Tribal plan`], "The phrase introduces the men who will connect Dan's search to Micah's shrine."),
    phrase(I.house, "They Came To Mount Ephraim", "the spies arrive near Micah's house.", [`${I.map} Mount Ephraim`, `${I.house} Micah's home`, `${I.warning} Stories connect`], "The land search now crosses paths with corrupt worship."),
    phrase(I.question, "Ask Counsel, We Pray Thee, Of God", "the spies ask for religious guidance from a compromised place.", [`${I.question} Seeking direction`, `${I.priest} Hired priest`, `${I.warning} Bad source`], "The request sounds spiritual, but the source is already corrupt."),
  ]),
  section(18, 7, 10, "Laish Looks Easy To Take", I.city, [
    phrase(I.city, "The People That Were Therein Dwelt Careless", "Laish appears secure and unguarded.", [`${I.city} Laish`, `${I.eye} Spies observing`, `${I.warning} Vulnerable people`], "The spies see opportunity, not covenant faithfulness."),
    phrase(I.hand, "There Was No Magistrate In The Land", "A magistrate is a ruler or official with power to restrain trouble. Laish has no nearby authority to protect it.", [`${I.hand} No ruler nearby`, `${I.city} Isolated city`, `${I.battle} Easy target`], "That weakness is why Dan thinks the city can be taken."),
    phrase(I.grain, "A Place Where There Is No Want", "the land appears rich and supplied.", [`${I.grain} Plenty`, `${I.map} Good land`, `${I.eye} Attractive target`], "Dan is drawn by ease and abundance."),
    phrase(I.battle, "God Hath Given It Into Your Hands", "the spies use God-language to encourage the attack.", [`${I.battle} Confidence`, `${I.prayer} Religious claim`, `${I.warning} Troubled discernment`], "The words sound faithful, but the surrounding story is morally dark."),
  ]),
  section(18, 11, 15, "Dan Approaches Micah's House", I.house, [
    phrase(I.battle, "Six Hundred Men Appointed With Weapons Of War", "Dan moves as an armed force.", [`${I.battle} Soldiers`, `${I.shield} Weapons`, `${I.warning} Force ready`], "The tribe's search has become a military movement."),
    phrase(I.map, "Kirjathjearim, In Judah", "the journey is located in real places within Israel.", [`${I.map} Real geography`, `${I.city} Camp location`, `${I.book} History grounded`], "The detail reminds the reader this is not a vague legend."),
    phrase(I.house, "By The House Of Micah", "Dan returns to the place where the idol and Levite are located.", [`${I.house} Micah's house`, `${I.idol} Shrine nearby`, `${I.warning} Corruption spreads`], "Micah's private sin is about to affect a whole tribe."),
    phrase(I.eye, "Know Ye That There Is In These Houses", "the spies reveal what they found earlier.", [`${I.eye} Remembered discovery`, `${I.idol} Religious objects`, `${I.battle} Planned theft`], "The theft is clearly deliberate."),
  ]),
  section(18, 16, 20, "Dan Steals Micah's Worship", I.idol, [
    phrase(I.hand, "The Five Men Went In Thither", "the spies enter Micah's shrine area to take the objects.", [`${I.hand} Entering`, `${I.idol} Idol objects`, `${I.warning} Theft begins`], "The action turns knowledge into sin."),
    phrase(I.idol, "Took The Graven Image", "Dan steals the idol Micah wrongly made.", [`${I.idol} Stolen image`, `${I.hand} Taking`, `${I.warning} Corrupt worship copied`], "False worship is now moving from one house to a whole tribe."),
    phrase(I.question, "What Do Ye", "the priest questions what the men are doing.", [`${I.question} A challenge`, `${I.priest} Priest watching`, `${I.warning} Wrong exposed`], "Even in a corrupt scene, the action is clearly suspicious."),
    phrase(I.sorrow, "The Priest's Heart Was Glad", "the Levite is happy to trade Micah's house for a larger role with Dan.", [`${I.sorrow} Gladness in corruption`, `${I.priest} Better position`, `${I.warning} Ambition over faithfulness`], "The priest cares more about opportunity than obedience."),
  ]),
  section(18, 21, 26, "Micah Loses His Gods", I.broken, [
    phrase(I.broken, "The Little Ones And The Cattle And The Carriage", "The line lists Dan's children, livestock, and baggage moving together in one organized migration.", [`${I.baby} Families`, `${I.grain} Possessions`, `${I.warning} Armed movement`], "The detail makes the tribal migration feel large and organized."),
    phrase(I.question, "What Aileth Thee", "Aileth means troubles you. Dan is asking Micah why he is upset after taking his gods and priest.", [`${I.question} Confrontation`, `${I.idol} Stolen gods`, `${I.warning} Moral blindness`], "The question exposes how upside down the whole scene has become."),
    phrase(I.idol, "Ye Have Taken Away My Gods", "Micah admits his gods can be stolen.", [`${I.idol} Weak gods`, `${I.broken} Loss`, `${I.warning} False worship exposed`], "The phrase almost mocks idolatry. A god that can be stolen cannot save."),
    phrase(I.hand, "Thou Gatheredst Them Together", "Micah cannot recover what was taken because Dan is stronger.", [`${I.hand} Small force`, `${I.battle} Stronger tribe`, `${I.broken} Helpless anger`], "Human-made religion leaves Micah powerless."),
  ]),
  section(18, 27, 31, "Dan Sets Up The Image", I.idol, [
    phrase(I.city, "They Smote Them With The Edge Of The Sword", "Dan conquers Laish with violence.", [`${I.battle} Attack`, `${I.city} City taken`, `${I.fire} Burning`], "The tribe gains a city, but the story is still spiritually troubling."),
    phrase(I.map, "Called The Name Of The City Dan", "the captured city is renamed after the tribe.", [`${I.city} New name`, `${I.map} Tribal identity`, `${I.book} Lasting memory`], "The name marks Dan's new settlement."),
    phrase(I.idol, "The Children Of Dan Set Up The Graven Image", "the tribe makes Micah's idol part of its worship.", [`${I.idol} Idol installed`, `${I.priest} False priesthood`, `${I.warning} Tribal corruption`], "Private disobedience has become public worship."),
    phrase(I.altar, "All The Time That The House Of God Was In Shiloh", "the false shrine exists while the true worship center remains at Shiloh.", [`${I.altar} Shiloh`, `${I.idol} Rival worship`, `${I.warning} Divided loyalty`], "Dan has drifted far from the LORD's appointed worship."),
  ]),
  section(19, 1, 6, "A Levite And His Concubine", I.broken, [
    phrase(I.crown, "There Was No King In Israel", "the story happens in a time of moral disorder.", [`${I.crown} No king`, `${I.warning} No shared obedience`, `${I.broken} Dark chapter ahead`], "This opening prepares the reader for one of Judges' most painful scenes."),
    phrase(I.priest, "A Certain Levite Sojourning", "A Levite was a man from Israel's priestly tribe. Here he is living as a traveler instead of serving in stable covenant order.", [`${I.priest} Levite`, `${I.map} Sojourning`, `${I.warning} Worship disorder`], "The repeated Levite detail keeps showing Israel's spiritual instability."),
    phrase(I.broken, "His Concubine Played The Whore Against Him", "A concubine was a secondary wife. The line says this relationship had become sexually unfaithful and broken.", [`${I.broken} Broken household`, `${I.sorrow} Shame`, `${I.warning} Human disorder`], "The phrase introduces family fracture before national fracture appears."),
    phrase(I.house, "His Father In Law Detained Him", "hospitality delays the Levite from leaving.", [`${I.house} Hospitality`, `${I.hand} Delay`, `${I.warning} Journey postponed`], "The repeated delays set up the dangerous night journey."),
  ]),
  section(19, 7, 12, "The Journey Turns Dangerous", I.warning, [
    phrase(I.sorrow, "The Day Draweth Toward Evening", "the journey is moving into night, when travel is more dangerous.", [`${I.sorrow} Evening`, `${I.map} Travel`, `${I.warning} Risk rising`], "The timing increases the tension of the story."),
    phrase(I.city, "Jebus, Which Is Jerusalem", "the travelers come near a city not yet fully identified with Israel's later capital.", [`${I.city} Jebus`, `${I.map} Jerusalem`, `${I.book} Future significance`], "The place name helps readers connect Judges to the larger Bible story."),
    phrase(I.hand, "We Will Not Turn Aside Hither", "the Levite refuses to stay in a foreign city.", [`${I.hand} Refusal`, `${I.city} Jebus avoided`, `${I.warning} Dangerous choice ahead`], "The irony is painful: he avoids outsiders but finds wickedness inside Israel."),
    phrase(I.city, "We Will Pass Over To Gibeah", "the group chooses an Israelite town for the night.", [`${I.city} Gibeah`, `${I.map} Benjamin`, `${I.warning} False safety`], "The choice should feel safer, but the story proves Israel itself is deeply corrupt."),
  ]),
  section(19, 13, 18, "No One Takes Them In", I.house, [
    phrase(I.city, "They Sat Them Down In A Street Of The City", "the travelers are left exposed in the open square.", [`${I.city} City street`, `${I.sorrow} No shelter`, `${I.warning} Vulnerable night`], "Hospitality failure becomes the first sign of Gibeah's darkness."),
    phrase(I.house, "There Was No Man That Took Them Into His House", "No one in the city offers the travelers a house, which means no one gives them the shelter and protection hospitality was supposed to provide.", [`${I.house} No host`, `${I.broken} Community failure`, `${I.warning} Danger growing`], "The city is showing itself to be without compassion or responsibility."),
    phrase(I.eye, "An Old Man Came From His Work", "an outsider in Gibeah becomes the only person willing to help.", [`${I.eye} Old man`, `${I.hand} Work field`, `${I.house} Possible shelter`], "The one who helps is not from the city itself."),
    phrase(I.grain, "There Is Both Straw And Provender", "the Levite says they have supplies but need shelter.", [`${I.grain} Supplies`, `${I.house} Need lodging`, `${I.warning} Protection needed`], "The issue is not food. It is safety."),
  ]),
  section(19, 19, 24, "Gibeah Shows Its Evil", I.warning, [
    phrase(I.house, "Peace Be With Thee", "the old man offers welcome and protection.", [`${I.house} Hospitality`, `${I.hand} Shelter`, `${I.sorrow} Brief peace`], "His words are the opposite of the city's violence."),
    phrase(I.broken, "Sons Of Belial", "the men of Gibeah are described as worthless and wicked.", [`${I.broken} Wicked men`, `${I.warning} Moral corruption`, `${I.city} Gibeah exposed`], "The phrase signals deep evil, not ordinary conflict."),
    phrase(I.door, "Beat At The Door", "the crowd surrounds the house and threatens the guests.", [`${I.door} Door under attack`, `${I.warning} Violence`, `${I.sorrow} Terror`], "The door becomes the fragile line between shelter and evil."),
    phrase(I.warning, "Do Not This Folly", "the old man names the act as shameful wickedness.", [`${I.warning} Folly`, `${I.judge} Moral judgment`, `${I.broken} Evil named`], "The story itself is condemning what is happening."),
  ]),
  section(19, 25, 30, "Israel Is Shocked", I.sorrow, [
    phrase(I.sorrow, "The Men Would Not Hearken To Him", "the crowd refuses correction.", [`${I.sorrow} Refusal`, `${I.warning} Hardened evil`, `${I.broken} No restraint`], "Wickedness is pushing past warning."),
    phrase(I.broken, "The Woman Fell Down At The Door", "the woman is found at the threshold after horrific violence.", [`${I.broken} Tragedy`, `${I.door} Doorway`, `${I.sorrow} Human suffering`], "The wording forces the reader to face the human cost of Israel's collapse."),
    phrase(I.hand, "He Took A Knife", "the Levite sends the evidence of the crime throughout Israel.", [`${I.hand} Shocking action`, `${I.map} Message sent`, `${I.warning} Nation summoned`], "The action is disturbing because the national sin is disturbing."),
    phrase(I.question, "Consider Of It, Take Advice, And Speak Your Minds", "Israel is called to respond to the evil that has happened.", [`${I.question} Consider`, `${I.judge} Take counsel`, `${I.hand} Speak`], "The phrase turns private horror into a national crisis."),
  ]),
  section(20, 1, 6, "Israel Gathers Against Gibeah", I.judge, [
    phrase(I.map, "From Dan Even To Beersheba", "This is a way of saying people came from one end of Israel to the other.", [`${I.map} Whole land`, `${I.hand} Gathering`, `${I.judge} National response`], "Gibeah's sin has become a matter for the whole nation."),
    phrase(I.hand, "The Congregation Was Gathered Together As One Man", "The tribes are acting in unusual unity, with the people assembled as one body.", [`${I.hand} Unity`, `${I.judge} Assembly`, `${I.warning} Serious moment`], "Israel is finally treating the evil at Gibeah as everybody's concern."),
    phrase(I.question, "Tell Us, How Was This Wickedness", "The assembly is asking for a full account of what happened before passing judgment.", [`${I.question} Testimony`, `${I.judge} Judgment`, `${I.broken} Evil examined`], "Justice begins by hearing the matter clearly."),
    phrase(I.fire, "They Have Committed Lewdness And Folly In Israel", "Lewdness and folly here mean shameful sexual sin and outrageous wickedness among God's people.", [`${I.fire} Evil named`, `${I.city} In Israel`, `${I.judge} Accountability`], "The crime is being named plainly, not softened."),
  ]),
  section(20, 7, 12, "Israel Demands Justice", I.scroll, [
    phrase(I.hand, "Ye Are All Children Of Israel", "The appeal is based on shared covenant identity. They all belong to the same people.", [`${I.hand} One people`, `${I.book} Shared identity`, `${I.judge} Shared responsibility`], "Israel cannot treat the evil as only Benjamin's problem."),
    phrase(I.battle, "We Will Go Up By Lot Against It", "Israel is using the lot to organize who will go up first against Gibeah.", [`${I.battle} War plan`, `${I.question} Lot`, `${I.judge} Collective action`], "The nation is moving from outrage to organized action."),
    phrase(I.scroll, "What Wickedness Is This", "The message to Benjamin is asking how such an evil thing could be allowed among them.", [`${I.scroll} Message`, `${I.warning} Wickedness`, `${I.judge} Demand for justice`], "Benjamin is being confronted with the moral issue, not just a political dispute."),
    phrase(I.hand, "Deliver Us The Men", "Israel is demanding that the guilty men of Gibeah be handed over for punishment.", [`${I.hand} Surrender`, `${I.judge} Justice`, `${I.warning} Test for Benjamin`], "Benjamin is being given a chance to side with justice."),
  ]),
  section(20, 13, 18, "Benjamin Chooses War", I.battle, [
    phrase(I.warning, "Benjamin Would Not Hearken", "Benjamin refuses to listen or obey when the other tribes call for justice.", [`${I.warning} Refusal`, `${I.hand} Tribal loyalty`, `${I.broken} Hardened response`], "Protecting guilty men pulls the whole tribe deeper into the wrong."),
    phrase(I.battle, "Went Out To Battle Against The Children Of Israel", "Benjamin chooses to fight the rest of Israel instead of giving up the wicked men.", [`${I.battle} Civil war`, `${I.broken} Brother against brother`, `${I.sorrow} National fracture`], "A matter of justice becomes a civil war."),
    phrase(I.strength, "Seven Hundred Chosen Men Lefthanded", "These are select warriors whose left-handed skill makes them dangerous in battle.", [`${I.strength} Elite warriors`, `${I.eye} Left-handed skill`, `${I.battle} Dangerous force`], "Military skill does not make Benjamin's cause righteous."),
    phrase(I.prayer, "Which Of Us Shall Go Up First", "Israel asks the LORD which tribe should lead the first attack.", [`${I.prayer} Inquiry`, `${I.battle} Battle order`, `${I.judge} Seeking direction`], "Even in war, they still need God's direction."),
  ]),
  section(20, 19, 23, "Israel Suffers Heavy Loss", I.sorrow, [
    phrase(I.battle, "The Children Of Benjamin Came Forth Out Of Gibeah", "Benjamin marches out from Gibeah to fight for the city instead of yielding it for judgment.", [`${I.battle} Benjamin attacks`, `${I.city} Gibeah`, `${I.sorrow} Civil bloodshed`], "The city under accusation becomes the center of the war."),
    phrase(I.sorrow, "Destroyed Down To The Ground Of The Israelites", "This means large numbers of Israelites are struck down in battle.", [`${I.sorrow} Heavy loss`, `${I.battle} Defeat`, `${I.question} Hard providence`], "The tribes are learning that a just complaint does not spare them from suffering."),
    phrase(I.prayer, "Encouraged Themselves", "The surviving soldiers strengthen their courage and prepare to fight again.", [`${I.prayer} Courage renewed`, `${I.battle} Return to battle`, `${I.sorrow} Grief remains`], "They do not quit even after painful loss."),
    phrase(I.sorrow, "Destroyed Down To The Ground Again", "A second defeat means the same crushing loss happens again.", [`${I.sorrow} More death`, `${I.battle} Civil war cost`, `${I.warning} Sobering judgment`], "The repeated bloodshed shows how terrible this civil war has become."),
  ]),
  section(20, 24, 29, "Israel Weeps Before The LORD", I.prayer, [
    phrase(I.sorrow, "Went Up, And Came Unto The House Of God", "Israel brings the crisis before the LORD.", [`${I.sorrow} Grief`, `${I.altar} House of God`, `${I.prayer} Seeking God`], "The battle finally drives them into deeper dependence."),
    phrase(I.prayer, "Fasted That Day Until Even", "Israel humbles itself before God.", [`${I.prayer} Fasting`, `${I.sorrow} Mourning`, `${I.judge} Serious judgment`], "This is grief, not celebration."),
    phrase(I.priest, "Phinehas, The Son Of Eleazar", "Phinehas is being named as the priest serving in this moment of inquiry before the LORD.", [`${I.priest} Priest`, `${I.book} Covenant memory`, `${I.prayer} Seeking the LORD`], "The detail ties this dark scene back to worship and covenant order."),
    phrase(I.battle, "I Will Deliver Them Into Thine Hand", "The LORD is promising that Benjamin will now be handed over in defeat.", [`${I.battle} Coming victory`, `${I.hand} Delivered into hand`, `${I.judge} God judges`], "The outcome belongs to the LORD, not Israel's raw strength."),
  ]),
  section(20, 30, 35, "The LORD Smites Benjamin", I.battle, [
    phrase(I.battle, "The Children Of Benjamin Went Out Against The People", "Benjamin still thinks the battle is going its way.", [`${I.battle} Benjamin attacks`, `${I.eye} Confidence`, `${I.warning} Trap forming`], "The phrase sets up the reversal about to happen."),
    phrase(I.eye, "They Began To Smite Of The People", "Benjamin sees early success and follows the bait.", [`${I.eye} Early success`, `${I.battle} Battle movement`, `${I.warning} False confidence`], "The first appearance of victory pulls them away from safety."),
    phrase(I.hand, "Let Us Flee", "Israel uses retreat as a strategy.", [`${I.hand} Planned retreat`, `${I.map} Away from city`, `${I.battle} Ambush setup`], "Apparent weakness can be part of a wise battle plan."),
    phrase(I.battle, "The LORD Smote Benjamin Before Israel", "The defeat of Benjamin is credited to the LORD, not merely to Israel's military plan.", [`${I.battle} Benjamin defeated`, `${I.hand} The LORD's hand`, `${I.judge} Judgment`], "The phrase keeps the outcome under God's authority."),
  ]),
  section(20, 36, 38, "The Ambush Is Set", I.eye, [
    phrase(I.eye, "Let Us Flee, And Draw Them From The City", "Israel uses a planned retreat to lure Benjamin away.", [`${I.eye} Strategy`, `${I.city} City exposed`, `${I.battle} Ambush`], "The battle turns here through wisdom and timing."),
    phrase(I.battle, "The Liars In Wait Hasted", "The men hiding in ambush move quickly at the right moment.", [`${I.battle} Hidden fighters`, `${I.hand} Sudden movement`, `${I.warning} Judgment closing in`], "Benjamin does not see the danger forming behind them."),
    phrase(I.fire, "A Great Flame With Smoke", "The rising smoke from the city is the signal that the ambush has succeeded.", [`${I.fire} Smoke`, `${I.city} City burning`, `${I.eye} Sign seen`], "The phrase marks the moment the trap is revealed."),
    phrase(I.city, "The City Ascended Up To Heaven", "Gibeah burns with smoke rising high.", [`${I.city} Gibeah`, `${I.fire} Burning`, `${I.judge} Judgment visible`], "The visible smoke tells Benjamin their place of confidence is gone."),
  ]),
  section(20, 39, 43, "Benjamin Is Surrounded", I.sorrow, [
    phrase(I.sorrow, "They Were Amazed", "Benjamin is shocked when the battle turns.", [`${I.sorrow} Panic`, `${I.battle} Battle reversed`, `${I.fire} City lost`], "The phrase captures the sudden collapse of confidence."),
    phrase(I.map, "Turned Their Backs Before The Men Of Israel", "Benjamin flees from the fight.", [`${I.map} Flight`, `${I.battle} Defeat`, `${I.sorrow} Tribe broken`], "The tribe that refused correction now runs from judgment."),
    phrase(I.shield, "Six Hundred Men Turned And Fled", "Only six hundred men escape, leaving Benjamin with a tiny remnant.", [`${I.shield} Remnant`, `${I.map} Rock of Rimmon`, `${I.sorrow} Near destruction`], "The number shows how close Benjamin comes to being wiped out."),
    phrase(I.fire, "Set On Fire All The Cities", "Israel destroys Benjamin's cities after the battle.", [`${I.fire} Cities burned`, `${I.sorrow} Civil ruin`, `${I.warning} Bitter ending`], "The victory leaves a smoking wound inside Israel itself."),
  ]),
  section(20, 44, 48, "Benjamin Is Nearly Destroyed", I.fire, [
    phrase(I.sorrow, "There Fell Of Benjamin Eighteen Thousand Men", "Eighteen thousand Benjamite soldiers fall, showing how devastating the defeat has become.", [`${I.sorrow} Heavy loss`, `${I.battle} Civil war`, `${I.warning} Cost of sin`], "The number makes the national tragedy impossible to ignore."),
    phrase(I.shield, "Six Hundred Men Turned And Fled", "Only a small remnant of Benjamin escapes from the tribe.", [`${I.shield} Remnant`, `${I.map} Wilderness`, `${I.sorrow} Tribe nearly gone`], "Benjamin is now on the edge of disappearance."),
    phrase(I.map, "Unto The Rock Rimmon", "The survivors flee to a place called the rock of Rimmon and hide there.", [`${I.map} Rock Rimmon`, `${I.shield} Refuge`, `${I.sorrow} Exile-like hiding`], "The place becomes a shelter after devastating judgment."),
    phrase(I.fire, "Set On Fire All The Cities", "The burning spreads through Benjamin's remaining towns after the battle is already decided.", [`${I.fire} Cities burned`, `${I.sorrow} Civil ruin`, `${I.warning} Bitter ending`], "The destruction keeps going even after the fighting has effectively been settled."),
  ]),
  section(21, 1, 4, "Israel Weeps For Benjamin", I.sorrow, [
    phrase(I.scroll, "Had Sworn In Mizpeh", "Israel's earlier oath now creates another crisis.", [`${I.scroll} Oath`, `${I.map} Mizpeh`, `${I.warning} Consequences`], "Words spoken in zeal can create painful problems later."),
    phrase(I.sorrow, "Lifted Up Their Voices, And Wept Sore", "Israel mourns deeply after the war.", [`${I.sorrow} Weeping`, `${I.hand} Whole people`, `${I.broken} Brother tribe wounded`], "Victory over evil has still left sorrow."),
    phrase(I.question, "Why Is This Come To Pass In Israel", "The people are asking why Israel has come to the point where one tribe is almost gone.", [`${I.question} Lament`, `${I.sorrow} Confusion`, `${I.prayer} Before God`], "The question shows grief over national fracture."),
    phrase(I.altar, "Built There An Altar", "Israel responds to the crisis with worship and offerings.", [`${I.altar} Altar`, `${I.prayer} Seeking God`, `${I.sorrow} Grief brought to worship`], "Sorrow is turning toward the LORD here."),
  ]),
  section(21, 5, 7, "Israel Searches For A Missing City", I.question, [
    phrase(I.question, "Who Is There Among All The Tribes", "Israel searches for any group missing from the assembly.", [`${I.question} Investigation`, `${I.hand} Tribes counted`, `${I.judge} Oath enforced`], "The question leads to another severe action."),
    phrase(I.city, "There Came None To The Camp From Jabeshgilead", "No men from Jabeshgilead had come to the national assembly at Mizpeh.", [`${I.city} Jabeshgilead`, `${I.warning} Missing tribe-city`, `${I.judge} Consequence`], "Their absence now becomes part of the crisis."),
    phrase(I.battle, "Go And Smite The Inhabitants", "Israel decides to attack Jabeshgilead because the city did not come under the oath-bound assembly.", [`${I.battle} Sword`, `${I.sorrow} More death`, `${I.warning} Broken wisdom`], "A rash oath is leading to more killing."),
    phrase(I.baby, "Four Hundred Young Virgins", "Four hundred unmarried young women are spared and taken to become wives for Benjamin.", [`${I.baby} Young women`, `${I.hand} Taken`, `${I.sorrow} Human cost`], "The plan preserves Benjamin, but it does so at great human cost."),
  ]),
  section(21, 8, 12, "Jabeshgilead Becomes Part Of The Crisis", I.city, [
    phrase(I.city, "There Came None To The Camp From Jabeshgilead", "The earlier report about Jabeshgilead's absence is now being used to justify action against the city.", [`${I.city} Jabeshgilead`, `${I.warning} Missing city`, `${I.judge} Oath enforced`], "Israel is treating absence from the assembly as a capital offense."),
    phrase(I.battle, "Go And Smite The Inhabitants", "The order is to kill the inhabitants of Jabeshgilead and spare only the women needed for Benjamin.", [`${I.battle} Sword`, `${I.sorrow} More death`, `${I.warning} Broken wisdom`], "They are trying to solve one disaster by creating another."),
    phrase(I.baby, "Four Hundred Young Virgins", "The number tells how many young women are left alive to supply wives for Benjamin.", [`${I.baby} Young women`, `${I.hand} Taken`, `${I.sorrow} Human cost`], "The count makes the cost feel painfully concrete."),
    phrase(I.hand, "Brought Them Unto The Camp To Shiloh", "The women are taken to Israel's camp at Shiloh, where the nation is gathered.", [`${I.hand} Brought to camp`, `${I.altar} Shiloh`, `${I.broken} Painful solution`], "Even at a worship center, Israel is still living with the consequences of its disorder."),
  ]),
  section(21, 13, 18, "Benjamin Is Preserved", I.hand, [
    phrase(I.hand, "Called Peaceably Unto Them", "Israel calls the surviving Benjamites back from hiding.", [`${I.hand} Peace offered`, `${I.shield} Survivors`, `${I.sorrow} War aftermath`], "The phrase begins a fragile attempt to preserve the tribe."),
    phrase(I.sorrow, "The People Repented Them For Benjamin", "Israel feels grief and regret over Benjamin's near destruction.", [`${I.sorrow} Regret`, `${I.broken} Brother tribe`, `${I.prayer} Mercy needed`], "The nation is finally feeling the wound it created inside itself."),
    phrase(I.broken, "The LORD Had Made A Breach", "Benjamin's loss is described as a gap in Israel.", [`${I.broken} Breach`, `${I.hand} Tribe missing`, `${I.prayer} The LORD named`], "The people see the tribe's danger as a wound in the covenant community."),
    phrase(I.question, "How Shall We Do For Wives", "Israel still has not solved Benjamin's future.", [`${I.question} Unsolved problem`, `${I.baby} Future families`, `${I.warning} Oath complications`], "The question shows how one foolish oath can keep creating trouble."),
  ]),
  section(21, 19, 22, "A Troubling Plan At Shiloh", I.altar, [
    phrase(I.altar, "A Feast Of The LORD In Shiloh", "This is a religious feast at Shiloh, the place associated with worship before the LORD.", [`${I.altar} Shiloh`, `${I.prayer} Feast`, `${I.warning} Misused setting`], "The holy setting makes the plan's moral confusion even harder to ignore."),
    phrase(I.eye, "Catch You Every Man His Wife", "Benjamin is told to seize a wife for himself from the women who come out to dance.", [`${I.eye} Ambush-like plan`, `${I.baby} Women affected`, `${I.warning} Disorder`], "Israel is preserving a tribe by a plan that still ignores what is right."),
    phrase(I.crown, "In Those Days There Was No King In Israel", "The line means Israel had no righteous leadership to restrain this kind of disorder.", [`${I.crown} No king`, `${I.warning} No order`, `${I.book} Book summary`], "The book keeps tracing the nation's chaos back to failed rule."),
    phrase(I.eye, "Every Man Did That Which Was Right In His Own Eyes", "People were deciding for themselves what seemed right instead of submitting to God's standard.", [`${I.eye} Own eyes`, `${I.broken} Moral collapse`, `${I.prayer} Need for God's rule`], "That is why even their attempted solutions keep turning crooked."),
  ]),
  section(21, 23, 25, "Judges Ends Without A King", I.crown, [
    phrase(I.hand, "The Children Of Benjamin Did So", "Benjamin carries out the plan and takes the wives provided through Israel's scheme.", [`${I.hand} Action taken`, `${I.people} Benjamin preserved`, `${I.warning} Troubled method`], "The tribe survives, but the method stays morally troubled."),
    phrase(I.house, "Returned Unto Their Inheritance", "The surviving Benjamites go back to their tribal land and begin rebuilding there.", [`${I.house} Inheritance`, `${I.seedling} Survival`, `${I.sorrow} After civil war`], "Benjamin is preserved after coming close to extinction."),
    phrase(I.crown, "In Those Days There Was No King In Israel", "The book ends by reminding the reader that Israel lacked faithful leadership.", [`${I.crown} No king`, `${I.warning} No order`, `${I.book} Book summary`], "The ending leaves a clear need for better rule under God."),
    phrase(I.eye, "Every Man Did That Which Was Right In His Own Eyes", "Each person was following his own judgment instead of God's commands.", [`${I.eye} Own eyes`, `${I.broken} Moral collapse`, `${I.prayer} Need for God's rule`], "Judges closes by naming the root problem behind the whole book."),
  ]),
  ...DAY_61_80_JUDGES_16_21_SUPPLEMENTAL_SECTIONS.filter((section) => section.chapter < 16 || section.chapter > 21),
];
