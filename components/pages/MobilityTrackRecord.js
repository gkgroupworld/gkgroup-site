import { MOBILITY_TRACK_RECORD, MOBILITY_TRACK_RECORD_COPY } from "@/content/mobility-track-record";

export function MobilityTrackRecord({ locale }) {
  const copy = MOBILITY_TRACK_RECORD_COPY[locale];
  const {
    since,
    historicalHighlights,
    historicalVisitDestinations,
    studentSupport,
    companyFormations,
    eResidency,
    visas,
    workPermits,
    partners,
  } = MOBILITY_TRACK_RECORD;
  const visaTotal = visas.reduce((total, record) => total + record.count, 0);

  return <section id="track-record" aria-labelledby="track-record-title" className="scroll-mt-6 border-t border-slate-200 px-5 py-16 sm:px-8 sm:py-20">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#946020]">{copy.eyebrow}</p>
      <h2 id="track-record-title" className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.title}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{copy.intro}</p>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-[#061b46]">{copy.historicalTitle}</h3>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {historicalHighlights.map(record => <article key={record.id} data-historical-result={record.id} className="min-w-0 border-t-2 border-[#d59b46] bg-[#061b46] p-7 text-white sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[.15em] text-[#e7ba75]">{copy.declared}</p>
            <h4 className="mt-5 text-2xl font-bold">{record.country[locale]}</h4>
            <p className="mt-5 text-4xl font-bold leading-tight sm:text-5xl">{record.quantity[locale]}</p>
            <p className="mt-5 max-w-md text-base leading-7 text-slate-200">{record.label[locale]}</p>
            {record.note && <p className="mt-4 max-w-md border-t border-white/20 pt-4 text-sm leading-7 text-slate-200">{record.note[locale]}</p>}
          </article>)}
        </div>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-[#061b46]">{copy.visitsTitle}</h3>
        <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {historicalVisitDestinations.map(record => <li key={record.id} data-historical-visit={record.id} className="border-l-2 border-[#d59b46] bg-[#f5f7fa] p-5">
            <h4 className="text-lg font-bold text-[#061b46]">{record.country[locale]}</h4>
            <p className="mt-3 text-3xl font-bold text-[#061b46]">{record.quantity[locale]}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{copy.visitsOutcome}</p>
          </li>)}
        </ul>
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-[#061b46]">{copy.achievementsTitle}</h3>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article data-student-support className="border-t-2 border-[#d59b46] bg-[#f5f7fa] p-6">
            <h4 className="text-lg font-bold text-[#061b46]">{copy.studentsTitle}</h4>
            <p className="mt-4 text-4xl font-bold text-[#061b46]">{studentSupport.count}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{studentSupport.label[locale]}</p>
          </article>
          <article data-company-formations className="border-t-2 border-[#d59b46] bg-[#f5f7fa] p-6">
            <h4 className="text-lg font-bold text-[#061b46]">{copy.companiesTitle}</h4>
            <ul className="mt-4 space-y-3">
              {companyFormations.map(record => <li key={record.id} data-company-formation={record.id} className="flex items-baseline justify-between gap-4">
                <span className="font-semibold text-slate-700">{record.country[locale]}</span>
                <span className="text-2xl font-bold text-[#061b46]">{record.count}</span>
              </li>)}
            </ul>
          </article>
          <article data-eresidency-result className="border-t-2 border-[#d59b46] bg-[#f5f7fa] p-6">
            <h4 className="text-lg font-bold text-[#061b46]">{copy.eResidencyTitle}</h4>
            <p className="mt-4 text-4xl font-bold text-[#061b46]">{eResidency.count}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600">{eResidency.label[locale]}</p>
          </article>
        </div>
      </div>

      <div className="mt-12 border-t border-slate-200 pt-8">
        <h3 className="text-2xl font-bold text-[#061b46]">{copy.existingTitle}</h3>
        <p className="mt-3 text-sm font-bold text-[#946020]">{copy.since} {since}</p>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="min-w-0 border border-slate-200 border-t-2 border-t-[#d59b46] bg-[#f5f7fa] p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#061b46]">{copy.visasTitle}</h3>
          <p className="mt-4 max-w-2xl leading-7 text-slate-600"><strong className="text-[#061b46]">{visaTotal}</strong> {copy.visasSummary}</p>
          <dl className="mt-7 grid gap-5 sm:grid-cols-3">
            {visas.map((record) => <div key={record.id} data-visa-result={record.id} className="border-l-2 border-[#d59b46] pl-4">
              <dt className="text-sm font-bold leading-6 text-[#061b46]">{record.label[locale]}{record.period && <span className="mt-1 block font-normal text-slate-600">{record.period}</span>}</dt>
              <dd className="mt-3 text-4xl font-bold text-[#061b46]">{record.count}</dd>
            </div>)}
          </dl>
        </div>
        <div data-work-permit-result className="min-w-0 border-t-2 border-[#d59b46] bg-[#061b46] p-6 text-white sm:p-8">
          <h3 className="text-2xl font-bold">{copy.permitsTitle}</h3>
          <dl className="mt-6">
            <dt className="text-sm font-bold leading-6 text-[#e7ba75]">{workPermits.label[locale]}<span className="mt-1 block font-normal text-slate-200">{workPermits.period}</span></dt>
            <dd className="mt-3 text-4xl font-bold">{workPermits.count}</dd>
          </dl>
          <p className="mt-5 text-sm leading-7 text-slate-200">{copy.permitsNote}</p>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-bold text-[#061b46]">{copy.partnersTitle}</h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partners.map((name) => <li key={name} data-mobility-partner className="border border-slate-200 border-t-2 border-t-[#d59b46] bg-white p-5 text-base font-bold leading-7 text-[#061b46]">{name}</li>)}
        </ul>
        <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-600">{copy.partnersNote}</p>
      </div>
      <p className="mt-8 border-l-2 border-[#d59b46] bg-[#f5f7fa] p-5 text-sm leading-7 text-slate-600">{copy.disclaimer}</p>
    </div>
  </section>;
}