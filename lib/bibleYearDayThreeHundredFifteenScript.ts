import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 315, written to the Day 1 standard.
 *
 * Acts 19-21: two years in Ephesus that shake a whole city's economy, a
 * young man raised from the dead at midnight, Paul's farewell to the
 * Ephesian elders on the beach at Miletus, a prophet binding himself with
 * Paul's own belt to warn him what Jerusalem holds, and Paul walking into
 * that city anyway. Seven blocks, matching Day 314.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 315,
  title: "Ephesus, Farewell, and Jerusalem",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 315. Paul settles into Ephesus for two straight years, and the whole city feels it.", 800],
    ["A riot breaks out over silver idols. A young man falls asleep during a sermon and dies. Paul raises him and keeps preaching until sunrise.", 850],
    ["Then comes the hardest goodbye in the book of Acts — grown men falling on his neck, weeping, because he told them straight out they'd never see his face again.", 850],
    ["And after that, Paul heads toward Jerusalem anyway, even after a prophet ties himself up with Paul's own belt to show him exactly what's waiting there.", 850],
    ["We are in Acts 19, 20, and 21. Miracles, a farewell, and a man walking toward danger with his eyes open.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(19, 1, 10, [
      "In Ephesus Paul finds disciples who don't even know there is a Holy Ghost. They'd only received John's baptism of repentance. Paul explains John pointed to someone coming after him — Jesus. They're baptized in the name of the Lord Jesus, Paul lays hands on them, and the Holy Ghost comes, tongues and prophecy included.",
      "For three months Paul speaks boldly in the synagogue about the kingdom of God. When some harden and speak evil of the Way in public, he doesn't argue them down. He just takes the disciples and moves to the school of Tyrannus.",
      "That lasts two years — long enough that all of Asia, Jews and Greeks both, hear the word of the Lord. Two years in one rented lecture hall reaching a whole province.",
      "This is the longest single stop in Paul's ministry so far. Not a dramatic breakthrough. Just two years of showing up daily in the same room.",
    ]),
    g(19, 11, 20, [
      "God works special miracles by Paul's hands — even handkerchiefs and aprons that touched him carry healing when brought to the sick, and evil spirits leave people just from that.",
      "Some traveling Jewish exorcists try to copy it as a formula, invoking the name of Jesus whom Paul preaches over a man with an evil spirit. The spirit answers back: Jesus I know, and Paul I know, but who are you? The man overpowers all seven of them, and they run out of the house naked and wounded.",
      "Word spreads through Ephesus, fear falls on everyone, and the name of the Lord Jesus is magnified — not because of a slogan that worked, but because of one that clearly didn't, for people with no real relationship to him.",
      "Many who had believed now come forward and openly confess what they'd been doing in secret. People who practiced curious arts bring their books together and burn them in public — fifty thousand pieces of silver worth, by the count. So mightily grew the word of God, and prevailed.",
    ]),
    g(19, 21, 41, [
      "Paul sets his heart on Jerusalem, then Rome, and sends Timothy and Erastus ahead while he stays in Asia a while longer. That's when the real trouble starts.",
      "Demetrius, a silversmith who makes shrines of the goddess Diana, calls the other craftsmen together. Sirs, you know our wealth comes from this trade — and this Paul has persuaded crowds all over Asia that gods made by hands aren't gods at all. Our business is in danger, and so is the temple of the great goddess Diana.",
      "The whole city fills with confusion. They drag two of Paul's companions into the theater, and for about two hours the crowd just chants, great is Diana of the Ephesians, most of them not even sure why they'd gathered.",
      "The town clerk finally calms them down. These men haven't robbed any temple or blasphemed your goddess. If Demetrius has a case, the courts are open — don't risk a riot charge over something the law can settle properly. It works. He dismisses the crowd, and the gospel survives without a single sermon needed to save it.",
    ]),
    g(20, 1, 16, [
      "After the uproar Paul embraces the disciples and heads for Macedonia, then Greece, staying three months before a Jewish plot forces him to change his route back through Macedonia instead of sailing straight for Syria.",
      "At Troas, on the first day of the week, believers gather to break bread and Paul preaches — so long that he's still going at midnight. A young man named Eutychus, sitting in a window, drifts off to sleep and falls three stories down. They pick him up dead.",
      "Paul goes down, falls on him, and says, trouble not yourselves, for his life is in him. Then he goes back upstairs, breaks bread, keeps talking until daybreak, and leaves. They carry the young man home alive, more than a little comforted.",
      "From there it's a string of short island stops — Assos, Mitylene, Chios, Samos, Miletus — Paul on foot part of the way, hurrying because he wants to reach Jerusalem by Pentecost.",
    ]),
    g(20, 17, 38, [
      "At Miletus, Paul sends for the elders of the Ephesian church rather than detour back himself. When they arrive, he doesn't look back on success. He looks back on how he served — with humility, with tears, through trials the Jews set against him — and how he kept back nothing profitable, teaching them publicly and house to house.",
      "Now he tells them plainly: I go bound in the spirit to Jerusalem, not knowing what will happen there, except that the Holy Ghost testifies in every city that bonds and afflictions wait for me. None of these things move me — I only want to finish my course with joy, the ministry I received from the Lord Jesus.",
      "Then the warning. After I leave, grievous wolves will come in among you, not sparing the flock. Even some of your own will rise up speaking perverse things to draw disciples away. Watch, and remember I warned every one of you, night and day, with tears, for three years.",
      "He kneels and prays with them, and they weep hard, falling on his neck and kissing him — grieving most over one line: that they would see his face no more. And they walk him all the way to the ship.",
    ]),
    g(21, 1, 16, [
      "The journey continues by sea — Coos, Rhodes, Patara, then a ship straight to Phoenicia. At Tyre they find disciples who tell Paul through the Spirit not to go up to Jerusalem. He goes anyway, after they all kneel and pray together on the beach.",
      "At Caesarea they stay with Philip the evangelist, whose four daughters prophesy. Then a prophet named Agabus comes down from Judea, takes Paul's own belt, binds his hands and feet with it, and says, thus saith the Holy Ghost — so shall the Jews at Jerusalem bind the man who owns this belt, and hand him to the Gentiles.",
      "Everyone within earshot begs Paul not to go. Paul answers, what do you mean, weeping and breaking my heart? I'm ready not only to be bound, but to die at Jerusalem for the name of the Lord Jesus.",
      "When he won't be talked out of it, they stop trying and just say, the will of the Lord be done. Not agreement. Surrender to a decision they can't change.",
    ]),
    g(21, 17, 40, [
      "In Jerusalem the believers receive Paul gladly. He meets with James and all the elders and reports in detail everything God had done among the Gentiles through his ministry. They glorify God — but then raise a concern. Thousands of Jewish believers there are zealous for the law, and they've heard Paul teaches Jews abroad to abandon Moses.",
      "Their fix: join four men under a vow, pay their expenses, and be purified with them publicly, so everyone can see the rumors are false. Paul agrees and goes to the temple to do it.",
      "Before the days are finished, Jews from Asia spot him in the temple, stir up the crowd, and drag him out, shouting that he's brought a Gentile into the sacred space. The whole city erupts. They're beating him, trying to kill him, when word reaches the Roman commander that Jerusalem is in chaos.",
      "Soldiers rush in, pull Paul out from the mob, and bind him in two chains, not even sure yet who he is. As he's being carried into the barracks, Paul asks the commander, in fluent Greek, for permission to speak to the people. It's granted. He stands on the stairs, raises his hand for silence, and begins — in Hebrew.",
    ]),
  ],
  closing: [
    ["So that is Day 315.", 700],
    ["Two quiet years in one lecture hall in Ephesus did more than any single dramatic moment could have.", 750],
    ["A city's whole economy turned against Paul because the gospel was actually working — idols made by hands don't sell as well once people stop believing in them.", 800],
    ["Paul told the Ephesian elders the truth instead of a comfortable goodbye. He warned them about wolves before he ever left, because he loved them enough not to let them find out the hard way.", 850],
    ["Then a prophet tied himself up with Paul's own belt to show him exactly what was coming, and Paul went toward it anyway. Not recklessness. He just wanted to finish the course he was given.", 850],
    ["By the end of today he's in chains in a Roman barracks, about to speak to the very crowd that just tried to kill him.", 800],
    ["Tomorrow, Acts 22 through 24. Paul makes his defense — first to the mob, then to a council, then to a Roman governor who leaves him sitting in prison for two years.", 850],
    ["For now, carry what Paul told the Ephesian elders.", 750],
    ["None of these things move me.", 800],
    ["I only want to finish my course with joy.", 1200],
  ],
};
