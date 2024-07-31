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
    <div>
      <style jsx global>{`
        /* Reducing spacing to make more room for events. */
        .fc .fc-toolbar.fc-header-toolbar {
          margin-bottom: 4px;
        }
        .fc .fc-daygrid-day-number {
          padding-top: 0;
          padding-bottom: 0;
        }

        /* Allow non-all-day events to wrap onto 2 lines on days where there are <= 2 events. */
        .fc-daygrid-day-events:where(:not(:has(
            .fc-daygrid-event-harness + .fc-daygrid-event-harness + .fc-daygrid-event-harness
        )))
        > .fc-daygrid-event-harness:not(.fc-daygrid-event-harness-abs)
        > .fc-daygrid-event {
          white-space: normal;
          word-break: break-all;
          overflow-y: hidden;
          line-height: 1.05;
          --event-lines: 2;
          max-height: calc(var(--event-lines) * 1.05em + 4px);
        }
        /* If there is only one event on a day it can even wrap onto 3 lines. */
        .fc-daygrid-day-events:where(:not(:has(
            .fc-daygrid-event-harness + .fc-daygrid-event-harness
        )))
        > .fc-daygrid-event-harness:not(.fc-daygrid-event-harness-abs)
        > .fc-daygrid-event {
          --event-lines: 3;
          max-height: calc(var(--event-lines) * 1.05em + 4px);
        }
      `}</style>
      <FullCalendar
        plugins={[dayGrid, iCalendarPlugin]}
        initialView="dayGridMonth"
        eventSources={eventSources}
        eventDisplay="block"
        displayEventTime={false}
        height="100svh"
        eventClick={(info) => {
          // don't navigate away from calendar; open event urls in new window
          info.jsEvent.preventDefault();
          if (info.event.url) window.open(info.event.url, "_blank", "noopener");
        }}
      />
    </div>
  );
}
