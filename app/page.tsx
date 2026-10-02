import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Logo from "./components/ui/Logo";
import { MotionProvider } from "./components/ui/Motion";

export default function Home() {
  return (
    <MotionProvider>
      <Navbar logo={<Logo height={30} />} />
      <main>
        <Hero />
      </main>
    </MotionProvider>
  );
}
