"use client";

import {
  EventContentArg,
  EventInput,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import { VerboseFormattingArg } from "@fullcalendar/core/internal.js";
import dayGrid from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import FullCalendar from "@fullcalendar/react";
import { usePathname, useRouter } from "next/navigation";
import { ComponentProps } from "react";

const isMapUrlRegex =
  /(?:google\.com|goo\.gl)\/maps|maps\.(?:google|apple|app\.goo\.gl)/;

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
    // If the location URL is a map link, leave it set as eventData.url, but
    // don't return so the URL from the description (if any) can overwrite it.
    if (!isMapUrlRegex.test(eventData.url)) {
      return eventData;
    }
  } catch (e) {
    // Location is blank or not an absolute URL.
  }

  // Finally try to use the first URL found in the description field.
  let description = eventData.extendedProps?.description as string;
  // The description field set by Google Calendar is sometimes plain text, like:
  //     'Prev line\nhttps://domain.com/path?a=b&c=d#hash\nNext line'
  // and sometimes HTML, like:
  //     'Prev line<br><a href="https://domain.com/path?a=b&amp;c=d#hash">https://domain.com/path?a=b&amp;c=d#hash</a><br>Next line'
  // We have to detect which in order to know how to decode it!
  if (/<br>|<\/a>/.test(description)) {
    // Strip <wbr /> tags. We've seen these break up an otherwise valid URL.
    description = description.replace(/<wbr \/>/g, "");
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
  const urlRegex = /\b(?:https?:\/\/[^'"\s.]+[.:]|www\.)[^'"\s]+[\w)\/]/gu;
  const urlMatch = description.match(urlRegex);
  if (urlMatch) {
    // Prefer non-map URLs.
    const nonMapUrls = urlMatch.filter((url) => !isMapUrlRegex.test(url));
    let url = nonMapUrls.length ? nonMapUrls[0] : urlMatch[0];
    // Guess scheme for www. URLs.
    if (!/^https?:\/\//.test(url)) {
      url = "https://" + url;
    }
    // Remove unbalanced trailing closing parentheses. We allowed closing
    // parentheses to support e.g. https://en.wikipedia.org/wiki/101_(number),
    // but don't want parentheses from e.g. (https://example.com).
    let excessParens =
      (url.match(/\)/g) ?? []).length - (url.match(/\(/g) ?? []).length;
    while (url.at(-1) === ")" && excessParens-- > 0) {
      url = url.slice(0, -1);
    }
    eventData.url = url;
  }

  return eventData;
}

/** Adds a classname counting how many events overlap at once with the event. */
function classNamesForEvent(arg: EventContentArg) {
  const nextDay = (date: Date) => {
    date = new Date(date);
    date.setDate(date.getDate() + 1);
    return date;
  };
  const isMidnight = (date: Date) => {
    return date.valueOf() === new Date(date).setHours(0, 0, 0, 0);
  };

  // Midnight at beginning of first visible day of arg.event.
  const eventStartDay = new Date(
    Math.max(
      arg.view.activeStart.valueOf(),
      !arg.event.start
        ? -8640000000000000
        : new Date(arg.event.start).setHours(0, 0, 0, 0),
    ),
  );
  // Midnight at beginning of the day after the last visible day of arg.event.
  const eventEndDay = new Date(
    Math.min(
      arg.view.activeEnd.valueOf(),
      !arg.event.end
        ? 8640000000000000
        : isMidnight(arg.event.end)
          ? arg.event.end.valueOf()
          : new Date(arg.event.end).setHours(24, 0, 0, 0),
    ),
  );

  const visibleEvents = arg.view.calendar.getEvents(); // Includes arg.event.

  let maxEventsOnEventDays = 0;
  for (
    let dayStart = eventStartDay;
    dayStart < eventEndDay;
    dayStart = nextDay(dayStart)
  ) {
    let dayEnd = nextDay(dayStart);
    let eventsOnDay = 0;
    for (let event of visibleEvents) {
      if (
        event.start &&
        event.start < dayEnd &&
        event.end &&
        event.end > dayStart
      ) {
        eventsOnDay++;
      }
    }
    if (eventsOnDay > maxEventsOnEventDays) {
      maxEventsOnEventDays = eventsOnDay;
    }
  }
  return `up-to-${maxEventsOnEventDays - 1}-overlapping-events`;
}

function dateToTitle(date: Date): string {
  // TODO: Make this adjust according to window.innerWidth.
  const innerWidth = 320;
  const month =
    innerWidth >= 480
      ? date.toLocaleString("en", {
          month: "long",
        })
      : date
          .toLocaleString("en", {
            month: "short",
          })
          // toLocaleString returns "Sept" instead of "Sep".
          .slice(0, 3);
  const year = date.getFullYear();
  return month + (innerWidth >= 400 ? ` ${year}` : ` ’${year % 100}`);
}

export default function Calendar({
  eventSources,
  ...rest
}: { eventSources: EventSourceInput[] } & ComponentProps<typeof FullCalendar>) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <FullCalendar
      plugins={[dayGrid, iCalendarPlugin]}
      initialView="dayGridMonth"
      firstDay={1}
      eventSources={eventSources}
      eventDataTransform={(e) => {
        return addEventUrl(e);
      }}
      eventDisplay="block"
      eventClassNames={classNamesForEvent}
      displayEventTime={false}
      height="100%"
      headerToolbar={{
        start: "title",
        end: "subscribe today prev,next",
      }}
      customButtons={{
        subscribe: {
          text: "subscribe to\ncalendar",
          click: () => router.push(`${pathname}/subscribe`),
        },
      }}
      titleFormat={(arg: VerboseFormattingArg) => {
        return dateToTitle(arg.date.marker);
      }}
      eventClick={(info) => {
        // don't navigate away from calendar; open event urls in new window
        info.jsEvent.preventDefault();
        if (info.event.url) window.open(info.event.url, "_blank");
      }}
      {...rest}
    />
  );
}
