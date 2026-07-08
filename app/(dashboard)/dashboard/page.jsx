"use client";

import { useState, useEffect } from "react";
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
import { authAPI, dashboardAPI } from "@/lib/api";

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
  const [profile, setProfile] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [readings, setReadings] = useState({
    humidity: { value: "62", unit: "%" },
    moisture: { value: "44", unit: "%" },
    ph: { value: "6.7", unit: "pH" },
  });

  const [trends, setTrends] = useState([
    { day: "Mon", humidity: 58, moisture: 42, ph: 6.4 },
    { day: "Tue", humidity: 62, moisture: 45, ph: 6.5 },
    { day: "Wed", humidity: 55, moisture: 40, ph: 6.6 },
    { day: "Thu", humidity: 60, moisture: 43, ph: 6.7 },
    { day: "Fri", humidity: 57, moisture: 46, ph: 6.6 },
    { day: "Sat", humidity: 64, moisture: 44, ph: 6.8 },
    { day: "Sun", humidity: 53, moisture: 41, ph: 6.5 },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, dashboardResponse] = await Promise.all([
          authAPI.getCurrentUser(),
          dashboardAPI.getDashboard(),
        ]);

        setProfile(profileResponse.user);
        setDashboardData(dashboardResponse.dashboard);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const STAT_CARDS = [
    {
      key: "users",
      label: "Total users",
      value: dashboardData?.stats?.totalUsers ?? "—",
      unit: "",
      status: "ACTIVE",
      icon: Droplets,
      color: "#2F6B41",
    },
    {
      key: "active",
      label: "Active users",
      value: dashboardData?.stats?.activeUsers ?? "—",
      unit: "",
      status: "ONLINE",
      icon: Activity,
      color: "#2F6B41",
    },
    {
      key: "recent",
      label: "Recent signups",
      value: dashboardData?.stats?.recentUsers ?? "—",
      unit: "",
      status: "NEW",
      icon: Beaker,
      color: "#2F6B41",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Welcome back, {profile?.name || "Farmer"}
          </h1>
          <p className="mt-1 text-sm text-ink/60">
            {profile?.farmName ? `Monitoring ${profile.farmName}` : "Secure dashboard access"}
          </p>
        </div>
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
          <LineChart data={trends} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <YAxis tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="humidity"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ChartCard>

        <ChartCard title="Soil Moisture Trends">
          <AreaChart data={trends} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <YAxis tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="moisture"
              stroke="#2F6B41"
              fill="#2F6B41"
              fillOpacity={0.35}
            />
          </AreaChart>
        </ChartCard>

        <ChartCard title="Soil pH Trends">
          <LineChart data={trends} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
            <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <YAxis domain={[5, 8]} tick={{ fontSize: 11, fill: "#7a7a70" }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ph"
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
