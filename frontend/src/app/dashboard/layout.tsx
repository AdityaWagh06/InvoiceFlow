import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { routes } from "@/constants/routes";
import { DashboardShell } from "@/components/layouts/DashboardShell";

/**
 * Protected layout for dashboard routes.
 */
const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isClerkEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

  if (!isClerkEnabled) {
    return <>{children}</>;
  }

  const { userId } = auth();

  if (!userId) {
    redirect(routes.signIn);
  }

  return <DashboardShell>{children}</DashboardShell>;
};

export default DashboardLayout;
