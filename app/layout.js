import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.gkgroup.app"),
  title: { default: "GK GROUP | Global Business Without Borders", template: "%s | GK GROUP" },
  description: "GK GROUP is the global institutional architecture connecting technology, international mobility, trade, business development and strategic consulting.",
  applicationName: "GK GROUP",
  openGraph: { type: "website", locale: "fr_FR", alternateLocale: "en_US", siteName: "GK GROUP", title: "GK GROUP | Global Business Without Borders", description: "Building Trust. Connecting Opportunities.", url: "/" },
  twitter: { card: "summary", title: "GK GROUP | Global Business Without Borders", description: "Building Trust. Connecting Opportunities." },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) { return <html lang="fr"><body>{children}</body></html>; }
