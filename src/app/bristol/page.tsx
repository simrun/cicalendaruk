import RegionPage from "@/components/RegionPage";

export default function Page() {
  return (
    <RegionPage
      name="Bristol"
      eventSources={[
        {
          url: "/feeds/bristol-manual.ics",
          format: "ics",
          color: "green",
        },
      ]}
      // disable subscribe link as we haven't built it for this region yet
      headerToolbar={{
        start: "title",
        end: "today prev,next",
      }}
    />
  );
}
