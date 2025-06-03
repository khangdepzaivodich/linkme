"use client";
import { useState } from "react";
import Link from "next/link";
import { signup } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import SignInWithGithub from "@/components/SignInWIthGithub";

export default function SignupPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);

    try {
      const { error } = await signup(formData);
      if (error) {
        setErrorMessage(error.message);
      }
    } catch (error: any) {
      if (error.message === "NEXT_REDIRECT") {
        throw error;
      } else {
        console.error("Signup failed:", error);
        setErrorMessage(error.message || "An unexpected error occurred.");
      }
    } finally {
      if (errorMessage !== "NEXT_REDIRECT") {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f0f2f5] to-[#d9e2ec] dark:from-gray-950 dark:to-gray-900 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md space-y-6 rounded-3xl bg-white/80 backdrop-blur-md p-10 shadow-xl ring-1 ring-gray-300 dark:bg-gray-900/70 dark:ring-gray-800"
      >
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Create Account
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="rounded-xl border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm text-gray-700 dark:text-gray-300"
            >
              Password
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="rounded-xl border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition"
            />
          </div>

          {errorMessage && (
            <div className="text-red-500 text-sm text-center">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit" // Change to type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-semibold text-base py-3"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </Button>
        </form>
        <SignInWithGithub />
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-500"
          >
            Log in
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
