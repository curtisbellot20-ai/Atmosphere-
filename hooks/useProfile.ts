'use client';

import { useState, useCallback } from 'react';
import { useAuth } from './useAuth';
import { updateBlocks, updateUserProfile } from '@/lib/db';
import type { Block, UserProfile } from '@/types';
import toast from 'react-hot-toast';

export function useProfile() {
  const { user, profile } = useAuth();
  const [saving, setSaving] = useState(false);

  const saveBlocks = useCallback(
    async (blocks: Block[]) => {
      if (!user) return;
      setSaving(true);
      try {
        await updateBlocks(user.uid, blocks);
        toast.success('Saved!');
      } catch {
        toast.error('Failed to save');
      } finally {
        setSaving(false);
      }
    },
    [user]
  );

  const saveProfile = useCallback(
    async (data: Partial<UserProfile>) => {
      if (!user) return;
      setSaving(true);
      try {
        await updateUserProfile(user.uid, data);
        toast.success('Profile updated!');
      } catch {
        toast.error('Failed to update profile');
      } finally {
        setSaving(false);
      }
    },
    [user]
  );

  return { profile, saving, saveBlocks, saveProfile };
}
