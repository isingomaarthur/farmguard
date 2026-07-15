"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, LogIn } from "lucide-react";
import Logo from "@/components/Logo";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("farmer");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const performLogin = async (loginEmail, loginPassword) => {
    if (!loginEmail || !loginPassword) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({ email: loginEmail, password: loginPassword });
      setAuth(response.token, response.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await performLogin(email, password);
  };

  const handleDemoLogin = async (role) => {
    setLoading(true);
    setError("");

    try {
      const response = await authAPI.demoLogin(role);
      if (!response?.success) {
        throw new Error(response?.message || "Demo login failed");
      }

      setAuth(response.token, response.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Unable to sign in with demo account.");
    } finally {
      setLoading(false);
    }
  };

  const demoRoles = [
    { key: 'admin', label: 'Admin', description: 'Full system overview and user management' },
    { key: 'farmer', label: 'Farmer', description: 'Farm monitoring with field sensors and alerts' },
    { key: 'technician', label: 'Technician', description: 'Device maintenance view with offline alerts' },
    { key: 'agronomist', label: 'Agronomist', description: 'Soil analysis and pest advisory data' }
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-forest via-forest/95 to-forest/90 text-cream flex items-center justify-center px-4 py-10">
      <div className="absolute left-6 top-6">
        <Logo variant="small" alt="Farm Guard" />
      </div>
      <div className="w-full max-w-2xl">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-cream/20 bg-white/10 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_45%)]" />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_1fr] p-10">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-cream ring-1 ring-white/10">
                <Logo variant="small" alt="FarmGuard logo" />
                Farm Guard preview
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Sign in to Farm Guard</h1>
                <p className="max-w-xl text-base text-cream/80">
                  Use your account credentials or select one of the demo roles below. Each demo account gets its own preview dataset.
                </p>
              </div>

              <div className="space-y-3 rounded-3xl bg-white/5 border border-white/10 p-6 text-sm text-cream/80">
                <p className="font-semibold text-cream">Demo access</p>
                <p>Choose admin, farmer, technician, or agronomist and click the demo button. Your selected demo account will be created automatically.</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950/90 p-8 shadow-2xl ring-1 ring-white/10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Account login</p>
                  <h2 className="text-2xl font-semibold text-white">Welcome back</h2>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-fg-green text-white">
                  <Logo variant="small" alt="FG" />
                </div>
              </div>
              {error && (
                <div className="mb-4 rounded-3xl border border-red-400/30 bg-red-500/10 p-4 text-sm text-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <label className="block text-sm text-slate-300">
                  Email
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 text-white outline-none focus:border-fg-green focus:ring-2 focus:ring-fg-green/20"
                    disabled={loading}
                  />
                </label>

                <label className="block text-sm text-slate-300">
                  Password
                  <div className="relative mt-2">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-3 pr-12 text-white outline-none focus:border-fg-green focus:ring-2 focus:ring-fg-green/20"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-3xl bg-fg-green px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#6dff96] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="inline-flex items-center justify-center gap-2">
                    <LogIn size={18} />
                    {loading ? "Signing in..." : "Sign in"}
                  </span>
                </button>
              </form>

              <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-300">
                <p className="mb-3 font-semibold text-white">Choose a demo role</p>
                <div className="grid gap-2 sm:grid-cols-2">
                  {demoRoles.map((role) => (
                    <button
                      type="button"
                      key={role.key}
                      onClick={() => setSelectedRole(role.key)}
                      disabled={loading}
                      className={`rounded-3xl border px-4 py-3 text-left transition ${
                        selectedRole === role.key
                          ? 'border-fg-green bg-fg-green/10 text-white'
                          : 'border-slate-800 bg-slate-950/80 text-slate-300 hover:border-white/30 hover:bg-slate-900'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-semibold">{role.label}</span>
                        <span className="text-xs uppercase tracking-[0.24em] text-slate-400">demo</span>
                      </div>
                      <p className="mt-2 text-xs leading-5 text-slate-400">{role.description}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 grid gap-3">
                <button
                  type="button"
                  onClick={() => handleDemoLogin(selectedRole)}
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Signing in..." : `Use demo ${selectedRole} account`}
                </button>

                <Link
                  href="/signup"
                  className="text-center text-sm text-slate-300 hover:text-white"
                >
                  Need a new account? Contact support.
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
