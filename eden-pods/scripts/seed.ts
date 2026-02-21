import admin from 'firebase-admin';

process.env.FIRESTORE_EMULATOR_HOST = process.env.FIRESTORE_EMULATOR_HOST || '127.0.0.1:8080';
if (!admin.apps.length) admin.initializeApp({ projectId: 'demo-edenpods' });
const db = admin.firestore();

async function upsert(collectionName: string, docs: Record<string, unknown>[]) {
  await Promise.all(docs.map((doc) => {
    const id = String(doc.id);
    const { id: _, ...data } = doc;
    return db.collection(collectionName).doc(id).set(data, { merge: true });
  }));
}

(async () => {
  await upsert('podTypes', [
    { id: 'pod-resilience', name: 'Resilience Mix', layers: ['ground', 'herb', 'shrub'], nutritionTags: ['fiber', 'iron'] },
    { id: 'pod-herbal', name: 'Herbal Boost', layers: ['ground', 'herb'], nutritionTags: ['polyphenols'] },
    { id: 'pod-tropical', name: 'Tropical Layer', layers: ['vine', 'small-tree'], nutritionTags: ['vitamin-c'] }
  ]);
  await upsert('growthModels', [
    { id: 'temperate-basic', stageDays: [0, 7, 21, 45, 75, 120] },
    { id: 'tropical-fast', stageDays: [0, 5, 14, 30, 60, 90] },
    { id: 'herb-quick', stageDays: [0, 4, 10, 20, 35, 50] }
  ]);
  await upsert('plants', Array.from({ length: 12 }).map((_, i) => ({ id: `plant-${i + 1}`, name: `Demo Plant ${i + 1}`, layer: ['ground','herb','shrub','vine','small-tree'][i%5] })));
  await upsert('recipes', Array.from({ length: 8 }).map((_, i) => ({ id: `recipe-${i + 1}`, name: `Forest Recipe ${i + 1}`, tags: ['quick', 'nutritious'] })));
  console.log('Seed complete');
  process.exit(0);
})();
