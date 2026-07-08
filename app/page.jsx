"use client";

import Link from "next/link";
import { Sprout, AlertCircle, BarChart3, MapPin, LogIn, UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-forest via-forest/95 to-forest/90 text-cream">
      {/* Header */}
      <header className="border-b border-white/10 bg-forest/50 backdrop-blur px-6 py-4 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-fg-green flex items-center justify-center">
              <Sprout className="text-forest" size={24} />
            </div>
            <div>
              <p className="font-display text-lg font-bold">Farm Guard</p>
              <p className="text-xs text-cream/70">GSM Monitoring</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition text-sm font-medium flex items-center gap-2"
            >
              <LogIn size={18} />
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-fg-green text-forest hover:bg-fg-green/90 transition text-sm font-semibold flex items-center gap-2"
            >
              <UserPlus size={18} />
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl text-center space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold leading-tight">
              Farm Monitoring Made
              <span className="block text-fg-green"> Simple & Smart</span>
            </h1>
            <p className="text-xl text-cream/80 max-w-2xl mx-auto leading-relaxed">
              Real-time IoT monitoring for agricultural fields. Track soil moisture, pH levels, 
              humidity, and more. Make data-driven decisions to optimize your farm's productivity.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link
              href="/login"
              className="px-8 py-4 bg-fg-green text-forest rounded-lg font-bold text-lg hover:bg-fg-green/90 transition inline-flex items-center justify-center gap-2"
            >
              <LogIn size={22} />
              Get Started
            </Link>
            <a
              href="#features"
              className="px-8 py-4 bg-white/10 rounded-lg font-bold text-lg hover:bg-white/20 transition inline-flex items-center justify-center gap-2 border border-white/20"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="px-6 py-20 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:bg-white/10 transition">
              <div className="h-12 w-12 rounded-lg bg-fg-green/20 flex items-center justify-center mb-4">
                <AlertCircle className="text-fg-green" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Real-Time Alerts</h3>
              <p className="text-cream/70 leading-relaxed">
                Get instant notifications when soil conditions change, water levels drop, or equipment needs attention.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:bg-white/10 transition">
              <div className="h-12 w-12 rounded-lg bg-fg-green/20 flex items-center justify-center mb-4">
                <BarChart3 className="text-fg-green" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Data Analytics</h3>
              <p className="text-cream/70 leading-relaxed">
                Analyze historical data, identify trends, and make informed decisions to improve crop yield.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-8 hover:bg-white/10 transition">
              <div className="h-12 w-12 rounded-lg bg-fg-green/20 flex items-center justify-center mb-4">
                <MapPin className="text-fg-green" size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3">Field Mapping</h3>
              <p className="text-cream/70 leading-relaxed">
                Visualize sensor locations across your farm and monitor multiple zones simultaneously.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="px-6 py-20">
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-5xl font-bold text-fg-green mb-2">500+</p>
            <p className="text-cream/70">Active Farmers</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-fg-green mb-2">10K+</p>
            <p className="text-cream/70">Sensor Nodes</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-fg-green mb-2">99.8%</p>
            <p className="text-cream/70">Uptime</p>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="px-6 py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold">Ready to Transform Your Farm?</h2>
          <p className="text-cream/70 text-lg">
            Join hundreds of farmers already using Farm Guard to optimize their operations.
          </p>
          <Link
            href="/login"
            className="inline-flex px-8 py-4 bg-fg-green text-forest rounded-lg font-bold text-lg hover:bg-fg-green/90 transition items-center gap-2"
          >
            <LogIn size={22} />
            Start Free Trial
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream/60">
          <p>&copy; 2024 Farm Guard. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition">Privacy Policy</a>
            <a href="#" className="hover:text-cream transition">Terms of Service</a>
            <a href="#" className="hover:text-cream transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
