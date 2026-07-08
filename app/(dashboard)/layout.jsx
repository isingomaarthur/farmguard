"use client";

import { useState } from "react";
import FarmGuardSidebar from "@/components/FarmGuardSidebar";
import FarmGuardTopBar from "@/components/FarmGuardTopBar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
