import { projectDeliveryConfig } from "../lib/gkgm-project-server.js";

// Read only: no network, no environment writes, no values or credentials printed.
const expectEnabled = process.argv.includes("--expect-enabled");
const config = projectDeliveryConfig(process.env);
const report = {
  scope: "current Node process only; not a remote Netlify configuration audit",
  expected: expectEnabled ? "enabled" : "disabled",
  activationFlag: process.env.GKGM_PRIVACY_APPROVED === undefined ? "unset" : process.env.GKGM_PRIVACY_APPROVED === "true" ? "enabled" : "disabled",
  siteNamePresent: Boolean(process.env.SITE_NAME),
  siteNameValid: Boolean(config.upstreamOrigin),
  siteIdPresent: Boolean(process.env.SITE_ID),
  deliveryEnabled: config.enabled,
};
console.log(JSON.stringify(report, null, 2));
// Disabled review mode also detects an accidentally true flag with missing site data.
if (expectEnabled ? !config.enabled : config.enabled || process.env.GKGM_PRIVACY_APPROVED === "true") process.exitCode = 1;
