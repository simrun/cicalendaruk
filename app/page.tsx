"use client";

import FullCalendar from "@fullcalendar/react";
import dayGrid from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";

import type { EventInput } from "@fullcalendar/core";

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

export default function Home() {
  return (
    <FullCalendar
      plugins={[dayGrid, iCalendarPlugin]}
      initialView="dayGridMonth"
      eventSources={eventSources}
      height="100svh"
      eventClick={(info) => {
        // don't navigate away from calendar; open event urls in new window
        info.jsEvent.preventDefault();
        if (info.event.url) window.open(info.event.url, "_blank", "noopener");
      }}
    />
  );
}
