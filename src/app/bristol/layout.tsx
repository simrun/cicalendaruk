import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bristol & Southwest | CI Calendar UK",
  description:
    "Calendar of Contact Improvisation events in Bristol and the Southwest",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
