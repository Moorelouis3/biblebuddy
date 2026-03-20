import type { VerseOfTheDayEntry } from "./verseOfTheDay";

const RAW_EXTRA_VERSES = `
John 16:7|212|But very truly I tell you, it is for your good that I am going away. Unless I go away, the Advocate will not come to you; but if I go, I will send him to you.
1 Peter 3:18|213|For Christ also suffered once for sins, the righteous for the unrighteous, to bring you to God. He was put to death in the body but made alive in the Spirit.
Hebrews 10:25|214|Not giving up meeting together, as some are in the habit of doing, but encouraging one another - and all the more as you see the Day approaching.
John 2:2|215|And Jesus and his disciples had also been invited to the wedding.
Matthew 7:8|216|For everyone who asks receives; those who seek find; and to those who knock, the door will be opened.
Matthew 5:13|217|"You are the salt of the earth. But if the salt loses its saltiness, how can it be made salty again? It is no longer good for anything, except to be thrown out and trampled underfoot."
James 4:7|218|Submit yourselves, then, to God. Resist the devil, and he will flee from you.
John 10:11|219|"I am the good shepherd. The good shepherd lays down his life for the sheep."
John 4:8|220|(His disciples had gone into the town to buy food.)
1 Peter 2:24|221|"He himself bore our sins" in his body on the cross, so that we might die to sins and live for righteousness; "by his wounds you have been healed."
John 14:27|222|Peace I leave with you; my peace I give you. I do not give to you as the world gives. Do not let your hearts be troubled and do not be afraid.
John 6:37|223|All whom the Father gives me will come to me, and whoever comes to me I will never drive away.
Acts 6:1|224|In those days when the number of disciples was increasing, the Hellenistic Jews among them complained against the Hebraic Jews because their widows were being overlooked in the daily distribution of food.
Romans 8:26|225|In the same way, the Spirit helps us in our weakness. We do not know what we ought to pray for, but the Spirit himself intercedes for us through wordless groans.
John 20:1|226|Early on the first day of the week, while it was still dark, Mary Magdalene went to the tomb and saw that the stone had been removed from the entrance.
John 6:7|227|Philip answered him, "It would take almost a year's wages to buy enough bread for each one to have a bite!"
Luke 14:1|228|One Sabbath, when Jesus went to eat in the house of a prominent Pharisee, he was being carefully watched.
Romans 8:29|229|For those God foreknew he also predestined to be conformed to the image of his Son, that he might be the firstborn among many brothers and sisters.
John 5:19|230|Jesus gave them this answer: "Very truly I tell you, the Son can do nothing by himself; he can do only what he sees his Father doing, because whatever the Father does the Son also does."
Jeremiah 17:9|231|The heart is deceitful above all things and beyond cure. Who can understand it?
1 John 4:7|232|Dear friends, let us love one another, for love comes from God. Everyone who loves has been born of God and knows God.
Exodus 1:5|233|The descendants of Jacob numbered seventy in all; Joseph was already in Egypt.
1 John 2:15|234|Do not love the world or anything in the world. If you love the world, love for the Father is not in you.
2 Peter 1:20|235|Above all, you must understand that no prophecy of Scripture came about by the prophet's own interpretation of things.
Colossians 3:12|236|Therefore, as God's chosen people, holy and dearly loved, clothe yourselves with compassion, kindness, humility, gentleness and patience.
John 15:26|237|"When the Advocate comes, whom I will send to you from the Father - the Spirit of truth who goes out from the Father - he will testify about me."
John 17:20|238|"My prayer is not for them alone. I pray also for those who will believe in me through their message,"
1 John 3:1|239|See what great love the Father has lavished on us, that we should be called children of God! And that is what we are!
Acts 10:34|240|Then Peter began to speak: "I now realize how true it is that God does not show favoritism"
Luke 4:16|241|He went to Nazareth, where he had been brought up, and on the Sabbath day he went into the synagogue, as was his custom. He stood up to read.
Matthew 2:1|242|After Jesus was born in Bethlehem in Judea, during the time of King Herod, Magi from the east came to Jerusalem.
Titus 1:5|243|The reason I left you in Crete was that you might put in order what was left unfinished and appoint elders in every town, as I directed you.
Acts 17:10|244|As soon as it was night, the believers sent Paul and Silas away to Berea. On arriving there, they went to the Jewish synagogue.
Luke 9:23|245|Then he said to them all: "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."
Galatians 3:26|246|So in Christ Jesus you are all children of God through faith.
1 John 2:1|247|My dear children, I write this to you so that you will not sin. But if anybody does sin, we have an advocate with the Father - Jesus Christ, the Righteous One.
1 Peter 5:8|248|Be alert and of sober mind. Your enemy the devil prowls around like a roaring lion looking for someone to devour.
2 Corinthians 1:2|249|Grace and peace to you from God our Father and the Lord Jesus Christ.
1 John 5:7|250|For there are three that testify:
Hebrews 4:15|251|For we do not have a high priest who is unable to empathize with our weaknesses, but we have one who has been tempted in every way, just as we are - yet he did not sin.
Hebrews 1:3|252|The Son is the radiance of God's glory and the exact representation of his being, sustaining all things by his powerful word.
Acts 1:1|253|In my former book, Theophilus, I wrote about all that Jesus began to do and to teach.
Galatians 5:1|254|It is for freedom that Christ has set us free. Stand firm, then, and do not let yourselves be burdened again by a yoke of slavery.
John 4:10|255|Jesus answered her, "If you knew the gift of God and who it is that asks you for a drink, you would have asked him and he would have given you living water."
John 5:14|256|Later Jesus found him at the temple and said to him, "See, you are well again. Stop sinning or something worse may happen to you."
Luke 2:3|257|And everyone went to their own town to register.
Isaiah 14:12|258|How you have fallen from heaven, morning star, son of the dawn! You have been cast down to the earth, you who once laid low the nations!
Hebrews 13:8|259|Jesus Christ is the same yesterday and today and forever.
Galatians 3:4|260|Have you experienced so much in vain - if it really was in vain?
`;

function toId(reference: string): string {
  return `extra-${reference.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")}`;
}

function parseExtraVerse(line: string): VerseOfTheDayEntry {
  const [reference, rank, text] = line.split("|");
  return {
    id: toId(reference),
    reference,
    rank: Number(rank),
    text,
    subtitle: `${reference} is a popular verse worth sitting with today.`,
    explanationSections: [],
  };
}

export const VERSE_OF_THE_DAY_EXTRA_POOL: VerseOfTheDayEntry[] = RAW_EXTRA_VERSES.trim()
  .split("\n")
  .map((line) => line.trim())
  .filter(Boolean)
  .map(parseExtraVerse);
