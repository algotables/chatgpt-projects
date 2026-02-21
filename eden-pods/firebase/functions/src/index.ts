import * as admin from 'firebase-admin';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';

admin.initializeApp();
const db = admin.firestore();

const stageOffsets = [0, 7, 21, 45, 75, 120];
const stageIds = ['germination', 'sprout', 'leafing', 'flowering', 'fruiting', 'seed-spread'];

export const scheduleNotificationsOnThrow = onDocumentCreated('throws/{throwId}', async (event) => {
  const data = event.data?.data();
  if (!data?.ownerId || !data.throwDate) return;
  const base = new Date(data.throwDate);

  await Promise.all(stageOffsets.map((offset, i) => db.collection('notifications').add({
    userId: data.ownerId,
    throwId: event.params.throwId,
    stageId: stageIds[i],
    scheduledFor: admin.firestore.Timestamp.fromDate(new Date(base.getTime() + offset * 86400000)),
    status: 'scheduled',
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  })));
});

export const runDueNotifications = onSchedule('every day 07:00', async () => {
  const now = admin.firestore.Timestamp.now();
  const snap = await db.collection('notifications').where('status', '==', 'scheduled').where('scheduledFor', '<=', now).get();
  await Promise.all(snap.docs.map(doc => doc.ref.update({ status: 'in_app_ready', sentAt: admin.firestore.FieldValue.serverTimestamp() })));
});
