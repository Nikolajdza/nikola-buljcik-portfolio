import type { ReactNode } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import messages from "../../messages/en.json";
import { LocaleSwitcher } from "./LocaleSwitcher";

vi.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    locale,
    onClick,
  }: {
    children: ReactNode;
    href: string;
    locale?: string;
    onClick?: () => void;
  }) => (
    <a
      data-testid={`locale-link-${locale}`}
      href={`/${locale}${href === "/" ? "" : href}`}
      onClick={onClick}
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
  it("renders the toggle button with current locale code", () => {
    renderWithIntl(<LocaleSwitcher />);
    // locale code is lowercase in the span — `en`
    const btn = screen.getByRole("button", { name: /language/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent(/en/i);
  });

  it("opens the dropdown on click and lists all locales", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LocaleSwitcher />);

    await user.click(screen.getByRole("button", { name: /language/i }));

    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByTestId("locale-link-de")).toBeInTheDocument();
    expect(screen.getByTestId("locale-link-sr")).toHaveTextContent("Srpski");
  });

  it("closes the dropdown after a locale link is clicked", async () => {
    const user = userEvent.setup();
    renderWithIntl(<LocaleSwitcher />);

    await user.click(screen.getByRole("button", { name: /language/i }));
    expect(screen.getByRole("listbox")).toBeInTheDocument();

    await user.click(screen.getByTestId("locale-link-de"));
    expect(screen.queryByRole("listbox")).not.toBeInTheDocument();
  });
});
