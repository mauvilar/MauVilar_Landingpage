import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://portfolio.nyxaistudio.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Mauricio Vilar Giribet — Data Science & AI Portfolio",
    template: "%s · Mauricio Vilar Giribet",
  },
  description:
    "Portfolio de Data Science y AI Engineering de Mauricio Vilar Giribet — proyectos de Machine Learning, EDA, SQL, estadística y automatización con LLMs.",
  keywords: [
    "Data Science",
    "AI Engineer",
    "Machine Learning",
    "Python",
    "Análisis de Datos",
    "Mauricio Vilar Giribet",
    "NyxAI Studio",
    "Portfolio",
  ],
  authors: [{ name: "Mauricio Vilar Giribet" }],
  creator: "Mauricio Vilar Giribet",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: SITE_URL,
    title: "Mauricio Vilar Giribet — Data Science & AI Portfolio",
    description:
      "AI Engineer y Data Analyst especializado en IA generativa, automatización y análisis de datos.",
    siteName: "Mauricio Vilar — Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mauricio Vilar Giribet — Data Science & AI Portfolio",
    description:
      "AI Engineer y Data Analyst especializado en IA generativa, automatización y análisis de datos.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="relative flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
