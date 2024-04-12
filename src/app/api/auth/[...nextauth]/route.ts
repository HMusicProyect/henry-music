import NextAuth from "next-auth";
import { auth as authOptions } from "@/lib/auth-config";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
