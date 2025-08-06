import PricingHero from "../../../components/pricing-hero"
import PricingPlans from "../../../components/pricing-plans"
import AllPlansInclude from "../../../components/all-plans-include"
import PremiumPartnerCTA from "../../../components/premium-partner-cta"

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-white">
      <PricingHero />
      <PricingPlans />
      <AllPlansInclude />
      <PremiumPartnerCTA />
    </div>
  )
}
