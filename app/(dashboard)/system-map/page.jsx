"use client";

import { useState, useEffect } from "react";
import { MapPin, Droplets, Activity, Beaker } from "lucide-react";
import StatusPill from "@/components/StatusPill";
import { nodeAPI } from "@/lib/api";

const STATUS_DOT = {
  NORMAL: "bg-green-600",
  WARNING: "bg-fg-warning",
  CRITICAL: "bg-fg-critical",
};

const TYPE_ICON = {
  "Soil Moisture": Activity,
  "Soil pH": Beaker,
  Humidity: Droplets,
};

export default function SystemMapPage() {
  const [nodes, setNodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await nodeAPI.getAllNodes();
        if (Array.isArray(data)) {
          setNodes(data);
        }
      } catch (error) {
        console.error("Error fetching nodes:", error);
        // Set default nodes on error
        setNodes([
          { id: "N1", zone: "North Field", x: 22, y: 28, status: "NORMAL", type: "Soil Moisture" },
          { id: "N2", zone: "East Field", x: 68, y: 22, status: "WARNING", type: "Soil pH" },
          { id: "N3", zone: "South Field", x: 40, y: 62, status: "CRITICAL", type: "Soil Moisture" },
          { id: "N4", zone: "West Field", x: 78, y: 70, status: "NORMAL", type: "Humidity" },
          { id: "N5", zone: "Greenhouse", x: 15, y: 75, status: "NORMAL", type: "Humidity" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
    // Refresh every 30 seconds
    const interval = setInterval(fetchNodes, 30000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-2xl font-bold text-ink sm:text-3xl">System Map</h1>
      <p className="mt-1 text-sm text-ink/55">
        Sensor node locations across your farm plots
      </p>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Map */}
        <div className="relative overflow-hidden rounded-xl2 border border-ink/10 bg-white p-2 shadow-sm">
          <div className="relative h-[420px] w-full overflow-hidden rounded-lg bg-[linear-gradient(0deg,transparent_24%,rgba(47,107,65,0.08)_25%,rgba(47,107,65,0.08)_26%,transparent_27%,transparent_74%,rgba(47,107,65,0.08)_75%,rgba(47,107,65,0.08)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(47,107,65,0.08)_25%,rgba(47,107,65,0.08)_26%,transparent_27%,transparent_74%,rgba(47,107,65,0.08)_75%,rgba(47,107,65,0.08)_76%,transparent_77%,transparent)] bg-[length:25%_25%] bg-fg-cream">
            {nodes.map((node) => {
              const Icon = TYPE_ICON[node.type];
              return (
                <div
                  key={node.id}
                  className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer"
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                  <MapPin
                    size={34}
                    className={`drop-shadow ${
                      node.status === "CRITICAL"
                        ? "text-fg-critical"
                        : node.status === "WARNING"
                        ? "text-fg-warning"
                        : "text-fg-green"
                    }`}
                    fill="currentColor"
                    fillOpacity={0.15}
                  />
                  <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 hidden w-44 -translate-x-1/2 rounded-lg border border-ink/10 bg-white p-3 text-left shadow-lg group-hover:block">
                    <div className="flex items-center gap-1.5">
                      <Icon size={14} className="text-ink/60" />
                      <p className="text-xs font-semibold text-ink">{node.zone}</p>
                    </div>
                    <p className="mt-0.5 text-[11px] text-ink/50">{node.type} sensor</p>
                    <div className="mt-1.5">
                      <StatusPill status={node.status} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-4 px-3 py-3 text-xs text-ink/60">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-green-600" /> Normal
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-fg-warning" /> Warning
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-fg-critical" /> Critical
            </span>
          </div>
        </div>

        {/* Node list */}
        <div className="rounded-xl2 border border-ink/10 bg-white shadow-sm">
          <p className="border-b border-ink/10 px-5 py-4 font-display text-lg font-bold text-ink">
            Sensor Nodes
          </p>
          <ul className="divide-y divide-ink/10">
            {nodes.map((node) => {
              const Icon = TYPE_ICON[node.type];
              return (
                <li key={node.id} className="flex items-center gap-3 px-5 py-4">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${STATUS_DOT[node.status]}`}
                  />
                  <Icon size={17} className="shrink-0 text-ink/45" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink">{node.zone}</p>
                    <p className="text-xs text-ink/50">{node.type}</p>
                  </div>
                  <StatusPill status={node.status} />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
