'use client';
import { FormEvent, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function Harvest() {
  const [itemId, setItemId] = useState('wild-greens');
  const [quantityClass, setQuantityClass] = useState('medium');
  const [msg, setMsg] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!auth.currentUser) return;
    await addDoc(collection(db, 'harvests'), {
      throwId: 'manual',
      ownerId: auth.currentUser.uid,
      harvestedAt: serverTimestamp(),
      itemId,
      quantityClass
    });
    setMsg('Estimated nutrition gained: +120 kcal eq, +8g fiber.');
  }
  return (
    <form className="space-y-3" onSubmit={submit}>
      <h2 className="text-2xl font-bold">Log harvest</h2>
      <input className="w-full rounded-xl p-3" value={itemId} onChange={e => setItemId(e.target.value)} />
      <select className="w-full rounded-xl p-3" value={quantityClass} onChange={e => setQuantityClass(e.target.value)}>
        <option>small</option><option>medium</option><option>large</option>
      </select>
      <button className="w-full bg-green-700 text-white">Save harvest</button>
      <p>{msg}</p>
    </form>
  );
}
