"use client";

import { useState, useEffect } from "react";
import { AlertTriangle, AlertCircle, Info, Bell } from "lucide-react";
import StatusPill from "@/components/StatusPill";
import { alertAPI } from "@/lib/api";

const ICON_MAP = {
  "low_moisture": AlertTriangle,
  "low_ph": AlertCircle,
  "low_humidity": AlertCircle,
  "high_humidity": AlertCircle,
  "temperature_alert": AlertCircle,
  "system_alert": AlertTriangle,
};

const COLOR_MAP = {
  "CRITICAL": "text-fg-critical",
  "WARNING": "text-fg-warning",
  "INFO": "text-fg-info",
  "NORMAL": "text-green-600",
};

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await alertAPI.getAlerts({ isRead: "false", limit: 100 });
        if (response.alerts) {
          setAlerts(response.alerts);
          setUnreadCount(response.alerts.filter(a => !a.isRead).length);
        }
      } catch (error) {
        console.error("Error fetching alerts:", error);
        // Set default alerts on error
        setAlerts([
          {
            _id: "1",
            title: "Low Soil Moisture",
            status: "CRITICAL",
            message: "Soil moisture has dropped below 40%. Immediate irrigation recommended.",
            createdAt: new Date(),
            type: "low_moisture",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
    // Refresh every 30 seconds
    const interval = setInterval(fetchAlerts, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (date) => {
    const now = new Date();
    const diffMs = now - new Date(date);
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">
            Alerts &amp; Notifications
          </h1>
          <p className="mt-1 text-sm text-ink/55">{unreadCount} unread alerts</p>
        </div>
        <button
          aria-label="Notifications"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-fg-green text-white shadow-sm transition-transform hover:scale-105"
        >
          <Bell size={19} />
        </button>
      </div>

      <div className="mt-6 divide-y divide-ink/10 overflow-hidden rounded-xl2 border border-ink/10 bg-white shadow-sm">
        {alerts.length === 0 ? (
          <div className="px-5 py-12 text-center text-ink/55">
            <p>No alerts yet. Your farm is running smoothly!</p>
          </div>
        ) : (
          alerts.map((alert) => {
            const IconComponent = ICON_MAP[alert.type] || AlertTriangle;
            const colorClass = COLOR_MAP[alert.status] || "text-ink/60";

            return (
              <div key={alert._id} className="flex gap-4 px-5 py-5 sm:px-6">
                <IconComponent size={22} className={`mt-0.5 shrink-0 ${colorClass}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-display text-base font-semibold text-ink">
                      {alert.title}
                    </p>
                    <StatusPill status={alert.status} />
                  </div>
                  <p className="mt-1 text-sm text-ink/65">{alert.message}</p>
                  <p className="mt-2 text-xs text-ink/40">{getTimeAgo(alert.createdAt)}</p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
