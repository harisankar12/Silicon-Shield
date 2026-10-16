import type { Metadata } from "next";

import { GlassAppearanceSettings } from "@/components/settings/glass-appearance-settings";
import { ROUTES } from "@/lib/constants";

const page = ROUTES.settings;

export const metadata: Metadata = {
  title: page.title,
  description: "Personalise the glass appearance of your Silicon Shield workspace.",
};

export default function Page() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-3 text-sm leading-6 text-slate-200">Personalise your workspace. Your appearance preferences stay on this device.</p>
      </div>
      <GlassAppearanceSettings />
    </div>
  );
}
