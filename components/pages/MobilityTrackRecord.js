import { MOBILITY_TRACK_RECORD, MOBILITY_TRACK_RECORD_COPY } from "@/content/mobility-track-record";

export function MobilityTrackRecord({ locale }) {
  const copy = MOBILITY_TRACK_RECORD_COPY[locale];
  const {
    historicalHighlights,
    historicalVisitDestinations,
    studentSupport,
    companyFormations,
    eResidency,
    visas,
    workPermits,
    partners,
  } = MOBILITY_TRACK_RECORD;

  const visaResults = [
    ...historicalHighlights.map(record => ({
      id: record.id,
      title: record.country[locale],
      quantity: record.quantity[locale],
      description: record.label[locale],
      note: record.note?.[locale],
    })),
    ...historicalVisitDestinations.map(record => ({
      id: record.id,
      title: record.country[locale],
      quantity: record.quantity[locale],
      description: copy.visitsOutcome,
    })),
    ...visas.map(record => ({
      id: record.id,
      title: record.label[locale],
      quantity: String(record.count),
      note: record.period,
    })),
  ];

  return <section id="track-record" aria-labelledby="track-record-title" className="scroll-mt-6 border-t border-slate-200 px-5 py-16 sm:px-8 sm:py-20">
    <div className="mx-auto max-w-7xl">
      <p className="text-xs font-bold uppercase tracking-[.18em] text-[#946020]">{copy.eyebrow}</p>
      <h2 id="track-record-title" className="mt-3 max-w-4xl text-3xl font-bold tracking-tight text-[#061b46] sm:text-4xl">{copy.title}</h2>
      <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{copy.intro}</p>

      <div className="mt-10">
        <h3 className="text-2xl font-bold text-[#061b46]">{copy.historicalTitle}</h3>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visaResults.map(record => <article key={record.id} data-visa-result={record.id} className="min-w-0 border-t-2 border-[#d59b46] bg-[#f5f7fa] p-6">
            <h4 className="text-lg font-bold leading-7 text-[#061b46]">{record.title}</h4>
            <p className="mt-4 text-4xl font-bold text-[#061b46]">{record.quantity}</p>
            {record.description && <p className="mt-3 text-sm leading-7 text-slate-600">{record.description}</p>}
            {record.note && <p className="mt-3 text-sm leading-7 text-slate-600">{record.note}</p>}
          </article>)}
        </div>
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

      <div className="mt-10">
        <div data-work-permit-result className="max-w-xl border-t-2 border-[#d59b46] bg-[#f5f7fa] p-6 sm:p-8">
          <h3 className="text-2xl font-bold text-[#061b46]">{copy.permitsTitle}</h3>
          <p className="mt-5 text-5xl font-bold text-[#061b46]">{workPermits.count}</p>
          <p className="mt-2 text-sm font-semibold text-slate-600">{workPermits.period}</p>
          <p className="mt-5 text-sm leading-7 text-slate-600">{copy.permitsNote}</p>
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