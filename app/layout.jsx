import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Logo from "@/components/Logo";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata = {
  title: "Farm Guard — Your AI Farming Assistant",
  description:
    "Ask about crops, weather, pests, and market prices. Farm Guard brings field-tested answers to every grower.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plexMono.variable}`}>
      <body className="font-body bg-cream text-ink antialiased">
        <div className="fixed top-4 left-4 z-50 pointer-events-none">
          <Logo variant="small" />
        </div>
        {children}
      </body>
    </html>
  );
}
