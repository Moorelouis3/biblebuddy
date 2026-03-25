export type DirectMessageAction = {
  label: string;
  href: string;
};

export type DirectMessagePresentation = {
  body: string;
  action: DirectMessageAction | null;
};

type SupabaseLikeError = {
  code?: string | null;
  message?: string | null;
  details?: string | null;
  hint?: string | null;
};

const LEGACY_ACTION_PATTERNS: Array<{
  regex: RegExp;
  label: string;
}> = [
  {
    regex: /Open Bible Study Group:\s*(\/study-groups\/[^\s]+)/i,
    label: "Open Bible Study Group",
  },
  {
    regex: /Open your profile settings:\s*(\/settings[^\s]*)/i,
    label: "Open Profile Settings",
  },
];

function stripDanglingWhitespace(text: string): string {
  return text
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function extractLegacyDirectMessageAction(content: string): DirectMessagePresentation {
  for (const pattern of LEGACY_ACTION_PATTERNS) {
    const match = content.match(pattern.regex);
    if (match) {
      return {
        body: stripDanglingWhitespace(content.replace(match[0], "")),
        action: {
          label: pattern.label,
          href: match[1],
        },
      };
    }
  }

  return {
    body: content,
    action: null,
  };
}

export function getDirectMessagePresentation(
  content: string,
  actionLabel?: string | null,
  actionHref?: string | null,
): DirectMessagePresentation {
  if (actionLabel && actionHref) {
    return {
      body: stripDanglingWhitespace(content),
      action: {
        label: actionLabel,
        href: actionHref,
      },
    };
  }

  return extractLegacyDirectMessageAction(content);
}

export function getDirectMessagePreview(
  content: string,
  actionLabel?: string | null,
  actionHref?: string | null,
): string {
  const presentation = getDirectMessagePresentation(content, actionLabel, actionHref);
  const previewSource = presentation.body || content;
  return previewSource.length > 120 ? `${previewSource.slice(0, 120)}...` : previewSource;
}

export function isMissingDirectMessageActionColumnError(error: SupabaseLikeError | null | undefined): boolean {
  const haystack = `${error?.code || ""} ${error?.message || ""} ${error?.details || ""} ${error?.hint || ""}`.toLowerCase();
  if (!haystack) return false;

  return (
    haystack.includes("42703") &&
    (haystack.includes("action_label") || haystack.includes("action_href"))
  );
}
