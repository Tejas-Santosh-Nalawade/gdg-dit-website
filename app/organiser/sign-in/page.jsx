import { redirect } from 'next/navigation';
import { signIn, devLoginEnabled } from '@/auth';
import { getActor } from '@/lib/organiser/session';
import { EVENT } from '@/lib/organiser/event';

export default async function SignInPage({ searchParams }) {
  if (await getActor()) redirect('/organiser');
  const params = await searchParams;
  const error = params?.error;

  async function google() {
    'use server';
    await signIn('google', { redirectTo: '/organiser' });
  }
  async function dev(formData) {
    'use server';
    await signIn('dev-login', { email: formData.get('email'), redirectTo: '/organiser' });
  }

  return (
    <div className="mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900">Organiser sign-in</h1>
      <p className="mt-2 text-sm text-gray-600">
        {EVENT.name} sponsorship and event management. Only organisers added by the Event Director can sign in.
      </p>
      {error && (
        <p role="alert" className="mt-4 rounded-md bg-[#fce8e6] px-3 py-2 text-sm text-[#a50e0e]">
          {error === 'AccessDenied' ? 'This account is not on the organiser list. Ask the Event Director to add you.' : 'Sign-in failed. Please try again.'}
        </p>
      )}
      <form action={google} className="mt-6">
        <button className="w-full rounded-md bg-[#4285f4] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#3367d6]">Continue with Google</button>
      </form>
      {devLoginEnabled && (
        <form action={dev} className="mt-6 border-t border-dashed border-gray-300 pt-6">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-[#b06000]">Local development only</p>
          <input name="email" type="email" required placeholder="organiser@example.com" className="mb-3 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" />
          <button className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50">Sign in without Google</button>
        </form>
      )}
    </div>
  );
}
