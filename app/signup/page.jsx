import Link from "next/link";
import Logo from "@/components/Logo";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-forest via-forest/95 to-forest/90 text-cream flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl">
        <div className="rounded-[2.5rem] border border-cream/20 bg-white/10 p-10 shadow-2xl backdrop-blur-xl">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-cream ring-1 ring-white/10">
                <Logo variant="small" alt="FarmGuard logo" />
                Farm Guard account access
              </div>
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">Signup is currently paused</h1>
                <p className="max-w-xl text-base text-cream/80">
                  To keep the preview simple, new user registration is disabled. Use the admin demo button on the login page or request an account from support.
                </p>
              </div>
              <div className="rounded-3xl bg-white/5 border border-white/10 p-6 text-sm text-cream/80">
                <p className="font-semibold text-cream">Need access?</p>
                <p>Go back to login and use the demo admin account. Existing accounts can still sign in normally.</p>
              </div>
            </div>

            <div className="rounded-[2rem] bg-slate-950/90 p-8 shadow-2xl ring-1 ring-white/10">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-slate-400">Preview access</p>
                  <h2 className="text-2xl font-semibold text-white">Demo account only</h2>
                </div>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-fg-green text-white">
                  <Logo variant="small" alt="FG" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <p>Registration is turned off for the preview build.</p>
                <p>If you want to try the app, head to login and press the demo button.</p>
              </div>

              <div className="mt-8 grid gap-3">
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center rounded-3xl bg-fg-green px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-[#6dff96]"
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
