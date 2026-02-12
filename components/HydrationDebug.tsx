"use client";
// This file is for debugging hydration issues in Next.js
// It will log when the component mounts and what is rendered
import { useEffect } from "react";

export default function HydrationDebug({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("[HydrationDebug] Mounted on client");
    }
  }, []);
  return <>{children}</>;
}
