"use client";

import { useEffect } from "react";
import { RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="text-center">
        {/* Decorative number */}
        <p className="text-border mb-4 font-mono text-8xl font-bold select-none">500</p>

        <h1 className="text-foreground mb-3 text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted mb-8 max-w-md">
          An unexpected error occurred. Please try refreshing the page or come back in a
          moment.
        </p>

        <button
          onClick={reset}
          className="bg-accent hover:bg-accent/90 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          <RefreshCw size={15} />
          Try again
        </button>
      </div>
    </div>
  );
}
