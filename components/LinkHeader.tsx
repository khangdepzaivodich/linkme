import { Button } from "./ui/button";
function LinkHeader() {
  return (
    <div className="flex justify-between items-center w-full">
      <h2 className="text-4xl font-extrabold text-indigo-900">
        🌐 Your Linkme
      </h2>
      <div className="space-x-2">
        <Button variant="outline">🎨 Design</Button>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
          🚀 Share
        </Button>
      </div>
    </div>
  );
}

export default LinkHeader;
