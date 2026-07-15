"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Wifi, LogOut, User } from "lucide-react";
import Logo from "@/components/Logo";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

export default function FarmGuardTopBar({ onMenuClick, online = true }) {
  const router = useRouter();
  const { getAuth, clearAuth } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const auth = getAuth();
  const user = auth?.user;

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-fg-green px-4 py-4 text-white sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Toggle navigation"
          className="rounded-md p-1 transition-colors hover:bg-white/10 md:hidden"
        >
          <Menu size={22} />
        </button>
        <div className="hidden h-8 w-8 items-center justify-center rounded bg-white sm:flex">
          <Logo variant="small" alt="Farm Guard" />
        </div>
        <span className="font-display text-lg font-bold sm:text-xl">Farm Guard Uganda</span>
      </div>

      <div className="flex items-center gap-4">
        <div
          className="grid h-9 w-9 place-items-center rounded-full bg-white/10"
          title={online ? "Online (GSM)" : "Offline"}
        >
          <Wifi size={18} className={online ? "text-white" : "text-white/40"} />
        </div>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 hover:bg-white/20 transition"
          >
            <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium hidden sm:inline truncate max-w-xs">
              {user?.name || "User"}
            </span>
          </button>

          {/* Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-white/20 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <p className="font-semibold text-gray-900 text-sm">{user?.name || "User"}</p>
                <p className="text-xs text-gray-600">{user?.email || "user@farmguard.local"}</p>
                {user?.farmName && (
                  <p className="text-xs text-gray-500 mt-1">{user.farmName}</p>
                )}
              </div>
              
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  router.push("/profile");
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm flex items-center gap-2 transition"
              >
                <User size={16} />
                Profile
              </button>

              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 text-sm flex items-center gap-2 transition border-t border-gray-200"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
