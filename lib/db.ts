import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { db } from './firebase';
import type { UserProfile, Block, Lead, GameEntry } from '@/types';

// ─── Default profile values ───────────────────────────────────────────────────

const DEFAULT_THEME = {
  background: '#0f0f0f',
  accentColor: '#8b5cf6',
  fontFamily: 'Inter',
  layout: 'centered' as const,
};

// ─── Users ────────────────────────────────────────────────────────────────────

export async function createUserProfile(
  user: User,
  extra: { username: string; displayName: string }
) {
  const profileData: UserProfile = {
    uid: user.uid,
    username: extra.username.toLowerCase(),
    displayName: extra.displayName,
    bio: '',
    avatarUrl: user.photoURL ?? '',
    email: user.email ?? '',
    theme: DEFAULT_THEME,
    blocks: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  await setDoc(doc(db, 'profiles', user.uid), profileData);
  await setDoc(doc(db, 'usernames', extra.username.toLowerCase()), {
    uid: user.uid,
  });

  return profileData;
}

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await getDoc(doc(db, 'profiles', uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
}

export async function getUserByUsername(
  username: string
): Promise<UserProfile | null> {
  const usernameSnap = await getDoc(
    doc(db, 'usernames', username.toLowerCase())
  );
  if (!usernameSnap.exists()) return null;
  const { uid } = usernameSnap.data();
  return getUserProfile(uid);
}

export async function updateUserProfile(
  uid: string,
  data: Partial<UserProfile>
) {
  await updateDoc(doc(db, 'profiles', uid), {
    ...data,
    updatedAt: Date.now(),
  });
}

// ─── Blocks ───────────────────────────────────────────────────────────────────

export async function addBlock(uid: string, block: Block) {
  await updateDoc(doc(db, 'profiles', uid), {
    blocks: arrayUnion(block),
    updatedAt: Date.now(),
  });
}

export async function removeBlock(uid: string, block: Block) {
  await updateDoc(doc(db, 'profiles', uid), {
    blocks: arrayRemove(block),
    updatedAt: Date.now(),
  });
}

export async function updateBlocks(uid: string, blocks: Block[]) {
  await updateDoc(doc(db, 'profiles', uid), {
    blocks,
    updatedAt: Date.now(),
  });
}

// ─── Leads ────────────────────────────────────────────────────────────────────

export async function saveLead(lead: Omit<Lead, 'id'>) {
  const ref = await addDoc(collection(db, 'leads'), {
    ...lead,
    capturedAt: Date.now(),
  });
  return ref.id;
}

export async function getLeads(profileId: string): Promise<Lead[]> {
  const q = query(
    collection(db, 'leads'),
    where('profileId', '==', profileId)
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Lead));
}

// ─── Game Entries ─────────────────────────────────────────────────────────────

export async function saveGameEntry(entry: Omit<GameEntry, 'id'>) {
  const ref = await addDoc(collection(db, 'game_entries'), {
    ...entry,
    playedAt: Date.now(),
  });
  return ref.id;
}
