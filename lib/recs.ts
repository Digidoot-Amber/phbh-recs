import recsData from "@/data/recs.json";

/**
 * Every component reads recommendations through this file and nothing else.
 *
 * Right now the data comes from data/recs.json. When it moves to a real
 * database, replace the bodies of these functions with queries — the function
 * names, their arguments and their return shapes stay the same, so no component
 * needs to change. That is why they are async even though JSON is instant.
 */

export type Comment = {
  /** First name or nickname only. Never a full name, number or address. */
  who: string;
  said: string;
  /** ISO date, e.g. "2025-03-14" */
  date: string;
};

export type Rec = {
  id: string;
  name: string;
  /** Top-level grouping, e.g. "Restaurants" */
  service: string;
  /** Specific type within the service, e.g. "Tacos" */
  category: string;
  /** Neighbourhood, or "Remote" for things with no address */
  area: string;
  /** Empty string when the place has no map listing */
  mapsUrl: string;
  thread: Comment[];
};

const recs = recsData as Rec[];

export async function getAllRecs(): Promise<Rec[]> {
  return recs;
}

export async function getServices(): Promise<string[]> {
  return [...new Set(recs.map((r) => r.service))].sort();
}

export async function getRecsByService(service: string): Promise<Rec[]> {
  return recs.filter((r) => r.service === service);
}

/** Counts per service, for the category tiles. */
export async function getServiceCounts(): Promise<
  { service: string; count: number }[]
> {
  const services = await getServices();
  return services.map((service) => ({
    service,
    count: recs.filter((r) => r.service === service).length,
  }));
}
