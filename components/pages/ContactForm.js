"use client";

import { useRef } from "react";

export function ContactForm({ copy, partnership, locale }) {
  const formRef = useRef(null);
  const fields = copy.form.fields;
  const partnershipValue = partnership ? copy.form.options[5] : "";
  const fr = locale === "fr";
  const inputClass = "mt-2 w-full border border-slate-300 bg-white px-3 py-3 text-sm text-[#15213b]";
  const labelClass = "block text-sm font-bold text-[#061b46]";

  function getMessage() {
    const values = Object.fromEntries(new FormData(formRef.current).entries());
    const organisation = values.organisation?.trim() || (fr ? "Non renseigné" : "Not provided");
    return fr ? `Bonjour GK GROUP,\n\nJe souhaite vous transmettre une demande via votre site internet.\n\nNom complet : ${values.name}\nEmail : ${values.email}\nTéléphone : ${values.phone}\nPays : ${values.country}\nSociété / Organisation : ${organisation}\nDomaine concerné : ${values.area}\nObjet : ${values.subject}\n\nMessage :\n${values.message}\n\nCordialement,\n${values.name}` : `Hello GK GROUP,\n\nI would like to submit an inquiry through your website.\n\nFull name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nCountry: ${values.country}\nCompany / Organization: ${organisation}\nArea of interest: ${values.area}\nSubject: ${values.subject}\n\nMessage:\n${values.message}\n\nKind regards,\n${values.name}`;
  }

  function ensureValid() { return formRef.current?.reportValidity(); }
  function openWhatsApp() { if (!ensureValid()) return; window.open(`https://wa.me/22890559888?text=${encodeURIComponent(getMessage())}`, "_blank", "noopener,noreferrer"); }
  function openEmail() { if (!ensureValid()) return; const values = Object.fromEntries(new FormData(formRef.current).entries()); window.location.href = `mailto:gk.contactus@gkgroup.app?subject=${encodeURIComponent(values.subject)}&body=${encodeURIComponent(getMessage())}`; }
  function handleSubmit(event) { event.preventDefault(); openWhatsApp(); }

  return <form id="contact-form" ref={formRef} onSubmit={handleSubmit} className="border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><p className="mb-7 text-sm leading-6 text-slate-600">{copy.form.intro}</p><div className="grid gap-5 sm:grid-cols-2"><label className={labelClass} htmlFor="name">{fields.name} *<input className={inputClass} id="name" name="name" autoComplete="name" required /></label><label className={labelClass} htmlFor="email">{fields.email} *<input className={inputClass} id="email" name="email" type="email" autoComplete="email" required /></label><label className={labelClass} htmlFor="phone">{fields.phone} *<input className={inputClass} id="phone" name="phone" type="tel" autoComplete="tel" required /></label><label className={labelClass} htmlFor="country">{fields.country} *<input className={inputClass} id="country" name="country" autoComplete="country-name" required /></label><label className={labelClass} htmlFor="organisation">{fields.organisation}<input className={inputClass} id="organisation" name="organisation" autoComplete="organization" /></label><label className={labelClass} htmlFor="subject">{fields.subject} *<input className={inputClass} id="subject" name="subject" required /></label></div><label className={`mt-5 ${labelClass}`} htmlFor="area">{fields.area} *<select className={inputClass} id="area" name="area" defaultValue={partnershipValue} required><option value="" disabled>—</option>{copy.form.options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label><label className={`mt-5 ${labelClass}`} htmlFor="message">{fields.message} *<textarea className={inputClass} id="message" name="message" rows="6" required /></label><div className="mt-6 flex flex-wrap gap-4"><button type="submit" className="inline-flex min-h-11 items-center justify-center bg-[#e87512] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#c8610a]">{copy.form.submit}</button><button type="button" onClick={openEmail} className="inline-flex min-h-11 items-center justify-center border border-[#061b46] px-5 py-3 text-sm font-bold text-[#061b46] transition hover:bg-[#061b46] hover:text-white">{copy.form.emailAlternative}</button></div><p className="mt-5 text-xs leading-5 text-slate-500">{copy.form.whatsappInfo}</p><p className="mt-4 text-xs leading-5 text-slate-500">{copy.form.privacy}</p></form>;
}
