import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieBanner } from "@/components/CookieBanner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SDViGApp — твой мозг работает иначе. SDViGApp работает под тебя.",
    template: "%s · SDViGApp",
  },
  description:
    "Один ритм для дня, задач, финансов и привычек. Без стыда. Без перегруза. Без 7 приложений. Сделано для людей с СДВГ.",
  metadataBase: new URL("https://sdvig.app"),
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: "https://sdvig.app",
    siteName: "SDViGApp",
    title: "SDViGApp — твой мозг работает иначе. SDViGApp работает под тебя.",
    description:
      "Один ритм для дня, задач, финансов и привычек. Без стыда. Без перегруза. Без 7 приложений.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SDViGApp — твой мозг работает иначе. SDViGApp работает под тебя.",
    description:
      "Один ритм для дня, задач, финансов и привычек. Без стыда. Без перегруза.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={inter.variable}
    >
      <body className="min-h-screen flex flex-col bg-bg-primary text-text-primary">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
