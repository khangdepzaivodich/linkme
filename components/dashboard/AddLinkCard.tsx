import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

type AddLinkCardProps = {
  showAdd: boolean;
  setShowAdd: (v: boolean) => void;
  newTitle: string;
  setNewTitle: (v: string) => void;
  newUrl: string;
  setNewUrl: (v: string) => void;
  newPlatform: string;
  setNewPlatform: (v: string) => void;
  handleAddLink: (e: React.FormEvent) => void;
};

export default function AddLinkCard({
  showAdd,
  setShowAdd,
  newTitle,
  setNewTitle,
  newUrl,
  setNewUrl,
  newPlatform,
  setNewPlatform,
  handleAddLink,
}: AddLinkCardProps) {
  return (
    <>
      <Button
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:brightness-110"
        onClick={() => setShowAdd(!showAdd)}
      >
        <Plus className="mr-2" /> Add New Link
      </Button>
      {showAdd && (
        <Card className="shadow-lg border border-green-200">
          <CardContent className="space-y-4 py-6">
            <form onSubmit={handleAddLink} className="space-y-4">
              <Input
                placeholder="Link Title (optional)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Input
                placeholder="Paste your link (URL)"
                type="url"
                value={newUrl}
                onChange={(e) => setNewUrl(e.target.value)}
                required
              />
              <select
                className="w-full p-2 border rounded"
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value)}
              >
                <option value="">Choose platform (optional)</option>
                <option value="website">Website</option>
                <option value="facebook">Facebook</option>
                <option value="twitter">X</option>
                <option value="instagram">Instagram</option>
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="youtube">YouTube</option>
                <option value="other">Other</option>
              </select>
              <Button
                type="submit"
                className="w-full bg-green-500 hover:bg-green-600 text-white"
              >
                ➕ Submit Link
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </>
  );
}
