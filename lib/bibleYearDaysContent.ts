import type { BibleYearAudioDay } from "./bibleYearAudio";
import {
  BIBLE_YEAR_DAY_EIGHT_AUDIO,
  BIBLE_YEAR_DAY_EIGHTEEN_AUDIO,
  BIBLE_YEAR_DAY_ELEVEN_AUDIO,
  BIBLE_YEAR_DAY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_FIFTEEN_AUDIO,
  BIBLE_YEAR_DAY_FOURTEEN_AUDIO,
  BIBLE_YEAR_DAY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_NINE_AUDIO,
  BIBLE_YEAR_DAY_NINETEEN_AUDIO,
  BIBLE_YEAR_DAY_ONE_AUDIO,
  BIBLE_YEAR_DAY_SEVEN_AUDIO,
  BIBLE_YEAR_DAY_SEVENTEEN_AUDIO,
  BIBLE_YEAR_DAY_SIX_AUDIO,
  BIBLE_YEAR_DAY_SIXTEEN_AUDIO,
  BIBLE_YEAR_DAY_TEN_AUDIO,
  BIBLE_YEAR_DAY_THREE_AUDIO,
  BIBLE_YEAR_DAY_THIRTEEN_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_EIGHT_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_ONE_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_NINE_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_SEVEN_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_SIX_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_THREE_AUDIO,
  BIBLE_YEAR_DAY_THIRTY_TWO_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_NINE_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_ONE_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_TWO_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_THREE_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_SIX_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_SEVEN_AUDIO,
  BIBLE_YEAR_DAY_TWENTY_EIGHT_AUDIO,
  BIBLE_YEAR_DAY_TWELVE_AUDIO,
  BIBLE_YEAR_DAY_TWO_AUDIO,
  BIBLE_YEAR_DAY_FORTY_AUDIO,
  BIBLE_YEAR_DAY_FORTY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_FORTY_ONE_AUDIO,
  BIBLE_YEAR_DAY_FORTY_THREE_AUDIO,
  BIBLE_YEAR_DAY_FORTY_TWO_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_EIGHT_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_ONE_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_SEVEN_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_SIX_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_THREE_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_TWO_AUDIO,
  BIBLE_YEAR_DAY_FIFTY_NINE_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_SIX_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_SEVEN_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_EIGHT_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_NINE_AUDIO,
  BIBLE_YEAR_DAY_SEVENTY_AUDIO,
  BIBLE_YEAR_DAY_SEVENTY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_SEVENTY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_SEVENTY_ONE_AUDIO,
  BIBLE_YEAR_DAY_SEVENTY_THREE_AUDIO,
  BIBLE_YEAR_DAY_SEVENTY_TWO_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_FOUR_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_ONE_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_THREE_AUDIO,
  BIBLE_YEAR_DAY_SIXTY_TWO_AUDIO,
  BIBLE_YEAR_DAY_FORTY_EIGHT_AUDIO,
  BIBLE_YEAR_DAY_FORTY_FIVE_AUDIO,
  BIBLE_YEAR_DAY_FORTY_NINE_AUDIO,
  BIBLE_YEAR_DAY_FORTY_SEVEN_AUDIO,
  BIBLE_YEAR_DAY_FORTY_SIX_AUDIO,
} from "./bibleYearAudio";
import type { BibleYearDailyLesson } from "./bibleYearDailyLessons";
import {
  GENESIS_DAY_EIGHT_JUDGMENT_OF_SODOM_LESSON,
  GENESIS_DAY_FIVE_ABRAHAM_OBEDIENCE_LESSON,
  GENESIS_DAY_FOUR_NOAH_FLOOD_LESSON,
  GENESIS_DAY_NINE_ABRAHAMS_TEST_AND_LEGACY_LESSON,
  GENESIS_DAY_ONE_CREATION_LESSON,
  GENESIS_DAY_SEVEN_COVENANT_PROMISE_LESSON,
  GENESIS_DAY_SIX_RESCUE_OF_LOT_LESSON,
  GENESIS_DAY_THREE_NOAH_ARK_LESSON,
  GENESIS_DAY_TWO_FALL_LESSON,
} from "./bibleYearDailyLessons";
import {
  BIBLE_YEAR_DAY_ELEVEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_ELEVEN_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FOURTEEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_FOURTEEN_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_TEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_TEN_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_THIRTEEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTEEN_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_TWELVE_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWELVE_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_ELEVEN_JACOBS_JOURNEY_BEGINS_LESSON,
  GENESIS_DAY_FOURTEEN_JACOB_RETURNS_TO_BETHEL_LESSON,
  GENESIS_DAY_TEN_COVENANT_THROUGH_ISAAC_LESSON,
  GENESIS_DAY_THIRTEEN_JACOB_WRESTLES_WITH_GOD_LESSON,
  GENESIS_DAY_TWELVE_JACOB_LEAVES_LABAN_LESSON,
} from "./bibleYearDaysTenToFourteen";
import {
  BIBLE_YEAR_DAY_FIFTEEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTEEN_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_FIFTEEN_JOSEPHS_TESTING_BEGINS_LESSON,
} from "./bibleYearDaysFifteenToTwentyOne";
import {
  BIBLE_YEAR_DAY_SIXTEEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTEEN_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_SIXTEEN_FAITHFUL_IN_THE_HIDDEN_PLACE_LESSON,
} from "./bibleYearDaySixteenDeepNotes";
import {
  BIBLE_YEAR_DAY_SEVENTEEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_SEVENTEEN_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_SEVENTEEN_JOSEPH_RISES_AND_REMEMBERS_LESSON,
} from "./bibleYearDaySeventeenDeepNotes";
import {
  BIBLE_YEAR_DAY_EIGHTEEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_EIGHTEEN_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_EIGHTEEN_JUDAH_STANDS_IN_THE_GAP_LESSON,
} from "./bibleYearDayEighteenDeepNotes";
import {
  BIBLE_YEAR_DAY_NINETEEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_NINETEEN_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_NINETEEN_JOSEPH_REVEALS_HIMSELF_LESSON,
} from "./bibleYearDayNineteenDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_TWENTY_JACOB_BLESSES_JOSEPHS_SONS_LESSON,
} from "./bibleYearDayTwentyDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_STUDY_SECTIONS,
  GENESIS_DAY_TWENTY_ONE_GENESIS_ENDS_WITH_HOPE_LESSON,
} from "./bibleYearDayTwentyOneDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_TWO_GOD_HEARS_ISRAELS_CRY_LESSON,
} from "./bibleYearDayTwentyTwoDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_THREE_PHARAOH_RESISTS_GODS_WORD_LESSON,
} from "./bibleYearDayTwentyThreeDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_FOUR_PASSOVER_AND_DELIVERANCE_LESSON,
} from "./bibleYearDayTwentyFourDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_FIVE_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_FIVE_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_FIVE_THROUGH_THE_SEA_LESSON,
} from "./bibleYearDayTwentyFiveDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_SIX_WATER_BATTLE_AND_COMMANDMENTS_LESSON,
} from "./bibleYearDayTwentySixDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_SEVEN_COVENANT_LAW_AND_BLOOD_LESSON,
} from "./bibleYearDayTwentySevenDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_EIGHT_TABERNACLE_AND_PRIESTHOOD_LESSON,
} from "./bibleYearDayTwentyEightDeepNotes";
import {
  BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_NOTES,
  BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_TWENTY_NINE_CONSECRATION_AND_GOLDEN_CALF_LESSON,
} from "./bibleYearDayTwentyNineDeepNotes";
import {
  BIBLE_YEAR_DAY_THIRTY_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_THIRTY_GODS_PRESENCE_AND_RENEWED_OBEDIENCE_LESSON,
} from "./bibleYearDayThirtyDeepNotes";
import {
  BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_STUDY_SECTIONS,
  EXODUS_DAY_THIRTY_ONE_TABERNACLE_FINISHED_LESSON,
} from "./bibleYearDayThirtyOneDeepNotes";
import {
  BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_STUDY_SECTIONS,
  LEVITICUS_DAY_THIRTY_TWO_OFFERINGS_AND_ATONEMENT_LESSON,
} from "./bibleYearDayThirtyTwoDeepNotes";
import {
  BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_STUDY_SECTIONS,
  LEVITICUS_DAY_THIRTY_THREE_GUILT_CONSECRATION_AND_PRIESTS_LESSON,
} from "./bibleYearDayThirtyThreeDeepNotes";
import {
  BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_STUDY_SECTIONS,
  LEVITICUS_DAY_THIRTY_FOUR_WORSHIP_HOLINESS_AND_CLEAN_LIVING_LESSON,
} from "./bibleYearDayThirtyFourDeepNotes";
import {
  BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_STUDY_SECTIONS,
  LEVITICUS_DAY_THIRTY_FIVE_CLEANSING_AND_DAY_OF_ATONEMENT_LESSON,
} from "./bibleYearDayThirtyFiveDeepNotes";
import {
  BIBLE_YEAR_DAY_THIRTY_SIX_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_SIX_DEEP_STUDY_SECTIONS,
  LEVITICUS_DAY_THIRTY_SIX_HOLY_LIVING_BEFORE_A_HOLY_GOD_LESSON,
} from "./bibleYearDayThirtySixDeepNotes";
import {
  BIBLE_YEAR_DAY_FORTY_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_THIRTY_EIGHT_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_EIGHT_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_THIRTY_NINE_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_NINE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_THIRTY_SEVEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_THIRTY_SEVEN_DEEP_STUDY_SECTIONS,
  LEVITICUS_DAY_THIRTY_SEVEN_PRIESTS_FEASTS_AND_SACRED_ORDER_LESSON,
  LEVITICUS_NUMBERS_DAY_THIRTY_EIGHT_JUBILEE_COVENANT_AND_ISRAEL_COUNTED_LESSON,
  NUMBERS_DAY_FORTY_BLESSING_DEDICATION_AND_PASSOVER_LESSON,
  NUMBERS_DAY_THIRTY_NINE_CAMP_ORDER_AND_PURITY_LESSON,
} from "./bibleYearDaysThirtySevenToFortyDeepNotes";
import {
  BIBLE_YEAR_DAY_FORTY_FOUR_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_FOUR_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_ONE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_ONE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_THREE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_THREE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_TWO_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_TWO_DEEP_STUDY_SECTIONS,
  NUMBERS_DAY_FORTY_FOUR_BALAAM_BLESSING_AND_COMPROMISE_LESSON,
  NUMBERS_DAY_FORTY_ONE_JOURNEY_COMPLAINTS_AND_SPIES_LESSON,
  NUMBERS_DAY_FORTY_THREE_PROVISION_JUDGMENT_AND_BRONZE_SERPENT_LESSON,
  NUMBERS_DAY_FORTY_TWO_REBELLION_AND_CHOSEN_PRIESTHOOD_LESSON,
} from "./bibleYearDaysFortyOneToFortyFourDeepNotes";
import {
  BIBLE_YEAR_DAY_FIFTY_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_EIGHT_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_EIGHT_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_FIVE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_FIVE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_NINE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_NINE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_SEVEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_SEVEN_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FORTY_SIX_DEEP_NOTES,
  BIBLE_YEAR_DAY_FORTY_SIX_DEEP_STUDY_SECTIONS,
  DEUTERONOMY_DAY_FIFTY_COVENANT_LOYALTY_FROM_THE_HEART_LESSON,
  DEUTERONOMY_DAY_FORTY_EIGHT_REMEMBERING_JOURNEY_AND_COVENANT_LESSON,
  DEUTERONOMY_DAY_FORTY_NINE_LOVE_GOD_AND_REMEMBER_GRACE_LESSON,
  NUMBERS_DAY_FORTY_FIVE_NEW_GENERATION_COUNTED_LESSON,
  NUMBERS_DAY_FORTY_SIX_VOWS_VICTORY_AND_JOURNEY_REVIEWED_LESSON,
  NUMBERS_DEUTERONOMY_DAY_FORTY_SEVEN_LAND_BOUNDARIES_AND_MOSES_LOOKS_BACK_LESSON,
} from "./bibleYearDaysFortyFiveToFiftyDeepNotes";
import {
  BIBLE_YEAR_DAY_FIFTY_FOUR_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_FOUR_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FIFTY_ONE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_ONE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FIFTY_THREE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_THREE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FIFTY_TWO_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_TWO_DEEP_STUDY_SECTIONS,
  DEUTERONOMY_DAY_FIFTY_FOUR_BLESSING_CURSE_AND_COVENANT_RENEWAL_LESSON,
  DEUTERONOMY_DAY_FIFTY_ONE_WORSHIP_JUSTICE_AND_LEADERSHIP_LESSON,
  DEUTERONOMY_DAY_FIFTY_THREE_EVERYDAY_FAITHFULNESS_LESSON,
  DEUTERONOMY_DAY_FIFTY_TWO_PROPHETS_CITIES_AND_JUSTICE_LESSON,
} from "./bibleYearDaysFiftyOneToFiftyFourDeepNotes";
import {
  BIBLE_YEAR_DAY_FIFTY_EIGHT_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_EIGHT_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FIFTY_FIVE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_FIVE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FIFTY_SEVEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_SEVEN_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_FIFTY_SIX_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_SIX_DEEP_STUDY_SECTIONS,
  DEUTERONOMY_DAY_FIFTY_FIVE_CHOOSE_LIFE_AND_MOSES_BLESSING_LESSON,
  DEUTERONOMY_JOSHUA_DAY_FIFTY_SIX_MOSES_DIES_AND_JOSHUA_LEADS_LESSON,
  JOSHUA_DAY_FIFTY_EIGHT_CONQUEST_AND_COVENANT_OBEDIENCE_LESSON,
  JOSHUA_DAY_FIFTY_SEVEN_MEMORIAL_STONES_JERICHO_AND_ACHAN_LESSON,
} from "./bibleYearDaysFiftyFiveToFiftyEightDeepNotes";
import {
  BIBLE_YEAR_DAY_FIFTY_NINE_DEEP_NOTES,
  BIBLE_YEAR_DAY_FIFTY_NINE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_DEEP_STUDY_SECTIONS,
  JOSHUA_DAY_FIFTY_NINE_LAND_IS_DISTRIBUTED_LESSON,
  JOSHUA_DAY_SIXTY_INHERITANCE_FOR_THE_TRIBES_LESSON,
} from "./bibleYearDaysFiftyNineToSixtyDeepNotes";
import {
  BIBLE_YEAR_DAY_SIXTY_FIVE_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_FIVE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_FOUR_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_FOUR_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_ONE_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_ONE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_THREE_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_THREE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_TWO_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_TWO_DEEP_STUDY_SECTIONS,
  JOSHUA_DAY_SIXTY_ONE_REFUGE_REST_AND_WARNING_LESSON,
  JOSHUA_JUDGES_DAY_SIXTY_TWO_COVENANT_CHOICE_AND_DRIFT_LESSON,
  JUDGES_DAY_SIXTY_FIVE_SAMSON_BEGINS_TROUBLED_CALLING_LESSON,
  JUDGES_DAY_SIXTY_FOUR_GIDEONS_FAILURE_AND_JEPHTHAHS_VOW_LESSON,
  JUDGES_DAY_SIXTY_THREE_DEBORAH_GIDEON_AND_DELIVERANCE_LESSON,
} from "./bibleYearDaysSixtyOneToSixtyFiveDeepNotes";
import {
  BIBLE_YEAR_DAY_SEVENTY_DEEP_NOTES,
  BIBLE_YEAR_DAY_SEVENTY_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_EIGHT_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_EIGHT_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_NINE_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_NINE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_SEVEN_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_SEVEN_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SIXTY_SIX_DEEP_NOTES,
  BIBLE_YEAR_DAY_SIXTY_SIX_DEEP_STUDY_SECTIONS,
  FIRST_SAMUEL_DAY_SEVENTY_ISRAEL_ASKS_FOR_A_KING_LESSON,
  FIRST_SAMUEL_DAY_SIXTY_NINE_SAMUEL_HEARS_GOD_AND_ARK_TAKEN_LESSON,
  JUDGES_DAY_SIXTY_SIX_SAMSON_FALLS_AND_ISRAEL_UNRAVELS_LESSON,
  JUDGES_RUTH_DAY_SIXTY_SEVEN_CIVIL_WAR_AND_RUTHS_LOYAL_LOVE_LESSON,
  RUTH_SAMUEL_DAY_SIXTY_EIGHT_REDEMPTION_AND_SAMUELS_BIRTH_LESSON,
} from "./bibleYearDaysSixtySixToSeventyDeepNotes";
import {
  BIBLE_YEAR_DAY_SEVENTY_FIVE_DEEP_NOTES,
  BIBLE_YEAR_DAY_SEVENTY_FIVE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SEVENTY_FOUR_DEEP_NOTES,
  BIBLE_YEAR_DAY_SEVENTY_FOUR_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SEVENTY_ONE_DEEP_NOTES,
  BIBLE_YEAR_DAY_SEVENTY_ONE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SEVENTY_THREE_DEEP_NOTES,
  BIBLE_YEAR_DAY_SEVENTY_THREE_DEEP_STUDY_SECTIONS,
  BIBLE_YEAR_DAY_SEVENTY_TWO_DEEP_NOTES,
  BIBLE_YEAR_DAY_SEVENTY_TWO_DEEP_STUDY_SECTIONS,
  FIRST_SAMUEL_DAY_SEVENTY_FIVE_DAVID_IN_EXILE_LESSON,
  FIRST_SAMUEL_DAY_SEVENTY_FOUR_DAVID_SPARES_SAUL_LESSON,
  FIRST_SAMUEL_DAY_SEVENTY_ONE_SAULS_RISE_AND_EARLY_FAILURE_LESSON,
  FIRST_SAMUEL_DAY_SEVENTY_THREE_DAVID_FLEES_FROM_SAUL_LESSON,
  FIRST_SAMUEL_DAY_SEVENTY_TWO_SAUL_REJECTED_AND_DAVID_APPEARS_LESSON,
} from "./bibleYearDaysSeventyOneToSeventyFiveDeepNotes";
import { BIBLE_YEAR_DAY_ONE_DEEP_NOTES } from "./bibleYearDayOneDeepNotes";
import { BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS, type BibleYearDeepStudySection } from "./bibleYearDayOneDeepStudy";
import { BIBLE_YEAR_DAY_THREE_DEEP_NOTES, BIBLE_YEAR_DAY_THREE_DEEP_STUDY_SECTIONS } from "./bibleYearDayThreeDeepNotes";
import { BIBLE_YEAR_DAY_FOUR_DEEP_NOTES, BIBLE_YEAR_DAY_FOUR_DEEP_STUDY_SECTIONS } from "./bibleYearDayFourDeepNotes";
import { BIBLE_YEAR_DAY_FIVE_DEEP_NOTES, BIBLE_YEAR_DAY_FIVE_DEEP_STUDY_SECTIONS } from "./bibleYearDayFiveDeepNotes";
import { BIBLE_YEAR_DAY_SEVEN_DEEP_NOTES, BIBLE_YEAR_DAY_SEVEN_DEEP_STUDY_SECTIONS } from "./bibleYearDaySevenDeepNotes";
import { BIBLE_YEAR_DAY_SIX_DEEP_NOTES, BIBLE_YEAR_DAY_SIX_DEEP_STUDY_SECTIONS } from "./bibleYearDaySixDeepNotes";
import { BIBLE_YEAR_DAY_EIGHT_DEEP_NOTES, BIBLE_YEAR_DAY_EIGHT_DEEP_STUDY_SECTIONS } from "./bibleYearDayEightDeepNotes";
import { BIBLE_YEAR_DAY_NINE_DEEP_NOTES, BIBLE_YEAR_DAY_NINE_DEEP_STUDY_SECTIONS } from "./bibleYearDayNineDeepNotes";
import { BIBLE_YEAR_DAY_TWO_DEEP_NOTES, BIBLE_YEAR_DAY_TWO_DEEP_STUDY_SECTIONS } from "./fallOfManDeepNotes";
import type { GenesisBibleYearDay } from "./bibleInOneYearPlan";
import { getBibleReaderStudySections } from "./bibleReaderStudyNotes";

export type BibleYearSummaryContent = {
  intro: string[];
  highlights: Array<[string, string]>;
  takeawayTitle?: string;
  takeaway: string;
  takeawaySupport: string;
  studyNotesCtaTitle?: string;
  studyNotesCtaBody?: string;
};

export type BibleYearDayContent = {
  lesson: BibleYearDailyLesson | null;
  audio: BibleYearAudioDay | null;
  studyNotesMarkdown: string | null;
  studyNotesSections: BibleYearDeepStudySection[] | null;
  summary: BibleYearSummaryContent;
  discussionPrompt: string;
};

const dayOneSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 1-2 introduces the world before sin, pain, and brokenness entered creation.",
    "These chapters show God bringing order out of darkness, creating life with purpose, and forming humanity in His image.",
    "Before anything was damaged, Scripture first shows us what God originally intended the world to be.",
  ],
  highlights: [
    ["✨", "God speaks into darkness and brings light."],
    ["🌍", "God shapes the world into a home filled with life and purpose."],
    ["👤", "Humanity is created in God's image with value, dignity, and meaning."],
    ["🌱", "Eden shows work, rest, freedom, boundaries, and relationship with God."],
    ["📖", "Creation reveals a God who brings order, beauty, and intentional design."],
  ],
  takeaway: "Before the damage of sin entered the story, God's design for creation was good, beautiful, ordered, and full of life.",
  takeawaySupport: "This helps us understand not only where humanity came from, but what we were originally created for.",
};

const dayTwoSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 3-4 shows what happens when trust in God breaks.",
    "These chapters explain why the world feels divided, painful, and heavy now: sin enters through distrust, then spreads into shame, blame, anger, and violence.",
    "But even when the story turns dark, God keeps speaking, covering, warning, and preserving hope.",
  ],
  highlights: [
    ["🐍", "The serpent questions God's word and makes distrust sound reasonable."],
    ["🍎", "Adam and Eve disobey, and shame, fear, hiding, and blame enter the story."],
    ["🌱", "God judges sin, but also gives the first promise that evil will not win forever."],
    ["💔", "Cain's anger shows sin spreading from the garden into the family."],
    ["✨", "Seth's birth shows hope continuing even after heartbreak and loss."],
  ],
  takeaway: "Sin spreads quickly when trust breaks, but God does not abandon His people.",
  takeawaySupport: "Day 2 helps us understand why humanity needs rescue, and why the first promise of victory over evil matters so much.",
};

const fallbackHighlightIcons = ["📖", "👀", "🧭", "🌱", "✨"];

const dayThreeSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 5-7 follows the world after Eden as sin spreads through generations and violence fills the earth.",
    "The family line from Adam to Noah keeps repeating the reality of death, but Noah stands out as someone who walks with God in a corrupt world.",
    "Before the rain ever falls, these chapters show God warning, Noah obeying, and mercy being prepared inside the ark.",
  ],
  highlights: [
    ["🧬", "Genesis 5 traces Adam's family line and shows that death has entered every generation."],
    ["🚶", "Enoch and Noah show that people can still walk with God in a broken world."],
    ["🌍", "The earth becomes corrupt and violent, and God grieves over human wickedness."],
    ["🛠️", "Noah obeys God's instructions and builds the ark before the flood is visible."],
    ["🌧️", "Judgment begins, but God preserves Noah, his family, and the animals inside the ark."],
  ],
  takeaway: "Noah's story shows that faith is not just agreement with God; faith becomes obedience before everything makes sense.",
  takeawaySupport: "Day 3 helps us see both sides clearly: God takes evil seriously, but He also provides a way of rescue through mercy.",
};

const dayFourSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 8-10 shows what happens after the flood waters begin to go down.",
    "Noah waits, the ark rests, the dove brings back an olive leaf, and God leads Noah's family into a new beginning.",
    "But these chapters also show that even after judgment, the human heart still needs deeper rescue and lasting renewal.",
  ],
  highlights: [
    ["🌊", "God remembers Noah and causes the waters to recede from the earth."],
    ["🕊️", "The dove and olive leaf become a sign that life is returning after judgment."],
    ["🔥", "Noah's first major act after leaving the ark is worship."],
    ["🌈", "God gives the rainbow as a covenant sign that He will preserve the earth."],
    ["🌍", "The nations spread from Noah's family, but sin is still present in the new world."],
  ],
  takeaway: "The flood story does not end with destruction. It moves toward remembrance, restoration, worship, covenant, and a new beginning.",
  takeawaySupport: "Day 4 helps us see that God is faithful after the storm, but humanity still needs a greater rescue than Noah could bring.",
};

const dayFiveSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 11-13 moves from the pride of Babel into the beginning of Abram's story.",
    "At Babel, people try to build upward and make a name for themselves, but God calls Abram and promises to make his name great.",
    "These chapters show God beginning a rescue plan through one family, even while Abram is still learning how to trust.",
  ],
  highlights: [
    ["🏙️", "Babel shows humanity trying to create security and greatness apart from God."],
    ["🧬", "Genesis traces the family line toward Abram and narrows the story toward promise."],
    ["📣", "God calls Abram to leave what is familiar and follow Him by faith."],
    ["🌍", "God promises land, descendants, blessing, and blessing for all families of the earth."],
    ["⛺", "Abram obeys, builds altars, fails in fear, and keeps learning to trust God's promise."],
  ],
  takeaway: "God's promise is stronger than human pride, fear, and weakness.",
  takeawaySupport: "Day 5 helps us see the difference between trying to make a name for ourselves and receiving identity, purpose, and blessing from God.",
};

const daySixSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 14-15 shows Abram moving from public courage into private fear and honest questions.",
    "Abram rescues Lot, meets Melchizedek, refuses Sodom's reward, and then hears God speak directly to his fear.",
    "These chapters show that faith can be brave in battle and still need reassurance in the quiet place.",
  ],
  highlights: [
    ["⚔️", "War reaches Lot because of where he settled near Sodom."],
    ["🛡️", "Abram acts with courage and rescues Lot instead of leaving him behind."],
    ["👑", "Melchizedek blesses Abram, and Abram responds with honor and worship."],
    ["🚫", "Abram refuses Sodom's reward because he does not want blessing tied to corruption."],
    ["⭐", "God promises descendants like the stars, and Abram believes the LORD."],
  ],
  takeaway: "Faith trusts God in public action and private uncertainty.",
  takeawaySupport: "Day 6 helps us see that Abram's confidence does not come from kings, rewards, or circumstances, but from the God who makes and keeps covenant promises.",
};

const daySevenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 16-17 walks through waiting, shortcuts, pain, mercy, and covenant promise.",
    "Abram and Sarai try to force what God promised, and Hagar is caught in the brokenness that follows.",
    "But God sees Hagar, renames Abram and Sarai, gives the covenant sign, and promises Isaac by name.",
  ],
  highlights: [
    ["⏳", "Waiting exposes how hard it can be to trust God's timing."],
    ["💔", "Sarai and Abram's shortcut creates pain, conflict, and consequences."],
    ["👀", "God meets Hagar in the wilderness and shows that she is seen."],
    ["👑", "Abram becomes Abraham, and Sarai becomes Sarah as God speaks promise over their future."],
    ["✨", "God promises Isaac and makes clear that the covenant will continue by His power."],
  ],
  takeaway: "Human shortcuts cannot cancel God's covenant faithfulness.",
  takeawaySupport: "Day 7 helps us understand that God sees the wounded, corrects the waiting, and carries His promise forward even after human failure.",
};

const dayEightSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 18-20 brings promise, prayer, mercy, judgment, rescue, and protection into one important part of Abraham's story.",
    "Abraham welcomes the visitors, Sarah hears the promise again, and God asks the question that sits over the whole chapter: Is anything too hard for the LORD?",
    "Then the story turns toward Sodom and Gomorrah, where Abraham intercedes, Lot is rescued, God's justice confronts deep corruption, and God protects Sarah in Gerar.",
  ],
  highlights: [
    ["⛺", "Abraham welcomes the visitors, and his tent becomes the setting for a holy encounter."],
    ["😮", "Sarah laughs at the promise, but God reminds her that nothing is too hard for the LORD."],
    ["🙏", "Abraham intercedes for Sodom and asks whether the Judge of all the earth will do right."],
    ["🚪", "Lot's life in Sodom reveals compromise, danger, and the cost of living close to corruption."],
    ["🔥", "Sodom and Gomorrah are judged, but Lot is pulled out by mercy before destruction falls."],
  ],
  takeaway: "God's promise is stronger than impossibility, and His mercy is present even when judgment is real.",
  takeawaySupport: "Day 8 helps us see that God listens, God sees what is truly happening, and God knows how to rescue while still taking evil seriously.",
};

const dayNineSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 21-24 closes Abraham's main journey and begins moving the promise into the next generation.",
    "These chapters show Isaac finally being born, Hagar and Ishmael being seen in the wilderness, and Abraham being tested on Mount Moriah.",
    "By the end, Sarah has died and Isaac receives Rebekah as the covenant family moves forward.",
  ],
  highlights: [
    ["👶", "Isaac is born at the appointed time, turning Sarah's laughter into joy."],
    ["💧", "God hears Hagar and Ishmael in the wilderness and provides for them."],
    ["⛰️", "Abraham is tested on Moriah, and the LORD provides the ram."],
    ["🪦", "Sarah dies, and Abraham buys a burial place in the promised land."],
    ["🔁", "Abraham's legacy moves forward through Isaac and Rebekah."],
  ],
  takeaway: "God's covenant promise keeps moving through weakness, waiting, testing, grief, and legacy.",
  takeawaySupport: "Day 9 helps us see that the story is not held together by perfect people, but by the faithful God who keeps His word across generations.",
};

const dayTenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 25-27 follows Abraham's final years and Isaac's household as the covenant promise continues through a family full of pressure.",
    "Jacob and Esau are born, then Isaac faces famine, fear, conflict over wells, and God's repeated promise.",
    "Then Jacob receives the blessing through deception, and the family fractures under favoritism and anger.",
  ],
  highlights: [
    ["📜", "Abraham's final years keep the covenant line focused through Isaac."],
    ["👶", "Jacob and Esau are born, and conflict enters the next generation early."],
    ["🌾", "Isaac faces famine, but God tells him to stay and trust the promise."],
    ["🛡️", "Isaac repeats Abraham's fear, showing old patterns can echo into the next generation."],
    ["💧", "The wells show conflict, patience, and God making room."],
  ],
  takeaway: "God's promise moves forward, but Genesis is honest about the damage caused by fear, favoritism, and deception.",
  takeawaySupport: "Day 10 helps us see that covenant blessing is carried by God's faithfulness, not by a perfect family system.",
};

const dayElevenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 28-29 begins Jacob's journey away from home.",
    "Jacob leaves under pressure, but God meets him at Bethel and repeats the covenant promise.",
    "Then Jacob reaches Haran, meets Rachel, serves Laban, and experiences deception in his own family story.",
  ],
  highlights: [
    ["🛣️", "Jacob leaves home carrying both blessing and consequences."],
    ["🪜", "God meets Jacob in a dream and promises presence, land, descendants, and return."],
    ["🪨", "Bethel becomes a place where Jacob realizes God was near."],
    ["❤️", "Jacob meets Rachel and agrees to serve seven years for her."],
    ["🕯️", "Laban deceives Jacob, and Leah's pain is seen by God."],
  ],
  takeaway: "God can meet people on the road, even when they are carrying fear, consequences, and uncertainty.",
  takeawaySupport: "Day 11 helps us see that God's presence is not limited to settled places. He meets Jacob in exile and keeps speaking promise.",
};

const dayTwelveSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 30-31 follows Jacob's growing family and his difficult years under Laban.",
    "The household grows through rivalry and pain, while Jacob works under pressure and conflict.",
    "Eventually God calls Jacob to return, and the journey back toward promise begins.",
  ],
  highlights: [
    ["👨‍👩‍👧", "Jacob's household grows, but the growth happens inside rivalry and pain."],
    ["🐑", "Jacob prospers even under Laban's pressure."],
    ["🏠", "God tells Jacob to return to the land of his fathers."],
    ["🏃", "Jacob leaves with his family, flocks, and unresolved tension."],
    ["🪨", "Jacob and Laban set a boundary covenant and part ways."],
  ],
  takeaway: "God can grow and guide His people even when the surrounding situation is unfair, tense, and complicated.",
  takeawaySupport: "Day 12 helps us see that returning to God's promise sometimes means leaving unhealthy patterns behind.",
};

const dayThirteenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 32-33 brings Jacob face to face with fear, prayer, wrestling, and reconciliation.",
    "Jacob is about to meet Esau, and the old wound still feels dangerous.",
    "Before he faces Esau, Jacob wrestles through the night and receives a new name.",
  ],
  highlights: [
    ["🛡️", "Jacob prepares to meet Esau with fear, planning, and prayer."],
    ["🙏", "Jacob honestly reminds God of His promise."],
    ["🤼", "Jacob wrestles through the night and is wounded."],
    ["✨", "Jacob receives the name Israel after clinging for blessing."],
    ["🤝", "Esau's embrace becomes a surprising moment of mercy."],
  ],
  takeaway: "God can change a person through struggle, weakness, prayer, and mercy.",
  takeawaySupport: "Day 13 helps us see that Jacob walks forward limping, but blessed. His weakness becomes part of his transformed story.",
};

const dayFourteenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 34-36 closes Jacob's section with painful family reckoning, renewed worship, grief, and generations.",
    "Genesis 34 is heavy, showing violation, anger, deception, and violence.",
    "Then God calls Jacob back to Bethel, where idols are put away and the promise is repeated.",
  ],
  highlights: [
    ["⚠️", "Dinah's story shows deep family and city brokenness."],
    ["🧭", "God calls Jacob back to Bethel after a painful chapter."],
    ["🧺", "Jacob's household puts away foreign gods before worship."],
    ["💔", "Rachel dies, Benjamin is born, and Isaac's life closes."],
    ["📜", "Esau's family line is recorded, preparing later Bible history."],
  ],
  takeaway: "God calls His people back to worship even after grief, failure, and painful family damage.",
  takeawaySupport: "Day 14 helps us see that renewal does not erase the pain, but it does bring the family back under God's promise.",
};

const dayFifteenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 37-38 begins Joseph's testing inside a family already full of favoritism, jealousy, and unresolved pain.",
    "Joseph receives dreams, but his brothers hear those dreams as a threat.",
    "Then Genesis turns to Judah and Tamar, showing that God is also exposing and reshaping the brother who helped sell Joseph.",
  ],
  highlights: [
    ["🧥", "Joseph's robe makes Jacob's favoritism visible."],
    ["🌙", "Joseph's dreams point toward a future his family cannot understand yet."],
    ["🕳️", "The brothers throw Joseph into a pit and sell him toward Egypt."],
    ["🐐", "Jacob is deceived with Joseph's robe and goat blood."],
    ["⚖️", "Judah is exposed by Tamar and finally tells the truth."],
  ],
  takeaway: "God's hidden plan can keep moving even through betrayal, family damage, and painful truth-telling.",
  takeawaySupport: "Day 15 helps us see that Joseph's testing starts at home, and Judah's transformation starts with being confronted by the truth.",
};

const daySixteenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 39-40 follows Joseph into Egypt, Potiphar's house, temptation, false accusation, prison, and forgotten service.",
    "The repeated anchor is that the Lord was with Joseph.",
    "This day teaches that God's presence is not limited to comfortable places or quick breakthroughs.",
  ],
  highlights: [
    ["ðŸ ", "Joseph serves faithfully in Potiphar's house."],
    ["ðŸš«", "Joseph refuses repeated temptation because he sees sin before God."],
    ["ðŸ§¥", "Joseph's garment becomes false evidence against him."],
    ["â›“ï¸", "Joseph is placed in prison, but the Lord is still with him."],
    ["ðŸ‡", "Joseph interprets the cupbearer and baker's dreams, then waits after being forgotten."],
  ],
  takeaway: "Hidden faithfulness is not wasted when God is still with the person who is waiting.",
  takeawaySupport: "Day 16 helps us see that Joseph's prison years are not empty years. God is forming his character, sharpening his gift, and placing him near the next door.",
};

const daySeventeenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 41-42 is the turning point where Joseph moves from prison to leadership in Egypt.",
    "Pharaoh's dreams reveal coming plenty and famine, and Joseph gives God credit before offering wise action.",
    "Then famine brings Joseph's brothers to Egypt, where the dreams from Genesis 37 begin coming true.",
  ],
  highlights: [
    ["dream", "Pharaoh's dreams trouble Egypt because no wise man can interpret them."],
    ["key", "The cupbearer remembers Joseph after two full years."],
    ["crown", "Joseph is lifted from prison and set over Egypt."],
    ["grain", "Joseph stores grain so there will be bread during famine."],
    ["bow", "Joseph's brothers bow before him without recognizing him."],
  ],
  takeaway: "God can turn hidden preparation into public responsibility and use pressure to bring buried truth into the light.",
  takeawaySupport: "Day 17 helps us see that Joseph's rise is not just personal success. God is preserving life and beginning the painful road toward family truth.",
};

const dayEighteenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 43-44 brings Benjamin into Egypt and puts the brothers through the final test before Joseph reveals himself.",
    "The question is simple but heavy: will they abandon Rachel's vulnerable son again, or have they changed?",
    "Judah becomes the center of the chapter as he offers himself in Benjamin's place.",
  ],
  highlights: [
    ["shield", "Judah becomes surety for Benjamin."],
    ["table", "Joseph feeds his brothers and gives Benjamin special favor."],
    ["cup", "The silver cup creates the final test."],
    ["return", "The brothers return together instead of abandoning Benjamin."],
    ["heart", "Judah offers himself as a servant in Benjamin's place."],
  ],
  takeaway: "Real repentance becomes visible when the old test returns and someone chooses differently.",
  takeawaySupport: "Day 18 helps us see Judah change from a brother who sold Joseph into a brother willing to stand in the gap for Benjamin.",
};

const dayNineteenSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 45-46 is the emotional release after years of hidden grief and unanswered questions.",
    "Joseph reveals himself, explains God's preserving purpose, and sends for Jacob.",
    "Then Jacob begins the journey into Egypt, but God meets him on the way and promises to go with him.",
  ],
  highlights: [
    ["tears", "Joseph weeps aloud and reveals his identity."],
    ["truth", "Joseph names the evil honestly: the brothers sold him."],
    ["providence", "Joseph also sees God's hand preserving life through the whole story."],
    ["wagons", "Jacob sees the wagons and his spirit revives."],
    ["presence", "God tells Jacob not to fear because He will go down with him into Egypt."],
  ],
  takeaway: "God can bring truth, tears, forgiveness, provision, and transition together without pretending the pain was small.",
  takeawaySupport: "Day 19 helps us see that God's providence does not erase evil, but it does prove evil never gets the final word over His promise.",
};

const dayTwentySummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 47-48 follows Jacob's family settling in Egypt while famine continues around them.",
    "Joseph provides for his household and manages Egypt's food crisis, but Jacob keeps looking toward the land God promised.",
    "Then Jacob blesses Joseph's sons, adopts them into the covenant family, and shows that God's blessing does not always follow human expectations.",
  ],
  highlights: [
    ["goshen", "Jacob's family receives a place to live and provision during famine."],
    ["blessing", "Jacob blesses Pharaoh, showing that the covenant promise still rests on him even in Egypt."],
    ["famine", "Joseph manages a severe crisis and preserves life through wise administration."],
    ["canaan", "Jacob asks to be buried in the promised land, because Egypt is not the final home."],
    ["crossed", "Jacob crosses his hands and sets Ephraim before Manasseh."],
  ],
  takeaway: "God's promise can keep moving through provision, old age, memory, blessing, and surprising grace.",
  takeawaySupport: "Day 20 helps us see that Egypt can preserve the family for a season, but God's covenant still points them back toward the land and forward to the next generation.",
};

const dayTwentyOneSummary: BibleYearSummaryContent = {
  intro: [
    "Genesis 49-50 closes the book of Genesis with final words, grief, forgiveness, and hope.",
    "Jacob speaks over his sons, naming both consequences and future promise, then dies still pointing toward Canaan.",
    "Joseph comforts his fearful brothers, names God's providence over evil, and dies in Egypt while trusting that God will surely visit His people.",
  ],
  highlights: [
    ["legacy", "Jacob's final words expose character, consequence, and future direction."],
    ["scepter", "Judah receives the royal promise that points the Bible toward kingship."],
    ["fruitful", "Joseph is described as fruitful even though he was attacked."],
    ["good", "Joseph says his brothers meant evil, but God meant it for good."],
    ["hope", "Joseph dies in Egypt but asks that his bones be carried up when God visits His people."],
  ],
  takeaway: "Genesis ends with death in Egypt, but not with defeat, because God's promise is still alive.",
  takeawaySupport: "Day 21 helps us see that grief, guilt, evil, and death do not get the final word over the God who preserves, forgives, and keeps His covenant.",
};

const dayTwentyTwoSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 1-4 begins the next major movement of the Bible story.",
    "Jacob's family has multiplied in Egypt, but a new Pharaoh turns their growth into fear, slavery, and a command of death.",
    "God preserves Moses, hears Israel's cry, reveals His name, and begins moving toward deliverance.",
  ],
  highlights: [
    ["growth", "Israel multiplies in Egypt just as God promised."],
    ["bondage", "Pharaoh's fear turns into cruel oppression."],
    ["midwives", "Shiphrah and Puah fear God and preserve life."],
    ["bush", "God meets Moses at the burning bush and calls him."],
    ["name", "God reveals Himself as I AM and sends Moses back to Egypt."],
  ],
  takeaway: "God hears His people under oppression before they can see deliverance with their eyes.",
  takeawaySupport: "Day 22 helps us see that God's rescue often begins quietly through hidden courage, wilderness preparation, covenant memory, and the God who says, I have surely seen.",
};

const dayTwentyThreeSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 5-8 brings Moses and Aaron before Pharaoh with God's command: Let My people go.",
    "Pharaoh refuses, increases Israel's suffering, and asks the question the plagues will answer: Who is the LORD?",
    "God repeats His promise to Moses and begins dismantling Egypt's confidence through signs and early plagues.",
  ],
  highlights: [
    ["burdens", "Pharaoh makes Israel's work harder after Moses obeys God."],
    ["promise", "God answers Moses' discouragement by repeating, I am the LORD."],
    ["staff", "Aaron's staff swallows the magicians' staffs."],
    ["nile", "The Nile turns to blood, striking Egypt's source of life."],
    ["goshen", "God makes a distinction between Egypt and Goshen during the swarms."],
  ],
  takeaway: "Pharaoh's resistance is real, but it cannot stop God from revealing His power and keeping His covenant.",
  takeawaySupport: "Day 23 helps us see that obedience can become harder before deliverance is visible, but resistance does not mean God has lost control.",
};

const dayTwentyFourSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 9-12 brings the plague story to its breaking point.",
    "God keeps making a distinction between Egypt and Israel while Pharaoh keeps seeking relief without true surrender.",
    "The reading centers on Passover, where God gives Israel a lamb, blood on the doorposts, a meal of memory, and the night of deliverance.",
  ],
  highlights: [
    ["livestock", "Egypt's livestock are struck while Israel's livestock are protected."],
    ["hail", "God warns Egypt before the hail, and some begin to fear His word."],
    ["darkness", "Darkness covers Egypt for three days while Israel has light."],
    ["lamb", "Each household takes an unblemished lamb for Passover."],
    ["blood", "The blood on the doorposts marks the houses sheltered from judgment."],
  ],
  takeaway: "Passover teaches that deliverance is something God provides, not something Israel achieves.",
  takeawaySupport: "Day 24 helps us see judgment, mercy, memory, worship, and rescue coming together as God brings His people out of Egypt.",
};

const dayTwentyFiveSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 13-16 follows Israel after Passover and into the first lessons of freedom.",
    "God teaches them to remember redemption, follows them with cloud and fire, opens the sea, receives their song, heals bitter water, and gives manna in the wilderness.",
    "This day shows that God does not only bring His people out of bondage; He patiently forms them into people who can trust Him.",
  ],
  highlights: [
    ["firstborn", "The firstborn are set apart as a reminder that God spared Israel on Passover night."],
    ["cloud", "The LORD leads Israel by cloud in the day and fire at night."],
    ["sea", "God opens the sea, Israel passes through, and Egypt's army falls."],
    ["song", "Moses, Israel, and Miriam praise the LORD for His victory."],
    ["manna", "God gives daily bread from heaven and teaches Sabbath rest."],
  ],
  takeaway: "Freedom is not only leaving Egypt; freedom is learning to follow, trust, worship, depend, and rest under God's care.",
  takeawaySupport: "Day 25 helps us see that the LORD who saves His people also leads them through the wilderness one step and one day at a time.",
};

const dayTwentySixSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 17-20 moves Israel from wilderness need to covenant formation at Sinai.",
    "The people receive water from the rock, face Amalek in battle, learn shared leadership through Jethro, and hear God's voice in the Ten Commandments.",
    "This day shows that the God who rescues His people also provides, defends, organizes, and teaches them how to live.",
  ],
  highlights: [
    ["water", "God brings water from the rock when Israel thirsts at Rephidim."],
    ["banner", "Israel defeats Amalek while Moses' hands are supported, and the LORD is named their banner."],
    ["wisdom", "Jethro helps Moses share the burden of leadership."],
    ["sinai", "God brings Israel to Sinai and calls them His treasured possession."],
    ["command", "God speaks the Ten Commandments to shape life for His redeemed people."],
  ],
  takeaway: "God did not free Israel so they could belong to themselves; He freed them so they could belong to Him.",
  takeawaySupport: "Day 26 helps us see that deliverance must become formation: trust, worship, wise leadership, holy reverence, and covenant obedience.",
};

const dayTwentySevenSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 21-24 continues at Sinai by showing what covenant life looks like in ordinary situations.",
    "God gives laws about servants, violence, theft, courts, rest, worship, strangers, enemies, and the promised land.",
    "Then the covenant is sealed with blood, and Israel's leaders see God and eat before Him.",
  ],
  highlights: [
    ["justice", "God applies covenant holiness to servants, injuries, restitution, and responsibility."],
    ["vulnerable", "Strangers, widows, orphans, and the poor receive special protection."],
    ["truth", "Israel must not follow crowds, twist justice, or take bribes."],
    ["feasts", "Sabbath and yearly feasts shape Israel's time around rest, memory, and worship."],
    ["blood", "The covenant is sealed with sacrifice, blood, God's words, and Israel's response."],
  ],
  takeaway: "Covenant life reaches ordinary life: homes, courts, work, money, speech, worship, rest, and justice.",
  takeawaySupport: "Day 27 helps us see that God's redeemed people must not become another Egypt; they are called to live under God's justice, mercy, holiness, and covenant blood.",
};

const dayTwentyEightSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 25-28 begins the tabernacle instructions after the covenant is sealed at Sinai.",
    "God gives Moses the pattern for a sanctuary, the ark, mercy seat, table, lampstand, curtains, veil, altar, courtyard, oil, and priestly garments.",
    "This section shows that the holy God wants to dwell among His redeemed people, but He teaches them how to approach Him rightly.",
  ],
  highlights: [
    ["offering", "The tabernacle begins with willing offerings, not forced labor."],
    ["mercy", "The ark and mercy seat become the place where God will meet with Moses."],
    ["veil", "The veil teaches that God's presence is near but holy."],
    ["altar", "The bronze altar shows that sacrifice comes before approach."],
    ["priest", "Aaron carries Israel's names on his shoulders and over his heart."],
  ],
  takeaway: "The God who brought Israel out now wants to dwell among them.",
  takeawaySupport: "Day 28 helps us see the tabernacle as more than religious furniture: it is presence, mercy, sacrifice, holiness, priesthood, and the architecture of redemption.",
};

const dayTwentyNineSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 29-32 holds one of the strongest contrasts in the book.",
    "God gives instructions for consecrating priests, daily offerings, incense, cleansing, holy oil, Spirit-filled craftsmanship, Sabbath, and covenant tablets.",
    "But while Moses is receiving holy instructions, Israel grows impatient and makes the golden calf.",
  ],
  highlights: [
    ["priest", "Aaron and his sons are washed, clothed, anointed, and consecrated for service."],
    ["incense", "The altar of incense, ransom money, laver, holy oil, and incense teach ordered approach to God."],
    ["skill", "Bezalel and Oholiab are gifted by God for craftsmanship and tabernacle work."],
    ["calf", "Israel turns gold into an idol while God is giving instructions for true worship."],
    ["mediator", "Moses intercedes and offers himself, pointing toward the need for a greater mediator."],
  ],
  takeaway: "The same gold can become sanctuary material or an idol, depending on whether it is surrendered to God or shaped by fear.",
  takeawaySupport: "Day 29 helps us see that God is holy, worship must be shaped by His word, idolatry is deadly, and sinful people need true mediation.",
};

const dayThirtySummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 33-36 follows the aftermath of the golden calf and asks whether God's presence will still go with Israel.",
    "Moses pleads for God's presence, asks to see God's glory, and hears the LORD proclaim His merciful and faithful name.",
    "Then the covenant is renewed, Moses' face shines, and the people bring willing offerings as the tabernacle begins to take shape.",
  ],
  highlights: [
    ["presence", "Moses refuses to move forward without God's presence."],
    ["glory", "God reveals His glory through His goodness and His name."],
    ["mercy", "The LORD declares Himself merciful, gracious, patient, faithful, forgiving, and just."],
    ["willing", "The people bring freewill offerings for the tabernacle."],
    ["enough", "The people bring more than enough for the work God commanded."],
  ],
  takeaway: "The promised land is not enough without the presence of God.",
  takeawaySupport: "Day 30 helps us see that after great failure, Israel's hope is not their record but God's merciful presence, and mercy produces renewed obedience.",
};

const dayThirtyOneSummary: BibleYearSummaryContent = {
  intro: [
    "Exodus 37-40 finishes the book of Exodus by showing the tabernacle completed and set up.",
    "The ark, mercy seat, table, lampstand, incense altar, bronze altar, laver, courtyard, and priestly garments are made according to God's command.",
    "Then the cloud covers the tent, the glory of the LORD fills the tabernacle, and God guides Israel by cloud and fire.",
  ],
  highlights: [
    ["ark", "The ark and mercy seat are made for the Most Holy Place."],
    ["altar", "The bronze altar and laver teach sacrifice and cleansing before approach."],
    ["garments", "The priestly garments carry Israel's names before the LORD."],
    ["obedience", "The work is completed just as the LORD commanded Moses."],
    ["glory", "The glory of the LORD fills the tabernacle at the end of Exodus."],
  ],
  takeaway: "God did not only rescue Israel from Egypt; He came to dwell among them.",
  takeawaySupport: "Day 31 helps us see Exodus move from groaning under Pharaoh to God's glory in the middle of the camp, guiding His people through the wilderness.",
};

const dayThirtyTwoSummary: BibleYearSummaryContent = {
  intro: [
    "Leviticus 1-4 begins right after God's glory fills the tabernacle at the end of Exodus.",
    "The LORD speaks from the tent of meeting and teaches Israel about burnt offerings, grain offerings, peace offerings, and sin offerings.",
    "This day shows how sinful people can approach a holy God through the way He provides.",
  ],
  highlights: [
    ["burnt", "The burnt offering teaches surrender, cost, and atonement."],
    ["grain", "The grain offering gives daily provision back to God with gratitude."],
    ["peace", "The peace offering points to fellowship and wholeness before the LORD."],
    ["sin", "The sin offering shows that guilt must be cleansed and forgiven."],
    ["mercy", "Priests, leaders, communities, and ordinary people all need atonement."],
  ],
  takeaway: "The holy God who dwells among His people also provides the way for His people to come near.",
  takeawaySupport: "Day 32 helps us see that Leviticus is not random ritual; it is instruction for surrender, gratitude, fellowship, cleansing, atonement, and mercy near God's presence.",
};

const dayThirtyThreeSummary: BibleYearSummaryContent = {
  intro: [
    "Leviticus 5-8 continues the offering instructions and then shows Aaron and his sons being consecrated as priests.",
    "These chapters focus on confession, guilt, restitution, priestly duties, peace offerings, and ordination.",
    "This day shows that guilt is not only a feeling; it must be confessed, repaired when possible, and brought under the atonement God provides.",
  ],
  highlights: [
    ["confession", "The worshiper must confess specific sin instead of hiding behind vague regret."],
    ["restitution", "The guilt offering teaches repair by requiring repayment plus a fifth."],
    ["neighbor", "Wronging another person is also called a trespass against the LORD."],
    ["altar", "The altar fire must keep burning as the priests tend holy service continually."],
    ["priests", "Aaron and his sons are washed, clothed, anointed, and marked with blood for service."],
  ],
  takeaway: "God exposes guilt so it can be confessed, repaired, atoned for, and brought back under His mercy.",
  takeawaySupport: "Day 33 helps us see that worship, justice, priesthood, and holiness all belong together in life near God's presence.",
};

const dayThirtyFourSummary: BibleYearSummaryContent = {
  intro: [
    "Leviticus 9-12 moves from priestly ordination into public priestly ministry.",
    "Aaron offers sacrifices, God's glory appears, Nadab and Abihu offer unauthorized fire, and Israel begins learning clean and unclean distinctions.",
    "This day shows that God's nearness is beautiful, but holiness must shape worship and ordinary daily life.",
  ],
  highlights: [
    ["glory", "The glory of the LORD appears when Aaron begins priestly ministry."],
    ["fire", "God's fire accepts the offering in Leviticus 9 and judges strange fire in Leviticus 10."],
    ["priests", "Priests must distinguish holy from common and clean from unclean."],
    ["food", "Clean and unclean food laws train Israel to live as a set-apart people."],
    ["birth", "Purification after childbirth shows that bodies and family life also belong before God."],
  ],
  takeaway: "Because God lives among His people, holiness begins to touch everything.",
  takeawaySupport: "Day 34 helps us see that worship, reverence, discernment, meals, bodies, and family life are all shaped by life near God's holy presence.",
};

const dayThirtyFiveSummary: BibleYearSummaryContent = {
  intro: [
    "Leviticus 13-16 explains how uncleanness is examined, contained, cleansed, and restored.",
    "The reading moves from skin disease, garments, houses, and bodily discharges to the central Day of Atonement.",
    "This day shows that God does not minimize sin or uncleanness, but He provides cleansing, restoration, and a way for sin to be carried away.",
  ],
  highlights: [
    ["clean", "Priests carefully examine people and objects before declaring clean or unclean."],
    ["outside", "Some uncleanness places a person outside the camp until restoration is possible."],
    ["restore", "Leviticus 14 gives a way for the healed person to return to community and worship."],
    ["mercy seat", "The high priest brings blood into the Most Holy Place on the Day of Atonement."],
    ["scapegoat", "The live goat carries Israel's confessed sins away into the wilderness."],
  ],
  takeaway: "God exposes uncleanness so cleansing, restoration, and atonement can happen His way.",
  takeawaySupport: "Day 35 helps us see that God's holiness names the problem honestly, and God's mercy provides a way back.",
};

const dayThirtySixSummary: BibleYearSummaryContent = {
  intro: [
    "Leviticus 17-20 moves from the Day of Atonement into holy living.",
    "These chapters teach that blood, worship, desire, family, justice, speech, business, strangers, and community life all belong before the LORD.",
    "This day shows that holiness is not only about avoiding sin; it is about belonging to God.",
  ],
  highlights: [
    ["blood", "The life of the flesh is in the blood, and God gives blood upon the altar for atonement."],
    ["worship", "Sacrifice must come to the tabernacle instead of drifting into hidden or false worship."],
    ["boundaries", "God gives holy boundaries for desire, family, marriage, children, and the body."],
    ["neighbor", "Leviticus 19 connects holiness with justice, mercy, truthful speech, and love for neighbor and stranger."],
    ["belonging", "God separates His people from the nations so that they should be His."],
  ],
  takeaway: "Holiness reaches the whole life because God's people belong to the holy LORD.",
  takeawaySupport: "Day 36 helps us see that Leviticus is not random rules; it is God forming a people whose worship, bodies, relationships, justice, and mercy reflect Him.",
};

const dayThirtySevenSummary: BibleYearSummaryContent = {
  intro: [
    "Leviticus 21-24 keeps moving through holy life near a holy God.",
    "These chapters focus on priests, offerings, feasts, lamps, bread, reverence, justice, and the seriousness of the LORD's name.",
    "Day 37 shows that Israel's worship calendar, worship leaders, and public justice all belong under God's holy order.",
  ],
  highlights: [
    ["priests", "The priests must guard holiness because they stand before the LORD on behalf of the people."],
    ["offerings", "Sacrifices brought near to God must not treat Him as common."],
    ["feasts", "The appointed feasts teach Israel to remember God's saving work through the year."],
    ["lamp and bread", "The tabernacle lamp and bread keep worship ordered before the LORD continually."],
    ["name", "The LORD's name is holy, so blasphemy and justice are treated with seriousness."],
  ],
  takeaway: "Holy worship shapes leaders, time, offerings, speech, and justice.",
  takeawaySupport: "Day 37 helps us see that Israel's worship was not random activity. God ordered the people so their priests, calendar, gifts, and community life would reflect His holiness.",
};

const dayThirtyEightSummary: BibleYearSummaryContent = {
  intro: [
    "Leviticus 25-27 closes Leviticus with Sabbath years, Jubilee, covenant blessing, covenant warning, vows, and devoted things.",
    "Then Numbers begins by counting Israel's fighting men in the wilderness.",
    "Day 38 turns from holy order in Leviticus to the numbered camp of Israel preparing to move forward.",
  ],
  highlights: [
    ["jubilee", "The Jubilee teaches that land, freedom, and family inheritance belong under God's mercy."],
    ["covenant", "Blessing and warning show that Israel's life depends on listening to the LORD."],
    ["vows", "Leviticus ends by teaching that promises, gifts, and devoted things must be treated seriously."],
    ["numbered", "Numbers begins with Israel being counted by families, tribes, and armies."],
    ["wilderness", "The people are still in the wilderness, but God is ordering them for the road ahead."],
  ],
  takeaway: "God orders His people for covenant life, mercy, obedience, and movement.",
  takeawaySupport: "Day 38 helps us see the bridge from Leviticus to Numbers. The holy people now become an ordered camp ready to travel with the LORD.",
};

const dayThirtyNineSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 2-5 shows Israel arranged around the tabernacle, the Levites assigned to holy service, and the camp kept clean.",
    "The reading moves from marching order to priestly duties, then to purity and justice within the community.",
    "Day 39 shows that the LORD does not only rescue His people; He orders them around His presence.",
  ],
  highlights: [
    ["camp", "The tribes camp by standards around the tabernacle, showing that God's presence is at the center."],
    ["Levites", "The Levites are counted and assigned to guard and carry holy things."],
    ["Kohath", "The sons of Kohath handle the most holy things only after they are covered."],
    ["clean", "Uncleanness is sent outside the camp because the LORD dwells among Israel."],
    ["justice", "Confession, restitution, and difficult marriage cases are brought under God's authority."],
  ],
  takeaway: "The camp must be ordered because the holy God is living among His people.",
  takeawaySupport: "Day 39 helps us understand that Numbers is not just lists. It shows a whole community learning to live, move, serve, and stay clean around the LORD's presence.",
};

const dayFortySummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 6-9 brings blessing, dedication, light, Levitical service, Passover, and God's visible guidance.",
    "The people receive the priestly blessing, leaders bring offerings, Levites are cleansed, and Israel keeps Passover in the wilderness.",
    "Day 40 ends with the cloud over the tabernacle, showing that Israel moves and stops by the commandment of the LORD.",
  ],
  highlights: [
    ["blessing", "The priestly blessing speaks the LORD's name over Israel with grace and peace."],
    ["dedication", "The leaders bring offerings when the altar is dedicated."],
    ["lampstand", "The lamps shine before the LORD as worship continues in the tabernacle."],
    ["Passover", "Israel keeps Passover in the wilderness to remember rescue from Egypt."],
    ["cloud", "The cloud guides Israel, teaching them when to move and when to wait."],
  ],
  takeaway: "God blesses, orders, cleanses, feeds memory, and guides His people step by step.",
  takeawaySupport: "Day 40 helps us see Israel learning life with God in the wilderness. They do not move by guesswork. They follow the LORD's presence.",
};

const dayFortyOneSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 10-13 begins with Israel setting forward from Sinai.",
    "The camp moves by trumpets and cloud, but the journey quickly exposes complaint, craving, leadership pressure, family conflict, and fear.",
    "Day 41 ends with spies seeing the land and Israel standing at a major faith test.",
  ],
  highlights: [
    ["trumpets", "Silver trumpets gather the camp, signal movement, sound alarm, and mark worship."],
    ["journey", "Israel sets forward from Sinai in ordered formation with the ark going before them."],
    ["complaint", "The people despise manna and remember Egypt wrongly."],
    ["leadership", "God gives seventy elders to help Moses bear the burden."],
    ["spies", "The spies see fruitful Canaan, but most return with fear instead of faith."],
  ],
  takeaway: "The wilderness journey reveals whether God's people will trust the God who leads them.",
  takeawaySupport: "Day 41 helps us see that guidance, provision, and promise are real, but complaints and fear can still distort the heart.",
};

const dayFortyTwoSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 14-17 shows unbelief becoming rebellion.",
    "Israel refuses the land, Moses intercedes, the generation is sentenced to wander, and Korah challenges God's appointed leadership.",
    "The day closes with Aaron's rod budding, a sign that God Himself chooses the priesthood.",
  ],
  highlights: [
    ["unbelief", "Israel treats the promised land like death and Egypt like safety."],
    ["intercession", "Moses pleads according to the LORD's mercy and reputation."],
    ["wandering", "Forty days of spying become forty years in the wilderness."],
    ["rebellion", "Korah challenges Moses and Aaron, and God judges the uprising."],
    ["rod", "Aaron's dead rod buds, blossoms, and bears almonds before the LORD."],
  ],
  takeaway: "Unbelief is serious, but God still preserves His promise and confirms His appointed mediator.",
  takeawaySupport: "Day 42 helps us understand rebellion, intercession, priesthood, and God's power to bring life from what looked dead.",
};

const dayFortyThreeSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 18-21 moves through priestly provision, cleansing from death, Moses' failure, Aaron's death, fiery serpents, and victories.",
    "The wilderness keeps showing judgment and mercy side by side.",
    "The bronze serpent becomes a powerful picture of healing by looking to the remedy God provides.",
  ],
  highlights: [
    ["priests", "God clarifies priestly and Levitical duties after rebellion."],
    ["cleansing", "The red heifer provides purification from death's uncleanness."],
    ["rock", "Moses strikes the rock and fails to sanctify the LORD before the people."],
    ["serpent", "Bitten Israelites live when they look at the bronze serpent."],
    ["victory", "God gives Israel victories over Sihon and Og as the journey continues."],
  ],
  takeaway: "The wilderness exposes sin, but God keeps providing cleansing, water, healing, and forward movement.",
  takeawaySupport: "Day 43 helps us see God's mercy inside hard chapters where death, failure, judgment, and hope all meet.",
};

const dayFortyFourSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 22-25 follows Balak and Balaam as Moab tries to curse Israel.",
    "God turns attempted curses into blessing and speaks through Balaam, but Israel later falls into compromise at Baalpeor.",
    "Day 44 shows that outside opposition cannot overturn God's blessing, but inward compromise is still dangerous.",
  ],
  highlights: [
    ["Balak", "Moab's king fears Israel and hires Balaam to curse them."],
    ["donkey", "Balaam's donkey sees the angel before Balaam does."],
    ["blessing", "Balaam repeatedly blesses Israel because God controls the word spoken."],
    ["star", "A star out of Jacob points toward future kingship and victory."],
    ["compromise", "Israel joins itself to Baalpeor and faces deadly judgment."],
  ],
  takeaway: "No curse can cancel God's blessing, but God's people must still guard against compromise.",
  takeawaySupport: "Day 44 helps us see God's protection over Israel from outside threats and His holy jealousy when His people turn aside.",
};

const dayFortyFiveSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 26-29 counts a new generation and prepares Israel for inheritance, leadership, and worship.",
    "The old unbelieving generation has fallen, but God's promise has not failed.",
    "Day 45 shows the LORD ordering names, land, Joshua's leadership, and regular offerings before Israel enters Canaan.",
  ],
  highlights: [
    ["counted", "A new generation is counted after the wilderness judgment."],
    ["inheritance", "Zelophehad's daughters ask for inheritance, and God gives a just answer."],
    ["Joshua", "Joshua is commissioned so Israel will not be like sheep without a shepherd."],
    ["offerings", "Daily, Sabbath, monthly, and feast offerings shape Israel's worship rhythm."],
    ["calendar", "The seventh month teaches remembrance, atonement, rejoicing, and ordered worship."],
  ],
  takeaway: "God keeps His promise by preparing a new generation for land, leadership, justice, and worship.",
  takeawaySupport: "Day 45 helps us see that the wilderness did not cancel God's plan. The LORD is still arranging His people for covenant life.",
};

const dayFortySixSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 30-33 moves through vows, judgment on Midian, settlement east of Jordan, and Israel's journey record.",
    "The reading teaches that words matter, compromise has consequences, and memory matters before entering the land.",
    "Day 46 shows Israel preparing for inheritance while still needing faithfulness, courage, and separation from idolatry.",
  ],
  highlights: [
    ["vows", "Words spoken before the LORD must be taken seriously."],
    ["Midian", "Judgment on Midian connects back to the deadly compromise at Baalpeor."],
    ["Jordan", "Reuben, Gad, and half Manasseh must not abandon the rest of Israel."],
    ["journey", "The journey stages remember how far the LORD carried His people."],
    ["warning", "Remaining idolatry in the land will become a snare if Israel compromises."],
  ],
  takeaway: "The promised land requires truthful words, shared responsibility, remembered grace, and holy separation.",
  takeawaySupport: "Day 46 helps us understand that entering the land is not just geography. It is a call to covenant faithfulness.",
};

const dayFortySevenSummary: BibleYearSummaryContent = {
  intro: [
    "Numbers 34-36 closes Numbers with land boundaries, Levite cities, cities of refuge, and inheritance protection.",
    "Then Deuteronomy begins with Moses speaking across Jordan to the new generation.",
    "Day 47 marks a transition from wilderness record to covenant sermon.",
  ],
  highlights: [
    ["boundaries", "The borders of Canaan make the promise specific."],
    ["Levites", "Levite cities scatter spiritual service throughout Israel."],
    ["refuge", "Cities of refuge protect justice while guarding the land from bloodguilt."],
    ["inheritance", "Zelophehad's daughters and tribal inheritance are protected together."],
    ["memory", "Moses begins retelling the journey so the new generation learns from the past."],
  ],
  takeaway: "God prepares Israel for land with boundaries, justice, refuge, inheritance, and memory.",
  takeawaySupport: "Day 47 helps us feel the handoff from Numbers to Deuteronomy: the people are near the land, and Moses begins teaching them how to remember.",
};

const dayFortyEightSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 2-5 remembers the journey and repeats the covenant.",
    "Moses reminds Israel where God restrained them, where God gave victory, and how God spoke at Horeb.",
    "Day 48 teaches that memory is meant to produce obedience.",
  ],
  highlights: [
    ["restraint", "Israel must not seize lands God gave to Edom, Moab, and Ammon."],
    ["victory", "Sihon and Og are defeated because the LORD gives victory."],
    ["Joshua", "Moses strengthens Joshua for the leadership ahead."],
    ["idols", "Israel heard God's voice but saw no form, so they must not make images."],
    ["commandments", "The Ten Commandments are repeated for the new generation."],
  ],
  takeaway: "Remembering God's past faithfulness prepares the heart for present obedience.",
  takeawaySupport: "Day 48 helps us see Deuteronomy as more than review. Moses is teaching the new generation how to remember rightly and obey faithfully.",
};

const dayFortyNineSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 6-9 contains the great call to love the LORD with all the heart, soul, and might.",
    "Moses warns Israel not to forget God in prosperity and not to think the land is earned by their own righteousness.",
    "Day 49 teaches love, memory, humility, and grace.",
  ],
  highlights: [
    ["Shema", "Hear, O Israel calls God's people to exclusive covenant loyalty."],
    ["love", "Israel must love the LORD with the whole heart, soul, and might."],
    ["chosen", "God chose Israel because He loved them and kept His oath."],
    ["remember", "Manna taught Israel that life depends on every word from the LORD."],
    ["grace", "The land is not given because of Israel's righteousness."],
  ],
  takeaway: "Covenant obedience begins with love for God and humble memory of grace.",
  takeawaySupport: "Day 49 helps us see that Deuteronomy is aiming at the heart, not just outward behavior.",
};

const dayFiftySummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 10-13 presses covenant loyalty into the heart, home, worship, and community.",
    "Moses calls Israel to fear, love, serve, cleave to, and obey the LORD.",
    "Day 50 shows that true loyalty must resist idolatry from the inside out.",
  ],
  highlights: [
    ["heart", "Circumcise your heart means the inner life must belong to God."],
    ["blessing", "Blessing and curse are set before Israel as a real covenant choice."],
    ["worship", "Israel must worship at the place the LORD chooses, not according to pagan patterns."],
    ["warning", "False prophets, family pressure, and cities can all tempt people away from God."],
    ["loyalty", "Love for the LORD must be stronger than signs, pressure, and community drift."],
  ],
  takeaway: "True covenant loyalty is love, obedience, worship, and allegiance from the heart.",
  takeawaySupport: "Day 50 helps us see that God wants more than religious activity. He wants His people to belong to Him fully.",
};

const dayFiftyOneSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 14-17 shows covenant life reaching worship, generosity, justice, feasts, courts, and leadership.",
    "Moses teaches Israel that holiness is not only a sanctuary idea. It touches food, money, mercy, judges, and even the future king.",
    "Day 51 shows that worship, justice, and leadership must all stay under the LORD's word.",
  ],
  highlights: [
    ["holiness", "Israel is called the children of the LORD and a holy people."],
    ["generosity", "The seventh-year release teaches open-handed mercy toward the poor."],
    ["feasts", "Passover, Weeks, and Tabernacles keep rescue and provision in Israel's memory."],
    ["justice", "Judges must not twist judgment or take bribes."],
    ["king", "The future king must read God's law and stay humble under it."],
  ],
  takeaway: "Covenant life reaches the table, the tithe, the courts, the feasts, and the throne.",
  takeawaySupport: "Day 51 helps us see that God's people are meant to be holy in public, private, religious, and civic life.",
};

const dayFiftyTwoSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 18-21 teaches Israel how to handle true words, false practices, refuge, witnesses, war, and difficult justice.",
    "The land must not be ruled by magic, revenge, panic, false testimony, or careless bloodshed.",
    "Day 52 shows that God's people need true prophecy and careful justice in the hardest parts of life.",
  ],
  highlights: [
    ["Levites", "The priests and Levites have the LORD as their inheritance."],
    ["prophet", "God promises to raise up a prophet like Moses."],
    ["refuge", "Cities of refuge slow revenge down so justice can be heard."],
    ["witness", "False witnesses are judged because truth matters in court."],
    ["war", "Even battle is placed under the LORD's command and order."],
  ],
  takeaway: "True covenant justice listens to God's word, protects life, and refuses false spiritual shortcuts.",
  takeawaySupport: "Day 52 helps us see that Deuteronomy cares about the real pressure points of community life.",
};

const dayFiftyThreeSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 22-25 brings covenant obedience into ordinary daily life.",
    "Moses teaches about lost animals, roofs, clothing, marriage, the camp, vows, wages, pledges, gleaning, punishment, honest weights, and Amalek.",
    "Day 53 shows that holiness is not only for special days. It belongs in everyday faithfulness.",
  ],
  highlights: [
    ["neighbor", "Lost property must be restored instead of ignored."],
    ["safety", "A roof needs a battlement because love protects life before harm happens."],
    ["mercy", "Workers, strangers, widows, and fatherless people are protected from exploitation."],
    ["justice", "Punishment must be restrained and honest measures must be used."],
    ["memory", "Israel must remember Amalek's cruelty and not let evil be treated lightly."],
  ],
  takeaway: "Everyday faithfulness matters because ordinary life is lived before the LORD.",
  takeawaySupport: "Day 53 helps us see that God's law trains His people to love their neighbor in practical ways.",
};

const dayFiftyFourSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 26-29 brings Israel to firstfruits, covenant confession, written law, blessing, curse, and renewal in Moab.",
    "Moses calls Israel to remember rescue, answer Amen, take warning seriously, and obey what God has revealed.",
    "Day 54 shows covenant renewal as worship, memory, obedience, warning, and trust.",
  ],
  highlights: [
    ["firstfruits", "Israel must confess the rescue story when bringing firstfruits."],
    ["Amen", "The people answer the covenant curses publicly."],
    ["blessing", "Obedience is connected to blessing in city, field, family, work, and land."],
    ["curse", "Disobedience is warned against with sober detail."],
    ["revealed", "The secret things belong to the LORD, but revealed things belong to obedience."],
  ],
  takeaway: "Covenant renewal calls God's people to remember, confess, obey, and take His warnings seriously.",
  takeawaySupport: "Day 54 helps us see that blessing and curse are not abstract ideas. They press Israel to choose covenant faithfulness before entering the land.",
};

const dayFiftyFiveSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 30-33 brings Moses' final covenant teaching close to Israel's heart.",
    "Moses calls the people to choose life, charges Joshua, teaches a witness song, and blesses the tribes.",
    "Day 55 is about final words that prepare Israel to live faithfully after Moses.",
  ],
  highlights: [
    ["choose life", "Moses sets life and death before Israel."],
    ["Joshua", "Joshua is charged to be strong and courageous."],
    ["song", "The Song of Moses becomes a witness for future generations."],
    ["Rock", "The LORD is praised as faithful, just, and perfect in His ways."],
    ["blessing", "Moses blesses the tribes before his death."],
  ],
  takeaway: "Life is found in loving the LORD, obeying His voice, and holding fast to Him.",
  takeawaySupport: "Day 55 helps us hear Moses' final call before the story moves into Joshua.",
};

const dayFiftySixSummary: BibleYearSummaryContent = {
  intro: [
    "Deuteronomy 34 and Joshua 1-3 move the story from Moses to Joshua.",
    "Moses dies, Joshua is commissioned, Rahab protects the spies, and Israel crosses the Jordan.",
    "Day 56 shows that God's promise continues even after a great leader is gone.",
  ],
  highlights: [
    ["Moses", "Moses sees the land and dies in Moab."],
    ["courage", "Joshua is commanded to be strong and courageous."],
    ["Rahab", "Rahab confesses faith and protects the spies."],
    ["scarlet cord", "Rahab's household receives a sign of rescue."],
    ["Jordan", "The LORD stops the river so Israel crosses on dry ground."],
  ],
  takeaway: "The LORD's presence is the foundation for courage in the next season.",
  takeawaySupport: "Day 56 helps us see leadership transition without losing sight of God's faithful promise.",
};

const dayFiftySevenSummary: BibleYearSummaryContent = {
  intro: [
    "Joshua 4-7 moves from memorial stones to Jericho's fall and Achan's sin.",
    "Israel remembers the Jordan crossing, renews covenant signs, sees a great victory, and then faces hidden disobedience.",
    "Day 57 teaches memory, obedience, mercy, and holy seriousness.",
  ],
  highlights: [
    ["stones", "Memorial stones teach future children what the LORD did."],
    ["Gilgal", "Israel renews covenant signs before battle."],
    ["Jericho", "The walls fall as Israel obeys God's command."],
    ["Rahab", "Rahab and her household are spared."],
    ["Achan", "Hidden sin brings defeat and judgment."],
  ],
  takeaway: "God's people must remember His works and take obedience seriously after victory.",
  takeawaySupport: "Day 57 helps us see that victory is not permission to become careless with sin.",
};

const dayFiftyEightSummary: BibleYearSummaryContent = {
  intro: [
    "Joshua 8-11 follows Israel through Ai, Gibeon, the southern battle, and the northern campaign.",
    "The chapters show victory, covenant renewal, deception, prayer, and continued obedience.",
    "Day 58 keeps tying conquest to the LORD's command and the LORD's help.",
  ],
  highlights: [
    ["Ai", "The LORD gives Ai into Joshua's hand after Achan's sin is judged."],
    ["law", "Joshua reads blessing and curse before all Israel."],
    ["Gibeon", "Israel is deceived because they do not ask counsel of the LORD."],
    ["sun", "The LORD hears Joshua and fights for Israel."],
    ["rest", "The land rests from war after the northern kings are defeated."],
  ],
  takeaway: "Courage and victory must stay joined to obedience and seeking the LORD.",
  takeawaySupport: "Day 58 helps us see that conquest in Joshua is not self-confidence, but covenant obedience under God's command.",
};

const dayFiftyNineSummary: BibleYearSummaryContent = {
  intro: [
    "Joshua 12-15 moves from conquered kings to distributed inheritance.",
    "These chapters list victories, unfinished land, Caleb's inheritance, and Judah's borders.",
    "Day 59 shows God's promise becoming real geography for real families.",
  ],
  highlights: [
    ["kings", "The defeated kings are remembered as proof of the LORD's victories."],
    ["inheritance", "The land is distributed as promised inheritance."],
    ["Caleb", "Caleb receives Hebron after decades of steady faith."],
    ["Judah", "Judah's borders and cities are recorded in detail."],
    ["unfinished", "The land is given, but some obedience remains incomplete."],
  ],
  takeaway: "God's promises become concrete, but receiving inheritance still calls for faithfulness.",
  takeawaySupport: "Day 59 helps us read land lists as promise taking shape, not empty geography.",
};

const daySixtySummary: BibleYearSummaryContent = {
  intro: [
    "Joshua 16-19 continues the inheritance for Joseph's descendants and the remaining tribes.",
    "The chapters include Ephraim, Manasseh, Zelophehad's daughters, Shiloh, the land survey, and the final tribal portions.",
    "Day 60 shows inheritance being ordered around worship, family, and the LORD's promise.",
  ],
  highlights: [
    ["Ephraim", "Ephraim receives land but leaves unfinished obedience at Gezer."],
    ["Manasseh", "Manasseh's inheritance includes Zelophehad's daughters."],
    ["Shiloh", "The tabernacle is set up at Shiloh."],
    ["survey", "The remaining land is described and divided by lot."],
    ["Joshua", "Joshua receives his inheritance after the tribes receive theirs."],
  ],
  takeaway: "Inheritance is a gift from God that must be lived in with obedience and trust.",
  takeawaySupport: "Day 60 helps us see the promised land becoming ordered life for the tribes of Israel.",
};

const daySixtyOneSummary: BibleYearSummaryContent = {
  intro: [
    "Joshua 20-23 brings refuge, Levite cities, unity, rest, and Joshua's warning to Israel's leaders.",
    "The land has been received, but the people still need justice, pure worship, careful listening, and covenant loyalty.",
    "Day 61 shows that fulfilled promise must be guarded by faithful obedience.",
  ],
  highlights: [
    ["refuge", "Cities of refuge protect life while justice is carefully heard."],
    ["Levites", "Levite cities spread worship and teaching among the tribes."],
    ["rest", "Joshua 21 celebrates that not one good promise of the LORD failed."],
    ["witness", "The altar in Joshua 22 is meant as a witness, not rival worship."],
    ["warning", "Joshua warns the leaders not to cling to the nations or serve their gods."],
  ],
  takeaway: "The LORD gives refuge, rest, unity, and warning so His people can live faithfully in the land.",
  takeawaySupport: "Day 61 helps us see that receiving God's promise does not remove the need to keep listening to God's word.",
};

const daySixtyTwoSummary: BibleYearSummaryContent = {
  intro: [
    "Joshua 24 calls Israel to choose whom they will serve, then Judges begins showing the danger of spiritual drift.",
    "The people inherit the land, but incomplete obedience and forgetfulness begin shaping the next generation.",
    "Day 62 moves from covenant commitment to the painful early cycles of Judges.",
  ],
  highlights: [
    ["choose", "Joshua calls the people to serve the LORD with undivided loyalty."],
    ["compromise", "Judges 1 repeats that Israel did not drive out the inhabitants."],
    ["generation", "Another generation arises that does not know the LORD."],
    ["cycle", "Judges 2 explains sin, oppression, crying out, and deliverance."],
    ["deliverers", "Othniel, Ehud, and Shamgar show God's mercy in dark times."],
  ],
  takeaway: "Covenant words must become remembered obedience, not only a public moment.",
  takeawaySupport: "Day 62 helps us see how quickly blessing can be forgotten when faith is not taught, remembered, and lived.",
};

const daySixtyThreeSummary: BibleYearSummaryContent = {
  intro: [
    "Judges 4-7 shows the LORD delivering Israel through Deborah, Barak, Jael, and Gideon.",
    "These chapters mix courage, fear, worship, weakness, and God's surprising power.",
    "Day 63 teaches that deliverance belongs to the LORD, not human impressiveness.",
  ],
  highlights: [
    ["Deborah", "Deborah speaks God's word as prophetess and judge."],
    ["Jael", "Jael becomes the unexpected woman through whom Sisera falls."],
    ["song", "Judges 5 turns victory into worship and memory."],
    ["Gideon", "God calls fearful Gideon a mighty man of valor."],
    ["small army", "The LORD reduces Gideon's army so Israel cannot boast."],
  ],
  takeaway: "God can rescue through unexpected people, weak faith, and reduced strength.",
  takeawaySupport: "Day 63 helps us see that the LORD's power is clearest when human boasting is removed.",
};

const daySixtyFourSummary: BibleYearSummaryContent = {
  intro: [
    "Judges 8-11 becomes darker as Gideon's victory turns dangerous, Abimelech grabs power, and Jephthah makes a tragic vow.",
    "These chapters show deliverance mixed with pride, ambition, idolatry, repentance, and sorrow.",
    "Day 64 warns that victory without wisdom and worship can still leave damage behind.",
  ],
  highlights: [
    ["ephod", "Gideon's ephod becomes a snare to Israel."],
    ["Abimelech", "Abimelech uses violence and manipulation to seize power."],
    ["parable", "Jotham's parable warns Shechem about destructive leadership."],
    ["cry", "Israel cries to the LORD after serving many gods."],
    ["vow", "Jephthah's rash vow brings sorrow into his victory."],
  ],
  takeaway: "Power, victory, and zeal are dangerous when separated from humility and obedience.",
  takeawaySupport: "Day 64 helps us read Judges honestly: God is merciful, but Israel's spiritual decline is becoming more painful.",
};

const daySixtyFiveSummary: BibleYearSummaryContent = {
  intro: [
    "Judges 12-15 introduces Samson's troubled calling after more internal conflict in Israel.",
    "Samson is set apart before birth, empowered by the Spirit, and used against the Philistines, but his desires and anger are already visible.",
    "Day 65 shows both God's purpose and Samson's weakness.",
  ],
  highlights: [
    ["division", "Jephthah's conflict with Ephraim shows Israel's internal fractures."],
    ["angel", "The angel of the LORD announces Samson's birth."],
    ["Nazirite", "Samson is set apart from the womb for a special calling."],
    ["desire", "Samson's desire for a Philistine woman reveals tension in his heart."],
    ["Spirit", "The Spirit of the LORD empowers Samson against the Philistines."],
  ],
  takeaway: "God can begin deliverance through a flawed person, but Samson's story is not simple hero worship.",
  takeawaySupport: "Day 65 helps us see that calling and gifting do not erase the need for wisdom, self-control, and faithfulness.",
};

const daySixtySixSummary: BibleYearSummaryContent = {
  intro: [
    "Judges 16-19 finishes Samson's story and then shows Israel unraveling from idolatry to violence.",
    "Samson's fall is personal, but the chapters after him show the nation itself is deeply confused.",
    "Day 66 makes the need for righteous leadership painfully clear.",
  ],
  highlights: [
    ["Samson", "Samson reveals his secret, loses his strength, and cries to God in weakness."],
    ["Delilah", "Delilah's pressure exposes Samson's lack of wisdom and self-control."],
    ["Micah", "Micah builds private religion with idols and a hired priest."],
    ["Dan", "Dan spreads corrupt worship from one house to a whole tribe."],
    ["Gibeah", "Gibeah's evil shows how dark Israel has become."],
  ],
  takeaway: "Strength without faithfulness cannot heal a people who have turned from God's word.",
  takeawaySupport: "Day 66 helps us feel why Judges keeps saying there was no king in Israel and everyone did what was right in his own eyes.",
};

const daySixtySevenSummary: BibleYearSummaryContent = {
  intro: [
    "Judges 20-21 closes the book with civil war, grief, and the near loss of Benjamin.",
    "Then Ruth 1-2 begins in the same period, but with a very different kind of story.",
    "Day 67 moves from national collapse to quiet loyal love.",
  ],
  highlights: [
    ["civil war", "Israel fights Benjamin after Gibeah's wickedness."],
    ["Benjamin", "The tribe is nearly destroyed and then preserved through painful human schemes."],
    ["Naomi", "Naomi returns to Bethlehem empty and bitter."],
    ["Ruth", "Ruth clings to Naomi and chooses Naomi's God."],
    ["Boaz", "Boaz protects Ruth and begins the redemption thread."],
  ],
  takeaway: "God can keep hope alive through ordinary faithfulness in a dark time.",
  takeawaySupport: "Day 67 helps us see Ruth as more than a family story. It is God's quiet mercy during the days of the judges.",
};

const daySixtyEightSummary: BibleYearSummaryContent = {
  intro: [
    "Ruth 3-4 completes the redemption story, and 1 Samuel 1-2 begins with Hannah's prayer.",
    "Both stories show God working through vulnerable people, family pain, and faithful worship.",
    "Day 68 connects Ruth's line to David and Hannah's son to Israel's prophetic future.",
  ],
  highlights: [
    ["redeemer", "Boaz acts publicly and honorably as kinsman redeemer."],
    ["Obed", "Ruth's son becomes part of the line leading to David."],
    ["Hannah", "Hannah pours out her soul before the LORD."],
    ["Samuel", "Samuel is born in answer to prayer and given to the LORD."],
    ["Eli's sons", "The corruption of Hophni and Phinehas shows why faithful leadership is needed."],
  ],
  takeaway: "God often begins renewal through prayer, faithfulness, and hidden family stories.",
  takeawaySupport: "Day 68 helps us see that redemption and prophetic leadership both begin with the LORD's mercy.",
};

const daySixtyNineSummary: BibleYearSummaryContent = {
  intro: [
    "1 Samuel 3-6 shows Samuel hearing God's word and Israel losing the ark to the Philistines.",
    "The chapters are sobering because they show that religious symbols cannot be used to control God.",
    "Day 69 teaches reverence for God's word, God's presence, and God's holiness.",
  ],
  highlights: [
    ["Samuel", "Samuel learns to listen when the LORD calls."],
    ["prophet", "All Israel recognizes Samuel as established by the LORD."],
    ["ark", "Israel loses the ark after treating it like a battle tool."],
    ["Dagon", "The idol falls before the ark in Philistine territory."],
    ["holiness", "The ark's return brings joy, but also holy fear."],
  ],
  takeaway: "The LORD cannot be managed by symbols, enemies, or human plans.",
  takeawaySupport: "Day 69 helps us see that God is present, holy, and powerful even when His people are humbled.",
};

const daySeventySummary: BibleYearSummaryContent = {
  intro: [
    "1 Samuel 7-10 moves from repentance and Ebenezer to Israel's request for a king.",
    "Samuel warns the people, but they still want to be like the nations.",
    "Day 70 begins Saul's story with both promise and warning.",
  ],
  highlights: [
    ["Ebenezer", "Samuel raises a stone to remember that the LORD has helped Israel."],
    ["king", "Israel asks for a king like the nations."],
    ["warning", "Samuel explains what a king will take."],
    ["Saul", "Saul is led to Samuel through an ordinary search for lost donkeys."],
    ["anointing", "Samuel anoints Saul and God gives him another heart."],
  ],
  takeaway: "Israel's king begins with God's permission, but the deeper question is whether the people will trust the LORD.",
  takeawaySupport: "Day 70 helps us understand why the monarchy begins with hope, tension, and a serious warning.",
};

const daySeventyOneSummary: BibleYearSummaryContent = {
  intro: [
    "1 Samuel 11-14 shows Saul's early public victory and his first major failures under pressure.",
    "Jabeshgilead is rescued, Samuel warns Israel, Saul offers unlawfully, and Jonathan steps out in bold faith.",
    "Day 71 helps us see the difference between Spirit-empowered rescue and fear-driven leadership.",
  ],
  highlights: [
    ["Jabeshgilead", "Saul rescues a threatened Israelite city."],
    ["Samuel", "Samuel calls Israel to serve the LORD faithfully even with a king."],
    ["offering", "Saul acts before Samuel arrives and reveals a disobedient heart."],
    ["Jonathan", "Jonathan trusts that the LORD can save by many or by few."],
    ["oath", "Saul's rash oath weakens the people after victory begins."],
  ],
  takeaway: "Leadership must listen to the LORD, especially when pressure rises.",
  takeawaySupport: "Day 71 shows Saul with real promise, but it also begins exposing why Israel needs a better king.",
};

const daySeventyTwoSummary: BibleYearSummaryContent = {
  intro: [
    "1 Samuel 15-18 is one of the biggest turning points in the story of Israel's kings.",
    "Saul is rejected, David is anointed, Goliath falls, and Saul's jealousy begins to grow.",
    "Day 72 moves the story from Saul's failing kingdom toward David, the king God has chosen.",
  ],
  highlights: [
    ["obedience", "Samuel declares that obedience is better than sacrifice."],
    ["heart", "The LORD sees the heart, not outward appearance."],
    ["Goliath", "David faces the giant in the name of the LORD."],
    ["Jonathan", "Jonathan loves David and makes covenant with him."],
    ["jealousy", "Saul begins fearing David because the LORD is with him."],
  ],
  takeaway: "God's choice is not based on outward appearance but on the heart.",
  takeawaySupport: "Day 72 shows David's rise beginning through faith, courage, and the LORD's presence.",
};

const daySeventyThreeSummary: BibleYearSummaryContent = {
  intro: [
    "1 Samuel 19-22 follows David as Saul's jealousy becomes open danger.",
    "Jonathan protects David, Michal helps him escape, David receives help at Nob, and Saul kills the priests.",
    "Day 73 shows that being chosen by God does not mean the road becomes easy.",
  ],
  highlights: [
    ["Jonathan", "Jonathan speaks for David and protects him from Saul."],
    ["escape", "David flees through a window with Michal's help."],
    ["covenant", "David and Jonathan renew loyal friendship before parting."],
    ["Nob", "Ahimelech helps David with bread and Goliath's sword."],
    ["Adullam", "Distressed people gather around David in the cave."],
  ],
  takeaway: "God can preserve His chosen servant through friendship, hiding, and painful waiting.",
  takeawaySupport: "Day 73 helps us understand David's wilderness years before he ever wears the crown.",
};

const daySeventyFourSummary: BibleYearSummaryContent = {
  intro: [
    "1 Samuel 23-26 shows David hunted by Saul but refusing revenge.",
    "David seeks the LORD's direction, is strengthened by Jonathan, spares Saul in a cave, learns wisdom from Abigail, and spares Saul again.",
    "Day 74 is about restraint, mercy, and trusting God's timing.",
  ],
  highlights: [
    ["Keilah", "David asks the LORD before rescuing the city."],
    ["Jonathan", "Jonathan strengthens David's hand in God."],
    ["robe", "David cuts Saul's robe but will not kill him."],
    ["Abigail", "Abigail's wisdom keeps David from bloodguilt."],
    ["spear", "David takes Saul's spear but again refuses murder."],
  ],
  takeaway: "Faith sometimes means refusing revenge even when the opportunity is in your hand.",
  takeawaySupport: "Day 74 shows David being formed into a king who waits for the LORD rather than seizing power through sin.",
};

const daySeventyFiveSummary: BibleYearSummaryContent = {
  intro: [
    "1 Samuel 27-30 follows David in exile while Saul moves toward final collapse.",
    "David lives among the Philistines, Saul seeks forbidden counsel, the Philistines reject David, and Ziklag is rescued.",
    "Day 75 contrasts Saul's spiritual ruin with David strengthening himself in the LORD.",
  ],
  highlights: [
    ["Ziklag", "David receives a city while living in Philistine territory."],
    ["medium", "Saul seeks forbidden spiritual help when the LORD does not answer."],
    ["Philistines", "The Philistine rulers refuse to let David fight with them."],
    ["encouraged", "David strengthens himself in the LORD during deep distress."],
    ["recovered", "David recovers all that the Amalekites had taken."],
  ],
  takeaway: "In crisis, David turns back to the LORD for strength and direction.",
  takeawaySupport: "Day 75 prepares us for Saul's fall and David's coming kingdom by showing two very different responses to pressure.",
};

function buildFallbackSummary(day: GenesisBibleYearDay): BibleYearSummaryContent {
  const pieces = day.summary
    .split(",")
    .map((piece) => piece.trim().replace(/[.?!]+$/, ""))
    .filter(Boolean)
    .slice(0, 5);
  const highlights = (pieces.length ? pieces : [day.title, day.reference, "the main movement of the passage"]).map((piece, index) => [
    fallbackHighlightIcons[index % fallbackHighlightIcons.length],
    `${piece.charAt(0).toUpperCase()}${piece.slice(1)}.`,
  ] as [string, string]);

  return {
    intro: [
      `${day.reference} continues the Bible in One Year journey with ${day.title.toLowerCase()}.`,
      day.summary,
      "This quick summary helps you understand what is happening in the passage before you move into trivia or deeper study.",
    ],
    highlights,
    takeaway: `${day.title} helps us follow the story of Scripture one clear step at a time.`,
    takeawaySupport: "The goal is simple: understand the main events, remember the key movement, and keep building the Bible story day by day.",
  };
}

function buildMarkdownFromReaderSection(section: ReturnType<typeof getBibleReaderStudySections>[number]) {
  const body = section.categories
    .map((category) => {
      const content = category.content
        .map((item) => {
          const [firstLine, ...rest] = item.split("\n");
          return rest.length ? `### ${firstLine}\n\n${rest.join("\n")}` : item;
        })
        .join("\n\n");

      return `## ${category.icon} ${category.title}\n\n${content}`;
    })
    .join("\n\n");

  return `## ${section.reference}

${body}`;
}

function getReaderAlignedStudySections(day: GenesisBibleYearDay, fallback: BibleYearDeepStudySection[] | null | undefined) {
  if (day.dayNumber < 1 || day.dayNumber > 75) return fallback ?? null;

  const readerSections = day.readings.flatMap((reading) =>
    getBibleReaderStudySections(reading.book, reading.chapter).map((section) => ({
      reference: section.reference,
      title: section.title,
      icon: section.icon,
      summary: section.summary,
      markdown: buildMarkdownFromReaderSection(section),
    })),
  );

  return readerSections.length ? readerSections : fallback ?? null;
}

export const BIBLE_YEAR_DAY_CONTENT: Partial<Record<number, Omit<BibleYearDayContent, "summary"> & { summary?: BibleYearSummaryContent }>> = {
  1: {
    lesson: GENESIS_DAY_ONE_CREATION_LESSON,
    audio: BIBLE_YEAR_DAY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_ONE_DEEP_STUDY_SECTIONS,
    summary: dayOneSummary,
    discussionPrompt: "What stands out to you about the world God originally created?",
  },
  2: {
    lesson: GENESIS_DAY_TWO_FALL_LESSON,
    audio: BIBLE_YEAR_DAY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWO_DEEP_STUDY_SECTIONS,
    summary: dayTwoSummary,
    discussionPrompt: "Where do you see the effects of broken trust in Genesis 3-4?",
  },
  3: {
    lesson: GENESIS_DAY_THREE_NOAH_ARK_LESSON,
    audio: BIBLE_YEAR_DAY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THREE_DEEP_STUDY_SECTIONS,
    summary: dayThreeSummary,
    discussionPrompt: "What stands out to you about Noah's obedience before the rain begins?",
  },
  4: {
    lesson: GENESIS_DAY_FOUR_NOAH_FLOOD_LESSON,
    audio: BIBLE_YEAR_DAY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FOUR_DEEP_STUDY_SECTIONS,
    summary: dayFourSummary,
    discussionPrompt: "What stands out to you about life beginning again after the flood?",
  },
  5: {
    lesson: GENESIS_DAY_FIVE_ABRAHAM_OBEDIENCE_LESSON,
    audio: BIBLE_YEAR_DAY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIVE_DEEP_STUDY_SECTIONS,
    summary: dayFiveSummary,
    discussionPrompt: "What stands out to you about Abram leaving what was familiar?",
  },
  6: {
    lesson: GENESIS_DAY_SIX_RESCUE_OF_LOT_LESSON,
    audio: BIBLE_YEAR_DAY_SIX_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIX_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIX_DEEP_STUDY_SECTIONS,
    summary: daySixSummary,
    discussionPrompt: "What stands out to you about Abram's courage and trust in Genesis 14-15?",
  },
  7: {
    lesson: GENESIS_DAY_SEVEN_COVENANT_PROMISE_LESSON,
    audio: BIBLE_YEAR_DAY_SEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVEN_DEEP_STUDY_SECTIONS,
    summary: daySevenSummary,
    discussionPrompt: "What stands out to you about waiting on God's promise?",
  },
  8: {
    lesson: GENESIS_DAY_EIGHT_JUDGMENT_OF_SODOM_LESSON,
    audio: BIBLE_YEAR_DAY_EIGHT_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_EIGHT_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_EIGHT_DEEP_STUDY_SECTIONS,
    summary: dayEightSummary,
    discussionPrompt: "What stands out to you about Abraham's intercession and Lot's rescue?",
  },
  9: {
    lesson: GENESIS_DAY_NINE_ABRAHAMS_TEST_AND_LEGACY_LESSON,
    audio: BIBLE_YEAR_DAY_NINE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_NINE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_NINE_DEEP_STUDY_SECTIONS,
    summary: dayNineSummary,
    discussionPrompt: "What stands out to you about Abraham's legacy and God's faithfulness across generations?",
  },
  10: {
    lesson: GENESIS_DAY_TEN_COVENANT_THROUGH_ISAAC_LESSON,
    audio: BIBLE_YEAR_DAY_TEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TEN_DEEP_STUDY_SECTIONS,
    summary: dayTenSummary,
    discussionPrompt: "Where do you see fear, favoritism, or deception causing damage in Genesis 25-27?",
  },
  11: {
    lesson: GENESIS_DAY_ELEVEN_JACOBS_JOURNEY_BEGINS_LESSON,
    audio: BIBLE_YEAR_DAY_ELEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_ELEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_ELEVEN_DEEP_STUDY_SECTIONS,
    summary: dayElevenSummary,
    discussionPrompt: "What encourages you about God meeting Jacob on the road at Bethel?",
  },
  12: {
    lesson: GENESIS_DAY_TWELVE_JACOB_LEAVES_LABAN_LESSON,
    audio: BIBLE_YEAR_DAY_TWELVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWELVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWELVE_DEEP_STUDY_SECTIONS,
    summary: dayTwelveSummary,
    discussionPrompt: "Where do you see God guiding Jacob through pressure and conflict?",
  },
  13: {
    lesson: GENESIS_DAY_THIRTEEN_JACOB_WRESTLES_WITH_GOD_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTEEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTEEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTEEN_DEEP_STUDY_SECTIONS,
    summary: dayThirteenSummary,
    discussionPrompt: "What stands out to you about Jacob wrestling, limping, and receiving a new name?",
  },
  14: {
    lesson: GENESIS_DAY_FOURTEEN_JACOB_RETURNS_TO_BETHEL_LESSON,
    audio: BIBLE_YEAR_DAY_FOURTEEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FOURTEEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FOURTEEN_DEEP_STUDY_SECTIONS,
    summary: dayFourteenSummary,
    discussionPrompt: "What does Jacob returning to Bethel teach you about coming back to worship after brokenness?",
  },
  15: {
    lesson: GENESIS_DAY_FIFTEEN_JOSEPHS_TESTING_BEGINS_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTEEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTEEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTEEN_DEEP_STUDY_SECTIONS,
    summary: dayFifteenSummary,
    discussionPrompt: "What stands out to you about Joseph's dreams, his brothers' jealousy, or Judah being confronted by Tamar?",
  },
  16: {
    lesson: GENESIS_DAY_SIXTEEN_FAITHFUL_IN_THE_HIDDEN_PLACE_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTEEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTEEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTEEN_DEEP_STUDY_SECTIONS,
    summary: daySixteenSummary,
    discussionPrompt: "Where do you see Joseph's hidden faithfulness shaping him before the breakthrough comes?",
  },
  17: {
    lesson: GENESIS_DAY_SEVENTEEN_JOSEPH_RISES_AND_REMEMBERS_LESSON,
    audio: BIBLE_YEAR_DAY_SEVENTEEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVENTEEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVENTEEN_DEEP_STUDY_SECTIONS,
    summary: daySeventeenSummary,
    discussionPrompt: "What stands out to you about Joseph's rise, his wisdom, or his brothers' guilt coming back into the light?",
  },
  18: {
    lesson: GENESIS_DAY_EIGHTEEN_JUDAH_STANDS_IN_THE_GAP_LESSON,
    audio: BIBLE_YEAR_DAY_EIGHTEEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_EIGHTEEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_EIGHTEEN_DEEP_STUDY_SECTIONS,
    summary: dayEighteenSummary,
    discussionPrompt: "Where do you see real change in Judah and the brothers when Benjamin is threatened?",
  },
  19: {
    lesson: GENESIS_DAY_NINETEEN_JOSEPH_REVEALS_HIMSELF_LESSON,
    audio: BIBLE_YEAR_DAY_NINETEEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_NINETEEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_NINETEEN_DEEP_STUDY_SECTIONS,
    summary: dayNineteenSummary,
    discussionPrompt: "What stands out to you about Joseph naming the betrayal while still seeing God's preserving hand?",
  },
  20: {
    lesson: GENESIS_DAY_TWENTY_JACOB_BLESSES_JOSEPHS_SONS_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_DEEP_STUDY_SECTIONS,
    summary: dayTwentySummary,
    discussionPrompt: "What stands out to you about Jacob blessing the next generation while still looking toward God's promised land?",
  },
  21: {
    lesson: GENESIS_DAY_TWENTY_ONE_GENESIS_ENDS_WITH_HOPE_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_ONE_DEEP_STUDY_SECTIONS,
    summary: dayTwentyOneSummary,
    discussionPrompt: "What stands out to you about Genesis ending with both a coffin in Egypt and hope in God's promise?",
  },
  22: {
    lesson: EXODUS_DAY_TWENTY_TWO_GOD_HEARS_ISRAELS_CRY_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_TWO_DEEP_STUDY_SECTIONS,
    summary: dayTwentyTwoSummary,
    discussionPrompt: "What stands out to you about God hearing Israel before deliverance is visible?",
  },
  23: {
    lesson: EXODUS_DAY_TWENTY_THREE_PHARAOH_RESISTS_GODS_WORD_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_THREE_DEEP_STUDY_SECTIONS,
    summary: dayTwentyThreeSummary,
    discussionPrompt: "What stands out to you about Pharaoh resisting God's word and God answering through signs?",
  },
  24: {
    lesson: EXODUS_DAY_TWENTY_FOUR_PASSOVER_AND_DELIVERANCE_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_FOUR_DEEP_STUDY_SECTIONS,
    summary: dayTwentyFourSummary,
    discussionPrompt: "What stands out to you about Passover, the blood on the doorposts, and Israel finally leaving Egypt?",
  },
  25: {
    lesson: EXODUS_DAY_TWENTY_FIVE_THROUGH_THE_SEA_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_FIVE_DEEP_STUDY_SECTIONS,
    summary: dayTwentyFiveSummary,
    discussionPrompt: "What stands out to you about God leading Israel through the sea and teaching them daily trust in the wilderness?",
  },
  26: {
    lesson: EXODUS_DAY_TWENTY_SIX_WATER_BATTLE_AND_COMMANDMENTS_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_SIX_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_SIX_DEEP_STUDY_SECTIONS,
    summary: dayTwentySixSummary,
    discussionPrompt: "What stands out to you about God providing water, giving victory, and speaking the Ten Commandments?",
  },
  27: {
    lesson: EXODUS_DAY_TWENTY_SEVEN_COVENANT_LAW_AND_BLOOD_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_SEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_SEVEN_DEEP_STUDY_SECTIONS,
    summary: dayTwentySevenSummary,
    discussionPrompt: "What stands out to you about God's covenant laws and the covenant being sealed with blood?",
  },
  28: {
    lesson: EXODUS_DAY_TWENTY_EIGHT_TABERNACLE_AND_PRIESTHOOD_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_EIGHT_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_EIGHT_DEEP_STUDY_SECTIONS,
    summary: dayTwentyEightSummary,
    discussionPrompt: "What stands out to you about God making a way to dwell among His people?",
  },
  29: {
    lesson: EXODUS_DAY_TWENTY_NINE_CONSECRATION_AND_GOLDEN_CALF_LESSON,
    audio: BIBLE_YEAR_DAY_TWENTY_NINE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_TWENTY_NINE_DEEP_STUDY_SECTIONS,
    summary: dayTwentyNineSummary,
    discussionPrompt: "What stands out to you about the contrast between holy worship and the golden calf?",
  },
  30: {
    lesson: EXODUS_DAY_THIRTY_GODS_PRESENCE_AND_RENEWED_OBEDIENCE_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_DEEP_STUDY_SECTIONS,
    summary: dayThirtySummary,
    discussionPrompt: "What stands out to you about Moses pleading for God's presence and Israel giving willingly again?",
  },
  31: {
    lesson: EXODUS_DAY_THIRTY_ONE_TABERNACLE_FINISHED_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_ONE_DEEP_STUDY_SECTIONS,
    summary: dayThirtyOneSummary,
    discussionPrompt: "What stands out to you about God's glory filling the finished tabernacle?",
  },
  32: {
    lesson: LEVITICUS_DAY_THIRTY_TWO_OFFERINGS_AND_ATONEMENT_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_TWO_DEEP_STUDY_SECTIONS,
    summary: dayThirtyTwoSummary,
    discussionPrompt: "What stands out to you about God providing offerings and atonement so His people can come near?",
  },
  33: {
    lesson: LEVITICUS_DAY_THIRTY_THREE_GUILT_CONSECRATION_AND_PRIESTS_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_THREE_DEEP_STUDY_SECTIONS,
    summary: dayThirtyThreeSummary,
    discussionPrompt: "What stands out to you about guilt, restitution, and priests being consecrated for holy service?",
  },
  34: {
    lesson: LEVITICUS_DAY_THIRTY_FOUR_WORSHIP_HOLINESS_AND_CLEAN_LIVING_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_FOUR_DEEP_STUDY_SECTIONS,
    summary: dayThirtyFourSummary,
    discussionPrompt: "What stands out to you about God's holiness shaping worship and daily life?",
  },
  35: {
    lesson: LEVITICUS_DAY_THIRTY_FIVE_CLEANSING_AND_DAY_OF_ATONEMENT_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_FIVE_DEEP_STUDY_SECTIONS,
    summary: dayThirtyFiveSummary,
    discussionPrompt: "What stands out to you about cleansing, restoration, and the Day of Atonement?",
  },
  36: {
    lesson: LEVITICUS_DAY_THIRTY_SIX_HOLY_LIVING_BEFORE_A_HOLY_GOD_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_SIX_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_SIX_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_SIX_DEEP_STUDY_SECTIONS,
    summary: dayThirtySixSummary,
    discussionPrompt: "Where do you see God calling His people to live differently because they belong to Him?",
  },
  37: {
    lesson: LEVITICUS_DAY_THIRTY_SEVEN_PRIESTS_FEASTS_AND_SACRED_ORDER_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_SEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_SEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_SEVEN_DEEP_STUDY_SECTIONS,
    summary: dayThirtySevenSummary,
    discussionPrompt: "What stands out to you about God's holiness shaping priests, feasts, worship, and justice?",
  },
  38: {
    lesson: LEVITICUS_NUMBERS_DAY_THIRTY_EIGHT_JUBILEE_COVENANT_AND_ISRAEL_COUNTED_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_EIGHT_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_EIGHT_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_EIGHT_DEEP_STUDY_SECTIONS,
    summary: dayThirtyEightSummary,
    discussionPrompt: "What stands out to you about Jubilee, covenant warning, and Israel being counted for the journey?",
  },
  39: {
    lesson: NUMBERS_DAY_THIRTY_NINE_CAMP_ORDER_AND_PURITY_LESSON,
    audio: BIBLE_YEAR_DAY_THIRTY_NINE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_THIRTY_NINE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_THIRTY_NINE_DEEP_STUDY_SECTIONS,
    summary: dayThirtyNineSummary,
    discussionPrompt: "What stands out to you about Israel arranging the camp around God's presence?",
  },
  40: {
    lesson: NUMBERS_DAY_FORTY_BLESSING_DEDICATION_AND_PASSOVER_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_DEEP_STUDY_SECTIONS,
    summary: dayFortySummary,
    discussionPrompt: "What stands out to you about God's blessing, Passover memory, and guidance by the cloud?",
  },
  41: {
    lesson: NUMBERS_DAY_FORTY_ONE_JOURNEY_COMPLAINTS_AND_SPIES_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_ONE_DEEP_STUDY_SECTIONS,
    summary: dayFortyOneSummary,
    discussionPrompt: "Where do you see complaint, fear, or faith shaping Israel's response to God's leading?",
  },
  42: {
    lesson: NUMBERS_DAY_FORTY_TWO_REBELLION_AND_CHOSEN_PRIESTHOOD_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_TWO_DEEP_STUDY_SECTIONS,
    summary: dayFortyTwoSummary,
    discussionPrompt: "What stands out to you about Moses' intercession and Aaron's rod budding before the LORD?",
  },
  43: {
    lesson: NUMBERS_DAY_FORTY_THREE_PROVISION_JUDGMENT_AND_BRONZE_SERPENT_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_THREE_DEEP_STUDY_SECTIONS,
    summary: dayFortyThreeSummary,
    discussionPrompt: "What stands out to you about God providing mercy in the middle of judgment?",
  },
  44: {
    lesson: NUMBERS_DAY_FORTY_FOUR_BALAAM_BLESSING_AND_COMPROMISE_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_FOUR_DEEP_STUDY_SECTIONS,
    summary: dayFortyFourSummary,
    discussionPrompt: "Where do you see the difference between outside opposition and inward compromise in Numbers 22-25?",
  },
  45: {
    lesson: NUMBERS_DAY_FORTY_FIVE_NEW_GENERATION_COUNTED_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_FIVE_DEEP_STUDY_SECTIONS,
    summary: dayFortyFiveSummary,
    discussionPrompt: "What stands out to you about God preparing a new generation for inheritance and worship?",
  },
  46: {
    lesson: NUMBERS_DAY_FORTY_SIX_VOWS_VICTORY_AND_JOURNEY_REVIEWED_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_SIX_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_SIX_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_SIX_DEEP_STUDY_SECTIONS,
    summary: dayFortySixSummary,
    discussionPrompt: "Where do you see words, memory, and responsibility shaping Israel before the land?",
  },
  47: {
    lesson: NUMBERS_DEUTERONOMY_DAY_FORTY_SEVEN_LAND_BOUNDARIES_AND_MOSES_LOOKS_BACK_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_SEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_SEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_SEVEN_DEEP_STUDY_SECTIONS,
    summary: dayFortySevenSummary,
    discussionPrompt: "What stands out to you about boundaries, refuge, inheritance, and Moses retelling the journey?",
  },
  48: {
    lesson: DEUTERONOMY_DAY_FORTY_EIGHT_REMEMBERING_JOURNEY_AND_COVENANT_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_EIGHT_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_EIGHT_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_EIGHT_DEEP_STUDY_SECTIONS,
    summary: dayFortyEightSummary,
    discussionPrompt: "How does remembering God's past faithfulness help Israel obey in the present?",
  },
  49: {
    lesson: DEUTERONOMY_DAY_FORTY_NINE_LOVE_GOD_AND_REMEMBER_GRACE_LESSON,
    audio: BIBLE_YEAR_DAY_FORTY_NINE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FORTY_NINE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FORTY_NINE_DEEP_STUDY_SECTIONS,
    summary: dayFortyNineSummary,
    discussionPrompt: "What stands out to you about loving God, remembering grace, and resisting pride?",
  },
  50: {
    lesson: DEUTERONOMY_DAY_FIFTY_COVENANT_LOYALTY_FROM_THE_HEART_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_DEEP_STUDY_SECTIONS,
    summary: dayFiftySummary,
    discussionPrompt: "Where do you see God calling His people to loyalty from the heart, not just outward religion?",
  },
  51: {
    lesson: DEUTERONOMY_DAY_FIFTY_ONE_WORSHIP_JUSTICE_AND_LEADERSHIP_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_ONE_DEEP_STUDY_SECTIONS,
    summary: dayFiftyOneSummary,
    discussionPrompt: "Where do you see holiness shaping worship, generosity, justice, or leadership in Deuteronomy 14-17?",
  },
  52: {
    lesson: DEUTERONOMY_DAY_FIFTY_TWO_PROPHETS_CITIES_AND_JUSTICE_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_TWO_DEEP_STUDY_SECTIONS,
    summary: dayFiftyTwoSummary,
    discussionPrompt: "What stands out to you about true words, refuge, witnesses, and justice in Deuteronomy 18-21?",
  },
  53: {
    lesson: DEUTERONOMY_DAY_FIFTY_THREE_EVERYDAY_FAITHFULNESS_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_THREE_DEEP_STUDY_SECTIONS,
    summary: dayFiftyThreeSummary,
    discussionPrompt: "Where do you see everyday faithfulness showing up in ordinary neighbor life?",
  },
  54: {
    lesson: DEUTERONOMY_DAY_FIFTY_FOUR_BLESSING_CURSE_AND_COVENANT_RENEWAL_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_FOUR_DEEP_STUDY_SECTIONS,
    summary: dayFiftyFourSummary,
    discussionPrompt: "What stands out to you about worship, warning, and covenant renewal in Deuteronomy 26-29?",
  },
  55: {
    lesson: DEUTERONOMY_DAY_FIFTY_FIVE_CHOOSE_LIFE_AND_MOSES_BLESSING_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_FIVE_DEEP_STUDY_SECTIONS,
    summary: dayFiftyFiveSummary,
    discussionPrompt: "Where do you see Moses calling Israel to choose life and hold fast to the LORD?",
  },
  56: {
    lesson: DEUTERONOMY_JOSHUA_DAY_FIFTY_SIX_MOSES_DIES_AND_JOSHUA_LEADS_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_SIX_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_SIX_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_SIX_DEEP_STUDY_SECTIONS,
    summary: dayFiftySixSummary,
    discussionPrompt: "What stands out to you about God's promise continuing from Moses to Joshua?",
  },
  57: {
    lesson: JOSHUA_DAY_FIFTY_SEVEN_MEMORIAL_STONES_JERICHO_AND_ACHAN_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_SEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_SEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_SEVEN_DEEP_STUDY_SECTIONS,
    summary: dayFiftySevenSummary,
    discussionPrompt: "What do memorial stones, Jericho, and Achan teach you about remembering and obeying?",
  },
  58: {
    lesson: JOSHUA_DAY_FIFTY_EIGHT_CONQUEST_AND_COVENANT_OBEDIENCE_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_EIGHT_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_EIGHT_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_EIGHT_DEEP_STUDY_SECTIONS,
    summary: dayFiftyEightSummary,
    discussionPrompt: "Where do you see victory, wisdom, and obedience staying connected in Joshua 8-11?",
  },
  59: {
    lesson: JOSHUA_DAY_FIFTY_NINE_LAND_IS_DISTRIBUTED_LESSON,
    audio: BIBLE_YEAR_DAY_FIFTY_NINE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_FIFTY_NINE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_FIFTY_NINE_DEEP_STUDY_SECTIONS,
    summary: dayFiftyNineSummary,
    discussionPrompt: "What does Joshua 12-15 teach you about promise becoming real inheritance?",
  },
  60: {
    lesson: JOSHUA_DAY_SIXTY_INHERITANCE_FOR_THE_TRIBES_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_DEEP_STUDY_SECTIONS,
    summary: daySixtySummary,
    discussionPrompt: "Where do you see inheritance, responsibility, and worship connected in Joshua 16-19?",
  },
  61: {
    lesson: JOSHUA_DAY_SIXTY_ONE_REFUGE_REST_AND_WARNING_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_ONE_DEEP_STUDY_SECTIONS,
    summary: daySixtyOneSummary,
    discussionPrompt: "Where do you see refuge, rest, unity, and warning shaping life in the land?",
  },
  62: {
    lesson: JOSHUA_JUDGES_DAY_SIXTY_TWO_COVENANT_CHOICE_AND_DRIFT_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_TWO_DEEP_STUDY_SECTIONS,
    summary: daySixtyTwoSummary,
    discussionPrompt: "What stands out to you about choosing the LORD and then watching Israel begin to drift?",
  },
  63: {
    lesson: JUDGES_DAY_SIXTY_THREE_DEBORAH_GIDEON_AND_DELIVERANCE_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_THREE_DEEP_STUDY_SECTIONS,
    summary: daySixtyThreeSummary,
    discussionPrompt: "Where do you see God using unexpected people and reduced strength to bring deliverance?",
  },
  64: {
    lesson: JUDGES_DAY_SIXTY_FOUR_GIDEONS_FAILURE_AND_JEPHTHAHS_VOW_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_FOUR_DEEP_STUDY_SECTIONS,
    summary: daySixtyFourSummary,
    discussionPrompt: "What warnings do you see about power, ambition, idolatry, and careless vows?",
  },
  65: {
    lesson: JUDGES_DAY_SIXTY_FIVE_SAMSON_BEGINS_TROUBLED_CALLING_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_FIVE_DEEP_STUDY_SECTIONS,
    summary: daySixtyFiveSummary,
    discussionPrompt: "What stands out to you about Samson's calling, strength, weakness, and early conflict with the Philistines?",
  },
  66: {
    lesson: JUDGES_DAY_SIXTY_SIX_SAMSON_FALLS_AND_ISRAEL_UNRAVELS_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_SIX_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_SIX_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_SIX_DEEP_STUDY_SECTIONS,
    summary: daySixtySixSummary,
    discussionPrompt: "What stands out to you about Samson's fall and Israel's unraveling in Judges 16-19?",
  },
  67: {
    lesson: JUDGES_RUTH_DAY_SIXTY_SEVEN_CIVIL_WAR_AND_RUTHS_LOYAL_LOVE_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_SEVEN_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_SEVEN_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_SEVEN_DEEP_STUDY_SECTIONS,
    summary: daySixtySevenSummary,
    discussionPrompt: "Where do you see the contrast between Judges' collapse and Ruth's loyal love?",
  },
  68: {
    lesson: RUTH_SAMUEL_DAY_SIXTY_EIGHT_REDEMPTION_AND_SAMUELS_BIRTH_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_EIGHT_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_EIGHT_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_EIGHT_DEEP_STUDY_SECTIONS,
    summary: daySixtyEightSummary,
    discussionPrompt: "What stands out to you about redemption, prayer, and God preparing Israel's future?",
  },
  69: {
    lesson: FIRST_SAMUEL_DAY_SIXTY_NINE_SAMUEL_HEARS_GOD_AND_ARK_TAKEN_LESSON,
    audio: BIBLE_YEAR_DAY_SIXTY_NINE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SIXTY_NINE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SIXTY_NINE_DEEP_STUDY_SECTIONS,
    summary: daySixtyNineSummary,
    discussionPrompt: "What does Day 69 teach you about hearing God's word and revering God's holiness?",
  },
  70: {
    lesson: FIRST_SAMUEL_DAY_SEVENTY_ISRAEL_ASKS_FOR_A_KING_LESSON,
    audio: BIBLE_YEAR_DAY_SEVENTY_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVENTY_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVENTY_DEEP_STUDY_SECTIONS,
    summary: daySeventySummary,
    discussionPrompt: "Where do you see Israel's desire for a king revealing questions of trust?",
  },
  71: {
    lesson: FIRST_SAMUEL_DAY_SEVENTY_ONE_SAULS_RISE_AND_EARLY_FAILURE_LESSON,
    audio: BIBLE_YEAR_DAY_SEVENTY_ONE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVENTY_ONE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVENTY_ONE_DEEP_STUDY_SECTIONS,
    summary: daySeventyOneSummary,
    discussionPrompt: "Where do you see pressure testing whether Saul will listen to the LORD?",
  },
  72: {
    lesson: FIRST_SAMUEL_DAY_SEVENTY_TWO_SAUL_REJECTED_AND_DAVID_APPEARS_LESSON,
    audio: BIBLE_YEAR_DAY_SEVENTY_TWO_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVENTY_TWO_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVENTY_TWO_DEEP_STUDY_SECTIONS,
    summary: daySeventyTwoSummary,
    discussionPrompt: "What stands out to you about the LORD seeing the heart instead of outward appearance?",
  },
  73: {
    lesson: FIRST_SAMUEL_DAY_SEVENTY_THREE_DAVID_FLEES_FROM_SAUL_LESSON,
    audio: BIBLE_YEAR_DAY_SEVENTY_THREE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVENTY_THREE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVENTY_THREE_DEEP_STUDY_SECTIONS,
    summary: daySeventyThreeSummary,
    discussionPrompt: "Where do you see God preserving David through loyal friendship and hidden protection?",
  },
  74: {
    lesson: FIRST_SAMUEL_DAY_SEVENTY_FOUR_DAVID_SPARES_SAUL_LESSON,
    audio: BIBLE_YEAR_DAY_SEVENTY_FOUR_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVENTY_FOUR_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVENTY_FOUR_DEEP_STUDY_SECTIONS,
    summary: daySeventyFourSummary,
    discussionPrompt: "What does David's restraint teach you about mercy, revenge, and God's timing?",
  },
  75: {
    lesson: FIRST_SAMUEL_DAY_SEVENTY_FIVE_DAVID_IN_EXILE_LESSON,
    audio: BIBLE_YEAR_DAY_SEVENTY_FIVE_AUDIO,
    studyNotesMarkdown: BIBLE_YEAR_DAY_SEVENTY_FIVE_DEEP_NOTES,
    studyNotesSections: BIBLE_YEAR_DAY_SEVENTY_FIVE_DEEP_STUDY_SECTIONS,
    summary: daySeventyFiveSummary,
    discussionPrompt: "What does David strengthening himself in the LORD teach you about crisis?",
  },
};

export function getBibleYearDayContent(day: GenesisBibleYearDay): BibleYearDayContent {
  const content = BIBLE_YEAR_DAY_CONTENT[day.dayNumber];
  return {
    lesson: content?.lesson ?? null,
    audio: content?.audio ?? null,
    studyNotesMarkdown: content?.studyNotesMarkdown ?? null,
    studyNotesSections: getReaderAlignedStudySections(day, content?.studyNotesSections),
    summary: content?.summary ?? buildFallbackSummary(day),
    discussionPrompt: content?.discussionPrompt ?? `What stood out to you from ${day.title}?`,
  };
}
