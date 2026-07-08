"use client";

import { useState, useEffect } from "react";
import { Download, ChevronDown } from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { reportAPI } from "@/lib/api";

const DEFAULT_SUMMARY_CARDS = [
  { label: "Average Humidity", value: "57.1%", tone: "text-green-700", bg: "bg-green-600/10" },
  { label: "Average Soil Moisture", value: "44.1%", tone: "text-blue-700", bg: "bg-blue-600/10" },
  { label: "Average pH Level", value: "6.7", tone: "text-purple-700", bg: "bg-purple-600/10" },
  { label: "Total Alerts", value: "56", tone: "text-fg-warning", bg: "bg-fg-warning/10" },
];

const WEEKLY_DATA = [
  { day: "Mon", humidity: 58, moisture: 42, ph: 6.4 },
  { day: "Tue", humidity: 62, moisture: 45, ph: 6.5 },
  { day: "Wed", humidity: 55, moisture: 40, ph: 6.6 },
  { day: "Thu", humidity: 60, moisture: 43, ph: 6.7 },
  { day: "Fri", humidity: 57, moisture: 46, ph: 6.6 },
  { day: "Sat", humidity: 64, moisture: 44, ph: 6.8 },
  { day: "Sun", humidity: 53, moisture: 41, ph: 6.5 },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("week");
  const [summaryCards, setSummaryCards] = useState(DEFAULT_SUMMARY_CARDS);
  const [weeklyData, setWeeklyData] = useState(WEEKLY_DATA);
  const [alertDistribution, setAlertDistribution] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        
        // Fetch report data for the selected period
        const reportData = await reportAPI.getReportData(period);
        if (reportData?.summaryCards) {
          setSummaryCards(reportData.summaryCards);
        }

        // Fetch daily trends
        const trendsData = await reportAPI.getDailyTrends();
        if (Array.isArray(trendsData)) {
          setWeeklyData(trendsData);
        }

        // Fetch alert distribution
        const distributionData = await reportAPI.getAlertDistribution();
        if (Array.isArray(distributionData)) {
          setAlertDistribution(distributionData);
        }
      } catch (error) {
        console.error("Error fetching report data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [period]);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
          Data Visualization &amp; Reports
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <select
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              className="appearance-none rounded-lg border border-ink/15 bg-white py-2 pl-3 pr-9 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-fg-green/30"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last 3 Months</option>
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
            />
          </div>
          <button className="flex items-center gap-2 rounded-lg bg-fg-green px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-fg-green-dark">
            <Download size={16} />
            Export PDF
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className={`rounded-xl2 border border-ink/10 p-5 shadow-sm ${card.bg}`}
          >
            <p className="text-sm text-ink/60">{card.label}</p>
            <p className={`mt-1 font-display text-2xl font-bold ${card.tone} sm:text-3xl`}>
              {card.value}
            </p>
            <p className="mt-1 text-xs text-ink/40">This week</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
          <p className="mb-4 font-display text-lg font-bold text-ink">Weekly Sensor Overview</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e0" />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#7a7a70" }} />
                <YAxis tick={{ fontSize: 11, fill: "#7a7a70" }} />
                <Tooltip />
                <Legend
                  wrapperStyle={{ fontSize: 12 }}
                  formatter={(value) =>
                    ({ humidity: "Avg Humidity (%)", moisture: "Avg Moisture (%)", ph: "Avg pH" }[
                      value
                    ] || value)
                  }
                />
                <Bar dataKey="humidity" fill="#3B82F6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="moisture" fill="#22C55E" radius={[3, 3, 0, 0]} />
                <Bar dataKey="ph" fill="#9333EA" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-xl2 border border-ink/10 bg-white p-5 shadow-sm">
          <p className="mb-4 font-display text-lg font-bold text-ink">Alert Distribution</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={alertDistribution}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={0}
                  outerRadius={95}
                  label={({ name, value }) => `${name} ${value}%`}
                >
                  {alertDistribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
