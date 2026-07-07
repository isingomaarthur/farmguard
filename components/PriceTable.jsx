"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const PRICES = [
  { crop: "Maize", price: "1,250", unit: "kg", trend: "up", change: "+4.2%" },
  { crop: "Coffee (Robusta)", price: "9,800", unit: "kg", trend: "up", change: "+1.1%" },
  { crop: "Beans", price: "3,400", unit: "kg", trend: "down", change: "-2.6%" },
  { crop: "Cassava", price: "900", unit: "kg", trend: "flat", change: "0.0%" },
];

const TREND_META = {
  up: { icon: TrendingUp, color: "text-green-700", bg: "bg-green-700/10" },
  down: { icon: TrendingDown, color: "text-clay", bg: "bg-clay/10" },
  flat: { icon: Minus, color: "text-ink/50", bg: "bg-ink/5" },
};

export default function PriceTable({ market = "Kampala" }) {
  return (
    <div className="rounded-xl2 border border-gold/25 bg-gold/[0.06] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-gold-dark">
        Market prices · {market}
      </p>

      <div className="mt-3 divide-y divide-ink/5">
        {PRICES.map((row) => {
          const meta = TREND_META[row.trend];
          const Icon = meta.icon;
          return (
            <div
              key={row.crop}
              className="flex items-center justify-between py-2.5 font-mono text-sm"
            >
              <span className="font-body text-ink">{row.crop}</span>
              <div className="flex items-center gap-3">
                <span className="text-ink/80">
                  UGX {row.price}
                  <span className="text-ink/40">/{row.unit}</span>
                </span>
                <span
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs ${meta.bg} ${meta.color}`}
                >
                  <Icon size={12} />
                  {row.change}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-ink/45">
        Prices are indicative and sourced from local market surveys today.
      </p>
    </div>
  );
}
