import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import type { BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";

const DAY_33_SECTIONS = [
  {
    reference: "Leviticus 5:1-13",
    chapter: 5,
    startVerse: 1,
    endVerse: 13,
    heading: "Confession And A Sin Offering",
    summary: "God gives Israel a way to confess specific sins and receive forgiveness through the sin offering.",
    teaching: [
      "Leviticus 5 continues the sin offering instructions by naming real situations from everyday life.",
      "A person may fail to speak as a witness, become unclean, or make a careless oath with the mouth.",
      "These are not dramatic scenes of rebellion, but they still create guilt before God.",
      "The worshiper confesses the sin and brings an offering based on what he can afford.",
      "The poor can bring birds, and the very poor can bring fine flour, showing that mercy is not only available to the wealthy.",
    ],
  },
  {
    reference: "Leviticus 5:14-19",
    chapter: 5,
    startVerse: 14,
    endVerse: 19,
    heading: "The Guilt Offering For Holy Things",
    summary: "God teaches Israel that misuse of holy things creates guilt that must be repaired.",
    teaching: [
      "The guilt offering deals with sin as a real debt that needs to be addressed.",
      "If someone acts unfaithfully with the holy things of the LORD, he must bring a ram as a guilt offering.",
      "He must also make restitution and add a fifth to it.",
      "That extra fifth teaches that sin is not repaired by vague regret; damage must be made right.",
      "The priest makes atonement, and the person is forgiven.",
    ],
  },
  {
    reference: "Leviticus 6:1-7",
    chapter: 6,
    startVerse: 1,
    endVerse: 7,
    heading: "Restitution Toward Neighbor And God",
    summary: "God shows that sin against another person is also unfaithfulness against the LORD.",
    teaching: [
      "Leviticus 6 moves from holy things to neighbor relationships.",
      "The sins listed include deception, robbery, oppression, keeping lost property, and swearing falsely.",
      "These sins harm another person, but the text says they are also a trespass against the LORD.",
      "The guilty person must restore what was taken, add a fifth, and then bring a guilt offering.",
      "God's forgiveness does not erase the responsibility to repair the damage done to people.",
    ],
  },
  {
    reference: "Leviticus 6:8-13",
    chapter: 6,
    startVerse: 8,
    endVerse: 13,
    heading: "The Fire Kept Burning On The Altar",
    summary: "The priests are commanded to keep the altar fire burning continually before the LORD.",
    teaching: [
      "The focus now turns more directly to the priests and their responsibilities.",
      "The burnt offering remains on the altar through the night, and the priest tends the fire in the morning.",
      "Even the ashes must be handled carefully, because everything connected to the altar belongs to holy service.",
      "The repeated command is that the fire must never go out.",
      "This teaches Israel that worship, atonement, and priestly service are not occasional hobbies; they are continual responsibilities before God.",
    ],
  },
  {
    reference: "Leviticus 6:14-30",
    chapter: 6,
    startVerse: 14,
    endVerse: 30,
    heading: "Priestly Instructions For Grain And Sin Offerings",
    summary: "God gives the priests careful instructions for handling grain offerings and sin offerings.",
    teaching: [
      "The grain offering and sin offering are now explained from the priestly side.",
      "Part of the grain offering is burned to the LORD, and the rest belongs to Aaron and his sons.",
      "The priests are not casual workers around holy things; they must eat and handle the offerings in the holy place.",
      "The sin offering is called most holy, and whatever touches its flesh becomes holy.",
      "These instructions show that holiness is weighty, ordered, and not handled by human preference.",
    ],
  },
  {
    reference: "Leviticus 7:1-10",
    chapter: 7,
    startVerse: 1,
    endVerse: 10,
    heading: "The Guilt Offering Is Most Holy",
    summary: "God gives priestly instructions for the guilt offering and the portions that belong to the priests.",
    teaching: [
      "Leviticus 7 returns to the guilt offering and calls it most holy.",
      "The guilt offering is slaughtered in the same place as the burnt offering, and its blood is applied to the altar.",
      "The fat portions are burned to the LORD, while certain portions are given to the priest.",
      "This reminds Israel that guilt is not a light emotional category; it is a serious matter before a holy God.",
      "The priests live from the holy service God assigned to them.",
    ],
  },
  {
    reference: "Leviticus 7:11-21",
    chapter: 7,
    startVerse: 11,
    endVerse: 21,
    heading: "Peace Offerings And Shared Fellowship",
    summary: "God explains peace offerings for thanksgiving, vows, and freewill worship.",
    teaching: [
      "The peace offering includes thanksgiving offerings, vow offerings, and freewill offerings.",
      "This means worship includes gratitude, kept promises, and voluntary devotion.",
      "Unlike the burnt offering, the peace offering involves a shared meal connected to fellowship with God.",
      "But even joyful fellowship has boundaries: the meat must be eaten at the right time, and uncleanness must not be brought into the meal.",
      "God is teaching that nearness to Him is joyful, but it is never careless.",
    ],
  },
  {
    reference: "Leviticus 7:22-38",
    chapter: 7,
    startVerse: 22,
    endVerse: 38,
    heading: "Blood, Fat, And Priestly Portions",
    summary: "God reserves the blood and fat for Himself and provides portions for the priests.",
    teaching: [
      "Israel is commanded not to eat the fat or the blood.",
      "The fat represents the rich portions offered to the LORD, and the blood represents life.",
      "This teaches Israel that life belongs to God and the best is not treated as common.",
      "The breast and right thigh are given to the priests as their portion from the peace offerings.",
      "The chapter closes by summarizing the offerings, showing that worship has order because God is the one who defines it.",
    ],
  },
  {
    reference: "Leviticus 8:1-13",
    chapter: 8,
    startVerse: 1,
    endVerse: 13,
    heading: "Aaron And His Sons Are Washed And Clothed",
    summary: "Moses publicly consecrates Aaron and his sons for priestly service.",
    teaching: [
      "Leviticus 8 begins the ordination of Aaron and his sons.",
      "The whole congregation gathers, showing that priesthood is public and affects the entire people.",
      "Moses washes Aaron and his sons, clothes Aaron in the priestly garments, and anoints the tabernacle and altar.",
      "The garments are not costumes; they mark Aaron as a representative set apart for holy service.",
      "The washing and anointing show that priests must be cleansed and consecrated before they can serve near God's presence.",
    ],
  },
  {
    reference: "Leviticus 8:14-36",
    chapter: 8,
    startVerse: 14,
    endVerse: 36,
    heading: "Blood Marks The Priests For Service",
    summary: "Aaron and his sons are ordained through sacrifices, blood, anointing oil, and seven days of consecration.",
    teaching: [
      "The ordination continues with a sin offering, a burnt offering, and a ram of ordination.",
      "Blood is placed on Aaron's right ear, right thumb, and right big toe, marking hearing, service, and walking for the LORD.",
      "The priests are sprinkled with blood and oil, showing cleansing and consecration together.",
      "They remain at the entrance of the tent for seven days, completing the ordination period.",
      "The warning is serious: they must obey the LORD's command so they do not die.",
    ],
  },
] as const;

export const LEVITICUS_DAY_THIRTY_THREE_GUILT_CONSECRATION_AND_PRIESTS_LESSON: BibleYearDailyLesson = {
  dayNumber: 33,
  title: "Guilt, Consecration, and Priests",
  reference: "Leviticus 5-8",
  estimatedListenTime: "35-40 min",
  opening: [
    "Day 33 continues the book of Leviticus.",
    "Yesterday, we saw the basic offerings that teach surrender, gratitude, fellowship, cleansing, and atonement.",
    "Today, Leviticus shows us something even more personal: guilt must be confessed, wrongs must be repaired, worship must be tended, and priests must be consecrated before they serve near God's presence.",
  ],
  sections: DAY_33_SECTIONS.map((section) => ({
    heading: section.heading,
    verseBlock: {
      reference: section.reference,
      chapter: section.chapter,
      startVerse: section.startVerse,
      endVerse: section.endVerse,
    },
    teaching: [...section.teaching],
  })),
  closing: [
    "Day 33 teaches that guilt is not only a feeling.",
    "In Leviticus, guilt means something has gone wrong before God, and often something must be repaired with people too.",
    "The same God who names the guilt also provides confession, restitution, atonement, priestly service, and a way for His people to remain near Him.",
  ],
};

export const BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_NOTES = `## Bible Reader Chapters Covered

- Leviticus 5
- Leviticus 6
- Leviticus 7
- Leviticus 8

## Chapter Introduction

Leviticus 5-8 continues the instruction God gives from the tent of meeting.

Leviticus is still answering the big question raised at the end of Exodus: if God's glory is now dwelling in the middle of Israel's camp, how can sinful people live near Him?

Leviticus 1-4 introduced the major offerings. Leviticus 5-7 slows down and gives more detail, especially around confession, guilt, restitution, priestly duties, and the proper handling of offerings.

Then Leviticus 8 shows Aaron and his sons being consecrated as priests.

That matters because Israel does not only need sacrifices. They also need priests who are washed, clothed, anointed, and marked by blood for holy service.

These chapters teach that sin is not vague. Guilt is not only a feeling. Worship is not casual. And serving near God's presence requires cleansing, consecration, and obedience.

## Study Notes

Leviticus 5 begins with specific sins from ordinary life.

Someone may fail to speak as a witness. Someone may touch something unclean. Someone may make a careless oath with the mouth and later realize it was wrong.

These are not the kinds of sins people usually call dramatic. But Leviticus teaches that everyday sins still matter before God.

The worshiper must confess the sin. That is important. The offering is not magic. The person must actually name the guilt before God and bring the offering God provides.

The offerings are scaled by ability. A person may bring a female lamb or goat. If that is too expensive, he may bring two birds. If even that is too much, he may bring fine flour.

That shows God's mercy. The poor are not shut out from forgiveness.

Leviticus 5 also introduces the guilt offering, sometimes called the trespass offering. This offering focuses on guilt as something that creates debt or damage.

If someone misuses holy things, he must bring the offering and make restitution. He must also add a fifth, or twenty percent.

That extra amount teaches that repentance is more than saying, I feel bad. When damage has been done, repentance includes repair.

Leviticus 6 applies this same idea to neighbor relationships. If someone deceives, steals, oppresses, keeps lost property, or lies under oath, the person has sinned against the neighbor and against the LORD.

That is one of the biggest lessons in this reading.

Sin against people is also sin against God.

The guilty person must restore what was taken, add the fifth, and bring the guilt offering. God cares about forgiveness, but He also cares about justice.

Leviticus 6 then turns toward the priests. The fire on the altar must keep burning. The ashes must be handled carefully. The grain offering and sin offering must be handled according to God's command.

This shows that priestly service is daily, careful, and holy.

Leviticus 7 gives more instructions for the guilt offering and peace offering. The guilt offering is called most holy. The peace offering includes thanksgiving, vows, and freewill worship.

The peace offering is especially beautiful because it shows fellowship. Worship is not only about guilt being removed. It is also about restored relationship with God.

But even joyful fellowship has boundaries. The offering must be eaten at the proper time, and uncleanness must not be brought into the meal.

Leviticus 8 shifts from offerings to ordination.

Aaron and his sons are washed, clothed, anointed, and consecrated. The whole congregation watches because priesthood affects everyone.

Blood is placed on the right ear, right thumb, and right big toe of Aaron and his sons. That may sound strange at first, but the picture is powerful.

Their ears are marked to hear God.

Their hands are marked to serve God.

Their feet are marked to walk in God's ways.

The priests are being set apart completely.

## Deep Study Notes

Leviticus 5-8 teaches us that guilt is not just an emotion.

Today, people often use the word guilt to describe how they feel after doing something wrong. But in Leviticus, guilt is deeper than a feeling.

Guilt means a real wrong has been committed before God.

Sometimes that wrong creates damage in worship. Sometimes it creates damage in another person's life. Sometimes it creates both.

That is why the guilt offering matters.

The guilt offering teaches that sin can create debt.

If someone misuses what is holy, the person must make restitution. If someone steals, deceives, or lies to a neighbor, the person must restore what was taken.

And then God adds something interesting: the guilty person must add a fifth.

That means twenty percent more.

This is not random.

It teaches that repentance should take repair seriously. If a person has damaged someone else, he should not only try to get back to neutral. He should show, through action, that he understands the wrong was real.

That is a powerful reading tip for Leviticus.

God is not only interested in private religious feelings. He cares about repaired relationships, honest business, truthful speech, and justice between people.

Leviticus 6:2 is especially important because it says that when someone deceives or wrongs a neighbor, that person commits a trespass against the LORD.

That means God takes human relationships personally.

You cannot separate love for God from honesty toward people.

You cannot worship at the altar while pretending stolen property, deception, oppression, or false speech does not matter.

This prepares the way for later prophets, who will rebuke Israel for bringing worship while practicing injustice.

It also connects to Jesus' teaching in Matthew 5, where He says that if someone is bringing a gift to the altar and remembers that a brother has something against him, he should first be reconciled.

The point is not that human reconciliation earns forgiveness.

The point is that God does not treat worship and relationships as disconnected worlds.

Leviticus also shows mercy for the poor.

In Leviticus 5, not everyone brings the same offering. If someone cannot afford a lamb or goat, birds are allowed. If birds are still too much, flour is allowed.

This is not God lowering holiness.

It is God making access possible.

The poor person still confesses, still comes through the way God provides, and still receives forgiveness.

That teaches something beautiful about God's character.

God's holiness does not crush the poor. His mercy makes room for them.

Leviticus 6-7 also gives us the priestly side of the offerings.

The worshiper sees the animal, the flour, the altar, the blood, and the fire. But the priests must know what happens next. They must tend the fire, handle the ashes, eat portions in the holy place, apply blood properly, and guard the holiness of the offerings.

The phrase, the fire shall ever be burning upon the altar, is repeated with force.

The fire must not go out.

This does not mean Israel is earning God's attention by keeping a flame alive. It means the altar is a continual place of worship, atonement, and priestly service.

The life of the camp is organized around God's presence.

That continual fire reminds Israel that access to God is not occasional. The need for atonement, surrender, and worship is ongoing.

Leviticus 7 gives another major teaching: Israel must not eat the blood.

Later, Leviticus will explain this more directly: the life of the flesh is in the blood.

Blood represents life, and life belongs to God.

This is why blood is handled at the altar instead of treated like common food. Israel is being trained to see life as sacred and atonement as costly.

The fat is also reserved for the LORD.

In the ancient world, fat was associated with richness and the best portions. Offering it to God teaches that the best belongs to Him.

This is not only a ritual detail. It is a heart lesson.

God is not given leftovers.

Leviticus 8 then brings the priesthood into full view.

Aaron and his sons are not self-appointed spiritual leaders. They do not decide one day that they would like to serve near the altar.

God commands Moses to consecrate them.

The whole congregation gathers because priesthood is public. The priests represent the people before God, so their ordination matters to everyone.

Moses washes them.

He clothes Aaron in the priestly garments described in Exodus.

He anoints the tabernacle, the altar, its utensils, and Aaron.

This shows that everything connected to God's dwelling must be set apart.

Then the sacrifices begin.

There is a sin offering because even priests need cleansing.

There is a burnt offering because priests must be wholly surrendered.

There is a ram of ordination because their service is being officially placed before God.

The blood on the ear, thumb, and toe is one of the most memorable pictures in Leviticus.

The ear is about hearing.

The thumb is about working.

The toe is about walking.

The priest's whole life is marked for God: what he listens to, what he does, and where he goes.

That is consecration.

It is not only having a religious role.

It is being set apart in the whole direction of life.

The seven-day ordination period also matters.

Seven often marks completion in Scripture. Aaron and his sons remain at the entrance of the tent for seven days, completing the process God commanded.

The warning is serious: obey, so you do not die.

That may sound intense, but it fits the whole message of Leviticus.

God is near.

That is mercy.

But God is holy.

That means His nearness must not be treated casually.

These chapters help us understand why the Bible keeps pointing forward to the need for a faithful priest.

Israel's priests need washing. They need blood. They need consecration. They need offerings for themselves.

Later, the Bible will show us Jesus as the greater priest who does not need cleansing for His own sin, who offers Himself, and who opens the way into God's presence fully.

Leviticus is not a distraction from that story.

It is building the vocabulary we need to understand it.

Guilt.

Confession.

Restitution.

Atonement.

Priesthood.

Consecration.

Holy access.

All of those themes begin to come alive in Leviticus 5-8.

## Application & Reflection

Leviticus 5-8 asks us to take guilt seriously without losing sight of mercy.

That balance matters.

If we only take guilt seriously, we may become crushed by shame.

If we only talk about mercy without naming guilt, we may avoid repentance.

Leviticus gives us both.

God names sin clearly, and God provides a way back.

These chapters also teach us that repentance can involve repair.

Sometimes the right response is not only, God, forgive me.

Sometimes it is also, I need to make this right with the person I wronged.

That could mean returning what was taken, telling the truth, correcting a false impression, apologizing without excuses, or accepting responsibility for harm done.

Leviticus also reminds us that worship is not casual.

The priests tend the fire.

They handle holy things carefully.

They are washed, clothed, anointed, and marked for service.

That does not mean modern believers copy Israel's priestly rituals. But it does mean we should not treat nearness to God as cheap or careless.

For reflection:

- Where do I need confession instead of vague regret?
- Is there any wrong I need to repair, not merely feel bad about?
- Do I separate worship from how I treat people?
- Am I giving God leftovers or honoring Him with what is weighty?
- What would it look like for my hearing, my work, and my walk to be set apart for God?

The big idea is this: God does not expose guilt to destroy His people. He exposes guilt so it can be confessed, repaired, atoned for, and brought back under His mercy.`;

export const BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_STUDY_SECTIONS: BibleYearDeepStudySection[] = DAY_33_SECTIONS.map((section) => ({
  reference: section.reference,
  title: section.heading,
  icon: "book",
  summary: section.summary,
  markdown: `## ${section.reference}

## What Is Happening Here?

${section.teaching.slice(0, 3).join("\n\n")}

- Leviticus is teaching Israel how guilt is confessed and dealt with near God's holy presence.
- These chapters connect forgiveness with confession, restitution, priestly service, and consecration.
- The details show that worship, justice, holiness, and mercy all belong together.

${section.teaching.slice(3).join("\n\n")}

## Key Phrases

### He Shall Confess That He Hath Sinned
Confession means the worshiper names the sin instead of hiding behind vague religious language. The offering does not replace honesty; it comes with honesty.

### He Shall Make Amends
Restitution means repairing what was damaged when possible. Leviticus teaches that repentance should move toward repair, especially when another person has been wronged.

### Add The Fifth Part
The extra fifth is twenty percent added to what was owed. This teaches that sin creates real damage, and the guilty person should not only return to neutral but show responsibility.

### The Fire Shall Ever Be Burning
The altar fire points to continual priestly service before the LORD. Israel's life near God's presence requires ongoing worship, atonement, and careful obedience.

### Blood Upon The Tip Of Aaron's Right Ear
The blood on the ear, thumb, and toe marks the priest's hearing, service, and walk for the LORD. Priesthood is not a costume; it is a whole-life consecration.

## What This Means

Leviticus 5-8 teaches that guilt must be brought into the light and dealt with God's way.

- Confession matters because sin should be named, not hidden.
- Restitution matters because wrongs against people are also wrongs against God.
- Worship matters because the altar is treated as holy, not casual.
- Priesthood matters because Israel needs cleansed and consecrated mediators.
- Mercy matters because God provides a way for guilt to be forgiven.

This reading helps us see that God's holiness is serious, but His mercy is also deeply practical. He teaches His people how to confess, repair, worship, and serve near His presence.`,
}));
