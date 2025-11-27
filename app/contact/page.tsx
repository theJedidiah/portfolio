import { ContactSection } from "@/components/contact-section";

export const metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch to discuss your project.",
};

export default function ContactPage() {
  return (
    <div className="pt-24 min-h-screen">
      <ContactSection />
    </div>
  );
}

