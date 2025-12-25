import type { Metadata } from "next";
import { Outfit, Pacifico, Dancing_Script } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/providers/ClientProviders";

// ============================================
// FONT LOADING - Optimized with next/font
// ============================================
// Using next/font/google eliminates CLS from font loading:
// - Fonts are self-hosted (no external requests)
// - Automatic font-display: swap
// - Preloaded at build time
// - Size-adjust applied to minimize layout shift

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
  // Fallback metrics to minimize CLS
  fallback: ["system-ui", "sans-serif"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
  display: "swap",
  fallback: ["cursive"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing-script",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "The Noki AI - Your Adorable AI Friend",
  description:
    "A cuddly plush AI toy that chats, learns, and grows with you. Introducing The Noki by Anoki Win.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${pacifico.variable} ${dancingScript.variable}`}
    >
      <body className="antialiased">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
