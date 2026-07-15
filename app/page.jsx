'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800">
      {/* Header */}
      <header className="border-b border-emerald-600 bg-emerald-800 bg-opacity-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo variant="small" />
            <div className="text-white">
              <h1 className="text-lg font-bold">Farm Guard</h1>
              <p className="text-xs text-emerald-200">GSM Monitoring</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-6 py-2 text-white hover:text-emerald-100 transition-colors font-medium"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-6 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-colors font-medium"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="flex justify-center mb-6">
            <Logo variant="large" />
          </div>
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-bold text-white">
              Farm Monitoring Made
            </h2>
            <p className="text-4xl md:text-5xl font-semibold text-emerald-300">
              Simple & Smart
            </p>
          </div>

          <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mx-auto leading-relaxed">
            Real-time IoT monitoring for agricultural fields. Track soil moisture, pH levels, humidity, and more. Make data-driven decisions to optimize your farm's productivity.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link
              href="/signup"
              className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <span>→</span> Get Started
            </Link>
            <Link
              href="#learn"
              className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-emerald-700 rounded-lg font-semibold transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
