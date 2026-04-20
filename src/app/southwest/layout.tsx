import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The South West | CI Calendar UK",
  description: "Calendar of Contact Improvisation events in the South West",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
