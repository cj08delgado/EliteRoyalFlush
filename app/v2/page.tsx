import { SiteHeader } from '@/components/site-header'
import { HeroSectionAlt } from '@/components/hero-section-alt'
import { ServicesSection } from '@/components/services-section'
import { PackagesSection } from '@/components/packages-section'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { WhySection } from '@/components/why-section'
import { AvailabilitySection } from '@/components/availability-section'
import { QuoteFormSection } from '@/components/quote-form-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function AltHomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSectionAlt />
        <ServicesSection />
        <HowItWorksSection />
        <PackagesSection />
        <WhySection />
        <AvailabilitySection />
        <QuoteFormSection />
        <ContactSection />
      </main>
      <SiteFooter />

      <a
        href="#deposit"
        className="fixed inset-x-4 bottom-4 z-40 inline-flex items-center justify-center rounded-full bg-gold px-6 py-3.5 text-base font-semibold text-gold-foreground shadow-lg shadow-black/25 sm:hidden"
      >
        Make a Deposit
      </a>
    </>
  )
}
