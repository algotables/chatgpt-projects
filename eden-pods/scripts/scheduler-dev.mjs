import { setTimeout as wait } from 'node:timers/promises';
import { spawn } from 'node:child_process';

const intervalMs = Number(process.env.SCHEDULER_INTERVAL_MS || 60000);

async function runOnce() {
  return new Promise((resolve) => {
    const p = spawn('firebase', ['functions:shell', '--config', 'firebase/firebase.json', '--project', 'demo-edenpods'], { stdio: ['pipe', 'pipe', 'pipe'] });
    p.stdin.write('runDueNotifications()\n');
    p.stdin.write('.exit\n');
    p.stdin.end();
    p.on('close', () => resolve(undefined));
  });
}

(async () => {
  while (true) {
    await wait(15000);
    await runOnce();
    await wait(intervalMs);
  }
})();
