import "./globals.css";

import type { Metadata } from "next";
import { Geist, Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import { copy } from "@/constants/copy";
import { ToastProvider } from "@/components/ui/Toast";
import { classNames } from "@/utils/classNames";

const headingFont = Geist({ subsets: ["latin"], variable: "--font-heading" });
const bodyFont = Inter({ subsets: ["latin"], variable: "--font-body" });
const isClerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

export const metadata: Metadata = {
  title: copy.app.name,
  description: copy.app.tagline
};

/**
 * Root layout that wires global providers and typography.
 */
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={classNames(headingFont.variable, bodyFont.variable)}>
      <body>
        {isClerkEnabled ? (
          <ClerkProvider>
            <ToastProvider>{children}</ToastProvider>
          </ClerkProvider>
        ) : (
          <ToastProvider>{children}</ToastProvider>
        )}
      </body>
    </html>
  );
};

export default RootLayout;
