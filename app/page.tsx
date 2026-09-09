import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PositioningStrip from "./components/PositioningStrip";
import Capabilities from "./components/Capabilities";
import LatencySection from "./components/LatencySection";
import CallTable from "./components/CallTable";
import HowItWorks from "./components/HowItWorks";
import IntegrationsSection from "./components/IntegrationsSection";
import UseCases from "./components/UseCases";
import DemoCTA from "./components/DemoCTA";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <PositioningStrip />
      <Capabilities />
      <LatencySection />
      <CallTable />
      <HowItWorks />
      <IntegrationsSection />
      <UseCases />
      <DemoCTA />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
