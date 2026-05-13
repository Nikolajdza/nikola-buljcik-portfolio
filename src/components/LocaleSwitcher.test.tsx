import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { LocaleSwitcher } from "./LocaleSwitcher";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    locale,
  }: {
    children: ReactNode;
    href: string;
    locale?: string;
  }) => (
    <a
      data-testid={`locale-link-${locale}`}
      href={`/${locale}${href === "/" ? "" : href}`}
    >
      {children}
    </a>
  ),
  usePathname: () => "/",
}));

function renderWithIntl(ui: ReactNode) {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      {ui}
    </NextIntlClientProvider>,
  );
}

describe("LocaleSwitcher", () => {
  it("shows the language label and a link for each locale", () => {
    renderWithIntl(<LocaleSwitcher />);

    expect(screen.getByRole("navigation", { name: "Language" })).toBeInTheDocument();
    expect(screen.getByTestId("locale-link-de")).toHaveAttribute("href", "/de");
    expect(screen.getByTestId("locale-link-sr")).toHaveTextContent("SR");
  });
});
