import { serviceConfig } from "../src/config.mjs";
import { privateStore } from "../src/store.mjs";
import { zohoNotifier } from "../src/providers.mjs";
import { processOutbox } from "../src/maintenance.mjs";

export default async function handler(_request, context) {
  if (!serviceConfig(process.env, context).notificationEnabled) return new Response(null, { status: 503 });
  try {
    await processOutbox(privateStore(process.env.GKGM_BLOBS_REGION), zohoNotifier(process.env));
    return new Response(null, { status: 204 });
  } catch { return new Response(null, { status: 503 }); }
}
// Schedule excludes public HTTP invocation under the Netlify platform contract.
export const config = { schedule: "*/15 * * * *" };
