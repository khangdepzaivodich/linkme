"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getUser();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-black text-white shadow-lg">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-wide">LinkMe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-lg font-medium">
          <Link
            href="/features"
            className="transition-colors hover:text-gray-400"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="transition-colors hover:text-gray-400"
          >
            Pricing
          </Link>
          <Link href="/about" className="transition-colors hover:text-gray-400">
            About
          </Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {!user ? (
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-gray-800"
              >
                <Link href="/auth/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="bg-white text-black hover:bg-gray-200"
              >
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="hidden md:block text-white hover:bg-gray-800"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white"
            aria-label="Open Menu"
            onClick={toggleMenu}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden bg-black text-white p-4">
          <Link href="/features" className="block py-2 hover:text-gray-400">
            Features
          </Link>
          <Link href="/pricing" className="block py-2 hover:text-gray-400">
            Pricing
          </Link>
          <Link href="/about" className="block py-2 hover:text-gray-400">
            About
          </Link>

          {!user ? (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="block w-full text-left py-2 text-white hover:bg-gray-800"
              >
                <Link href="/auth/login">Log in</Link>
              </Button>
              <Button
                size="sm"
                className="block w-full text-left py-2 bg-white text-black hover:bg-gray-200"
              >
                <Link href="/auth/signup">Sign up</Link>
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="block w-full text-left py-2 text-white hover:bg-gray-800"
              onClick={handleLogout}
            >
              Logout
            </Button>
          )}
        </nav>
      )}
    </header>
  );
}
