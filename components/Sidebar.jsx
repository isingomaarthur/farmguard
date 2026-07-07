"use client";

import { Sprout, Plus, MessageSquare, Settings, LifeBuoy } from "lucide-react";

const RECENT_CHATS = [
  { id: 1, title: "Tomato leaf yellowing" },
  { id: 2, title: "Best time to sow wheat" },
  { id: 3, title: "Maize market price today" },
  { id: 4, title: "Aphid control on cotton" },
];

export default function Sidebar({ activeChatId, onSelectChat, onNewChat }) {
  return (
    <aside className="hidden md:flex md:w-72 shrink-0 flex-col bg-forest text-cream h-screen sticky top-0">
      {/* Brand */}
      <div className="flex items-center gap-2 px-6 pt-7 pb-5">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-gold text-forest-dark">
          <Sprout size={18} strokeWidth={2.5} />
        </div>
        <span className="font-display text-xl font-semibold tracking-tight">
          Farm Guard
        </span>
      </div>

      {/* New chat */}
      <div className="px-4">
        <button
          onClick={onNewChat}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-cream/15 bg-forest-light/60 px-4 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-forest-light"
        >
          <Plus size={16} />
          New chat
        </button>
      </div>

      {/* Recent */}
      <nav className="mt-6 flex-1 overflow-y-auto px-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-cream/45">
          Recent
        </p>
        <ul className="space-y-1">
          {RECENT_CHATS.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => onSelectChat?.(chat.id)}
                className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                  activeChatId === chat.id
                    ? "bg-cream/10 text-cream"
                    : "text-cream/70 hover:bg-cream/5 hover:text-cream"
                }`}
              >
                <MessageSquare size={15} className="shrink-0" />
                <span className="truncate">{chat.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-cream/10 px-4 py-4 space-y-1">
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-cream/70 transition-colors hover:bg-cream/5 hover:text-cream">
          <Settings size={15} />
          Settings
        </button>
        <button className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm text-cream/70 transition-colors hover:bg-cream/5 hover:text-cream">
          <LifeBuoy size={15} />
          Help &amp; support
        </button>
      </div>
    </aside>
  );
}
