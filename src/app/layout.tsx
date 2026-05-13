import type { ReactNode } from "react";
import "./globals.css";

type Props = {
  children: ReactNode;
};

// Root layout is required; `<html>` and `<body>` live in `[locale]/layout.tsx`
// so we can set `lang` per locale (see next-intl App Router example).
export default function RootLayout({ children }: Props) {
  return children;
}
