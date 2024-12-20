import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { SessionProvider } from "next-auth/react";

import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Jira",
    default: "Home | Jira",
  },
  description: "Jira Home Screen.",
  applicationName: "Jira",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <SessionProvider>
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen antialiased")}>
        {children}
      </body>
    </html>
    // {/* </SessionProvider> */}
  );
}
