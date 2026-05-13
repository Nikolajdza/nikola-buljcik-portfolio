import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });
  return {
    title: t("title"),
    description: t("description"),
    metadataBase: new URL("https://nikolabuljcik.dev"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
      locale,
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground min-h-screen antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            {/* ── Persistent page background ──────────────────────────
                fixed + -z-10 so it stays behind all content while
                the user scrolls. Orbs animate continuously. */}
            <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
              {/* Dot grid */}
              <div className="dot-grid absolute inset-0 opacity-50" />

              {/* Indigo orb — top right */}
              <div
                className="animate-blob absolute -top-60 right-[8%] h-[700px] w-[700px] rounded-full opacity-[0.12] blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, #818cf8 0%, #6366f1 50%, transparent 70%)",
                }}
              />
              {/* Cyan orb — bottom left */}
              <div
                className="animate-blob animation-delay-2000 absolute bottom-[5%] left-[3%] h-[600px] w-[600px] rounded-full opacity-[0.08] blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, #22d3ee 0%, #0891b2 50%, transparent 70%)",
                }}
              />
              {/* Violet orb — center */}
              <div
                className="animate-blob animation-delay-4000 absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.06] blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, #a78bfa 0%, #7c3aed 50%, transparent 70%)",
                }}
              />
            </div>

            <Header />
            <main className="pt-16">{children}</main>
            <Footer />
            <ScrollToTop />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
