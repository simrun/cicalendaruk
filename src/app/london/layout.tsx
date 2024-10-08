import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "London | CI Calendar UK",
  description: "Calendar of Contact Improvisation events in London",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
