const keyId = 'edenpods.aes.key';

async function loadOrCreateKey() {
  const saved = localStorage.getItem(keyId);
  if (saved) {
    const raw = Uint8Array.from(atob(saved), c => c.charCodeAt(0));
    return crypto.subtle.importKey('raw', raw, 'AES-GCM', true, ['encrypt', 'decrypt']);
  }
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  const raw = new Uint8Array(await crypto.subtle.exportKey('raw', key));
  localStorage.setItem(keyId, btoa(String.fromCharCode(...raw)));
  return key;
}

export async function encryptLocation(payload: unknown) {
  const key = await loadOrCreateKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify(payload));
  const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plaintext);
  const combo = new Uint8Array(iv.length + encrypted.byteLength);
  combo.set(iv, 0);
  combo.set(new Uint8Array(encrypted), iv.length);
  return btoa(String.fromCharCode(...combo));
}
