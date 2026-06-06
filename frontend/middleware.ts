import { authMiddleware } from "@clerk/nextjs";

import { routes } from "@/constants/routes";

const publicRoutes = [routes.home, routes.signIn, routes.signUp];

export default authMiddleware({
  publicRoutes
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"]
};
