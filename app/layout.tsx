import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { BnbNavbar } from "./_components";
import SonnerToaster from "./_components/SonnerToaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  preload: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  preload: false,
});

export const metadata: Metadata = {
  title: "Trip25 || BNB, Photos, Maps",
  description: "Next 15 + Prisma + Tailwind + ShadcnUI Trips App",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <BnbNavbar />
        {children}
        <SonnerToaster />
      </body>
    </html>
  );
};

export default RootLayout;
