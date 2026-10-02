import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TalkToSkimmy from "./components/TalkToSkimmy";
import DemoVideo from "./components/DemoVideo";
import Logo from "./components/ui/Logo";
import { MotionProvider } from "./components/ui/Motion";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar logo={<Logo height={30} />} />
      <main>
        <Hero />
        <TalkToSkimmy />
        <DemoVideo />
      </main>
    </MotionProvider>
  );
}
