"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export default function ClientHeader() {
  const pathname = usePathname();
  if (pathname.startsWith("/dashboard")) return null;
  return <Header />;
}
