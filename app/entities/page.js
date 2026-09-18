import { EntitiesPage } from "@/components/pages/EntitiesPage";
import { getLocale } from "@/lib/locale";

export async function generateMetadata({ searchParams }) { const locale = getLocale(await searchParams); const fr = locale === "fr"; return { title: fr ? "Nos entités" : "Our entities", description: fr ? "Les six structures institutionnelles de GK GROUP." : "GK GROUP’s six institutional structures." }; }
export default async function Page({ searchParams }) { return <EntitiesPage locale={getLocale(await searchParams)} />; }
