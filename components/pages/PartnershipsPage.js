import Image from "next/image";
import { InstitutionalBanner } from "@/components/ui/InstitutionalBanner";
import { InstitutionalFrame, InstitutionalHeading, InstitutionalAction, InstitutionalClosing, institutionalStyles as styles } from "@/components/ui/InstitutionalPage";
import { PartnershipForm } from "@/components/pages/PartnershipForm";
import { CONTACT } from "@/content/site";
import { PARTNERSHIP_CONTENT } from "@/content/partnerships";
import { PREMIUM_PARTNERSHIPS } from "@/content/partnerships-premium";
import { getApprovedPartners, PARTNERSHIP_STATUSES } from "@/content/partnership-directory";

function DomainIcon({ category }) {
  const paths = {
    education: "M3 4h6l3 2 3-2h6v15h-6l-3 2-3-2H3V4Zm9 2v15",
    mobility: "M8 6V3h8v3M3 6h18v14H3V6Zm0 6h18M10 12v3h4v-3",
    technology: "M7 7h10v10H7V7ZM9 1v6m6-6v6M9 17v6m6-6v6M1 9h6m-6 6h6m10-6h6m-6 6h6",
    trade: "M3 8h18M3 16h18M12 2v20M12 2C5 7 5 17 12 22M12 2c7 5 7 15 0 20",
    business: "M9 3h6v6H9V3ZM2 16h6v6H2v-6Zm14 0h6v6h-6v-6ZM12 9v4M5 16v-3h14v3",
  };
  return <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" className="h-7 w-7 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">{category === "trade" && <circle cx="12" cy="12" r="10" />}<path d={paths[category]} /></svg>;
}

export function PartnershipsPage({ locale }) {
  const copy = PREMIUM_PARTNERSHIPS[locale];
  const existing = PARTNERSHIP_CONTENT[locale];
  const partners = getApprovedPartners();
  return <InstitutionalFrame locale={locale}>
    <InstitutionalBanner eyebrow={existing.eyebrow} {...copy.hero} signature="Building Trust. Connecting Opportunities." actions={<a href="#proposal" className="inline-flex min-h-12 items-center border border-[#d59b46] px-5 py-3 text-sm font-bold">{existing.propose}</a>} />

    <section id="our-approach" className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><InstitutionalHeading eyebrow={copy.approach.eyebrow} title={copy.approach.title} /><p className="max-w-4xl text-lg leading-8 text-slate-600">{copy.approach.description}</p><div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{copy.approach.values.map(([title, text], index) => <article key={title} data-partnership-value className={`border border-slate-200 border-t-2 border-t-[#d59b46] bg-[#f5f7fa] p-6 ${styles.card}`}><p aria-hidden="true" className="text-xs font-bold tracking-wider text-[#946020]">0{index + 1}</p><h3 className="mt-4 text-xl font-bold leading-7 text-[#061b46]">{title}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{text}</p></article>)}</div></div></section>

    <section id="partnership-domains" className="bg-[#061b46] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><InstitutionalHeading eyebrow={copy.domains.eyebrow} title={copy.domains.title} dark /><p className="max-w-4xl text-lg leading-8 text-slate-200">{copy.domains.description}</p><div className="mt-10 grid gap-6 lg:grid-cols-2">{copy.domains.items.map((domain, index) => <article key={domain.id} data-partnership-domain={domain.id} className={`flex min-w-0 flex-col border border-white/20 border-t-2 border-t-[#d59b46] bg-white/5 p-6 sm:p-8 ${index === 4 ? "lg:col-span-2" : ""}`}><div className="flex items-center justify-between gap-6 text-[#e7ba75]"><DomainIcon category={domain.id} /><span aria-hidden="true" className="text-xs font-bold tracking-wider">0{index + 1}</span></div><h3 className="mt-6 text-2xl font-bold leading-8">{domain.title}</h3><p className="mb-7 mt-5 max-w-4xl leading-8 text-slate-200">{domain.description}</p><div className="mt-auto"><InstitutionalAction href={domain.href} locale={locale} variant="outline">{copy.domains.link}<span className="sr-only"> · {domain.title}</span></InstitutionalAction></div></article>)}</div></div></section>

    <section id="collaborations" className="px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><InstitutionalHeading eyebrow={copy.collaborations.eyebrow} title={copy.collaborations.title} /><p className="max-w-4xl text-lg leading-8 text-slate-600">{copy.collaborations.description}</p><div className="mt-10 grid gap-6 lg:grid-cols-2"><div className="border border-slate-200 border-t-2 border-t-[#d59b46] bg-[#f5f7fa] p-6 sm:p-8"><h3 className="text-xl font-bold leading-7 text-[#061b46]">{copy.collaborations.publicationTitle}</h3><p className="mt-5 leading-8 text-slate-600">{copy.collaborations.publication}</p><p className="mt-6 border-l-2 border-[#d59b46] pl-4 text-sm leading-7 text-slate-600">{existing.notice}</p></div><div className="border border-slate-200 border-t-2 border-t-[#d59b46] p-6 sm:p-8"><h3 className="text-xl font-bold leading-7 text-[#061b46]">{copy.collaborations.scopeTitle}</h3><div className="mt-5 grid gap-4 text-sm leading-7 text-slate-600">{existing.identity.map(text => <p key={text}>{text}</p>)}</div><div className="mt-7"><InstitutionalAction href="/entities" locale={locale}>{copy.collaborations.entities}</InstitutionalAction></div></div></div>
      {partners.length > 0 && <div className="mt-10 grid gap-8">{copy.domains.items.map(domain => { const group = partners.filter(partner => partner.category === domain.id); return group.length > 0 && <div key={domain.id} data-partner-category={domain.id}><h3 className="text-2xl font-bold text-[#061b46]">{domain.title}</h3><div className="mt-6 grid gap-6 md:grid-cols-2">{group.map(partner => <article key={partner.id} data-approved-partner className="border border-slate-200 border-t-2 border-t-[#d59b46] p-6">{partner.logo && <Image src={partner.logo.src} alt={partner.name} width={partner.logo.width} height={partner.logo.height} className="mb-5 h-20 w-32 object-contain" sizes="128px" />}<p className="text-xs font-bold uppercase tracking-wider text-[#946020]">{PARTNERSHIP_STATUSES[partner.status][locale]}</p><h4 className="mt-3 text-xl font-bold text-[#061b46]">{partner.name}</h4><p className="mt-4 leading-7 text-slate-600">{partner.summary[locale]}</p></article>)}</div></div>; })}</div>}
    </div></section>

    <section id="become-a-partner" className="bg-[#061b46] px-5 py-16 text-white sm:px-8 sm:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:gap-16"><div><InstitutionalHeading eyebrow={copy.join.eyebrow} title={copy.join.title} dark /><p className="text-lg leading-8 text-slate-200">{copy.join.description}</p><div className="mt-8"><InstitutionalAction href="/contact" locale={locale} variant="gold">{copy.join.contact}</InstitutionalAction></div></div><ul className="self-center border-t border-white/20">{copy.join.audiences.map(audience => <li key={audience} className="border-b border-white/20 py-5 pl-4 text-lg leading-8"><span aria-hidden="true" className="mr-4 text-[#e7ba75]">→</span>{audience}</li>)}</ul></div></section>

    <section id="collaboration-method" className="bg-[#f5f7fa] px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><InstitutionalHeading eyebrow={copy.method.eyebrow} title={existing.methodTitle} /><ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{existing.steps.map((step, index) => <li key={step} className="border-t-2 border-[#d59b46] bg-white p-6"><span aria-hidden="true" className="text-sm font-bold text-[#946020]">0{index + 1}</span><p className="mt-4 leading-8 text-slate-600">{step}</p></li>)}</ol><p className="mt-8 border-l-2 border-[#d59b46] pl-4 text-sm leading-7 text-slate-600">{existing.notice}</p></div></section>

    <section id="proposal" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-24"><div className="mx-auto max-w-7xl"><InstitutionalHeading eyebrow={copy.form.eyebrow} title={existing.formTitle} /><p className="mb-8 max-w-3xl text-lg leading-8 text-slate-600">{existing.formIntro}</p><PartnershipForm copy={existing.form} /><address className="mt-7 grid gap-2 text-sm not-italic leading-6 text-slate-600"><p>{CONTACT.legalName} · {CONTACT.location}</p><a href={CONTACT.emailHref} className="w-fit underline underline-offset-4">{CONTACT.email}</a><a href={CONTACT.whatsappHref} className="w-fit underline underline-offset-4">WhatsApp {CONTACT.whatsapp}</a></address></div></section>
    <InstitutionalClosing locale={locale} copy={copy.final} />
  </InstitutionalFrame>;
}
