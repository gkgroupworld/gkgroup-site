// Native Forms only. These switches do not disable Netlify's public collector.
export function projectDeliveryConfig(env) {
  // Scope both switches to production in Netlify; CONTEXT is a build variable
  // and must not be assumed available to Next.js server rendering at runtime.
  const preview = ["deploy-preview", "branch-deploy", "dev"].includes(env.CONTEXT);
  return { enabled: !preview && env.GKGM_FRONTEND_ENABLED === "true" && env.GKGM_PRIVACY_APPROVED === "true" };
}
