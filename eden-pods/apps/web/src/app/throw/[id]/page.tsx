'use client';

import { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import Link from 'next/link';
import { stages } from '@/lib/types';

export default function ThrowDetail({ params }: { params: { id: string } }) {
  const [throwData, setThrowData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    getDoc(doc(db, 'throws', params.id)).then(snapshot => setThrowData(snapshot.data() ?? {}));
  }, [params.id]);

  async function mark(stageId: string) {
    if (!auth.currentUser) return;
    await addDoc(collection(db, 'observations'), {
      throwId: params.id,
      ownerId: auth.currentUser.uid,
      stageId,
      observedAt: serverTimestamp()
    });
  }

  return (
    <main className="space-y-3">
      <h2 className="text-2xl font-bold">Throw timeline</h2>
      <div className="rounded-xl bg-white p-3 text-sm">What to expect next: {stages[1]} in 5-10 days.</div>
      <div className="space-y-2">
        {stages.map(stage => (
          <div key={stage} className="rounded-xl bg-white p-3">
            <div className="flex items-center justify-between">
              <strong>{stage}</strong>
              <button className="bg-green-600 text-white" onClick={() => mark(stage)}>Mark observed</button>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl bg-blue-50 p-3">Weather: demo mild rain, 18°C (privacy-safe stub provider).</div>
      <div className="rounded-xl bg-emerald-50 p-3">Nutrition tags: fiber, vitamin C, folate. Recipe: Wild green stir-fry.</div>
      <Link href="/harvest" className="block rounded-xl bg-green-700 p-4 text-center text-white">Log harvest</Link>
      <pre className="overflow-auto rounded bg-black p-2 text-xs text-white">{JSON.stringify(throwData, null, 2)}</pre>
    </main>
  );
}
