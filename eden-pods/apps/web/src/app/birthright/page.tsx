export default function Birthright() {
  return (
    <main className="space-y-3">
      <h2 className="text-2xl font-bold">Birthright Forest kit</h2>
      <div className="rounded-xl bg-white p-3">Kit setup: 12-24 pods selected.</div>
      <table className="w-full rounded-xl bg-white p-3 text-left text-sm">
        <tbody>
          <tr><th>Cycle</th><th>Pods if doubling</th></tr>
          <tr><td>Year 1</td><td>24</td></tr>
          <tr><td>Year 2</td><td>48</td></tr>
          <tr><td>Year 3</td><td>96</td></tr>
        </tbody>
      </table>
      <div className="rounded-xl bg-green-100 p-3">3-zone: harvest, recover, reseed. 5-zone: add pollinator + wild refuge zones.</div>
    </main>
  );
}
