import { serviceConfig } from "../src/config.mjs";
import { privateStore } from "../src/store.mjs";
import { turnstileVerifier } from "../src/providers.mjs";
import { collect } from "../src/collector.mjs";

export default async function handler(request, context) {
  try {
    const config = serviceConfig(process.env, context);
    return await collect(request, {
      enabled: config.enabled, origin: config.origin, ip: context.ip,
      secret: config.quotaSecret,
      ...(config.enabled ? { store: privateStore(process.env.GKGM_BLOBS_REGION), verify: turnstileVerifier({ secret: config.turnstileSecret, hostname: config.hostname }) } : {}),
    });
  } catch { return Response.json({ ok: false, code: "unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}

export const config = {
  path: ["/api/gkgm-project", "/.netlify/functions/gkgm-ingest"],
  rateLimit: { windowLimit: 10, windowSize: 60, aggregateBy: ["ip", "domain"] },
};
