import { getStore } from "@netlify/blobs";

export function checkedStore(options = {}) {
  const fetcher = options.fetch || fetch;
  return getStore({ ...options, name: "gkgm-private-v1", consistency: "strong", fetch: async (url, init) => {
    const response = await fetcher(url, { ...init, redirect: "error", signal: AbortSignal.timeout(8000) });
    const method = init?.method?.toUpperCase();
    // SDK 11.1.4 treats every conditional PUT response except 412 as modified.
    // Validate HTTP status before the SDK sees it: never accept a 401/5xx as CAS.
    const allowed = method === "PUT" ? [200, 412] : method === "DELETE" ? [200, 204, 404] : [200, 204, 304, 404];
    if (!allowed.includes(response.status) || response.redirected) { await response.body?.cancel(); throw new Error("Private storage unavailable"); }
    return response;
  } });
}

export function privateStore(region) {
  if (!region) throw new Error("Store configuration missing");
  // Uses this dedicated site's server identity. No PAT or browser upload URL.
  return checkedStore({ region });
}

export async function read(store, key) {
  const entry = await store.getWithMetadata(key, { type: "json", consistency: "strong" });
  if (entry && !entry.etag) throw new Error("CAS unavailable");
  return entry;
}

export async function mutate(store, key, change, attempts = 24) {
  for (let i = 0; i < attempts; i++) {
    const entry = await read(store, key);
    const decision = change(entry?.data ?? null);
    if (!decision.write) return decision.result;
    const next = { ...decision.value, revision: (entry?.data?.revision || 0) + 1 };
    const result = await store.setJSON(key, next, entry ? { onlyIfMatch: entry.etag } : { onlyIfNew: true });
    if (result?.modified === true && result.etag) return decision.result;
    if (result?.modified !== false) throw new Error("CAS unsupported");
  }
  throw new Error("CAS contention");
}
