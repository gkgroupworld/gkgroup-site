// Frontend configuration only: no storage credentials and no fallback to Forms.
export function projectDeliveryConfig(env) {
  let endpoint;
  try {
    const url = new URL(env.GKGM_API_URL);
    if (url.protocol === "https:" && !url.username && !url.password && !url.port && url.pathname === "/api/gkgm-project" && !url.search && !url.hash) endpoint = url.href;
  } catch { /* collection remains unavailable */ }
  const sitekey = /^[a-zA-Z0-9_-]{10,100}$/.test(env.GKGM_TURNSTILE_SITE_KEY || "") ? env.GKGM_TURNSTILE_SITE_KEY : undefined;
  return { enabled: Boolean(env.GKGM_FRONTEND_ENABLED === "true" && env.GKGM_PRIVACY_APPROVED === "true" && endpoint && sitekey), endpoint, sitekey };
}
