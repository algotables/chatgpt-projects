'use client';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export default function NotificationsPage() {
  const [items, setItems] = useState<{ id: string; stageId?: string; status?: string }[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;
    const q = query(collection(db, 'notifications'), where('userId', '==', user.uid));
    return onSnapshot(q, snap => setItems(snap.docs.map(d => ({ id: d.id, ...(d.data() as Record<string, string>) }))));
  }, []);

  return (
    <main className="space-y-3">
      <h2 className="text-2xl font-bold">Notification Center ({items.length})</h2>
      {items.map(item => (
        <div className="rounded-xl bg-white p-3" key={item.id}>{item.stageId} - {item.status}</div>
      ))}
      {items.length === 0 && <div className="rounded-xl bg-white p-3">No reminders yet. Add a throw.</div>}
    </main>
  );
}
