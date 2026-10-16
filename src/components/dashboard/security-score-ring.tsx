import { useId } from "react";

type SecurityScoreRingProps = {
  score: number;
  maximumScore: number;
  status: string;
};

export function SecurityScoreRing({
  score,
  maximumScore,
  status,
}: SecurityScoreRingProps) {
  const id = useId();
  const gradientId = `${id}-score-gradient`;
  const titleId = `${id}-score-title`;
  const radius = 78;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(1, Math.max(0, score / maximumScore));

  return (
    <div className="relative grid size-48 shrink-0 place-items-center">
      <svg
        viewBox="0 0 192 192"
        className="absolute inset-0 size-full -rotate-90"
        role="img"
        aria-labelledby={titleId}
      >
        <title id={titleId}>{`Security score: ${score} out of ${maximumScore}. ${status}.`}</title>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6ce5db" />
            <stop offset="48%" stopColor="#71c5f4" />
            <stop offset="100%" stopColor="#96a9fc" />
          </linearGradient>
        </defs>
        <circle
          cx="96"
          cy="96"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="10"
          className="text-white/10"
        />
        <circle
          cx="96"
          cy="96"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - fraction)}
        />
      </svg>
      <div className="text-center" aria-hidden="true">
        <span className="text-[3.75rem] leading-none font-semibold tracking-[-0.06em] text-white">
          {score}
        </span>
        <span className="mt-1.5 block text-sm text-slate-300">
          out of {maximumScore}
        </span>
      </div>
    </div>
  );
}
