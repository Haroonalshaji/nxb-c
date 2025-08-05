import ContactHero from "../../../components/contact-hero"
import ContactInfo from "../../../components/contact-info"
import ContactForm from "../../../components/contact-form"
import ContactCTA from "../../../components/contact-cta"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <ContactCTA />
    </div>
  )
}
