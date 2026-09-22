// A physical-book look built from the REAL cover image: the cover itself is
// never redrawn, only framed. "hardcover" gets a thick page block, board edge
// and deeper shadow; "paperback" a thin page block. When there is no cover
// image yet (the journal) it shows a plain frame that says so, so nothing
// pretends to be artwork we do not have.

type Props = {
  src: string | null;
  alt: string;
  variant: "hardcover" | "paperback";
  className?: string;
};

export default function BookMockup({ src, alt, variant, className = "" }: Props) {
  const hard = variant === "hardcover";
  const pages = hard ? 12 : 6;

  if (!src) {
    return (
      <div className={`relative w-full ${className}`}>
        <div
          className="flex aspect-[2/3] w-full flex-col items-center justify-center rounded-[4px] border-2 border-dashed border-[#c9ad7c] bg-[#f6eedf] px-4 text-center"
          role="img"
          aria-label={`${alt} (cover coming soon)`}
        >
          <p className="text-xs font-black uppercase tracking-[0.16em] text-[#8a6124]">Journal cover</p>
          <p className="mt-1 text-xs font-semibold text-[#8a6124]">coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full ${className}`} style={{ paddingRight: pages }}>
      {/* page block peeking out on the right */}
      <div
        aria-hidden="true"
        className="absolute bottom-[1.5%] top-[1.5%] right-0 rounded-r-[3px]"
        style={{
          width: pages + 4,
          background:
            "repeating-linear-gradient(90deg, #f7f0e1 0px, #f7f0e1 1px, #e2d6bf 1px, #e2d6bf 2px)",
          boxShadow: "inset -2px 0 3px rgba(0,0,0,0.18)",
        }}
      />
      <div
        className="relative overflow-hidden"
        style={{
          borderRadius: hard ? "3px 6px 6px 3px" : "2px 4px 4px 2px",
          boxShadow: hard
            ? "0 30px 50px -18px rgba(20,10,2,0.65), 0 10px 18px -8px rgba(20,10,2,0.45)"
            : "0 22px 36px -16px rgba(20,10,2,0.55), 0 8px 14px -8px rgba(20,10,2,0.35)",
          outline: hard ? "1.5px solid #2a1808" : "none",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} width={900} height={1350} className="block h-auto w-full" />
        {/* spine hinge + light sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background: hard
              ? "linear-gradient(90deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 3.5%, rgba(255,255,255,0.14) 5%, rgba(0,0,0,0) 8%, rgba(0,0,0,0) 88%, rgba(255,255,255,0.06) 100%)"
              : "linear-gradient(90deg, rgba(0,0,0,0.35) 0%, rgba(255,255,255,0.12) 2.5%, rgba(0,0,0,0) 5%)",
          }}
        />
      </div>
    </div>
  );
}
