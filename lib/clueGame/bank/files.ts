import type { ClueQuestion } from "../types";
import { GENESIS_01_05 } from "./genesis-01-05";
import { GENESIS_06_10 } from "./genesis-06-10";
import { GENESIS_11_15 } from "./genesis-11-15";
import { GENESIS_16_20 } from "./genesis-16-20";
import { GENESIS_21_25 } from "./genesis-21-25";
import { GENESIS_26_30 } from "./genesis-26-30";
import { GENESIS_31_35 } from "./genesis-31-35";
import { GENESIS_36_40 } from "./genesis-36-40";
import { GENESIS_41_45 } from "./genesis-41-45";
import { GENESIS_46_50 } from "./genesis-46-50";

/** Every question file of the bank, Genesis 1-50 (docs/clue-question-bank-brief.md). */
export const BANK_FILES: ClueQuestion[][] = [
  GENESIS_01_05,
  GENESIS_06_10,
  GENESIS_11_15,
  GENESIS_16_20,
  GENESIS_21_25,
  GENESIS_26_30,
  GENESIS_31_35,
  GENESIS_36_40,
  GENESIS_41_45,
  GENESIS_46_50,
];
