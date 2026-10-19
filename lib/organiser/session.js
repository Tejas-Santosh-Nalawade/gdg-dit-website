import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { prisma } from './db';
import { can } from './permissions';

/** The signed-in organiser, re-read from the database so role changes apply at once. */
export async function getActor() {
  const session = await auth();
  const email = session?.user?.email?.toLowerCase();
  if (!email) return null;
  const organiser = await prisma.organizer.findUnique({ where: { email }, include: { committeeMember: true } });
  if (!organiser || !organiser.active) return null;
  return organiser;
}

export async function requireActor() {
  const actor = await getActor();
  if (!actor) redirect('/organiser/sign-in');
  return actor;
}

/** For pages: organisers without the capability are sent back to the overview with a notice. */
export async function requireCapability(capability) {
  const actor = await requireActor();
  if (!can(actor.role, capability)) redirect('/organiser?denied=1');
  return actor;
}
