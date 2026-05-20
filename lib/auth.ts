'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './firebase';
import { createUserProfile, getUserByUsername } from './db';

const googleProvider = new GoogleAuthProvider();

export async function signUpWithEmail(
  email: string,
  password: string,
  username: string,
  displayName: string
) {
  const existing = await getUserByUsername(username);
  if (existing) throw new Error('Username already taken');

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(user, { username, displayName });
  return user;
}

export async function signInWithEmail(email: string, password: string) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user;
}

export async function signInWithGoogle() {
  const { user } = await signInWithPopup(auth, googleProvider);
  return user;
}

export async function signOut() {
  await firebaseSignOut(auth);
}

export function onAuthChange(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
