"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authAPI } from "@/lib/api";
import { useAuth } from "@/lib/auth";
import { Eye, EyeOff, LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const [selectedRole, setSelectedRole] = useState('farmer');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const performLogin = async (loginEmail, loginPassword) => {
    if (!loginEmail || !loginPassword) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await authAPI.login({
        email: loginEmail,
        password: loginPassword,
      });

      if (!response?.success) {
        throw new Error(response?.message || "Login failed");
      }

      setAuth(response.token, response.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Role selection is UI-only for sign-in (does not alter auth flow)
    await performLogin(email, password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest via-forest/95 to-forest/90 text-cream flex items-center justify-center px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fg-green/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-fg-green/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-3xl mb-4 border border-white/20">
            <span className="text-3xl font-bold text-fg-green">FG</span>
          </div>
          <h1 className="text-3xl font-bold mb-2">Farm Guard</h1>
          <p className="text-cream/70">GSM Monitoring System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-8 shadow-2xl">
          <h2 className="text-2xl font-bold mb-6">Sign In</h2>

          {/* Role selection (UI only) */}
          <div className="mb-6">
            <p className="text-sm text-cream/80 mb-3">Select role to continue</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { key: 'farmer', label: 'Farmer', color: 'bg-green-500' },
                { key: 'technician', label: 'Technician', color: 'bg-blue-500' },
                { key: 'agronomist', label: 'Agronomist', color: 'bg-orange-400' },
                { key: 'admin', label: 'Admin', color: 'bg-red-500' },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setSelectedRole(r.key)}
                  className={`flex items-center gap-3 p-4 rounded-lg border ${selectedRole === r.key ? 'border-white/40 shadow-lg' : 'border-white/10'} bg-white/3`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${r.color}`}>{r.label.charAt(0)}</div>
                  <div className="text-left">
                    <div className="font-semibold text-cream">{r.label}</div>
                    <div className="text-cream/60 text-sm">{r.label === 'Admin' ? 'Full system access and user management' : r.label === 'Technician' ? 'Maintain sensors and equipment' : r.label === 'Agronomist' ? 'Analyze data and provide recommendations' : 'Monitor and manage farm operations'}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          {error && (
            <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fg-green/50 text-cream placeholder-cream/50 transition"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-fg-green/50 text-cream placeholder-cream/50 transition"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-cream/70 hover:text-cream"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 py-3 bg-fg-green text-forest font-semibold rounded-lg hover:bg-fg-green/90 disabled:bg-fg-green/50 disabled:cursor-not-allowed transition flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Signup Link */}
          <div className="border-t border-white/10 pt-6">
            <p className="text-center text-sm">
              Don't have an account?{" "}
              <Link href="/signup" className="text-fg-green hover:text-fg-green/80 font-semibold transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-xs text-cream/50 mt-6">
          Farm monitoring made simple and accessible
        </p>
      </div>
    </div>
  );
}
