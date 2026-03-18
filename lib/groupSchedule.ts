import { buildWeeklyGroupPoll } from "./groupWeeklyPoll";
import { buildWeeklyGroupQuestion } from "./groupWeeklyQuestion";
import { buildWeeklyGroupTrivia } from "./groupWeeklyTrivia";
import {
  type BibleStudySeriesSnapshot,
  buildBibleStudySaturdayPost,
  buildPrayerRequestSundayPost,
  buildUpdateMondayPost,
  buildWhoWasThisFridayPost,
} from "./groupRecurringSeries";

const BERLIN_TIME_ZONE = "Europe/Berlin";

function getBerlinDate(date = new Date()) {
  return new Date(date.toLocaleString("en-US", { timeZone: BERLIN_TIME_ZONE }));
}

function nextBerlinOccurrence(targetDay: number, hour: number, minute: number, from = new Date()) {
  const berlin = getBerlinDate(from);
  const next = new Date(berlin);
  const currentDay = next.getDay();
  let daysUntil = (targetDay - currentDay + 7) % 7;

  next.setHours(hour, minute, 0, 0);

  if (daysUntil === 0 && berlin.getTime() >= next.getTime()) {
    daysUntil = 7;
  }

  next.setDate(next.getDate() + daysUntil);
  return next;
}

function addWeeks(date: Date, weeks: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + weeks * 7);
  return next;
}

function formatScheduleDate(date: Date) {
  return date.toLocaleString("en-US", {
    timeZone: BERLIN_TIME_ZONE,
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

type SchedulePreview = {
  title: string;
  description: string | null;
  pollOptions?: string[];
};

export type GroupScheduleItem = {
  key: string;
  label: string;
  accent: string;
  nextReleaseLabel: string;
  nextReleaseIso: string;
  nextContentTitle: string;
  nextContentDescription: string | null;
  preview: SchedulePreview;
  nextFour: Array<{
    releaseLabel: string;
    releaseIso: string;
    title: string;
    description: string | null;
    pollOptions?: string[];
  }>;
};

type GroupScheduleOptions = {
  bibleStudySeriesSnapshot?: BibleStudySeriesSnapshot | null;
};

function buildTimeline(
  label: string,
  key: string,
  accent: string,
  startDate: Date,
  previewBuilder: (date: Date) => SchedulePreview,
): GroupScheduleItem {
  const preview = previewBuilder(startDate);
  const nextFour = Array.from({ length: 4 }, (_, index) => {
    const date = addWeeks(startDate, index);
    const item = previewBuilder(date);
    return {
      releaseLabel: formatScheduleDate(date),
      releaseIso: date.toISOString(),
      title: item.title,
      description: item.description,
      pollOptions: item.pollOptions,
    };
  });

  return {
    key,
    label,
    accent,
    nextReleaseLabel: formatScheduleDate(startDate),
    nextReleaseIso: startDate.toISOString(),
    nextContentTitle: preview.title,
    nextContentDescription: preview.description,
    preview,
    nextFour,
  };
}

export function buildGroupSchedule(now = new Date(), options: GroupScheduleOptions = {}): GroupScheduleItem[] {
  const nextMonday = nextBerlinOccurrence(1, 18, 0, now);
  const nextTrivia = nextBerlinOccurrence(2, 18, 0, now);
  const nextPoll = nextBerlinOccurrence(3, 18, 0, now);
  const nextQuestion = nextBerlinOccurrence(4, 18, 0, now);
  const nextFriday = nextBerlinOccurrence(5, 18, 0, now);
  const nextBibleStudy = nextBerlinOccurrence(6, 18, 0, now);
  const nextPrayer = nextBerlinOccurrence(0, 18, 0, now);

  return [
    buildTimeline("Update Monday", "update_monday", "#5a9a5a", nextMonday, (date) => {
      const update = buildUpdateMondayPost(date);
      return {
        title: update.title,
        description: update.description,
      };
    }),
    buildTimeline("Trivia Tuesday", "trivia_tuesday", "#4a9b6f", nextTrivia, (date) => {
      const trivia = buildWeeklyGroupTrivia(date);
      return {
        title: "Weekly Bible Trivia",
        description: `${trivia.subjectLine} ${trivia.intro}`,
      };
    }),
    buildTimeline("Opinion Wednesday", "opinion_wednesday", "#5d7ec2", nextPoll, (date) => {
      const poll = buildWeeklyGroupPoll(date);
      return {
        title: poll.question,
        description: poll.intro,
        pollOptions: poll.options.map((option) => option.text),
      };
    }),
    buildTimeline("Truth Thursday", "truth_thursday", "#b7794d", nextQuestion, (date) => {
      const question = buildWeeklyGroupQuestion(date);
      return {
        title: question.prompt,
        description: question.intro,
      };
    }),
    buildTimeline("Who Was This Friday", "who_was_this_friday", "#a2684f", nextFriday, (date) => {
      const friday = buildWhoWasThisFridayPost(date);
      return {
        title: friday.title,
        description: friday.description,
      };
    }),
    buildTimeline("Bible Study Saturday", "bible_study_saturday", "#8d5d38", nextBibleStudy, (date) => {
      const saturday = buildBibleStudySaturdayPost(date, options.bibleStudySeriesSnapshot ?? null);
      return {
        title: saturday.title,
        description: saturday.description,
      };
    }),
    buildTimeline("Prayer Request Sunday", "prayer_request_sunday", "#7b5ca8", nextPrayer, (date) => {
      const sunday = buildPrayerRequestSundayPost(date);
      return {
        title: sunday.title,
        description: sunday.description,
      };
    }),
  ];
}
