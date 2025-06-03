import { ArrowRight, Link, Palette, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
function Hero() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
          {/* Left Content */}
          <div>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight">
              Everything you are.
              <br />
              In one, simple link.
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Join millions of creators using our platform to share their
              content, grow their audience, and track performance—all in one
              place.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 rounded-full"
              >
                Sign Up Free <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="lg" className="rounded-full">
                Watch Video
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative w-full h-[400px] md:h-[500px]">
            <Image
              src="/hero-graphic.png"
              alt="Hero Illustration"
              layout="fill"
              objectFit="contain"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;
