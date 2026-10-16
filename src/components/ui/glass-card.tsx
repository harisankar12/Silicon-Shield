import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type GlassCardProps = ComponentPropsWithoutRef<"section"> & {
  "aria-labelledby": string;
};

export function GlassCard({ className, children, ...props }: GlassCardProps) {
  return (
    <section
      className={cn("glass-panel rounded-[1.75rem] p-6 sm:p-7", className)}
      {...props}
    >
      {children}
    </section>
  );
}
