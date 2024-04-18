import type { NextAuthConfig, Session  } from 'next-auth';
import type { UrlObject } from 'url';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }: { auth: Session | null | undefined, request: { nextUrl: UrlObject | string } }) {
        const isLoggedIn = !!auth?.user;
        const isOnDashboard = typeof nextUrl === 'string' ? nextUrl.startsWith('/') : nextUrl.pathname?.startsWith('/');
        if (isOnDashboard) {
            if (isLoggedIn) return true;
            return false; // Redirect unauthenticated users to login page
        } else if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl.toString()));
        }
        return true;
        },
    },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;