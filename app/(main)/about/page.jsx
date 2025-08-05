import AboutHero from "../../../components/about-hero"
import WhoWeAre from "../../../components/who-we-are"
import WhatWeDo from "../../../components/what-we-do"
import WhyWeBuiltThis from "../../../components/why-we-built-this"
import WhatMakesUsDifferent from "../../../components/what-makes-us-different"
import VisionMissionValues from "../../../components/vision-mission-values"
import WhoItsFor from "../../../components/who-its-for"
import JoinNetworkCTA from "../../../components/join-network-cta"

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            <AboutHero />
            <WhoWeAre />
            <WhatWeDo />
            <WhyWeBuiltThis />
            <WhatMakesUsDifferent />
            <VisionMissionValues />
            <WhoItsFor />
            <JoinNetworkCTA />
        </div>
    )
}
