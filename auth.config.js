// Edge-safe Auth.js settings shared by the middleware and the full config.
// Role checks happen server-side against the database on every request.
export const authConfig = {
  pages: { signIn: '/organiser/sign-in' },
  session: { strategy: 'jwt', maxAge: 60 * 60 * 12 },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      if (pathname.startsWith('/organiser/sign-in')) return true;
      return Boolean(auth?.user?.email);
    },
  },
};
