export const copy = {
  app: {
    name: "Ledgerly",
    tagline: "Invoice and ERP automation for Indian SMEs",
    description:
      "Automate invoice capture, validation, and ERP sync with AI designed for Indian compliance."
  },
  auth: {
    signIn: "Sign in",
    signUp: "Create account",
    signOut: "Sign out"
  },
  nav: {
    dashboard: "Dashboard",
    invoices: "Invoices",
    analytics: "Analytics",
    exports: "Exports",
    integrations: "Integrations",
    settings: "Settings"
  },
  landing: {
    heading: "AI-powered invoicing and ERP automation",
    subheading:
      "Capture invoices in seconds, validate GST details, and sync to Tally without manual work.",
    primaryCta: "Start free",
    secondaryCta: "View dashboard",
    cards: {
      extractionTitle: "AI extraction",
      extractionBody: "Single-pass GPT-4o Vision extraction for invoices and receipts.",
      gstTitle: "GST validation",
      gstBody: "Auto-check GSTIN format and tax math before posting.",
      erpTitle: "ERP sync",
      erpBody: "Push clean invoice data to Tally with one click."
    }
  },
  dashboard: {
    heading: "Overview",
    subheading: "Track invoice flow, compliance health, and ERP sync status.",
    uploadCta: "Upload invoice",
    stats: {
      processed: "Processed invoices",
      pending: "Pending review",
      erpSync: "ERP syncs"
    }
  },
  invoicesPage: {
    heading: "Invoices",
    subheading: "Review extracted invoices and push validated data to ERP.",
    emptyAction: "Upload invoice",
    reviewHeading: "Review extraction",
    reviewSubheading: "Confirm or edit the AI extracted fields before saving.",
    actions: {
      startExtraction: "Extract now",
      saveReview: "Save invoice",
      uploadAnother: "Upload another"
    }
  },
  analyticsPage: {
    heading: "Analytics",
    subheading: "Track invoice trends, vendor concentration, and GST accuracy.",
    cards: {
      monthlyInvoices: "Monthly invoices",
      gstMismatches: "GST mismatches",
      topVendors: "Top vendors tracked"
    }
  },
  exportsPage: {
    heading: "Exports",
    subheading: "Download invoices as CSV, Excel, or JSON for audits.",
    downloadCsv: "Download CSV",
    csvTitle: "CSV"
  },
  integrationsPage: {
    heading: "Integrations",
    subheading: "Connect ERP and finance tools to keep data in sync.",
    tallyTitle: "Tally Prime",
    tallyBody: "Sync validated invoices to Tally via the HTTP server."
  },
  settingsPage: {
    heading: "Settings",
    subheading: "Manage your organization profile and billing plan."
  },
  states: {
    loading: "Loading",
    emptyTitle: "No invoices yet",
    emptyBody: "Upload your first invoice to begin automated extraction.",
    errorTitle: "We hit a snag",
    errorBody: "Please retry or contact support if the issue persists."
  },
  errors: {
    authRequired: "Authentication required",
    unknown: "Unknown error"
  },
  upload: {
    dropHint: "Drop PDF, JPG, or PNG invoices here",
    uploadStarted: "Upload started"
  },
  review: {
    vendorNameLabel: "Vendor name",
    gstNumberLabel: "GST number",
    invoiceNumberLabel: "Invoice number",
    invoiceDateLabel: "Invoice date",
    totalAmountLabel: "Total amount"
  },
  invoices: {
    statusLabels: {
      pending: "Pending review",
      validated: "Validated",
      synced: "Synced",
      failed: "Failed"
    }
  },
  forms: {
    required: "This field is required",
    invalidFileType: "Only PDF, JPG, and PNG files are supported",
    fileTooLarge: "File size must be under 10 MB"
  },
  common: {
    searchPlaceholder: "Search invoices, vendors, GST numbers",
    today: "Today",
    retry: "Retry",
    currencyLabel: "INR"
  }
} as const;
