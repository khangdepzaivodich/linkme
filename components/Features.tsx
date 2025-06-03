import { Link, Palette, Share2 } from "lucide-react";
function Features() {
  return (
    <div>
      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Customize your page, track clicks, and grow your brand with
              powerful tools.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-y-12 gap-x-8 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                icon: <Link className="h-6 w-6 text-purple-600" />,
                title: "Custom Links",
                desc: "Add unlimited links and customize them with icons and titles.",
              },
              {
                icon: <Palette className="h-6 w-6 text-purple-600" />,
                title: "Themes & Design",
                desc: "Pick a theme or build your own to match your personal brand.",
              },
              {
                icon: <Share2 className="h-6 w-6 text-purple-600" />,
                title: "Analytics",
                desc: "Track visits, clicks, and performance with our analytics dashboard.",
              },
            ].map(({ icon, title, desc }, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="inline-flex items-center justify-center rounded-full bg-purple-100 p-3">
                  {icon}
                </div>
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
