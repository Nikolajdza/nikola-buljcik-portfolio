import { Link } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-6">
      <div className="text-center">
        {/* Glitchy 404 */}
        <div className="relative mb-4 select-none">
          <p className="text-border font-mono text-9xl font-bold">404</p>
          <p className="text-accent/20 absolute inset-0 [transform:translate(3px,3px)] font-mono text-9xl font-bold">
            404
          </p>
        </div>

        <h1 className="text-foreground mb-3 text-2xl font-bold">Page not found</h1>
        <p className="text-muted mb-8 max-w-md">
          Looks like this page wandered off. Let&apos;s get you back to safety.
        </p>

        <Link
          href="/"
          className="bg-accent hover:bg-accent/90 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
        >
          <ArrowLeft size={15} />
          Back to home
        </Link>
      </div>
    </div>
  );
}
