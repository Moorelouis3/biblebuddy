"use client";

import { useEffect, useState } from "react";
import { reportCrash, tryAutoReload } from "../lib/crashRecovery";

// Last line of defence: the root layout itself crashed, so this renders its
// own <html>. Plain inline styles only - the app's CSS may not be loaded.
export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  const [reloading, setReloading] = useState(false);

  useEffect(() => {
    const reloaded = tryAutoReload(error);
    setReloading(reloaded);
    void reportCrash(error, "global", reloaded);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#eef4fb", color: "#111827" }}>
        {reloading ? null : (
          <div style={{ maxWidth: 420, margin: "0 auto", padding: "20vh 24px", textAlign: "center" }}>
            <div style={{ fontSize: 40 }}>🛠️</div>
            <h1 style={{ fontSize: 20, fontWeight: 900, margin: "12px 0 8px" }}>Bible Buddy hit a snag</h1>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#4b5563", margin: 0 }}>
              Louis has already been sent the details. Tap below to reload - it usually works on the second go.
            </p>
            <button
              type="button"
              onClick={() => window.location.assign("/dashboard")}
              style={{
                marginTop: 20,
                border: 0,
                borderRadius: 999,
                background: "#2563eb",
                color: "#fff",
                padding: "12px 24px",
                fontSize: 14,
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Reload Bible Buddy
            </button>
          </div>
        )}
      </body>
    </html>
  );
}
