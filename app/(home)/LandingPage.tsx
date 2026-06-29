import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Pricing from "@/components/sections/Pricing";
import StatsAndCTA from "@/components/sections/StatsAndCTA";

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Services />
      <WhyUs />
      <Pricing />
      <StatsAndCTA />
    </>
  );
}