import { zohoSettingsValid } from "./providers.mjs";

export function serviceConfig(env, context = {}) {
  let origin;
  try {
    const url = new URL(env.GKGM_ALLOWED_ORIGIN);
    if (url.protocol === "https:" && !url.username && !url.password && url.pathname === "/" && !url.search && !url.hash) origin = url.origin;
  } catch { /* incomplete configuration remains closed */ }
  const published = context.deploy?.context === "production" && context.deploy?.published === true;
  const siteMatches = Boolean(env.GKGM_SERVICE_SITE_ID) && context.site?.id === env.GKGM_SERVICE_SITE_ID;
  const runtime = published && siteMatches && ["us-east-1", "us-east-2", "eu-central-1", "ap-southeast-1", "ap-southeast-2"].includes(env.GKGM_BLOBS_REGION);
  const ready = runtime && origin && env.GKGM_QUOTA_SECRET?.length >= 32 && env.GKGM_TURNSTILE_SECRET?.length >= 16;
  return {
    enabled: Boolean(ready && env.GKGM_COLLECTION_ENABLED === "true" && env.GKGM_PRIVACY_APPROVED === "true" && env.GKGM_MIGRATION_APPROVED === "true" && env.GKGM_MAINTENANCE_ENABLED === "true" && env.GKGM_NOTIFICATION_ENABLED === "true" && zohoSettingsValid(env)),
    maintenanceEnabled: Boolean(runtime && env.GKGM_MAINTENANCE_ENABLED === "true"),
    notificationEnabled: Boolean(runtime && env.GKGM_MAINTENANCE_ENABLED === "true" && env.GKGM_NOTIFICATION_ENABLED === "true"),
    origin, quotaSecret: env.GKGM_QUOTA_SECRET, turnstileSecret: env.GKGM_TURNSTILE_SECRET,
    hostname: origin ? new URL(origin).hostname : undefined,
  };
}
