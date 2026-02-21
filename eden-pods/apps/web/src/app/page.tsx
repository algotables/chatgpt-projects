'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';
import Link from 'next/link';

export default function Home() {
  const [uid, setUid] = useState<string | null>(null);

  useEffect(() => onAuthStateChanged(auth, u => setUid(u?.uid ?? null)), []);

  if (!uid) {
    return (
      <main className="space-y-4">
        <h1 className="text-4xl font-bold">🌱 Eden Pods</h1>
        <p>Throw pod → log throw → grow food forest.</p>
        <button className="w-full bg-green-600 text-white" onClick={() => signInWithPopup(auth, googleProvider)}>
          Start with Google
        </button>
        <button className="w-full bg-white" onClick={() => signInAnonymously(auth)}>
          Start with Email/Guest (emulator)
        </button>
      </main>
    );
  }

  return (
    <main className="space-y-3">
      <h1 className="text-3xl font-bold">Welcome back</h1>
      <Link className="block rounded-xl bg-green-600 p-4 text-center text-white" href="/throw/new">Add your first throw</Link>
      <Link className="block rounded-xl bg-white p-4 text-center" href="/dashboard">Forest dashboard</Link>
      <Link className="block rounded-xl bg-white p-4 text-center" href="/birthright">Birthright Forest kit</Link>
      <Link className="block rounded-xl bg-white p-4 text-center" href="/notifications">Notification Center</Link>
    </main>
  );
}
