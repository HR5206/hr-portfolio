import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { hrProfile } from "@/data/hr-portfolio";
import { siteDescription, siteTitle } from "@/lib/metadata";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(hrProfile.siteUrl),
  title: { default: siteTitle, template: "%s | " + hrProfile.name },
  description: siteDescription,
  applicationName: "HR — Personal computer",
  authors: [{ name: hrProfile.fullName, url: hrProfile.siteUrl }],
  creator: hrProfile.fullName,
  referrer: "strict-origin-when-cross-origin",
};

export const viewport: Viewport = { themeColor: "#F2EEE3", viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        {children}
      </body>
    </html>
  );
}

