import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skimmy — AI Voice Agents for Business",
  description: "Skimmy provides AI voice agents that answer inbound calls, book appointments, handle FAQs, and route callers — 24/7.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
