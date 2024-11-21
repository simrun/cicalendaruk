import RegionPage from "@/components/RegionPage";

export default function Page() {
  return (
    <RegionPage
      name="London"
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
          url: "/feeds/markrietema.ics",
          format: "ics",
          color: "orange",
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
  );
}
