import { Skeleton } from "@/components/ui/skeleton";

export default function MarketTokenSkeleton() {
  return (
    <div className="space-y-8 p-6">
      {/* Header with price */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-48 my-2" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>
        </div>
        <div className="text-right">
          <Skeleton className="h-8 w-32 mb-1" />
          <Skeleton className="h-6 w-40 my-2" />
        </div>
      </div>

      {/* Website and Community */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24 my-2" />
          <Skeleton className="h-6 w-48" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-32 my-2" />
          <Skeleton className="h-6 w-32" />
        </div>
      </div>

      {/* Explorers */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="flex flex-wrap gap-2">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-40 my-2" />
          ))}
        </div>
      </div>

      {/* Contract */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-32 my-2" />
        <Skeleton className="h-6 w-48" />
      </div>

      {/* About section */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64 my-2" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full my-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}
