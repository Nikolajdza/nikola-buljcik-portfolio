import type { ReactNode } from "react";

/**
 * Decorative code-editor card for the Hero section.
 * Pure JSX, no client-side JS — animations via CSS only.
 */
export function HeroCodeCard() {
  return (
    <div className="relative w-full max-w-md select-none">
      {/* Ambient glow behind card */}
      <div
        className="animate-blob absolute -inset-4 rounded-3xl opacity-20 blur-2xl"
        style={{
          background:
            "radial-gradient(ellipse, #818cf8 0%, #6366f1 40%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Editor card */}
      <div className="border-border/60 bg-card/90 relative overflow-hidden rounded-2xl border shadow-2xl backdrop-blur-sm">
        {/* Window title bar */}
        <div className="border-border/40 bg-muted-bg/60 flex items-center gap-2 border-b px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
          <span className="h-3 w-3 rounded-full bg-green-400/70" />
          <span className="text-muted ml-auto font-mono text-xs">nikola.config.ts</span>
        </div>

        {/* Code body */}
        <div className="overflow-x-auto p-6 font-mono text-sm leading-[1.9]">
          <CodeLine>
            <Kw>const</Kw> <Var>developer</Var> <Pun>{"= {"}</Pun>
          </CodeLine>

          <CodeLine indent>
            <Prop>name</Prop>
            <Pun>:</Pun> <Str>&quot;Nikola Buljčik&quot;</Str>
            <Pun>,</Pun>
          </CodeLine>

          <CodeLine indent>
            <Prop>title</Prop>
            <Pun>:</Pun> <Str>&quot;Software Engineer&quot;</Str>
            <Pun>,</Pun>
          </CodeLine>

          <CodeLine indent>
            <Prop>location</Prop>
            <Pun>:</Pun> <Str>&quot;Belgrade, Serbia&quot;</Str>
            <Pun>,</Pun>
          </CodeLine>

          <CodeLine indent>
            <Prop>focus</Prop>
            <Pun>{": ["}</Pun>
            <Str>&quot;React&quot;</Str>
            <Pun>,</Pun> <Str>&quot;Next.js&quot;</Str>
            <Pun>,</Pun> <Str>&quot;TypeScript&quot;</Str>
            <Pun>{"],"}</Pun>
          </CodeLine>

          <CodeLine indent>
            <Prop>experience</Prop>
            <Pun>:</Pun> <Num>5</Num>
            <Pun>,</Pun>
          </CodeLine>

          <CodeLine indent>
            <Prop>available</Prop>
            <Pun>:</Pun>{" "}
            <span className="inline-flex items-center gap-1.5">
              <Kw>true</Kw>
              {/* Pulsing green dot */}
              <span className="relative inline-flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
              </span>
            </span>
            <Pun>,</Pun>
          </CodeLine>

          <CodeLine>
            <Pun>{"}"}</Pun>
          </CodeLine>
        </div>

        {/* Status bar */}
        <div className="border-border/30 bg-muted-bg/40 flex items-center justify-between border-t px-4 py-2">
          <span className="text-muted font-mono text-[10px]">TypeScript</span>
          <span className="font-mono text-[10px] text-green-500">● active</span>
        </div>
      </div>
    </div>
  );
}

/* ── Syntax token helpers ────────────────────────────────────────── */

function CodeLine({ children, indent }: { children: ReactNode; indent?: boolean }) {
  return <div className={indent ? "ml-6" : ""}>{children}</div>;
}

function Kw({ children }: { children: ReactNode }) {
  return <span className="text-violet-400 dark:text-violet-300">{children}</span>;
}

function Var({ children }: { children: ReactNode }) {
  return <span className="text-cyan-400 dark:text-cyan-300">{children}</span>;
}

function Prop({ children }: { children: ReactNode }) {
  return <span className="text-foreground/90">{children}</span>;
}

function Str({ children }: { children: ReactNode }) {
  return <span className="text-emerald-400 dark:text-emerald-300">{children}</span>;
}

function Num({ children }: { children: ReactNode }) {
  return <span className="text-orange-400 dark:text-orange-300">{children}</span>;
}

function Pun({ children }: { children: ReactNode }) {
  return <span className="text-muted">{children}</span>;
}
