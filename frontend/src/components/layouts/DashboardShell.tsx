"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  BarChart3,
  FileStack,
  Home,
  Inbox,
  Settings,
  UploadCloud,
  Users
} from "lucide-react";

import { copy } from "@/constants/copy";
import { routes } from "@/constants/routes";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { classNames } from "@/utils/classNames";

const navItems = [
  { label: copy.nav.dashboard, href: routes.dashboard, icon: Home },
  { label: copy.nav.invoices, href: routes.invoices, icon: FileStack },
  { label: "Upload", href: routes.upload, icon: UploadCloud },
  { label: copy.nav.analytics, href: routes.analytics, icon: BarChart3 },
  { label: "Vendors", href: routes.vendors, icon: Users },
  { label: copy.nav.settings, href: routes.settings, icon: Settings }
];

/**
 * Dashboard layout shell with sidebar navigation.
 */
export const DashboardShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isClerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  return (
    <div className="min-h-screen bg-mist-100 text-ink-700">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 flex-col gap-6 bg-slate-950 px-6 py-8 text-white lg:flex">
          <div className="flex flex-col">
            <span className="text-lg font-semibold tracking-wide">{copy.app.name}</span>
            <span className="text-xs text-white/60">{copy.app.tagline}</span>
          </div>
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={classNames(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold transition",
                    isActive ? "bg-white/10 text-white" : "text-white/70 hover:text-white"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div className="flex flex-1 flex-col">
          <header className="flex flex-col gap-4 border-b border-mist-200 bg-white px-6 py-4 md:flex-row md:items-center md:justify-between">
            <div className="w-full max-w-md">
              <Input placeholder={copy.common.searchPlaceholder} />
            </div>
            <div className="flex items-center gap-3">
              <Button asChild>
                <Link href={routes.upload}>{copy.dashboard.uploadCta}</Link>
              </Button>
              {isClerkEnabled ? <UserButton afterSignOutUrl={routes.home} /> : null}
            </div>
          </header>
          <main className="flex-1 px-6 py-8 pb-24 lg:pb-8">{children}</main>
        </div>
      </div>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-mist-200 bg-white/95 backdrop-blur lg:hidden">
        <div className="grid grid-cols-5 gap-2 px-4 py-2 text-xs">
          {[navItems[0], navItems[1], navItems[2], navItems[3], navItems[4]].map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={classNames(
                  "flex flex-col items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold",
                  isActive ? "text-indigo-500" : "text-ink-500"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};
