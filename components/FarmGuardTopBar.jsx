"use client";

import { Menu, Wifi } from "lucide-react";

export default function FarmGuardTopBar({ onMenuClick, online = true }) {
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
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-fg-green" fill="none">
            <path
              d="M4 11.5 12 5l8 6.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 10.5V19a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-8.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="font-display text-lg font-bold sm:text-xl">Farm Guard Uganda</span>
      </div>

      <div
        className="grid h-9 w-9 place-items-center rounded-full bg-white/10"
        title={online ? "Online (GSM)" : "Offline"}
      >
        <Wifi size={18} className={online ? "text-white" : "text-white/40"} />
      </div>
    </header>
  );
}
