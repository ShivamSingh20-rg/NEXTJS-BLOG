import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from '@/lib/db';

// Safely short-circuit during Next.js static page collection build phase
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build" || process.env.IS_BUILD === "true";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: isBuildPhase ? ({} as any) : PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});