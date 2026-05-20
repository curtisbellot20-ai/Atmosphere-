'use client';

import Image from 'next/image';
import type { UserProfile } from '@/types';
import BlockRenderer from '@/components/blocks/BlockRenderer';

export default function PublicProfile({ profile }: { profile: UserProfile }) {
  const sortedBlocks = [...profile.blocks]
    .filter((b) => b.visible)
    .sort((a, b) => a.order - b.order);

  return (
    <main
      className="min-h-screen"
      style={{ background: profile.theme.background }}
    >
      <div className="max-w-xl mx-auto px-4 py-12">
        {/* Avatar + name */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="w-24 h-24 rounded-full overflow-hidden mb-4 flex items-center justify-center text-4xl font-bold"
            style={{
              background: `linear-gradient(135deg, ${profile.theme.accentColor}, #ec4899)`,
            }}
          >
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.displayName}
                width={96}
                height={96}
                className="object-cover w-full h-full"
              />
            ) : (
              profile.displayName[0]?.toUpperCase()
            )}
          </div>
          <h1 className="text-2xl font-bold text-white">{profile.displayName}</h1>
          {profile.bio && (
            <p className="text-white/60 text-sm mt-2 max-w-xs">{profile.bio}</p>
          )}
        </div>

        {/* Blocks */}
        <div className="space-y-4">
          {sortedBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} accentColor={profile.theme.accentColor} />
          ))}
        </div>

        {/* Powered by */}
        <div className="text-center mt-12">
          <a
            href="/"
            className="text-xs text-white/20 hover:text-white/40 transition-colors"
          >
            Powered by Atmosphere
          </a>
        </div>
      </div>
    </main>
  );
}
