"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Building2, Users, Wrench, Sprout, Wifi, AlertTriangle, TrendingUp } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { dashboardAPI, userAPI } from "@/lib/api";
import {
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

function StatCard({ label, value, icon: Icon, color, status }) {
  return (
    <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <Icon size={22} style={{ color }} />
        <StatusPill status={status} />
      </div>
      <p className="mt-3 text-sm text-ink/55">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold text-ink">{value}</p>
    </div>
  );
}

export default function AdminPage() {
  const router = useRouter();
  const { getAuth } = useAuth();
  const [auth, setAuth] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const session = getAuth();
    if (!session?.token) {
      router.push("/login");
      return;
    }

    if (session.user.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    setAuth(session);

    const fetchData = async () => {
      try {
        const [dashResponse, usersResponse] = await Promise.all([
          dashboardAPI.getDashboard(),
          userAPI.getAllUsers(),
        ]);
        setDashboardData(dashResponse.dashboard);
        setUsers(usersResponse.users || []);
      } catch (err) {
        setError(err.message || "Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getAuth, router]);

  // Calculate role counts
  const farmerCount = users.filter(u => u.role === 'farmer').length;
  const technicianCount = users.filter(u => u.role === 'technician').length;
  const agronomistCount = users.filter(u => u.role === 'agronomist').length;

  // Chart data for Users by Role
  const roleChartData = [
    { name: 'Farmers', value: farmerCount },
    { name: 'Technicians', value: technicianCount },
    { name: 'Agronomists', value: agronomistCount },
  ];

  // Sample alerts
  const recentAlerts = [
    { id: 1, title: "Low Soil Moisture", zone: "Field A", severity: "warning" },
    { id: 2, title: "Acidic Soil pH", zone: "Orchard B", severity: "critical" },
    { id: 3, title: "Sensor Offline", zone: "Highland Farm", severity: "critical" },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-col gap-2">
        <h1 className="font-display text-3xl font-bold text-ink">Admin Dashboard</h1>
        <p className="text-sm text-ink/60">System-wide overview and management</p>
      </div>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard 
          label="Total Farms" 
          value={users.length || 0}
          icon={Building2}
          color="#2F6B41"
          status="ACTIVE"
        />
        <StatCard 
          label="Farmers" 
          value={farmerCount}
          icon={Users}
          color="#2F6B41"
          status="ACTIVE"
        />
        <StatCard 
          label="Technicians" 
          value={technicianCount}
          icon={Wrench}
          color="#2F6B41"
          status="ACTIVE"
        />
        <StatCard 
          label="Agronomists" 
          value={agronomistCount}
          icon={Sprout}
          color="#2F6B41"
          status="ACTIVE"
        />
        <StatCard 
          label="Total Sensors" 
          value={dashboardData?.stats?.totalSensors || 0}
          icon={TrendingUp}
          color="#2F6B41"
          status="MONITORED"
        />
      </div>

      {/* More metrics */}
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard 
          label="Active Sensors" 
          value={dashboardData?.stats?.activeSensors || 0}
          icon={TrendingUp}
          color="#2F6B41"
          status="ONLINE"
        />
        <StatCard 
          label="Faulty Sensors" 
          value={dashboardData?.stats?.faultySensors || 0}
          icon={AlertTriangle}
          color="#dc2626"
          status="ALERT"
        />
        <StatCard 
          label="Active Alerts" 
          value={dashboardData?.stats?.alertCount || 0}
          icon={AlertTriangle}
          color="#f59e0b"
          status="ALERT"
        />
      </div>

      {/* Chart and Alerts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm lg:col-span-1">
          <p className="mb-4 font-display text-lg font-bold text-ink">Users by Role</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={roleChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#7a7a70" }} />
                <YAxis tick={{ fontSize: 11, fill: "#7a7a70" }} />
                <Tooltip />
                <Bar dataKey="value" fill="#2F6B41" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl border border-ink/10 bg-white p-5 shadow-sm lg:col-span-2">
          <p className="font-display text-lg font-bold text-ink">Recent Alerts</p>
          <div className="mt-4 space-y-3">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="rounded-lg border border-ink/10 bg-ink/5 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{alert.title}</p>
                    <p className="mt-1 text-xs text-ink/60">{alert.zone}</p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    alert.severity === 'critical' 
                      ? 'bg-red-100 text-red-700' 
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {alert.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
