import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";
import { DAY_61_80_RUTH_1_4_SUPPLEMENTAL_SECTIONS } from "./daySixtyOneToEightySupplementalPersonalNotes";

const e = (...codes: number[]) => String.fromCodePoint(...codes);

const I = {
  barley: e(0x1F33E),
  baby: e(0x1F476),
  blessing: e(0x1F64C),
  city: e(0x1F3D9, 0xFE0F),
  cloak: e(0x1F9E5),
  crown: e(0x1F451),
  door: e(0x1F6AA),
  family: e(0x1F46A),
  field: e(0x1F33E),
  foot: e(0x1F463),
  gate: e(0x1F6AA),
  hand: e(0x270B),
  heart: e(0x1F49B),
  home: e(0x1F3E0),
  law: e(0x1F4DC),
  mourning: e(0x1F622),
  people: e(0x1F465),
  promise: e(0x1F91D),
  question: e(0x2753),
  rest: e(0x1F6CF, 0xFE0F),
  sandal: e(0x1FA74),
  seed: e(0x1F331),
  shield: e(0x1F6E1, 0xFE0F),
  warning: e(0x26A0, 0xFE0F),
  woman: e(0x1F469),
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

function section(chapter: number, startVerse: number, endVerse: number, title: string, icon: string, phrases: Array<[string, string]>): PersonalLeviticusPhraseSectionInput {
  return {
    chapter,
    startVerse,
    endVerse,
    reference: `Ruth ${chapter}:${startVerse}-${endVerse}`,
    title,
    icon,
    phrases,
  };
}

export const RUTH_1_4_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = [
  section(1, 1, 5, "Famine And Loss", I.mourning, [
    phrase(I.law, "In The Days When The Judges Ruled", "This story takes place during the same troubled time described in the book of Judges.", [`${I.law} Judges background`, `${I.city} Israel's disorder`, `${I.heart} Quiet faith still possible`], "Ruth begins in a dark period, which makes its faithfulness stand out more."),
    phrase(I.barley, "There Was A Famine In The Land", "A famine means there is not enough food in the land because the crops have failed.", [`${I.barley} Hunger`, `${I.home} Family pressure`, `${I.foot} A journey begins`], "That lack of food is what pushes the family toward Moab."),
    phrase(I.foot, "Went To Sojourn In The Country Of Moab", "To sojourn means to live somewhere temporarily. Elimelech's family leaves Judah to stay in Moab for a time.", [`${I.foot} Leaving home`, `${I.city} Moab`, `${I.question} Uncertain future`], "The family is leaving home under pressure, not settling there as its true homeland."),
    phrase(I.mourning, "The Woman Was Left Of Her Two Sons And Her Husband", "Naomi is left alone after her husband and both sons die.", [`${I.mourning} Widowhood`, `${I.family} Sons gone`, `${I.hand} Vulnerability`], "Her loss explains why the story begins with so much weakness and sorrow."),
  ]),
  section(1, 6, 10, "Naomi Turns Back", I.foot, [
    phrase(I.foot, "She Arose With Her Daughters In Law", "Naomi begins the journey back with Ruth and Orpah.", [`${I.foot} Return begins`, `${I.woman} Widows together`, `${I.home} Homeward movement`], "The phrase starts the road scene where loyalty will be tested."),
    phrase(I.blessing, "The LORD Had Visited His People", "This means the LORD has shown care for His people by giving them food again.", [`${I.blessing} God visits`, `${I.barley} Bread returns`, `${I.people} His people helped`], "The return of food is being understood as God's mercy."),
    phrase(I.hand, "Deal Kindly With You", "Naomi prays that the LORD will show covenant kindness to her daughters-in-law.", [`${I.hand} Kindness`, `${I.promise} Loyal love`, `${I.home} Future hope`], "Kindness becomes one of the deepest themes in Ruth."),
    phrase(I.rest, "Find Rest, Each Of You In The House Of Her Husband", "Naomi wants the younger widows to have security and a future family.", [`${I.rest} Security`, `${I.home} Household protection`, `${I.heart} A mother's concern`], "Rest in Ruth is not laziness. It is settled safety."),
  ]),
  section(1, 11, 14, "Naomi Urges Them To Return", I.question, [
    phrase(I.question, "Turn Again, My Daughters", "Naomi is telling Ruth and Orpah to go back rather than keep following her.", [`${I.question} Hard choice`, `${I.foot} Two roads`, `${I.mourning} Grief speaking`], "She is trying to release them from a future she thinks will only bring more pain."),
    phrase(I.hand, "The Hand Of The LORD Is Gone Out Against Me", "Naomi believes the LORD has turned His hand against her and brought her suffering.", [`${I.hand} God's hand`, `${I.mourning} Bitter grief`, `${I.question} Struggling faith`], "The words are an honest expression of grief, not a calm theological speech."),
    phrase(I.heart, "Ruth Clave Unto Her", "Clave means clung closely. Ruth stays with Naomi instead of separating from her.", [`${I.heart} Loyalty`, `${I.woman} Ruth stays`, `${I.promise} Love holds on`], "Her loyalty is being shown in action, not only in words."),
    phrase(I.promise, "Thy People Shall Be My People, And Thy God My God", "Ruth is promising to join Naomi's people and worship Naomi's God instead of returning to Moab's life.", [`${I.people} New people`, `${I.blessing} The LORD`, `${I.promise} Loyal commitment`], "Her decision is both relational and spiritual."),
  ]),
  section(1, 15, 18, "Ruth Clings To Naomi", I.promise, [
    phrase(I.question, "Behold, Thy Sister In Law Is Gone Back", "Naomi is pointing out that Orpah has already returned, so Ruth can still do the same.", [`${I.question} Orpah returns`, `${I.foot} Two paths`, `${I.heart} Ruth must choose`], "The contrast makes Ruth's next words more weighty."),
    phrase(I.heart, "Ruth Clave Unto Her", "Ruth continues to cling to Naomi even after Naomi gives her another chance to leave.", [`${I.heart} Loyalty`, `${I.woman} Ruth's choice`, `${I.promise} Covenant-like love`], "Her commitment is tested and confirmed."),
    phrase(I.promise, "Thy People Shall Be My People, And Thy God My God", "Ruth openly binds her future to Naomi's nation and to the LORD whom Naomi worships.", [`${I.people} New people`, `${I.blessing} The LORD`, `${I.promise} Loyal commitment`], "She is choosing a new belonging, not just a new travel companion."),
    phrase(I.hand, "She Was Stedfastly Minded To Go With Her", "Stedfastly minded means Ruth's decision is fixed and will not be changed.", [`${I.hand} Firm decision`, `${I.foot} Going with Naomi`, `${I.promise} Loyalty proven`], "Naomi can see that Ruth has fully made up her mind."),
  ]),
  section(1, 19, 22, "Naomi Comes Back Empty", I.mourning, [
    phrase(I.city, "All The City Was Moved About Them", "The whole town is stirred up by Naomi's return and recognizes that something painful has happened.", [`${I.city} Bethlehem`, `${I.people} Community reaction`, `${I.mourning} Visible sorrow`], "Her sorrow is public, not hidden."),
    phrase(I.mourning, "Call Me Not Naomi, Call Me Mara", "Mara means bitter. Naomi is saying bitterness now fits her life better than pleasantness.", [`${I.mourning} Mara means bitter`, `${I.heart} Pain speaking`, `${I.question} Faith wrestling`], "She is renaming herself out of grief."),
    phrase(I.hand, "I Went Out Full, And The LORD Hath Brought Me Home Again Empty", "Naomi says she left with a full family but has come back bereaved and empty-handed.", [`${I.hand} Full before`, `${I.mourning} Empty now`, `${I.home} Back home`], "That is how she interprets her whole story at this point."),
    phrase(I.barley, "In The Beginning Of Barley Harvest", "Barley harvest is the season when grain is first being gathered, so food is beginning to return.", [`${I.barley} Harvest`, `${I.seed} New beginning`, `${I.blessing} Quiet hope`], "The timing quietly hints that emptiness will not be the final word."),
  ]),
  section(2, 1, 6, "Ruth Goes To Glean", I.field, [
    phrase(I.family, "A Mighty Man Of Wealth", "This means Boaz is a prominent man with property, resources, and social standing.", [`${I.family} Family connection`, `${I.field} Landowner`, `${I.shield} Ability to help`], "He has the position to become real help for Ruth and Naomi."),
    phrase(I.field, "Let Me Now Go To The Field", "Ruth asks to go out and work in the fields so she can gather food.", [`${I.field} Work`, `${I.hand} Humility`, `${I.heart} Care for Naomi`], "She does not sit still in sorrow. She goes to labor."),
    phrase(I.law, "Glean Ears Of Corn", "To glean ears of corn means to pick up stalks of grain left behind by the harvesters.", [`${I.barley} Leftover grain`, `${I.law} Provision in God's law`, `${I.hand} Dignified help`], "God's law allowed the poor to gather this leftover food."),
    phrase(I.blessing, "Her Hap Was To Light On A Part Of The Field Belonging Unto Boaz", "It looked like chance that Ruth arrived in Boaz's field, but the story shows God's quiet guidance behind it.", [`${I.foot} Ordinary steps`, `${I.field} Boaz's field`, `${I.blessing} Hidden providence`], "What seems accidental is becoming part of God's provision."),
  ]),
  section(2, 7, 7, "Ruth Works In The Field", I.hand, [
    phrase(I.hand, "I Pray You, Let Me Glean", "Ruth is politely asking permission to gather leftover grain.", [`${I.hand} Humble request`, `${I.barley} Gleaning`, `${I.woman} Vulnerable worker`], "Her need does not make her demanding. She asks with humility."),
    phrase(I.barley, "Gather After The Reapers", "She follows behind the official harvesters and picks up what they leave behind.", [`${I.barley} Leftover grain`, `${I.field} Harvest field`, `${I.law} Mercy in the law`], "That is how gleaning worked in ordinary field life."),
    phrase(I.foot, "She Came, And Hath Continued", "The overseer is saying Ruth has been there working steadily without quitting.", [`${I.foot} She came`, `${I.hand} Continued work`, `${I.heart} Faithful effort`], "The report highlights her diligence."),
    phrase(I.rest, "That She Tarried A Little In The House", "She has only paused briefly in the shelter area set aside for workers.", [`${I.rest} Short rest`, `${I.field} Long labor`, `${I.barley} Food for home`], "Most of her day has been spent working hard."),
  ]),
  section(2, 8, 13, "Boaz Shows Kindness", I.shield, [
    phrase(I.woman, "Hearest Thou Not, My Daughter", "Boaz speaks to Ruth gently and addresses her with warmth and care.", [`${I.woman} Daughter language`, `${I.shield} Safety`, `${I.hand} Kindness`], "A vulnerable foreign widow is being treated with unusual honor."),
    phrase(I.shield, "Have I Not Charged The Young Men That They Shall Not Touch Thee", "Boaz has already commanded his workers not to mistreat or bother Ruth.", [`${I.shield} Protection`, `${I.field} Field safety`, `${I.hand} Responsible power`], "His authority is being used to protect her."),
    phrase(I.question, "Why Have I Found Grace In Thine Eyes", "Ruth is asking why Boaz is showing favor to someone like her.", [`${I.question} Wonder`, `${I.hand} Grace`, `${I.woman} A stranger welcomed`], "She knows this kindness is more than she could expect."),
    phrase(I.blessing, "The LORD Recompense Thy Work", "Boaz is asking the LORD Himself to repay Ruth for the loyalty and sacrifice she has shown.", [`${I.blessing} Blessing`, `${I.heart} Ruth's loyal love`, `${I.promise} God sees faithfulness`], "He sees her service to Naomi as something God notices and honors."),
  ]),
  section(2, 14, 18, "Handfuls Of Purpose", I.barley, [
    phrase(I.hand, "Reach Hither Thy Morsel", "Boaz is inviting Ruth to come closer and eat her portion with the others.", [`${I.hand} Invitation`, `${I.barley} Shared meal`, `${I.woman} Honor for Ruth`], "She is being welcomed instead of kept at a distance."),
    phrase(I.barley, "She Did Eat, And Was Sufficed, And Left", "Ruth ate until she was full and still had some food left over.", [`${I.barley} Enough food`, `${I.blessing} Provision`, `${I.home} Naomi also helped`], "The meal gives her more than bare survival."),
    phrase(I.hand, "Let Fall Also Some Of The Handfuls Of Purpose", "Boaz tells his workers to pull out extra bundles on purpose so Ruth can gather more grain.", [`${I.hand} Intentional kindness`, `${I.barley} Extra provision`, `${I.shield} Quiet care`], "The help is deliberate, not accidental."),
    phrase(I.home, "She Brought Forth, And Gave To Her", "Ruth brings the saved food home and gives it to Naomi.", [`${I.home} Provision shared`, `${I.heart} Love in action`, `${I.barley} Harvest blessing`], "The kindness shown in the field becomes food in Naomi's house."),
  ]),
  section(2, 19, 23, "Naomi Sees Hope", I.blessing, [
    phrase(I.question, "Where Hast Thou Gleaned To Day", "Naomi sees the large amount of grain and asks where Ruth worked to receive so much.", [`${I.question} Surprise`, `${I.barley} Abundant grain`, `${I.blessing} Hope awakening`], "The question comes from startled hope."),
    phrase(I.blessing, "Blessed Be He Of The LORD", "Naomi speaks a blessing over Boaz because she sees his kindness as part of the LORD's mercy.", [`${I.blessing} Praise`, `${I.hand} Human kindness`, `${I.promise} God's mercy`], "Her words are beginning to move from bitterness toward gratitude."),
    phrase(I.family, "One Of Our Next Kinsmen", "A next kinsman is a close family relative with the right to help redeem the family line and property.", [`${I.family} Kinsman`, `${I.law} Redemption possibility`, `${I.home} Family future`], "This is the first clear sign that a lawful redeemer may be near."),
    phrase(I.field, "Kept Fast By The Maidens Of Boaz", "Ruth continues staying close to Boaz's female workers while the harvest lasts.", [`${I.field} Continued work`, `${I.shield} Safe place`, `${I.seed} Hope growing`], "She remains in the safest and kindest place available to her."),
  ]),
  section(3, 1, 6, "Naomi Seeks Rest For Ruth", I.rest, [
    phrase(I.rest, "Shall I Not Seek Rest For Thee", "Naomi wants Ruth to have security, marriage, and a future.", [`${I.rest} Safety`, `${I.home} Household future`, `${I.heart} Naomi's care`], "Rest is the opposite of Ruth's vulnerable widowhood."),
    phrase(I.family, "Boaz Our Kindred", "Naomi identifies Boaz as the family redeemer who may help.", [`${I.family} Family tie`, `${I.law} Redeemer possibility`, `${I.blessing} Hope with a name`], "The phrase focuses the reader on lawful redemption, not romance alone."),
    phrase(I.barley, "He Winnoweth Barley To Night", "Boaz is working at the threshing floor after harvest.", [`${I.barley} Harvest work`, `${I.field} Threshing floor`, `${I.seed} Provision setting`], "The place connects food, future, and family redemption."),
    phrase(I.foot, "She Went Down Unto The Floor", "Ruth obeys Naomi's plan and approaches Boaz humbly.", [`${I.foot} Obedient step`, `${I.question} Risk`, `${I.heart} Trust`], "The phrase shows courage without arrogance."),
  ]),
  section(3, 7, 12, "Ruth Asks For Redemption", I.cloak, [
    phrase(I.foot, "Uncovered His Feet", "Ruth follows the custom Naomi gave her to make a humble request.", [`${I.foot} Feet`, `${I.question} Request setting`, `${I.heart} Respectful approach`], "The phrase may feel strange to modern readers, but it prepares for a serious family appeal."),
    phrase(I.question, "Who Art Thou", "Boaz wakes and asks who is there.", [`${I.question} Night question`, `${I.woman} Ruth answers`, `${I.warning} Serious moment`], "The question lets Ruth state her request clearly."),
    phrase(I.cloak, "Spread Therefore Thy Skirt Over Thine Handmaid", "Ruth asks Boaz to cover and protect her as redeemer.", [`${I.cloak} Covering`, `${I.shield} Protection`, `${I.family} Redeemer request`], "The phrase is a bold request for covenant care."),
    phrase(I.family, "Thou Art A Near Kinsman", "Ruth names Boaz's family responsibility.", [`${I.family} Near kin`, `${I.law} Redeemer role`, `${I.home} Future hope`], "The request is rooted in family duty and mercy."),
  ]),
  section(3, 13, 13, "Boaz Promises To Act", I.promise, [
    phrase(I.promise, "Tarry This Night", "Boaz tells Ruth to stay safely until morning.", [`${I.promise} Protection`, `${I.rest} Night safety`, `${I.heart} Honorable care`], "The phrase shows Boaz protecting Ruth instead of exploiting her."),
    phrase(I.law, "If He Will Perform Unto Thee The Part Of A Kinsman", "Boaz respects the nearer redeemer's legal right.", [`${I.law} Proper order`, `${I.family} Kinsman duty`, `${I.hand} Righteous process`], "The phrase shows Boaz's integrity."),
    phrase(I.hand, "Then Let Him Do The Kinsman's Part", "Boaz will not force himself ahead of lawful order.", [`${I.hand} Restraint`, `${I.family} Family duty`, `${I.law} Justice`], "The phrase keeps redemption honorable."),
    phrase(I.promise, "I Will Do The Part Of A Kinsman To Thee", "Boaz promises to redeem Ruth if the nearer man does not.", [`${I.promise} Promise`, `${I.shield} Protection`, `${I.home} Future hope`], "The phrase gives Ruth assurance without compromising righteousness."),
  ]),
  section(3, 14, 18, "Boaz Sends Ruth Home With Grain", I.barley, [
    phrase(I.hand, "Let It Not Be Known", "Boaz protects Ruth's reputation after the night meeting.", [`${I.hand} Care`, `${I.shield} Reputation protected`, `${I.heart} Wisdom`], "His righteousness includes guarding her honor."),
    phrase(I.barley, "Six Measures Of Barley", "Boaz sends Ruth back with a generous gift.", [`${I.barley} Grain`, `${I.hand} Provision`, `${I.home} Naomi included`], "The grain is a sign that Boaz will not send Ruth away empty."),
    phrase(I.home, "Go Not Empty Unto Thy Mother In Law", "Boaz makes sure Naomi also receives evidence of hope.", [`${I.home} Naomi remembered`, `${I.barley} Not empty`, `${I.blessing} Hope returning`], "This answers Naomi's earlier emptiness with visible provision."),
    phrase(I.rest, "The Man Will Not Be In Rest", "Naomi knows Boaz will act quickly.", [`${I.rest} No delay`, `${I.hand} Responsibility`, `${I.promise} Trustworthy character`], "The phrase shows Boaz as a man who does what is right."),
  ]),
  section(4, 1, 6, "Boaz Goes To The Gate", I.gate, [
    phrase(I.door, "Went Up To The Gate", "Boaz goes to the public place where legal matters were handled.", [`${I.door} City gate`, `${I.law} Public decision`, `${I.hand} Responsible action`], "Redemption is handled openly, not secretly."),
    phrase(I.question, "Ho, Such A One", "Boaz calls the nearer kinsman without naming him.", [`${I.question} Unnamed man`, `${I.family} Nearer redeemer`, `${I.law} Legal order`], "The unnamed man becomes a contrast to Boaz's faithful action."),
    phrase(I.law, "If Thou Wilt Redeem It, Redeem It", "Boaz gives the nearer kinsman the first right to redeem.", [`${I.law} Fair process`, `${I.family} Family land`, `${I.hand} Public honesty`], "The phrase shows Boaz obeying the proper order."),
    phrase(I.woman, "Ruth The Moabitess", "Boaz makes clear that redeeming the land includes responsibility toward Ruth.", [`${I.woman} Ruth included`, `${I.city} Moabite widow`, `${I.family} Family future`], "Redemption is not only property; it is care for people."),
  ]),
  section(4, 7, 12, "Boaz Redeems Ruth", I.sandal, [
    phrase(I.sandal, "A Man Plucked Off His Shoe", "the sandal seals the legal transfer in that culture.", [`${I.sandal} Legal sign`, `${I.law} Public witness`, `${I.hand} Agreement confirmed`], "The phrase explains the custom behind the transaction."),
    phrase(I.promise, "Ye Are Witnesses This Day", "the elders and people publicly confirm what Boaz has done.", [`${I.promise} Witnesses`, `${I.city} Public gate`, `${I.law} Redemption confirmed`], "Boaz's action is recognized by the community."),
    phrase(I.woman, "Ruth The Moabitess, The Wife Of Mahlon", "Ruth's identity and loss are both remembered in the redemption.", [`${I.woman} Ruth`, `${I.mourning} Mahlon's widow`, `${I.family} Family line restored`], "The phrase keeps her story from being erased."),
    phrase(I.seed, "That The Name Of The Dead Be Not Cut Off", "redemption protects the family name from disappearing.", [`${I.seed} Family line`, `${I.family} Name preserved`, `${I.blessing} Future restored`], "The phrase shows why Ruth's marriage matters beyond one household."),
  ]),
  section(4, 13, 17, "Obed Is Born", I.baby, [
    phrase(I.blessing, "The LORD Gave Her Conception", "God gives Ruth a child.", [`${I.blessing} God's gift`, `${I.baby} Child born`, `${I.seed} Future opened`], "The child is not just biology. He is mercy after emptiness."),
    phrase(I.baby, "There Is A Son Born To Naomi", "the women see the child as restoration for Naomi too.", [`${I.baby} Son`, `${I.home} Naomi restored`, `${I.mourning} Emptiness answered`], "The phrase shows how one birth heals more than one sorrow."),
    phrase(I.hand, "A Nourisher Of Thine Old Age", "the child will help care for Naomi's future.", [`${I.hand} Support`, `${I.home} Family care`, `${I.rest} Security`], "Redemption gives Naomi a future she thought was gone."),
    phrase(I.seed, "They Called His Name Obed", "the child receives the name Obed and enters the line of David.", [`${I.seed} Obed`, `${I.family} Jesse's father`, `${I.blessing} David's grandfather`], "The small family story becomes part of the kingly line."),
  ]),
  section(4, 18, 22, "The Line To David", I.seed, [
    phrase(I.law, "These Are The Generations Of Pharez", "the book closes with a genealogy connecting Ruth's story to Judah's line.", [`${I.law} Generations`, `${I.family} Judah's family`, `${I.seed} Promise line`], "The phrase shows that God was building more than one household."),
    phrase(I.seed, "Boaz Begat Obed", "Boaz becomes part of the family line through Ruth.", [`${I.seed} Boaz`, `${I.baby} Obed`, `${I.family} Redeemed family`], "The redeemer's kindness becomes part of Israel's future."),
    phrase(I.family, "Obed Begat Jesse", "Obed becomes the father of Jesse.", [`${I.family} Jesse`, `${I.seed} Next generation`, `${I.blessing} Hidden preparation`], "The phrase moves the reader toward David's family."),
    phrase(I.crown, "Jesse Begat David", "Ruth ends by pointing to King David.", [`${I.crown} David`, `${I.seed} Royal line`, `${I.blessing} God's larger plan`], "The ending reveals that ordinary faithfulness can belong to God's enormous story."),
  ]),
  ...DAY_61_80_RUTH_1_4_SUPPLEMENTAL_SECTIONS.filter((section) => section.chapter < 1 || section.chapter > 4),
];
