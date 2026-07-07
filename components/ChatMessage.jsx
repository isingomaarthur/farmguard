"use client";

import { Sprout, User } from "lucide-react";
import WeatherWidget from "./WeatherWidget";
import PriceTable from "./PriceTable";

export default function ChatMessage({ role, content, widget }) {
  const isUser = role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${
          isUser ? "bg-forest text-cream" : "bg-gold/20 text-gold-dark"
        }`}
      >
        {isUser ? <User size={15} /> : <Sprout size={15} />}
      </div>

      <div className={`max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
            isUser
              ? "rounded-tr-sm bg-forest text-cream"
              : "rounded-tl-sm bg-white text-ink shadow-sm"
          }`}
        >
          {content}
        </div>

        {widget === "weather" && <WeatherWidget />}
        {widget === "prices" && <PriceTable />}
      </div>
    </div>
  );
}
