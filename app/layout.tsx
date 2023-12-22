import React from "react";
import { Rubik } from "next/font/google";
import "../styles/globals.css";
import type { Metadata } from "next";
import "../styles/sass/main.scss";
import Providers from "@/app/providers";

export const metadata: Metadata = {
  title: "Happy Fit",
  description: "A fitness app for everyone",
};

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
  weight: "400",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${rubik.variable} font-rubik`}>
      <body className={`${rubik.variable} font-rubik h-[100%]`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
