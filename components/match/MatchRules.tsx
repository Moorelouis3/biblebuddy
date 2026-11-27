"use client";

/**
 * How to Play, for Bible Buddy Match (2026-11-27).
 *
 * Louis: "can we add like a rules or something on the game about matches,
 * what they get, the different kinds... think Candy Crush, this is that."
 * It came out of a player's two bug reports the same day that were not bugs:
 * chain matches "not counting" (they do, but only three of a board's seven
 * kinds are goals) and an L of five "not giving the super special" (it gives
 * the Trumpet Blast). The game was right and had never said so anywhere.
 *
 * Every line here states a rule in lib/match/engine.ts. When a rule changes
 * there (runsToClear, comboBeams, playSwap, jubilee), change it here too.
 *
 * Opened from the ? beside the gear on every board, and from Settings.
 */

type Shape = { cols: number; rows: number; on: Array<[number, number]> };

const SHAPES: Record<string, Shape> = {
  three: { cols: 3, rows: 1, on: [[0, 0], [0, 1], [0, 2]] },
  fourAcross: { cols: 4, rows: 1, on: [[0, 0], [0, 1], [0, 2], [0, 3]] },
  fourDown: { cols: 1, rows: 4, on: [[0, 0], [1, 0], [2, 0], [3, 0]] },
  ell: { cols: 3, rows: 3, on: [[0, 0], [1, 0], [2, 0], [2, 1], [2, 2]] },
  tee: { cols: 3, rows: 3, on: [[0, 0], [0, 1], [0, 2], [1, 1], [2, 1]] },
  square: { cols: 2, rows: 2, on: [[0, 0], [0, 1], [1, 0], [1, 1]] },
  five: { cols: 5, rows: 1, on: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]] },
};

function Diagram({ shapes }: { shapes: string[] }) {
  return (
    <span className="bbmr-shapes" aria-hidden="true">
      {shapes.map((name) => {
        const shape = SHAPES[name];
        const on = new Set(shape.on.map(([r, c]) => `${r},${c}`));
        return (
          <span key={name} className="bbmr-shape" style={{ gridTemplateColumns: `repeat(${shape.cols}, 11px)` }}>
            {Array.from({ length: shape.rows * shape.cols }, (_, i) => {
              const r = Math.floor(i / shape.cols);
              const c = i % shape.cols;
              return <i key={i} className={on.has(`${r},${c}`) ? "is-on" : ""} />;
            })}
          </span>
        );
      })}
    </span>
  );
}

const POWERS: Array<{ shapes: string[]; make: string; icon: string; name: string; does: string }> = [
  { shapes: ["fourAcross"], make: "4 in a row, across", icon: "✨", name: "Light Burst", does: "Clears its whole row." },
  { shapes: ["fourDown"], make: "4 in a row, up and down", icon: "🔥", name: "Pillar of Fire", does: "Clears its whole column." },
  { shapes: ["ell", "tee"], make: "5 in an L or a T", icon: "📯", name: "Trumpet Blast", does: "Clears the 3 by 3 square around it." },
  { shapes: ["square"], make: "4 in a square", icon: "🕊️", name: "Dove", does: "Flies to a tile you still need and takes it and the four around it." },
  { shapes: ["five"], make: "5 in a straight row", icon: "🌟", name: "All Match orb", does: "Swap it with any tile and every tile of that kind clears." },
];

const COMBOS: Array<{ pair: string; does: string }> = [
  { pair: "Light Burst + Pillar of Fire", does: "A cross: one row and one column." },
  { pair: "Trumpet Blast + Light Burst or Pillar", does: "Three rows and three columns." },
  { pair: "Trumpet Blast + Trumpet Blast", does: "A 5 by 5 blast." },
  { pair: "All Match orb + a power-up", does: "Every tile of that kind becomes that power-up, and they all go off." },
  { pair: "All Match orb + All Match orb", does: "The whole board clears." },
];

export default function MatchRules({ onClose }: { onClose: () => void }) {
  return (
    <div className="bbmr-wrap" role="dialog" aria-modal="true" aria-label="How to play"
      onClick={(event) => {
        // Opened over Settings too: a tap outside closes this, not Settings under it.
        event.stopPropagation();
        onClose();
      }}
    >
      <style>{RULES_CSS}</style>
      <div className="bbmr-sheet" onClick={(event) => event.stopPropagation()}>
        <h2>How to Play</h2>

        <section>
          <h3>The basics</h3>
          <p className="bbmr-row">
            <Diagram shapes={["three"]} />
            <span>
              Swap two tiles that are side by side to line up <b>3 or more</b> of the same kind. They clear, and new tiles fall in.
            </span>
          </p>
          <ul>
            <li>
              <b>Collect the three kinds shown at the top</b> before you run out of moves. Only those kinds count. A match of any other
              kind clears tiles but does not move the count.
            </li>
            <li>
              <b>Chains count.</b> When falling tiles make new matches by themselves, those are counted too, if they are a kind you need.
            </li>
            <li>A swap that lines nothing up slides back and does not use a move.</li>
          </ul>
        </section>

        <section>
          <h3>Bigger matches make power-ups</h3>
          <div className="bbmr-list">
            {POWERS.map((power) => (
              <div key={power.name} className="bbmr-power">
                <Diagram shapes={power.shapes} />
                <div>
                  <p className="bbmr-make">{power.make}</p>
                  <p className="bbmr-name">
                    <span aria-hidden="true">{power.icon}</span> {power.name}
                  </p>
                  <p className="bbmr-does">{power.does}</p>
                </div>
              </div>
            ))}
          </div>
          <ul>
            <li>
              A new power-up <b>drops in at the top of its column</b>, with a glowing edge. Look up for it.
            </li>
            <li>
              Light Burst, Pillar of Fire and Trumpet Blast go off when they are <b>part of a match</b> or get caught in another clear.
            </li>
            <li>
              The Dove and the All Match orb go off when you <b>swap them with any tile next to them</b>.
            </li>
          </ul>
        </section>

        <section>
          <h3>Swap two power-ups together</h3>
          <div className="bbmr-combos">
            {COMBOS.map((combo) => (
              <p key={combo.pair}>
                <b>{combo.pair}</b>
                <span>{combo.does}</span>
              </p>
            ))}
          </div>
        </section>

        <section>
          <h3>Good to know</h3>
          <ul>
            <li>
              <b>Jubilee.</b> Finish a board with moves to spare and up to 8 of them turn into sweeps for bonus points.
            </li>
            <li>Stuck? A hint shows by itself after 10 seconds.</li>
            <li>If no swap is left, the board shuffles for free.</li>
          </ul>
        </section>

        <button type="button" className="bbmr-done" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

const RULES_CSS = `
.bbmr-wrap { position:fixed; inset:0; z-index:40; display:grid; place-items:center; padding: 12px; background: rgba(10,6,2,.66); animation: bbm-fade .2s ease-out both; }
.bbmr-sheet { width: min(100%, 460px); max-height: min(92dvh, 760px); overflow-y:auto; -webkit-overflow-scrolling:touch; padding: 18px 16px 16px; border-radius: 22px; text-align:left;
  color:#4a2a10; background: linear-gradient(180deg,#fff8e3,#f2dfb0); border: 3px solid #b8893c; box-shadow: 0 0 0 2px #7a5320, 0 20px 44px rgba(0,0,0,.55); }
.bbmr-sheet h2 { margin: 0 0 4px; text-align:center; font-family: Georgia, serif; font-size: 28px; font-weight:900; color:#4a2a10 !important; }
.bbmr-sheet h3 { margin: 14px 0 6px; padding-bottom: 4px; font-family: Georgia, serif; font-size: 18px; font-weight:900; color:#7a4a12 !important; border-bottom: 2px solid rgba(184,137,60,.55); }
.bbmr-sheet p, .bbmr-sheet li { font-size: 14.5px; line-height: 1.45; font-weight:600; color:#4a2a10 !important; }
.bbmr-sheet b { font-weight:900; }
.bbmr-sheet ul { margin: 8px 0 0; padding-left: 18px; list-style: disc; }
.bbmr-sheet li { margin-top: 4px; }
.bbmr-row { display:flex; align-items:center; gap:12px; margin:0; }
.bbmr-shapes { flex:none; display:flex; align-items:center; justify-content:center; gap:6px; width: 88px; }
.bbmr-shape { display:grid; gap:2px; }
.bbmr-shape i { width:11px; height:11px; border-radius:3px; background: rgba(122,83,32,.14); }
.bbmr-shape i.is-on { background: linear-gradient(180deg,#ffd24a,#e39a14); box-shadow: inset 0 0 0 1px #9a6410; }
.bbmr-list { display:flex; flex-direction:column; gap:8px; }
.bbmr-power { display:flex; align-items:center; gap:12px; padding: 9px 10px; border-radius: 14px; background: rgba(255,255,255,.55); border: 1px solid rgba(184,137,60,.5); }
.bbmr-make { margin:0; font-size: 12.5px !important; font-weight:800 !important; text-transform:uppercase; letter-spacing:.04em; color:#8a5a12 !important; }
.bbmr-name { margin: 1px 0 0; font-family: Georgia, serif; font-size: 17px !important; font-weight:900 !important; }
.bbmr-does { margin: 1px 0 0; }
.bbmr-combos p { display:flex; flex-direction:column; margin: 0; padding: 7px 0; border-top: 1px solid rgba(184,137,60,.4); }
.bbmr-combos p:first-child { border-top:0; padding-top:0; }
.bbmr-done { display:block; width:100%; margin-top: 16px; padding: 13px; border:0; border-radius: 16px; cursor:pointer; font-size: 18px; font-weight:900; color:#fff7dd !important;
  background: linear-gradient(180deg,#4fae6a,#1f7a3c); box-shadow: 0 4px 0 #0f4a22; text-shadow: 0 2px 0 rgba(0,0,0,.3); }
.bbmr-done:active { transform: translateY(2px); box-shadow: 0 2px 0 #0f4a22; }
`;
