import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "London CI Calendar",
  description: "Calendar of Contact Improvisation events in London",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
