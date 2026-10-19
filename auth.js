import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { prisma } from '@/lib/organiser/db';

// Local-only shortcut for trying the organiser area without Google OAuth.
// It can never be enabled in a production build.
export const devLoginEnabled = process.env.NODE_ENV !== 'production' && process.env.ORGANISER_DEV_LOGIN === 'true';

function bootstrapAdmins() {
  return (process.env.ORGANISER_BOOTSTRAP_ADMINS ?? '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

async function allowEmail(email) {
  const normalised = email.toLowerCase();
  const organiser = await prisma.organizer.findUnique({ where: { email: normalised } });
  if (organiser) return organiser.active;
  if (bootstrapAdmins().includes(normalised)) {
    await prisma.organizer.create({ data: { email: normalised, name: normalised.split('@')[0], role: 'ADMIN' } });
    return true;
  }
  return false;
}

const providers = [Google];
if (devLoginEnabled) {
  providers.push(
    Credentials({
      id: 'dev-login',
      name: 'Local development login',
      credentials: { email: { label: 'Organiser email', type: 'email' } },
      async authorize(credentials) {
        const email = String(credentials?.email ?? '').toLowerCase();
        if (!email || !(await allowEmail(email))) return null;
        return { id: email, email, name: email };
      },
    }),
  );
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers,
  callbacks: {
    ...authConfig.callbacks,
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google' && profile?.email_verified !== true) return false;
      if (!user?.email) return false;
      return allowEmail(user.email);
    },
  },
});
