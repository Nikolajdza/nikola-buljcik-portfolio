function Skeleton({ className }: { className?: string }) {
  return <div className={`bg-border/60 animate-pulse rounded-xl ${className ?? ""}`} />;
}

export default function Loading() {
  return (
    <div className="min-h-screen">
      {/* Hero skeleton */}
      <div className="flex min-h-[calc(100vh-4rem)] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <Skeleton className="h-4 w-32" />
              <div className="space-y-3">
                <Skeleton className="h-14 w-4/5" />
                <Skeleton className="h-14 w-3/5" />
              </div>
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-3 pt-2">
                <Skeleton className="h-12 w-40" />
                <Skeleton className="h-12 w-40 opacity-50" />
              </div>
            </div>
            <div className="hidden lg:block">
              <Skeleton className="h-80 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* About skeleton */}
      <div className="border-border border-t py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Skeleton className="mb-2 h-3 w-24" />
          <Skeleton className="mb-12 h-10 w-64" />
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
            <div className="space-y-6">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <div className="grid grid-cols-3 gap-4 pt-4">
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
                <Skeleton className="h-20" />
              </div>
            </div>
            <Skeleton className="aspect-[3/4] rounded-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
