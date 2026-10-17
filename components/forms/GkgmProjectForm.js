"use client";

import { useRef, useState, useSyncExternalStore } from "react";
import { COMMON_FIELDS, DESCRIPTION_FIELD, PROJECT_TYPES, PROJECT_COPY } from "@/content/gkgm-project";
import { projectFields, validateProject } from "@/lib/gkgm-project";
import { NETLIFY_PROJECT_ENDPOINT, sendNetlifyProject } from "@/lib/gkgm-netlify";

const subscribe = () => () => {};
const inputClass = "mt-2 w-full rounded border border-slate-300 bg-white px-3 py-3 text-base font-normal text-[#15213b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#946020]";
const buttonClass = "inline-flex min-h-12 items-center justify-center rounded border border-[#946020] bg-[#061b46] px-5 py-3 font-bold text-white disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#946020]";

export function GkgmProjectForm({ locale, enabled = false }) {
  const copy = PROJECT_COPY[locale];
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const [values, setValues] = useState({ type: "", consent: "", locale });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const inFlight = useRef(false);
  const project = PROJECT_TYPES.find(item => item.id === values.type);
  const visible = step === 1 ? COMMON_FIELDS : step === 2 ? [...(project?.fields || []), DESCRIPTION_FIELD] : [];

  function update(id, value) {
    setStatus(""); setErrors(current => ({ ...current, [id]: undefined }));
    setValues(current => {
      if (id !== "type") return { ...current, [id]: value };
      const common = Object.fromEntries(COMMON_FIELDS.map(field => [field.id, current[field.id] || ""]));
      return { ...common, type: value, locale, consent: "", ...(value === "d2" ? { destination: "Portugal" } : {}) };
    });
  }
  function focusStep(next) { setStep(next); setErrors({}); setStatus(""); requestAnimationFrame(() => titleRef.current?.focus()); }
  function showErrors(nextErrors) {
    setErrors(nextErrors); setStatus(copy.invalid);
    requestAnimationFrame(() => formRef.current?.querySelector(`[name="${Object.keys(nextErrors)[0]}"]`)?.focus());
  }
  function advance() {
    const all = validateProject(values);
    const keys = step === 0 ? ["type"] : visible.map(field => field.id);
    const current = Object.fromEntries(keys.filter(id => all[id]).map(id => [id, all[id]]));
    if (Object.keys(current).length) { showErrors(current); return; }
    focusStep(step + 1);
  }
  async function submit(event) {
    event.preventDefault();
    if (step < 3) { advance(); return; }
    if (inFlight.current || sent) return;
    const nextErrors = validateProject(values);
    if (Object.keys(nextErrors).length) { showErrors(nextErrors); return; }
    if (!enabled) { setStatus(copy.pending); return; }
    if (values.fax?.trim()) { setStatus(copy.failed); return; }
    inFlight.current = true; setBusy(true); setStatus("");
    try {
      const payload = { type: values.type, locale, consent: values.consent, fax: values.fax || "" };
      for (const field of projectFields(values.type)) if (values[field.id]) payload[field.id] = values[field.id];
      await sendNetlifyProject(payload);
      setSent(true);
      requestAnimationFrame(() => titleRef.current?.focus());
    } catch { setStatus(copy.failed); }
    finally { inFlight.current = false; setBusy(false); }
  }
  function field(spec) {
    const id = `gkgm-${spec.id}`;
    const required = !spec.optional || (spec.id === "whatsapp" && values.contact === "whatsapp");
    const props = { id, name: spec.id, value: values[spec.id] || "", onChange: event => update(spec.id, event.target.value), required, "aria-invalid": errors[spec.id] ? true : undefined, "aria-describedby": errors[spec.id] ? `${id}-error` : undefined, className: inputClass };
    return <label key={spec.id} htmlFor={id} className="block min-w-0 text-sm font-bold text-[#061b46]">{spec.label[locale]}{required && " *"}
      {spec.choices ? <select {...props}><option value="">{copy.choose}</option>{spec.choices.map(choice => <option key={choice.id} value={choice.id}>{choice.label[locale]}</option>)}</select>
        : spec.type === "textarea" ? <textarea {...props} minLength={spec.minLength} maxLength={spec.max} rows={6} />
          : <input {...props} type={spec.type || "text"} maxLength={spec.max || 400} autoComplete={spec.autoComplete || "off"} min={spec.min} max={spec.maxNumber} readOnly={spec.id === "destination" && values.type === "d2"} />}
      {errors[spec.id] && <span id={`${id}-error`} className="mt-2 block font-normal text-red-700">{copy[errors[spec.id]] || copy.requiredError}</span>}
    </label>;
  }
  return <form ref={formRef} name="gkgm-project-inquiry" id="gkgm-project-form" method="POST" action={enabled ? NETLIFY_PROJECT_ENDPOINT : "/api/gkgm-project"} onSubmit={submit} noValidate aria-busy={busy} className="rounded border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
    <input type="hidden" name="form-name" value="gkgm-project-inquiry" />
    <ol aria-label={locale === "fr" ? "Progression" : "Progress"} className="mb-8 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">{copy.steps.map((label, index) => <li key={label} aria-current={index === step ? "step" : undefined} className={`border-t-2 pt-3 ${index <= step ? "border-[#946020] font-bold text-[#061b46]" : "border-slate-200 text-slate-600"}`}>{index + 1}. {label}</li>)}</ol>
    <h2 ref={titleRef} tabIndex={-1} className="text-2xl font-bold text-[#061b46]">{sent ? copy.received : copy.steps[step]}</h2>
    {sent ? <p role="status" className="mt-5 border-l-4 border-[#946020] bg-[#f5f7fa] p-5 leading-7">{copy.success}</p> : <>
      <p className="mt-4 text-sm text-slate-600">{copy.required}</p>
      <p className="mt-4 text-sm leading-6 text-slate-600">{copy.minimisation}</p>
      {!enabled && <p className="mt-4 border-l-2 border-[#946020] bg-[#f5f7fa] p-4 text-sm leading-6">{copy.pending}</p>}
      <fieldset disabled={!hydrated || busy} className="mt-7 min-w-0">
        <legend className="sr-only">{copy.steps[step]}</legend>
        <div hidden aria-hidden="true"><label htmlFor="gkgm-fax">Fax<input id="gkgm-fax" name="fax" value={values.fax || ""} onChange={e => update("fax", e.target.value)} tabIndex={-1} autoComplete="off" /></label></div>
        {step === 0 && field({ id: "type", label: { [locale]: copy.category }, choices: PROJECT_TYPES })}
        <div className="grid gap-6 sm:grid-cols-2">{visible.map(spec => <div key={spec.id} className={spec.type === "textarea" ? "sm:col-span-2" : ""}>{field(spec)}</div>)}</div>
        {step === 3 && <>
          <p className="mb-5 text-slate-600">{copy.review}</p>
          <dl className="grid gap-5 break-words rounded bg-[#f5f7fa] p-5 text-sm leading-6"><div><dt className="font-bold">{copy.category}</dt><dd>{project?.label[locale]}</dd></div>{projectFields(values.type).filter(spec => values[spec.id]).map(spec => <div key={spec.id}><dt className="font-bold">{spec.label[locale]}</dt><dd className="whitespace-pre-wrap">{spec.choices?.find(choice => choice.id === values[spec.id])?.label[locale] || values[spec.id]}</dd></div>)}</dl>
          <section aria-labelledby="gkgm-privacy" className="mt-8"><h3 id="gkgm-privacy" className="text-xl font-bold">{copy.privacyTitle}</h3><p className="mt-4 font-bold text-[#805217]">{copy.privacyPending}</p>{copy.privacy.map(p => <p key={p} className="mt-4 text-sm leading-7 text-slate-600">{p}</p>)}<a href="mailto:gk.contactus@gkgroup.app" className="mt-4 inline-block underline">gk.contactus@gkgroup.app</a></section>
          <label htmlFor="gkgm-consent" className="mt-6 flex items-start gap-3 text-sm leading-6"><input id="gkgm-consent" type="checkbox" name="consent" checked={values.consent === "yes"} onChange={e => update("consent", e.target.checked ? "yes" : "")} required aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? "gkgm-consent-error" : undefined} className="mt-1 h-5 w-5 shrink-0 accent-[#061b46]" /><span>{copy.consent}{errors.consent && <span id="gkgm-consent-error" className="block text-red-700">{copy.consentError}</span>}</span></label>
        </>}
        {status && <p role="alert" className="mt-6 rounded border-l-4 border-red-700 bg-red-50 p-4 text-sm leading-6 text-red-800">{status}</p>}
        <div className="mt-7 flex flex-wrap gap-4">{step > 0 && <button type="button" onClick={() => focusStep(step - 1)} className="min-h-12 rounded border border-slate-400 px-5 py-3 font-bold">{copy.back}</button>}<button type="submit" className={buttonClass} style={{ color: "#ffffff" }}>{busy ? copy.sending : step === 3 ? copy.submit : copy.next}</button></div>
      </fieldset>
    </>}
    <noscript><p className="mt-5">{copy.unavailable} <a href="mailto:gk.contactus@gkgroup.app" className="underline">gk.contactus@gkgroup.app</a></p></noscript>
  </form>;
}
