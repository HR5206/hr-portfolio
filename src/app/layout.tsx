import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hrProfile } from "@/data/hr-portfolio";
import "./globals.css";

const title = "Harish Raghav | Software Developer & SASTRA CSE Student";
const description =
  "I'm Harish Raghav, a Computer Science student at SASTRA University. Explore my software projects, technical experience, and resume through this interactive desktop portfolio.";

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

