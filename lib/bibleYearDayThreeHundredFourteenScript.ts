import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 314, written to the Day 1 standard.
 *
 * Acts 16-18: Timothy joins the team, the Spirit blocks two roads and opens a
 * third with a vision of a man in Macedonia, a slave girl's deliverance gets
 * Paul and Silas beaten and jailed in Philippi, an earthquake and a jailer's
 * question, Thessalonica and Berea, the Areopagus sermon in Athens, and
 * eighteen months in Corinth that survive a Roman court. Seven blocks,
 * matching Day 313.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_FOURTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 314,
  title: "Gospel Across the Cities",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 314. Paul picks up a new companion, and then the Spirit starts closing doors.", 800],
    ["Not opening them. Closing them. Twice, on purpose, until only one road is left.", 800],
    ["That road ends with a jail cell, an earthquake at midnight, and a question that still gets asked today.", 850],
    ["From there it's Thessalonica, Berea, and a sermon on a hill in Athens to a crowd that has an altar for a god they can't even name.", 850],
    ["We are in Acts 16, 17, and 18. The gospel crosses into Europe for the first time.", 800],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(16, 1, 15, [
      "In Lystra Paul finds Timothy, well spoken of by the believers there, and takes him along, circumcising him first so he won't be a stumbling block to the Jews in that region.",
      "Then something strange happens. They try to preach in Asia and are forbidden by the Holy Ghost. They try for Bithynia and the Spirit doesn't let them go there either. Two doors, both shut, with no explanation given.",
      "That night Paul sees a vision. A man of Macedonia, standing there, saying, come over into Macedonia and help us. So they sail for Philippi, sure now that God had called them to preach the gospel there.",
      "On the sabbath they find a group of women praying by a river, and one of them, Lydia, a seller of purple, listens because the Lord opened her heart. She and her household are baptized, and she basically won't take no for an answer when she invites them to stay in her home.",
    ]),
    g(16, 16, 24, [
      "A slave girl with a spirit of divination starts following them, shouting the truth about them for days — these men are servants of the most high God. True words, but Paul is grieved by where they're coming from, and finally turns and casts the spirit out in the name of Jesus.",
      "The moment her masters realize their profit is gone, the story stops being about spirits and starts being about money. They drag Paul and Silas before the magistrates.",
      "Notice what the charge actually is. Not blasphemy. These men are Jews, and they trouble our city, teaching customs not lawful for Romans to receive. The real issue was never doctrine. It was income.",
      "The crowd turns on them, the magistrates tear their clothes off and order them beaten, and Paul and Silas end up in the inner prison with their feet locked in stocks — for setting a girl free.",
    ]),
    g(16, 25, 40, [
      "At midnight, backs torn open, feet in stocks, Paul and Silas are praying and singing hymns, and the other prisoners are listening. Then a great earthquake shakes the foundations, every door flies open, and every chain falls loose.",
      "The jailer wakes up, sees the doors standing open, and draws his sword to kill himself — Roman law would have executed him anyway for losing his prisoners. Paul shouts into the dark, do thyself no harm, for we are all here.",
      "The man falls down trembling and asks the only question that matters. Sirs, what must I do to be saved? Believe on the Lord Jesus Christ, and thou shalt be saved, and thy house. He washes their wounds before they've even left the cell, and he and his whole household are baptized that same hour, in the middle of the night.",
      "In the morning the magistrates quietly try to let them go. Paul says no — they beat us publicly, uncondemned, as Roman citizens, and now they want to sneak us out? Let them come themselves. The magistrates arrive frightened, and Paul and Silas leave on their own terms, straight to Lydia's house to encourage the church before moving on.",
    ]),
    g(17, 1, 15, [
      "In Thessalonica Paul reasons from the scriptures three sabbaths running, showing that the Christ had to suffer and rise, and that Jesus is that Christ. Some believe. Others, moved with envy, gather a mob and start a riot in the city, dragging believers before the rulers instead.",
      "The charge this time: these that have turned the world upside down are come here too. It's meant as an insult. It's actually the most accurate thing anyone says about them all day.",
      "The brothers send Paul and Silas out by night to Berea, and Luke stops to say something specific about the people there. They were more noble than those in Thessalonica — they received the word with readiness, and searched the scriptures daily to see if it was so.",
      "That's not blind faith and it's not skepticism either. It's checking the message against the text every single day. Many of them believe — until the Thessalonian troublemakers follow them there too, and Paul has to leave again, this time alone.",
    ]),
    g(17, 16, 34, [
      "Waiting alone in Athens, Paul's spirit is stirred — the city is wholly given to idols. So he does what he always does: he goes to the synagogue, and he goes to the marketplace, every day, talking with whoever is there.",
      "Philosophers call him a babbler and drag him to the Areopagus to explain himself. Paul doesn't insult them. He starts with what they already have. I found an altar with this inscription: TO THE UNKNOWN GOD. Him therefore whom ye ignorantly worship, I declare unto you.",
      "Then he builds from their own poets to the real point. God made the world, doesn't live in temples built by hands, gives life and breath to everyone, and made every nation from one blood so they would seek him — though he is not far from any one of us. For in him we live, and move, and have our being.",
      "He lands it on the resurrection, and the room splits right there. Some mock. Some say, we will hear thee again of this. And a few believe on the spot — Dionysius, a woman named Damaris, and others. Athens never becomes a church like Philippi or Corinth. Paul preaches there once, and moves on.",
    ]),
    g(18, 1, 17, [
      "Paul comes to Corinth and finds Aquila and Priscilla, tentmakers like himself, recently forced out of Rome. He stays and works with them, then reasons in the synagogue every sabbath, testifying that Jesus is the Christ.",
      "When they resist and blaspheme, he shakes out his robe and says, your blood be upon your own heads. I am clean. From now on I go to the Gentiles. Crispus, the ruler of that same synagogue, believes anyway, with his whole house.",
      "Then, at night, in a vision: be not afraid, but speak, and hold not thy peace. For I am with thee, and no man shall set on thee to hurt thee. For I have much people in this city. So Paul stays a year and six months — his longest stop yet.",
      "The Jews finally drag him before Gallio, the Roman governor, expecting a conviction. Gallio doesn't even let Paul open his mouth. If it were a crime, I'd hear you out. But this is a dispute about your own law — look to it yourselves. And he throws the case out of court. A door the mob tried to close stays open by a Roman's indifference.",
    ]),
    g(18, 18, 28, [
      "Paul stays on a while longer, then sails for Syria with Priscilla and Aquila, having shorn his head at Cenchrea because of a vow he'd made. Even mid-mission, he's still keeping promises made to God in private.",
      "At Ephesus he reasons in the synagogue, and when they ask him to stay longer, he won't — but he leaves them with a promise. I will return again unto you, if God will. Then on to Caesarea, up to greet the church, and back to Antioch, where this whole second journey began.",
      "After some time there he heads out again, strengthening the disciples through Galatia and Phrygia in order — going back to check on churches he'd already planted, not just starting new ones.",
      "Meanwhile in Ephesus, Apollos shows up — eloquent, mighty in the scriptures, fervent in spirit, but only knowing the baptism of John. He's already teaching boldly with what he has. Priscilla and Aquila hear him, take him aside, and expound the way of God to him more perfectly. No public correction. Just two believers quietly filling in what an already-gifted teacher was missing.",
    ]),
  ],
  closing: [
    ["So that is Day 314.", 700],
    ["Two doors shut in a row, and then a vision that finally tells Paul where to go.", 750],
    ["A slave girl set free, and the men who freed her beaten for it because someone else's money was involved.", 800],
    ["At midnight, in chains, Paul and Silas were singing. The jailer's whole world cracked open, and the first thing he asked was how to be saved.", 850],
    ["In Berea people didn't just take Paul's word for it. They checked the scriptures daily to see if it was so. That's still the standard.", 850],
    ["In Athens, Paul didn't tear down what the crowd believed. He started with their own altar and pointed it at the true God.", 850],
    ["And Priscilla and Aquila show you something quieter but just as important — a gifted man named Apollos, corrected in private, with no crowd watching.", 850],
    ["Tomorrow, Acts 19 through 21. Paul spends years in Ephesus, says his hardest goodbye yet, and heads toward Jerusalem knowing what's waiting for him.", 850],
    ["For now, carry the jailer's question.", 750],
    ["Sirs, what must I do to be saved?", 1200],
  ],
};
