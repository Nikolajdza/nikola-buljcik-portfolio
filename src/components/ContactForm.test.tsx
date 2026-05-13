import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import type { ContactLabels } from "./ContactForm";

const labels: ContactLabels = {
  heading: "Let's Work Together",
  subheading: "Open to new opportunities.",
  nameLabel: "Name",
  namePlaceholder: "Your name",
  emailLabel: "Email",
  emailPlaceholder: "your@email.com",
  subjectLabel: "Subject",
  subjectPlaceholder: "What is this about?",
  messageLabel: "Message",
  messagePlaceholder: "Tell me more...",
  send: "Send Message",
  sending: "Sending...",
  successTitle: "Message sent!",
  successBody: "Thanks for reaching out.",
  errorMsg: "Something went wrong.",
  orReachOut: "Or reach out directly",
  emailMe: "Email me",
  linkedIn: "LinkedIn",
  github: "GitHub",
  locationLabel: "Location",
  locationValue: "Novi Sad, Serbia",
  availableLabel: "Availability",
  availableValue: "Open to opportunities",
  responseLabel: "Response time",
  responseValue: "Within 24 hours",
};

describe("ContactForm", () => {
  it("renders form fields", () => {
    render(<ContactForm labels={labels} />);
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("Subject")).toBeInTheDocument();
    expect(screen.getByLabelText("Message")).toBeInTheDocument();
  });

  it("renders send button", () => {
    render(<ContactForm labels={labels} />);
    expect(screen.getByRole("button", { name: /send message/i })).toBeInTheDocument();
  });

  it("renders social links", () => {
    render(<ContactForm labels={labels} />);
    expect(screen.getByRole("link", { name: /linkedin/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /github/i })).toBeInTheDocument();
  });

  it("renders info cards", () => {
    render(<ContactForm labels={labels} />);
    expect(screen.getByText("Novi Sad, Serbia")).toBeInTheDocument();
    expect(screen.getByText("Open to opportunities")).toBeInTheDocument();
    expect(screen.getByText("Within 24 hours")).toBeInTheDocument();
  });
});
