type AbrahamSection = {
  reference: string;
  title: string;
  points: string[];
};

type AbrahamChapterNote = {
  chapter: number;
  title: string;
  intro: string;
  flow: string[];
  sections: AbrahamSection[];
  lesson: string;
};

type GenesisVerse = {
  verse: number;
  text: string;
};

const GENESIS_KJV_VERSES: Record<number, GenesisVerse[]> = {
  11: [
    { verse: 1, text: `And the whole earth was of one language, and of one speech.` },
    { verse: 2, text: `And it came to pass, as they journeyed from the east, that they found a plain in the land of Shinar; and they dwelt there.` },
    { verse: 3, text: `And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter.` },
    { verse: 4, text: `And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.` },
    { verse: 5, text: `And the LORD came down to see the city and the tower, which the children of men builded.` },
    { verse: 6, text: `And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do.` },
    { verse: 7, text: `Go to, let us go down, and there confound their language, that they may not understand one another's speech.` },
    { verse: 8, text: `So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.` },
    { verse: 9, text: `Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth: and from thence did the LORD scatter them abroad upon the face of all the earth.` },
    { verse: 10, text: `These are the generations of Shem: Shem was an hundred years old, and begat Arphaxad two years after the flood:` },
    { verse: 11, text: `And Shem lived after he begat Arphaxad five hundred years, and begat sons and daughters.` },
    { verse: 12, text: `And Arphaxad lived five and thirty years, and begat Salah:` },
    { verse: 13, text: `And Arphaxad lived after he begat Salah four hundred and three years, and begat sons and daughters.` },
    { verse: 14, text: `And Salah lived thirty years, and begat Eber:` },
    { verse: 15, text: `And Salah lived after he begat Eber four hundred and three years, and begat sons and daughters.` },
    { verse: 16, text: `And Eber lived four and thirty years, and begat Peleg:` },
    { verse: 17, text: `And Eber lived after he begat Peleg four hundred and thirty years, and begat sons and daughters.` },
    { verse: 18, text: `And Peleg lived thirty years, and begat Reu:` },
    { verse: 19, text: `And Peleg lived after he begat Reu two hundred and nine years, and begat sons and daughters.` },
    { verse: 20, text: `And Reu lived two and thirty years, and begat Serug:` },
    { verse: 21, text: `And Reu lived after he begat Serug two hundred and seven years, and begat sons and daughters.` },
    { verse: 22, text: `And Serug lived thirty years, and begat Nahor:` },
    { verse: 23, text: `And Serug lived after he begat Nahor two hundred years, and begat sons and daughters.` },
    { verse: 24, text: `And Nahor lived nine and twenty years, and begat Terah:` },
    { verse: 25, text: `And Nahor lived after he begat Terah an hundred and nineteen years, and begat sons and daughters.` },
    { verse: 26, text: `And Terah lived seventy years, and begat Abram, Nahor, and Haran.` },
    { verse: 27, text: `Now these are the generations of Terah: Terah begat Abram, Nahor, and Haran; and Haran begat Lot.` },
    { verse: 28, text: `And Haran died before his father Terah in the land of his nativity, in Ur of the Chaldees.` },
    { verse: 29, text: `And Abram and Nahor took them wives: the name of Abram's wife was Sarai; and the name of Nahor's wife, Milcah, the daughter of Haran, the father of Milcah, and the father of Iscah.` },
    { verse: 30, text: `But Sarai was barren; she had no child.` },
    { verse: 31, text: `And Terah took Abram his son, and Lot the son of Haran his son's son, and Sarai his daughter in law, his son Abram's wife; and they went forth with them from Ur of the Chaldees, to go into the land of Canaan; and they came unto Haran, and dwelt there.` },
    { verse: 32, text: `And the days of Terah were two hundred and five years: and Terah died in Haran.` },
  ],
  12: [
    { verse: 1, text: `Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee:` },
    { verse: 2, text: `And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing:` },
    { verse: 3, text: `And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed.` },
    { verse: 4, text: `So Abram departed, as the LORD had spoken unto him; and Lot went with him: and Abram was seventy and five years old when he departed out of Haran.` },
    { verse: 5, text: `And Abram took Sarai his wife, and Lot his brother's son, and all their substance that they had gathered, and the souls that they had gotten in Haran; and they went forth to go into the land of Canaan; and into the land of Canaan they came.` },
    { verse: 6, text: `And Abram passed through the land unto the place of Sichem, unto the plain of Moreh. And the Canaanite was then in the land.` },
    { verse: 7, text: `And the LORD appeared unto Abram, and said, Unto thy seed will I give this land: and there builded he an altar unto the LORD, who appeared unto him.` },
    { verse: 8, text: `And he removed from thence unto a mountain on the east of Bethel, and pitched his tent, having Bethel on the west, and Hai on the east: and there he builded an altar unto the LORD, and called upon the name of the LORD.` },
    { verse: 9, text: `And Abram journeyed, going on still toward the south.` },
    { verse: 10, text: `And there was a famine in the land: and Abram went down into Egypt to sojourn there; for the famine was grievous in the land.` },
    { verse: 11, text: `And it came to pass, when he was come near to enter into Egypt, that he said unto Sarai his wife, Behold now, I know that thou art a fair woman to look upon:` },
    { verse: 12, text: `Therefore it shall come to pass, when the Egyptians shall see thee, that they shall say, This is his wife: and they will kill me, but they will save thee alive.` },
    { verse: 13, text: `Say, I pray thee, thou art my sister: that it may be well with me for thy sake; and my soul shall live because of thee.` },
    { verse: 14, text: `And it came to pass, that, when Abram was come into Egypt, the Egyptians beheld the woman that she was very fair.` },
    { verse: 15, text: `The princes also of Pharaoh saw her, and commended her before Pharaoh: and the woman was taken into Pharaoh's house.` },
    { verse: 16, text: `And he entreated Abram well for her sake: and he had sheep, and oxen, and he asses, and menservants, and maidservants, and she asses, and camels.` },
    { verse: 17, text: `And the LORD plagued Pharaoh and his house with great plagues because of Sarai Abram's wife.` },
    { verse: 18, text: `And Pharaoh called Abram, and said, What is this that thou hast done unto me? why didst thou not tell me that she was thy wife?` },
    { verse: 19, text: `Why saidst thou, She is my sister? so I might have taken her to me to wife: now therefore behold thy wife, take her, and go thy way.` },
    { verse: 20, text: `And Pharaoh commanded his men concerning him: and they sent him away, and his wife, and all that he had.` },
  ],
  13: [
    { verse: 1, text: `And Abram went up out of Egypt, he, and his wife, and all that he had, and Lot with him, into the south.` },
    { verse: 2, text: `And Abram was very rich in cattle, in silver, and in gold.` },
    { verse: 3, text: `And he went on his journeys from the south even to Bethel, unto the place where his tent had been at the beginning, between Bethel and Hai;` },
    { verse: 4, text: `Unto the place of the altar, which he had made there at the first: and there Abram called on the name of the LORD.` },
    { verse: 5, text: `And Lot also, which went with Abram, had flocks, and herds, and tents.` },
    { verse: 6, text: `And the land was not able to bear them, that they might dwell together: for their substance was great, so that they could not dwell together.` },
    { verse: 7, text: `And there was a strife between the herdmen of Abram's cattle and the herdmen of Lot's cattle: and the Canaanite and the Perizzite dwelled then in the land.` },
    { verse: 8, text: `And Abram said unto Lot, Let there be no strife, I pray thee, between me and thee, and between my herdmen and thy herdmen; for we be brethren.` },
    { verse: 9, text: `Is not the whole land before thee? separate thyself, I pray thee, from me: if thou wilt take the left hand, then I will go to the right; or if thou depart to the right hand, then I will go to the left.` },
    { verse: 10, text: `And Lot lifted up his eyes, and beheld all the plain of Jordan, that it was well watered every where, before the LORD destroyed Sodom and Gomorrah, even as the garden of the LORD, like the land of Egypt, as thou comest unto Zoar.` },
    { verse: 11, text: `Then Lot chose him all the plain of Jordan; and Lot journeyed east: and they separated themselves the one from the other.` },
    { verse: 12, text: `Abram dwelled in the land of Canaan, and Lot dwelled in the cities of the plain, and pitched his tent toward Sodom.` },
    { verse: 13, text: `But the men of Sodom were wicked and sinners before the LORD exceedingly.` },
    { verse: 14, text: `And the LORD said unto Abram, after that Lot was separated from him, Lift up now thine eyes, and look from the place where thou art northward, and southward, and eastward, and westward:` },
    { verse: 15, text: `For all the land which thou seest, to thee will I give it, and to thy seed for ever.` },
    { verse: 16, text: `And I will make thy seed as the dust of the earth: so that if a man can number the dust of the earth, then shall thy seed also be numbered.` },
    { verse: 17, text: `Arise, walk through the land in the length of it and in the breadth of it; for I will give it unto thee.` },
    { verse: 18, text: `Then Abram removed his tent, and came and dwelt in the plain of Mamre, which is in Hebron, and built there an altar unto the LORD.` },
  ],
  14: [
    { verse: 1, text: `And it came to pass in the days of Amraphel king of Shinar, Arioch king of Ellasar, Chedorlaomer king of Elam, and Tidal king of nations;` },
    { verse: 2, text: `That these made war with Bera king of Sodom, and with Birsha king of Gomorrah, Shinab king of Admah, and Shemeber king of Zeboiim, and the king of Bela, which is Zoar.` },
    { verse: 3, text: `All these were joined together in the vale of Siddim, which is the salt sea.` },
    { verse: 4, text: `Twelve* years they served* Chedorlaomer, and in the thirteenth* year they rebelled.` },
    { verse: 5, text: `And in the fourteenth* year came Chedorlaomer, and the kings that were with him, and smote the Rephaims in Ashteroth Karnaim, and the Zuzims in Ham, and the Emims in Shaveh Kiriathaim,` },
    { verse: 6, text: `And the Horites in their mount Seir, unto Elparan, which is by the wilderness.` },
    { verse: 7, text: `And they returned, and came to Enmishpat, which is Kadesh, and smote all the country of the Amalekites, and also the Amorites, that dwelt in Hazezontamar.` },
    { verse: 8, text: `And there went out the king of Sodom, and the king of Gomorrah, and the king of Admah, and the king of Zeboiim, and the king of Bela (the same is Zoar;) and they joined battle with them in the vale of Siddim;` },
    { verse: 9, text: `With Chedorlaomer the king of Elam, and with Tidal king of nations, and Amraphel king of Shinar, and Arioch king of Ellasar; four kings with five.` },
    { verse: 10, text: `And the vale of Siddim was full of slimepits*; and the kings of Sodom and Gomorrah fled, and fell there; and they that remained fled to the mountain.` },
    { verse: 11, text: `And they took all the goods of Sodom and Gomorrah, and all their victuals, and went their way.` },
    { verse: 12, text: `And they took Lot, Abram's brother's son, who dwelt in Sodom, and his goods, and departed.` },
    { verse: 13, text: `And there came one that had escaped, and told Abram the Hebrew; for he dwelt in the plain of Mamre the Amorite, brother of Eshcol, and brother of Aner: and these were confederate with Abram.` },
    { verse: 14, text: `And when Abram heard that his brother was taken captive, he armed his trained servants, born in his own house, three hundred and eighteen*, and pursued them unto Dan.` },
    { verse: 15, text: `And he divided himself against them, he and his servants, by night, and smote them, and pursued them unto Hobah, which is on the left hand of Damascus.` },
    { verse: 16, text: `And he brought back all the goods, and also brought again his brother Lot, and his goods, and the women also, and the people.` },
    { verse: 17, text: `And the king of Sodom went out to meet him after his return from the slaughter of Chedorlaomer, and of the kings that were with him, at the valley of Shaveh, which is the king's dale.` },
    { verse: 18, text: `And Melchizedek king of Salem brought forth bread and wine: and he was the priest of the most high God.` },
    { verse: 19, text: `And he blessed him, and said, Blessed be Abram of the most high God, possessor of heaven and earth:` },
    { verse: 20, text: `And blessed be the most high God, which hath delivered thine enemies into thy hand. And he gave him tithes of all.` },
    { verse: 21, text: `And the king of Sodom said unto Abram, Give me the persons, and take the goods to thyself.` },
    { verse: 22, text: `And Abram said to the king of Sodom, I have lift up mine hand unto the LORD, the most high God, the possessor of heaven and earth,` },
    { verse: 23, text: `That I will not take from a thread even to a shoelatchet*, and that I will not take any thing that is thine, lest thou shouldest say, I have made Abram rich:` },
    { verse: 24, text: `Save only that which the young men have eaten, and the portion of the men which went with me, Aner, Eshcol, and Mamre; let them take their portion.` },
  ],
  15: [
    { verse: 1, text: `After these things the word of the LORD came unto Abram in a vision, saying, Fear not, Abram: I am thy shield, and thy exceeding great reward.` },
    { verse: 2, text: `And Abram said, Lord GOD, what wilt thou give me, seeing I go childless, and the steward of my house is this Eliezer of Damascus?` },
    { verse: 3, text: `And Abram said, Behold, to me thou hast given no seed: and, lo, one born in my house is mine heir.` },
    { verse: 4, text: `And, behold, the word of the LORD came unto him, saying, This shall not be thine heir; but he that shall come forth out of thine own bowels shall be thine heir.` },
    { verse: 5, text: `And he brought him forth abroad, and said, Look now toward heaven, and tell the stars, if thou be able to number them: and he said unto him, So shall thy seed be.` },
    { verse: 6, text: `And he believed in the LORD; and he counted it to him for righteousness.` },
    { verse: 7, text: `And he said unto him, I am the LORD that brought thee out of Ur of the Chaldees, to give thee this land to inherit it.` },
    { verse: 8, text: `And he said, Lord GOD, whereby shall I know that I shall inherit it?` },
    { verse: 9, text: `And he said unto him, Take me an heifer of three years old, and a she goat of three years old, and a ram of three years old, and a turtledove, and a young pigeon.` },
    { verse: 10, text: `And he took unto him all these, and divided them in the midst, and laid each piece one against another: but the birds divided he not.` },
    { verse: 11, text: `And when the fowls came down upon the carcases, Abram drove them away.` },
    { verse: 12, text: `And when the sun was going down, a deep sleep fell upon Abram; and, lo, an horror of great darkness fell upon him.` },
    { verse: 13, text: `And he said unto Abram, Know of a surety that thy seed shall be a stranger in a land that is not theirs, and shall serve them; and they shall afflict them four hundred years;` },
    { verse: 14, text: `And also that nation, whom they shall serve, will I judge: and afterward shall they come out with great substance.` },
    { verse: 15, text: `And thou shalt go to thy fathers in peace; thou shalt be buried in a good old age.` },
    { verse: 16, text: `But in the fourth generation they shall come hither again: for the iniquity of the Amorites is not yet full.` },
    { verse: 17, text: `And it came to pass, that, when the sun went down, and it was dark, behold a smoking furnace, and a burning lamp that passed between those pieces.` },
    { verse: 18, text: `In the same day the LORD made a covenant with Abram, saying, Unto thy seed have I given this land, from the river of Egypt unto the great river, the river Euphrates:` },
    { verse: 19, text: `The Kenites, and the Kenizzites, and the Kadmonites,` },
    { verse: 20, text: `And the Hittites, and the Perizzites, and the Rephaims,` },
    { verse: 21, text: `And the Amorites, and the Canaanites, and the Girgashites, and the Jebusites.` },
  ],
  16: [
    { verse: 1, text: `Now Sarai Abram's wife bare him no children: and she had an handmaid, an Egyptian, whose name was Hagar.` },
    { verse: 2, text: `And Sarai said unto Abram, Behold now, the LORD hath restrained me from bearing: I pray thee, go in unto my maid; it may be that I may obtain children by her. And Abram hearkened to the voice of Sarai.` },
    { verse: 3, text: `And Sarai Abram's wife took Hagar her maid the Egyptian, after Abram had dwelt ten years in the land of Canaan, and gave her to her husband Abram to be his wife.` },
    { verse: 4, text: `And he went in unto Hagar, and she conceived: and when she saw that she had conceived, her mistress was despised in her eyes.` },
    { verse: 5, text: `And Sarai said unto Abram, My wrong be upon thee: I have given my maid into thy bosom; and when she saw that she had conceived, I was despised in her eyes: the LORD judge between me and thee.` },
    { verse: 6, text: `But Abram said unto Sarai, Behold, thy maid is in thy hand; do to her as it pleaseth thee*. And when Sarai dealt hardly with her, she fled from her face.` },
    { verse: 7, text: `And the angel of the LORD found her by a fountain of water in the wilderness, by the fountain in the way to Shur.` },
    { verse: 8, text: `And he said, Hagar, Sarai's maid, whence camest thou? and whither wilt thou go? And she said, I flee from the face of my mistress Sarai.` },
    { verse: 9, text: `And the angel of the LORD said unto her, Return to thy mistress, and submit thyself under her hands.` },
    { verse: 10, text: `And the angel of the LORD said unto her, I will multiply thy seed exceedingly, that it shall not be numbered for multitude.` },
    { verse: 11, text: `And the angel of the LORD said unto her, Behold, thou art with child, and shalt bear a son, and shalt call his name Ishmael; because the LORD hath heard thy affliction.` },
    { verse: 12, text: `And he will be a wild man; his hand will be against every man, and every man's hand against him; and he shall dwell in the presence of all his brethren.` },
    { verse: 13, text: `And she called the name of the LORD that spake unto her, Thou God seest me: for she said, Have I also here looked after him that seeth me?` },
    { verse: 14, text: `Wherefore the well was called Beerlahairoi*; behold, it is between Kadesh and Bered.` },
    { verse: 15, text: `And Hagar bare Abram a son: and Abram called his son's name, which Hagar bare, Ishmael.` },
    { verse: 16, text: `And Abram was fourscore and six years old, when Hagar bare Ishmael to Abram.` },
  ],
  17: [
    { verse: 1, text: `And when Abram was ninety* years old and nine, the LORD appeared to Abram, and said unto him, I am the Almighty God; walk before me, and be thou perfect.` },
    { verse: 2, text: `And I will make my covenant between me and thee, and will multiply thee exceedingly*.` },
    { verse: 3, text: `And Abram fell on his face: and God talked with him, saying,` },
    { verse: 4, text: `As for me, behold, my covenant is with thee, and thou shalt be a father of many nations.` },
    { verse: 5, text: `Neither shall thy name any more be called Abram, but thy name shall be Abraham; for a father of many nations have I made thee.` },
    { verse: 6, text: `And I will make thee exceeding* fruitful, and I will make nations of thee, and kings shall come out of thee.` },
    { verse: 7, text: `And I will establish my covenant between me and thee and thy seed after thee in their generations for an everlasting covenant, to be a God unto thee, and to thy seed after thee.` },
    { verse: 8, text: `And I will give unto thee, and to thy seed after thee, the land wherein thou art a stranger, all the land of Canaan, for an everlasting possession; and I will be their God.` },
    { verse: 9, text: `And God said unto Abraham, Thou shalt keep my covenant therefore, thou, and thy seed after thee in their generations.` },
    { verse: 10, text: `This is my covenant, which ye shall keep, between me and you and thy seed after thee; Every man child among you shall be circumcised.` },
    { verse: 11, text: `And ye shall circumcise the flesh of your foreskin; and it shall be a token of the covenant betwixt me and you.` },
    { verse: 12, text: `And he that is eight days old shall be circumcised among you, every man child in your generations, he that is born in the house, or bought with money of any stranger*, which is not of thy seed.` },
    { verse: 13, text: `He that is born in thy house, and he that is bought with thy money, must needs be circumcised: and my covenant shall be in your flesh for an everlasting covenant.` },
    { verse: 14, text: `And the uncircumcised man child whose flesh of his foreskin is not circumcised, that soul shall be cut off from his people; he hath broken my covenant.` },
    { verse: 15, text: `And God said unto Abraham, As for Sarai thy wife, thou shalt not call her name Sarai, but Sarah shall her name be.` },
    { verse: 16, text: `And I will bless her, and give thee a son also of her: yea, I will bless her, and she shall be a mother of nations; kings of people shall be of her.` },
    { verse: 17, text: `Then Abraham fell upon his face, and laughed, and said in his heart, Shall a child be born unto him that is an hundred years old? and shall Sarah, that is ninety years old, bear?` },
    { verse: 18, text: `And Abraham said unto God, O that Ishmael might live before thee!` },
    { verse: 19, text: `And God said, Sarah thy wife shall bear thee a son indeed; and thou shalt call his name Isaac: and I will establish my covenant with him for an everlasting covenant, and with his seed after him.` },
    { verse: 20, text: `And as for Ishmael, I have heard thee: Behold, I have blessed him, and will make him fruitful, and will multiply him exceedingly*; twelve* princes shall he beget, and I will make him a great nation.` },
    { verse: 21, text: `But my covenant will I establish with Isaac, which Sarah shall bear unto thee at this set time in the next year.` },
    { verse: 22, text: `And he left off talking with him, and God went up from Abraham.` },
    { verse: 23, text: `And Abraham took Ishmael his son, and all that were born in his house, and all that were bought with his money, every male among the men of Abraham's house; and circumcised the flesh of their foreskin in the selfsame day, as God had said unto him.` },
    { verse: 24, text: `And Abraham was ninety years old and nine, when he was circumcised in the flesh of his foreskin.` },
    { verse: 25, text: `And Ishmael his son was thirteen* years old, when he was circumcised in the flesh of his foreskin.` },
    { verse: 26, text: `In the selfsame day was Abraham circumcised, and Ishmael his son.` },
    { verse: 27, text: `And all the men of his house, born in the house, and bought with money of the stranger*, were circumcised with him.` },
  ],
  18: [
    { verse: 1, text: `And the LORD appeared unto him in the plains of Mamre: and he sat in the tent door in the heat of the day;` },
    { verse: 2, text: `And he lift up his eyes and looked, and, lo, three men stood by him: and when he saw them, he ran to meet them from the tent door, and bowed himself toward the ground,` },
    { verse: 3, text: `And said, My Lord, if now I have found favour in thy sight, pass not away, I pray thee, from thy servant:` },
    { verse: 4, text: `Let a little water, I pray you, be fetched, and wash your feet, and rest yourselves under the tree:` },
    { verse: 5, text: `And I will fetch a morsel of bread, and comfort ye your hearts; after that ye shall pass on: for therefore are ye come to your servant. And they said, So do, as thou hast said.` },
    { verse: 6, text: `And Abraham hastened into the tent unto Sarah, and said, Make ready quickly three measures of fine meal, knead it, and make cakes upon the hearth.` },
    { verse: 7, text: `And Abraham ran unto the herd, and fetcht a calf* tender and good, and gave it unto a young man; and he hasted to dress it.` },
    { verse: 8, text: `And he took butter, and milk, and the calf which he had dressed, and set it before them; and he stood by them under the tree, and they did eat.` },
    { verse: 9, text: `And they said unto him, Where is Sarah thy wife? And he said, Behold, in the tent.` },
    { verse: 10, text: `And he said, I will certainly return unto thee according to the time of life; and, lo, Sarah thy wife shall have a son. And Sarah heard it in the tent door, which was behind him.` },
    { verse: 11, text: `Now Abraham and Sarah were old and well stricken in age; and it ceased to be with Sarah after the manner of women.` },
    { verse: 12, text: `Therefore Sarah laughed within herself, saying, After I am waxed old shall I have pleasure, my lord being old also?` },
    { verse: 13, text: `And the LORD said unto Abraham, Wherefore did Sarah laugh, saying, Shall I of a surety bear a child, which am old?` },
    { verse: 14, text: `Is any thing too hard for the LORD? At the time appointed I will return unto thee, according to the time of life, and Sarah shall have a son.` },
    { verse: 15, text: `Then Sarah denied, saying, I laughed not; for she was afraid. And he said, Nay; but thou didst laugh.` },
    { verse: 16, text: `And the men rose up from thence, and looked toward Sodom: and Abraham went with them to bring them on the way.` },
    { verse: 17, text: `And the LORD said, Shall I hide from Abraham that thing which I do;` },
    { verse: 18, text: `Seeing that Abraham shall surely become a great and mighty nation, and all the nations of the earth shall be blessed in him?` },
    { verse: 19, text: `For I know him, that he will command his children and his household after him, and they shall keep the way of the LORD, to do justice and judgment; that the LORD may bring upon Abraham that which he hath spoken of him.` },
    { verse: 20, text: `And the LORD said, Because the cry of Sodom and Gomorrah is great, and because their sin is very grievous;` },
    { verse: 21, text: `I will go down now, and see whether they have done altogether according to the cry of it, which is come unto me; and if not, I will know.` },
    { verse: 22, text: `And the men turned their faces from thence, and went toward Sodom: but Abraham stood yet before the LORD.` },
    { verse: 23, text: `And Abraham drew near, and said, Wilt thou also destroy the righteous with the wicked?` },
    { verse: 24, text: `Peradventure there be fifty righteous within the city: wilt thou also destroy and not spare the place for the fifty righteous that are therein?` },
    { verse: 25, text: `That be far from thee to do after this manner, to slay the righteous with the wicked: and that the righteous should be as the wicked, that be far from thee: Shall not the Judge of all the earth do right?` },
    { verse: 26, text: `And the LORD said, If I find in Sodom fifty righteous within the city, then I will spare all the place for their sakes.` },
    { verse: 27, text: `And Abraham answered and said, Behold now, I have taken upon me to speak unto the Lord, which am but dust and ashes:` },
    { verse: 28, text: `Peradventure there shall lack five of the fifty righteous: wilt thou destroy all the city for lack of five? And he said, If I find there forty and five, I will not destroy it.` },
    { verse: 29, text: `And he spake unto him yet again, and said, Peradventure there shall be forty found there. And he said, I will not do it for forty's sake.` },
    { verse: 30, text: `And he said unto him, Oh let not the Lord be angry, and I will speak: Peradventure there shall thirty be found there. And he said, I will not do it, if I find thirty there.` },
    { verse: 31, text: `And he said, Behold now, I have taken upon me to speak unto the Lord: Peradventure there shall be twenty found there. And he said, I will not destroy it for twenty's sake.` },
    { verse: 32, text: `And he said, Oh let not the Lord be angry, and I will speak yet but this once: Peradventure ten shall be found there. And he said, I will not destroy it for ten's sake.` },
    { verse: 33, text: `And the LORD went his way, as soon as he had left communing with Abraham: and Abraham returned unto his place.` },
  ],
  19: [
    { verse: 1, text: `And there came two angels to Sodom at even; and Lot sat in the gate of Sodom: and Lot seeing them rose up to meet them; and he bowed himself with his face toward the ground;` },
    { verse: 2, text: `And he said, Behold now, my lords, turn in, I pray you, into your servant's house, and tarry all night, and wash your feet, and ye shall rise up early, and go on your ways. And they said, Nay; but we will abide in the street all night.` },
    { verse: 3, text: `And he pressed upon them greatly; and they turned in unto him, and entered into his house; and he made them a feast, and did bake unleavened bread, and they did eat.` },
    { verse: 4, text: `But before they lay down, the men of the city, even the men of Sodom, compassed the house round, both old and young, all the people from every quarter:` },
    { verse: 5, text: `And they called unto Lot, and said unto him, Where are the men which came in to thee this night? bring them out unto us, that we may know them.` },
    { verse: 6, text: `And Lot went out at the door unto them, and shut the door after him,` },
    { verse: 7, text: `And said, I pray you, brethren, do not so wickedly.` },
    { verse: 8, text: `Behold now, I have two daughters which have not known man; let me, I pray you, bring them out unto you, and do ye to them as is good in your eyes: only unto these men do nothing*; for therefore came they under the shadow of my roof.` },
    { verse: 9, text: `And they said, Stand back. And they said again, This one fellow came in to sojourn, and he will needs be a judge: now will we deal worse with thee, than with them. And they pressed sore upon the man, even Lot, and came near to break the door.` },
    { verse: 10, text: `But the men put forth their hand, and pulled Lot into the house to them, and shut to the door.` },
    { verse: 11, text: `And they smote the men that were at the door of the house with blindness, both small and great: so that they wearied themselves to find the door.` },
    { verse: 12, text: `And the men said unto Lot, Hast thou here any besides? son in law, and thy sons, and thy daughters, and whatsoever thou hast in the city, bring them out of this place:` },
    { verse: 13, text: `For we will destroy* this place, because the cry of them is waxen great before the face of the LORD; and the LORD hath sent us to destroy it.` },
    { verse: 14, text: `And Lot went out, and spake unto his sons in law, which married his daughters, and said, Up, get you out of this place; for the LORD will destroy this city. But he seemed as one that mocked unto his sons in law.` },
    { verse: 15, text: `And when the morning arose, then the angels hastened Lot, saying, Arise, take thy wife, and thy two daughters, which are here; lest thou be consumed in the iniquity of the city.` },
    { verse: 16, text: `And while he lingered, the men laid hold upon his hand, and upon the hand of his wife, and upon the hand of his two daughters; the LORD being merciful unto him: and they brought him forth, and set him without the city.` },
    { verse: 17, text: `And it came to pass, when they had brought them forth abroad, that he said, Escape for thy life; look not behind thee, neither stay thou in all the plain; escape to the mountain, lest thou be consumed.` },
    { verse: 18, text: `And Lot said unto them, Oh, not so, my Lord:` },
    { verse: 19, text: `Behold now, thy servant hath found grace in thy sight, and thou hast magnified thy mercy, which thou hast shewed unto me in saving my life; and I cannot escape to the mountain, lest some evil take me, and I die:` },
    { verse: 20, text: `Behold now, this city is near to flee unto, and it is a little one: Oh, let me escape thither, (is it not a little one?) and my soul shall live.` },
    { verse: 21, text: `And he said unto him, See, I have accepted thee concerning this thing also, that I will not overthrow this city, for the which thou hast spoken.` },
    { verse: 22, text: `Haste thee, escape thither; for I cannot do any thing till thou be come thither. Therefore the name of the city was called Zoar.` },
    { verse: 23, text: `The sun was risen upon the earth when Lot entered into Zoar.` },
    { verse: 24, text: `Then the LORD rained upon Sodom and upon Gomorrah brimstone and fire from the LORD out of heaven;` },
    { verse: 25, text: `And he overthrew those cities, and all the plain, and all the inhabitants of the cities, and that which grew upon the ground.` },
    { verse: 26, text: `But his wife looked back from behind him, and she became a pillar of salt.` },
    { verse: 27, text: `And Abraham gat up early in the morning to the place where he stood before the LORD:` },
    { verse: 28, text: `And he looked toward Sodom and Gomorrah, and toward all the land of the plain, and beheld, and, lo, the smoke of the country went up as the smoke of a furnace.` },
    { verse: 29, text: `And it came to pass, when God destroyed the cities of the plain, that God remembered Abraham, and sent Lot out of the midst of the overthrow, when he overthrew the cities in the which Lot dwelt.` },
    { verse: 30, text: `And Lot went up out of Zoar, and dwelt in the mountain, and his two daughters with him; for he feared to dwell in Zoar: and he dwelt in a cave, he and his two daughters.` },
    { verse: 31, text: `And the firstborn said unto the younger, Our father is old, and there is not a man in the earth to come in unto us after the manner of all the earth:` },
    { verse: 32, text: `Come, let us make our father drink wine, and we will lie with him, that we may preserve seed of our father.` },
    { verse: 33, text: `And they made their father drink wine that night: and the firstborn went in, and lay with her father; and he perceived not when she lay down, nor when she arose.` },
    { verse: 34, text: `And it came to pass on the morrow, that the firstborn said unto the younger, Behold, I lay yesternight with my father: let us make him drink wine this night also; and go thou in, and lie with him, that we may preserve seed of our father.` },
    { verse: 35, text: `And they made their father drink wine that night also: and the younger arose, and lay with him; and he perceived not when she lay down, nor when she arose.` },
    { verse: 36, text: `Thus were both the daughters of Lot with child by their father.` },
    { verse: 37, text: `And the firstborn bare a son, and called his name Moab: the same is the father of the Moabites unto this day.` },
    { verse: 38, text: `And the younger, she also bare a son, and called his name Benammi: the same is the father of the children of Ammon unto this day.` },
  ],
  20: [
    { verse: 1, text: `And Abraham journeyed from thence toward the south country, and dwelled between Kadesh and Shur, and sojourned in Gerar.` },
    { verse: 2, text: `And Abraham said of Sarah his wife, She is my sister: and Abimelech king of Gerar sent, and took Sarah.` },
    { verse: 3, text: `But God came to Abimelech in a dream by night, and said to him, Behold, thou art but a dead man, for the woman which thou hast taken; for she is a man's wife.` },
    { verse: 4, text: `But Abimelech had not come near her: and he said, Lord, wilt thou slay also a righteous nation?` },
    { verse: 5, text: `Said he not unto me, She is my sister? and she, even she herself said, He is my brother: in the integrity of my heart and innocency of my hands have I done this.` },
    { verse: 6, text: `And God said unto him in a dream, Yea, I know that thou didst this in the integrity of thy heart; for I also withheld thee from sinning against me: therefore suffered I thee not to touch her.` },
    { verse: 7, text: `Now therefore restore the man his wife; for he is a prophet, and he shall pray for thee, and thou shalt live: and if thou restore her not, know thou that thou shalt surely die, thou, and all that are thine.` },
    { verse: 8, text: `Therefore Abimelech rose early in the morning, and called all his servants, and told all these things in their ears: and the men were sore afraid.` },
    { verse: 9, text: `Then Abimelech called Abraham, and said unto him, What hast thou done unto us? and what have I offended thee, that thou hast brought on me and on my kingdom a great sin? thou hast done deeds unto me that ought not to be done.` },
    { verse: 10, text: `And Abimelech said unto Abraham, What sawest thou, that thou hast done this thing?` },
    { verse: 11, text: `And Abraham said, Because I thought, Surely the fear of God is not in this place; and they will slay me for my wife's sake.` },
    { verse: 12, text: `And yet indeed she is my sister; she is the daughter of my father, but not the daughter of my mother; and she became my wife.` },
    { verse: 13, text: `And it came to pass, when God caused me to wander from my father's house, that I said unto her, This is thy kindness which thou shalt shew unto me; at every place whither we shall come, say of me, He is my brother.` },
    { verse: 14, text: `And Abimelech took sheep, and oxen, and menservants, and womenservants, and gave them unto Abraham, and restored him Sarah his wife.` },
    { verse: 15, text: `And Abimelech said, Behold, my land is before thee: dwell where it pleaseth thee.` },
    { verse: 16, text: `And unto Sarah he said, Behold, I have given thy brother a thousand pieces of silver: behold, he is to thee a covering of the eyes, unto all that are with thee, and with all other: thus she was reproved.` },
    { verse: 17, text: `So Abraham prayed unto God: and God healed Abimelech, and his wife, and his maidservants; and they bare children.` },
    { verse: 18, text: `For the LORD had fast closed up all the wombs of the house of Abimelech, because of Sarah Abraham's wife.` },
  ],
  21: [
    { verse: 1, text: `And the LORD visited Sarah as he had said, and the LORD did unto Sarah as he had spoken.` },
    { verse: 2, text: `For Sarah conceived, and bare Abraham a son in his old age, at the set time of which God had spoken to him.` },
    { verse: 3, text: `And Abraham called the name of his son that was born unto him, whom Sarah bare to him, Isaac.` },
    { verse: 4, text: `And Abraham circumcised his son Isaac being eight days old, as God had commanded him.` },
    { verse: 5, text: `And Abraham was an hundred years old, when his son Isaac was born unto him.` },
    { verse: 6, text: `And Sarah said, God hath made me to laugh, so that all that hear will laugh with me.` },
    { verse: 7, text: `And she said, Who would have said unto Abraham, that Sarah should have given children suck? for I have born him a son in his old age.` },
    { verse: 8, text: `And the child grew, and was weaned: and Abraham made a great feast the same day that Isaac was weaned.` },
    { verse: 9, text: `And Sarah saw the son of Hagar the Egyptian, which she had born unto Abraham, mocking.` },
    { verse: 10, text: `Wherefore she said unto Abraham, Cast out this bondwoman and her son: for the son of this bondwoman shall not be heir with my son, even with Isaac.` },
    { verse: 11, text: `And the thing was very grievous in Abraham's sight because of his son.` },
    { verse: 12, text: `And God said unto Abraham, Let it not be grievous in thy sight because of the lad, and because of thy bondwoman; in all that Sarah hath said unto thee, hearken unto her voice; for in Isaac shall thy seed be called.` },
    { verse: 13, text: `And also of the son of the bondwoman will I make a nation, because he is thy seed.` },
    { verse: 14, text: `And Abraham rose up early in the morning, and took bread, and a bottle of water, and gave it unto Hagar, putting it on her shoulder, and the child, and sent her away: and she departed, and wandered in the wilderness of Beersheba.` },
    { verse: 15, text: `And the water was spent in the bottle, and she cast the child under one of the shrubs.` },
    { verse: 16, text: `And she went, and sat her down over against him a good way off, as it were a bowshot*: for she said, Let me not see the death of the child. And she sat over against him, and lift up her voice, and wept.` },
    { verse: 17, text: `And God heard the voice of the lad; and the angel of God called to Hagar out of heaven, and said unto her, What aileth thee, Hagar? fear not; for God hath heard the voice of the lad where he is.` },
    { verse: 18, text: `Arise, lift up the lad, and hold him in thine hand; for I will make him a great nation.` },
    { verse: 19, text: `And God opened her eyes, and she saw a well of water; and she went, and filled the bottle with water, and gave the lad drink.` },
    { verse: 20, text: `And God was with the lad; and he grew, and dwelt in the wilderness, and became an archer*.` },
    { verse: 21, text: `And he dwelt in the wilderness of Paran: and his mother took him a wife out of the land of Egypt.` },
    { verse: 22, text: `And it came to pass at that time, that Abimelech and Phichol the chief captain of his host spake unto Abraham, saying, God is with thee in all that thou doest:` },
    { verse: 23, text: `Now therefore swear unto me here by God that thou wilt not deal falsely with me, nor with my son, nor with my son's son: but according to the kindness that I have done unto thee, thou shalt do unto me, and to the land wherein thou hast sojourned.` },
    { verse: 24, text: `And Abraham said, I will swear.` },
    { verse: 25, text: `And Abraham reproved Abimelech because of a well of water, which Abimelech's servants had violently taken away.` },
    { verse: 26, text: `And Abimelech said, I wot not who hath done this thing: neither didst thou tell me, neither yet heard I of it, but to day.` },
    { verse: 27, text: `And Abraham took sheep and oxen, and gave them unto Abimelech; and both of them made a covenant.` },
    { verse: 28, text: `And Abraham set seven ewe lambs of the flock by themselves.` },
    { verse: 29, text: `And Abimelech said unto Abraham, What mean these seven ewe lambs which thou hast set by themselves?` },
    { verse: 30, text: `And he said, For these seven ewe lambs shalt thou take of my hand, that they may be a witness unto me, that I have digged this well.` },
    { verse: 31, text: `Wherefore he called that place Beersheba; because there they sware both of them.` },
    { verse: 32, text: `Thus they made a covenant at Beersheba: then Abimelech rose up, and Phichol the chief captain of his host, and they returned into the land of the Philistines.` },
    { verse: 33, text: `And Abraham planted a grove in Beersheba, and called there on the name of the LORD, the everlasting God.` },
    { verse: 34, text: `And Abraham sojourned in the Philistines' land many days.` },
  ],
  22: [
    { verse: 1, text: `And it came to pass after these things, that God did tempt Abraham, and said unto him, Abraham: and he said, Behold, here I am.` },
    { verse: 2, text: `And he said, Take now thy son, thine only son Isaac, whom thou lovest, and get thee into the land of Moriah; and offer him there for a burnt offering upon one of the mountains which I will tell thee of.` },
    { verse: 3, text: `And Abraham rose up early in the morning, and saddled his ass, and took two of his young men with him, and Isaac his son, and clave the wood for the burnt offering, and rose up, and went unto the place of which God had told him.` },
    { verse: 4, text: `Then on the third day Abraham lifted up his eyes, and saw the place afar off.` },
    { verse: 5, text: `And Abraham said unto his young men, Abide ye here with the ass; and I and the lad will go yonder and worship, and come again to you.` },
    { verse: 6, text: `And Abraham took the wood of the burnt offering, and laid it upon Isaac his son; and he took the fire in his hand, and a knife; and they went both of them together.` },
    { verse: 7, text: `And Isaac spake unto Abraham his father, and said, My father: and he said, Here am I, my son. And he said, Behold the fire and the wood: but where is the lamb for a burnt offering?` },
    { verse: 8, text: `And Abraham said, My son, God will provide himself a lamb for a burnt offering: so they went both of them together.` },
    { verse: 9, text: `And they came to the place which God had told him of; and Abraham built an altar there, and laid the wood in order, and bound Isaac his son, and laid him on the altar upon the wood.` },
    { verse: 10, text: `And Abraham stretched forth his hand, and took the knife to slay his son.` },
    { verse: 11, text: `And the angel of the LORD called unto him out of heaven, and said, Abraham, Abraham: and he said, Here am I.` },
    { verse: 12, text: `And he said, Lay not thine hand upon the lad, neither do thou any thing unto him: for now I know that thou fearest God, seeing thou hast not withheld thy son, thine only son from me.` },
    { verse: 13, text: `And Abraham lifted up his eyes, and looked, and behold behind him a ram caught in a thicket by his horns: and Abraham went and took the ram, and offered him up for a burnt offering in the stead of his son.` },
    { verse: 14, text: `And Abraham called the name of that place Jehovahjireh: as it is said to this day, In the mount of the LORD it shall be seen.` },
    { verse: 15, text: `And the angel of the LORD called unto Abraham out of heaven the second time,` },
    { verse: 16, text: `And said, By myself have I sworn, saith the LORD, for because thou hast done this thing, and hast not withheld thy son, thine only son:` },
    { verse: 17, text: `That in blessing I will bless thee, and in multiplying I will multiply thy seed as the stars of the heaven, and as the sand which is upon the sea shore; and thy seed shall possess the gate of his enemies;` },
    { verse: 18, text: `And in thy seed shall all the nations of the earth be blessed; because thou hast obeyed my voice.` },
    { verse: 19, text: `So Abraham returned unto his young men, and they rose up and went together to Beersheba; and Abraham dwelt at Beersheba.` },
    { verse: 20, text: `And it came to pass after these things, that it was told Abraham, saying, Behold, Milcah, she hath also born children unto thy brother Nahor;` },
    { verse: 21, text: `Huz his firstborn, and Buz his brother, and Kemuel the father of Aram,` },
    { verse: 22, text: `And Chesed, and Hazo, and Pildash, and Jidlaph, and Bethuel.` },
    { verse: 23, text: `And Bethuel begat Rebekah: these eight Milcah did bear to Nahor, Abraham's brother.` },
    { verse: 24, text: `And his concubine, whose name was Reumah, she bare also Tebah, and Gaham, and Thahash, and Maachah.` },
  ],
  23: [
    { verse: 1, text: `And Sarah was an hundred and seven and twenty years old: these were the years of the life of Sarah.` },
    { verse: 2, text: `And Sarah died in Kirjatharba; the same is Hebron in the land of Canaan: and Abraham came to mourn for Sarah, and to weep for her.` },
    { verse: 3, text: `And Abraham stood up from before his dead, and spake unto the sons of Heth, saying,` },
    { verse: 4, text: `I am a stranger and a sojourner with you: give me a possession of a buryingplace with you, that I may bury my dead out of my sight.` },
    { verse: 5, text: `And the children of Heth answered Abraham, saying unto him,` },
    { verse: 6, text: `Hear us, my lord: thou art a mighty prince among us: in the choice of our sepulchres bury thy dead; none of us shall withhold from thee his sepulchre, but that thou mayest bury thy dead.` },
    { verse: 7, text: `And Abraham stood up, and bowed himself to the people of the land, even to the children of Heth.` },
    { verse: 8, text: `And he communed with them, saying, If it be your mind that I should bury my dead out of my sight; hear me, and intreat for me to Ephron the son of Zohar,` },
    { verse: 9, text: `That he may give me the cave of Machpelah, which he hath, which is in the end of his field; for as much money as it is worth he shall give it me for a possession of a buryingplace amongst you.` },
    { verse: 10, text: `And Ephron dwelt among the children of Heth: and Ephron the Hittite answered Abraham in the audience of the children of Heth, even of all that went in at the gate of his city, saying,` },
    { verse: 11, text: `Nay, my lord, hear me: the field give I thee, and the cave that is therein, I give it thee; in the presence of the sons of my people give I it thee: bury thy dead.` },
    { verse: 12, text: `And Abraham bowed down himself before the people of the land.` },
    { verse: 13, text: `And he spake unto Ephron in the audience of the people of the land, saying, But if thou wilt give it, I pray thee, hear me: I will give thee money for the field; take it of me, and I will bury my dead there.` },
    { verse: 14, text: `And Ephron answered Abraham, saying unto him` },
    { verse: 15, text: `My lord, hearken unto me: the land is worth four hundred shekels of silver; what is that betwixt me and thee? bury therefore thy dead.` },
    { verse: 16, text: `And Abraham hearkened unto Ephron; and Abraham weighed to Ephron the silver, which he had named in the audience of the sons of Heth, four hundred shekels of silver, current money with the merchant.` },
    { verse: 17, text: `And the field of Ephron, which was in Machpelah, which was before Mamre, the field, and the cave which was therein, and all the trees that were in the field, that were in all the borders round about, were made sure` },
    { verse: 18, text: `Unto Abraham for a possession in the presence of the children of Heth, before all that went in at the gate of his city.` },
    { verse: 19, text: `And after this, Abraham buried Sarah his wife in the cave of the field of Machpelah before Mamre: the same is Hebron in the land of Canaan.` },
    { verse: 20, text: `And the field, and the cave that is therein, were made sure unto Abraham for a possession of a buryingplace by the sons of Heth.` },
  ],
  24: [
    { verse: 1, text: `And Abraham was old, and well stricken in age: and the LORD had blessed Abraham in all things.` },
    { verse: 2, text: `And Abraham said unto his eldest servant of his house, that ruled over all that he had, Put, I pray thee, thy hand under my thigh:` },
    { verse: 3, text: `And I will make thee swear by the LORD, the God of heaven, and the God of the earth, that thou shalt not take a wife unto my son of the daughters of the Canaanites, among whom I dwell:` },
    { verse: 4, text: `But thou shalt go unto my country, and to my kindred, and take a wife unto my son Isaac.` },
    { verse: 5, text: `And the servant said unto him, Peradventure the woman will not be willing to follow me unto this land: must I needs bring thy son again unto the land from whence thou camest?` },
    { verse: 6, text: `And Abraham said unto him, Beware thou that thou bring not my son thither again.` },
    { verse: 7, text: `The LORD God of heaven, which took me from my father's house, and from the land of my kindred, and which spake unto me, and that sware unto me, saying, Unto thy seed will I give this land; he shall send his angel before thee, and thou shalt take a wife unto my son from thence.` },
    { verse: 8, text: `And if the woman will not be willing to follow thee, then thou shalt be clear from this my oath: only bring not my son thither again.` },
    { verse: 9, text: `And the servant put his hand under the thigh of Abraham his master, and sware to him concerning that matter.` },
    { verse: 10, text: `And the servant took ten camels of the camels of his master, and departed; for all the goods of his master were in his hand: and he arose, and went to Mesopotamia, unto the city of Nahor.` },
    { verse: 11, text: `And he made his camels to kneel down without the city by a well of water at the time of the evening, even the time that women go out to draw water.` },
    { verse: 12, text: `And he said, O LORD God of my master Abraham, I pray thee, send me good speed this day, and shew kindness unto my master Abraham.` },
    { verse: 13, text: `Behold, I stand here by the well of water; and the daughters of the men of the city come out to draw water:` },
    { verse: 14, text: `And let it come to pass, that the damsel to whom I shall say, Let down thy pitcher, I pray thee, that I may drink; and she shall say, Drink, and I will give thy camels drink also: let the same be she that thou hast appointed for thy servant Isaac; and thereby shall I know that thou hast shewed kindness unto my master.` },
    { verse: 15, text: `And it came to pass, before he had done speaking, that, behold, Rebekah came out, who was born to Bethuel, son of Milcah, the wife of Nahor, Abraham's brother, with her pitcher upon her shoulder.` },
    { verse: 16, text: `And the damsel was very fair to look upon, a virgin, neither had any man known her: and she went down to the well, and filled her pitcher, and came up.` },
    { verse: 17, text: `And the servant ran to meet her, and said, Let me, I pray thee, drink a little water of thy pitcher.` },
    { verse: 18, text: `And she said, Drink, my lord: and she hasted, and let down her pitcher upon her hand, and gave him drink.` },
    { verse: 19, text: `And when she had done giving him drink, she said, I will draw water for thy camels also, until they have done drinking.` },
    { verse: 20, text: `And she hasted, and emptied her pitcher into the trough, and ran again unto the well to draw water, and drew for all his camels.` },
    { verse: 21, text: `And the man wondering at her held his peace, to wit whether the LORD had made his journey prosperous or not.` },
    { verse: 22, text: `And it came to pass, as the camels had done drinking, that the man took a golden earring of half a shekel weight, and two bracelets for her hands of ten shekels weight of gold;` },
    { verse: 23, text: `And said, Whose daughter art thou? tell me, I pray thee: is there room in thy father's house for us to lodge in?` },
    { verse: 24, text: `And she said unto him, I am the daughter of Bethuel the son of Milcah, which she bare unto Nahor.` },
    { verse: 25, text: `She said moreover unto him, We have both straw and provender enough, and room to lodge in.` },
    { verse: 26, text: `And the man bowed down his head, and worshipped the LORD.` },
    { verse: 27, text: `And he said, Blessed be the LORD God of my master Abraham, who hath not left destitute* my master of his mercy and his truth: I being in the way, the LORD led me to the house of my master's brethren.` },
    { verse: 28, text: `And the damsel ran, and told them of her mother's house these things.` },
    { verse: 29, text: `And Rebekah had a brother, and his name was Laban: and Laban ran out unto the man, unto the well.` },
    { verse: 30, text: `And it came to pass, when he saw the earring and bracelets upon his sister's hands, and when he heard the words of Rebekah his sister, saying, Thus spake the man unto me; that he came unto the man; and, behold, he stood by the camels at the well.` },
    { verse: 31, text: `And he said, Come in, thou blessed of the LORD; wherefore standest thou without? for I have prepared the house, and room for the camels.` },
    { verse: 32, text: `And the man came into the house: and he ungirded his camels, and gave straw and provender for the camels, and water to wash his feet, and the men's feet that were with him.` },
    { verse: 33, text: `And there was set meat before him to eat: but he said, I will not eat, until I have told mine errand. And he said, Speak on.` },
    { verse: 34, text: `And he said, I am Abraham's servant.` },
    { verse: 35, text: `And the LORD hath blessed my master greatly; and he is become great: and he hath given him flocks, and herds, and silver, and gold, and menservants, and maidservants, and camels, and asses.` },
    { verse: 36, text: `And Sarah my master's wife bare a son to my master when she was old: and unto him hath he given all that he hath.` },
    { verse: 37, text: `And my master made me swear, saying, Thou shalt not take a wife to my son of the daughters of the Canaanites, in whose land I dwell:` },
    { verse: 38, text: `But thou shalt go unto my father's house, and to my kindred, and take a wife unto my son.` },
    { verse: 39, text: `And I said unto my master, Peradventure the woman will not follow* me.` },
    { verse: 40, text: `And he said unto me, The LORD, before whom I walk, will send his angel with thee, and prosper thy way; and thou shalt take a wife for my son of my kindred, and of my father's house:` },
    { verse: 41, text: `Then shalt thou be clear from this my oath, when thou comest to my kindred; and if they give not thee one, thou shalt be clear from my oath.` },
    { verse: 42, text: `And I came this day unto the well, and said, O LORD God of my master Abraham, if now thou do prosper my way which I go:` },
    { verse: 43, text: `Behold, I stand by the well of water; and it shall come to pass, that when the virgin cometh forth to draw water, and I say to her, Give me, I pray thee, a little water of thy pitcher to drink;` },
    { verse: 44, text: `And she say to me, Both drink thou, and I will also draw for thy camels: let the same be the woman whom the LORD hath appointed out for my master's son.` },
    { verse: 45, text: `And before I had done speaking in mine heart, behold, Rebekah came forth with her pitcher on her shoulder; and she went down unto the well, and drew water: and I said unto her, Let me drink, I pray thee.` },
    { verse: 46, text: `And she made haste, and let down her pitcher from her shoulder, and said, Drink, and I will give thy camels drink also: so I drank, and she made the camels drink also.` },
    { verse: 47, text: `And I asked her, and said, Whose daughter art thou? And she said, The daughter of Bethuel, Nahor's son, whom Milcah bare unto him: and I put the earring upon her face, and the bracelets upon her hands.` },
    { verse: 48, text: `And I bowed down my head, and worshipped the LORD, and blessed the LORD God of my master Abraham, which had led me in the right way to take my master's brother's daughter unto his son.` },
    { verse: 49, text: `And now if ye will deal kindly and truly with my master, tell me: and if not, tell me; that I may turn to the right hand, or to the left.` },
    { verse: 50, text: `Then Laban and Bethuel answered and said, The thing proceedeth from the LORD: we cannot speak unto thee bad or good.` },
    { verse: 51, text: `Behold, Rebekah is before thee, take her, and go, and let her be thy master's son's wife, as the LORD hath spoken.` },
    { verse: 52, text: `And it came to pass, that, when Abraham's servant heard their words, he worshipped the LORD, bowing himself to the earth.` },
    { verse: 53, text: `And the servant brought forth jewels of silver, and jewels of gold, and raiment, and gave them to Rebekah: he gave also to her brother and to her mother precious things.` },
    { verse: 54, text: `And they did eat and drink, he and the men that were with him, and tarried all night; and they rose up in the morning, and he said, Send me away unto my master.` },
    { verse: 55, text: `And her brother and her mother said, Let the damsel abide with us a few days, at the least ten; after that she shall go.` },
    { verse: 56, text: `And he said unto them, Hinder me not, seeing the LORD hath prospered my way; send me away that I may go to my master.` },
    { verse: 57, text: `And they said, We will call the damsel, and enquire at her mouth.` },
    { verse: 58, text: `And they called Rebekah, and said unto her, Wilt thou go with this man? And she said, I will go.` },
    { verse: 59, text: `And they sent away Rebekah their sister, and her nurse, and Abraham's servant, and his men.` },
    { verse: 60, text: `And they blessed Rebekah, and said unto her, Thou art our sister, be thou the mother of thousands of millions, and let thy seed possess the gate of those which hate them.` },
    { verse: 61, text: `And Rebekah arose, and her damsels, and they rode upon the camels, and followed* the man: and the servant took Rebekah, and went his way.` },
    { verse: 62, text: `And Isaac came from the way of the well Lahairoi; for he dwelt in the south country.` },
    { verse: 63, text: `And Isaac went out to meditate in the field at the eventide: and he lifted up his eyes, and saw, and, behold, the camels were coming.` },
    { verse: 64, text: `And Rebekah lifted up her eyes, and when she saw Isaac, she lighted off the camel.` },
    { verse: 65, text: `For she had said unto the servant, What man is this that walketh in the field to meet us? And the servant had said, It is my master: therefore she took a vail, and covered herself.` },
    { verse: 66, text: `And the servant told Isaac all things that he had done.` },
    { verse: 67, text: `And Isaac brought her into his mother Sarah's tent, and took Rebekah, and she became his wife; and he loved her: and Isaac was comforted after his mother's death.` },
  ],
  25: [
    { verse: 1, text: `Then again Abraham took a wife, and her name was Keturah.` },
    { verse: 2, text: `And she bare him Zimran, and Jokshan, and Medan, and Midian, and Ishbak, and Shuah.` },
    { verse: 3, text: `And Jokshan begat Sheba, and Dedan. And the sons of Dedan were Asshurim, and Letushim, and Leummim.` },
    { verse: 4, text: `And the sons of Midian; Ephah, and Epher, and Hanoch, and Abida, and Eldaah. All these were the children of Keturah.` },
    { verse: 5, text: `And Abraham gave all that he had unto Isaac.` },
    { verse: 6, text: `But unto the sons of the concubines, which Abraham had, Abraham gave gifts, and sent them away from Isaac his son, while he yet lived, eastward, unto the east country.` },
    { verse: 7, text: `And these are the days of the years of Abraham's life which he lived, an hundred threescore and fifteen** years.` },
    { verse: 8, text: `Then Abraham gave up the ghost, and died in a good old age, an old man, and full of years; and was gathered to his people.` },
    { verse: 9, text: `And his sons Isaac and Ishmael buried him in the cave of Machpelah, in the field of Ephron the son of Zohar the Hittite, which is before Mamre;` },
    { verse: 10, text: `The field which Abraham purchased of the sons of Heth: there was Abraham buried, and Sarah his wife.` },
    { verse: 11, text: `And it came to pass after the death of Abraham, that God blessed his son Isaac; and Isaac dwelt by the well Lahairoi.` },
    { verse: 12, text: `Now these are the generations of Ishmael, Abraham's son, whom Hagar the Egyptian, Sarah's handmaid, bare unto Abraham:` },
    { verse: 13, text: `And these are the names of the sons of Ishmael, by their names, according to their generations: the firstborn of Ishmael, Nebajoth; and Kedar, and Adbeel, and Mibsam,` },
    { verse: 14, text: `And Mishma, and Dumah, and Massa,` },
    { verse: 15, text: `Hadar, and Tema, Jetur, Naphish, and Kedemah:` },
    { verse: 16, text: `These are the sons of Ishmael, and these are their names, by their towns, and by their castles; twelve* princes according to their nations.` },
    { verse: 17, text: `And these are the years of the life of Ishmael, an hundred and thirty and seven years: and he gave up the ghost and died; and was gathered unto his people.` },
    { verse: 18, text: `And they dwelt from Havilah unto Shur, that is before Egypt, as thou goest toward Assyria: and he died in the presence of all his brethren.` },
    { verse: 19, text: `And these are the generations of Isaac, Abraham's son: Abraham begat Isaac:` },
    { verse: 20, text: `And Isaac was forty years old when he took Rebekah to wife, the daughter of Bethuel the Syrian of Padanaram, the sister to Laban the Syrian.` },
    { verse: 21, text: `And Isaac intreated the LORD for his wife, because she was barren: and the LORD was intreated of him, and Rebekah his wife conceived.` },
    { verse: 22, text: `And the children struggled together within her; and she said, If it be so, why am I thus? And she went to enquire of the LORD.` },
    { verse: 23, text: `And the LORD said unto her, Two nations are in thy womb, and two manner of people shall be separated from thy bowels; and the one people shall be stronger than the other people; and the elder shall serve the younger.` },
    { verse: 24, text: `And when her days to be delivered were fulfilled, behold, there were twins in her womb.` },
    { verse: 25, text: `And the first came out red, all over like an hairy garment; and they called his name Esau.` },
    { verse: 26, text: `And after that came his brother out, and his hand took hold on Esau's heel; and his name was called Jacob: and Isaac was threescore years old when she bare them.` },
    { verse: 27, text: `And the boys grew: and Esau was a cunning hunter, a man of the field; and Jacob was a plain man, dwelling in tents.` },
    { verse: 28, text: `And Isaac loved Esau, because he did eat of his venison: but Rebekah loved Jacob.` },
    { verse: 29, text: `And Jacob sod pottage: and Esau came from the field, and he was faint:` },
    { verse: 30, text: `And Esau said to Jacob, Feed me, I pray thee, with that same red pottage; for I am faint: therefore was his name called Edom.` },
    { verse: 31, text: `And Jacob said, Sell me this day thy birthright.` },
    { verse: 32, text: `And Esau said, Behold, I am at the point to die: and what profit shall this birthright do to me?` },
    { verse: 33, text: `And Jacob said, Swear to me this day; and he sware unto him: and he sold his birthright unto Jacob.` },
    { verse: 34, text: `Then Jacob gave Esau bread and pottage of lentiles; and he did eat and drink, and rose up, and went his way: thus Esau despised his birthright.` },
  ],
};

const ABRAHAM_CHAPTER_NOTES: AbrahamChapterNote[] = [
  {
    chapter: 11,
    title: "ðŸ§³ Genesis 11 â€” The Road Before The Call",
    intro:
      "Genesis 11 sets the ground under Abraham's story. Before Abram hears God say, \"Go,\" the chapter shows a world trying to build its own security at Babel and then narrows into one family line moving toward Canaan but stopping in Haran. That matters because Abraham's obedience does not appear out of nowhere. It rises out of a real family, a real world, and an unfinished road.",
    flow: ["Babel shows pride trying to make a name without God.", "Shem's line narrows the story toward Abram.", "Terah's family begins moving toward Canaan but settles short of the destination."],
    sections: [
      {
        reference: "Genesis 11:1-9",
        title: "ðŸ™ï¸ A world trying to build without God",
        points: [
          "Babel is not just a building project. It is a picture of humanity trying to create safety, fame, and unity without surrender. They say, \"let us make us a name,\" and that line sits in sharp contrast to Genesis 12, where God says He will make Abram's name great.",
          "That contrast is important. Human pride tries to climb upward and secure itself. Faith receives identity from God. Babel reaches for heaven on its own terms, but Abraham will be called to walk with God on God's terms.",
          "The scattering at Babel is judgment, but it also keeps human pride from hardening into one massive rebellion. God interrupts a false unity so that His redemptive plan can move forward through promise instead of human self-glory.",
        ],
      },
      {
        reference: "Genesis 11:10-26",
        title: "ðŸ§¬ The story narrows toward one family",
        points: [
          "The genealogy can feel slow, but it is doing something important. Scripture is tracing the line forward until Abram comes into view. The Bible is teaching us that God works through generations, names, families, and time.",
          "This reminds us that Abraham's story is connected to a bigger story. God is not making a random choice. He is carrying forward His plan through ordinary human history.",
          "Genealogies can feel like lists, but they are also witnesses. They say, \"God has not lost the thread.\" Even when history looks scattered, God knows exactly where the promise is moving.",
        ],
      },
      {
        reference: "Genesis 11:27-32",
        title: "ðŸ›£ï¸ An unfinished journey",
        points: [
          "Terah's household leaves Ur and heads toward Canaan, but they settle in Haran. The destination is named before the calling is fully spoken. That gives Genesis 12 a sense of holy continuation. God will call Abram to finish a road already begun.",
          "Sarai's barrenness is also named here. That detail is not random. The very promise God will give Abram will press against the deepest impossibility in his household.",
          "Genesis 11 ends in an in-between place. That is often where calling begins. God steps into unfinished stories, old grief, family movement, delayed hopes, and places where people have stopped short.",
        ],
      },
    ],
    lesson:
      "Genesis 11 teaches that God's call often begins before we recognize it. Abraham's story starts with pride being scattered, a family line being preserved, and an unfinished road waiting for God's voice.",
  },
  {
    chapter: 12,
    title: "ðŸ“£ Genesis 12 â€” The Call To Leave",
    intro:
      "Genesis 12 is the great turning point. God speaks to Abram and calls him away from the familiar into a future that depends entirely on God's promise. But the same chapter also shows Abram's fear in Egypt, so the Bible introduces him honestly: obedient, chosen, and still deeply in need of growth.",
    flow: ["God calls Abram to leave and promises blessing.", "Abram enters the land and builds altars.", "Famine exposes fear and self-protection."],
    sections: [
      {
        reference: "Genesis 12:1-9",
        title: "ðŸ›£ï¸ Obedience before the full map",
        points: [
          "God tells Abram to leave country, kindred, and father's house. That is not a small request. God is asking Abram to loosen his grip on identity, security, inheritance, and the world he understands.",
          "The promise is bigger than Abram's personal comfort. God promises land, nation, blessing, a great name, and blessing for all families of the earth. Abram's obedience becomes part of God's mercy reaching outward.",
          "Abram goes. That simple obedience is powerful. He does not have every detail, but he has God's word. Faith begins when God's voice becomes weightier than our demand for complete control.",
        ],
      },
      {
        reference: "Genesis 12:10-16",
        title: "ðŸŒ¾ Famine after obedience",
        points: [
          "The famine matters because it comes after Abram obeys. Sometimes people assume obedience should immediately make life easier, but Abram's first chapter of faith includes pressure.",
          "In Egypt, fear bends Abram's judgment. He tells Sarai to say she is his sister, protecting himself while placing her at risk. The Bible does not hide this. Abram is a man of faith, but fear still knows how to speak loudly in him.",
          "This is a serious reminder that obedience in one area does not mean every part of the heart is mature. God may call a person forward while still needing to heal the fears they carry with them.",
        ],
      },
      {
        reference: "Genesis 12:17-20",
        title: "ðŸ›¡ï¸ God protects the promise",
        points: [
          "God intervenes to protect Sarai and the promise. Abram's failure could have caused deep damage, but God's faithfulness is stronger than Abram's poor decision.",
          "This does not excuse Abram. It magnifies God's mercy. The future of the promise rests on God, not on Abram's perfect performance.",
          "Genesis 12 gives us a realistic beginning. Faith has begun, but formation has only started. Abram will keep learning what it means to trust God with more than the journey. He must learn to trust God with fear.",
        ],
      },
    ],
    lesson:
      "Genesis 12 teaches that obedience starts with God's word, not a complete map. Abram follows, stumbles, and is preserved by grace, showing that the life of faith is both real obedience and real formation.",
  },
  {
    chapter: 13,
    title: "ðŸ¤ Genesis 13 â€” Faith That Does Not Have To Grab",
    intro:
      "Genesis 13 brings Abram back from Egypt and places him in a quieter but very real test. Blessing has grown, space is limited, and conflict is rising. This chapter shows whether Abram believes God's promise enough to choose peace instead of grasping.",
    flow: ["Abram returns to the place of worship.", "Conflict rises between Abram and Lot's households.", "Lot chooses by sight while Abram receives the renewed promise."],
    sections: [
      {
        reference: "Genesis 13:1-7",
        title: "ðŸª¨ Returning to the altar",
        points: [
          "Abram comes back to the place where he had built an altar. That detail matters after Egypt. The story quietly brings him back to worship, back to the place of calling, back to dependence on God.",
          "But blessing creates pressure. Abram and Lot both have possessions, herds, and households. The land cannot carry them together easily. Sometimes the test is not lack. Sometimes the test is what blessing does to relationships.",
          "Strife between the herdsmen shows that outward prosperity does not automatically create inward peace. Wisdom is needed to steward blessing without letting it turn into division.",
        ],
      },
      {
        reference: "Genesis 13:8-13",
        title: "ðŸ‘€ Lot chooses by sight",
        points: [
          "Abram gives Lot the first choice. This is beautiful because Abram is the elder and the one who received the promise, yet he refuses to force his advantage.",
          "Lot lifts his eyes and sees the well-watered plain. The land looks like Eden and Egypt. That comparison is not accidental. Lot is drawn by what looks immediately profitable, but the text warns us that Sodom is spiritually dangerous.",
          "This is how many bad paths begin. They look practical, beautiful, and obvious. But wisdom asks a deeper question: where is this direction taking my soul?",
        ],
      },
      {
        reference: "Genesis 13:14-18",
        title: "ðŸ“œ Promise after surrender",
        points: [
          "After Lot separates, God tells Abram to lift his eyes. Lot lifted his eyes to choose for himself. Abram lifts his eyes because God is showing him promise.",
          "God expands the promise in every direction. Abram gave up the right to grab, but he did not lose the future. Faith can be generous because it trusts God to provide what selfishness cannot secure.",
          "Abram responds by moving and building another altar. The chapter ends with worship because surrender has not made him poorer. It has made his dependence clearer.",
        ],
      },
    ],
    lesson:
      "Genesis 13 teaches that faith does not have to grab. Abram can choose peace because he trusts that God's promise is safer than selfish control.",
  },
  {
    chapter: 14,
    title: "âš”ï¸ Genesis 14 â€” Courage Under God Most High",
    intro:
      "Genesis 14 feels different from the chapters around it. Kings go to war, Lot is captured, and Abram acts with courage. But the chapter is not only about battle. It is about rescue, worship, and refusing to let anyone but God define Abram's blessing.",
    flow: ["War reaches Lot's life near Sodom.", "Abram rescues Lot with courage.", "Melchizedek blesses Abram, and Abram refuses Sodom's reward."],
    sections: [
      {
        reference: "Genesis 14:1-12",
        title: "ðŸŒƒ Lot's direction creates danger",
        points: [
          "Lot had moved toward Sodom in Genesis 13. Now the consequences of that direction begin to show. He is swept into a conflict larger than himself.",
          "This is one of Proverbs' themes before Proverbs is ever written: paths matter. Where Lot chose to settle shaped the dangers that reached his household.",
          "The chapter reminds us that decisions are rarely isolated. A place, a friendship, a pattern, or a compromise can quietly position a person near trouble before the crisis appears.",
        ],
      },
      {
        reference: "Genesis 14:13-16",
        title: "ðŸ›¡ï¸ Abram acts to rescue",
        points: [
          "Abram does not shrug and say Lot made his choice. He gathers trained men and moves to rescue him. Faith is not passive when love requires action.",
          "This shows a strong side of Abram. He is not merely a pilgrim building altars. He is also responsible, brave, and willing to risk himself for family.",
          "Obedience can look like leaving, waiting, surrendering, or fighting for what is right. The faithful life is responsive to God in the moment in front of it.",
        ],
      },
      {
        reference: "Genesis 14:17-24",
        title: "ðŸ™Œ Victory stays under worship",
        points: [
          "Melchizedek appears as priest of God Most High and blesses Abram. Abram gives him a tenth, recognizing that victory belongs under God's authority.",
          "Then Abram refuses the king of Sodom's offer. He does not want Sodom to say, \"I made Abram rich.\" That refusal protects the clarity of his testimony.",
          "This is wisdom after success. Victory can become dangerous if it feeds pride or compromise. Abram receives blessing from God Most High and refuses gain that would tie his future to Sodom.",
        ],
      },
    ],
    lesson:
      "Genesis 14 teaches that courage must stay under worship. Abram rescues boldly, worships humbly, and refuses compromise after victory.",
  },
  {
    chapter: 15,
    title: "ðŸŒŒ Genesis 15 â€” Believing God In The Waiting",
    intro:
      "Genesis 15 brings us inside Abram's heart. He has obeyed, fought, worshiped, and refused compromise, but he still has no son. This chapter shows faith not as fake confidence, but as honest trust placed in God's word.",
    flow: ["God comforts Abram's fear.", "Abram names the ache of delay.", "God gives stars, righteousness, covenant, and future hope."],
    sections: [
      {
        reference: "Genesis 15:1-6",
        title: "ðŸ›¡ï¸ Do not fear",
        points: [
          "God begins with comfort: \"Fear not.\" That tells us Abram's courage in chapter 14 did not erase every fear inside him. Brave people can still need reassurance.",
          "Abram answers honestly. He has no child. The promise of descendants is beautiful, but his house still feels empty. Biblical faith has room to bring that ache before God.",
          "God brings him outside and points to the stars. Abram believes the Lord, and it is counted to him as righteousness. He is not righteous because he has seen the fulfillment. He is counted righteous because he trusts the God who speaks.",
        ],
      },
      {
        reference: "Genesis 15:7-16",
        title: "ðŸ“œ Promise with a long timeline",
        points: [
          "God promises land, but He also reveals that Abram's descendants will suffer in a foreign land before deliverance. This is a wide view of history.",
          "That means God's promise does not avoid all pain. The promise is not shallow. It moves through time, suffering, judgment, deliverance, and return.",
          "Abram is learning that faith may outlive his own ability to see everything completed. Some promises are bigger than one lifetime, but they are not bigger than God's faithfulness.",
        ],
      },
      {
        reference: "Genesis 15:17-21",
        title: "ðŸ”¥ God binds Himself to the promise",
        points: [
          "The covenant ceremony is powerful because God passes through as smoking fire and flame. Abram is not the one walking through to prove he can hold everything together.",
          "God takes the weight of the promise upon Himself. The future rests on divine commitment, not human strength.",
          "This is why Genesis 15 is so central. Faith is not confidence in our own ability to make God's promise happen. Faith trusts the God who binds Himself to His word.",
        ],
      },
    ],
    lesson:
      "Genesis 15 teaches that faith believes God in the waiting. Abram still has questions, but God's promise becomes the ground beneath him.",
  },
  {
    chapter: 16,
    title: "âš ï¸ Genesis 16 â€” When Waiting Turns Into Control",
    intro:
      "Genesis 16 is one of the most painful chapters in Abraham's story because delay becomes pressure and pressure becomes human control. The chapter is honest about how impatience can harm real people.",
    flow: ["Sarai and Abram try to force the promise.", "Hagar suffers inside the household conflict.", "God sees Hagar in the wilderness."],
    sections: [
      {
        reference: "Genesis 16:1-6",
        title: "â³ A shortcut that wounds",
        points: [
          "Sarai's pain is real. She is barren, the promise is delayed, and the years are heavy. But pain does not make every plan wise.",
          "Abram listens and takes Hagar. The result is not peace but contempt, jealousy, blame, and harsh treatment. A human shortcut creates a household wound.",
          "This chapter warns us that trying to help God in ways God did not command can produce consequences that last far longer than the moment of impatience.",
        ],
      },
      {
        reference: "Genesis 16:7-12",
        title: "ðŸ‘ï¸ God sees the mistreated",
        points: [
          "Hagar runs into the wilderness, and the Angel of the Lord finds her. That word matters. People may overlook her, use her, or mistreat her, but God sees her.",
          "God speaks to Hagar personally about her child and her future. She is not a disposable side character to Him.",
          "The chapter refuses to let us talk about Abraham's faith without also seeing the pain caused by Abraham's failure. God cares about the people wounded by someone else's impatience.",
        ],
      },
      {
        reference: "Genesis 16:13-16",
        title: "ðŸœï¸ The God who sees",
        points: [
          "Hagar names God, \"You are the God who sees me.\" This is one of the most tender moments in Genesis.",
          "The promise to Abraham is still moving, but Genesis makes space to show God's mercy toward Hagar and Ishmael too.",
          "This chapter teaches a serious lesson: waiting is spiritually dangerous when the heart stops trusting. But even in the damage, God remains compassionate and attentive.",
        ],
      },
    ],
    lesson:
      "Genesis 16 teaches that forced promises create real wounds, but God sees the wounded. Waiting must be guarded with trust, not control.",
  },
  {
    chapter: 17,
    title: "ðŸªª Genesis 17 â€” New Names And Covenant Identity",
    intro:
      "Genesis 17 gives Abram and Sarai new names. God is not only promising a future; He is naming them according to that future while the evidence still looks impossible.",
    flow: ["God reveals Himself as Almighty.", "Abram becomes Abraham and Sarai becomes Sarah.", "Circumcision marks the covenant, and Isaac is promised."],
    sections: [
      {
        reference: "Genesis 17:1-8",
        title: "ðŸ™‡ Walk before Me",
        points: [
          "God introduces Himself as God Almighty and calls Abram to walk before Him. Covenant is not just receiving promises. It is living before God with a whole life.",
          "Abram falls on his face. That posture fits the moment. God is speaking identity, nations, kings, land, and everlasting covenant over a man who still cannot produce the promised son.",
          "Abram becomes Abraham, father of many nations. The name is a daily sermon before the child arrives. Every time someone says his name, they are speaking God's promise over visible impossibility.",
        ],
      },
      {
        reference: "Genesis 17:9-14",
        title: "ðŸ“œ A covenant marked in the body",
        points: [
          "Circumcision marks the covenant physically. This is not casual spirituality. God is placing covenant identity on Abraham's household in a visible and costly way.",
          "The sign does not create the promise, but it marks belonging to the promise. Abraham's family is being set apart.",
          "This teaches that faith is not merely an idea in the mind. Covenant touches identity, household, obedience, and the way life is carried forward.",
        ],
      },
      {
        reference: "Genesis 17:15-27",
        title: "ðŸ˜‚ Promise that sounds impossible",
        points: [
          "Sarai becomes Sarah, and God says she will bear Isaac. Abraham laughs because the promise feels biologically impossible.",
          "God does not cancel the promise because Abraham struggles to grasp it. He names Isaac and fixes the time. The promise rests on God's power, not Abraham's imagination.",
          "Abraham obeys the covenant sign that same day. That matters. Even while he is still trying to understand the impossible promise, he responds to the command he has been given.",
        ],
      },
    ],
    lesson:
      "Genesis 17 teaches that God names His people according to promise before they can see the outcome. Covenant identity is received, marked, and obeyed.",
  },
  {
    chapter: 18,
    title: "ðŸ•ï¸ Genesis 18 â€” Near Enough To Hear And Pray",
    intro:
      "Genesis 18 shows Abraham in closeness with God. He welcomes visitors, hears the promise of Isaac again, and then stands before the Lord in bold intercession for Sodom.",
    flow: ["Abraham receives divine visitors.", "Sarah hears the impossible promise.", "Abraham intercedes for Sodom."],
    sections: [
      {
        reference: "Genesis 18:1-8",
        title: "ðŸ¤² Hospitality as holy attention",
        points: [
          "Abraham runs to welcome the visitors. The chapter moves with urgency, honor, food, water, and rest. This is not cold religion. It is a life ready to receive what God is doing.",
          "Hospitality in Scripture is often more than manners. It is openness, humility, and attention to the person in front of you.",
          "Abraham's tent becomes a place where promise is spoken again. Ordinary welcome becomes the setting for divine conversation.",
        ],
      },
      {
        reference: "Genesis 18:9-15",
        title: "â“ Is anything too hard for the Lord?",
        points: [
          "Sarah laughs inside the tent. Her laughter is quiet, but God hears it. Hidden reactions are not hidden from Him.",
          "The question, \"Is anything too hard for the Lord?\" is the heart of the chapter. It confronts the limits Sarah has placed around possibility.",
          "This does not shame Sarah as if waiting has been easy. It calls her to see that God's promise is not trapped inside human timelines or human biology.",
        ],
      },
      {
        reference: "Genesis 18:16-33",
        title: "ðŸ™ Reverent boldness",
        points: [
          "God lets Abraham into the conversation about Sodom. That is astonishing. Abraham is being treated as a covenant friend, not merely a servant receiving orders.",
          "Abraham pleads with humility and courage. He cares about justice, mercy, and the righteous caught in a wicked place.",
          "This is prayer shaped by nearness. Abraham does not command God, but he does draw near and speak. Real friendship with God deepens reverence and boldness at the same time.",
        ],
      },
    ],
    lesson:
      "Genesis 18 teaches that obedience matures into closeness. Abraham's walk with God includes welcome, honest promise, and bold intercession.",
  },
  {
    chapter: 19,
    title: "ðŸ”¥ Genesis 19 â€” Mercy Pulling People From Judgment",
    intro:
      "Genesis 19 is heavy. It shows Sodom's wickedness, Lot's compromised position, God's mercy, and the serious reality of judgment. It sits near Abraham's story as a warning about direction and holiness.",
    flow: ["The angels enter Sodom.", "Lot is rescued by mercy.", "The chapter ends with painful consequences."],
    sections: [
      {
        reference: "Genesis 19:1-11",
        title: "ðŸŒƒ A city showing its heart",
        points: [
          "The wickedness of Sodom is not vague in this chapter. The city reveals a violent, predatory heart, and Lot's home becomes the pressure point.",
          "Lot is called righteous elsewhere in Scripture, but Genesis shows him deeply entangled in a dangerous place. Sitting in the gate suggests belonging and influence, yet he cannot heal the city.",
          "This warns us that proximity to corruption can reshape a household long before a person admits it. Lot is distressed, but also settled.",
        ],
      },
      {
        reference: "Genesis 19:12-22",
        title: "ðŸ¤² Mercy that drags the hesitant",
        points: [
          "Lot warns his family, but his sons-in-law think he is joking. That is tragic. A compromised witness can make urgent truth sound unbelievable.",
          "Lot lingers even as judgment approaches. The angels seize him and his family by the hand because the Lord is merciful.",
          "That detail is powerful. Sometimes mercy does not feel gentle in the moment. Sometimes mercy pulls us away from what we are still too attached to.",
        ],
      },
      {
        reference: "Genesis 19:23-38",
        title: "ðŸ’” Rescue does not erase damage",
        points: [
          "Sodom falls. Lot's wife looks back and becomes a warning. The chapter wants us to feel the seriousness of divided affection.",
          "The ending with Lot's daughters is disturbing and sad. It shows that leaving Sodom physically did not mean Sodom's damage had fully left the family.",
          "Genesis 19 is not written for easy reading. It teaches that compromise has consequences, judgment is real, and mercy should never be treated lightly.",
        ],
      },
    ],
    lesson:
      "Genesis 19 teaches that God's mercy is real and God's holiness is serious. The direction of a life matters before the crisis arrives.",
  },
  {
    chapter: 20,
    title: "ðŸ” Genesis 20 â€” The Fear That Came Back",
    intro:
      "Genesis 20 is sobering because Abraham repeats an old failure. After years of walking with God, receiving covenant, and interceding for Sodom, fear still bends his behavior.",
    flow: ["Abraham repeats the sister lie.", "God protects Sarah through a dream.", "Abraham is corrected and restored."],
    sections: [
      {
        reference: "Genesis 20:1-7",
        title: "ðŸ˜Ÿ Old fear in a new place",
        points: [
          "Abraham says Sarah is his sister again. The pattern from Egypt returns, showing that old fears can survive many spiritual experiences if they are not deeply healed.",
          "Abimelech takes Sarah, but God intervenes in a dream. Once again, God protects the promise from Abraham's fear-driven failure.",
          "The seriousness is clear. Abraham's self-protection puts Sarah, Abimelech, and an entire household at risk. Private fear can create public damage.",
        ],
      },
      {
        reference: "Genesis 20:8-13",
        title: "ðŸªž A painful explanation",
        points: [
          "Abraham explains that he thought there was no fear of God in the place. The irony is sharp because Abimelech acts with more integrity in the moment than Abraham does.",
          "Abraham's explanation reveals a settled strategy of fear. This was not a one-time panic. It was a plan he and Sarah had carried from place to place.",
          "That is how hidden patterns often work. They travel with us until God brings them into the light.",
        ],
      },
      {
        reference: "Genesis 20:14-18",
        title: "ðŸ©¹ Grace that corrects",
        points: [
          "Abimelech restores Sarah and gives gifts, and Abraham prays for his household. The chapter ends with healing, but it does not pretend the failure was small.",
          "God's grace protects the promise and corrects Abraham at the same time. Grace is not permission to stay careless. It is mercy that keeps forming the person God called.",
          "This chapter gives hope to people who see old fears resurface. The point is not to hide them. The point is to let God expose, heal, and mature them.",
        ],
      },
    ],
    lesson:
      "Genesis 20 teaches that old fear can return, but God's faithfulness can still correct and preserve. Abraham needs grace as much as he needs promise.",
  },
  {
    chapter: 21,
    title: "ðŸ‘¶ Genesis 21 â€” Promise In The Arms",
    intro:
      "Genesis 21 finally places Isaac in Abraham and Sarah's arms. The promise becomes visible, laughter changes tone, and the story proves that delay was never denial.",
    flow: ["Isaac is born just as God said.", "Hagar and Ishmael are sent away but not abandoned by God.", "Abraham worships the everlasting God."],
    sections: [
      {
        reference: "Genesis 21:1-7",
        title: "ðŸ˜‚ Laughter turned to joy",
        points: [
          "The repeated phrase is that God did as He had spoken. That is the foundation of the scene. Isaac's birth is not luck, biology, or human achievement. It is promise fulfilled.",
          "Sarah laughs again, but now the laughter is joy. The very place of disbelief becomes a place of praise.",
          "This moment carries decades of waiting. Genesis wants us to feel that God's word can look delayed for a long time and still arrive exactly alive.",
        ],
      },
      {
        reference: "Genesis 21:8-21",
        title: "ðŸ’” Fulfillment with complicated pain",
        points: [
          "The celebration around Isaac does not erase the pain connected to Hagar and Ishmael. Earlier compromise has consequences that now have to be faced.",
          "Hagar is sent away, and the scene in the wilderness is heartbreaking. Yet God hears the boy and opens Hagar's eyes to water.",
          "This teaches that God's covenant focus on Isaac does not mean God is careless with others. He sees Hagar again. He hears Ishmael. Mercy is still present in the painful edges of the promise story.",
        ],
      },
      {
        reference: "Genesis 21:22-34",
        title: "ðŸŒ³ Calling on the everlasting God",
        points: [
          "Abraham makes peace with Abimelech and plants a tree at Beersheba. The chapter ends with stability, worship, and the name of the Everlasting God.",
          "That name matters after a chapter about long waiting. Abraham has learned that God's timeline is larger than his own impatience.",
          "Isaac is born, but the story is still moving. Abraham worships the God whose faithfulness stretches beyond one moment of fulfillment.",
        ],
      },
    ],
    lesson:
      "Genesis 21 teaches that God keeps His word in His time. The promise arrives with joy, and God's mercy is still present in the complicated aftermath.",
  },
  {
    chapter: 22,
    title: "â›°ï¸ Genesis 22 â€” The Promise On The Altar",
    intro:
      "Genesis 22 is the deepest test in Abraham's life. Isaac is not only Abraham's beloved son; he is the visible future of the promise. God asks Abraham to surrender the gift back to the Giver.",
    flow: ["God tests Abraham.", "Abraham walks the long road of surrender.", "God provides the ram and renews the promise."],
    sections: [
      {
        reference: "Genesis 22:1-8",
        title: "ðŸªµ The long walk",
        points: [
          "The chapter names Isaac with emotional weight: your son, your only son, whom you love. The test is not abstract. God names what Abraham treasures most.",
          "Abraham rises early. That does not mean the command was easy. It means his obedience is serious enough to move even when the emotional weight is crushing.",
          "Isaac asks, \"Where is the lamb?\" Abraham answers, \"God will provide.\" That sentence holds the chapter together. Abraham does not understand everything, but he trusts the Provider.",
        ],
      },
      {
        reference: "Genesis 22:9-14",
        title: "ðŸ Provision at the point of surrender",
        points: [
          "The altar scene is tense because obedience has reached the edge. Abraham stretches out his hand, and then God stops him.",
          "The ram appears in the thicket. God provides the sacrifice. Isaac is spared, and Abraham names the place, \"The Lord will provide.\"",
          "This is not about God needing information. It is about Abraham's faith being revealed, tested, and deepened. The promise is safer in God's hands than in Abraham's control.",
        ],
      },
      {
        reference: "Genesis 22:15-24",
        title: "ðŸ“œ Promise after surrender",
        points: [
          "After the test, God reaffirms the blessing. Abraham's surrender did not destroy the promise. It clarified that the promise belongs to God.",
          "This chapter also points forward. The beloved son, the wood, the mountain, and the substitute all prepare the reader to recognize deeper patterns of sacrifice and provision in Scripture.",
          "Genesis 22 teaches that the hardest obedience is often about whether we trust God with what we love most.",
        ],
      },
    ],
    lesson:
      "Genesis 22 teaches that true faith can place even the promise on the altar because it trusts the Provider more than the gift.",
  },
  {
    chapter: 23,
    title: "ðŸª¦ Genesis 23 â€” Grief Inside The Promise",
    intro:
      "Genesis 23 slows the story down. Sarah dies, Abraham mourns, and the first clear piece of land he owns in Canaan is a burial place. The chapter is quiet, but it is deeply important.",
    flow: ["Sarah dies and Abraham mourns.", "Abraham buys Machpelah honorably.", "Sarah is buried in the land of promise."],
    sections: [
      {
        reference: "Genesis 23:1-2",
        title: "ðŸ˜­ Faith still weeps",
        points: [
          "The Bible says Abraham came to mourn and weep for Sarah. It does not rush past his grief because he is a man of faith.",
          "That matters. Faith does not make a person less human. Abraham has walked with God for years, but death still hurts.",
          "Genesis gives dignity to sorrow. Promise and grief can exist in the same room.",
        ],
      },
      {
        reference: "Genesis 23:3-16",
        title: "âš–ï¸ Honorable dealings",
        points: [
          "Abraham negotiates publicly and respectfully for the cave of Machpelah. He refuses to take the land as a vague favor and insists on paying the full price.",
          "This shows integrity. Abraham's faith affects how he handles business, grief, and public reputation.",
          "He is still a stranger in the land, but he acts with dignity because he trusts God's promise without becoming manipulative.",
        ],
      },
      {
        reference: "Genesis 23:17-20",
        title: "ðŸ“ A grave in the promised land",
        points: [
          "The first owned piece of the promised land is not a palace, field, or city. It is a tomb.",
          "That is emotionally powerful. Abraham owns a burial place before he sees the land filled with descendants.",
          "Faith sometimes plants hope in the soil of grief. Sarah's burial in Canaan says the family still belongs to the promise, even in death.",
        ],
      },
    ],
    lesson:
      "Genesis 23 teaches that faith does not deny grief. Abraham mourns honestly while anchoring his family in the promise God gave.",
  },
  {
    chapter: 24,
    title: "ðŸ’§ Genesis 24 â€” Guidance For The Promise",
    intro:
      "Genesis 24 turns toward the next generation. Abraham is old, Isaac needs a wife, and the promise must continue without Isaac being pulled back to the old life.",
    flow: ["Abraham sends his servant with covenant priorities.", "The servant prays and watches for God's guidance.", "Rebekah responds, and Isaac's future is established."],
    sections: [
      {
        reference: "Genesis 24:1-9",
        title: "ðŸ§­ The next generation must not go backward",
        points: [
          "Abraham is clear that Isaac must not return to the land Abraham left. The promise is tied to God's direction, not nostalgia.",
          "This is mature faith. Abraham is thinking beyond his own lifetime and protecting Isaac's future direction.",
          "Obedience becomes legacy when a person cares about the spiritual path of those who come after them.",
        ],
      },
      {
        reference: "Genesis 24:10-27",
        title: "ðŸ™ Prayer beside the well",
        points: [
          "The servant prays specifically and humbly. He is not trying to control God; he is asking for guidance that matches covenant kindness.",
          "Rebekah's response reveals character. She offers water not only to the servant but also to the camels, showing generosity, strength, and hospitality.",
          "The servant worships before the mission is even fully finished. Guidance should lead to worship, not self-congratulation.",
        ],
      },
      {
        reference: "Genesis 24:28-67",
        title: "ðŸ’ A willing step into the promise",
        points: [
          "The story is retold in the household because testimony matters. The servant explains how God led him.",
          "Rebekah is asked whether she will go, and she says yes. Her willingness echoes Abraham's earlier obedience in a new generation.",
          "Isaac receives Rebekah, and the promise story moves forward. Genesis 24 is long because guidance, character, family, and covenant all matter deeply.",
        ],
      },
    ],
    lesson:
      "Genesis 24 teaches that God's promise continues through prayerful guidance, wise priorities, and willing obedience in the next generation.",
  },
  {
    chapter: 25,
    title: "ðŸŒ… Genesis 25 â€” Full Of Years",
    intro:
      "Genesis 25 closes Abraham's earthly story. He dies old and full of years, but the promise does not die with him. The chapter moves from Abraham's final family lines into Isaac's generation.",
    flow: ["Abraham's later descendants are named.", "Abraham dies and is buried by Isaac and Ishmael.", "The story turns toward Jacob and Esau."],
    sections: [
      {
        reference: "Genesis 25:1-11",
        title: "ðŸ•Šï¸ A life completed, not a promise completed",
        points: [
          "Abraham has more descendants through Keturah, but Isaac remains the covenant son. Genesis is careful to distinguish family expansion from covenant line.",
          "Abraham dies at a good old age, full of years. That phrase carries a sense of completion. His life was not perfect, but it was deeply lived before God.",
          "Isaac and Ishmael bury him together. That moment is quiet and moving. The family story has pain, but Abraham's death gathers both sons at the cave of Machpelah.",
        ],
      },
      {
        reference: "Genesis 25:12-18",
        title: "ðŸ“œ God remembers Ishmael",
        points: [
          "Ishmael's line is recorded. This matters because God had promised Hagar and Abraham that Ishmael would become a great nation.",
          "The covenant line goes through Isaac, but Scripture still pauses to show that God kept His word concerning Ishmael.",
          "This teaches us to read God's faithfulness carefully. His chosen covenant purpose does not make Him forget other promises He has spoken.",
        ],
      },
      {
        reference: "Genesis 25:19-34",
        title: "ðŸŒ± The next generation begins with tension",
        points: [
          "Isaac and Rebekah face barrenness, and Isaac prays. The next generation immediately learns that promise still requires dependence.",
          "Jacob and Esau struggle even before birth. The story of promise continues, but it is not simple or tidy.",
          "Abraham's life closes, but Genesis keeps moving. Faithfulness is bigger than one person's lifespan. The God who called Abraham is still guiding the story.",
        ],
      },
    ],
    lesson:
      "Genesis 25 teaches that a life of faith can end while God's promise keeps moving. Abraham is gone, but God's covenant faithfulness continues.",
  },
];

function renderNote(note: AbrahamChapterNote) {
  return `${note.title}

${note.intro}

ðŸ“ The Chapter Flow

${note.flow.map((item) => `* ${item}`).join("\n\n")}

${note.sections
  .map(
    (section) => `${section.reference}

## ${section.title}

${section.points.join("\n\n")}`,
  )
  .join("\n\n")}

ðŸ’¡ The Big Lesson of Genesis ${note.chapter}

${note.lesson}`;
}

const chapterSpecificFocus: Record<number, string[]> = {
  11: [
    "Genesis 11 is not a random preface. It shows the world Abraham is called out of: a world still wounded after the flood, still proud, still trying to secure itself without trusting God.",
    "Babel and Abraham are deliberately placed beside each other. Babel says, 'Let us make us a name.' Genesis 12 will answer with God saying He will make Abram's name great. One is human self-exaltation. The other is received blessing.",
    "Sarai's barrenness is named before Abram's call because the promise will land directly on the most painful impossibility in the family.",
  ],
  12: [
    "Genesis 12 is the beginning of the Abrahamic covenant in living motion: land, nation, blessing, name, and blessing for all families of the earth.",
    "Abram obeys before he has a map. That is why the chapter matters so deeply. Biblical faith begins with God's word becoming weightier than visible certainty.",
    "The same chapter that shows obedience also shows fear. Abram leaves by faith, then lies in Egypt to protect himself. Genesis lets both truths stand.",
  ],
  13: [
    "Genesis 13 tests Abram through prosperity. The pressure is not famine this time. It is land conflict, household growth, and the temptation to grasp.",
    "Lot chooses by sight. Abram chooses peace and receives the promise again. That contrast teaches readers how faith looks when someone else gets first pick.",
    "The geography matters: the Jordan Valley looks like Eden and Egypt, but it sits near Sodom. Beauty and spiritual danger can occupy the same horizon.",
  ],
  14: [
    "Genesis 14 pulls Abram into the world of kings, alliances, raids, and rescue. Faith is not sheltered from politics or violence.",
    "Abram becomes a rescuer. He does not abandon Lot to the consequences of his choices. Covenant responsibility becomes active love.",
    "Melchizedek reframes the victory. Abram's success belongs under God Most High, not under Sodom's reward system.",
  ],
  15: [
    "Genesis 15 is one of the deepest covenant chapters in Scripture. Abram brings the ache of childlessness to God, and God answers with stars, righteousness, covenant, and a future larger than one lifetime.",
    "Genesis 15:6 becomes central to Romans, Galatians, and the New Testament doctrine of faith. Abram is counted righteous before circumcision and before Isaac is born.",
    "The covenant cutting ritual shows God taking the weight of the promise upon Himself. Abram does not walk through the pieces. God passes through as fire and smoke.",
  ],
  16: [
    "Genesis 16 is what happens when waiting becomes control. Sarai's grief is real, but the shortcut wounds Hagar, Abram, Sarai, and the household future.",
    "Hagar is not a side character to God. She is an Egyptian servant woman in the wilderness, and the Lord finds her there.",
    "The name El Roi, the God who sees me, makes this chapter one of the most tender moments in Genesis.",
  ],
  17: [
    "Genesis 17 turns promise into marked covenant identity. Abram and Sarai receive new names, and circumcision becomes the sign of belonging to the covenant family.",
    "The body becomes part of the promise. Circumcision teaches that covenant is not merely an idea Abraham believes. It is a life he and his household carry.",
    "Isaac is named before he exists. Abraham laughs, but God's promise stands.",
  ],
  18: [
    "Genesis 18 shows covenant friendship. Abraham receives divine visitors, Sarah hears the promise again, and Abraham is drawn into intercession.",
    "Hospitality is not background decoration. In Abraham's world, receiving travelers involved honor, protection, service, and generosity.",
    "The chapter asks the question that hovers over all delayed promises: Is any thing too hard for the LORD?",
  ],
  19: [
    "Genesis 19 is dark because it shows the end of Lot's compromise with Sodom. The city he moved toward now becomes a place of danger and judgment.",
    "The chapter must be read with Genesis 18 in mind. Abraham interceded. God judged. God also rescued Lot by mercy.",
    "Lot's wife, Lot's hesitation, and Lot's daughters all show that rescue from a place does not automatically remove the damage that place has done.",
  ],
  20: [
    "Genesis 20 is painful because Abraham repeats an old failure. The man of faith still has a fear pattern that can endanger Sarah.",
    "Abimelech, a foreign king, shows more integrity in the moment than Abraham does. Genesis is honest enough to let the covenant man be corrected by an outsider.",
    "God protects Sarah because Isaac's birth is near. The promise rests on God's faithfulness, not Abraham's flawless conduct.",
  ],
  21: [
    "Genesis 21 is the long-awaited birth chapter. Isaac is born because the Lord did as He had spoken.",
    "Sarah's laughter changes from disbelief to joy, but the household still carries pain from Genesis 16.",
    "Hagar and Ishmael are sent away, yet God hears the boy in the wilderness. The covenant line is through Isaac, but God's compassion is not narrow.",
  ],
  22: [
    "Genesis 22 is the great test. Abraham is asked to place Isaac, the visible future of the covenant, back into God's hands.",
    "The emotional pacing is deliberate: take thy son, thine only son Isaac, whom thou lovest. The text makes the reader feel the cost.",
    "The ram caught in the thicket is not a random rescue. It is substitutionary provision at the point of surrender.",
  ],
  23: [
    "Genesis 23 shows faith grieving. Sarah dies, Abraham mourns, and the first piece of land he owns in Canaan is a tomb.",
    "The cave of Machpelah matters because burial is covenant geography. Abraham is anchoring his family in the promised land even in death.",
    "Faith does not deny grief. Abraham weeps, negotiates, pays, buries, and still believes.",
  ],
  24: [
    "Genesis 24 is long because covenant continuation matters. Isaac needs a wife, but the promise must not be pulled backward into the old land.",
    "The servant's prayer at the well shows providence through ordinary timing, character, and hospitality.",
    "Rebekah's willingness echoes Abraham's call. She leaves family and homeland to step into a promise she cannot fully see.",
  ],
  25: [
    "Genesis 25 closes Abraham's life but not God's covenant. Abraham dies full of years, and the story moves to Isaac, Ishmael's descendants, Jacob, and Esau.",
    "The chapter teaches readers to distinguish family expansion from covenant line. Abraham has other descendants, but Isaac carries the particular promise.",
    "The Jacob and Esau birth narrative shows the next generation beginning with prayer, barrenness, struggle, and birthright tension.",
  ],
};

const chapterKjvWords: Record<number, string[]> = {
  11: ["begat", "generations", "barren", "confound", "kindred"],
  12: ["kindred", "sojourn", "seed", "altar", "famine"],
  13: ["substance", "herdsmen", "plain", "pitch his tent", "sojourn"],
  14: ["confederate", "slaughter", "tithes", "God Most High", "possessor"],
  15: ["seed", "heifer", "covenant", "iniquity", "sojourner"],
  16: ["bondwoman", "concubine", "afflicted", "flee", "Ishmael"],
  17: ["covenant", "circumcision", "Almighty", "everlasting", "nations"],
  18: ["tent door", "laugh", "peradventure", "righteous", "Judge"],
  19: ["gate", "linger", "brimstone", "pillar of salt", "overthrow"],
  20: ["integrity", "prophet", "reproved", "covering of the eyes", "restore"],
  21: ["visited", "weaned", "mocking", "bondwoman", "Everlasting God"],
  22: ["tempt", "only son", "burnt offering", "thicket", "Jehovah-jireh"],
  23: ["sojourner", "sepulchre", "possession", "Machpelah", "weigh"],
  24: ["oath", "damsel", "kindred", "camels", "providence"],
  25: ["concubines", "generations", "birthright", "lentiles", "full of years"],
};

function explainKjvWord(word: string, chapter: number) {
  const explanations: Record<string, string> = {
    begat: "Begat means fathered or became the ancestor of. In Genesis, genealogies are not filler; they preserve the line through which God's purposes move.",
    generations: "Generations often reflects the Hebrew idea of toledot, a family record or story section. Genesis uses it to move from one major family line to the next.",
    barren: "Barren means unable to bear children. For Sarai, this is emotional grief, social vulnerability, and a direct obstacle to the promise of seed.",
    confound: "Confound means confuse or mix up. At Babel, God confuses language to stop human pride from hardening into unified rebellion.",
    kindred: "Kindred means extended family or relatives. Leaving kindred meant leaving identity, protection, inheritance, and the familiar world of household gods.",
    sojourn: "Sojourn means to live as a resident foreigner. Abraham lives in the promised land before he possesses it, which makes his whole life a lesson in promise before fulfillment.",
    seed: "Seed means offspring or descendants. In Abraham's story it points to Isaac, to the covenant family, and ultimately to the larger redemptive line Scripture follows.",
    altar: "An altar is a place of sacrifice and worship. Abraham's altars mark moments where God's promise is met with public trust.",
    famine: "Famine means severe food shortage. In Genesis 12, famine tests Abram immediately after obedience, showing that faith does not remove pressure.",
    substance: "Substance means possessions, wealth, livestock, and household resources. Abram and Lot's blessing becomes so large that it creates relational pressure.",
    herdsmen: "Herdsmen were workers responsible for livestock. Their conflict shows that family tension often appears first through ordinary household logistics.",
    plain: "Plain means a broad valley or lowland. Lot chooses the Jordan plain because it looks fertile, but the text warns that it is spiritually dangerous.",
    "pitch his tent": "To pitch a tent means to settle temporarily. Lot pitching toward Sodom shows gradual movement toward compromise.",
    confederate: "Confederate means allied or joined by agreement. Abram is not isolated; he has regional relationships and responsibilities.",
    slaughter: "Slaughter here refers to the defeat of the kings in battle. Genesis 14 places Abram in a real world of warfare and rescue.",
    tithes: "Tithes means a tenth. Abram gives Melchizedek a tenth as an act of worship and recognition that victory belongs to God.",
    "God Most High": "God Most High reflects El Elyon, a title emphasizing God's authority over every king, territory, and battle.",
    possessor: "Possessor of heaven and earth means God owns and rules all creation. Abram's future is not in Sodom's hands.",
    heifer: "A heifer is a young female cow used in sacrifice. In Genesis 15, the animals belong to a solemn covenant-cutting ceremony.",
    covenant: "Covenant means a binding relationship established by solemn promise. Genesis 15 shows God binding Himself to Abram's future.",
    iniquity: "Iniquity means moral guilt or crookedness. The Amorites' iniquity not being full shows God's judgment is patient, measured, and just.",
    sojourner: "Sojourner means resident foreigner. God tells Abram his descendants will sojourn and suffer before deliverance.",
    bondwoman: "Bondwoman means female servant or enslaved woman. Hagar has little power, which makes God's attention to her especially tender.",
    concubine: "Concubine or secondary wife refers to a woman joined to a man with lower household status than the primary wife. The term exposes household hierarchy and vulnerability.",
    afflicted: "Afflicted means treated harshly or oppressed. Sarai's pain becomes Hagar's suffering.",
    flee: "Flee means run away. Hagar's flight into the wilderness shows the household has become unbearable.",
    Ishmael: "Ishmael means God hears. His name is a living reminder that God heard Hagar's affliction.",
    circumcision: "Circumcision is the cutting away of the foreskin as the covenant sign for Abraham's male descendants. The sign marks covenant identity in the body.",
    Almighty: "Almighty reflects El Shaddai, a divine name emphasizing God's power to do what human bodies and plans cannot.",
    everlasting: "Everlasting means enduring through generations. God's covenant reaches beyond Abraham's own lifetime.",
    nations: "Nations points beyond one household. Abraham's family will become a people, and through his line blessing will reach the world.",
    "tent door": "The tent door is the entrance to the family dwelling. Sarah hears the promise from inside the ordinary domestic world where the miracle will happen.",
    laugh: "Laughter in Abraham's story can express disbelief, shock, and later joy. Isaac's name will keep that tension alive.",
    peradventure: "Peradventure means perhaps. Abraham's repeated question shows reverent boldness in intercession.",
    righteous: "Righteous refers to those who are in the right before God. Abraham asks whether the Judge will spare a city for the righteous within it.",
    Judge: "Judge here means the One who governs with perfect justice. Abraham appeals to God's own character.",
    gate: "The city gate was a place of business, judgment, and public leadership. Lot sitting there shows deep involvement in Sodom.",
    linger: "Linger means delay or hesitate. Lot's hesitation shows how attached he has become to a place under judgment.",
    brimstone: "Brimstone is sulfur, associated with fiery judgment. The language marks Sodom's destruction as divine judgment, not ordinary disaster.",
    "pillar of salt": "Lot's wife becomes a sign of looking back toward what God was judging. Her body becomes a warning about divided attachment.",
    overthrow: "Overthrow means overturn or destroy. The word emphasizes total collapse of Sodom and Gomorrah.",
    integrity: "Integrity means wholeness or innocence in the matter. Abimelech insists he acted without knowing Sarah was married.",
    prophet: "Prophet is used of Abraham in Genesis 20. Even flawed Abraham still carries a calling to intercede and speak before God.",
    reproved: "Reproved means corrected or shown to be wrong. Abraham's failure is not hidden or excused.",
    "covering of the eyes": "Covering of the eyes is a difficult phrase connected to public vindication and protection from shame. Sarah is publicly cleared.",
    restore: "Restore means return what was taken. Abimelech must return Sarah because the promise must be protected.",
    visited: "Visited means the Lord acted faithfully toward Sarah. It is covenant attention, not a casual appearance.",
    weaned: "Weaned means a child has moved beyond nursing. In the ancient world, this could be marked by a household feast.",
    mocking: "Mocking can mean laughing, playing, or ridiculing depending on context. In Genesis 21 it intensifies the Isaac-Ishmael household conflict.",
    "Everlasting God": "Everlasting God points to God's enduring faithfulness beyond Abraham's immediate moment.",
    tempt: "Tempt in the KJV can mean test. God is not enticing Abraham to evil; He is testing the reality of Abraham's trust.",
    "only son": "Only son emphasizes Isaac's unique covenant role. Ishmael exists, but Isaac is the promised son through Sarah.",
    "burnt offering": "A burnt offering was wholly given to God on the altar. The request in Genesis 22 is emotionally devastating because Isaac is the promised son.",
    thicket: "A thicket is dense brush. The ram caught there becomes God's substitute provision.",
    "Jehovah-jireh": "Jehovah-jireh means the LORD will provide. Abraham names the place by what God revealed there.",
    sepulchre: "Sepulchre means tomb or burial place. Genesis 23 is about grief, land, and covenant hope.",
    possession: "Possession means legally owned property. Abraham's first owned land in Canaan is a burial site.",
    Machpelah: "Machpelah is the cave near Hebron that becomes the patriarchal burial place.",
    weigh: "Weigh reminds us that silver was measured by weight in ancient transactions. Abraham's purchase is formal and public.",
    oath: "An oath is a solemn promise before God. Genesis 24 treats Isaac's marriage as covenant responsibility.",
    damsel: "Damsel means young woman. Rebekah is introduced with attention to family, purity, and character.",
    camels: "Camels represent travel, wealth, and labor. Watering them shows Rebekah's generosity and strength.",
    providence: "Providence means God's guiding care through ordinary events. Genesis 24 is full of providence without loud spectacle.",
    concubines: "Concubines were secondary wives with lower status. Genesis 25 distinguishes Abraham's wider family from the covenant line through Isaac.",
    birthright: "Birthright means the firstborn's inheritance privilege and family leadership role. Esau despising it begins a major Jacob-Esau theme.",
    lentiles: "Lentiles are small legumes used for stew. Esau trades lasting inheritance for immediate appetite.",
    "full of years": "Full of years means a completed life, not merely an old age. Abraham's life is finished, but God's promise continues.",
  };

  return explanations[word] || `${word} is an important term in Genesis ${chapter}. Slow down when it appears because older Bible language often carries cultural, emotional, and covenant meaning.`;
}

function renderRebuiltNote(note: AbrahamChapterNote) {
  const chapterFocus = chapterSpecificFocus[note.chapter] || [];
  const cleanLeadingIcon = (title: string) => {
    const parts = title.trim().split(/\s+/);
    if (parts.length > 1 && /[^\x20-\x7E]/.test(parts[0])) {
      return parts.slice(1).join(" ");
    }
    return title.trim();
  };
  const cleanSectionTitle = (title: string) => cleanLeadingIcon(title).replace(/^[^A-Za-z0-9"]+\s*/, "").trim();
  const cleanChapterHeading = () => {
    const cleaned = cleanLeadingIcon(note.title).replace(/â€”/g, "-").replace(/—/g, "-");
    const match = cleaned.match(/Genesis\s+\d+\s+-\s+(.+)/i);
    const subtitle = match ? match[1].trim() : cleaned.replace(/^Genesis\s+\d+\s*/i, "").trim();
    return `# Genesis ${note.chapter}\n\n# ${subtitle}`;
  };

  const parseReference = (reference: string) => {
    const match = reference.match(/Genesis\s+(\d+):(\d+)(?:-(\d+))?/i);
    if (!match) return null;
    const chapter = Number(match[1]);
    const start = Number(match[2]);
    const end = match[3] ? Number(match[3]) : start;
    return { chapter, start, end };
  };

  const getSectionVerses = (section: AbrahamSection) => {
    const parsed = parseReference(section.reference);
    if (!parsed) return [];
    return (GENESIS_KJV_VERSES[parsed.chapter] || []).filter(
      (verse) => verse.verse >= parsed.start && verse.verse <= parsed.end,
    );
  };

  const renderVerseCallout = (section: AbrahamSection) => {
    const verses = getSectionVerses(section);
    if (verses.length === 0) {
      return `> **${section.reference}**
>
> Read this section slowly. Notice who moves, who speaks, what is promised, what is feared, and how God keeps the covenant story moving.`;
    }

    return verses.map((verse) => `> **${verse.verse}** ${verse.text.replace(/\*/g, "")}`).join("\n\n");
  };

  const inlineWordNotes = (verse: GenesisVerse) => {
    const lower = verse.text.toLowerCase();
    const notes: string[] = [];
    const words = chapterKjvWords[note.chapter] || [];

    for (const word of words) {
      const key = word.toLowerCase();
      const appears =
        (key === "ram" ? /\bram\b/.test(lower) : lower.includes(key)) ||
        (key === "pitch his tent" && lower.includes("pitched")) ||
        (key === "full of years" && lower.includes("full")) ||
        (key === "god most high" && lower.includes("most high")) ||
        (key === "only son" && lower.includes("only son")) ||
        (key === "burnt offering" && lower.includes("burnt offering")) ||
        (key === "jehovah-jireh" && lower.includes("jehovahjireh")) ||
        (key === "everlasting god" && lower.includes("everlasting")) ||
        (key === "pillar of salt" && lower.includes("pillar")) ||
        (key === "covering of the eyes" && lower.includes("covering"));

      if (appears) {
        notes.push(`**${word}**: ${explainKjvWord(word, note.chapter)}`);
      }
    }

    return notes;
  };

  const verseLead = (verse: GenesisVerse) => {
    const lower = verse.text.toLowerCase();
    if (lower.includes("whole earth was of one language")) return "The chapter opens with humanity sharing one language and one speech. Unity can be beautiful, but Genesis immediately shows that unity can become dangerous when it is pointed toward pride instead of worship.";
    if (lower.includes("plain in the land of shinar")) return "Shinar connects the reader to the region later associated with Babylon. This matters because Babylon becomes a major Bible symbol for proud human power trying to live without surrender to God.";
    if (lower.includes("let us make brick")) return "The brick detail sounds small, but it shows organized human skill. Building is not the sin. The problem is a heart using strength, planning, and technology to replace trust in God.";
    if (lower.includes("let us make us a name")) return "This is the center of Babel. They want identity, fame, and security on their own terms. Genesis 12 will answer this line when God tells Abram, 'I will make thy name great.'";
    if (lower.includes("the lord came down")) return "The irony is sharp. The people think their tower reaches heaven, but the Lord still has to come down to see it. Human pride can feel huge to us and still be tiny before God.";
    if (lower.includes("nothing will be restrained")) return "God sees what organized pride can become. This is not fear on God's part. It is holy judgment and mercy stopping rebellion before it hardens even deeper.";
    if (lower.includes("confound their language")) return "Confound means confuse or mix up. God breaks the false unity by confusing their speech so the proud project cannot keep moving as one machine.";
    if (lower.includes("scattered them abroad")) return "The people feared being scattered, but God scatters them anyway. Their attempt to control the future becomes the very place God interrupts them.";
    if (lower.includes("called babel")) return "Babel is connected to confusion. The city that wanted a great name becomes remembered for scattered speech and interrupted pride.";
    if (lower.includes("generations of shem")) return "The word generations carries the Hebrew idea of toledot, the family record or story of what came from someone. Genesis is narrowing from scattered nations toward Abram.";
    if (lower.includes("begat arphaxad") || lower.includes("begat salah") || lower.includes("begat eber") || lower.includes("begat peleg") || lower.includes("begat reu") || lower.includes("begat serug") || lower.includes("begat nahor") || lower.includes("begat terah")) return "Begat means fathered or became the ancestor of. These verses may feel slow, but they show God carrying the story through real generations and real time.";
    if (lower.includes("begat sons and daughters")) return "Genesis does not name every child here. It keeps the covenant line in focus while reminding us that whole households and wider families existed around the named line.";
    if (lower.includes("begat abram")) return "Abram finally appears in the genealogy. The camera has moved from the whole earth, to Shem's line, to Terah's family, and now toward the man God will call.";
    if (lower.includes("generations of terah")) return "This second toledot marker tightens the focus again. Genesis is no longer talking about nations in general. It is bringing Abram's family into view.";
    if (lower.includes("haran died before his father")) return "This family already knows grief before Abram ever receives the famous call. Terah buries a son, Abram loses a brother, and Lot grows up fatherless.";
    if (lower.includes("sown")) return "";
    if (lower.includes("sara") && lower.includes("barren")) return "Sarai's barrenness is one of the most important details in the Abraham story. Barren means unable to have children, and that pain will sit directly under God's promise of descendants.";
    if (lower.includes("ur of the chaldees") && lower.includes("canaan")) return "The road toward Canaan begins before Genesis 12. Terah's family starts toward the land God will later promise, but they stop in Haran.";
    if (lower.includes("terah died in haran")) return "Genesis 11 ends in an unfinished place. The family journey stops short, Terah dies, and Abram is left in Haran right before God speaks in Genesis 12.";
    if (lower.includes("get thee out")) return "God's call is personal and costly. Abram must leave country, kindred, and father's house, which means leaving land, clan protection, inheritance identity, and the world that made him feel secure.";
    if (lower.includes("i will make of thee a great nation")) return "God answers Babel with promise. Babel tried to make a name by pride, but Abram will receive a name from God through covenant grace.";
    if (lower.includes("all families of the earth be blessed")) return "This is global from the beginning. God is not only choosing Abram for Abram's comfort. Through Abram's line, blessing will move toward the nations and ultimately toward Christ.";
    if (lower.includes("seventy and five years old")) return "Abram is seventy-five years old. This is not a young man chasing adventure; this is an older man leaving stability because God's word has become stronger than comfort.";
    if (lower.includes("souls that they had gotten")) return "Souls here means people connected to Abram's household: servants, dependents, workers, and those under his care. Abram is moving as a household leader, not as a lone traveler.";
    if (lower.includes("canaanite was then in the land")) return "This line creates tension. God will promise land, but Abram can already see that other people live there. Promise does not remove visible obstacles.";
    if (lower.includes("the lord appeared unto abram")) return "The Lord appears and speaks land promise inside occupied Canaan. Abram responds by building an altar, turning the promise into worship before he owns the land.";
    if (lower.includes("pitched his tent")) return "Tent and altar become a pattern. The tent shows temporary living; the altar shows worship. Abram is unsettled on the ground but anchored in God.";
    if (lower.includes("journeyed, going on still toward the south")) return "Abram keeps moving through the land. His faith is lived on the road, step by step, without full possession yet.";
    if (lower.includes("famine in the land")) return "The famine is a shock because it comes after obedience. Abram is in the land of promise, but the land of promise still becomes a place of testing.";
    if (lower.includes("fair woman")) return "Fair means beautiful. Abram's fear grows as he approaches Egypt because beauty near power could become dangerous in the ancient world.";
    if (lower.includes("they will kill me")) return "Abram imagines the worst. His fear may be understandable, but it starts leading him toward a plan that protects himself while exposing Sarai.";
    if (lower.includes("thou art my sister")) return "This is the half-truth plan. Genesis 20 later shows Sarai is related to Abram, but the point here is deception driven by fear.";
    if (lower.includes("commended her before pharaoh")) return "Pharaoh's officials praise Sarai, and Abram's plan collapses. The thing he feared now pulls Sarai into Pharaoh's house.";
    if (lower.includes("entreated abram well")) return "Abram receives wealth because of Sarai, which makes the scene morally uncomfortable. This is not clean blessing; it is prosperity tangled with compromise.";
    if (lower.includes("plagued pharaoh")) return "God intervenes to protect Sarai and the covenant promise. Abram's failure is real, but God's faithfulness is stronger than Abram's fear.";
    if (lower.includes("what is this that thou hast done")) return "Pharaoh rebukes Abram, and the irony is painful. The outsider sees the moral problem clearly while the man of promise has acted out of fear.";
    if (lower.includes("take her, and go thy way")) return "Pharaoh gives Sarai back and sends Abram away. Abram leaves Egypt with possessions, but also with his weakness exposed.";
    if (lower.includes("went up out of egypt")) return "Genesis starts this chapter by moving Abram out of Egypt. He is coming away from the place where fear shaped his choices, and that makes the return feel like a reset.";
    if (lower.includes("very rich")) return "Abram has real wealth now. Cattle, silver, and gold sound like blessing, but wealth will soon create pressure inside the family camp.";
    if (lower.includes("went on his journeys")) return "Abram retraces his road back toward Bethel. The journey language helps us feel his life as a moving camp, not a settled kingdom.";
    if (lower.includes("place of the altar")) return "The altar brings Abram back to worship. After Egypt, this detail matters because the story returns him to the place where he had called on the Lord before.";
    if (lower.includes("flocks") || lower.includes("herds")) return "The animals are not background decoration. In nomadic life, flocks and herds meant food, wealth, labor, and survival.";
    if (lower.includes("land was not able to bear")) return "The land itself becomes part of the tension. Two large households need pasture and water, and there is not enough room for peace.";
    if (lower.includes("strife between the herdmen")) return "The conflict begins with the workers, but it threatens the whole family. Household tension often starts in daily pressure before it becomes a major break.";
    if (lower.includes("no strife")) return "Abram steps in before the conflict destroys the relationship. He chooses peace while he still has power to demand his own way.";
    if (lower.includes("whole land before thee")) return "Abram gives Lot first choice. That is a major faith moment because Abram is trusting God's promise instead of controlling the outcome.";
    if (lower.includes("lifted up his eyes")) return "Lot makes his choice by sight. Genesis wants us to notice what looks attractive and what is spiritually dangerous.";
    if (lower.includes("toward sodom")) return "This is the warning line. Lot does not have to move into Sodom all at once; he starts by pitching his tent toward it.";
    if (lower.includes("wicked and sinners")) return "Genesis tells us the truth about Sodom before Lot's story gets worse. The place may look rich, but it is morally sick.";
    if (lower.includes("look from the place where thou art")) return "God tells Abram to look after Lot has left. Lot looked to choose for himself, but Abram looks because God is showing him promise.";
    if (lower.includes("i will make thy seed")) return "God speaks about descendants again while Abram still has no child. The promise is still larger than what Abram can see.";
    if (lower.includes("walk through the land")) return "God tells Abram to walk the land like a man learning the promise with his feet. The land is not fully possessed yet, but it is already named by God.";
    if (lower.includes("king") && lower.includes("war")) return "The Abraham story suddenly widens into international conflict. Lot's family is now caught near powers far bigger than one household.";
    if (lower.includes("served") && lower.includes("rebelled")) return "This is the language of ancient politics. Smaller kings served a stronger king, then rebelled when they wanted freedom.";
    if (lower.includes("slimepits")) return "The battlefield is dangerous even before swords are counted. Slimepits were tar or bitumen pits that could trap fleeing soldiers.";
    if (lower.includes("took lot")) return "Lot's earlier choice now becomes personal danger. He is not just near Sodom anymore; he is captured with Sodom.";
    if (lower.includes("abram the hebrew")) return "Abram is called the Hebrew here, marking him as a distinct outsider in the land. He is connected to the region, but he is not swallowed by it.";
    if (lower.includes("trained servants")) return "Abram's household is large and organized enough to have trained men. He is a pilgrim, but he is not helpless.";
    if (lower.includes("by night")) return "The rescue happens with strategy. Abram divides his men and attacks at night, showing courage joined with wisdom.";
    if (lower.includes("brought back")) return "The rescue is complete. Abram brings back Lot, the goods, the women, and the people.";
    if (lower.includes("melchizedek")) return "Melchizedek steps into the story suddenly as both king and priest. His blessing turns the victory into a worship moment.";
    if (lower.includes("bread and wine")) return "Bread and wine are hospitality and refreshment after battle. The scene feels peaceful after the violence of war.";
    if (lower.includes("tithes")) return "A tithe is a tenth. Abram gives a tenth to Melchizedek as a sign that victory belongs under God's authority.";
    if (lower.includes("thread") || lower.includes("shoelatchet")) return "Abram refuses even the smallest reward from Sodom. He does not want anyone confusing God's blessing with Sodom's wealth.";
    if (lower.includes("fear not")) return "God starts by speaking to Abram's fear. That means Abram's courage in chapter 14 did not remove every anxious place inside him.";
    if (lower.includes("childless")) return "Abram names the ache plainly: he has no child. Faith here is honest, not fake.";
    if (lower.includes("believed in the lord")) return "This is one of the foundation verses of the Bible. Abram trusts God's word before he sees the child.";
    if (lower.includes("heifer") || lower.includes("she goat") || lower.includes("turtledove")) return "The animals prepare the covenant ceremony. Ancient readers would feel the seriousness of a promise sealed this way.";
    if (lower.includes("horror of great darkness")) return "The scene grows heavy because the future will include suffering. Promise does not mean the road will be easy.";
    if (lower.includes("smoking furnace") || lower.includes("burning lamp")) return "God appears in fire and smoke, passing through the covenant pieces Himself. The weight of the promise rests on Him.";
    if (lower.includes("sarai") && lower.includes("hagar")) return "Sarai and Hagar are now placed inside the pain of waiting. The promise has not come yet, and the household begins to strain.";
    if (lower.includes("dealt hardly")) return "Sarai's pain turns into harsh treatment. Genesis does not pretend impatience is harmless.";
    if (lower.includes("angel of the lord found")) return "Hagar may be running away, but she is not outside God's sight. The Lord meets her in the wilderness.";
    if (lower.includes("thou god seest me")) return "Hagar names God from her wound. She has been used and mistreated, but the Lord has seen her.";
    if (lower.includes("walk before me")) return "God calls Abraham to a whole-life faithfulness. Covenant is not only a promise to receive; it is a life walked before God.";
    if (lower.includes("abraham") && lower.includes("father of many")) return "The new name asks Abraham to live inside a promise he still cannot fully see.";
    if (lower.includes("circumcised")) return "The covenant sign is obeyed in Abraham's household. The promise now marks daily identity.";
    if (lower.includes("sarah") && lower.includes("son")) return "Sarah is not a side character in the promise. God names her as the woman through whom Isaac will come.";
    if (lower.includes("laughed") || lower.includes("laugh")) return "The laughter exposes how impossible the promise feels from the human side.";
    if (lower.includes("three men")) return "The visitors arrive quietly, but the chapter will reveal that this is a holy encounter.";
    if (lower.includes("fine meal") || lower.includes("calf")) return "Abraham prepares generous hospitality. Food, water, shade, and rest were acts of honor and protection.";
    if (lower.includes("too hard for the lord")) return "This question is the center of the chapter. Sarah's body may be old, but the Lord's power is not limited by age.";
    if (lower.includes("shall not the judge")) return "Abraham appeals to God's justice. He is asking a huge question with reverence: will the Judge of all the earth do right?";
    if (lower.includes("sat in the gate")) return "Lot sitting in the gate shows public connection to Sodom. He is no longer only near the city; he has become part of its life.";
    if (lower.includes("linger")) return "Lot lingers even while judgment is coming. That hesitation shows how deeply Sodom has wrapped around his life.";
    if (lower.includes("pillar of salt")) return "Lot's wife looks back and becomes a sign of divided attachment. Her body leaves Sodom, but her heart turns back.";
    if (lower.includes("remembered abraham")) return "Lot's rescue is tied to God's mercy and Abraham's place in the story. Judgment does not erase covenant concern.";
    if (lower.includes("she is my sister")) return "Abraham repeats the old fear pattern. This is painful because he has walked with God for years and still carries weakness.";
    if (lower.includes("prophet")) return "God calls Abraham a prophet even while correcting the situation. His calling is real, but his failure is real too.";
    if (lower.includes("visited sarah")) return "The Lord visits Sarah by doing exactly what He promised. The waiting has an appointed time.";
    if (lower.includes("weaned")) return "Weaning marked a child surviving the fragile early years. The feast celebrates that Isaac is growing.";
    if (lower.includes("god heard the voice of the lad")) return "God hears Ishmael in the wilderness. The covenant line is Isaac, but Ishmael is not ignored.";
    if (lower.includes("opened her eyes")) return "God does not create a new well in the sentence; He opens Hagar's eyes to see provision near her.";
    if (lower.includes("tempt abraham")) return "Tempt here means test. God is not luring Abraham into evil; He is testing the trust that has been growing for years.";
    if (lower.includes("only son isaac")) return "God names Isaac in the most painful way possible: the beloved promised son. The test touches Abraham's deepest love.";
    if (lower.includes("where is the lamb")) return "Isaac's question brings the hidden tension into the open. He sees the wood and fire, but no sacrifice.";
    if (lower.includes("god will provide")) return "Abraham does not explain the mechanics. He speaks trust where he cannot yet see the answer.";
    if (lower.includes("caught in a thicket")) return "The substitute is already there when God opens Abraham's eyes to it. Isaac lives because God provides.";
    if (lower.includes("sarah died")) return "The promise story stops to let grief speak. Abraham does not rush past Sarah's death.";
    if (lower.includes("bury my dead")) return "Abraham needs a real burial place in the land God promised. Grief now meets land promise.";
    if (lower.includes("gate of his city")) return "The city gate makes the purchase public and witnessed. Abraham wants this transaction recognized by the people of the land.";
    if (lower.includes("machpelah")) return "Machpelah becomes the first owned piece of Canaan connected to Abraham's family.";
    if (lower.includes("make thee swear")) return "Abraham treats Isaac's marriage as covenant responsibility. The next generation must not be careless with the promise.";
    if (lower.includes("well of water")) return "The well becomes the meeting place where need, prayer, and providence come together.";
    if (lower.includes("rebekah")) return "Rebekah enters the story as the woman who will carry the covenant line forward with Isaac.";
    if (lower.includes("i will go")) return "Rebekah's answer is short but brave. Like Abraham, she leaves family and home for a future she cannot fully see.";
    if (lower.includes("isaac brought her")) return "Isaac receives Rebekah into Sarah's tent. The story moves from grief toward a new household.";
    if (lower.includes("gave all that he had unto isaac")) return "The inheritance line is made clear. Abraham has other children, but Isaac carries the covenant promise.";
    if (lower.includes("full of years")) return "Abraham's life is complete, but the promise is not finished. Genesis is preparing us to follow the next generation.";
    if (lower.includes("isaac and ishmael")) return "Isaac and Ishmael bury Abraham together. The family story is complicated, but both sons stand at his death.";
    if (lower.includes("intreated the lord")) return "Isaac prays because Rebekah is barren. The next generation begins with the same impossible ache.";
    if (lower.includes("two nations")) return "God tells Rebekah the struggle is larger than pregnancy. Two peoples are already represented in the twins.";
    if (lower.includes("sold his birthright")) return "Esau trades lasting inheritance for immediate hunger. Genesis wants us to feel how foolish that exchange is.";
    return "";
  };

  const explainVerseText = (verse: GenesisVerse, section: AbrahamSection) => {
    const comments: string[] = [];
    const wordNotes = inlineWordNotes(verse);
    const opening = verseLead(verse);
    if (opening) comments.push(opening);

    if (!opening && note.chapter === 13) {
      if (verse.verse <= 4) comments.push("Abram is coming back from Egypt. That matters because Egypt exposed his fear. Returning to the altar shows him coming back to the place where worship had first marked his walk in Canaan.");
      else if (verse.verse <= 7) comments.push("The blessing has become heavy enough to create conflict. Abram and Lot have flocks, herds, tents, and workers, but the land cannot support both households in peace.");
      else if (verse.verse <= 13) comments.push("Lot chooses what looks best to his eyes. The plain looks watered and rich, but the text warns us that Sodom is spiritually dangerous. Genesis wants us to feel the difference between attractive land and wise direction.");
      else comments.push("After Lot leaves, God repeats the promise to Abram. Abram gave up first choice, but he did not lose the future. God tells him to look, walk, and trust the land promise again.");
    } else if (!opening && note.chapter === 14) {
      if (verse.verse <= 12) comments.push("The chapter opens with kings and war because Lot's move toward Sodom has placed him inside a dangerous world. Abram's family is now touched by the politics and violence around Sodom.");
      else if (verse.verse <= 16) comments.push("Abram acts with courage. He does not leave Lot to suffer the consequences of his own choice. He gathers trained men and rescues the captives.");
      else if (verse.verse <= 20) comments.push("Melchizedek enters the story as king and priest. He points Abram's victory back to God Most High, so Abram does not walk away thinking his strength saved the day.");
      else comments.push("Abram refuses the king of Sodom's reward. He will not let Sodom say it made Abram rich. This protects the clarity of God's blessing.");
    } else if (!opening && note.chapter === 15) {
      if (verse.verse <= 6) comments.push("Abram is honest about the ache of having no son. God does not crush that honesty. He answers with a promise bigger than Abram can count.");
      else if (verse.verse <= 11) comments.push("The land promise moves into covenant language. The animal pieces may feel strange now, but ancient readers would recognize a serious covenant ceremony.");
      else if (verse.verse <= 16) comments.push("God tells Abram the promise will move through suffering, waiting, and deliverance. The Exodus story is already being planted here.");
      else comments.push("The smoking furnace and burning lamp show God taking the covenant burden on Himself. Abram watches while God confirms the promise.");
    } else if (!opening && note.chapter === 16) {
      if (verse.verse <= 6) comments.push("Waiting has become painful, and Sarai tries to force the promise through Hagar. The plan may fit ancient household customs, but Genesis shows the damage it causes.");
      else if (verse.verse <= 12) comments.push("Hagar runs into the wilderness, but God finds her there. She is not invisible to Him, even when the household has treated her like a tool.");
      else comments.push("Hagar names God as the One who sees. That is one of the tender surprises of Abraham's story: God sees the wounded person inside the covenant family's failure.");
    } else if (!opening && note.chapter === 17) {
      if (verse.verse <= 8) comments.push("God gives Abram a new name before the child arrives. Abraham must now live with a name that sounds larger than his visible life.");
      else if (verse.verse <= 14) comments.push("Circumcision marks the covenant in the body. This is not a private idea only; Abraham's household is being visibly set apart.");
      else comments.push("Sarah is named in the promise, and Isaac is promised through her. Abraham laughs, but God keeps the promise tied to Sarah's impossible womb.");
    } else if (!opening && note.chapter === 18) {
      if (verse.verse <= 8) comments.push("Abraham receives the visitors with urgent hospitality. In the ancient world, welcoming travelers meant honor, protection, food, water, and rest.");
      else if (verse.verse <= 15) comments.push("Sarah hears the promise and laughs inside herself. The question, 'Is any thing too hard for the LORD?' becomes the center of the moment.");
      else comments.push("Abraham is pulled into intercession for Sodom. He cares about justice and mercy, and he speaks with reverent boldness before God.");
    } else if (!opening && note.chapter === 19) {
      if (verse.verse <= 11) comments.push("Lot is sitting in the gate of Sodom, which shows he is deeply connected to city life there. The chapter quickly reveals how violent and corrupt Sodom has become.");
      else if (verse.verse <= 22) comments.push("The messengers have to press Lot to leave. Mercy does not look gentle here; it grabs him because he is hesitating in a place under judgment.");
      else if (verse.verse <= 29) comments.push("Sodom falls under judgment, but God remembers Abraham and rescues Lot. The rescue is real, but the damage of Lot's choices remains.");
      else comments.push("The final scene with Lot's daughters is painful and dark. Genesis does not sanitize what life near Sodom has done to this family.");
    } else if (!opening && note.chapter === 20) {
      if (verse.verse <= 7) comments.push("Abraham repeats the sister lie. This is important because faith has not erased his old fear pattern. God still protects Sarah because Isaac's birth is near.");
      else if (verse.verse <= 13) comments.push("Abimelech confronts Abraham, and the outsider sees the problem clearly. Genesis lets Abraham be corrected instead of making him look perfect.");
      else comments.push("God restores the household after Sarah is returned. The covenant continues, but Abraham's fear has again created danger for others.");
    } else if (!opening && note.chapter === 21) {
      if (verse.verse <= 7) comments.push("Isaac is finally born. The chapter wants us to hear the joy: God did what He said, at the time He said.");
      else if (verse.verse <= 21) comments.push("The birth of Isaac does not erase the pain around Hagar and Ishmael. The promise line is clear, but God still hears the boy in the wilderness.");
      else comments.push("The well at Beersheba shows Abraham living publicly in the land. Peace, witness, water, and worship all matter here.");
    } else if (!opening && note.chapter === 22) {
      if (verse.verse <= 8) comments.push("The test touches the promise itself. God names Isaac with painful care, and Abraham walks into obedience without being told how God will resolve it.");
      else if (verse.verse <= 14) comments.push("The knife is stopped, and the ram is provided. Isaac is spared because God provides the substitute.");
      else comments.push("After the test, the promise is repeated. Abraham's obedience has shown that he trusts the Giver more than the gift.");
    } else if (!opening && note.chapter === 23) {
      if (verse.verse <= 2) comments.push("Sarah dies, and Abraham mourns. Genesis lets grief stand inside the promise instead of rushing past it.");
      else if (verse.verse <= 16) comments.push("Abraham negotiates publicly for a burial place. The city gate and witnesses matter because this purchase must be recognized by the people of the land.");
      else comments.push("The cave of Machpelah becomes the first piece of Canaan Abraham legally owns. It is a tomb, which means promise and grief meet in the same field.");
    } else if (!opening && note.chapter === 24) {
      if (verse.verse <= 9) comments.push("Abraham is protecting the covenant line. Isaac must not be pulled back into the old land, but his wife must come from the family line Abraham trusts.");
      else if (verse.verse <= 27) comments.push("The servant prays at the well, and Rebekah appears with generous strength. Providence works through timing, character, and ordinary kindness.");
      else if (verse.verse <= 61) comments.push("The family negotiations show how marriage was a household and covenant matter, not only a private romance.");
      else comments.push("Rebekah leaves her home and comes to Isaac. Her movement echoes Abraham's earlier leaving: she steps into a future she cannot fully see.");
    } else if (!opening && note.chapter === 25) {
      if (verse.verse <= 11) comments.push("Abraham's life closes, but the promise does not. His burial with Sarah ties his story to the land God promised.");
      else if (verse.verse <= 18) comments.push("Ishmael's descendants are named because God kept His word to Hagar and Abraham. The covenant line is Isaac, but Ishmael is not forgotten.");
      else comments.push("The next generation begins with barrenness, prayer, twins, struggle, and a birthright crisis. Genesis is already moving from Abraham to Jacob and Esau.");
    } else if (!opening) {
      comments.push(section.points[0] || "This verse moves the story forward.");
    }

    const lower = verse.text.toLowerCase();
    const textSpecificNotes: string[] = [];
    if (lower.includes("sojourn")) textSpecificNotes.push("Sojourn means to live somewhere as a temporary resident. Abram is in the land connected to promise, but he still lives like a traveler.");
    if (lower.includes("ninety years old and nine")) textSpecificNotes.push("Ninety years old and nine means ninety-nine years old. The KJV says it in an older word order so the reader feels Abraham's age and the long delay before Isaac.");
    if (lower.includes("almighty god")) textSpecificNotes.push("Almighty God is El Shaddai in Hebrew. The title points to God's power and sufficiency, which matters because Abraham's body and Sarah's womb cannot produce Isaac by normal strength.");
    if (lower.includes("walk before me")) textSpecificNotes.push("Walk before me means live your whole life in God's presence. Abraham's faith is not just a private belief; it is a daily covenant way of life.");
    if (lower.includes("be thou perfect")) textSpecificNotes.push("Be thou perfect does not mean Abraham will never sin. The idea is wholeness, blamelessness, and undivided loyalty before God.");
    if (lower.includes("altar")) textSpecificNotes.push("An altar was a place of worship and sacrifice. When Abraham builds one, he is marking the place as a meeting point with the Lord.");
    if (lower.includes("covenant")) textSpecificNotes.push("Covenant means a binding promise relationship. In Abraham's story, the covenant depends on God's faithfulness, not Abraham's perfection.");
    if (lower.includes("seed")) textSpecificNotes.push("Seed means descendants. It can sound small, but in Genesis it carries the whole future of Abraham's family and the blessing promised through them.");
    if (lower.includes("barren")) textSpecificNotes.push("Barren means unable to have children. In this story, barrenness is not a side detail; it is the impossible place where God's promise will have to work.");
    if (lower.includes("circumcis")) textSpecificNotes.push("Circumcision was the covenant sign placed on the male body. It marked Abraham's household as belonging to God's promise.");
    if (lower.includes("bondwoman")) textSpecificNotes.push("Bondwoman means an enslaved or servant woman. Hagar's status makes the scene painful because she has far less power than Abram and Sarai.");
    if (lower.includes("concubine")) textSpecificNotes.push("A concubine was a secondary wife with lower status. Genesis names this because family lines and inheritance were carefully distinguished.");
    if (lower.includes("gate")) textSpecificNotes.push("The city gate was where leaders sat, business was witnessed, and legal matters were handled. Sitting there shows public connection to the city.");
    if (lower.includes("heifer")) textSpecificNotes.push("A heifer is a young female cow. In Genesis 15 it is part of a solemn covenant ceremony that ancient readers would recognize as serious.");
    if (/\bram\b/.test(lower)) textSpecificNotes.push("A ram is an adult male sheep. In Genesis 22 the ram matters because God provides it as a substitute for Isaac.");
    if (lower.includes("thicket")) textSpecificNotes.push("A thicket is thick brush. The ram caught there shows provision that Abraham did not arrange for himself.");
    if (lower.includes("sepulchre")) textSpecificNotes.push("Sepulchre means a burial place or tomb. Abraham is not only buying property; he is making a place for grief inside the promised land.");
    if (lower.includes("weigh")) textSpecificNotes.push("Weighing silver was how payment was measured before minted coins were common. Abraham's purchase is careful, public, and legal.");
    if (lower.includes("birthright")) textSpecificNotes.push("Birthright was the firstborn son's inheritance privilege and family leadership place. Esau treats something lasting like it is small.");
    if (lower.includes("lentiles")) textSpecificNotes.push("Lentiles are small beans used for stew. The detail makes Esau's choice feel painfully ordinary: a meal now for an inheritance later.");
    if (lower.includes("famine")) textSpecificNotes.push("A famine means severe lack of food. In Genesis, famine often tests whether God's people will trust the Lord when survival feels pressured.");
    if (lower.includes("laughed") || lower.includes("laugh")) textSpecificNotes.push("Laughter in Abraham's story is complicated. Sometimes it is joy, sometimes disbelief, and sometimes the shock of hearing an impossible promise.");
    if (lower.includes("wilderness")) textSpecificNotes.push("The wilderness is a place away from settled safety. It often exposes need, fear, thirst, and dependence on God.");
    if (lower.includes("well")) textSpecificNotes.push("A well meant life in a dry land. Water could shape travel, survival, peace, and family futures.");
    if (lower.includes("oath")) textSpecificNotes.push("An oath was a solemn promise made before God. Breaking it would not be treated as a small thing.");
    if (lower.includes("damsel")) textSpecificNotes.push("Damsel means young woman. The KJV word is old, but the story is showing Rebekah's age, family setting, and character.");
    if (lower.includes("full of years")) textSpecificNotes.push("Full of years means a life brought to completion. Abraham dies, but the covenant promise keeps moving into the next generation.");
    comments.push(...textSpecificNotes);
    comments.push(...wordNotes);

    return `### Verse ${verse.verse}

${comments.join("\n\n")}`;
  };

  const renderVerseBreakdowns = (section: AbrahamSection) => {
    const verses = getSectionVerses(section);
    if (verses.length === 0) return "";
    return `### Walking Through The Verses

${verses.map((verse) => explainVerseText(verse, section)).join("\n\n")}`;
  };

  const renderSectionDeepDive = (section: AbrahamSection) => {
    const title = cleanSectionTitle(section.title);
    const verses = getSectionVerses(section);
    const verseList = verses.map((verse) => verse.verse).join(", ");
    const chapterFrame = chapterFocus[0] || note.intro;
    const covenantFrame = chapterFocus[1] || note.lesson;
    const pressureFrame = chapterFocus[2] || section.points[1] || section.points[0] || note.lesson;
    const sectionKey = title.toLowerCase();
    const sectionTexture = () => {
      if (sectionKey.includes("babel") || sectionKey.includes("tower")) return [
        "Ancient readers would recognize more than a construction story here. A city and tower meant protection, reputation, economy, worship, and political identity all gathered into one proud project.",
        "Modern readers often miss how spiritual the ambition is. Babel is not condemned for using bricks; it is exposed because the builders want greatness without surrender.",
        "This scene prepares the contrast with Abram. Babel tries to take a name, while Abram will receive a name from God.",
      ];
      if (sectionKey.includes("god comes down")) return [
        "Ancient readers would feel the irony. The tower is supposed to reach heaven, but the Lord comes down to inspect it.",
        "Modern readers can miss the mercy inside the judgment. God scatters the people, but He is also stopping proud unity from becoming a deeper organized rebellion.",
        "This prepares the Abraham story by showing that God's rescue plan will not come through human empire. It will come through covenant promise.",
      ];
      if (sectionKey.includes("narrows") || sectionKey.includes("family comes")) return [
        "Ancient readers listened carefully to genealogies because names carried inheritance, identity, memory, and promise.",
        "Modern readers often skim the names and miss the point: God is moving history through generations before Abram ever hears the call.",
        "The covenant story is being threaded through real families, real grief, and real impossibility.",
      ];
      if (sectionKey.includes("journey starts")) return [
        "Ancient readers would notice the movement from Ur toward Canaan. Travel meant danger, expense, household disruption, and dependence on water and pasture.",
        "Modern readers may see a simple relocation, but this is an unfinished road. The family starts toward promise and stops in Haran.",
        "That unfinished place becomes the doorway into Abram's obedience in the next chapter.",
      ];
      if (sectionKey.includes("calls") || sectionKey.includes("obeys")) return [
        "Ancient readers would feel the cost of leaving country, kindred, and father's house. That meant leaving the network that gave protection, identity, inheritance, and survival.",
        "Modern readers can turn calling into a vague feeling, but Genesis makes it concrete. Abram has to move his household because God has spoken.",
        "The covenant begins with promise, but it immediately asks for obedience before Abram has a full map.",
      ];
      if (sectionKey.includes("canaan") || sectionKey.includes("altar") || sectionKey.includes("worship")) return [
        "Ancient readers would notice tents and altars together. The tent says Abram has not settled the land yet; the altar says he is worshiping the God who promised it.",
        "Modern readers can miss how strange this faith looks. Abram is promised land while other people still live there.",
        "The covenant grows through worship before possession. Abram learns to honor God in places he does not yet own.",
      ];
      if (sectionKey.includes("famine") || sectionKey.includes("fear") || sectionKey.includes("pharaoh") || sectionKey.includes("sarah") || sectionKey.includes("saria")) return [
        "Ancient readers would understand the danger of famine, kings, beauty, and foreign power. Survival pressure could make even a called man feel exposed.",
        "Modern readers can miss how honest Genesis is. Abram obeys boldly in one scene and then acts fearfully in the next.",
        "The covenant is protected by God's faithfulness, not by Abram's perfect choices.",
      ];
      if (sectionKey.includes("lot")) return [
        "Ancient readers would understand that herds, pasture, water, and household workers could create serious conflict between large family camps.",
        "Modern readers may reduce the scene to a disagreement, but the question underneath is spiritual: will Abram grasp for advantage or trust the promise?",
        "Lot's choices keep showing how direction matters. Moving toward what looks good can quietly pull a household toward danger.",
      ];
      if (sectionKey.includes("war") || sectionKey.includes("rescue") || sectionKey.includes("melchizedek") || sectionKey.includes("sodom's reward")) return [
        "Ancient readers would hear the language of kings, tribute, rebellion, raids, alliances, and captives. This is the violent political world around Abram's tents.",
        "Modern readers can miss how strong Abram is in this chapter. He is not only a pilgrim; he is a household leader who can act with courage.",
        "Melchizedek and Sodom place two different kinds of power before Abram: worship under God Most High or wealth tied to a corrupt city.",
      ];
      if (sectionKey.includes("believes") || sectionKey.includes("covenant") || sectionKey.includes("stars") || sectionKey.includes("land")) return [
        "Ancient readers would recognize the seriousness of oath, sacrifice, inheritance, and descendants. A covenant was not a casual promise.",
        "Modern readers can miss Abram's ache. He is not asking from comfort; he is still childless while holding a promise about descendants.",
        "Genesis 15 teaches that righteousness is counted through faith before the promise is visible in Abram's arms.",
      ];
      if (sectionKey.includes("hagar") || sectionKey.includes("sari") || sectionKey.includes("sees")) return [
        "Ancient readers would understand the household power imbalance. Hagar is a servant woman, and Sarai and Abram hold far more power than she does.",
        "Modern readers should not sanitize the pain. Waiting turns into control, and real people are wounded by the attempt to force the promise.",
        "God's covenant focus does not make Him blind to the mistreated person in the wilderness.",
      ];
      if (sectionKey.includes("circumcision") || sectionKey.includes("abraham") || sectionKey.includes("isaac") || sectionKey.includes("sarah")) return [
        "Ancient readers would feel the weight of new names and covenant signs. Names declared identity, and circumcision marked the household in a costly physical way.",
        "Modern readers may want covenant to stay private and invisible, but Genesis shows identity, body, family, obedience, and promise all tied together.",
        "Isaac is named before he is born because God's promise is stronger than Abraham and Sarah's visible limits.",
      ];
      if (sectionKey.includes("visitors") || sectionKey.includes("laughs") || sectionKey.includes("intercedes") || sectionKey.includes("sodom")) return [
        "Ancient readers would see hospitality, honor, food, shade, and public justice all working together in this chapter.",
        "Modern readers can miss the emotional closeness. Abraham is not only receiving commands now; he is being drawn into conversation with the Lord.",
        "The promise of Isaac and the judgment of Sodom sit beside each other, showing God's mercy and justice in the same chapter.",
      ];
      if (sectionKey.includes("violence") || sectionKey.includes("mercy") || sectionKey.includes("falls") || sectionKey.includes("after sodom")) return [
        "Ancient readers would understand the gate, household hospitality, city violence, and family shame as public realities, not private little details.",
        "Modern readers should feel the tragedy of Lot's compromise. He is rescued from Sodom, but Sodom's damage still echoes in his household.",
        "The chapter shows that mercy is real, judgment is real, and direction matters before the crisis arrives.",
      ];
      if (sectionKey.includes("abimelech") || sectionKey.includes("lie") || sectionKey.includes("restored")) return [
        "Ancient readers would feel the danger of a king taking Sarah. This is not only marriage tension; it threatens the covenant child soon to be born.",
        "Modern readers can miss how painful repetition is. Abraham has seen God's faithfulness for years, yet fear still returns.",
        "God protects the promise while also exposing Abraham's pattern, because grace preserves and corrects at the same time.",
      ];
      if (sectionKey.includes("isaac is born") || sectionKey.includes("ishmael") || sectionKey.includes("beersheba") || sectionKey.includes("household conflict")) return [
        "Ancient readers would hear the joy of birth, the seriousness of inheritance, and the pain of household division all in one chapter.",
        "Modern readers can expect fulfillment to make everything simple, but Isaac's birth also brings old wounds back into view.",
        "God keeps the covenant line through Isaac while still hearing Hagar and Ishmael in the wilderness.",
      ];
      if (sectionKey.includes("tests") || sectionKey.includes("ram") || sectionKey.includes("moriah") || sectionKey.includes("promise is repeated")) return [
        "Ancient readers would feel the weight of sacrifice, firstborn love, mountain travel, wood, fire, knife, and altar.",
        "Modern readers must not make this scene easy. Isaac is the beloved promised son, so the command touches Abraham's deepest love and future.",
        "The Lord provides the substitute, and Abraham learns that the promise is safest in the hands of the God who gave it.",
      ];
      if (sectionKey.includes("sarah dies") || sectionKey.includes("field") || sectionKey.includes("machpelah")) return [
        "Ancient readers would understand public burial negotiations, family honor, land ownership, and the city gate as serious legal matters.",
        "Modern readers can miss how tender the chapter is. The first owned piece of promised land is not a palace; it is a grave.",
        "Faith does not erase grief. Abraham mourns Sarah while anchoring the family in Canaan.",
      ];
      if (sectionKey.includes("servant") || sectionKey.includes("well") || sectionKey.includes("rebekah") || sectionKey.includes("isaac receives")) return [
        "Ancient readers would see marriage as a family and covenant matter, with oaths, travel, gifts, wells, consent, and household blessing all involved.",
        "Modern readers can miss Rebekah's strength. Her generosity at the well and her willingness to go show character before romance takes center stage.",
        "The covenant continues because the next generation is guided by prayer, wisdom, and willing obedience.",
      ];
      if (sectionKey.includes("keturah") || sectionKey.includes("dies") || sectionKey.includes("ishmael's line") || sectionKey.includes("jacob") || sectionKey.includes("birthright")) return [
        "Ancient readers would notice inheritance lines, burial, named descendants, barrenness, firstborn rights, and family blessing.",
        "Modern readers can miss the careful distinction: Abraham has many descendants, but Isaac carries the covenant line.",
        "Abraham's life closes, but the promise keeps moving into Isaac, Rebekah, Jacob, and Esau.",
      ];
      return [
        "Ancient readers would hear the family, land, household, and covenant details with more weight than modern readers usually do.",
        "Modern readers can miss the pressure inside the story because the chapter sounds familiar. But Abraham's life is being shaped through costly decisions.",
        "This scene helps move the promise from one moment to the next without making Abraham look perfect or the road look easy.",
      ];
    };
    const [ancientLine, modernLine, covenantLine] = sectionTexture();
    const keyDetails = [
      `📍 The setting of **${title}** matters because place, movement, and timing shape the whole scene.`,
      `👀 Watch what people see, want, fear, or assume before they act.`,
      `🧬 Notice how the covenant promise is either being protected, tested, clarified, or carried forward.`,
      `💔 Pay attention to the human cost. Abraham's story includes family pressure, waiting, grief, and weakness.`,
      `🙏 Look for worship, obedience, prayer, or surrender in the middle of the pressure.`,
    ];

    return `### What Is Happening

${section.points.join("\n\n")}

### Key Details To Notice

${keyDetails.map((item) => `* ${item}`).join("\n\n")}

### Why This Section Matters

In **${title}**, Genesis is not throwing in background information. It is showing the pressure around Abraham's obedience and the world in which the promise is developing.

${section.points[0]}

### What Ancient Readers Would Notice

${ancientLine}

That matters because Abraham's world is not modern, private, and individualistic. Family, land, name, household, servants, animals, city gates, wells, altars, and children all carried spiritual and social weight.

### What Modern Readers Often Miss

${modernLine}

The old words and customs are different from our world, but the heart pressure is familiar. People still want security. Waiting still hurts. Fear still makes people reach for control. Family tension still exposes what people really trust.

### How This Moves the Covenant Story

${chapterFrame}

${covenantFrame}

${pressureFrame}

${covenantLine}

The verses in this section (${verseList}) move the covenant story forward by showing promise under pressure. God is forming Abraham on roads, beside altars, inside family conflict, in foreign places, and in moments where obedience costs something.

${renderVerseBreakdowns(section)}`;
  };

  const renderMajorChapterAddendum = () => {
    if (note.chapter === 15) {
      return `## Why Genesis 15 Goes So Deep

Genesis 15 is not just another promise chapter.

It lets us hear Abram's ache.

He has obeyed.

He has worshiped.

He has rescued Lot.

He has refused Sodom's reward.

But he still has no son.

That is why his question matters. Abram is not being fake. He brings the empty place in his life directly to God.

And God answers with the stars.

Then God answers with covenant.

The divided animals, the darkness, the birds of prey, and the smoking fire all tell us this promise is serious. God is binding Himself to what He has spoken.

This chapter also reaches forward to the Exodus. Abram's family will suffer in a land that is not theirs, but God will bring them out. The promise is bigger than one lifetime.

That is why Genesis 15 becomes so important later in the Bible. Abram believed God before Isaac was born, before circumcision, and before the law. Faith means trusting the God who speaks while the answer is still unseen.`;
    }

    if (note.chapter === 22) {
      return `## Why Genesis 22 Is The Climactic Test

Genesis 22 is the hardest test because Isaac is not just Abraham's son.

Isaac is the promised son.

He is the child born after years of waiting.

He is the laughter God turned into life.

So when God asks Abraham to offer Isaac, the test touches everything Abraham has been waiting for.

The chapter does not make obedience feel easy. It makes it feel costly.

The three-day journey gives Abraham time to think.

Isaac carrying the wood makes the scene heavier.

The question, "Where is the lamb?" brings the pain into the open.

And Abraham's answer, "God will provide," shows how far his faith has grown.

The ram in the thicket is the turning point. God provides the substitute. Isaac lives. The promise continues.

This chapter is not only about Abraham proving devotion. It is about the Lord who provides on the mountain of surrender.`;
    }

    return "";
  };

  const renderDeepTakeaways = () => `## Bible Buddy Deep Takeaways

${note.sections
  .map((section) => {
    const title = cleanSectionTitle(section.title);
    const point = section.points[0] || note.lesson;
    return `* **${title}** - ${point}`;
  })
  .join("\n\n")}

${chapterFocus.join("\n\n")}`;

  const renderCarryForward = () => `## What To Carry Forward

${chapterFocus.map((item) => `* ${item}`).join("\n\n")}`;

  const renderSection = (section: AbrahamSection) => `## ${cleanSectionTitle(section.title)}

${renderVerseCallout(section)}

${renderSectionDeepDive(section)}`;

  const makeSection = (reference: string, title: string, points: string[]): AbrahamSection => ({ reference, title, points });
  const getStudySections = (): AbrahamSection[] => {
    const sectionsByChapter: Record<number, AbrahamSection[]> = {
      11: [
        makeSection("Genesis 11:1-4", "The Tower of Babel Begins", [
          "The people of Babel are united, skilled, and organized, but their unity is bent toward pride.",
          "They want a city, a tower, and a name. That desire for self-made security becomes the world Abram will be called out of.",
        ]),
        makeSection("Genesis 11:5-9", "God Comes Down", [
          "The Lord interrupts Babel by confusing their language and scattering them across the earth.",
          "This is judgment, but it is also mercy. God stops organized pride before it becomes even more destructive.",
        ]),
        makeSection("Genesis 11:10-26", "The Story Narrows Toward Abram", [
          "After Babel scatters the nations, Genesis traces Shem's family line until Abram comes into view.",
          "The genealogy is not filler. It shows God carrying His plan through generations, names, waiting, and ordinary family history.",
        ]),
        makeSection("Genesis 11:27-30", "Abram's Family Comes Into View", [
          "Terah's family is introduced with grief, marriage, and barrenness already in the background.",
          "Sarai's barrenness is named before the promise because the coming promise will land directly on the family's impossible place.",
        ]),
        makeSection("Genesis 11:31-32", "The Journey Starts But Stops Short", [
          "Terah's household leaves Ur to go to Canaan, but they settle in Haran.",
          "Genesis 11 ends with an unfinished road, which makes Genesis 12 feel like a call to keep walking by faith.",
        ]),
      ],
      12: [
        makeSection("Genesis 12:1-3", "God Calls Abram", [
          "God calls Abram away from country, kindred, and father's house and gives promises that will shape the rest of Scripture.",
          "The contrast with Babel is clear. Babel tried to make a name; God promises to make Abram's name great.",
        ]),
        makeSection("Genesis 12:4-5", "Abram Obeys", [
          "Abram departs because the Lord has spoken. He is seventy-five, responsible for a household, and walking without the full map.",
          "Faith here is not a feeling. It is obedience with feet.",
        ]),
        makeSection("Genesis 12:6-9", "Abram Arrives in Canaan", [
          "Abram enters Canaan, sees that the Canaanite is in the land, receives land promise, and builds altars.",
          "The promise is real, but possession is not immediate. Abram worships while still living as a tent-dwelling stranger.",
        ]),
        makeSection("Genesis 12:10", "Famine Hits the Promise", [
          "A famine strikes the land after Abram obeys.",
          "This verse matters because it shows that obedience does not remove testing. The promised land still becomes a place of pressure.",
        ]),
        makeSection("Genesis 12:11-13", "Abram's Fear", [
          "Abram becomes afraid as he approaches Egypt and asks Sarai to say she is his sister.",
          "Genesis shows Abram honestly: called by God, obedient in real ways, and still capable of fear-driven compromise.",
        ]),
        makeSection("Genesis 12:14-16", "Sarai Is Taken Into Pharaoh's House", [
          "Abram's plan backfires, and Sarai is taken into Pharaoh's house while Abram receives wealth.",
          "This is spiritually uncomfortable on purpose. Fear can create danger for the people closest to us.",
        ]),
        makeSection("Genesis 12:17-20", "God Protects Sarai", [
          "The Lord intervenes with plagues, Pharaoh rebukes Abram, and Sarai is returned.",
          "The covenant is preserved because God is faithful, not because Abram handled Egypt well.",
        ]),
      ],
      13: [
        makeSection("Genesis 13:1-4", "Abram Returns to Worship", [
          "Abram comes back from Egypt to the place where he had built an altar before. After fear and failure in Egypt, the road brings him back to worship.",
          "This matters because Abraham's faith is not perfect, but he keeps returning to the Lord. The altar shows the story being re-centered after a weak moment.",
        ]),
        makeSection("Genesis 13:5-9", "Conflict Between Abram and Lot", [
          "Abram and Lot have both grown wealthy, and their households can no longer live easily in the same space.",
          "Abram chooses peace instead of control. He gives Lot the first choice because he trusts God's promise more than he trusts grabbing land for himself.",
        ]),
        makeSection("Genesis 13:10-13", "Lot Chooses by Sight", [
          "Lot sees the well-watered plain and chooses what looks best. The land looks like Eden and Egypt, but it is near Sodom.",
          "Genesis is teaching us that good-looking choices can still pull a person toward danger.",
        ]),
        makeSection("Genesis 13:14-18", "God Repeats the Promise", [
          "After Lot separates, God tells Abram to look in every direction. Abram gave up first choice, but he did not lose the promise.",
          "The chapter ends with Abram building another altar. His future is still anchored in God's word, not in Lot's decision.",
        ]),
      ],
      14: [
        makeSection("Genesis 14:1-12", "War Reaches Lot", [
          "Lot's move toward Sodom has placed him inside a dangerous world of kings, rebellion, raids, and captivity.",
          "The names and places may feel distant, but the point is close: Lot's chosen direction now has consequences.",
        ]),
        makeSection("Genesis 14:13-16", "Abram Rescues Lot", [
          "Abram does not abandon Lot. He gathers trained men from his household and moves with courage to rescue him.",
          "This shows another side of Abram's obedience. Faith can build altars, but it can also act bravely when family is in danger.",
        ]),
        makeSection("Genesis 14:17-20", "Melchizedek Blesses Abram", [
          "Melchizedek appears as both king and priest. He brings bread and wine and blesses Abram in the name of God Most High.",
          "This keeps the victory under worship. Abram's success is not treated as human greatness; it is received under God's authority.",
        ]),
        makeSection("Genesis 14:21-24", "Abram Refuses Sodom's Reward", [
          "The king of Sodom offers goods, but Abram refuses to let Sodom claim credit for his blessing.",
          "This is wisdom after victory. Abram will not let a corrupt city define the source of his future.",
        ]),
      ],
      15: [
        makeSection("Genesis 15:1-6", "Abram Believes God", [
          "God tells Abram not to fear, and Abram answers honestly about having no child.",
          "The stars become a picture of promise, and Abram believes the Lord before he can see the fulfillment.",
        ]),
        makeSection("Genesis 15:7-11", "Abram Asks About the Land", [
          "God reminds Abram that He brought him from Ur to give him the land.",
          "The animals prepare for a covenant ceremony. Ancient readers would understand that this is serious, binding promise language.",
        ]),
        makeSection("Genesis 15:12-16", "The Long Future Revealed", [
          "Abram hears that his descendants will suffer in a foreign land before they return.",
          "The promise is real, but it will move through waiting, oppression, judgment, and deliverance.",
        ]),
        makeSection("Genesis 15:17-21", "The Covenant Ceremony", [
          "God passes through the pieces as fire and smoke. Abram watches while God confirms the covenant.",
          "The land promise is named clearly. The future rests on God's commitment to His word.",
        ]),
      ],
      16: [
        makeSection("Genesis 16:1-3", "Sarai Tries to Force the Promise", [
          "Sarai is still barren, and the waiting has become painful. She gives Hagar to Abram in an attempt to build the family herself.",
          "The plan may fit ancient household practice, but Genesis shows the emotional damage it creates.",
        ]),
        makeSection("Genesis 16:4-6", "Hagar Is Mistreated", [
          "Hagar conceives, tension rises, and Sarai deals harshly with her.",
          "This is not a clean faith moment. It is a household wounded by impatience, power, shame, and fear.",
        ]),
        makeSection("Genesis 16:7-12", "God Finds Hagar", [
          "Hagar runs into the wilderness, but the angel of the Lord finds her there.",
          "God speaks to a vulnerable servant woman and names a future for her son.",
        ]),
        makeSection("Genesis 16:13-16", "The God Who Sees", [
          "Hagar names the Lord as the God who sees her.",
          "The chapter ends with Ishmael's birth, but the deeper lesson is that God sees the wounded people inside Abraham's family failure.",
        ]),
      ],
      17: [
        makeSection("Genesis 17:1-8", "Abram Becomes Abraham", [
          "God appears when Abram is ninety-nine and calls him to walk before Him.",
          "The new name Abraham means his identity must now match a promise larger than his visible life.",
        ]),
        makeSection("Genesis 17:9-14", "Circumcision as the Covenant Sign", [
          "Circumcision becomes the visible sign of the covenant in Abraham's household.",
          "The promise is not only an idea. It marks identity, family, body, and belonging.",
        ]),
        makeSection("Genesis 17:15-22", "Sarah and Isaac Are Named", [
          "God names Sarah in the promise and says Isaac will be born through her.",
          "Abraham laughs, and God still makes the promise plain. The covenant child will come through the impossible place.",
        ]),
        makeSection("Genesis 17:23-27", "Abraham Obeys That Same Day", [
          "Abraham circumcises the males of his household that same day.",
          "His obedience is immediate and public inside the household God is setting apart.",
        ]),
      ],
      18: [
        makeSection("Genesis 18:1-8", "Abraham Welcomes the Visitors", [
          "Abraham receives the visitors with urgency, food, water, shade, and honor.",
          "In the ancient world, hospitality was protection and respect, not just friendliness.",
        ]),
        makeSection("Genesis 18:9-15", "Sarah Laughs", [
          "Sarah hears the promise of a son and laughs within herself.",
          "God answers with the question that sits over the whole Abraham story: is anything too hard for the Lord?",
        ]),
        makeSection("Genesis 18:16-21", "The Lord Looks Toward Sodom", [
          "The scene turns from promise in the tent to judgment over Sodom.",
          "God draws Abraham into the moral weight of what is about to happen.",
        ]),
        makeSection("Genesis 18:22-33", "Abraham Intercedes", [
          "Abraham speaks with bold humility, asking whether the Judge of all the earth will do right.",
          "This is not bargaining with a weak God. It is intercession rooted in God's justice and mercy.",
        ]),
      ],
      19: [
        makeSection("Genesis 19:1-11", "Sodom's Violence Is Exposed", [
          "Lot is sitting in Sodom's gate, showing how deeply connected he has become to the city.",
          "The men of Sodom reveal the city's corruption through violent intent toward the visitors.",
        ]),
        makeSection("Genesis 19:12-22", "Mercy Pulls Lot Out", [
          "The messengers warn Lot, but he lingers.",
          "God's mercy has to pull him away from the place he should have left long before.",
        ]),
        makeSection("Genesis 19:23-29", "Sodom Falls", [
          "Judgment falls on Sodom and Gomorrah.",
          "Lot is rescued because God remembers Abraham, but rescue does not erase all the damage.",
        ]),
        makeSection("Genesis 19:30-38", "Lot's Family After Sodom", [
          "The final scene is dark and painful.",
          "Genesis shows what compromise has done to Lot's household without pretending the rescue made everything whole.",
        ]),
      ],
      20: [
        makeSection("Genesis 20:1-7", "Abraham Repeats the Lie", [
          "Abraham again says Sarah is his sister, this time before Abimelech.",
          "The repeated failure matters because fear can survive inside a life of real faith.",
        ]),
        makeSection("Genesis 20:8-13", "Abimelech Confronts Abraham", [
          "Abimelech responds with urgency and confronts Abraham's deception.",
          "Genesis lets the outsider see the problem clearly, which keeps Abraham from looking fake-perfect.",
        ]),
        makeSection("Genesis 20:14-18", "Sarah Is Restored", [
          "Abimelech returns Sarah and gives gifts.",
          "God heals the household, and the promise is protected even after Abraham's fear created danger.",
        ]),
      ],
      21: [
        makeSection("Genesis 21:1-7", "Isaac Is Born", [
          "God visits Sarah as He promised, and Isaac is born at the set time.",
          "The laughter of disbelief becomes the laughter of joy.",
        ]),
        makeSection("Genesis 21:8-13", "The Household Conflict Breaks Open", [
          "Isaac's celebration leads to conflict with Hagar and Ishmael.",
          "The promise line is clarified, but the family pain is real.",
        ]),
        makeSection("Genesis 21:14-21", "God Hears Ishmael", [
          "Hagar and Ishmael are sent into the wilderness, and the water runs out.",
          "God hears the boy and opens Hagar's eyes to a well. The covenant line is Isaac, but Ishmael is not invisible to God.",
        ]),
        makeSection("Genesis 21:22-34", "Abraham and Abimelech Make Peace", [
          "Abraham and Abimelech make a covenant over the well at Beersheba.",
          "Water, witness, peace, and worship all matter as Abraham continues living in the land.",
        ]),
      ],
      22: [
        makeSection("Genesis 22:1-8", "God Tests Abraham", [
          "God tests Abraham by naming Isaac, the beloved promised son.",
          "The command touches the promise itself, and Abraham begins the journey without being told how God will resolve it.",
        ]),
        makeSection("Genesis 22:9-14", "God Provides the Ram", [
          "Abraham reaches the altar, but God stops the knife.",
          "The ram becomes God's substitute provision, and Abraham names the place by what the Lord has revealed.",
        ]),
        makeSection("Genesis 22:15-19", "The Promise Is Repeated", [
          "After the test, God repeats the blessing, seed, victory, and nations promise.",
          "Abraham's obedience shows that he trusts the Giver more than the gift.",
        ]),
        makeSection("Genesis 22:20-24", "The Next Family Line Appears", [
          "The chapter ends by naming Rebekah's family line.",
          "This small genealogy prepares the way for Isaac's future wife and the next stage of the covenant story.",
        ]),
      ],
      23: [
        makeSection("Genesis 23:1-2", "Sarah Dies", [
          "Sarah dies in Hebron, and Abraham mourns and weeps for her.",
          "Genesis lets grief stand inside the promise. Faith does not make Abraham less human.",
        ]),
        makeSection("Genesis 23:3-16", "Abraham Buys the Field", [
          "Abraham negotiates publicly with the sons of Heth for a burial place.",
          "The city gate and witnesses matter because this land purchase must be legally recognized.",
        ]),
        makeSection("Genesis 23:17-20", "Machpelah Becomes Abraham's First Land", [
          "The field and cave of Machpelah become Abraham's first owned piece of Canaan.",
          "It is a burial place, so promise and grief meet in the same field.",
        ]),
      ],
      24: [
        makeSection("Genesis 24:1-9", "Abraham Sends His Servant", [
          "Abraham sends his servant to find a wife for Isaac from his own family line.",
          "Isaac must not be taken back to the old land. The covenant future must move forward.",
        ]),
        makeSection("Genesis 24:10-27", "The Prayer at the Well", [
          "The servant prays for guidance, and Rebekah appears at the well.",
          "Her kindness and strength show through ordinary action: she gives water generously.",
        ]),
        makeSection("Genesis 24:28-49", "Rebekah's Household Hears the Story", [
          "The servant tells the story carefully so the family can see God's guidance.",
          "Marriage here is personal, family-centered, and covenant-shaped.",
        ]),
        makeSection("Genesis 24:50-61", "Rebekah Chooses to Go", [
          "Rebekah is blessed and chooses to leave her home.",
          "Her journey echoes Abraham's earlier leaving: she steps toward a future she cannot fully see.",
        ]),
        makeSection("Genesis 24:62-67", "Isaac Receives Rebekah", [
          "Isaac meets Rebekah, brings her into Sarah's tent, and loves her.",
          "The covenant line continues through comfort after grief and a new household beginning.",
        ]),
      ],
      25: [
        makeSection("Genesis 25:1-6", "Abraham's Other Children", [
          "Abraham has other sons through Keturah, and Genesis names them honestly.",
          "But Isaac remains the covenant heir, so Abraham sends the other sons eastward with gifts.",
        ]),
        makeSection("Genesis 25:7-11", "Abraham Dies and Is Buried", [
          "Abraham dies full of years and is buried by Isaac and Ishmael.",
          "His story closes, but the promise continues through Isaac.",
        ]),
        makeSection("Genesis 25:12-18", "Ishmael's Line", [
          "Ishmael's descendants are listed because God kept His word about him too.",
          "The covenant line is Isaac, but Ishmael is not erased from the story.",
        ]),
        makeSection("Genesis 25:19-26", "Jacob and Esau Are Born", [
          "Rebekah is barren, Isaac prays, and twins struggle in her womb.",
          "The next generation begins with the same themes: prayer, promise, conflict, and God's choice.",
        ]),
        makeSection("Genesis 25:27-34", "Esau Sells the Birthright", [
          "Esau trades his birthright for stew.",
          "The chapter ends by showing how lightly Esau treats what should have been treasured.",
        ]),
      ],
    };
    return sectionsByChapter[note.chapter] || note.sections;
  };

  const sectionNotes = getStudySections()
    .map(renderSection)
    .join("\n\n");

  return `${cleanChapterHeading()}

${note.intro}

## Why This Chapter Matters

${note.lesson}

## Chapter Overview

${note.flow.map((item, index) => `* ${["📖", "👀", "🧬", "🏕️", "🙏"][index % 5]} ${item}`).join("\n\n")}

# Deep Chapter Notes

${sectionNotes}

${renderMajorChapterAddendum()}

${renderDeepTakeaways()}

${renderCarryForward()}

## The Big Lesson of Genesis ${note.chapter}

${note.lesson}`;
}
const GENESIS_11_DEEP_NOTES = `# Genesis 11

# The Road Before the Call

Genesis 11 is the chapter right before God calls Abram.

And that matters.

Because Abraham does not just appear out of nowhere.

Before God says, "Go," Genesis shows us the kind of world Abram is coming from.

A world full of pride.

A world trying to build its own name.

A world still broken after the flood.

A world where people want security without surrender.

And then the story narrows.

From the nations.

To one family.

To one man.

Abram.

Genesis 11 is not just background information.

It is the road before the call.

## Why Genesis 11 Matters

Genesis 11 shows us three major things.

- ðŸ™ï¸ Babel shows humanity trying to build life without God.

- ðŸ§¬ Shem's family line moves the story toward Abram.

- ðŸ›£ï¸ Terah's family starts toward Canaan but stops in Haran.

That last detail matters.

Because Genesis 12 will begin with God calling Abram to keep going.

His family started the road.

But Abram will have to walk it by faith.

# The Tower of Babel Begins

> **1** And the whole earth was of one language, and of one speech.

> **2** And it came to pass, as they journeyed from the east, that they found a plain in the land of Shinar; and they dwelt there.

> **3** And they said one to another, Go to, let us make brick, and burn them throughly. And they had brick for stone, and slime had they for morter.

> **4** And they said, Go to, let us build us a city and a tower, whose top may reach unto heaven; and let us make us a name, lest we be scattered abroad upon the face of the whole earth.

### One Language

Genesis 11 opens with humanity united.

One language.

One speech.

One people moving together.

At first, that sounds like a good thing.

Unity sounds good.

Teamwork sounds good.

But unity is only good when it is pointed in the right direction.

Here, humanity is united in pride.

They are not gathering to worship God.

They are gathering to build something without God.

### The Land of Shinar

The people settle in Shinar.

That location matters.

Shinar is connected to Babylon.

And Babylon becomes a major symbol later in the Bible.

Not just a city.

A symbol of human pride.

A symbol of rebellion.

A symbol of people trying to build greatness without surrendering to God.

So already, Genesis is showing us something.

This is not just architecture.

This is the beginning of a spiritual pattern.

### Brick Instead of Stone

Verse 3 says they made brick and used slime for mortar.

That sounds like a random construction detail, but it is not.

They are building with human-made materials.

They are organizing.

Planning.

Engineering.

Creating strength.

There is nothing wrong with building.

There is nothing wrong with technology.

There is nothing wrong with cities.

The problem is not what they are building.

The problem is why they are building it.

### "Let Us Make Us a Name"

This is the heart of Babel.

They say:

> "Let us make us a name."

That means:

- ðŸ‘‘ Let us become great.

- ðŸ™ï¸ Let us build our own security.

- ðŸ“£ Let us make sure people remember us.

- ðŸ§± Let us create something that proves who we are.

This is pride.

Not confidence.

Not leadership.

Pride.

They are trying to create identity without God.

They are trying to reach heaven on their own terms.

They are trying to secure their future without trusting the Lord.

### Why This Connects to Abraham

This line is important because Genesis 12 will answer it.

At Babel, humans say:

> "Let us make us a name."

But in Genesis 12, God says to Abram:

> "I will make thy name great."

That is the contrast.

Babel tries to take a name.

Abram receives a name from God.

Babel reaches upward in pride.

Abram will walk forward by faith.

Babel wants greatness without obedience.

Abram will learn greatness through obedience.

That is why Genesis puts these stories side by side.

# God Comes Down

> **5** And the LORD came down to see the city and the tower, which the children of men builded.

> **6** And the LORD said, Behold, the people is one, and they have all one language; and this they begin to do: and now nothing will be restrained from them, which they have imagined to do.

> **7** Go to, let us go down, and there confound their language, that they may not understand one another's speech.

> **8** So the LORD scattered them abroad from thence upon the face of all the earth: and they left off to build the city.

> **9** Therefore is the name of it called Babel; because the LORD did there confound the language of all the earth: and from thence did the LORD scatter them abroad upon the face of all the earth.

### The Lord Came Down

This is almost funny when you slow down.

The people are building a tower "to heaven."

But God has to come down to see it.

That shows how small human pride really is.

They think they are reaching heaven.

But from God's view, it is tiny.

That is how pride works.

It feels huge to us.

But before God, it is nothing.

### Why God Stops Babel

God sees that humanity is united in rebellion.

If they keep going, their pride will grow stronger.

Their false unity will harden.

Their rebellion will become organized.

So God interrupts it.

He confuses their language.

Now they cannot understand each other.

The project falls apart.

The city stops.

The people scatter.

### Was This Judgment or Mercy?

It was judgment.

But it was also mercy.

God was not just punishing them.

He was preventing their rebellion from becoming worse.

Sometimes God scatters what we are building because what we are building would destroy us.

That is a hard truth.

Babel teaches us that God is not impressed by big things built with proud hearts.

A tower can be impressive and still be rebellion.

A city can look successful and still be spiritually empty.

### What Babel Teaches Us

Babel is what happens when people try to build life around themselves.

No surrender.

No worship.

No trust.

Just ambition.

And that is why Genesis 11 matters so much.

Because right after Babel, God is going to call one man.

Abram.

And through him, God will start a different kind of story.

Not people making their own name.

God making His promise.

Not pride reaching upward.

Faith walking forward.

# The Story Narrows Toward Abram

> **10** These are the generations of Shem: Shem was an hundred years old, and begat Arphaxad two years after the flood:

> **11** And Shem lived after he begat Arphaxad five hundred years, and begat sons and daughters.

> **12** And Arphaxad lived five and thirty years, and begat Salah:

> **13** And Arphaxad lived after he begat Salah four hundred and three years, and begat sons and daughters.

> **14** And Salah lived thirty years, and begat Eber:

> **15** And Salah lived after he begat Eber four hundred and three years, and begat sons and daughters.

> **16** And Eber lived four and thirty years, and begat Peleg:

> **17** And Eber lived after he begat Peleg four hundred and thirty years, and begat sons and daughters.

> **18** And Peleg lived thirty years, and begat Reu:

> **19** And Peleg lived after he begat Reu two hundred and nine years, and begat sons and daughters.

> **20** And Reu lived two and thirty years, and begat Serug:

> **21** And Reu lived after he begat Serug two hundred and seven years, and begat sons and daughters.

> **22** And Serug lived thirty years, and begat Nahor:

> **23** And Serug lived after he begat Nahor two hundred years, and begat sons and daughters.

> **24** And Nahor lived nine and twenty years, and begat Terah:

> **25** And Nahor lived after he begat Terah an hundred and nineteen years, and begat sons and daughters.

> **26** And Terah lived seventy years, and begat Abram, Nahor, and Haran.

This section can feel boring if you read it too fast.

It is a genealogy.

Names.

Ages.

Fathers.

Sons.

Years.

But genealogies in Genesis are not filler.

They are how the Bible says:

> "God has not lost the thread."

### Verse 10 - Shem After the Flood

Verse 10 begins with Shem, one of Noah's sons.

This matters because Genesis is showing that the Abraham story grows out of the post-flood world.

The flood did not end human sin.

Babel just proved that.

But the flood also did not end God's plan.

Through Shem's line, the story keeps moving.

The phrase "begat Arphaxad" means Shem fathered Arphaxad or became his ancestor.

KJV word note: **begat** means fathered, generated, or became the ancestor of. Ancient readers understood this as covenant history being traced through real family descent.

### Verse 11 - Sons and Daughters

Verse 11 says Shem had other sons and daughters.

That phrase reminds us that the Bible is not pretending these are the only people alive.

Genesis is narrowing the camera.

Many people exist, but one line is being traced because one line will lead to Abram.

That is why genealogies are selective.

They are not random family trivia.

They are theological road maps.

### Verses 12 to 13 - Arphaxad and Salah

Arphaxad fathers Salah, and then Genesis says he lived many more years and had sons and daughters.

The pattern matters.

A father is named.

A son is named.

More children are mentioned.

Then the line moves forward.

This creates a slow rhythm of time.

Birth.

Life.

More family.

Another generation.

The promise is not rushed.

God is working through ordinary family history.

### Verses 14 to 15 - Salah and Eber

Salah fathers Eber.

Eber is important because his name is connected by many scholars to the word "Hebrew."

That does not mean every detail is simple, but ancient readers would hear the line moving toward the people who will later be known as Hebrews.

The Bible is not just giving names.

It is showing identity taking shape through generations.

### Verses 16 to 17 - Eber and Peleg

Eber fathers Peleg.

Genesis 10 already connected Peleg's days with the earth being divided.

That makes his name feel linked to a world of scattering, division, and nations spreading.

So even inside the genealogy, the memory of Babel's world is nearby.

The family line keeps moving through a divided world.

That is one of the quiet messages of Genesis 11.

The world is fractured.

But God is still guiding history.

### Verses 18 to 19 - Peleg and Reu

Peleg fathers Reu.

This is one of those verses modern readers often skip because nothing dramatic seems to happen.

But the lack of drama is part of the lesson.

God does not only work through miracles, speeches, and crisis moments.

He also works through quiet generations.

Before Abram ever builds an altar, generations of unnamed faithfulness and ordinary family life have passed.

### Verses 20 to 21 - Reu and Serug

Reu fathers Serug.

Again the pattern continues.

This repetition teaches patience.

The Bible is slowing us down enough to feel time passing.

Abram's story will be full of waiting.

But before Abram waits, the reader has already watched generations pass between Noah and Abram.

God's promises often move slower than human impatience.

But slow does not mean forgotten.

### Verses 22 to 23 - Serug and Nahor

Serug fathers Nahor.

Now the genealogy is getting closer to Abram's immediate family.

Nahor will also become a family name that appears again in Abraham's wider household.

This matters because Abraham's story will not be isolated from family networks.

Marriage, inheritance, kinship, household loyalty, and clan identity will all matter in Genesis.

Ancient people did not think of themselves mainly as individuals.

They thought in terms of household, father, land, descendants, and name.

### Verses 24 to 25 - Nahor and Terah

Nahor fathers Terah.

Now Abram's father has entered the story.

This is the final step before the camera lands on Abram.

Terah is not a throwaway name.

His choices shape the road Abram stands on.

Genesis 11 will end with Terah taking his family toward Canaan but stopping in Haran.

That means Abram's calling comes inside a family story already marked by movement and incompletion.

### Verse 26 - Abram Enters the Line

Verse 26 names Abram, Nahor, and Haran.

Now the genealogy has done its work.

The story has narrowed from the whole earth, to Babel, to Shem, to Terah, to Abram.

This verse is quiet, but it is massive.

Abram has entered the biblical story.

The next chapter will show God speaking to him directly.

### Why Genealogies Matter

After Babel, the nations are scattered.

Humanity is divided.

Languages are confused.

People are spread across the earth.

But then Genesis zooms in.

Not on a kingdom.

Not on a tower.

Not on a famous empire.

On a family line.

Shem's line.

And that line leads to Abram.

This is how Genesis works.

The story starts wide.

Creation.

Humanity.

The flood.

The nations.

Then it narrows.

One family.

One man.

One promise.

### "These Are the Generations"

This phrase matters.

In Hebrew, this connects to the word **toledot**.

It means the generations.

The family record.

The story of what came from someone.

Genesis uses this phrase to organize the book.

It tells the reader:

- ðŸ“– A new section is starting.

- ðŸ§¬ A family line is being traced.

- ðŸ›£ï¸ The story is moving forward.

So this is not just a list.

This is a bridge.

From Noah's world.

To Abraham's story.

### God Works Through Time

This genealogy also teaches patience.

God does not rush.

Generations pass.

People are born.

People die.

Names come and go.

But God is still moving.

That matters because Abraham's story will also require patience.

God will give promises that take years to unfold.

A land promise.

A seed promise.

A blessing promise.

But before Abram ever waits on God, the reader already sees that God works through long stretches of time.

God is not slow because He forgot.

God is patient because He is building something bigger than one moment.

### The Line Keeps Moving

Every name in this list is like another step toward Abram.

Shem.

Arphaxad.

Salah.

Eber.

Peleg.

Reu.

Serug.

Nahor.

Terah.

Abram.

It is easy to skip those names.

But do not miss what they represent.

God is preserving a line.

God is moving history.

God is narrowing the story.

The world may be scattered at Babel, but God is still guiding the promise forward.

# Abram's Family Comes Into View

> **27** Now these are the generations of Terah: Terah begat Abram, Nahor, and Haran; and Haran begat Lot.

> **28** And Haran died before his father Terah in the land of his nativity, in Ur of the Chaldees.

> **29** And Abram and Nahor took them wives: the name of Abram's wife was Sarai; and the name of Nahor's wife, Milcah, the daughter of Haran, the father of Milcah, and the father of Iscah.

> **30** But Sarai was barren; she had no child.

### Terah's Family

Now the story zooms in even closer.

We meet Terah.

Then his sons.

Abram.

Nahor.

Haran.

And we also meet Lot.

Lot matters because he will travel with Abram later.

That means Genesis 11 is already setting up future tension.

Lot is not random.

He will become part of Abram's journey.

Part of Abram's decisions.

Part of Abram's testing.

### Haran Dies

Verse 28 tells us Haran died before his father Terah.

That means Terah buried his own son.

Abram lost a brother.

Lot lost his father.

Before Abram is ever called by God, this family already knows grief.

That matters.

Because sometimes we read Bible characters like they are statues.

But Abram was a real man in a real family with real pain.

His story begins with loss in the background.

### Sarai Is Introduced

Then we meet Sarai.

Abram's wife.

And immediately, Genesis tells us something painful.

Sarai was barren.

She had no child.

That detail is not random.

It is one of the most important details in the entire Abraham story.

Because in Genesis 12, God will promise Abram descendants.

But Genesis 11 already told us the problem.

His wife cannot have children.

So before the promise is even spoken, the impossibility is already named.

### Why Sarai's Barrenness Matters

In that culture, barrenness was not just personal sadness.

It affected everything.

- ðŸ‘¶ No child meant no heir.

- ðŸ•ï¸ No heir meant no family future.

- ðŸ“œ No family future meant no visible path for the promise.

- ðŸ˜” It also carried deep emotional shame and grief.

So when God later promises Abram seed, the promise lands directly on the most painful place in the family.

God does not avoid the impossibility.

He speaks into it.

That is a major part of Abraham's story.

God's promise will not depend on what Abram and Sarai can naturally produce.

It will depend on what God can do.

# The Journey Starts But Stops Short

> **31** And Terah took Abram his son, and Lot the son of Haran his son's son, and Sarai his daughter in law, his son Abram's wife; and they went forth with them from Ur of the Chaldees, to go into the land of Canaan; and they came unto Haran, and dwelt there.

> **32** And the days of Terah were two hundred and five years: and Terah died in Haran.

### They Leave Ur

This is huge.

Terah takes his family and leaves Ur of the Chaldees.

Their destination is Canaan.

That should make your ears perk up.

Because Canaan is the land God will later promise to Abram.

So the road toward the promised land actually begins before Genesis 12.

Abram's family is already moving.

But they do not finish the journey.

### They Stop in Haran

Verse 31 says they came to Haran and dwelt there.

That means they settled.

They stopped.

They did not reach Canaan.

They started toward the destination, but they stopped short.

That is one of the most important ideas in Genesis 11.

The road began.

But it was unfinished.

And Genesis 12 will begin with God calling Abram to leave Haran and keep going.

### The Call Comes in an Unfinished Place

This is powerful.

God calls Abram from a place where the family journey stopped.

Abram does not begin from a clean, perfect place.

He begins from an unfinished place.

A place of grief.

A place of delay.

A place of family history.

A place between where they came from and where God is sending him.

That is often where calling begins.

Not when everything is perfect.

But when something is unfinished.

### Terah Dies in Haran

Genesis 11 ends with Terah's death.

The chapter closes with Abram still in Haran.

Not yet in Canaan.

Not yet walking fully in the promise.

Not yet hearing the famous call.

The chapter ends in waiting.

But that is exactly why Genesis 12 hits so hard.

Because after the tower falls, the nations scatter, the family line narrows, Sarai's barrenness is named, and Terah dies in Haran...

God speaks.

# KJV Words and Bible Vocabulary

### Begat

Begat means fathered or became the ancestor of.

Genesis uses this word a lot in genealogies.

It reminds us that the Bible is tracing family lines carefully.

These names matter because God's promise moves through real generations.

### Generations

Generations connects to the Hebrew idea of **toledot**.

It means family record or the story of what came from someone.

Genesis uses this phrase to move from one major section to another.

### Barren

Barren means unable to have children.

For Sarai, this was not just a medical detail.

It was emotional pain.

Social pressure.

Family uncertainty.

And a direct obstacle to God's future promise.

### Confound

Confound means confuse or mix up.

At Babel, God confounds the language of the people so they can no longer understand each other.

### Scattered

Scattered means spread out.

The people feared being scattered, but God scattered them anyway.

They wanted control.

God forced movement.

### Kindred

Kindred means extended family or relatives.

This will matter in Genesis 12 when God calls Abram to leave his country, his kindred, and his father's house.

That means Abram's obedience will not just be geographical.

It will be personal.

He will have to leave the world that shaped him.

# The Big Picture of Genesis 11

Genesis 11 is a chapter about two kinds of movement.

At Babel, people move together in pride.

With Abram's family, the story moves toward promise.

Babel says:

> "We will make ourselves great."

God says through Abram's story:

> "I will make your name great."

Babel builds upward.

Abram will walk forward.

Babel tries to avoid being scattered.

Abram will leave because God calls him.

Babel is about self-made security.

Abram's story will be about faith.

That is why Genesis 11 matters.

It sets the stage for everything that comes next.

# Bible Buddy Deep Takeaways

Genesis 11 teaches us that pride often hides behind the desire for security.

The people of Babel were afraid of being scattered, so they built a city and a tower.

But fear mixed with pride can become rebellion.

Sometimes what we call "protecting ourselves" is really us refusing to trust God.

Genesis 11 also teaches that God's plan moves through ordinary people and long family lines.

A genealogy may feel slow, but it reminds us that God works through time.

He does not forget the promise.

He does not lose track of the story.

He knows exactly where He is taking history.

Genesis 11 also shows us that God often calls people from unfinished places.

Abram's family was headed to Canaan, but they stopped in Haran.

That unfinished journey becomes the place where God's call will meet Abram.

Sometimes your calling begins in the place where your family stopped.

Sometimes God calls you to continue what never got completed before you.

And Sarai's barrenness matters too.

Because God lets us see the impossibility before He gives the promise.

That means the promise is not built on human ability.

It is built on God's faithfulness.

# What To Carry Forward From Genesis 11

Carry forward Babel.

Because Babel shows what happens when people try to build life without God.

Carry forward the contrast.

Babel says, "Let us make us a name."

God will say to Abram, "I will make thy name great."

Carry forward Sarai's barrenness.

Because the promise of descendants will land directly on the place of impossibility.

Carry forward Haran.

Because Abram's family stopped short of Canaan.

And God will call Abram to keep walking.

Carry forward the bigger story.

Genesis 11 is not the end.

It is the setup.

The nations have scattered.

The family line has narrowed.

The road has started.

The promise is about to be spoken.

And Abram is about to hear the word that changes everything.

# The Big Lesson of Genesis 11

Genesis 11 teaches that God's call often begins after human pride fails and human plans stop short.

Babel shows what people build when they want greatness without God.

Haran shows what it looks like when a journey begins but does not reach the destination.

And Abram stands between both worlds.

Behind him is Babel.

A world trying to make its own name.

Ahead of him is Canaan.

A land God will promise.

And in the middle is the call of God.

That is the setup.

Before Abram obeys, Genesis shows us what he is being called out of.

Pride.

Fear.

Delay.

Family history.

Unfinished roads.

And that is what makes Genesis 12 so powerful.

Because when God says, "Go," Abram is not just leaving a place.

He is stepping into a whole new way of trusting God.`;

const GENESIS_12_DEEP_NOTES = `# Genesis 12

# The Call That Changed Everything

Genesis 12 is one of the most important chapters in the entire Bible.

Everything changes here.

Up to this point, Genesis has focused on creation, the flood, Babel, and the nations spreading across the earth.

But now the story narrows.

From the nations.

To one man.

Abram.

And through Abram, God begins a plan that will eventually lead to Israel, David, Jesus, and blessing reaching the nations.

Genesis 12 is not just a travel story.

It is the beginning of covenant history.

## Why Genesis 12 Matters

Genesis 12 introduces the Abrahamic covenant in seed form.

God promises Abram land, descendants, blessing, a great name, and blessing for all families of the earth.

Every major storyline in Scripture eventually connects back to this moment.

This chapter also shows Abraham honestly.

He obeys with courage.

Then he fails from fear.

That mixture matters because the Bible does not introduce Abram as a flawless statue.

It introduces him as a real man learning faith while still carrying weakness.

## The Contrast With Babel

Genesis 11 ended with Babel.

People tried to make their own name.

Genesis 12 begins with God saying:

> "I will make thy name great."

That contrast matters.

- Babel is human pride reaching upward.

- Abram is faith walking forward.

- Babel tries to secure itself.

- Abram has to leave security behind.

- Babel gathers in rebellion.

- Abram walks away in obedience.

# God Calls Abram

> **1** Now the LORD had said unto Abram, Get thee out of thy country, and from thy kindred, and from thy father's house, unto a land that I will shew thee:

### "Now the LORD Had Said"

Genesis 12 begins with God's voice.

That matters because Abram's journey does not begin with Abram's ambition.

It begins with revelation.

God speaks first.

Faith is a response before it is an achievement.

Abram does not invent a spiritual mission for himself.

He is called.

### "Get Thee Out"

"Get thee out" means leave, go out, depart from what is familiar.

This is radical.

God tells Abram to leave his country, his kindred, and his father's house.

In the ancient world, those were not small categories.

Your country gave you place.

Your kindred gave you identity.

Your father's house gave you protection, inheritance, legal standing, and economic survival.

KJV word note: **kindred** means relatives, clan, or extended family network.

Abram is not just changing addresses.

He is stepping away from the social world that tells him who he is.

### "Unto a Land That I Will Shew Thee"

God does not give Abram the full map.

He says, in effect, "Go, and I will show you."

Abram does not yet know the exact shape of the future.

He does not know what it will cost.

He does not know how the promise will happen.

He only knows that God called him.

That is the beginning of biblical faith.

Faith is not always having the full blueprint.

Sometimes faith is taking the next step because God's word is enough for the next step.

# The Great Promise

> **2** And I will make of thee a great nation, and I will bless thee, and make thy name great; and thou shalt be a blessing:

> **3** And I will bless them that bless thee, and curse him that curseth thee: and in thee shall all families of the earth be blessed.

### Verse 2 - "I Will Make"

Verse 2 is built around what God will do.

God says, "I will make."

"I will bless."

"I will make thy name great."

That matters because the covenant begins with God's initiative.

Abram is called to obey, but the promise depends on God's power.

### A Great Nation

God promises to make Abram a great nation.

There is an immediate problem.

Abram has no child.

Sarai is barren.

So the promise sounds impossible from the beginning.

That is not an accident.

Genesis wants us to feel the gap between human ability and divine promise.

KJV word note: **nation** here points beyond one household. It means a people, a large descended community, a covenant people with identity and future.

### "I Will Bless Thee"

Blessing in Genesis is bigger than money.

It includes favor, fruitfulness, protection, descendants, relationship with God, and a future held by God's promise.

The Hebrew idea behind blessing is rich.

It is life under God's favor.

It is not shallow comfort.

Abram will be blessed, but he will also be tested.

So blessing does not mean an easy life.

It means a life held inside God's covenant purpose.

### "Make Thy Name Great"

This line directly answers Babel.

At Babel, humans said, "Let us make us a name."

Here God says, "I will make thy name great."

Babel tried to seize greatness through pride.

Abram receives greatness through promise.

That is a major biblical contrast.

True greatness is not grabbed from God.

It is given by God.

### Verse 3 - Blessing and Opposition

God says He will bless those who bless Abram and curse the one who dishonors him.

This shows that Abram's life is now covenantally significant.

How people respond to Abram is connected to how they respond to the God who called him.

KJV word note: **curseth** means to treat lightly, dishonor, oppose, or bring contempt against someone. The idea is not petty anger. It is covenant opposition.

### "All Families of the Earth"

This is one of the biggest lines in Genesis.

"In thee shall all families of the earth be blessed."

Abram's story is not only about Abram.

It is not only about one ethnic family.

God's plan is global.

The blessing will move outward to the nations.

The New Testament later connects this promise to Christ because Jesus comes through Abraham's line, and through Jesus blessing reaches the world.

Genesis 12 is not the narrowing of God's love.

It is the beginning of the road by which God's blessing will go wide.

# Abram Obeys

> **4** So Abram departed, as the LORD had spoken unto him; and Lot went with him: and Abram was seventy and five years old when he departed out of Haran.

> **5** And Abram took Sarai his wife, and Lot his brother's son, and all their substance that they had gathered, and the souls that they had gotten in Haran; and they went forth to go into the land of Canaan; and into the land of Canaan they came.

### Verse 4 - "So Abram Departed"

This is one of the simplest and strongest statements of obedience in the Bible.

God speaks.

Abram goes.

No debate is recorded.

No negotiation is recorded.

No demand for a full explanation is recorded.

Faith moves his feet.

### Seventy and Five Years Old

Abram is seventy-five.

That matters.

He is not a young man just starting adult life.

Leaving is harder at seventy-five.

Change is heavier.

The promise of descendants feels even more impossible.

And yet Abram still goes.

This teaches that calling is not limited to the beginning of life.

God can call people when they already have history behind them.

### Lot Went With Him

Lot is not a random travel companion.

He is Abram's nephew, the son of Haran who died in Genesis 11.

That means grief is traveling with this family.

Lot will also become part of later tension: land conflict, separation, Sodom, rescue, and painful consequences.

Genesis plants future storylines early.

### Verse 5 - Sarai, Lot, Substance, and Souls

Abram takes Sarai, Lot, their substance, and the souls they had gotten in Haran.

KJV word note: **substance** means possessions, property, livestock, wealth, and household goods.

KJV phrase note: **souls that they had gotten** refers to people attached to the household: servants, dependents, workers, and those under Abram's household care.

Abram is not traveling alone with a backpack.

He is moving as the head of a household.

This is a caravan.

Animals.

Tents.

Servants.

Family.

Supplies.

Risk.

Movement in the ancient world was slow, vulnerable, and costly.

### "Into the Land of Canaan They Came"

The verse ends with arrival.

Abram reaches Canaan.

But arrival is not possession.

That difference matters.

He is in the promised land, but he does not own it yet.

He has reached the place of promise, but the promise is still unfolding.

# Abram Arrives in Canaan

> **6** And Abram passed through the land unto the place of Sichem, unto the plain of Moreh. And the Canaanite was then in the land.

> **7** And the LORD appeared unto Abram, and said, Unto thy seed will I give this land: and there builded he an altar unto the LORD, who appeared unto him.

> **8** And he removed from thence unto a mountain on the east of Bethel, and pitched his tent, having Bethel on the west, and Hai on the east: and there he builded an altar unto the LORD, and called upon the name of the LORD.

> **9** And Abram journeyed, going on still toward the south.

### Verse 6 - Sichem and Moreh

Abram passes through the land to Sichem, also known as Shechem.

This place becomes important later in the Bible.

It sits in the central hill country of Canaan and becomes a meaningful location in Israel's memory.

KJV word note: **plain of Moreh** can also be understood as the oak or terebinth of Moreh. It likely points to a notable tree or sacred-looking landmark near Shechem.

Ancient people often associated large trees with meeting places, judgment, memory, or worship locations.

### "The Canaanite Was Then in the Land"

This line is spiritually important.

God has called Abram to Canaan.

But Canaan is already occupied.

The promise is real, but the obstacle is visible.

Abram is walking through land God promised while seeing people already established there.

That means faith begins in tension.

He has God's word, but he does not yet have possession.

### Verse 7 - "The LORD Appeared"

God appears to Abram and speaks again.

This is grace.

Abram obeyed without the full map, and God meets him inside the land.

The promise becomes more specific:

"Unto thy seed will I give this land."

KJV word note: **seed** means offspring, descendants, or family line. In Genesis, seed language is deeply covenantal because it points to the future God will bring through Abram's family.

### The Land Promise

Genesis 12:7 is the first explicit statement that the land will be given to Abram's seed.

Abram himself is still a sojourner.

His descendants will inherit what he only walks through.

That is painful and powerful.

Abram must trust God for a future he will not fully see in his lifetime.

### Abram Builds an Altar

Abram builds an altar to the LORD who appeared to him.

An altar was usually made of stone or earth.

It was a place of worship, sacrifice, gratitude, and remembrance.

Abram has no palace in Canaan.

He has no city.

He has no deed to the land.

But he builds an altar.

That means worship becomes his first permanent-looking act in the land.

### Verse 8 - Tent and Altar

Abram moves near Bethel and Hai.

He pitches his tent and builds another altar.

This creates a pattern:

- Tent means temporary living.

- Altar means worship and trust.

Abram's life in Canaan is mobile.

He is a pilgrim.

But his worship gives spiritual weight to the places he passes through.

KJV phrase note: **called upon the name of the LORD** means Abram worshiped, prayed, proclaimed, and depended on the LORD. This is public faith, not private superstition.

### Verse 9 - Journeying Toward the South

Abram keeps moving toward the south, toward the Negev region.

KJV note: **south** here points to the Negev, the dry southern region of Canaan.

This tells us Abram's obedience is not one dramatic moment and then comfort.

It is ongoing movement.

Faith keeps walking.

# Famine Hits the Promise

> **10** And there was a famine in the land: and Abram went down into Egypt to sojourn there; for the famine was grievous in the land.

### Famine in the Promised Land

This surprises people.

Abram obeyed God.

He reached Canaan.

Then famine came.

Obedience does not remove hardship.

The promised land still has testing.

KJV word note: **famine** means severe food shortage. In a land-based, livestock-based world, famine threatened survival, family, servants, and herds.

### Egypt and the Nile

Abram goes down into Egypt because Egypt was known for food stability due to the Nile River.

When Canaan suffered drought, Egypt could still produce grain.

That made Egypt a place of visible security.

Throughout the Bible, Egypt often becomes a complicated symbol of power, survival, temptation, refuge, and bondage.

Here Egypt is a test.

Abram must decide whether survival pressure will reshape his trust.

### "To Sojourn There"

KJV word note: **sojourn** means to live temporarily as a foreigner or resident alien.

Abram is not moving to Egypt permanently.

He is trying to survive the famine.

But temporary pressure can still create deep spiritual danger.

# Abram's Fear

> **11** And it came to pass, when he was come near to enter into Egypt, that he said unto Sarai his wife, Behold now, I know that thou art a fair woman to look upon:

> **12** Therefore it shall come to pass, when the Egyptians shall see thee, that they shall say, This is his wife: and they will kill me, but they will save thee alive.

> **13** Say, I pray thee, thou art my sister: that it may be well with me for thy sake; and my soul shall live because of thee.

### Verse 11 - Fear Starts Talking

As Abram nears Egypt, he begins thinking about danger.

He knows Sarai is beautiful.

KJV word note: **fair** means beautiful or pleasing in appearance.

Abram's concern is not irrational in the ancient world.

Powerful men could take what they wanted.

Foreigners were vulnerable.

Women could be treated as political or household prizes.

So Abram sees real danger.

But fear begins to lead him.

### Verse 12 - Abram Imagines the Worst

Abram says the Egyptians will kill him and spare Sarai.

This reveals his fear of powerful men.

It also reveals a collapse of trust.

God has just promised Abram descendants.

But Abram is now acting as if his survival depends only on strategy.

This is deeply human.

He believed God enough to leave Haran.

But now he struggles to trust God near Egypt.

Faith can be real and still immature.

### Verse 13 - The Sister Plan

Abram asks Sarai to say she is his sister.

Later, Genesis 20 shows there was a family connection, so this is a half-truth.

But a half-truth used to mislead is still deception.

KJV phrase note: **my soul shall live** means "my life will be spared."

Abram is trying to preserve himself.

The painful part is that Sarai bears the risk of his fear.

Genesis does not hide this.

Abram's fear puts his wife in danger.

# Sarai Taken Into Pharaoh's House

> **14** And it came to pass, that, when Abram was come into Egypt, the Egyptians beheld the woman that she was very fair.

> **15** The princes also of Pharaoh saw her, and commended her before Pharaoh: and the woman was taken into Pharaoh's house.

> **16** And he entreated Abram well for her sake: and he had sheep, and oxen, and he asses, and menservants, and maidservants, and she asses, and camels.

### Verse 14 - The Fear Comes True

The Egyptians see that Sarai is very beautiful.

Abram was right that danger existed.

But being right about danger does not make his deception faithful.

This is where Genesis gets honest.

Real danger can expose real fear.

And real fear can lead to real compromise.

### Verse 15 - Sarai Is Taken

Pharaoh's princes commend Sarai to Pharaoh, and she is taken into Pharaoh's house.

KJV word note: **commended** means praised, recommended, or spoke well of her.

This is not romantic.

It is political and dangerous.

Sarai is pulled into the house of the most powerful man in Egypt.

Abram's plan has not protected the covenant family.

It has endangered it.

### Verse 16 - Wealth With a Wound

Pharaoh treats Abram well for Sarai's sake.

Abram receives sheep, oxen, donkeys, servants, female donkeys, and camels.

KJV word note: **menservants** and **maidservants** mean male and female servants in a household.

KJV phrase note: **he asses** and **she asses** mean male and female donkeys.

Materially, Abram gains.

Spiritually, the situation is ugly.

This is not blessing in its pure form.

This is wealth tangled with compromise.

Genesis wants us to feel the discomfort.

# God Protects Sarai

> **17** And the LORD plagued Pharaoh and his house with great plagues because of Sarai Abram's wife.

> **18** And Pharaoh called Abram, and said, What is this that thou hast done unto me? why didst thou not tell me that she was thy wife?

> **19** Why saidst thou, She is my sister? so I might have taken her to me to wife: now therefore behold thy wife, take her, and go thy way.

> **20** And Pharaoh commanded his men concerning him: and they sent him away, and his wife, and all that he had.

### Verse 17 - The LORD Intervenes

Abram fails, but God protects Sarai.

That matters deeply.

The covenant does not survive because Abram performs perfectly.

The covenant survives because God is faithful.

KJV word note: **plagued** means struck or afflicted. The text does not explain the exact nature of the plagues, but it makes clear that God intervened in Pharaoh's household because Sarai was Abram's wife.

This is covenant protection.

God guards the promise even when Abram's fear creates danger.

### Verse 18 - Pharaoh Rebukes Abram

Pharaoh calls Abram and confronts him.

This is ironic.

The pagan king sees the moral problem clearly.

Abram, the man of promise, is the one being rebuked.

Genesis is not afraid of that reversal.

It teaches us that God's chosen people still need correction.

### Verse 19 - "Take Her, and Go"

Pharaoh asks why Abram said Sarai was his sister.

Then he gives Sarai back and tells Abram to go.

The words are sharp.

Abram was called by God to go from Haran.

Now he is told by Pharaoh to go from Egypt.

His obedience moved him toward promise.

His fear got him expelled from danger.

### Verse 20 - Abram Leaves Egypt

Pharaoh commands his men concerning Abram, and they send him away with Sarai and all he had.

Abram leaves Egypt wealthier materially.

But spiritually, he leaves exposed.

Genesis 12 ends with promise and failure side by side.

Blessing and weakness.

Faith and fear.

Obedience and compromise.

That mixture will shape Abram's journey.

# Bible Vocabulary and Key Words

### Kindred

Kindred means extended family, clan, or relatives.

For Abram, leaving kindred meant leaving the human network that gave him identity and protection.

### Bless

Blessing means favor, fruitfulness, protection, future, and covenant relationship with God.

In Genesis 12, blessing is not only personal comfort.

It is God's plan to bring life through Abram to the nations.

### Seed

Seed means offspring or descendants.

This word matters because Abram has no child when God promises his seed the land.

The promise begins in impossibility.

### Altar

An altar is a place of sacrifice, worship, remembrance, and encounter with God.

Abram's altars become spiritual landmarks in a land he does not yet own.

### Sojourn

To sojourn means to live temporarily as a foreigner.

Abram sojourns because he is often in places he does not fully possess.

That word captures the pilgrim feeling of Abraham's life.

### Pharaoh

Pharaoh is the title of Egypt's king.

In Genesis 12, Pharaoh represents worldly power, danger, and visible security during famine.

# The Big Picture of Genesis 12

Genesis 12 is the beginning of the Abraham story in full motion.

God calls.

Abram leaves.

God promises.

Abram worships.

Famine tests.

Fear rises.

Abram fails.

God protects.

That is a realistic beginning.

The life of faith is not presented as instant perfection.

It is presented as a journey where obedience begins, weakness is exposed, and God remains faithful.

# Bible Buddy Deep Takeaways

Genesis 12 teaches that faith often begins with leaving something familiar.

Abram had to leave comfort before he could walk into promise.

Sometimes obedience requires movement before clarity.

Genesis 12 also teaches that God's promises are bigger than human impossibilities.

Sarai is barren.

Abram is old.

And yet God promises descendants.

The future depends on God's power, not human strength.

Genesis 12 also teaches that faith and weakness can exist in the same person.

Abram obeys boldly in leaving Haran.

But he fears deeply in Egypt.

The Bible tells both truths honestly.

Spiritual growth is often uneven.

And Genesis 12 teaches that God remains faithful even when His people struggle.

Abram fails in Egypt.

But God protects Sarai.

God preserves the covenant.

God keeps the promise moving.

# The Big Lesson of Genesis 12

Genesis 12 teaches that God calls ordinary people into journeys bigger than themselves.

Abram does not fully understand the future.

He does not have the full map.

He only has God's word.

And that becomes the foundation of faith.

This chapter also teaches that promise does not remove testing.

The promised land still has famine.

Fear still appears.

Weakness still appears.

But God keeps moving the story forward anyway.

This is the moment where one man's obedience becomes the doorway into the rest of the Bible.`;

export const OBEDIENCE_OF_ABRAHAM_DEEP_NOTES = ABRAHAM_CHAPTER_NOTES.map(renderRebuiltNote);




