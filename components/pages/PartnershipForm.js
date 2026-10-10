"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { CONTACT } from "@/content/site";

const subscribe = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

const inputClass = "mt-2 w-full border border-slate-300 bg-white px-3 py-3 text-sm text-[#15213b]";
const labelClass = "block text-sm font-bold text-[#061b46]";
const fieldSpecs = [
  ["organisation", "text", "organization", 160], ["country", "text", "country-name", 100],
  ["name", "text", "name", 120], ["role", "text", "organization-title", 120],
  ["email", "email", "email", 254], ["phone", "tel", "tel", 40],
  ["website", "url", "url", 300], ["type", "text", "off", 200],
];

export function PartnershipForm({ copy }) {
  const hydrated = useSyncExternalStore(subscribe, clientSnapshot, serverSnapshot);
  const formRef = useRef(null);
  const inFlight = useRef(false);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function resetMessages() { setErrors({}); setStatus(""); setSubmitted(false); }

  async function submit(event) {
    event.preventDefault();
    if (inFlight.current || submitted) return;
    setStatus("");
    setSubmitted(false);
    const form = formRef.current;
    const values = Object.fromEntries(new FormData(form).entries());
    const fieldErrors = {};
    for (const [key] of fieldSpecs) {
      values[key] = String(values[key] || "").trim();
      if (key !== "website" && !values[key]) fieldErrors[key] = copy.requiredError;
    }
    if (values.email && form.elements.email.validity.typeMismatch) fieldErrors.email = copy.emailError;
    if (values.website) {
      try { const url = new URL(values.website); if (!["https:", "http:"].includes(url.protocol)) fieldErrors.website = copy.urlError; }
      catch { fieldErrors.website = copy.urlError; }
    }
    const digits = (values.phone || "").replace(/\D/g, "");
    if (values.phone && (digits.length < 6 || digits.length > 20 || !/^[+()\d\s.\-]+$/.test(values.phone))) fieldErrors.phone = copy.phoneError;
    if (!copy.options.some(([value]) => value === values.area)) fieldErrors.area = copy.requiredError;
    values.description = String(values.description || "").trim();
    if (values.description.length < 30) fieldErrors.description = copy.descriptionError;
    if (values.consent !== "yes") fieldErrors.consent = copy.consentError;
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length) {
      setStatus(copy.invalid);
      form.querySelector(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus();
      return;
    }
    if (String(values.fax || "").trim()) { setStatus(copy.spamError); return; }
    inFlight.current = true;
    setSubmitting(true);
    try {
      // Post to the static asset so Netlify handles this before the Next.js runtime.
      const response = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(values).toString(),
        redirect: "error",
        signal: AbortSignal.timeout(30000),
      });
      if (!response.ok) throw new Error("Submission rejected");
      // A misconfigured static host may return the reference file for POST requests.
      const body = await response.text();
      if (body.includes('id="netlify-form-reference"')) throw new Error("Form handler unavailable");
      setSubmitted(true);
    } catch {
      setStatus(copy.failed);
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  }

  function errorProps(key) {
    return { "aria-invalid": errors[key] ? "true" : undefined, "aria-describedby": errors[key] ? `partnership-${key}-error` : undefined };
  }
  function fieldError(name) {
    return errors[name] ? <span id={`partnership-${name}-error`} className="mt-2 block text-sm font-normal text-red-700">{errors[name]}</span> : null;
  }

  return <form id="partnership-form" ref={formRef} name="international-partnerships" method="POST" action="/__forms.html" onSubmit={submit} aria-busy={submitting} onChange={resetMessages} noValidate aria-label={copy.subject} className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <p className="text-sm leading-6 text-slate-600">{copy.channel}</p>
    <p className="mt-3 text-sm leading-6 text-slate-600">{copy.required}</p>
    <input type="hidden" name="form-name" value="international-partnerships" />
    <input type="hidden" name="locale" value={copy.locale} />
    <fieldset disabled={!hydrated || submitting} className="min-w-0"><div hidden aria-hidden="true"><label htmlFor="partnership-fax">Fax<input id="partnership-fax" name="fax" tabIndex={-1} autoComplete="off" /></label></div>
    <div className="mt-7 grid gap-5 sm:grid-cols-2">
      {fieldSpecs.map(([key, type, autoComplete, maxLength]) => <label key={key} htmlFor={`partnership-${key}`} className={labelClass}>{copy.labels[key]}{key !== "website" && " *"}<input id={`partnership-${key}`} name={key} type={type} autoComplete={autoComplete} maxLength={maxLength} required={key !== "website"} className={inputClass} {...errorProps(key)} />{fieldError(key)}</label>)}
    </div>
    <label htmlFor="partnership-area" className={`mt-5 ${labelClass}`}>{copy.labels.area} *<select id="partnership-area" name="area" required defaultValue="" className={inputClass} {...errorProps("area")}><option value="" disabled>—</option>{copy.options.map(([id, label]) => <option value={id} key={id}>{label}</option>)}</select>{fieldError("area")}</label>
    <label htmlFor="partnership-description" className={`mt-5 ${labelClass}`}>{copy.labels.description} *<textarea id="partnership-description" name="description" required minLength={30} maxLength={2000} rows={7} className={inputClass} {...errorProps("description")} />{fieldError("description")}</label>
    <label htmlFor="partnership-consent" className="mt-6 flex items-start gap-3 text-sm leading-6 text-slate-600"><input id="partnership-consent" name="consent" type="checkbox" value="yes" required className="mt-1 h-5 w-5 shrink-0 accent-[#061b46]" {...errorProps("consent")} /><span>{copy.consent} *{fieldError("consent")}</span></label>
    {status && <p role="alert" className="mt-6 border-l-4 border-red-700 bg-red-50 p-4 text-sm leading-6 text-red-800">{status}</p>}
    <button type="submit" disabled={submitted} className="mt-7 inline-flex min-h-11 items-center justify-center bg-[#061b46] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0c3269]">{submitting ? copy.submitting : copy.prepare}</button>
    {submitted && <p role="status" className="mt-7 border-l-4 border-[#e87512] bg-[#f5f7fa] p-5 text-sm leading-6 text-[#061b46]">{copy.ready}</p>}
    <p className="mt-6 text-xs leading-5 text-slate-500">{copy.privacy}</p>
    </fieldset>
    <div className="mt-5 flex flex-wrap gap-3"><a href={CONTACT.emailHref} className="inline-flex min-h-11 items-center border border-[#061b46] px-4 py-2 text-sm font-bold">{copy.emailAction}</a><a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border border-[#061b46] px-4 py-2 text-sm font-bold">{copy.whatsappAction}</a></div>
    <noscript><p className="mt-5 text-sm leading-6">{copy.contactFallback || copy.channel} <a href={CONTACT.emailHref}>{CONTACT.email}</a> · <a href={CONTACT.whatsappHref}>WhatsApp {CONTACT.whatsapp}</a></p></noscript>
  </form>;
}
