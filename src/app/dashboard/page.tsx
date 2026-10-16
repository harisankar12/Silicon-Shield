import type { Metadata } from "next";

import { Info } from "lucide-react";

import { SecurityAlertsCard } from "@/components/dashboard/security-alerts-card";
import { SecurityOverviewCard } from "@/components/dashboard/security-overview-card";
import { WelcomeBanner } from "@/components/dashboard/welcome-banner";
import { ROUTES } from "@/lib/constants";

const page = ROUTES.dashboard;

export const metadata: Metadata = {
  title: page.title,
  description: "Explore the Silicon Shield dashboard with illustrative security scores and alerts.",
};

export default function Page() {
  return (
    <>
      <WelcomeBanner />
      <div className="grid items-stretch gap-6 xl:grid-cols-[1fr_1.15fr]">
        <SecurityOverviewCard />
        <SecurityAlertsCard />
      </div>
      <p className="mt-6 flex max-w-2xl items-start gap-2 text-[11px] leading-5 text-slate-200">
        <Info className="mt-0.5 size-3.5 shrink-0 text-sky-200" aria-hidden="true" />
        Demo data for illustration only. No live monitoring or security protection is connected.
      </p>
      <footer className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5 text-[10px] tracking-wide text-slate-300">
        <p>Thoughtfully built for your peace of mind.</p>
        <p>Silicon Shield · The Silicon Engine</p>
      </footer>
    </>
  );
}
