"use client";

import { useEffect } from "react";

const AVATAR_COLORS = ["#4a9b6f", "#5b8dd9", "#c97b3e", "#9b6bb5", "#d45f7a", "#3ea8a8"];
function avatarColor(uid: string): string {
  let hash = 0;
  for (let i = 0; i < uid.length; i++) hash = uid.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

// Predefined confetti pieces (stable, no Math.random in render)
const CONFETTI = [
  { left: 4,  color: "#4a9b6f", delay: 0.0, size: 10, rotate: 45  },
  { left: 10, color: "#5b8dd9", delay: 0.2, size: 8,  rotate: 20  },
  { left: 17, color: "#d45f7a", delay: 0.1, size: 12, rotate: 60  },
  { left: 24, color: "#c97b3e", delay: 0.4, size: 8,  rotate: 10  },
  { left: 31, color: "#9b6bb5", delay: 0.0, size: 10, rotate: 80  },
  { left: 38, color: "#4a9b6f", delay: 0.3, size: 12, rotate: 30  },
  { left: 45, color: "#3ea8a8", delay: 0.1, size: 8,  rotate: 55  },
  { left: 52, color: "#d45f7a", delay: 0.5, size: 10, rotate: 15  },
  { left: 59, color: "#c97b3e", delay: 0.2, size: 12, rotate: 70  },
  { left: 66, color: "#9b6bb5", delay: 0.0, size: 8,  rotate: 40  },
  { left: 73, color: "#4a9b6f", delay: 0.4, size: 10, rotate: 25  },
  { left: 80, color: "#5b8dd9", delay: 0.1, size: 12, rotate: 65  },
  { left: 87, color: "#d45f7a", delay: 0.3, size: 8,  rotate: 50  },
  { left: 93, color: "#3ea8a8", delay: 0.6, size: 10, rotate: 35  },
  { left: 7,  color: "#9b6bb5", delay: 0.5, size: 8,  rotate: 85  },
  { left: 20, color: "#3ea8a8", delay: 0.2, size: 12, rotate: 20  },
  { left: 50, color: "#4a9b6f", delay: 0.4, size: 8,  rotate: 75  },
  { left: 70, color: "#d45f7a", delay: 0.1, size: 10, rotate: 45  },
  { left: 84, color: "#c97b3e", delay: 0.3, size: 12, rotate: 55  },
  { left: 96, color: "#5b8dd9", delay: 0.0, size: 8,  rotate: 30  },
];

export interface BuddyCelebrationUser {
  user_id: string;
  display_name: string | null;
  username: string | null;
  profile_image_url: string | null;
}

interface Props {
  me: BuddyCelebrationUser;
  buddy: BuddyCelebrationUser;
  onClose: () => void;
}

export function BuddyCelebrationModal({ me, buddy, onClose }: Props) {
  useEffect(() => {
    const t = setTimeout(onClose, 7000);
    return () => clearTimeout(t);
  }, [onClose]);

  const meDisplay = me.display_name || me.username || "You";
  const buddyDisplay = buddy.display_name || buddy.username || "Your Buddy";
  const meInitials = meDisplay.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();
  const buddyInitials = buddyDisplay.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <style>{`
        @keyframes confetti-fall {
          0%   { transform: translateY(-20px) rotate(var(--cr)); opacity: 1; }
          100% { transform: translateY(110vh) rotate(calc(var(--cr) + 400deg)); opacity: 0.2; }
        }
        @keyframes buddy-pop {
          0%   { transform: scale(0.7); opacity: 0; }
          60%  { transform: scale(1.06); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-6px); }
        }
        .confetti-bit {
          position: fixed;
          top: -20px;
          border-radius: 2px;
          pointer-events: none;
          z-index: 10000;
          animation: confetti-fall var(--dur) ease-in var(--del) forwards;
        }
        .buddy-pop-card {
          animation: buddy-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        .handshake-bounce {
          display: inline-block;
          animation: bounce-slow 1.6s ease-in-out infinite;
        }
      `}</style>

      {/* Confetti pieces */}
      {CONFETTI.map((c, i) => (
        <div
          key={i}
          className="confetti-bit"
          style={{
            left: `${c.left}%`,
            width: c.size,
            height: c.size,
            backgroundColor: c.color,
            "--cr": `${c.rotate}deg`,
            "--del": `${c.delay}s`,
            "--dur": `${2.2 + c.delay * 0.5}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Overlay */}
      <div
        className="fixed inset-0 z-[9998] flex items-center justify-center bg-black/50 px-4"
        onClick={onClose}
      >
        <div
          className="buddy-pop-card bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-4xl mb-2">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-1">You're Buddies!</h2>
          <p className="text-sm text-gray-500 mb-7">You can now message each other</p>

          {/* Avatars side by side */}
          <div className="flex items-center justify-center gap-5 mb-7">
            {/* Me */}
            <div className="flex flex-col items-center gap-2">
              {me.profile_image_url ? (
                <img
                  src={me.profile_image_url}
                  alt={meDisplay}
                  className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-white"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 ring-white"
                  style={{ backgroundColor: avatarColor(me.user_id) }}
                >
                  {meInitials}
                </div>
              )}
              <p className="text-xs font-semibold text-gray-700 max-w-[72px] truncate">{meDisplay}</p>
            </div>

            {/* Handshake icon */}
            <span className="handshake-bounce text-3xl select-none">🤝</span>

            {/* Buddy */}
            <div className="flex flex-col items-center gap-2">
              {buddy.profile_image_url ? (
                <img
                  src={buddy.profile_image_url}
                  alt={buddyDisplay}
                  className="w-16 h-16 rounded-full object-cover shadow-lg ring-4 ring-white"
                />
              ) : (
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg ring-4 ring-white"
                  style={{ backgroundColor: avatarColor(buddy.user_id) }}
                >
                  {buddyInitials}
                </div>
              )}
              <p className="text-xs font-semibold text-gray-700 max-w-[72px] truncate">{buddyDisplay}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl text-sm font-bold text-white transition hover:opacity-90"
            style={{ backgroundColor: "#4a9b6f" }}
          >
            Let's Go! 🙌
          </button>
        </div>
      </div>
    </>
  );
}
