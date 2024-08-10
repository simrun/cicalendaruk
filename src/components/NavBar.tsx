import Link from "next/link";

export default function NavBar({ location }: { location?: string }) {
  return (
    <div className="flex items-baseline justify-start px-1 pb-1 text-2xl">
      <Link href="/">CI Calendar UK</Link>
      {location && <span>&nbsp;›&nbsp;{location}</span>}
      <Link
        className="relative bottom-0.5 flex-1 ps-1 text-right text-base text-sky-500 underline"
        href="/about"
      >
        About
      </Link>
    </div>
  );
}
