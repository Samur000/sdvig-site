import { Hero } from "@/components/sections/Hero";
import { ParallaxPain } from "@/components/sections/ParallaxPain";
import { ModuleSwitcher } from "@/components/sections/ModuleSwitcher";
import { Security } from "@/components/sections/Security";
import { FounderStory } from "@/components/sections/FounderStory";
import { Download } from "@/components/sections/Download";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <ParallaxPain />
      <ModuleSwitcher />
      <Security />
      <FounderStory />
      <Download />
      <FAQ />
    </>
  );
}
