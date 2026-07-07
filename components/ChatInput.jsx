"use client";

import { useState } from "react";
import { ArrowUp, Mic } from "lucide-react";

export default function ChatInput({ onSend, placeholder }) {
  const [value, setValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend?.(trimmed);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 rounded-2xl border border-ink/10 bg-white px-4 py-3 shadow-sm focus-within:border-gold/60 focus-within:ring-2 focus-within:ring-gold/20"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        type="text"
        placeholder={placeholder || "Ask about crops, weather, pests, market prices..."}
        className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink/40 focus:outline-none"
      />
      <button
        type="button"
        aria-label="Use voice input"
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-ink/45 transition-colors hover:bg-ink/5 hover:text-ink/70"
      >
        <Mic size={17} />
      </button>
      <button
        type="submit"
        aria-label="Send message"
        disabled={!value.trim()}
        className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-cream transition-colors hover:bg-forest-light disabled:opacity-40"
      >
        <ArrowUp size={17} />
      </button>
    </form>
  );
}
