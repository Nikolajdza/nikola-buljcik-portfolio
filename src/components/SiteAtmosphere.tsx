/**
 * Fixed signal atmosphere — Job Radar energy:
 * hard corner rings, strong cyan/indigo washes, technical grid.
 * No soft aurora blobs.
 */
export function SiteAtmosphere() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
    >
      <div className="atmosphere-base absolute inset-0" />
      <div className="atmosphere-rings absolute inset-0" />
      <div className="atmosphere-grid absolute inset-0" />
      <div className="atmosphere-vignette absolute inset-0" />
      <div className="atmosphere-noise absolute inset-0 opacity-[0.22] dark:opacity-[0.35]" />
      <div className="from-accent/50 absolute inset-x-0 top-0 h-px bg-gradient-to-r via-cyan-400/30 to-transparent" />
    </div>
  );
}
