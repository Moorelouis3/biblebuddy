"use client";
import Image from "next/image";
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

export default function HopeNationBanner() {
  const [banner, setBanner] = useState(BANNERS[0]);

  useEffect(() => {
    setBanner(BANNERS[Math.floor(Math.random() * BANNERS.length)]);
  }, []);

  return (
    <a
      href="https://www.skool.com/hopenation"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-lg flex items-center justify-center h-24 sm:h-28 px-4 transition-all duration-200"
      style={{ minHeight: 80 }}
      tabIndex={0}
      aria-label="Join Hope Nation on Skool"
    >
      <div className="flex items-center justify-center w-full h-full">
        <Image
          src={banner.src}
          alt={banner.alt}
          width={400}
          height={80}
          className="object-contain h-20 sm:h-24 w-auto mx-auto"
          priority
        />
      </div>
    </a>
  );
}
