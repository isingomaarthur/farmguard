"use client";

import { Phone, MapPin, Sprout, Bell, Lock, LogOut, ChevronRight } from "lucide-react";

const SETTINGS_ROWS = [
  { label: "Edit Profile", icon: Sprout },
  { label: "Notification Preferences", icon: Bell },
  { label: "Change Password", icon: Lock },
];

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">Profile</h1>

      {/* Identity card */}
      <div className="mt-6 flex flex-col items-center gap-3 rounded-xl2 border border-ink/10 bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left">
        <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-fg-green text-2xl font-bold text-white">
          NM
        </div>
        <div className="flex-1">
          <p className="font-display text-xl font-bold text-ink">Namutebi Grace</p>
          <span className="mt-1 inline-block rounded-full bg-fg-green/10 px-2.5 py-0.5 text-xs font-semibold text-fg-green">
            Farmer
          </span>
          <div className="mt-3 flex flex-col gap-1.5 text-sm text-ink/60 sm:flex-row sm:gap-4">
            <span className="flex items-center justify-center gap-1.5 sm:justify-start">
              <Phone size={14} /> +256 700 123 456
            </span>
            <span className="flex items-center justify-center gap-1.5 sm:justify-start">
              <MapPin size={14} /> Mukono, Uganda
            </span>
          </div>
        </div>
      </div>

      {/* Farm details */}
      <div className="mt-4 rounded-xl2 border border-ink/10 bg-white p-6 shadow-sm">
        <p className="font-display text-lg font-bold text-ink">Farm details</p>
        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <div>
            <p className="text-xs text-ink/45">Farm name</p>
            <p className="mt-0.5 text-sm font-medium text-ink">Green Valley Farm</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Size</p>
            <p className="mt-0.5 text-sm font-medium text-ink">4.5 acres</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Primary crop</p>
            <p className="mt-0.5 text-sm font-medium text-ink">Maize &amp; Beans</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Sensor nodes</p>
            <p className="mt-0.5 text-sm font-medium text-ink">5 active</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">GSM connection</p>
            <p className="mt-0.5 text-sm font-medium text-green-700">Online</p>
          </div>
          <div>
            <p className="text-xs text-ink/45">Joined</p>
            <p className="mt-0.5 text-sm font-medium text-ink">March 2025</p>
          </div>
        </div>
      </div>

      {/* Settings list */}
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
        <button className="flex w-full items-center gap-3 px-5 py-4 text-left text-fg-critical transition-colors hover:bg-fg-critical/5">
          <LogOut size={18} />
          <span className="flex-1 text-sm font-medium">Log Out</span>
        </button>
      </div>
    </div>
  );
}
