"use client";
import { useEffect, useState } from "react";

const BANNERS = [
  {
    src: "/hope-community-1.png",
    alt: "Hope Nation Community 1",
  },
  {
    src: "/hope-community-2.png",
    alt: "Hope Nation Community 2",
  },
];

export default function BottomBanner() {
  const [banner, setBanner] = useState(BANNERS[0]);

  useEffect(() => {
    setBanner(BANNERS[Math.floor(Math.random() * BANNERS.length)]);
  }, []);

  return (
    <div
      className="fixed bottom-0 left-0 w-screen z-50 flex items-center justify-center bg-gray-50 shadow-lg h-[72px] md:h-[120px]"
      style={{ pointerEvents: "auto" }}
      tabIndex={0}
      aria-label="Hope Nation Banner"
    >
      <div className="w-full h-full flex items-center justify-center">
        <img
          src={banner.src}
          alt={banner.alt}
          className="object-contain h-full w-full max-w-[1400px] mx-auto cursor-pointer"
          onClick={() => window.open("https://joinhopenation.com", "_blank")}
          style={{ display: "block" }}
          tabIndex={0}
          aria-label="Join Hope Nation"
        />
      </div>
    </div>
  );
}
