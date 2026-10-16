"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";

import { GlassCard } from "@/components/ui/glass-card";
import { useGlassSettings } from "@/hooks/use-glass-settings";

export function GlassAppearanceSettings() {
  const { settings, ready, storageAvailable, setOpacity, setBlur, resetToDefault } = useGlassSettings();

  return (
    <GlassCard aria-labelledby="glass-appearance-title" className="max-w-2xl">
      <div className="mb-8 flex items-start gap-3">
        <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-cyan-100/15 bg-cyan-200/10 text-cyan-100">
          <SlidersHorizontal className="size-5" aria-hidden="true" />
        </span>
        <div>
          <h2 id="glass-appearance-title" className="text-lg font-semibold">Glass Appearance</h2>
          <p className="mt-1 text-sm leading-6 text-slate-200">Make your workspace feel like yours.</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="glass-opacity" className="text-sm font-medium">Glass Opacity</label>
            <output htmlFor="glass-opacity" className="text-sm text-cyan-100 tabular-nums">{settings.opacity}%</output>
          </div>
          <p id="glass-opacity-description" className="mb-3 text-xs leading-5 text-slate-200">Choose how much of the landscape shows through glass surfaces.</p>
          <input
            id="glass-opacity"
            type="range"
            min={5}
            max={90}
            step={1}
            value={settings.opacity}
            disabled={!ready}
            aria-valuetext={`${settings.opacity} percent`}
            aria-describedby="glass-opacity-description"
            onChange={(event) => setOpacity(event.currentTarget.valueAsNumber)}
            className="glass-range h-8 w-full cursor-pointer accent-cyan-200 disabled:cursor-wait"
          />
          <div className="flex justify-between text-xs text-slate-200" aria-hidden="true"><span>5% · Clearer</span><span>90% · More solid</span></div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="glass-blur" className="text-sm font-medium">Background Blur</label>
            <output htmlFor="glass-blur" className="text-sm text-cyan-100 tabular-nums">{settings.blur}px</output>
          </div>
          <p id="glass-blur-description" className="mb-3 text-xs leading-5 text-slate-200">Soften the scenery behind the sidebar, navigation bar, and panels.</p>
          <input
            id="glass-blur"
            type="range"
            min={0}
            max={40}
            step={1}
            value={settings.blur}
            disabled={!ready}
            aria-valuetext={`${settings.blur} pixels`}
            aria-describedby="glass-blur-description"
            onChange={(event) => setBlur(event.currentTarget.valueAsNumber)}
            className="glass-range h-8 w-full cursor-pointer accent-cyan-200 disabled:cursor-wait"
          />
          <div className="flex justify-between text-xs text-slate-200" aria-hidden="true"><span>0px · Sharp</span><span>40px · Frosted</span></div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/15 pt-5">
        <p className="max-w-xs text-xs leading-5 text-slate-200">Changes apply immediately. A subtle contrast layer keeps text readable at every setting.</p>
        <button type="button" onClick={resetToDefault} disabled={!ready} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-xs font-medium hover:bg-white/15 disabled:cursor-wait">
          <RotateCcw className="size-3.5" aria-hidden="true" />
          Reset to Default
        </button>
      </div>
      <p className="mt-4 text-xs leading-5 text-slate-200" role="status">
        {!ready ? "Loading your appearance preferences…" : storageAvailable
          ? "Preferences are saved in this browser."
          : "Browser storage is unavailable. Changes apply now but may not persist after refresh."}
      </p>
    </GlassCard>
  );
}
