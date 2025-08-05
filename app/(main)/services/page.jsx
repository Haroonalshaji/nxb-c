import ServicesHero from "../../../components/services-hero"
import FeaturedCategories from "../../../components/featured-categories"
import AllCategories from "../../../components/all-categories"
import ServicesCTA from "../../../components/services-cta"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <ServicesHero />
      <FeaturedCategories />
      <AllCategories />
      <ServicesCTA />
    </div>
  )
}
