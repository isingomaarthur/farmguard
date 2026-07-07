"use client";

import { Cloud, Droplets, Wind } from "lucide-react";

const FORECAST = [
  { day: "Today", temp: "31°", rain: "10%" },
  { day: "Tue", temp: "29°", rain: "60%" },
  { day: "Wed", temp: "28°", rain: "75%" },
  { day: "Thu", temp: "30°", rain: "20%" },
];

export default function WeatherWidget({ location = "Mukono" }) {
  return (
    <div className="rounded-xl2 border border-sky/20 bg-sky/[0.07] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky">
            Weather forecast
          </p>
          <p className="font-display text-lg font-semibold text-ink">{location}</p>
        </div>
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-sky/15 text-sky">
          <Cloud size={20} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2">
        {FORECAST.map((f) => (
          <div
            key={f.day}
            className="rounded-lg bg-white/70 px-2 py-3 text-center"
          >
            <p className="text-xs text-ink/50">{f.day}</p>
            <p className="mt-1 font-display text-base font-semibold text-ink">
              {f.temp}
            </p>
            <p className="mt-1 flex items-center justify-center gap-1 text-[11px] text-sky">
              <Droplets size={11} />
              {f.rain}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-xs text-ink/55">
        <Wind size={13} />
        Rain expected Tue–Wed — consider delaying pesticide spraying.
      </p>
    </div>
  );
}
