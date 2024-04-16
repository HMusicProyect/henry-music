import { getServerSession } from "next-auth";
import { auth } from "@/lib/auth-config";

export async function getCurrentUser(req: any) {
    const session = await getServerSession(auth);
    return session?.user;
}