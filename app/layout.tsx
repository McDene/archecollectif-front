import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const avenirBlack = localFont({
  src: "./fonts/AvenirBlack.woff2",
  variable: "--font-avenir-black",
  weight: "100 900",
});

const avenirRegular = localFont({
  src: "./fonts/AvenirRegular.woff2",
  variable: "--font-avenir-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "L'ARCH collectif",
  description:
    "L'ARCH Collectif, expert en architecture basé à Bulle, propose des services de rénovation du patrimoine dans la région de Fribourg et de la Gruyère en Suisse.",
  icons: {
    icon: "/LogoFondBleu.png",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "L'ARCH collectif",
    description:
      "Expert en architecture basé à Bulle, découvrez nos projets et services dans la région de Fribourg.",
    url: "https://larchcollectif.ch",
    siteName: "L'ARCH collectif",
    images: [
      {
        url: "/LogoFondBleu.png",
        width: 1200,
        height: 630,
        alt: "Image de présentation de L'ARCH collectif",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'ARCH collectif",
    description:
      "Découvrez les projets et l'univers de L'ARCH collectif, experts en rénovation architecturale.",
    images: ["/images/twitter-image.jpg"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${avenirBlack.variable} ${avenirRegular.variable} antialiased h-full `}
      >
        {children}
      </body>
    </html>
  );
}
