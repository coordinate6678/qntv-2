import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const title = "Quontive.com | Türkiye'nin En Gelişmiş Reklam Teknolojisi";
const description =
  "Quontive, mobil, sosyal ve web reklam envanterini tek platformda birleştirir. CPM, CPC, CPV, CPI ve CPA modelleriyle ölçülebilir dijital kampanyalar yönetin.";

export const viewport: Viewport = {
  themeColor: "#F0EEE6",
};

export const metadata: Metadata = {
  title,
  description,
  robots: { index: true, follow: true },
  metadataBase: new URL("https://www.quontive.com"),
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "https://www.quontive.com/",
    type: "website",
    locale: "tr_TR",
    siteName: "Quontive",
    images: [
      {
        url: "https://www.quontive.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Quontive — Türkiye'nin en gelişmiş reklam teknolojisi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["https://www.quontive.com/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "Quontive",
      url: "https://www.quontive.com/",
      logo: "https://www.quontive.com/icon.svg",
      email: "info@quontive.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Esentepe Mah. Talatpaşa Cad. No: 5/1 Levent",
        addressLocality: "Şişli",
        addressRegion: "İstanbul",
        postalCode: "34394",
        addressCountry: "TR",
      },
      contactPoint: {
        "@type": "ContactPoint",
        email: "info@quontive.com",
        contactType: "customer service",
        availableLanguage: "Turkish",
      },
    },
    {
      "@type": "WebSite",
      name: "Quontive",
      url: "https://www.quontive.com/",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${sourceSerif.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <noscript>
          <style>{`.reveal{opacity:1;transform:none}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
