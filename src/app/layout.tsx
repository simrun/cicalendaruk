import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "CI Calendar UK",
  description: "Calendar of contact improvisation events in the UK",
  // Absolute URL needed for opengraph images; seems to be ignored in dev
  // WhatsApp image requirements: https://developers.facebook.com/docs/whatsapp/link-previews/
  metadataBase: new URL("https://cicalendar.uk/"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>{children}</body>
      {process.env.GA_MEASUREMENT_ID && (
        <GoogleAnalytics gaId={process.env.GA_MEASUREMENT_ID} />
      )}
    </html>
  );
}
