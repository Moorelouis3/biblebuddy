import { buildWeeklyGroupQuestion } from "./groupWeeklyQuestion";
import { buildWeeklyGroupTrivia } from "./groupWeeklyTrivia";

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

export type GroupScheduleItem = {
  key: string;
  label: string;
  accent: string;
  nextReleaseLabel: string;
  nextContentTitle: string;
  nextContentDescription: string;
};

export function buildGroupSchedule(now = new Date()): GroupScheduleItem[] {
  const nextTrivia = nextBerlinOccurrence(2, 18, 0, now);
  const nextQuestion = nextBerlinOccurrence(4, 18, 0, now);
  const nextBibleStudy = nextBerlinOccurrence(6, 18, 0, now);
  const nextPrayer = nextBerlinOccurrence(0, 18, 0, now);

  const trivia = buildWeeklyGroupTrivia(nextTrivia);
  const question = buildWeeklyGroupQuestion(nextQuestion);

  return [
    {
      key: "trivia_tuesday",
      label: "Trivia Tuesday",
      accent: "#4a9b6f",
      nextReleaseLabel: formatScheduleDate(nextTrivia),
      nextContentTitle: trivia.subjectTitle,
      nextContentDescription: trivia.subjectLine,
    },
    {
      key: "truth_thursday",
      label: "Truth Thursday",
      accent: "#b7794d",
      nextReleaseLabel: formatScheduleDate(nextQuestion),
      nextContentTitle: question.subjectTitle,
      nextContentDescription: question.prompt,
    },
    {
      key: "bible_study_saturday",
      label: "Bible Study Saturday",
      accent: "#8d5d38",
      nextReleaseLabel: formatScheduleDate(nextBibleStudy),
      nextContentTitle: "Weekly Bible Study Drop",
      nextContentDescription: "A fresh guided study post with notes, structure, and a clear next step for the group.",
    },
    {
      key: "prayer_request_sunday",
      label: "Prayer Request Sunday",
      accent: "#7b5ca8",
      nextReleaseLabel: formatScheduleDate(nextPrayer),
      nextContentTitle: "Weekly Prayer Check-In",
      nextContentDescription: "A simple community prayer thread where Buddies can share needs and pray for one another.",
    },
  ];
}
