import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
function SocialProof() {
  return (
    <div>
      {/* Social Proof Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Loved by Creators Everywhere
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Thousands of creators use our platform to grow and manage their
              digital presence.
            </p>
          </div>
          <div className="mt-16 flex flex-wrap justify-center gap-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col items-center space-y-3 transition hover:scale-105"
              >
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${i}`}
                    alt={`User ${i + 1}`}
                  />
                  <AvatarFallback>{`U${i + 1}`}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                  <p className="font-medium">User {i + 1}</p>
                  <p className="text-sm text-gray-500">@username{i + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SocialProof;
