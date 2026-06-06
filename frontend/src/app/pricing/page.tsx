import Link from "next/link";
import { BadgeCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { routes } from "@/constants/routes";

const plans = [
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
];

const faqs = [
  {
    question: "Can I try Ledgerly AI before paying?",
    answer: "Yes, start a free trial and process up to 25 invoices in your workspace."
  },
  {
    question: "Do you support GST validation?",
    answer: "GST validation is included in Pro and Enterprise plans."
  },
  {
    question: "Is WhatsApp upload available on day one?",
    answer: "WhatsApp upload is available in Pro and Enterprise plans."
  }
];

const PricingPage = () => {
  return (
    <main className="min-h-screen bg-mist-100 px-6 py-16 text-ink-700">
      <div className="mx-auto flex max-w-5xl flex-col gap-10">
        <div className="text-center">
          <h1 className="text-3xl font-semibold">Pricing built for growing SMEs</h1>
          <p className="mt-2 text-sm text-ink-600">
            Simple monthly plans. Upgrade or downgrade anytime.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
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
              <h2 className="mt-4 text-base font-semibold">{plan.name}</h2>
              <p className="mt-2 text-lg font-semibold">{plan.price}</p>
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
        <div className="rounded-2xl border border-mist-200 bg-white p-8 shadow-card">
          <h2 className="text-lg font-semibold">FAQs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.question} className="rounded-xl border border-mist-200 bg-mist-100 p-4">
                <div className="text-sm font-semibold text-ink-700">{faq.question}</div>
                <p className="mt-2 text-xs text-ink-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <Button asChild>
            <Link href={routes.signUp}>Start free trial</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PricingPage;
