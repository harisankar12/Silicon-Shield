"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  Bug,
  ChartNoAxesCombined,
  HeartPulse,
  LayoutDashboard,
  Monitor,
  Settings,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

import { APP_NAME, ROUTES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const navigationIcons: Record<keyof typeof ROUTES, LucideIcon> = {
  dashboard: LayoutDashboard,
  monitoring: Activity,
  alerts: Bell,
  assets: Monitor,
  reports: ChartNoAxesCombined,
  securityHealth: HeartPulse,
  vulnerabilities: Bug,
  recommendations: Sparkles,
  settings: Settings,
};

export interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className={cn("flex h-full flex-col px-5 py-7", className)}>
      <Link
        href={ROUTES.dashboard.href}
        onClick={onNavigate}
        className="mb-11 flex items-center gap-3 rounded-xl px-1 text-white"
        aria-label={`${APP_NAME} home`}
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[14px] border border-white/25 bg-gradient-to-br from-cyan-300/90 via-sky-500/90 to-blue-600/90 shadow-[0_4px_20px_rgba(14,165,233,0.25)]">
          <Shield className="size-[23px]" strokeWidth={1.8} aria-hidden="true" />
        </span>
        <span>
          <span className="block text-[17px] leading-6 font-semibold tracking-tight">
            {APP_NAME}
          </span>
          <span className="block text-[10px] leading-5 tracking-[0.12em] text-slate-300">
            THE SILICON ENGINE
          </span>
        </span>
      </Link>

      <nav aria-label="Main navigation">
        <p className="mb-3 px-3 text-[10px] font-medium tracking-[0.17em] text-slate-300">
          WORKSPACE
        </p>
        <ul className="space-y-1.5">
          {Object.entries(ROUTES).map(([key, route]) => {
            const Icon = navigationIcons[key as keyof typeof ROUTES];
            const active = pathname === route.href || pathname.startsWith(`${route.href}/`);

            return (
              <li key={key}>
                <Link
                  href={route.href}
                  onClick={onNavigate}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group flex min-h-11 items-center gap-3 rounded-xl border px-3 py-2.5 text-[13px] font-medium transition-colors",
                    active
                      ? "border-sky-300/25 bg-gradient-to-r from-sky-400/25 to-cyan-300/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      : "border-transparent text-slate-200 hover:border-white/10 hover:bg-white/7 hover:text-white",
                  )}
                >
                  <Icon
                    className={cn("size-[18px] shrink-0", active ? "text-sky-200" : "text-slate-300")}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />
                  {key === "securityHealth" ? "Security Health" : route.title}
                  {active && (
                    <span className="ml-auto size-1.5 rounded-full bg-cyan-200" aria-hidden="true" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto pt-12">
        <div className="border-t border-white/12 px-3 pt-5">
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-100">
            <span className="size-1.5 rounded-full bg-sky-200" aria-hidden="true" />
            Demo workspace
          </div>
          <p className="text-[11px] leading-5 text-slate-300">
            Sample data · no live monitoring
          </p>
          <p className="mt-5 text-[10px] tracking-wide text-slate-400">Built by The Silicon Engine</p>
        </div>
      </div>
    </div>
  );
}
