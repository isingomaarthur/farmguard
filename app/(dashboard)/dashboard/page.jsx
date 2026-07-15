"use client";

import { useState, useEffect } from "react";
import { Droplets, Activity, Beaker, Wifi } from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatusPill from "@/components/StatusPill";
import Logo from "@/components/Logo";
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

  const role = profile?.role || 'admin';

  const STAT_CARDS = role === 'admin' ? [
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
  ] : role === 'farmer' ? [
    {
      key: "sensors",
      label: "Farm sensors",
      value: dashboardData?.stats?.totalSensors ?? "—",
      unit: "",
      status: "MONITORED",
      icon: Droplets,
      color: "#2F6B41",
    },
    {
      key: "activeSensors",
      label: "Active sensors",
      value: dashboardData?.stats?.activeSensors ?? "—",
      unit: "",
      status: "ONLINE",
      icon: Activity,
      color: "#2F6B41",
    },
    {
      key: "alerts",
      label: "Alerts",
      value: dashboardData?.stats?.alertCount ?? "—",
      unit: "",
      status: "ISSUES",
      icon: Beaker,
      color: "#2F6B41",
    },
  ] : role === 'technician' ? [
    {
      key: "totalSensors",
      label: "Total Sensors",
      value: dashboardData?.stats?.totalSensors ?? 6,
      unit: "",
      status: "TRACKED",
      icon: Droplets,
      color: "#2F6B41",
    },
    {
      key: "activeSensors",
      label: "Active",
      value: dashboardData?.stats?.activeSensors ?? 4,
      unit: "",
      status: "ONLINE",
      icon: Activity,
      color: "#2F6B41",
    },
    {
      key: "faultySensors",
      label: "Faulty",
      value: dashboardData?.stats?.faultySensors ?? 1,
      unit: "",
      status: "ALERT",
      icon: Beaker,
      color: "#dc2626",
    },
    {
      key: "offlineSensors",
      label: "Offline",
      value: dashboardData?.stats?.offlineSensors ?? 1,
      unit: "",
      status: "ALERT",
      icon: Wifi,
      color: "#dc2626",
    },
    {
      key: "maintenancePending",
      label: "Pending Maintenance",
      value: dashboardData?.stats?.maintenancePending ?? 2,
      unit: "",
      status: "WARNING",
      icon: Droplets,
      color: "#f59e0b",
    },
  ] : [
    {
      key: "avgMoisture",
      label: "Avg Soil Moisture",
      value: dashboardData?.stats?.avgMoisture ? `${dashboardData.stats.avgMoisture.toFixed(0)}` : 35,
      unit: "%",
      status: "ANALYZED",
      icon: Droplets,
      color: "#2F6B41",
    },
    {
      key: "avgPh",
      label: "Avg Soil pH",
      value: dashboardData?.stats?.avgPh ? dashboardData.stats.avgPh.toFixed(1) : 5.9,
      unit: "",
      status: "STABLE",
      icon: Beaker,
      color: "#2F6B41",
    },
    {
      key: "avgHumidity",
      label: "Avg Humidity",
      value: dashboardData?.stats?.avgHumidity ? `${dashboardData.stats.avgHumidity.toFixed(0)}` : 72,
      unit: "%",
      status: "MONITORED",
      icon: Activity,
      color: "#2F6B41",
    },
  ];

  const renderRoleSection = () => {
    if (!profile || !dashboardData) {
      return null;
    }

    const role = profile.role;

    if (role === 'farmer') {
      return (
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-ink">Farm sensors by status</p>
            <div className="mt-4 space-y-3 text-sm text-ink/70">
              {dashboardData.farmOverview?.sensorsByStatus?.map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <span>{item.status}</span>
                  <span className="font-semibold">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm lg:col-span-2">
            <p className="text-sm font-semibold text-ink">Latest alerts</p>
            <div className="mt-4 space-y-3 text-sm text-ink/70">
              {dashboardData.farmOverview?.currentAlerts?.length ? (
                dashboardData.farmOverview.currentAlerts.map((alert) => (
                  <div key={alert.id} className="rounded-2xl border border-ink/10 bg-ink/5 p-4">
                    <p className="font-semibold text-ink">{alert.title}</p>
                    <p className="mt-1 text-xs text-ink/60">{alert.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-ink/50">No alerts found for this farm yet.</p>
              )}
            </div>
          </div>
          <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm lg:col-span-3">
            <p className="text-sm font-semibold text-ink">Recent readings</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-left text-sm text-ink/75">
                <thead className="border-b border-ink/10 text-ink/60">
                  <tr>
                    <th className="px-3 py-2">Node</th>
                    <th className="px-3 py-2">Type</th>
                    <th className="px-3 py-2">Value</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.farmOverview?.recentReadings?.map((reading, index) => (
                    <tr key={`${reading.nodeId}-${index}`} className="border-b border-ink/10">
                      <td className="px-3 py-3">{reading.node_id || reading.nodeId}</td>
                      <td className="px-3 py-3">{reading.sensor_type || reading.sensorType}</td>
                      <td className="px-3 py-3">{reading.value} {reading.unit}</td>
                      <td className="px-3 py-3">{reading.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }

    if (role === 'technician') {
      return (
        <div className="mt-6 space-y-6">
          {/* Additional stat cards for technician */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
              <p className="text-sm text-ink/55">Faulty</p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">
                {dashboardData?.stats?.faultySensors ?? 1}
              </p>
            </div>
            <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
              <p className="text-sm text-ink/55">Offline</p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">
                {dashboardData?.stats?.offlineSensors ?? 1}
              </p>
            </div>
            <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm sm:col-span-2">
              <p className="text-sm text-ink/55">Pending Maintenance</p>
              <p className="mt-1 font-display text-3xl font-bold text-ink">
                {dashboardData?.stats?.maintenancePending ?? 2}
              </p>
            </div>
          </div>

          {/* Recent Faults and Scheduled Maintenance */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
              <p className="font-semibold text-ink">Recent Faults</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg border border-ink/10 bg-ink/5 p-4">
                  <p className="font-semibold text-ink">SM-002</p>
                  <p className="mt-1 text-xs text-ink/60">Soil Moisture</p>
                  <span className="mt-2 inline-block rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                    Faulty
                  </span>
                </div>
                <div className="rounded-lg border border-ink/10 bg-ink/5 p-4">
                  <p className="font-semibold text-ink">HM-002</p>
                  <p className="mt-1 text-xs text-ink/60">Humidity</p>
                  <span className="mt-2 inline-block rounded-full bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
                    Offline
                  </span>
                </div>
              </div>
            </div>
            <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
              <p className="font-semibold text-ink">Scheduled Maintenance</p>
              <div className="mt-4 space-y-3">
                <div className="rounded-lg border border-ink/10 bg-ink/5 p-4">
                  <p className="font-semibold text-ink">Sensor: SM-002</p>
                  <p className="mt-1 text-xs text-ink/60">Repair • 2026-07-20</p>
                  <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                    Scheduled
                  </span>
                </div>
                <div className="rounded-lg border border-ink/10 bg-ink/5 p-4">
                  <p className="font-semibold text-ink">Sensor: HM-002</p>
                  <p className="mt-1 text-xs text-ink/60">Inspection • 2026-07-18</p>
                  <span className="mt-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (role === 'agronomist') {
      const farmHealthData = [
        { name: 'Moisture', value: 35 },
        { name: 'pH', value: 59 },
        { name: 'Humidity', value: 72 },
      ];

      return (
        <div className="mt-6 space-y-6">
          {/* Farm Health Overview Chart */}
          <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
            <p className="font-semibold text-ink">Farm Health Overview</p>
            <div className="mt-4 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={farmHealthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#7a7a70" }} />
                  <YAxis tick={{ fontSize: 11, fill: "#7a7a70" }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2F6B41" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pending Recommendations */}
          <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
            <p className="font-semibold text-ink">Pending Recommendations</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">💧</div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink">Increase Irrigation Frequency</p>
                    <p className="mt-1 text-xs text-ink/60">
                      Soil moisture is below the optimal threshold of 40%. Increase irrigation to twice daily during morning and evening hours.
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-green-200 px-2 py-1 text-xs font-semibold text-green-800">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🧂</div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink">Apply Agricultural Lime</p>
                    <p className="mt-1 text-xs text-ink/60">
                      The soil pH is acidic at 5.2. Apply agricultural lime at 2 tons per hectare to raise pH to optimal range of 6.0-7.0.
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-green-200 px-2 py-1 text-xs font-semibold text-green-800">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="text-2xl">🍄</div>
                  <div className="flex-1">
                    <p className="font-semibold text-ink">Fungal Disease Prevention</p>
                    <p className="mt-1 text-xs text-ink/60">
                      Humidity levels are elevated at 72%. Monitor for fungal infections and consider preventative fungicide applications.
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-green-200 px-2 py-1 text-xs font-semibold text-green-800">
                      High Priority
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4">
          <Logo variant="small" alt="Farm Guard" />
          <div>
            <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
              Welcome back, {profile?.name || "Farmer"}
            </h1>
            <p className="mt-1 text-sm text-ink/60">
              {profile?.farmName ? `Monitoring ${profile.farmName}` : "Secure dashboard access"}
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 text-sm font-medium text-green-700">
          <Wifi size={16} />
          Online (GSM)
        </span>
      </div>

      {/* Stat cards */}
      <div className={`mt-6 grid gap-4 ${role === 'technician' ? 'sm:grid-cols-2 lg:grid-cols-5' : 'sm:grid-cols-3'}`}>
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

      {renderRoleSection()}

      {/* Trend charts - only for farmer role */}
      {role === 'farmer' && (
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
      )}
    </div>
  );
}
