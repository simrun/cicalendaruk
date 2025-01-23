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
    />
  );
}
