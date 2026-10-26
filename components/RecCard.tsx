"use client";

import { useId, useState } from "react";
import type { Rec } from "@/lib/recs";

function BubbleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 3C6.98 3 3 6.3 3 10.3c0 2.3 1.3 4.3 3.4 5.6-.1 1.1-.5 2.3-1.3 3.4-.2.3 0 .6.3.6 1.9-.4 3.4-1.2 4.4-2 .7.1 1.4.2 2.2.2 5 0 9-3.3 9-7.3S17.02 3 12 3Z"
      />
    </svg>
  );
}

function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.05 6.22 12.4 6.48 12.71a.7.7 0 0 0 1.04 0C12.78 21.4 19 14.05 19 9a7 7 0 0 0-7-7Zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2Z"
      />
    </svg>
  );
}

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function RecCard({ rec }: { rec: Rec }) {
  const [open, setOpen] = useState(false);
  const threadId = useId();
  const count = rec.thread.length;

  return (
    <article className="rounded-2xl border border-hairline bg-white p-5 shadow-[0_1px_2px_rgba(20,16,51,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-ink">
            {rec.name}
          </h3>
          <p className="mt-0.5 text-sm text-ink-soft">
            {rec.category}
            {rec.area ? ` · ${rec.area}` : ""}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={threadId}
          className="relative shrink-0 rounded-full p-2 text-rose transition hover:bg-rose/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
        >
          <BubbleIcon className="h-6 w-6" />
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose px-1 text-[11px] font-semibold text-white">
            {count}
          </span>
          <span className="sr-only">
            {open ? "Hide" : "Show"} what{" "}
            {count === 1 ? "1 friend" : `${count} friends`} said about{" "}
            {rec.name}
          </span>
        </button>
      </div>

      {open && (
        <div
          id={threadId}
          className="thread-open mt-4 space-y-3 border-t border-hairline pt-4"
        >
          {rec.thread.map((c, i) => (
            <div
              key={`${c.who}-${i}`}
              className="rounded-xl rounded-tl-sm bg-rose/[0.07] px-4 py-3"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-sm font-semibold text-ink">{c.who}</span>
                <time dateTime={c.date} className="text-xs text-ink-soft">
                  {formatDate(c.date)}
                </time>
              </div>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                {c.said}
              </p>
            </div>
          ))}
        </div>
      )}

      {rec.mapsUrl && (
        <a
          href={rec.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
        >
          <PinIcon className="h-4 w-4" />
          Open in Maps
        </a>
      )}
    </article>
  );
}
