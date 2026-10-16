import { validateProject, validatedPayload } from "./gkgm-project.js";

const reply = (body, status) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

// SITE_NAME/SITE_ID are reserved, read-only Netlify runtime variables.
// Configure the approval flag for Production Functions only after explicit approval.
export function projectDeliveryConfig(env) {
  const validSite = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(env.SITE_NAME || "");
  return {
    enabled: env.GKGM_PRIVACY_APPROVED === "true" && Boolean(env.SITE_ID) && validSite,
    upstreamOrigin: validSite ? `https://${env.SITE_NAME}.netlify.app` : undefined,
  };
}

// Transport dependency is injectable for offline tests; never returns submitted personal data.
export async function handleProjectRequest(request, { enabled = false, upstreamOrigin, fetcher = fetch } = {}) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host") || new URL(request.url).host;
    let originUrl;
    try { originUrl = origin ? new URL(origin) : null; }
    catch { return reply({ ok: false, code: "origin" }, 403); }
    const localHttp = originUrl?.protocol === "http:" && ["localhost", "127.0.0.1", "[::1]"].includes(originUrl.hostname);
    if (!originUrl || originUrl.host !== host || (originUrl.protocol !== "https:" && !localHttp)) return reply({ ok: false, code: "origin" }, 403);
    const mediaType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
    if (mediaType !== "application/x-www-form-urlencoded") return reply({ ok: false, code: "encoding" }, 415);
    const reader = request.body?.getReader();
    if (!reader) return reply({ ok: false, code: "body" }, 400);
    const chunks = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 20000) { await reader.cancel(); return reply({ ok: false, code: "size" }, 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    const params = new URLSearchParams(new TextDecoder().decode(bytes));
    if ([...params.keys()].some(key => params.getAll(key).length !== 1)) return reply({ ok: false, code: "duplicate" }, 400);
    const values = Object.fromEntries(params);
    if (values.fax?.trim()) return reply({ ok: false, code: "spam" }, 400);
    if (!["fr", "en"].includes(values.locale)) return reply({ ok: false, code: "locale" }, 400);
    const errors = validateProject(values);
    if (Object.keys(errors).length) return reply({ ok: false, errors }, 422);
    const payload = validatedPayload(values);
    if (!payload) return reply({ ok: false, code: "fields" }, 400);
    if (!enabled || !upstreamOrigin) return reply({ ok: false, code: "privacy_pending" }, 503);
    const target = new URL("/__gkgm-forms.html", upstreamOrigin);
    // Upstream is deployment configuration, never a user-provided return URL.
    if (target.protocol !== "https:" || !target.hostname.endsWith(".netlify.app")) return reply({ ok: false, code: "configuration" }, 503);
    const response = await fetcher(target, { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(payload).toString(), redirect: "error", signal: AbortSignal.timeout(20000) });
    if (!response.ok || response.redirected) return reply({ ok: false, code: "delivery" }, 502);
    const body = await response.text();
    if (body.includes('id="gkgm-form-reference"') || body.includes("/_next/") || /<title>[^<]*GK GROUP/i.test(body)) return reply({ ok: false, code: "handler_unavailable" }, 502);
    return reply({ ok: true }, 200);
  } catch {
    return reply({ ok: false, code: "delivery" }, 502);
  }
}
