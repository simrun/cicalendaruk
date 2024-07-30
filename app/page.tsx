"use client";

import FullCalendar from '@fullcalendar/react'
import dayGrid from '@fullcalendar/daygrid'
import iCalendarPlugin from '@fullcalendar/icalendar'

const eventSources = [
  { 
    url: "/feeds/ricknodine.ics",
    format: "ics",
    color: "blue"
  },
  { 
    url: "/feeds/cigoldsmiths.ics",
    format: "ics",
    color: "gold"
  },
]

export default function Home() {
  return <FullCalendar
    plugins={[ dayGrid, iCalendarPlugin ]}
    initialView='dayGridMonth'
    eventSources={eventSources}
  />;
}
