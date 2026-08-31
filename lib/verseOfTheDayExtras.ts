import type { VerseOfTheDayEntry } from "./verseOfTheDay";

const RAW_EXTRA_VERSES = `
John 16:7|212|Nevertheless I tell you the truth; It is expedient for you that I go away: for if I go not away, the Comforter will not come unto you; but if I depart, I will send him unto you.
1 Peter 3:18|213|For Christ also hath once suffered for sins, the just for the unjust, that he might bring us to God, being put to death in the flesh, but quickened by the Spirit:
Hebrews 10:25|214|Not forsaking the assembling of ourselves together, as the manner of some is; but exhorting one another: and so much the more, as ye see the day approaching.
John 2:2|215|And both Jesus was called, and his disciples, to the marriage.
Matthew 7:8|216|For every one that asketh receiveth; and he that seeketh findeth; and to him that knocketh it shall be opened.
Matthew 5:13|217|Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men.
James 4:7|218|Submit yourselves therefore to God. Resist the devil, and he will flee from you.
John 10:11|219|I am the good shepherd: the good shepherd giveth his life for the sheep.
John 4:8|220|(For his disciples were gone away unto the city to buy meat.)
1 Peter 2:24|221|Who his own self bare our sins in his own body on the tree, that we, being dead to sins, should live unto righteousness: by whose stripes ye were healed.
John 14:27|222|Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.
John 6:37|223|All that the Father giveth me shall come to me; and him that cometh to me I will in no wise cast out.
Acts 6:1|224|And in those days, when the number of the disciples was multiplied, there arose a murmuring of the Grecians against the Hebrews, because their widows were neglected in the daily ministration.
Romans 8:26|225|Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered.
John 20:1|226|The first day of the week cometh Mary Magdalene early, when it was yet dark, unto the sepulchre, and seeth the stone taken away from the sepulchre.
John 6:7|227|Philip answered him, Two hundred pennyworth of bread is not sufficient for them, that every one of them may take a little.
Luke 14:1|228|And it came to pass, as he went into the house of one of the chief Pharisees to eat bread on the sabbath day, that they watched him.
Romans 8:29|229|For whom he did foreknow, he also did predestinate to be conformed to the image of his Son, that he might be the firstborn among many brethren.
John 5:19|230|Then answered Jesus and said unto them, Verily, verily, I say unto you, The Son can do nothing of himself, but what he seeth the Father do: for what things soever he doeth, these also doeth the Son likewise.
Jeremiah 17:9|231|The heart is deceitful above all things, and desperately wicked: who can know it?
1 John 4:7|232|Beloved, let us love one another: for love is of God; and every one that loveth is born of God, and knoweth God.
Exodus 1:5|233|And all the souls that came out of the loins of Jacob were seventy souls: for Joseph was in Egypt already.
1 John 2:15|234|Love not the world, neither the things that are in the world. If any man love the world, the love of the Father is not in him.
2 Peter 1:20|235|Knowing this first, that no prophecy of the scripture is of any private interpretation.
Colossians 3:12|236|Put on therefore, as the elect of God, holy and beloved, bowels of mercies, kindness, humbleness of mind, meekness, longsuffering;
John 15:26|237|But when the Comforter is come, whom I will send unto you from the Father, even the Spirit of truth, which proceedeth from the Father, he shall testify of me:
John 17:20|238|Neither pray I for these alone, but for them also which shall believe on me through their word;
1 John 3:1|239|Behold, what manner of love the Father hath bestowed upon us, that we should be called the sons of God: therefore the world knoweth us not, because it knew him not.
Acts 10:34|240|Then Peter opened his mouth, and said, Of a truth I perceive that God is no respecter of persons:
Luke 4:16|241|And he came to Nazareth, where he had been brought up: and, as his custom was, he went into the synagogue on the sabbath day, and stood up for to read.
Matthew 2:1|242|Now when Jesus was born in Bethlehem of Judaea in the days of Herod the king, behold, there came wise men from the east to Jerusalem,
Titus 1:5|243|For this cause left I thee in Crete, that thou shouldest set in order the things that are wanting, and ordain elders in every city, as I had appointed thee:
Acts 17:10|244|And the brethren immediately sent away Paul and Silas by night unto Berea: who coming thither went into the synagogue of the Jews.
Luke 9:23|245|And he said to them all, If any man will come after me, let him deny himself, and take up his cross daily, and follow me.
Galatians 3:26|246|For ye are all the children of God by faith in Christ Jesus.
1 John 2:1|247|My little children, these things write I unto you, that ye sin not. And if any man sin, we have an advocate with the Father, Jesus Christ the righteous:
1 Peter 5:8|248|Be sober, be vigilant; because your adversary the devil, as a roaring lion, walketh about, seeking whom he may devour:
2 Corinthians 1:2|249|Grace be to you and peace from God our Father, and from the Lord Jesus Christ.
1 John 5:7|250|For there are three that bear record in heaven, the Father, the Word, and the Holy Ghost: and these three are one.
Hebrews 4:15|251|For we have not an high priest which cannot be touched with the feeling of our infirmities; but was in all points tempted like as we are, yet without sin.
Hebrews 1:3|252|Who being the brightness of his glory, and the express image of his person, and upholding all things by the word of his power, when he had by himself purged our sins, sat down on the right hand of the Majesty on high;
Acts 1:1|253|The former treatise have I made, O Theophilus, of all that Jesus began both to do and teach,
Galatians 5:1|254|Stand fast therefore in the liberty wherewith Christ hath made us free, and be not entangled again with the yoke of bondage.
John 4:10|255|Jesus answered and said unto her, If thou knewest the gift of God, and who it is that saith to thee, Give me to drink; thou wouldest have asked of him, and he would have given thee living water.
John 5:14|256|Afterward Jesus findeth him in the temple, and said unto him, Behold, thou art made whole: sin no more, lest a worse thing come unto thee.
Luke 2:3|257|And all went to be taxed, every one into his own city.
Isaiah 14:12|258|How art thou fallen from heaven, O Lucifer, son of the morning! how art thou cut down to the ground, which didst weaken the nations!
Hebrews 13:8|259|Jesus Christ the same yesterday, and to day, and for ever.
Galatians 3:4|260|Have ye suffered so many things in vain? if it be yet in vain.
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
