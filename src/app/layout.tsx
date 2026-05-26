import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Amiri } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eid ul Adha Mubarak, Saniya Jaan 🐑🌙",
  description: "A gift made with 7 years of love. Just for you.",
  openGraph: {
    title: "Open this — it's for you, Saniya Jaan 💛",
    description: "Eid ul Adha Mubarak. Made with love.",
  },
  robots: { index: false, follow: false }, // private — no search indexing
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorantGaramond.variable} ${amiri.variable}`}>
      <body className="antialiased min-h-screen bg-[#07000f] text-white">
        {children}
      </body>
    </html>
  );
}
