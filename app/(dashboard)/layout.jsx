"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FarmGuardSidebar from "@/components/FarmGuardSidebar";
import FarmGuardTopBar from "@/components/FarmGuardTopBar";
import { useAuth } from "@/lib/auth";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const { getAuth } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const auth = getAuth();
    if (!auth || !auth.token) {
      // Redirect to login if not authenticated
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, [router, getAuth]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-fg-cream">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-fg-green"></div>
          <p className="mt-4 text-ink/70">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-fg-cream">
      <FarmGuardSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-h-screen flex-1 flex-col">
        <FarmGuardTopBar onMenuClick={() => setSidebarOpen((v) => !v)} />
        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
