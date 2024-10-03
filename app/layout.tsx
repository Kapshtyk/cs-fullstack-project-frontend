import type { Metadata, Viewport } from "next";
import { Great_Vibes as Niconne, Space_Grotesk } from "next/font/google";

import { MainLayout } from "@/app/layout/";

import "@/app/styles/index.scss";

import Providers from "./providers";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const niconne = Niconne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-niconne",
  weight: "400",
});

export const viewport: Viewport = {
  themeColor: "#303030",
};

export const metadata: Metadata = {
  title: {
    default: "Crazy Shop",
    template: "%s | Crazy Shop",
  },
  description:
    "Crazy Shop is a platform for buying the craziest fake products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${niconne.variable} ${spaceGrotesk.variable}`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
