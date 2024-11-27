import React from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { TableRow, Table, TableCell } from "@/components/ui/table";

export default function MarketSearchSkeleton() {
  return (
    <Table>
      {Array.from({ length: 20 }).map(
        (
          _,
          index // Loop to create 20 rows
        ) => (
          <TableRow key={index}>
            <TableCell className="bg-gray-300 animate-pulse">
              <Skeleton className="h-3 w-3 mt-2" />
            </TableCell>
            <TableCell className="bg-gray-300 animate-pulse">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-3 w-[250px]" />
                  <Skeleton className="h-3 w-[150px]" />
                </div>
              </div>
            </TableCell>
          </TableRow>
        )
      )}
    </Table>
  );
}
