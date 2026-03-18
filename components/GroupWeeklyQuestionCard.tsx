"use client";

export default function GroupWeeklyQuestionCard({
  prompt,
  intro,
  commentPrompt,
}: {
  prompt: string;
  intro: string | null;
  commentPrompt: string | null;
}) {
  return (
    <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
      {intro ? <p className="mt-3 text-sm leading-relaxed text-gray-600">{intro}</p> : null}
      {commentPrompt ? <p className="mt-3 text-sm leading-relaxed text-gray-600">{commentPrompt}</p> : null}
    </div>
  );
}
