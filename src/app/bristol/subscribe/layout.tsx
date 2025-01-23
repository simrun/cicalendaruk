import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe to Bristol | CI Calendar UK",
  description: "Lets you subscribe to the Bristol calendar feed",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
