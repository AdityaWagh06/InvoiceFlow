import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileStack,
  Globe,
  PlayCircle,
  ShieldCheck,
  Sparkles,
  UploadCloud
} from "lucide-react";

import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/Button";

const testimonials = [
  {
    name: "Nidhi Sharma",
    company: "Sharma Traders",
    quote: "We process 300+ invoices a month now without a single manual entry."
  },
  {
    name: "Kunal Mehta",
    company: "Mehta Enterprises",
    quote: "Tally sync works like magic. Our finance team saves hours every day."
  },
  {
    name: "Rajesh Gupta",
    company: "Mumbai Paper House",
    quote: "WhatsApp upload is a game changer for field teams and vendors."
  }
];

const HomePage = () => {
  return (
    <main className="min-h-screen bg-mist-100 text-ink-700">
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-20 md:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-ink-500">
            Ledgerly AI
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Invoice processing on autopilot
          </h1>
          <p className="text-sm text-ink-600 md:text-base">
            Upload a bill. AI reads it. ERP gets it. Done in seconds.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href={routes.signUp}>
                Start free trial <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href={routes.pricing}>
                <PlayCircle className="h-4 w-4" /> Watch demo
              </Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-ink-500">
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> SOC2 ready controls
            </span>
            <span className="inline-flex items-center gap-2">
              <Globe className="h-4 w-4 text-indigo-500" /> Built for Indian SMEs
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -top-6 right-6 h-16 w-16 rounded-full bg-indigo-500/10" />
          <div className="absolute -bottom-6 left-8 h-10 w-10 rounded-full bg-emerald-500/10" />
          <div className="rounded-2xl border border-mist-200 bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-ink-500">Invoice Extract</span>
              <span className="inline-flex items-center gap-2 text-xs text-emerald-500">
                <BadgeCheck className="h-4 w-4" /> Verified
              </span>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-ink-500">Vendor</span>
                <span className="font-semibold text-ink-700">Sharma Traders</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-500">GST No.</span>
                <span className="font-semibold text-ink-700">27AAPFU0939F1ZV</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-500">Invoice</span>
                <span className="font-semibold text-ink-700">INV-2024-1043</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ink-500">Total</span>
                <span className="font-semibold text-ink-700">₹1,45,000</span>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-ink-500">
              <Sparkles className="h-4 w-4 text-indigo-500" /> Fields extracted in 6.4s
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-12 md:grid-cols-3">
        {[
          {
            title: "AI Extraction",
            body: "GPT-4o reads any invoice. Hindi, English, mixed. 99% accuracy.",
            icon: Sparkles
          },
          {
            title: "One-click ERP sync",
            body: "Tally entry created automatically. Zero manual data entry.",
            icon: FileStack
          },
          {
            title: "WhatsApp upload",
            body: "Send a photo on WhatsApp. Data is in your dashboard in seconds.",
            icon: UploadCloud
          }
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-mist-200 bg-white p-6 shadow-card">
            <item.icon className="h-5 w-5 text-indigo-500" />
            <h3 className="mt-4 text-base font-semibold text-ink-700">{item.title}</h3>
            <p className="mt-2 text-sm text-ink-600">{item.body}</p>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-2xl border border-mist-200 bg-white p-8 shadow-card">
          <h2 className="text-xl font-semibold text-ink-700">How it works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              "Upload or WhatsApp your invoice",
              "AI extracts every field instantly",
              "Review and sync to Tally / export"
            ].map((step, index) => (
              <div key={step} className="relative rounded-xl border border-mist-200 bg-mist-100 p-5">
                <div className="text-xs font-semibold text-ink-500">Step {index + 1}</div>
                <p className="mt-3 text-sm font-semibold text-ink-700">{step}</p>
                {index < 2 ? (
                  <div className="absolute -right-6 top-1/2 hidden h-px w-10 bg-mist-200 md:block" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-ink-700">Simple pricing</h2>
            <p className="text-sm text-ink-600">Choose a plan that grows with your finance team.</p>
          </div>
          <Button asChild variant="secondary">
            <Link href={routes.pricing}>View pricing</Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Starter",
              price: "₹999/mo",
              features: ["200 invoices", "Excel export", "Email support"],
              highlight: false
            },
            {
              name: "Pro",
              price: "₹1999/mo",
              features: ["1000 invoices", "Tally sync", "WhatsApp upload", "Priority support"],
              highlight: true
            },
            {
              name: "Enterprise",
              price: "Custom",
              features: ["Unlimited", "Custom ERP", "Dedicated manager"],
              highlight: false
            }
          ].map((plan) => (
            <div
              key={plan.name}
              className={
                plan.highlight
                  ? "rounded-xl border-2 border-indigo-500 bg-white p-6 shadow-card"
                  : "rounded-xl border border-mist-200 bg-white p-6 shadow-card"
              }
            >
              {plan.highlight ? (
                <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-500">
                  Most popular
                </span>
              ) : null}
              <h3 className="mt-4 text-base font-semibold text-ink-700">{plan.name}</h3>
              <p className="mt-2 text-lg font-semibold text-ink-700">{plan.price}</p>
              <ul className="mt-4 space-y-2 text-sm text-ink-600">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <BadgeCheck className="h-4 w-4 text-emerald-500" /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-5 w-full" variant={plan.highlight ? "primary" : "secondary"}>
                Choose plan
              </Button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-xl border border-mist-200 bg-white p-6 shadow-card">
              <p className="text-sm text-ink-600">{testimonial.quote}</p>
              <div className="mt-4 text-sm font-semibold text-ink-700">{testimonial.name}</div>
              <div className="text-xs text-ink-500">{testimonial.company}</div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-mist-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="text-base font-semibold text-ink-700">Ledgerly AI</div>
            <div className="text-xs text-ink-500">Automations for finance teams</div>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-ink-500">
            <Link href={routes.pricing}>Pricing</Link>
            <Link href={routes.signIn}>Sign in</Link>
            <Link href={routes.signUp}>Start free trial</Link>
            <span className="rounded-full border border-mist-200 px-3 py-1 text-xs text-ink-500">
              Made in India
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HomePage;
