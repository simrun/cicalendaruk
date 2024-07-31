"use client";

import type { EventInput } from "@fullcalendar/core";
import dayGrid from "@fullcalendar/daygrid";
import iCalendarPlugin from "@fullcalendar/icalendar";
import FullCalendar from "@fullcalendar/react";

import { useRouter } from "next/navigation";

import NavBar from "@/components/NavBar";

// Google Calendar doesn't have a URL field
// Fill it from the Location field instead
function eventUrlFromLocation(eventData: EventInput) {
  if (eventData.extendedProps?.location) {
    eventData.url = eventData.extendedProps.location;
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
    eventDataTransform: eventUrlFromLocation,
  },
  {
    url: "/feeds/uk.ics",
    format: "ics",
    color: "red",
    eventDataTransform: eventUrlFromLocation,
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
