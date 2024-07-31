import Link from "next/link";

export default function NavBar({ location }: { location?: string }) {
  return (
    <div className="flex justify-between text-2xl">
      <Link href="/">CI Calendar UK</Link>
      {location && <p>{location}</p>}
    </div>
  );
}
