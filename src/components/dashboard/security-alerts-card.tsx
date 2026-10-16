import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bell,
  Globe2,
  KeyRound,
  type LucideIcon,
} from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import {
  dashboardAlerts,
  type AlertSeverity,
  type DashboardAlert,
} from "@/data/mock/dashboard";

const alertIcons: Record<DashboardAlert["kind"], LucideIcon> = {
  login: KeyRound,
  requests: Activity,
  traffic: Globe2,
};

const severityStyles: Record<AlertSeverity, string> = {
  High: "border-rose-200/25 bg-rose-300/10 text-rose-100",
  Medium: "border-amber-200/25 bg-amber-200/10 text-amber-100",
};

export function SecurityAlertsCard() {
  return (
    <GlassCard
      aria-labelledby="security-alerts-title"
      className="flex min-h-[350px] flex-col"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-blue-100/15 bg-blue-200/10 text-blue-100">
            <Bell aria-hidden="true" className="size-5" strokeWidth={1.7} />
          </span>
          <div>
            <h2
              id="security-alerts-title"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Security Alerts
            </h2>
            <p className="mt-0.5 text-xs text-slate-300">Example activity</p>
          </div>
        </div>
        <Link
          href="/alerts"
          className="inline-flex min-h-9 items-center gap-1 rounded-lg px-2 text-xs font-medium text-cyan-100 transition-colors hover:bg-white/10 hover:text-white"
        >
          View all
          <ArrowUpRight aria-hidden="true" className="size-3.5" />
          <span className="sr-only"> security alerts</span>
        </Link>
      </div>

      <ul className="mt-4 flex-1 divide-y divide-white/10">
        {dashboardAlerts.map((alert) => {
          const Icon = alertIcons[alert.kind];

          return (
            <li key={alert.id} className="flex gap-3 py-4">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-slate-200">
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.7} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm leading-5 font-medium text-slate-100">
                  {alert.title}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2.5">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[0.625rem] leading-4 font-medium ${severityStyles[alert.severity]}`}
                  >
                    <span
                      aria-hidden="true"
                      className="size-1 rounded-full bg-current"
                    />
                    <span className="sr-only">Severity: </span>
                    {alert.severity}
                  </span>
                  <span className="text-xs text-slate-300">{alert.timestamp}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </GlassCard>
  );
}
