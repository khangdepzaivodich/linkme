import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Link2 } from "lucide-react";

type Link = {
  id: string;
  title: string;
  url: string;
  clicks?: number;
  platform?: string;
  created_at?: string;
  user_id?: string | number;
  order?: number;
};

type LinksListProps = {
  links: Link[];
  platformIcons: Record<string, React.ElementType>;
  colors: Record<string, string>;
};

export default function LinksList({
  links,
  platformIcons,
  colors,
}: LinksListProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4 text-indigo-800">🔗 Your Links</h3>
      <div className="space-y-4">
        {links.length === 0 ? (
          <p className="text-gray-400 text-center">
            No links yet. Add your first one!
          </p>
        ) : (
          links.map((link) => {
            const Icon =
              platformIcons[link.platform?.toLowerCase() || "other"] || Link2;
            return (
              <Card
                key={link.id}
                className="hover:shadow-lg border-l-4 transition-all border-indigo-200"
              >
                <CardContent className="flex justify-between items-center py-4 px-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={clsx(
                        "p-2 rounded-full",
                        colors[
                          link.platform?.toLowerCase() as keyof typeof colors
                        ] || "bg-gray-100"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-semibold text-indigo-800">
                        {link.title || link.platform || "Untitled"}
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {link.url}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center text-sm">
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      Delete
                    </Button>
                    <span className="text-xs text-gray-400">
                      {link.clicks ?? 0} clicks
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
