const ZOHO_DOMAINS = new Set(["com", "eu", "in", "com.au", "jp", "ca", "com.cn", "sa"]);

export const zohoSettingsValid = env => Boolean(ZOHO_DOMAINS.has(env.GKGM_ZOHO_DOMAIN) && /^\d+$/.test(env.GKGM_ZOHO_ACCOUNT_ID || "") && env.GKGM_ZOHO_CLIENT_ID && env.GKGM_ZOHO_CLIENT_SECRET && env.GKGM_ZOHO_REFRESH_TOKEN);

export function turnstileVerifier({ secret, hostname, fetcher = fetch }) {
  return async token => {
    if (!token || token.length > 2048) return false;
    const response = await fetcher("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(8000),
      body: new URLSearchParams({ secret, response: token }),
    });
    if (!response.ok) return false;
    const result = await response.json();
    return result.success === true && result.hostname === hostname && result.action === "gkgm_project";
  };
}

// No client data, reference, dynamic recipient, URL, or provider response in message/logs.
// Even the opaque record identifier is omitted to minimise metadata duplication.
export function zohoNotifier(env, fetcher = fetch) {
  return async () => {
    const suffix = env.GKGM_ZOHO_DOMAIN;
    if (!zohoSettingsValid(env)) throw new Error("Notification configuration");
    const auth = await fetcher(`https://accounts.zoho.${suffix}/oauth/v2/token`, {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(8000),
      body: new URLSearchParams({ grant_type: "refresh_token", client_id: env.GKGM_ZOHO_CLIENT_ID, client_secret: env.GKGM_ZOHO_CLIENT_SECRET, refresh_token: env.GKGM_ZOHO_REFRESH_TOKEN }),
    });
    if (!auth.ok) throw new Error("Notification unavailable");
    const token = await auth.json();
    if (typeof token.access_token !== "string" || !token.access_token) throw new Error("Notification unavailable");
    const response = await fetcher(`https://mail.zoho.${suffix}/api/accounts/${env.GKGM_ZOHO_ACCOUNT_ID}/messages`, {
      method: "POST", redirect: "error", signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Zoho-oauthtoken ${token.access_token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ fromAddress: "gk.contactus@gkgroup.app", toAddress: "gk.contactus@gkgroup.app", subject: "GKGM — Nouvelle demande validée / New validated inquiry", content: "Une nouvelle demande validée est disponible dans l’espace privé GKGM. / A new validated inquiry is available in the private GKGM workspace.", mailFormat: "plaintext" }),
    });
    if (!response.ok) throw new Error("Notification unavailable");
    const result = await response.json();
    if (result.status?.code !== 200) throw new Error("Notification unavailable");
  };
}
