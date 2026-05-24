"use client";

type PublicHomeButtonProps = {
  className: string;
};

export default function PublicHomeButton({ className }: PublicHomeButtonProps) {
  return (
    <button
      type="button"
      onClick={() => window.location.assign("/?landing=1")}
      className={className}
    >
      Home
    </button>
  );
}
