import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe to The South West | CI Calendar UK",
  description: "Lets you subscribe to The South West calendar feed",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
