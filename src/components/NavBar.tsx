import Link from "next/link";

/** Link text, optional href, and optional className. */
export type NameUrlClass = [string, string?, string?];

export default function NavBar({
  breadcrumb = [],
}: {
  breadcrumb?: NameUrlClass[];
}) {
  const linkStyle = "font-medium underline hover:bg-black hover:text-white";
  const breadcrumbAsText = breadcrumb.map(([name, ..._]) => name).join(" > ");
  const isAbout = breadcrumbAsText === "About";
  return (
    <div className="flex items-baseline justify-start px-1 pb-1 text-2xl">
      <Link
        // Home is always a link, but is displayed as text except on the About page
        // where users might get stuck without a link back to the calendar.
        className={isAbout ? linkStyle : "text-inherit"}
        style={isAbout ? {} : { textDecoration: "inherit" }}
        href="/"
      >
        CI Cal
        <span className="max-[399px]:hidden">endar</span> UK
      </Link>
      {breadcrumb.map(([name, url, className]) => (
        <span key={url ?? name} className={className}>
          &nbsp;›&nbsp;
          {url ? (
            <Link className={linkStyle} href={url}>
              {name}
            </Link>
          ) : (
            name
          )}
        </span>
      ))}
      {!isAbout && (
        <span className="flex-1 ps-1 text-right">
          <Link
            className={`relative bottom-0.5 text-base ${linkStyle}`}
            href="/about"
          >
            About
          </Link>
        </span>
      )}
    </div>
  );
}
