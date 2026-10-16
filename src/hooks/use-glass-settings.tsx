"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export const GLASS_SETTINGS_KEY = "silicon-shield:glass-settings";
export const DEFAULT_GLASS_SETTINGS = { opacity: 25, blur: 24 } as const;

type GlassSettings = { opacity: number; blur: number };

function normaliseSettings(value: unknown): GlassSettings {
  const candidate = typeof value === "object" && value !== null ? value : {};
  const opacity = "opacity" in candidate ? candidate.opacity : undefined;
  const blur = "blur" in candidate ? candidate.blur : undefined;
  return {
    opacity: typeof opacity === "number" && Number.isFinite(opacity)
      ? Math.round(Math.min(90, Math.max(5, opacity))) : DEFAULT_GLASS_SETTINGS.opacity,
    blur: typeof blur === "number" && Number.isFinite(blur)
      ? Math.round(Math.min(40, Math.max(0, blur))) : DEFAULT_GLASS_SETTINGS.blur,
  };
}

function parseSettings(value: string | null): GlassSettings {
  try {
    return normaliseSettings(value ? JSON.parse(value) : null);
  } catch {
    return DEFAULT_GLASS_SETTINGS;
  }
}

type GlassSettingsContextValue = {
  settings: GlassSettings;
  ready: boolean;
  storageAvailable: boolean;
  setOpacity: (opacity: number) => void;
  setBlur: (blur: number) => void;
  resetToDefault: () => void;
};

const GlassSettingsContext = createContext<GlassSettingsContextValue | null>(null);

export function GlassSettingsProvider({ children }: { children: ReactNode }) {
  // Identical server and first-client state; browser storage is read only after hydration.
  const [settings, setSettings] = useState<GlassSettings>(DEFAULT_GLASS_SETTINGS);
  const [ready, setReady] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        setSettings(parseSettings(window.localStorage.getItem(GLASS_SETTINGS_KEY)));
      } catch {
        setStorageAvailable(false);
      }
      setReady(true);
    });

    function syncStorage(event: StorageEvent) {
      if (event.key === GLASS_SETTINGS_KEY || event.key === null) {
        setSettings(parseSettings(event.newValue));
      }
    }

    window.addEventListener("storage", syncStorage);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("storage", syncStorage);
    };
  }, []);

  const updateSettings = useCallback((next: GlassSettings) => {
    const validated = normaliseSettings(next);
    setSettings(validated);
    // Persist only deliberate user changes; never overwrite storage with startup defaults.
    try {
      window.localStorage.setItem(GLASS_SETTINGS_KEY, JSON.stringify(validated));
      setStorageAvailable(true);
    } catch {
      setStorageAvailable(false);
    }
  }, []);

  const value = useMemo<GlassSettingsContextValue>(() => ({
    settings,
    ready,
    storageAvailable,
    setOpacity: (opacity) => updateSettings({ ...settings, opacity }),
    setBlur: (blur) => updateSettings({ ...settings, blur }),
    resetToDefault: () => updateSettings(DEFAULT_GLASS_SETTINGS),
  }), [settings, ready, storageAvailable, updateSettings]);

  return <GlassSettingsContext.Provider value={value}>{children}</GlassSettingsContext.Provider>;
}

export function useGlassSettings() {
  const context = useContext(GlassSettingsContext);
  if (!context) throw new Error("useGlassSettings must be used within GlassSettingsProvider.");
  return context;
}
