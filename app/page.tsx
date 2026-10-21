import { SiteHeader } from '@/components/site-header'
import { HeroSection } from '@/components/hero-section'
import { ServicesSection } from '@/components/services-section'
import { PackagesSection } from '@/components/packages-section'
import { AvailabilitySection } from '@/components/availability-section'
import { WhySection } from '@/components/why-section'
import { HowItWorksSection } from '@/components/how-it-works-section'
import { QuoteFormSection } from '@/components/quote-form-section'
import { ContactSection } from '@/components/contact-section'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <ServicesSection />
        <PackagesSection />
        <AvailabilitySection />
        <WhySection />
        <HowItWorksSection />
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
