import { HomePage } from "@/components/pages/HomePage";
import { getLocale } from "@/lib/locale";
export default async function Page({ searchParams }) { return <HomePage locale={getLocale(await searchParams)} />; }
