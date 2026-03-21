export function hasRequiredFullName(value: string | null | undefined): boolean {
  if (!value) return false;
  const parts = value
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length < 2) return false;
  return parts[0].length >= 2 && parts[parts.length - 1].length >= 2;
}

export function splitFullName(value: string | null | undefined): { firstName: string; lastName: string } {
  const parts = (value || "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) {
    return { firstName: "", lastName: "" };
  }

  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "" };
  }

  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

export function buildFullName(firstName: string, lastName: string): string {
  return `${firstName.trim()} ${lastName.trim()}`.replace(/\s+/g, " ").trim();
}
