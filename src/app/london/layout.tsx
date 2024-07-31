import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "London CI Calendar",
  description: "Calendar of contact improvisation events in London",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
