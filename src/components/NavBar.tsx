import Link from "next/link";

export default function NavBar({
  breadcrumb = [],
}: {
  /** Link text, optional href, and optional className. */
  breadcrumb?: [string, string?, string?][];
}) {
  return (
    <div className="prose text-2xl">
      <Link href="/">CI Calendar UK</Link>

      {breadcrumb.map(([name, url, className]) => (
        <span key={url ?? name} className={className}>
          &nbsp;›&nbsp;
          {url ? <Link href={url}>{name}</Link> : name}
        </span>
      ))}
    </div>
  );
}
