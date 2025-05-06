import { DataTable } from "@/components/ui/data-table";

import { Skeleton } from "@/components/ui/skeleton";
import { AddNewFill } from "./add-new-fill";
import { useGetFills } from "@/hooks/use-get-fills";
import { fillTableColumns } from "./fills-table-columns";

export const FillTable = () => {
  const { data, isLoading, error } = useGetFills();
  if (isLoading)
    return (
      <div>
        <div>
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="flex  justify-between mt-2" key={index}>
              <Skeleton className="h-6 w-[200px] mb-2" />
              <Skeleton className="h-6 w-[500px] mb-2" />
              <Skeleton className="h-6 w-[80px] mb-2" />
            </div>
          ))}
        </div>
      </div>
    );
  if (error) return <p>Erro ao carregar endpoints</p>;

  return (
    <div>
      <div className="flex justify-end my-4">
        <AddNewFill />
      </div>
      <DataTable columns={fillTableColumns} data={data} />
    </div>
  );
};
