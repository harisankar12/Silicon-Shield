"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, ChevronDown, Menu, Search, Settings, X } from "lucide-react";

import { mockProfile } from "@/data/mock/profile";
import { ROUTES } from "@/lib/constants";

export interface DashboardHeaderProps {
  onMenuToggle?: () => void;
  menuOpen?: boolean;
}

export function DashboardHeader({ onMenuToggle, menuOpen = false }: DashboardHeaderProps) {
  const pathname = usePathname();
  const route = Object.values(ROUTES).find((item) => item.href === pathname);
  const currentPage = route === ROUTES.securityHealth ? "Security Health" : (route?.title ?? "Workspace");

  return (
    <header className="header-surface relative z-30 flex min-h-24 items-center gap-3 border-b border-white/10 px-5 sm:gap-5 sm:px-8 lg:px-10">
      <button
        type="button"
        onClick={onMenuToggle}
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="dashboard-sidebar"
        className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:bg-white/10 lg:hidden"
      >
        {menuOpen ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      <p className="hidden shrink-0 text-xs text-slate-300 xl:block">
        Workspace <span className="mx-2 text-slate-400" aria-hidden="true">/</span>{" "}
        <span className="font-medium text-white">{currentPage}</span>
      </p>

      <div className="relative min-w-0 flex-1 xl:ml-7 xl:max-w-80">
        <label htmlFor="workspace-search" className="sr-only">Search workspace (coming soon)</label>
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-300" aria-hidden="true" />
        <input
          id="workspace-search"
          type="search"
          placeholder="Search anything…"
          disabled
          aria-describedby="workspace-search-description"
          className="h-10 w-full rounded-xl border border-white/12 bg-white/5 pr-3 pl-10 text-[12px] text-white placeholder:text-slate-300 disabled:cursor-not-allowed disabled:opacity-100"
        />
        <span id="workspace-search-description" className="sr-only">Search is a visual preview and is not available yet.</span>
      </div>

      <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-5">
        <details className="group relative">
          <summary
            aria-label="Demo notifications"
            className="flex size-10 cursor-pointer list-none items-center justify-center rounded-xl border border-white/12 bg-white/5 text-slate-100 transition-colors hover:bg-white/10 [&::-webkit-details-marker]:hidden"
          >
            <Bell className="size-[18px]" strokeWidth={1.8} aria-hidden="true" />
          </summary>
          <div className="glass-panel absolute top-[calc(100%+14px)] right-0 w-52 rounded-2xl border border-white/20 p-5 text-left shadow-2xl sm:w-64">
            <p className="text-sm font-medium text-white">Notifications</p>
            <p className="mt-2 text-xs leading-5 text-slate-300">This is a demo workspace. Notifications will appear here when monitoring is connected.</p>
          </div>
        </details>

        <span className="hidden h-7 w-px bg-white/15 sm:block" aria-hidden="true" />

        <details className="group relative">
          <summary
            aria-label={`${mockProfile.name}, ${mockProfile.role.toLowerCase()} options`}
            className="flex cursor-pointer list-none items-center gap-2.5 rounded-xl text-left text-white [&::-webkit-details-marker]:hidden"
          >
            <span className="flex size-10 items-center justify-center rounded-full border border-white/30 bg-gradient-to-br from-amber-100/90 to-orange-200/75 text-xs font-semibold text-slate-800" aria-hidden="true">{mockProfile.initials}</span>
            <span className="hidden sm:block">
              <span className="block text-xs font-medium leading-5">{mockProfile.name}</span>
              <span className="block text-[10px] leading-4 text-slate-300">{mockProfile.role}</span>
            </span>
            <ChevronDown className="hidden size-3.5 text-slate-300 transition-transform group-open:rotate-180 sm:block" aria-hidden="true" />
          </summary>
          <div className="glass-panel absolute top-[calc(100%+14px)] right-0 w-56 rounded-2xl border border-white/20 p-2 shadow-2xl">
            <p className="px-3 pt-2 text-xs font-medium text-white">{mockProfile.name}</p>
            <p className="px-3 pt-1 pb-3 text-[11px] text-slate-300">Sample profile · no account connected</p>
            <Link href={ROUTES.settings.href} className="flex min-h-10 items-center gap-2 rounded-xl px-3 text-xs text-slate-100 transition-colors hover:bg-white/10">
              <Settings className="size-4" aria-hidden="true" />
              Settings
            </Link>
          </div>
        </details>
      </div>
    </header>
  );
}
