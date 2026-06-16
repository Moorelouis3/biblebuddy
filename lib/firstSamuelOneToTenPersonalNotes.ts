import type { PersonalLeviticusPhraseSectionInput } from "./leviticusOneToTenPersonalNotes";
import { DAY_61_80_FIRST_SAMUEL_1_10_SUPPLEMENTAL_SECTIONS } from "./daySixtyOneToEightySupplementalPersonalNotes";

const e = (...codes: number[]) => String.fromCodePoint(...codes);

const I = {
  ark: e(0x1F4E6),
  baby: e(0x1F476),
  battle: e(0x2694, 0xFE0F),
  blessing: e(0x1F64C),
  book: e(0x1F4D6),
  city: e(0x1F3D9, 0xFE0F),
  crown: e(0x1F451),
  door: e(0x1F6AA),
  ear: e(0x1F442),
  eye: e(0x1F441, 0xFE0F),
  family: e(0x1F46A),
  field: e(0x1F33E),
  fire: e(0x1F525),
  foot: e(0x1F463),
  glory: e(0x2728),
  hand: e(0x270B),
  heart: e(0x1F49B),
  horn: e(0x1F4EF),
  house: e(0x1F3E0),
  idol: e(0x1F5FF),
  judge: e(0x2696, 0xFE0F),
  lamp: e(0x1FA94),
  map: e(0x1F5FA, 0xFE0F),
  oil: e(0x1FA94),
  people: e(0x1F465),
  prayer: e(0x1F64F),
  priest: e(0x1F9D4),
  question: e(0x2753),
  scroll: e(0x1F4DC),
  seed: e(0x1F331),
  shield: e(0x1F6E1, 0xFE0F),
  sorrow: e(0x1F622),
  voice: e(0x1F5E3, 0xFE0F),
  warning: e(0x26A0, 0xFE0F),
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
    reference: `1 Samuel ${chapter}:${startVerse}-${endVerse}`,
    title,
    icon,
    phrases,
  };
}

export const FIRST_SAMUEL_1_10_PERSONAL_SECTIONS: PersonalLeviticusPhraseSectionInput[] = [
  section(1, 1, 6, "Hannah's Sorrow", I.sorrow, [
    phrase(I.house, "A Certain Man Of Ramathaimzophim", "This means the story begins with a real man from a real town, not with an unnamed legend.", [`${I.house} Elkanah's household`, `${I.book} Real history`, `${I.seed} A new story begins`], "God often begins major turns in Scripture inside ordinary homes."),
    phrase(I.sorrow, "Hannah Had No Children", "Hannah is barren, which means she has no child even though she longs for one.", [`${I.sorrow} Deep grief`, `${I.baby} No child`, `${I.prayer} Need brought to God`], "The ache of childlessness is one of the main burdens in the chapter."),
    phrase(I.warning, "Her Adversary Also Provoked Her Sore", "Her adversary is Peninnah, and provoked her sore means she deeply irritated and wounded Hannah.", [`${I.warning} Rivalry`, `${I.sorrow} Wounding words`, `${I.house} Family tension`], "Hannah's pain is being made sharper by another person's cruelty."),
    phrase(I.question, "Why Weepest Thou", "Elkanah is asking why Hannah keeps crying, but he does not fully grasp the depth of her grief.", [`${I.question} A husband's question`, `${I.sorrow} Hidden pain`, `${I.heart} Love with limits`], "The question helps the reader feel how alone Hannah is in her burden."),
  ]),
  section(1, 7, 8, "Hannah Is Provoked", I.warning, [
    phrase(I.warning, "So Year By Year", "This happened repeatedly over the years, not just once.", [`${I.warning} Repeated sorrow`, `${I.house} Yearly worship`, `${I.sorrow} Long grief`], "The phrase makes Hannah's burden feel long and exhausting."),
    phrase(I.sorrow, "She Provoked Her", "Peninnah deliberately says and does things that hurt Hannah.", [`${I.sorrow} Cruel words`, `${I.warning} Rivalry`, `${I.heart} Hidden pain`], "The pain inside the household is intentional, not accidental."),
    phrase(I.hand, "She Wept, And Did Not Eat", "Hannah's sorrow is so heavy that she cries and loses her appetite.", [`${I.sorrow} Tears`, `${I.hand} No food`, `${I.prayer} Pain needing God`], "This is grief that affects her whole body, not just her thoughts."),
    phrase(I.question, "Am Not I Better To Thee Than Ten Sons", "Elkanah means well, but his comfort cannot replace the child Hannah longs for.", [`${I.question} Comfort attempt`, `${I.heart} Love`, `${I.sorrow} Pain still present`], "The phrase shows that love from others still cannot remove every sorrow."),
  ]),
  section(1, 9, 14, "Hannah Prays", I.prayer, [
    phrase(I.prayer, "She Was In Bitterness Of Soul", "Bitterness of soul means Hannah is carrying deep inner pain and grief.", [`${I.sorrow} Bitter sorrow`, `${I.prayer} Honest prayer`, `${I.heart} Pain poured out`], "Her prayer rises out of real anguish, not calm detachment."),
    phrase(I.scroll, "Vowed A Vow", "This means Hannah makes a solemn promise to the LORD if He gives her a son.", [`${I.scroll} Serious promise`, `${I.prayer} Worshipful request`, `${I.baby} Child dedicated`], "She is asking for a child with the intention of giving that child back to God."),
    phrase(I.baby, "No Razor Shall Come Upon His Head", "This is a sign that the child will be specially set apart to God, like a Nazirite.", [`${I.baby} Dedicated child`, `${I.oil} Set apart`, `${I.scroll} Visible sign`], "The phrase points to a life marked out for the LORD's service."),
    phrase(I.heart, "Poured Out My Soul Before The LORD", "Hannah is describing prayer as opening her whole heart and grief before God.", [`${I.heart} Soul poured out`, `${I.prayer} Before the LORD`, `${I.sorrow} Honest lament`], "It is one of Scripture's clearest pictures of honest prayer."),
  ]),
  section(1, 15, 18, "Hannah Pours Out Her Soul", I.heart, [
    phrase(I.heart, "I Am A Woman Of A Sorrowful Spirit", "Hannah explains that she is not drunk. She is a woman carrying deep sorrow.", [`${I.heart} Sorrowful spirit`, `${I.sorrow} Misunderstood pain`, `${I.prayer} Honest prayer`], "The phrase clears up Eli's misunderstanding and lets the reader see her heart."),
    phrase(I.hand, "Poured Out My Soul Before The LORD", "Hannah says she has been pouring out her whole heart before God in prayer.", [`${I.hand} Soul poured out`, `${I.prayer} Before the LORD`, `${I.sorrow} Honest lament`], "Her prayer is not formal performance. It is open grief before God."),
    phrase(I.priest, "Go In Peace", "Eli sends Hannah away with a blessing of peace after hearing her explanation.", [`${I.priest} Eli responds`, `${I.hand} Peace`, `${I.prayer} Prayer received`], "The words give her relief before she has seen the answer."),
    phrase(I.heart, "Her Countenance Was No More Sad", "Her face is no longer cast down after she has prayed.", [`${I.heart} Countenance changed`, `${I.prayer} Burden released`, `${I.seed} Hope`], "Peace arrives in her heart before the child arrives in her arms."),
  ]),
  section(1, 19, 23, "The LORD Remembers Hannah", I.baby, [
    phrase(I.hand, "The LORD Remembered Her", "Remembered here means the LORD now acts on Hannah's behalf with mercy.", [`${I.hand} God remembers`, `${I.baby} Answer coming`, `${I.prayer} Prayer heard`], "It does not mean God forgot her. It means He now answers."),
    phrase(I.baby, "Called His Name Samuel", "Hannah names the child Samuel because his birth is tied to her asking the LORD for him.", [`${I.baby} Samuel`, `${I.voice} Asked of God`, `${I.prayer} Answer remembered`], "His name keeps the story of prayer attached to his life."),
    phrase(I.house, "I Will Bring Him, That He May Appear Before The LORD", "Hannah means she will bring Samuel to Shiloh so he can be presented in the LORD's service.", [`${I.house} Shiloh`, `${I.baby} Child given`, `${I.scroll} Vow kept`], "She is planning to fulfill her vow, not forget it after receiving the child."),
    phrase(I.hand, "Lent Him To The LORD", "Hannah is giving Samuel over to the LORD's service for the rest of his life.", [`${I.hand} Given back`, `${I.prayer} Worship`, `${I.seed} Future prophet`], "The answer to prayer becomes an offering back to God."),
  ]),
  section(1, 24, 28, "Samuel Is Given To The LORD", I.hand, [
    phrase(I.house, "Brought Him Unto The House Of The LORD", "Hannah brings Samuel to the sanctuary at Shiloh exactly as she promised.", [`${I.house} House of the LORD`, `${I.baby} Samuel brought`, `${I.scroll} Vow fulfilled`], "The phrase shows obedience after answered prayer."),
    phrase(I.baby, "The Child Was Young", "Samuel is still very little when Hannah gives him into the LORD's service.", [`${I.baby} Young child`, `${I.heart} Costly obedience`, `${I.prayer} Trust`], "The detail makes Hannah's sacrifice feel tender and costly."),
    phrase(I.prayer, "For This Child I Prayed", "Hannah is pointing straight back to the prayer that began this whole story.", [`${I.prayer} Prayer remembered`, `${I.baby} Child received`, `${I.blessing} Answer from God`], "She wants Samuel's life to be remembered as an answer from God."),
    phrase(I.hand, "Lent Him To The LORD", "Hannah gives Samuel to the LORD for lifelong service.", [`${I.hand} Given back`, `${I.prayer} Worship`, `${I.seed} Future prophet`], "The phrase turns answered prayer into consecrated service."),
  ]),
  section(2, 1, 5, "Hannah's Prayer", I.horn, [
    phrase(I.horn, "Mine Horn Is Exalted In The LORD", "Horn here is a picture of strength and honor. Hannah is saying the LORD has lifted her up.", [`${I.horn} Strength lifted`, `${I.prayer} Joy in God`, `${I.glory} Reversal`], "The phrase celebrates God raising the lowly."),
    phrase(I.glory, "There Is None Holy As The LORD", "Hannah is praising the LORD as completely holy and unlike every rival.", [`${I.glory} Holy`, `${I.shield} No rival`, `${I.prayer} Worship`], "Her song is centered on who God is, not only on what He gave her."),
    phrase(I.warning, "The LORD Killeth, And Maketh Alive", "Hannah is saying the LORD rules over life and death itself.", [`${I.warning} God's authority`, `${I.seed} Life`, `${I.sorrow} Death`], "Every reversal in her song is under God's power."),
    phrase(I.crown, "He Shall Give Strength Unto His King", "Hannah's prayer reaches forward to a king God Himself will strengthen.", [`${I.crown} King`, `${I.horn} Strength`, `${I.book} Future hope`], "That is striking because Israel does not even have a king yet."),
  ]),
  section(2, 6, 10, "The LORD Raises The Lowly", I.glory, [
    phrase(I.warning, "The LORD Killeth, And Maketh Alive", "The LORD alone has power over death and life.", [`${I.warning} God's authority`, `${I.seed} Life`, `${I.sorrow} Death`], "Hannah is describing a God who rules every reversal."),
    phrase(I.hand, "The LORD Maketh Poor, And Maketh Rich", "The LORD can lower a person or raise a person in material condition.", [`${I.hand} God raises`, `${I.sorrow} Low places`, `${I.glory} Reversal`], "That is why Hannah's prayer is full of hope for the lowly."),
    phrase(I.seed, "He Raiseth Up The Poor Out Of The Dust", "Dust pictures a low and humbled condition, and God lifts the poor from there.", [`${I.seed} Raised up`, `${I.sorrow} Dust`, `${I.glory} Honor from God`], "The phrase connects Hannah's story to God's larger way of working."),
    phrase(I.crown, "He Shall Give Strength Unto His King", "Hannah is looking ahead to a future king whom God will empower.", [`${I.crown} King`, `${I.horn} Strength`, `${I.book} Future hope`], "The line reaches beyond her own story into Israel's future."),
  ]),
  section(2, 11, 16, "Eli's Sons Sin", I.warning, [
    phrase(I.priest, "The Child Did Minister Unto The LORD", "Samuel is serving in the LORD's house even while he is still a boy.", [`${I.baby} Young Samuel`, `${I.priest} Service`, `${I.glory} Before the LORD`], "His humble service is being set beside the corruption of Eli's sons."),
    phrase(I.warning, "Sons Of Belial", "Belial here means worthless and wicked. Eli's sons are being described as deeply evil men.", [`${I.warning} Wicked priests`, `${I.priest} Sacred office abused`, `${I.sorrow} Spiritual damage`], "The phrase warns that religious position does not equal faithfulness."),
    phrase(I.hand, "They Knew Not The LORD", "They held priestly office, but they did not truly know the LORD in heart and obedience.", [`${I.hand} No true knowledge`, `${I.priest} Priests by role`, `${I.warning} Heart far away`], "That is one of the saddest parts of the whole scene."),
    phrase(I.fire, "Men Abhorred The Offering Of The LORD", "Because of the priests' sin, people came to hate and despise the worship offering itself.", [`${I.fire} Offering corrupted`, `${I.people} People harmed`, `${I.warning} Leaders causing damage`], "Corrupt leaders can make holy things seem hateful to others."),
  ]),
  section(2, 17, 17, "The Offering Is Despised", I.fire, [
    phrase(I.warning, "The Sin Of The Young Men Was Very Great", "Their sin is not small or excusable. It is very serious in God's sight.", [`${I.warning} Great sin`, `${I.priest} Priestly corruption`, `${I.fire} Holy offering harmed`], "The verse tells the reader not to minimize what they are doing."),
    phrase(I.glory, "Before The LORD", "This means their sin is happening in the LORD's presence, at His worship.", [`${I.glory} Before God`, `${I.warning} Sacred setting`, `${I.priest} Priests accountable`], "The sacred setting makes the evil worse, not lighter."),
    phrase(I.fire, "Men Abhorred The Offering Of The LORD", "People came to loathe the offering because the priests were corrupting it.", [`${I.fire} Offering corrupted`, `${I.people} People harmed`, `${I.warning} Leaders causing damage`], "Bad spiritual leadership can make holy things seem hateful."),
    phrase(I.hand, "The Offering Of The LORD", "The sacrifice belongs to the LORD, so taking it greedily is an offense against Him.", [`${I.hand} Belongs to God`, `${I.fire} Sacrifice`, `${I.priest} Priests abusing trust`], "Their greed is not just bad manners. It is sin against God."),
  ]),
  section(2, 18, 23, "Samuel Grows Before The LORD", I.seed, [
    phrase(I.priest, "Samuel Ministered Before The LORD", "Samuel's service is directed toward the LORD Himself, not merely toward human duties.", [`${I.priest} Service`, `${I.glory} Before the LORD`, `${I.seed} Faithful growth`], "The phrase keeps Samuel's life centered in worship."),
    phrase(I.house, "His Mother Made Him A Little Coat", "Hannah keeps caring for Samuel by bringing him a small robe each year.", [`${I.house} Mother's care`, `${I.baby} Little coat`, `${I.heart} Love from a distance`], "The detail makes his dedication tender and personal."),
    phrase(I.blessing, "The LORD Visited Hannah", "Visited here means the LORD blessed Hannah again and gave her more children.", [`${I.hand} God visits`, `${I.baby} More children`, `${I.prayer} Mercy multiplied`], "The God who received Samuel also cares for Hannah."),
    phrase(I.seed, "The Child Samuel Grew Before The LORD", "Samuel grows up under the LORD's eye and in the LORD's service.", [`${I.seed} Growth`, `${I.glory} Before God`, `${I.book} Future prophet forming`], "The phrase shows quiet preparation for future leadership."),
  ]),
  section(2, 24, 26, "Eli Warns His Sons", I.warning, [
    phrase(I.warning, "Nay, My Sons", "Eli is directly telling his sons that what they are doing is wrong.", [`${I.warning} Father warns`, `${I.priest} Sons confronted`, `${I.sorrow} Too late feeling`], "He knows the reports about them are evil."),
    phrase(I.people, "Ye Make The LORD'S People To Transgress", "Their conduct is leading other Israelites into sin and contempt for worship.", [`${I.people} LORD's people`, `${I.warning} Others harmed`, `${I.priest} Leadership matters`], "Corrupt leaders do not only ruin themselves. They injure the people too."),
    phrase(I.hand, "They Hearkened Not Unto The Voice Of Their Father", "They refuse to listen even when their own father rebukes them.", [`${I.hand} Refusal`, `${I.voice} Father's warning`, `${I.judge} Judgment nearing`], "The phrase shows how hardened their hearts have become."),
    phrase(I.seed, "The Child Samuel Grew On", "Samuel keeps maturing while Eli's sons keep resisting God.", [`${I.seed} Samuel grows`, `${I.glory} Favor`, `${I.warning} Contrast`], "Hope is still growing in the middle of corruption."),
  ]),
  section(2, 27, 32, "Judgment On Eli's House", I.judge, [
    phrase(I.voice, "There Came A Man Of God Unto Eli", "A man of God is a messenger sent by God with a prophetic word for Eli.", [`${I.voice} Warning word`, `${I.priest} Eli confronted`, `${I.judge} Accountability`], "Priestly sin is now being answered by God's own message."),
    phrase(I.question, "Wherefore Kick Ye At My Sacrifice", "God is accusing Eli's house of treating His sacrifices with contempt and disrespect.", [`${I.question} Sharp rebuke`, `${I.fire} Sacrifice despised`, `${I.warning} Holy things dishonored`], "The words show how serious their sin is in God's sight."),
    phrase(I.hand, "Them That Honour Me I Will Honour", "God promises that those who honor Him will be honored by Him.", [`${I.hand} Honor God`, `${I.warning} Despise God`, `${I.judge} Reversal`], "Family privilege does not matter more than honoring God."),
    phrase(I.seed, "I Will Raise Me Up A Faithful Priest", "God promises to establish a priest who will truly do what is in His heart.", [`${I.seed} Faithful priest`, `${I.heart} God's heart`, `${I.book} Future hope`], "Judgment on Eli's house will not be the end of God's work."),
  ]),
  section(2, 33, 36, "A Faithful Priest Promised", I.seed, [
    phrase(I.sorrow, "All The Increase Of Thine House Shall Die", "Eli's family line will suffer severe judgment instead of secure blessing.", [`${I.sorrow} Family judgment`, `${I.priest} Priestly house`, `${I.warning} Sin's cost`], "Privilege cannot protect a corrupt house forever."),
    phrase(I.seed, "I Will Raise Me Up A Faithful Priest", "God promises again that He Himself will establish a faithful priest.", [`${I.seed} Faithful priest`, `${I.heart} God's heart`, `${I.book} Future hope`], "Judgment is not the end. God will provide faithful service."),
    phrase(I.heart, "According To That Which Is In Mine Heart", "The future priest will act in line with God's own will and desires.", [`${I.heart} God's heart`, `${I.hand} Faithful obedience`, `${I.priest} True service`], "That is what faithful ministry is supposed to look like."),
    phrase(I.house, "I Will Build Him A Sure House", "A sure house means God will give the faithful priest a stable and lasting line.", [`${I.house} Sure house`, `${I.seed} Future line`, `${I.glory} God's provision`], "God will rebuild with faithfulness what corruption has damaged."),
  ]),
  section(3, 1, 6, "The LORD Calls Samuel", I.ear, [
    phrase(I.ear, "The Word Of The LORD Was Precious In Those Days", "Precious here means rare. God's revealed word was not being heard often in those days.", [`${I.ear} Rare word`, `${I.lamp} Dim season`, `${I.warning} Spiritual need`], "That is why Samuel's call matters so much."),
    phrase(I.lamp, "Ere The Lamp Of God Went Out", "Ere means before. The call comes before the lamp in the sanctuary has gone out for the night.", [`${I.lamp} Lamp still burning`, `${I.house} House of God`, `${I.seed} Hope before darkness`], "The detail quietly suggests God is still at work in a dark season."),
    phrase(I.voice, "The LORD Called Samuel", "God personally speaks to the young boy.", [`${I.voice} God's call`, `${I.baby} Samuel`, `${I.ear} Listening begins`], "The phrase marks Samuel's entrance into prophetic ministry."),
    phrase(I.prayer, "Speak, LORD; For Thy Servant Heareth", "Samuel is taught to respond with humble listening.", [`${I.prayer} Speak LORD`, `${I.ear} Listening`, `${I.hand} Servant posture`], "This becomes a model for receiving God's word."),
  ]),
  section(3, 7, 9, "Samuel Learns To Listen", I.prayer, [
    phrase(I.ear, "Samuel Did Not Yet Know The LORD", "Samuel has not yet learned to recognize the LORD's voice.", [`${I.ear} Learning to hear`, `${I.baby} Young Samuel`, `${I.glory} God calling`], "The phrase helps beginners understand why Samuel needs Eli's instruction."),
    phrase(I.voice, "The Word Of The LORD Was Not Yet Revealed Unto Him", "Samuel has not yet personally received God's word as a prophet.", [`${I.voice} Word not yet revealed`, `${I.seed} Prophet forming`, `${I.lamp} New season beginning`], "The phrase marks the moment before his prophetic ministry opens."),
    phrase(I.priest, "Eli Perceived That The LORD Had Called The Child", "Eli realizes the voice is from God.", [`${I.priest} Eli understands`, `${I.voice} The LORD calls`, `${I.baby} Child Samuel`], "The phrase shows Eli guiding Samuel even in a dark priestly house."),
    phrase(I.prayer, "Speak, LORD; For Thy Servant Heareth", "Samuel is taught to answer God with humble listening.", [`${I.prayer} Speak LORD`, `${I.ear} Listening`, `${I.hand} Servant posture`], "This becomes a model for receiving God's word."),
  ]),
  section(3, 10, 15, "Samuel Receives A Hard Word", I.warning, [
    phrase(I.voice, "The LORD Came, And Stood", "God's presence is described as near and personal.", [`${I.voice} God comes near`, `${I.glory} Presence`, `${I.ear} Samuel hears`], "The phrase shows the seriousness of Samuel's call."),
    phrase(I.warning, "I Will Do A Thing In Israel", "God announces coming judgment that will shock the nation.", [`${I.warning} Coming act`, `${I.people} Israel affected`, `${I.judge} Judgment on Eli's house`], "The message Samuel receives is heavy, not flattering."),
    phrase(I.scroll, "Samuel Told Him Every Whit", "Every whit means every part. Samuel tells Eli the whole message without hiding anything.", [`${I.scroll} Whole word`, `${I.warning} Hard truth`, `${I.hand} Faithful messenger`], "A prophet must speak God's word even when it is painful."),
    phrase(I.glory, "The LORD Was With Him", "God confirms Samuel's ministry by His presence.", [`${I.glory} God's presence`, `${I.seed} Samuel grows`, `${I.book} Prophet recognized`], "The phrase explains why Israel begins to know Samuel is a prophet."),
  ]),
  section(3, 16, 21, "Samuel Becomes A Prophet", I.scroll, [
    phrase(I.priest, "Samuel, My Son", "Eli calls Samuel with tenderness before asking for the message.", [`${I.priest} Eli`, `${I.baby} Samuel`, `${I.sorrow} Heavy morning`], "The phrase shows the difficult human side of prophetic truth."),
    phrase(I.scroll, "Samuel Told Him Every Whit", "Every whit means every part. Samuel tells Eli the whole message.", [`${I.scroll} Whole word`, `${I.warning} Hard truth`, `${I.hand} Faithful messenger`], "A prophet must speak God's word even when it is painful."),
    phrase(I.glory, "The LORD Was With Him", "God confirms Samuel's ministry by His presence.", [`${I.glory} God's presence`, `${I.seed} Samuel grows`, `${I.book} Prophet recognized`], "The phrase explains why Israel begins to know Samuel is a prophet."),
    phrase(I.book, "All Israel From Dan Even To Beersheba", "This means the whole land, from north to south, recognizes Samuel's calling.", [`${I.book} All Israel`, `${I.map} North to south`, `${I.voice} Prophet established`], "Samuel's ministry is becoming known nationally."),
  ]),
  section(4, 1, 6, "Israel Brings The Ark", I.ark, [
    phrase(I.battle, "Israel Went Out Against The Philistines", "Israel enters battle with its long-time enemy.", [`${I.battle} War`, `${I.people} Israel`, `${I.warning} Crisis begins`], "The chapter moves from Samuel's call to national defeat."),
    phrase(I.ark, "Let Us Fetch The Ark Of The Covenant", "Israel treats the ark like a battle tool instead of seeking the LORD.", [`${I.ark} Ark`, `${I.battle} Battle hope`, `${I.warning} Misused symbol`], "The phrase warns against using holy things without humble obedience."),
    phrase(I.priest, "Hophni And Phinehas Were There", "Eli's corrupt sons are with the ark.", [`${I.priest} Corrupt priests`, `${I.ark} Ark present`, `${I.warning} Judgment near`], "Their presence reminds readers that the earlier warning is coming true."),
    phrase(I.ark, "The Ark Of God Was Taken", "The Philistines capture the ark after defeating Israel.", [`${I.ark} Ark captured`, `${I.sorrow} Defeat`, `${I.judge} Judgment fulfilled`], "This is one of Israel's most shocking losses."),
  ]),
  section(4, 7, 11, "The Ark Is Taken", I.warning, [
    phrase(I.warning, "God Is Come Into The Camp", "The Philistines understand the ark as a sign of divine presence.", [`${I.warning} Philistine fear`, `${I.ark} Ark in camp`, `${I.glory} God's presence misunderstood`], "The phrase shows even Israel's enemies recognize this is spiritually serious."),
    phrase(I.battle, "Be Strong, And Quit Yourselves Like Men", "Quit yourselves like men is old wording meaning act bravely and fight like men.", [`${I.battle} Battle courage`, `${I.people} Philistines`, `${I.warning} Desperate resistance`], "The Philistines are urging one another not to collapse in fear."),
    phrase(I.ark, "The Ark Of God Was Taken", "The Philistines capture the ark after defeating Israel.", [`${I.ark} Ark captured`, `${I.sorrow} Defeat`, `${I.judge} Judgment fulfilled`], "This is one of Israel's most shocking losses."),
    phrase(I.priest, "The Two Sons Of Eli, Hophni And Phinehas, Were Slain", "Eli's corrupt sons die as God had warned.", [`${I.priest} Eli's sons`, `${I.sorrow} Death`, `${I.warning} Warning fulfilled`], "The phrase shows God's earlier word coming true."),
  ]),
  section(4, 12, 17, "The Bad News Comes", I.sorrow, [
    phrase(I.sorrow, "His Clothes Rent, And With Earth Upon His Head", "The messenger shows grief before he even speaks.", [`${I.sorrow} Mourning`, `${I.warning} Terrible news`, `${I.people} National sorrow`], "The visible signs prepare the reader for disaster."),
    phrase(I.warning, "Eli Fell From Off The Seat Backward", "Eli dies when he hears the ark has been taken.", [`${I.sorrow} Eli dies`, `${I.ark} Ark news`, `${I.judge} Judgment completed`], "The phrase ties personal tragedy to national spiritual collapse."),
    phrase(I.glory, "She Named The Child Ichabod", "Ichabod is a name meant to say the glory has departed.", [`${I.glory} Glory departed`, `${I.baby} Child named`, `${I.sorrow} Sorrow remembered`], "The name turns the crisis into a lasting testimony."),
    phrase(I.ark, "The Glory Is Departed From Israel", "The loss of the ark is described as the departure of glory.", [`${I.glory} Glory`, `${I.ark} Ark taken`, `${I.people} Israel humbled`], "The phrase explains why this defeat is spiritually devastating."),
  ]),
  section(4, 18, 22, "Ichabod", I.glory, [
    phrase(I.warning, "Eli Fell From Off The Seat Backward", "Eli dies when he hears the ark has been taken.", [`${I.sorrow} Eli dies`, `${I.ark} Ark news`, `${I.judge} Judgment completed`], "The phrase ties personal tragedy to national spiritual collapse."),
    phrase(I.baby, "She Bowed Herself And Travailed", "Phinehas's wife goes into labor under the weight of the news.", [`${I.baby} Childbirth`, `${I.sorrow} Grief`, `${I.glory} Glory crisis`], "The phrase places new life beside national loss."),
    phrase(I.glory, "She Named The Child Ichabod", "Ichabod is a name meant to say the glory has departed.", [`${I.glory} Glory departed`, `${I.baby} Child named`, `${I.sorrow} Sorrow remembered`], "The name turns the crisis into a lasting testimony."),
    phrase(I.ark, "The Glory Is Departed From Israel", "The loss of the ark is described as the departure of glory.", [`${I.glory} Glory`, `${I.ark} Ark taken`, `${I.people} Israel humbled`], "The phrase explains why this defeat is spiritually devastating."),
  ]),
  section(5, 1, 5, "Dagon Falls", I.idol, [
    phrase(I.ark, "Brought It Into The House Of Dagon", "The Philistines place the ark in their idol temple.", [`${I.ark} Ark`, `${I.idol} Dagon`, `${I.warning} False victory assumed`], "They think their god has defeated Israel's God."),
    phrase(I.idol, "Dagon Was Fallen Upon His Face", "The idol falls before the ark.", [`${I.idol} Idol fallen`, `${I.glory} The LORD's presence`, `${I.hand} God acts without Israel's army`], "The phrase shows the LORD needs no rescue."),
    phrase(I.hand, "The Head Of Dagon And Both The Palms Of His Hands Were Cut Off", "Dagon is broken in the place of worship.", [`${I.hand} Hands cut`, `${I.idol} Idol broken`, `${I.judge} False god humiliated`], "The image of power is shown powerless."),
    phrase(I.door, "Only The Stump Of Dagon Was Left", "The idol is reduced and exposed.", [`${I.idol} Stump`, `${I.glory} LORD superior`, `${I.warning} No rival god`], "The phrase makes the point visually: Dagon cannot stand before the LORD."),
  ]),
  section(5, 6, 10, "The Hand Of The LORD Is Heavy", I.hand, [
    phrase(I.hand, "The Hand Of The LORD Was Heavy", "God's power presses judgment on the Philistine city.", [`${I.hand} God's hand`, `${I.judge} Judgment`, `${I.city} Ashdod afflicted`], "The phrase shows the ark is not captured as though God is weak."),
    phrase(I.warning, "He Destroyed Them", "The LORD brings severe distress on the Philistines.", [`${I.warning} Destruction`, `${I.sorrow} Affliction`, `${I.glory} God's holiness`], "Victory over Israel does not protect them from Israel's God."),
    phrase(I.question, "What Shall We Do With The Ark", "The Philistines do not know how to handle God's presence.", [`${I.question} Fear`, `${I.ark} Ark`, `${I.hand} God's power`], "The question shows panic replacing celebration."),
    phrase(I.voice, "The Cry Of The City Went Up To Heaven", "The suffering becomes loud and widespread.", [`${I.sorrow} Cry`, `${I.city} City afflicted`, `${I.warning} Judgment felt`], "The phrase shows that God's hand cannot be ignored."),
  ]),
  section(5, 11, 12, "The Philistines Fear The Ark", I.warning, [
    phrase(I.question, "Send Away The Ark Of The God Of Israel", "The Philistines want the ark removed because judgment is crushing them.", [`${I.question} Send it away`, `${I.ark} Ark feared`, `${I.hand} God's hand`], "The phrase shows panic replacing their earlier celebration."),
    phrase(I.warning, "That It Slay Us Not", "They fear death if the ark remains.", [`${I.warning} Fear of death`, `${I.city} City afflicted`, `${I.glory} Holy presence`], "The phrase shows God's holiness cannot be treated as a trophy."),
    phrase(I.sorrow, "There Was A Deadly Destruction", "The city suffers severe judgment.", [`${I.sorrow} Destruction`, `${I.hand} Heavy hand`, `${I.warning} Judgment felt`], "The phrase makes the cost of resisting the LORD clear."),
    phrase(I.voice, "The Cry Of The City Went Up To Heaven", "The suffering becomes loud and widespread.", [`${I.sorrow} Cry`, `${I.city} City afflicted`, `${I.warning} Judgment felt`], "The phrase shows that God's hand cannot be ignored."),
  ]),
  section(6, 1, 6, "The Ark Is Sent Back", I.ark, [
    phrase(I.ark, "The Ark Of The LORD Was In The Country Of The Philistines Seven Months", "The ark remains among the Philistines long enough for judgment to be undeniable.", [`${I.ark} Ark present`, `${I.warning} Seven months`, `${I.hand} Pressure continues`], "The delay teaches them that the problem is not random."),
    phrase(I.question, "Wherewith Shall We Send It To His Place", "The Philistines ask how to return the ark properly.", [`${I.question} How to return`, `${I.ark} God's ark`, `${I.warning} Fear of holiness`], "They know the ark cannot be treated casually."),
    phrase(I.hand, "Give Glory Unto The God Of Israel", "Their own priests advise honoring Israel's God.", [`${I.hand} Give glory`, `${I.glory} God of Israel`, `${I.judge} Judgment acknowledged`], "The phrase shows the LORD's name being recognized among enemies."),
    phrase(I.baby, "Two Milch Kine, On Which There Hath Come No Yoke", "Milch kine are milk cows. No yoke means they have never been used to pull a cart.", [`${I.baby} Milk cows`, `${I.hand} No yoke`, `${I.question} A sign requested`], "The unusual setup helps prove whether the LORD is guiding the ark home."),
  ]),
  section(6, 7, 9, "The New Cart Test", I.question, [
    phrase(I.baby, "Make A New Cart", "The Philistines prepare a special cart for the ark.", [`${I.baby} New cart`, `${I.ark} Ark carried`, `${I.warning} Careful return`], "The phrase shows they know this return must be treated seriously."),
    phrase(I.hand, "Two Milch Kine, On Which There Hath Come No Yoke", "Milch kine are milk cows, and no yoke means they have never pulled a cart before.", [`${I.baby} Milk cows`, `${I.hand} No yoke`, `${I.question} A sign requested`], "That detail makes the test more convincing if they go straight toward Israel."),
    phrase(I.map, "The Way Of His Own Coast To Bethshemesh", "The test is whether the cows go straight toward Israel.", [`${I.map} Bethshemesh`, `${I.eye} Direction watched`, `${I.hand} God's hand tested`], "The phrase sets up clear evidence of God's action."),
    phrase(I.question, "Then He Hath Done Us This Great Evil", "The Philistines admit the plague may be from Israel's God.", [`${I.question} Cause tested`, `${I.warning} Great evil`, `${I.glory} God acknowledged`], "The phrase shows them trying to understand God's judgment."),
  ]),
  section(6, 10, 15, "Bethshemesh Receives The Ark", I.ark, [
    phrase(I.ark, "The Kine Took The Straight Way", "The cows go directly toward Israel.", [`${I.ark} Ark moving`, `${I.hand} God's direction`, `${I.map} Straight road`], "The phrase confirms the LORD's hand was behind the affliction."),
    phrase(I.field, "The Men Of Bethshemesh Were Reaping Their Wheat Harvest", "Ordinary work is interrupted by the ark's return.", [`${I.field} Wheat harvest`, `${I.eye} They see`, `${I.blessing} Joy`], "The phrase shows God's mercy arriving in daily life."),
    phrase(I.hand, "They Rejoiced To See It", "The Israelites are glad when the ark returns.", [`${I.hand} Joy`, `${I.ark} Ark restored`, `${I.glory} Hope returning`], "The phrase captures relief after national shame."),
    phrase(I.question, "Who Is Able To Stand Before This Holy LORD God", "The people realize God's holiness is dangerous when treated lightly.", [`${I.warning} Holy LORD`, `${I.question} Who can stand`, `${I.ark} Reverence required`], "The ark's return still requires holy fear."),
  ]),
  section(6, 16, 21, "Holy Fear At Bethshemesh", I.warning, [
    phrase(I.eye, "The Five Lords Of The Philistines Had Seen It", "The Philistine rulers witness the ark's return.", [`${I.eye} Witnesses`, `${I.people} Philistine lords`, `${I.hand} Evidence`], "The phrase shows the sign was public and undeniable."),
    phrase(I.hand, "These Are The Golden Emerods", "Emerods is old wording for painful tumors. The golden models are part of the Philistines' guilt offering.", [`${I.hand} Guilt offering`, `${I.city} Philistine cities`, `${I.warning} Affliction remembered`], "The phrase preserves the evidence of how seriously they feared the LORD."),
    phrase(I.warning, "He Smote The Men Of Bethshemesh", "Some Israelites are judged for treating the ark wrongly.", [`${I.warning} Judgment`, `${I.ark} Ark holiness`, `${I.people} Israel warned`], "The phrase shows that God's holiness applies to Israel too."),
    phrase(I.question, "Who Is Able To Stand Before This Holy LORD God", "The people realize God's holiness is dangerous when treated lightly.", [`${I.warning} Holy LORD`, `${I.question} Who can stand`, `${I.ark} Reverence required`], "The ark's return still requires holy fear."),
  ]),
  section(7, 1, 6, "Israel Returns To The LORD", I.prayer, [
    phrase(I.ark, "Fetched Up The Ark Of The LORD", "Fetched up means the ark is brought up and placed in a new location at Kirjathjearim.", [`${I.ark} Ark moved`, `${I.house} A house prepared`, `${I.priest} Eleazar sanctified`], "The phrase marks a new stage after the ark's return."),
    phrase(I.sorrow, "All The House Of Israel Lamented After The LORD", "Israel begins to mourn and long for the LORD again.", [`${I.sorrow} Lament`, `${I.people} All Israel`, `${I.prayer} Turning back`], "The phrase shows spiritual hunger after years of trouble."),
    phrase(I.heart, "Prepare Your Hearts Unto The LORD", "Samuel calls Israel to direct their inner loyalty back to God.", [`${I.heart} Hearts`, `${I.prayer} Return`, `${I.warning} Put away idols`], "True repentance begins deeper than outward behavior."),
    phrase(I.hand, "Put Away The Strange Gods", "Israel must remove false worship.", [`${I.hand} Put away`, `${I.idol} Strange gods`, `${I.glory} Serve the LORD only`], "The phrase explains that returning to God includes rejecting rivals."),
  ]),
  section(7, 7, 12, "Ebenezer", I.shield, [
    phrase(I.prayer, "Cease Not To Cry Unto The LORD Our God For Us", "Israel asks Samuel to keep praying during danger.", [`${I.prayer} Cry to God`, `${I.battle} Philistine threat`, `${I.people} Israel afraid`], "The people now seek help from the LORD instead of using the ark as a charm."),
    phrase(I.fire, "The LORD Thundered With A Great Thunder", "God fights for Israel with overwhelming power.", [`${I.fire} Thunder`, `${I.battle} Philistines confused`, `${I.hand} God delivers`], "The phrase shows deliverance coming from the LORD's hand."),
    phrase(I.shield, "Called The Name Of It Ebenezer", "Ebenezer means stone of help. Samuel gives the stone that name to remember the LORD's rescue.", [`${I.shield} Stone of help`, `${I.hand} God's help`, `${I.book} Memory marker`], "The name is meant to keep the victory tied to God's help."),
    phrase(I.hand, "Hitherto Hath The LORD Helped Us", "Hitherto means up to this point. Samuel is saying the LORD has helped Israel all the way here.", [`${I.hand} Help so far`, `${I.prayer} Gratitude`, `${I.seed} Hope for future`], "The phrase teaches remembrance before moving forward."),
  ]),
  section(7, 13, 17, "Samuel Judges Israel", I.judge, [
    phrase(I.battle, "The Philistines Were Subdued", "the LORD gives Israel relief from Philistine pressure.", [`${I.battle} Enemy subdued`, `${I.hand} LORD's help`, `${I.people} Israel protected`], "The phrase shows the fruit of returning to the LORD."),
    phrase(I.hand, "The Hand Of The LORD Was Against The Philistines", "God keeps pressing back the enemy.", [`${I.hand} God's hand`, `${I.battle} Philistines restrained`, `${I.shield} Protection`], "The phrase explains Israel's security."),
    phrase(I.judge, "Samuel Judged Israel All The Days Of His Life", "Samuel faithfully leads Israel over many years.", [`${I.judge} Samuel judges`, `${I.people} Israel`, `${I.seed} Faithful leadership`], "The phrase shows the stabilizing gift of a faithful judge-prophet."),
    phrase(I.house, "His Return Was To Ramah", "Samuel's regular ministry has a home base.", [`${I.house} Ramah`, `${I.judge} Ongoing work`, `${I.prayer} Altar built`], "The phrase grounds Samuel's leadership in faithful, ordinary service."),
  ]),
  section(8, 1, 6, "Israel Asks For A King", I.crown, [
    phrase(I.warning, "His Sons Walked Not In His Ways", "Samuel's sons do not follow his faithful pattern.", [`${I.warning} Unfaithful sons`, `${I.judge} Corrupt judgment`, `${I.people} Israel concerned`], "The failure of leaders creates pressure for change."),
    phrase(I.crown, "Make Us A King To Judge Us Like All The Nations", "Israel asks to be ruled like surrounding nations.", [`${I.crown} King requested`, `${I.people} Like the nations`, `${I.warning} Mixed motives`], "The phrase is important because Israel is supposed to be shaped by the LORD, not merely by surrounding cultures."),
    phrase(I.sorrow, "The Thing Displeased Samuel", "Samuel is grieved by the request.", [`${I.sorrow} Samuel hurt`, `${I.crown} Request for king`, `${I.prayer} He prays`], "The phrase shows the request is spiritually serious."),
    phrase(I.hand, "They Have Rejected Me", "God says the deeper rejection is against Him.", [`${I.hand} God rejected`, `${I.crown} Human king desired`, `${I.warning} Heart issue`], "The problem is not only government structure. It is trust."),
  ]),
  section(8, 7, 9, "Israel Rejects The LORD", I.warning, [
    phrase(I.hand, "They Have Rejected Me", "God says the deeper rejection is against Him.", [`${I.hand} God rejected`, `${I.crown} Human king desired`, `${I.warning} Heart issue`], "The problem is not only government structure. It is trust."),
    phrase(I.people, "That I Should Not Reign Over Them", "Israel does not want the LORD's rule in the way He has given it.", [`${I.people} Israel`, `${I.crown} LORD as King`, `${I.warning} Rejection`], "The phrase exposes the spiritual issue underneath the request."),
    phrase(I.warning, "They Have Forsaken Me", "Israel's request fits a longer pattern of turning from God.", [`${I.warning} Forsaking God`, `${I.idol} Other gods`, `${I.book} Repeated pattern`], "The phrase connects this moment to Israel's history."),
    phrase(I.scroll, "Protest Solemnly Unto Them", "Protest solemnly here means warn them very clearly and seriously.", [`${I.scroll} Solemn warning`, `${I.voice} Samuel speaks`, `${I.crown} Cost of a king`], "God gives warning before giving them what they demand."),
  ]),
  section(8, 10, 15, "The Manner Of The King", I.scroll, [
    phrase(I.scroll, "This Will Be The Manner Of The King", "Samuel warns what a king will take from the people.", [`${I.scroll} Warning`, `${I.crown} Royal demands`, `${I.hand} Cost counted`], "The phrase prepares Israel to understand the burden of their request."),
    phrase(I.hand, "He Will Take Your Sons", "the king will claim Israel's sons for his service.", [`${I.hand} Sons taken`, `${I.battle} Military service`, `${I.warning} Cost of kingship`], "The phrase makes the request personal and costly."),
    phrase(I.warning, "Ye Shall Cry Out In That Day", "Israel will later suffer under the king they demanded.", [`${I.warning} Future cry`, `${I.sorrow} Regret`, `${I.crown} Chosen burden`], "Wanting something badly does not mean it will save."),
    phrase(I.people, "Nay; But We Will Have A King Over Us", "Israel refuses the warning and insists on a king.", [`${I.people} Stubborn demand`, `${I.crown} King wanted`, `${I.warning} Warning rejected`], "The phrase shows desire overpowering wisdom."),
  ]),
  section(8, 16, 18, "The King Will Take", I.hand, [
    phrase(I.hand, "He Will Take Your Menservants", "Samuel warns that a king will claim household labor.", [`${I.hand} Servants taken`, `${I.house} Household cost`, `${I.warning} Royal demand`], "The phrase makes kingship costly at home."),
    phrase(I.people, "Your Goodliest Young Men", "the king will use Israel's strongest people for his service.", [`${I.hand} Best people taken`, `${I.crown} King's service`, `${I.warning} Human cost`], "The phrase warns that royal power reaches into families."),
    phrase(I.field, "He Will Take The Tenth Of Your Sheep", "the king will claim part of Israel's resources.", [`${I.hand} Tenth taken`, `${I.field} Flocks`, `${I.crown} Royal support`], "The phrase shows the economic burden of monarchy."),
    phrase(I.warning, "Ye Shall Cry Out In That Day", "Israel will later suffer under the king they demanded.", [`${I.warning} Future cry`, `${I.sorrow} Regret`, `${I.crown} Chosen burden`], "Wanting something badly does not mean it will save."),
  ]),
  section(8, 19, 22, "Israel Still Wants A King", I.people, [
    phrase(I.people, "Nevertheless The People Refused To Obey", "Israel rejects Samuel's warning.", [`${I.people} Refusal`, `${I.ear} Would not listen`, `${I.warning} Desire over wisdom`], "The phrase shows stubbornness after clear instruction."),
    phrase(I.crown, "Nay; But We Will Have A King Over Us", "Israel insists on a king despite the warning.", [`${I.people} Stubborn demand`, `${I.crown} King wanted`, `${I.warning} Warning rejected`], "The phrase shows desire overpowering wisdom."),
    phrase(I.people, "That We Also May Be Like All The Nations", "Israel wants to resemble surrounding nations.", [`${I.crown} Like nations`, `${I.people} Identity pressure`, `${I.warning} Covenant danger`], "The phrase shows the pull of culture around God's people."),
    phrase(I.voice, "Hearken Unto Their Voice", "God permits Samuel to give them a king.", [`${I.voice} God permits`, `${I.crown} King coming`, `${I.warning} Serious mercy`], "The phrase shows God ruling even through Israel's flawed request."),
  ]),
  section(9, 1, 6, "Saul Searches For Donkeys", I.eye, [
    phrase(I.family, "A Mighty Man Of Power", "This means Kish is a man of wealth, standing, and influence.", [`${I.family} Kish`, `${I.hand} Family status`, `${I.crown} Saul introduced`], "The future king enters through an ordinary family errand."),
    phrase(I.eye, "A Choice Young Man, And A Goodly", "Saul is physically impressive.", [`${I.eye} Appearance`, `${I.crown} Kingly look`, `${I.warning} Outward focus`], "The phrase prepares readers to notice the tension between appearance and heart."),
    phrase(I.question, "The Asses Of Kish Saul's Father Were Lost", "Asses is the old Bible word for donkeys. Saul's journey begins because his father's donkeys go missing.", [`${I.question} Lost animals`, `${I.foot} Search begins`, `${I.hand} Providence hidden`], "God can guide a story through ordinary problems."),
    phrase(I.priest, "There Is In This City A Man Of God", "Saul's servant points him toward Samuel.", [`${I.priest} Man of God`, `${I.ear} God speaks`, `${I.crown} King search begins`], "The lost donkeys lead Saul to God's prophet."),
  ]),
  section(9, 7, 10, "Saul Goes To The Seer", I.priest, [
    phrase(I.question, "What Shall We Bring The Man", "Saul wonders what gift they can bring to the prophet.", [`${I.question} What to bring`, `${I.hand} Empty hands`, `${I.priest} Seeking the seer`], "The phrase shows an ordinary custom around approaching a man of God."),
    phrase(I.hand, "The Bread Is Spent In Our Vessels", "Saul says they have no food left to offer.", [`${I.hand} No bread`, `${I.foot} Long search`, `${I.question} Practical concern`], "The phrase keeps the story grounded in real travel and need."),
    phrase(I.priest, "He That Is Now Called A Prophet Was Beforetime Called A Seer", "A seer is an older word for a prophet, someone who receives God's revelation.", [`${I.priest} Seer`, `${I.eye} Seeing by God's revelation`, `${I.book} Word explained`], "The phrase helps beginners understand the Bible's older wording."),
    phrase(I.foot, "They Went Unto The City Where The Man Of God Was", "Saul and his servant follow the road toward Samuel.", [`${I.foot} Journey`, `${I.priest} Man of God`, `${I.hand} Providence moving`], "The phrase shows God's plan unfolding through ordinary steps."),
  ]),
  section(9, 11, 16, "Samuel Is Prepared", I.eye, [
    phrase(I.eye, "The LORD Had Told Samuel In His Ear", "God had already prepared Samuel for Saul's arrival.", [`${I.eye} God reveals`, `${I.ear} Samuel hears`, `${I.hand} Providence`], "The meeting is not random; God is directing it."),
    phrase(I.crown, "Thou Shalt Anoint Him To Be Captain Over My People Israel", "Captain here means ruler or leader. God tells Samuel to appoint Saul over Israel.", [`${I.crown} Anointing`, `${I.people} God's people`, `${I.battle} Deliverance from Philistines`], "The phrase shows kingship beginning under God's permission and purpose."),
    phrase(I.hand, "I Have Looked Upon My People", "God sees Israel's condition and responds.", [`${I.hand} God sees`, `${I.people} Israel`, `${I.sorrow} Their cry heard`], "Even in a flawed request, God is not indifferent to His people."),
    phrase(I.people, "Am Not I A Benjamite", "Saul responds with surprise because his tribe is small.", [`${I.question} Surprise`, `${I.people} Benjamin`, `${I.crown} Unexpected king`], "The phrase shows Saul's early humility and uncertainty."),
  ]),
  section(9, 17, 21, "Samuel Meets Saul", I.hand, [
    phrase(I.eye, "When Samuel Saw Saul", "Samuel recognizes the man God had told him about.", [`${I.eye} Samuel sees`, `${I.crown} Saul identified`, `${I.hand} God's preparation`], "The phrase shows the private revelation becoming visible."),
    phrase(I.hand, "The LORD Said Unto Him", "God confirms Saul to Samuel.", [`${I.hand} God speaks`, `${I.ear} Samuel hears`, `${I.crown} King chosen`], "The phrase keeps Saul's selection under God's direction."),
    phrase(I.question, "Tell Me, I Pray Thee, Where The Seer's House Is", "Saul unknowingly asks Samuel where to find the seer.", [`${I.question} Saul asks`, `${I.priest} Samuel is the seer`, `${I.eye} Hidden identity`], "The phrase adds humility and irony to Saul's meeting."),
    phrase(I.people, "Am Not I A Benjamite", "Saul responds with surprise because his tribe is small.", [`${I.question} Surprise`, `${I.people} Benjamin`, `${I.crown} Unexpected king`], "The phrase shows Saul's early humility and uncertainty."),
  ]),
  section(9, 22, 27, "Saul Is Honored", I.crown, [
    phrase(I.hand, "Made Them Sit In The Chiefest Place", "Samuel gives Saul a place of honor at the meal.", [`${I.hand} Honor`, `${I.crown} Public sign`, `${I.people} Guests watching`], "The action quietly signals Saul's coming role."),
    phrase(I.field, "That Which Is Left", "Samuel had saved a special portion for Saul.", [`${I.field} Reserved portion`, `${I.hand} Prepared ahead`, `${I.crown} Saul singled out`], "The phrase shows preparation before Saul even understood what was happening."),
    phrase(I.house, "Communed With Saul Upon The Top Of The House", "Samuel speaks privately with Saul.", [`${I.house} Rooftop talk`, `${I.ear} Instruction`, `${I.crown} Calling clarified`], "The future king receives personal preparation."),
    phrase(I.scroll, "That I May Shew Thee The Word Of God", "Samuel tells Saul to stay so he can hear God's message.", [`${I.scroll} Word of God`, `${I.ear} Saul must listen`, `${I.crown} Calling under God's word`], "Kingship must begin by hearing God, not grabbing power."),
  ]),
  section(10, 1, 6, "Saul Is Anointed", I.oil, [
    phrase(I.oil, "Samuel Took A Vial Of Oil", "Samuel uses oil to set Saul apart for kingship.", [`${I.oil} Anointing oil`, `${I.crown} King appointed`, `${I.hand} Sacred sign`], "The phrase shows Saul's role is given, not seized."),
    phrase(I.crown, "Captain Over His Inheritance", "His inheritance means the LORD's people Israel. Saul is made ruler over a people who already belong to God.", [`${I.crown} Captain`, `${I.people} God's inheritance`, `${I.hand} Stewardship`], "Israel belongs to God before it belongs under any king."),
    phrase(I.eye, "Thou Shalt Meet A Company Of Prophets", "Saul will encounter prophetic worship on the road.", [`${I.eye} Sign`, `${I.prayer} Prophets`, `${I.glory} Spirit at work`], "The signs confirm that God is truly directing the moment."),
    phrase(I.heart, "Shalt Be Turned Into Another Man", "This means God will change Saul inwardly for the task ahead.", [`${I.heart} Changed man`, `${I.glory} Spirit's work`, `${I.crown} Equipped for calling`], "Leadership requires more than appearance. It needs God's work inside the person."),
  ]),
  section(10, 7, 8, "Saul Must Wait For Samuel", I.hand, [
    phrase(I.hand, "Let It Be, When These Signs Are Come Unto Thee", "Saul is told to respond after God confirms the signs.", [`${I.hand} Signs confirmed`, `${I.eye} Saul will see`, `${I.crown} Calling strengthened`], "The phrase shows God giving Saul evidence before public kingship."),
    phrase(I.glory, "Do As Occasion Serve Thee", "This means Saul may act as the situation requires once God has confirmed the signs.", [`${I.hand} Act wisely`, `${I.glory} God with him`, `${I.crown} New responsibility`], "The phrase connects action with God's presence."),
    phrase(I.prayer, "Thou Shalt Go Down Before Me To Gilgal", "Samuel gives Saul a specific instruction about waiting.", [`${I.prayer} Gilgal`, `${I.ear} Instruction`, `${I.crown} King under prophet's word`], "The phrase reminds Saul that kingship is still under God's command."),
    phrase(I.warning, "Seven Days Shalt Thou Tarry", "Saul is told to wait for Samuel.", [`${I.warning} Waiting`, `${I.hand} Obedience tested`, `${I.book} Future importance`], "This instruction will matter later in Saul's story."),
  ]),
  section(10, 9, 13, "God Gives Saul Another Heart", I.heart, [
    phrase(I.heart, "God Gave Him Another Heart", "God inwardly changes Saul as he turns from Samuel.", [`${I.heart} New heart`, `${I.hand} God's work`, `${I.crown} Leadership preparation`], "The phrase shows that the real change begins inside."),
    phrase(I.glory, "The Spirit Of God Came Upon Him", "God's Spirit empowers Saul in a visible way.", [`${I.glory} Spirit`, `${I.voice} Prophecy`, `${I.crown} Empowered king`], "The phrase shows God's power, not Saul's natural ability."),
    phrase(I.question, "Is Saul Also Among The Prophets", "people are surprised to see Saul prophesying.", [`${I.question} Surprise`, `${I.voice} Prophecy`, `${I.eye} Public sign`], "The phrase shows the change is noticeable."),
    phrase(I.scroll, "Of The Matter Of The Kingdom, Whereof Samuel Spake", "Saul keeps the kingship matter private for the moment.", [`${I.scroll} Kingdom matter`, `${I.hand} Restraint`, `${I.crown} Not self-promoting`], "The phrase shows Saul not rushing to announce himself."),
  ]),
  section(10, 14, 16, "Saul Keeps The Kingdom Matter Quiet", I.scroll, [
    phrase(I.question, "Whither Went Ye", "Whither means where. Saul's uncle is asking where Saul and his servant went.", [`${I.question} Family question`, `${I.house} Ordinary conversation`, `${I.crown} Hidden calling`], "The phrase shows Saul returning to ordinary life after a sacred moment."),
    phrase(I.hand, "To Seek The Asses", "Saul explains the original purpose of the trip.", [`${I.hand} Lost donkeys`, `${I.foot} Search journey`, `${I.crown} Providence hidden`], "The phrase reminds readers how ordinary the path to kingship looked."),
    phrase(I.priest, "We Came To Samuel", "Saul says they met the prophet.", [`${I.priest} Samuel`, `${I.ear} Word from God`, `${I.crown} Calling known`], "The phrase points back to the meeting that changed Saul's future."),
    phrase(I.scroll, "Of The Matter Of The Kingdom, Whereof Samuel Spake", "Saul keeps the kingship matter private for the moment.", [`${I.scroll} Kingdom matter`, `${I.hand} Restraint`, `${I.crown} Not self-promoting`], "The phrase shows Saul not rushing to announce himself."),
  ]),
  section(10, 17, 22, "Saul Is Chosen Publicly", I.crown, [
    phrase(I.people, "Samuel Called The People Together Unto The LORD", "the public choosing happens before God.", [`${I.people} Assembly`, `${I.prayer} Before the LORD`, `${I.crown} King revealed`], "The phrase keeps the coronation moment under God's authority."),
    phrase(I.warning, "Ye Have This Day Rejected Your God", "Samuel reminds Israel that their request carried rejection.", [`${I.warning} Rejection`, `${I.crown} King demanded`, `${I.hand} God their Savior`], "The king is given, but the warning remains."),
    phrase(I.question, "He Hath Hid Himself Among The Stuff", "Stuff here means the baggage or supplies. Saul hides among the baggage when he is publicly chosen.", [`${I.question} Hiding`, `${I.crown} Chosen king`, `${I.sorrow} Fear or humility`], "The phrase shows Saul's uncertainty at the beginning."),
    phrase(I.eye, "See Ye Him Whom The LORD Hath Chosen", "Samuel presents Saul as the LORD's chosen king.", [`${I.eye} Look`, `${I.crown} Chosen`, `${I.people} Israel sees`], "The phrase marks the public beginning of Saul's reign."),
  ]),
  section(10, 23, 27, "The People See Their King", I.eye, [
    phrase(I.eye, "They Ran And Fetched Him Thence", "the people bring Saul out from hiding.", [`${I.eye} Saul found`, `${I.people} Public moment`, `${I.crown} King revealed`], "The phrase shows Saul being drawn into the role he did not seize."),
    phrase(I.people, "He Was Higher Than Any Of The People", "Saul's height makes him visually impressive.", [`${I.people} Taller than others`, `${I.eye} Outward appearance`, `${I.crown} Kingly look`], "The phrase helps readers understand why Saul looks like an obvious king."),
    phrase(I.eye, "See Ye Him Whom The LORD Hath Chosen", "Samuel presents Saul as the LORD's chosen king.", [`${I.eye} Look`, `${I.crown} Chosen`, `${I.people} Israel sees`], "The phrase marks the public beginning of Saul's reign."),
    phrase(I.warning, "The Children Of Belial Said, How Shall This Man Save Us", "Children of Belial means worthless and rebellious men. They reject Saul immediately.", [`${I.warning} Rejection`, `${I.question} Doubt`, `${I.crown} Divided response`], "The phrase shows tension around Saul from the very beginning."),
  ]),
  ...DAY_61_80_FIRST_SAMUEL_1_10_SUPPLEMENTAL_SECTIONS.filter((section) => section.chapter < 1 || section.chapter > 10),
];
