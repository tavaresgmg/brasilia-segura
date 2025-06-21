import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brasília Segura",
  description: "Plataforma colaborativa para reportar e resolver problemas urbanos em Brasília",
  manifest: process.env.NODE_ENV === "production" ? "/brasilia-segura/manifest.json" : "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Brasília Segura",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Brasília Segura",
    title: "Brasília Segura - Cidade Mais Segura",
    description: "Reporte problemas urbanos e contribua para uma Brasília melhor",
  },
  twitter: {
    card: "summary",
    title: "Brasília Segura",
    description: "Reporte problemas urbanos e contribua para uma Brasília melhor",
  },
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href={process.env.NODE_ENV === "production" ? "/brasilia-segura/favicon.ico" : "/favicon.ico"} sizes="any" />
        <link rel="apple-touch-icon" href={process.env.NODE_ENV === "production" ? "/brasilia-segura/icons/icon-192x192.png" : "/icons/icon-192x192.png"} />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
