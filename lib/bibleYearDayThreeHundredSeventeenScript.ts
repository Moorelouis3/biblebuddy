import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 317, written to the Day 1 standard.
 *
 * Acts 25-27: Paul appeals to Caesar rather than walk into a Jerusalem
 * ambush disguised as a fair trial, stands before King Agrippa and almost
 * persuades him, and then sails straight into a two-week storm that takes
 * the ship but saves every soul on board. Seven blocks, matching Day 316.
 */

const g = (chapter: number, startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Acts ${chapter}:${startVerse}-${endVerse}`,
  book: "acts",
  chapter,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_THREE_HUNDRED_SEVENTEEN_SCRIPT: BibleYearDayScript = {
  dayNumber: 317,
  title: "Paul Appeals and Sails Through Storm",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 317. A new governor takes over, and the same old plan comes with him — get Paul back to Jerusalem, and kill him on the road.", 800],
    ["Paul sees it coming and does something nobody expects. He appeals straight to Caesar.", 800],
    ["Then he stands in front of a king, tells his whole story again, and gets an answer that is almost a yes.", 850],
    ["After that he boards a ship for Rome, and the weather turns on him — two weeks of storm, no sun, no stars, every man on board sure he is about to drown.", 850],
    ["We are in Acts 25, 26, and 27. An appeal, a king who is almost persuaded, and a shipwreck that saves everyone anyway.", 850],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    g(25, 1, 12, [
      "Festus barely settles into office before the chief priests and leading Jews bring the same request straight to him — send for Paul to come to Jerusalem. Luke tells us plainly why: they are laying an ambush to kill him on the road.",
      "Festus refuses, but not out of loyalty to Paul. He simply says the accusers can come down to Caesarea and make their case there. When they do, they lay many grievous charges they cannot prove, while Paul answers that he has offended neither the Jewish law, the temple, nor Caesar.",
      "Festus, wanting to please the Jews, asks Paul if he is willing to go to Jerusalem and be judged there before him. It is the same trap in a gentler voice.",
      "Paul does not flinch. If I have done wrong, worthy of death, I do not refuse to die. But if these charges are false, no one may hand me over to them. I appeal unto Caesar. Festus checks with his council and gives the only answer left — unto Caesar shalt thou go. One sentence closes a door that had been open for two years.",
    ]),
    g(25, 13, 27, [
      "King Agrippa and Bernice arrive in Caesarea to greet Festus, and the new governor, still not sure what to write to Rome, lays Paul's case out for the king. He admits the accusers brought no real crime — only questions of their own religion, and about one Jesus, who was dead, whom Paul kept insisting was alive.",
      "Agrippa asks to hear the man himself, and Festus agrees to arrange it the next day.",
      "The hearing opens with real pageantry — Agrippa and Bernice enter with great pomp, chief captains and leading men of the city seated around them, all to hear a prisoner Rome has already agreed to send to Caesar regardless of what is said in this room.",
      "Festus admits it outright to the assembled crowd. He has found nothing worthy of death in Paul, but since Paul has appealed to Augustus, he needs something specific to write. The whole formal hearing exists only so a governor can fill out a report properly. God is using an administrative formality to put Paul in front of a king.",
    ]),
    g(26, 1, 11, [
      "Agrippa gives Paul the floor, and Paul opens not with fear but with something close to gratitude — he counts it a privilege to answer for himself before a king who actually knows Jewish customs and controversies.",
      "He starts where he always starts: his own life. Raised a Pharisee, of the strictest sect, living exactly as his accusers themselves claim to live, hoping for the very promise God made to the fathers that all twelve tribes still hope to receive.",
      "Then he turns the accusation back on itself. Why should it be thought incredible that God raises the dead? The very hope his accusers hold is the thing they are prosecuting him for believing has actually happened.",
      "And he does not hide from what he used to be. He persecuted the name of Jesus, shut up believers in prison, voted for their deaths, forced them to blaspheme, and chased them down even in strange cities, exceedingly mad against them. No excuse offered. Just the plain record.",
    ]),
    g(26, 12, 23, [
      "Paul tells the Damascus road story a third time in this book, and this time one detail lands differently in front of a king — the voice speaking in the Hebrew tongue says it is hard for him to kick against the pricks, like an ox fighting the very goad meant to guide it.",
      "Jesus does not just stop Paul. He commissions him on the spot — rise, stand on your feet, I have appeared to make you a minister and a witness of what you have seen and of what I will still show you.",
      "The mission is stated plainly: sent to open blind eyes, turn people from darkness to light and from the power of Satan to God, so they receive forgiveness of sins and a place among those made holy by faith in him.",
      "Paul says the only thing left to say. I was not disobedient to the heavenly vision. He preached repentance first at Damascus, then Jerusalem, then all through Judea, and then to the Gentiles — obedience that cost him the very chains he is standing in right now.",
    ]),
    g(26, 24, 32, [
      "Festus cannot take it anymore and interrupts loudly — Paul, thou art beside thyself. Too much learning has driven you mad. It is the easiest way to dismiss a claim without answering it.",
      "Paul does not raise his voice back. I am not mad, most noble Festus, but speak forth words of truth and soberness. Then he turns straight to the king. This was not done in a corner. You know these things, Agrippa, because you believe the prophets. I know that thou believest.",
      "Agrippa's answer is honest in a way that should unsettle you. Almost thou persuadest me to be a Christian. Not a yes. Not a no either. A man standing right at the edge and choosing to stay there.",
      "Paul's reply carries no bitterness at being so close and getting nothing. I would to God that not only thou, but all who hear me this day, were both almost and altogether such as I am — except these bonds. When the room clears, everyone agrees Paul has done nothing worthy of death or chains. Agrippa even says he could have gone free, if he had not already appealed to Caesar. The appeal that saved his life is also the thing now sending him to Rome in chains regardless.",
    ]),
    g(27, 1, 20, [
      "Paul boards a ship for Italy under the centurion Julius, who treats him with real kindness — letting him visit friends at Sidon, no small mercy for a prisoner. Aristarchus, a friend from Thessalonica, travels with him.",
      "The trip turns hard fast. Contrary winds, slow sailing, a switch to another ship at Myra, and by the time they reach Crete the fast is already past — deep into the season no one sailed in on purpose. Paul warns them plainly that this voyage will bring hurt and much damage, not just to cargo but to lives.",
      "The centurion trusts the ship's owner and captain over Paul's warning, and the majority vote to try for a better harbor. A gentle south wind convinces them they have made the right call.",
      "Then Euroclydon hits — a violent, sudden wind that seizes the ship and will not let it turn back into the wind. For days they cannot see sun or stars, they throw cargo and tackle overboard with their own hands, and Luke says plainly: all hope that we should be saved was then taken away.",
    ]),
    g(27, 21, 44, [
      "In the middle of that hopelessness Paul stands up and speaks — not to gloat that he had warned them, though he mentions it, but to give them something to hold onto. Be of good cheer. An angel of God told him last night that he must stand before Caesar, and that God has given him everyone on this ship. Every life on board is being spared as a kind of overflow from the promise made to one man.",
      "On the fourteenth night the sailors sense land, sound the depth twice, and drop four anchors, terrified of running aground on rocks in the dark. When some of the crew try to quietly escape in the ship's boat and abandon the passengers, Paul tells the centurion plainly — unless these men stay with the ship, you cannot be saved. The soldiers cut the boat loose before anyone can slip away.",
      "As daylight nears, Paul urges everyone to eat after fourteen days of fasting and fear, promising not a hair on their heads will be lost. He takes bread, gives thanks to God in front of all two hundred seventy-six people on board, breaks it, and eats — and it steadies the whole crew enough that they finally eat too.",
      "When day comes they run the ship aground on a sandbar, the stern breaking apart under the waves while the bow holds fast. Soldiers want to kill the prisoners rather than risk an escape in the chaos, but the centurion, wanting to save Paul, stops them. Some swim, some ride broken pieces of the wreck, and every single person on that ship reaches land alive — exactly as the angel said.",
    ]),
  ],
  closing: [
    ["So that is Day 317.", 700],
    ["A governor tried to dress up the same old ambush as a fair trial, and Paul closed the door on it with two words. I appeal.", 750],
    ["That appeal put him in chains headed for Rome, and it also put him in front of a king who might never have heard the gospel any other way.", 800],
    ["Agrippa got as close to the truth as a person can get without stepping over the line. Almost persuaded. Paul answered him with love instead of contempt for stopping short.", 850],
    ["Then came fourteen days of storm with no sun, no stars, and no hope left — and one man who had already been told by an angel that he would stand before Caesar kept two hundred seventy-six strangers alive on that promise.", 850],
    ["The ship that carried him did not survive the trip. Every person on it did.", 800],
    ["Tomorrow, Acts 28 and Romans 1 and 2 — Paul finally reaches Rome, and Scripture starts laying out the case for why every human being, Jew and Gentile alike, needs exactly what he has been preaching this whole time.", 850],
    ["For now, carry Paul's word to a frightened crew in the dark.", 750],
    ["Be of good cheer.", 800],
    ["Not one of you will be lost.", 1200],
  ],
};
