import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Requires a signed-in session for every organiser page and API route.
export const { auth: middleware } = NextAuth(authConfig);

export const config = {
  matcher: ['/organiser/:path*', '/api/organiser/:path*'],
};
