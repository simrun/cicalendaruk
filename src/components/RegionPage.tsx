import { ComponentProps } from "react";

import Calendar from "@/components/Calendar";
import NavBar from "@/components/NavBar";

export default function RegionPage({
  name,
  eventSources,
  ...rest
}: {
  name: string;
} & ComponentProps<typeof Calendar>) {
  return (
    <div className="flex h-svh flex-col">
      <NavBar breadcrumb={[[name]]} />

      <div className="flex-1">
        <Calendar eventSources={eventSources} {...rest} />
      </div>
    </div>
  );
}
