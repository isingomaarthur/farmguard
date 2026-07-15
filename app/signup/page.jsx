import Link from "next/link";
import Logo from "@/components/Logo";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-800 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="rounded-[2.5rem] border border-cream/20 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/10">
                <Logo variant="small" alt="FarmGuard logo" />
                Farm Guard account access
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Signup is currently paused</h1>
                <p className="max-w-xl text-base text-emerald-50/90">
                  New user registration is currently unavailable. Please contact support or use the sign-in page to continue with your role-based access.
                </p>
              </div>
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-sm text-emerald-50/90">
                <p className="font-semibold text-white">Need access?</p>
                <p>Go back to login and continue with your assigned access option. Existing accounts can still sign in normally.</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950/90 p-8 shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Access note</p>
                  <h2 className="text-2xl font-semibold text-white">Role-based access</h2>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-emerald-500 text-white">
                  <Logo variant="small" alt="FG" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>Registration is turned off for this build.</p>
                <p>If you want to continue, head to login and choose your access option.</p>
              </div>

              <div className="mt-8 grid gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-3xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-400"
                >
                  Go to login
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:bg-white/10"
                >
                  Open dashboard (if already signed in)
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
