import type { Metadata } from "next";
import { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "./_components";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Next 14 + Tailwind CSS App",
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
