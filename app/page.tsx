import Hero from "@/components/Hero";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
export default function Home() {
  return (
    <div className="bg-white text-gray-900">
      <Hero />
      <Features />
      <SocialProof />
    </div>
  );
}
