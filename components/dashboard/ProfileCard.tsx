import { UserCircle, Edit, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type ProfileCardProps = {
  user: {
    avatar: string;
    name: string;
    bio: string;
    socials: { icon: any; url: string; label: string }[];
  };
  editProfile: boolean;
  setEditProfile: (v: boolean) => void;
  editName: string;
  setEditName: (v: string) => void;
  editBio: string;
  setEditBio: (v: string) => void;
  editAvatar: string;
  setEditAvatar: (v: string) => void;
  editSocials: string[];
  setEditSocials: (v: string[]) => void;
  handleSaveProfile: () => void;
};

export default function ProfileCard({
  user,
  editProfile,
  setEditProfile,
  editName,
  setEditName,
  editBio,
  setEditBio,
  editAvatar,
  setEditAvatar,
  editSocials,
  setEditSocials,
  handleSaveProfile,
}: ProfileCardProps) {
  return (
    <div className="text-center shadow-xl border-2 border-indigo-100 bg-white rounded-xl">
      <div className="py-6 relative">
        <Avatar className="mx-auto w-24 h-24 border-4 border-indigo-200">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            <UserCircle className="w-full h-full text-indigo-200" />
          </AvatarFallback>
        </Avatar>
        <div className="mt-3 flex justify-center items-center gap-2">
          <h3 className="text-2xl font-semibold text-indigo-800">
            {user.name}
          </h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setEditProfile(true)}
          >
            <Edit className="w-4 h-4 text-indigo-400" />
          </Button>
        </div>
        <p className="text-gray-500 mt-1 italic">{user.bio}</p>
        <div className="flex justify-center gap-4 mt-4">
          {user.socials.map((s, i) => (
            <a
              key={i}
              href={s.url}
              className="text-indigo-400 hover:text-indigo-600 transition"
            >
              <s.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        {/* Modal for editing profile */}
        {editProfile && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
              onClick={() => setEditProfile(false)}
            />
            {/* Modal */}
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="relative bg-white/90 backdrop-blur-lg border border-indigo-100 rounded-2xl shadow-2xl p-8 w-full max-w-md flex flex-col gap-6 animate-in fade-in-0 zoom-in-95">
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600 transition-colors"
                  onClick={() => setEditProfile(false)}
                  aria-label="Close"
                >
                  <X className="w-6 h-6" />
                </button>
                <h4 className="text-2xl font-bold text-indigo-800 mb-2 text-center">
                  Edit Profile
                </h4>
                {/* Avatar Upload */}
                <div className="flex flex-col items-center gap-2">
                  <Avatar className="w-24 h-24 border-4 border-indigo-200 shadow">
                    <AvatarImage src={editAvatar} alt={editName} />
                    <AvatarFallback>
                      <UserCircle className="w-full h-full text-indigo-200" />
                    </AvatarFallback>
                  </Avatar>
                  <label className="block">
                    <span className="text-xs text-gray-500">Change avatar</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setEditAvatar(ev.target?.result as string);
                        };
                        reader.readAsDataURL(file);
                      }}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-3">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Name"
                    className="focus:ring-2 focus:ring-indigo-200"
                  />
                  <Input
                    value={editBio}
                    onChange={(e) => setEditBio(e.target.value)}
                    placeholder="Bio"
                    className="focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
                <Button
                  onClick={handleSaveProfile}
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg shadow hover:brightness-110 transition"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
