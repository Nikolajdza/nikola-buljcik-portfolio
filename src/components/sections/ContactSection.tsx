import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Container } from "@/components/ui/Container";
import { FadeIn } from "@/components/ui/FadeIn";
import { ContactForm } from "@/components/ContactForm";

export async function ContactSection() {
  const t = await getTranslations("Contact");

  const labels = {
    heading: t("heading"),
    subheading: t("subheading"),
    nameLabel: t("nameLabel"),
    namePlaceholder: t("namePlaceholder"),
    emailLabel: t("emailLabel"),
    emailPlaceholder: t("emailPlaceholder"),
    subjectLabel: t("subjectLabel"),
    subjectPlaceholder: t("subjectPlaceholder"),
    messageLabel: t("messageLabel"),
    messagePlaceholder: t("messagePlaceholder"),
    send: t("send"),
    sending: t("sending"),
    successTitle: t("successTitle"),
    successBody: t("successBody"),
    errorMsg: t("errorMsg"),
    orReachOut: t("orReachOut"),
    emailMe: t("emailMe"),
    linkedIn: t("linkedIn"),
    github: t("github"),
    locationLabel: t("locationLabel"),
    locationValue: t("locationValue"),
    availableLabel: t("availableLabel"),
    availableValue: t("availableValue"),
    responseLabel: t("responseLabel"),
    responseValue: t("responseValue"),
  };

  return (
    <section id="contact" className="py-28">
      <Container>
        <FadeIn>
          <SectionHeader index="04" label={t("label")} heading={labels.heading} />
        </FadeIn>
        <FadeIn delay={0.1}>
          <ContactForm labels={labels} />
        </FadeIn>
      </Container>
    </section>
  );
}
