"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, MapPin, Sprout, Bell, Lock, LogOut, ChevronRight } from "lucide-react";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";

const SETTINGS_ROWS = [
  { label: "Edit Profile", icon: Sprout },
  { label: "Notification Preferences", icon: Bell },
  { label: "Change Password", icon: Lock },
];

export default function ProfilePage() {
  const router = useRouter();
  const { clearAuth } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        setUser(response.user);
      } catch (error) {
        console.error("Failed to load profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout failed", error);
    } finally {
      clearAuth();
      router.push("/login");
    }
  };

  const initials = user?.name?.split(" ").slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "U";

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Profile</h1>

      <div className="mt-6 flex flex-col items-center gap-3 rounded-xl2 border border-ink/10 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-fg-green text-2xl font-bold text-white">
          {loading ? "..." : initials}
        </div>
        <div className="flex-1">
          <p className="font-display text-xl font-bold text-ink">{loading ? "Loading profile..." : user?.name || "User"}</p>
          <span className="mt-1 inline-block rounded-full bg-fg-green/10 px-2.5 py-0.5 text-xs font-semibold text-fg-green">
            {user?.role || "Farmer"}
          </span>
          <div className="mt-3 flex flex-col gap-1.5 text-sm text-ink/60 sm:flex-row sm:gap-4">
            <span className="flex items-center justify-center gap-1.5 sm:justify-start">
              <Phone size={14} /> {user?.email || "user@farmguard.local"}
            </span>
            <span className="flex items-center justify-center gap-1.5 sm:justify-start">
              <MapPin size={14} /> {user?.farmName || "FarmGuard"}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm">
        <p className="font-display text-lg font-bold text-ink">Farm details</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-ink/45">Farm name</p>
            <p className="mt-0.5 text-sm font-medium text-ink">{user?.farmName || "My Farm"}</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Account role</p>
            <p className="mt-0.5 text-sm font-medium text-ink">{user?.role || "Farmer"}</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Status</p>
            <p className="mt-0.5 text-sm font-medium text-green-700">Active</p>
          </div>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl2 border border-ink/10 bg-white shadow-sm">
        {SETTINGS_ROWS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            className="flex w-full items-center gap-3 border-b border-ink/10 px-5 py-4 text-left transition-colors last:border-b-0 hover:bg-ink/[0.03]"
          >
            <Icon size={18} className="text-ink/50" />
            <span className="flex-1 text-sm font-medium text-ink">{label}</span>
            <ChevronRight size={16} className="text-ink/30" />
          </button>
        ))}
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-5 py-4 text-left text-fg-critical transition-colors hover:bg-fg-critical/5"
        >
          <LogOut size={18} />
          <span className="flex-1 text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
