import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "CI Calendar UK",
  description: "Calendar of contact improvisation events in the UK",
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
