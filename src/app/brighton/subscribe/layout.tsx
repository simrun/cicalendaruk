import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Subscribe to Brighton | CI Calendar UK",
  description: "Lets you subscribe to the Brighton calendar feed",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
