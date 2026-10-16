import { ArrowUpRight, Check, ShieldCheck } from "lucide-react";

import { SecurityScoreRing } from "@/components/dashboard/security-score-ring";
import { GlassCard } from "@/components/ui/glass-card";
import { securityOverview } from "@/data/mock/dashboard";

export function SecurityOverviewCard() {
  return (
    <GlassCard
      aria-labelledby="security-overview-title"
      className="flex min-h-[350px] flex-col"
    >
      <div className="flex items-center gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-100/15 bg-cyan-200/10 text-cyan-100">
          <ShieldCheck aria-hidden="true" className="size-5" strokeWidth={1.7} />
        </span>
        <div>
          <h2
            id="security-overview-title"
            className="text-lg font-semibold tracking-tight text-white"
          >
            Security Overview
          </h2>
          <p className="mt-0.5 text-xs text-slate-300">The bigger picture</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-5 sm:flex-row sm:gap-5">
        <SecurityScoreRing
          score={securityOverview.score}
          maximumScore={securityOverview.maximumScore}
          status={securityOverview.status}
        />
        <div className="space-y-4 text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200/20 bg-emerald-300/10 px-3 py-1 text-sm font-medium text-emerald-100">
            <Check aria-hidden="true" className="size-3.5" />
            {securityOverview.status}
          </span>
          <p className="max-w-48 text-sm leading-6 text-slate-200">
            {securityOverview.explanation}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-xs sm:justify-start">
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-200">
              <ArrowUpRight aria-hidden="true" className="size-4" />+
              {securityOverview.weeklyChange}
            </span>
            <span className="text-slate-300">
              {securityOverview.comparisonLabel}
            </span>
          </p>
        </div>
      </div>

      <p className="border-t border-white/10 pt-4 text-xs text-slate-300">
        {securityOverview.summary}
      </p>
    </GlassCard>
  );
}
