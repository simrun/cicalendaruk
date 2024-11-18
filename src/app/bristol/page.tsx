import RegionPage from "@/components/RegionPage";

export default function Page() {
  return (
    <RegionPage
      name="Bristol & Southwest"
      eventSources={[
        // TODO: add manual feed for Bristol
        {
          url: "/feeds/uk-manual.ics",
          format: "ics",
          color: "red",
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
