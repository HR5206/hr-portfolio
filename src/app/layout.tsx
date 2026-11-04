import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hrProfile } from "@/data/hr-portfolio";
import "./globals.css";

const title = hrProfile.name + " | Personal computer";
const description =
  "Harish Raghav S studies computer science at SASTRA. Explore his software projects, experience, and résumé on a small interactive desktop.";

export const metadata: Metadata = {
  title: { default: title, template: "%s | " + hrProfile.name },
  description,
  applicationName: "HR — Personal computer",
  openGraph: {
    title,
    description,
    siteName: "HR — Personal computer",
    type: "website",
  },
};

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

