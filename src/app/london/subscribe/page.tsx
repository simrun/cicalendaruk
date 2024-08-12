import type { Metadata } from "next";
import Link from "next/link";

import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "CI Calendar UK | London | Subscribe",
  description: "Lets you subscribe to the London calendar feed",
};

export default function Page() {
  return (
    <>
      <div className="m-auto max-w-prose">
        <NavBar
          breadcrumb={[
            ["London", "/london"],
            // There isn't room to append Subscribe on mobile.
            ["Subscribe", undefined, "max-[519px]:hidden"],
          ]}
        />

        <div className="mt-3 p-1">
          <p>
            <strong>
              TODO: Explain how to actually add these calendar feeds to your
              calendar app, and other relevant info like how to toggle the
              calendar once you&apos;ve added it. And style the links.
            </strong>
          </p>
          <p>Google Calendar users, click the following link to subscribe:</p>
          <blockquote className="ml-10">
            <Link href="https://calendar.google.com/calendar/u/0?cid=NDUzYmRhNzgyOWZiMWIwMThhZjYyZGYyNmYyNTNlNjI2N2ZlOTZlNDY3ZDM0ZTZhN2Q0ODBiMmVlMTA4YjU0NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t">
              Add to Google Calendar
            </Link>
          </blockquote>
          <p>(Here&apos;s an alternate link that might also work?:</p>
          <blockquote className="ml-10">
            <Link href="https://calendar.google.com/calendar/render?cid=453bda7829fb1b018af62df26f253e6267fe96e467d34e6a7d480b2ee108b544%40group.calendar.google.com">
              Add to Google Calendar maybe?
            </Link>
          </blockquote>
          <p>)</p>
          <p>
            Everyone else, including Apple Calendar users, you&apos;ll want to
            subscribe using this ICS URL:
          </p>
          <blockquote className="ml-10">
            <Link
              className="break-all"
              href="https://calendar.google.com/calendar/ical/453bda7829fb1b018af62df26f253e6267fe96e467d34e6a7d480b2ee108b544%40group.calendar.google.com/public/basic.ics"
            >
              https://calendar.google.com/calendar/ical/453bda7829fb1b018af62df26f253e6267fe96e467d34e6a7d480b2ee108b544%40group.calendar.google.com/public/basic.ics
            </Link>
          </blockquote>
        </div>
      </div>
    </>
  );
}
