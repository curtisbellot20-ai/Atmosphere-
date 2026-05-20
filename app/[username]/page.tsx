import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getUserByUsername } from '@/lib/db';
import PublicProfile from '@/components/profile/PublicProfile';

interface Props {
  params: { username: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const profile = await getUserByUsername(params.username);
  if (!profile) return { title: 'Profile not found' };
  return {
    title: `${profile.displayName} | Atmosphere`,
    description: profile.bio || `Check out ${profile.displayName}'s profile on Atmosphere.`,
    openGraph: {
      title: profile.displayName,
      description: profile.bio,
      images: profile.avatarUrl ? [profile.avatarUrl] : [],
    },
  };
}

export default async function PublicProfilePage({ params }: Props) {
  const profile = await getUserByUsername(params.username);
  if (!profile) notFound();
  return <PublicProfile profile={profile} />;
}
