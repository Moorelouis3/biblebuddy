import Image from "next/image";
import Link from "next/link";

// The same top menu as the landing page, shared across the blog: logo and
// wordmark on the left, About / Blog / Sign Up / Login on the right.
export default function BlogTopNav() {
  return (
    <header className="mx-auto flex w-full max-w-[860px] items-center justify-between gap-3 px-5 py-4 sm:px-8">
      <Link href="/" className="flex shrink-0 items-center gap-2 text-[#07162f]">
        <Image
          src="/TherealiconforBB.png"
          alt=""
          width={28}
          height={28}
          className="h-6 w-6 rounded-md object-cover sm:h-7 sm:w-7"
        />
        <span className="whitespace-nowrap text-base font-black tracking-tight sm:text-lg">Bible Buddy</span>
      </Link>
      <nav className="flex items-center gap-3 whitespace-nowrap text-[13px] font-black text-[#07162f] sm:gap-7 sm:text-sm">
        <a href="/#about" className="transition hover:text-[#0056fd]">About</a>
        <Link href="/blog" className="transition hover:text-[#0056fd]">Blog</Link>
        <Link href="/signup" className="transition hover:text-[#0056fd]">Sign&nbsp;Up</Link>
        <Link href="/login" className="transition hover:text-[#0056fd]">Login</Link>
      </nav>
    </header>
  );
}
