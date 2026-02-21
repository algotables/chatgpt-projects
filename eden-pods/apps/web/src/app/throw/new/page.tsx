'use client';

import { FormEvent, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { encryptLocation } from '@/lib/crypto';
import { useRouter } from 'next/navigation';

export default function NewThrow() {
  const [podTypeId, setPodTypeId] = useState('pod-resilience');
  const [locationMode, setLocationMode] = useState<'private' | 'approximate' | 'exact'>('private');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 16));
  const [status, setStatus] = useState('');
  const router = useRouter();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) return;
    setStatus('Saving...');
    const coords = { lat: 37.7749, lon: -122.4194, accuracy: 15, capturedAt: new Date().toISOString() };
    const encrypted = await encryptLocation(coords);
    const data: Record<string, unknown> = {
      ownerId: user.uid,
      forestId: 'default-forest',
      podTypeId,
      growthModelId: 'temperate-basic',
      createdAt: serverTimestamp(),
      throwDate: new Date(date).toISOString(),
      locationEncrypted: encrypted,
      locationSharingMode: locationMode
    };
    if (locationMode !== 'private') data.locationApprox = { lat: Number(coords.lat.toFixed(1)), lon: Number(coords.lon.toFixed(1)) };
    if (locationMode === 'exact') data.locationExact = coords;
    const ref = await addDoc(collection(db, 'throws'), data);
    setStatus('Saved');
    router.push(`/throw/${ref.id}`);
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <h2 className="text-2xl font-bold">Log a pod throw</h2>
      <select className="w-full rounded-xl p-3" value={podTypeId} onChange={e => setPodTypeId(e.target.value)}>
        <option value="pod-resilience">Resilience Mix</option>
        <option value="pod-herbal">Herbal Boost</option>
        <option value="pod-tropical">Tropical Layer</option>
      </select>
      <input className="w-full rounded-xl p-3" type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
      <div className="grid grid-cols-3 gap-2">
        {(['private', 'approximate', 'exact'] as const).map(mode => (
          <button key={mode} type="button" onClick={() => setLocationMode(mode)} className={locationMode === mode ? 'bg-green-600 text-white' : 'bg-white'}>{mode}</button>
        ))}
      </div>
      {locationMode === 'exact' && <p className="rounded-xl bg-amber-100 p-2">Warning: exact location can identify your site.</p>}
      <button className="w-full bg-green-700 text-white" type="submit">Save throw</button>
      <p>{status}</p>
    </form>
  );
}
