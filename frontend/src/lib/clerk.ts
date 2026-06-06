import { auth } from "@clerk/nextjs/server";

/**
 * Builds authorization headers for server-side API calls.
 */
export const getServerAuthHeaders = async () => {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return {};
  }

  const { getToken } = auth();
  const token = await getToken();

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`
  };
};
