export default function Dashboard() {
  return (
    <main className="space-y-3">
      <h2 className="text-2xl font-bold">Forest dashboard</h2>
      <div className="rounded-xl bg-white p-3">Total throws: 4</div>
      <div className="rounded-xl bg-white p-3">Dominant stage: Leafing</div>
      <div className="rounded-xl bg-green-100 p-3">Action now: Check moisture, mark sprouts, plan harvest rotation.</div>
      <div className="rounded-xl bg-white p-3">Seasonal checklist: mulch, observe flowers, leave 30% to reseed.</div>
    </main>
  );
}
