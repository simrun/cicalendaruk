"use client";

import type { EventInput } from "@fullcalendar/core";
import dayGrid from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import FullCalendar from "@fullcalendar/react";

import { useRouter } from "next/navigation";

import NavBar from "@/components/NavBar";

// Google Calendar doesn't have a URL field, so infer URLs from the location
// or description fields if necessary.
function addEventUrl(eventData: EventInput) {
  // If event already has a URL, leave it as is.
  if (eventData.url) {
    return eventData;
  }

  // Next check if the location field is an absolute URL.
  try {
    eventData.url = new URL(eventData.extendedProps?.location).toString();
    return eventData;
  } catch (e) {
    // Location is blank or not an absolute URL.
  }

  // Finally try to use the first URL found in the description field.
  let description = (eventData.extendedProps?.description as string) ?? "";
  // The description field set by Google Calendar is sometimes plain text, like:
  //     'Prev line\nhttps://domain.com/path?a=b&c=d#hash\nNext line'
  // and sometimes HTML, like:
  //     'Prev line<br><a href="https://domain.com/path?a=b&amp;c=d#hash">https://domain.com/path?a=b&amp;c=d#hash</a><br>Next line'
  // We have to detect which in order to know how to decode it!
  if (/<br>|<\/a>/.test(description)) {
    // Strip HTML tags, replacing them with whitespace rather than nothing since
    // tags like <br> and <p> often act as spacing.
    description = description.replace(/(<([^>]+)>)/gi, " ");
    // Decode HTML entities.
    const txt = document.createElement("textarea");
    txt.innerHTML = description;
    description = txt.value;
  }
  // Search for a URL that starts with http(s):// or www., contains no spaces or
  // quotes, and ends with a unicode word character, closing parenthesis, or
  // slash. Also, hostnames must contain a dot or (IPv6) colon.
  const urlRegex = /\b(?:https?:\/\/[^'"\s.]+[.:]|www\.)[^'"\s]+[\w)\/]/u;
  const urlMatch = description.match(urlRegex);
  if (urlMatch) {
    let url = urlMatch[0];
    // Remove unbalanced trailing closing parentheses.
    let excessParens =
      (url.match(/\)/g) ?? []).length - (url.match(/\(/g) ?? []).length;
    while (url.at(-1) === ")" && excessParens-- > 0) {
      url = url.slice(0, -1);
    }
    eventData.url = url;
  }

  return eventData;
}

const eventSources = [
  {
    url: "/feeds/ricknodine.ics",
    format: "ics",
    color: "blue",
  },
  {
    url: "/feeds/cigoldsmiths.ics",
    format: "ics",
    color: "gold",
    textColor: "black",
  },
  {
    url: "/feeds/misc.ics",
    format: "ics",
    color: "green",
  },
  {
    url: "/feeds/uk.ics",
    format: "ics",
    color: "red",
  },
];

export default function Page() {
  const router = useRouter();

  return (
    <div className="flex h-svh flex-col">
      <NavBar location="London" />

      <div className="flex-1">
        <FullCalendar
          plugins={[dayGrid, iCalendarPlugin]}
          initialView="dayGridMonth"
          firstDay={1}
          eventSources={eventSources}
          eventDataTransform={addEventUrl}
          eventDisplay="block"
          displayEventTime={false}
          height="100%"
          headerToolbar={{ start: "title", end: "about today prev,next" }}
          customButtons={{
            about: { text: "about", click: () => router.push("/about") },
          }}
          titleFormat={{ year: "2-digit", month: "short" }}
          eventClick={(info) => {
            // don't navigate away from calendar; open event urls in new window
            info.jsEvent.preventDefault();
            if (info.event.url) window.open(info.event.url, "_blank");
          }}
        />
      </div>
    </div>
  );
}
