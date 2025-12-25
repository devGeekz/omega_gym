import { TableCell } from "./ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export const ProfileSkeleton = () => {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-500">
      <Skeleton className="h-64 w-full rounded-xl" />
      <div className="grid w-full gap-6 md:grid-cols-2">
        <Skeleton className="h-96 w-full rounded-xl" />
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>
    </div>
  );
};
export const TableSkeleton = () => {
  return (
    <>
      <TableCell>
        <Skeleton className="h-4 w-32" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-40" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-6 w-16" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-4 w-24" />
      </TableCell>
      <TableCell>
        <Skeleton className="h-8 w-8 ml-auto" />
      </TableCell>
    </>
  );
};
