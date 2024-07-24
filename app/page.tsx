"use client";

import FullCalendar from '@fullcalendar/react'
import dayGrid from '@fullcalendar/daygrid'

const events = [
  { title: 'Meeting', start: new Date() }
]

export default function Home() {
  return <FullCalendar
    plugins={[ dayGrid ]}
    initialView='dayGridMonth'
    weekends={false}
    events={events}
  />;
}
