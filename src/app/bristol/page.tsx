import RegionPage from "@/components/RegionPage";

export default function Page() {
  return (
    <RegionPage
      name="Bristol & Southwest"
      eventSources={
        [
          // TODO: add manual feed for Bristol
        ]
      }
      // disable subscribe link as we haven't built it for this region yet
      headerToolbar={{
        start: "title",
        end: "today prev,next",
      }}
    />
  );
}
