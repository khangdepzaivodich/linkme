"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Facebook,
  Instagram,
  Link2,
  X,
  Github,
  Linkedin,
  Youtube,
  Globe,
  UserCircle,
  Edit,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import LinkHeader from "@/components/LinkHeader";
import ProfileCard from "@/components/dashboard/ProfileCard";
import AddLinkCard from "@/components/dashboard/AddLinkCard";
import LinksList from "@/components/dashboard/LinksList";

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

type User = {
  avatar: string;
  name: string;
  bio: string;
  socials: { icon: any; url: string; label: string }[];
};

const platformIcons: Record<string, React.ElementType> = {
  facebook: Facebook,
  twitter: X,
  instagram: Instagram,
  github: Github,
  linkedin: Linkedin,
  youtube: Youtube,
  website: Globe,
  other: Link2,
};

const colors = {
  facebook: "bg-blue-100 text-blue-700",
  twitter: "bg-black text-white",
  instagram: "bg-pink-100 text-pink-600",
  github: "bg-gray-200 text-black",
  linkedin: "bg-blue-200 text-blue-800",
  youtube: "bg-red-100 text-red-600",
  website: "bg-green-100 text-green-700",
  other: "bg-gray-100 text-gray-600",
};

export default function AllLinksPage() {
  const [links, setLinks] = useState<Link[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [newUrl, setNewUrl] = useState("");
  const [newPlatform, setNewPlatform] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [user, setUser] = useState<User>({
    avatar: "",
    name: "Your Name",
    bio: "Your bio goes here.",
    socials: [
      { icon: Facebook, url: "#", label: "facebook" },
      { icon: X, url: "#", label: "twitter" },
      { icon: Instagram, url: "#", label: "instagram" },
      { icon: Github, url: "#", label: "github" },
      { icon: Linkedin, url: "#", label: "linkedin" },
      { icon: Youtube, url: "#", label: "youtube" },
    ],
  });
  const [editProfile, setEditProfile] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);
  const [editAvatar, setEditAvatar] = useState(user.avatar);
  const [editSocials, setEditSocials] = useState(
    user.socials.map((s) => s.url)
  );
  const [userId, setUserId] = useState<number | null>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchUserIdAndLinks() {
      const { data: authData } = await supabase.auth.getUser();
      const authUser = authData?.user;
      if (!authUser) return;
      const { data: users, error } = await supabase
        .from("users")
        .select("id, full_name, bio, avatar_url")
        .eq("email", authUser.email);

      if (error || !users || users.length === 0) {
        console.error("App user not found in users table");
        return;
      }

      const appUser = users[0];
      setUserId(appUser.id);
      setUser((prev) => ({
        ...prev,
        name: appUser.full_name || "Your Name",
        bio: appUser.bio || "Your bio goes here.",
        avatar: appUser.avatar_url || "",
      }));
      setEditName(appUser.full_name || "Your Name");
      setEditBio(appUser.bio || "Your bio goes here.");
      setEditAvatar(appUser.avatar_url || "");

      const { data: linksData } = await supabase
        .from("links")
        .select("*")
        .eq("user_id", appUser.id)
        .order("order", { ascending: true });

      setLinks(linksData || []);
    }
    fetchUserIdAndLinks();
  }, [supabase]);

  async function handleAddLink(e: React.FormEvent) {
    e.preventDefault();
    if (!newUrl || userId === null) return;

    const nextOrder = links.length;
    const { data, error } = await supabase
      .from("links")
      .insert([
        {
          url: newUrl,
          platform: newPlatform,
          title: newTitle,
          user_id: userId,
          order: nextOrder,
        },
      ])
      .select();

    if (error) {
      console.error("Insert error:", error.message);
      alert("Failed to add link: " + error.message);
      return;
    }
    if (data && data[0]) setLinks([...links, data[0]]);
    setShowAdd(false);
    setNewUrl("");
    setNewPlatform("");
    setNewTitle("");
  }

  function handleSaveProfile() {
    setUser((prev) => ({
      ...prev,
      name: editName,
      bio: editBio,
      avatar: editAvatar,
      socials: prev.socials.map((s, i) => ({
        ...s,
        url: editSocials[i] || "#",
      })),
    }));
    setEditProfile(false);
    // TODO: Save to DB
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-10 bg-gradient-to-br from-indigo-50 via-white to-blue-50 min-h-screen w-full">
      <LinkHeader />
      <div className="grid md:grid-cols-2 gap-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <ProfileCard
            user={user}
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            editName={editName}
            setEditName={setEditName}
            editBio={editBio}
            setEditBio={setEditBio}
            editAvatar={editAvatar}
            setEditAvatar={setEditAvatar}
            editSocials={editSocials}
            setEditSocials={setEditSocials}
            handleSaveProfile={handleSaveProfile}
          />
          <AddLinkCard
            showAdd={showAdd}
            setShowAdd={setShowAdd}
            newTitle={newTitle}
            setNewTitle={setNewTitle}
            newUrl={newUrl}
            setNewUrl={setNewUrl}
            newPlatform={newPlatform}
            setNewPlatform={setNewPlatform}
            handleAddLink={handleAddLink}
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <LinksList
            links={links}
            platformIcons={platformIcons}
            colors={colors}
          />
        </motion.div>
      </div>
    </div>
  );
}
