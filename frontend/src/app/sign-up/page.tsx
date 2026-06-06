import { Check } from "lucide-react";
import { SignUp } from "@clerk/nextjs";

const features = [
  "AI extracts every line item",
  "GST validation built in",
  "Export to Excel or Tally"
];

const SignUpPage = () => {
  const isClerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <main className="relative min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="relative mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
        <div className="space-y-4">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            Ledgerly AI
          </div>
          <h1 className="text-3xl font-semibold">Start your free trial.</h1>
          <p className="text-sm text-white/70">See your first invoices synced in under 5 minutes.</p>
          <ul className="space-y-2 text-sm text-white/70">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                  <Check className="h-3 w-3" />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-800 bg-white p-6 text-ink-700 shadow-soft">
          {isClerkEnabled ? (
            <SignUp redirectUrl="/dashboard" />
          ) : (
            <div className="text-sm text-ink-600">
              Clerk is not configured. Add your publishable key to enable sign-up.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default SignUpPage;
