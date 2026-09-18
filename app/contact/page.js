import { ContactPage } from "@/components/pages/ContactPage";
import { getLocale } from "@/lib/locale";

export async function generateMetadata({ searchParams }) {
  const locale = getLocale(await searchParams);
  const fr = locale === "fr";
  return { title: fr ? "Contact & Partenariats" : "Contact & Partnerships", description: fr ? "Contactez GK GROUP pour une demande professionnelle ou une opportunité de partenariat." : "Contact GK GROUP for a professional inquiry or partnership opportunity." };
}

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const locale = getLocale(params);
  return <ContactPage locale={locale} partnership={params?.area === "partnership"} />;
}
