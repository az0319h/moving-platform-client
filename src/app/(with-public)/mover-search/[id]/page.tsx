// src/app/(with-public)/mover-search/[id]/page.tsx
import DriverDetailPage from "@/components/mover-search/detail/DriverDetail";
import { getMoverById } from "@/lib/actions/mover.action";

export default async function Page({ params }: { params: { id: string } }) {
  const driverId = params.id;
  const driver = await getMoverById(driverId);

  return (
    <div>
      <DriverDetailPage driver={driver} />
    </div>
  );
}
