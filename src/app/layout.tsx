import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { APP_DESCRIPTION, APP_NAME } from "@/lib/constants";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s | ${APP_NAME}` },
  description: APP_DESCRIPTION,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2"
        >
          Skip to content
        </a>
        <header className="border-b border-border">
          <div className="mx-auto max-w-5xl px-6 py-6">
            <Link href="/" className="font-semibold">
              {APP_NAME}
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              By The Silicon Engine
            </p>
          </div>
        </header>
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto max-w-5xl px-6 py-12"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
