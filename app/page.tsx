import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProofStrip from "./components/ProofStrip";
import DemoVideo from "./components/DemoVideo";
import CallWalkthrough from "./components/CallWalkthrough";
import Capabilities from "./components/Capabilities";
import CallLog from "./components/CallLog";
import HowItWorks from "./components/HowItWorks";
import Integrations from "./components/Integrations";
import Industries from "./components/Industries";
import FAQ from "./components/FAQ";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import Logo from "./components/ui/Logo";
import { MotionProvider } from "./components/ui/Motion";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar logo={<Logo height={30} />} />
      <main>
        <Hero />
        <DemoVideo />
        <ProofStrip />
        <CallWalkthrough />
        <Capabilities />
        <CallLog />
        <HowItWorks />
        <Integrations />
        <Industries />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </MotionProvider>
  );
}
