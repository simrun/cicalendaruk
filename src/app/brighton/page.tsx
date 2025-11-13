import RegionPage from "@/components/RegionPage";

export default function Page() {
  return (
    <RegionPage
      name="Brighton"
      eventSources={[
        {
          url: "/feeds/brighton-movingstillness.ics",
          format: "ics",
          color: "teal",
        },
      ]}
    />
  );
}
