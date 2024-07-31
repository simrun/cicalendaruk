"use client";

import type { EventInput } from "@fullcalendar/core";
import dayGrid from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import FullCalendar from "@fullcalendar/react";
import Link from "next/link";

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
    // Google Calendar doesn't have a URL field
    // Fill it from the Location field instead
    eventDataTransform: (eventData: EventInput) => {
      if (eventData.extendedProps?.location) {
        eventData.url = eventData.extendedProps.location;
      }
      return eventData;
    },
  },
];

export default function Page() {
  return (
    <div className="flex h-svh flex-col">
      <div className="flex-1">
        <FullCalendar
          plugins={[dayGrid, iCalendarPlugin]}
          initialView="dayGridMonth"
          eventSources={eventSources}
          eventDisplay="block"
          displayEventTime={false}
          height="100%"
          eventClick={(info) => {
            // don't navigate away from calendar; open event urls in new window
            info.jsEvent.preventDefault();
            if (info.event.url) window.open(info.event.url, "_blank");
          }}
        />
      </div>

      <div className="grid grid-cols-3">
        <p className="text-start">CI Calendar UK</p>
        <p className="text-center">London</p>
        <Link href="/about" className="text-end">
          About
        </Link>
      </div>
    </div>
  );
}
