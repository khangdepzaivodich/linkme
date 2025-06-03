"use client";

import Link from "next/link";
import { login } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import SignInWithGithub from "@/components/SignInWIthGithub";
export default function LoginPage() {
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
            Sign In
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Welcome back. Please enter your credentials.
          </p>
        </div>

        <form className="space-y-6">
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

          <Button
            formAction={login}
            className="w-full rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition font-semibold text-base py-3"
          >
            Log In
          </Button>
        </form>
        <SignInWithGithub />
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-blue-600 underline underline-offset-4 hover:text-blue-500"
          >
            Sign up
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
