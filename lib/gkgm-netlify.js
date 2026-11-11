import { FORM_NAME } from "../content/gkgm-project.js";
import { validateProject, validatedPayload } from "./gkgm-project.js";

export const NETLIFY_PROJECT_ENDPOINT = "/__gkgm-forms.html";

// Browser convenience, not a server admission boundary. Netlify's collector is
// public and its spam filters do not enforce this application's business rules.
export function netlifyProjectBody(values) {
  if (!["fr", "en"].includes(values.locale) || values.fax?.trim() || Object.keys(validateProject(values)).length) throw new Error("Invalid inquiry");
  const payload = validatedPayload(values);
  if (!payload) throw new Error("Invalid inquiry");
  return new URLSearchParams({ ...payload, "form-name": FORM_NAME, "notice-version": "gkgm-netlify-2026-10-16" }).toString();
}

export async function sendNetlifyProject(values, fetcher = fetch) {
  const response = await fetcher(NETLIFY_PROJECT_ENDPOINT, {
    method: "POST", credentials: "omit", redirect: "error",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: netlifyProjectBody(values), signal: AbortSignal.timeout(25000),
  });
  if (!response.ok) throw new Error("Submission unconfirmed");
  const body = await response.text();
  // A static host can return the reference file without recording a submission.
  if (/gkgm-form-reference|netlify-form-reference/i.test(body)) throw new Error("Submission unconfirmed");
  // HTTP success acknowledges handling, not guaranteed inbox delivery: spam
  // filtering may silently discard submissions. Do not claim storage was proved.
}
