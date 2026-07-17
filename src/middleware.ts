import NextAuth from "next-auth";
import authConfig from "@/auth.config"; // 💡 Import the config, NOT the main auth file

// 💡 Initialize the auth function here using the edge-safe config
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isTargetingDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isTargetingDashboard && !isLoggedIn) {
    // Redirect unauthenticated users to the login page
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/dashboard/:path*"],
};