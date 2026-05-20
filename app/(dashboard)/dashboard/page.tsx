'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { signOut } from '@/lib/auth';
import BlockEditor from '@/components/blocks/BlockEditor';
import ProfileHeader from '@/components/profile/ProfileHeader';

export default function DashboardPage() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  if (loading) return <LoadingScreen />;
  if (!profile) return null;

  return (
    <div className="min-h-screen bg-black">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/" className="text-lg font-bold gradient-text">
          Atmosphere
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href={`/${profile.username}`}
            target="_blank"
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            View profile ↗
          </Link>
          <button
            onClick={() => signOut().then(() => router.push('/'))}
            className="text-sm text-white/50 hover:text-white transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10">
        <ProfileHeader profile={profile} />
        <BlockEditor profile={profile} />
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
    </div>
  );
}
