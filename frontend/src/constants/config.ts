export const config = {
  maxUploadBytes: 10 * 1024 * 1024,
  allowedMimeTypes: ["application/pdf", "image/jpeg", "image/png"],
  allowedExtensions: ["pdf", "jpg", "jpeg", "png"],
  plans: [
    {
      name: "Starter",
      monthlyPriceInr: 1999,
      features: ["120 invoices per month", "GST validation", "Tally export"]
    },
    {
      name: "Scale",
      monthlyPriceInr: 3999,
      features: ["500 invoices per month", "Priority sync", "Advanced analytics"]
    },
    {
      name: "Enterprise",
      monthlyPriceInr: 7999,
      features: ["Unlimited invoices", "Custom ERP integrations", "Dedicated support"]
    }
  ]
} as const;
