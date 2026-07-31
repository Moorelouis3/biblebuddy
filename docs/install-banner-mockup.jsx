import { useState } from "react";

const C = {
  bg: "#F2F5F9",
  card: "#FFFFFF",
  ink: "#17203A",
  muted: "#64748B",
  blue: "#2563EB",
  blueDeep: "#1D4ED8",
  line: "#E7ECF3",
  soft: "#EFF4FF",
};

const css = `
@keyframes bbPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(37,99,235,0.0); }
  50% { box-shadow: 0 0 0 7px rgba(37,99,235,0.20); }
}
@keyframes bbSheen {
  0% { transform: translateX(-120%); }
  100% { transform: translateX(320%); }
}
@keyframes bbFlash {
  0%, 45% { opacity: 1; }
  55%, 100% { opacity: 0.28; }
}
@keyframes bbDrop {
  from { transform: translateY(-14px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes bbRise {
  from { transform: translateY(24px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.bb-pulse { animation: bbPulse 1.7s ease-in-out 3; }
.bb-flash { animation: bbFlash 0.9s steps(1) infinite; }
.bb-drop { animation: bbDrop 320ms cubic-bezier(.2,.8,.2,1) both; }
.bb-rise { animation: bbRise 300ms cubic-bezier(.2,.8,.2,1) both; }
.bb-sheen { animation: bbSheen 2.4s ease-in-out 3; }
@media (prefers-reduced-motion: reduce) {
  .bb-pulse, .bb-flash, .bb-sheen, .bb-drop, .bb-rise { animation: none !important; }
}
.bb-scroll::-webkit-scrollbar { width: 0; height: 0; }
`;

function AppIcon({ size = 34 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.28,
        background: "linear-gradient(160deg,#1E3A8A 0%,#2563EB 60%,#3B82F6 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 2px 6px rgba(30,58,138,0.35)",
      }}
    >
      <span style={{ color: "#F5D08A", fontSize: size * 0.42, fontWeight: 800, letterSpacing: "-0.5px" }}>BB</span>
    </div>
  );
}

function Chip({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "7px 12px",
        borderRadius: 999,
        border: `1px solid ${active ? C.blue : C.line}`,
        background: active ? C.blue : "#fff",
        color: active ? "#fff" : C.muted,
        fontSize: 12.5,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

/* ---------- the banner itself ---------- */
function InstallBanner({ placement, motion, onAdd, onNever }) {
  const motionClass = motion === "flash" ? "bb-flash" : "";
  const btnClass = motion === "pulse" ? "bb-pulse" : "";

  return (
    <div
      className={`${placement === "top" ? "bb-drop" : "bb-rise"} ${motionClass}`}
      style={{
        position: "relative",
        overflow: "hidden",
        margin: placement === "top" ? "0 12px 10px" : "0 12px 10px",
        background: C.card,
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: "11px 12px",
        boxShadow:
          placement === "top"
            ? "0 6px 18px rgba(23,32,58,0.08)"
            : "0 -4px 22px rgba(23,32,58,0.12)",
      }}
    >
      {motion === "pulse" && (
        <div
          className="bb-sheen"
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: 70,
            background:
              "linear-gradient(100deg,rgba(37,99,235,0) 0%,rgba(37,99,235,0.10) 50%,rgba(37,99,235,0) 100%)",
            pointerEvents: "none",
          }}
        />
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <AppIcon />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: C.ink, lineHeight: 1.25 }}>
            Add Bible Buddy to your home screen
          </div>
          <div style={{ fontSize: 11.5, color: C.muted, marginTop: 2 }}>
            Opens like an app. Keeps your streak in reach.
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 9, paddingLeft: 44, alignItems: "center" }}>
        <button
          onClick={onAdd}
          className={btnClass}
          style={{ background: "none", border: "none", padding: "3px 6px", marginLeft: -6, borderRadius: 8, fontSize: 12.5, color: C.blue, fontWeight: 800, cursor: "pointer" }}
        >
          Add
        </button>
        <button
          onClick={onNever}
          style={{ background: "none", border: "none", padding: 0, fontSize: 11.5, color: "#94A3B8", cursor: "pointer" }}
        >
          Don't show again
        </button>
      </div>
    </div>
  );
}

/* ---------- overlays ---------- */
function AndroidDialog({ onCancel, onConfirm }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 90, zIndex: 40 }}>
      <div className="bb-drop" style={{ width: "84%", background: "#fff", borderRadius: 14, padding: 16, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" }}>
        <div style={{ fontSize: 10.5, color: C.muted, marginBottom: 10 }}>Chrome</div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <AppIcon size={40} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.ink }}>Install app</div>
            <div style={{ fontSize: 11.5, color: C.muted }}>Bible Buddy</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 14, marginTop: 16 }}>
          <button onClick={onCancel} style={{ background: "none", border: "none", color: C.blue, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Cancel</button>
          <button onClick={onConfirm} style={{ background: "none", border: "none", color: C.blue, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Install</button>
        </div>
        <div style={{ marginTop: 12, fontSize: 10, color: "#94A3B8", borderTop: `1px solid ${C.line}`, paddingTop: 8 }}>
          This is the real system dialog. Your button just triggers it.
        </div>
      </div>
    </div>
  );
}

function IOSSheet({ onClose }) {
  const steps = [
    "Tap the Share button at the bottom of Safari",
    "Scroll down and tap Add to Home Screen",
    "Tap Add in the top corner",
  ];
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "flex-end", zIndex: 40 }}>
      <div className="bb-rise" style={{ width: "100%", background: "#fff", borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "16px 18px 22px" }}>
        <div style={{ width: 38, height: 4, borderRadius: 999, background: C.line, margin: "0 auto 14px" }} />
        <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
          <AppIcon size={38} />
          <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, lineHeight: 1.2 }}>
            Three taps and it's on your home screen
          </div>
        </div>
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
            <div style={{ width: 20, height: 20, borderRadius: 999, background: C.soft, color: C.blue, fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontSize: 12.5, color: C.ink, lineHeight: 1.45 }}>{s}</div>
          </div>
        ))}
        <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: 10, fontSize: 11, color: "#9A3412", marginTop: 4 }}>
          iPhone has no install button for websites. Safari only allows the manual route, so this sheet plus the arrow is the whole iOS experience.
        </div>
        <button onClick={onClose} style={{ width: "100%", marginTop: 14, background: C.blue, color: "#fff", border: "none", borderRadius: 999, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
          Got it
        </button>
      </div>
      <div style={{ position: "absolute", bottom: 6, left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: 22 }}>↓</div>
    </div>
  );
}

function AddedToast({ onClose }) {
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(15,23,42,0.35)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 40 }}>
      <div className="bb-drop" style={{ background: "#fff", borderRadius: 16, padding: "20px 22px", textAlign: "center", width: "76%" }}>
        <div style={{ fontSize: 28 }}>✓</div>
        <div style={{ fontSize: 15, fontWeight: 800, color: C.ink, marginTop: 6 }}>Added</div>
        <div style={{ fontSize: 12, color: C.muted, marginTop: 6, lineHeight: 1.5 }}>
          Banner is gone for good on this account. The app now knows it is installed.
        </div>
        <button onClick={onClose} style={{ marginTop: 14, background: C.blue, color: "#fff", border: "none", borderRadius: 999, padding: "9px 22px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
          Close
        </button>
      </div>
    </div>
  );
}

/* ---------- home screen recreation ---------- */
function HomeScreen({ children, placement }) {
  const days = [
    { n: 36, s: "Completed" },
    { n: 37, s: "Current" },
    { n: 38, s: "Locked" },
  ];
  return (
    <div style={{ background: C.bg, height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 14px 4px", fontSize: 11, color: C.ink, fontWeight: 700 }}>
        <span>18:13</span>
        <span style={{ color: C.muted, fontWeight: 600 }}>▮▮ 7</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2px 14px 10px" }}>
        <span style={{ fontSize: 14, fontWeight: 800, color: C.ink }}>Bible Buddy</span>
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <div style={{ width: 24, height: 24, borderRadius: 999, background: "#fff", border: `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>🔔</div>
          <div style={{ width: 24, height: 24, borderRadius: 999, background: "#C7D2FE" }} />
        </div>
      </div>

      {placement === "top" && children}

      <div className="bb-scroll" style={{ flex: 1, overflowY: "auto", padding: "0 12px" }}>
        <div style={{ textAlign: "center", fontSize: 19, fontWeight: 800, color: C.ink, margin: "6px 0 14px" }}>
          Good afternoon, Louis
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: 14, marginBottom: 14 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{ fontSize: 18 }}>🔥</span>
            <span style={{ fontSize: 14.5, fontWeight: 800, color: C.ink }}>207 Day Bible Study Streak</span>
          </div>
          <div style={{ height: 12, borderRadius: 999, background: "#DDE4ED", marginTop: 12 }}>
            <div style={{ width: "12%", height: "100%", borderRadius: 999, background: C.blue }} />
          </div>
          <div style={{ textAlign: "center", fontSize: 11.5, color: "#475569", fontWeight: 700, marginTop: 10 }}>
            You have finished 12% of the Bible.
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: "12px 10px", marginBottom: 14 }}>
          <div style={{ textAlign: "center", fontSize: 10, fontWeight: 800, color: C.blue, letterSpacing: 1.4, marginBottom: 10 }}>
            BIBLE IN ONE YEAR
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {days.map((d) => (
              <div key={d.n} style={{ textAlign: "center" }}>
                <div style={{ width: 58, height: 58, borderRadius: 12, background: "linear-gradient(160deg,#1C1917,#3F3427)", border: d.s === "Current" ? `2px solid ${C.blue}` : `1px solid ${C.line}`, display: "flex", alignItems: "center", justifyContent: "center", color: "#D6B06A", fontSize: 9, fontWeight: 700, letterSpacing: 0.5 }}>
                  BIBLE
                </div>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: C.ink, marginTop: 5 }}>Day {d.n}</div>
                <div style={{ fontSize: 9.5, color: d.s === "Locked" ? "#94A3B8" : C.blue, fontWeight: 600 }}>{d.s}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: 16, textAlign: "center", marginBottom: 14 }}>
          <span style={{ background: C.soft, color: C.blue, fontSize: 10, fontWeight: 800, letterSpacing: 2, padding: "5px 14px", borderRadius: 999 }}>DAY 37</span>
          <div style={{ fontSize: 10, letterSpacing: 1.6, color: "#475569", fontWeight: 700, margin: "12px 0 6px" }}>
            LEVITICUS 21 THROUGH 24
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.ink, lineHeight: 1.25 }}>
            Priests, Feasts, and Sacred Order
          </div>
        </div>
      </div>

      {placement === "bottom" && children}

      <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", background: "#fff", borderTop: `1px solid ${C.line}`, padding: "8px 0 10px" }}>
        {["Group", "Bible", "Devotionals", "Home", "BB Chat", "Analytics"].map((t) => (
          <div key={t} style={{ fontSize: 8.5, fontWeight: 700, color: t === "Home" ? C.blue : C.muted, textAlign: "center" }}>
            <div style={{ width: 20, height: 20, borderRadius: 999, background: t === "Home" ? C.blue : "transparent", margin: "0 auto 3px" }} />
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function InstallBannerMockup() {
  const [platform, setPlatform] = useState("android");
  const [placement, setPlacement] = useState("top");
  const [motion, setMotion] = useState("pulse");
  const [visible, setVisible] = useState(true);
  const [overlay, setOverlay] = useState(null);
  const [note, setNote] = useState("");
  const [key, setKey] = useState(0);

  const isInstalled = platform === "installed";
  const showBanner = visible && !isInstalled;

  const handleAdd = () => {
    if (platform === "ios") setOverlay("ios");
    else setOverlay("android");
  };

  const reset = () => {
    setVisible(true);
    setOverlay(null);
    setNote("");
    setKey((k) => k + 1);
  };

  return (
    <div style={{ background: "#E8EDF4", minHeight: "100%", padding: 16, fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
      <style>{css}</style>

      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <div style={{ fontSize: 19, fontWeight: 800, color: C.ink }}>Add to Home Screen banner</div>
        <div style={{ fontSize: 12.5, color: C.muted, marginTop: 4, marginBottom: 14, lineHeight: 1.5 }}>
          Tap the buttons in the phone. Switch the settings to see every state.
        </div>

        {/* controls */}
        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 12, marginBottom: 16 }}>
          <Row label="Device">
            <Chip active={platform === "android"} onClick={() => { setPlatform("android"); reset(); }}>Android</Chip>
            <Chip active={platform === "ios"} onClick={() => { setPlatform("ios"); reset(); }}>iPhone</Chip>
            <Chip active={platform === "installed"} onClick={() => setPlatform("installed")}>Already added</Chip>
          </Row>
          <Row label="Position">
            <Chip active={placement === "top"} onClick={() => { setPlacement("top"); reset(); }}>Top</Chip>
            <Chip active={placement === "bottom"} onClick={() => { setPlacement("bottom"); reset(); }}>Bottom</Chip>
          </Row>
          <Row label="Attention">
            <Chip active={motion === "pulse"} onClick={() => { setMotion("pulse"); reset(); }}>Pulse x3</Chip>
            <Chip active={motion === "flash"} onClick={() => { setMotion("flash"); reset(); }}>Constant flash</Chip>
            <Chip active={motion === "none"} onClick={() => { setMotion("none"); reset(); }}>Still</Chip>
          </Row>
          <button onClick={reset} style={{ marginTop: 10, width: "100%", background: C.soft, color: C.blue, border: "none", borderRadius: 10, padding: "9px 0", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>
            Replay as a new user
          </button>
        </div>

        {/* phone */}
        <div style={{ background: "#0F172A", borderRadius: 32, padding: 9, boxShadow: "0 20px 50px rgba(15,23,42,0.28)" }}>
          <div style={{ position: "relative", borderRadius: 25, overflow: "hidden", height: 620, background: C.bg }}>
            <HomeScreen placement={placement}>
              {showBanner && (
                <InstallBanner
                  key={key + placement + motion}
                  placement={placement}
                  motion={motion}
                  onAdd={handleAdd}
                  onNever={() => { setVisible(false); setNote("Gone permanently. Saved to their profile so it stays gone on every device."); }}
                />
              )}
            </HomeScreen>

            {isInstalled && (
              <div style={{ position: "absolute", top: 60, left: 12, right: 12, background: "#ECFDF5", border: "1px solid #A7F3D0", borderRadius: 12, padding: 10, fontSize: 11.5, color: "#065F46", zIndex: 30 }}>
                App is already on the home screen, so the banner never renders. Detected with display-mode standalone.
              </div>
            )}

            {overlay === "android" && (
              <AndroidDialog onCancel={() => setOverlay(null)} onConfirm={() => setOverlay("added")} />
            )}
            {overlay === "ios" && <IOSSheet onClose={() => { setOverlay(null); setVisible(false); setNote("iPhone cannot confirm the install, so the banner hides for 7 days and then asks once more."); }} />}
            {overlay === "added" && <AddedToast onClose={() => { setOverlay(null); setVisible(false); setPlatform("installed"); }} />}
          </div>
        </div>

        {note && (
          <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderLeft: `3px solid ${C.blue}`, borderRadius: 10, padding: 11, fontSize: 12, color: C.ink, marginTop: 14, lineHeight: 1.5 }}>
            {note}
          </div>
        )}

        {/* rules */}
        <div style={{ background: "#fff", border: `1px solid ${C.line}`, borderRadius: 16, padding: 14, marginTop: 16 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: C.ink, marginBottom: 10 }}>When it shows</div>
          {[
            ["Shows", "New signups, from their first home screen visit"],
            ["Hides", "Already installed, or they tapped Don't show again"],
            ["Stays", "Every session until they add it or dismiss it for good"],
            ["Android", "The Add button fires the real Chrome install prompt"],
            ["iPhone", "No install API exists, so it opens the 3 step sheet instead"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: 10, padding: "7px 0", borderTop: `1px solid ${C.line}` }}>
              <div style={{ width: 66, flexShrink: 0, fontSize: 11.5, fontWeight: 800, color: C.blue }}>{k}</div>
              <div style={{ fontSize: 11.5, color: "#334155", lineHeight: 1.45 }}>{v}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
      <div style={{ width: 66, fontSize: 11, fontWeight: 800, color: "#94A3B8", textTransform: "uppercase", letterSpacing: 0.6 }}>{label}</div>
      {children}
    </div>
  );
}
