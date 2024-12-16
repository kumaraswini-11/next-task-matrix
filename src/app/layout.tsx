import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jira | Landing Page",
  description: "Jira Landing Screen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        {children}
      </body>
    </html>
  );
}
