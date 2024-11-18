import Calendar from "@/components/Calendar";
import NavBar from "@/components/NavBar";

export default function Page() {
  return (
    <div className="flex h-svh flex-col">
      <NavBar breadcrumb={[["London"]]} />

      <div className="flex-1">
        <Calendar
          eventSources={[
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
              url: "/feeds/mariechabert.ics",
              format: "ics",
              color: "salmon",
            },
            {
              url: "/feeds/london-manual.ics",
              format: "ics",
              color: "green",
            },
            {
              url: "/feeds/uk-manual.ics",
              format: "ics",
              color: "red",
            },
          ]}
        />
      </div>
    </div>
  );
}
