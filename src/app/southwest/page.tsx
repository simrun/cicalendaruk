import RegionPage from "@/components/RegionPage";

export default function Page() {
  return (
    <RegionPage
      name="The South West"
      eventSources={[
        {
          url: "/feeds/southwest-manual.ics",
          format: "ics",
          color: "green",
        },
      ]}
    />
  );
}
