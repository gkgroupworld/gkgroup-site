import { createHmac, randomUUID } from "node:crypto";
import { mutate } from "./store.mjs";

export const HOUR = 3600000;
export const DAY = 24 * HOUR;
export const LIMITS = Object.freeze({ attempts: 10, ip: 3, contact: 3, service: 100 });
export const digest = (secret, purpose, value) => createHmac("sha256", secret).update(`${purpose}\0${value}`).digest("hex");

function clean(data, now) {
  if (data && (data.schema !== 1 || !Array.isArray(data.admissions) || !data.attempts || typeof data.attempts !== "object")) throw new Error("Ledger invalid");
  const attempts = Object.fromEntries(Object.entries(data?.attempts || {}).map(([ip, times]) => [ip, times.filter(t => t > now - 60000)]).filter(([, times]) => times.length));
  // 47 h + a normal 15-minute maintenance interval stays below the proposed 48 h.
  return { schema: 1, attempts, admissions: (data?.admissions || []).filter(a => a.at > now - (2 * DAY - HOUR)) };
}

// One CAS ledger makes the three admission limits and retry reservation atomic.
// A lost response/storage failure can consume quota conservatively; it never refunds
// capacity unsafely or admits over quota. Bounded cardinality fails closed under flood.
export async function takeAttempt(store, ip, now) {
  return mutate(store, "system/admission-v1", data => {
    const ledger = clean(data, now);
    const times = ledger.attempts[ip] || [];
    if (times.length >= LIMITS.attempts || (!ledger.attempts[ip] && Object.keys(ledger.attempts).length >= 2048)) return { write: false, result: false };
    ledger.attempts[ip] = [...times, now];
    return { write: true, value: ledger, result: true };
  });
}

export async function reserve(store, { ip, contacts, attempt, fingerprint, now }) {
  const record = randomUUID();
  return mutate(store, "system/admission-v1", data => {
    const ledger = clean(data, now);
    const existing = ledger.admissions.find(a => a.attempt === attempt);
    if (existing) return { write: false, result: existing.fingerprint === fingerprint ? { ok: true, admission: existing } : { ok: false, code: "conflict" } };
    const recent = ledger.admissions.filter(a => a.at > now - DAY);
    const blocked = recent.length >= LIMITS.service || recent.filter(a => a.ip === ip && a.at > now - HOUR).length >= LIMITS.ip || contacts.some(contact => recent.filter(a => a.contacts.includes(contact)).length >= LIMITS.contact);
    if (blocked) return { write: false, result: { ok: false, code: "quota" } };
    const admission = { ip, contacts, attempt, fingerprint, at: now, record };
    ledger.admissions.push(admission);
    return { write: true, value: ledger, result: { ok: true, admission } };
  });
}

export async function pruneLedger(store, now) {
  return mutate(store, "system/admission-v1", data => {
    if (!data) return { write: false, result: true };
    return { write: true, value: clean(data, now), result: true };
  });
}
