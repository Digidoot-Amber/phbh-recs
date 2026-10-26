"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Rec } from "@/lib/recs";
import RecCard from "./RecCard";

type Mode = "search" | "category";

type Props = {
  recs: Rec[];
  serviceCounts: { service: string; count: number }[];
};

/** Searches the name, service, category, area and everything friends said. */
function matches(rec: Rec, q: string) {
  const haystack = [
    rec.name,
    rec.service,
    rec.category,
    rec.area,
    ...rec.thread.map((c) => `${c.who} ${c.said}`),
  ]
    .join(" ")
    .toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => haystack.includes(term));
}

export default function RecsApp({ recs, serviceCounts }: Props) {
  const [mode, setMode] = useState<Mode>("search");
  const [query, setQuery] = useState("");
  const [activeService, setActiveService] = useState<string | null>(null);

  const searchResults = useMemo(
    () => (query.trim() ? recs.filter((r) => matches(r, query)) : recs),
    [recs, query],
  );

  const serviceRecs = useMemo(
    () => (activeService ? recs.filter((r) => r.service === activeService) : []),
    [recs, activeService],
  );

  const byCategory = useMemo(() => {
    const groups = new Map<string, Rec[]>();
    for (const r of serviceRecs) {
      groups.set(r.category, [...(groups.get(r.category) ?? []), r]);
    }
    return [...groups.entries()].sort(([a], [b]) => a.localeCompare(b));
  }, [serviceRecs]);

  const buttonBase =
    "w-full rounded-full px-8 py-4 text-sm font-semibold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose sm:text-base";

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-12 sm:py-16">
      {/* ---- Cover ---- */}
      <section className="flex flex-col items-center gap-8 sm:gap-12 md:flex-row md:items-center">
        <div className="relative aspect-square w-56 shrink-0 overflow-hidden rounded-xl shadow-[0_8px_30px_rgba(20,16,51,0.12)] sm:w-72">
          <Image
            src="/cover.webp"
            alt="A bright pink burst over a mountain at sunset"
            fill
            sizes="(max-width: 640px) 14rem, 18rem"
            className="object-cover"
            priority
          />
        </div>

        <div className="w-full min-w-0 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Welcome BHBH Ladies
          </h1>
          <p className="mx-auto mt-3 max-w-md text-lg text-ink-soft md:mx-0">
            Years of friendship and recommendations available with ease.
          </p>

          <div className="mx-auto mt-7 flex max-w-md flex-col gap-3 md:mx-0">
            <button
              type="button"
              onClick={() => setMode("search")}
              aria-pressed={mode === "search"}
              className={`${buttonBase} ${
                mode === "search"
                  ? "bg-rose-deep ring-2 ring-ink/10"
                  : "bg-rose hover:bg-rose-deep"
              }`}
            >
              Search by Keywords and Services
            </button>
            <button
              type="button"
              onClick={() => setMode("category")}
              aria-pressed={mode === "category"}
              className={`${buttonBase} ${
                mode === "category"
                  ? "bg-rose-deep ring-2 ring-ink/10"
                  : "bg-rose hover:bg-rose-deep"
              }`}
            >
              Browse Directory By Category
            </button>
          </div>
        </div>
      </section>

      {/* ---- Directory ---- */}
      <section className="mt-14">
        {mode === "search" ? (
          <>
            <label htmlFor="rec-search" className="sr-only">
              Search recommendations
            </label>
            <input
              id="rec-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “tacos”, “hair”, “Condesa”…"
              className="w-full rounded-full border border-hairline bg-white px-6 py-4 text-base text-ink shadow-[0_1px_2px_rgba(20,16,51,0.04)] outline-none placeholder:text-ink-soft/60 focus:border-rose focus:ring-2 focus:ring-rose/20"
            />

            <p className="mt-4 text-sm text-ink-soft">
              {searchResults.length}{" "}
              {searchResults.length === 1 ? "listing" : "listings"}
              {query.trim() ? ` matching “${query.trim()}”` : ""}
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {searchResults.map((rec) => (
                <RecCard key={rec.id} rec={rec} />
              ))}
            </div>

            {searchResults.length === 0 && (
              <p className="rounded-2xl border border-dashed border-hairline bg-white px-6 py-10 text-center text-ink-soft">
                Nothing matches that yet. Try a shorter word.
              </p>
            )}
          </>
        ) : activeService === null ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCounts.map(({ service, count }) => (
              <button
                key={service}
                type="button"
                onClick={() => setActiveService(service)}
                className="rounded-2xl border border-hairline bg-white px-6 py-8 text-left transition hover:border-rose hover:shadow-[0_4px_20px_rgba(217,83,111,0.12)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
              >
                <span className="block text-xl font-semibold text-ink">
                  {service}
                </span>
                <span className="mt-1 block text-sm text-ink-soft">
                  {count} {count === 1 ? "listing" : "listings"}
                </span>
              </button>
            ))}
          </div>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setActiveService(null)}
              className="text-sm font-semibold text-rose hover:text-rose-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose"
            >
              ← All categories
            </button>

            <h2 className="mt-3 text-2xl font-bold text-ink">
              {activeService}
            </h2>

            <div className="mt-6 space-y-9">
              {byCategory.map(([category, items]) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-soft">
                    {category}
                  </h3>
                  <div className="mt-3 grid gap-4 sm:grid-cols-2">
                    {items.map((rec) => (
                      <RecCard key={rec.id} rec={rec} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
