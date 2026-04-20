export async function requestLouisNotes(prompt: string, timeoutMs = 25000): Promise<string> {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to generate notes: ${response.statusText}. ${errorText}`);
    }

    const json = await response.json();
    const generated = (json?.reply as string) ?? "";

    if (!generated || generated.trim().length === 0) {
      throw new Error("Generated notes are empty.");
    }

    return generated;
  } catch (error: any) {
    if (error?.name === "AbortError") {
      throw new Error("Loading notes took too long. Please try again.");
    }
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}
