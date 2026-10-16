"use client";

import { X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

import { DashboardHeader } from "@/components/layout/dashboard-header";
import { Sidebar } from "@/components/layout/sidebar";
import { GlassSettingsProvider, useGlassSettings } from "@/hooks/use-glass-settings";

export function DashboardShell({ children }: { children: ReactNode }) {
  return <GlassSettingsProvider><DashboardShellContent>{children}</DashboardShellContent></GlassSettingsProvider>;
}

function DashboardShellContent({ children }: { children: ReactNode }) {
  const { settings } = useGlassSettings();
  const glassStyle: CSSProperties & { "--glass-opacity": number; "--glass-blur": string } = {
    "--glass-opacity": settings.opacity / 100,
    "--glass-blur": `${settings.blur}px`,
  };
  const navigationRef = useRef<HTMLDialogElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  function closeNavigation() {
    navigationRef.current?.close();
    setMenuOpen(false);
  }

  function openNavigation() {
    navigationRef.current?.showModal();
    setMenuOpen(true);
  }

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const dismissOnDesktop = () => {
      if (desktop.matches) {
        navigationRef.current?.close();
      }
    };

    desktop.addEventListener("change", dismissOnDesktop);
    return () => desktop.removeEventListener("change", dismissOnDesktop);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <div className="dashboard-shell relative isolate min-h-dvh text-white" style={glassStyle}>
      <div className="dashboard-landscape pointer-events-none fixed inset-0 -z-20" aria-hidden="true" />
      <div className="dashboard-overlay pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />
      <a
        href="#main-content"
        className="sr-only z-50 rounded-xl bg-slate-900 px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
      >
        Skip to content
      </a>

      <aside className="sidebar-surface fixed inset-y-0 left-0 z-40 hidden w-64 overflow-y-auto border-r border-white/15 lg:block" aria-label="Workspace sidebar">
        <Sidebar />
      </aside>

      <dialog
        ref={navigationRef}
        id="dashboard-sidebar"
        aria-label="Workspace navigation"
        onClose={() => setMenuOpen(false)}
        onClick={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          if (
            event.target === event.currentTarget &&
            (event.clientX > bounds.right || event.clientY > bounds.bottom || event.clientX < bounds.left || event.clientY < bounds.top)
          ) {
            closeNavigation();
          }
        }}
        className="mobile-navigation sidebar-surface fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(20rem,calc(100vw-2rem))] max-w-none overflow-y-auto border-0 border-r border-white/20 p-0 text-white lg:hidden"
      >
        <button
          type="button"
          onClick={closeNavigation}
          className="absolute top-3 right-3 grid size-8 place-items-center rounded-lg bg-white/10 text-slate-100 hover:bg-white/20"
          aria-label="Close navigation"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
        <Sidebar onNavigate={closeNavigation} className="min-h-dvh pt-14" />
      </dialog>

      <div className="min-w-0 lg:pl-64">
        <DashboardHeader onMenuToggle={menuOpen ? closeNavigation : openNavigation} menuOpen={menuOpen} />
        <main
          id="main-content"
          tabIndex={-1}
          className="mx-auto max-w-[1440px] px-5 pt-10 pb-8 sm:px-8 sm:pt-12 lg:px-10 xl:px-12 xl:pt-14"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
