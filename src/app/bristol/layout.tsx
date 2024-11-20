import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bristol | CI Calendar UK",
  description: "Calendar of Contact Improvisation events in Bristol",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
