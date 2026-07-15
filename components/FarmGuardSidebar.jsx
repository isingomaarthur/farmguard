"use client";

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Bell, BarChart2, Map, User, MessageSquare, ShieldCheck } from "lucide-react";
import Logo from "@/components/Logo";
import { useAuth } from "@/lib/auth";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/alerts", label: "Alerts", icon: Bell },
  { href: "/reports", label: "Reports", icon: BarChart2 },
  { href: "/system-map", label: "System Map", icon: Map },
  { href: "/profile", label: "Profile", icon: User },
];

export default function FarmGuardSidebar({ open, onClose }) {
  const pathname = usePathname();
  const { getAuth } = useAuth();
  const auth = getAuth();
  const isAdmin = auth?.user?.role === 'admin';
  const navItems = isAdmin ? [...NAV_ITEMS, { href: '/admin', label: 'Admin', icon: ShieldCheck }] : NAV_ITEMS;

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed z-40 flex h-screen w-72 shrink-0 flex-col border-r border-ink/10 bg-white transition-transform md:sticky md:top-0 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center gap-2 px-6 pb-5 pt-8 text-center">
          <div className="grid h-16 w-16 place-items-center rounded-lg border border-ink/10 bg-white shadow-sm">
            <Logo variant="medium" alt="Farm Guard" />
          </div>
          <p className="font-display text-xl font-bold text-fg-green">Farm Guard Uganda</p>
          <p className="text-sm text-ink/50">GSM Monitoring System</p>
        </div>

        <nav className="mt-2 border-t border-ink/10 px-4 py-4">
          <ul className="space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={`flex items-center gap-3.5 rounded-lg px-3 py-3 text-base transition-colors ${
                      active
                        ? "bg-fg-green/10 font-semibold text-ink"
                        : "text-ink/70 hover:bg-ink/5"
                    }`}
                  >
                    {href === '/dashboard' ? (
                      <div className="flex items-center justify-center">
                        <Logo variant="small" alt="Farm Guard" />
                      </div>
                    ) : (
                      <Icon
                        size={20}
                        className={active ? "text-fg-green" : "text-ink/50"}
                        strokeWidth={2}
                      />
                    )}
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="mt-auto border-t border-ink/10 px-4 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-3.5 rounded-lg px-3 py-3 text-sm text-ink/60 transition-colors hover:bg-ink/5"
          >
            <MessageSquare size={18} className="text-ink/40" />
            Ask Farm Guard
          </Link>
        </div>
      </aside>
    </>
  );
}
