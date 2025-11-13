import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brighton | CI Calendar UK",
  description: "Calendar of Contact Improvisation events in Brighton",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
