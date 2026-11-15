"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { GALLERY_PHOTOS } from "@/content/gkgt-gallery";
import { GKGT_PHOTO_STORIES } from "@/content/gkgt-photo-stories";
import { TECHNOLOGY_GALLERY_COPY } from "@/content/technology-gallery";
import styles from "./GkgtPhotoGallery.module.css";

const PhotoContext = createContext(null);
const ORDERED_PHOTOS = GKGT_PHOTO_STORIES.flatMap(story => story.photos.map(id => GALLERY_PHOTOS.find(photo => photo.id === id)));

// The WebP files are prepared once from the audited source.  The <source>
// srcset lets the browser choose the smallest adequate copy, while the
// unoptimized fallback prevents Next from encoding those copies a second time.
function GkgtDisplayImage({ photo, alt, sizes, fill = false, className, style }) {
  const srcSet = photo.variants.map(variant => `${variant.src} ${variant.width}w`).join(", ");
  return <picture className="contents">
    <source type="image/webp" srcSet={srcSet} sizes={sizes} />
    <Image src={photo.src} alt={alt} width={fill ? undefined : photo.width} height={fill ? undefined : photo.height} fill={fill} unoptimized loading="lazy" sizes={sizes} className={className} style={style} />
  </picture>;
}

export function GkgtPhotoProvider({ locale, children }) {
  const fr = locale === "fr";
  const dialog = useRef(null);
  const opener = useRef(null);
  const [active, setActive] = useState(null);
  const photo = active === null ? null : ORDERED_PHOTOS[active];
  const pendingLabel = fr ? "Validation de publication en attente" : "Publication approval pending";
  const controlClass = "inline-flex min-h-11 items-center justify-center border border-[#d59b46] px-4 py-2 text-sm font-bold text-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d59b46]";

  useEffect(() => {
    if (active === null) return;
    if (!dialog.current.open) dialog.current.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [active]);

  function move(delta) { setActive(index => (index + delta + ORDERED_PHOTOS.length) % ORDERED_PHOTOS.length); }
  function close() { dialog.current?.close(); }
  function dialogKeys(event) {
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
    if (event.key === "Tab") {
      const controls = dialog.current.querySelectorAll("button, a[href], [tabindex='0']");
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  }
  function opened(event, id) {
    event.preventDefault();
    opener.current = event.currentTarget;
    setActive(ORDERED_PHOTOS.findIndex(item => item.id === id));
  }

  return <PhotoContext.Provider value={{ open: opened }}>
    {children}
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="gkgt-photo-title" aria-describedby="gkgt-photo-position" onClose={() => { setActive(null); opener.current?.focus(); }} onKeyDown={dialogKeys}>
      {photo && <>
        <div className="flex items-center justify-between gap-4 border-b border-white/20 p-4"><p id="gkgt-photo-position" role="status" className="text-sm">{fr ? "Photographie" : "Photograph"} {active + 1} / {ORDERED_PHOTOS.length}</p><button type="button" onClick={close} className={controlClass}>{fr ? "Fermer" : "Close"} <span aria-hidden="true" className="ml-2">×</span></button></div>
        <div className="bg-black/20 p-3 sm:p-5"><GkgtDisplayImage key={photo.id} photo={photo} alt={photo.caption[locale]} sizes="(max-width: 768px) 100vw, min(1400px, 96vw)" className={`mx-auto h-auto max-h-[65dvh] w-auto max-w-full object-contain ${styles.modalImage}`} style={{ "--gkgt-native-width": `${photo.width}px`, "--gkgt-native-height": `${photo.height}px` }} /></div>
        <div className="p-5"><h2 id="gkgt-photo-title" className="text-base font-bold leading-7">{photo.caption[locale]}</h2>{!photo.approved && <p className="mt-2 text-sm text-[#e7ba75]">{pendingLabel}</p>}<div className="mt-5 flex flex-wrap justify-between gap-3"><button type="button" className={controlClass} onClick={() => move(-1)}>{fr ? "Précédente" : "Previous"}</button><button type="button" className={controlClass} onClick={() => move(1)}>{fr ? "Suivante" : "Next"}</button></div></div>
      </>}
    </dialog>
  </PhotoContext.Provider>;
}

function PhotoFigure({ id, locale, mode = "portrait", large = false, dark = false, sizes }) {
  const photo = GALLERY_PHOTOS.find(item => item.id === id);
  const { open } = useContext(PhotoContext);
  const fr = locale === "fr";
  const archive = id.startsWith("archive-");
  const aspect = mode === "landscape" ? "aspect-[16/10]" : mode === "detail" ? "aspect-[4/3]" : "aspect-[4/5]";
  const imageSizes = sizes || (large ? "(max-width: 767px) calc(100vw - 40px), (max-width: 1023px) calc(100vw - 64px), 700px" : "(max-width: 639px) calc(100vw - 40px), (max-width: 1023px) 45vw, 400px");
  return <figure data-gallery-photo={id} data-photo-origin={archive ? "archive" : "new"} className="min-w-0">
    <a href={photo.src} onClick={event => open(event, id)} aria-haspopup="dialog" aria-label={`${fr ? "Agrandir" : "Enlarge"} : ${photo.caption[locale]}`} className={`relative block ${aspect} border ${dark ? "border-white/20 bg-white/5" : "border-slate-200 bg-[#f5f7fa]"} focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#946020]`}>
      <GkgtDisplayImage photo={photo} alt={photo.caption[locale]} fill sizes={imageSizes} className="object-contain" />
      <span aria-hidden="true" className="absolute right-3 bottom-3 bg-[#061b46] px-3 py-2 text-lg text-white">↗</span>
    </a>
    <figcaption className={`border-t border-[#d59b46] py-4 ${dark ? "text-white" : "text-[#061b46]"}`}>
      <span className={`block text-[11px] font-bold uppercase tracking-[.12em] ${dark ? "text-[#e7ba75]" : "text-[#805217]"}`}>{archive ? (fr ? "Archives · GK Informatique" : "Archives · GK Informatique") : (fr ? "Photographie d’activité" : "Activity photograph")}</span>
      <span className="mt-2 block text-sm leading-6">{photo.caption[locale]}</span>
      {!photo.approved && <span className={`mt-2 block text-xs font-bold ${dark ? "text-[#e7ba75]" : "text-[#805217]"}`}>{fr ? "Validation de publication en attente" : "Publication approval pending"}</span>}
    </figcaption>
  </figure>;
}

function StoryHeading({ story, locale, dark = false }) {
  return <div className="max-w-3xl">
    <p className={`text-xs font-bold uppercase tracking-[.18em] ${dark ? "text-[#e7ba75]" : "text-[#946020]"}`}>{story.eyebrow[locale]}</p>
    <div aria-hidden="true" className="mt-5 h-px w-16 bg-[#d59b46]" />
    <h2 id={`${story.anchor}-title`} className={`mt-6 text-3xl font-bold leading-tight tracking-tight sm:text-4xl ${dark ? "text-white" : "text-[#061b46]"}`}>{story.title[locale]}</h2>
    <p className={`mt-6 text-base leading-8 sm:text-lg ${dark ? "text-slate-200" : "text-slate-600"}`}>{story.body[locale]}</p>
  </div>;
}

export function GkgtPhotoStory({ story: storyId, locale }) {
  const story = GKGT_PHOTO_STORIES.find(item => item.id === storyId);
  const fr = locale === "fr";
  const photos = story.photos;
  const dark = story.layout === "equipment";
  const heading = <StoryHeading story={story} locale={locale} dark={dark} />;
  const figure = (index, props = {}) => <PhotoFigure id={photos[index]} locale={locale} dark={dark} {...props} />;
  return <section id={story.anchor} data-photo-story={story.id} data-story-layout={story.layout} aria-labelledby={`${story.anchor}-title`} className={`scroll-mt-6 px-5 py-16 sm:px-8 sm:py-24 ${dark ? "bg-[#061b46]" : ["maintenance", "timeline"].includes(story.layout) ? "bg-[#f5f7fa]" : "bg-white"}`}>
    <div className="mx-auto max-w-7xl">
      {story.layout === "feature" && <>
        <div className="grid items-start gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-x-16 lg:gap-y-9">
          <div className="lg:col-start-1 lg:row-start-1">{heading}</div>
          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">{figure(0, { large: true })}</div>
          <div className="grid grid-cols-2 gap-5 lg:col-start-1 lg:row-start-2">{figure(1, { mode: "detail" })}{figure(2, { mode: "detail" })}</div>
        </div>
           <p className="mt-8 border-l-2 border-[#946020] pl-5 text-sm leading-7 text-slate-600">
          {fr
            ? "21 photographies distinctes réparties dans cette page. Les archives sont identifiées ; ces vues ne sont pas présentées comme des installations actuelles."
            : "21 distinct photographs distributed throughout this page. Archives are identified; these views are not presented as current facilities."}
        </p>
      </>}

      {story.layout === "maintenance" && <>
        {heading}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-12">
          <div>{figure(0, { mode: "landscape", large: true })}<div className="mt-6">{figure(1, { mode: "detail", large: true })}</div></div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-1">{figure(2)}{figure(3)}</div>
        </div>
      </>}
      {story.layout === "equipment" && <>
        {heading}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">{figure(0, { mode: "landscape", large: true })}<div className="grid grid-cols-2 gap-5">{figure(1)}{figure(2)}</div></div>
        <div className="mt-8 grid items-start gap-7 border-t border-white/20 pt-8 sm:grid-cols-3">{figure(3, { mode: "detail" })}{figure(4, { mode: "detail" })}{figure(5, { mode: "detail" })}</div>
      </>}
      {story.layout === "workshop" && <>
        <div className="grid items-center gap-10 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">{heading}{figure(0, { mode: "landscape", large: true })}</div>
        <div className="mt-10 grid items-start gap-7 sm:grid-cols-3">{figure(1)}{figure(2)}{figure(3)}</div>
      </>}
      {story.layout === "timeline" && <>
        {heading}
        <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-600">{TECHNOLOGY_GALLERY_COPY[locale].archivesIntro}</p>
        <ol className="mt-12 border-l border-[#d59b46] pl-6 sm:pl-10">
          {photos.map((id, index) => <li key={id} className="relative pb-12 last:pb-0">
            <span aria-hidden="true" className="absolute -left-[30px] top-2 h-3 w-3 rounded-full bg-[#946020] sm:-left-[46px]" />
            <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
              <div className={index % 2 ? "lg:order-2" : ""}><p className="text-xs font-bold uppercase tracking-[.15em] text-[#946020]">{fr ? "Repère visuel" : "Visual reference"} {String(index + 1).padStart(2, "0")}</p><h3 className="mt-4 text-2xl font-bold text-[#061b46]">{story.steps[index][locale]}</h3><p className="mt-4 text-sm leading-7 text-slate-600">{fr ? "Document du parcours technique de GK Informatique, conservé sans ajout de date, de lieu ou de client." : "A record of GK Informatique’s technical activity, preserved without adding a date, location or client."}</p></div>
              <PhotoFigure id={id} locale={locale} mode="landscape" large />
            </div>
          </li>)}
        </ol>
        <p className="mt-10 text-sm leading-7 text-slate-600">{fr ? "Archives d'activités historiques : ces images ne représentent pas nécessairement les installations actuelles. Les dates et lieux n'ont pas été vérifiés indépendamment." : "Historical activity archives; these images do not necessarily represent current facilities. Dates and locations have not been independently verified."}</p>
      </>}
    </div>
  </section>;
}
