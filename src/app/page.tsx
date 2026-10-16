import Link from "next/link";

import { APP_DESCRIPTION, APP_NAME, ROUTES } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight">{APP_NAME}</h1>
        <p className="max-w-prose text-muted-foreground">{APP_DESCRIPTION}</p>
        <p>Frontend foundation. Each section is ready for future development.</p>
      </div>
      <nav aria-label="Platform sections">
        <ul className="space-y-3">
          {Object.values(ROUTES).map(({ href, title }) => (
            <li key={href}>
              <Link href={href} className="underline underline-offset-4">
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
