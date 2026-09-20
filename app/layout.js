import "./globals.css";
import { SITE_STRUCTURED_DATA, SITE_URL } from "@/lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "GK GROUP | Global Business Without Borders", template: "%s | GK GROUP" },
  description: "GK GROUP is the global institutional architecture connecting technology, international mobility, trade, business development and strategic consulting.",
  applicationName: "GK GROUP",
  openGraph: { type: "website", locale: "fr_FR", alternateLocale: "en_US", siteName: "GK GROUP", title: "GK GROUP | Global Business Without Borders", description: "Building Trust. Connecting Opportunities.", url: "/" },
  twitter: { card: "summary", title: "GK GROUP | Global Business Without Borders", description: "Building Trust. Connecting Opportunities." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return <html lang="fr"><body>
    <script
      id="gkgroup-structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(SITE_STRUCTURED_DATA).replace(/</g, "\\u003c") }}
    />
    {children}
  </body></html>;
}
