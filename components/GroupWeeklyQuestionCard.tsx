"use client";

export default function GroupWeeklyQuestionCard({
  prompt,
  intro,
  commentPrompt,
  onOpen,
}: {
  prompt: string;
  intro: string | null;
  commentPrompt: string | null;
  onOpen?: () => void;
}) {
  return (
    <div
      role={onOpen ? "button" : undefined}
      tabIndex={onOpen ? 0 : undefined}
      onClick={(event) => {
        event.stopPropagation();
        if (onOpen) onOpen();
      }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (onOpen && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onOpen();
        }
      }}
      className={onOpen ? "cursor-pointer" : undefined}
    >
      {intro ? <p className="mt-3 text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">{intro}</p> : null}
      {commentPrompt ? <p className="mt-3 text-sm leading-relaxed text-[var(--bb-text-secondary,#4b5563)]">{commentPrompt}</p> : null}
    </div>
  );
}
