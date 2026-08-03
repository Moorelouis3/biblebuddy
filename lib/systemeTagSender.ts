import { EmailDay, EmailVersion, getTemplateKey } from "./emailFunnelTemplates";

const SYSTEME_API = "https://api.systeme.io/api";

// Maps template keys to Systeme.io tag names. Each tag has an automation
// rule in Systeme.io ("tag added -> send email") that does the sending.
export function tagNameForTemplate(day: EmailDay, version?: EmailVersion): string {
  return `bb-${getTemplateKey(day, version).replace(/_/g, "-")}`;
}

async function systemeFetch(path: string, apiKey: string, init?: RequestInit) {
  return fetch(`${SYSTEME_API}${path}`, {
    ...init,
    headers: {
      "X-API-Key": apiKey,
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
  });
}

// Thrown when Systeme.io's plan-level cap (contacts or tags) is hit, so
// callers can stop a batch cleanly instead of misreading it as a per-item
// failure. Systeme returns 422 for this AND for "already exists" -- they
// can only be told apart by the error detail text.
export class SystemePlanLimitError extends Error {}

function isPlanLimitError(detail: string): boolean {
  return /upgrade your plan/i.test(detail);
}

async function getOrCreateContact(email: string, apiKey: string): Promise<{ id: number } | null> {
  const lookup = await systemeFetch(`/contacts?email=${encodeURIComponent(email)}`, apiKey);
  if (lookup.ok) {
    const data = await lookup.json();
    const existing = data?.items?.[0];
    if (existing?.id) return { id: existing.id };
  }

  const created = await systemeFetch(`/contacts`, apiKey, {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  if (created.ok) {
    const data = await created.json();
    if (data?.id) return { id: data.id };
  }

  if (created.status === 422) {
    const detail = await created.text();
    if (isPlanLimitError(detail)) {
      throw new SystemePlanLimitError(detail);
    }
    // Otherwise 422 means the contact already exists; retry lookup once.
    const retry = await systemeFetch(`/contacts?email=${encodeURIComponent(email)}`, apiKey);
    if (retry.ok) {
      const data = await retry.json();
      const existing = data?.items?.[0];
      if (existing?.id) return { id: existing.id };
    }
  }

  return null;
}

async function getOrCreateTagId(tagName: string, apiKey: string): Promise<number | null> {
  const list = await systemeFetch(`/tags?limit=100`, apiKey);
  if (list.ok) {
    const data = await list.json();
    const existing = (data?.items || []).find((t: any) => t.name === tagName);
    if (existing?.id) return existing.id;
  }

  const created = await systemeFetch(`/tags`, apiKey, {
    method: "POST",
    body: JSON.stringify({ name: tagName }),
  });

  if (created.ok) {
    const data = await created.json();
    if (data?.id) return data.id;
  }

  return null;
}

export async function sendFunnelEmailViaTag(
  email: string,
  day: EmailDay,
  version?: EmailVersion,
  apiKey?: string,
): Promise<{ ok: boolean; error?: string; response?: any }> {
  const key = apiKey || process.env.SYSTEME_API_KEY;
  if (!key) {
    return { ok: false, error: "SYSTEME_API_KEY not configured" };
  }

  try {
    const contact = await getOrCreateContact(email, key);
    if (!contact) {
      return { ok: false, error: `Could not find or create Systeme.io contact for ${email}` };
    }

    const tagName = tagNameForTemplate(day, version);
    const tagId = await getOrCreateTagId(tagName, key);
    if (!tagId) {
      return { ok: false, error: `Could not find or create Systeme.io tag ${tagName}` };
    }

    const assign = await systemeFetch(`/contacts/${contact.id}/tags`, key, {
      method: "POST",
      body: JSON.stringify({ tagId }),
    });

    if (!assign.ok) {
      const detail = await assign.text();
      if (assign.status === 422) {
        if (isPlanLimitError(detail)) throw new SystemePlanLimitError(detail);
        // Otherwise 422 on assign means the tag is already on the contact; treat as success.
        return { ok: true, response: { alreadyTagged: true, tagName, contactId: contact.id } };
      }
      console.error(`[EMAIL_FUNNEL] Tag assign error: ${assign.status} - ${detail}`);
      return { ok: false, error: `Systeme.io tag assign returned ${assign.status}`, response: detail };
    }

    return { ok: true, response: { tagged: tagName, contactId: contact.id } };
  } catch (err) {
    if (err instanceof SystemePlanLimitError) throw err;
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[EMAIL_FUNNEL] Systeme tag request error:", message);
    return { ok: false, error: message };
  }
}
