/** All of Bible Buddy Match's styling: plaques, parchment, the grid and its effects. */
export const MATCH_CSS = `
html.bb-game-screen :is(.bb-bottom-pill, .bb-safe-top-header, .bb-report-problem, section[aria-labelledby="home-bible-lock-heading"]) { display:none !important; }
/* Match never scrolls the page (Louis, 2026-11-22: "no need for scrolling, everything fits"); only the map scrolls, inside its own box. */
html.bb-game-screen, html.bb-game-screen body { overflow:hidden !important; overscroll-behavior:none; }
.bbm-board { height:100dvh; min-height:0 !important; overflow:hidden; box-sizing:border-box; }
.bbm-root { position:relative; min-height:100dvh; overflow:hidden; color:#3b2412; font-family: Georgia, "Times New Roman", serif; background:#123; isolation:isolate; }
.bbm-root :is(h1,h2,h3,p,span,b,li,button,a) { color: inherit; }
.bbm-root button { font-family: inherit; }

/* ---------- shared pieces ---------- */
.bbm-topbar { position:relative; z-index:5; display:flex; align-items:center; justify-content:space-between; gap:8px; padding: calc(12px + env(safe-area-inset-top)) 14px 0; }
.bbm-roundbtn { width:46px; height:46px; border-radius:14px; display:grid; place-items:center; font-size:24px; font-weight:900; color:#fff4dc !important;
  background: linear-gradient(180deg,#a8622c,#6e3a14); box-shadow: inset 0 0 0 2px #e2b46a, 0 4px 10px rgba(0,0,0,.35); text-decoration:none; }
.bbm-roundbtn.is-spacer { visibility:hidden; }
.bbm-plaque { text-align:center; padding: 10px 26px 12px; border-radius: 22px; color:#4a2a10;
  background: linear-gradient(180deg,#fbeccb,#efd29a); box-shadow: inset 0 0 0 3px #d8a54c, inset 0 0 0 6px #fbeccb, inset 0 0 0 7px #b98634, 0 8px 18px rgba(0,0,0,.35); }
.bbm-plaque h1 { margin:0; font-size: clamp(26px, 8vw, 40px); font-weight:800; line-height:1.05; color:#4a2a10 !important; }
.bbm-plaque p { margin: 2px 0 0; font-size: clamp(13px, 3.6vw, 17px); font-weight:700; color:#6a4520 !important; }
.bbm-btn-green, .bbm-play { display:block; width:100%; border:0; cursor:pointer; color:#fff7dd !important; font-weight:800; text-shadow: 0 2px 0 rgba(0,0,0,.3);
  background: linear-gradient(180deg,#3d9a4b,#1d6a2e 60%,#16561f); box-shadow: inset 0 0 0 3px #f0c75e, inset 0 0 0 6px #1d6a2e, 0 6px 0 #0f3d18, 0 12px 22px rgba(0,0,0,.35); }
.bbm-btn-green { padding: 14px; border-radius: 18px; font-size: 20px; margin-top: 14px; }
.bbm-btn-cream { display:block; width:100%; margin-top:10px; padding: 12px; border-radius:16px; border:0; cursor:pointer; font-size:17px; font-weight:800; color:#5a3a16 !important;
  background: linear-gradient(180deg,#fff6df,#f0dcae); box-shadow: inset 0 0 0 2px #c99a46, 0 4px 10px rgba(0,0,0,.2); }

/* ---------- home ---------- */
.bbm-home { position:relative; min-height:100dvh; display:flex; flex-direction:column; }
.bbm-home-bg { position:fixed; inset:0; z-index:-1; background: linear-gradient(180deg, rgba(255,186,110,.35), rgba(0,0,0,0) 35%, rgba(0,0,0,.25)), url(/games/match/backgrounds/eden.webp) center / cover no-repeat; }
.bbm-sign { position:relative; margin: 6px auto 0; width: min(88vw, 420px); padding: 18px 22px 20px; text-align:center; border-radius: 30px;
  background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 4px #c9934a, inset 0 0 0 8px #8a5a2b, inset 0 0 0 11px #c9934a, 0 14px 26px rgba(0,0,0,.4); }
.bbm-sign h1 { margin:0; font-size: clamp(36px, 11vw, 56px); line-height: .98; font-weight:900; color:#5a2f10 !important; text-shadow: 0 2px 0 #fff3d2; }
.bbm-sign-leaf { position:absolute; left:50%; top:-14px; transform: translateX(-50%); font-size:26px; }
.bbm-home-stage { position:relative; flex:1; min-height: 240px; display:flex; align-items:flex-end; justify-content:center; padding: 0 12px; }
.bbm-home-buddy { position:absolute; left: 4%; bottom: 0; width: min(38vw, 190px); filter: drop-shadow(0 10px 16px rgba(0,0,0,.35)); animation: bbm-bob 3s ease-in-out infinite; }
.bbm-home-tiles { position:relative; width: min(56vw, 300px); height: min(46vw, 240px); margin-left: 30%; margin-bottom: 6%; }
.bbm-home-tile { position:absolute; width: 46%; aspect-ratio:1; border-radius: 22%; display:flex; align-items:center; justify-content:center; background: linear-gradient(160deg,#fffaf0,#efdcb4);
  box-shadow: inset 0 0 0 3px #d8a54c, 0 10px 18px rgba(0,0,0,.35); }
.bbm-home-tile img { width:72%; height:72%; object-fit:contain; }
.bbm-home-tile.t0 { left:0; top:6%; transform: rotate(-8deg); }
.bbm-home-tile.t1 { left:50%; top:0; transform: rotate(6deg); }
.bbm-home-tile.t2 { left:14%; top:46%; transform: rotate(3deg); z-index:2; }
.bbm-home-tile.t3 { left:56%; top:44%; transform: rotate(-5deg); }
@keyframes bbm-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
.bbm-home-actions { padding: 0 20px calc(26px + env(safe-area-inset-bottom)); display:flex; flex-direction:column; align-items:center; gap: 14px; }
.bbm-play { width: min(86vw, 420px); padding: 16px; border-radius: 999px; font-size: clamp(34px, 10vw, 48px); }
.bbm-play:disabled { opacity:.7; }
.bbm-levellabel { padding: 8px 30px; border-radius: 12px; font-size: clamp(17px, 4.8vw, 22px); font-weight:800; color:#4a2a10 !important;
  background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 2px #c9934a, 0 6px 12px rgba(0,0,0,.3); }

/* ---------- home: the art from the mockup ---------- */
.bbm-home2 { position:fixed; inset:0; display:grid; place-items:center; background:#2a4a2a; }
.bbm-home2-blur { position:absolute; inset:-30px; background: url(/games/match/home-phone.webp) center / cover no-repeat; filter: blur(22px) brightness(.8); }
.bbm-home2-art { position:relative; height: min(100dvh, 150vw); aspect-ratio: 1024 / 1536; max-width:100vw; box-shadow: 0 0 40px rgba(0,0,0,.4); }
.bbm-home2-art > img { width:100%; height:100%; display:block; object-fit:cover; }
.bbm-hot { position:absolute; display:block; border:0; padding:0; background:transparent; border-radius:18px; cursor:pointer; -webkit-tap-highlight-color: transparent; }
.bbm-hot:active { background: rgba(255,255,255,.18); }
.bbm-home2-label { position:absolute; display:flex; align-items:center; justify-content:center; border-radius: 6px; font-weight:800; white-space:nowrap;
  font-size: min(3.9vw, 2.6dvh); color:#3b2412 !important; background: linear-gradient(180deg,#f8e7c3,#ecd3a0); }

/* ---------- the map ---------- */
.bbm-map { position:fixed; inset:0; display:flex; flex-direction:column; background:#0c1a33; }
.bbm-map .bbm-topbar { position:absolute; left:0; right:0; top:0; }
.bbm-ribbon { padding: 8px 34px 10px; font-size: 24px; font-weight:800; color:#4a2a10 !important; border-radius: 8px;
  background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 2px #c9934a, 0 6px 12px rgba(0,0,0,.3); }
.bbm-map-scroll { flex:1; overflow-y:auto; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
.bbm-map-world { position:relative; height: 200dvh; }
.bbm-map-eden { position:absolute; left:0; right:0; top:0; height: 112dvh; background: url(/games/match/backgrounds/eden.webp) center / cover no-repeat;
  -webkit-mask-image: linear-gradient(180deg, #000 82%, transparent); mask-image: linear-gradient(180deg, #000 82%, transparent); z-index:1; }
.bbm-map-creation { position:absolute; left:0; right:0; bottom:0; height: 100dvh; background: url(/games/match/backgrounds/creation.webp) center bottom / cover no-repeat; }
.bbm-map-creation::before { content:""; position:absolute; inset:0 0 auto 0; height: 40%; background: linear-gradient(180deg, rgba(46,92,46,.85), rgba(46,92,46,0)); }
.bbm-map-trail { position:absolute; inset:0; width:100%; height:100%; z-index:2; overflow:visible; }
.bbm-trail-edge { fill:none; stroke:#8a6a3a; stroke-width: 44px; stroke-linecap:round; opacity:.55; }
.bbm-trail { fill:none; stroke:#e9cf98; stroke-width: 36px; stroke-linecap:round; }
.bbm-trail-dash { fill:none; stroke:#cfae70; stroke-width: 4px; stroke-dasharray: 2 14; stroke-linecap:round; }
.bbm-medal { position:absolute; z-index:4; transform: translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; gap:4px; background:none; border:0; cursor:pointer; padding:0; }
.bbm-medal:disabled { cursor: default; }
.bbm-medal-coin { position:relative; width: 78px; height: 78px; border-radius:999px; display:grid; place-items:center; font-size:38px; font-weight:900; color:#fff3cf !important; text-shadow: 0 2px 0 #7a3a0a;
  background: radial-gradient(circle at 40% 35%, #ffb55a, #d9731c 60%, #a84f0c); box-shadow: inset 0 0 0 4px #f6cc6a, inset 0 0 0 7px #c0661a, 0 8px 16px rgba(0,0,0,.45); }
.bbm-medal.is-locked .bbm-medal-coin { filter: grayscale(.9) brightness(.75); font-size: 28px; }
.bbm-medal-check { position:absolute; right:-4px; top:-4px; width:28px; height:28px; border-radius:999px; display:grid; place-items:center; font-size:17px; background:#2f8a4f; color:#fff !important; box-shadow: 0 0 0 3px #fff3cf; text-shadow:none; }
.bbm-medal-name { padding: 4px 16px; border-radius: 10px; font-size: 17px; font-weight:800; color:#4a2a10 !important; background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 2px #c9934a, 0 4px 10px rgba(0,0,0,.3); white-space:nowrap; }
.bbm-medal-best { font-size: 12px; font-weight:800; color:#fff3cf !important; text-shadow: 0 1px 3px rgba(0,0,0,.8); }
.bbm-medal.is-arrived .bbm-medal-coin { animation: bbm-glow 1.2s ease-in-out infinite alternate; }
@keyframes bbm-glow { from { box-shadow: inset 0 0 0 4px #f6cc6a, inset 0 0 0 7px #c0661a, 0 0 0 rgba(255,220,120,0); } to { box-shadow: inset 0 0 0 4px #f6cc6a, inset 0 0 0 7px #c0661a, 0 0 34px 10px rgba(255,220,120,.85); } }
.bbm-marker { position:absolute; z-index:5; width: 52px; height: 52px; transform: translate(-50%, -205%); border-radius:999px; overflow:hidden; display:grid; place-items:center; font-size:28px;
  background:#fff; box-shadow: 0 0 0 4px #f6cc6a, 0 8px 14px rgba(0,0,0,.45); }
.bbm-marker::after { content:""; position:absolute; left:50%; bottom:-10px; transform: translateX(-50%); border: 8px solid transparent; border-top-color:#f6cc6a; }
.bbm-marker img { width:100%; height:100%; object-fit:cover; }
.bbm-marker.is-walking { animation: bbm-hop .35s ease-in-out infinite alternate; }
@keyframes bbm-hop { from { margin-top:0; } to { margin-top:-6px; } }
.bbm-skip { position:fixed; right:16px; bottom: calc(22px + env(safe-area-inset-bottom)); z-index:8; padding: 10px 20px; border-radius:999px; border:0; font-weight:800; font-size:16px; color:#4a2a10 !important;
  background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 2px #c9934a, 0 6px 12px rgba(0,0,0,.35); }
.bbm-arrive, .bbm-finished { position:fixed; left:50%; bottom: calc(22px + env(safe-area-inset-bottom)); transform: translateX(-50%); z-index:8; width: min(92vw, 420px); padding: 12px 16px; border-radius:16px; text-align:center; font-weight:800;
  color:#4a2a10 !important; background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 2px #c9934a, 0 8px 18px rgba(0,0,0,.4); animation: bbm-up .4s ease-out both; }
.bbm-finished { display:flex; flex-direction:column; gap:2px; }
.bbm-finished span { font-size: 13px; font-weight:700; }
@keyframes bbm-up { from { transform: translate(-50%, 20px); opacity:0; } to { transform: translate(-50%, 0); opacity:1; } }

/* ---------- the board ---------- */
.bbm-board { --size: min(100vw - 36px, 100dvh - 250px, 560px); justify-content:center; --w: calc(var(--size) + 12px); position:relative; min-height:100dvh; display:flex; flex-direction:column; align-items:center; gap: clamp(6px, 1.4vh, 14px); padding: calc(10px + env(safe-area-inset-top)) 12px calc(12px + env(safe-area-inset-bottom)); }
.bbm-board-bg { position:fixed; inset:0; z-index:-1; background: var(--bg) center / cover no-repeat; }
.bbm-board[data-level="creation"] .bbm-board-bg { background-color:#0b1630; }
.bbm-board-title { width: calc(var(--w) * .92); padding: 4px 18px 5px; border-radius:18px; }
.bbm-board-title h1 { font-size: clamp(24px, calc(var(--w) * .08), 40px); line-height:1; }
.bbm-board-title p { margin-top:0; font-size: clamp(12px, calc(var(--w) * .032), 17px); line-height:1.2; }
.bbm-hud { display:flex; align-items:center; gap: 12px; padding: 4px 14px; border-radius: 16px; width: var(--w); box-sizing:border-box;
  background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 3px #d8a54c, 0 8px 16px rgba(0,0,0,.35); }
.bbm-hud-label { display:block; font-size: 12px; line-height:1.1; font-weight:800; color:#5a3a16 !important; }
.bbm-hud-moves { display:flex; flex-direction:column; align-items:center; }
.bbm-hud-count { margin-top:1px; min-width: 56px; padding: 0 12px; border-radius: 999px; font-size: 24px; line-height:1.25; font-weight:900; text-align:center; color:#fff3dc !important; background: linear-gradient(180deg,#8a4a1f,#5e2e0e); }
.bbm-hud-count.is-low { background: linear-gradient(180deg,#c0392b,#86231a); animation: bbm-pulse .8s ease-in-out infinite alternate; }
@keyframes bbm-pulse { to { transform: scale(1.06); } }
.bbm-hud-sep { width:2px; align-self:stretch; background:#d8a54c; }
.bbm-hud-goals { flex:1; text-align:center; }
.bbm-hud-goalrow { display:flex; justify-content:space-around; align-items:center; gap: 6px; margin-top:0; }
.bbm-goal { display:inline-flex; align-items:center; gap:2px; font-size: 18px; }
.bbm-goal img { width: clamp(26px, calc(var(--w) * .07), 38px); height: clamp(26px, calc(var(--w) * .07), 38px); object-fit:contain; }
.bbm-goal { font-size: clamp(16px, calc(var(--w) * .045), 24px); }
.bbm-goal b { font-weight:900; color:#4a2a10 !important; }
.bbm-goal.is-done img { filter: drop-shadow(0 0 6px rgba(80,200,110,.9)); }
.bbm-goal-check { display:grid; place-items:center; width:24px; height:24px; border-radius:999px; background:#2f8a4f; color:#fff !important; font-size:15px; }

.bbm-gridframe { position:relative; padding: 6px; border-radius: 18px; background: linear-gradient(180deg,#f0c75e,#b5832c); box-shadow: 0 12px 24px rgba(0,0,0,.45); }
.bbm-grid { --cell: calc(var(--size) / 7); position:relative; width: var(--size); height: var(--size); border-radius: 12px; overflow:hidden; touch-action:none; user-select:none; -webkit-user-select:none;
  background: color-mix(in srgb, var(--socket) 70%, #000); }
.bbm-socket { position:absolute; left: calc(var(--c) * var(--cell)); top: calc(var(--r) * var(--cell)); width: var(--cell); height: var(--cell); padding: 2px; box-sizing:border-box; }
.bbm-socket::before { content:""; display:block; width:100%; height:100%; border-radius: 12px; background: var(--socket); box-shadow: inset 0 2px 6px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.06); }
.bbm-tile { --x: calc(var(--c) * var(--cell)); --y: calc(var(--r) * var(--cell)); position:absolute; left:0; top:0; width: var(--cell); height: var(--cell); display:flex; align-items:center; justify-content:center; padding: calc(var(--cell) * 0.05);
  transform: translate(var(--x), var(--y)); transition: transform .19s ease-in-out; will-change: transform; cursor:pointer; }
.bbm-tile img { flex:none; width:100%; height:100%; object-fit:contain; pointer-events:none; filter: drop-shadow(0 2px 2px rgba(0,0,0,.35)); }
.bbm-tile.is-drop { animation: bbm-drop .33s cubic-bezier(.3,.0,.4,1.2) both; }
@keyframes bbm-drop { from { transform: translate(var(--x), calc(var(--y) - var(--d) * var(--cell))); } to { transform: translate(var(--x), var(--y)); } }
.bbm-tile.is-selected { z-index:3; }
.bbm-tile.is-selected::before { content:""; position:absolute; inset:3%; border-radius:12px; box-shadow: 0 0 0 3px #ffe27a, 0 0 16px 4px rgba(255,226,122,.8); animation: bbm-sel .7s ease-in-out infinite alternate; }
@keyframes bbm-sel { to { box-shadow: 0 0 0 3px #fff3b8, 0 0 22px 7px rgba(255,226,122,.95); } }
.bbm-tile.is-hint img { animation: bbm-hint .45s ease-in-out infinite alternate; }
@keyframes bbm-hint { to { transform: scale(1.14); filter: drop-shadow(0 0 10px #ffe27a); } }
.bbm-tile.is-flash img, .bbm-tile.is-flash .bbm-orb { filter: brightness(1.8) drop-shadow(0 0 12px #fff6c8); transform: scale(1.12); transition: transform .12s, filter .12s; }
.bbm-tile.is-pop { transition: none; }
.bbm-tile.is-pop img, .bbm-tile.is-pop .bbm-orb { animation: bbm-pop .21s ease-in forwards; }
.bbm-tile.is-pop::after { content:""; position:absolute; inset:10%; border-radius:999px; background: radial-gradient(circle, rgba(255,246,200,.95), rgba(255,210,90,0) 70%); animation: bbm-spark .25s ease-out forwards; }
@keyframes bbm-pop { to { transform: scale(0.1) rotate(25deg); opacity:0; } }
@keyframes bbm-spark { from { transform: scale(.3); opacity:1; } to { transform: scale(1.8); opacity:0; } }
.bbm-tile.is-light::before { content:""; position:absolute; inset:5%; border-radius:12px; box-shadow: 0 0 0 3px #f6cc4a, 0 0 12px 3px rgba(255,214,90,.75); animation: bbm-rim 1.2s ease-in-out infinite alternate; }
@keyframes bbm-rim { to { box-shadow: 0 0 0 3px #fff0a8, 0 0 18px 6px rgba(255,226,122,.95); } }
.bbm-light-badge { position:absolute; right:2%; top:2%; width:42% !important; height:42% !important; filter: drop-shadow(0 0 4px #fff3b0) !important; }
.bbm-orb { width:84%; height:84%; border-radius:999px; background: conic-gradient(from 0deg, #ff7a7a, #ffd36b, #8ef08a, #6ec8ff, #b08cff, #ff7ad1, #ff7a7a);
  box-shadow: inset 0 0 10px 4px rgba(255,255,255,.75), 0 0 14px 4px rgba(255,240,180,.8); animation: bbm-orb 2.4s linear infinite; position:relative; }
.bbm-orb::after { content:""; position:absolute; left:22%; top:16%; width:30%; height:24%; border-radius:999px; background: rgba(255,255,255,.85); filter: blur(1px); }
@keyframes bbm-orb { to { transform: rotate(360deg); } }
.bbm-beam { position:absolute; left:0; right:0; top: calc(var(--r) * var(--cell)); height: var(--cell); z-index:4; pointer-events:none;
  background: linear-gradient(90deg, rgba(255,250,220,0), rgba(255,246,190,.95) 35%, #fff 50%, rgba(255,246,190,.95) 65%, rgba(255,250,220,0)); transform-origin: center; animation: bbm-beam .32s ease-out both; }
@keyframes bbm-beam { from { transform: scaleX(0); opacity:.4; } to { transform: scaleX(1); opacity:1; } }
.bbm-dark { position:absolute; inset:0; z-index:5; pointer-events:none; background: rgba(2,6,20,.18); }
.bbm-grid:not(.is-reduced) .bbm-dark { transition: opacity 1s; }
.bbm-grid.is-reduced .bbm-tile { transition: none; }
.bbm-grid.is-reduced .bbm-tile.is-drop, .bbm-grid.is-reduced .bbm-tile.is-pop img, .bbm-grid.is-reduced .bbm-beam, .bbm-grid.is-reduced .bbm-orb, .bbm-grid.is-reduced .bbm-tile.is-light::before, .bbm-grid.is-reduced .bbm-tile.is-hint img { animation: none; }
.bbm-grid.is-reduced .bbm-tile.is-pop { opacity:.2; }
.bbm-toast { position:absolute; left:50%; top:50%; transform: translate(-50%,-50%); z-index:6; padding: 10px 18px; border-radius: 14px; font-weight:800; color:#4a2a10 !important; background: #fbeccb; box-shadow: 0 0 0 2px #c9934a, 0 8px 18px rgba(0,0,0,.4); }
.bbm-board-foot { width: var(--w); display:flex; align-items:center; justify-content:space-between; gap:10px; }
.bbm-mapbtn { display:inline-flex; align-items:center; gap:8px; padding: 10px 22px; border-radius: 16px; border:0; font-size: 20px; font-weight:800; color:#4a2a10 !important;
  background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 2px #c9934a, 0 6px 12px rgba(0,0,0,.35); cursor:pointer; }
.bbm-score { padding: 6px 14px; border-radius: 999px; font-weight:800; font-size: 15px; color:#fff3dc !important; background: rgba(40,20,6,.55); }
.bbm-hintbtn { width: 64px; height: 64px; border-radius:999px; border:0; padding: 8px; cursor:pointer; background: radial-gradient(circle at 45% 40%, #fff5c8, #f2b33a 60%, #b8741a);
  box-shadow: inset 0 0 0 3px #ffe08a, 0 0 18px 4px rgba(255,214,90,.6), 0 6px 12px rgba(0,0,0,.35); }
.bbm-hintbtn img { width:100%; height:100%; object-fit:contain; }
.bbm-panelwrap { position:fixed; inset:0; z-index:20; display:grid; place-items:center; padding: 16px; background: rgba(10,6,2,.55); animation: bbm-fade .25s ease-out both; }
@keyframes bbm-fade { from { opacity:0; } }
.bbm-panel { width: min(92vw, 400px); padding: 24px 22px 20px; border-radius: 26px; text-align:center; color:#4a2a10;
  background: linear-gradient(180deg,#fbeccb,#ecd29b); box-shadow: inset 0 0 0 4px #c9934a, inset 0 0 0 8px #fbeccb, inset 0 0 0 9px #b98634, 0 16px 30px rgba(0,0,0,.5); animation: bbm-panelin .35s cubic-bezier(.2,.9,.3,1.3) both; }
@keyframes bbm-panelin { from { transform: scale(.8); opacity:0; } }
.bbm-panel h2 { margin: 2px 0 6px; font-size: 30px; font-weight:900; color:#4a2a10 !important; }
.bbm-panel-kicker { font-size: 13px; font-weight:800; letter-spacing:.14em; text-transform:uppercase; opacity:.7; }
.bbm-panel-line { font-style: italic; font-size: 16px; }
.bbm-panel-score { margin-top: 8px; font-size: 16px; }
.bbm-panel-score b { font-size: 24px; }
.bbm-panel-link { display:inline-block; margin-top: 14px; font-weight:800; color:#1d5a34 !important; text-decoration: underline; text-underline-offset:3px; }
.bbm-panel-goals { list-style:none; padding:0; margin: 6px 0 4px; display:flex; justify-content:center; gap: 14px; font-weight:800; font-size: 18px; }
.bbm-panel-goals img { width: 34px; height: 34px; vertical-align: middle; }

/* the line you drag */
.bbm-linksvg { position:absolute; inset:0; width:100%; height:100%; z-index:6; pointer-events:none; overflow:visible; }
.bbm-link { fill:none; stroke:#fff6c8; stroke-width:.16; stroke-linecap:round; stroke-linejoin:round; }
.bbm-link-glow { fill:none; stroke: rgba(255,200,70,.65); stroke-width:.36; stroke-linecap:round; stroke-linejoin:round; filter: blur(.04px); }
.bbm-tile.is-linked { z-index:5; }
.bbm-tile.is-linked img, .bbm-tile.is-linked .bbm-orb { transform: scale(1.14); filter: drop-shadow(0 0 8px #ffe27a) brightness(1.12); transition: transform .1s; }
.bbm-tile.is-linked::after { content:""; position:absolute; inset:6%; border-radius:12px; box-shadow: 0 0 0 3px rgba(255,226,122,.95); }
.bbm-tile.is-dim img { opacity:.45; filter: grayscale(.4); transition: opacity .12s; }
.bbm-linkcount { position:absolute; z-index:7; left: calc((var(--c) + .5) * var(--cell)); top: calc(var(--r) * var(--cell) - 6px); transform: translate(-50%,-100%); pointer-events:none;
  min-width: 30px; padding: 2px 9px; border-radius:999px; text-align:center; font-weight:900; font-size:16px; color:#4a2a10 !important; background:#fbeccb; box-shadow: 0 0 0 2px #c9934a, 0 4px 8px rgba(0,0,0,.35); white-space:nowrap; }
.bbm-linkcount.is-ready { background:#ffe27a; }
.bbm-linkcount em { display:block; font-style:normal; font-size:11px; letter-spacing:.04em; }
/* ================= the production art (Drive "Production Art", 2026-11-22) ================= */
/* home: phone art on tall screens, desktop art on wide ones */
.bbm-home2-blur { background-image: url(/games/match/ui/home-desktop.webp); }
.bbm-home2-art.is-phone { height: min(100dvh, 216.67vw); aspect-ratio: 1080 / 2340; }
.bbm-home2-art.is-desktop { display:none; width: min(100vw, 177.78dvh); height:auto; aspect-ratio: 1920 / 1080; }
@media (min-aspect-ratio: 1/1) {
  .bbm-home2-art.is-phone { display:none; }
  .bbm-home2-art.is-desktop { display:block; }
}
.bbm-home2-label { background:none; font-family: Georgia, serif; }
.bbm-home2-art.is-phone .bbm-home2-label { font-size: min(5vw, 2.3dvh); }
.bbm-home2-art.is-phone .bbm-home2-label.is-long { font-size: min(3.9vw, 1.8dvh); }
.bbm-home2-art.is-desktop .bbm-home2-label.is-long { font-size: min(1.5vw, 2.7dvh) !important; }
.bbm-home2-art.is-desktop .bbm-home2-label { font-size: min(1.9vw, 3.4dvh); }

/* map: the painted trail, one column, blurred art either side on wide screens */
.bbm-map { background:#173a22; }
.bbm-map-blur { position:absolute; inset:-30px; background: url(/games/match/ui/map-desktop.webp) center / cover no-repeat; filter: blur(18px) brightness(.75); }
.bbm-map-scroll { position:relative; z-index:1; }
.bbm-map-world { height:auto; width: min(100vw, 560px); margin: 0 auto; aspect-ratio: 1080 / 4680; box-shadow: 0 0 40px rgba(0,0,0,.45); }
.bbm-map-art { display:block; width:100%; height:100%; user-select:none; -webkit-user-drag:none; }
.bbm-map .bbm-topbar { z-index:6; width: min(100vw, 560px); left:50%; right:auto; transform: translateX(-50%); }
.bbm-ribbon { width: 230px; height: 53px; padding: 0 0 6px; display:flex; align-items:center; justify-content:center; border-radius:0; box-shadow:none;
  background: url(/games/match/ui/genesis-ribbon.webp) center / 100% 100% no-repeat; font-size: 24px; letter-spacing:.02em; }
.bbm-medal-coin { width: 86px; height: 86px; border-radius:0; padding-bottom: 22%; box-sizing:border-box; font-size: 32px; box-shadow:none; filter: drop-shadow(0 8px 12px rgba(0,0,0,.45));
  background: url(/games/match/ui/level-coin-normal.webp) center / contain no-repeat; }
.bbm-medal-coin { position:relative; }
.bbm-medal.is-next .bbm-medal-coin { animation: bbm-pulse-coin 1.1s ease-in-out infinite; }
@keyframes bbm-pulse-coin { 0%,100% { transform: scale(1); filter: drop-shadow(0 8px 12px rgba(0,0,0,.45)) drop-shadow(0 0 0 rgba(255,220,120,0)); } 50% { transform: scale(1.1); filter: drop-shadow(0 8px 12px rgba(0,0,0,.45)) drop-shadow(0 0 18px rgba(255,220,120,.95)); } }
.bbm-playme { position:absolute; left:50%; bottom: calc(100% - 4px); transform: translateX(-50%); padding: 5px 12px; border-radius: 999px; white-space:nowrap; font-weight:900; font-size:15px;
  color:#fff7dd !important; background: linear-gradient(180deg,#3d9a4b,#1d6a2e); box-shadow: 0 0 0 2px #f0c75e, 0 6px 12px rgba(0,0,0,.35); animation: bbm-bob 1.1s ease-in-out infinite; }
.bbm-playme::after { content:""; position:absolute; left:50%; top:100%; transform: translateX(-50%); border: 7px solid transparent; border-top-color:#1d6a2e; }
.bbm-medal-photo { position:absolute; left:50%; top:42%; width:54%; aspect-ratio:1; transform: translate(-50%,-50%); border-radius:999px; overflow:hidden; background:#fff; box-shadow: 0 0 0 2px #f6cc6a, inset 0 0 6px rgba(0,0,0,.4); display:grid; place-items:center; font-size:24px; }
.bbm-medal-photo img { width:100%; height:100%; object-fit:cover; object-position: 50% 30%; display:block; }
.bbm-medal-coin.is-done { background-image: url(/games/match/ui/level-coin-completed.webp); }
.bbm-medal-coin.is-locked { background-image: url(/games/match/ui/level-coin-locked.webp); filter: drop-shadow(0 8px 12px rgba(0,0,0,.45)); }
.bbm-medal.is-locked .bbm-medal-coin { filter: drop-shadow(0 8px 12px rgba(0,0,0,.45)); }
.bbm-medal-name { min-width: 150px; padding: 8px 18px 9px; border-radius:0; box-shadow:none; filter: drop-shadow(0 4px 8px rgba(0,0,0,.35));
  background: url(/games/match/ui/level-name-plaque.webp) center / 100% 100% no-repeat; }
.bbm-medal.is-arrived .bbm-medal-coin { animation: bbm-glow2 1.2s ease-in-out infinite alternate; }
@keyframes bbm-glow2 { from { filter: drop-shadow(0 0 0 rgba(255,220,120,0)); } to { filter: drop-shadow(0 0 22px rgba(255,220,120,.95)); } }

/* board */
.bbm-board[data-level="creation"] .bbm-board-bg { background-image: url(/games/match/ui/creation-phone.webp); }
.bbm-board[data-level="eden"] .bbm-board-bg { background-image: url(/games/match/ui/eden-phone.webp); }
@media (min-aspect-ratio: 1/1) {
  .bbm-board[data-level="creation"] .bbm-board-bg { background-image: url(/games/match/ui/creation-desktop.webp); }
  .bbm-board[data-level="eden"] .bbm-board-bg { background-image: url(/games/match/ui/eden-desktop.webp); }
}
.bbm-board-title { box-shadow:none; border-radius:0; padding: 0 20%; aspect-ratio: 1000 / 280; width: calc(var(--w) * .82) !important; display:flex; flex-direction:column; align-items:center; justify-content:center; box-sizing:border-box;
  background: url(/games/match/ui/board-title-plaque.webp) center / 100% 100% no-repeat; width: calc(var(--w) * .86); }
.bbm-board-title h1 { color:#4a2a10 !important; text-shadow: 0 1px 0 rgba(255,240,200,.6); white-space:nowrap; font-size: clamp(22px, calc(var(--w) * .075), 40px) !important; }
.bbm-board-title p { white-space:nowrap; font-size: clamp(11px, calc(var(--w) * .03), 16px) !important; }
.bbm-hud { box-shadow:none; border-radius:0; aspect-ratio: 1200 / 220; padding: 0 13%; justify-content:center; background: url(/games/match/ui/goal-bar.webp) center / 100% 100% no-repeat; }
.bbm-hud-sep { background: rgba(160,110,40,.55); margin: 14% 0; }
/* A thin gold rim, one piece with the board (Louis: the heavy frame looked separate). */
.bbm-gridframe { padding: 5px; border-radius: 16px; background: linear-gradient(160deg, #ffe9a6, #d9a23a 40%, #f6d27a 60%, #b07a20); box-shadow: 0 10px 22px rgba(0,0,0,.45), inset 0 0 0 1px rgba(255,255,255,.5); }
.bbm-board { --size: min(100vw - 34px, 100dvh - 285px, 560px); --w: calc(var(--size) + 10px); }
.bbm-grid { border-radius: 12px; background: #13214a; }
/* 7 across, 9 down (Louis, 2026-11-22: fill the screen). --size is the width; a cell fits both ways. */
.bbm-board { --cellw: min((100vw - 34px) / 7, (100dvh - 270px) / 9, 64px); --size: calc(var(--cellw) * 7); }
.bbm-grid { --cell: var(--cellw); width: calc(var(--cellw) * 7); height: calc(var(--cellw) * 9); }
.bbm-board-title { padding: 0 calc(var(--w) * .13) !important; }
.bbm-board-title.is-long h1 { font-size: clamp(18px, calc(var(--w) * .058), 32px) !important; }
/* Inside the phone app a light strip sits behind the clock for ordinary
   pages; on the dark game it showed as a bar over the top (Louis,
   2026-11-22). The game pays for the status bar itself. */
html.bb-native.bb-game-screen body { padding-top: 0 !important; }
html.bb-native.bb-game-screen body::before { display:none !important; }
.bbm-board[data-level="eden"] .bbm-grid { background: #0f2a17; }
.bbm-socket::before { background: #1e2f60; border-radius: 12%; box-shadow: inset 0 2px 6px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.05); }
.bbm-board[data-level="eden"] .bbm-socket::before { background: #234f2a; }
.bbm-mapbtn { width: calc(var(--w) * .34); aspect-ratio: 500 / 170; padding:0; border-radius:0; box-shadow:none; font-size:0; color: transparent !important; filter: drop-shadow(0 6px 10px rgba(0,0,0,.35));
  background: url(/games/match/ui/map-button.webp) center / 100% 100% no-repeat; }
.bbm-mapbtn span { display:none; }
.bbm-hintbtn { width: calc(var(--w) * .18); height:auto; aspect-ratio:1; padding:0; border-radius:0; box-shadow:none; filter: drop-shadow(0 6px 12px rgba(0,0,0,.4));
  background: url(/games/match/ui/hint-button.webp) center / 100% 100% no-repeat; }
.bbm-hintbtn img { display:none; }
.bbm-panel { --pw: min(90vw, 420px, calc((100dvh - 32px) * 900 / 1100)); aspect-ratio: 900 / 1100; width: var(--pw); box-sizing:border-box; padding: calc(var(--pw) * .2) calc(var(--pw) * .15) calc(var(--pw) * .15); font-size: calc(var(--pw) * .04); border-radius:0; box-shadow:none; display:flex; flex-direction:column; justify-content:center;
  background: url(/games/match/ui/result-panel.webp) center / 100% 100% no-repeat; filter: drop-shadow(0 16px 30px rgba(0,0,0,.5)); }
.bbm-btn-green, .bbm-btn-cream { border-radius:0; box-shadow:none; aspect-ratio: 700 / 180; padding:0; display:flex; align-items:center; justify-content:center; font-size: 19px; }
.bbm-btn-green { background: url(/games/match/ui/button-green.webp) center / 100% 100% no-repeat; }
.bbm-btn-cream { background: url(/games/match/ui/button-cream.webp) center / 100% 100% no-repeat; }

/* The win/lose scroll: every size from the scroll's own width, never a percentage (Louis, 2026-11-22: text squeezed to one word a line). */
.bbm-panel h2 { font-size: calc(var(--pw) * .075) !important; line-height:1.1; margin: 2px 0 4px; }
.bbm-panel-kicker { font-size: calc(var(--pw) * .032); margin:0; }
.bbm-panel-line { font-size: calc(var(--pw) * .04); margin: 4px 0 0; }
.bbm-panel-score { font-size: calc(var(--pw) * .04); margin: 6px 0 0; }
.bbm-panel-score b { font-size: calc(var(--pw) * .06); }
.bbm-panel .bbm-btn-green { margin-top: calc(var(--pw) * .035); font-size: calc(var(--pw) * .048); }
.bbm-panel .bbm-btn-cream { margin-top: calc(var(--pw) * .02); font-size: calc(var(--pw) * .042); }
.bbm-panel .bbm-btn-green, .bbm-panel .bbm-btn-cream { width: 88%; margin-left:auto; margin-right:auto; }
.bbm-panel-link { margin-top: calc(var(--pw) * .025); font-size: calc(var(--pw) * .036); }
@media (prefers-reduced-motion: reduce) {
  .bbm-home-buddy, .bbm-marker.is-walking, .bbm-medal.is-arrived .bbm-medal-coin, .bbm-hud-count.is-low { animation: none !important; }
}

/* goal bar fit (Louis, 2026-11-22): every goal readable, nothing overlapping */
.bbm-hud { width: calc(var(--w) * 1.16) !important; max-width: 98vw; padding: 0 calc(var(--w) * .19) !important; gap: 10px !important; box-sizing: border-box; }
.bbm-hud-goals { flex: 1 1 auto; min-width: 0; }
.bbm-hud-goalrow { justify-content: space-evenly !important; gap: 4px !important; }
.bbm-goal { gap: 1px !important; font-size: clamp(13px, calc(var(--w) * .036), 20px) !important; white-space: nowrap; }
.bbm-goal img { width: clamp(22px, calc(var(--w) * .058), 34px) !important; height: clamp(22px, calc(var(--w) * .058), 34px) !important; }
.bbm-hud-count { font-size: clamp(18px, calc(var(--w) * .05), 26px) !important; min-width: 0 !important; padding: 0 10px !important; }
.bbm-hud-label { font-size: clamp(10px, calc(var(--w) * .026), 14px) !important; }
.bbm-board { padding-top: calc(16px + env(safe-area-inset-top)) !important; }
/* In the iPhone app the Back and settings buttons sat up in the clock and
   battery (Louis, 2026-11-22): the inset the phone reports can come back 0
   there. Every notched or island iPhone needs at least ~50px, so that is the
   floor. The website and Android keep the reported inset. */
.bbm-board-title.is-xlong h1 { font-size: clamp(15px, calc(var(--w) * .045), 26px) !important; }
/* ---- the story screen after a win (WinStory): one picture, popping in and playing out ---- */
.bbm-story { position:fixed; inset:0; z-index:40; display:grid; place-items:center; background:#120c06; overflow:hidden; animation: bbm-story-bg .35s ease-out both; }
@keyframes bbm-story-bg { from { background-color: rgba(18,12,6,0); } }
.bbm-story-blur { position:absolute; inset:-40px; background-size:cover; background-position:center; filter: blur(24px) brightness(.7); animation: bbm-story-fade .4s ease-out both; }
@keyframes bbm-story-fade { from { opacity:0; } }
/* The picture fills the phone (a little trimmed at the edges if the phone is wider or taller), whole on a computer. */
.bbm-story-art { position:relative; height: max(100dvh, 217.3vw); aspect-ratio: 851 / 1849; animation: bbm-story-pop .55s cubic-bezier(.2,.9,.3,1.15) both; }
@media (min-aspect-ratio: 3/5) { .bbm-story-art { height: 100dvh; } }
@keyframes bbm-story-pop { from { opacity:0; transform: scale(.88); } }
.bbm-story-art > img { position:absolute; inset:0; width:100%; height:100%; display:block; user-select:none; -webkit-user-drag:none; }
/* Tapping the button: the whole screen plays out, then the map. */
.bbm-story.is-leaving { animation: bbm-story-out .42s ease-in forwards; }
.bbm-story.is-leaving .bbm-story-art { animation: bbm-story-zoom .42s ease-in forwards; }
@keyframes bbm-story-out { to { opacity:0; } }
@keyframes bbm-story-zoom { from { transform:none; } to { transform: scale(1.08); } }
/* The tap spot over the painted green button. */
.bbm-story-go { position:absolute; left:10%; right:10%; top:80%; height:9.5%; border:0; padding:0; background:transparent; border-radius:999px; cursor:pointer; }
.bbm-story-go:active { background: rgba(255,255,255,.15); }
@media (prefers-reduced-motion: reduce) { .bbm-story, .bbm-story-art, .bbm-story-blur { animation:none !important; } }
/* ---- power-ups (Louis, 2026-11-22: "real power-ups, like Candy Crush") ---- */
/* Pillar of Fire: a column of light top to bottom. */
.bbm-beam.is-col { left: calc(var(--c) * var(--cell)); right:auto; top:0; bottom:0; width: var(--cell); height:auto;
  background: linear-gradient(180deg, rgba(255,200,120,0), rgba(255,170,80,.95) 30%, #fff4d0 50%, rgba(255,170,80,.95) 70%, rgba(255,200,120,0)); animation-name: bbm-beam-col; }
@keyframes bbm-beam-col { from { transform: scaleY(0); opacity:.4; } to { transform: scaleY(1); opacity:1; } }
/* Trumpet Blast: a ring bursting out over the 3x3. */
.bbm-blast { position:absolute; z-index:5; pointer-events:none; left: calc((var(--c) - 1) * var(--cell)); top: calc((var(--r) - 1) * var(--cell)); width: calc(3 * var(--cell)); height: calc(3 * var(--cell)); border-radius:999px;
  background: radial-gradient(circle, rgba(255,255,255,.95) 0%, rgba(255,220,120,.85) 35%, rgba(255,160,60,.35) 60%, transparent 70%); animation: bbm-blast .45s ease-out both; }
@keyframes bbm-blast { from { transform: scale(.2); opacity:1; } to { transform: scale(1.25); opacity:.15; } }
/* All Match orb: a ray from the orb to every tile it takes. */
.bbm-rays { position:absolute; inset:0; width:100%; height:100%; z-index:6; pointer-events:none; overflow:visible; }
.bbm-rays line { stroke: #fff6c8; stroke-width: .09; stroke-linecap: round; filter: drop-shadow(0 0 .12px #ffd36b); stroke-dasharray: 12; stroke-dashoffset: 12; animation: bbm-ray .28s ease-out forwards; }
@keyframes bbm-ray { to { stroke-dashoffset: 0; } }
/* The badges on power-up tiles: a flame for a pillar, a trumpet for a blast. */
.bbm-power-badge { position:absolute; right:0; top:0; width:46%; height:46%; display:grid; place-items:center; font-size: calc(var(--cell) * .3); line-height:1; filter: drop-shadow(0 0 4px rgba(255,220,120,.9)); }
.bbm-tile.is-pillar::before { box-shadow: 0 0 0 3px #ff9a3c, 0 0 14px 4px rgba(255,140,60,.75) !important; }
.bbm-tile.is-blast::before { box-shadow: 0 0 0 3px #b98cff, 0 0 14px 4px rgba(170,120,255,.7) !important; }
/* The hint: the two tiles to swap bob and glow. */
.bbm-tile.is-hint::after { content:""; position:absolute; inset:4%; border-radius:12px; box-shadow: 0 0 0 3px rgba(255,255,255,.95), 0 0 16px 4px rgba(255,236,150,.85); animation: bbm-hint-ring .7s ease-in-out infinite alternate; pointer-events:none; }
@keyframes bbm-hint-ring { from { opacity:.35; } to { opacity:1; } }
.bbm-grid.is-reduced .bbm-blast, .bbm-grid.is-reduced .bbm-rays line, .bbm-grid.is-reduced .bbm-tile.is-hint::after { animation: none; }
/* The whole board marker on the map opens it: coin, name, anywhere (Louis: "clicking a level is always an issue"). */
.bbm-medal { padding: 8px 12px !important; }
.bbm-medal > * { pointer-events:none; }
/* A locked board: its number, greyed, with a padlock on the coin. */
.bbm-medal.is-locked .bbm-medal-coin { color: #e9e1d2 !important; }
.bbm-medal-lock { position:absolute; right: -4px; bottom: 14%; font-size: 22px; line-height:1; filter: drop-shadow(0 2px 3px rgba(0,0,0,.5)); }
.bbm-medal.is-locked .bbm-medal-name { opacity:.75; }
/* Bible Buddies standing at the board they have reached: faces to the right of the coin. */
.bbm-buddies { position:absolute; left: calc(100% - 6px); top: 4px; display:flex; align-items:center; pointer-events:none; white-space:nowrap; }
.bbm-buddy { width: 34px; height: 34px; margin-left: -8px; border-radius:999px; overflow:hidden; display:grid; place-items:center; background:#fbeccb; color:#4a2a10 !important; font-weight:900; font-size:14px;
  box-shadow: 0 0 0 2.5px #fff, 0 0 0 4px #e0a93a, 0 4px 8px rgba(0,0,0,.4); }
.bbm-buddy:first-child { margin-left:0; }
.bbm-buddy img { width:100%; height:100%; object-fit:cover; }
.bbm-buddy.is-more { font-size:11px; }
.bbm-buddy-name { margin-left:6px; padding: 2px 8px; border-radius:999px; background: rgba(40,24,8,.72); color:#fff3d2 !important; font-size:12px; font-weight:800; }
/* The map sections: stacked, each over the one below, its bottom fading into it. */
.bbm-map-section { position:absolute; left:0; width:100%; object-fit:fill; background-size:100% 100%; background-repeat:no-repeat; }
.bbm-map-section.is-blended { -webkit-mask-image: linear-gradient(180deg, #000 calc(100% - 6%), transparent 100%); mask-image: linear-gradient(180deg, #000 calc(100% - 6%), transparent 100%); }
.bbm-map-trail { z-index: 30; }
.bbm-medal { z-index: 40; }
.bbm-marker { z-index: 70 !important; }
/* Up to 12 boards a map (Louis, 2026-11-22): smaller coins and names so neighbours do not cover each other. */
.bbm-map .bbm-medal-coin { width: 70px !important; height: 70px !important; font-size: 26px !important; }
.bbm-map .bbm-medal-name { min-width: 0 !important; padding: 5px 14px 6px !important; font-size: 13.5px !important; white-space: nowrap; }
.bbm-map .bbm-playme { z-index: 5; }
/* ---- the living map (MapFx): water, sea, storm, snow, fireflies ---- */
.bbm-fx { position:absolute; left:0; right:0; z-index:20; pointer-events:none; overflow:hidden; }
.bbm-fx > span { position:absolute; display:block; pointer-events:none; }
/* Falling water: bright streaks sliding down, soft at the edges. */
.bbm-fx-fall { background: repeating-linear-gradient(180deg, rgba(255,255,255,0) 0 9px, rgba(235,250,255,.7) 9px 13px, rgba(255,255,255,0) 13px 24px);
  background-size: 100% 48px; animation: bbm-fall .55s linear infinite; mix-blend-mode: screen; opacity:.75;
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%); mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 55%, transparent 100%); }
.bbm-fx-fall.is-small { background-size: 100% 30px; animation-duration: .45s; opacity:.6; }
@keyframes bbm-fall { from { background-position: 0 0; } to { background-position: 0 48px; } }
/* The stream and the sea: a light band drifting across the water. */
.bbm-fx-shimmer, .bbm-fx-sea { background: linear-gradient(100deg, transparent 0 35%, rgba(255,255,255,.35) 45%, transparent 55% 100%); background-size: 250% 100%;
  mix-blend-mode: screen; animation: bbm-shimmer 4.5s ease-in-out infinite;
  -webkit-mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%); mask-image: radial-gradient(ellipse 50% 50% at 50% 50%, #000 40%, transparent 100%); }
.bbm-fx-sea { animation-duration: 6s; background: linear-gradient(95deg, transparent 0 30%, rgba(255,240,210,.32) 42%, rgba(255,255,255,.4) 48%, transparent 60% 100%); background-size: 220% 100%; }
@keyframes bbm-shimmer { from { background-position: 120% 0; } to { background-position: -20% 0; } }
/* Rain from the storm clouds, and now and then a lightning flash. */
.bbm-fx-rain { background: repeating-linear-gradient(105deg, transparent 0 14px, rgba(210,225,255,.55) 14px 15px, transparent 15px 28px); background-size: 56px 56px;
  animation: bbm-rain .35s linear infinite; opacity:.7;
  -webkit-mask-image: linear-gradient(180deg, transparent, #000 25%, #000 70%, transparent); mask-image: linear-gradient(180deg, transparent, #000 25%, #000 70%, transparent); }
@keyframes bbm-rain { from { background-position: 0 0; } to { background-position: -15px 56px; } }
.bbm-fx-bolt { background: radial-gradient(ellipse 45% 55% at 55% 40%, rgba(255,255,255,.95), rgba(200,220,255,.5) 40%, transparent 70%); mix-blend-mode: screen; opacity:0; animation: bbm-bolt 7s linear infinite; }
@keyframes bbm-bolt { 0%, 88%, 100% { opacity:0; } 89% { opacity:.9; } 90% { opacity:.15; } 91% { opacity:.75; } 93% { opacity:0; } }
/* Snow over the whole stretch. */
.bbm-fx-snow { inset:0; background-image:
    radial-gradient(2.5px 2.5px at 10% 20%, #fff 60%, transparent), radial-gradient(2px 2px at 30% 60%, #fff 60%, transparent),
    radial-gradient(3px 3px at 55% 35%, #fff 60%, transparent), radial-gradient(2px 2px at 75% 75%, #fff 60%, transparent),
    radial-gradient(2.5px 2.5px at 90% 15%, #fff 60%, transparent), radial-gradient(2px 2px at 45% 90%, #fff 60%, transparent);
  background-size: 160px 220px; animation: bbm-snow 9s linear infinite; opacity:.85; }
@keyframes bbm-snow { from { background-position: 0 0; } to { background-position: 40px 220px; } }
/* Fireflies: warm dots drifting and blinking. */
.bbm-fx-flies { inset:0; background-image:
    radial-gradient(3px 3px at 15% 30%, #fff3a0, rgba(255,220,90,.6) 50%, transparent), radial-gradient(3px 3px at 62% 18%, #fff3a0, rgba(255,220,90,.6) 50%, transparent),
    radial-gradient(2.5px 2.5px at 40% 70%, #fff3a0, rgba(255,220,90,.6) 50%, transparent), radial-gradient(3px 3px at 85% 55%, #fff3a0, rgba(255,220,90,.6) 50%, transparent);
  background-size: 190px 240px; animation: bbm-flies 7s ease-in-out infinite alternate, bbm-blink 2.2s ease-in-out infinite alternate; }
@keyframes bbm-flies { from { background-position: 0 0; } to { background-position: 30px -40px; } }
@keyframes bbm-blink { from { opacity:.35; } to { opacity:1; } }
@media (prefers-reduced-motion: reduce) { .bbm-fx > span { animation: none !important; } .bbm-fx-bolt { display:none; } }
/* Boards from the Drive board folders bring their own phone and desktop art. */
.bbm-board.has-art .bbm-board-bg { background-image: var(--bg-phone); background-color:#1a1410; }
@media (min-aspect-ratio: 1/1) { .bbm-board.has-art .bbm-board-bg { background-image: var(--bg-desktop); } }
/* The home picture has Back and settings drawn into it near the top: it keeps
   its full size (Louis: shrinking it to fit looked "messed up and shrunken")
   and moves down below the clock; the flowers at its bottom edge get trimmed. */
.bbm-home2 { --safe-top: env(safe-area-inset-top); overflow:hidden; }
html.bb-native.bb-ios .bbm-home2 { --safe-top: max(env(safe-area-inset-top), 50px); }
.bbm-home2-art.is-phone { transform: translateY(calc(var(--safe-top) / 2)); }
@media (max-aspect-ratio: 1/1) {
  .bbm-home2 { place-items: start center; }
  /* The full width of the phone, right up under the clock; a short screen trims the bottom. */
  /* Exactly the phone's width, never wider (Louis: a grey bar showed when it came out a hair wider). */
  .bbm-home2-art.is-phone { transform:none !important; width:100vw !important; height: max(100dvh, 216.67vw) !important; max-width:100vw !important; aspect-ratio:auto !important; }
  .bbm-home2-art.is-phone > img { object-fit:cover; object-position: top center; }
  .bbm-home2 { overflow:hidden; width:100vw; }
  .bbm-home2-art.is-phone .bbm-hot:not(.is-play) { display:none; }
  .bbm-home2-top { display:flex !important; }
}
/* Real Back and Settings below the clock, on the phone picture (its painted ones were removed). */
.bbm-home2-top { display:none; position:fixed; z-index:6; left:14px; right:14px; top: calc(10px + var(--safe-top)); justify-content:space-between; pointer-events:none; }
.bbm-home2-top > * { pointer-events:auto; }
html.bb-native.bb-ios .bbm-topbar { padding-top: calc(10px + max(env(safe-area-inset-top), 50px)) !important; }
html.bb-native.bb-ios .bbm-board { padding-top: calc(12px + max(env(safe-area-inset-top), 50px)) !important; --cellw: min((100vw - 34px) / 7, (100dvh - 320px) / 9, 64px); }

/* Tiles break apart when cleared (Louis, 2026-11-22) */
.bbm-shard { position:absolute; inset: calc(var(--cell) * 0.05); pointer-events:none; z-index:7; }
.bbm-shard img { width:100%; height:100%; object-fit:contain; }
.bbm-shard.s0 { clip-path: polygon(0 0, 55% 0, 45% 50%, 0 60%); --tx: -60%; --ty: -70%; --rot: -40deg; }
.bbm-shard.s1 { clip-path: polygon(55% 0, 100% 0, 100% 55%, 45% 50%); --tx: 65%; --ty: -60%; --rot: 35deg; }
.bbm-shard.s2 { clip-path: polygon(0 60%, 45% 50%, 50% 100%, 0 100%); --tx: -55%; --ty: 75%; --rot: 30deg; }
.bbm-shard.s3 { clip-path: polygon(45% 50%, 100% 55%, 100% 100%, 50% 100%); --tx: 60%; --ty: 70%; --rot: -35deg; }
.bbm-tile.is-pop .bbm-shard { animation: bbm-shatter .42s cubic-bezier(.2,.7,.4,1) forwards; }
@keyframes bbm-shatter { 0% { transform: none; opacity:1; } 25% { opacity:1; } 100% { transform: translate(var(--tx), var(--ty)) rotate(var(--rot)) scale(.55); opacity:0; } }
.bbm-tile.is-pop > img, .bbm-tile.is-pop > .bbm-orb { animation: none !important; opacity: 0; }
.bbm-spark { position:absolute; left:50%; top:50%; width: 6px; height: 6px; margin:-3px; border-radius:999px; background:#fff4b8; box-shadow: 0 0 8px 2px rgba(255,214,90,.9); pointer-events:none; z-index:8;
  animation: bbm-spark-fly .45s ease-out forwards; }
@keyframes bbm-spark-fly { from { transform: translate(0,0) scale(1); opacity:1; } to { transform: translate(var(--sx), var(--sy)) scale(.2); opacity:0; } }
.bbm-grid.is-reduced .bbm-shard, .bbm-grid.is-reduced .bbm-spark { display:none; }
/* Board numbers on the map coins: in front, bold, with a dark outline and a
   drop shadow so they read over the coin art and the padlock (Louis,
   2026-11-23: "the numbers on top of the boards are hard to read"). */
.bbm-medal-num { position:relative; z-index:2; font-size: 34px; font-weight: 900; line-height: 1; color:#fff8e1 !important;
  -webkit-text-stroke: 1.5px #3a1d06; paint-order: stroke fill;
  text-shadow: 0 2px 0 #3a1d06, 0 0 2px #3a1d06, 0 3px 8px rgba(0,0,0,.85); }
.bbm-medal.is-locked .bbm-medal-num { font-size: 30px; }
/* The board's bottom buttons: Back (to the map) on the cream plank, Settings as a gold gear. */
.bbm-backbtn { width: calc(var(--w) * .34); aspect-ratio: 500 / 170; display:inline-flex; align-items:center; justify-content:center; gap:6px; padding:0 0 4px; border:0; cursor:pointer;
  font-size: calc(var(--w) * .055); font-weight:900; color:#4a2a10 !important; filter: drop-shadow(0 6px 10px rgba(0,0,0,.35));
  background: url(/games/match/ui/button-cream.webp) center / 100% 100% no-repeat; }
.bbm-backbtn span { font-size: 1.15em; line-height:1; }
.bbm-gearbtn { width: calc(var(--w) * .16); aspect-ratio:1; border-radius:999px; border:0; padding:0; cursor:pointer; display:grid; place-items:center;
  font-size: calc(var(--w) * .095); line-height:1; color:#5a3208 !important;
  background: radial-gradient(circle at 45% 40%, #fff5c8, #f2b33a 60%, #b8741a);
  box-shadow: inset 0 0 0 3px #ffe08a, 0 0 14px 3px rgba(255,214,90,.5), 0 6px 12px rgba(0,0,0,.35); }
.bbm-gearbtn span { transform: translateY(-1px); text-shadow: 0 1px 0 #ffe9a8; }
/* The goals without the word "Goal": the pictures and counts take its room and
   are bigger (Louis, 2026-11-23: "remove the word Goal, make the items bigger"). */
.bbm-hud-goalrow { margin-top: 0 !important; }
.bbm-goal { gap: 2px !important; font-size: clamp(16px, calc(var(--w) * .05), 24px) !important; }
.bbm-goal img { width: clamp(32px, calc(var(--w) * .095), 48px) !important; height: clamp(32px, calc(var(--w) * .095), 48px) !important; filter: drop-shadow(0 2px 2px rgba(0,0,0,.25)); }
/* Long book names (Leviticus, Deuteronomy) get a wider ribbon and smaller type so the word fits. */
.bbm-ribbon.is-long { width: 270px; font-size: 20px; letter-spacing: 0; }
`;
