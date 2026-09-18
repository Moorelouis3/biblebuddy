import type { BibleYearDayScript } from "./bibleYearDayScript";

/**
 * Day 282, written to the Day 1 standard.
 *
 * Jesus comes down off the mountain from the Sermon and starts backing it up:
 * a paralytic forgiven and healed, Matthew called from the tax booth, a
 * ruler's daughter raised, a woman healed by a touch, two blind men, a mute
 * man freed. Then He hands that same authority to twelve ordinary men and
 * tells them plainly what it will cost. John the Baptist, in prison, sends
 * one honest question. Seven blocks across Matthew 9-11.
 */

const matthewNine = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 9:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 9,
  startVerse,
  endVerse,
  teaching,
});

const matthewTen = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 10:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 10,
  startVerse,
  endVerse,
  teaching,
});

const matthewEleven = (startVerse: number, endVerse: number, teaching: string[]) => ({
  reference: `Matthew 11:${startVerse}-${endVerse}`,
  book: "matthew",
  chapter: 11,
  startVerse,
  endVerse,
  teaching,
});

export const BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_TWO_SCRIPT: BibleYearDayScript = {
  dayNumber: 282,
  title: "Compassion, Mission, and Invitation",
  opening: [
    ["Hey. Welcome back.", 700],
    ["Day 282. Jesus just came down off the mountain, and now He starts proving it.", 800],
    ["A paralyzed man walks. A tax collector gets called by name. A woman touches a robe in a crowd and it is enough.", 850],
    ["Then He hands that same power to twelve ordinary men, and tells them exactly what it will cost them.", 850],
    ["By the end, even John the Baptist, sitting in prison, is not sure anymore.", 850],
    ["We are in Matthew 9, 10, and 11.", 650],
    ["Take a breath. Let's go.", 900],
  ],
  blocks: [
    matthewNine(1, 13, [
      "They bring a man sick of the palsy, lying on a bed, and Jesus says something nobody asked for. Son, be of good cheer; thy sins be forgiven thee. The man came for his legs. Jesus goes for what was actually broken first.",
      "The scribes say this inside themselves. This man blasphemeth. Jesus knows their thoughts and asks which is easier, to say thy sins be forgiven thee, or to say, Arise, and walk. Then He does the harder one to prove the invisible one was real. Arise, take up thy bed, and go unto thine house. And he arose, and departed to his house.",
      "He passes a tax booth and sees a man named Matthew sitting in it. Follow me. And he arose, and followed him. No résumé. No cleanup first. Two words and a decision.",
      "Then Jesus eats at that man's house, with publicans and sinners, and the Pharisees ask why. They that be whole need not a physician, but they that are sick. I am not come to call the righteous, but sinners to repentance. If you are waiting to get clean enough to come to His table, you have misread the invitation.",
    ]),
    matthewNine(14, 26, [
      "John's disciples ask why Jesus' disciples do not fast. Can the children of the bridechamber mourn, as long as the bridegroom is with them? The days will come when the bridegroom is taken, and then they will fast. Something new is standing in front of them, and the old categories do not fit it yet.",
      "No man putteth new wine into old bottles, He says, or the bottles break and the wine is spilled. He is not talking about fashion. He is telling them that what He brought cannot be squeezed into what they already had.",
      "A ruler comes and worships Him. My daughter is even now dead, but come and lay thy hand upon her, and she shall live. On the way, a woman who had an issue of blood twelve years comes up behind Him and touches the hem of His garment, saying to herself, if I may but touch His garment, I shall be whole. Jesus turns and finds her. Daughter, be of good comfort; thy faith hath made thee whole. Not the touch. The faith behind it.",
      "At the ruler's house, mourners are already there, and they laugh Him to scorn when He says the maid is not dead, but sleepeth. He puts them out anyway, takes her by the hand, and she arises. Their mockery did not slow Him down for a second.",
    ]),
    matthewNine(27, 38, [
      "Two blind men follow Him crying, thou Son of David, have mercy on us. Before He touches their eyes, He asks a question. Believe ye that I am able to do this? Faith is not a bonus feature here. It is what He asks for before anything happens. According to your faith be it unto you.",
      "A man possessed with a devil, and unable to speak, is brought to Him. He is healed, and the dumb spake. Nothing about this man earned it except being brought to Jesus.",
      "The multitude marvels, saying, it was never so seen in Israel. The Pharisees watch the exact same miracle and say, he casteth out devils through the prince of the devils. Same evidence, two completely different verdicts.",
      "Jesus goes through every city and village, teaching, preaching, healing every sickness, and when He sees the crowds He is moved with compassion, because they are scattered, as sheep having no shepherd. The harvest truly is plenteous, but the labourers are few. Pray ye therefore the Lord of the harvest, that he will send forth labourers. He does not just feel something for them. He tells you what to do about it.",
    ]),
    matthewTen(1, 15, [
      "He calls His twelve disciples and gives them power against unclean spirits, to cast them out, and to heal all manner of sickness and all manner of disease. The authority comes before the assignment, not after.",
      "The list of names carries its own warning inside it. Simon Peter, Andrew, James, John, Philip, Bartholomew, Thomas, Matthew the publican, and at the end, Judas Iscariot, who also betrayed him. Judas is handed the exact same power as the rest of them, in the same sentence that tells you how his story ends. Being chosen is not the same as staying faithful.",
      "He sends them first to the lost sheep of the house of Israel. Preach, saying, the kingdom of heaven is at hand. Heal the sick, cleanse the lepers, raise the dead, cast out devils. Freely ye have received, freely give.",
      "And then He tells them to travel without money, without a spare coat, without a backup plan, for the workman is worthy of his meat. If a house or a city will not receive them, they simply shake the dust off their feet and move on. No arguing anyone into believing.",
    ]),
    matthewTen(16, 42, [
      "Behold, I send you forth as sheep in the midst of wolves, He says, so be ye wise as serpents, and harmless as doves. He does not promise them safety. He tells them exactly what is coming, councils, whippings in synagogues, trials before governors and kings, and He tells them why. For a testimony against them and the Gentiles.",
      "When they are dragged in to answer for their lives, take no thought how or what ye shall speak, He says, for it is not ye that speak, but the Spirit of your Father which speaketh in you. The pressure is real. The burden of the words is not theirs alone to carry.",
      "Two sparrows are sold for a farthing, and not one of them falls to the ground without your Father. Then He goes further still. The very hairs of your head are all numbered. Nothing that happens to you is too small for His attention.",
      "I came not to send peace, but a sword, He says plainly, and warns that following Him will set father against son and split households apart. He that findeth his life shall lose it, and he that loseth his life for my sake shall find it. And whosoever shall give a cup of cold water only in the name of a disciple shall in no wise lose his reward. Even the smallest kindness done for Him is seen and kept.",
    ]),
    matthewEleven(1, 19, [
      "John the Baptist, the man who baptized Jesus and pointed straight at Him, is now in prison, and he sends his disciples with one honest question. Art thou he that should come, or do we look for another? Even the man who was surest of all can go dark with doubt.",
      "Jesus does not rebuke the question. He answers with what is actually happening. The blind receive their sight, the lame walk, the lepers are cleansed, the deaf hear, the dead are raised up, and the poor have the gospel preached to them. Blessed is he, whosoever shall not be offended in me. He lets the evidence carry the weight.",
      "Then He turns to the crowd and tells them exactly who John was. Not a reed shaken with the wind. Not a man in soft clothing, the kind found in kings' houses. A prophet, and more than a prophet. Among them that are born of women there hath not risen a greater than John the Baptist, notwithstanding he that is least in the kingdom of heaven is greater than he.",
      "And this generation, He says, is like children sitting in the marketplace, never satisfied. We have piped unto you, and ye have not danced. We have mourned unto you, and ye have not lamented. They called John's fasting a devil and call Jesus' eating gluttony. Some people are not looking for a true answer. They are looking for a reason to say no.",
    ]),
    matthewEleven(20, 30, [
      "The cities that watched the most miracles get the hardest words. Woe unto thee, Chorazin. Woe unto thee, Bethsaida. It shall be more tolerable for Tyre and Sidon in the day of judgment than for them. Seeing the power up close was not the same as turning toward it.",
      "Then, in the very same breath, Jesus thanks the Father. I thank thee, O Father, Lord of heaven and earth, because thou hast hid these things from the wise and prudent, and hast revealed them unto babes. The people who thought they already had it figured out missed it. The ones with nothing left to prove received it.",
      "No man knoweth the Son, but the Father, He says, neither knoweth any man the Father, save the Son, and he to whomsoever the Son will reveal him. He is not just pointing at God from a distance. He is claiming to be the only door in.",
      "Then the invitation, wide open to anyone still listening. Come unto me, all ye that labour and are heavy laden, and I will give you rest. Take my yoke upon you, and learn of me, for I am meek and lowly in heart, and ye shall find rest unto your souls. Not the strong. Not the put together. The tired.",
    ]),
  ],
  closing: [
    ["So that is Day 282.", 700],
    ["Jesus forgave a paralyzed man before He healed him, because that was the deeper break.", 750],
    ["He called a tax collector with two words and sat down to eat with people the religious crowd would not touch.", 800],
    ["He gave twelve ordinary men real power, then told them plainly what following Him would cost. Rejection, persecution, even a sword through their own families.", 850],
    ["And when John the Baptist, in prison, sent one honest question, Jesus did not scold him. He just showed him what was true.", 850],
    ["The cities that saw the most miracles believed the least. The ones with nothing left to prove were the ones who received it.", 850],
    ["Tomorrow, Matthew 12 through 14. Opposition builds, and Jesus starts teaching in parables nobody quite understands yet.", 850],
    ["For now, sit with the invitation He gave at the end of this one.", 800],
    ["Come unto me, all ye that labour and are heavy laden.", 750],
    ["And I will give you rest.", 1200],
  ],
};
