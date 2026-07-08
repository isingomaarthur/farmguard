"use client";

import { AlertTriangle, AlertCircle, Info, Bell } from "lucide-react";
import StatusPill from "@/components/StatusPill";

const ALERTS = [
  {
    id: 1,
    title: "Low Soil Moisture",
    status: "CRITICAL",
    message: "Soil moisture has dropped below 40%. Immediate irrigation recommended.",
    time: "2 min ago",
    icon: AlertTriangle,
    color: "text-fg-critical",
  },
  {
    id: 2,
    title: "Soil pH Low",
    status: "WARNING",
    message: "pH level is at 6.3. Consider adding lime to raise soil pH.",
    time: "12 min ago",
    icon: AlertCircle,
    color: "text-fg-warning",
  },
  {
    id: 3,
    title: "Low Humidity Alert",
    status: "WARNING",
    message: "Humidity has dropped to 45%. Consider adjusting irrigation.",
    time: "15 min ago",
    icon: AlertCircle,
    color: "text-fg-warning",
  },
  {
    id: 4,
    title: "Humidity Levels Normal",
    status: "INFO",
    message: "Humidity levels have returned to optimal range.",
    time: "1 hour ago",
    icon: Info,
    color: "text-fg-info",
  },
];

export default function AlertsPage() {
  const unreadCount = 3;

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
        {ALERTS.map((alert) => (
          <div key={alert.id} className="flex gap-4 px-5 py-5 sm:px-6">
            <alert.icon size={22} className={`mt-0.5 shrink-0 ${alert.color}`} />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-display text-base font-semibold text-ink">
                  {alert.title}
                </p>
                <StatusPill status={alert.status} />
              </div>
              <p className="mt-1 text-sm text-ink/65">{alert.message}</p>
              <p className="mt-2 text-xs text-ink/40">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
