"use client";

import { useRouter } from "next/navigation";
import { ModalShell } from "./ModalShell";

interface GlobalUpdateModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export function GlobalUpdateModal({ isOpen, onDismiss }: GlobalUpdateModalProps) {
  const router = useRouter();

  function handleExplore() {
    onDismiss();
    router.push("/bb-feed");
  }

  function handleNotNow() {
    onDismiss();
  }

  return (
    <>
      <style>{`
        @keyframes modalEntrance {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0); }
        }
        @keyframes badgePulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.35); }
          50%       { box-shadow: 0 0 0 8px rgba(99,102,241,0); }
        }
        @keyframes feedCardSlide {
          from { opacity: 0; transform: translateX(-14px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes floatDot {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-5px); }
        }
        @keyframes shimmerBtn {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .update-modal-enter {
          animation: modalEntrance 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        .feed-badge {
          animation: badgePulse 2s ease-in-out infinite;
        }
        .feed-card-1 { animation: feedCardSlide 0.4s 0.15s ease-out both; }
        .feed-card-2 { animation: feedCardSlide 0.4s 0.3s  ease-out both; }
        .feed-card-3 { animation: feedCardSlide 0.4s 0.45s ease-out both; }
        .float-dot   { animation: floatDot 2.4s ease-in-out infinite; }
        .btn-shimmer {
          background: linear-gradient(90deg, #2563eb 0%, #4f8ef7 40%, #2563eb 60%, #2563eb 100%);
          background-size: 300% auto;
          animation: shimmerBtn 2.8s linear infinite;
        }
      `}</style>

      <ModalShell isOpen={isOpen} onClose={onDismiss} zIndex="z-[200]" backdropColor="bg-black/70">
        <div
          className="update-modal-enter relative w-full max-w-xs rounded-[28px] bg-white shadow-2xl shadow-black/30 ring-1 ring-black/10 p-1.5"
          role="dialog"
          aria-modal="true"
          aria-label="Version 4.0 Update"
        >
          <div className="rounded-3xl bg-gradient-to-b from-indigo-50 to-blue-50/60 px-4 py-5 overflow-hidden">

            {/* Version badge */}
            <div className="flex justify-center mb-3">
              <span className="feed-badge inline-flex items-center gap-1 bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full tracking-widest uppercase">
                <span className="float-dot inline-block">✦</span> v4.0 — What&apos;s New
              </span>
            </div>

            {/* Mini feed preview */}
            <div className="rounded-xl bg-white border border-gray-100 shadow-sm px-3 py-2 mb-4 space-y-2">

              {/* Mock post 1 */}
              <div className="feed-card-1 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-indigo-400 flex-shrink-0 flex items-center justify-center text-white text-[9px] font-bold">SK</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-800 truncate">Sarah K. · <span className="font-normal text-gray-500">"John 3:16 hit different today 🙌"</span></p>
                  <span className="text-[9px] text-gray-400">❤️ 14 · 💬 3</span>
                </div>
              </div>

              <div className="border-t border-gray-50" />

              {/* Mock post 2 */}
              <div className="feed-card-2 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-400 flex-shrink-0 flex items-center justify-center text-white text-[9px] font-bold">MT</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-800 truncate">Marcus T. · <span className="font-normal text-gray-500">Praying for everyone studying Psalms 🙏</span></p>
                  <span className="text-[9px] text-gray-400">🙏 22 · 💬 7</span>
                </div>
              </div>

              <div className="border-t border-gray-50" />

              {/* Mock post 3 */}
              <div className="feed-card-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-rose-400 flex-shrink-0 flex items-center justify-center text-white text-[9px] font-bold">AR</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-semibold text-gray-800 truncate">Aaliyah R. · <span className="font-normal text-gray-500">Started Genesis today — feeling ready 📖</span></p>
                  <span className="text-[9px] text-gray-400">🔥 9 · 💬 2</span>
                </div>
              </div>

            </div>

            {/* Headline */}
            <h2 className="text-xl font-extrabold text-gray-900 text-center leading-tight mb-1.5">
              Bible Buddy Feed<br />
              <span className="text-indigo-600">is here.</span>
            </h2>

            {/* Sub-copy */}
            <p className="text-xs text-gray-500 text-center leading-relaxed mb-3.5 px-1">
              Your faith community, all in one place. Connect, share verses, post prayers, and encourage one another in the Word.
            </p>

            {/* Feature list */}
            <ul className="space-y-1.5 mb-4 px-0.5">
              {[
                { icon: "🤝", text: "Connect with Bible Buddies" },
                { icon: "📖", text: "Share verses, thoughts & reflections" },
                { icon: "🙏", text: "Post and receive prayer" },
                { icon: "🌍", text: "See what your community is studying" },
              ].map(({ icon, text }) => (
                <li key={text} className="flex items-center gap-2 text-xs text-gray-700">
                  <span className="flex-shrink-0">{icon}</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={handleExplore}
                className="btn-shimmer w-full px-4 py-3 rounded-2xl text-white font-bold text-sm shadow-md hover:opacity-90 transition-opacity"
              >
                Go to Bible Buddy Feed →
              </button>
              <button
                type="button"
                onClick={handleNotNow}
                className="w-full px-4 py-2.5 rounded-2xl bg-gray-100 text-gray-500 font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                Maybe Later
              </button>
            </div>

          </div>
        </div>
      </ModalShell>
    </>
  );
}
