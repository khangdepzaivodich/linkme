"use client";

import { useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
export default function SignInWithGithub() {
  const handleSignIn = useCallback(async () => {
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    });

    if (error) {
      console.error("OAuth login error:", error.message);
      alert("GitHub sign-in failed. Check the console for details.");
    }
  }, []);

  return (
    <Button
      onClick={handleSignIn}
      variant="outline"
      className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 transition rounded-full px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300"
    >
      <FaGithub size={16} />
      Sign in with GitHub
    </Button>
  );
}
