'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useProfile } from '@/hooks/useProfile';
import type { UserProfile } from '@/types';

export default function ProfileHeader({ profile }: { profile: UserProfile }) {
  const { saveProfile, saving } = useProfile();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    displayName: profile.displayName,
    bio: profile.bio,
  });

  async function handleSave() {
    await saveProfile(form);
    setEditing(false);
  }

  return (
    <div className="glass rounded-2xl p-6 mb-8">
      <div className="flex items-start gap-4">
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center text-2xl font-bold flex-shrink-0 overflow-hidden">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={profile.displayName}
              width={64}
              height={64}
              className="object-cover w-full h-full"
            />
          ) : (
            profile.displayName[0]?.toUpperCase()
          )}
        </div>

        <div className="flex-1 min-w-0">
          {editing ? (
            <div className="space-y-2">
              <input
                value={form.displayName}
                onChange={(e) => setForm((f) => ({ ...f, displayName: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500"
                placeholder="Display name"
              />
              <textarea
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-brand-500 resize-none"
                placeholder="Short bio"
                rows={2}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="px-4 py-1.5 rounded-lg gradient-brand text-xs font-semibold disabled:opacity-50"
                >
                  {saving ? 'Saving…' : 'Save'}
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-4 py-1.5 rounded-lg glass text-xs font-semibold"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <h2 className="font-bold text-lg">{profile.displayName}</h2>
              <p className="text-white/50 text-sm mt-0.5">@{profile.username}</p>
              {profile.bio && (
                <p className="text-white/70 text-sm mt-2">{profile.bio}</p>
              )}
              <button
                onClick={() => setEditing(true)}
                className="mt-3 text-xs text-brand-400 hover:text-brand-300 transition-colors"
              >
                Edit profile
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
