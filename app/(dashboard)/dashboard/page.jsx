"use client";

import { Droplets, Activity, Beaker, Wifi } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatusPill from "@/components/StatusPill";

const humidityData = [
  { time: "00:00", value: 60 },
  { time: "04:00", value: 68 },
  { time: "08:00", value: 63 },
  { time: "12:00", value: 44 },
  { time: "16:00", value: 50 },
  { time: "20:00", value: 62 },
];

const moistureData = [
  { time: "00:00", value: 42 },
  { time: "04:00", value: 45 },
  { time: "08:00", value: 40 },
  { time: "12:00", value: 38 },
  { time: "16:00", value: 41 },
  { time: "20:00", value: 44 },
];

const phData = [
  { time: "00:00", value: 6.55 },
  { time: "04:00", value: 6.6 },
  { time: "08:00", value: 6.4 },
  { time: "12:00", value: 6.45 },
  { time: "16:00", value: 6.55 },
  { time: "20:00", value: 6.7 },
];

const STAT_CARDS = [
  {
    key: "humidity",
    label: "Humidity",
    value: "62",
    unit: "%",
    status: "NORMAL",
    icon: Droplets,
    color: "#2F6B41",
  },
  {
    key: "moisture",
    label: "Soil Moisture",
    value: "44",
    unit: "%",
    status: "NORMAL",
    icon: Activity,
    color: "#2F6B41",
  },
  {
    key: "ph",
    label: "Soil pH",
    value: "6.7",
    unit: "pH",
    status: "NORMAL",
    icon: Beaker,
    color: "#2F6B41",
  },
];

function ChartCard({ title, children }) {
  return (
    <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
      <p className="mb-4 font-display text-lg font-bold text-ink">{title}</p>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Real-Time Monitoring
        </h1>
        <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
          <Wifi size={16} />
          Online (GSM)
        </span>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {STAT_CARDS.map((card) => (
          <div
            key={card.key}
            className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <card.icon size={22} style={{ color: card.color }} />
              <StatusPill status={card.status} />
            </div>
            <p className="mt-3 text-sm text-ink/55">{card.label}</p>
            <p className="mt-1 font-display text-3xl font-bold text-ink">
              {card.value}
              <span className="ml-1 text-base font-medium text-ink/40">{card.unit}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Trend charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
        <ChartCard title="Humidity Trends">
          <LineChart data={humidityData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <YAxis tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ChartCard>

        <ChartCard title="Soil Moisture Trends">
          <AreaChart data={moistureData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <YAxis tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#2F6B41"
              fill="#2F6B41"
              fillOpacity={0.35}
            />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Soil pH Trends">
          <LineChart data={phData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
            <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <YAxis domain={[5, 8]} tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#9333EA"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ChartCard>
      </div>
    </div>
  );
}
