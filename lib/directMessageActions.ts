export type DirectMessageAction = {
  label: string;
  href: string;
};

export type DirectMessagePresentation = {
  body: string;
  action: DirectMessageAction | null;
  actions: DirectMessageAction[];
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

const QUICK_ACTION_LINE_PATTERN = /^\s*Quick Action:\s*(.+?)\|(\S.*)\s*$/i;

function stripDanglingWhitespace(text: string): string {
  return text
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function extractInlineActions(content: string): { body: string; actions: DirectMessageAction[] } {
  const actions: DirectMessageAction[] = [];
  const bodyLines: string[] = [];

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    const quickActionMatch = line.match(QUICK_ACTION_LINE_PATTERN);
    if (quickActionMatch) {
      actions.push({
        label: quickActionMatch[1].trim(),
        href: quickActionMatch[2].trim(),
      });
      continue;
    }

    if (!line.toLowerCase().startsWith("action button:")) {
      bodyLines.push(rawLine);
      continue;
    }

    const payload = line.slice("action button:".length).trim();
    const separatorIndex = payload.indexOf("|");
    if (separatorIndex === -1) {
      bodyLines.push(rawLine);
      continue;
    }

    const label = payload.slice(0, separatorIndex).trim();
    const href = payload.slice(separatorIndex + 1).trim();
    if (!label || !href) {
      bodyLines.push(rawLine);
      continue;
    }

    actions.push({ label, href });
  }

  return {
    body: stripDanglingWhitespace(bodyLines.join("\n")),
    actions,
  };
}

export function extractLegacyDirectMessageAction(content: string): DirectMessagePresentation {
  const { body: contentWithoutInlineActions, actions: inlineActions } = extractInlineActions(content);

  for (const pattern of LEGACY_ACTION_PATTERNS) {
    const match = contentWithoutInlineActions.match(pattern.regex);
    if (match) {
      const primaryAction = {
        label: pattern.label,
        href: match[1],
      };
      return {
        body: stripDanglingWhitespace(contentWithoutInlineActions.replace(match[0], "")),
        action: primaryAction,
        actions: [primaryAction, ...inlineActions],
      };
    }
  }

  return {
    body: stripDanglingWhitespace(contentWithoutInlineActions),
    action: inlineActions[0] ?? null,
    actions: inlineActions,
  };
}

export function getDirectMessagePresentation(
  content: string,
  actionLabel?: string | null,
  actionHref?: string | null,
): DirectMessagePresentation {
  if (actionLabel && actionHref) {
    const legacyPresentation = extractLegacyDirectMessageAction(content);
    const primaryAction = {
      label: actionLabel,
      href: actionHref,
    };
    const remainingActions = legacyPresentation.actions.filter(
      (action) => action.label !== actionLabel || action.href !== actionHref,
    );
    return {
      body: stripDanglingWhitespace(legacyPresentation.body),
      action: primaryAction,
      actions: [primaryAction, ...remainingActions],
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
