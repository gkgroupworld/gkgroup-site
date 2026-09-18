import { ArchitecturePage } from "@/components/pages/ArchitecturePage";
import { getLocale } from "@/lib/locale";

export async function generateMetadata({ searchParams }) { const locale = getLocale(await searchParams); const fr = locale === "fr"; return { title: fr ? "Notre architecture" : "Our architecture", description: fr ? "Découvrez l’architecture institutionnelle internationale de GK GROUP." : "Discover GK GROUP’s international institutional architecture." }; }
export default async function Page({ searchParams }) { return <ArchitecturePage locale={getLocale(await searchParams)} />; }
