"use client";

import { useState } from "react";
import { CloudSun, LineChart, Bug, Landmark } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import ChatInput from "@/components/ChatInput";
import ChatMessage from "@/components/ChatMessage";
import QuickActionCard from "@/components/QuickActionCard";

const QUICK_ACTIONS = [
  {
    key: "weather",
    icon: CloudSun,
    title: "Weather forecast",
    description: "4-day outlook for your field",
    accent: "#4F86A0",
    prompt: "What's the weather forecast for my farm this week?",
  },
  {
    key: "prices",
    icon: LineChart,
    title: "Crop prices",
    description: "Today's rates at nearby markets",
    accent: "#D9A441",
    prompt: "What are today's market prices for maize and beans?",
  },
  {
    key: "pests",
    icon: Bug,
    title: "Pest control",
    description: "Identify and treat crop damage",
    accent: "#B5651D",
    prompt: "My cotton leaves have small holes — what pest is this?",
  },
  {
    key: "schemes",
    icon: Landmark,
    title: "Government schemes",
    description: "Subsidies and support you qualify for",
    accent: "#1F3D2B",
    prompt: "What government schemes can help me buy a new tractor?",
  },
];

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);

  function respondTo(text) {
    const lower = text.toLowerCase();
    let widget;
    let reply =
      "Thanks — here's what I found for your farm based on the latest field data.";

    if (lower.includes("weather") || lower.includes("rain") || lower.includes("forecast")) {
      widget = "weather";
      reply = "Here's the outlook for your area over the next few days.";
    } else if (lower.includes("price") || lower.includes("market") || lower.includes("sell")) {
      widget = "prices";
      reply = "Here are today's indicative prices from nearby markets.";
    } else if (lower.includes("pest") || lower.includes("leaves") || lower.includes("bug")) {
      reply =
        "That pattern is consistent with aphid or leafhopper damage. Inspect the undersides of leaves — if you see clusters of small insects, a neem-oil spray applied in the early morning is a safe first step.";
    } else if (lower.includes("scheme") || lower.includes("subsidy") || lower.includes("tractor")) {
      reply =
        "A few schemes could apply depending on your district: the Parish Development Model input grants and the Agricultural Credit Facility for equipment financing. I can help you check eligibility.";
    }

    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, role: "user", content: text },
      { id: prev.length + 2, role: "assistant", content: reply, widget },
    ]);
  }

  function handleNewChat() {
    setMessages([]);
    setActiveChatId(null);
  }

  const hasConversation = messages.length > 0;

  return (
    <div className="flex min-h-screen bg-cream">
      <Sidebar
        activeChatId={activeChatId}
        onSelectChat={setActiveChatId}
        onNewChat={handleNewChat}
      />

      <main className="flex flex-1 flex-col">
        {!hasConversation ? (
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-6 py-10">
            <div className="text-center">
              <p className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                {greeting()}, Farmer!
              </p>
              <p className="mt-2 text-ink/55">
                How can I help you with your farm today?
              </p>
            </div>

            <div className="mt-8">
              <ChatInput onSend={respondTo} />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {QUICK_ACTIONS.map((action) => (
                <QuickActionCard
                  key={action.key}
                  icon={action.icon}
                  title={action.title}
                  description={action.description}
                  accent={action.accent}
                  onClick={() => respondTo(action.prompt)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-1 flex-col">
            <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-5 overflow-y-auto px-6 py-8">
              {messages.map((m) => (
                <ChatMessage
                  key={m.id}
                  role={m.role}
                  content={m.content}
                  widget={m.widget}
                />
              ))}
            </div>
            <div className="mx-auto w-full max-w-3xl px-6 pb-6">
              <ChatInput onSend={respondTo} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
