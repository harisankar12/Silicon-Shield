import { ShieldCheck, Sparkles } from "lucide-react";

export function WelcomeBanner() {
  return (
    <section aria-labelledby="welcome-heading" className="mb-9 sm:mb-11">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="flex items-center gap-2 text-[11px] font-medium tracking-[0.16em] text-slate-200 uppercase">
          <Sparkles className="size-3.5 text-sky-200" aria-hidden="true" />
          A little clarity. A lot of confidence.
        </p>
        <span className="glass-surface inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-[10px] font-medium tracking-wide text-slate-100">
          <span className="size-1.5 rounded-full bg-sky-200" aria-hidden="true" />
          Demo preview
        </span>
      </div>
      <h1 id="welcome-heading" className="text-[2.5rem] leading-[1.15] font-medium tracking-[-0.045em] sm:text-5xl xl:text-[3.25rem]">
        Good morning!
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-slate-200 sm:text-[15px]">
        Here&apos;s what&apos;s happening with your organisation&apos;s security today.
      </p>
      <div className="mt-6 flex items-center gap-2.5 text-xs text-emerald-100 sm:text-sm">
        <span className="grid size-7 shrink-0 place-items-center rounded-full border border-emerald-200/20 bg-emerald-200/10">
          <ShieldCheck className="size-4 text-emerald-200" aria-hidden="true" />
        </span>
        <p>Your organisation&apos;s security at a glance.</p>
      </div>
    </section>
  );
}
