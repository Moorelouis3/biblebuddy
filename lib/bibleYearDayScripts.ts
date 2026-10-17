import type { BibleYearDayScript } from "./bibleYearDayScript";
import { BIBLE_YEAR_DAY_THREE_SCRIPT, BIBLE_YEAR_DAY_FOUR_SCRIPT, BIBLE_YEAR_DAY_FIVE_SCRIPT, BIBLE_YEAR_DAY_SIX_SCRIPT } from "./bibleYearDaysThreeToSixScripts";
import { BIBLE_YEAR_DAY_SEVEN_SCRIPT, BIBLE_YEAR_DAY_EIGHT_SCRIPT, BIBLE_YEAR_DAY_NINE_SCRIPT, BIBLE_YEAR_DAY_TEN_SCRIPT } from "./bibleYearDaysSevenToTenScripts";

/**
 * Every day of Bible in One Year, by number (Louis, 2026-10-17).
 *
 * The writing behind the audio and the videos lived in a map inside
 * scripts/render-bible-year-day.ts, and a second copy of the same map inside
 * scripts/render-bible-year-video.ts. Anything else that wants the words -
 * the book manuscript, for one - could not reach them without importing a
 * renderer that loads dotenv and ffmpeg on the way in. So the map lives here
 * and the renderers import it.
 *
 * Day 1 is not here: it predates this shape and is built from
 * GENESIS_DAY_ONE_CREATION_LESSON by buildDayOneSegments.
 */
import { BIBLE_YEAR_DAY_TWO_SCRIPT } from "./bibleYearDayTwoScript";
import { BIBLE_YEAR_DAY_ELEVEN_SCRIPT } from "./bibleYearDayElevenScript";
import { BIBLE_YEAR_DAY_TWELVE_SCRIPT } from "./bibleYearDayTwelveScript";
import { BIBLE_YEAR_DAY_THIRTEEN_SCRIPT } from "./bibleYearDayThirteenScript";
import { BIBLE_YEAR_DAY_FOURTEEN_SCRIPT } from "./bibleYearDayFourteenScript";
import { BIBLE_YEAR_DAY_FIFTEEN_SCRIPT } from "./bibleYearDayFifteenScript";
import { BIBLE_YEAR_DAY_SIXTEEN_SCRIPT } from "./bibleYearDaySixteenScript";
import { BIBLE_YEAR_DAY_SEVENTEEN_SCRIPT } from "./bibleYearDaySeventeenScript";
import { BIBLE_YEAR_DAY_EIGHTEEN_SCRIPT } from "./bibleYearDayEighteenScript";
import { BIBLE_YEAR_DAY_NINETEEN_SCRIPT } from "./bibleYearDayNineteenScript";
import { BIBLE_YEAR_DAY_TWENTY_SCRIPT } from "./bibleYearDayTwentyScript";
import { BIBLE_YEAR_DAY_TWENTY_ONE_SCRIPT } from "./bibleYearDayTwentyOneScript";
import { BIBLE_YEAR_DAY_TWENTY_TWO_SCRIPT } from "./bibleYearDayTwentyTwoScript";
import { BIBLE_YEAR_DAY_TWENTY_THREE_SCRIPT } from "./bibleYearDayTwentyThreeScript";
import { BIBLE_YEAR_DAY_TWENTY_FOUR_SCRIPT } from "./bibleYearDayTwentyFourScript";
import { BIBLE_YEAR_DAY_TWENTY_FIVE_SCRIPT } from "./bibleYearDayTwentyFiveScript";
import { BIBLE_YEAR_DAY_TWENTY_SIX_SCRIPT } from "./bibleYearDayTwentySixScript";
import { BIBLE_YEAR_DAY_TWENTY_SEVEN_SCRIPT } from "./bibleYearDayTwentySevenScript";
import { BIBLE_YEAR_DAY_TWENTY_EIGHT_SCRIPT } from "./bibleYearDayTwentyEightScript";
import { BIBLE_YEAR_DAY_TWENTY_NINE_SCRIPT } from "./bibleYearDayTwentyNineScript";
import { BIBLE_YEAR_DAY_THIRTY_SCRIPT } from "./bibleYearDayThirtyScript";
import { BIBLE_YEAR_DAY_THIRTY_ONE_SCRIPT } from "./bibleYearDayThirtyOneScript";
import { BIBLE_YEAR_DAY_THIRTY_TWO_SCRIPT } from "./bibleYearDayThirtyTwoScript";
import { BIBLE_YEAR_DAY_THIRTY_THREE_SCRIPT } from "./bibleYearDayThirtyThreeScript";
import { BIBLE_YEAR_DAY_THIRTY_FOUR_SCRIPT } from "./bibleYearDayThirtyFourScript";
import { BIBLE_YEAR_DAY_THIRTY_FIVE_SCRIPT } from "./bibleYearDayThirtyFiveScript";
import { BIBLE_YEAR_DAY_THIRTY_SIX_SCRIPT } from "./bibleYearDayThirtySixScript";
import { BIBLE_YEAR_DAY_THIRTY_SEVEN_SCRIPT } from "./bibleYearDayThirtySevenScript";
import { BIBLE_YEAR_DAY_THIRTY_EIGHT_SCRIPT } from "./bibleYearDayThirtyEightScript";
import { BIBLE_YEAR_DAY_THIRTY_NINE_SCRIPT } from "./bibleYearDayThirtyNineScript";
import { BIBLE_YEAR_DAY_FORTY_SCRIPT } from "./bibleYearDayFortyScript";
import { BIBLE_YEAR_DAY_FORTY_ONE_SCRIPT } from "./bibleYearDayFortyOneScript";
import { BIBLE_YEAR_DAY_FORTY_TWO_SCRIPT } from "./bibleYearDayFortyTwoScript";
import { BIBLE_YEAR_DAY_FORTY_THREE_SCRIPT } from "./bibleYearDayFortyThreeScript";
import { BIBLE_YEAR_DAY_FORTY_FOUR_SCRIPT } from "./bibleYearDayFortyFourScript";
import { BIBLE_YEAR_DAY_FORTY_FIVE_SCRIPT } from "./bibleYearDayFortyFiveScript";
import { BIBLE_YEAR_DAY_FORTY_SIX_SCRIPT } from "./bibleYearDayFortySixScript";
import { BIBLE_YEAR_DAY_FORTY_SEVEN_SCRIPT } from "./bibleYearDayFortySevenScript";
import { BIBLE_YEAR_DAY_FORTY_EIGHT_SCRIPT } from "./bibleYearDayFortyEightScript";
import { BIBLE_YEAR_DAY_FORTY_NINE_SCRIPT } from "./bibleYearDayFortyNineScript";
import { BIBLE_YEAR_DAY_FIFTY_SCRIPT } from "./bibleYearDayFiftyScript";
import { BIBLE_YEAR_DAY_FIFTY_ONE_SCRIPT } from "./bibleYearDayFiftyOneScript";
import { BIBLE_YEAR_DAY_FIFTY_TWO_SCRIPT } from "./bibleYearDayFiftyTwoScript";
import { BIBLE_YEAR_DAY_FIFTY_THREE_SCRIPT } from "./bibleYearDayFiftyThreeScript";
import { BIBLE_YEAR_DAY_FIFTY_FOUR_SCRIPT } from "./bibleYearDayFiftyFourScript";
import { BIBLE_YEAR_DAY_FIFTY_FIVE_SCRIPT } from "./bibleYearDayFiftyFiveScript";
import { BIBLE_YEAR_DAY_FIFTY_SIX_SCRIPT } from "./bibleYearDayFiftySixScript";
import { BIBLE_YEAR_DAY_FIFTY_SEVEN_SCRIPT } from "./bibleYearDayFiftySevenScript";
import { BIBLE_YEAR_DAY_FIFTY_EIGHT_SCRIPT } from "./bibleYearDayFiftyEightScript";
import { BIBLE_YEAR_DAY_FIFTY_NINE_SCRIPT } from "./bibleYearDayFiftyNineScript";
import { BIBLE_YEAR_DAY_SIXTY_SCRIPT } from "./bibleYearDaySixtyScript";
import { BIBLE_YEAR_DAY_SIXTY_ONE_SCRIPT } from "./bibleYearDaySixtyOneScript";
import { BIBLE_YEAR_DAY_SIXTY_TWO_SCRIPT } from "./bibleYearDaySixtyTwoScript";
import { BIBLE_YEAR_DAY_SIXTY_THREE_SCRIPT } from "./bibleYearDaySixtyThreeScript";
import { BIBLE_YEAR_DAY_SIXTY_FOUR_SCRIPT } from "./bibleYearDaySixtyFourScript";
import { BIBLE_YEAR_DAY_SIXTY_FIVE_SCRIPT } from "./bibleYearDaySixtyFiveScript";
import { BIBLE_YEAR_DAY_SIXTY_SIX_SCRIPT } from "./bibleYearDaySixtySixScript";
import { BIBLE_YEAR_DAY_SIXTY_SEVEN_SCRIPT } from "./bibleYearDaySixtySevenScript";
import { BIBLE_YEAR_DAY_SIXTY_EIGHT_SCRIPT } from "./bibleYearDaySixtyEightScript";
import { BIBLE_YEAR_DAY_SIXTY_NINE_SCRIPT } from "./bibleYearDaySixtyNineScript";
import { BIBLE_YEAR_DAY_SEVENTY_SCRIPT } from "./bibleYearDaySeventyScript";
import { BIBLE_YEAR_DAY_SEVENTY_ONE_SCRIPT } from "./bibleYearDaySeventyOneScript";
import { BIBLE_YEAR_DAY_SEVENTY_TWO_SCRIPT } from "./bibleYearDaySeventyTwoScript";
import { BIBLE_YEAR_DAY_SEVENTY_THREE_SCRIPT } from "./bibleYearDaySeventyThreeScript";
import { BIBLE_YEAR_DAY_SEVENTY_FOUR_SCRIPT } from "./bibleYearDaySeventyFourScript";
import { BIBLE_YEAR_DAY_SEVENTY_FIVE_SCRIPT } from "./bibleYearDaySeventyFiveScript";
import { BIBLE_YEAR_DAY_SEVENTY_SIX_SCRIPT } from "./bibleYearDaySeventySixScript";
import { BIBLE_YEAR_DAY_SEVENTY_SEVEN_SCRIPT } from "./bibleYearDaySeventySevenScript";
import { BIBLE_YEAR_DAY_SEVENTY_EIGHT_SCRIPT } from "./bibleYearDaySeventyEightScript";
import { BIBLE_YEAR_DAY_SEVENTY_NINE_SCRIPT } from "./bibleYearDaySeventyNineScript";
import { BIBLE_YEAR_DAY_EIGHTY_SCRIPT } from "./bibleYearDayEightyScript";
import { BIBLE_YEAR_DAY_EIGHTY_ONE_SCRIPT } from "./bibleYearDayEightyOneScript";
import { BIBLE_YEAR_DAY_EIGHTY_TWO_SCRIPT } from "./bibleYearDayEightyTwoScript";
import { BIBLE_YEAR_DAY_EIGHTY_THREE_SCRIPT } from "./bibleYearDayEightyThreeScript";
import { BIBLE_YEAR_DAY_EIGHTY_FOUR_SCRIPT } from "./bibleYearDayEightyFourScript";
import { BIBLE_YEAR_DAY_EIGHTY_FIVE_SCRIPT } from "./bibleYearDayEightyFiveScript";
import { BIBLE_YEAR_DAY_EIGHTY_SIX_SCRIPT } from "./bibleYearDayEightySixScript";
import { BIBLE_YEAR_DAY_EIGHTY_SEVEN_SCRIPT } from "./bibleYearDayEightySevenScript";
import { BIBLE_YEAR_DAY_EIGHTY_EIGHT_SCRIPT } from "./bibleYearDayEightyEightScript";
import { BIBLE_YEAR_DAY_EIGHTY_NINE_SCRIPT } from "./bibleYearDayEightyNineScript";
import { BIBLE_YEAR_DAY_NINETY_SCRIPT } from "./bibleYearDayNinetyScript";
import { BIBLE_YEAR_DAY_NINETY_ONE_SCRIPT } from "./bibleYearDayNinetyOneScript";
import { BIBLE_YEAR_DAY_NINETY_TWO_SCRIPT } from "./bibleYearDayNinetyTwoScript";
import { BIBLE_YEAR_DAY_NINETY_THREE_SCRIPT } from "./bibleYearDayNinetyThreeScript";
import { BIBLE_YEAR_DAY_NINETY_FOUR_SCRIPT } from "./bibleYearDayNinetyFourScript";
import { BIBLE_YEAR_DAY_NINETY_FIVE_SCRIPT } from "./bibleYearDayNinetyFiveScript";
import { BIBLE_YEAR_DAY_NINETY_SIX_SCRIPT } from "./bibleYearDayNinetySixScript";
import { BIBLE_YEAR_DAY_NINETY_SEVEN_SCRIPT } from "./bibleYearDayNinetySevenScript";
import { BIBLE_YEAR_DAY_NINETY_EIGHT_SCRIPT } from "./bibleYearDayNinetyEightScript";
import { BIBLE_YEAR_DAY_NINETY_NINE_SCRIPT } from "./bibleYearDayNinetyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SCRIPT } from "./bibleYearDayOneHundredScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_ONE_SCRIPT } from "./bibleYearDayOneHundredOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWO_SCRIPT } from "./bibleYearDayOneHundredTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THREE_SCRIPT } from "./bibleYearDayOneHundredThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FOUR_SCRIPT } from "./bibleYearDayOneHundredFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIVE_SCRIPT } from "./bibleYearDayOneHundredFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIX_SCRIPT } from "./bibleYearDayOneHundredSixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVEN_SCRIPT } from "./bibleYearDayOneHundredSevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHT_SCRIPT } from "./bibleYearDayOneHundredEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINE_SCRIPT } from "./bibleYearDayOneHundredNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TEN_SCRIPT } from "./bibleYearDayOneHundredTenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_ELEVEN_SCRIPT } from "./bibleYearDayOneHundredElevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWELVE_SCRIPT } from "./bibleYearDayOneHundredTwelveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTEEN_SCRIPT } from "./bibleYearDayOneHundredThirteenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FOURTEEN_SCRIPT } from "./bibleYearDayOneHundredFourteenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTEEN_SCRIPT } from "./bibleYearDayOneHundredFifteenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTEEN_SCRIPT } from "./bibleYearDayOneHundredSixteenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTEEN_SCRIPT } from "./bibleYearDayOneHundredSeventeenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTEEN_SCRIPT } from "./bibleYearDayOneHundredEighteenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETEEN_SCRIPT } from "./bibleYearDayOneHundredNineteenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SCRIPT } from "./bibleYearDayOneHundredTwentyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_ONE_SCRIPT } from "./bibleYearDayOneHundredTwentyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_TWO_SCRIPT } from "./bibleYearDayOneHundredTwentyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_THREE_SCRIPT } from "./bibleYearDayOneHundredTwentyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_FOUR_SCRIPT } from "./bibleYearDayOneHundredTwentyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_FIVE_SCRIPT } from "./bibleYearDayOneHundredTwentyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SIX_SCRIPT } from "./bibleYearDayOneHundredTwentySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredTwentySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredTwentyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_NINE_SCRIPT } from "./bibleYearDayOneHundredTwentyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SCRIPT } from "./bibleYearDayOneHundredThirtyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_ONE_SCRIPT } from "./bibleYearDayOneHundredThirtyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_TWO_SCRIPT } from "./bibleYearDayOneHundredThirtyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_THREE_SCRIPT } from "./bibleYearDayOneHundredThirtyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_FOUR_SCRIPT } from "./bibleYearDayOneHundredThirtyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_FIVE_SCRIPT } from "./bibleYearDayOneHundredThirtyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SIX_SCRIPT } from "./bibleYearDayOneHundredThirtySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredThirtySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredThirtyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_NINE_SCRIPT } from "./bibleYearDayOneHundredThirtyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SCRIPT } from "./bibleYearDayOneHundredFortyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_ONE_SCRIPT } from "./bibleYearDayOneHundredFortyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_TWO_SCRIPT } from "./bibleYearDayOneHundredFortyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_THREE_SCRIPT } from "./bibleYearDayOneHundredFortyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_FOUR_SCRIPT } from "./bibleYearDayOneHundredFortyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_FIVE_SCRIPT } from "./bibleYearDayOneHundredFortyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SIX_SCRIPT } from "./bibleYearDayOneHundredFortySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredFortySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredFortyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_NINE_SCRIPT } from "./bibleYearDayOneHundredFortyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SCRIPT } from "./bibleYearDayOneHundredFiftyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_ONE_SCRIPT } from "./bibleYearDayOneHundredFiftyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_TWO_SCRIPT } from "./bibleYearDayOneHundredFiftyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_THREE_SCRIPT } from "./bibleYearDayOneHundredFiftyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_FOUR_SCRIPT } from "./bibleYearDayOneHundredFiftyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_FIVE_SCRIPT } from "./bibleYearDayOneHundredFiftyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SIX_SCRIPT } from "./bibleYearDayOneHundredFiftySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredFiftySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredFiftyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_NINE_SCRIPT } from "./bibleYearDayOneHundredFiftyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SCRIPT } from "./bibleYearDayOneHundredSixtyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_ONE_SCRIPT } from "./bibleYearDayOneHundredSixtyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_TWO_SCRIPT } from "./bibleYearDayOneHundredSixtyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_THREE_SCRIPT } from "./bibleYearDayOneHundredSixtyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_FOUR_SCRIPT } from "./bibleYearDayOneHundredSixtyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_FIVE_SCRIPT } from "./bibleYearDayOneHundredSixtyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SIX_SCRIPT } from "./bibleYearDayOneHundredSixtySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredSixtySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredSixtyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_NINE_SCRIPT } from "./bibleYearDayOneHundredSixtyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SCRIPT } from "./bibleYearDayOneHundredSeventyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_ONE_SCRIPT } from "./bibleYearDayOneHundredSeventyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_TWO_SCRIPT } from "./bibleYearDayOneHundredSeventyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_THREE_SCRIPT } from "./bibleYearDayOneHundredSeventyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_FOUR_SCRIPT } from "./bibleYearDayOneHundredSeventyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_FIVE_SCRIPT } from "./bibleYearDayOneHundredSeventyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SIX_SCRIPT } from "./bibleYearDayOneHundredSeventySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredSeventySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredSeventyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_NINE_SCRIPT } from "./bibleYearDayOneHundredSeventyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SCRIPT } from "./bibleYearDayOneHundredEightyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_ONE_SCRIPT } from "./bibleYearDayOneHundredEightyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_TWO_SCRIPT } from "./bibleYearDayOneHundredEightyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_THREE_SCRIPT } from "./bibleYearDayOneHundredEightyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_FOUR_SCRIPT } from "./bibleYearDayOneHundredEightyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_FIVE_SCRIPT } from "./bibleYearDayOneHundredEightyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SIX_SCRIPT } from "./bibleYearDayOneHundredEightySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredEightySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredEightyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_NINE_SCRIPT } from "./bibleYearDayOneHundredEightyNineScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SCRIPT } from "./bibleYearDayOneHundredNinetyScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_ONE_SCRIPT } from "./bibleYearDayOneHundredNinetyOneScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_TWO_SCRIPT } from "./bibleYearDayOneHundredNinetyTwoScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_THREE_SCRIPT } from "./bibleYearDayOneHundredNinetyThreeScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_FOUR_SCRIPT } from "./bibleYearDayOneHundredNinetyFourScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_FIVE_SCRIPT } from "./bibleYearDayOneHundredNinetyFiveScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SIX_SCRIPT } from "./bibleYearDayOneHundredNinetySixScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SEVEN_SCRIPT } from "./bibleYearDayOneHundredNinetySevenScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_EIGHT_SCRIPT } from "./bibleYearDayOneHundredNinetyEightScript";
import { BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_NINE_SCRIPT } from "./bibleYearDayOneHundredNinetyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SCRIPT } from "./bibleYearDayTwoHundredScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_ONE_SCRIPT } from "./bibleYearDayTwoHundredOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWO_SCRIPT } from "./bibleYearDayTwoHundredTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THREE_SCRIPT } from "./bibleYearDayTwoHundredThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FOUR_SCRIPT } from "./bibleYearDayTwoHundredFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIVE_SCRIPT } from "./bibleYearDayTwoHundredFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIX_SCRIPT } from "./bibleYearDayTwoHundredSixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredSevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINE_SCRIPT } from "./bibleYearDayTwoHundredNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TEN_SCRIPT } from "./bibleYearDayTwoHundredTenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_ELEVEN_SCRIPT } from "./bibleYearDayTwoHundredElevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWELVE_SCRIPT } from "./bibleYearDayTwoHundredTwelveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTEEN_SCRIPT } from "./bibleYearDayTwoHundredThirteenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FOURTEEN_SCRIPT } from "./bibleYearDayTwoHundredFourteenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTEEN_SCRIPT } from "./bibleYearDayTwoHundredFifteenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTEEN_SCRIPT } from "./bibleYearDayTwoHundredSixteenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTEEN_SCRIPT } from "./bibleYearDayTwoHundredSeventeenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTEEN_SCRIPT } from "./bibleYearDayTwoHundredEighteenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETEEN_SCRIPT } from "./bibleYearDayTwoHundredNineteenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SCRIPT } from "./bibleYearDayTwoHundredTwentyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_ONE_SCRIPT } from "./bibleYearDayTwoHundredTwentyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_TWO_SCRIPT } from "./bibleYearDayTwoHundredTwentyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_THREE_SCRIPT } from "./bibleYearDayTwoHundredTwentyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredTwentyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredTwentyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SIX_SCRIPT } from "./bibleYearDayTwoHundredTwentySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredTwentySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredTwentyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_NINE_SCRIPT } from "./bibleYearDayTwoHundredTwentyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SCRIPT } from "./bibleYearDayTwoHundredThirtyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_ONE_SCRIPT } from "./bibleYearDayTwoHundredThirtyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_TWO_SCRIPT } from "./bibleYearDayTwoHundredThirtyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_THREE_SCRIPT } from "./bibleYearDayTwoHundredThirtyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredThirtyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredThirtyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SIX_SCRIPT } from "./bibleYearDayTwoHundredThirtySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredThirtySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredThirtyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_NINE_SCRIPT } from "./bibleYearDayTwoHundredThirtyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SCRIPT } from "./bibleYearDayTwoHundredFortyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_ONE_SCRIPT } from "./bibleYearDayTwoHundredFortyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_TWO_SCRIPT } from "./bibleYearDayTwoHundredFortyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_THREE_SCRIPT } from "./bibleYearDayTwoHundredFortyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredFortyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredFortyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SIX_SCRIPT } from "./bibleYearDayTwoHundredFortySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredFortySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredFortyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_NINE_SCRIPT } from "./bibleYearDayTwoHundredFortyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SCRIPT } from "./bibleYearDayTwoHundredFiftyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_ONE_SCRIPT } from "./bibleYearDayTwoHundredFiftyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_TWO_SCRIPT } from "./bibleYearDayTwoHundredFiftyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_THREE_SCRIPT } from "./bibleYearDayTwoHundredFiftyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredFiftyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredFiftyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SIX_SCRIPT } from "./bibleYearDayTwoHundredFiftySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredFiftySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredFiftyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_NINE_SCRIPT } from "./bibleYearDayTwoHundredFiftyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SCRIPT } from "./bibleYearDayTwoHundredSixtyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_ONE_SCRIPT } from "./bibleYearDayTwoHundredSixtyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_TWO_SCRIPT } from "./bibleYearDayTwoHundredSixtyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_THREE_SCRIPT } from "./bibleYearDayTwoHundredSixtyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredSixtyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredSixtyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SIX_SCRIPT } from "./bibleYearDayTwoHundredSixtySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredSixtySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredSixtyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_NINE_SCRIPT } from "./bibleYearDayTwoHundredSixtyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SCRIPT } from "./bibleYearDayTwoHundredSeventyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_ONE_SCRIPT } from "./bibleYearDayTwoHundredSeventyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_TWO_SCRIPT } from "./bibleYearDayTwoHundredSeventyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_THREE_SCRIPT } from "./bibleYearDayTwoHundredSeventyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredSeventyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredSeventyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SIX_SCRIPT } from "./bibleYearDayTwoHundredSeventySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredSeventySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredSeventyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_NINE_SCRIPT } from "./bibleYearDayTwoHundredSeventyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SCRIPT } from "./bibleYearDayTwoHundredEightyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_ONE_SCRIPT } from "./bibleYearDayTwoHundredEightyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_TWO_SCRIPT } from "./bibleYearDayTwoHundredEightyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_THREE_SCRIPT } from "./bibleYearDayTwoHundredEightyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredEightyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredEightyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SIX_SCRIPT } from "./bibleYearDayTwoHundredEightySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredEightySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredEightyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_NINE_SCRIPT } from "./bibleYearDayTwoHundredEightyNineScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SCRIPT } from "./bibleYearDayTwoHundredNinetyScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_ONE_SCRIPT } from "./bibleYearDayTwoHundredNinetyOneScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_TWO_SCRIPT } from "./bibleYearDayTwoHundredNinetyTwoScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_THREE_SCRIPT } from "./bibleYearDayTwoHundredNinetyThreeScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_FOUR_SCRIPT } from "./bibleYearDayTwoHundredNinetyFourScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_FIVE_SCRIPT } from "./bibleYearDayTwoHundredNinetyFiveScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SIX_SCRIPT } from "./bibleYearDayTwoHundredNinetySixScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SEVEN_SCRIPT } from "./bibleYearDayTwoHundredNinetySevenScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_EIGHT_SCRIPT } from "./bibleYearDayTwoHundredNinetyEightScript";
import { BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_NINE_SCRIPT } from "./bibleYearDayTwoHundredNinetyNineScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SCRIPT } from "./bibleYearDayThreeHundredScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_ONE_SCRIPT } from "./bibleYearDayThreeHundredOneScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWO_SCRIPT } from "./bibleYearDayThreeHundredTwoScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THREE_SCRIPT } from "./bibleYearDayThreeHundredThreeScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FOUR_SCRIPT } from "./bibleYearDayThreeHundredFourScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIVE_SCRIPT } from "./bibleYearDayThreeHundredFiveScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIX_SCRIPT } from "./bibleYearDayThreeHundredSixScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SEVEN_SCRIPT } from "./bibleYearDayThreeHundredSevenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_EIGHT_SCRIPT } from "./bibleYearDayThreeHundredEightScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_NINE_SCRIPT } from "./bibleYearDayThreeHundredNineScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TEN_SCRIPT } from "./bibleYearDayThreeHundredTenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_ELEVEN_SCRIPT } from "./bibleYearDayThreeHundredElevenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWELVE_SCRIPT } from "./bibleYearDayThreeHundredTwelveScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTEEN_SCRIPT } from "./bibleYearDayThreeHundredThirteenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FOURTEEN_SCRIPT } from "./bibleYearDayThreeHundredFourteenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTEEN_SCRIPT } from "./bibleYearDayThreeHundredFifteenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTEEN_SCRIPT } from "./bibleYearDayThreeHundredSixteenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SEVENTEEN_SCRIPT } from "./bibleYearDayThreeHundredSeventeenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_EIGHTEEN_SCRIPT } from "./bibleYearDayThreeHundredEighteenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_NINETEEN_SCRIPT } from "./bibleYearDayThreeHundredNineteenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SCRIPT } from "./bibleYearDayThreeHundredTwentyScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_ONE_SCRIPT } from "./bibleYearDayThreeHundredTwentyOneScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_TWO_SCRIPT } from "./bibleYearDayThreeHundredTwentyTwoScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_THREE_SCRIPT } from "./bibleYearDayThreeHundredTwentyThreeScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_FOUR_SCRIPT } from "./bibleYearDayThreeHundredTwentyFourScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_FIVE_SCRIPT } from "./bibleYearDayThreeHundredTwentyFiveScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SIX_SCRIPT } from "./bibleYearDayThreeHundredTwentySixScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SEVEN_SCRIPT } from "./bibleYearDayThreeHundredTwentySevenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_EIGHT_SCRIPT } from "./bibleYearDayThreeHundredTwentyEightScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_NINE_SCRIPT } from "./bibleYearDayThreeHundredTwentyNineScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SCRIPT } from "./bibleYearDayThreeHundredThirtyScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_ONE_SCRIPT } from "./bibleYearDayThreeHundredThirtyOneScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_TWO_SCRIPT } from "./bibleYearDayThreeHundredThirtyTwoScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_THREE_SCRIPT } from "./bibleYearDayThreeHundredThirtyThreeScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_FOUR_SCRIPT } from "./bibleYearDayThreeHundredThirtyFourScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_FIVE_SCRIPT } from "./bibleYearDayThreeHundredThirtyFiveScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SIX_SCRIPT } from "./bibleYearDayThreeHundredThirtySixScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SEVEN_SCRIPT } from "./bibleYearDayThreeHundredThirtySevenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_EIGHT_SCRIPT } from "./bibleYearDayThreeHundredThirtyEightScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_NINE_SCRIPT } from "./bibleYearDayThreeHundredThirtyNineScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SCRIPT } from "./bibleYearDayThreeHundredFortyScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_ONE_SCRIPT } from "./bibleYearDayThreeHundredFortyOneScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_TWO_SCRIPT } from "./bibleYearDayThreeHundredFortyTwoScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_THREE_SCRIPT } from "./bibleYearDayThreeHundredFortyThreeScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_FOUR_SCRIPT } from "./bibleYearDayThreeHundredFortyFourScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_FIVE_SCRIPT } from "./bibleYearDayThreeHundredFortyFiveScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SIX_SCRIPT } from "./bibleYearDayThreeHundredFortySixScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SEVEN_SCRIPT } from "./bibleYearDayThreeHundredFortySevenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_EIGHT_SCRIPT } from "./bibleYearDayThreeHundredFortyEightScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_NINE_SCRIPT } from "./bibleYearDayThreeHundredFortyNineScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SCRIPT } from "./bibleYearDayThreeHundredFiftyScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_ONE_SCRIPT } from "./bibleYearDayThreeHundredFiftyOneScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_TWO_SCRIPT } from "./bibleYearDayThreeHundredFiftyTwoScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_THREE_SCRIPT } from "./bibleYearDayThreeHundredFiftyThreeScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_FOUR_SCRIPT } from "./bibleYearDayThreeHundredFiftyFourScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_FIVE_SCRIPT } from "./bibleYearDayThreeHundredFiftyFiveScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SIX_SCRIPT } from "./bibleYearDayThreeHundredFiftySixScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SEVEN_SCRIPT } from "./bibleYearDayThreeHundredFiftySevenScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_EIGHT_SCRIPT } from "./bibleYearDayThreeHundredFiftyEightScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_NINE_SCRIPT } from "./bibleYearDayThreeHundredFiftyNineScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_SCRIPT } from "./bibleYearDayThreeHundredSixtyScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_ONE_SCRIPT } from "./bibleYearDayThreeHundredSixtyOneScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_TWO_SCRIPT } from "./bibleYearDayThreeHundredSixtyTwoScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_THREE_SCRIPT } from "./bibleYearDayThreeHundredSixtyThreeScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_FOUR_SCRIPT } from "./bibleYearDayThreeHundredSixtyFourScript";
import { BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_FIVE_SCRIPT } from "./bibleYearDayThreeHundredSixtyFiveScript";

export const DAY_SCRIPTS: Record<number, BibleYearDayScript> = {
  2: BIBLE_YEAR_DAY_TWO_SCRIPT,
  3: BIBLE_YEAR_DAY_THREE_SCRIPT,
  4: BIBLE_YEAR_DAY_FOUR_SCRIPT,
  5: BIBLE_YEAR_DAY_FIVE_SCRIPT,
  6: BIBLE_YEAR_DAY_SIX_SCRIPT,
  7: BIBLE_YEAR_DAY_SEVEN_SCRIPT,
  8: BIBLE_YEAR_DAY_EIGHT_SCRIPT,
  9: BIBLE_YEAR_DAY_NINE_SCRIPT,
  10: BIBLE_YEAR_DAY_TEN_SCRIPT,
  11: BIBLE_YEAR_DAY_ELEVEN_SCRIPT,
  12: BIBLE_YEAR_DAY_TWELVE_SCRIPT,
  13: BIBLE_YEAR_DAY_THIRTEEN_SCRIPT,
  14: BIBLE_YEAR_DAY_FOURTEEN_SCRIPT,
  15: BIBLE_YEAR_DAY_FIFTEEN_SCRIPT,
  16: BIBLE_YEAR_DAY_SIXTEEN_SCRIPT,
  17: BIBLE_YEAR_DAY_SEVENTEEN_SCRIPT,
  18: BIBLE_YEAR_DAY_EIGHTEEN_SCRIPT,
  19: BIBLE_YEAR_DAY_NINETEEN_SCRIPT,
  20: BIBLE_YEAR_DAY_TWENTY_SCRIPT,
  21: BIBLE_YEAR_DAY_TWENTY_ONE_SCRIPT,
  22: BIBLE_YEAR_DAY_TWENTY_TWO_SCRIPT,
  23: BIBLE_YEAR_DAY_TWENTY_THREE_SCRIPT,
  24: BIBLE_YEAR_DAY_TWENTY_FOUR_SCRIPT,
  25: BIBLE_YEAR_DAY_TWENTY_FIVE_SCRIPT,
  26: BIBLE_YEAR_DAY_TWENTY_SIX_SCRIPT,
  27: BIBLE_YEAR_DAY_TWENTY_SEVEN_SCRIPT,
  28: BIBLE_YEAR_DAY_TWENTY_EIGHT_SCRIPT,
  29: BIBLE_YEAR_DAY_TWENTY_NINE_SCRIPT,
  30: BIBLE_YEAR_DAY_THIRTY_SCRIPT,
  31: BIBLE_YEAR_DAY_THIRTY_ONE_SCRIPT,
  32: BIBLE_YEAR_DAY_THIRTY_TWO_SCRIPT,
  33: BIBLE_YEAR_DAY_THIRTY_THREE_SCRIPT,
  34: BIBLE_YEAR_DAY_THIRTY_FOUR_SCRIPT,
  35: BIBLE_YEAR_DAY_THIRTY_FIVE_SCRIPT,
  36: BIBLE_YEAR_DAY_THIRTY_SIX_SCRIPT,
  37: BIBLE_YEAR_DAY_THIRTY_SEVEN_SCRIPT,
  38: BIBLE_YEAR_DAY_THIRTY_EIGHT_SCRIPT,
  39: BIBLE_YEAR_DAY_THIRTY_NINE_SCRIPT,
  40: BIBLE_YEAR_DAY_FORTY_SCRIPT,
  41: BIBLE_YEAR_DAY_FORTY_ONE_SCRIPT,
  42: BIBLE_YEAR_DAY_FORTY_TWO_SCRIPT,
  43: BIBLE_YEAR_DAY_FORTY_THREE_SCRIPT,
  44: BIBLE_YEAR_DAY_FORTY_FOUR_SCRIPT,
  45: BIBLE_YEAR_DAY_FORTY_FIVE_SCRIPT,
  46: BIBLE_YEAR_DAY_FORTY_SIX_SCRIPT,
  47: BIBLE_YEAR_DAY_FORTY_SEVEN_SCRIPT,
  48: BIBLE_YEAR_DAY_FORTY_EIGHT_SCRIPT,
  49: BIBLE_YEAR_DAY_FORTY_NINE_SCRIPT,
  50: BIBLE_YEAR_DAY_FIFTY_SCRIPT,
  51: BIBLE_YEAR_DAY_FIFTY_ONE_SCRIPT,
  52: BIBLE_YEAR_DAY_FIFTY_TWO_SCRIPT,
  53: BIBLE_YEAR_DAY_FIFTY_THREE_SCRIPT,
  54: BIBLE_YEAR_DAY_FIFTY_FOUR_SCRIPT,
  55: BIBLE_YEAR_DAY_FIFTY_FIVE_SCRIPT,
  56: BIBLE_YEAR_DAY_FIFTY_SIX_SCRIPT,
  57: BIBLE_YEAR_DAY_FIFTY_SEVEN_SCRIPT,
  58: BIBLE_YEAR_DAY_FIFTY_EIGHT_SCRIPT,
  59: BIBLE_YEAR_DAY_FIFTY_NINE_SCRIPT,
  60: BIBLE_YEAR_DAY_SIXTY_SCRIPT,
  61: BIBLE_YEAR_DAY_SIXTY_ONE_SCRIPT,
  62: BIBLE_YEAR_DAY_SIXTY_TWO_SCRIPT,
  63: BIBLE_YEAR_DAY_SIXTY_THREE_SCRIPT,
  64: BIBLE_YEAR_DAY_SIXTY_FOUR_SCRIPT,
  65: BIBLE_YEAR_DAY_SIXTY_FIVE_SCRIPT,
  66: BIBLE_YEAR_DAY_SIXTY_SIX_SCRIPT,
  67: BIBLE_YEAR_DAY_SIXTY_SEVEN_SCRIPT,
  68: BIBLE_YEAR_DAY_SIXTY_EIGHT_SCRIPT,
  69: BIBLE_YEAR_DAY_SIXTY_NINE_SCRIPT,
  70: BIBLE_YEAR_DAY_SEVENTY_SCRIPT,
  71: BIBLE_YEAR_DAY_SEVENTY_ONE_SCRIPT,
  72: BIBLE_YEAR_DAY_SEVENTY_TWO_SCRIPT,
  73: BIBLE_YEAR_DAY_SEVENTY_THREE_SCRIPT,
  74: BIBLE_YEAR_DAY_SEVENTY_FOUR_SCRIPT,
  75: BIBLE_YEAR_DAY_SEVENTY_FIVE_SCRIPT,
  76: BIBLE_YEAR_DAY_SEVENTY_SIX_SCRIPT,
  77: BIBLE_YEAR_DAY_SEVENTY_SEVEN_SCRIPT,
  78: BIBLE_YEAR_DAY_SEVENTY_EIGHT_SCRIPT,
  79: BIBLE_YEAR_DAY_SEVENTY_NINE_SCRIPT,
  80: BIBLE_YEAR_DAY_EIGHTY_SCRIPT,
  81: BIBLE_YEAR_DAY_EIGHTY_ONE_SCRIPT,
  82: BIBLE_YEAR_DAY_EIGHTY_TWO_SCRIPT,
  83: BIBLE_YEAR_DAY_EIGHTY_THREE_SCRIPT,
  84: BIBLE_YEAR_DAY_EIGHTY_FOUR_SCRIPT,
  85: BIBLE_YEAR_DAY_EIGHTY_FIVE_SCRIPT,
  86: BIBLE_YEAR_DAY_EIGHTY_SIX_SCRIPT,
  87: BIBLE_YEAR_DAY_EIGHTY_SEVEN_SCRIPT,
  88: BIBLE_YEAR_DAY_EIGHTY_EIGHT_SCRIPT,
  89: BIBLE_YEAR_DAY_EIGHTY_NINE_SCRIPT,
  90: BIBLE_YEAR_DAY_NINETY_SCRIPT,
  91: BIBLE_YEAR_DAY_NINETY_ONE_SCRIPT,
  92: BIBLE_YEAR_DAY_NINETY_TWO_SCRIPT,
  93: BIBLE_YEAR_DAY_NINETY_THREE_SCRIPT,
  94: BIBLE_YEAR_DAY_NINETY_FOUR_SCRIPT,
  95: BIBLE_YEAR_DAY_NINETY_FIVE_SCRIPT,
  96: BIBLE_YEAR_DAY_NINETY_SIX_SCRIPT,
  97: BIBLE_YEAR_DAY_NINETY_SEVEN_SCRIPT,
  98: BIBLE_YEAR_DAY_NINETY_EIGHT_SCRIPT,
  99: BIBLE_YEAR_DAY_NINETY_NINE_SCRIPT,
  100: BIBLE_YEAR_DAY_ONE_HUNDRED_SCRIPT,
  101: BIBLE_YEAR_DAY_ONE_HUNDRED_ONE_SCRIPT,
  102: BIBLE_YEAR_DAY_ONE_HUNDRED_TWO_SCRIPT,
  103: BIBLE_YEAR_DAY_ONE_HUNDRED_THREE_SCRIPT,
  104: BIBLE_YEAR_DAY_ONE_HUNDRED_FOUR_SCRIPT,
  105: BIBLE_YEAR_DAY_ONE_HUNDRED_FIVE_SCRIPT,
  106: BIBLE_YEAR_DAY_ONE_HUNDRED_SIX_SCRIPT,
  107: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVEN_SCRIPT,
  108: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHT_SCRIPT,
  109: BIBLE_YEAR_DAY_ONE_HUNDRED_NINE_SCRIPT,
  110: BIBLE_YEAR_DAY_ONE_HUNDRED_TEN_SCRIPT,
  111: BIBLE_YEAR_DAY_ONE_HUNDRED_ELEVEN_SCRIPT,
  112: BIBLE_YEAR_DAY_ONE_HUNDRED_TWELVE_SCRIPT,
  113: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTEEN_SCRIPT,
  114: BIBLE_YEAR_DAY_ONE_HUNDRED_FOURTEEN_SCRIPT,
  115: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTEEN_SCRIPT,
  116: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTEEN_SCRIPT,
  117: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTEEN_SCRIPT,
  118: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTEEN_SCRIPT,
  119: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETEEN_SCRIPT,
  120: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SCRIPT,
  121: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_ONE_SCRIPT,
  122: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_TWO_SCRIPT,
  123: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_THREE_SCRIPT,
  124: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_FOUR_SCRIPT,
  125: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_FIVE_SCRIPT,
  126: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SIX_SCRIPT,
  127: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_SEVEN_SCRIPT,
  128: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_EIGHT_SCRIPT,
  129: BIBLE_YEAR_DAY_ONE_HUNDRED_TWENTY_NINE_SCRIPT,
  130: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SCRIPT,
  131: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_ONE_SCRIPT,
  132: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_TWO_SCRIPT,
  133: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_THREE_SCRIPT,
  134: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_FOUR_SCRIPT,
  135: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_FIVE_SCRIPT,
  136: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SIX_SCRIPT,
  137: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_SEVEN_SCRIPT,
  138: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_EIGHT_SCRIPT,
  139: BIBLE_YEAR_DAY_ONE_HUNDRED_THIRTY_NINE_SCRIPT,
  140: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SCRIPT,
  141: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_ONE_SCRIPT,
  142: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_TWO_SCRIPT,
  143: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_THREE_SCRIPT,
  144: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_FOUR_SCRIPT,
  145: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_FIVE_SCRIPT,
  146: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SIX_SCRIPT,
  147: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_SEVEN_SCRIPT,
  148: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_EIGHT_SCRIPT,
  149: BIBLE_YEAR_DAY_ONE_HUNDRED_FORTY_NINE_SCRIPT,
  150: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SCRIPT,
  151: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_ONE_SCRIPT,
  152: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_TWO_SCRIPT,
  153: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_THREE_SCRIPT,
  154: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_FOUR_SCRIPT,
  155: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_FIVE_SCRIPT,
  156: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SIX_SCRIPT,
  157: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_SEVEN_SCRIPT,
  158: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_EIGHT_SCRIPT,
  159: BIBLE_YEAR_DAY_ONE_HUNDRED_FIFTY_NINE_SCRIPT,
  160: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SCRIPT,
  161: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_ONE_SCRIPT,
  162: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_TWO_SCRIPT,
  163: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_THREE_SCRIPT,
  164: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_FOUR_SCRIPT,
  165: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_FIVE_SCRIPT,
  166: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SIX_SCRIPT,
  167: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_SEVEN_SCRIPT,
  168: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_EIGHT_SCRIPT,
  169: BIBLE_YEAR_DAY_ONE_HUNDRED_SIXTY_NINE_SCRIPT,
  170: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SCRIPT,
  171: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_ONE_SCRIPT,
  172: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_TWO_SCRIPT,
  173: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_THREE_SCRIPT,
  174: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_FOUR_SCRIPT,
  175: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_FIVE_SCRIPT,
  176: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SIX_SCRIPT,
  177: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_SEVEN_SCRIPT,
  178: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_EIGHT_SCRIPT,
  179: BIBLE_YEAR_DAY_ONE_HUNDRED_SEVENTY_NINE_SCRIPT,
  180: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SCRIPT,
  181: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_ONE_SCRIPT,
  182: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_TWO_SCRIPT,
  183: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_THREE_SCRIPT,
  184: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_FOUR_SCRIPT,
  185: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_FIVE_SCRIPT,
  186: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SIX_SCRIPT,
  187: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_SEVEN_SCRIPT,
  188: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_EIGHT_SCRIPT,
  189: BIBLE_YEAR_DAY_ONE_HUNDRED_EIGHTY_NINE_SCRIPT,
  190: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SCRIPT,
  191: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_ONE_SCRIPT,
  192: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_TWO_SCRIPT,
  193: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_THREE_SCRIPT,
  194: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_FOUR_SCRIPT,
  195: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_FIVE_SCRIPT,
  196: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SIX_SCRIPT,
  197: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_SEVEN_SCRIPT,
  198: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_EIGHT_SCRIPT,
  199: BIBLE_YEAR_DAY_ONE_HUNDRED_NINETY_NINE_SCRIPT,
  200: BIBLE_YEAR_DAY_TWO_HUNDRED_SCRIPT,
  201: BIBLE_YEAR_DAY_TWO_HUNDRED_ONE_SCRIPT,
  202: BIBLE_YEAR_DAY_TWO_HUNDRED_TWO_SCRIPT,
  203: BIBLE_YEAR_DAY_TWO_HUNDRED_THREE_SCRIPT,
  204: BIBLE_YEAR_DAY_TWO_HUNDRED_FOUR_SCRIPT,
  205: BIBLE_YEAR_DAY_TWO_HUNDRED_FIVE_SCRIPT,
  206: BIBLE_YEAR_DAY_TWO_HUNDRED_SIX_SCRIPT,
  207: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVEN_SCRIPT,
  208: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHT_SCRIPT,
  209: BIBLE_YEAR_DAY_TWO_HUNDRED_NINE_SCRIPT,
  210: BIBLE_YEAR_DAY_TWO_HUNDRED_TEN_SCRIPT,
  211: BIBLE_YEAR_DAY_TWO_HUNDRED_ELEVEN_SCRIPT,
  212: BIBLE_YEAR_DAY_TWO_HUNDRED_TWELVE_SCRIPT,
  213: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTEEN_SCRIPT,
  214: BIBLE_YEAR_DAY_TWO_HUNDRED_FOURTEEN_SCRIPT,
  215: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTEEN_SCRIPT,
  216: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTEEN_SCRIPT,
  217: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTEEN_SCRIPT,
  218: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTEEN_SCRIPT,
  219: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETEEN_SCRIPT,
  220: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SCRIPT,
  221: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_ONE_SCRIPT,
  222: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_TWO_SCRIPT,
  223: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_THREE_SCRIPT,
  224: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_FOUR_SCRIPT,
  225: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_FIVE_SCRIPT,
  226: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SIX_SCRIPT,
  227: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_SEVEN_SCRIPT,
  228: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_EIGHT_SCRIPT,
  229: BIBLE_YEAR_DAY_TWO_HUNDRED_TWENTY_NINE_SCRIPT,
  230: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SCRIPT,
  231: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_ONE_SCRIPT,
  232: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_TWO_SCRIPT,
  233: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_THREE_SCRIPT,
  234: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_FOUR_SCRIPT,
  235: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_FIVE_SCRIPT,
  236: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SIX_SCRIPT,
  237: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_SEVEN_SCRIPT,
  238: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_EIGHT_SCRIPT,
  239: BIBLE_YEAR_DAY_TWO_HUNDRED_THIRTY_NINE_SCRIPT,
  240: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SCRIPT,
  241: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_ONE_SCRIPT,
  242: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_TWO_SCRIPT,
  243: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_THREE_SCRIPT,
  244: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_FOUR_SCRIPT,
  245: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_FIVE_SCRIPT,
  246: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SIX_SCRIPT,
  247: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_SEVEN_SCRIPT,
  248: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_EIGHT_SCRIPT,
  249: BIBLE_YEAR_DAY_TWO_HUNDRED_FORTY_NINE_SCRIPT,
  250: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SCRIPT,
  251: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_ONE_SCRIPT,
  252: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_TWO_SCRIPT,
  253: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_THREE_SCRIPT,
  254: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_FOUR_SCRIPT,
  255: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_FIVE_SCRIPT,
  256: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SIX_SCRIPT,
  257: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_SEVEN_SCRIPT,
  258: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_EIGHT_SCRIPT,
  259: BIBLE_YEAR_DAY_TWO_HUNDRED_FIFTY_NINE_SCRIPT,
  260: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SCRIPT,
  261: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_ONE_SCRIPT,
  262: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_TWO_SCRIPT,
  263: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_THREE_SCRIPT,
  264: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_FOUR_SCRIPT,
  265: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_FIVE_SCRIPT,
  266: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SIX_SCRIPT,
  267: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_SEVEN_SCRIPT,
  268: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_EIGHT_SCRIPT,
  269: BIBLE_YEAR_DAY_TWO_HUNDRED_SIXTY_NINE_SCRIPT,
  270: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SCRIPT,
  271: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_ONE_SCRIPT,
  272: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_TWO_SCRIPT,
  273: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_THREE_SCRIPT,
  274: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_FOUR_SCRIPT,
  275: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_FIVE_SCRIPT,
  276: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SIX_SCRIPT,
  277: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_SEVEN_SCRIPT,
  278: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_EIGHT_SCRIPT,
  279: BIBLE_YEAR_DAY_TWO_HUNDRED_SEVENTY_NINE_SCRIPT,
  280: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SCRIPT,
  281: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_ONE_SCRIPT,
  282: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_TWO_SCRIPT,
  283: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_THREE_SCRIPT,
  284: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_FOUR_SCRIPT,
  285: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_FIVE_SCRIPT,
  286: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SIX_SCRIPT,
  287: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_SEVEN_SCRIPT,
  288: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_EIGHT_SCRIPT,
  289: BIBLE_YEAR_DAY_TWO_HUNDRED_EIGHTY_NINE_SCRIPT,
  290: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SCRIPT,
  291: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_ONE_SCRIPT,
  292: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_TWO_SCRIPT,
  293: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_THREE_SCRIPT,
  294: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_FOUR_SCRIPT,
  295: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_FIVE_SCRIPT,
  296: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SIX_SCRIPT,
  297: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_SEVEN_SCRIPT,
  298: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_EIGHT_SCRIPT,
  299: BIBLE_YEAR_DAY_TWO_HUNDRED_NINETY_NINE_SCRIPT,
  300: BIBLE_YEAR_DAY_THREE_HUNDRED_SCRIPT,
  301: BIBLE_YEAR_DAY_THREE_HUNDRED_ONE_SCRIPT,
  302: BIBLE_YEAR_DAY_THREE_HUNDRED_TWO_SCRIPT,
  303: BIBLE_YEAR_DAY_THREE_HUNDRED_THREE_SCRIPT,
  304: BIBLE_YEAR_DAY_THREE_HUNDRED_FOUR_SCRIPT,
  305: BIBLE_YEAR_DAY_THREE_HUNDRED_FIVE_SCRIPT,
  306: BIBLE_YEAR_DAY_THREE_HUNDRED_SIX_SCRIPT,
  307: BIBLE_YEAR_DAY_THREE_HUNDRED_SEVEN_SCRIPT,
  308: BIBLE_YEAR_DAY_THREE_HUNDRED_EIGHT_SCRIPT,
  309: BIBLE_YEAR_DAY_THREE_HUNDRED_NINE_SCRIPT,
  310: BIBLE_YEAR_DAY_THREE_HUNDRED_TEN_SCRIPT,
  311: BIBLE_YEAR_DAY_THREE_HUNDRED_ELEVEN_SCRIPT,
  312: BIBLE_YEAR_DAY_THREE_HUNDRED_TWELVE_SCRIPT,
  313: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTEEN_SCRIPT,
  314: BIBLE_YEAR_DAY_THREE_HUNDRED_FOURTEEN_SCRIPT,
  315: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTEEN_SCRIPT,
  316: BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTEEN_SCRIPT,
  317: BIBLE_YEAR_DAY_THREE_HUNDRED_SEVENTEEN_SCRIPT,
  318: BIBLE_YEAR_DAY_THREE_HUNDRED_EIGHTEEN_SCRIPT,
  319: BIBLE_YEAR_DAY_THREE_HUNDRED_NINETEEN_SCRIPT,
  320: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SCRIPT,
  321: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_ONE_SCRIPT,
  322: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_TWO_SCRIPT,
  323: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_THREE_SCRIPT,
  324: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_FOUR_SCRIPT,
  325: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_FIVE_SCRIPT,
  326: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SIX_SCRIPT,
  327: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_SEVEN_SCRIPT,
  328: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_EIGHT_SCRIPT,
  329: BIBLE_YEAR_DAY_THREE_HUNDRED_TWENTY_NINE_SCRIPT,
  330: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SCRIPT,
  331: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_ONE_SCRIPT,
  332: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_TWO_SCRIPT,
  333: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_THREE_SCRIPT,
  334: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_FOUR_SCRIPT,
  335: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_FIVE_SCRIPT,
  336: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SIX_SCRIPT,
  337: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_SEVEN_SCRIPT,
  338: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_EIGHT_SCRIPT,
  339: BIBLE_YEAR_DAY_THREE_HUNDRED_THIRTY_NINE_SCRIPT,
  340: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SCRIPT,
  341: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_ONE_SCRIPT,
  342: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_TWO_SCRIPT,
  343: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_THREE_SCRIPT,
  344: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_FOUR_SCRIPT,
  345: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_FIVE_SCRIPT,
  346: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SIX_SCRIPT,
  347: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_SEVEN_SCRIPT,
  348: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_EIGHT_SCRIPT,
  349: BIBLE_YEAR_DAY_THREE_HUNDRED_FORTY_NINE_SCRIPT,
  350: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SCRIPT,
  351: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_ONE_SCRIPT,
  352: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_TWO_SCRIPT,
  353: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_THREE_SCRIPT,
  354: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_FOUR_SCRIPT,
  355: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_FIVE_SCRIPT,
  356: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SIX_SCRIPT,
  357: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_SEVEN_SCRIPT,
  358: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_EIGHT_SCRIPT,
  359: BIBLE_YEAR_DAY_THREE_HUNDRED_FIFTY_NINE_SCRIPT,
  360: BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_SCRIPT,
  361: BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_ONE_SCRIPT,
  362: BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_TWO_SCRIPT,
  363: BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_THREE_SCRIPT,
  364: BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_FOUR_SCRIPT,
  365: BIBLE_YEAR_DAY_THREE_HUNDRED_SIXTY_FIVE_SCRIPT,
};
