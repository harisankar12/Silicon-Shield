import Link from "next/link";

import type { NavigationItem } from "@/types";

export function PagePlaceholder({ page }: { page: NavigationItem }) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold tracking-tight">{page.title}</h1>
      <p className="max-w-prose text-muted-foreground">{page.description}</p>
      <p>This section is a placeholder for future development.</p>
      <Link href="/" className="inline-block underline underline-offset-4">
        Back to home
      </Link>
    </div>
  );
}
