export const Skeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md ${className}`}
    />
  );
};

export const TableSkeleton = () => (
  <div className="space-y-4 w-full">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex space-x-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    ))}
  </div>
);

export const CardSkeleton = () => (
  <div className="border border-gray-200 p-4 rounded-lg space-y-3">
    <Skeleton className="h-48 w-full rounded-md" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-1/2" />
  </div>
);
