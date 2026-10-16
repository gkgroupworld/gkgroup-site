import { serviceConfig } from "../src/config.mjs";
import { privateStore } from "../src/store.mjs";
import { purgeExpired } from "../src/maintenance.mjs";

export default async function handler(_request, context) {
  if (!serviceConfig(process.env, context).maintenanceEnabled) return new Response(null, { status: 503 });
  try {
    await purgeExpired(privateStore(process.env.GKGM_BLOBS_REGION));
    return new Response(null, { status: 204 });
  } catch { return new Response(null, { status: 503 }); }
}
export const config = { schedule: "15 * * * *" };
