import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#0f1117",
          900: "#111827"
        },
        ink: {
          700: "#0f172a",
          600: "#1f2937",
          500: "#334155"
        },
        mist: {
          100: "#f8fafc",
          200: "#e2e8f0",
          300: "#cbd5f5"
        },
        accent: {
          500: "#4f46e5",
          600: "#4338ca"
        },
        emerald: {
          500: "#10b981"
        },
        amber: {
          500: "#f59e0b"
        },
        rose: {
          500: "#ef4444"
        },
        indigo: {
          500: "#4f46e5",
          600: "#4338ca"
        }
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.08)",
        soft: "0 8px 20px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
