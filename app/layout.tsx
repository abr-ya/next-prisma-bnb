import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trip25 || BNB, Photos, Maps",
  description: "Next 14 + Prisma + Tailwind + ShadcnUI Trips App",
};

const RootLayout = ({ children }: PropsWithChildren) => (
  <html lang="en">
    <body className={inter.className}>
      <Navbar />
      {children}
    </body>
  </html>
);

export default RootLayout;
