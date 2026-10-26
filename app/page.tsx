import RecsApp from "@/components/RecsApp";
import { getAllRecs, getServiceCounts } from "@/lib/recs";

export default async function Home() {
  const [recs, serviceCounts] = await Promise.all([
    getAllRecs(),
    getServiceCounts(),
  ]);

  return <RecsApp recs={recs} serviceCounts={serviceCounts} />;
}
